import React, { useContext, useState } from 'react';
import { DateTime } from 'luxon';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { initCommonHistory, initLedger } from '@hooks/useLocalStorage';
import { usePromiseEffect } from '@hooks/usePromiseEffect';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { SpinnerContext } from '@context/SpinnerContext';
import { ModalActionContext } from '@context/ModalContext';
import { IStatisticsPersonal } from '@components/Statistics/StatisticsType';
import CharacterGoldThisWeek from '@components/Statistics/Graph/CharacterGoldThisWeek';
import { ICommonHistory, ILedger, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { calcCommonIncomeGold, calcCommonSpendingGold, calcSum } from '@components/Ledger/common/functions';
import CharacterListItem from '@components/Ledger/characterGold/ListItem';
import CommonListItem from '@components/Ledger/commonGold/ListItem';
import SummaryHeader from '@components/Ledger/Summary/Header';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import EmojiTitle from '@components/Emoji/EmojiTitle';
import Block from '@components/Ledger/Summary/Block';
import Ranking from '@components/Statistics/Ranking';
import Nodata from '@components/article/Nodata';
import Button from '@components/Button/Button';
import { IRaidGold, IRaidGoldDetail } from '@common/types/response/ledger/raid';
import { IGoods, IGoodsImg } from '@common/types/response/ledger/goods';
import { ICharacter } from '@common/types/localStorage/Character';
import { ICommonGold } from '@common/types/response/ledger/common';
import { getCharacterInfoById, parseStorageItem } from '@common/utils';
import { getRaidDetail, getRaid } from '@apis/ledger/raid';
import { getGoods, getGoodsImg } from '@apis/ledger/goods';
import { getCommon } from '@apis/ledger/common';
import styled from '@emotion/styled';
import { InnerContents } from '@style/common/layout/table';
import { widthMedia } from '@style/device';

export interface ILedgerObjects {
    raid: IRaidGold[];
    raidDetail: IRaidGoldDetail[];
    common: ICommonGold[];
    goods: IGoods[];
    goodsImg: IGoodsImg[];
}

interface IPersonalGold {
    raid: number;
    goods: number;
    spending: number;
}

const Ledger = () => {
    const { setSpinnerVisible } = useContext(SpinnerContext);

    const { storedCharacter, storedLedger, storedCharacterOrd } = useContext(LocalStorageStateContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const { setModalProps } = useContext(ModalActionContext);

    const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(true);

    const [commonGoldThisWeek, setCommonGoldThisWeek] = useState<number>(0);
    const [raidGoldThisWeek, setRaidGoldThisWeek] = useState<number>(0);
    const [goodsGoldThisWeek, setGoodsGoldThisWeek] = useState<number>(0);

    const [personalGoldThisWeekArr, setPersonalGoldThisWeekArr] = useState<IStatisticsPersonal[]>([]);

    const { status, result: ledgerData } = usePromiseEffect(async (): Promise<ILedgerObjects> => {
        setSpinnerVisible(true);
        !localStorage.getItem('ledger') && ledgerInit();

        const raid = await getRaid();
        const raidDetail = await getRaidDetail();
        const common = await getCommon();
        const goods = await getGoods();
        const goodsImg = await getGoodsImg();

        localStorage.getItem('ledger') && calcWeekGold();
        localStorage.getItem('ledger') && calcStatistics();

        setSpinnerVisible(false);

        return { raid, raidDetail, common, goods, goodsImg };
    }, []);

    const ledgerInit = () => {
        if (
            !parseStorageItem(localStorage.getItem('character') as string) ||
            parseStorageItem(localStorage.getItem('character') as string).length < 1
        )
            return;

        const commonLedger = initLedger.common;

        const goodsLedger: ILedger['own'] = parseStorageItem(localStorage.getItem('character') as string).map(
            (character: ICharacter) => {
                const charactersLedger: ILedgerOwn = {
                    characterId: character.id,
                    prevWeekGold: [0, 0, 0, 0],
                    histories: {
                        raid: { fold: true, data: [] },
                        goods: { fold: true, data: [] },
                        spending: { fold: true, data: [] },
                    },
                };
                return charactersLedger;
            },
        );
        setStoredLedger(Object.assign({}, { common: commonLedger }, { own: goodsLedger }));
    };

    const openCharacterGoldGraph = ({ array }: { array: IStatisticsPersonal[] }) => {
        const characterGoldArr = array
            .map(({ name, raid, goods }) => {
                return { name: name, gold: raid + goods };
            })
            .sort(({ gold: beforGold }, { gold: afterGold }) => {
                return afterGold - beforGold;
            });

        setModalProps({
            isOpen: true,
            content: <CharacterGoldThisWeek array={characterGoldArr} />,
            options: { width: '410', height: '320', headerTitle: '캐릭터 별 골드 수입', isHeaderClose: true },
        });
    };

    const calcWeekGold = () => {
        const newLedger: ILedger = { ...parseStorageItem(localStorage.getItem('ledger') as string) },
            { own } = newLedger;

        if (own.length < 1) return;

        const now = DateTime.now();

        const lastVisitTimeStamp = localStorage.getItem('goldDatetime')
            ? localStorage.getItem('goldDatetime')
            : now.toFormat('X');
        const lastVisitDate = DateTime.fromISO(DateTime.fromSeconds(Number(lastVisitTimeStamp)).toISO());
        const lastVisitDateHour = lastVisitDate.toFormat('HH');

        const resetDateTime =
            Number(lastVisitDateHour) < 6
                ? DateTime.fromISO(lastVisitDate.toFormat('yyyy-LL-dd')).plus({
                      hours: 6,
                  })
                : DateTime.fromISO(lastVisitDate.toFormat('yyyy-LL-dd')).plus({
                      days: 1,
                      hours: 6,
                  });

        const { days: dayDiff } = now.diff(resetDateTime, 'days');

        const lastVisitStartOfWeek = lastVisitDate.startOf('week');
        const lastVisitWendsdaySixHour = lastVisitStartOfWeek.plus({ days: 2, hours: 6, minutes: 0 });
        const resetWeekDate =
            lastVisitWendsdaySixHour < lastVisitDate
                ? lastVisitWendsdaySixHour.plus({ days: 7 })
                : lastVisitWendsdaySixHour;

        const nowStartOfWeek = now.startOf('week');
        const nowWendsdaySixHour = nowStartOfWeek.plus({ days: 2, hours: 6, minutes: 0 });
        const resetWeekDateNow = nowWendsdaySixHour < now ? nowWendsdaySixHour.plus({ days: 7 }) : nowWendsdaySixHour;

        dayDiff && dayDiff > 0 && resetWeekDate < resetWeekDateNow && calcGold();
        localStorage.setItem('goldDatetime', DateTime.now().toFormat('X'));
    };

    const calcGold = () => {
        const newLedger: ILedger = { ...parseStorageItem(localStorage.getItem('ledger') as string) },
            { common, own } = newLedger;

        //지난주 계산
        //공통 골드
        const calcCommGold =
            calcSum(calcCommonIncomeGold({ history: newLedger.common.histories })) -
            calcSum(calcCommonSpendingGold({ history: newLedger.common.histories }));

        common.prevWeekGold.pop();
        common.prevWeekGold.unshift(calcCommGold);
        common.histories = initCommonHistory;

        //개인 골드
        own.forEach(({ characterId }: ILedgerOwn, index) => {
            const goodsIndex = newLedger.own.findIndex(
                ({ characterId: goodsCharId }: ILedgerOwn) => goodsCharId == characterId,
            );
            const goodsTotalGold = newLedger.own[goodsIndex]
                ? calcSum(newLedger.own[goodsIndex].histories.goods.data)
                : 0;
            const raidTotalGold = newLedger.own[goodsIndex]
                ? calcSum(newLedger.own[goodsIndex].histories.raid.data)
                : 0;
            const spendTotalGold = newLedger.own[goodsIndex]
                ? newLedger.own[goodsIndex].histories.spending
                    ? calcSum(newLedger.own[goodsIndex].histories.spending.data)
                    : 0
                : 0;
            newLedger.own[goodsIndex].prevWeekGold.pop();
            newLedger.own[goodsIndex].prevWeekGold.unshift(goodsTotalGold + raidTotalGold - spendTotalGold);

            own[goodsIndex].histories = {
                goods: { fold: true, data: [] },
                raid: { fold: true, data: [] },
                spending: { fold: true, data: [] },
            };
        });

        setStoredLedger(newLedger);
    };

    const calcPesonalGoldThisWeek = (own: ILedgerOwn[]) => {
        const sumArray: IPersonalGold[] = own.map(({ histories }) => {
            return {
                raid: calcSum(histories.raid.data),
                goods: calcSum(histories.goods.data),
                spending: calcSum(histories.spending ? histories.spending.data : []),
            };
        });

        const raidSum: number = sumArray
            .map(({ raid }) => {
                return raid;
            })
            .reduce((prev, next) => prev + next);

        setRaidGoldThisWeek(raidSum);

        const goodsSum: number = sumArray
            .map(({ goods }) => {
                return goods;
            })
            .reduce((prev, next) => prev + next);

        const spendingSum: number = sumArray
            .map(({ spending }) => {
                return spending;
            })
            .reduce((prev, next) => prev + next);

        setGoodsGoldThisWeek(goodsSum - spendingSum);
    };

    const calcPersonalGoldThisWeek = (own: ILedgerOwn[]) => {
        const result: IStatisticsPersonal[] = own.map(({ characterId, histories }) => {
            return {
                name: getCharacterInfoById({
                    dataArray: parseStorageItem(localStorage.getItem('character') as string),
                    id: characterId,
                }).name,
                raid: calcSum(histories.raid.data),
                goods: calcSum(histories.goods.data),
            };
        });

        setPersonalGoldThisWeekArr(result);
    };

    const calcStatistics = () => {
        if (parseStorageItem(localStorage.getItem('ledger') as string).length < 1) return;
        const { common, own }: ILedger = {
            ...parseStorageItem(localStorage.getItem('ledger') as string),
        };
        if (own.length < 1) return;

        calcCommonGoldThisWeek({ historyData: common.histories });
        calcPesonalGoldThisWeek(own);
        calcPersonalGoldThisWeek(own);
    };

    const calcCommonGoldThisWeek = ({ historyData }: { historyData: ICommonHistory[] }) => {
        const incomeArr = historyData.filter(({ type }) => {
            return type != 'spending';
        });

        const spendingArr = historyData.filter(({ type }) => {
            return type == 'spending';
        });

        const calcCommGold = calcSum(incomeArr) - calcSum(spendingArr);

        setCommonGoldThisWeek(calcCommGold);
    };

    return (
        <>
            <Head>
                <title>로요일좋아 - 골드 가계부</title>
                <meta name="description" content="로스트아크의 내 캐릭터 골드 가계부를 작성해 보세요!" />
            </Head>
            {status === 'fulfilled' && ledgerData && (
                <Container>
                    <SummaryHeader
                        title="이번 주 요약"
                        rightButton={
                            <Button onClick={() => setIsSummaryVisible(!isSummaryVisible)}>
                                {isSummaryVisible ? (
                                    <EmojiTitle label={<span>접기</span>} symbol={'📘'} />
                                ) : (
                                    <EmojiTitle label={<span>펼치기</span>} symbol={'📖'} />
                                )}
                            </Button>
                        }
                        rightDynamic={{
                            button: <Button>새로고침</Button>,
                            visible: isSummaryVisible,
                            onclick: () => calcStatistics(),
                        }}
                    />
                    <SummaryContainer visible={isSummaryVisible}>
                        <SummaryInner>
                            <Block
                                title="수입"
                                iconUrl="/static/img/icon/mococo/shake_rabbit.gif"
                                body={
                                    <GoldList>
                                        <TitleAndGold
                                            iconUrl="/static/img/lostark/contents/jwel.png"
                                            title="공통"
                                            gold={commonGoldThisWeek}
                                            goldTextColor={true}
                                        />
                                        <TitleAndGold
                                            iconUrl="/static/img/lostark/material/weapon_crystal.png"
                                            title="재화"
                                            gold={goodsGoldThisWeek}
                                            goldTextColor={true}
                                        />
                                        <TitleAndGold
                                            iconUrl="/static/img/lostark/contents/corpsDungeon.png"
                                            title="레이드"
                                            gold={raidGoldThisWeek}
                                            goldTextColor={true}
                                        />
                                        <TitleAndGold
                                            title="총 계"
                                            underline={false}
                                            gold={commonGoldThisWeek + goodsGoldThisWeek + raidGoldThisWeek}
                                            goldTextColor={true}
                                        />
                                    </GoldList>
                                }
                            />
                        </SummaryInner>
                        <SummaryInner>
                            <Block
                                title="수입 순위"
                                iconUrl="/static/img/icon/mococo/bling_rabbit.gif"
                                rightButton={
                                    <ShowGraphButton
                                        onClick={() =>
                                            openCharacterGoldGraph({
                                                array: personalGoldThisWeekArr,
                                            })
                                        }
                                    >
                                        🔍그래프로 보기
                                    </ShowGraphButton>
                                }
                                body={
                                    <RankContainer>
                                        <Ranking
                                            title=""
                                            array={personalGoldThisWeekArr.map(({ name, raid, goods }) => {
                                                return { name: name, gold: raid + goods };
                                            })}
                                        />
                                    </RankContainer>
                                }
                                comment="* 골드 수입만 계산 된 값 입니다."
                            />
                        </SummaryInner>
                    </SummaryContainer>
                    {storedLedger.own.length > 0 ? (
                        <GoldContainer>
                            <SummaryHeader title="골드 수입 · 지출 내역" />
                            <Table>
                                <TableHeader>
                                    <InnerContents isName={true}>닉네임(레벨)</InnerContents>
                                    <InnerContents>수입</InnerContents>
                                    <InnerContents>지출</InnerContents>
                                    <InnerContents>합계</InnerContents>
                                    <InnerContents>저번 주</InnerContents>
                                </TableHeader>
                                <TableBody>
                                    <CommonListItem
                                        commonData={ledgerData.common}
                                        incomeGold={calcSum(
                                            calcCommonIncomeGold({ history: storedLedger.common.histories }),
                                        )}
                                        spendingGold={calcSum(
                                            calcCommonSpendingGold({ history: storedLedger.common.histories }),
                                        )}
                                        prevGold={storedLedger.common.prevWeekGold[0]}
                                    />
                                    {storedLedger.own
                                        .sort((a, b) => {
                                            return (
                                                (storedCharacterOrd as number[]).indexOf(Number(a.characterId)) -
                                                (storedCharacterOrd as number[]).indexOf(Number(b.characterId))
                                            );
                                        })
                                        .map(({ characterId, prevWeekGold }: ILedgerOwn, ledgerIndex: number) => {
                                            const goodsIndex = storedLedger.own.findIndex(
                                                ({ characterId: goodsCharId }: ILedgerOwn) =>
                                                    goodsCharId === characterId,
                                            );

                                            const goodsTotalGold = calcSum(
                                                storedLedger.own[goodsIndex].histories.goods.data,
                                            );

                                            const raidTotalGold = calcSum(
                                                storedLedger.own[goodsIndex].histories.raid.data,
                                            );

                                            const spendingGold = storedLedger.own[goodsIndex].histories.spending
                                                ? calcSum(storedLedger.own[goodsIndex].histories.spending.data)
                                                : 0;

                                            return (
                                                <CharacterListItem
                                                    key={ledgerIndex}
                                                    characterId={characterId}
                                                    goodsTotalGold={goodsTotalGold}
                                                    raidTotalGold={raidTotalGold}
                                                    ledgerData={ledgerData}
                                                    spendingGold={spendingGold}
                                                    prevWeekGold={prevWeekGold[0]}
                                                />
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </GoldContainer>
                    ) : (
                        <Nodata
                            text={
                                <>
                                    <Image src="/static/img/icon/mococo/tear.png" width="100" height="100" />
                                    <br />
                                    <strong>
                                        캐릭터 정보가 없네요. <br />
                                        <Link href="/todo">숙제 페이지</Link>에서 캐릭터를 등록하면 골드 수입을 작성하실
                                        수 있습니다.
                                    </strong>
                                </>
                            }
                        />
                    )}
                </Container>
            )}
        </>
    );
};

const Container = styled.section`
    display: flex;
    flex-wrap: wrap;
    width: 55%;
    margin-top: 3em;
    box-sizing: border-box;
    justify-content: center;

    ${widthMedia.desktop} {
        width: 70%;
    }

    ${widthMedia.smallDesktop} {
        width: 80%;
    }

    ${widthMedia.phone} {
        width: 90%;
    }

    margin-bottom: 3em;
`;

const SummaryContainer = styled.div<{ visible: boolean }>`
    display: ${props => (props.visible ? `flex` : `none`)};
    width: 100%;
    flex-flow: wrap;

    ${widthMedia.tablet} {
        flex-direction: column;
        flex-flow: column;
    }
`;

const SummaryInner = styled.div`
    display: flex;
    width: 100%;
    flex-basis: 50%;
    flex-direction: column;

    ${widthMedia.desktop} {
        flex-basis: 50%;
    }
`;

const GoldList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 80%;
`;

const GoldContainer = styled.article`
    display: flex;
    width: 100%;
    height: 100%;
    flex-flow: wrap;
    justify-content: space-between;
    margin-top: 4em;
`;

const RankContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;

    ${widthMedia.desktop} {
        align-self: center;
        padding: 1em;
        width: 100%;
    }

    ${widthMedia.tablet} {
        align-self: center;
        padding: 1em;
        width: 80%;
    }

    ${widthMedia.phone} {
        width: 100%;
        padding: 0;
    }
`;

const Table = styled.div`
    width: 100%;
    overflow-x: auto;
`;

const TableHeader = styled.div`
    display: flex;
    border-top: 1px solid;
    border-bottom: 1px solid;
    padding-top: 0.6em;
    padding-bottom: 0.6em;
    width: 100%;
    font-weight: 600;

    ${widthMedia.phone} {
        width: 600px;
    }
`;

const TableBody = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    ${widthMedia.phone} {
        width: 600px;
    }
    overflow-x: auto;
`;

const ShowGraphButton = styled.span`
    cursor: pointer;
`;

export default Ledger;
