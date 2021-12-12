import React from 'react';
import styled from '@emotion/styled';
import { FlexArticle } from '@style/common';
import { IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';

interface IRanking {
    title: string;
    array: IStatisticsPersonalPrev[];
}

const Ranking = ({ title, array }: IRanking) => {
    return (
        <Container direction="column">
            <h3>{title}</h3>
            {array
                .sort(({ gold: beforGold }, { gold: afterGold }) => {
                    return afterGold - beforGold;
                })
                .slice(0, 3)
                .map(({ name, gold }, index) => {
                    return (
                        <div key={index}>
                            {index + 1}위{name}
                            {gold}
                        </div>
                    );
                })}
        </Container>
    );
};

const Container = styled(FlexArticle)``;

export default Ranking;
