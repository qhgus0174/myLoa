import React, { useContext, useEffect, useState } from 'react';
import { DateTime, DurationObjectUnits } from 'luxon';
import { ModalActionContext } from '@context/ModalContext';
import useWindowDimensions from '@hooks/useWindowDimensions';
import useTodo from '@hooks/storage/useTodo';
import CharacterAdd from '@components/Character/modal/CharacterAdd';
import { getResetCheckArr } from '@components/Todo/common/functions';
import { ITodo, ICharacterTodo } from '@components/Todo/TodoType';
import Character from '@components/Character';
import TodoAdd from '@components/Todo/modal/TodoAdd';
import LineAdd from '@components/Line/LineAdd';
import Button from '@components/Button/Button';
import Todo from '@components/Todo';
import { ScheduleContents } from '@common/types';
import { IContextModal } from '@common/types';
import { getStorage } from '@storage/index';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { responsiveWidth, widthMedia } from '@style/device';
import { ReactComponent as Plus } from '@assets/img/plus.svg';
import { ReactComponent as ArrowDown } from '@assets/img/arrow-down.svg';
import { ReactComponent as ArrowUp } from '@assets/img/arrow-up.svg';

const Main = () => {
    const { setModalProps } = useContext(ModalActionContext);
    const [isFold, setIsFold] = useState<boolean>(false);
    const { width: windowWidth } = useWindowDimensions();

    const [storageTodo, setStorageTodo] = useTodo();

    const theme = useTheme();

    useEffect(() => {
        resetFold();
    }, [windowWidth]);

    useEffect(() => {
        calcReset();
    }, []);

    const resetDailyTodoRelax = (diffDays: number) => {
        const todoArr: ITodo[] = getStorage('todo');
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

        setStorageTodo(JSON.stringify(calcResult));
    };

    const resetWeeklyTodo = () => {
        const todoArr: ITodo[] = getStorage('todo');

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                return todo.type === 'weekly' ? resetCheck(todo.contents, character) : character;
            });

            return todo;
        });

        setStorageTodo(JSON.stringify(calcResult));
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
        const addGauge = (maxCheckCount - getCheckCounts(character.check)) * 10 * diffDays;

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
        const todayResetDateTime = DateTime.fromISO(now.toFormat('yyyy-LL-dd')).plus({
            hours: 6,
        });
        const { days }: DurationObjectUnits = todayResetDateTime.diff(lastVisitDate, 'days').toObject();
        const dayOfWeek = now.toFormat('c');

        !localStorage.getItem('datetime') && localStorage.setItem('datetime', todayResetDateTime.toFormat('X'));
        days &&
            days > 0 &&
            resetTodo({ days: days, dayOfWeek: dayOfWeek, todayResetDateTime: todayResetDateTime.toFormat('X') });
    };

    const resetTodo = ({
        days,
        dayOfWeek,
        todayResetDateTime,
    }: {
        days: number;
        dayOfWeek: string;
        todayResetDateTime: string;
    }) => {
        localStorage.setItem('datetime', todayResetDateTime);
        resetDailyTodoRelax(Math.ceil(days));
        dayOfWeek === '3' && resetWeeklyTodo();
    };

    const resetFold = () => {
        responsiveWidth.smallPhone < windowWidth && setIsFold(false);
    };

    const onContextMenuBasicModal = ({ e, modal, title, width, height }: IContextModal) => {
        e && e.preventDefault();
        setModalProps({
            isOpen: true,
            content: modal,
            options: { width: width, height: height, headerTitle: title },
        });
    };

    return (
        <MainDiv width="88" direction="column">
            <HideButtonContainer isFold={isFold}>
                <HideButtonDiv onClick={() => setIsFold(!isFold)}>
                    버튼
                    {isFold ? (
                        <>
                            <span>&nbsp;보이기</span>
                            <ArrowDown fill={theme.colors.white} width="25px" height="25px" />
                        </>
                    ) : (
                        <>
                            <span>&nbsp;숨기기</span>
                            <ArrowUp fill={theme.colors.white} width="25px" height="25px" />
                        </>
                    )}
                </HideButtonDiv>
            </HideButtonContainer>
            <TodoButtonDiv height="100" isFold={isFold} width="100">
                <ButtonLeftDiv>
                    <AddButton
                        type="button"
                        icon={<PlusIcon />}
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
                        icon={<PlusIcon />}
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
                        isRight={true}
                        type="button"
                        icon={<PlusIcon />}
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
            </TodoButtonDiv>
            <TodoContentsDiv>
                <Character onContextMenuBasicModal={onContextMenuBasicModal} />
                <Todo onContextMenuBasicModal={onContextMenuBasicModal} />
            </TodoContentsDiv>
        </MainDiv>
    );
};

const MainDiv = styled(FlexDiv)`
    width: 88%;
    ${widthMedia.phone} {
        width: 95%;
    }
    margin-top: 1em;
    margin-bottom: 2em;
`;

const TodoContentsDiv = styled.div`
    background: ${props => props.theme.colors.mainInner};
    padding: 1.5em;
    border-radius: 1em;
    box-sizing: border-box;
`;

const HideButtonContainer = styled.div<{ isFold: boolean }>`
    display: none;
    ${widthMedia.smallPhone} {
        width: 100%;
        display: flex;
        justify-content: end;
        align-items: center;
        margin-bottom: 1em;
    }
`;
const HideButtonDiv = styled.div`
    display: flex;
    align-items: center;
`;

const TodoButtonDiv = styled(FlexDiv)<{ isFold: boolean }>`
    margin-bottom: 1.7em;
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

const ButtonLeftDiv = styled(FlexDiv)`
    ${widthMedia.smallPhone} {
        flex-direction: column;
    }
`;

const PlusIcon = styled(Plus)`
    fill: ${props => props.theme.button.color};
    width: 15px;
    height: 15px;
`;

export default Main;
