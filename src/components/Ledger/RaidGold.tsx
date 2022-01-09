import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ILedger, ILedgerHistoryRaid, ILedgerOwn } from '@common/types/localStorage/Ledger';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import { IRaidGold, IRaidGoldDetail } from '@common/types/response/ledger/raid';
import { getCharacterInfoById, groupBy } from '@common/utils';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common/layout/common';
import { widthMedia } from '@style/device';
import { TopInfo, TopInfoTitle } from '@style/common/modal';

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
    const { storedCharacter, storedLedger } = useContext(LocalStorageStateContext);
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
        <>
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
                    (Lv.
                    {
                        getCharacterInfoById({
                            dataArray: storedCharacter,
                            id: characterId,
                        }).level
                    }
                    )
                </div>
            </TopInfo>
            <Container>
                {raidDetailData &&
                    raidCategory.map(
                        (
                            { id: raidId, name: raidName, openlevel, closelevel, imgurl }: IRaidGold,
                            raidIndex: number,
                        ) => {
                            const grouppedDetailData = groupBy(
                                raidDetailData.filter(x => x.parentid === raidId),
                                obj => obj.difficulty,
                            );

                            return (
                                <RaidDiv
                                    isShow={openlevel <= characterLevel && characterLevel < closelevel}
                                    key={raidIndex}
                                >
                                    {openlevel <= characterLevel && characterLevel < closelevel && (
                                        <Article>
                                            <Title>
                                                <Image alt="레이드 아이콘" src={imgurl} width="16" height="16" />
                                                <h4>{raidName}</h4>
                                            </Title>
                                            <Content>
                                                {Object.keys(grouppedDetailData).map(
                                                    (difficultyName: string, difficultyIndex: number) => {
                                                        const index =
                                                            difficultyName == '[하드]'
                                                                ? difficultyIndex - 1
                                                                : difficultyIndex;
                                                        const startLevel =
                                                            grouppedDetailData[difficultyName][index].startlevel;
                                                        const endLevel =
                                                            grouppedDetailData[difficultyName][index].endlevel;

                                                        return (
                                                            startLevel <= characterLevel &&
                                                            characterLevel < endLevel && (
                                                                <div key={difficultyIndex}>
                                                                    <Contents>
                                                                        <h5>{difficultyName}</h5>
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
                                                                                            oriParentId == parentid &&
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
                                                                                        {startlevel <= characterLevel &&
                                                                                            characterLevel <
                                                                                                endlevel && (
                                                                                                <BasicCheckbox
                                                                                                    className="raidgold"
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
                                                                                                        String(id),
                                                                                                    )}
                                                                                                    label={
                                                                                                        <FlexDiv>
                                                                                                            <RaidGolds>
                                                                                                                {
                                                                                                                    gateway
                                                                                                                }
                                                                                                            </RaidGolds>
                                                                                                            <RaidGoldGold>
                                                                                                                <TitleAndGold
                                                                                                                    isPadding={
                                                                                                                        false
                                                                                                                    }
                                                                                                                    bracket={
                                                                                                                        true
                                                                                                                    }
                                                                                                                    underline={
                                                                                                                        false
                                                                                                                    }
                                                                                                                    gold={
                                                                                                                        gold
                                                                                                                    }
                                                                                                                />
                                                                                                            </RaidGoldGold>
                                                                                                        </FlexDiv>
                                                                                                    }
                                                                                                    disabled={
                                                                                                        dupIndex > -1 &&
                                                                                                        storedRaidIdArr.includes(
                                                                                                            String(
                                                                                                                raidDetailData[
                                                                                                                    dupIndex
                                                                                                                ].id,
                                                                                                            ),
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            )}
                                                                                    </div>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </Contents>
                                                                </div>
                                                            )
                                                        );
                                                    },
                                                )}
                                            </Content>
                                        </Article>
                                    )}
                                </RaidDiv>
                            );
                        },
                    )}
            </Container>
        </>
    );
};

const Container = styled.section`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 2em;
    box-sizing: border-box;
`;

const RaidDiv = styled.div<{ isShow: boolean }>`
    display: ${props => (props.isShow ? `flex` : `none`)};
    width: ${props => (props.isShow ? `49%` : `0%`)};

    ${widthMedia.smallDesktop} {
        flex-basis: 100%;
    }
`;

const Article = styled.article`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    border: 1px solid;
    box-sizing: border-box;
    padding: 2em;
    width: 100%;
`;

const Title = styled.div`
    display: flex;
    h4 {
        margin-left: 0.5em;
    }

    margin-bottom: 0.8em;
    width: 100%;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-around;
    margin-left: 0;
    width: 100%;
    box-sizing: border-box;

    ${widthMedia.tablet} {
        flex-direction: column;
        flex-direction: row;
        align-items: center;
        margin-left: 0;
    }

    ${widthMedia.smallPhone} {
        flex-direction: column;
        border-bottom: none;
        margin-left: 1.5em;
    }
`;

const Contents = styled.div`
    display: flex;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    flex-direction: column;
    width: 100%;

    h5 {
        margin-bottom: 0.5em;
    }
`;

const RaidGolds = styled.div`
    display: flex;
    flex-basis: 60%;
    align-items: center;
    word-break: keep-all;
`;

const RaidGoldGold = styled.div`
    display: flex;
    flex-basis: 40%;
    align-items: center;
`;

export default RaidGold;
