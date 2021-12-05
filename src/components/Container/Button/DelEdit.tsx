import React, { useContext } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import Button from '@components/Button/Button';
import { FormButtonContainer, RightButtonArticle } from '@style/common/modal';
import { FlexArticle } from '@style/common';

interface IEditButton {
    onClickEdit: () => void;
    onClickDelete: () => void;
    editClassName: string;
}

const DelEditButtonContainer = ({ onClickEdit, onClickDelete, editClassName }: IEditButton) => {
    const { closeModal } = useContext(ModalActionContext);

    return (
        <FormButtonContainer>
            <FlexArticle width="100">
                <Button borderColor="cancel" onClick={onClickDelete}>
                    삭제
                </Button>
            </FlexArticle>
            <RightButtonArticle>
                <Button className={editClassName} onClick={onClickEdit}>
                    수정
                </Button>
                <Button onClick={() => closeModal()}>닫기</Button>
            </RightButtonArticle>
        </FormButtonContainer>
    );
};

export default DelEditButtonContainer;
