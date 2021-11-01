import Button from '@components/Button/Button';
import { ModalActionContext } from '@context/ModalContext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import React, { useContext } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import CharacterAdd from './CharacterAdd';
import CharacterEdit from './CharacterEdit';
import { ICharacter } from './CharacterType';

interface ICharacterParam {
    onContextMenuBasicModal: (
        e: React.MouseEvent<HTMLElement>,
        modal: JSX.Element,
        width?: string,
        height?: string,
    ) => void;
}

const Character = ({ onContextMenuBasicModal }: ICharacterParam) => {
    const [storageCharacter] = useCharacter();
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();

    const { setModalProps } = useContext(ModalActionContext);

    const onDragEndCharacter = (result: DropResult) => {
        // source : drag 시작 위치
        // destination : drag 목적지
        const { destination, source, draggableId } = result;

        // dnd를 도중에 멈췄으므로(올바른 droppable 위에 두지 않았으므로) 그냥 리턴
        if (!destination) {
            return;
        }

        // 같은 자리에 가져다 두었다면 그냥 리턴
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        characterSortOrd(Array.from<number>(JSON.parse(storageCharacterOrd)), source.index, destination.index);
    };

    const characterSortOrd = (array: number[], start: number, destination: number) => {
        setStorageCharacterOrd(JSON.stringify(sortOrd(array, start, destination)));
    };

    const sortOrd = (array: number[], start: number, destination: number) => {
        const newArr = [...array];
        const [reorderedItem] = newArr.splice(start, 1);
        newArr.splice(destination, 0, reorderedItem);

        return newArr;
    };
    return (
        <>
            <DragDropContext onDragEnd={onDragEndCharacter}>
                <Droppable droppableId="CharacterDrop" direction="horizontal">
                    {provided => (
                        <CharacterDropDiv>
                            <CharacterContainer {...provided.droppableProps} ref={provided.innerRef}>
                                {(JSON.parse(storageCharacter) as ICharacter[])
                                    .sort((a, b) => {
                                        return (
                                            (JSON.parse(storageCharacterOrd) as number[]).indexOf(a.id) -
                                            (JSON.parse(storageCharacterOrd) as number[]).indexOf(b.id)
                                        );
                                    })
                                    .map((char: ICharacter, charIndex: number) => {
                                        return (
                                            <Draggable key={char.id} draggableId={String(char.id)} index={charIndex}>
                                                {provided => (
                                                    <CharacterDiv
                                                        key={charIndex}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        onContextMenu={e =>
                                                            onContextMenuBasicModal(
                                                                e,
                                                                <CharacterEdit id={char.id} name={char.name} />,
                                                            )
                                                        }
                                                    >
                                                        {char.name}
                                                    </CharacterDiv>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                {provided.placeholder}
                                <Button type="button" onClick={e => onContextMenuBasicModal(e, <CharacterAdd />)}>
                                    캐릭터 추가
                                </Button>
                            </CharacterContainer>
                        </CharacterDropDiv>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

const CharacterContainer = styled.div`
    display: flex;
`;

const CharacterDiv = styled.div`
    display: flex;
`;

const CharacterDropDiv = styled.div`
    width: 100%;
    border-bottom: 1px solid white;
    padding-bottom: 1em;
    margin-bottom: 1em;
`;

export default Character;
