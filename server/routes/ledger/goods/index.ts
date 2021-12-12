import { GoodsGold } from '../../../controllers/ledger/goods';
import express, { Request, Response } from 'express';
import { IResponse } from '../../../type/response';
import { IGoods, IGoodsImg } from './types';
import { IError } from '../../error/types';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await GoodsGold.getGoodsGold();

        res.status(201).send({
            status: 'SUCCESS',
            result: rows,
        } as IResponse<IGoods[]>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

router.get('/img', async (req: Request, res: Response) => {
    try {
        const { rows } = await GoodsGold.getGoodsGoldImg();

        res.status(201).send({
            status: 'SUCCESS',
            result: rows,
        } as IResponse<IGoodsImg[]>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

export default router;
