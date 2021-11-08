import React, { useContext, useState } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import { useCheckbox } from '@hooks/useCheckbox';
import { useInput } from '@hooks/useInput';
import useTodo from '@hooks/storage/useTodo';
import { ICharacterTodo, ITodo, ITodoCheck } from '@components/Todo/TodoType';
import EditButtonContainer from '@components/Container/Button/Edit';
import Checkbox from '@components/Input/Checkbox';
import TextBox from '@components/Input/TextBox';
import { ScheduleType } from '@common/types';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ContentsDiv, ContentsDivTitle, FormContainer, FormDivContainer } from '@style/common/modal';
import { FlexDiv } from '@style/common';

const TodoCheck = ({
    id: characterId,
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

    const [storageTodo, setStorageTodo] = useTodo();

    const { closeModal } = useContext(ModalActionContext);

    const [hide, bindHide] = useCheckbox(oriHide);

    const [todoType] = useState<ScheduleType>(oriTodoType);

    const [relaxGauge, bindRelaxGauge] = useInput<number>(oriRelax, { maxLength: 3, numberOnly: true });
    const [text, bindText] = useInput<string>(oriText || '');
    const [memo, bindMemo] = useInput<string>(oriMemo || '');

    const onClickEdit = () => {
        editTodoCheck();
        closeModal();
    };

    const editTodoCheck = () => {
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
    };

    return (
        <FormContainer>
            {todoType === 'daily' && ['chaos', 'epona'].includes(todoContents) && (
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
                    ['chaos', 'epona'].includes(todoContents) && (
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
                    <HideDivTitle>숨김</HideDivTitle>
                    <HideDivContents>
                        <Checkbox transition={false} checkColor="black" shape="square" {...bindHide} />
                    </HideDivContents>
                </FlexDiv>
            </FormDivContainer>
            <EditButtonContainer onClickEdit={onClickEdit} />
        </FormContainer>
    );
};

const RemarkDiv = styled(FlexDiv)`
    justify-content: flex-end;
    color: ${props => props.theme.colors.translucent};
`;

const HideDivTitle = styled(ContentsDivTitle)`
    margin-bottom: 0;
    flex-basis: 10%;
`;

const HideDivContents = styled(ContentsDivTitle)`
    flex-basis: 90%;
`;

export default TodoCheck;
