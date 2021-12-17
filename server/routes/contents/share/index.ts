import express, { Request, Response } from 'express';
import { ShareContents } from '../../../controllers/contents/share';
import { IResponse } from '../../../type/response';
import { IError } from '../../error/types';
import { IShareContents } from './types';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await ShareContents.getShareContents();

        res.status(201).send({
            status: 'SUCCESS',
            result: rows,
        } as IResponse<IShareContents[]>);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

export default router;
