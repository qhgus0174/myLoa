import express from 'express';
import backup from './backup';
import error from './error';
import weeklyContents from './weeklyContents';
import commonGold from './ledger/common';
import individualGold from './ledger/individual';
import raidGold from './ledger/raid';

const router = express.Router();

router.use('/backup', backup);
router.use('/error', error);
router.use('/weeklyContents', weeklyContents);
router.use('/ledger/commonGold', commonGold);
router.use('/ledger/individualGold', individualGold);
router.use('/ledger/raidGold', raidGold);

export default router;
