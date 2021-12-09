export interface IError {
    message: string;
    dataColumn1?: string;
    dataColumn2?: string;
    dataColumn3?: string;
    errType: 'backup' | 'croll' | 'other';
}
