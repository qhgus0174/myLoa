import { IStorage } from './types';

export const getStorage = (key: IStorage) => {
    const data = localStorage.getItem(key) ? JSON.parse(JSON.parse(localStorage.getItem(key) as string)) : [];
    return data;
};
