import React from 'react';
import Compass from '@routes/Compass';
import Logo from '@assets/img/logo/logo.png';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { FlexDiv } from '@style/common';
import SelectTheme from '@routes/SelectTheme';

const Header = () => {
    return (
        <HeaderDiv>
            <CompassDiv basis="40">
                <Compass />
            </CompassDiv>
            <LogoDiv basis="20">
                <LogoImg src={Logo} />
            </LogoDiv>
            <RightHeader basis="40">
                <SelectTheme />
            </RightHeader>
        </HeaderDiv>
    );
};

const HeaderDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3vh;
    margin-bottom: 2.5vh;
    padding-bottom: 4vh;
    width: 100%;

    -webkit-box-shadow: 0 5px 6px -6px ${props => props.theme.colors.shadow};
    -moz-box-shadow: 0 5px 6px -6px ${props => props.theme.colors.shadow};
    box-shadow: 0 5px 6px -6px ${props => props.theme.colors.shadow};
`;

const CompassDiv = styled(FlexDiv)`
    justify-content: center;
`;

const LogoDiv = styled(FlexDiv)`
    justify-content: center;
`;

const LogoImg = styled.img`
    width: 160px;
    height: 100%;

    ${widthMedia.phone} {
        width: 130px;
    }
`;

const RightHeader = styled(FlexDiv)`
    justify-content: flex-end;
    padding-right: 30px;
    box-sizing: border-box;
`;

export default Header;
