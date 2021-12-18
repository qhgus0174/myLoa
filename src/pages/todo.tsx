import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import CharacterOrdChange from '@components/Character/modal/CharacterOrdChange';
import { getResetCheckArr } from '@components/Todo/common/functions';
import CharacterAdd from '@components/Character/modal/CharacterAdd';
import { ITodo, ICharacterTodo } from '@common/types/localStorage/Todo';
import Pagination from '@components/Pagination/Pagination';
import TodoAdd from '@components/Todo/modal/TodoAdd';
import DownArrow from '@components/Image/DownArrow';
import PlusIcon from '@components/Image/PlusIcon';
import LineAdd from '@components/Line/LineAdd';
import UpArrow from '@components/Image/UpArrow';
import Button from '@components/Button/Button';
import Character from '@components/Character';
import Todo from '@components/Todo';
import { ScheduleContents } from '@common/types/types';
import { IContextModal } from '@common/types/types';
import { GA } from '@service/ga';
import { NextSeo } from 'next-seo';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { responsiveWidth, widthMedia } from '@style/device';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getShareContents } from '@apis/contents/share';
import { SpinnerContext } from '@context/SpinnerContext';
import { usePromiseEffect } from '@hooks/usePromiseEffect';
import { IShareContents as IShareContentsResponse } from '@common/types/response/contents/share';
import IconLabel from '@components/Label/IconLabel';
import TodoCheckbox from '@components/Input/TodoCheckbox';
import { IShareContents } from '@common/types/localStorage/ShareContents';
import { getCharacterInfoById, groupBy, parseStorageItem, stringifyStorageItem } from '@common/utils';
import { ICharacter } from '@common/types/localStorage/Character';
import Nodata from '@components/article/Nodata';
import { allCharacter, getCrollCharacterInfo } from '@components/Character/common/croll';
import { toast } from 'react-toastify';
import { ILedger, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { useInput } from '@hooks/useInput';
import TextBox from '@components/Input/TextBox';
import { insertErrorDB } from '@common/error';
import Router from 'next/router';
import { PagingActionContext } from '@context/PagingContext';
import { initDayContents, initLedger } from '@hooks/useLocalStorage';

import { CompassInfo } from '@common/data/compass';

export interface IFileterRaidLevel {
    id: string;
    showArr: number[];
}

const Main = () => {
    useEffect(() => GA.trackPageView({ path: window.location.pathname }), []);

    const { setCurrentPage } = useContext(PagingActionContext);
    const { setSpinnerVisible } = useContext(SpinnerContext);
    const { setModalProps } = useContext(ModalActionContext);
    const [activeTab, setActiveTab] = useState<number>(1);

    const { storedTodo, storedCharacter, storedCharacterOrd, storedShareContents, storedDayContents } =
        useContext(LocalStorageStateContext);
    const {
        setStoredTodo,
        setStoredShareContents,
        setStoredCharacter,
        setStoredCharacterOrd,
        setStoredDayContents,
        setStoredLedger,
    } = useContext(LocalStorageActionContext);

    const [isCrollFinish, setIsCrollFinish] = useState<boolean>(true);
    const [isFold, setIsFold] = useState<boolean>(false);
    const [repreCharacter, bindRepreCharacter] = useInput<string>('');
    const { width: windowWidth } = useWindowDimensions();

    const theme = useTheme();
    useEffect(() => {
        resetFold();
    }, [windowWidth]);

    useEffect(() => {
        calcReset();
    }, []);

    const resolePromise = usePromiseEffect(async () => {
        setSpinnerVisible(true);

        !localStorage.getItem('shareDay') && localStorage.setItem('shareDay', stringifyStorageItem(initDayContents()));
        (!localStorage.getItem('share') || parseStorageItem(localStorage.getItem('share') as string).length < 1) &&
            (await initShareContents());

        !localStorage.getItem('ledger') && ledgerInit();
        setSpinnerVisible(false);
    }, []);

    const ledgerInit = () => {
        if (
            !parseStorageItem(localStorage.getItem('character') as string) ||
            parseStorageItem(localStorage.getItem('character') as string).length < 1
        )
            return;

        const commonLedger = initLedger.common;

        const goodsLedger: ILedger['own'] = parseStorageItem(localStorage.getItem('character') as string).map(
            (character: ICharacter) => {
                const charactersLedger: ILedgerOwn = {
                    characterId: character.id,
                    prevWeekGold: [0, 0, 0, 0],
                    histories: { raid: { fold: true, data: [] }, goods: { fold: true, data: [] } },
                };
                return charactersLedger;
            },
        );
        setStoredLedger(Object.assign({}, { common: commonLedger }, { own: goodsLedger }));
    };

    const initShareContents = async () => {
        try {
            setSpinnerVisible(true);
            const shareContents = await getShareContents();
            const initData = shareContents.map(({ id, name, iconurl }) => {
                const result: IShareContents = {
                    id: Number(id),
                    name: name,
                    check: 0,
                    iconurl: iconurl,
                };
                return result;
            }) as unknown as IShareContents[];

            setStoredShareContents(initData);
        } catch (err: unknown) {
            insertErrorDB({ catchErr: err, errType: 'initShare' });
        } finally {
            setSpinnerVisible(false);
        }
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

    const setShareContents = ({ id }: { id: number }) => {
        const shareContens: IShareContents[] = [...storedShareContents];

        const index = storedShareContents.findIndex(({ id: storedId }) => id === storedId);
        shareContens[index].check = 1 - shareContens[index].check;

        setStoredShareContents(shareContens);
    };

    const setDayContents = ({ id }: { id: number }) => {
        const dayContens: IShareContents[] = [...storedDayContents];

        const index = storedDayContents.findIndex(({ id: storedId }) => id === storedId);
        dayContens[index].check = 1 - dayContens[index].check;

        setStoredDayContents(dayContens);
    };

    const crollAllMyCharacter = async () => {
        if (!repreCharacter) {
            toast.error('캐릭터 명을 입력해주세요.');
            return;
        }

        setSpinnerVisible(true);
        setIsCrollFinish(false);

        try {
            const { status, validMsg, data } = await allCharacter(repreCharacter);

            const setCharacterInfo = {
                success: async () => await initAllCharacters(data),
                error: () => toast.error(validMsg || ''),
            };

            setCharacterInfo[status] && (await setCharacterInfo[status]());
        } catch (err: unknown) {
            setSpinnerVisible(false);
            toast.error('캐릭터 정보를 불러올 수 없습니다. 로스트아크 점검시간이 아닌지 확인 해 주세요.');
            insertErrorDB({ catchErr: err, errType: 'croll' });
        }
    };

    const initAllCharacters = async (array: string[]) => {
        let characters: ICharacter[] = [];
        let charactersOrd: number[] = [];
        let ledger: ILedger = initLedger;

        for (let index = 0; index < array.length; index++) {
            const { status, validMsg, crollJob, crollLevel } = await getCrollCharacterInfo(array[index]);

            const setCharacterInfo = {
                success: () =>
                    addCharacter(
                        array[index],
                        crollJob || '',
                        crollLevel || '',
                        index + 1,
                        characters,
                        charactersOrd,
                        ledger,
                    ),
                error: () => toast.error(validMsg || ''),
            };
            setCharacterInfo[status] && setCharacterInfo[status]();
        }

        setStoredCharacter(characters);

        const levelSortArr = characters
            .sort(({ level: beforeLevel }, { level: afterLevel }) => {
                return Number(afterLevel.replaceAll(',', '')) - Number(beforeLevel.replaceAll(',', ''));
            })
            .map(({ id }) => id);

        await initShareContents();
        setStoredCharacterOrd(levelSortArr);
        localStorage.setItem('ledger', stringifyStorageItem(ledger));
    };

    const addCharacter = (
        name: string,
        crollJob: string,
        crollLevel: string,
        characterId: number,
        characters: ICharacter[],
        charactersOrd: number[],
        ledger: ILedger,
    ) => {
        characters.push(addCharacterInfo(name, crollJob, crollLevel, characterId));
        charactersOrd.push(characterId);
        ledger.own.push(setLedger(characterId));
    };

    const setLedger = (characterId: number) => {
        const charactersLedger: ILedgerOwn = {
            characterId: characterId,
            prevWeekGold: [0, 0, 0, 0],
            histories: { raid: { fold: true, data: [] }, goods: { fold: true, data: [] } },
        };
        return charactersLedger;
    };

    const addCharacterInfo = (name: string, crollJob: string, crollLevel: string, characterId: number): ICharacter => {
        const characterInfo: ICharacter = {
            id: characterId,
            name: name,
            level: crollLevel,
            job: crollJob,
            color: theme.colors.text,
            lastSearch: 0,
        };

        return characterInfo;
    };

    const resetDailyTodoRelax = (diffDays: number) => {
        const todoArr: ITodo[] = [...parseStorageItem(localStorage.getItem('todo') as string)];
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

        localStorage.setItem('todo', stringifyStorageItem(calcResult));
    };

    const resetWeeklyTodo = () => {
        localStorage.getItem('todo') && resetTodoWeek();
        localStorage.getItem('share') && resetShareWeek();
    };

    const resetTodoWeek = () => {
        const todoArr: ITodo[] = [...parseStorageItem(localStorage.getItem('todo') as string)];

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                return todo.type === 'weekly' ? resetCheck(todo.contents, character) : character;
            });

            return todo;
        });

        localStorage.setItem('todo', stringifyStorageItem(calcResult));
    };

    const resetShareWeek = () => {
        const shareArr: IShareContents[] = [...parseStorageItem(localStorage.getItem('share') as string)];

        const calcResult: IShareContents[] = shareArr.map((shared: IShareContents) => {
            return { ...shared, check: 0 };
        });

        localStorage.setItem('share', stringifyStorageItem(calcResult));
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
        localStorage.setItem('shareDay', stringifyStorageItem(initDayContents()));

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

    return (
        <>
            <NextSeo
                title="로요일좋아 - 로스트아크 숙제 관리"
                description="로스트 아크 숙제 관리 페이지입니다. 일일, 주간 컨텐츠를 편하게 체크해보세요."
                openGraph={{
                    title: '로요일좋아 - 로스트아크 숙제 관리',
                    description: '로스트 아크 숙제 관리 페이지입니다. 일일, 주간 컨텐츠를 편하게 체크해보세요.',
                    url: 'https://loa-day.com/todo',
                    locale: 'ko_KR',
                    type: 'website',
                    images: [
                        {
                            url: 'https://loa-day.com/static/img/logo/logo.png',
                            width: 1200,
                            height: 1200,
                            type: 'image/png',
                        },
                    ],
                }}
            />
            {storedCharacter.length < 1 ? (
                <Nodata
                    text={
                        <NodataDiv>
                            <NodataInner>
                                <strong>
                                    데이터가 존재하지 않습니다. 보유 캐릭터 중 하나를 입력하여 추가 해보세요!
                                </strong>
                            </NodataInner>
                            <NodataInner>
                                <TextBox
                                    placeholder="캐릭터 명 입력"
                                    width="80"
                                    divWidth="70"
                                    {...bindRepreCharacter}
                                />
                                <Button width="40" className="crollAllCharacter" onClick={crollAllMyCharacter}>
                                    캐릭터 가져오기!😎
                                </Button>
                            </NodataInner>
                        </NodataDiv>
                    }
                />
            ) : (
                resolePromise.status === 'fulfilled' && (
                    <MainContainer>
                        <TabsContainer activetab={activeTab} role="tabs">
                            <TabList role="tablist">
                                <Tab onClick={() => setActiveTab(1)} selected={activeTab == 1} role="tab">
                                    원정대 공유
                                </Tab>
                                <Tab onClick={() => setActiveTab(2)} selected={activeTab == 2} role="tab">
                                    일일 / 주간
                                </Tab>
                            </TabList>
                            <TabPanel role="tabpanel">
                                <WeeklyShare>
                                    <SharedLeftDiv>
                                        <SharedDiv>
                                            <h3>일일</h3>
                                            <SharedInner>
                                                {storedDayContents.map(({ id, name, iconurl, check }, index) => {
                                                    return (
                                                        <ContentsDiv key={index}>
                                                            <LabelDiv>
                                                                <IconLabel label={name} iconUrl={iconurl} />
                                                            </LabelDiv>
                                                            <CheckboxDiv>
                                                                <TodoCheckbox
                                                                    onChange={() => setDayContents({ id: id })}
                                                                    checked={check === 1}
                                                                />
                                                            </CheckboxDiv>
                                                        </ContentsDiv>
                                                    );
                                                })}
                                            </SharedInner>
                                        </SharedDiv>
                                    </SharedLeftDiv>
                                    <SharedRightDiv>
                                        <SharedDiv>
                                            <h3>주간</h3>
                                            <SharedInner>
                                                {storedShareContents.map(({ id, name, iconurl, check }, index) => {
                                                    return (
                                                        <ContentsDiv key={index}>
                                                            <LabelDiv>
                                                                <IconLabel label={name} iconUrl={iconurl} />
                                                            </LabelDiv>
                                                            <CheckboxDiv>
                                                                <TodoCheckbox
                                                                    onChange={() => setShareContents({ id: id })}
                                                                    checked={check === 1}
                                                                />
                                                            </CheckboxDiv>
                                                        </ContentsDiv>
                                                    );
                                                })}
                                            </SharedInner>
                                        </SharedDiv>
                                    </SharedRightDiv>
                                </WeeklyShare>
                            </TabPanel>
                            <TabPanel>
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
                                        <ButtonLeftDiv>
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
                                        </ButtonLeftDiv>
                                        <FlexDiv>
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
                                        </FlexDiv>
                                    </TodoButtons>
                                    <TodoContentsSection>
                                        {storedCharacter.length > 0 && <Pagination />}
                                        <Character onContextMenuBasicModal={onContextMenuBasicModal} />
                                        <Todo onContextMenuBasicModal={onContextMenuBasicModal} />
                                    </TodoContentsSection>
                                </section>
                            </TabPanel>
                        </TabsContainer>
                    </MainContainer>
                )
            )}
        </>
    );
};

