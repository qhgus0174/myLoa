import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getStorage } from '@storage/index';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import BackupCreate from '@components/Backup/BackupCreate';
import Clear from '@components/Backup/Clear';
import Backup from '@components/Backup/BackupModal';
import Button from '@components/Button/Button';
import { IBackup, IError, IResponse } from '@common/responseType';
import styled from '@emotion/styled';
import { FlexArticle } from '@style/common';
import { widthMedia } from '@style/device';

const Manage = () => {
    const { setSpinnerVisible } = useContext(SpinnerContext);
    const { setModalProps } = useContext(ModalActionContext);

    const backupData = async () => {
        setSpinnerVisible(true);

        try {
            const params = {
                todo: JSON.stringify(getStorage('todo')),
                todoOrd: JSON.stringify(getStorage('todoOrd')),
                character: JSON.stringify(getStorage('character')),
                characterOrd: JSON.stringify(getStorage('characterOrd')),
            };
            const {
                result: { backupkey },
            } = (await (
                await axios.post('/api/backup', params)
            ).data) as IResponse<Pick<IBackup, 'backupkey'>>;

            setModalProps({
                isOpen: true,
                content: <BackupCreate backupCode={backupkey} />,
                options: { width: '300', height: '250', headerTitle: '백업 코드 생성 완료' },
            });
            toast.success('데이터 백업 코드가 생성되었습니다.');
        } catch (err: unknown) {
            const { message } = err as Error;
            toast.error('데이터 백업 중 오류가 발생했습니다.');
            await axios.post('/api/error', { message: message, errType: 'backup' } as IError);
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
            <ManageArticle>
                <span>오류 발생 시 데이터를 초기화 할 수 있습니다. </span>
                <ManageButton className="resetData" onClick={() => clearData()}>
                    초기화
                </ManageButton>
            </ManageArticle>
            <ManageArticle direction="column">
                <ManageInnerArticle>
                    <span>데이터를 백업하여 다른 브라우저에서 열람 가능합니다. (일회용) </span>
                </ManageInnerArticle>
                <ManageInnerArticle>
                    <ManageButton className="createBackupCode" onClick={() => backupData()}>
                        코드 생성
                    </ManageButton>
                    <ManageButton className="getBackupCode" onClick={() => setBackupData()}>
                        불러오기
                    </ManageButton>
                </ManageInnerArticle>
            </ManageArticle>
            <ManageArticle>
                <span>버그 발생 / 문의 사항이 있을 시 shannon_@hotmail.co.kr로 메일 부탁드립니다. </span>
            </ManageArticle>
        </ManageContainer>
    );
};

const ManageContainer = styled(FlexArticle)`
    width: 70%;
    justify-content: center;
    align-items: center;
    margin-top: 3em;
    margin-bottom: 3em;
    box-sizing: border-box;
`;

const ManageArticle = styled(FlexArticle)`
    align-items: center;
    margin-bottom: 2em;
    box-sizing: border-box;

    ${widthMedia.phone} {
        flex-direction: column;

        & > span {
            margin-bottom: 1em;
        }
    }
`;

const ManageInnerArticle = styled(FlexArticle)`
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
