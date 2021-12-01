import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { GlobalThemeContext } from '@context/GlobalThemeContext';
import { css } from '@emotion/react';
import { mainColor } from '@style/theme';
import { FlexArticle } from '@style/common';
import Theme from '@assets/icon/theme.png';

const SelectTheme = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { theme, setTheme } = useContext(GlobalThemeContext);

    return (
        <SelectThemeContainer>
            <ThemeTitle onClick={() => setVisible(!visible)}>
                <img src={Theme} />
                <span
                    css={css`
                        -webkit-background-clip: text;
                        background-image: linear-gradient(to right, #1de9b6, #2979ff);
                        -webkit-text-fill-color: transparent;
                        color: #464646;
                        display: inline-block;
                        padding: 0;
                        margin: 0;
                    `}
                >
                    테마
                </span>
            </ThemeTitle>
            <PaletteArticle visible={visible}>
                {mainColor.map((color, index) => {
                    return (
                        <article
                            key={index}
                            css={css`
                                display: flex;
                                flex-basis: 25%;
                                background-color: ${color.mainColor};
                            `}
                            onClick={() => setTheme(color.name)}
                        ></article>
                    );
                })}
            </PaletteArticle>
        </SelectThemeContainer>
    );
};

const SelectThemeContainer = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
`;
const PaletteArticle = styled(FlexArticle)<{ visible: boolean }>`
    display: ${props => (props.visible ? 'flex' : 'none')};
    flex-wrap: wrap;
    background: white;
    width: 10em;
    height: 10em;
    top: 30px;
    position: absolute;

    ${widthMedia.phone} {
        left: -90px;
        top: -160px;
    }
`;

const ThemeTitle = styled.article`
    cursor: pointer;
    img {
        display: none;
    }
    ${widthMedia.smallPhone} {
        img {
            display: block;
        }
        span {
            display: none;
        }
    }
`;

export default SelectTheme;
