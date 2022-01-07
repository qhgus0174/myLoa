import React, { HtmlHTMLAttributes } from 'react';
import styled from '@emotion/styled';

interface IEmojiTitle extends React.HTMLAttributes<HTMLElement> {
    symbol: any;
    label: JSX.Element;
    symbolPosition?: 'left' | 'right';
}

const EmojiTitle = ({ symbol, label, symbolPosition = 'left', ...rest }: IEmojiTitle) => {
    return (
        <Container {...rest} symbolPosition={symbolPosition}>
            <span>{symbol}</span>
            {label}
        </Container>
    );
};

const Container = styled.article<Pick<IEmojiTitle, 'symbolPosition'>>`
    display: flex;
    align-items: center;

    & > h1,
    & > h2,
    & > h3,
    & > h4,
    & > h5,
    & > h6,
    & > p,
    & > strong {
        margin-left: 6px;
    }

    ${props =>
        props.symbolPosition === 'right'
            ? `
        flex-direction:row-reverse; 
        span{ 
            margin-left: 6px;
        }
    `
            : `
    span:nth-of-type(1){ 
            margin-right: 6px;
        }
    `}
`;
export default EmojiTitle;
