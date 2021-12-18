import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import { css, useTheme } from '@emotion/react';

const CharacterGoldThisWeek = ({ array }: { array: IStatisticsPersonalPrev[] }) => {
    const theme = useTheme();

    return (
        <ResponsiveContainer>
            <div
                css={css`
                    display: flex;
                    justify-content: center;
                `}
            >
                <BarChart
                    width={330}
                    height={230}
                    layout="vertical"
                    data={array}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        tickFormatter={tick => {
                            return tick.toLocaleString();
                        }}
                        fontSize={10}
                        stroke={theme.colors.text}
                        type="number"
                    />
                    <YAxis
                        fontSize="10px !important"
                        width={80}
                        stroke={theme.colors.text}
                        type="category"
                        dataKey="name"
                    />
                    <Bar isAnimationActive={false} dataKey="gold" stackId="personal" fill={theme.graph.primary}>
                        <LabelList
                            fontSize="12em"
                            dataKey="gold"
                            position="inside"
                            fill="#ffffff"
                            formatter={(value: number) => value.toLocaleString()}
                        />
                    </Bar>
                </BarChart>
            </div>
        </ResponsiveContainer>
    );
};

export default CharacterGoldThisWeek;
