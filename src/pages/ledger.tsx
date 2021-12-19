import React, { useContext, useState } from 'react';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { initCommonHistory, initLedger } from '@hooks/useLocalStorage';
import { usePromiseEffect } from '@hooks/usePromiseEffect';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { SpinnerContext } from '@context/SpinnerContext';
import { ModalActionContext } from '@context/ModalContext';
import { IStatisticsPersonal, IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import CharacterGoldThisWeek from '@components/Statistics/Graph/CharacterGoldThisWeek';
import { ILedger, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { calcSum } from '@components/Ledger/common/functions';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import CommonGold from '@components/Ledger/CommonGold';
import EmojiTitle from '@components/Emoji/EmojiTitle';
import GoodsGold from '@components/Ledger/GoodsGold';
import Ranking from '@components/Statistics/Ranking';
import DownArrow from '@components/Image/DownArrow';
import RaidGold from '@components/Ledger/RaidGold';
import UpArrow from '@components/Image/UpArrow';
import Nodata from '@components/article/Nodata';
import Button from '@components/Button/Button';
import { getCharacterInfoById, parseStorageItem } from '@common/utils';
import { IRaidGold, IRaidGoldDetail } from '@common/types/response/ledger/raid';
import { IGoods, IGoodsImg } from '@common/types/response/ledger/goods';
import { ICommonGold } from '@common/types/response/ledger/common';
import { ICharacter } from '@common/types/localStorage/Character';
import { getRaidDetail, getRaid } from '@apis/ledger/raid';
import { getGoods, getGoodsImg } from '@apis/ledger/goods';
import { getCommon } from '@apis/ledger/common';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import Head from 'next/head';

interface ILedgerObjects {
    raid: IRaidGold[];
    raidDetail: IRaidGoldDetail[];
    common: ICommonGold[];
    goods: IGoods[];
    goodsImg: IGoodsImg[];
}

interface IPersonalGold {
    raid: number;
    goods: number;
}

interface IFold {
    fold: boolean;
}

const Ledger = () => {
    const theme = useTheme();

    const { setSpinnerVisible } = useContext(SpinnerContext);

    const { storedCharacter, storedLedger, storedCharacterOrd } = useContext(LocalStorageStateContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const { setModalProps } = useContext(ModalActionContext);

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
                    histories: { raid: { fold: true, data: [] }, goods: { fold: true, data: [] } },
                };
                return charactersLedger;
            },
        );
        setStoredLedger(Object.assign({}, { common: commonLedger }, { own: goodsLedger }));
    };

    const foldCommonDiv = ({ e, foldState }: { e: React.MouseEvent<HTMLElement, MouseEvent>; foldState: boolean }) => {
        const ledgerArr: ILedger = Object.assign({}, storedLedger);

        ledgerArr.common.fold = !foldState;
        setStoredLedger(ledgerArr);
    };

    const foldGoodsDiv = ({ characterIndex, foldState }: { characterIndex: number; foldState: boolean }) => {
        const ledgerArr: ILedger = Object.assign({}, storedLedger);

        ledgerArr.own[characterIndex].histories.goods.fold = !foldState;
        setStoredLedger(ledgerArr);
    };

    const foldRaidDiv = ({ characterIndex, foldState }: { characterIndex: number; foldState: boolean }) => {
        const ledgerArr: ILedger = Object.assign({}, storedLedger);

        ledgerArr.own[characterIndex].histories.raid.fold = !foldState;
        setStoredLedger(ledgerArr);
    };

    const openCharacterGoldGraph = (array: IStatisticsPersonalPrev[]) => {
        setModalProps({
            isOpen: true,
            content: <CharacterGoldThisWeek array={array} />,
            options: { width: '400', height: '300', headerTitle: '캐릭터 별 골드 수입', isHeaderClose: true },
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
        common.prevWeekGold.pop();
        common.prevWeekGold.unshift(calcSum(newLedger.common.histories));
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
            newLedger.own[goodsIndex].prevWeekGold.pop();
            newLedger.own[goodsIndex].prevWeekGold.unshift(goodsTotalGold + raidTotalGold);

            own[goodsIndex].histories = { goods: { fold: true, data: [] }, raid: { fold: true, data: [] } };
        });

        setStoredLedger(newLedger);
    };

    const calcPesonalGoldThisWeek = (own: ILedgerOwn[]) => {
        const sumArray: IPersonalGold[] = own.map(({ histories }) => {
            return {
                raid: calcSum(histories.raid.data),
                goods: calcSum(histories.goods.data),
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

        setGoodsGoldThisWeek(goodsSum);
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
        const { common: storageCommon, own }: ILedger = {
            ...parseStorageItem(localStorage.getItem('ledger') as string),
        };
        if (own.length < 1) return;

        setCommonGoldThisWeek(calcSum(storageCommon.histories));
        calcPesonalGoldThisWeek(own);
        calcPersonalGoldThisWeek(own);
    };

    return (
        <>
            <Head>
                <title>로요일좋아 - 골드 수입</title>
            </Head>
            {status === 'fulfilled' && ledgerData && (
                <Container>
                    <Summary>
                        <SummaryHeader>
                            <SummaryHeaderTitle>
                                <h1>이번 주 요약</h1>
                                <Button onClick={calcStatistics}>
                                    <EmojiTitle label={<span>새로고침</span>} symbol={'🔃'} />
                                </Button>
                            </SummaryHeaderTitle>
                            <h6>이 영역에 저번 주 데이터가 나온다면 새로고침을 눌러주세요!</h6>
                        </SummaryHeader>
                        <SummaryDiv>
                            <SummaryLeft>
                                <DashDiv>
                                    <SummaryHeader>
                                        <EmojiTitle label={<h2>수입</h2>} symbol={'💰'} />
                                    </SummaryHeader>
                                    <GoldList>
                                        <TitleAndGold
                                            iconUrl="/static/img/lostark/contents/jwel.png"
                                            title="공통"
                                            gold={commonGoldThisWeek}
                                        />
                                        <TitleAndGold
                                            iconUrl="/static/img/lostark/material/weapon_crystal.png"
                                            title="재화"
                                            gold={goodsGoldThisWeek}
                                        />
                                        <TitleAndGold
                                            iconUrl="/static/img/lostark/contents/corpsDungeon.png"
                                            title="레이드"
                                            gold={raidGoldThisWeek}
                                        />
                                        <TitleAndGold
                                            css={css`
                                                strong {
                                                    color: #e6674b;
                                                }
                                            `}
                                            title="총 계"
                                            underline={false}
                                            gold={commonGoldThisWeek + goodsGoldThisWeek + raidGoldThisWeek}
                                        />
                                    </GoldList>
                                </DashDiv>
                            </SummaryLeft>
                            <SummaryRight>
                                <DashDiv>
                                    <SummaryHeader>
                                        <EmojiTitle label={<h2>순위</h2>} symbol={'👑'} />
                                        <DetailSta>
                                            <Link href="/statistics">통계 메뉴에서 더 자세히 보기 (클릭!😗)</Link>
                                        </DetailSta>
                                        <span
                                            onClick={() =>
                                                openCharacterGoldGraph(
                                                    personalGoldThisWeekArr
                                                        .map(({ name, raid, goods }) => {
                                                            return { name: name, gold: raid + goods };
                                                        })
                                                        .sort(({ gold: beforGold }, { gold: afterGold }) => {
                                                            return afterGold - beforGold;
                                                        }),
                                                )
                                            }
                                        >
                                            🔍그래프로 보기
                                        </span>
                                    </SummaryHeader>
                                    <RankContent>
                                        <RankInner>
                                            <RankContainer>
                                                <Ranking
                                                    title=""
                                                    array={personalGoldThisWeekArr.map(({ name, raid, goods }) => {
                                                        return { name: name, gold: raid + goods };
                                                    })}
                                                />
                                            </RankContainer>
                                        </RankInner>
                                        <ChartInner>
                                            <CharacterGoldThisWeek
                                                array={personalGoldThisWeekArr
                                                    .map(({ name, raid, goods }) => {
                                                        return { name: name, gold: raid + goods };
                                                    })
                                                    .sort(({ gold: beforGold }, { gold: afterGold }) => {
                                                        return afterGold - beforGold;
                                                    })}
                                            />
                                        </ChartInner>
                                    </RankContent>
                                </DashDiv>
                            </SummaryRight>
                        </SummaryDiv>
                    </Summary>
                    {storedLedger.own.length > 0 ? (
                        <GoldContents>
                            <Article>
                                <Header onClick={e => foldCommonDiv({ e: e, foldState: storedLedger.common.fold })}>
                                    <h2
                                        css={css`
                                            display: flex;
                                            align-items: center;
                                        `}
                                    >
                                        공통
                                        {storedLedger.common.fold ? (
                                            <UpArrow fill={theme.colors.text} width="25" height="25" />
                                        ) : (
                                            <DownArrow fill={theme.colors.text} width="25" height="25" />
                                        )}
                                    </h2>
                                    <GoldSum>
                                        <TitleAndGold title="저번 주" gold={storedLedger.common.prevWeekGold[0]} />
                                        <TitleAndGold title="이번 주" gold={calcSum(storedLedger.common.histories)} />
                                    </GoldSum>
                                </Header>
                                <Contents fold={storedLedger.common.fold}>
                                    <CommonGold commonData={ledgerData.common} />
                                </Contents>
                            </Article>
                            {storedLedger.own
                                .sort((a, b) => {
                                    return (
                                        (storedCharacterOrd as number[]).indexOf(Number(a.characterId)) -
                                        (storedCharacterOrd as number[]).indexOf(Number(b.characterId))
                                    );
                                })
                                .map(
                                    (
                                        {
                                            characterId,
                                            prevWeekGold,
                                            histories: {
                                                goods: { fold: goodsFold },
                                                raid: { fold: raidFold },
                                            },
                                        }: ILedgerOwn,
                                        ledgerIndex: number,
                                    ) => {
                                        const level = getCharacterInfoById({
                                            dataArray: storedCharacter,
                                            id: characterId,
                                        }).level;
                                        const goodsIndex = storedLedger.own.findIndex(
                                            ({ characterId: goodsCharId }: ILedgerOwn) => goodsCharId === characterId,
                                        );

                                        const goodsTotalGold = calcSum(
                                            storedLedger.own[goodsIndex].histories.goods.data,
                                        );
                                        const raidTotalGold = calcSum(storedLedger.own[goodsIndex].histories.raid.data);

                                        return (
                                            <Article key={ledgerIndex}>
                                                <Header>
                                                    <Info>
                                                        <h2>
                                                            {
                                                                getCharacterInfoById({
                                                                    dataArray: storedCharacter,
                                                                    id: characterId,
                                                                }).name
                                                            }
                                                        </h2>
                                                        <h4>
                                                            {
                                                                getCharacterInfoById({
                                                                    dataArray: storedCharacter,
                                                                    id: characterId,
                                                                }).level
                                                            }
                                                        </h4>
                                                    </Info>
                                                    <GoldSum>
                                                        <TitleAndGold
                                                            opacity={0.8}
                                                            title="저번 주"
                                                            gold={prevWeekGold[0]}
                                                        />
                                                        <TitleAndGold
                                                            title="이번 주"
                                                            gold={goodsTotalGold + raidTotalGold}
                                                        />
                                                    </GoldSum>
                                                </Header>
                                                <PersonalHeader
                                                    onClick={() =>
                                                        foldGoodsDiv({
                                                            characterIndex: goodsIndex,
                                                            foldState: goodsFold,
                                                        })
                                                    }
                                                >
                                                    <PersonalInner>
                                                        <h4>재화</h4>
                                                        {goodsFold ? (
                                                            <UpArrow fill={theme.colors.text} width="25" height="25" />
                                                        ) : (
                                                            <DownArrow
                                                                fill={theme.colors.text}
                                                                width="25"
                                                                height="25"
                                                            />
                                                        )}
                                                    </PersonalInner>
                                                    <PersonalInner>
                                                        <TitleAndGold underline={false} gold={goodsTotalGold} />
                                                    </PersonalInner>
                                                </PersonalHeader>
                                                <Contents fold={goodsFold}>
                                                    <GoodsGold
                                                        characterId={characterId}
                                                        goods={ledgerData.goods}
                                                        imgPaletteArr={ledgerData.goodsImg}
                                                    />
                                                </Contents>
                                                <PersonalHeader
                                                    onClick={() =>
                                                        foldRaidDiv({ characterIndex: goodsIndex, foldState: raidFold })
                                                    }
                                                >
                                                    <PersonalInner>
                                                        <h4>레이드</h4>
                                                        {raidFold ? (
                                                            <UpArrow fill={theme.colors.text} width="25" height="25" />
                                                        ) : (
                                                            <DownArrow
                                                                fill={theme.colors.text}
                                                                width="25"
                                                                height="25"
                                                            />
                                                        )}
                                                    </PersonalInner>
                                                    <PersonalInner>
                                                        <TitleAndGold underline={false} gold={raidTotalGold} />
                                                    </PersonalInner>
                                                </PersonalHeader>
                                                <Contents fold={raidFold}>
                                                    <RaidGold
                                                        raidCategory={ledgerData.raid}
                                                        raidDetailData={ledgerData.raidDetail}
                                                        characterId={characterId}
                                                        characterLevel={Number(level.replace(/\,/g, ''))}
                                                    />
                                                </Contents>
                                            </Article>
                                        );
                                    },
                                )}
                        </GoldContents>
                    ) : (
                        <Nodata
                            text={
                                <strong>
                                    캐릭터 정보가 없네요.😢 <br />
                                    <Link href="/todo">숙제 페이지</Link>에서 캐릭터를 등록하면 골드 수입을 작성하실 수
                                    있습니다.
                                </strong>
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
    width: 80%;
    margin-top: 3em;
    box-sizing: border-box;
    justify-content: center;
    h1 {
        font-size: 1.6em;
    }

    h2 {
        font-size: 1.25em;
    }

    h3 {
        font-size: 1.15em;
    }

    h4 {
        font-size: 1.05em;
    }

    tspan {
        font-size: 12px;
    }

    ${widthMedia.phone} {
        width: 90%;
    }
`;

const Summary = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid;
    margin-bottom: 1em;
    padding-top: 1.5em;
    padding-bottom: 2em;
    padding-left: 2em;
    padding-right: 2em;
`;

const SummaryDiv = styled.div`
    display: flex;
    width: 100%;
    flex-flow: wrap;

    ${widthMedia.tablet} {
        flex-direction: column;
        flex-flow: column;
    }
`;

const SummaryLeft = styled.div`
    display: flex;
    flex-basis: 30%;
    flex-direction: column;

    ${widthMedia.desktop} {
        flex-basis: 50%;
    }
`;

const SummaryRight = styled.div`
    display: flex;
    flex-basis: 70%;
    flex-direction: column;

    ${widthMedia.desktop} {
        flex-basis: 50%;
    }
`;

const Article = styled.article`
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.colors.text};
    padding: 2em;
    margin-bottom: 1em;
    box-sizing: border-box;
    height: 100%;
    flex-basis: 32%;

    ${widthMedia.desktop} {
        flex-basis: 48%;
    }

    ${widthMedia.tablet} {
        flex-basis: 100%;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    h2 {
        flex-basis: 40%;
    }

    & > div {
        flex-basis: 45%;
    }
`;

const DashDiv = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px dashed ${props => props.theme.colors.text};
    padding: 1.5em;
    margin-left: 2em;
    margin-right: 2em;
    box-sizing: border-box;
    height: 100%;

    ${widthMedia.tablet} {
        margin-bottom: 2em;
        padding-bottom: 2em;
    }

    ${widthMedia.phone} {
        margin: 0;
        padding: 1em;
        margin-bottom: 10px;
    }
`;

const GoldList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    ${widthMedia.tablet} {
        width: 80%;
        align-self: center;
    }
`;

const GoldSum = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Contents = styled.article<IFold>`
    display: ${props => (props.fold ? `none` : 'flex')};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    background: rgba(0, 0, 0, 0.1);
    margin-top: 2em;
`;

const GoldContents = styled.article`
    display: flex;
    width: 100%;
    height: 100%;
    flex-flow: wrap;
    justify-content: space-between;
`;

const PersonalHeader = styled.div`
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px dashed ${props => props.theme.colors.text};
    margin-top: 2em;
`;

const PersonalInner = styled.div`
    display: flex;
    flex-basis: 30%;
    align-items: center;
`;

const SummaryHeader = styled.div`
    display: flex;
    justify-content: space-between;

    ${widthMedia.desktop} {
        margin-bottom: 1.3em;
    }

    ${widthMedia.phone} {
        flex-direction: column;
        & > a {
            margin-bottom: 10px;
            text-align: right;
        }
    }

    & > span {
        display: none;
        cursor: pointer;

        ${widthMedia.desktop} {
            display: flex;
        }

        ${widthMedia.phone} {
            justify-content: flex-end;
        }
    }
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

const SummaryHeaderTitle = styled.div`
    display: flex;
    align-items: center;
    flex-basis: 20%;
    justify-content: space-around;
    margin-bottom: 1em;

    ${widthMedia.mediumDesktop} {
        flex-basis: 30%;
    }

    ${widthMedia.desktop} {
        flex-basis: 30%;
    }

    ${widthMedia.smallDesktop} {
        flex-basis: 35%;
    }

    ${widthMedia.tablet} {
        flex-basis: 45%;
    }

    ${widthMedia.phone} {
        flex-basis: 100%;
        justify-content: space-between;
    }
`;

const DetailSta = styled.div`
    display: flex;
    flex-direction: row-reverse;
    cursor: pointer;

    ${widthMedia.desktop} {
        display: none;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;

    h4 {
        margin-top: 10px;
        &:before {
            content: 'Lv. ';
        }
    }
`;

const RankContent = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
`;

const RankInner = styled.div`
    display: flex;
    flex-basis: 50%;
    justify-content: center;

    ${widthMedia.desktop} {
        flex-basis: 100%;
        flex-direction: column;

        & > span {
            margin-bottom: 10px;
        }
    }
`;

const ChartInner = styled.div`
    display: flex;
    flex-basis: 50%;
    justify-content: center;

    ${widthMedia.desktop} {
        display: none;
    }
`;

export default Ledger;
