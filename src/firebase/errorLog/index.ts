import { db } from '@firebaseStore/firebaseInstance';
import { collection, addDoc as fsAddDoc, query, DocumentReference, DocumentData } from 'firebase/firestore';

export interface IError {
    msg: string;
    backupCode?: string;
    createAt?: number;
}

export const backupCollection = collection(db, 'error');
export const queryBackupCollection = query(backupCollection);

export const addDoc = async (data: IError): Promise<DocumentReference<DocumentData>> =>
    await fsAddDoc(backupCollection, Object.assign({}, data, { createAt: Date.now() }));
