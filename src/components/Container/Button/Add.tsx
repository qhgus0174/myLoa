import React, { useContext } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import Button from '@components/Button/Button';
import { FormButtonContainer } from '@style/common/modal';

interface IAddButton {
    onClickAdd: () => void;
}

const AddButtonContainer = ({ onClickAdd }: IAddButton) => {
    const { closeModal } = useContext(ModalActionContext);

    return (
        <FormButtonContainer>
            <Button onClick={onClickAdd}>추가</Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </FormButtonContainer>
    );
};

export default AddButtonContainer;
