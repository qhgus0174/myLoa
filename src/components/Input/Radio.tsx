import styled from '@emotion/styled';
import React from 'react';

interface IRadio extends React.InputHTMLAttributes<HTMLInputElement> {
    text: string;
    checked: boolean;
    value: any;
}

const RadioButton = ({ text, checked, ...rest }: IRadio) => {
    return (
        <Label checked={checked}>
            <Radio type="radio" checked={checked} {...rest} />
            <Text checked={checked}>{text}</Text>
        </Label>
    );
};

const Label = styled.label<Pick<IRadio, 'checked'>>`
    padding: 0.7em;
    border-radius: 1em;
    display: inline-flex;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover,
    &:focus-within {
        background: ${props => props.theme.colors.hoverGray};
    }

    ${props => props.checked && `background: ${props.theme.colors.hoverGray}`}
`;

const Radio = styled.input`
    display: none;
`;

const Text = styled.div<Pick<IRadio, 'checked'>>`
    color: ${props => props.theme.colors.translucent};
    transition: 0.1s;

    ${props => props.checked && `color: ${props.theme.colors.white};`}
`;

export default RadioButton;
