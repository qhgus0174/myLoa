import axios from 'axios';
import { IResponse } from '@common/types/response';
import { IRaidGold, IRaidGoldDetail } from '@common/types/response/ledger/raid';

export const getRaid = async (): Promise<IRaidGold[]> => {
    const { result: raidGoldResult } = (await (await axios.get(`/api/ledger/raidGold`)).data) as IResponse<IRaidGold[]>;
    return raidGoldResult;
};

export const getRaidDetail = async (): Promise<IRaidGoldDetail[]> => {
    const { result } = (await (await axios.get(`/api/ledger/raidGold/detail`)).data) as IResponse<IRaidGoldDetail[]>;
    return result;
};
