import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, BarChart, Bar } from 'recharts';
import { IStatisticsCommon, IStatisticsPersonal, IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import { ILedger, ILedgerCommon, ILedgerOwn } from '@components/Ledger/LedgerType';
import { calcSum } from '@components/Ledger/common/functions';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import Ranking from '@components/Statistics/Ranking';
import WeekSum from '@components/Statistics/WeekSum';
import { getCharacterInfoById, parseStorageItem } from '@common/utils';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

const Statistics = () => {
    const weekKorArr = ['저번주', '2주전', '3주전', '4주전'];

    const theme = useTheme();

    const [totalGoldByWeekArr, setTotalGoldByWeekArr] = useState<IStatisticsCommon[]>([]);
    const [commonGoldByWeekArr, setCommonGoldByWeekArr] = useState<IStatisticsCommon[]>([]);
    const [personalGoldThisWeekArr, setPersonalGoldThisWeekArr] = useState<IStatisticsPersonal[]>([]);

    const [commonGoldThisWeek, setCommonGoldThisWeek] = useState<number>(0);
    const [personalGoldThisWeek, setPersonalGoldThisWeek] = useState<number>(0);

    const [commonAllGoldPrev, setCommonAllGoldPrev] = useState<number>(0);
    const [personalAllGoldPrev, setPersonalAllGoldPrev] = useState<number>(0);

    const [personalGoldPrev, setPersonalGoldPrev] = useState<IStatisticsPersonalPrev[]>([]);

    const [isContainThisWeek, setIsContainThisWeek] = useState<boolean>(false);

    useEffect(() => {
        if (!parseStorageItem(localStorage.getItem('ledger') as string)) return;

        const { common, own }: ILedger = { ...parseStorageItem(localStorage.getItem('ledger') as string) };

        calcTotalGoldByWeek();
        setCommonGoldByWeekArr(getCommonGoldByWeek(common));

        calcPersonalGoldThisWeek(own);
        setPersonalGoldPrev(calcPersonalGoldPrev(own));
        setCommonAllGoldPrev(calcCommonAllGoldPrev(common));
        setCommonGoldThisWeek(calcSum(common.histories));

        setCharacterAllGoldPrevWeek(own);
    }, []);

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

        return characterGoldByWeek;
    };

    const calcTotalGoldByWeek = () => {
        const { common, own }: ILedger = { ...parseStorageItem(localStorage.getItem('ledger') as string) };

        const commonGoldByWeek: IStatisticsCommon[] = getCommonGoldByWeek(common);
        const personalGoldByWeek: IStatisticsCommon[] = getCharacterGoldByWeek(own);

        const weekKorMap = new Map<string, number>();

        for (const { weekKor, gold } of [...personalGoldByWeek, ...commonGoldByWeek])
            weekKorMap.set(weekKor, (weekKorMap.get(weekKor) || 0) + gold);

        const totalGoldByWeekArr = Array.from(weekKorMap, ([weekKor, gold]) => ({ weekKor, gold }));

        setTotalGoldByWeekArr(totalGoldByWeekArr.reverse());
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

    const CustomizedLabel = (props: any) => {
        const { x, y, stroke, value } = props;

        return (
            <text
                x={x}
                y={y}
                dy={-4}
                fill={stroke}
                css={css`
                    font-size: 0.88em;
                `}
                textAnchor="middle"
            >
                {value.toLocaleString()}
            </text>
        );
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
            <StatisticsSection>
                <h1>종합</h1>
                <OverAllArticle>
                    <OverAllLeftArticle>
                        <InnerDiv>
                            <h2>통계</h2>
                            <FlexDiv>
                                <div>
                                    <WeekSum
                                        title="이번주"
                                        common={commonGoldThisWeek}
                                        personal={personalGoldThisWeek}
                                    />
                                </div>
                                <div>
                                    <BasicCheckbox
                                        checked={isContainThisWeek}
                                        onChange={e => setIsContainThisWeek(!isContainThisWeek)}
                                        label={<span>이번 주 포함</span>}
                                    />
                                    <WeekSum
                                        title={`${isContainThisWeek ? `` : `저번주`} ~ 4주전`}
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
                                </div>
                            </FlexDiv>
                        </InnerDiv>
                        <InnerDiv>
                            <h2>순위</h2>
                            <FlexDiv>
                                <Ranking
                                    title="이번주"
                                    array={personalGoldThisWeekArr.map(({ name, raid, goods }) => {
                                        return { name: name, gold: raid + goods };
                                    })}
                                />
                                <Ranking title="저번주 ~ 4주전" array={personalGoldPrev} />
                            </FlexDiv>
                        </InnerDiv>
                    </OverAllLeftArticle>
                    <OverAllInnerArticle>
                        <h2>~4주 골드 수급량</h2>
                        <GraphDiv>
                            <LineChart
                                width={500}
                                height={200}
                                data={totalGoldByWeekArr}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="weekKor" stroke={theme.colors.text} fontSize={5} />
                                <YAxis stroke={theme.colors.text} />
                                <Line
                                    type="monotone"
                                    dataKey="gold"
                                    stroke={theme.colors.mainInner}
                                    activeDot={{ r: 8 }}
                                >
                                    <LabelList content={<CustomizedLabel stroke={theme.colors.text} />} />
                                </Line>
                            </LineChart>
                        </GraphDiv>
                    </OverAllInnerArticle>
                </OverAllArticle>
            </StatisticsSection>
            <StatisticsSection>
                <h1>공통 골드 수입</h1>
                <CommonArticle>
                    <h2>4주 변화 요약</h2>
                    <LineChart
                        width={300}
                        height={200}
                        data={commonGoldByWeekArr}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="weekKor" stroke={theme.colors.text} fontSize={5} />
                        <YAxis stroke={theme.colors.text} />
                        <Line type="monotone" dataKey="gold" stroke={theme.colors.mainInner} activeDot={{ r: 8 }}>
                            <LabelList content={<CustomizedLabel stroke={theme.colors.text} />} />
                        </Line>
                    </LineChart>
                </CommonArticle>
            </StatisticsSection>
            <StatisticsSection>
                <h1>개인 골드 수입</h1>
                <PersonalArticle>
                    <PersonalInnerArticle>
                        <h2>이번 주</h2>
                        <GraphDiv>
                            <BarChart
                                width={600}
                                height={400}
                                layout="vertical"
                                data={personalGoldThisWeekArr}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <XAxis stroke={theme.colors.text} type="number" />
                                <YAxis width={80} stroke={theme.colors.text} type="category" dataKey="name" />
                                <Legend
                                    wrapperStyle={{ right: 0 }}
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    formatter={ColorfulLegendText}
                                />
                                <Bar isAnimationActive={false} dataKey="goods" stackId="personal" fill="#8884d8">
                                    <LabelList
                                        dataKey="goods"
                                        position="inside"
                                        fill="#ffffff"
                                        formatter={(value: number) => value.toLocaleString()}
                                    />
                                </Bar>
                                <Bar isAnimationActive={false} dataKey="raid" stackId="personal" fill="#82ca9d">
                                    <LabelList
                                        dataKey="raid"
                                        position="inside"
                                        fill="#ffffff"
                                        formatter={(value: number) => value.toLocaleString()}
                                    />
                                </Bar>
                            </BarChart>
                        </GraphDiv>
                    </PersonalInnerArticle>
                    <PersonalInnerArticle>
                        <PersonalPrevArticle>
                            <h2>이번주 수입</h2>
                            <GraphDiv>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={personalGoldPrev.sort(({ gold: beforGold }, { gold: afterGold }) => {
                                        return afterGold - beforGold;
                                    })}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis stroke={theme.colors.text} dataKey="name" />
                                    <YAxis stroke={theme.colors.text} />
                                    <Tooltip />
                                    <Bar dataKey="gold" fill="#8884d8">
                                        <LabelList
                                            dataKey="gold"
                                            position="top"
                                            fill="#ffffff"
                                            formatter={(value: number) => value.toLocaleString()}
                                        />
                                    </Bar>
                                </BarChart>
                            </GraphDiv>
                        </PersonalPrevArticle>
                        <PersonalPrevArticle>
                            <h2>지난주 ~ 4주전 수입</h2>
                            <GraphDiv>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={personalGoldThisWeekArr
                                        .map(({ name, raid, goods }) => {
                                            return { name: name, gold: raid + goods };
                                        })
                                        .sort(({ gold: beforeGold }, { gold: afterGold }) => {
                                            return afterGold - beforeGold;
                                        })}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis stroke={theme.colors.text} dataKey="name" />
                                    <YAxis stroke={theme.colors.text} />
                                    <Tooltip />
                                    <Bar dataKey="gold" fill="#8884d8">
                                        <LabelList
                                            dataKey="gold"
                                            position="top"
                                            fill="#ffffff"
                                            formatter={(value: number) => value.toLocaleString()}
                                        />
                                    </Bar>
                                </BarChart>
                            </GraphDiv>
                        </PersonalPrevArticle>
                    </PersonalInnerArticle>
                </PersonalArticle>
            </StatisticsSection>
        </StatisticsContainer>
    );
};

const StatisticsContainer = styled.section`
    width: 80%;
    margin-top: 4em;

    h1 {
        font-size: 1.7em;
    }

    h2 {
        font-size: 1.3em;
    }

    h3 {
        font-size: 1.15em;
    }
`;

const StatisticsSection = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid;
    margin-bottom: 1em;
    padding: 3em;
`;

const OverAllArticle = styled.article`
    display: flex;
`;

const OverAllLeftArticle = styled.article`
    display: flex;
    justify-content: center;
    flex-basis: 50%;
    flex-direction: column;
`;

const InnerDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-basis: 50%;
    flex-direction: column;
`;

const OverAllInnerArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 50%;
`;

const PersonalArticle = styled.article`
    display: flex;
    width: 100%;
`;

const PersonalInnerArticle = styled.article`
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
`;

const PersonalPrevArticle = styled.article`
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
`;

const RankingDiv = styled(FlexDiv)``;

const CommonArticle = styled.article`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const GraphDiv = styled(FlexDiv)`
    justify-content: center;
    font-size: 0.8em;
`;
export default Statistics;
