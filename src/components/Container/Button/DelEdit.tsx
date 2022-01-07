import React, { useContext } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import Button from '@components/Button/Button';
import { ButtonContainer } from '@style/common/modal';
import { FlexDiv } from '@style/common/layout/common';
import styled from '@emotion/styled';

interface IEditButton {
    onClickEdit: () => void;
    onClickDelete: () => void;
    editClassName: string;
}

const DelEditButtonContainer = ({ onClickEdit, onClickDelete, editClassName }: IEditButton) => {
    const { closeModal } = useContext(ModalActionContext);

    return (
        <ButtonContainer>
            <FlexDiv width="100">
                <Button borderColor="cancel" onClick={onClickDelete}>
                    삭제
                </Button>
            </FlexDiv>
            <RightDiv>
                <Button className={editClassName} onClick={onClickEdit}>
                    수정
                </Button>
                <Button onClick={() => closeModal()}>닫기</Button>
            </RightDiv>
        </ButtonContainer>
    );
};

export const RightDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;

    button:nth-of-type(2) {
        margin-left: 1em;
    }
`;

export default DelEditButtonContainer;
