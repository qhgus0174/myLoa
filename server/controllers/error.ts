import dbPool from "../config/db";
import { QueryResult } from "pg";
import { DateTime } from "luxon";

interface IError {
  message: string;
  dataColumn1?: string;
  dataColumn2?: string;
  dataColumn3?: string;
  errType: "backup" | "croll" | "other";
}

const Error = {
  insertError: async ({
    message,
    dataColumn1,
    dataColumn2,
    dataColumn3,
    errType,
  }: IError): Promise<void> => {
    await dbPool.query(
      "INSERT INTO ERRORLOG (message, dataColumn1, dataColumn2, dataColumn3, errType, createdate) VALUES ($1, $2, $3, $4, $5, $6)",
      [message, dataColumn1, dataColumn2, dataColumn3, errType, DateTime.now()]
    );

    return;
  },
};

export { Error };
export type { IError };
