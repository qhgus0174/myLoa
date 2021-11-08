import React from 'react';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

export interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    color?: 'white' | 'white';
    checkColor?: keyof Theme['colors'];
    label?: string;
    shape?: 'circle' | 'square';
    transition?: boolean;
}

const Checkbox = ({
    checked,
    label,
    checkColor = 'check',
    transition = true,
    color = 'white',
    shape = 'circle',
    ...rest
}: ICheckbox) => {
    return (
        <CheckboxContainer>
            <Label transition={transition} checkColor={checkColor} checked={checked}>
                <CustomCheckbox type="checkbox" checked={checked} {...rest} />
                <Span transition={transition} shape={shape}></Span>
                {label && (
                    <CheckboxTitle checked color={color}>
                        {label}
                    </CheckboxTitle>
                )}
            </Label>
        </CheckboxContainer>
    );
};

const CheckboxContainer = styled.label`
    display: flex;
    vertical-align: middle;
`;

const Label = styled.label<ICheckbox>`
    cursor: pointer;
    position: relative;

    &:hover {
        span {
            &:before {
                width: 5px;
                ${props => props.transition && `transition: width 100ms ease;`}
            }

            &:after {
                width: 10px;
                ${props => props.transition && `transition: width 150ms ease 100ms;`}
            }
        }
    }

    ${props =>
        props.checked &&
        `
            span {
                background-color: ${props.theme.colors.white};
                transform: scale(1.2); 

                &:after {
                    width: 10px;
                    background: ${props.theme.colors[props.checkColor ? props.checkColor : `check`]};
                    ${props.transition && `transition: width 150ms ease 100ms;`} // enlarge the tick
                }

                &:before {
                    width: 5px;
                    background: ${props.theme.colors[props.checkColor ? props.checkColor : `check`]};
                    ${props.transition && `transition: width 150ms ease 100ms;`} // enlarge the tick
                }
            }

            &:hover {
                span {
                    background-color: ${props.theme.colors.white};
                    transform: scale(1.3); // enlarge the box

                    &:after {
                        width: 10px;
                        background: ${props.theme.colors[props.checkColor ? props.checkColor : `check`]};
                        ${props.transition && `transition: width 150ms ease 100ms;`} // enlarge the tick
                    }

                    &:before {
                        width: 5px;
                        background: ${props.theme.colors[props.checkColor ? props.checkColor : `check`]};
                        ${props.transition && `transition: width 150ms ease 100ms;`} // enlarge the tick
                    }
                }
            }
    `};
`;

const Span = styled.span<Pick<ICheckbox, 'shape' | 'transition'>>`
    display: inline-block;
    position: relative;
    background-color: transparent;
    width: 25px;
    height: 25px;
    transform-origin: center;
    border: 2px solid ${props => props.theme.colors.white};
    border-radius: ${props => (props.shape === 'circle' ? '50%' : '0%')};
    vertical-align: -6px;

    ${props =>
        props.transition &&
        `transition: background-color 150ms 200ms, transform 350ms cubic-bezier(0.78, -1.22, 0.17, 1.89);`} // custom ease effect for bouncy animation

    &:before {
        content: '';
        width: 0px;
        height: 2px;
        border-radius: 2px;
        background: ${props => props.theme.colors.white};
        position: absolute;
        transform: rotate(45deg);
        top: 13px;
        left: 9px;
        ${props => props.transition && `transition: width 50ms ease 50ms;`}
        transform-origin: 0% 0%;
    }

    &:after {
        content: '';
        width: 0;
        height: 2px;
        border-radius: 2px;
        background: ${props => props.theme.colors.white};
        position: absolute;
        transform: rotate(305deg);
        top: 16px;
        left: 10px;
        ${props => props.transition && `transition: width 50ms ease;`}
        transform-origin: 0% 0%;
    }
`;

const CustomCheckbox = styled.input`
    display: none; // hide the system checkbox
`;

const CheckboxTitle = styled.span<ICheckbox>`
    margin-left: 0.5em;
`;

export default Checkbox;
