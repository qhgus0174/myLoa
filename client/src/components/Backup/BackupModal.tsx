import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useInput } from '@hooks/useInput';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import useCharacter from '@hooks/storage/useCharacter';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useTodo from '@hooks/storage/useTodo';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { IBackup, IError, IResponse } from '@common/responseType';
import { FormButtonContainer, FormContainer, FormArticleContainer } from '@style/common/modal';

const BackupModal = () => {
    const [newBackupCode, setNewBackupCode] = useInput<string>('');
    const { closeModal } = useContext(ModalActionContext);
    const { setSpinnerVisible } = useContext(SpinnerContext);

    const [storageCharacter, setStorageCharacter] = useCharacter();
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

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

            setStorageTodo(todo);
            setStorageTodoOrd(todoord);
            setStorageCharacter(character);
            setStorageCharacterOrd(characterord);
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
