import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, Legend, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { IStatisticsPersonal } from '@components/Statistics/StatisticsType';
import ResponsiveGraph from '@components/Statistics/Graph/ResponsiveGraph';
import GoldIcon from '@components/Image/Gold';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

interface ICharacterGoldDetailChart {
    array: IStatisticsPersonal[];
}

const CharacterGoldDetailChart = ({ array }: ICharacterGoldDetailChart) => {
    const theme = useTheme();

    const ColorfulLegendText = (value: string, entry: any) => {
        const { color } = entry;

        const korName = [
            { key: 'goods', name: '재화' },
            { key: 'raid', name: '레이드' },
            { key: 'spending', name: '지출' },
        ];

        return <span style={{ color }}>{korName.find(({ key }) => key === value)?.name}</span>;
    };

    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            return (
                <TooltipContainer>
                    <Name>{label}</Name>
                    <Gold color={payload[0].color}>
                        재화 : <GoldIcon type="basic" width="15" />
                        {payload[0].value?.toLocaleString()}
                    </Gold>
                    <Gold color={payload[1].color}>
                        레이드 : <GoldIcon type="basic" width="15" />
                        {payload[1].value?.toLocaleString()}
                    </Gold>
                    <Gold color={payload[2].color}>
                        지출 : <GoldIcon type="basic" width="15" />
                        {payload[2].value?.toLocaleString()}
                    </Gold>
                </TooltipContainer>
            );
        }

        return null;
    };

    return (
        <ResponsiveGraph>
            <BarChart
                width={600}
                layout="vertical"
                data={array}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                }}
                barGap={2}
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
                <Tooltip cursor={{ fill: theme.colors.mainInner }} content={<CustomTooltip />} />
                <Bar isAnimationActive={false} dataKey="goods" stackId="personal" fill={theme.graph.primary}>
                    <LabelList
                        dataKey="goods"
                        position="inside"
                        fill="#ffffff"
                        formatter={(value: number) => value.toLocaleString()}
                    />
                </Bar>
                <Bar isAnimationActive={false} dataKey="raid" stackId="personal" fill={theme.graph.secondary}>
                    <LabelList
                        dataKey="raid"
                        position="inside"
                        fill="#ffffff"
                        formatter={(value: number) => value.toLocaleString()}
                    />
                </Bar>
                <Bar isAnimationActive={false} dataKey="spending" stackId="personal" fill={theme.graph.tertiary}>
                    <LabelList
                        dataKey="spending"
                        position="inside"
                        fill="#ffffff"
                        formatter={(value: number) => value.toLocaleString()}
                    />
                </Bar>
            </BarChart>
        </ResponsiveGraph>
    );
};

const TooltipContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 75px;
    padding: 1.7em;
    background: ${props => props.theme.colors.white};
`;

const Name = styled.span`
    margin-bottom: 1em;
    color: ${props => props.theme.colors.black};
`;

const Gold = styled.span<{ color?: string }>`
    display: flex;
    align-items: center;
    color: ${props => props.color};
`;

export default CharacterGoldDetailChart;
