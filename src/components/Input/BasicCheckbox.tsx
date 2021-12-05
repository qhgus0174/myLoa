import React from 'react';
import styled from '@emotion/styled';

export interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    label?: string;
}

const BasicCheckbox = ({ checked, label, ...rest }: ICheckbox) => {
    return (
        <CheckboxContainer>
            <Label checked={checked}>
                <CustomCheckbox type="checkbox" checked={checked} {...rest} />
                <Span></Span>
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
        span:nth-of-type(1) {
            &:before {
                background: ${props => props.theme.check.border};
                width: 5px;
            }

            &:after {
                background: ${props => props.theme.check.border};
                width: 10px;
            }
        }
    }

    ${props =>
        props.checked &&
        `
        span:nth-of-type(1) {
                background-color: ${props.theme.check.background};

                &:after {
                    width: 10px;
                    background: ${props.theme.check.basicMark};
                }

                &:before {
                    width: 5px;
                    background:${props.theme.check.basicMark};
                }
            }

            &:hover {
                span:nth-of-type(1) {
                    background-color: ${props.theme.check.background};

                    &:after {
                        width: 10px;
                        background: ${props.theme.check.basicMark};
                    }

                    &:before {
                        width: 5px;
                        background: ${props.theme.check.basicMark};
                    }
                }
            }
    `};
`;

const Span = styled.span`
    display: inline-block;
    background-color: transparent;
    width: 25px;
    height: 25px;
    transform-origin: center;
    border: 2px solid ${props => props.theme.colors.text};
    box-sizing: border-box;
    border-radius: 0%;
    vertical-align: -6px;

    &:before {
        content: '';
        width: 0px;
        height: 2px;
        border-radius: 2px;
        background: ${props => props.theme.colors.main};
        position: absolute;
        transform: rotate(45deg);
        top: 13px;
        left: 9px;
        transform-origin: 0% 0%;
    }

    &:after {
        content: '';
        width: 0;
        height: 2px;
        border-radius: 2px;
        background: ${props => props.theme.colors.main};
        position: absolute;
        transform: rotate(305deg);
        top: 16px;
        left: 10px;
        transform-origin: 0% 0%;
    }
`;

const CustomCheckbox = styled.input`
    display: none; // hide the system checkbox
`;

const CheckboxTitle = styled.span<ICheckbox>`
    margin-left: 0.5em;
`;

export default BasicCheckbox;
