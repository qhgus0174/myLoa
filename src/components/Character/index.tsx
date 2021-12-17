import React, { useContext } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTheme } from '@emotion/react';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { PagingActionContext, PagingStateContext } from '@context/PagingContext';
import { sortOrd } from '@components/Character/common/functions';
import CharacterEdit from '@components/Character/modal/CharacterEdit';
import { ICharacter } from '@common/types/localStorage/Character';
import RightArrow from '@components/Image/RightArrow';
import JobLogo from '@components/Character/JobLogo';
import LeftArrow from '@components/Image/LeftArrow';
import Button from '@components/Button/Button';
import { IContextModalParam } from '@common/types/types';
import styled from '@emotion/styled';
import { FlexDiv, FlexLeftDiv, FlexHoverArticle, CharactersDiv } from '@style/common';

interface ICharacterParam extends IContextModalParam {
    type: 'raid' | 'all';
}

const Character = ({ onContextMenuBasicModal, type }: ICharacterParam) => {
    const { perPage, currentPage } = useContext(PagingStateContext);
    const { onClickNext, onClickPrev } = useContext(PagingActionContext);

    const { storedTodo, storedCharacter, storedCharacterOrd, storedRaidCharacterOrd } =
        useContext(LocalStorageStateContext);
    const { setStoredCharacterOrd, setStoredRaidCharacterOrd } = useContext(LocalStorageActionContext);

    const theme = useTheme();

    const openCharacterEditModal = ({
        e,
        char,
    }: {
        e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>;
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

        const ordData = type === 'raid' ? storedRaidCharacterOrd : storedCharacterOrd;

        characterSortOrd(Array.from<number>(ordData), source.index, destination.index);
    };

    const characterSortOrd = (array: number[], start: number, destination: number) => {
        type === 'raid'
            ? setStoredRaidCharacterOrd(sortOrd(array, start, destination))
            : setStoredCharacterOrd(sortOrd(array, start, destination));
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEndCharacter}>
                <Droppable droppableId="CharacterDrop" direction="horizontal">
                    {provided => (
                        <DropCharacterHeader todoLength={storedTodo.length} characterLength={storedCharacter.length}>
                            <FlexDiv {...provided.droppableProps} ref={provided.innerRef}>
                                <FlexLeftDiv></FlexLeftDiv>

                                <ArrowDiv
                                    characterOrd={type === 'raid' ? storedRaidCharacterOrd : storedCharacterOrd}
                                    perPage={perPage}
                                >
                                    <Button
                                        width="100"
                                        border="none"
                                        onClick={onClickPrev}
                                        icon={<LeftArrow fill={theme.colors.white} width="23" height="23" />}
                                        iconOnly={true}
                                    />
                                </ArrowDiv>

                                <CharactersDiv
                                    length={
                                        (type === 'raid' ? storedRaidCharacterOrd : storedCharacterOrd).length -
                                        (currentPage - 1) * perPage
                                    }
                                >
                                    {(storedCharacter as ICharacter[])
                                        .sort((a, b) => {
                                            return (
                                                (
                                                    (type === 'raid'
                                                        ? storedRaidCharacterOrd
                                                        : storedCharacterOrd) as number[]
                                                ).indexOf(a.id) -
                                                (
                                                    (type === 'raid'
                                                        ? storedRaidCharacterOrd
                                                        : storedCharacterOrd) as number[]
                                                ).indexOf(b.id)
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
                                                        <Article
                                                            color={char.color}
                                                            key={charIndex}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            onTouchEnd={(e: React.TouchEvent<HTMLElement>) => {
                                                                openCharacterEditModal({ e: e, char: char });
                                                            }}
                                                            onContextMenu={(e: React.MouseEvent<HTMLElement>) => {
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
                                                        </Article>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                    {provided.placeholder}
                                </CharactersDiv>
                                <ArrowDiv
                                    characterOrd={type === 'raid' ? storedRaidCharacterOrd : storedCharacterOrd}
                                    perPage={perPage}
                                >
                                    <Button
                                        width="100"
                                        border="none"
                                        onClick={onClickNext}
                                        icon={<RightArrow fill={theme.colors.white} width="23" height="23" />}
                                        iconOnly={true}
                                    />
                                </ArrowDiv>
                            </FlexDiv>
                        </DropCharacterHeader>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

const DropCharacterHeader = styled.header<{ characterLength: number; todoLength: number }>`
    width: 100%;
    padding-bottom: 0.3em;
    ${props =>
        (props.characterLength > 0 || props.todoLength > 0) && `border-bottom: 1px solid ${props.theme.colors.text}`};
    box-sizing: border-box;
`;

const Article = styled(FlexHoverArticle)`
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

const ArrowDiv = styled.div<{ perPage: number; characterOrd: number[] }>`
    visibility: ${props => (props.characterOrd.length < props.perPage + 1 ? `hidden` : `visible`)};
    display: flex;
    flex-basis: 2.5%;
`;

export default Character;
