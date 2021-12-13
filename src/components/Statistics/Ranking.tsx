import React from 'react';
import { IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

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

const Container = styled(FlexDiv)``;

export default Ranking;
