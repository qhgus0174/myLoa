import React from 'react';
import styled from '@emotion/styled';

interface ITitleGold {
    title: string;
    gold: number;
}

const TitleAndGold = ({ title, gold }: ITitleGold) => {
    return (
        <Container>
            <span>{title}</span>
            <span>{gold}</span>
        </Container>
    );
};

const Container = styled.article`
    display: flex;
`;

export default TitleAndGold;
