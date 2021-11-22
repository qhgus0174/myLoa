import dbPool from '../config/db';
import { QueryResult } from 'pg';

interface IAbyss {
    id: string;
    name1: string;
    name2: string;
}

const Abyss = {
    getAbyss: async (): Promise<QueryResult<IAbyss>> => await dbPool.query(`SELECT * FROM weeklyAbyss`),
};

export { Abyss };
export type { IAbyss };
