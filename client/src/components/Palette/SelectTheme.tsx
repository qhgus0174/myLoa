import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { GlobalThemeContext } from '@context/GlobalThemeContext';
import { css } from '@emotion/react';
import { mainColor } from '@style/theme';
import { FlexDiv } from '@style/common';
import Theme from '@assets/icon/theme.png';

const SelectTheme = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { theme, setTheme } = useContext(GlobalThemeContext);

    return (
        <SelectThemeContainer>
            <ThemeTitle onClick={() => setVisible(!visible)}>
                <img src={Theme} />
                <span>테마</span>
            </ThemeTitle>
            <PaletteDiv visible={visible}>
                {mainColor.map((color, index) => {
                    return (
                        <div
                            key={index}
                            css={css`
                                display: flex;
                                flex-basis: 25%;
                                background-color: ${color.mainColor};
                            `}
                            onClick={() => setTheme(color.name)}
                        ></div>
                    );
                })}
            </PaletteDiv>
        </SelectThemeContainer>
    );
};

const SelectThemeContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`;
const PaletteDiv = styled(FlexDiv)<{ visible: boolean }>`
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

const ThemeTitle = styled.div`
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
