import axios from 'axios';
import { IResponse } from '@common/types/response';
import { IGoods, IGoodsImg } from '@common/types/response/ledger/goods';

export const getGoods = async (): Promise<IGoods[]> => {
    const { result: goodsGoldResult } = (await (await axios.get(`/api/ledger/goodsGold`)).data) as IResponse<IGoods[]>;

    return goodsGoldResult;
};

export const getGoodsImg = async (): Promise<IGoodsImg[]> => {
    const { result: goodsGoldResult } = (await (
        await axios.get(`/api/ledger/goodsGold/img`)
    ).data) as IResponse<IGoodsImg[]>;

    return goodsGoldResult;
};
