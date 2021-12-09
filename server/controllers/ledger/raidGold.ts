import dbPool from '../../config/db';
import { QueryResult } from 'pg';
import { IRaidGold, IRaidGoldDetail } from '../../routes/ledger/raid/types';

const RaidGold = {
    getRaidGold: async (): Promise<QueryResult<IRaidGold>> => await dbPool.query(`SELECT * FROM RaidGoldGettingWay`),

    getRaidGoldDetail: async ({ parentId }: Pick<IRaidGoldDetail, 'parentId'>): Promise<QueryResult<IRaidGoldDetail>> =>
        await dbPool.query(`SELECT * FROM RaidGoldDetail WHERE parentId=$1`, [parentId]),
};

export { RaidGold };
