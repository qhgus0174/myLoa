import { ICommonHistory, ILedgerHistoryRaid } from '@common/types/localStorage/Ledger';

export const calcSum = (arr: any[]): number => {
    return arr.reduce((prev, { gold }) => prev + gold, 0);
};

export const calcSumWithCommma = (arr: ILedgerHistoryRaid[]): string => {
    return arr.reduce((prev, { gold }) => prev + gold, 0).toLocaleString();
};

export const calcCommonIncomeGold = ({ history }: { history: ICommonHistory[] }) => {
    const result = history.filter(({ type }) => {
        return type != 'spending';
    });

    return result;
};

export const calcCommonSpendingGold = ({ history }: { history: ICommonHistory[] }) => {
    const result = history.filter(({ type }) => {
        return type == 'spending';
    });

    return result;
};
