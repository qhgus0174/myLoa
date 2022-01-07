import React, { useContext, useEffect, useState } from 'react';
import { LocalStorageStateContext } from '@context/LocalStorageContext';
import { IncomeSpending } from '@components/Ledger/modal/common/IncomeSpending';
import { calcSum } from '@components/Ledger/common/functions';
import Calendar from '@components/Ledger/Calendar';
import { ICommonHistory } from '@common/types/localStorage/Ledger';
import { getThisWeek, groupBy, timeToDate } from '@common/utils';
import styled from '@emotion/styled';

interface ICalendar {
    totalGold: number;
}

interface IGoldDate {
    datetime: string;
    gold: number;
    type: IncomeSpending;
}

interface IWeekGold {
    datetime: string;
    income: number;
    spending: number;
}

const CommonCalendar = ({ totalGold }: ICalendar) => {
    const { storedLedger } = useContext(LocalStorageStateContext);

    const [calendarGold, setCalendarGold] = useState<IWeekGold[]>([]);

    useEffect(() => {
        getGoldCalendar();
    }, [totalGold]);

    const getGoldCalendar = () => {
        const newLedger = { ...storedLedger };

        const ownLedger = newLedger.common,
            { histories } = ownLedger;

        const commonGoldArr = getGoldDateArr({ array: histories });

        const sumByDate: IWeekGold[] = Object.values(groupBy(commonGoldArr, obj => obj.datetime)).map((arr, index) => {
            const incomeArr = arr.filter(obj => {
                return obj.type === 'income';
            });

            const spendingArr = arr.filter(obj => {
                return obj.type === 'spending';
            });
            return { datetime: arr[0].datetime, income: calcSum(incomeArr), spending: calcSum(spendingArr) };
        });

        console.log(sumByDate);

        const weeksArr = getThisWeek().map(datetime => ({ datetime }));

        const weekGoldByDate = weeksArr.map((item, i) => {
            const { datetime } = sumByDate[i] ? sumByDate[i] : weeksArr[i];
            const { income, spending } = sumByDate[i] ? sumByDate[i] : { income: 0, spending: 0 };

            const newSumByDate = {
                datetime: datetime,
                income: income,
                spending: spending,
            };

            return Object.assign({}, newSumByDate, item);
        });
        setCalendarGold(weekGoldByDate);
    };

    const getGoldDateArr = ({ array }: { array: ICommonHistory[] }): IGoldDate[] => {
        const resultArr = array.map(({ gold, datetime, type }) => {
            return {
                datetime: timeToDate({ datetime: datetime, format: 'yyyy/MM/dd' }),
                type: type,
                gold: gold,
            };
        });

        return resultArr;
    };

    return <Calendar array={calendarGold} />;
};

export default CommonCalendar;
