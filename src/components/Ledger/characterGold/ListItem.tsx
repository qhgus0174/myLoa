import React, { useContext, useState } from 'react';
import { ILedgerObjects } from 'pages/ledger';
import { LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import IncomeSpendList from '@components/Ledger/characterGold/IncomeSpendList';
import IncomeSpending from '@components/Ledger/modal/character/IncomeSpending';
import CharacterCalender from '@components/Ledger/characterGold/Calender';
import { IGoods } from '@common/types/response/ledger/goods';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import Histories from '@components/Ledger/Histories';
import RaidGold from '@components/Ledger/RaidGold';
import { getCharacterInfoById } from '@common/utils';
import { useTheme } from '@emotion/react';
import { ListItem, Contents, InnerContents } from '@style/common/layout/table';

interface IListItem {
    characterId: number;
    ledgerData: ILedgerObjects;
    goodsTotalGold: number;
    raidTotalGold: number;
    spendingGold: number;
    prevWeekGold: number;
}

const CharacterListItem = ({
    characterId,
    ledgerData,
    goodsTotalGold,
    raidTotalGold,
    spendingGold,
    prevWeekGold,
}: IListItem) => {
    const theme = useTheme();

    const [shownList, setShownList] = useState<any>({});

    const toggleList = (id: number) => {
        setShownList((prevShownComments: any[]) => ({ ...prevShownComments, [id]: !prevShownComments[id] }));
    };

    const { storedCharacter } = useContext(LocalStorageStateContext);

    const { setModalProps } = useContext(ModalActionContext);

    const openWriteIncomeGoods = ({ characterId, goods }: { characterId: number; goods: IGoods[] }) => {
        setModalProps({
            isOpen: true,
            content: (
                <IncomeSpending
                    characterId={characterId}
                    goods={goods}
                    imgPaletteArr={ledgerData.goodsImg}
                    type="income"
                />
            ),
            options: { width: '500', height: '540', headerTitle: '재화 수입' },
        });
    };

    const openWriteIncomeRaid = ({ characterId, goods }: { characterId: number; goods: IGoods[] }) => {
        setModalProps({
            isOpen: true,
            content: (
                <RaidGold
                    raidCategory={ledgerData.raid}
                    raidDetailData={ledgerData.raidDetail}
                    characterId={characterId}
                    characterLevel={Number(
                        getCharacterInfoById({
                            dataArray: storedCharacter,
                            id: characterId,
                        }).level.replace(/\,/g, ''),
                    )}
                />
            ),
            options: { width: '800', height: '540', headerTitle: '레이드 수입' },
        });
    };

    const openWriteSpending = ({ characterId, goods }: { characterId: number; goods: IGoods[] }) => {
        setModalProps({
            isOpen: true,
            content: (
                <IncomeSpending
                    type="spending"
                    characterId={characterId}
                    goods={goods}
                    imgPaletteArr={ledgerData.goodsImg}
                />
            ),
            options: { width: '500', height: '540', headerTitle: '재화 지출' },
        });
    };

    return (
        <Contents>
            <ListItem
                selected={shownList[characterId]}
                onClick={() => {
                    toggleList(characterId);
                }}
            >
                <InnerContents name={true}>
                    {
                        getCharacterInfoById({
                            dataArray: storedCharacter,
                            id: characterId,
                        }).name
                    }
                    (Lv.
                    {
                        getCharacterInfoById({
                            dataArray: storedCharacter,
                            id: characterId,
                        }).level
                    }
                    )
                </InnerContents>
                <InnerContents>
                    <TitleAndGold
                        underline={false}
                        isPadding={false}
                        gold={goodsTotalGold + raidTotalGold}
                        goldTextColor={theme.ledger.income}
                    />
                </InnerContents>
                <InnerContents>
                    <TitleAndGold
                        underline={false}
                        isPadding={false}
                        gold={spendingGold}
                        negative={true}
                        goldTextColor={theme.ledger.spending}
                    />
                </InnerContents>
                <InnerContents>
                    <TitleAndGold
                        isPadding={false}
                        underline={false}
                        gold={goodsTotalGold + raidTotalGold - spendingGold}
                    />
                </InnerContents>
                <InnerContents>
                    <TitleAndGold
                        isPadding={false}
                        underline={false}
                        goldTextColor={theme.colors.gray}
                        gold={prevWeekGold}
                    />
                </InnerContents>
            </ListItem>
            <Histories
                visible={shownList[characterId]}
                list={
                    <IncomeSpendList
                        characterId={characterId}
                        goods={ledgerData.goods}
                        imgPaletteArr={ledgerData.goodsImg}
                        raidCategory={ledgerData.raid}
                        raidDetailData={ledgerData.raidDetail}
                        totalGold={goodsTotalGold + raidTotalGold - spendingGold}
                    />
                }
                calendar={<CharacterCalender characterId={characterId} />}
                onClickIncome={() => openWriteIncomeGoods({ characterId: characterId, goods: ledgerData.goods })}
                onClickRaid={() => openWriteIncomeRaid({ characterId: characterId, goods: ledgerData.goods })}
                onClickSpending={() => openWriteSpending({ characterId: characterId, goods: ledgerData.goods })}
            />
        </Contents>
    );
};

export default CharacterListItem;
