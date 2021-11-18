import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { GlobalThemeContext } from '@context/GlobalThemeContext';
import { css } from '@emotion/react';
import { ReactComponent as PaletteIcon } from '@assets/img/palette.svg';
import { mainColor } from '@style/theme';
import { FlexDiv } from '@style/common';

const SelectTheme = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { theme, setTheme } = useContext(GlobalThemeContext);

    return (
        <SelectThemeContainer>
            <span
                css={css`
                    cursor: pointer;
                `}
                onClick={() => setVisible(!visible)}
            >
                테마
            </span>
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
`;
export default SelectTheme;
