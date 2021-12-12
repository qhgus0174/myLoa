import dbPool from '../../config/db';
import { QueryResult } from 'pg';
import { IGoods, IGoodsImg } from '../../routes/ledger/goods/types';

const GoodsGold = {
    getGoodsGold: async (): Promise<QueryResult<IGoods>> => await dbPool.query(`SELECT * FROM goodsgold ORDER BY id`),

    getGoodsGoldImg: async (): Promise<QueryResult<IGoodsImg>> =>
        await dbPool.query(`
            SELECT ggimg.categoryid
                    , gg.engname AS folder
                    , ggimg.id
                    , ggimg.filename
                    , ggimg.background
            FROM goodsgold gg
            JOIN goodsgoldimg ggimg
                ON gg.id = ggimg.categoryid
            ORDER BY ggimg.id
        `),
};

export { GoodsGold };
