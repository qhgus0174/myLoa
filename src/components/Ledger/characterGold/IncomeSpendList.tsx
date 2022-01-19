import React, { useContext, useEffect, useState } from 'react';
import reject from 'lodash-es/reject';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import IncomeSpendItem from '@components/Ledger/characterGold/IncomeSpendItem';
import RadioButton from '@components/Input/Radio';
import Nodata from '@components/article/Nodata';
import { GoldType, ILedger, ILedgerHistoryGoods, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { IRaidGold, IRaidGoldDetail } from '@common/types/response/ledger/raid';
import { IGoods, IGoodsImg } from '@common/types/response/ledger/goods';
import { ILedgerSaveParam } from '@common/types/types';
import { groupBy } from '@common/utils';
import styled from '@emotion/styled';

interface IAllGoldData extends ILedgerHistoryGoods {
    type: GoldType;
}

type IFilterType = 'all' | 'raid' | 'goods';

const IncomeSpendList = ({
    characterId,
    goods,
    imgPaletteArr,
    raidCategory,
    raidDetailData,
}: {
    characterId: number;
    goods: IGoods[];
    imgPaletteArr: IGoodsImg[];
    raidCategory: IRaidGold[];
    raidDetailData: IRaidGoldDetail[];
}) => {
    const { storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const [allGoldData, setAllGoldData] = useState<IAllGoldData[]>([]);
    const [filter, setFilter] = useState<IFilterType>('all');

    useEffect(() => {
        getAllGoldArr({ filter: filter });
    }, [storedLedger]);

    const getAllGoldArr = ({ filter }: { filter: string }) => {
        const characterIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);

        const goodsdata: IAllGoldData[] = storedLedger.own[characterIndex].histories.goods.data.map(data => {
            return { ...data, type: 'goods' };
        });

        const spendingdata: IAllGoldData[] = storedLedger.own[characterIndex].histories.spending
            ? storedLedger.own[characterIndex].histories.spending.data.map(data => {
                  return { ...data, type: 'spending' };
              })
            : [];

        const raiddata: IAllGoldData[] = storedLedger.own[characterIndex].histories.raid.data.map(data => {
            const parentId = raidDetailData.filter(({ id }) => {
                return id == data.id;
            })[0].parentid;

            const index = raidCategory.findIndex(({ id }) => {
                return id == String(parentId);
            });

            return {
                ...data,
                type: 'raid',
                name: raidCategory[index].name,
                imgId: raidCategory[index].imgurl,
                categoryId: '',
            };
        });

        const groupRaidData: IAllGoldData[] = Object.values(groupBy(raiddata, obj => obj.name)).map(raidObj => {
            const sumGold = raidObj
                .map(({ gold }) => {
                    return gold;
                })
                .reduce((prev, next) => prev + next);

            const maxId = Math.max(
                ...raidObj
                    .map(({ id }) => {
                        return id;
                    })
                    .map(Number),
            );

            const maxDatetime = Math.max(
                ...raidObj
                    .map(({ datetime }) => {
                        return datetime;
                    })
                    .map(Number),
            );

            return {
                id: String(maxId),
                datetime: String(maxDatetime),
                imgId: raidObj[raidObj.length - 1].imgId,
                type: 'raid',
                name: raidObj[raidObj.length - 1].name,
                gold: sumGold,
                categoryId: '',
            };
        });

        const filterArray = new Map()
            .set('all', groupRaidData.concat(goodsdata).concat(spendingdata))
            .set('raid', groupRaidData)
            .set('goods', goodsdata.concat(spendingdata));

        setAllGoldData(filterArray.get(filter));
    };

    const removeData = ({ goodsId, type }: Pick<ILedgerSaveParam, 'goodsId' | 'type'>) => {
        const characterIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);

        const removeGoldData = {
            goods: () => deleteGoods({ goodsId, characterIndex }),
            spending: () => deleteSpending({ goodsId, characterIndex }),
            raid: () => {
                return { ...storedLedger };
            },
        };

        const resultData = removeGoldData[type] && removeGoldData[type]();
        setStoredLedger(resultData);
    };

    const deleteGoods = ({
        goodsId,
        characterIndex,
    }: Pick<ILedgerSaveParam, 'goodsId'> & { characterIndex: number }) => {
        const newLedger: ILedger = { ...storedLedger };

        const ownLedger = newLedger.own[characterIndex],
            {
                histories: {
                    goods: { data: ownData },
                },
            } = ownLedger;

        const resultHistory = reject(ownData, ({ id }) => {
            return id === goodsId;
        });

        ownLedger.histories.goods = {
            ...ownLedger.histories.goods,
            data: resultHistory,
        };

        return newLedger;
    };

    const deleteSpending = ({
        goodsId,
        characterIndex,
    }: Pick<ILedgerSaveParam, 'goodsId'> & { characterIndex: number }) => {
        const newLedger: ILedger = { ...storedLedger };

        const ownLedger = newLedger.own[characterIndex],
            {
                histories: {
                    spending: { data: ownData },
                },
            } = ownLedger;

        const resultHistory = reject(ownData, ({ id }) => {
            return id === goodsId;
        });

        ownLedger.histories.spending = {
            ...ownLedger.histories.spending,
            data: resultHistory,
        };

        return newLedger;
    };

    return (
        <>
            <ListRadio>
                <RadioButton
                    text="모두"
                    name="type"
                    value="all"
                    onChange={() => {
                        setFilter('all');
                        getAllGoldArr({ filter: 'all' });
                    }}
                    checked={filter === 'all'}
                />
                <RadioButton
                    text="재화"
                    name="type"
                    value="goods"
                    onChange={() => {
                        setFilter('goods');
                        getAllGoldArr({ filter: 'goods' });
                    }}
                    checked={filter === 'goods'}
                />
                <RadioButton
                    text="레이드"
                    name="type"
                    value="raid"
                    onChange={() => {
                        setFilter('raid');
                        getAllGoldArr({ filter: 'raid' });
                    }}
                    checked={filter === 'raid'}
                />
            </ListRadio>
            <Container>
                {allGoldData.length > 0 ? (
                    allGoldData
                        .sort(({ datetime: beforDt }, { datetime: afterDt }) => {
                            return Number(afterDt) - Number(beforDt);
                        })
                        .map(({ id, name, gold, categoryId, imgId, datetime, type }, goodsIndex: number) => {
                            return (
                                <IncomeSpendItem
                                    key={goodsIndex}
                                    id={id}
                                    type={type}
                                    name={name}
                                    categoryId={categoryId}
                                    imgId={imgId}
                                    gold={gold}
                                    datetime={datetime}
                                    imgPaletteArr={imgPaletteArr}
                                    removeFn={removeData}
                                    goods={goods}
                                    characterId={characterId}
                                />
                            );
                        })
                ) : (
                    <Nodata text="골드 수급처를 선택하여 내역을 추가 해 주세요!" />
                )}
            </Container>
        </>
    );
};

const Container = styled.ul`
    padding-top: 1em;
    height: auto;
    max-height: 500px;
    overflow-y: auto;
    width: 100%;
`;

const ListRadio = styled.div`
    margin-top: 1em;
`;

export default IncomeSpendList;
