import React, { useContext } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import Button from '@components/Button/Button';
import { FormButtonContainer } from '@style/common/modal';

interface IEditButton {
    onClickEdit: () => void;
}

const EditButtonContainer = ({ onClickEdit }: IEditButton) => {
    const { closeModal } = useContext(ModalActionContext);

    return (
        <FormButtonContainer>
            <Button onClick={onClickEdit}>수정</Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </FormButtonContainer>
    );
};

export default EditButtonContainer;
