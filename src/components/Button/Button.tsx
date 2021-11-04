import React from 'react';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    width?: string;
    height?: string;
    icon?: JSX.Element;
    border?: 'none';
    color?: keyof Theme['buttonColors'];
}

const Button = ({ children, icon, color = 'none', type = 'button', border, ...rest }: IButtonProps) => {
    return (
        <>
            <BasicButton type={type} border={border} {...rest} icon={icon}>
                {icon}
                <span>{children}</span>
            </BasicButton>
        </>
    );
};

const BasicButton = styled.button<IButtonProps>`
    padding: 0.6rem 1.1rem;
    ${props => props.width && `width:${props.width}%`};
    box-sizing: border-box;
    outline: 0;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg,
    img {
        align-items: center;
        pointer-events: none;
    }
    span {
        pointer-events: none;
        margin-left: ${props => (props.icon ? 0.5 : 0)}em;
    }

    color: ${props => props.theme.colors.white};

    border: ${props => (props.border === `none` ? `none` : `1px solid ${props.theme.colors.white}`)};

    ${props => `
        background-color: ${props.theme.buttonColors[props.color ? props.color : 'none']};

    `}

    &:hover {
        opacity: 0.9;
        box-shadow: 0px 3px 12px -1px rgb(0 0 0 / 80%);
    }
`;

export default Button;
