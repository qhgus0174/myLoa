import { ModalActionContext } from '@context/ModalContext';
import { css } from '@emotion/react';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import React, { useContext } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import CharacterEdit from './CharacterEdit';
import { ICharacter } from './CharacterType';

interface ICharacterParam {
    onContextMenuBasicModal: (
        e: React.MouseEvent<HTMLDivElement>,
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
                        <div
                            css={css`
                                display: flex;
                                margin-left: 5em;
                            `}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
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
                                                <div
                                                    key={charIndex}
                                                    css={css`
                                                        margin-right: 2em;
                                                        border: 1px solid black;
                                                    `}
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
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default Character;
