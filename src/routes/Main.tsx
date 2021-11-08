import React, { useContext } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import CharacterAdd from '@components/Character/modal/CharacterAdd';
import Todo from '@components/Todo';
import Button from '@components/Button/Button';
import TodoAdd from '@components/Todo/modal/TodoAdd';
import LineAdd from '@components/Line/LineAdd';
import Character from '@components/Character';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { widthMedia } from '@style/device';
import { ReactComponent as Plus } from '@assets/img/plus.svg';
import { IContextModal } from '@common/types';

const Main = () => {
    const { setModalProps } = useContext(ModalActionContext);

    const theme = useTheme();

    const onContextMenuBasicModal = ({ e, modal, title, width, height }: IContextModal) => {
        e.preventDefault();
        setModalProps({
            isOpen: true,
            content: modal,
            options: { width: width, height: height, headerTitle: title },
        });
    };

    return (
        <MainDiv width="85" direction="column">
            <ButtonDiv width="100">
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
                                height: '85',
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
            </ButtonDiv>
            <Character onContextMenuBasicModal={onContextMenuBasicModal} />
            <Todo onContextMenuBasicModal={onContextMenuBasicModal} />
        </MainDiv>
    );
};

const MainDiv = styled(FlexDiv)`
    margin-top: 1em;
    margin-bottom: 3em;
`;

const ButtonDiv = styled(FlexDiv)`
    margin-bottom: 1.7em;
    box-sizing: border-box;
    justify-content: space-between;

    ${widthMedia.smallPhone} {
        flex-direction: column;
    }
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
