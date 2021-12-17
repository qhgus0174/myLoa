export interface ILedger {
    common: ILedgerCommon;
    own: ILedgerOwn[];
}

export interface ILedgerOwn {
    characterId: number;
    prevWeekGold: number[];
    histories: {
        goods: {
            fold: boolean;
            data: ILedgerHistoryGoods[];
        };
        raid: {
            fold: boolean;
            data: ILedgerHistoryRaid[];
        };
    };
}

export interface ILedgerCommon {
    prevWeekGold: number[];
    histories: ICommonHistory[];
    fold: boolean;
}

export interface ICommonHistory extends ILedgerHistoryRaid {
    name: string;
    imgUrl: string;
}

export interface ILedgerHistoryRaid {
    id: string;
    gold: number;
    datetime: string;
}

export interface ILedgerHistoryGoods extends ILedgerHistoryRaid {
    categoryId: string;
    imgId: string;
    name: string;
}
