import React from 'react';
import styled from '@emotion/styled';

export interface ITextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    width?: string;
}

const TextBox = ({ width, type = 'text', ...rest }: ITextProps) => {
    return <CustomInput type={type} width={width} {...rest} autoComplete="false" />;
};

const CustomInput = styled.input<ITextProps>`
    width: ${props => (props.width ? props.width : '100')}%;
    padding: 0.5em;
    margin: 0.5em;
    box-sizing: border-box;
    border: none;
    background: none;
    border-bottom: 1px solid white;
    border-bottom-width: medium;

    &:focus {
        outline: none;
        border-bottom: 1px solid black;
        border-bottom-width: medium;
    }
`;

export default TextBox;
