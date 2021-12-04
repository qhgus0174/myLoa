import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useInput } from '@hooks/useInput';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { IBackup, IError, IResponse } from '@common/responseType';
import { FormButtonContainer, FormContainer, FormArticleContainer } from '@style/common/modal';
import { LocalStorageActionContext } from '@context/LocalStorageContext';

const BackupModal = () => {
    const [newBackupCode, setNewBackupCode] = useInput<string>('');
    const { closeModal } = useContext(ModalActionContext);
    const { setSpinnerVisible } = useContext(SpinnerContext);
    const { setStoredTodo, setStoredTodoOrd, setStoredCharacter, setStoredCharacterOrd } =
        useContext(LocalStorageActionContext);

    const history = useHistory();

    const setData = async () => {
        setSpinnerVisible(true);
        try {
            await setBackupData();
            await deleteBackupData();

            toast.success('데이터를 성공적으로 불러왔습니다. 숙제 관리 화면으로 이동합니다.');
            history.push('/');

            closeModal();
        } catch (err: unknown) {
            const { message } = err as Error;
            toast.error('백업 데이터를 가져 오던 중 오류가 발생했습니다.');

            await axios.post('/api/error', {
                message: message,
                dataColumn1: newBackupCode,
                errType: 'backup',
            } as IError);
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
            const { message } = err as Error;

            await axios.post('/api/error', {
                message: message,
                dataColumn1: newBackupCode,
                errType: 'setBackup',
            } as IError);
        }
    };

    const deleteBackupData = async () => {
        try {
            await axios.delete(`/api/backup/delete/${newBackupCode}`);
        } catch (err: unknown) {
            const { message } = err as Error;

            await axios.post('/api/error', {
                message: message,
                dataColumn1: newBackupCode,
                errType: 'deleteBackup',
            } as IError);
        }
    };

    return (
        <FormContainer>
            <FormArticleContainer>
                <TextBox placeholder="백업 코드 입력" {...setNewBackupCode} />
            </FormArticleContainer>
            <FormButtonContainer>
                <Button onClick={() => setData()}>불러오기</Button>
                <Button onClick={closeModal}>취소</Button>
            </FormButtonContainer>
        </FormContainer>
    );
};

export default BackupModal;
