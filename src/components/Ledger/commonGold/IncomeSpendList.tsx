import React, { useContext } from 'react';
import reject from 'lodash-es/reject';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import IncomeSpendItem from '@components/Ledger/commonGold/IncomeSpendItem';
import Nodata from '@components/article/Nodata';
import { ICommonGold } from '@common/types/response/ledger/common';
import { ILedger } from '@common/types/localStorage/Ledger';
import { ILedgerSaveParam } from '@common/types/types';
import styled from '@emotion/styled';

const IncomeSpendList = ({ commonData }: { commonData: ICommonGold[] }) => {
    const { storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const removeData = ({ goodsId }: Pick<ILedgerSaveParam, 'goodsId'>) => {
        const newLedger: ILedger = { ...storedLedger },
            {
                common: { histories },
            } = newLedger;

        const resultHistory = reject(histories, ({ id }) => {
            return id === goodsId;
        });

        newLedger.common.histories = resultHistory;

        setStoredLedger(newLedger);
    };
    return (
        <>
            <Container>
                {storedLedger.common.histories.length > 0 ? (
                    storedLedger.common.histories.map(
                        ({ id, name, gold, datetime, imgUrl, type }, goodsIndex: number) => {
                            return (
                                <IncomeSpendItem
                                    key={goodsIndex}
                                    id={id}
                                    name={name}
                                    gold={gold}
                                    datetime={datetime}
                                    imgUrl={imgUrl}
                                    removeFn={removeData}
                                    type={type}
                                    commonData={commonData}
                                />
                            );
                        },
                    )
                ) : (
                    <Nodata text="골드 수급처를 선택하여 내역을 추가 해 주세요!" />
                )}
            </Container>
        </>
    );
};

const Container = styled.ul`
    padding-top: 1em;
    height: 200px;
    overflow-y: auto;
    width: 100%;
`;

export default IncomeSpendList;
