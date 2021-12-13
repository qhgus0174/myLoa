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

const CommonGold = ({ commonData }: { commonData: ICommonGold[] }) => {
    const { storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const addGoods = ({ imgUrl, name }: { imgUrl: string; name: string }) => {
        const ledgerArr: ILedger = Object.assign({}, storedLedger);

        const maxGoodsId = Math.max(...ledgerArr.common.histories.map(({ id }) => Number(id)), 0);

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
        <>
            <ImageContainer>
                {commonData
                    .filter(({ id }) => id != '1')
                    .map(({ id, defaultimgurl, name, defaultbackground }, goodsIndex: number) => {
                        return (
                            <ImageBackground
                                key={goodsIndex}
                                pointer={true}
                                grade={defaultbackground}
                                hover={{ effect: true, message: name }}
                                onClick={() => {
                                    addGoods({ imgUrl: defaultimgurl, name: name });
                                }}
                            >
                                <Image src={defaultimgurl} width="40" height="40" />
                            </ImageBackground>
                        );
                    })}
            </ImageContainer>
            <div>
                {storedLedger.common.histories.map(({ id, name, gold, datetime, imgUrl }, goodsIndex: number) => {
                    return (
                        <ul key={goodsIndex}>
                            <Goods
                                id={id}
                                name={name}
                                gold={gold}
                                datetime={datetime}
                                imgUrl={imgUrl}
                                saveFn={saveData}
                                removeFn={removeData}
                            />
                        </ul>
                    );
                })}
            </div>
        </>
    );
};

const ImageContainer = styled.section`
    display: flex;
`;
export default CommonGold;
