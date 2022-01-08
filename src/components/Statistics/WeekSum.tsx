import React from 'react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common/layout/common';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import { widthMedia } from '@style/device';
import { useTheme } from '@emotion/react';
import { IncomeSpendingType } from '@common/types/types';

interface IWeekSum {
    common: number;
    personal: number;
    type: IncomeSpendingType | 'all';
}

const WeekSum = ({ common, personal, type }: IWeekSum) => {
    const theme = useTheme();

    const textColor =
        type === 'all' ? theme.colors.text : type === 'income' ? theme.ledger.income : theme.ledger.spending;

    const titleCommon = type === 'all' ? '공통 수입' : type === 'income' ? `공통 수입` : `공통 지출`;
    const titlePersonal = type === 'all' ? '캐릭터 별 수입' : type === 'income' ? `캐릭별 수입` : `캐릭별 지출`;

    const isNagative = type === 'all' ? false : type === 'income' ? false : true;

    return (
        <Container direction="column">
            <GoldList>
                <TitleAndGold goldTextColor={textColor} title={titleCommon} gold={common} negative={isNagative} />
                <TitleAndGold goldTextColor={textColor} title={titlePersonal} gold={personal} negative={isNagative} />
                <TitleAndGold goldTextColor={textColor} title="총 계" gold={common + personal} negative={isNagative} />
            </GoldList>
        </Container>
    );
};

const Container = styled(FlexDiv)``;

const GoldList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    ${widthMedia.tablet} {
        width: 80%;
        align-self: center;
    }
    .total strong {
        color: #e6674b;
    }
`;

export default WeekSum;
