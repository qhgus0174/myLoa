import React from 'react';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

const Header = () => {
    return (
        <HeaderDiv>
            <LogoImg src="/img/logo/logo.png" />
        </HeaderDiv>
    );
};

const HeaderDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3vh;
    margin-bottom: 5vh;
`;

const LogoImg = styled.img`
    width: 160px;

    ${widthMedia.phone} {
        width: 130px;
    }
`;

export default Header;
