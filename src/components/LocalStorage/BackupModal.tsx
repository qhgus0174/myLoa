import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { addDoc as addDocError } from '@firebaseStore/errorLog';
import { deleteDoc, getDoc, IBackup } from '@firebaseStore/backup';
import { useInput } from '@hooks/useInput';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import useCharacter from '@hooks/storage/useCharacter';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useTodo from '@hooks/storage/useTodo';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { FormButtonContainer, FormContainer, FormDivContainer } from '@style/common/modal';
import { toast } from 'react-toastify';

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

            await addDocError({
                msg: message,
                backupCode: newBackupCode,
            });
        } finally {
            setSpinnerVisible(false);
        }
    };

    const setBackupData = async () => {
        const backupData: IBackup = (await getDoc(newBackupCode)).data() as IBackup;

        setStorageTodo(JSON.stringify(backupData.todo));
        setStorageTodoOrd(JSON.stringify(backupData.todoOrd));
        setStorageCharacter(JSON.stringify(backupData.character));
        setStorageCharacterOrd(JSON.stringify(backupData.characterOrd));
    };

    const deleteBackupData = async () => {
        await deleteDoc(newBackupCode);
    };

    return (
        <FormContainer>
            <FormDivContainer>
                <TextBox placeholder="백업 코드 입력" {...setNewBackupCode} />
            </FormDivContainer>
            <FormButtonContainer>
                <Button onClick={() => setData()}>불러오기</Button>
                <Button onClick={closeModal}>취소</Button>
            </FormButtonContainer>
        </FormContainer>
    );
};

export default BackupModal;
