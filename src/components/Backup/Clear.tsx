import React, { useContext } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import Button from '@components/Button/Button';
import { ButtonContainer, Container, ContentContainer } from '@style/common/modal';
import { toast } from 'react-toastify';

const Clear = () => {
    const { closeModal } = useContext(ModalActionContext);

    const clearData = () => {
        localStorage.clear();
        toast.success('데이터가 초기화되었습니다.');
        closeModal();
    };
    return (
        <Container>
            <ContentContainer>데이터를 초기화 하시겠습니까?</ContentContainer>
            <ButtonContainer>
                <Button onClick={() => clearData()}>확인</Button>
                <Button onClick={closeModal}>취소</Button>
            </ButtonContainer>
        </Container>
    );
};

export default Clear;
