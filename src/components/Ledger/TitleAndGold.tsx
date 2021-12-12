import React from 'react';
import styled from '@emotion/styled';

interface ITitleGold {
    title: string;
    gold: number;
}

const TitleAndGold = ({ title, gold }: ITitleGold) => {
    return (
        <TitleGoldArticle>
            <span>{title}</span>
            <span>{gold}</span>
        </TitleGoldArticle>
    );
};

const TitleGoldArticle = styled.article`
    display: flex;
`;

export default TitleAndGold;
