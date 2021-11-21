export interface IResponse {
    status: 'SUCCESS' | 'ERR';
    result: any;
    message?: string;
}

export interface IError {
    message: string;
    dataColumn1?: string;
    dataColumn2?: string;
    dataColumn3?: string;
    errType: 'backup' | 'setBackup' | 'getBackup' | 'deleteBackup' | 'croll' | 'other';
}
