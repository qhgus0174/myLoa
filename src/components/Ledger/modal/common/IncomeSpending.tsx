import React, { useContext, useState } from 'react';
import { DateTime } from 'luxon';
import { useInput } from '@hooks/useInput';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import AddButtonContainer from '@components/Container/Button/Add';
import Form from '@components/Ledger/modal/Form';
import { ICommonHistory, ILedger } from '@common/types/localStorage/Ledger';
import { ICommonGold } from '@common/types/response/ledger/common';
import styled from '@emotion/styled';
import { TopInfo, TopInfoTitle } from '@style/common/modal';

interface IIncome {
    goods: ICommonGold[];
    type: IncomeSpending;
}

export type IncomeSpending = 'income' | 'spending';

const IncomeSpending = ({ goods, type }: IIncome) => {
    const { storedLedger } = useContext(LocalStorageStateContext);

    const { closeModal } = useContext(ModalActionContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const [getGoods, setGetGoods] = useState<string>('1');
    const [defaultImgUrl, setDefaultImgUrl] = useState<string>('/static/img/lostark/common/eponagold.png');
    const [day, setDay] = useState<string>(DateTime.now().toFormat('yyyy/MM/dd'));
    const [name, bindName] = useInput<string>('');
    const [gold, setGold] = useState<number>(0);

    const onClickAdd = () => {
        const addGold = {
            income: () => addIncome(),
            spending: () => addSpending(),
        };

        const resultGold = addGold[type] && addGold[type]();

        setStoredLedger(resultGold);
        closeModal();
    };

    const addIncome = (): ILedger => {
        const goodsIndex = goods.findIndex(({ id: goodsId }) => goodsId == getGoods);

        const ledgerArr: ILedger = Object.assign({}, storedLedger),
            {
                common: { histories },
            } = ledgerArr;

        const maxGoodsId = Math.max(...histories.map(({ id }) => Number(id)), 0);

        const { name: goodsDefaultName } = goods[goodsIndex];

        const history: ICommonHistory = {
            id: String(maxGoodsId + 1),
            gold: gold,
            datetime: DateTime.now().toFormat('X'),
            imgUrl: defaultImgUrl,
            type: type,
            name: name ? name : goodsDefaultName,
        };

        ledgerArr.common = {
            ...ledgerArr.common,
            histories: [...ledgerArr.common.histories, history],
        };

        return ledgerArr;
    };

    const addSpending = (): ILedger => {
        const goodsIndex = goods.findIndex(({ id: goodsId }) => goodsId == getGoods);
        const ledgerArr: ILedger = Object.assign({}, storedLedger),
            {
                common: { histories },
            } = ledgerArr;

        const maxGoodsId = Math.max(...histories.map(({ id }) => Number(id)), 0);

        const { name: goodsDefaultName } = goods[goodsIndex];

        const history: ICommonHistory = {
            id: String(maxGoodsId + 1),
            gold: gold,
            datetime: DateTime.now().toFormat('X'),
            imgUrl: defaultImgUrl,
            type: type,
            name: name ? name : goodsDefaultName,
        };

        ledgerArr.common = {
            ...ledgerArr.common,
            histories: [...ledgerArr.common.histories, history],
        };

        return ledgerArr;
    };

    return (
        <Container>
            <CharacterInfo>
                <TopInfo>
                    <TopInfoTitle>공통</TopInfoTitle>
                </TopInfo>
            </CharacterInfo>
            <LedgerInfo>
                <Form
                    getGoods={getGoods}
                    day={day}
                    setGetGoods={setGetGoods}
                    setDay={setDay}
                    bindName={bindName}
                    setGold={setGold}
                    gold={gold}
                    goods={goods}
                    setDefaultImgUrl={setDefaultImgUrl}
                    defaultImgUrl={defaultImgUrl}
                />
                <AddButtonContainer addClassName="addTodo" onClickAdd={onClickAdd} />
            </LedgerInfo>
        </Container>
    );
};

const Container = styled.article`
    display: flex;
    flex-direction: column;
`;

const CharacterInfo = styled.div``;

const LedgerInfo = styled.div``;

export default IncomeSpending;
