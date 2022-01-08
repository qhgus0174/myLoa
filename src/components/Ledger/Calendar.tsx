import React from 'react';
import { DateTime } from 'luxon';
import { stringToFormat } from '@common/utils';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

interface IWeekGold {
    datetime: string;
    income: number;
    spending: number;
}

const Calendar = ({ array }: { array: IWeekGold[] }) => {
    const theme = useTheme();

    return (
        <Container>
            {array.map(({ datetime, income, spending }, index: number) => {
                return (
                    <WeekItem key={index}>
                        <Day>
                            {`
                                ${stringToFormat({ date: datetime, fromFormat: 'yyyy/MM/dd', toFormat: 'MM/dd' })}
                                (${DateTime.fromFormat(datetime, 'yyyy/MM/dd').toFormat('ccccc', {
                                    locale: 'ko-KR',
                                })})
                            `}
                        </Day>
                        <Contents>
                            <Gold color={theme.ledger.income}>{income.toLocaleString()}</Gold>
                            <Gold color={theme.ledger.spending}>
                                {spending > 0 ? `-` : ''}
                                {spending.toLocaleString()}
                            </Gold>
                            <Sum>{(income - spending).toLocaleString()}</Sum>
                        </Contents>
                    </WeekItem>
                );
            })}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const WeekItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% / 7);
    box-sizing: border-box;
    border: 1px solid ${props => props.theme.colors.gray};

    ${widthMedia.smallPhone} {
        width: calc(100% / 4);
    }
`;

const Day = styled.div`
    display: flex;
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    padding-top: 0.7em;
    padding-bottom: 0.5em;
    width: 70%;
    text-align: center;
    justify-content: center;

    ${widthMedia.desktop} {
        width: 80%;
    }

    ${widthMedia.tablet} {
        width: 90%;
    }
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    height: 70px;
    max-height: 70px;
    padding-top: 0.5em;
    align-items: flex-end;
    width: 70%;

    ${widthMedia.desktop} {
        width: 80%;
    }

    ${widthMedia.tablet} {
        width: 90%;
    }
`;

const Gold = styled.span<{ color: string }>`
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    color: ${props => props.color};
    padding-bottom: 0.2em;
`;

const Sum = styled.span`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    margin-top: 0.3em;
    padding-top: 0.3em;
    border-top: 1px solid ${props => props.theme.colors.gray};
`;

export default Calendar;
