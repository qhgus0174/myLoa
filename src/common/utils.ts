import { ICharacter } from '@common/types/localStorage/Character';
import { ITodo } from '@common/types/localStorage/Todo';
import { DateTime } from 'luxon';

export const getOwnIdByIndex = (dataArray: any[], ordArray: any[], index: number): number => {
    const id = ordArray[index];
    const resultIndex = dataArray.findIndex((obj: any) => obj.id === id);

    return resultIndex;
};

export const getCharacterInfoById = ({ dataArray, id }: { dataArray: ICharacter[]; id: number }): ICharacter => {
    const index = dataArray.findIndex((data: ICharacter) => data.id === id);
    return dataArray[index];
};

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<K, T[]>);

export const parseStorageItem = (item: string) => {
    return JSON.parse(JSON.parse(item));
};

export const stringifyStorageItem = (item: any): string => {
    return JSON.stringify(JSON.stringify(item));
};

export const getThisWeek = (): string[] => {
    const now = DateTime.now(); //

    const startOfWeek = now.startOf('week').plus({ days: 2, hours: 6, minutes: 0 });

    const startDay =
        startOfWeek < now
            ? startOfWeek
            : now.minus({ days: 7, hours: 6, minutes: 0 }).startOf('week').plus({ days: 2, hours: 6, minutes: 0 });

    const weekArr: string[] = [];

    for (let i = 0; i < 7; i++) {
        weekArr.push(startDay.plus({ days: i }).toFormat('yyyy/MM/dd'));
    }

    return weekArr;
};

export const dateToTime = ({ date, format }: { date: string; format: string }) => {
    return DateTime.fromFormat(date, format).toFormat('X');
};
