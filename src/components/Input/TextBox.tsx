import React from 'react';
import styled from '@emotion/styled';

export interface ITextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    width?: string;
    align?: 'left' | 'right' | 'center';
    underline?: boolean;
}

const TextBox = ({ width, type = 'text', align, underline = true, ...rest }: ITextProps) => {
    return (
        <InputDiv>
            <CustomInput align={align} type={type} width={width} underline={underline} {...rest} autoComplete="false" />
            <Span></Span>
        </InputDiv>
    );
};

const InputDiv = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    display: flex;
    justify-content: center;
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
    padding-bottom: 0.7em;
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
