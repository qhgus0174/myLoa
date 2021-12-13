import React from 'react';
import { IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { widthMedia } from '@style/device';

interface IRanking {
    title: string;
    array: IStatisticsPersonalPrev[];
}

const Ranking = ({ title, array }: IRanking) => {
    const medal = (rank: number) => {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
        }
    };
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
                        <TitleAndGold key={index} icon={medal(index + 1)} underline={false} title={name} gold={gold} />
                    );
                })}
        </Container>
    );
};

const Container = styled(FlexDiv)`
    width: 80%;

    ${widthMedia.desktop} {
        align-self: center;
        padding: 1em;
        width: 100%;
    }

    ${widthMedia.tablet} {
        align-self: center;
        padding: 1em;
        width: 80%;
    }

    ${widthMedia.phone} {
        width: 100%;
        padding: 0;
    }
`;

export default Ranking;
