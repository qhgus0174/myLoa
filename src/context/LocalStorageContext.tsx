import { ILedger } from '@common/types/localStorage/Ledger';
import { ICharacter } from '@common/types/localStorage/Character';
import { ITodo } from '@common/types/localStorage/Todo';
import { initLedger, initSettings, useLocalStorage } from '@hooks/useLocalStorage';
import React, { createContext, useState } from 'react';
import { IShareContents } from '@common/types/localStorage/ShareContents';
import { ISettings } from '@common/types/localStorage/Settings';

interface ILocalStorageState {
    storedTodo: ITodo[];
    storedTodoOrd: number[];
    storedCharacter: ICharacter[];
    storedCharacterOrd: number[];
    storedLedger: ILedger;
    storedShareContents: IShareContents[];
    storedDayContents: IShareContents[];
    storedSettings: ISettings;
}

interface ILocalStorageAction {
    setStoredTodo: (e: ITodo[]) => void;
    setStoredTodoOrd: (e: number[]) => void;
    setStoredCharacter: (e: ICharacter[]) => void;
    setStoredCharacterOrd: (e: number[]) => void;
    setStoredLedger: (e: ILedger) => void;
    setStoredShareContents: (e: IShareContents[]) => void;
    setStoredDayContents: (e: IShareContents[]) => void;
    setStoredSettings: (e: ISettings) => void;
}

export const LocalStorageStateContext = createContext<ILocalStorageState>({
    storedTodo: [],
    storedTodoOrd: [],
    storedCharacter: [],
    storedCharacterOrd: [],
    storedLedger: initLedger,
    storedShareContents: [],
    storedDayContents: [],
    storedSettings: initSettings,
});

export const LocalStorageActionContext = createContext<ILocalStorageAction>({
    setStoredTodo: (e: ITodo[]) => {},
    setStoredTodoOrd: (e: number[]) => {},
    setStoredCharacter: (e: ICharacter[]) => {},
    setStoredCharacterOrd: (e: number[]) => {},
    setStoredLedger: (e: ILedger) => {},
    setStoredShareContents: (e: IShareContents[]) => {},
    setStoredDayContents: (e: IShareContents[]) => {},
    setStoredSettings: (e: ISettings) => {},
});

const LocalStorageProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        storedTodo,
        storedTodoOrd,
        storedCharacter,
        storedCharacterOrd,
        storedLedger,
        storedShareContents,
        storedDayContents,
        storedSettings,
        setStoredTodo,
        setStoredTodoOrd,
        setStoredCharacter,
        setStoredCharacterOrd,
        setStoredLedger,
        setStoredShareContents,
        setStoredDayContents,
        setStoredSettings,
    } = useLocalStorage();

    return (
        <LocalStorageActionContext.Provider
            value={{
                setStoredTodo,
                setStoredTodoOrd,
                setStoredCharacter,
                setStoredCharacterOrd,
                setStoredLedger,
                setStoredShareContents,
                setStoredDayContents,
                setStoredSettings,
            }}
        >
            <LocalStorageStateContext.Provider
                value={{
                    storedTodo,
                    storedTodoOrd,
                    storedCharacter,
                    storedCharacterOrd,
                    storedLedger,
                    storedShareContents,
                    storedDayContents,
                    storedSettings,
                }}
            >
                {children}
            </LocalStorageStateContext.Provider>
        </LocalStorageActionContext.Provider>
    );
};

export default LocalStorageProvider;
