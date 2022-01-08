import React, { useState } from 'react';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import EmojiTitle from '@components/Emoji/EmojiTitle';
import WeekSum from '@components/Statistics/WeekSum';
import styled from '@emotion/styled';
import { Comment } from '@style/common/text';

export interface IPrevWeekSum {
    commonAllGoldPrev: number;
    commonGoldThisWeek: number;
    personalAllGoldPrev: number;
    personalGoldThisWeek: number;
}

const PrevWeekSum = ({
    commonAllGoldPrev,
    commonGoldThisWeek,
    personalAllGoldPrev,
    personalGoldThisWeek,
}: IPrevWeekSum) => {
    const [isContainThisWeek, setIsContainThisWeek] = useState<boolean>(false);

    return (
        <WeekSumDiv>
            <Title>
                <EmojiTitle label={<h4>~4주전</h4>} symbol={'📅'} />
                <BasicCheckbox
                    checked={isContainThisWeek}
                    onChange={e => setIsContainThisWeek(!isContainThisWeek)}
                    label={<span>이번 주 포함</span>}
                />
            </Title>
            <WeekSum
                type="all"
                common={isContainThisWeek ? commonAllGoldPrev + commonGoldThisWeek : commonAllGoldPrev}
                personal={isContainThisWeek ? personalAllGoldPrev + personalGoldThisWeek : personalAllGoldPrev}
            />
            <br />
            <Comment>* 골드 수입만 계산 된 값 입니다.</Comment>
        </WeekSumDiv>
    );
};

const WeekSumDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 40%;
    width: 100%;
    justify-content: space-around;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    align-items: center;

    & > label:nth-of-type(1) {
        flex-basis: 50%;
    }

    & > h3,
    & > label {
        justify-content: flex-end;
    }
`;

export default PrevWeekSum;
