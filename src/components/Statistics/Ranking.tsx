import React from 'react';
import { IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import EmojiTitle from '@components/Emoji/EmojiTitle';
import Nodata from '@components/article/Nodata';
import { css } from '@emotion/react';

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
        <>
            {title && (
                <EmojiTitle
                    css={css`
                        border-bottom: 1px dashed;
                        padding-bottom: 7px;
                    `}
                    label={<h4>{title}</h4>}
                    symbol={'📅'}
                />
            )}
            {array.length > 0 ? (
                array
                    .sort(({ gold: beforGold }, { gold: afterGold }) => {
                        return afterGold - beforGold;
                    })
                    .slice(0, 3)
                    .map(({ name, gold }, index) => {
                        return (
                            <TitleAndGold
                                key={index}
                                icon={medal(index + 1)}
                                underline={false}
                                title={name}
                                gold={gold}
                            />
                        );
                    })
            ) : (
                <Nodata text="데이터가 없습니다." />
            )}
        </>
    );
};

export default Ranking;
