import axios from 'axios';
import { IResponse } from '@common/types/response';
import { IIndividual, IIndividualGoldDetail } from '@common/types/response/ledger/individual';

export const initIndividualDropDown: IIndividualGoldDetail = { id: '', name: '획득처를 선택 해 주세요.', parentid: '' };

export const getIndividual = async (): Promise<IIndividual[]> => {
    const { result: individualGoldResult } = (await (
        await axios.get(`/api/ledger/individualGold`)
    ).data) as IResponse<IIndividual[]>;

    return individualGoldResult;
};

export const getIndividualDetail = async (): Promise<IIndividualGoldDetail[]> => {
    const { result } = (await (
        await axios.get(`/api/ledger/individualGold/detail`)
    ).data) as IResponse<IIndividualGoldDetail[]>;

    const individualGoldDetailDropdown: IIndividualGoldDetail[] = result.map(
        ({ id, name, parentid }: IIndividualGoldDetail) => {
            return { id: id, name: name, parentid: parentid };
        },
    );

    return [initIndividualDropDown].concat(individualGoldDetailDropdown);
};
