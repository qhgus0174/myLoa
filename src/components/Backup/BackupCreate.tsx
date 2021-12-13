import React, { useContext, useState } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { ButtonContainer, Container, ContentContainer } from '@style/common/modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { FlexDiv } from '@style/common';
import styled from '@emotion/styled';

const BackupCreate = ({ backupCode }: { backupCode: string }) => {
    const [newBackupCode, setNewBackupCode] = useState<{ value: string; copied: boolean }>({
        value: backupCode,
        copied: false,
    });

    const { closeModal } = useContext(ModalActionContext);

    const copyCode = () => {
        setNewBackupCode({ ...newBackupCode, copied: true });
        toast.success(
            '현재 브라우저 데이터 백업 코드가 클립보드로 복사되었습니다. 데이터를 옮길 브라우저에 붙여넣으세요.',
        );
    };

    return (
        <Container>
            <ContentContainer>
                <BackupCopyDiv>
                    <TextBox divWidth="50" placeholder="백업 코드" value={newBackupCode.value} readOnly />
                    <CopyToClipboard text={newBackupCode.value} onCopy={copyCode}>
                        <Button>복사</Button>
                    </CopyToClipboard>
                </BackupCopyDiv>
            </ContentContainer>
            <ButtonContainer>
                <Button onClick={closeModal}>닫기</Button>
            </ButtonContainer>
        </Container>
    );
};

const BackupCopyDiv = styled(FlexDiv)`
    justify-content: space-evenly;
`;

export default BackupCreate;
