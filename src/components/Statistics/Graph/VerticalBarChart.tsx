import React from 'react';
import { XAxis, YAxis, CartesianGrid, LabelList, BarChart, Bar } from 'recharts';
import { IStatisticsPersonalPrev } from '@components/Statistics/StatisticsType';
import ResponsiveGraph from '@components/Statistics/Graph/ResponsiveGraph';
import IconLabel from '@components/Label/IconLabel';
import { useTheme } from '@emotion/react';
import { Container, GraphDiv } from '@style/common/graph';

interface IVerticalBarChart {
    array: IStatisticsPersonalPrev[];
    width: number;
    height: number;
    color: string;
    title: string;
}

const VerticalBarChart = ({ array, width, height, color, title }: IVerticalBarChart) => {
    const theme = useTheme();

    return (
        <Container>
            <GraphDiv length={array.length}>
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
                        <Bar dataKey="gold" fill={color}>
                            <LabelList
                                dataKey="gold"
                                position="inside"
                                fill="#ffffff"
                                formatter={(value: number) => value.toLocaleString()}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveGraph>
            </GraphDiv>
            <IconLabel label={<h4>{title}</h4>} iconUrl="/static/img/icon/mococo/rabbit.png" width="24" height="24" />
        </Container>
    );
};

export default VerticalBarChart;
