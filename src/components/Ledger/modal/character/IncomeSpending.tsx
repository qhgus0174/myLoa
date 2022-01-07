import React, { useContext, useState } from 'react';
import { DateTime } from 'luxon';
import { useInput } from '@hooks/useInput';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import AddButtonContainer from '@components/Container/Button/Add';
import Form from '@components/Ledger/modal/Form';
import { ILedger, ILedgerHistoryGoods, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { IGoods, IGoodsImg } from '@common/types/response/ledger/goods';
import { dateToTime, getCharacterInfoById } from '@common/utils';
import styled from '@emotion/styled';
import { TopInfo, TopInfoTitle } from '@style/common/modal';

interface IIncome {
    characterId: number;
    goods: IGoods[];
    imgPaletteArr: IGoodsImg[];
    type: IncomeSpending;
}

export type IncomeSpending = 'income' | 'spending';

const IncomeSpending = ({ characterId, goods, imgPaletteArr, type }: IIncome) => {
    const { storedCharacter, storedLedger, storedCharacterOrd } = useContext(LocalStorageStateContext);

    const { closeModal } = useContext(ModalActionContext);
    const { setStoredTodo, setStoredCharacter, setStoredCharacterOrd, setStoredLedger } =
        useContext(LocalStorageActionContext);

    const [getGoods, setGetGoods] = useState<string>('1');
    const [goodsIconId, setGoodsIconId] = useState<string>('1');
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
        const newLedger: ILedger = { ...storedLedger };

        const goodsIndex = goods.findIndex(({ id: goodsId }) => goodsId == getGoods);

        const charLedgerIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);

        const ownLedger = newLedger.own[charLedgerIndex],
            {
                histories: {
                    goods: { data: ownData },
                },
            } = ownLedger;

        const maxGoodsId = Math.max(...ownData.map(({ id }) => Number(id)), 0);

        const { name: goodsDefaultName } = goods[goodsIndex];

        const history: ILedgerHistoryGoods = {
            id: String(maxGoodsId + 1),
            categoryId: String(getGoods),
            gold: Number(gold),
            imgId: goodsIconId,
            datetime: dateToTime({
                date: day + ' ' + DateTime.now().toFormat('HH:mm:ss'),
                format: 'yyyy/MM/dd HH:mm:ss',
            }),
            name: name ? name : goodsDefaultName,
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

        return newLedger;
    };

    const getSpending = (): ILedger => {
        const newLedger: ILedger = { ...storedLedger };

        const charLedgerIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);

        const ownLedger = newLedger.own[charLedgerIndex],
            {
                histories: { spending },
            } = ownLedger;

        if (!spending) {
            newLedger.own[charLedgerIndex] = {
                ...ownLedger,
                histories: {
                    ...ownLedger.histories,
                    spending: {
                        fold: true,
                        data: [],
                    },
                },
            };
        }

        return newLedger;
    };

    const addSpending = (): ILedger => {
        const newLedger: ILedger = { ...getSpending() };

        const goodsIndex = goods.findIndex(({ id: goodsId }) => goodsId == getGoods);

        const charLedgerIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);

        const ownLedger = newLedger.own[charLedgerIndex],
            {
                histories: {
                    spending: { data: ownData },
                },
            } = ownLedger;

        const maxGoodsId = Math.max(...ownData.map(({ id }) => Number(id)), 0);

        const { name: goodsDefaultName } = goods[goodsIndex];

        const history: ILedgerHistoryGoods = {
            id: String(maxGoodsId + 1),
            categoryId: String(getGoods),
            gold: Number(gold),
            imgId: goodsIconId,
            datetime: DateTime.fromFormat(day, 'yyyy/MM/dd').toFormat('X'),
            name: name ? name : goodsDefaultName,
        };

        newLedger.own[charLedgerIndex] = {
            ...ownLedger,
            histories: {
                ...ownLedger.histories,
                spending: {
                    fold: false,
                    data: [...ownData].concat([history]),
                },
            },
        };

        return newLedger;
    };

    return (
        <Container>
            <CharacterInfo>
                <TopInfo>
                    <div>
                        캐릭터명 :
                        <TopInfoTitle>
                            {
                                getCharacterInfoById({
                                    dataArray: storedCharacter,
                                    id: characterId,
                                }).name
                            }
                        </TopInfoTitle>
                    </div>
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
                    imgPaletteArr={imgPaletteArr}
                    setGoodsIconId={setGoodsIconId}
                    goodsIconId={goodsIconId}
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
