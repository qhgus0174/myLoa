import { RaidGold } from '../../../controllers/ledger/raidGold';
import express, { Request, Response } from 'express';
import { IResponse } from '../../../type/response';
import { IRaidGold, IRaidGoldDetail } from './types';
import { IError } from '../../error/types';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await RaidGold.getRaidGold();

        res.status(201).send({
            status: 'SUCCESS',
            result: rows,
        } as IResponse<IRaidGold[]>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

router.get('/detail', async (req: Request, res: Response) => {
    try {
        const { rows } = await RaidGold.getRaidGoldDetail();

        res.status(201).send({
            status: 'SUCCESS',
            result: rows,
        } as IResponse<IRaidGoldDetail[]>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

export default router;
