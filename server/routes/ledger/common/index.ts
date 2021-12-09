import { CommonGold } from '../../../controllers/ledger/common';
import express, { Request, Response } from 'express';
import { IResponse } from '../../../type/response';
import { ICommonGold } from './types';
import { IError } from '../../error/types';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await CommonGold.getCommonGold();

        res.status(201).send({
            status: 'SUCCESS',
            result: rows,
        } as IResponse<ICommonGold[]>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

export default router;
