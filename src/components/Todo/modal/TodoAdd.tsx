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
import {
    ContentsDiv,
    ContentsDivTitle,
    FormButtonContainer,
    FormContainer,
    FormDivContainer,
} from '@style/common/modal';

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
            return { id: character.id, check: 0, relaxGauge: 0, oriRelaxGauge: 0, hide: false };
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
        <FormContainer>
            <FormDivContainer>
                <FlexDiv direction="column">
                    <ContentsDivTitle>숙제 유형</ContentsDivTitle>
                    <ContentsDiv>
                        <SmallTitleDiv>체크박스형</SmallTitleDiv>
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
                    </ContentsDiv>
                    <ContentsDiv>
                        <SmallTitleDiv>텍스트형</SmallTitleDiv>
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
                        <ContentsDivTitle>컨텐츠</ContentsDivTitle>
                        <ContentsDiv>
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
                            <RadioButton
                                text="일반(초기화O)"
                                name="contents"
                                value="basicReset"
                                onChange={() => setContents('basicReset')}
                                checked={contents === 'basicReset'}
                            />
                            <RadioButton
                                text="일반(초기화X)"
                                name="contents"
                                value="basic"
                                onChange={() => setContents('basic')}
                                checked={contents === 'basic'}
                            />
                        </ContentsDiv>
                    </FlexDiv>
                )}
                <FlexDiv direction="column">
                    <ContentsDivTitle>숙제 명</ContentsDivTitle>
                    <ContentsDiv>
                        <TextBox width="100" placeholder="숙제 이름 입력 (e.g. 비아키스)" {...bindName} />
                    </ContentsDiv>
                </FlexDiv>
                <FlexDiv direction="column">
                    <ContentsDivTitle>색상</ContentsDivTitle>
                    <ContentsDiv>
                        <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                    </ContentsDiv>
                </FlexDiv>
            </FormDivContainer>

            <FormButtonContainer>
                <Button onClick={onClickAdd}>추가</Button>
                <Button onClick={() => closeModal()}>닫기</Button>
            </FormButtonContainer>
        </FormContainer>
    );
};

const SmallTitleDiv = styled.div`
    margin-left: 0.7em;
    margin-right: 0.5em;
`;

export default Todo;
