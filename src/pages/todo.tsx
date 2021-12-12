import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import CharacterOrdChange from '@components/Character/modal/CharacterOrdChange';
import { getResetCheckArr } from '@components/Todo/common/functions';
import CharacterAdd from '@components/Character/modal/CharacterAdd';
import { ITodo, ICharacterTodo } from '@components/Todo/TodoType';
import Pagination from '@components/Pagination/Pagination';
import TodoAdd from '@components/Todo/modal/TodoAdd';
import DownArrow from '@components/Image/DownArrow';
import PlusIcon from '@components/Image/PlusIcon';
import LineAdd from '@components/Line/LineAdd';
import UpArrow from '@components/Image/UpArrow';
import Button from '@components/Button/Button';
import Character from '@components/Character';
import Todo from '@components/Todo';
import Guide from '@components/Guide';
import { ScheduleContents } from '@common/types/types';
import { IContextModal } from '@common/types/types';
import { GA } from '@service/ga';
import { NextSeo } from 'next-seo';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexArticle } from '@style/common';
import { responsiveWidth, widthMedia } from '@style/device';

const Main = () => {
    useEffect(() => GA.trackPageView({ path: window.location.pathname }), []);

    const { setModalProps } = useContext(ModalActionContext);
    const [isFold, setIsFold] = useState<boolean>(false);
    const { width: windowWidth } = useWindowDimensions();
    const { storedTodo, storedCharacter, storedCharacterOrd } = useContext(LocalStorageStateContext);
    const { setStoredTodo } = useContext(LocalStorageActionContext);

    const theme = useTheme();

    useEffect(() => {
        resetFold();
    }, [windowWidth]);

    useEffect(() => {
        calcReset();
    }, []);

    const resetDailyTodoRelax = (diffDays: number) => {
        const todoArr: ITodo[] = [...storedTodo];
        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                if (todo.type !== 'daily') return character;

                const resets = {
                    chaos: () => calcRelaxGauge(todo, character, diffDays),
                    guardian: () => calcRelaxGauge(todo, character, diffDays),
                    basicReset: () => resetCheck(todo.contents, character),
                    epona: () => resetCheck(todo.contents, character),
                    basic: () => character,
                    none: () => character,
                };

                return resets[todo.contents] && resets[todo.contents]();
            });

            return todo;
        });

        setStoredTodo(calcResult);
    };

    const resetWeeklyTodo = () => {
        const todoArr: ITodo[] = [...storedTodo];

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                return todo.type === 'weekly' ? resetCheck(todo.contents, character) : character;
            });

            return todo;
        });

        setStoredTodo(calcResult);
    };

    const resetCheck = (contents: ScheduleContents, character: ICharacterTodo): ICharacterTodo => {
        const resetTodoData: ICharacterTodo = {
            ...character,
            check: getResetCheckArr(contents),
        };

        return resetTodoData;
    };

    const calcRelaxGauge = (todo: ITodo, character: ICharacterTodo, diffDays: number): ICharacterTodo => {
        const maxCheckCount = ['chaos', 'guardian'].includes(todo.contents) ? 2 : 1;

        const addGauge = (maxCheckCount * diffDays - getCheckCounts(character.check)) * 10;

        const relaxGauge = Number(character.relaxGauge) + addGauge;

        const resetTodoData: ICharacterTodo = {
            ...character,
            relaxGauge: relaxGauge >= 100 ? 100 : relaxGauge,
            oriRelaxGauge: relaxGauge >= 100 ? 100 : relaxGauge,
            check: getResetCheckArr(todo.contents),
        };

        return resetTodoData;
    };

    const getCheckCounts = (checkArr: number[]): number => {
        return checkArr.reduce((count, num) => (num === 1 ? count + 1 : count), 0);
    };

    const calcReset = () => {
        const now = DateTime.now();

        const lastVisitTimeStamp = localStorage.getItem('datetime')
            ? localStorage.getItem('datetime')
            : now.toFormat('X');
        const lastVisitDate = DateTime.fromISO(DateTime.fromSeconds(Number(lastVisitTimeStamp)).toISO());
        const lastVisitDateHour = lastVisitDate.toFormat('HH');

        const resetDateTime =
            Number(lastVisitDateHour) < 6
                ? DateTime.fromISO(lastVisitDate.toFormat('yyyy-LL-dd')).plus({
                      hours: 6,
                  })
                : DateTime.fromISO(lastVisitDate.toFormat('yyyy-LL-dd')).plus({
                      days: 1,
                      hours: 6,
                  });

        const { days: dayDiff } = now.diff(resetDateTime, 'days');

        dayDiff && dayDiff > 0 && resetTodo({ dayDiff: dayDiff, lastVisitDate: lastVisitDate });

        localStorage.setItem('datetime', now.toFormat('X'));
    };

    const resetTodo = ({ dayDiff, lastVisitDate }: { dayDiff: number; lastVisitDate: DateTime }) => {
        resetDailyTodoRelax(Math.ceil(dayDiff));

        const now = DateTime.now();

        const lastVisitStartOfWeek = lastVisitDate.startOf('week');
        const lastVisitWendsdaySixHour = lastVisitStartOfWeek.plus({ days: 2, hours: 6, minutes: 0 });
        const resetWeekDate =
            lastVisitWendsdaySixHour < lastVisitDate
                ? lastVisitWendsdaySixHour.plus({ days: 7 })
                : lastVisitWendsdaySixHour;

        const nowStartOfWeek = now.startOf('week');
        const nowWendsdaySixHour = nowStartOfWeek.plus({ days: 2, hours: 6, minutes: 0 });
        const resetWeekDateNow = nowWendsdaySixHour < now ? nowWendsdaySixHour.plus({ days: 7 }) : nowWendsdaySixHour;

        resetWeekDate < resetWeekDateNow && resetWeeklyTodo();
    };

    const resetFold = () => {
        responsiveWidth.smallPhone < windowWidth! && setIsFold(false);
    };

    const onContextMenuBasicModal = ({ e, modal, title, width, height }: IContextModal) => {
        e && e.preventDefault();
        setModalProps({
            isOpen: true,
            content: modal,
            options: { width: width, height: height, headerTitle: title },
        });
    };

    const showGuide = () => {
        setModalProps({
            isOpen: true,
            content: <Guide />,
            options: { width: '700', height: '500', headerTitle: '가이드', isHeaderClose: true },
        });
    };
    return (
        <MainContainer>
            <NextSeo
                title="MyLoa - 로스트아크 숙제 관리"
                description="로스트 아크 숙제 관리 페이지입니다."
                openGraph={{
                    title: 'MyLoa - 로스트아크 숙제 관리',
                    description: '로스트 아크 숙제 관리 페이지입니다.',
                    url: 'https://myloatest.herokuapp.com/Todo',
                    locale: 'ko_KR',
                    type: 'website',
                    images: [
                        {
                            url: 'https://myloatest.herokuapp.com/profile_image.png',
                            width: 1200,
                            height: 1200,
                            type: 'image/png',
                        },
                    ],
                }}
            />
            <section>
                <HideButtonContainer isFold={isFold}>
                    <HideButtonSection onClick={() => setIsFold(!isFold)}>
                        버튼
                        {isFold ? (
                            <>
                                <span>&nbsp;보이기</span>
                                <DownArrow fill={theme.colors.text} width="25" height="25" />
                            </>
                        ) : (
                            <>
                                <span>&nbsp;숨기기</span>
                                <UpArrow fill={theme.colors.text} width="25" height="25" />
                            </>
                        )}
                    </HideButtonSection>
                </HideButtonContainer>
                <TodoButtons isFold={isFold}>
                    <ButtonLeftArticle>
                        <AddButton
                            type="button"
                            icon={<PlusIcon fill={theme.button.color} width="15" height="15" />}
                            onClick={e =>
                                onContextMenuBasicModal({
                                    e: e,
                                    modal: <TodoAdd />,
                                    title: '숙제 추가',
                                    width: '600',
                                    height: '850',
                                })
                            }
                        >
                            숙제
                        </AddButton>
                        <AddButton
                            isRight={true}
                            type="button"
                            icon={<PlusIcon fill={theme.button.color} width="15" height="15" />}
                            onClick={e =>
                                onContextMenuBasicModal({
                                    e: e,
                                    modal: <LineAdd />,
                                    title: '구분선 추가',
                                    width: '360',
                                    height: '290',
                                })
                            }
                        >
                            구분선
                        </AddButton>
                    </ButtonLeftArticle>
                    <FlexArticle>
                        <AddButton
                            type="button"
                            onClick={e =>
                                onContextMenuBasicModal({
                                    e: e,
                                    modal: <CharacterOrdChange />,
                                    title: '캐릭터 순서 변경',
                                    width: '300',
                                    height: storedCharacterOrd.length < 5 ? '450' : '600',
                                })
                            }
                        >
                            캐릭터 순서 변경
                        </AddButton>
                        <AddButton
                            isRight={true}
                            type="button"
                            icon={<PlusIcon fill={theme.button.color} width="15" height="15" />}
                            onClick={e =>
                                onContextMenuBasicModal({
                                    e: e,
                                    modal: <CharacterAdd />,
                                    title: '캐릭터 추가',
                                    width: '470',
                                    height: '420',
                                })
                            }
                        >
                            캐릭터
                        </AddButton>
                    </FlexArticle>
                </TodoButtons>
                <TodoContentsSection>
                    {storedCharacter.length > 0 && <Pagination />}
                    <Character onContextMenuBasicModal={onContextMenuBasicModal} />
                    <Todo onContextMenuBasicModal={onContextMenuBasicModal} />
                </TodoContentsSection>
            </section>
        </MainContainer>
    );
};

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    width: 88%;
    margin-top: 1.2vh;

    ${widthMedia.tablet} {
        margin-top: 2.8vh;
    }

    ${widthMedia.phone} {
        width: 95%;
    }
