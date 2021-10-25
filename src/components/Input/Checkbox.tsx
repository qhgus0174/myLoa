import React from 'react';
import styled from '@emotion/styled';

export interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    color: 'white' | 'main';
    label?: string;
}

const Checkbox = ({ checked, label, color = 'white', ...rest }: ICheckbox) => {
    return (
        <CheckboxContainer>
            <HiddenCheckbox type="checkbox" checked={checked} {...rest} />
            <StyledCheckbox color={color} checked={checked}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </Icon>
            </StyledCheckbox>
            {label && (
                <CheckboxTitle checked color={color}>
                    {label}
                </CheckboxTitle>
            )}
        </CheckboxContainer>
    );
};

const CheckboxContainer = styled.label`
    display: flex;
    vertical-align: middle;
`;

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div<ICheckbox>`
    width: 16px;
    height: 16px;
    border-radius: 3px;
    transition: all 150ms;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px gray;
    }

    ${Icon} {
        visibility: ${props => (props.checked ? 'visible' : 'hidden')};
    }
`;

const CheckboxTitle = styled.span<ICheckbox>`
    margin-left: 0.5em;
`;

export default Checkbox;
