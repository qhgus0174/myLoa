import { ScheduleContents } from '@common/types/types';
import reject from 'lodash-es/reject';

const isMultipleArr = (contents: ScheduleContents): boolean => {
    return ['chaos', 'guardian', 'epona'].includes(contents);
};

const getArrayLength = (contents: ScheduleContents): number => {
    return ['chaos', 'guardian'].includes(contents) ? 2 : 3;
};

export const getResetCheckArr = (contents: ScheduleContents): number[] => {
    return isMultipleArr(contents) ? new Array(getArrayLength(contents)).fill(0) : new Array(1).fill(0);
};

export const getShowCheckTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    arr: number[],
    characterId: number,
): number[] => {
    const {
        target: { value },
    } = e;

    return arr.includes(Number(value)) ? rejectArr(arr, characterId) : addArr(arr, characterId);
};

const rejectArr = (arr: any[], id: number) => {
    const resultArr = reject(arr, (ord: number) => {
        return ord === id;
    });
    return resultArr;
};

const addArr = (arr: any[], id: number) => {
    const newArr = [...arr];
    newArr.push(id);

    return newArr;
};
