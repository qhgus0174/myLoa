import { IResponse } from '@common/types/response';
import { ICommonGold } from '@common/types/response/ledger/common';
import axios from 'axios';

export const getCommon = async (): Promise<ICommonGold[]> => {
    const { result: commonGoldResult } = (await (
        await axios.get(`/api/ledger/commonGold`)
    ).data) as IResponse<ICommonGold[]>;

    return commonGoldResult;
};
