import React, { useContext } from 'react';
import SelectTheme from '@components/Palette/SelectTheme';
import WeeklyContents from '@components/Contents/WeeklyContents';
import DayContents from '@components/Contents/DayContents';
import Compass from '@components/Layout/Compass';
import Logo from '@assets/img/logo/logo.png';
import Home from '@assets/icon/home.png';
import Setting from '@assets/icon/setting.png';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { FlexDiv } from '@style/common';
import { Link } from 'react-router-dom';
import { ModalActionContext } from '@context/ModalContext';

const Header = () => {
    const { setModalProps } = useContext(ModalActionContext);

    const openDayContents = () => {
        setModalProps({
            isOpen: true,
            content: <DayContents />,
            options: { width: '300', height: '210', headerTitle: '일일 컨텐츠', isHeaderClose: true },
        });
    };

    const openWeeklyContents = () => {
        setModalProps({
            isOpen: true,
            content: <WeeklyContents />,
            options: { width: '400', height: '390', headerTitle: '주간 컨텐츠', isHeaderClose: true },
        });
    };

    return (
        <>
            <HeaderDiv>
                <LeftHeader basis="40">
                    <Compass />
                </LeftHeader>
                <HeaderInner basis="20">
                    <Link to="/">
                        <LogoImg src={Logo} />
                    </Link>
                </HeaderInner>
                <RightHeader basis="40">
                    <StyledLink to="/">
                        <span>홈</span>
                    </StyledLink>
                    <StyledLink to="/mng">
                        <span>관리</span>
                    </StyledLink>
                    <SelectTheme />
                </RightHeader>
            </HeaderDiv>
            <HeaderResponsiveDiv>
                <FooterDiv className="selectDayContents" onClick={openDayContents}>
                    🔎 일일
                </FooterDiv>
                <FooterDiv className="selectWeeklyContents" onClick={openWeeklyContents}>
                    🔎 주간
                </FooterDiv>
                <FooterDiv>
                    <StyledLink to="/">
                        <img src={Home} />
                    </StyledLink>
                </FooterDiv>
                <FooterDiv>
                    <StyledLink to="/mng">
                        <img src={Setting} />
                    </StyledLink>
                </FooterDiv>
                <FooterDiv>
                    <SelectTheme />
                </FooterDiv>
            </HeaderResponsiveDiv>
        </>
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

    ${widthMedia.smallPhone} {
        display: none;
    }
`;

const HeaderInner = styled(FlexDiv)`
    justify-content: center;
`;

const LogoImg = styled.img`
    width: 160px;
    height: 100%;

    ${widthMedia.smallPhone} {
        width: 130px;
    }
`;
const LeftHeader = styled(FlexDiv)`
    align-items: center;
    justify-content: space-evenly;
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
    display: flex;
`;

const HeaderResponsiveDiv = styled.div`
    display: none;

    ${widthMedia.smallPhone} {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        width: 100%;
        height: 60px;
        background: ${props => props.theme.colors.main};
        align-items: center;
        justify-content: space-around;
        box-shadow: 0 -5px 6px -6px ${props => props.theme.colors.shadow};
    }
`;

const FooterDiv = styled.div`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 20%;
`;

export default Header;
