import styled from '@emotion/styled';
import React from 'react';

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
    margin-top: 1.6em;
    margin-bottom: 4em;
`;

const LogoImg = styled.img`
    width: 150px;
`;

export default Header;
