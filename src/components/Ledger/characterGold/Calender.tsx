import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { LocalStorageStateContext } from '@context/LocalStorageContext';
import { IncomeSpending } from '@components/Ledger/modal/common/IncomeSpending';
import { calcSum } from '@components/Ledger/common/functions';
import Calendar from '@components/Ledger/Calendar';
import { ILedger, ILedgerHistoryRaid, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { dateToTime, getThisWeek, groupBy } from '@common/utils';

interface ICalendar {
    characterId: number;
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

const CharacterCalendar = ({ characterId }: ICalendar) => {
    const { storedLedger } = useContext(LocalStorageStateContext);

    const [calendarGold, setCalendarGold] = useState<IWeekGold[]>([]);

    useEffect(() => {
        getGoldCalendar();
    }, [storedLedger]);

    const getSpending = (): ILedger => {
        const newLedger: ILedger = { ...storedLedger };

        const charLedgerIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);

        const ownLedger = newLedger.own[charLedgerIndex],
            {
                histories: { spending },
            } = ownLedger;

        if (!spending) {
            newLedger.own[charLedgerIndex] = {
                ...ownLedger,
                histories: {
                    ...ownLedger.histories,
                    spending: {
                        fold: true,
                        data: [],
                    },
                },
            };
        }

        return newLedger;
    };

    const getGoldCalendar = () => {
        const newLedger = { ...getSpending() };

        const index = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);

        const ownLedger = newLedger.own[index],
            {
                histories: {
                    goods: { data: goodsData },
                    raid: { data: raidData },
                    spending: { data: spendData },
                },
            } = ownLedger;

        const goodsArr = getGoldDateArr({ array: goodsData, type: 'income' });
        const raidArr = getGoldDateArr({ array: raidData, type: 'income' });
        const spendingArr = getGoldDateArr({ array: spendData, type: 'spending' });

        const sumByDate: IWeekGold[] = Object.values(
            groupBy(goodsArr.concat(raidArr).concat(spendingArr), obj => obj.datetime),
        )
            .map((arr, index) => {
                const incomeArr = arr.filter(obj => {
                    return obj.type === 'income';
                });

                const spendingArr = arr.filter(obj => {
                    return obj.type === 'spending';
                });

                return {
                    datetime: arr[arr.length - 1].datetime,
                    income: calcSum(incomeArr),
                    spending: calcSum(spendingArr),
                };
            })
            .sort(({ datetime: beforeDt }, { datetime: afterDt }) => {
                return (
                    Number(dateToTime({ date: beforeDt, format: 'yyyy/MM/dd' })) -
                    Number(dateToTime({ date: afterDt, format: 'yyyy/MM/dd' }))
                );
            });

        const weeksArr = getThisWeek().map(datetime => ({ datetime }));

        const weekGoldByDate = weeksArr.map(({ datetime: weekDatetime }, i) => {
            const goldDataIndex = sumByDate.findIndex(({ datetime }) => {
                return weekDatetime == datetime;
            });

            const income = goldDataIndex > -1 ? sumByDate[goldDataIndex].income : 0;
            const spending = goldDataIndex > -1 ? sumByDate[goldDataIndex].spending : 0;

            const newSumByDate = {
                datetime: weekDatetime,
                income: income,
                spending: spending,
            };
            return newSumByDate;
        });

        setCalendarGold(weekGoldByDate);
    };

    const getGoldDateArr = ({ array, type }: { array: ILedgerHistoryRaid[]; type: IncomeSpending }): IGoldDate[] => {
        const resultArr = array.map(({ gold, datetime }) => {
            return {
                datetime: DateTime.fromISO(DateTime.fromSeconds(Number(datetime)).toISO()).toFormat('yyyy/MM/dd'),
                type: type,
                gold: gold,
            };
        });

        return resultArr;
    };

    return <Calendar array={calendarGold} />;
};

export default CharacterCalendar;
