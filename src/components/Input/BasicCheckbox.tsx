import React from 'react';
import styled from '@emotion/styled';

export interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    label?: JSX.Element;
}

const BasicCheckbox = ({ checked, label, ...rest }: ICheckbox) => {
    return (
        <CheckboxContainer disabled={rest.disabled ? rest.disabled : false}>
            <CustomCheckbox type="checkbox" checked={checked} {...rest} />
            {label}
        </CheckboxContainer>
    );
};

const CheckboxContainer = styled.label<{ disabled: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    ${props =>
        props.disabled &&
        `
            cursor: not-allowed;
    `}
`;

const CustomCheckbox = styled.input`
    margin: 0.3em;
    position: relative !important;
    appearance: none;
    box-sizing: content-box;
    overflow: hidden;
    cursor: pointer;

    &:before {
        padding: 0.1em;
        content: '';
        display: block;
        box-sizing: content-box;
        width: 16px;
        height: 16px;
        border: 2px solid ${props => props.theme.colors.gray};
        transition: 0.1s border-color ease;
        border-radius: 4px;
        background: ${props => props.theme.check.background};

        ${props =>
            props.checked &&
            `
                border-color: ${props.theme.check.basicMark};
                transition: 0.1s border-color ease;
        `}

        ${props =>
            props.disabled &&
            `
                border-color: ${props.theme.colors.gray};
                background-color: ${props.theme.colors.gray};
                cursor: not-allowed;
        `}
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        box-sizing: content-box;
        top: 50%;
        left: 50%;
        transform-origin: 50% 50%;
        background-color: #ffffff;
        width: 16px;
        height: 16px;
        border-radius: 100vh;
        transform: translate(-50%, -50%) scale(0);
        ${props =>
            props.checked &&
            `
                animation: toggleOnCheckbox 0.2s ease forwards;
            `}

        width: 9.6px;
        height: 16px;
        border-radius: 0;
        transform: translate(-50%, -85%) scale(0) rotate(45deg);
        background-color: transparent;
        box-shadow: 4px 4px 0px 0px ${props => props.theme.check.basicMark};
    }

    @keyframes toggleOnCheckbox {
        0% {
            opacity: 0;
            transform: translate(-50%, -85%) scale(0) rotate(45deg);
        }

        70% {
            opacity: 1;
            transform: translate(-50%, -85%) scale(0.88) rotate(45deg);
        }

        100% {
            transform: translate(-50%, -85%) scale(0.78) rotate(45deg);
        }
    }
`;

export default BasicCheckbox;
