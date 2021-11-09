export const getStorage = (key: 'character' | 'characterOrd' | 'todo' | 'todoOrd') => {
    const data = localStorage.getItem(key) ? JSON.parse(JSON.parse(localStorage.getItem(key) as string)) : [];
    return data;
};
