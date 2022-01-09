import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import GoldIcon from '@components/Image/Gold';
import { useTheme } from '@emotion/react';

interface ITitleGold {
    gold: number;
    negative?: boolean;
    goldTextColor?: boolean;
    goldTextColorStr?: string;
    title?: string;
    icon?: any;
    iconUrl?: string;
    underline?: boolean;
    opacity?: number;
    bracket?: boolean;
    isPadding?: boolean;
    className?: string;
}

const TitleAndGold = ({
    iconUrl,
    title,
    gold,
    icon,
    opacity,
    className,
    goldTextColorStr,
    goldTextColor = false,
    negative = false,
    isPadding = true,
    bracket = false,
    underline = true,
}: ITitleGold) => {
    const theme = useTheme();
    return (
        <Container className={className} title={title} underline={underline} opacity={opacity} isPadding={isPadding}>
            <Title icon={icon} title={title}>
                <span>{icon && icon}</span>
                {iconUrl && <Image alt="타이틀 아이콘" layout="fixed" src={iconUrl} width="21" height="19" />}
                <strong>{title}</strong>
            </Title>
            <Gold bracket={bracket}>
                <GoldIcon type="basic" />
                <GoldText
                    textColor={
                        goldTextColorStr
                            ? goldTextColorStr
                            : goldTextColor
                            ? gold >= 0
                                ? theme.ledger.income
                                : theme.ledger.spending
                            : theme.colors.text
                    }
                >
                    {negative && gold > 0 && `- `}
                    {gold.toLocaleString()}
                </GoldText>
            </Gold>
        </Container>
    );
};

const Container = styled.article<Pick<ITitleGold, 'title' | 'underline' | 'opacity' | 'isPadding'>>`
    display: flex;
    padding-top: 0.7em;
    padding-bottom: 0.7em;
    padding-left: 1em;
    padding-right: 1em;
    justify-content: space-between;

    ${props => (props.underline ? `border-bottom: 0.5px dashed ${props.theme.colors.gray}; ` : ``)}
    ${props => (props.underline ? `border-top: 0.5px dashed ${props.theme.colors.gray}; ` : ``)}
    
    width: 100%;
    box-sizing: border-box;

    svg,
    img {
        padding-right: 0.3em !important;
        box-sizing: border-box;
    }
    ${props => props.opacity && `opacity : ${props.opacity}`};
    ${props => !props.isPadding && `padding:0`};
`;

const Title = styled.div<{ icon: any }>`
    display: flex;
    align-items: center;
    ${props =>
        props.icon &&
        `
            span {
                margin-right: 10px;
            }
    `}

    strong {
        margin-left: 0.5em;
    }
`;
const Gold = styled.div<{ bracket: boolean }>`
    display: flex;
    align-items: center;

    ${props =>
        props.bracket &&
        `  &:before {
                content: '(';
            }
    &:after {
        content: ')';
    }`}
`;

const GoldText = styled.span<{ textColor: string }>`
    ${props => props.textColor && `color : ${props.textColor}`};
    font-weight: 600;
`;

export default TitleAndGold;
