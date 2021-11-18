import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { addDoc } from '@firebaseStore/backup';
import { addDoc as addDocError } from '@firebaseStore/errorLog';
import { getStorage } from '@storage/index';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import Clear from '@components/LocalStorage/Clear';
import Backup from '@components/LocalStorage/BackupModal';
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

const Manage = () => {
    const { setSpinnerVisible } = useContext(SpinnerContext);
    const { setModalProps } = useContext(ModalActionContext);

    const backupData = async () => {
        setSpinnerVisible(true);

        try {
            const result = await addDoc({
                todo: getStorage('todo'),
                todoOrd: getStorage('todoOrd'),
                character: getStorage('character'),
                characterOrd: getStorage('characterOrd'),
            });

            toast.success(
                '현재 브라우저 데이터 백업 코드가 클립보드로 복사되었습니다. 데이터를 옮길 브라우저에 붙여넣으세요.',
            );
            navigator.clipboard.writeText(result.id);
        } catch (err: unknown) {
            const { message } = err as Error;
            toast.error('데이터 백업 중 오류가 발생했습니다.');

            await addDocError({
                msg: message,
            });
        } finally {
            setSpinnerVisible(false);
        }
    };

    const setBackupData = () => {
        setModalProps({
            isOpen: true,
            content: <Backup />,
            options: { width: '300', height: '250', headerTitle: '백업 데이터 불러오기' },
        });
    };

    const clearData = () => {
        setModalProps({
            isOpen: true,
            content: <Clear />,
            options: { width: '250', height: '220', headerTitle: '데이터 초기화' },
        });
    };

    return (
        <ManageContainer direction="column">
            <ManageDiv>
                <span>오류 발생 시 데이터를 초기화 할 수 있습니다. </span>
                <ManageButton onClick={() => clearData()}>초기화</ManageButton>
            </ManageDiv>
            <ManageDiv direction="column">
                <ManageInnerDiv>
                    <span>데이터를 백업하여 다른 브라우저에서 열람 가능합니다. </span>
                </ManageInnerDiv>
                <ManageInnerDiv>
                    <ManageButton onClick={() => backupData()}>코드 생성</ManageButton>
                    <ManageButton onClick={() => setBackupData()}>불러오기</ManageButton>
                </ManageInnerDiv>
            </ManageDiv>
        </ManageContainer>
    );
};

const ManageCopyDiv = styled(FlexDiv)`
    border-radius: 1em;
    background: #333456;
    padding-top: 1.2em;
    padding-left: 1.2em;
    padding-right: 1.2em;
    padding-bottom: 0.2em;
    width: 100%;
    justify-content: center;
`;

const ManageContainer = styled(FlexDiv)`
    width: 70%;
    justify-content: center;
    align-items: center;
    height: 50vh;
    margin-top: 3em;
    margin-bottom: 3em;
    box-sizing: border-box;
`;

const ManageDiv = styled(FlexDiv)`
    align-items: center;
    margin-bottom: 2em;
    box-sizing: border-box;
`;

const ManageInnerDiv = styled(FlexDiv)`
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
    box-sizing: border-box;
`;

const ManageButton = styled(Button)`
    margin-left: 1em;
    box-sizing: border-box;
`;

export default Manage;
