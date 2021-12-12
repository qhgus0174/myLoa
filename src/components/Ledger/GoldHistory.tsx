import React from 'react';
import TitleAndGold from './TitleAndGold';

interface IGoldHistory {
    name: string;
    prevWeekGold: number;
}

const GoldHistory = ({ name, prevWeekGold }: IGoldHistory) => {
    return (
        <>
            <span>{name}</span>
            <TitleAndGold title="저번 주에 번 골드" gold={prevWeekGold} />
        </>
    );
};

export default GoldHistory;
