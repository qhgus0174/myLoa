import React, { useContext, useEffect, useState } from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import CharacterOrdChange from '@components/Character/modal/CharacterOrdChange';
import CharacterAdd from '@components/Character/modal/CharacterAdd';
import Pagination from '@components/Pagination/Pagination';
import TodoAdd from '@components/Todo/modal/TodoAdd';
import DownArrow from '@components/Image/DownArrow';
import PlusIcon from '@components/Image/PlusIcon';
import LineAdd from '@components/Line/LineAdd';
import UpArrow from '@components/Image/UpArrow';
import Button from '@components/Button/Button';
import Character from '@components/Character';
import Todo from '@components/Todo';
import { IContextModal } from '@common/types/types';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { responsiveWidth, widthMedia } from '@style/device';
import { FlexDiv } from '@style/common';

const Weekly = () => {
    const { storedTodo, storedCharacter, storedCharacterOrd, storedShareContents, storedDayContents } =
        useContext(LocalStorageStateContext);

    const { setModalProps } = useContext(ModalActionContext);
    const [isFold, setIsFold] = useState<boolean>(false);
    const { width: windowWidth } = useWindowDimensions();

    const theme = useTheme();

    useEffect(() => {
        resetFold();
    }, [windowWidth]);

    const resetFold = () => {
        responsiveWidth.smallPhone < windowWidth! && setIsFold(false);
    };

    const onContextMenuBasicModal = ({ e, modal, title, width, height }: IContextModal) => {
        e && e.preventDefault();
        setModalProps({
            isOpen: true,
            content: modal,
            options: { width: width, height: height, headerTitle: title },
        });
    };

    return (
        <section>
            <HideButtonContainer isFold={isFold}>
                <HideButtonSection onClick={() => setIsFold(!isFold)}>
                    버튼
                    {isFold ? (
                        <>
                            <span>&nbsp;보이기</span>
                            <DownArrow fill={theme.colors.text} width="25" height="25" />
                        </>
                    ) : (
                        <>
                            <span>&nbsp;숨기기</span>
                            <UpArrow fill={theme.colors.text} width="25" height="25" />
                        </>
                    )}
                </HideButtonSection>
            </HideButtonContainer>
            <TodoButtons isFold={isFold}>
                <ButtonLeftDiv>
                    <AddButton
                        type="button"
                        icon={<PlusIcon fill={theme.button.color} width="15" height="15" />}
                        onClick={e =>
                            onContextMenuBasicModal({
                                e: e,
                                modal: <TodoAdd />,
                                title: '숙제 추가',
                                width: '600',
                                height: '850',
                            })
                        }
                    >
                        숙제
                    </AddButton>
                    <AddButton
                        isRight={true}
                        type="button"
                        icon={<PlusIcon fill={theme.button.color} width="15" height="15" />}
                        onClick={e =>
                            onContextMenuBasicModal({
                                e: e,
                                modal: <LineAdd />,
                                title: '구분선 추가',
                                width: '360',
                                height: '290',
                            })
                        }
                    >
                        구분선
                    </AddButton>
                </ButtonLeftDiv>
                <FlexDiv>
                    <AddButton
                        type="button"
                        onClick={e =>
                            onContextMenuBasicModal({
                                e: e,
                                modal: <CharacterOrdChange />,
                                title: '캐릭터 순서 변경',
                                width: '300',
                                height: storedCharacterOrd.length < 5 ? '450' : '600',
                            })
                        }
                    >
                        캐릭터 순서 변경
                    </AddButton>
                    <AddButton
                        isRight={true}
                        type="button"
                        icon={<PlusIcon fill={theme.button.color} width="15" height="15" />}
                        onClick={e =>
                            onContextMenuBasicModal({
                                e: e,
                                modal: <CharacterAdd />,
                                title: '캐릭터 추가',
                                width: '470',
                                height: '420',
                            })
                        }
                    >
                        캐릭터
                    </AddButton>
                </FlexDiv>
            </TodoButtons>
            <TodoContentsSection>
                {storedCharacter.length > 0 && <Pagination />}
                <Character onContextMenuBasicModal={onContextMenuBasicModal} />
                <Todo onContextMenuBasicModal={onContextMenuBasicModal} />
            </TodoContentsSection>
        </section>
    );
};

const TodoContentsSection = styled.section`
    background: ${props => props.theme.colors.mainInner};
    padding: 0.3em 1.5em 1.5em 1.5em;
    border-radius: 0 0 0.8em 0.8em;
    box-sizing: border-box;
    width: 100%;
    ${widthMedia.smallPhone} {
        padding-top: 1em;
        border-radius: 0.8em;
    }
`;

const HideButtonContainer = styled.header<{ isFold: boolean }>`
    display: none;
    ${widthMedia.smallPhone} {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: end;
        align-items: center;
        margin-bottom: 1.2em;
        justify-content: space-between;
    }
`;
const HideButtonSection = styled.section`
    display: flex;
    align-items: center;
    padding-right: 0.5em;
`;

const TodoButtons = styled.header<{ isFold: boolean }>`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 1.7em;
    box-sizing: border-box;
    justify-content: space-between;
    padding-bottom: 0.7em;
    border-radius: 0.8em 0.8em 0 0;
    background: ${props => props.theme.colors.mainInner};

    ${widthMedia.smallPhone} {
        flex-direction: column;
        padding-top: 0;
        background: transparent;
    }

    ${props => props.isFold && 'display:none'};
`;

const AddButton = styled(Button)<{ isRight?: boolean }>`
    ${props => props.isRight && `margin-left: 1em`};

    ${widthMedia.smallPhone} {
        width: 100%;
        margin: 0;
        justify-content: center;
        margin-bottom: 0.5em;
    }
`;

const ButtonLeftDiv = styled.div`
    display: flex;
    ${widthMedia.smallPhone} {
        flex-direction: column;
    }
`;

export default Weekly;
