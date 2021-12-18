import { Error } from '../../controllers/error';
import express, { Request, Response } from 'express';
import { IResponse } from '../../type/response';
import { ErrType, IError } from './types';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { message, dataColumn1, dataColumn2, dataColumn3, errType } = req.params;

        await Error.insertError({
            message: message,
            dataColumn1: dataColumn1,
            dataColumn2: dataColumn2,
            dataColumn3: dataColumn3,
            errType: errType as ErrType,
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
