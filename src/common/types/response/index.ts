export interface IResponse<T> {
    status: 'SUCCESS' | 'ERR';
    result: T;
    message?: string;
}
