import React, { useContext } from 'react';
import WeeklyContents from '@components/Contents/WeeklyContents';
import DayContents from '@components/Contents/DayContents';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import Link from 'next/link';
import { ModalActionContext } from '@context/ModalContext';
import Guide from '@components/Guide';

const Navbar = () => {
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
        <Nav>
            <Ul>
                <LeftLi>
                    <InnerUl>
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
                </LeftLi>
                <RightLi>
                    <InnerUl>
                        <li>
                            <span className="selectDayContents" onClick={openDayContents}>
                                🔎 일일 <ButtonInnerText>컨텐츠</ButtonInnerText>
                            </span>
                        </li>
                        <li>|</li>
                        <li>
                            <span className="selectWeeklyContents" onClick={openWeeklyContents}>
                                🔎 주간 <ButtonInnerText>컨텐츠</ButtonInnerText>
                            </span>
                        </li>
                        <li>|</li>
                        <li>
                            <span className="guide" onClick={showGuide}>
                                ❓ 가이드
                            </span>
                        </li>
                    </InnerUl>
                </RightLi>
            </Ul>
        </Nav>
    );
};

const Nav = styled.nav`
    width: 100%;
    margin-bottom: 0.5em;
    border-top: 1px solid ${props => props.theme.colors.navBorder};
    border-bottom: 1px solid ${props => props.theme.colors.navBorder};
    background: rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`;

const Ul = styled.ul`
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;
    width: 88%;
`;

const LeftLi = styled.li`
    display: flex;
    flex-basis: 60%;
    width: 100%;
    padding-top: 1em;
    padding-bottom: calc(1em - 5px);
`;

const RightLi = styled.li`
    display: flex;
    flex-basis: 35%;
    width: 100%;
    padding-top: 1em;
    padding-bottom: calc(1em - 5px);
    background: rgba(0, 0, 0, 0.05);
`;

const InnerUl = styled.ul`
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;
    width: 100%;

    li {
        box-sizing: border-box;
        padding-bottom: 5px;
        cursor: pointer;
        background-image: linear-gradient(${props => props.theme.colors.white}, ${props => props.theme.colors.white});
        background-size: 0 5px, auto;
        background-repeat: no-repeat;
        background-position: center bottom;
        transition: all 0.15s ease-out;
    }

    li:hover {
        background-size: 100% 5px, auto;
    }
`;

const LinkText = styled.span`
    cursor: pointer;
    box-sizing: border-box;
`;

const ButtonInnerText = styled.span`
    ${widthMedia.phone} {
        display: none;
    }
`;

export default Navbar;
