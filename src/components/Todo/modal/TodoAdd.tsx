import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useCharacter from '@hooks/storage/useCharacter';

import { ITodo, ICharacterTodo } from '../TodoType';
import { ICharacter } from '@components/Character/CharacterType';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from 'common/types';

import { ColorResult, CompactPicker } from 'react-color';
import LabelTextBox from '@components/Input/LabelTextBox';
import TextBox from '@components/Input/TextBox';
import RadioButton from '@components/Input/Radio';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { css } from '@emotion/react';

const Todo = () => {
    const [type, setType] = useState<ScheduleType>('daily');
    const [contents, setContents] = useState<ScheduleContents>('chaos');
    const [checkType, setCheckType] = useState<ScheduleCheckType>('check');

    const { closeModal } = useContext(ModalActionContext);

    const [name, bindName] = useInput<string>('');

    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();
    const [storageCharacter] = useCharacter();

    const [color, setColor] = useState<string>('#ffffff');

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const todoOrdArr: number[] = JSON.parse(storageTodoOrd);

        const maxValueId = Math.max(...todoArr.map(o => o.id), 0);

        const todoId = todoArr.length == 0 ? 0 : maxValueId + 1;

        const characterArr: ICharacter[] = JSON.parse(storageCharacter);

        const characters: ICharacterTodo[] = characterArr.map((character: ICharacter) => {
            return { id: character.id, check: 0, relaxGauge: 0, oriRelaxGauge: 0 };
        });

        const todoInfo: ITodo = {
            id: todoId,
            name: name,
            type: type,
            contents: contents,
            checkType: checkType,
            color: color,
            character: characters,
        };

        todoArr.push(todoInfo);
        setStorageTodo(JSON.stringify(todoArr));

        todoOrdArr.push(todoId);
        setStorageTodoOrd(JSON.stringify(todoOrdArr));

        closeModal();
    };

    return (
        <FormContainer basis="100" height="100" direction="column">
            <FormDivContainer basis="90" direction="column">
                <FlexDiv direction="column">
                    <ContentsDivTitle basis="50">유형</ContentsDivTitle>
                    <ContentsDiv basis="50">
                        <RadioButton
                            text="일일"
                            name="type"
                            value="daily"
                            onChange={() => {
                                setType('daily');
                                setContents('chaos');
                                setCheckType('check');
                            }}
                            checked={type === 'daily'}
                        />
                        <RadioButton
                            text="주간"
                            name="type"
                            value="weekly"
                            onChange={() => {
                                setType('weekly');
                                setContents('none');
                                setCheckType('check');
                            }}
                            checked={type === 'weekly'}
                        />
                        <RadioButton
                            text="텍스트"
                            name="type"
                            value="other"
                            onChange={() => {
                                setType('other');
                                setContents('none');
                                setCheckType('text');
                            }}
                            checked={type === 'other'}
                        />
                    </ContentsDiv>
                </FlexDiv>
                {type === 'daily' && (
                    <FlexDiv direction="column">
                        <ContentsDivTitle basis="50">컨텐츠</ContentsDivTitle>
                        <ContentsDiv basis="50">
                            <RadioButton
                                text="카던/가디언"
                                name="contents"
                                value="chaos"
                                onChange={() => setContents('chaos')}
                                checked={contents === 'chaos'}
                            />
                            <RadioButton
                                text="에포나"
                                name="contents"
                                value="epona"
                                onChange={() => setContents('epona')}
                                checked={contents === 'epona'}
                            />
                        </ContentsDiv>
                    </FlexDiv>
                )}
                <FlexDiv direction="column">
                    <ContentsDivTitle basis="50">할 일</ContentsDivTitle>
                    <ContentsDiv basis="50">
                        <TextBox width="100" placeholder="할 일 입력 (e.g. 비아키스)" {...bindName} />
                    </ContentsDiv>
                </FlexDiv>
                <FlexDiv direction="column">
                    <ContentsDivTitle basis="50">색상</ContentsDivTitle>
                    <ContentsDiv basis="50">
                        <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                    </ContentsDiv>
                </FlexDiv>
            </FormDivContainer>

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

export default Todo;
