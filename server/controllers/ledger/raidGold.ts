import dbPool from '../../config/db';
import { QueryResult } from 'pg';
import { IRaidGold, IRaidGoldDetail } from '../../routes/ledger/raid/types';

const RaidGold = {
    getRaidGold: async (): Promise<QueryResult<IRaidGold>> => await dbPool.query(`SELECT * FROM raidgold order by id`),

    getRaidGoldDetail: async (): Promise<QueryResult<IRaidGoldDetail>> =>
        await dbPool.query(`SELECT * FROM raidgolddetail order by id`),
};

export { RaidGold };
