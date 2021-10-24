import React, { useContext, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { css } from '@emotion/react';
import { ModalActionContext } from '@context/ModalContext';
import Character, { ICharacter } from '@components/Add/Character';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import Todo, { ICharacterTodo, ITodo } from '@components/Add/Todo';
import useTodo from '@hooks/storage/useTodo';
import useTodoOrd from '@hooks/storage/useTodoOrd';

const Main = () => {
    const [storageCharacter] = useCharacter();
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();
    const [storageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const { setModalProps } = useContext(ModalActionContext);

    useEffect(() => {
        const getUserData = async () => {
            const { data }: AxiosResponse<string> = await axios.get(
                'https://cors-anywhere.herokuapp.com/https://lostark.game.onstove.com/Profile/Character/%ED%82%A4%EC%B9%9C%ED%83%80%EC%98%AC%EB%BD%91%EB%8A%94%EC%82%AC%EB%9E%8C',
            );
            const $ = load(data);
            const job = $('.profile-character-info__img').attr('alt');
            const characterLevel = $('.profile-character-info__lv').text();
            const itemLevel = $('.level-info2__expedition>span:nth-child(2)').text();
        };
    }, []);

    const onClick = (type: string) => {
        setModalProps({
            isOpen: true,
            type: 'basic',
            content: type === 'character' ? <Character /> : <Todo />,
            options: { width: '30', height: '50' },
        });
    };

    const onDragEnd = (result: DropResult) => {
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

        const items = Array.from(JSON.parse(storageCharacterOrd));
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setStorageCharacterOrd(JSON.stringify(items));
    };

    return (
        <>
            <div
                css={css`
                    display: flex;
                    margin-left: 5em;
                `}
            >
                <button type="button" onClick={() => onClick('character')}>
                    캐릭터 추가
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
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
                                .map((char: ICharacter, index: number) => {
                                    return (
                                        <Draggable key={char.id} draggableId={String(char.id)} index={index}>
                                            {provided => (
                                                <div
                                                    key={index}
                                                    css={css`
                                                        margin-right: 2em;
                                                        border: 1px solid black;
                                                    `}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
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
            {(JSON.parse(storageTodo) as ITodo[]).map((todo: ITodo, index: number) => {
                return (
                    <div
                        key={index}
                        css={css`
                            display: flex;
                        `}
                    >
                        <div>{todo.name}</div>
                        <div>
                            {todo.character
                                ?.sort((a, b) => {
                                    return (
                                        (JSON.parse(storageCharacterOrd) as number[]).indexOf(a.id) -
                                        (JSON.parse(storageCharacterOrd) as number[]).indexOf(b.id)
                                    );
                                })
                                .map((char: ICharacterTodo, index: number) => {
                                    const isChecked = char.check === 1 ? true : false;

                                    return (
                                        <>
                                            {todo.checkType == '1' ? (
                                                <input type="checkbox" checked={isChecked} />
                                            ) : (
                                                <span></span>
                                            )}
                                        </>
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
            <button type="button" onClick={() => onClick('todo')}>
                할 일 추가
            </button>
        </>
    );
};

export default Main;
