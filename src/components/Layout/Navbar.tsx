import React, { useContext } from 'react';
import Link from 'next/link';
import { ModalActionContext } from '@context/ModalContext';
import { MobileNavContext } from '@context/MobileNavContext';
import WeeklyContents from '@components/Contents/WeeklyContents';
import DayContents from '@components/Contents/DayContents';
import Guide from '@components/Guide';
import styled from '@emotion/styled';
import { Dimmer } from '@style/common/modal';
import { css } from '@emotion/react';

interface INavbar {
    isMobile: boolean;
    visible?: boolean;
    direction?: 'left' | 'right';
}

const Navbar = ({ isMobile }: INavbar) => {
    const { setModalProps } = useContext(ModalActionContext);

    const { visible, setVisible } = useContext(MobileNavContext);

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
            <Dimmer
                css={css`
                    display: ${visible ? `block` : `none`};
                    z-index: 99;
                `}
                tabIndex={-1}
                onClick={() => {
                    setVisible(false);
                }}
            ></Dimmer>
            <Nav isMobile={isMobile} visible={visible}>
                <Ul isMobile={isMobile}>
                    <Li isMobile={isMobile} direction="left">
                        <InnerUl isMobile={isMobile}>
                            <li>
                                <Link href="/">
                                    <LinkText>홈</LinkText>
                                </Link>
                            </li>
                            <li>
                                <Link href="/todo">
                                    <LinkText>숙제</LinkText>
                                </Link>
                            </li>
                            <li>
                                <Link href="/accountBook">
                                    <LinkText>가계부</LinkText>
                                </Link>
                            </li>
                            <li>
                                <Link href="/statistics">
                                    <LinkText>통계</LinkText>
                                </Link>
                            </li>
                            <li>
                                <Link href="/manage">
                                    <LinkText>관리</LinkText>
                                </Link>
                            </li>
                        </InnerUl>
                    </Li>
                    <Li isMobile={isMobile} direction="right">
                        <InnerUl isMobile={isMobile}>
                            <li>
                                <span className="selectDayContents" onClick={openDayContents}>
                                    🔎 일일 컨텐츠
                                </span>
                            </li>
                            {!isMobile && <li>|</li>}
                            <li>
                                <span className="selectWeeklyContents" onClick={openWeeklyContents}>
                                    🔎 주간 컨텐츠
                                </span>
                            </li>
                            {!isMobile && <li>|</li>}
                            <li>
                                <span className="guide" onClick={showGuide}>
                                    ❓ 가이드
                                </span>
                            </li>
                        </InnerUl>
                    </Li>
                </Ul>
            </Nav>
        </>
    );
};

const Nav = styled.nav<INavbar>`
    display: flex;
    min-width: 140px;
    border-top: 1px solid ${props => props.theme.colors.navBorder};
    border-bottom: 1px solid ${props => props.theme.colors.navBorder};
    background: rgba(0, 0, 0, 0.05});
    box-sizing: border-box;
    justify-content: center;
    width: 100%;

    ${props =>
        props.isMobile &&
        `
        position:absolute;
        margin-top: 65px;
        overflow: hidden;
        height: 100%;
        position: fixed;
        width: 250px;
        right: 0;
        z-index: 99;
        visibility: ${props.visible ? `visible` : `hidden`};
        transform:  ${props.visible ? `translateX(0)` : `translateX(250px)`};
        transition: transform 250ms ease-in-out;
        background-color: ${props.theme.colors.mainInner};
    `};
`;

const Ul = styled.ul<INavbar>`
    display: flex;
    box-sizing: border-box;
    width: 88%;
    ${props => !props.isMobile && `justify-content: space-between;`}

    ${props =>
        props.isMobile &&
        `
        flex-direction : column;
        width:140px;
    `}
`;

const Li = styled.li<INavbar>`
    display: flex;
    width: 100%;
    ${props =>
        !props.isMobile &&
        `    
        flex-basis: ${props.direction === `left` ? `60%` : `35%`};
        ${props.direction === `right` && `background: rgba(0, 0, 0, 0.05)`};
        padding-top: 0.85em;
        padding-bottom: calc(0.85em - 5px);
    `}
`;

const InnerUl = styled.ul<INavbar>`
    display: flex;
    ${props => props.isMobile && `flex-direction : column`};
    ${props => !props.isMobile && `justify-content: space-evenly`};
    box-sizing: border-box;
    width: 100%;

    li {
        ${props =>
            props.isMobile &&
            `
            padding-top: 20px;
            padding-bottom: 10px;
        `}

        ${props =>
            !props.isMobile &&
            `
            box-sizing: border-box;
            padding-bottom: 5px;
            cursor: pointer;
            background-image: linear-gradient(${props.theme.colors.white}, ${props.theme.colors.white});
            background-size: 0 5px, auto;
            background-repeat: no-repeat;
            background-position: center bottom;
            transition: all 0.15s ease-out;
        `}
    }

    li:hover {
        background-size: 100% 5px, auto;
    }
`;

const LinkText = styled.span`
    cursor: pointer;
    box-sizing: border-box;
`;

export default Navbar;
