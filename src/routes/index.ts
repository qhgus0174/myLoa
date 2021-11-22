import express from 'express';
import backup from './backup';
import error from './error';
import guardian from './guardian';
import abyss from './abyss';
import weeklyContents from './weeklyContents';

const router = express.Router();

router.use('/backup', backup);
router.use('/error', error);
router.use('/guardian', guardian);
router.use('/abyss', abyss);
router.use('/weeklyContents', weeklyContents);

export = router;
