import React, { InputHTMLAttributes, useContext, useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';

import { ICharacterTodo, ITodo, ITodoCheck } from '../TodoType';
import { ScheduleType } from 'common/types';
import Checkbox from '@components/Input/Checkbox';
import { FlexDiv } from '@style/common';
import styled from '@emotion/styled';
import TextBox from '@components/Input/TextBox';
import { css, useTheme } from '@emotion/react';
import { useCheckbox } from '@hooks/useCheckbox';
import {
    ContentsDiv,
    ContentsDivTitle,
    FormButtonContainer,
    FormContainer,
    FormDivContainer,
} from '@style/common/modal';

const TodoCheck = ({
    id: characterId,
    check: oriCheck,
    relaxGauge: oriRelax,
    memo: oriMemo,
    text: oriText,
    checkType,
    todoId,
    todoType: oriTodoType,
    todoContents,
    hide: oriHide,
}: ITodoCheck) => {
    const theme = useTheme();

    const { closeModal } = useContext(ModalActionContext);
    const [storageTodo, setStorageTodo] = useTodo();
    const [hide, bindHide] = useCheckbox(oriHide);

    const [todoType, setTodoType] = useState<ScheduleType>(oriTodoType);
    const [relaxGauge, bindRelaxGauge] = useInput<number>(oriRelax, { maxLength: 3, numberOnly: true });
    const [text, bindText] = useInput<string>(oriText || '');
    const [memo, bindMemo] = useInput<string>(oriMemo || '');

    useEffect(() => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const index = todoArr.findIndex((obj: ITodo) => obj.id === todoId);

        setTodoType(todoArr[index].type);
    }, []);

    const onClickEdit = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const newTodo: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                if (todo.id !== todoId || character.id !== characterId) return character;

                const resetTodoData: ICharacterTodo = {
                    ...character,
                    check: relaxGauge !== character.oriRelaxGauge ? 0 : character.check,
                    relaxGauge: relaxGauge,
                    oriRelaxGauge: relaxGauge,
                    memo: memo,
                    hide: hide,
                };

                return resetTodoData;
            });
            return todo;
        });

        setStorageTodo(JSON.stringify(newTodo));

        closeModal();
    };

    return (
        <FormContainer>
            {todoType === 'daily' && (todoContents === 'chaos' || todoContents === 'epona') && (
                <RemarkDiv>* 휴식게이지 수동 입력 시 수행횟수는 초기화 됩니다.</RemarkDiv>
            )}
            <FormDivContainer>
                {checkType === 'text' ? (
                    <FlexDiv direction="column">
                        <ContentsDivTitle>텍스트</ContentsDivTitle>
                        <ContentsDiv>
                            <TextBox {...bindText} />
                        </ContentsDiv>
                    </FlexDiv>
                ) : (
                    todoType === 'daily' &&
                    (todoContents === 'chaos' || todoContents === 'epona') && (
                        <FlexDiv direction="column">
                            <ContentsDivTitle
                                css={css`
                                    color: ${theme.colors.relax};
                                `}
                            >
                                휴식 게이지
                            </ContentsDivTitle>
                            <ContentsDiv>
                                <TextBox {...bindRelaxGauge} />
                            </ContentsDiv>
                        </FlexDiv>
                    )
                )}

                <FlexDiv direction="column">
                    <ContentsDivTitle>메모</ContentsDivTitle>
                    <ContentsDiv>
                        <TextBox {...bindMemo} />
                    </ContentsDiv>
                </FlexDiv>
                <FlexDiv>
                    <ContentsDivTitle
                        css={css`
                            margin-bottom: 0;
                            flex-basis: 10%;
                        `}
                    >
                        숨김
                    </ContentsDivTitle>
                    <ContentsDiv
                        css={css`
                            flex-basis: 90%;
                        `}
                    >
                        <Checkbox transition={false} checkColor="black" shape="square" {...bindHide} />
                    </ContentsDiv>
                </FlexDiv>
            </FormDivContainer>
            <FormButtonContainer>
                <Button onClick={onClickEdit}>수정</Button>
                <Button onClick={() => closeModal()}>닫기</Button>
            </FormButtonContainer>
        </FormContainer>
    );
};

const RemarkDiv = styled(FlexDiv)`
    justify-content: flex-end;
    color: ${props => props.theme.colors.translucent};
`;

export default TodoCheck;
