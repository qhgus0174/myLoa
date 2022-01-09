import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import ResponsiveGraph from '@components/Statistics/Graph/ResponsiveGraph';
import { IStatisticsCommon } from '@components/Statistics/StatisticsType';
import { css, useTheme } from '@emotion/react';
import IconLabel from '@components/Label/IconLabel';

interface ILineChart {
    array: IStatisticsCommon[];
    width: number;
    height: number;
    title: string;
}

const CustomLineChart = ({ array, width, height, title }: ILineChart) => {
    const theme = useTheme();

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

    return (
        <>
            <ResponsiveGraph>
                <LineChart
                    width={width}
                    height={height}
                    data={array}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="weekKor" stroke={theme.colors.text} fontSize={5} />
                    <YAxis
                        tickFormatter={tick => {
                            return tick.toLocaleString();
                        }}
                        stroke={theme.colors.text}
                    />
                    <Line type="monotone" dataKey="gold" stroke={theme.colors.text} activeDot={{ r: 8 }}>
                        <LabelList content={<CustomizedLabel stroke={theme.colors.text} />} />
                    </Line>
                </LineChart>
            </ResponsiveGraph>
            <IconLabel label={<h4>{title}</h4>} iconUrl="/static/img/icon/mococo/rabbit.png" width="24" height="24" />
        </>
    );
};

export default CustomLineChart;
