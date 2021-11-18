import { db } from '@firebaseStore/firebaseInstance';
import {
    collection,
    addDoc as fsAddDoc,
    query,
    deleteDoc as fsDelDoc,
    doc as fsDoc,
    getDoc as fsGetDoc,
    DocumentReference,
    DocumentData,
    DocumentSnapshot,
} from 'firebase/firestore';

export interface IBackup {
    docId: string;
    todo: string;
    todoOrd: string;
    character: string;
    characterOrd: string;
    createAt?: number;
}

export const backupCollection = collection(db, 'backup');
export const queryBackupCollection = query(backupCollection);

const doc = (docId: IBackup['docId']) => fsDoc(backupCollection, docId);

export const addDoc = async (data: Omit<IBackup, 'docId'>): Promise<DocumentReference<DocumentData>> =>
    await fsAddDoc(backupCollection, Object.assign({}, data, { createAt: Date.now() }));

export const deleteDoc = async (docId: IBackup['docId']) => await fsDelDoc(doc(docId));

export const getDoc = async (docId: string): Promise<DocumentSnapshot<DocumentData>> => await fsGetDoc(doc(docId));
