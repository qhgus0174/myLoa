import React from 'react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import { widthMedia } from '@style/device';

interface IWeekSum {
    common: number;
    personal: number;
}

const WeekSum = ({ common, personal }: IWeekSum) => {
    return (
        <Container direction="column">
            <GoldList>
                <TitleAndGold title="공통 합" gold={common} />
                <TitleAndGold title="개인별 합" gold={personal} />
                <TitleAndGold className="total" title="총 계" gold={common + personal} />
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
