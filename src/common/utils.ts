import { ICharacter } from '@common/types/localStorage/Character';
import { ITodo } from '@common/types/localStorage/Todo';

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
