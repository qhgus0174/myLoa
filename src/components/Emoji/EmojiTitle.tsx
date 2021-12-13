import React, { HtmlHTMLAttributes } from 'react';
import styled from '@emotion/styled';

interface IEmojiTitle extends React.HTMLAttributes<HTMLElement> {
    symbol: any;
    label: JSX.Element;
}

const EmojiTitle = ({ symbol, label, ...rest }: IEmojiTitle) => {
    return (
        <Container {...rest}>
            <span>{symbol}</span>
            {label}
        </Container>
    );
};

const Container = styled.article`
    display: flex;
    align-items: center;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-left: 6px;
    }
`;
export default EmojiTitle;
