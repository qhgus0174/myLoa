import { QueryResult } from 'pg';
import dbPool from '../../config/db';
import { IShareContents } from '../../routes/contents/share/types';

const ShareContents = {
    getShareContents: async (): Promise<QueryResult<IShareContents>> =>
        await dbPool.query(`SELECT * FROM shareContents ORDER BY ord`),
};

export { ShareContents };
