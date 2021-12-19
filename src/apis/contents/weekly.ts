import axios from 'axios';
import { IResponse } from '@common/types/response';
import { IWeeklyContents } from '@common/types/response/contents/weekly';

export const getWeekContents = async (): Promise<IWeeklyContents> => {
    const { result } = (await (
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/weeklyContents`)
    ).data) as IResponse<IWeeklyContents>;

    return result;
};
