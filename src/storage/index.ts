export const getStorage = (key: 'character' | 'characterOrd' | 'todo' | 'todoOrd') => {
    return JSON.parse(JSON.parse(localStorage.getItem(key) as string));
};
