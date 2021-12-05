import React from 'react';
import styled from '@emotion/styled';

export interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    label?: string;
    shape?: 'circle' | 'square';
}

const TodoCheckbox = ({ checked, label, shape = 'circle', ...rest }: ICheckbox) => {
    return (
        <CheckboxContainer>
            <Label checked={checked}>
                <CustomCheckbox type="checkbox" checked={checked} {...rest} />
                <Span shape={shape}></Span>
                {label && <CheckboxTitle checked>{label}</CheckboxTitle>}
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
                background: ${props => props.theme.check.border};
                transition: width 100ms ease;
            }

            &:after {
                width: 10px;
                background: ${props => props.theme.check.border};
                $transition: width 150ms ease 100ms;
            }
        }
    }

    &:before,
    &:after {
        position: absolute;
        content: '';
        top: -8px;
        bottom: -8px;
        right: -8px;
        left: -8px;
    }

    ${props =>
        props.checked &&
        `
            span {
                background-color: ${props.theme.check.background};
                transform: scale(1.15); 

                &:after {
                    width: 10px;
                    background: ${props.theme.check.mark};
                    transition: width 150ms ease 100ms; // enlarge the tick
                }

                &:before {
                    width: 5px;
                    background: ${props.theme.check.mark};
                    transition: width 150ms ease 100ms; // enlarge the tick
                }
            }

            &:hover {
                span {
                    background-color: ${props.theme.check.background};
                    transform: scale(1.25); // enlarge the box

                    &:after {
                        width: 10px;
                        background: ${props.theme.check.mark};
                        transition: width 150ms ease 100ms;// enlarge the tick
                    }

                    &:before {
                        width: 5px;
                        background: ${props.theme.check.mark};
                        transition: width 150ms ease 100ms;// enlarge the tick
                    }
                }
            }
    `};
`;

const Span = styled.span<Pick<ICheckbox, 'shape'>>`
    display: inline-block;
    position: relative;
    background-color: transparent;
    width: 25px;
    height: 25px;
    transform-origin: center;
    border: 2px solid ${props => props.theme.check.border};
    border-radius: ${props => (props.shape === 'circle' ? '50%' : '0%')};
    vertical-align: -6px;

    transition: background-color 150ms 200ms, transform 350ms cubic-bezier(0.78, -1.22, 0.17, 1.89);
    &:before {
        content: '';
        width: 0px;
        height: 2px;
        border-radius: 2px;
        background: ${props => props.theme.check.background};
        position: absolute;
        transform: rotate(45deg);
        top: 13px;
        left: 9px;
        transition: width 50ms ease 50ms;
        transform-origin: 0% 0%;
    }

    &:after {
        content: '';
        width: 0;
        height: 2px;
        border-radius: 2px;
        background: ${props => props.theme.check.background};
        position: absolute;
        transform: rotate(305deg);
        top: 16px;
        left: 10px;
        transition: width 50ms ease;
        transform-origin: 0% 0%;
    }
`;

const CustomCheckbox = styled.input`
    display: none; // hide the system checkbox
`;

const CheckboxTitle = styled.span<ICheckbox>`
    margin-left: 0.5em;
`;

export default TodoCheckbox;
