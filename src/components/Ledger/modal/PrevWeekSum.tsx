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
            <WeekSum
                title="~4주전"
                rightOption={
                    <BasicCheckbox
                        checked={isContainThisWeek}
                        onChange={e => setIsContainThisWeek(!isContainThisWeek)}
                        label={<span>이번 주 포함</span>}
                    />
                }
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

export default PrevWeekSum;
