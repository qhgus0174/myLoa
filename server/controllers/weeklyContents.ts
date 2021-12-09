import dbPool from '../config/db';
import { QueryResult } from 'pg';
import { IWeeklyContents } from '../routes/weeklyContents/types';

const WeeklyContents = {
    getWeeklyContents: async (): Promise<QueryResult<IWeeklyContents>> =>
        await dbPool.query(`SELECT * FROM weeklyContents`),

    updateWeeklyContents: async ({ guardian, abyss }: IWeeklyContents): Promise<QueryResult> => {
        return await dbPool.query(`UPDATE weeklyContents SET guardian=$1, abyss=$2`, [guardian, abyss]);
    },
};

export { WeeklyContents };
