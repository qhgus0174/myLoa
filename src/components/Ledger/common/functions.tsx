import { ILedgerHistoryRaid } from '@components/Ledger/LedgerType';

export const calcSum = (arr: ILedgerHistoryRaid[]): number => {
    return arr.reduce((prev, { gold }) => prev + gold, 0);
};

export const calcSumWithCommma = (arr: ILedgerHistoryRaid[]): string => {
    return arr.reduce((prev, { gold }) => prev + gold, 0).toLocaleString();
};
