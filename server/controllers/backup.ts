import dbPool from "../config/db";
import { QueryResult } from "pg";
import { DateTime } from "luxon";

interface IBackup {
  backupKey: string;
  todo: string;
  todoOrd: string;
  character: string;
  characterOrd: string;
}

const Backup = {
  getBackup: async ({
    backupKey,
  }: Pick<IBackup, "backupKey">): Promise<QueryResult<IBackup>> =>
    await dbPool.query(`SELECT * FROM BACKUP WHERE backupKey=$1`, [backupKey]),

  createBackup: async ({
    todo,
    todoOrd,
    character,
    characterOrd,
  }: Omit<IBackup, "backupKey">): Promise<
    QueryResult<Pick<IBackup, "backupKey">>
  > => {
    const randomKey = Math.random().toString(36).substr(2, 25);

    const result = await dbPool.query(
      "INSERT INTO BACKUP (backupKey, todo, todoOrd, character, characterOrd, createdate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING backupKey",
      [randomKey, todo, todoOrd, character, characterOrd, DateTime.now()]
    );

    return result.rows[0];
  },

  deleteBackup: async ({
    backupKey,
  }: Pick<IBackup, "backupKey">): Promise<QueryResult> => {
    return await dbPool.query(`DELETE FROM BACKUP WHERE backupKey=$1`, [
      backupKey,
    ]);
  },
};

export { Backup };
export type { IBackup };
