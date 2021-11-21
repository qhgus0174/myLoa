import React, { TouchEvent, useContext } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { PagingActionContext, PagingStateContext } from '@context/PagingContext';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { getStorage } from '@storage/index';
import CharacterEdit from '@components/Character/modal/CharacterEdit';
import { ICharacter } from '@components/Character/CharacterType';
import JobLogo from '@components/Character/JobLogo';
import Button from '@components/Button/Button';
import { IContextModalParam } from '@common/types';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexDiv, FlexLeftDiv, FlexHoverDiv, CharactersDiv } from '@style/common';
import { ReactComponent as LeftArrow } from '@assets/img/left-arrow.svg';
import { ReactComponent as RightArrow } from '@assets/img/right-arrow.svg';
import useTodo from '@hooks/storage/useTodo';

const Character = ({ onContextMenuBasicModal }: IContextModalParam) => {
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();
    const { perPage, currentPage } = useContext(PagingStateContext);
    const { onClickNext, onClickPrev } = useContext(PagingActionContext);
    const theme = useTheme();

    const openCharacterEditModal = ({
        e,
        char,
    }: {
        e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLDivElement>;
        char: ICharacter;
    }) => {
        e.preventDefault();
        onContextMenuBasicModal({
            e: e,
            modal: <CharacterEdit id={char.id} name={char.name} color={char.color} />,
            title: '캐릭터 수정',
            width: '470',
            height: '420',
        });
    };

    const onDragEndCharacter = (result: DropResult) => {
        // source : drag 시작 위치
        // destination : drag 목적지
        const { destination, source } = result;

        // dnd를 도중에 멈췄으므로(올바른 droppable 위에 두지 않았으므로) 그냥 리턴
        if (!destination) return;

        // 같은 자리에 가져다 두었다면 그냥 리턴
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        characterSortOrd(Array.from<number>(getStorage('characterOrd')), source.index, destination.index);
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
                        <DropDiv>
                            <FlexDiv {...provided.droppableProps} ref={provided.innerRef}>
                                <FlexLeftDiv></FlexLeftDiv>
                                <ArrowDiv perPage={perPage}>
                                    <Button
                                        width="100"
                                        border="none"
                                        onClick={onClickPrev}
                                        icon={<LeftArrow width="20px" height="20px" fill={theme.colors.white} />}
                                        iconOnly={true}
                                    />
                                </ArrowDiv>
                                <CharactersDiv length={getStorage('characterOrd').length - (currentPage - 1) * perPage}>
                                    {(getStorage('character') as ICharacter[])
                                        .sort((a, b) => {
                                            return (
                                                (getStorage('characterOrd') as number[]).indexOf(a.id) -
                                                (getStorage('characterOrd') as number[]).indexOf(b.id)
                                            );
                                        })
                                        .slice(
                                            currentPage === 1 ? 0 : (currentPage - 1) * perPage,
                                            currentPage === 1 ? perPage : (currentPage - 1) * perPage + perPage,
                                        )
                                        .map((char: ICharacter, charIndex: number) => {
                                            return (
                                                <Draggable
                                                    key={char.id}
                                                    draggableId={String(char.id)}
                                                    index={charIndex}
                                                >
                                                    {provided => (
                                                        <CharacterDiv
                                                            color={char.color}
                                                            key={charIndex}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) => {
                                                                openCharacterEditModal({ e: e, char: char });
                                                            }}
                                                            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
                                                                openCharacterEditModal({ e: e, char: char });
                                                            }}
                                                        >
                                                            <FlexDiv>
                                                                <JobLogo shape={char.job} />
                                                            </FlexDiv>
                                                            <InfoDiv direction="column">
                                                                <FlexDiv>{char.name}</FlexDiv>
                                                                <FlexDiv>{`Lv. ${char.level}`}</FlexDiv>
                                                            </InfoDiv>
                                                        </CharacterDiv>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                    {provided.placeholder}
                                </CharactersDiv>
                                <ArrowDiv perPage={perPage}>
                                    <Button
                                        width="100"
                                        border="none"
                                        onClick={onClickNext}
                                        icon={<RightArrow width="23px" height="23px" fill={theme.colors.white} />}
                                        iconOnly={true}
                                    />
                                </ArrowDiv>
                            </FlexDiv>
                        </DropDiv>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

const DropDiv = styled.div`
    width: 100%;
    ${props =>
        (getStorage('character').length > 0 || getStorage('todo').length > 0) &&
        `border-bottom: 1px solid ${props.theme.colors.text}`};
    padding-bottom: 0.3em;
    box-sizing: border-box;
`;

const CharacterDiv = styled(FlexHoverDiv)`
    font-weight: 600;
    width: 100%;
    div {
        color: ${props => props.color};
    }
`;

const InfoDiv = styled(FlexDiv)`
    margin-left: 0.8em;
    box-sizing: border-box;
`;

const ArrowDiv = styled.div<{ perPage: number }>`
    visibility: ${props => (getStorage('characterOrd').length < props.perPage + 1 ? `hidden` : `visible`)};
    display: flex;
    flex-basis: 2.5%;
`;

export default Character;
