import dbPool from "../config/db";
import { QueryResult } from "pg";

interface IGuardian {
  id: string;
  name: string;
}

const Guardian = {
  getGuardian: async (): Promise<QueryResult<IGuardian>> =>
    await dbPool.query(`SELECT * FROM weeklyGuardian`),
};

export { Guardian };
export type { IGuardian };
