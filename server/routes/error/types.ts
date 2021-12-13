export interface IError {
    message: string;
    dataColumn1?: string;
    dataColumn2?: string;
    dataColumn3?: string;
    errType: ErrType;
}

export type ErrType = 'backup' | 'setBackup' | 'getBackup' | 'deleteBackup' | 'croll' | 'ledger' | 'other';
