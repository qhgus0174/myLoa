import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Link from 'next/link';
import Head from 'next/head';
import { LocalStorageActionContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import { initCommonHistory } from '@hooks/useLocalStorage';
import { IStatisticsCommon, IStatisticsPersonal, IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import VerticalBarChart from '@components/Statistics/Graph/VerticalBarChart';
import CustomLineChart from '@components/Statistics/Graph/LineChart';
import { calcCommonIncomeGold, calcCommonSpendingGold, calcSum } from '@components/Ledger/common/functions';
import CharacterGoldDetailChart from '@components/Statistics/Graph/CharacterGoldDetailChart';
import PrevWeekSum, { IPrevWeekSum } from '@components/Ledger/modal/PrevWeekSum';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import EmojiTitle from '@components/Emoji/EmojiTitle';
import Ranking from '@components/Statistics/Ranking';
import WeekSum from '@components/Statistics/WeekSum';
import IconLabel from '@components/Label/IconLabel';
import Nodata from '@components/article/Nodata';
import Button from '@components/Button/Button';
import { ILedger, ILedgerCommon, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { getCharacterInfoById, parseStorageItem } from '@common/utils';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common/layout/common';
import { Comment } from '@style/common/text';
import { widthMedia } from '@style/device';

const Statistics = () => {
    const weekKorArr = ['저번주', '2주전', '3주전', '4주전'];

    const theme = useTheme();
    const { setModalProps } = useContext(ModalActionContext);

    const [totalGoldByWeekArr, setTotalGoldByWeekArr] = useState<IStatisticsCommon[]>([]);
    const [commonGoldByWeekArr, setCommonGoldByWeekArr] = useState<IStatisticsCommon[]>([]);
    const [characterGoldByWeekArr, setCharacterGoldByWeekArr] = useState<IStatisticsCommon[]>([]);

    const [personalGoldThisWeekArr, setPersonalGoldThisWeekArr] = useState<IStatisticsPersonal[]>([]);

    const [commonGoldThisWeek, setCommonGoldThisWeek] = useState<number>(0);
    const [personalGoldThisWeek, setPersonalGoldThisWeek] = useState<number>(0);

    const [commonSpendThisWeek, setCommonSpendThisWeek] = useState<number>(0);
    const [personalSpendThisWeek, setPersonalSpendThisWeek] = useState<number>(0);

    const [commonAllGoldPrev, setCommonAllGoldPrev] = useState<number>(0);
    const [personalAllGoldPrev, setPersonalAllGoldPrev] = useState<number>(0);

    const [personalGoldPrev, setPersonalGoldPrev] = useState<IStatisticsPersonalPrev[]>([]);

    const [hasData, setHasData] = useState<boolean>(true);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    useEffect(() => {
        if (!parseStorageItem(localStorage.getItem('ledger') as string)) return;

        const { common, own }: ILedger = { ...parseStorageItem(localStorage.getItem('ledger') as string) };

        localStorage.getItem('ledger') && calcWeekGold();
        own.length < 1
            ? setHasData(false)
            : localStorage.getItem('character') && localStorage.getItem('ledger') && calcStastistics();
    }, []);

    const calcStastistics = () => {
        if (parseStorageItem(localStorage.getItem('character') as string).length < 1) return;

        const { common, own }: ILedger = { ...parseStorageItem(localStorage.getItem('ledger') as string) };

        calcTotalGoldByWeek();
        setCommonGoldByWeekArr(getCommonGoldByWeek(common));
        setCharacterGoldByWeekArr(getCharacterGoldByWeek(own));

        calcPersonalGoldThisWeek(own);
        setPersonalGoldPrev(calcPersonalGoldPrev(own));
        setCommonAllGoldPrev(calcCommonAllGoldPrev(common));
        setCommonGoldThisWeek(calcSum(calcCommonIncomeGold({ history: common.histories })));
        setCommonSpendThisWeek(calcSum(calcCommonSpendingGold({ history: common.histories })));
        setPersonalGoldThisWeek(getCharacterAllGoldThisWeek(own));
        setPersonalSpendThisWeek(getCharacterAllSpendThisWeek(own));

        setCharacterAllGoldPrevWeek(own);
    };

    const calcPersonalGoldPrev = (own: ILedgerOwn[]): IStatisticsPersonalPrev[] => {
        const result = own.map(({ characterId, prevWeekGold }) => {
            return {
                name: getCharacterInfoById({
                    dataArray: parseStorageItem(localStorage.getItem('character') as string),
                    id: characterId,
                }).name,
                gold: prevWeekGold.reduce((prev, next) => prev + next),
            };
        });

        return result;
    };

    const calcCommonAllGoldPrev = (common: ILedgerCommon): number => {
        const { prevWeekGold }: ILedgerCommon = common;

        const sum = prevWeekGold.reduce((prev, next) => {
            return prev + next;
        });

        return sum;
    };

    const setCharacterAllGoldPrevWeek = (own: ILedgerOwn[]) => {
        const prevPersonalGold2dArr: number[][] = own.map(({ prevWeekGold }) => {
            return prevWeekGold;
        });

        const sum = prevPersonalGold2dArr.flat().reduce((prev, next) => prev + next);

        setPersonalAllGoldPrev(sum);
    };

    const getCharacterAllGoldThisWeek = (own: ILedgerOwn[]): number => {
        const personalSumArr = own.map(({ histories }) => {
            return calcSum(histories.raid.data) + calcSum(histories.goods.data);
        });

        const personalThisWeek = personalSumArr.reduce((prev, next) => prev + next);

        return personalThisWeek;
    };

    const getCharacterAllCalcThisWeek = (own: ILedgerOwn[]): number => {
        const personalSumArr = own.map(({ histories }) => {
            return (
                calcSum(histories.raid.data) +
                calcSum(histories.goods.data) -
                (histories.spending ? calcSum(histories.spending.data) : 0)
            );
        });

        const personalThisWeek = personalSumArr.reduce((prev, next) => prev + next);

        return personalThisWeek;
    };

    const getCharacterAllSpendThisWeek = (own: ILedgerOwn[]): number => {
        const personalSumArr = own.map(({ histories }) => {
            return histories.spending ? calcSum(histories.spending.data) : 0;
        });

        const personalThisWeek = personalSumArr.reduce((prev, next) => prev + next);

        return personalThisWeek;
    };

    const getCharacterGoldByWeek = (own: ILedgerOwn[]): IStatisticsCommon[] => {
        const personalGoldThisWeek = getCharacterAllCalcThisWeek(own);

        let lastWeek = 0;
        let lastBeforeWeek = 0;
        let threeWeeksAgo = 0;
        let fourWeeksAgo = 0;

        own.forEach(({ prevWeekGold }) => {
            lastWeek += prevWeekGold[0];
            lastBeforeWeek += prevWeekGold[1];
            threeWeeksAgo += prevWeekGold[2];
            fourWeeksAgo += prevWeekGold[3];
        });

        const personalGoldPrevWeek = [lastWeek, lastBeforeWeek, threeWeeksAgo, fourWeeksAgo];

        const characterGoldByWeek: IStatisticsCommon[] = personalGoldPrevWeek.map((gold: number, index) => {
            return { weekKor: weekKorArr[index], gold: gold };
        });

        characterGoldByWeek.unshift({ weekKor: '이번주', gold: personalGoldThisWeek });

        return characterGoldByWeek.reverse();
    };

    const calcTotalGoldByWeek = () => {
        const { common, own }: ILedger = { ...parseStorageItem(localStorage.getItem('ledger') as string) };

        const commonGoldByWeek: IStatisticsCommon[] = getCommonGoldByWeek(common);
        const personalGoldByWeek: IStatisticsCommon[] = getCharacterGoldByWeek(own);
        console.log(commonGoldByWeek, personalGoldByWeek);
        const weekKorMap = new Map<string, number>();

        for (const { weekKor, gold } of [...personalGoldByWeek, ...commonGoldByWeek])
            weekKorMap.set(weekKor, (weekKorMap.get(weekKor) || 0) + gold);

        const totalGoldByWeekArr = Array.from(weekKorMap, ([weekKor, gold]) => ({ weekKor, gold }));

        setTotalGoldByWeekArr(totalGoldByWeekArr);
    };

    const getCommonGoldByWeek = (common: ILedgerCommon): IStatisticsCommon[] => {
        const { prevWeekGold, histories }: ILedgerCommon = common;

        const result: IStatisticsCommon[] = prevWeekGold.map((gold: number, index) => {
            return { weekKor: weekKorArr[index], gold: gold };
        });

        const incomeGold = calcCommonIncomeGold({ history: histories });

        const spendingGold = calcCommonSpendingGold({ history: histories });

        result.unshift({ weekKor: '이번주', gold: calcSum(incomeGold) - calcSum(spendingGold) });

        return result.reverse();
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
                spending: histories.spending ? calcSum(histories.spending.data) : 0,
            };
        });

        setPersonalGoldThisWeekArr(result);
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
        console.log(newLedger);
        setStoredLedger(newLedger);
    };

    const openPrevWeekSum = ({
        commonAllGoldPrev,
        commonGoldThisWeek,
        personalAllGoldPrev,
        personalGoldThisWeek,
    }: IPrevWeekSum) => {
        setModalProps({
            isOpen: true,
            content: (
                <PrevWeekSum
                    commonAllGoldPrev={commonAllGoldPrev}
                    commonGoldThisWeek={commonGoldThisWeek}
                    personalAllGoldPrev={personalAllGoldPrev}
                    personalGoldThisWeek={personalGoldThisWeek}
                />
            ),
            options: { width: '330', height: '280', headerTitle: '지난 주 데이터' },
        });
    };

    const getResult = () => {
        const gold = commonGoldThisWeek + personalGoldThisWeek - (commonSpendThisWeek + personalSpendThisWeek);

        const commonGold = commonGoldThisWeek - commonSpendThisWeek;
        const personalGold = personalGoldThisWeek - personalSpendThisWeek;

        return (
            <>
                <ResultInner>
                    <span>공통 합계는 </span>
                    <TotalGoldDiv>
                        <TitleAndGold
                            goldTextColor={commonGold > 0 ? theme.ledger.income : theme.ledger.spending}
                            isPadding={false}
                            underline={false}
                            gold={commonGold}
                        />
                    </TotalGoldDiv>
                    <span>, 캐릭터 별 합계는 </span>
                    <TotalGoldDiv>
                        <TitleAndGold
                            goldTextColor={personalGold > 0 ? theme.ledger.income : theme.ledger.spending}
                            isPadding={false}
                            underline={false}
                            gold={personalGold}
                        />
                    </TotalGoldDiv>
                </ResultInner>
                <ResultInner>
                    <span>이번 주는 총 </span>
                    <TotalGoldDiv>
                        <TitleAndGold isPadding={false} underline={false} gold={gold} />
                    </TotalGoldDiv>
                    <span>&nbsp;만큼&nbsp;</span>
                    {gold >= 0 ? (
                        <IconLabel
                            label={<h4>이득입니다!!</h4>}
                            iconUrl="/static/img/icon/mococo/nice_rabbit.png"
                            width="24"
                            height="24"
                        />
                    ) : (
                        <IconLabel
                            label={<h4>지출이 있었습니다!</h4>}
                            iconUrl="/static/img/icon/mococo/sad_rabbit.png"
                            width="24"
                            height="24"
                        />
                    )}
                </ResultInner>
            </>
        );
    };

    return (
        <StatisticsContainer>
            <Head>
                <title>로요일좋아 - 골드 수입 통계</title>
                <meta name="description" content="로스트아크의 내 캐릭터 골드 수입을 작성하고, 통계를 확인해보세요!" />
            </Head>
            <StatisticsSection>
                {!hasData && (
                    <Nodata
                        text={
                            <strong>
                                골드 수입 데이터가 존재하지 않네요.😐
                                <br /> <Link href="/ledger">골드 수입 작성</Link> 후 통계 표시됩니다!
                            </strong>
                        }
                    />
                )}
                <h1>종합</h1>
                <OverAllArticle>
                    <OverAllLeftArticle>
                        <InnerDiv>
                            <HeaderTitle>
                                <IconLabel
                                    label={<h2>이번 주 골드 총 합</h2>}
                                    iconUrl="/static/img/icon/mococo/shake_rabbit.gif"
                                    width="24"
                                    height="24"
                                />
                                <Button
                                    onClick={() =>
                                        openPrevWeekSum({
                                            commonAllGoldPrev: commonAllGoldPrev,
                                            commonGoldThisWeek: commonGoldThisWeek,
                                            personalAllGoldPrev: personalAllGoldPrev,
                                            personalGoldThisWeek: personalGoldThisWeek,
                                        })
                                    }
                                >
                                    <EmojiTitle label={<span>지난 주 데이터</span>} symbol={'🔍'} />
                                </Button>
                            </HeaderTitle>
                            <OverAllDiv>
                                <WeekSumDiv>
                                    <Title>
                                        <IconLabel
                                            label={<h4>수입</h4>}
                                            iconUrl="/static/img/icon/mococo/rabbit.png"
                                            width="24"
                                            height="24"
                                        />
                                    </Title>
                                    <WeekSum
                                        common={commonGoldThisWeek}
                                        personal={personalGoldThisWeek}
                                        type="income"
                                    />
                                </WeekSumDiv>
                                <WeekSumDiv>
                                    <Title>
                                        <IconLabel
                                            label={<h4>지출</h4>}
                                            iconUrl="/static/img/icon/mococo/rabbit.png"
                                            width="24"
                                            height="24"
                                        />
                                    </Title>
                                    <WeekSum
                                        common={commonSpendThisWeek}
                                        personal={personalSpendThisWeek}
                                        type="spending"
                                    />
                                </WeekSumDiv>
                            </OverAllDiv>
                            <ResultDiv>{getResult()}</ResultDiv>
                        </InnerDiv>
                        <InnerDiv>
                            <HeaderTitle>
                                <IconLabel
                                    label={<h2>수입 순위</h2>}
                                    iconUrl="/static/img/icon/mococo/bling_rabbit.gif"
                                    width="24"
                                    height="24"
                                />
                            </HeaderTitle>
                            <RankDiv>
                                <WeekRank>
                                    <RankContainer>
                                        <Ranking
                                            title="이번 주"
                                            array={personalGoldThisWeekArr.map(({ name, raid, goods }) => {
                                                return { name: name, gold: raid + goods };
                                            })}
                                        />
                                    </RankContainer>
                                </WeekRank>
                                <WeekRank>
                                    <RankContainer>
                                        <Ranking title="저번주 ~ 4주전" array={personalGoldPrev} />
                                    </RankContainer>
                                </WeekRank>
                            </RankDiv>
                            <Comment>* 골드 수입만 계산 된 값 입니다.</Comment>
                        </InnerDiv>
                    </OverAllLeftArticle>
                    <OverAllRightArticle>
                        <IconLabel
                            label={<h2>지난 4주</h2>}
                            iconUrl="/static/img/icon/mococo/lastweek.png"
                            width="27"
                            height="27"
                        />
                        <Comment>* 1월 8일 업데이트 이후의 주는 지출이 포함된 값입니다.</Comment>
                        <OverAllInnerArticle>
                            <CustomLineChart width={500} height={200} array={totalGoldByWeekArr} />
                            <IconLabel
                                label={<h4>총 합</h4>}
                                iconUrl="/static/img/icon/mococo/rabbit.png"
                                width="24"
                                height="24"
                            />
                        </OverAllInnerArticle>
                        <OverAllBottom>
                            <OverAllInnerArticle>
                                <CustomLineChart width={250} height={200} array={commonGoldByWeekArr} />
                                <IconLabel
                                    label={<h4>공통</h4>}
                                    iconUrl="/static/img/icon/mococo/rabbit.png"
                                    width="24"
                                    height="24"
                                />
                            </OverAllInnerArticle>
                            <OverAllInnerArticle>
                                <CustomLineChart width={250} height={200} array={characterGoldByWeekArr} />
                                <IconLabel
                                    label={<h4>캐릭터 별</h4>}
                                    iconUrl="/static/img/icon/mococo/rabbit.png"
                                    width="24"
                                    height="24"
                                />
                            </OverAllInnerArticle>
                        </OverAllBottom>
                    </OverAllRightArticle>
                </OverAllArticle>
            </StatisticsSection>
            <StatisticsSection>
                <h1>캐릭터 별 통계</h1>
                <PersonalArticle>
                    <PersonalBottom>
                        <PersonalInnerArticle>
                            <GraphDiv>
                                <CharacterGoldDetailChart array={personalGoldThisWeekArr} />
                            </GraphDiv>
                            <IconLabel
                                label={<h4>이번 주 수입</h4>}
                                iconUrl="/static/img/icon/mococo/rabbit.png"
                                width="24"
                                height="24"
                            />
                        </PersonalInnerArticle>
                        <PersonalInnerArticle>
                            <GraphDiv>
                                <VerticalBarChart
                                    width={500}
                                    height={300}
                                    color={theme.graph.quaternary}
                                    array={personalGoldPrev.sort(({ gold: beforGold }, { gold: afterGold }) => {
                                        return afterGold - beforGold;
                                    })}
                                />
                            </GraphDiv>
                            <IconLabel
                                label={<h4>저번 주 ~ 4주 전 수입 + 지출</h4>}
                                iconUrl="/static/img/icon/mococo/rabbit.png"
                                width="24"
                                height="24"
                            />
                        </PersonalInnerArticle>
                    </PersonalBottom>
                </PersonalArticle>
            </StatisticsSection>
        </StatisticsContainer>
    );
};

const StatisticsContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-top: 4em;

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

const StatisticsSection = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid;
    margin-bottom: 1em;
    padding: 3em;
    box-sizing: border-box;

    ${widthMedia.phone} {
        padding: 1.5em;
    }
`;

const OverAllArticle = styled.article`
    display: flex;
    justify-content: space-around;

    ${widthMedia.desktop} {
        flex-direction: column;
    }
`;

const OverAllLeftArticle = styled.article`
    display: flex;
    justify-content: center;
    flex-basis: 45%;
    flex-direction: column;

    ${widthMedia.desktop} {
        margin-bottom: 2em;
    }
`;

const InnerDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-basis: 45%;
    flex-direction: column;
    width: 100%;
    border: 1px dashed ${props => props.theme.colors.text};
    padding: 1em;
    margin-top: 1em;
    box-sizing: border-box;
`;

const OverAllInnerArticle = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 48%;
    margin-bottom: 1em;

    ${widthMedia.tablet} {
        margin-bottom: 1em;
    }
`;

const OverAllRightArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 48%;
`;

const PersonalArticle = styled.article`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const PersonalInnerArticle = styled.article`
    display: flex;
    flex-direction: column;
    flex-basis: 45%;
    align-items: center;
    margin-top: 2em;
    margin-bottom: 2em;

    h3 {
        margin-left: 15px;
    }
