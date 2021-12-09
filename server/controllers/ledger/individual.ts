import dbPool from '../../config/db';
import { QueryResult } from 'pg';
import { IIndividual, IIndividualGoldDetail } from '../../routes/ledger/individual/types';

const IndividualGold = {
    getIndividualGold: async (): Promise<QueryResult<IIndividual>> =>
        await dbPool.query(`SELECT * FROM individualgoldgettingway`),

    getIndividualGoldDetail: async (): Promise<QueryResult<IIndividualGoldDetail>> =>
        await dbPool.query(`SELECT * FROM individualgolddetail`),
};

export { IndividualGold };
