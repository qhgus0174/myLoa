export interface IResponse<T = any> {
    status: 'SUCCESS' | 'ERR';
    result: T;
    message?: string;
}
