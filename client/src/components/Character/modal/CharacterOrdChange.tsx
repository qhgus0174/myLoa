import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ModalActionContext } from '@context/ModalContext';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { sortOrd } from '@components/Character/common/functions';
import { ICharacter } from '@components/Character/CharacterType';
import Button from '@components/Button/Button';
import { FormButtonContainer, FormContainer, FormDivContainer } from '@style/common/modal';
import { getStorage } from '@storage/index';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { DropResult, DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PagingStateContext } from '@context/PagingContext';

const CharacterOrdChange = () => {
    const [storageCharacter, setStorageCharacter] = useCharacter();
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();
    const { perPage } = useContext(PagingStateContext);

    const [ord, setOrd] = useState<number[]>(getStorage('characterOrd'));

    const { closeModal } = useContext(ModalActionContext);

    const onDragEndCharacter = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        characterSortOrd(ord, source.index, destination.index);
    };

    const characterSortOrd = (array: number[], start: number, destination: number) => {
        setOrd(sortOrd(array, start, destination));
    };

    const saveOrd = () => {
        setStorageCharacterOrd(JSON.stringify(ord));
        toast.success('캐릭터 순서가 저장되었습니다.');
        closeModal();
    };

    return (
        <FormContainer>
            <FormDivContainer>
                <FlexDiv direction="row-reverse">페이지당 최대 캐릭터 수 : {perPage}</FlexDiv>
                <DragDropContext onDragEnd={onDragEndCharacter}>
                    <Droppable droppableId="md">
                        {provided => (
                            <FlexDiv direction="column" {...provided.droppableProps} ref={provided.innerRef}>
                                {(getStorage('character') as ICharacter[])
                                    .sort((a, b) => {
                                        return ord.indexOf(a.id) - ord.indexOf(b.id);
                                    })
                                    .map((char: ICharacter, charIndex: number) => {
                                        return (
                                            <Draggable key={char.id} draggableId={String(char.id)} index={charIndex}>
                                                {provided => (
                                                    <CharacterOrdDiv
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        color={char.color}
                                                        key={charIndex}
                                                    >
                                                        <CharacterOrdText color={char.color}>
                                                            <span>{charIndex + 1}.</span> <span>{char.name}</span>
                                                        </CharacterOrdText>
                                                    </CharacterOrdDiv>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                {provided.placeholder}
                            </FlexDiv>
                        )}
                    </Droppable>
                </DragDropContext>
            </FormDivContainer>
            <FormButtonContainer>
                <Button onClick={saveOrd}>저장</Button>
                <Button onClick={closeModal}>닫기</Button>
            </FormButtonContainer>
        </FormContainer>
    );
};

const CharacterOrdText = styled.div<{ color: string }>`
    padding-left: 1.5em;
    span {
        color: ${props => props.color};
    }

    span:nth-of-type(2) {
        margin-left: 1.5em;
    }
`;

const CharacterOrdDiv = styled.div`
    display: flex;
    align-items: center;
    padding-top: 1em;
    padding-bottom: 1em;
    &:hover {
        transition: 200ms ease;
        background: ${props => props.theme.colors.hover};
    }
    font-weight: 600;
    width: 100%;
    div {
        color: ${props => props.color};
    }
`;

export default CharacterOrdChange;
