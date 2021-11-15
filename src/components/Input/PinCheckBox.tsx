import React from 'react';
import styled from '@emotion/styled';

export interface ICheckbox extends React.InputHTMLAttributes<HTMLElement> {
    checked: boolean;
    color?: 'white' | 'white';
    label?: string;
    isLine?: boolean;
}

const PinCheckbox = ({ checked, label, color = 'white', isLine = false, ...rest }: ICheckbox) => {
    return (
        <CheckboxDiv checked={checked} onClick={rest.onClick}>
            <Label checked={checked} isLine={isLine}></Label>
        </CheckboxDiv>
    );
};

const CheckboxDiv = styled.div<{ checked: boolean }>`
    position: relative;
    display: flex;
`;

const CustomCheckbox = styled.input`
    display: none;
`;

const Label = styled.label<{ checked: boolean; isLine: boolean }>`
    background-color: ${props => props.theme.colors.translucent};
    border-radius: 50%;
    cursor: pointer;
    height: 14px;
    left: 0;
    top: 0;
    width: 14px;

    ${props => props.isLine && `position : absolute;`}

    ${props =>
        props.checked &&
        `
    background-color: ${props.theme.colors.pin};
    &:after{ opacity: 1;}
    `}
`;

export default PinCheckbox;
