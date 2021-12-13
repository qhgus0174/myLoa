import React, { useContext, useEffect, useState } from 'react';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import { IRaidGold, IRaidGoldDetail } from '@common/types/response/ledger/raid';
import { InnerContent } from '@style/common/modal';
import { FlexDiv } from '@style/common';
import { ILedger, ILedgerHistoryRaid, ILedgerOwn } from '@components/Ledger/LedgerType';
import { DateTime } from 'luxon';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { groupBy } from '@common/utils';
import Image from 'next/image';
import GoldIcon from '@components/Image/Gold';
import { calcSum } from './common/functions';

const RaidGold = ({
    characterId,
    characterLevel,
    raidCategory,
    raidDetailData,
}: {
    characterId: number;
    characterLevel: number;
    raidCategory: IRaidGold[];
    raidDetailData: IRaidGoldDetail[];
}) => {
    const { storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const [charLedgerIndex, setCharLedgerIndex] = useState<number>(0);

    useEffect(() => {
        const goodsIndex = storedLedger.own.findIndex((own: ILedgerOwn) => own.characterId === characterId);
        setCharLedgerIndex(goodsIndex);
    }, []);

    const onChangeRaidCheckbox = ({
        e,
        gold,
        parentId,
        difficulty,
        gateway,
    }: {
        e: React.ChangeEvent<HTMLInputElement>;
        gold: number;
        parentId: string;
        difficulty: string;
        gateway: string;
    }) => {
        const {
            target: { value: raidId, checked },
        } = e;
        const newLedger: ILedger = { ...storedLedger };

        const ownLedger = newLedger.own[charLedgerIndex];

        checked
            ? controlCheckAction({
                  raidId: raidId,
                  gold: gold,
                  parentId: parentId,
                  difficulty: difficulty,
              })
            : controlUncheckAction({
                  raidId: raidId,
                  gateway: gateway,
                  parentId: parentId,
                  difficulty: difficulty,
              });
    };

    const controlCheckAction = ({
        raidId,
        gold,
        parentId,
        difficulty,
    }: {
        raidId: string;
        gold: number;
        parentId: string;
        difficulty: string;
    }) => {
        const newLedger: ILedger = { ...storedLedger };

        const ownLedger = newLedger.own[charLedgerIndex];

        const {
            histories: {
                raid: { fold: ownFold, data: ownData },
            },
        } = ownLedger;

        const storedRaidIdArr = ownData.map(history => {
            return history.id;
        });

        const otherDiffGateway = raidDetailData
            .filter(({ parentid, difficulty: pDifficulty }) => {
                return parentid === parentId && pDifficulty !== difficulty;
            })
            .map(({ id }) => String(id));

        const otherDiffCheckedId = storedRaidIdArr.filter((id: string) => otherDiffGateway.includes(id));

        const exceptGateway = raidDetailData
            .filter(({ id }) => otherDiffCheckedId.includes(String(id)))
            .map(({ gateway }) => gateway);

        const prevRaid = raidDetailData.filter(({ id: pId, parentid, difficulty: pDifficulty, gateway: pGateway }) => {
            return (
                parentid === parentId && pDifficulty === difficulty && pId < raidId && !exceptGateway.includes(pGateway)
            );
        });

        const prevRaidHistory = prevRaid.map(({ id, gold }): ILedgerHistoryRaid => {
            return { id: String(id), gold: gold, datetime: DateTime.now().toFormat('X') };
        });

        const history: ILedgerHistoryRaid = {
            id: raidId,
            gold: gold,
            datetime: DateTime.now().toFormat('X'),
        };

        const resultHistory = [...prevRaidHistory, history];

        const removeDupResult = resultHistory.filter(({ id }) => {
            return !storedRaidIdArr.includes(id);
        });

        newLedger.own[charLedgerIndex] = {
            ...ownLedger,
            histories: {
                ...ownLedger.histories,
                raid: {
                    fold: ownFold,
                    data: [...ownData].concat(removeDupResult),
                },
            },
        };

        setStoredLedger(newLedger);
    };

    const controlUncheckAction = ({
        raidId,
        gateway,
        parentId,
        difficulty,
    }: {
        raidId: string;
        gateway: string;
        parentId: string;
        difficulty: string;
    }) => {
        const newLedger: ILedger = { ...storedLedger };

        const ownLedger = newLedger.own[charLedgerIndex];

        const {
            histories: {
                raid: { fold: ownFold, data: ownData },
            },
        } = ownLedger;

        const nextRaid = raidDetailData.filter(({ id: pId, parentid, difficulty: pDifficulty }) => {
            return parentid === parentId && pDifficulty === difficulty && pId > raidId;
        });

        const otherDifficultyArr = raidDetailData.filter(({ parentid, difficulty: pDifficulty, gateway: pGateway }) => {
            return parentid === parentId && pGateway === gateway && pDifficulty !== difficulty;
        });

        const nextRaidIdArr = nextRaid.map(({ id }) => {
            return String(id);
        });

        let diffNextRaidIdArr: string[] = [];

        if (otherDifficultyArr.length > 0) {
            const {
                parentid: diffParentId,
                difficulty: diffDiff,
                id: diffId,
            } = raidDetailData.filter(({ parentid, difficulty: pDifficulty, gateway: pGateway }) => {
                return parentid === parentId && pGateway === gateway && pDifficulty !== difficulty;
            })[0];
            const otherDiffNextRaid = raidDetailData.filter(({ id: pId, parentid, difficulty: pDifficulty }) => {
                return parentid === diffParentId && pDifficulty === diffDiff && pId > diffId;
            });
            diffNextRaidIdArr = otherDiffNextRaid.map(({ id }) => {
                return String(id);
            });
        }

        const resultNextRaidArr = [...nextRaidIdArr, ...diffNextRaidIdArr, raidId];

        newLedger.own[charLedgerIndex] = {
            ...ownLedger,
            histories: {
                ...ownLedger.histories,
                raid: {
                    fold: ownFold,
                    data: [...ownData].filter(item => !resultNextRaidArr.includes(item.id)),
                },
            },
        };

        setStoredLedger(newLedger);
    };

    return (
        <section>
            <article>
                {raidDetailData && (
                    <>
                        <InnerContent>
                            <FlexDiv>
                                {raidCategory.map(
                                    (
                                        { id: raidId, name: raidName, openlevel, closelevel }: IRaidGold,
                                        raidIndex: number,
                                    ) => {
                                        const grouppedDetailData = groupBy(
                                            raidDetailData.filter(x => x.parentid === raidId),
                                            obj => obj.difficulty,
                                        );

                                        return (
                                            <div key={raidIndex}>
                                                {openlevel <= characterLevel &&
                                                    characterLevel <= closelevel &&
                                                    raidName}
                                                {Object.keys(grouppedDetailData).map(
                                                    (difficultyName: string, difficultyIndex: number) => {
                                                        const startLevel =
                                                            grouppedDetailData[difficultyName][difficultyIndex]
                                                                .startlevel;
                                                        const endLevel =
                                                            grouppedDetailData[difficultyName][difficultyIndex]
                                                                .endlevel;

                                                        return (
                                                            <div key={difficultyIndex}>
                                                                {startLevel <= characterLevel &&
                                                                    characterLevel <= endLevel && (
                                                                        <div>
                                                                            {difficultyName}
                                                                            {grouppedDetailData[difficultyName].map(
                                                                                (
                                                                                    {
                                                                                        id,
                                                                                        gateway,
                                                                                        gold,
                                                                                        parentid,
                                                                                        difficulty,
                                                                                        startlevel,
                                                                                        endlevel,
                                                                                    }: IRaidGoldDetail,
                                                                                    raidDetailIndex: number,
                                                                                ) => {
                                                                                    const dupIndex =
                                                                                        raidDetailData.findIndex(
                                                                                            ({
                                                                                                parentid: oriParentId,
                                                                                                gateway: oriGateway,
                                                                                                difficulty: oriDiff,
                                                                                                id: oriId,
                                                                                            }) =>
                                                                                                oriParentId ==
                                                                                                    parentid &&
                                                                                                oriGateway == gateway &&
                                                                                                oriDiff != difficulty &&
                                                                                                oriId != id,
                                                                                        );

                                                                                    const storedRaidIdArr =
                                                                                        storedLedger.own[
                                                                                            charLedgerIndex
                                                                                        ].histories.raid.data.map(
                                                                                            x => x.id,
                                                                                        );

                                                                                    return (
                                                                                        <div key={raidDetailIndex}>
                                                                                            {startlevel <=
                                                                                                characterLevel &&
                                                                                                characterLevel <=
                                                                                                    endlevel && (
                                                                                                    <div>
                                                                                                        <BasicCheckbox
                                                                                                            value={id}
                                                                                                            onChange={e =>
                                                                                                                onChangeRaidCheckbox(
                                                                                                                    {
                                                                                                                        e: e,
                                                                                                                        gold: gold,
                                                                                                                        parentId:
                                                                                                                            parentid,
                                                                                                                        difficulty:
                                                                                                                            difficulty,
                                                                                                                        gateway:
                                                                                                                            gateway,
                                                                                                                    },
                                                                                                                )
                                                                                                            }
                                                                                                            checked={storedRaidIdArr.includes(
                                                                                                                String(
                                                                                                                    id,
                                                                                                                ),
                                                                                                            )}
                                                                                                            label={
                                                                                                                <>
                                                                                                                    {
                                                                                                                        gateway
                                                                                                                    }
                                                                                                                    (
                                                                                                                    <GoldIcon
                                                                                                                        type="basic"
                                                                                                                        width="14"
                                                                                                                        height="14"
                                                                                                                    />
                                                                                                                    {
                                                                                                                        gold
                                                                                                                    }
                                                                                                                    )
                                                                                                                </>
                                                                                                            }
                                                                                                            disabled={
                                                                                                                dupIndex >
                                                                                                                    -1 &&
                                                                                                                storedRaidIdArr.includes(
                                                                                                                    String(
                                                                                                                        raidDetailData[
                                                                                                                            dupIndex
                                                                                                                        ]
                                                                                                                            .id,
                                                                                                                    ),
                                                                                                                )
                                                                                                            }
                                                                                                        />
                                                                                                    </div>
                                                                                                )}
                                                                                        </div>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        );
                                    },
                                )}
                            </FlexDiv>
                        </InnerContent>
                    </>
                )}
            </article>
        </section>
    );
};

export default RaidGold;
