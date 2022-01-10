import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ILedger, ILedgerHistoryRaid, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { calcSum } from '@components/Ledger/common/functions';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import { IRaidGold, IRaidGoldDetail } from '@common/types/response/ledger/raid';
import { getCharacterInfoById, groupBy } from '@common/utils';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
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
    const theme = useTheme();
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
        more,
    }: {
        e: React.ChangeEvent<HTMLInputElement>;
        gold: number;
        parentId: string;
        difficulty: string;
        gateway: string;
        more: number;
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
                  more: more,
              })
            : controlUncheckAction({
                  raidId: raidId,
                  gateway: gateway,
                  parentId: parentId,
                  difficulty: difficulty,
                  more: more,
              });
    };

    const controlCheckAction = ({
        raidId,
        gold,
        parentId,
        difficulty,
        more,
    }: {
        raidId: string;
        gold: number;
        parentId: string;
        difficulty: string;
        more: number;
    }) => {
        const newLedger: ILedger = { ...storedLedger };

        const ownLedger = newLedger.own[charLedgerIndex];

        const {
            histories: {
                raid: { fold: ownFold, data: ownData },
            },
        } = ownLedger;

        const storedRaidIdArr = ownData.map(history => history.id);

        const otherDiffGateway = raidDetailData
            .filter(({ parentid, difficulty: pDifficulty }) => parentid === parentId && pDifficulty !== difficulty)
            .map(({ id }) => String(id));

        const otherDiffCheckedId = storedRaidIdArr.filter((id: string) => otherDiffGateway.includes(id));

        const exceptGateway = raidDetailData
            .filter(({ id }) => otherDiffCheckedId.includes(String(id)))
            .map(({ gateway }) => gateway);

        const prevRaid = raidDetailData.filter(
            ({ id: pId, parentid, difficulty: pDifficulty, gateway: pGateway }) =>
                parentid === parentId &&
                pDifficulty === difficulty &&
                pId < raidId &&
                !exceptGateway.includes(pGateway),
        );

        const prevRaidHistory = prevRaid.map(({ id, gold }): ILedgerHistoryRaid => {
            return { id: String(id), gold: gold, datetime: DateTime.now().toFormat('X') };
        });

        const history: ILedgerHistoryRaid = {
            id: raidId,
            gold: gold - more,
            datetime: DateTime.now().toFormat('X'),
        };

        const resultHistory = [...prevRaidHistory, history];

        const removeDupResult = resultHistory.filter(({ id }) => !storedRaidIdArr.includes(id));

        const raidIndex = newLedger.own[charLedgerIndex].histories.raid.data.findIndex(({ id }) => id == raidId);

        if (raidIndex < 0) {
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
        } else {
            newLedger.own[charLedgerIndex].histories.raid.data[raidIndex] = {
                ...newLedger.own[charLedgerIndex].histories.raid.data[raidIndex],
                gold: gold - more,
                more: true,
            };
        }

        setStoredLedger(newLedger);
    };

    const controlUncheckAction = ({
        raidId,
        gateway,
        parentId,
        difficulty,
        more,
    }: {
        raidId: string;
        gateway: string;
        parentId: string;
        difficulty: string;
        more: number;
    }) => {
        const newLedger: ILedger = { ...storedLedger };

        const ownLedger = newLedger.own[charLedgerIndex];

        const {
            histories: {
                raid: { fold: ownFold, data: ownData },
            },
        } = ownLedger;

        const nextRaid = raidDetailData.filter(
            ({ id: pId, parentid, difficulty: pDifficulty }) =>
                parentid === parentId && pDifficulty === difficulty && pId > raidId,
        );

        const otherDifficultyArr = raidDetailData.filter(
            ({ parentid, difficulty: pDifficulty, gateway: pGateway }) =>
                parentid === parentId && pGateway === gateway && pDifficulty !== difficulty,
        );

        const nextRaidIdArr = nextRaid.map(({ id }) => String(id));

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

        if (more > 0) {
            const raidIndex = newLedger.own[charLedgerIndex].histories.raid.data.findIndex(({ id }) => id == raidId);

            const currentRaidSum = calcSum(
                storedLedger.own[charLedgerIndex].histories.raid.data.filter(({ id: findId }) => findId == raidId),
            );

            newLedger.own[charLedgerIndex].histories.raid.data[raidIndex] = {
                ...newLedger.own[charLedgerIndex].histories.raid.data[raidIndex],
                gold: currentRaidSum + more,
                more: false,
            };
        } else {
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
        }
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
                                                <h3>{raidName}</h3>
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

                                                        const raidIdArr = raidDetailData
                                                            .filter(
                                                                ({ parentid, difficulty }) =>
                                                                    parentid ==
                                                                        grouppedDetailData[difficultyName][index]
                                                                            .parentid && difficulty == difficultyName,
                                                            )
                                                            .map(({ id }) => String(id));

                                                        const raidSum = calcSum(
                                                            storedLedger.own[
                                                                charLedgerIndex
                                                            ].histories.raid.data.filter(({ id }) => {
                                                                return raidIdArr.includes(id);
                                                            }),
                                                        );

                                                        return (
                                                            startLevel <= characterLevel &&
                                                            characterLevel < endLevel && (
                                                                <ContentsContainer key={difficultyIndex}>
                                                                    <ContentsTitle>
                                                                        <h5>{difficultyName} </h5>
                                                                        <h4>합계 : {raidSum.toLocaleString()}</h4>
                                                                    </ContentsTitle>
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
                                                                                more,
                                                                            }: IRaidGoldDetail,
                                                                            raidDetailIndex: number,
                                                                        ) => {
                                                                            const dupIndex = raidDetailData.findIndex(
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

                                                                            const storedRaidIdArr = storedLedger.own[
                                                                                charLedgerIndex
                                                                            ].histories.raid.data.map(x => x.id);

                                                                            const raidIndex = storedLedger.own[
                                                                                charLedgerIndex
                                                                            ].histories.raid.data.findIndex(
                                                                                ({ id: findId }) => findId == id,
                                                                            );

                                                                            const isMore =
                                                                                raidIndex >= 0
                                                                                    ? storedLedger.own[charLedgerIndex]
                                                                                          .histories.raid.data[
                                                                                          raidIndex
                                                                                      ].more
                                                                                    : false;

                                                                            return (
                                                                                <RaidGoldBody key={raidDetailIndex}>
                                                                                    {startlevel <= characterLevel &&
                                                                                        characterLevel < endlevel && (
                                                                                            <RaidGoldContainer
                                                                                                ord={raidDetailIndex}
                                                                                            >
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
                                                                                                                more: 0,
                                                                                                            },
                                                                                                        )
                                                                                                    }
                                                                                                    checked={storedRaidIdArr.includes(
                                                                                                        String(id),
                                                                                                    )}
                                                                                                    label={
                                                                                                        <GateWayAndGold>
                                                                                                            <RaidGoldTitle>
                                                                                                                {
                                                                                                                    gateway
                                                                                                                }
                                                                                                            </RaidGoldTitle>
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
                                                                                                                goldTextColorStr={
                                                                                                                    theme
                                                                                                                        .ledger
                                                                                                                        .income
                                                                                                                }
                                                                                                            />
                                                                                                        </GateWayAndGold>
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
                                                                                                {more && (
                                                                                                    <BasicCheckbox
                                                                                                        checked={
                                                                                                            isMore ||
                                                                                                            false
                                                                                                        }
                                                                                                        value={id}
                                                                                                        disabled={
                                                                                                            !storedRaidIdArr.includes(
                                                                                                                String(
                                                                                                                    id,
                                                                                                                ),
                                                                                                            ) ||
                                                                                                            (dupIndex >
                                                                                                                -1 &&
                                                                                                                storedRaidIdArr.includes(
                                                                                                                    String(
                                                                                                                        raidDetailData[
                                                                                                                            dupIndex
                                                                                                                        ]
                                                                                                                            .id,
                                                                                                                    ),
                                                                                                                ))
                                                                                                        }
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
                                                                                                                    more: more,
                                                                                                                },
                                                                                                            )
                                                                                                        }
                                                                                                        label={
                                                                                                            <GateWayAndGold>
                                                                                                                <RaidGoldTitle>
                                                                                                                    더보기
                                                                                                                </RaidGoldTitle>
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
                                                                                                                        more
                                                                                                                    }
                                                                                                                    negative={
                                                                                                                        true
                                                                                                                    }
                                                                                                                    goldTextColorStr={
                                                                                                                        theme
                                                                                                                            .ledger
                                                                                                                            .spending
                                                                                                                    }
                                                                                                                />
                                                                                                            </GateWayAndGold>
                                                                                                        }
                                                                                                    />
                                                                                                )}
                                                                                            </RaidGoldContainer>
                                                                                        )}
                                                                                </RaidGoldBody>
                                                                            );
                                                                        },
                                                                    )}
                                                                </ContentsContainer>
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
    width: ${props => (props.isShow ? `100%` : `100%`)};

    ${widthMedia.smallDesktop} {
        flex-basis: 100%;
    }
`;

const Article = styled.article`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    border: 1px dashed ${props => props.theme.colors.gray};
    box-sizing: border-box;
    padding: 2.5em;
    width: 100%;
`;

const Title = styled.div`
    display: flex;
    h3 {
        margin-left: 0.5em;
    }

    margin-bottom: 1.5em;
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

const ContentsContainer = styled.div`
    width: 45%;
    justify-content: center;
    h5 {
        margin-bottom: 0.5em;
    }
`;

const RaidGoldTitle = styled.div`
    display: flex;
    align-items: center;
    word-break: keep-all;
`;

const RaidGoldContainer = styled.div<{ ord: number }>`
    display: flex;
    ${props => props.ord === 0 && `border-top: 1px solid ${props.theme.colors.gray}`};
    border-bottom: 1px dashed ${props => props.theme.colors.gray};
    box-sizing: border-box;
    width: 100%;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 1em;
`;

const GateWayAndGold = styled.div`
    display: flex;
    justify-content: center;
`;

const ContentsTitle = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 0.6em;
    padding-right: 0.6em;
    padding-bottom: 0.3em;
`;

const RaidGoldBody = styled.div`
    display: flex;
    justify-content: center;
`;

export default RaidGold;
