import React from 'react';
import SelectTheme from '@components/Palette/SelectTheme';
import Compass from '@components/Layout/Compass';
import Logo from '@assets/img/logo/logo.png';
import { ReactComponent as Setting } from '@assets/img/setting.svg';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { FlexDiv } from '@style/common';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';

const Header = () => {
    const pathName = useLocation().pathname;

    return (
        <HeaderDiv>
            <CompassDiv basis="40">
                <Compass />
            </CompassDiv>
            <LogoDiv basis="20">
                <Link to="/">
                    <LogoImg src={Logo} />
                </Link>
            </LogoDiv>
            <RightHeader basis="40">
                <StyledLink to="/mng">
                    <Setting
                        css={css`
                            cursor: pointer;
                        `}
                        width="25px"
                        height="25px"
                    />
                </StyledLink>
                <SelectTheme />
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
    align-items: center;
`;

const StyledLink = styled(Link)`
    margin-right: 20px;
    flex-basis: 80%;
    justify-content: flex-end;
    display: flex;
`;

export default Header;
