import React, { useEffect, useState } from 'react';
import { ICharacter } from '@components/Character/CharacterType';
import { ITodo } from '@components/Todo/TodoType';
import { ICommonHistory, ILedger, ILedgerOwn } from '@components/Ledger/LedgerType';
import { DateTime } from 'luxon';
import { parseStorageItem, stringifyStorageItem } from '@common/utils';

export const initCommonHistory: ICommonHistory[] = [
    {
        id: '1',
        gold: 0,
        datetime: DateTime.now().toFormat('X'),
        name: '에포나 증표 교환',
        imgUrl: '/static/img/lostark/common/eponagold.png',
    },
];

export const initLedger: ILedger = {
    common: {
        prevWeekGold: [0, 0, 0, 0],
        histories: initCommonHistory,
    },
    own: [],
};

export const useLocalStorage = () => {
    const [storedTodo, setStoredTodo] = useState<ITodo[]>([]);
    const [storedTodoOrd, setStoredTodoOrd] = useState<number[]>([]);
    const [storedCharacter, setStoredCharacter] = useState<ICharacter[]>([]);
    const [storedCharacterOrd, setStoredCharacterOrd] = useState<number[]>([]);
    const [storedLedger, setStoredLedger] = useState<ILedger>(initLedger);

    useEffect(() => {
        const todoData: ITodo[] = parseStorageItem(localStorage.getItem('todo') as string);
        todoData && todoData.length > 0 ? setStoredTodo(todoData) : setStoredTodo([]);
    }, []);

    useEffect(() => {
        const todoOrdData: number[] = parseStorageItem(localStorage.getItem('todoOrd') as string);
        todoOrdData && todoOrdData.length > 0 ? setStoredTodoOrd(todoOrdData) : setStoredTodoOrd([]);
    }, []);

    useEffect(() => {
        const characterData: ICharacter[] = parseStorageItem(localStorage.getItem('character') as string);
        characterData && characterData.length > 0 ? setStoredCharacter(characterData) : setStoredCharacter([]);
    }, []);

    useEffect(() => {
        const characterOrdData: number[] = parseStorageItem(localStorage.getItem('characterOrd') as string);
        characterOrdData && characterOrdData.length > 0
            ? setStoredCharacterOrd(characterOrdData)
            : setStoredCharacterOrd([]);
    }, []);

    useEffect(() => {
        const storedcharacter: ICharacter[] = parseStorageItem(localStorage.getItem('character') as string);
        const ledgerData: ILedger = parseStorageItem(localStorage.getItem('ledger') as string);
        ledgerData ? setStoredLedger(ledgerData) : ledgerInit(storedcharacter);
    }, []);

    useEffect(() => {
        storedTodo && storedTodo.length > 0 && localStorage.setItem('todo', stringifyStorageItem(storedTodo));
    }, [storedTodo]);

    useEffect(() => {
        storedTodoOrd &&
            storedTodoOrd.length > 0 &&
            localStorage.setItem('todoOrd', stringifyStorageItem(storedTodoOrd));
    }, [storedTodoOrd]);

    useEffect(() => {
        storedCharacter &&
            storedCharacter.length > 0 &&
            localStorage.setItem('character', stringifyStorageItem(storedCharacter));
    }, [storedCharacter]);

    useEffect(() => {
        storedCharacterOrd &&
            storedCharacterOrd.length > 0 &&
            localStorage.setItem('characterOrd', stringifyStorageItem(storedCharacterOrd));
    }, [storedCharacterOrd]);

    useEffect(() => {
        storedLedger &&
            initLedger != storedLedger &&
            localStorage.setItem('ledger', stringifyStorageItem(storedLedger));
    }, [storedLedger]);

    const ledgerInit = (characters: ICharacter[]) => {
        if (!characters || characters.length < 1) return;
        console.log('asdvb');

        const commonLedger = initLedger.common;

        const goodsLedger: ILedger['own'] = characters.map((character: ICharacter) => {
            const charactersLedger: ILedgerOwn = {
                characterId: character.id,
                prevWeekGold: [0, 0, 0, 0],
                histories: { raid: { fold: true, data: [] }, goods: { fold: true, data: [] } },
            };
            return charactersLedger;
        });
        setStoredLedger(Object.assign({}, { common: commonLedger }, { own: goodsLedger }));
    };

    return {
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
    };
};
