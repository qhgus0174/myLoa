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

    const { closeModal } = useContext(ModalActionContext);

    const [color, setColor] = useState<string>('#ffffff');

    const [characterName, bindCharacterName] = useInput<string>(newName);

    const onClickEdit = () => {
        const characterArr: ICharacter[] = JSON.parse(character);

        const index = characterArr.findIndex((obj: ICharacter) => obj.id === oriId);

        let newCharacterArr = [...characterArr];

        newCharacterArr[index] = { ...newCharacterArr[index], name: characterName, color: color };

        setCharacter(JSON.stringify(newCharacterArr));

        closeModal();
    };

    const onClickDelete = () => {
        deleteCharacter();
        deleteTodo();
        setPage();

        closeModal();
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
        <FormContainer basis="100" height="100" direction="column">
            <FormDivContainer basis="90" direction="column">
                <FlexDiv direction="column">
                    <ContentsDivTitle basis="50">캐릭터명</ContentsDivTitle>
                    <ContentsDiv basis="50">
                        <TextBox {...bindCharacterName} />
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
                <FlexDiv width="100">
                    <Button onClick={onClickDelete}>삭제</Button>
                </FlexDiv>
                <RightButtonDiv width="100">
                    <Button onClick={onClickEdit}>수정</Button>
                    <Button onClick={() => closeModal()}>닫기</Button>
                </RightButtonDiv>
            </FormButtonContainer>
        </FormContainer>
    );
};

const RightButtonDiv = styled(FlexDiv)`
    justify-content: flex-end;

    button:nth-child(2) {
        margin-left: 1em;
    }
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

const InfoDiv = styled(FlexDiv)`
    box-sizing: border-box;
    background: ${props => props.theme.colors.hoverGray};
    padding: 1em;
    border-radius: 1em;
    justify-content: center;
`;
export default CharacterEdit;
