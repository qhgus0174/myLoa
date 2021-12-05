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
import { FlexArticle } from '@style/common';
import Link from 'next/link';
import { ModalActionContext } from '@context/ModalContext';
import Guide from '@components/Guide';

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

    const showGuide = () => {
        setModalProps({
            isOpen: true,
            content: <Guide />,
            options: { width: '700', height: '500', headerTitle: '가이드', isHeaderClose: true },
        });
    };

    return (
        <>
            <HeaderContainer>
                <LeftHeader>
                    <Compass />
                </LeftHeader>
                <HeaderInner>
                    <Link href="/">
                        <LogoImg src={Logo} />
                    </Link>
                </HeaderInner>
                <RightHeader>
                    <Link href="/">
                        <LinkText>홈</LinkText>
                    </Link>
                    <GuideArticle>
                        <QuestionSpan className="guide" onClick={showGuide}>
                            가이드
                        </QuestionSpan>
                    </GuideArticle>
                    <Link href="/Manage">
                        <LinkText>관리</LinkText>
                    </Link>
                    <SelectTheme />
                </RightHeader>
            </HeaderContainer>
            <HeaderResponsiveContainer>
                <FooterNav className="selectDayContents" onClick={openDayContents}>
                    🔎 일일
                </FooterNav>
                <FooterNav className="selectWeeklyContents" onClick={openWeeklyContents}>
                    🔎 주간
                </FooterNav>
                <FooterNav>
                    <Link href="/">
                        <img src={Home} />
                    </Link>
                </FooterNav>
                <FooterNav>
                    <Link href="/Manage">
                        <img src={Setting} />
                    </Link>
                </FooterNav>
                <FooterNav>
                    <SelectTheme />
                </FooterNav>
            </HeaderResponsiveContainer>
        </>
    );
};
const HeaderContainer = styled.header`
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

const HeaderInner = styled.article`
    display: flex;
    flex-basis: 20%;
    justify-content: center;
`;

const LogoImg = styled.img`
    width: 160px;
    height: 100%;
    cursor: pointer;

    ${widthMedia.smallPhone} {
        width: 130px;
    }
`;
const LeftHeader = styled.article`
    display: flex;
    flex-basis: 40%;
    align-items: center;
    justify-content: space-evenly;
`;

const RightHeader = styled.nav`
    display: flex;
    flex-basis: 40%;
    align-items: center;
    justify-content: space-evenly;

    span {
        font-weight: 500;
        font-size: 1.1rem;
    }
`;

const HeaderResponsiveContainer = styled.header`
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

const LinkText = styled.span`
    cursor: pointer;
`;

const FooterNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 20%;
    text-decoration: none;
`;

const GuideArticle = styled(FlexArticle)`
    align-items: center;
    justify-content: center;
`;

const QuestionSpan = styled.span`
    cursor: pointer;
    font-weight: 500;
`;
export default Header;
