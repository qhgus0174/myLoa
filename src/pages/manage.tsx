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
import { FlexDiv } from '@style/common/layout/common';
import { widthMedia } from '@style/device';
import IconLabel from '@components/Label/IconLabel';

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
                options: { width: '300', height: '250', headerTitle: '?????? ?????? ?????? ??????' },
            });
            toast.success('????????? ?????? ????????? ?????????????????????.');
        } catch (err: unknown) {
            insertErrorDB({ catchErr: err, errType: 'backup' });
            toast.error('????????? ?????? ??? ????????? ??????????????????.');
        } finally {
            setSpinnerVisible(false);
        }
    };

    const setBackupData = () => {
        setModalProps({
            isOpen: true,
            content: <Backup />,
            options: { width: '300', height: '250', headerTitle: '?????? ????????? ????????????' },
        });
    };

    const clearData = () => {
        setModalProps({
            isOpen: true,
            content: <Clear />,
            options: { width: '250', height: '220', headerTitle: '????????? ?????????' },
        });
    };

    return (
        <Container>
            <Head>
                <title>??????????????? - ??????</title>
            </Head>
            <Content>
                <IconLabel
                    label={<h4>???????????? ????????? ?????????.</h4>}
                    iconUrl="/static/img/icon/mococo/reset.png"
                    width="35"
                    height="35"
                />
                <CustomButton className="resetData" onClick={() => clearData()}>
                    ????????? ??????
                </CustomButton>
            </Content>
            <Content direction="column">
                <InnerContent>
                    <IconLabel
                        label={<h4>???????????? ???????????? ?????? ?????????????????? ?????? ???????????????. (?????????)</h4>}
                        iconUrl="/static/img/icon/mococo/kick.png"
                        width="35"
                        height="35"
                    />
                </InnerContent>
                <InnerContent>
                    <CustomButton className="createBackupCode" onClick={() => backupData()}>
                        ?????? ??????
                    </CustomButton>
                    <CustomButton className="getBackupCode" onClick={() => setBackupData()}>
                        ????????????
                    </CustomButton>
                </InnerContent>
            </Content>
            <Content direction="column">
                <InnerContent>
                    <span>???? ?????? ??????, ?????? ????????? ??????????????? ?????? ???????????? ??????????????????! </span>
                </InnerContent>
                <InnerContent>
                    <a className="discord" target="_blank" href="https://discord.gg/an2dykC9">
                        <Image alt="???????????? ?????????" src="/static/img/icon/discord.png" width="45" height="45" />
                    </a>
                    <a className="kakao" target="_blank" href="https://open.kakao.com/o/g2kVnGPd">
                        <Image alt="????????? ?????????" src="/static/img/icon/kakao.png" width="45" height="45" />
                    </a>
                </InnerContent>
                <InnerContent>
                    <a
                        target="_blank"
                        href="https://north-ravioli-1b6.notion.site/Release-Note-84ce9a86118340b2944b161948cbc7c5"
                    >
                        ???????????? ?????? ????????????????
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
