import { Abyss } from '../../controllers/weeklyAbyss';
import express, { Request, Response } from 'express';
import { IResponse } from '../../type/response';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await Abyss.getAbyss();

        res.status(201).send({
            status: 'SUCCESS',
            result: result.rows,
        } as IResponse);
    } catch (e: unknown) {
        const { message } = e as Error;
        res.status(500).send({ status: 'ERR', message: message } as IResponse);
    }
});

export = router;
