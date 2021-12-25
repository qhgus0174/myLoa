import React, { useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import BackupCreate from '@components/Backup/BackupCreate';
import Clear from '@components/Backup/Clear';
import Backup from '@components/Backup/BackupModal';
import Button from '@components/Button/Button';
import { IBackup } from '@common/types/response/backup';
import { IResponse } from '@common/types/response';
import { insertErrorDB } from '@common/error';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { widthMedia } from '@style/device';

const Manage = () => {
    const { setSpinnerVisible } = useContext(SpinnerContext);
    const { setModalProps } = useContext(ModalActionContext);

    const backupData = async () => {
        setSpinnerVisible(true);

        try {
            const params = {
                todo: JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('todo') as string))),
                todoOrd: JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('todoOrd') as string))),
                character: JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('character') as string))),
                characterOrd: JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('characterOrd') as string))),
                ledger: JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('ledger') as string))),
                share: JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('share') as string))),
                shareDay: JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('shareDay') as string))),
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
            insertErrorDB({ catchErr: err, errType: 'backup' });
            toast.error('데이터 백업 중 오류가 발생했습니다.');
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
        <Container>
            <Head>
                <title>로요일좋아 - 관리</title>
            </Head>
            <Content>
                <span>💥 데이터를 초기화 합니다. </span>
                <CustomButton className="resetData" onClick={() => clearData()}>
                    초기화 실행
                </CustomButton>
            </Content>
            <Content direction="column">
                <InnerContent>
                    <span>⭐ 데이터를 백업하여 다른 브라우저에서 열람 가능합니다. (일회용) </span>
                </InnerContent>
                <InnerContent>
                    <CustomButton className="createBackupCode" onClick={() => backupData()}>
                        코드 생성
                    </CustomButton>
                    <CustomButton className="getBackupCode" onClick={() => setBackupData()}>
                        불러오기
                    </CustomButton>
                </InnerContent>
            </Content>
            <Content direction="column">
                <InnerContent>
                    <span>📞 버그 제보, 기타 문의는 디스코드나 오픈 채팅방을 이용해주세요! </span>
                </InnerContent>
                <InnerContent>
                    <a className="discord" target="_blank" href="https://discord.gg/an2dykC9">
                        <Image alt="디스코드 아이콘" src="/static/img/icon/discord.png" width="45" height="45" />
                    </a>
                    <a className="kakao" target="_blank" href="https://open.kakao.com/o/g2kVnGPd">
                        <Image alt="카카오 아이콘" src="/static/img/icon/kakao.png" width="45" height="45" />
                    </a>
                </InnerContent>
                <InnerContent>
                    <a
                        target="_blank"
                        href="https://north-ravioli-1b6.notion.site/Release-Note-84ce9a86118340b2944b161948cbc7c5"
                    >
                        업데이트 노트 바로가기🧚
                    </a>
                </InnerContent>
            </Content>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid ${props => props.theme.colors.text};
    padding: 4em;
    margin: 4em;
    & > div:nth-of-type(1),
    & > div:nth-of-type(2) {
        border-bottom: 1px dashed ${props => props.theme.colors.text};
    }

    ${widthMedia.smallDesktop} {
        width: 80%;
    }

    ${widthMedia.tablet} {
        width: 85%;
    }

    ${widthMedia.phone} {
        width: 92%;
    }
`;

const Content = styled(FlexDiv)`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-top: 1.8em;
    padding-bottom: 1.8em;
    width: 100%;
    justify-content: center;

    ${widthMedia.phone} {
        flex-direction: column;

        & > span {
            margin-bottom: 1em;
        }
    }
`;

const InnerContent = styled(FlexDiv)`
    align-items: center;
    justify-content: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    box-sizing: border-box;
    align-items: center;
`;

const CustomButton = styled(Button)`
    margin-left: 1em;
    box-sizing: border-box;
`;

export default Manage;
