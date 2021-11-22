export interface IResponse<T> {
    status: 'SUCCESS' | 'ERR';
    result: T;
    message?: string;
}

export interface IWeeklyGuardian {
    id: string;
    name: string;
}

export interface IWeeklyAbyss {
    id: string;
    name1: string;
    name2: string;
}

export interface IWeeklyContents {
    guardian: string;
    abyss: string;
}

export interface IBackup {
    backupkey: string;
    todo: string;
    todoord: string;
    character: string;
    characterord: string;
}

export interface IError {
    message: string;
    dataColumn1?: string;
    dataColumn2?: string;
    dataColumn3?: string;
    errType: 'backup' | 'setBackup' | 'getBackup' | 'deleteBackup' | 'croll' | 'other';
}
