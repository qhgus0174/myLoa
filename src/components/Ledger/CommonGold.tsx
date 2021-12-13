import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import _ from 'lodash';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ICommonHistory, ILedger } from '@components/Ledger/LedgerType';
import Goods, { ISaveParam } from '@components/Ledger/Goods';
import ImageBackground from '@components/ImageBackground';
import { ICommonGold } from '@common/types/response/ledger/common';
import styled from '@emotion/styled';
import GoodsFieldSet from './common/GoodsFieldSet';

const CommonGold = ({ commonData }: { commonData: ICommonGold[] }) => {
    const { storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const addGoods = ({ imgUrl, name }: { imgUrl: string; name: string }) => {
        const ledgerArr: ILedger = Object.assign({}, storedLedger),
            {
                common: { histories },
            } = ledgerArr;

        const maxGoodsId = Math.max(...histories.map(({ id }) => Number(id)), 0);

        const history: ICommonHistory = {
            id: String(maxGoodsId + 1),
            gold: 0,
            datetime: DateTime.now().toFormat('X'),
            imgUrl: imgUrl,
            name: name,
        };

        ledgerArr.common = {
            ...ledgerArr.common,
            histories: [...ledgerArr.common.histories, history],
        };

        setStoredLedger(ledgerArr);
    };

    const saveData = ({ goodsId, name, gold }: ISaveParam) => {
        const newLedger: ILedger = { ...storedLedger },
            {
                common: { histories },
            } = newLedger;

        const goodsIndex = histories.findIndex(({ id }) => goodsId === id);

        const { name: oriName, gold: oriGold } = histories[goodsIndex];

        histories[goodsIndex] = {
            ...histories[goodsIndex],
            name: name !== undefined ? name : oriName,
            gold: gold !== undefined ? gold : oriGold,
        };

        setStoredLedger(newLedger);
    };

    const removeData = ({ goodsId }: ISaveParam) => {
        const newLedger: ILedger = { ...storedLedger },
            {
                common: { histories },
            } = newLedger;

        const resultHistory = _.reject(histories, ({ id }) => {
            return id === goodsId;
        });

        newLedger.common.histories = resultHistory;

        setStoredLedger(newLedger);
    };

    return (
        <Container>
            <GoodsFieldSet onClickCommon={addGoods} array={commonData} />
            <GoodsContainer>
                {storedLedger.common.histories.length > 0 ? (
                    storedLedger.common.histories.map(({ id, name, gold, datetime, imgUrl }, goodsIndex: number) => {
                        return (
                            <Goods
                                key={goodsIndex}
                                id={id}
                                name={name}
                                gold={gold}
                                datetime={datetime}
                                imgUrl={imgUrl}
                                saveFn={saveData}
                                removeFn={removeData}
                            />
                        );
                    })
                ) : (
                    <NoData>골드 수급처를 선택하여 내역을 추가 해 주세요!</NoData>
                )}
            </GoodsContainer>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const GoodsContainer = styled.ul`
    padding-top: 1em;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
`;

const NoData = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export default CommonGold;
