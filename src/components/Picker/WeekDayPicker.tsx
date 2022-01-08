import React from 'react';
import { getThisWeek } from '@common/utils';
import styled from '@emotion/styled';
import RadioButton from '@components/Input/Radio';
import { DateTime } from 'luxon';

interface IWeekDayPicker {
    day: string;
    setDay: (e: string) => void;
}

const WeekDayPicker = ({ day, setDay }: IWeekDayPicker) => {
    return (
        <Containter>
            {getThisWeek().map((goldDay: string, index) => {
                return (
                    <RadioButton
                        key={index}
                        text={DateTime.fromFormat(goldDay, 'yyyy/MM/dd').toFormat('MM/dd')}
                        name="contents"
                        value={goldDay}
                        onChange={e => {
                            setDay(e.target.value);
                        }}
                        checked={day === goldDay}
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
