import dbPool from '../config/db';
import { DateTime } from 'luxon';
import { IError } from '../type/response';

const Error = {
    insertError: async ({ message, dataColumn1, dataColumn2, dataColumn3, errType }: IError): Promise<void> => {
        await dbPool.query(
            'INSERT INTO ERRORLOG (message, dataColumn1, dataColumn2, dataColumn3, errType, createdate) VALUES ($1, $2, $3, $4, $5, $6)',
            [message, dataColumn1, dataColumn2, dataColumn3, errType, DateTime.now()],
        );

        return;
    },
};

export { Error };
