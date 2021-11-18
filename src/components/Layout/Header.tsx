import React from 'react';
import SelectTheme from '@components/Palette/SelectTheme';
import Compass from '@components/Layout/Compass';
import Logo from '@assets/img/logo/logo.png';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { FlexDiv } from '@style/common';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <HeaderDiv>
            <HeaderInner basis="40">
                <Compass />
            </HeaderInner>
            <HeaderInner basis="20">
                <Link to="/">
                    <LogoImg src={Logo} />
                </Link>
            </HeaderInner>
            <RightHeader basis="40">
                <SelectTheme />
                <StyledLink to="/mng">
                    <span>관리</span>
                </StyledLink>
            </RightHeader>
        </HeaderDiv>
    );
};
const HeaderDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3.5vh;
    margin-bottom: 2.5vh;
    padding-bottom: 3.5vh;
    width: 100%;

    -webkit-box-shadow: 0 5px 6px -6px ${props => props.theme.colors.shadow};
    -moz-box-shadow: 0 5px 6px -6px ${props => props.theme.colors.shadow};
    box-shadow: 0 5px 6px -6px ${props => props.theme.colors.shadow};
`;

const HeaderInner = styled(FlexDiv)`
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
    align-items: center;
    justify-content: space-evenly;

    span {
        font-weight: 500;
        font-size: 1.1rem;
    }
`;

const StyledLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
`;

export default Header;
