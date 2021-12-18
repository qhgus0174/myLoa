import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    BarChart,
    Bar,
    ResponsiveContainer,
} from 'recharts';
import { IStatisticsCommon, IStatisticsPersonal, IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import { ILedger, ILedgerCommon, ILedgerOwn } from '@common/types/localStorage/Ledger';
import ResponsiveGraph from '@components/Statistics/Graph/ResponsiveGraph';
import { calcSum } from '@components/Ledger/common/functions';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import Ranking from '@components/Statistics/Ranking';
import WeekSum from '@components/Statistics/WeekSum';
import { getCharacterInfoById, parseStorageItem } from '@common/utils';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { widthMedia } from '@style/device';
import CustomLineChart from '@components/Statistics/Graph/LineChart';
import VerticalBarChart from '@components/Statistics/Graph/VerticalBarChart';
import GoldIcon from '@components/Image/Gold';
import EmojiTitle from '@components/Emoji/EmojiTitle';
import Link from 'next/link';
import Nodata from '@components/article/Nodata';
import { NextSeo } from 'next-seo';

const Statistics = () => {
    const weekKorArr = ['저번주', '2주전', '3주전', '4주전'];

    const theme = useTheme();

    const [totalGoldByWeekArr, setTotalGoldByWeekArr] = useState<IStatisticsCommon[]>([]);
    const [commonGoldByWeekArr, setCommonGoldByWeekArr] = useState<IStatisticsCommon[]>([]);
    const [characterGoldByWeekArr, setCharacterGoldByWeekArr] = useState<IStatisticsCommon[]>([]);

    const [personalGoldThisWeekArr, setPersonalGoldThisWeekArr] = useState<IStatisticsPersonal[]>([]);

    const [commonGoldThisWeek, setCommonGoldThisWeek] = useState<number>(0);
    const [personalGoldThisWeek, setPersonalGoldThisWeek] = useState<number>(0);

    const [commonAllGoldPrev, setCommonAllGoldPrev] = useState<number>(0);
    const [personalAllGoldPrev, setPersonalAllGoldPrev] = useState<number>(0);

    const [personalGoldPrev, setPersonalGoldPrev] = useState<IStatisticsPersonalPrev[]>([]);

    const [isContainThisWeek, setIsContainThisWeek] = useState<boolean>(false);

    const [hasData, setHasData] = useState<boolean>(true);

    useEffect(() => {
        if (!parseStorageItem(localStorage.getItem('ledger') as string)) return;

        const { common, own }: ILedger = { ...parseStorageItem(localStorage.getItem('ledger') as string) };

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
        setCommonGoldThisWeek(calcSum(common.histories));

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
        setPersonalGoldThisWeek(personalThisWeek);

        return personalThisWeek;
    };

    const getCharacterGoldByWeek = (own: ILedgerOwn[]): IStatisticsCommon[] => {
        const personalGoldThisWeek = getCharacterAllGoldThisWeek(own);

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

        result.unshift({ weekKor: '이번주', gold: calcSum(histories) });

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
            };
        });

        setPersonalGoldThisWeekArr(result);
    };

    const ColorfulLegendText = (value: string, entry: any) => {
        const { color } = entry;

        const korName = [
            { key: 'goods', name: '재화' },
            { key: 'raid', name: '레이드' },
        ];

        return <span style={{ color }}>{korName.find(({ key }) => key === value)?.name}</span>;
    };

    return (
        <StatisticsContainer>
            <NextSeo
                title="로요일좋아 - 골드 수입 통계"
                description="로스트 아크 캐릭터의 골드 수입 통계를 한눈에 보세요!"
                openGraph={{
                    title: '로요일좋아 - 골드 수입 통계',
                    description: '로스트 아크 캐릭터의 골드 수입 통계를 한눈에 보세요!',
                    url: 'https://loa-day.com/statistics',
                    locale: 'ko_KR',
                    type: 'website',
                    images: [
                        {
                            url: 'https://loa-day.com/static/img/logo/logo.png',
                            width: 1200,
                            height: 1200,
                            type: 'image/png',
                        },
                    ],
                }}
            />
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
                                <EmojiTitle label={<h2>골드 총 합</h2>} symbol={'💰'} />
                            </HeaderTitle>
                            <OverAllDiv>
                                <WeekSumDiv>
                                    <Title>
                                        <EmojiTitle label={<h4>이번 주</h4>} symbol={'📅'} />
                                    </Title>
                                    <WeekSum common={commonGoldThisWeek} personal={personalGoldThisWeek} />
                                </WeekSumDiv>
                                <WeekSumDiv>
                                    <Title>
                                        <EmojiTitle label={<h4>~ 4주전</h4>} symbol={'📅'} />
                                        <BasicCheckbox
                                            checked={isContainThisWeek}
                                            onChange={e => setIsContainThisWeek(!isContainThisWeek)}
                                            label={<span>이번 주 포함</span>}
                                        />
                                    </Title>
                                    <WeekSum
                                        common={
                                            isContainThisWeek
                                                ? commonAllGoldPrev + commonGoldThisWeek
                                                : commonAllGoldPrev
                                        }
                                        personal={
                                            isContainThisWeek
                                                ? personalAllGoldPrev + personalGoldThisWeek
                                                : personalAllGoldPrev
                                        }
                                    />
                                </WeekSumDiv>
                            </OverAllDiv>
                        </InnerDiv>
                        <InnerDiv>
                            <HeaderTitle>
                                <EmojiTitle label={<h2>순위</h2>} symbol={'👑'} />
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
                        </InnerDiv>
                    </OverAllLeftArticle>
                    <OverAllRightArticle>
                        <EmojiTitle label={<h2>지난 4주</h2>} symbol={'📅'} />
                        <OverAllInnerArticle>
                            <CustomLineChart width={500} height={200} array={totalGoldByWeekArr} />
                            <EmojiTitle label={<h3>총 합</h3>} symbol={'💰'} />
                        </OverAllInnerArticle>
                        <OverAllBottom>
                            <OverAllInnerArticle>
                                <CustomLineChart width={250} height={200} array={commonGoldByWeekArr} />
                                <EmojiTitle label={<h3>공통</h3>} symbol={'⭐'} />
                            </OverAllInnerArticle>
                            <OverAllInnerArticle>
                                <CustomLineChart width={250} height={200} array={characterGoldByWeekArr} />
                                <EmojiTitle label={<h3>캐릭터 별</h3>} symbol={'🎅🏻'} />
                            </OverAllInnerArticle>
                        </OverAllBottom>
                    </OverAllRightArticle>
                </OverAllArticle>
            </StatisticsSection>
            <StatisticsSection>
                <h1>개인 골드 수입</h1>
                <PersonalArticle>
                    <PersonalInnerArticle>
                        <GraphDiv>
                            <ResponsiveGraph>
                                <BarChart
                                    width={600}
                                    height={400}
                                    layout="vertical"
                                    data={personalGoldThisWeekArr}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 10,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        tickFormatter={tick => {
                                            return tick.toLocaleString();
                                        }}
                                        stroke={theme.colors.text}
                                        type="number"
                                    />
                                    <YAxis width={80} stroke={theme.colors.text} type="category" dataKey="name" />
                                    <Legend
                                        wrapperStyle={{ top: 0 }}
                                        layout="vertical"
                                        verticalAlign="top"
                                        align="center"
                                        formatter={ColorfulLegendText}
                                    />
                                    <Bar
                                        isAnimationActive={false}
                                        dataKey="goods"
                                        stackId="personal"
                                        fill={theme.graph.primary}
                                    >
                                        <LabelList
                                            dataKey="goods"
                                            position="inside"
                                            fill="#ffffff"
                                            formatter={(value: number) => value.toLocaleString()}
                                        />
                                    </Bar>
                                    <Bar
                                        isAnimationActive={false}
                                        dataKey="raid"
                                        stackId="personal"
                                        fill={theme.graph.secondary}
                                    >
                                        <LabelList
                                            dataKey="raid"
                                            position="inside"
                                            fill="#ffffff"
                                            formatter={(value: number) => value.toLocaleString()}
                                        />
                                    </Bar>
                                </BarChart>
                            </ResponsiveGraph>
                        </GraphDiv>
                        <EmojiTitle label={<h3>이번 주 상세</h3>} symbol={'📅'} />
                    </PersonalInnerArticle>
                    <PersonalBottom>
                        <PersonalInnerArticle>
                            <GraphDiv>
                                <VerticalBarChart
                                    width={500}
                                    height={300}
                                    array={personalGoldPrev.sort(({ gold: beforGold }, { gold: afterGold }) => {
                                        return afterGold - beforGold;
                                    })}
                                />
                            </GraphDiv>
                            <EmojiTitle label={<h3>이번 주</h3>} symbol={'📅'} />
                        </PersonalInnerArticle>
                        <PersonalInnerArticle>
                            <GraphDiv>
                                <VerticalBarChart
                                    width={500}
                                    height={300}
                                    array={personalGoldThisWeekArr
                                        .map(({ name, raid, goods }) => {
                                            return { name: name, gold: raid + goods };
                                        })
                                        .sort(({ gold: beforeGold }, { gold: afterGold }) => {
                                            return afterGold - beforeGold;
                                        })}
                                />
                            </GraphDiv>
                            <EmojiTitle label={<h3>~4주 전</h3>} symbol={'📅'} />
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
`;

export default Statistics;
