import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { LocalStorageStateContext, LocalStorageActionContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import { sortOrd } from '@components/Character/common/functions';
import { ICharacter } from '@components/Character/CharacterType';
import Button from '@components/Button/Button';
import { FormButtonContainer, FormContainer, FormArticleContainer } from '@style/common/modal';
import styled from '@emotion/styled';
import { FlexArticle } from '@style/common';
import { DropResult, DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PagingStateContext } from '@context/PagingContext';

const CharacterOrdChange = () => {
    const { storedCharacter, storedCharacterOrd } = useContext(LocalStorageStateContext);
    const { setStoredCharacterOrd } = useContext(LocalStorageActionContext);

    const { perPage } = useContext(PagingStateContext);

    const [ord, setOrd] = useState<number[]>(storedCharacterOrd);

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
        setStoredCharacterOrd(ord);
        toast.success('캐릭터 순서가 저장되었습니다.');
        closeModal();
    };

    return (
        <FormContainer>
            <FormArticleContainer>
                <FlexArticle direction="row-reverse">페이지당 최대 캐릭터 수 : {perPage}</FlexArticle>
                <DragDropContext onDragEnd={onDragEndCharacter}>
                    <Droppable droppableId="md">
                        {provided => (
                            <FlexArticle direction="column" {...provided.droppableProps} ref={provided.innerRef}>
                                {storedCharacter
                                    .sort((a, b) => {
                                        return ord.indexOf(a.id) - ord.indexOf(b.id);
                                    })
                                    .map((char: ICharacter, charIndex: number) => {
                                        return (
                                            <Draggable key={char.id} draggableId={String(char.id)} index={charIndex}>
                                                {provided => (
                                                    <CharacterOrdArticle
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        color={char.color}
                                                        key={charIndex}
                                                    >
                                                        <CharacterOrdText color={char.color}>
                                                            <span>{charIndex + 1}.</span> <span>{char.name}</span>
                                                        </CharacterOrdText>
                                                    </CharacterOrdArticle>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                {provided.placeholder}
                            </FlexArticle>
                        )}
                    </Droppable>
                </DragDropContext>
            </FormArticleContainer>
            <FormButtonContainer>
                <Button onClick={saveOrd}>저장</Button>
                <Button onClick={closeModal}>닫기</Button>
            </FormButtonContainer>
        </FormContainer>
    );
};

const CharacterOrdText = styled.article<{ color: string }>`
    padding-left: 1.5em;
    span {
        color: ${props => props.color};
    }

    span:nth-of-type(2) {
        margin-left: 1.5em;
    }
`;

const CharacterOrdArticle = styled.article`
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
    article {
        color: ${props => props.color};
    }
`;

export default CharacterOrdChange;