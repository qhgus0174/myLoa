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
            <PaletteIcon
                css={css`
                    cursor: pointer;
                `}
                width="25px"
                height="25px"
                onClick={() => setVisible(!visible)}
            />
            <PaletteDiv visible={visible}>
                {mainColor.map((color, index) => {
                    return (
                        <div
                            key={index}
                            css={css`
                                width: 25px;
                                height: 25px;
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
`;
const PaletteDiv = styled(FlexDiv)<{ visible: boolean }>`
    display: ${props => (props.visible ? 'block' : 'none')};
    background: white;
    width: 10em;
    height: 10em;
    left: -100px;
    position: absolute;
`;
export default SelectTheme;
