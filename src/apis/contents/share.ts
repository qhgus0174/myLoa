import axios from 'axios';
import { IResponse } from '@common/types/response';
import { IShareContents } from '@common/types/response/contents/share';

export const getShareContents = async (): Promise<IShareContents[]> => {
    const { result } = (await (await axios.get(`/api/shareContents`)).data) as IResponse<IShareContents[]>;

    return result;
};
