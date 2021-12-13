import React, { useContext, useRef, useState } from 'react';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { GlobalThemeContext } from '@context/GlobalThemeContext';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { mainColor } from '@style/theme';

const SelectTheme = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { setTheme } = useContext(GlobalThemeContext);
    const theme = useTheme();

    const ref = useRef<HTMLElement>(null);

    useOnClickOutside(ref, () => setVisible(false));

    return (
        <Container ref={ref}>
            <ThemeTitle onClick={() => setVisible(!visible)}>
                <span
                    css={css`
                        -webkit-background-clip: text;
                        background-image: linear-gradient(to right, ${theme.colors.text}, #2979ff);
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
            <Palette visible={visible}>
                {mainColor.map((color, index) => {
                    return (
                        <ThemeBlock
                            themeColor={color.mainColor}
                            key={index}
                            onClick={() => {
                                setTheme(color.name);
                                setVisible(false);
                            }}
                        ></ThemeBlock>
                    );
                })}
            </Palette>
        </Container>
    );
};

const Container = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
`;

const Palette = styled.article<{ visible: boolean }>`
    display: ${props => (props.visible ? 'flex' : 'none')};
    flex-wrap: wrap;
    background: white;
    width: 10em;
    height: 10em;
    top: 30px;
    position: absolute;
`;

const ThemeTitle = styled.div`
    cursor: pointer;
`;

const ThemeBlock = styled.article<{ themeColor: string }>`
    display: flex;
    flex-basis: 25%;
    background-color: ${props => props.themeColor};
    cursor: pointer;
`;

export default SelectTheme;