const TabsContainer = styled(Tabs)<{ activetab: number }>`
    & > ul {
        display: flex;
        justify-content: center;
        margin-top: 1em;
        margin-bottom: 1.5em;
    }

    & > ul > li {
        cursor: pointer;
        padding-top: 0.7em;
        padding-bottom: 0.7em;
        padding-right: 2.5em;
        padding-left: 2.5em;
        border: 1px solid;
        background: ${props => props.theme.colors.mainInner};
    }
    ${props =>
        props.activetab == 1
            ? `& > ul > li:nth-of-type(2){
        opacity:0.5;
    }`
            : `& > ul > li:nth-of-type(1){
        opacity:0.5;
    }`}
`;

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
    padding: 0.3em 1.5em 1.5em 1.5em;
    border-radius: 0 0 0.8em 0.8em;
    box-sizing: border-box;
    width: 100%;
    ${widthMedia.smallPhone} {
        padding-top: 1em;
        border-radius: 0.8em;
    }
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
    padding: 1.7em;
    box-sizing: border-box;
    justify-content: space-between;
    padding-bottom: 0.7em;
    border-radius: 0.8em 0.8em 0 0;
    background: ${props => props.theme.colors.mainInner};

    ${widthMedia.smallPhone} {
        flex-direction: column;
        padding-top: 0;
        background: transparent;
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

const ButtonLeftDiv = styled(FlexDiv)`
    ${widthMedia.smallPhone} {
        flex-direction: column;
    }
`;

const NodataDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 3em;
    align-items: center;
`;

const NodataInner = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    align-items: center;
`;

const SharedDiv = styled.div`
    display: flex;
    flex-direction: column;
    border-collapse: collapse;
    align-items: center;
    background: ${props => props.theme.colors.mainInner};
    padding: 1em 1.8em 1.5em 1.8em;
    border-radius: 1em;
    box-sizing: border-box;
    width: 90%;
    height: 400px;
    justify-content: space-around;

    h3 {
        font-size: 1.15em;
        text-decoration: underline;
        text-underline-position: under;
    }

    ${widthMedia.tablet} {
        margin-bottom: 1.1em;
    }
`;

const WeeklyShare = styled.article`
    display: flex;
    width: 100%;
    justify-content: center;
    height: 100%;
    margin-top: 2em;

    ${widthMedia.tablet} {
        flex-direction: column;
    }
`;

const SharedRightDiv = styled.div`
    display: flex;
    flex-basis: 35%;
    justify-content: center;
`;

const SharedLeftDiv = styled.div`
    display: flex;
    flex-basis: 35%;
    justify-content: center;
`;

const SharedInner = styled.div`
    padding-bottom: 10px;
    align-items: center;
    width: 80%;
    height: 300px;
`;

const LabelDiv = styled.div`
    flex-basis: 80%;
`;
const CheckboxDiv = styled.div`
    flex-basis: 20%;
`;

const ContentsDiv = styled.div`
    display: flex;
    padding-top: 1em;
    padding-bottom: 1em;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-bottom: 1px dashed ${props => props.theme.colors.scroll};
`;
export default Main;
