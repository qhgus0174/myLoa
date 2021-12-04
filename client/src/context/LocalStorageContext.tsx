import { ICharacter } from '@components/Character/CharacterType';
import { ITodo } from '@components/Todo/TodoType';
import { useLocalStorage } from '@hooks/useLocalStorage';
import React, { createContext, useState } from 'react';

interface ILocalStorageState {
    storedTodo: ITodo[];
    storedTodoOrd: number[];
    storedCharacter: ICharacter[];
    storedCharacterOrd: number[];
}

interface ILocalStorageAction {
    setStoredTodo: (e: ITodo[]) => void;
    setStoredTodoOrd: (e: number[]) => void;
    setStoredCharacter: (e: ICharacter[]) => void;
    setStoredCharacterOrd: (e: number[]) => void;
}

export const LocalStorageStateContext = createContext<ILocalStorageState>({
    storedTodo: [],
    storedTodoOrd: [],
    storedCharacter: [],
    storedCharacterOrd: [],
});

export const LocalStorageActionContext = createContext<ILocalStorageAction>({
    setStoredTodo: (e: ITodo[]) => {},
    setStoredTodoOrd: (e: number[]) => {},
    setStoredCharacter: (e: ICharacter[]) => {},
    setStoredCharacterOrd: (e: number[]) => {},
});

const LocalStorageProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        storedTodo,
        storedTodoOrd,
        storedCharacter,
        storedCharacterOrd,
        setStoredTodo,
        setStoredTodoOrd,
        setStoredCharacter,
        setStoredCharacterOrd,
    } = useLocalStorage();

    return (
        <LocalStorageActionContext.Provider
            value={{ setStoredTodo, setStoredTodoOrd, setStoredCharacter, setStoredCharacterOrd }}
        >
            <LocalStorageStateContext.Provider
                value={{ storedTodo, storedTodoOrd, storedCharacter, storedCharacterOrd }}
            >
                {children}
            </LocalStorageStateContext.Provider>
        </LocalStorageActionContext.Provider>
    );
};

export default LocalStorageProvider;