`;

const GraphDiv = styled(FlexDiv)`
    justify-content: center;
    font-size: 0.8em;
    width: 100%;
    height: 100%;
`;

const OverAllDiv = styled.div`
    display: flex;
    justify-content: space-around;

    ${widthMedia.phone} {
        flex-direction: column;
    }
`;

const WeekSumDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 40%;
    width: 100%;
    justify-content: space-around;
    ${widthMedia.phone} {
        margin-top: 1em;
        margin-bottom: 1em;
    }
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    align-items: center;

    & > h3,
    & > label {
        flex-basis: 50%;
    }
`;

const RankDiv = styled.div`
    display: flex;
    justify-content: space-around;

    ${widthMedia.phone} {
        flex-direction: column;
    }
`;
const WeekRank = styled.div`
    display: flex;
    flex-basis: 45%;
    width: 100%;
`;

const RankContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    ${widthMedia.phone} {
        margin-top: 1em;
        margin-bottom: 1em;
    }
`;

const OverAllBottom = styled.div`
    display: flex;
    justify-content: space-evenly;

    ${widthMedia.tablet} {
        flex-direction: column;
    }
`;

const PersonalBottom = styled.div`
    display: flex;
    justify-content: space-evenly;

    ${widthMedia.desktop} {
        flex-direction: column;
    }
`;

const HeaderTitle = styled.div`
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
`;

const ResultDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    margin-top: 1.2em;
    align-items: center;
`;

const TotalGoldDiv = styled.div``;

const ResultInner = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-top: 0.32em;
`;

export default Statistics;
