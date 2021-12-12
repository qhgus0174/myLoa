import { ILedger } from '@components/Ledger/LedgerType';
import { ICharacter } from '@components/Character/CharacterType';
import { ITodo } from '@components/Todo/TodoType';
import { initLedger, useLocalStorage } from '@hooks/useLocalStorage';
import React, { createContext, useState } from 'react';

interface ILocalStorageState {
    storedTodo: ITodo[];
    storedTodoOrd: number[];
    storedCharacter: ICharacter[];
    storedCharacterOrd: number[];
    storedLedger: ILedger;
}

interface ILocalStorageAction {
    setStoredTodo: (e: ITodo[]) => void;
    setStoredTodoOrd: (e: number[]) => void;
    setStoredCharacter: (e: ICharacter[]) => void;
    setStoredCharacterOrd: (e: number[]) => void;
    setStoredLedger: (e: ILedger) => void;
}

export const LocalStorageStateContext = createContext<ILocalStorageState>({
    storedTodo: [],
    storedTodoOrd: [],
    storedCharacter: [],
    storedCharacterOrd: [],
    storedLedger: initLedger,
});

export const LocalStorageActionContext = createContext<ILocalStorageAction>({
    setStoredTodo: (e: ITodo[]) => {},
    setStoredTodoOrd: (e: number[]) => {},
    setStoredCharacter: (e: ICharacter[]) => {},
    setStoredCharacterOrd: (e: number[]) => {},
    setStoredLedger: (e: ILedger) => {},
});

const LocalStorageProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        storedTodo,
        storedTodoOrd,
        storedCharacter,
        storedCharacterOrd,
        storedLedger,
        setStoredTodo,
        setStoredTodoOrd,
        setStoredCharacter,
        setStoredCharacterOrd,
        setStoredLedger,
    } = useLocalStorage();

    return (
        <LocalStorageActionContext.Provider
            value={{ setStoredTodo, setStoredTodoOrd, setStoredCharacter, setStoredCharacterOrd, setStoredLedger }}
        >
            <LocalStorageStateContext.Provider
                value={{ storedTodo, storedTodoOrd, storedCharacter, storedCharacterOrd, storedLedger }}
            >
                {children}
            </LocalStorageStateContext.Provider>
        </LocalStorageActionContext.Provider>
    );
};

export default LocalStorageProvider;
