import React from 'react';
import styled from '@emotion/styled';

export interface ITextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    width?: string;
    divWidth?: string;
    align?: 'left' | 'right' | 'center';
    underline?: boolean;
    focusLine?: boolean;
    icon?: JSX.Element;
    color?: string;
}

const TextBox = ({
    width,
    divWidth = '100',
    type = 'text',
    align,
    underline = true,
    focusLine = true,
    icon,
    color,
    ...rest
}: ITextProps) => {
    return (
        <InputContainer divWidth={divWidth}>
            {icon && icon}
            <CustomInput
                align={align}
                type={type}
                width={width}
                underline={underline}
                focusLine={focusLine}
                color={color}
                {...rest}
                autoComplete="false"
            />
            <Span></Span>
        </InputContainer>
    );
};

const InputContainer = styled.article<{ divWidth: string }>`
    position: relative;
    display: inline-block;
    width: ${props => props.divWidth}%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Span = styled.span`
    position: absolute;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.white};
`;

const CustomInput = styled.input<ITextProps>`
    width: ${props => (props.width ? props.width : '100')}%;

    background-color: transparent;
    border: none;
    outline: none;
    box-sizing: border-box;
    padding-bottom: 0.5em;
    text-overflow: ellipsis;
    text-align: ${props => props.align};

    border-bottom: ${props => props.underline && `1px solid ${props.theme.colors.text}`};

    ${props =>
        props.focusLine &&
        `&:focus + ${Span} {
            width: ${props.width ? props.width : '100'}%;
            background: ${props.theme.colors.text};
        }`}

    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    ${props => props.color && `color : ${props.color}`};
`;

export default TextBox;
