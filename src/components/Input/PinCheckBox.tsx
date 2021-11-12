import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Pin } from '@assets/img/pin.svg';

export interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    color?: 'white' | 'white';
    label?: string;
}

const PinCheckbox = ({ checked, label, color = 'white', ...rest }: ICheckbox) => {
    return (
        <CheckboxDiv checked={checked}>
            <CustomCheckbox type="checkbox" checked={checked} {...rest} />
            <Label checked={checked}></Label>
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

const Label = styled.label<{ checked: boolean }>`
    background-color: ${props => props.theme.colors.translucent};
    border-radius: 50%;
    cursor: pointer;
    height: 18px;
    left: 0;
    position: absolute;
    top: 0;
    width: 18px;

    ${props =>
        props.checked &&
        `
    background-color:  #F25287;
    &:after{ opacity: 1;}
    `}
`;

export default PinCheckbox;
