export interface IResponse<T = any> {
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
    backupKey: string;
    todo: string;
    todoOrd: string;
    character: string;
    characterOrd: string;
}

export interface IError {
    message: string;
    dataColumn1?: string;
    dataColumn2?: string;
    dataColumn3?: string;
    errType: 'backup' | 'croll' | 'other';
}
