import React from 'react';
import { XAxis, YAxis, CartesianGrid, LabelList, BarChart, Bar } from 'recharts';
import { IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import ResponsiveGraph from '@components/Statistics/Graph/ResponsiveGraph';
import { useTheme } from '@emotion/react';

interface IVerticalBarChart {
    array: IStatisticsPersonalPrev[];
    width: number;
    height: number;
}

const VerticalBarChart = ({ array, width, height }: IVerticalBarChart) => {
    const theme = useTheme();

    return (
        <ResponsiveGraph>
            <BarChart
                width={width}
                height={height}
                data={array}
                layout="vertical"
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
                <Bar dataKey="gold" fill="#8884d8">
                    <LabelList
                        dataKey="gold"
                        position="inside"
                        fill={theme.colors.text}
                        formatter={(value: number) => value.toLocaleString()}
                    />
                </Bar>
            </BarChart>
        </ResponsiveGraph>
    );
};

export default VerticalBarChart;
