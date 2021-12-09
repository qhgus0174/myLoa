import axios from 'axios';
import { IResponse } from '@common/types/response';
import { IRaidGold, IRaidGoldDetail } from '@common/types/response/ledger/raid';
import { groupBy } from '@common/utils';

export const initRaidDropDown: IRaidGold = { id: '', name: '레이드를 선택 해 주세요.' };

export const getRaid = async (): Promise<IRaidGold[]> => {
    const { result: raidGoldResult } = (await (await axios.get(`/api/ledger/raidGold`)).data) as IResponse<IRaidGold[]>;

    return raidGoldResult;
};

export const getRaidDetail = async ({ parentId }: { parentId: string }): Promise<Record<string, IRaidGoldDetail[]>> => {
    const { result } = (await (
        await axios.get(`/api/ledger/raidGold/detail/${parentId}`)
    ).data) as IResponse<IRaidGoldDetail[]>;

    return groupBy(result, obj => obj.difficulty);
};
