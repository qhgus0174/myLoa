import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useCharacter from '@hooks/storage/useCharacter';

import { ICharacter } from '@components/Character/CharacterType';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from 'common/types';
import { ITodo } from '@components/Todo/TodoType';
import { CompactPicker, ColorResult } from 'react-color';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

const LineAdd = () => {
    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();
    const [color, setColor] = useState<string>('#ffffff');

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const todoOrdArr: number[] = JSON.parse(storageTodoOrd);

        const maxValueId = Math.max(...todoArr.map(o => o.id), 0);
        const todoId = todoArr.length == 0 ? 0 : maxValueId + 1;

        const todoInfo: ITodo = {
            id: todoId,
            name: '',
            type: 'line',
            contents: 'none',
            checkType: 'none',
            color: color,
            character: [],
        };

        todoArr.push(todoInfo);
        setStorageTodo(JSON.stringify(todoArr));

        todoOrdArr.push(todoId);
        setStorageTodoOrd(JSON.stringify(todoOrdArr));

        closeModal();
    };

    const { closeModal } = useContext(ModalActionContext);
    return (
        <FormContainer basis="100" height="100" direction="column">
            <FlexDiv direction="column" basis="90">
                <ContentsDivTitle>색상</ContentsDivTitle>
                <ContentsDiv>
                    <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                </ContentsDiv>
            </FlexDiv>
            <FormButtonContainer basis="10">
                <Button onClick={onClickAdd}>추가</Button>
                <Button onClick={() => closeModal()}>닫기</Button>
            </FormButtonContainer>
        </FormContainer>
    );
};

const FormContainer = styled(FlexDiv)`
    justify-content: space-between;
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

const FormButtonContainer = styled(FlexDiv)`
    justify-content: flex-end;
    width: 100%;
    align-items: flex-end;

    button:nth-child(2) {
        margin-left: 1em;
    }
`;
export default LineAdd;
