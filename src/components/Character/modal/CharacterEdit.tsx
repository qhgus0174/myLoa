import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import { useInput } from '@hooks/useInput';
import useCharacter from '@hooks/storage/useCharacter';
import { ModalActionContext } from '@context/ModalContext';
import TextBox from '@components/Input/TextBox';
import { ICharacter } from '../CharacterType';
import _ from 'lodash';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import useTodo from '@hooks/storage/useTodo';
import { FlexDiv } from '@style/common';
import styled from '@emotion/styled';
import { ColorResult, CompactPicker } from 'react-color';
import { SpinnerContext } from '@context/SpinnerContext';
import { DialogActionContext } from '@context/DialogContext';
import {
    ContentsDiv,
    ContentsDivTitle,
    FormButtonContainer,
    FormContainer,
    FormDivContainer,
    RightButtonDiv,
} from '@style/common/modal';

interface ICharacterEdit {
    id: number;
    name: string;
    perPage: number;
    setCurrentPage: (e: number) => void;
}

const CharacterEdit = ({ id: oriId, name: newName, setCurrentPage, perPage }: ICharacterEdit) => {
    const [character, setCharacter] = useCharacter();
    const [characterOrd, setCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();
    const { setDialogProps } = useContext(DialogActionContext);

    const { closeModal } = useContext(ModalActionContext);
    const { closeDialog } = useContext(DialogActionContext);

    const [color, setColor] = useState<string>('#ffffff');

    const [characterName, bindCharacterName] = useInput<string>(newName);

    const { setSpinnerVisible } = useContext(SpinnerContext);

    const onClickEdit = () => {
        const characterArr: ICharacter[] = JSON.parse(character);

        const index = characterArr.findIndex((obj: ICharacter) => obj.id === oriId);

        let newCharacterArr = [...characterArr];

        newCharacterArr[index] = { ...newCharacterArr[index], name: characterName, color: color };

        setCharacter(JSON.stringify(newCharacterArr));

        closeModal();
    };

    const onClickDelete = () => {
        setDialogProps({
            isOpen: true,
            content: <>데이터를 삭제하시겠습니까?</>,
            options: {
                confirmFn: async () => {
                    setSpinnerVisible(true);

                    await deleteCharacter();
                    await deleteTodo();
                    await setPage();

                    setSpinnerVisible(false);
                    closeDialog();
                    closeModal();
                },
            },
        });
    };

    const setPage = () => {
        const currentPage = Math.ceil(
            JSON.parse(JSON.parse(localStorage.getItem('character') || '[]')).length / perPage,
        );
        setCurrentPage(currentPage);
    };

    const deleteCharacter = () => {
        const characterArr: ICharacter[] = JSON.parse(character);
        const resultArray = _.reject(characterArr, ({ id }: ICharacter) => {
            return id === oriId;
        });
        setCharacter(JSON.stringify(resultArray));

        const characterOrdArr: number[] = JSON.parse(characterOrd);
        const resultOrd = _.reject(characterOrdArr, (ord: number) => {
            return ord === oriId;
        });
        setCharacterOrd(JSON.stringify(resultOrd));
    };

    const deleteTodo = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const deleteResult = todoArr.map((todo: ITodo) => {
            todo.character = _.reject(todo.character, (character: ICharacterTodo) => {
                return character.id === oriId;
            });

            return todo;
        });

        setStorageTodo(JSON.stringify(deleteResult));
    };

    return (
        <FormContainer>
            <FormDivContainer>
                <FlexDiv direction="column">
                    <ContentsDivTitle>캐릭터명</ContentsDivTitle>
                    <ContentsDiv>
                        <TextBox {...bindCharacterName} />
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
                    <Button borderColor="cancel" onClick={onClickDelete}>
                        삭제
                    </Button>
                </FlexDiv>
                <RightButtonDiv>
                    <Button onClick={onClickEdit}>수정</Button>
                    <Button onClick={() => closeModal()}>닫기</Button>
                </RightButtonDiv>
            </FormButtonContainer>
        </FormContainer>
    );
};

export default CharacterEdit;
