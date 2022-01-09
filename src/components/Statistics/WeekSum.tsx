import React from 'react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common/layout/common';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import { widthMedia } from '@style/device';
import { useTheme } from '@emotion/react';
import { IncomeSpendingType } from '@common/types/types';
import IconLabel from '@components/Label/IconLabel';

interface IWeekSum {
    common: number;
    personal: number;
    title: string;
    type: IncomeSpendingType | 'all';
    rightOption?: JSX.Element;
}

const WeekSum = ({ common, personal, type, title, rightOption }: IWeekSum) => {
    const theme = useTheme();

    const textColor =
        type === 'all' ? theme.colors.text : type === 'income' ? theme.ledger.income : theme.ledger.spending;

    const titleCommon = type === 'all' ? '공통 수입' : type === 'income' ? `공통 수입` : `공통 지출`;
    const titlePersonal = type === 'all' ? '캐릭터 별 수입' : type === 'income' ? `캐릭별 수입` : `캐릭별 지출`;

    const isNagative = type === 'all' ? false : type === 'income' ? false : true;

    return (
        <Container direction="column">
            <Title>
                <IconLabel
                    label={<h4>{title}</h4>}
                    iconUrl="/static/img/icon/mococo/rabbit.png"
                    width="24"
                    height="24"
                />
                {rightOption && rightOption}
            </Title>
            <GoldList>
                <TitleAndGold goldTextColorStr={textColor} title={titleCommon} gold={common} negative={isNagative} />
                <TitleAndGold
                    goldTextColorStr={textColor}
                    title={titlePersonal}
                    gold={personal}
                    negative={isNagative}
                />
                <TitleAndGold
                    goldTextColorStr={textColor}
                    title="총 계"
                    gold={common + personal}
                    negative={isNagative}
                />
            </GoldList>
        </Container>
    );
};

const Container = styled(FlexDiv)``;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    align-items: center;

    & > h3,
    & > label {
        flex-basis: 50%;
    }
`;

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
