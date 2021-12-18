import { Backup } from '../../controllers/backup';
import express, { Request, Response } from 'express';
import { IResponse } from '../../type/response';
import { QueryResult } from 'pg';
import { IBackup } from './types';
import { IError } from '../error/types';

const router = express.Router();

router.get('/:backupKey', async (req: Request, res: Response) => {
    const { backupKey } = req.params as Pick<IBackup, 'backupKey'>;

    try {
        const result = await Backup.getBackup({
            backupKey: backupKey,
        });

        res.status(201).send({
            status: 'SUCCESS',
            result: result.rows[0],
        } as IResponse<IBackup>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { todo, todoOrd, character, characterOrd, ledger, share, shareDay } = req.body;
        const result = await Backup.createBackup({
            todo: todo,
            todoOrd: todoOrd,
            character: character,
            characterOrd: characterOrd,
            ledger: ledger,
            share: share,
            shareDay: shareDay,
        });
        res.status(201).send({
            status: 'SUCCESS',
            result: result,
        } as IResponse<QueryResult<Pick<IBackup, 'backupKey'>>>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

router.delete('/delete/:backupKey', async (req: Request, res: Response) => {
    try {
        const { backupKey } = req.body as Pick<IBackup, 'backupKey'>;

        const result = await Backup.deleteBackup({
            backupKey: backupKey,
        });

        res.status(201).send({
            status: 'SUCCESS',
        } as IResponse);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

export default router;
