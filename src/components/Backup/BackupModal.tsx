import React, { useContext } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useInput } from '@hooks/useInput';
import { LocalStorageActionContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { IBackup } from '@common/types/response/backup';
import { IResponse } from '@common/types/response';
import { insertErrorDB } from '@common/error';
import { ButtonContainer, Container, ContentContainer } from '@style/common/modal';

const BackupModal = () => {
    const [newBackupCode, setNewBackupCode] = useInput<string>('');
    const { closeModal } = useContext(ModalActionContext);
    const { setSpinnerVisible } = useContext(SpinnerContext);
    const { setStoredTodo, setStoredTodoOrd, setStoredCharacter, setStoredCharacterOrd } =
        useContext(LocalStorageActionContext);

    const setData = async () => {
        setSpinnerVisible(true);
        try {
            await setBackupData();
            await deleteBackupData();

            toast.success('데이터를 성공적으로 불러왔습니다. 숙제 관리 화면으로 이동합니다.');
            Router.push('/');

            closeModal();
        } catch (err: unknown) {
            insertErrorDB({ catchErr: err, errType: 'backup', dataColumn1: newBackupCode });
            toast.error('백업 데이터를 가져 오던 중 오류가 발생했습니다.');
        } finally {
            setSpinnerVisible(false);
        }
    };

    const setBackupData = async () => {
        try {
            const {
                result: { todo, todoord, character, characterord },
            } = (await (
                await axios.get(`/api/backup/${newBackupCode}`)
            ).data) as IResponse<IBackup>;

            setStoredTodo(JSON.parse(todo));
            setStoredTodoOrd(JSON.parse(todoord));
            setStoredCharacter(JSON.parse(character));
            setStoredCharacterOrd(JSON.parse(characterord));
        } catch (err: unknown) {
            insertErrorDB({ catchErr: err, errType: 'setBackup', dataColumn1: newBackupCode });
        }
    };

    const deleteBackupData = async () => {
        try {
            await axios.delete(`/api/backup/delete/${newBackupCode}`);
        } catch (err: unknown) {
            insertErrorDB({ catchErr: err, errType: 'deleteBackup', dataColumn1: newBackupCode });
        }
    };

    return (
        <Container>
            <ContentContainer>
                <TextBox placeholder="백업 코드 입력" {...setNewBackupCode} />
            </ContentContainer>
            <ButtonContainer>
                <Button onClick={() => setData()}>불러오기</Button>
                <Button onClick={closeModal}>취소</Button>
            </ButtonContainer>
        </Container>
    );
};

export default BackupModal;
