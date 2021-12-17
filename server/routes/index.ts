import express from 'express';
import backup from './backup';
import error from './error';
import weeklyContents from './contents/weekly';
import shareContents from './contents/share';
import commonGold from './ledger/common';
import goodsGold from './ledger/goods';
import raidGold from './ledger/raid';

const router = express.Router();

router.use('/backup', backup);
router.use('/error', error);
router.use('/weeklyContents', weeklyContents);
router.use('/shareContents', shareContents);
router.use('/ledger/commonGold', commonGold);
router.use('/ledger/goodsGold', goodsGold);
router.use('/ledger/raidGold', raidGold);

export default router;
