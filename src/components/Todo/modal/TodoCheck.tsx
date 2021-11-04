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

const TodoCheck = ({
    id: characterId,
    check: oriCheck,
    relaxGauge: oriRelax,
    memo: oriMemo,
    text: oriText,
    checkType,
    todoId,
    todoType: oriTodoType,
}: ITodoCheck) => {
    const { closeModal } = useContext(ModalActionContext);

    const [storageTodo, setStorageTodo] = useTodo();

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
                    check: 0,
                    relaxGauge: relaxGauge,
                    oriRelaxGauge: relaxGauge,
                    memo: memo,
                };

                return resetTodoData;
            });
            return todo;
        });

        setStorageTodo(JSON.stringify(newTodo));

        closeModal();
    };

    return (
        <FormContainer basis="100" height="100" direction="column">
            <RemarkDiv>* 휴식게이지 수동 입력 시 수행횟수는 초기화 됩니다.</RemarkDiv>
            <FormDivContainer basis="90" direction="column">
                {checkType === 'text' ? (
                    <FlexDiv direction="column">
                        <ContentsDivTitle basis="50">텍스트</ContentsDivTitle>
                        <ContentsDiv basis="50">
                            <TextBox {...bindText} />
                        </ContentsDiv>
                    </FlexDiv>
                ) : (
                    todoType === 'daily' && (
                        <FlexDiv direction="column">
                            <ContentsDivTitle basis="50">휴식 게이지</ContentsDivTitle>
                            <ContentsDiv basis="50">
                                <TextBox {...bindRelaxGauge} />
                            </ContentsDiv>
                        </FlexDiv>
                    )
                )}

                <FlexDiv direction="column">
                    <ContentsDivTitle basis="50">메모</ContentsDivTitle>
                    <ContentsDiv basis="50">
                        <TextBox {...bindMemo} />
                    </ContentsDiv>
                </FlexDiv>
            </FormDivContainer>
            <FormButtonContainer basis="10">
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

const FormContainer = styled(FlexDiv)`
    justify-content: space-between;
`;
const FormButtonContainer = styled(FlexDiv)`
    justify-content: flex-end;
    width: 100%;
    align-items: flex-end;

    button:nth-child(2) {
        margin-left: 1em;
    }
`;

const FormDivContainer = styled(FlexDiv)`
    justify-content: space-evenly;
    margin-top: -1em;
`;

const ContentsDiv = styled(FlexDiv)`
    align-items: center;
`;

const ContentsDivTitle = styled(FlexDiv)`
    align-items: center;
    font-weight: 600;
    box-sizing: border-box;
    margin-bottom: 0.5em;
`;

export default TodoCheck;
