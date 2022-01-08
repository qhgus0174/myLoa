import React, { useContext, useState } from 'react';
import { DateTime } from 'luxon';
import { useInput } from '@hooks/useInput';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import EditButtonContainer from '@components/Container/Button/Edit';
import Form from '@components/Ledger/modal/Form';
import { ILedger } from '@common/types/localStorage/Ledger';
import { ICommonGold } from '@common/types/response/ledger/common';
import { dateToTime } from '@common/utils';
import styled from '@emotion/styled';
import { TopInfo, TopInfoTitle } from '@style/common/modal';

interface IIncome {
    goods: ICommonGold[];
    type: IncomeSpending;
    oriDay: string;
    oriName: string;
    oriImgUrl: string;
    oriGold: number;
    oriId: string;
}

export type IncomeSpending = 'income' | 'spending';

const EditIncomeSpending = ({ goods, type, oriDay, oriName, oriImgUrl, oriGold, oriId }: IIncome) => {
    const { storedLedger } = useContext(LocalStorageStateContext);

    const { closeModal } = useContext(ModalActionContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const [getGoods, setGetGoods] = useState<string>(
        goods[goods.findIndex(({ defaultimgurl }) => oriImgUrl == defaultimgurl)].id,
    );
    const [defaultImgUrl, setDefaultImgUrl] = useState<string>(oriImgUrl);
    const [day, setDay] = useState<string>(oriDay);
    const [name, bindName] = useInput<string>(oriName);
    const [gold, setGold] = useState<number>(oriGold);

    const onClickEdit = () => {
        const resultGold = editIncome();

        setStoredLedger(resultGold);
        closeModal();
    };

    const editIncome = (): ILedger => {
        const newLedger: ILedger = { ...storedLedger },
            {
                common: { histories },
            } = newLedger;

        const goodsIndex = histories.findIndex(({ id }) => oriId === id);

        histories[goodsIndex] = {
            ...histories[goodsIndex],
            gold: gold,
            datetime:
                day === DateTime.now().toFormat('yyyy/MM/dd')
                    ? histories[goodsIndex].datetime
                    : dateToTime({
                          date: day + ' ' + DateTime.now().toFormat('HH:mm:ss'),
                          format: 'yyyy/MM/dd HH:mm:ss',
                      }),
            imgUrl: defaultImgUrl,
            name: name,
        };

        return newLedger;
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
                <EditButtonContainer addClassName="incomeSpending" onClickEdit={onClickEdit} />
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

export default EditIncomeSpending;
