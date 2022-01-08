import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ModalActionContext } from '@context/ModalContext';
import { MobileNavContext } from '@context/MobileNavContext';
import WeeklyContents from '@components/Contents/WeeklyContents';
import DayContents from '@components/Contents/DayContents';
import IconLabel from '@components/Label/IconLabel';
import Guide from '@components/Guide';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Dimmer } from '@style/common/modal';

interface INavbar {
    isMobile: boolean;
    visible?: boolean;
    direction?: 'left' | 'right';
    isActive?: boolean;
    border?: boolean;
}

const Navbar = ({ isMobile }: INavbar) => {
    const { setModalProps } = useContext(ModalActionContext);
    const { visible, setVisible } = useContext(MobileNavContext);
    const router = useRouter();

    const openDayContents = () => {
        setModalProps({
            isOpen: true,
            content: <DayContents />,
            options: { width: '300', height: '200', headerTitle: '일일 컨텐츠', isHeaderClose: true },
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
                            <InnerLinkLi isMobile={isMobile} isActive={router.pathname === '/'}>
                                <Link href="/">
                                    <LinkText>홈</LinkText>
                                </Link>
                            </InnerLinkLi>
                            <InnerLinkLi isMobile={isMobile} isActive={router.pathname === '/todo'}>
                                <Link href="/todo">
                                    <LinkText>숙제</LinkText>
                                </Link>
                            </InnerLinkLi>
                            <InnerLinkLi isMobile={isMobile} isActive={router.pathname === '/ledger'}>
                                <Link href="/ledger">
                                    <LinkText>가계부</LinkText>
                                </Link>
                            </InnerLinkLi>
                            <InnerLinkLi isMobile={isMobile} isActive={router.pathname === '/statistics'}>
                                <Link href="/statistics">
                                    <LinkText>가계부 통계</LinkText>
                                </Link>
                            </InnerLinkLi>
                            <InnerLinkLi isMobile={isMobile} isActive={router.pathname === '/manage'}>
                                <Link href="/manage">
                                    <LinkText>관리</LinkText>
                                </Link>
                            </InnerLinkLi>
                        </InnerUl>
                    </Li>
                    <Li isMobile={isMobile} direction="right">
                        <InnerUl isMobile={isMobile}>
                            <InnerLi
                                className="selectDayContents"
                                onClick={openDayContents}
                                isMobile={isMobile}
                                isActive={router.pathname === '/'}
                            >
                                일일
                            </InnerLi>
                            {!isMobile && <li>|</li>}
                            <InnerLi
                                className="selectWeeklyContents"
                                onClick={openWeeklyContents}
                                isMobile={isMobile}
                                isActive={router.pathname === '/'}
                            >
                                주간
                            </InnerLi>
                            {!isMobile && <li>|</li>}
                            <InnerLi
                                className="guide"
                                onClick={showGuide}
                                isMobile={isMobile}
                                isActive={router.pathname === '/'}
                            >
                                <IconLabel
                                    label={<h4>가이드</h4>}
                                    iconUrl="/static/img/icon/mococo/what_rabbit.png"
                                    width="20"
                                    height="20"
                                />
                            </InnerLi>
                            {!isMobile && <li>|</li>}
                            <InnerLi border={false} isMobile={isMobile}>
                                <a
                                    css={css`
                                        text-decoration: none;
                                    `}
                                    className="updateLog"
                                    href="https://north-ravioli-1b6.notion.site/Release-Note-84ce9a86118340b2944b161948cbc7c5"
                                    target="_blank"
                                >
                                    <IconLabel
                                        label={<h4>NEW!</h4>}
                                        iconUrl="/static/img/icon/mococo/heart.png"
                                        width="18"
                                        height="18"
                                    />
                                </a>
                            </InnerLi>
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
        padding-top: 0.5em;
        padding-bottom: calc(0.85em - 5px);
    `}
`;

const InnerUl = styled.ul<INavbar>`
    display: flex;
    ${props => props.isMobile && `flex-direction : column`};
    ${props => !props.isMobile && `justify-content: space-evenly`};
    box-sizing: border-box;
    width: 100%;
    align-items: center;
`;

const InnerLinkLi = styled.li<INavbar>`
    &:hover {
        background-size: 100% 5px, auto;
    }

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

    ${props => props.isActive && ` background-size: 100% 5px, auto`};

    & > span {
        display: inline-block;
        position: relative;
        z-index: 1;
        padding: 0.9em;
        margin: -0.9em;
    }
`;

const InnerLi = styled.li<INavbar>`
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-size: 100% 5px, auto;
    }

    ${props =>
        props.isMobile &&
        `
        padding-top: 20px;
        padding-bottom: 10px;
    `}

    ${props =>
        !props.isMobile &&
        props.border &&
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
`;

const LinkText = styled.span`
    cursor: pointer;
    box-sizing: border-box;
`;

export default Navbar;
