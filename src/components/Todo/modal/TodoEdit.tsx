import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useCharacter from '@hooks/storage/useCharacter';
import { ITodo, ICharacterTodo } from '../TodoType';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from 'common/types';
import _ from 'lodash';
import Checkbox from '@components/Input/Checkbox';
import { ColorResult, CompactPicker } from 'react-color';
import { FlexDiv } from '@style/common';
import styled from '@emotion/styled';
import RadioButton from '@components/Input/Radio';
import { css } from '@emotion/react';
import {
    ContentsDiv,
    ContentsDivTitle,
    FormButtonContainer,
    FormContainer,
    FormDivContainer,
    RightButtonDiv,
} from '@style/common/modal';

const TodoEdit = ({
    id: oriId,
    name: newName,
    type: newType,
    contents: newContents,
    checkType: newCheckType,
    color: newColor,
}: Omit<ITodo, 'character'>) => {
    const [type, setType] = useState<ScheduleType>(newType);
    const [contents, setContents] = useState<ScheduleContents>(newContents);
    const [checkType, setCheckType] = useState<ScheduleCheckType>(newCheckType);
    const [color, setColor] = useState<string>(newColor);

    const [name, bindName] = useInput<string>(newName);

    const { closeModal } = useContext(ModalActionContext);

    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const index = todoArr.findIndex((obj: ITodo) => obj.id === oriId);

        let newTodoArr = [...todoArr];
        newTodoArr[index] = {
            ...newTodoArr[index],
            name: name,
            type: type,
            contents: contents,
            checkType: checkType,
            color: color,
        };

        setStorageTodo(JSON.stringify(newTodoArr));

        closeModal();
    };

    const onClickDelete = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const resultArray = _.reject(todoArr, (todo: ITodo) => {
            return todo.id === oriId;
        });
        setStorageTodo(JSON.stringify(resultArray));

        const todoArrOrd: number[] = JSON.parse(storageTodoOrd);
        const resultOrd = _.reject(todoArrOrd, (ord: number) => {
            return ord === oriId;
        });
        setStorageTodoOrd(JSON.stringify(resultOrd));

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
                    <ContentsDivTitle>숙제</ContentsDivTitle>
                    <ContentsDiv>
                        <TextBox {...bindName} />
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
                <FlexDiv width="100">
                    <Button onClick={onClickDelete}>삭제</Button>
                </FlexDiv>
                <RightButtonDiv>
                    <Button onClick={onClickAdd}>수정</Button>
                    <Button onClick={() => closeModal()}>닫기</Button>
                </RightButtonDiv>
            </FormButtonContainer>
        </FormContainer>
    );
};

const SmallTitleDiv = styled.div`
    margin-left: 0.7em;
    margin-right: 0.5em;
`;

export default TodoEdit;
