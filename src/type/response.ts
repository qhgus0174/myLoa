export interface IResponse {
    status: 'SUCCESS' | 'ERR';
    result: any;
    message?: string;
}
