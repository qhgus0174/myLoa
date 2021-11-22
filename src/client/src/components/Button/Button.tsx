import React from 'react';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import { responsiveWidth } from '@style/device';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    width?: string;
    height?: string;
    icon?: JSX.Element;
    iconOnly?: boolean;
    border?: 'none';
    color?: keyof Theme['button'];
    borderColor?: keyof Theme['button'];
}

const Button = ({
    children,
    icon,
    borderColor,
    color = 'none',
    type = 'button',
    border,
    iconOnly,
    ...rest
}: IButtonProps) => {
    return (
        <>
            <BasicButton
                iconOnly={iconOnly}
                borderColor={borderColor}
                color={color}
                type={type}
                border={border}
                {...rest}
                icon={icon}
            >
                {icon}
                {!iconOnly && <span>{children}</span>}
            </BasicButton>
        </>
    );
};

const BasicButton = styled.button<IButtonProps>`
    padding: ${props => (props.iconOnly ? `0` : `0.6rem 1.1rem`)};
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
        box-sizing: border-box;
        pointer-events: none;
        margin-left: ${props => (props.icon ? 0.5 : 0)}em;
        color: ${props => (props.borderColor ? props.theme.button[props.borderColor] : props.theme.button.color)};
    }

    border: ${props =>
        props.border === `none`
            ? `none`
            : `1.3px solid ${props.borderColor ? props.theme.button[props.borderColor] : props.theme.button.color}`};

    ${props => `
        background-color: ${props.theme.button[props.color ? props.color : 'none']};

    `}

    &:hover {
        ${props =>
            props.borderColor ||
            `
            span {
                color:${props.theme.button.hover.color};
            }

            background : ${props.theme.button.hover.background};

            svg{
                fill:${props.theme.button.hover.color};
            }
        `}

        ${responsiveWidth.tablet} {
            background: transparent;
        }

        box-shadow: 0px 3px 10px -1px rgb(0 0 0 / 80%);
    }
`;

export default Button;
