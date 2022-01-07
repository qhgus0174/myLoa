import React, { useContext, useState } from 'react';
import { DateTime } from 'luxon';
import { useInput } from '@hooks/useInput';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import EditButtonContainer from '@components/Container/Button/Edit';
import Form from '@components/Ledger/modal/Form';
import { ILedger, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { IGoods, IGoodsImg } from '@common/types/response/ledger/goods';
import { dateToTime, getCharacterInfoById } from '@common/utils';
import { IncomeSpendingType } from '@common/types/types';
import styled from '@emotion/styled';
import { TopInfo, TopInfoTitle } from '@style/common/modal';

interface IIncome {
    characterId: number;
    goods: IGoods[];
    imgPaletteArr: IGoodsImg[];
    type: IncomeSpendingType;
    oriGoodsId: string;
    incomeSpendId: string;
    oriDay: string;
    oriImgId: string;
    oriName: string;
    oriGold: number;
}

const EditIncomeSpending = ({
    characterId,
    goods,
    imgPaletteArr,
    type,
    oriGoodsId,
    incomeSpendId,
    oriDay,
    oriName,
    oriImgId,
    oriGold,
}: IIncome) => {
    const { storedCharacter, storedLedger, storedCharacterOrd } = useContext(LocalStorageStateContext);

    const { closeModal } = useContext(ModalActionContext);
    const { setStoredTodo, setStoredCharacter, setStoredCharacterOrd, setStoredLedger } =
        useContext(LocalStorageActionContext);

    const [getGoods, setGetGoods] = useState<string>(oriGoodsId);
    const [goodsIconId, setGoodsIconId] = useState<string>(oriImgId);
    const [day, setDay] = useState<string>(oriDay);
    const [name, bindName] = useInput<string>(oriName);
    const [gold, setGold] = useState<number>(oriGold);

    const onClickEdit = () => {
        const editGold = {
            income: () => editIncome(),
            spending: () => editSpending(),
        };

        const resultGold = editGold[type] && editGold[type]();

        setStoredLedger(resultGold);
        closeModal();
    };

    const editIncome = (): ILedger => {
        const newLedger: ILedger = { ...storedLedger };

        const charLedgerIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);

        const ownLedger = newLedger.own[charLedgerIndex],
            {
                histories: {
                    goods: { data: ownData },
                },
            } = ownLedger;

        const goodsIndex = ownData.findIndex(({ id }) => id === incomeSpendId);

        ownData[goodsIndex] = {
            ...ownData[goodsIndex],
            categoryId: String(getGoods),
            gold: Number(gold),
            imgId: goodsIconId,
            datetime:
                day === DateTime.now().toFormat('yyyy/MM/dd')
                    ? ownData[goodsIndex].datetime
                    : dateToTime({
                          date: day + ' ' + DateTime.now().toFormat('HH:mm:ss'),
                          format: 'yyyy/MM/dd HH:mm:ss',
                      }),
            name: name,
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

    const editSpending = (): ILedger => {
        const newLedger: ILedger = { ...getSpending() };

        const charLedgerIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);

        const ownLedger = newLedger.own[charLedgerIndex],
            {
                histories: {
                    spending: { data: ownData },
                },
            } = ownLedger;

        const spendingIndex = ownData.findIndex(({ id }) => id === incomeSpendId);

        ownData[spendingIndex] = {
            ...ownData[spendingIndex],
            categoryId: String(getGoods),
            gold: Number(gold),
            imgId: goodsIconId,
            datetime:
                day === DateTime.now().toFormat('yyyy/MM/dd')
                    ? ownData[spendingIndex].datetime
                    : dateToTime({
                          date: day + ' ' + DateTime.now().toFormat('HH:mm:ss'),
                          format: 'yyyy/MM/dd HH:mm:ss',
                      }),

            name: name,
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
                    day={day}
                    setDay={setDay}
                    setGetGoods={setGetGoods}
                    getGoods={getGoods}
                    bindName={bindName}
                    setGold={setGold}
                    gold={gold}
                    goods={goods}
                    imgPaletteArr={imgPaletteArr}
                    setGoodsIconId={setGoodsIconId}
                    goodsIconId={goodsIconId}
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
