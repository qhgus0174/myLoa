import React from 'react';
import styled from '@emotion/styled';

export interface ICheckbox extends React.InputHTMLAttributes<HTMLElement> {
    checked: boolean;
    label?: string;
    isLine?: boolean;
}

const PinCheckbox = ({ checked, label, isLine = false, ...rest }: ICheckbox) => {
    return (
        <CheckboxArticle checked={checked} onClick={rest.onClick}>
            <Label checked={checked} isLine={isLine}></Label>
        </CheckboxArticle>
    );
};

const CheckboxArticle = styled.article<{ checked: boolean }>`
    position: relative;
    display: flex;
`;

const Label = styled.label<{ checked: boolean; isLine: boolean }>`
    background-color: ${props => props.theme.colors.gray};
    border-radius: 50%;
    cursor: pointer;
    height: 14px;
    left: 0;
    top: 0;
    width: 14px;

    ${props => props.isLine && `position : absolute;`}

    ${props =>
        props.checked &&
        `
    background-color: ${props.theme.colors.pin};
    &:after{ opacity: 1;}
    `}
`;

export default PinCheckbox;
