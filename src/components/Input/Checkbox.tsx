import React from 'react';
import styled from '@emotion/styled';

export interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    color?: 'white' | 'white';
    label?: string;
}

const Checkbox = ({ checked, label, color = 'white', ...rest }: ICheckbox) => {
    return (
        <CheckboxContainer>
            <Label checked={checked}>
                <CustomCheckbox type="checkbox" checked={checked} {...rest} />
                <Span></Span>
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
                transition: width 100ms ease;
            }

            &:after {
                width: 10px;
                transition: width 150ms ease 100ms;
            }
        }
    }

    ${props =>
        props.checked &&
        `
            span {
                background-color: ${props.theme.colors.white};
                transform: scale(1.2); // enlarge the box

                &:after {
                    width: 10px;
                    background: ${props.theme.colors.check};
                    transition: width 150ms ease 100ms; // enlarge the tick
                }

                &:before {
                    width: 5px;
                    background: ${props.theme.colors.check};
                    transition: width 150ms ease 100ms; // enlarge the tick
                }
            }

            &:hover {
                // copy the states for onMouseOver to avoid flickering
                span {
                    background-color: ${props.theme.colors.white};
                    transform: scale(1.3); // enlarge the box

                    &:after {
                        width: 10px;
                        background: ${props.theme.colors.check};
                        transition: width 150ms ease 100ms; // enlarge the tick
                    }

                    &:before {
                        width: 5px;
                        background: ${props.theme.colors.check};
                        transition: width 150ms ease 100ms; // enlarge the tick
                    }
                }
            }
    `};
`;

const Span = styled.span`
    display: inline-block;
    position: relative;
    background-color: transparent;
    width: 25px;
    height: 25px;
    transform-origin: center;
    border: 2px solid ${props => props.theme.colors.white};
    border-radius: 50%;
    vertical-align: -6px;
    margin-right: 10px;
    transition: background-color 150ms 200ms, transform 350ms cubic-bezier(0.78, -1.22, 0.17, 1.89); // custom ease effect for bouncy animation

    &:before {
        content: '';
        width: 0px;
        height: 2px;
        border-radius: 2px; // so that the tick has nice rounded look
        background: ${props => props.theme.colors.white};
        position: absolute;
        transform: rotate(45deg);
        top: 13px; // you'll need to experiment with placement depending on the dimensions you've chosen
        left: 9px; // you'll need to experiment with placement depending on the dimensions you've chosen
        transition: width 50ms ease 50ms;
        transform-origin: 0% 0%;
    }

    &:after {
        content: '';
        width: 0;
        height: 2px;
        border-radius: 2px; // so that the tick has nice rounded look
        background: ${props => props.theme.colors.white};
        position: absolute;
        transform: rotate(305deg);
        top: 16px; // you'll need to experiment with placement depending on the dimensions you've chosen
        left: 10px; // you'll need to experiment with placement depending on the dimensions you've chosen
        transition: width 50ms ease;
        transform-origin: 0% 0%;
    }
`;

const CustomCheckbox = styled.input`
    display: none; // hide the system checkbox

    // Let's add some effects after the checkbox is checked
`;

const CheckboxTitle = styled.span<ICheckbox>`
    margin-left: 0.5em;
`;

export default Checkbox;
