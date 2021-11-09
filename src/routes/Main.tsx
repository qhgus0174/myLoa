import React, { useContext, useEffect, useState } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import CharacterAdd from '@components/Character/modal/CharacterAdd';
import Todo from '@components/Todo';
import Button from '@components/Button/Button';
import TodoAdd from '@components/Todo/modal/TodoAdd';
import LineAdd from '@components/Line/LineAdd';
import Character from '@components/Character';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { responsiveWidth, widthMedia } from '@style/device';
import { ReactComponent as Plus } from '@assets/img/plus.svg';
import { ReactComponent as ArrowDown } from '@assets/img/arrow-down.svg';
import { ReactComponent as ArrowUp } from '@assets/img/arrow-up.svg';
import { IContextModal } from '@common/types';
import useWindowDimensions from '@hooks/useWindowDimensions';

const Main = () => {
    const { setModalProps } = useContext(ModalActionContext);
    const [isFold, setIsFold] = useState<boolean>(false);
    const { width: windowWidth } = useWindowDimensions();

    const theme = useTheme();

    useEffect(() => {
        resetFold();
    }, [windowWidth]);

    const resetFold = () => {
        responsiveWidth.smallPhone < windowWidth && setIsFold(false);
    };

    const onContextMenuBasicModal = ({ e, modal, title, width, height }: IContextModal) => {
        e.preventDefault();
        setModalProps({
            isOpen: true,
            content: modal,
            options: { width: width, height: height, headerTitle: title },
        });
    };

    return (
        <MainDiv width="88" direction="column">
            <HideButtonContainer isFold={isFold}>
                <HideButtonDiv onClick={() => setIsFold(!isFold)}>
                    버튼
                    {isFold ? (
                        <>
                            <span>&nbsp;보이기</span>
                            <ArrowDown fill={theme.colors.white} width="25px" height="25px" />
                        </>
                    ) : (
                        <>
                            <span>&nbsp;숨기기</span>
                            <ArrowUp fill={theme.colors.white} width="25px" height="25px" />
                        </>
                    )}
                </HideButtonDiv>
            </HideButtonContainer>
            <TodoButtonDiv height="100" isFold={isFold} width="100">
                <ButtonLeftDiv>
                    <AddButton
                        type="button"
                        icon={<Plus width="15px" height="15px" fill={theme.colors.white} />}
                        onClick={e =>
                            onContextMenuBasicModal({
                                e: e,
                                modal: <TodoAdd />,
                                title: '숙제 추가',
                                width: '35',
                                height: '90',
                            })
                        }
                    >
                        숙제
                    </AddButton>
                    <AddButton
                        isRight={true}
                        type="button"
                        icon={<Plus width="15px" height="15px" fill={theme.colors.white} />}
                        onClick={e =>
                            onContextMenuBasicModal({
                                e: e,
                                modal: <LineAdd />,
                                title: '구분선 추가',
                                width: '30',
                                height: '45',
                            })
                        }
                    >
                        구분선
                    </AddButton>
                </ButtonLeftDiv>
                <FlexDiv>
                    <AddButton
                        isRight={true}
                        type="button"
                        icon={<Plus width="15px" height="15px" fill={theme.colors.white} />}
                        onClick={e =>
                            onContextMenuBasicModal({
                                e: e,
                                modal: <CharacterAdd />,
                                title: '캐릭터 추가',
                                width: '35',
                                height: '57',
                            })
                        }
                    >
                        캐릭터
                    </AddButton>
                </FlexDiv>
            </TodoButtonDiv>
            <TodoContentsDiv>
                <Character onContextMenuBasicModal={onContextMenuBasicModal} />
                <Todo onContextMenuBasicModal={onContextMenuBasicModal} />
            </TodoContentsDiv>
        </MainDiv>
    );
};

const MainDiv = styled(FlexDiv)`
    width: 88%;
    ${widthMedia.phone} {
        width: 95%;
    }
    margin-top: 1em;
    margin-bottom: 2em;
`;

const TodoContentsDiv = styled.div`
    background: ${props => props.theme.colors.mainDark};
    padding: 1.5em;
    border-radius: 1em;
    box-sizing: border-box;
`;

const HideButtonContainer = styled.div<{ isFold: boolean }>`
    display: none;
    ${widthMedia.smallPhone} {
        width: 100%;
        display: flex;
        justify-content: end;
        align-items: center;
        margin-bottom: 1em;
    }
`;
const HideButtonDiv = styled.div`
    display: flex;
    align-items: center;
`;

const TodoButtonDiv = styled(FlexDiv)<{ isFold: boolean }>`
    margin-bottom: 1.7em;
    box-sizing: border-box;
    justify-content: space-between;

    ${widthMedia.smallPhone} {
        flex-direction: column;
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

const ButtonLeftDiv = styled(FlexDiv)`
    ${widthMedia.smallPhone} {
        flex-direction: column;
    }
`;

export default Main;
