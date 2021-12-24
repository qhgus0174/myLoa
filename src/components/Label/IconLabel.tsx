import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

interface IIconLabel {
    iconUrl: any;
    label: string;
}

const IconLabel = ({ iconUrl, label }: IIconLabel) => {
    return (
        <Container>
            <Image alt="라벨 아이콘" src={iconUrl} width="16" height="16" />
            <Label>{label}</Label>
        </Container>
    );
};

const Container = styled.article`
    display: flex;
    align-items: center;
`;

const Label = styled.span`
    margin-left: 6px;
`;
export default IconLabel;
