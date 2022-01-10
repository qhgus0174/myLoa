import { IncomeSpending } from '@components/Ledger/modal/common/IncomeSpending';

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
        spending: {
            fold: boolean;
            data: ILedgerHistoryGoods[];
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
    type: IncomeSpending;
}

export interface ILedgerHistoryRaid {
    id: string;
    gold: number;
    datetime: string;
    more?: boolean;
}

export interface ILedgerHistoryGoods extends ILedgerHistoryRaid {
    categoryId: string;
    imgId: string;
    name: string;
}

export type GoldType = 'goods' | 'raid' | 'spending';
