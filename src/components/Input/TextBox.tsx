import React from 'react';
import styled from '@emotion/styled';
import GoldIcon from '@components/Image/Gold';

export interface ITextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    width?: string;
    divWidth?: string;
    align?: 'left' | 'right' | 'center';
    underline?: boolean;
    icon?: JSX.Element;
}

const TextBox = ({ width, divWidth = '100', type = 'text', align, underline = true, icon, ...rest }: ITextProps) => {
    return (
        <InputContainer divWidth={divWidth}>
            {icon && icon}
            <CustomInput align={align} type={type} width={width} underline={underline} {...rest} autoComplete="false" />
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

    &:focus + ${Span} {
        width: ${props => (props.width ? props.width : '100')}%;
        background: ${props => props.theme.colors.text};
    }

    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export default TextBox;
