import dbPool from '../config/db';
import { QueryResult } from 'pg';
import { DateTime } from 'luxon';
import { IBackup } from '../routes/backup/types';

const Backup = {
    getBackup: async ({ backupKey }: Pick<IBackup, 'backupKey'>): Promise<QueryResult<IBackup>> =>
        await dbPool.query(`SELECT * FROM BACKUP WHERE backupKey=$1`, [backupKey]),

    createBackup: async ({
        todo,
        todoOrd,
        character,
        characterOrd,
        share,
        shareDay,
        ledger,
    }: Omit<IBackup, 'backupKey'>): Promise<QueryResult<Pick<IBackup, 'backupKey'>>> => {
        const randomKey = Math.random().toString(36).substr(2, 25);

        const result = await dbPool.query(
            'INSERT INTO BACKUP (backupKey, todo, todoOrd, character, characterOrd, ledger, share, shareDay, createdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING backupKey',
            [randomKey, todo, todoOrd, character, characterOrd, ledger, share, shareDay, DateTime.now()],
        );

        return result.rows[0];
    },

    deleteBackup: async ({ backupKey }: Pick<IBackup, 'backupKey'>): Promise<QueryResult> => {
        return await dbPool.query(`DELETE FROM BACKUP WHERE backupKey=$1`, [backupKey]);
    },
};

export { Backup };
