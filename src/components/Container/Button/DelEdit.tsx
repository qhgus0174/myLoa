import React, { useContext } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import Button from '@components/Button/Button';
import { FormButtonContainer, RightButtonDiv } from '@style/common/modal';
import { FlexDiv } from '@style/common';

interface IEditButton {
    onClickEdit: () => void;
    onClickDelete: () => void;
}

const DelEditButtonContainer = ({ onClickEdit, onClickDelete }: IEditButton) => {
    const { closeModal } = useContext(ModalActionContext);

    return (
        <FormButtonContainer>
            <FlexDiv width="100">
                <Button borderColor="cancel" onClick={onClickDelete}>
                    삭제
                </Button>
            </FlexDiv>
            <RightButtonDiv>
                <Button onClick={onClickEdit}>수정</Button>
                <Button onClick={() => closeModal()}>닫기</Button>
            </RightButtonDiv>
        </FormButtonContainer>
    );
};

export default DelEditButtonContainer;