`;

const TodoContentsSection = styled.section`
    background: ${props => props.theme.colors.mainInner};
    padding: 1em 1.5em 1.5em 1.5em;
    border-radius: 1em;
    box-sizing: border-box;
`;

const HideButtonContainer = styled.header<{ isFold: boolean }>`
    display: none;
    ${widthMedia.smallPhone} {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: end;
        align-items: center;
        margin-bottom: 1.2em;
        justify-content: space-between;
    }
`;
const HideButtonSection = styled.section`
    display: flex;
    align-items: center;
    padding-right: 0.5em;
`;

const TodoButtons = styled.header<{ isFold: boolean }>`
    display: flex;
    width: 100%;
    height: 100%;
    margin-bottom: 1.1em;
    margin-top: 0.3em;
    box-sizing: border-box;
    justify-content: space-between;

    ${widthMedia.smallPhone} {
        flex-direction: column;
    }

    ${props => props.isFold && 'display:none'};
`;

const AddButton = styled(Button)<{ isRight?: boolean }>`
    ${props => props.isRight && `margin-left: 1em`};

    ${widthMedia.smallPhone} {
        width: 100%;
        margin: 0;
        justify-content: center;
        margin-bottom: 0.5em;
    }
`;

const ButtonLeftArticle = styled(FlexArticle)`
    ${widthMedia.smallPhone} {
        flex-direction: column;
    }
`;

const HideGuideArticle = styled(FlexArticle)`
    display: none;
    ${widthMedia.smallPhone} {
        display: flex;
        padding-left: 1em;
    }
`;

export default Main;
