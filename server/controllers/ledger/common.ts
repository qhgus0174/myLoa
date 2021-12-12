import dbPool from '../../config/db';
import { QueryResult } from 'pg';
import { ICommonGold } from '../../routes/ledger/common/types';

const CommonGold = {
    getCommonGold: async (): Promise<QueryResult<ICommonGold>> => await dbPool.query(`SELECT * FROM commongold`),
};

export { CommonGold };
