import axios from 'axios';
import { IError } from '@common/types/response/error';

interface IErrorParams extends Omit<IError, 'message'> {
    catchErr: unknown;
}

export const insertErrorDB = async ({ catchErr, dataColumn1, dataColumn2, dataColumn3, errType }: IErrorParams) => {
    const { message } = catchErr as Error;

    await axios.post('/api/error', {
        message: message,
        dataColumn1: dataColumn1,
        dataColumn2: dataColumn2,
        dataColumn3: dataColumn3,
        errType: errType,
    } as IError);
};
