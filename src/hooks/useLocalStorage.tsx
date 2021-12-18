import React, { useEffect, useState } from 'react';
import { ICharacter } from '@common/types/localStorage/Character';
import { ITodo } from '@common/types/localStorage/Todo';
import { ICommonHistory, ILedger, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { DateTime } from 'luxon';
import { parseStorageItem, stringifyStorageItem } from '@common/utils';
import { IShareContents } from '@common/types/localStorage/ShareContents';
import { IRaid } from '@common/types/localStorage/Raid';
import { CompassInfo } from '@common/data/compass';

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
        fold: true,
        prevWeekGold: [0, 0, 0, 0],
        histories: initCommonHistory,
    },
    own: [],
};

export const initDayContents = (): IShareContents[] => {
    const dayOfWeek = Number(DateTime.now().toFormat('c'));
    const hour = Number(DateTime.now().toFormat('H'));
    const calcDayOfWeek = hour > 5 ? dayOfWeek - 1 : dayOfWeek - 2 < 0 ? 0 : dayOfWeek - 2;

    const { ghost, chaosGate, fieldBoss } = CompassInfo;

    const resultArr: IShareContents[] = [];

    const fieldBossData: IShareContents = {
        id: 1,
        name: '필드보스',
        iconurl: '/static/img/lostark/contents/fieldboss.png',
        check: 0,
    };

    const ghostData: IShareContents = {
        id: 2,
        name: '유령선',
        iconurl: '/static/img/lostark/contents/ghost.png',
        check: 0,
    };

    const chaosGateData: IShareContents = {
        id: 3,
        name: '카오스게이트',
        iconurl: '/static/img/lostark/contents/choasgate.png',
        check: 0,
    };

    fieldBoss[calcDayOfWeek] === 1 && resultArr.push(fieldBossData);
    ghost[calcDayOfWeek] === 1 && resultArr.push(ghostData);
    chaosGate[calcDayOfWeek] === 1 && resultArr.push(chaosGateData);
    console.log(resultArr);
    return resultArr;
};

export const useLocalStorage = () => {
    const [storedTodo, setStoredTodo] = useState<ITodo[]>([]);
    const [storedTodoOrd, setStoredTodoOrd] = useState<number[]>([]);
    const [storedCharacter, setStoredCharacter] = useState<ICharacter[]>([]);
    const [storedCharacterOrd, setStoredCharacterOrd] = useState<number[]>([]);
    const [storedShareContents, setStoredShareContents] = useState<IShareContents[]>([]);
    const [storedDayContents, setStoredDayContents] = useState<IShareContents[]>([]);
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
        const shareContentsData: IShareContents[] = parseStorageItem(localStorage.getItem('share') as string);
        shareContentsData && shareContentsData.length > 0
            ? setStoredShareContents(shareContentsData)
            : setStoredShareContents([]);
    }, []);

    useEffect(() => {
        const dayContentsData: IShareContents[] = parseStorageItem(localStorage.getItem('shareDay') as string);
        dayContentsData && dayContentsData.length > 0
            ? setStoredDayContents(dayContentsData)
            : setStoredDayContents(initDayContents());
    }, []);

    useEffect(() => {
        const storedcharacter: ICharacter[] = parseStorageItem(localStorage.getItem('character') as string);
        const ledgerData: ILedger = parseStorageItem(localStorage.getItem('ledger') as string);
        ledgerData ? setStoredLedger(ledgerData) : ledgerInit(storedcharacter);
    }, []);

    useEffect(() => {
        storedTodo && localStorage.setItem('todo', stringifyStorageItem(storedTodo));
    }, [storedTodo]);

    useEffect(() => {
        storedTodoOrd && localStorage.setItem('todoOrd', stringifyStorageItem(storedTodoOrd));
    }, [storedTodoOrd]);

    useEffect(() => {
        storedCharacter && localStorage.setItem('character', stringifyStorageItem(storedCharacter));
    }, [storedCharacter]);

    useEffect(() => {
        storedCharacterOrd && localStorage.setItem('characterOrd', stringifyStorageItem(storedCharacterOrd));
    }, [storedCharacterOrd]);

    useEffect(() => {
        storedShareContents && localStorage.setItem('share', stringifyStorageItem(storedShareContents));
    }, [storedShareContents]);

    useEffect(() => {
        console.log(storedDayContents);
        storedDayContents && localStorage.setItem('shareDay', stringifyStorageItem(storedDayContents));
    }, [storedDayContents]);

    useEffect(() => {
        storedLedger &&
            initLedger != storedLedger &&
            localStorage.setItem('ledger', stringifyStorageItem(storedLedger));
    }, [storedLedger]);

    const ledgerInit = (characters: ICharacter[]) => {
        if (
            !parseStorageItem(localStorage.getItem('character') as string) ||
            parseStorageItem(localStorage.getItem('character') as string).length < 1
        )
            return;

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
        storedShareContents,
        storedDayContents,
        setStoredTodo,
        setStoredTodoOrd,
        setStoredCharacter,
        setStoredCharacterOrd,
        setStoredLedger,
        setStoredShareContents,
        setStoredDayContents,
    };
};
