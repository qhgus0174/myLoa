import { Error } from '../../controllers/error';
import express, { Request, Response } from 'express';
import { IError, IResponse } from '../../type/response';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { message, dataColumn1, dataColumn2, dataColumn3, errType } = req.body as IError;

        await Error.insertError({
            message: message,
            dataColumn1: dataColumn1,
            dataColumn2: dataColumn2,
            dataColumn3: dataColumn3,
            errType: errType,
        });

        res.status(201).send({
            status: 'SUCCESS',
        } as IResponse);
    } catch (e: unknown) {
        const { message } = e as Error;

        console.log('error message : ', message);

        res.status(500).send({ status: 'ERR', result: { message: message } } as IResponse<IError>);
    }
});

export default router;
