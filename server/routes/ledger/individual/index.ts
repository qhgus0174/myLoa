import { IndividualGold } from '../../../controllers/ledger/individual';
import express, { Request, Response } from 'express';
import { IResponse } from '../../../type/response';
import { IIndividual, IIndividualGoldDetail } from './types';
import { IError } from '../../error/types';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await IndividualGold.getIndividualGold();

        res.status(201).send({
            status: 'SUCCESS',
            result: rows,
        } as IResponse<IIndividual[]>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

router.get('/detail', async (req: Request, res: Response) => {
    try {
        const { rows } = await IndividualGold.getIndividualGoldDetail();

        res.status(201).send({
            status: 'SUCCESS',
            result: rows,
        } as IResponse<IIndividualGoldDetail[]>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

export default router;
