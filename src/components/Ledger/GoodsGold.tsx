import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { SpinnerContext } from '@context/SpinnerContext';
import { ILedger, ILedgerHistoryGoods, ILedgerOwn } from '@components/Ledger/LedgerType';
import Goods, { ISaveParam } from '@components/Ledger/Goods';
import ImageBackground from '@components/ImageBackground';
import { IGoods, IGoodsImg } from '@common/types/response/ledger/goods';
import styled from '@emotion/styled';
import GoodsFieldSet from './common/GoodsFieldSet';

const GoodsGold = ({
    characterId,
    goods,
    imgPaletteArr,
}: {
    characterId: number;
    goods: IGoods[];
    imgPaletteArr: IGoodsImg[];
}) => {
    const { setSpinnerVisible } = useContext(SpinnerContext);
    const [active, setActive] = useState<string>('');
    const { storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);
    const [charLedgerIndex, setCharLedgerIndex] = useState<number>(0);

    useEffect(() => {
        const goodsIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);
        setCharLedgerIndex(goodsIndex);
    }, []);

    const addGoods = ({ id }: { id: string }) => {
        const newLedger: ILedger = { ...storedLedger };

        const goodsIndex = goods.findIndex(({ id: goodsId }) => goodsId == id);

        const ownLedger = newLedger.own[charLedgerIndex],
            {
                histories: {
                    goods: { data: ownData },
                },
            } = ownLedger;

        const maxGoodsId = Math.max(...ownData.map(({ id }) => Number(id)), 0);

        const { name } = goods[goodsIndex];

        const history: ILedgerHistoryGoods = {
            id: String(maxGoodsId + 1),
            categoryId: id,
            gold: 0,
            imgId: '1',
            datetime: DateTime.now().toFormat('X'),
            name: name,
        };

        newLedger.own[charLedgerIndex] = {
            ...ownLedger,
            histories: {
                ...ownLedger.histories,
                goods: {
                    fold: false,
                    data: [...ownData].concat([history]),
                },
            },
        };

        setStoredLedger(newLedger);
    };

    const saveData = ({ name, gold, imageId, goodsId }: ISaveParam) => {
        const newLedger: ILedger = { ...storedLedger };

        const ownLedger = newLedger.own[charLedgerIndex],
            {
                histories: {
                    goods: { data: ownData },
                },
            } = ownLedger;

        const goodsIndex = ownData.findIndex(({ id }) => goodsId === id);

        const ownGoodsData = ownData[goodsIndex],
            { name: oriName, gold: oriGold, imgId: oriImgId } = ownGoodsData;

        ownData[goodsIndex] = {
            ...ownGoodsData,
            name: name !== undefined ? name : oriName,
            gold: gold !== undefined ? gold : oriGold,
            imgId: imageId !== undefined ? imageId : oriImgId,
        };

        setStoredLedger(newLedger);
    };

    const removeData = ({ goodsId }: ISaveParam) => {
        const newLedger: ILedger = { ...storedLedger };

        const ownLedger = newLedger.own[charLedgerIndex],
            {
                histories: {
                    goods: { data: ownData },
                },
            } = ownLedger;

        const resultHistory = _.reject(ownData, ({ id }) => {
            return id === goodsId;
        });

        ownLedger.histories.goods = {
            ...ownLedger.histories.goods,
            data: resultHistory,
        };

        setStoredLedger(newLedger);
    };

    return (
        <>
            <GoodsFieldSet onClickPersonal={addGoods} array={goods} />
            <GoodsContainer>
                {storedLedger.own[charLedgerIndex].histories.goods.data.length > 0 ? (
                    storedLedger.own[charLedgerIndex].histories.goods.data.map(
                        ({ id, name, gold, categoryId, imgId, datetime }, goodsIndex: number) => {
                            return (
                                <Goods
                                    key={goodsIndex}
                                    categoryId={categoryId}
                                    id={id}
                                    name={name}
                                    gold={gold}
                                    imgPaletteArr={imgPaletteArr}
                                    imgId={imgId}
                                    datetime={datetime}
                                    saveFn={saveData}
                                    removeFn={removeData}
                                />
                            );
                        },
                    )
                ) : (
                    <NoData>골드 수급처를 선택하여 내역을 추가 해 주세요!</NoData>
                )}
            </GoodsContainer>
        </>
    );
};

const GoodsContainer = styled.ul`
    padding-top: 1em;
    height: 200px;
    overflow-y: auto;
    width: 100%;
`;

const NoData = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export default GoodsGold;
