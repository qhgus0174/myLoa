import express from 'express';
import backup from './backup';
import error from './error';
import weeklyContents from './weeklyContents';

const router = express.Router();

router.use('/backup', backup);
router.use('/error', error);
router.use('/weeklyContents', weeklyContents);

export default router;
