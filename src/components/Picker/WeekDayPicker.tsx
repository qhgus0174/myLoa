import React from 'react';
import { DateTime } from 'luxon';
import RadioButton from '@components/Input/Radio';
import { getThisWeek, stringToFormat } from '@common/utils';
import styled from '@emotion/styled';

interface IWeekDayPicker {
    day: string;
    setDay: (e: string) => void;
}

const WeekDayPicker = ({ day, setDay }: IWeekDayPicker) => {
    return (
        <Containter>
            {getThisWeek().map((goldDay: string, index, weekArr: string[]) => {
                return (
                    <RadioButton
                        key={index}
                        text={stringToFormat({ date: goldDay, fromFormat: 'yyyy/MM/dd', toFormat: 'MM/dd' })}
                        name="contents"
                        value={goldDay}
                        onChange={e => {
                            setDay(e.target.value);
                        }}
                        checked={
                            weekArr[6] ===
                            DateTime.fromFormat(day, 'yyyy/MM/dd').minus({ days: 1 }).toFormat('yyyy/MM/dd')
                                ? weekArr[6] === goldDay
                                : day === goldDay
                        }
                    />
                );
            })}
        </Containter>
    );
};

const Containter = styled.section`
    display: flex;
    box-sizing: border-box;
`;

export default WeekDayPicker;
