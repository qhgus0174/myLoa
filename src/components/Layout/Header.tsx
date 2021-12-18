import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MobileNavContext } from '@context/MobileNavContext';
import { ModalActionContext } from '@context/ModalContext';
import SelectTheme from '@components/Palette/SelectTheme';
import Letter from '@components/Letter';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import Logo from '@assets/img/logo/logo.png';

const Header = () => {
    const { visible, setVisible } = useContext(MobileNavContext);
    const { setModalProps } = useContext(ModalActionContext);

    const openLetter = () => {
        setModalProps({
            isOpen: true,
            content: <Letter />,
            options: { width: '500', height: '480', headerTitle: '안내' },
        });
    };
    return (
        <HeaderContainer>
            <HeaderInner>
                <Link href="/">
                    <LogoImg src={Logo} />
                </Link>
            </HeaderInner>
            <RightHeader>
                <SelectTheme />
                <LetterArea onClick={() => openLetter()}>💌</LetterArea>
                <ResponsiveMenu>
                    <ResponsiveLi>
                        <SidebarImg
                            src="/static/img/icon/menu.png"
                            width="25"
                            height="25"
                            onClick={() => setVisible(!visible)}
                        />
                    </ResponsiveLi>
                </ResponsiveMenu>
            </RightHeader>
        </HeaderContainer>
    );
};

const SidebarImg = styled(Image)`
    cursor: pointer;
`;

const LetterArea = styled.div`
    margin-left: 2em;
    cursor: pointer;
`;

const HeaderContainer = styled.header`
    position: sticky;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2.1vh;
    padding-bottom: 2.1vh;
    width: 100%;
    height: 65px;
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.main};

    -webkit-box-shadow: 0 5px 6px -6px ${props => props.theme.colors.shadow};
    -moz-box-shadow: 0 5px 6px -6px ${props => props.theme.colors.shadow};
    box-shadow: 0 5px 6px -6px ${props => props.theme.colors.shadow};

    z-index: 100;
`;

const HeaderInner = styled.article`
    display: flex;
    flex-basis: 42%;
`;

const LogoImg = styled.img`
    width: 160px;
    height: 100%;
    cursor: pointer;

    ${widthMedia.smallPhone} {
        width: 130px;
    }
`;

const RightHeader = styled.nav`
    display: flex;
    flex-basis: 42%;
    align-items: center;
    justify-content: flex-end;

    span {
        font-weight: 500;
        font-size: 1.1rem;
    }

    section {
        margin-left: 2em;
    }
`;

const ResponsiveMenu = styled.section`
    display: none;
    ${widthMedia.tablet} {
        display: block;
    }
`;

const ResponsiveLi = styled.li`
    position: relative;
`;

export default Header;
