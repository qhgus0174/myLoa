import React from 'react';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import IconLabel from '@components/Label/IconLabel';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

interface IWeekGoldExplain {
    time: 'prev' | 'this';
    gold: number;
}

const WeekGoldExplain = ({ time, gold }: IWeekGoldExplain) => {
    const theme = useTheme();

    const timeKor = time === 'prev' ? '저번 주 보다' : '이번 주는 총';
    const plusKor = time === 'prev' ? ' 더 벌었네요!' : '이득입니다!';
    const minusKor = time === 'prev' ? ' 덜 벌었네요!' : '지출이 있었습니다!';

    return (
        <ResultInner>
            <span>{timeKor} </span>
            <TotalGoldDiv>
                <TitleAndGold
                    isPadding={false}
                    underline={false}
                    gold={gold}
                    negative={gold < 0}
                    goldTextColor={true}
                />
            </TotalGoldDiv>
            <span>&nbsp;만큼&nbsp;</span>
            {gold >= 0 ? (
                <IconLabel
                    label={<h4>{plusKor}</h4>}
                    iconUrl="/static/img/icon/mococo/nice_rabbit.png"
                    width="24"
                    height="24"
                />
            ) : (
                <IconLabel
                    label={<h4>{minusKor}</h4>}
                    iconUrl="/static/img/icon/mococo/sad_rabbit.png"
                    width="24"
                    height="24"
                />
            )}
        </ResultInner>
    );
};

const TotalGoldDiv = styled.div``;

const ResultInner = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-top: 0.32em;
`;

export default WeekGoldExplain;
