import React from 'react';
import styled from '@emotion/styled';

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
        background: ${props => props.theme.colors.hover};
    }

    ${props => props.checked && `background: ${props.theme.colors.hover}`}
`;

const Radio = styled.input`
    display: none;
`;

const Text = styled.div<Pick<IRadio, 'checked'>>`
    color: ${props => props.theme.colors.gray};
    transition: 0.1s;

    ${props => props.checked && `color: ${props.theme.colors.text}; font-weight:500;`}
`;

export default RadioButton;
