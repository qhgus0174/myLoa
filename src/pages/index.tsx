import React, { useContext, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { SpinnerContext } from '@context/SpinnerContext';
import { IStatisticsPersonal } from '@components/Statistics/StatisticsType';
import { calcSum } from '@components/Ledger/common/functions';
import Ranking from '@components/Statistics/Ranking';
import EmojiTitle from '@components/Emoji/EmojiTitle';
import Button from '@components/Button/Button';
import { getDayContents, getWeeklyContents, IWeeklyContents } from '@common/getCommonData';
import { ILedger } from '@common/types/localStorage/Ledger';
import { getCharacterInfoById, parseStorageItem } from '@common/utils';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import IconLabel from '@components/Label/IconLabel';
import { GetStaticProps } from 'next';
import Head from 'next/head';

const Main = ({ abyss, guardian }: IWeeklyContents) => {
    const [fieldBoss, setFieldBoss] = useState<boolean>(false);
    const [ghost, setGhost] = useState<boolean>(false);
    const [chaosGate, setChaosGate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noLedger, setNoLedger] = useState<boolean>(false);
    const [personalGoldThisWeekArr, setPersonalGoldThisWeekArr] = useState<IStatisticsPersonal[]>([]);

    useEffect(() => {
        const { fieldBoss, ghost, chaosGate } = getDayContents();

        setFieldBoss(fieldBoss);
        setGhost(ghost);
        setChaosGate(chaosGate);

        localStorage.getItem('character') && localStorage.getItem('ledger')
            ? calcPersonalGoldThisWeek()
            : setNoLedger(true);
    }, []);

    const calcPersonalGoldThisWeek = () => {
        if (parseStorageItem(localStorage.getItem('character') as string).length < 1) return;

        const { own }: ILedger = {
            ...parseStorageItem(localStorage.getItem('ledger') as string),
        };
        if (own.length < 1) return;

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
        setNoLedger(false);
    };

    return (
        <Container>
            <Head>
                <title>로요일좋아 - 로스트아크 유틸 모음</title>
                <meta
                    name="description"
                    content="로스트 아크 유틸 모음 페이지입니다. 내 캐릭터 골드 수입 체크와 숙제를 체크를 편하게 해보세요!"
                />
                <link rel="icon" href="/static/img/favicon.ico" />
                <meta
                    name="keywords"
                    content="로스트아크, 로스트아크 숙제, 로스트아크 유틸, 로스트아크 골드, 로스트아크 계산기, 로아 계산기, 로아 골드, 골드 수입, 골드 수급, 로아, 로요일좋아"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="로요일좋아" />
                <meta
                    property="og:description"
                    content="로스트 아크 유틸 모음 페이지입니다. 내 캐릭터 골드 수입 체크와 숙제를 체크를 편하게 해보세요!"
                />
                <meta property="og:image" content="https://loa-day.com/static/img/logo/logo.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="1200" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="og:url" content="https://loa-day.com/" />
            </Head>
            <TopArea>
                <TextDiv>
                    <EmojiTitle
                        label={
                            <h2>로스트아크 일일, 주간 숙제 관리를 편하게 관리하고 캐릭터들의 수입을 관리해보세요!</h2>
                        }
                        symbol={'😎'}
                        symbolPosition="right"
                    />
                    <br />
                    <Link href="/todo">
                        <GoTodo>숙제 관리 바로가기</GoTodo>
                    </Link>
                </TextDiv>
            </TopArea>
            <ContentsDiv>
                {isLoading ? (
                    <EmojiTitle label={<h2>이번 주 일정 로딩 중...</h2>} symbol={'📅'} />
                ) : (
                    <ContentsContainer>
                        <ContentsInner>
                            <Contents>
                                <WeekContent>
                                    <EmojiTitle label={<h2>일일 컨텐츠</h2>} symbol={'⏰'} />
                                    <InnerContents>
                                        <Article>
                                            <span> {fieldBoss ? '⭕' : '❌'}</span>
                                            <DayTitle active={fieldBoss}>
                                                <span>필드 보스</span>
                                            </DayTitle>
                                        </Article>
                                        <Article>
                                            <span> {ghost ? '⭕' : '❌'}</span>
                                            <DayTitle active={ghost}>
                                                <span>유령선</span>
                                            </DayTitle>
                                        </Article>
                                        <Article>
                                            <span> {chaosGate ? '⭕' : '❌'}</span>
                                            <DayTitle active={chaosGate}>
                                                <span>카오스 게이트</span>
                                            </DayTitle>
                                        </Article>
                                    </InnerContents>
                                </WeekContent>
                            </Contents>
                            <WeekContents>
                                <WeekContent>
                                    <h2>
                                        <IconLabel
                                            label="도전 어비스 던전"
                                            iconUrl="/static/img/lostark/contents/abyss.png"
                                        />
                                    </h2>
                                    {abyss.length > 0 && (
                                        <InnerContents>
                                            {abyss.map((name, abyssIndex) => {
                                                return (
                                                    <WeekTitle key={abyssIndex}>
                                                        🔹 <span>{name}</span>
                                                    </WeekTitle>
                                                );
                                            })}
                                        </InnerContents>
                                    )}
                                </WeekContent>
                                <WeekContent>
                                    <h2>
                                        <IconLabel
                                            label="도전 가디언 토벌"
                                            iconUrl="/static/img/lostark/contents/guardian.png"
                                        />
                                    </h2>
                                    {guardian.length > 0 && (
                                        <InnerContents>
                                            {guardian.map((name, guardianIndex) => {
                                                return (
                                                    <WeekTitle key={guardianIndex}>
                                                        🔹<span> {name}</span>
                                                    </WeekTitle>
                                                );
                                            })}
                                        </InnerContents>
                                    )}
                                </WeekContent>
                            </WeekContents>
                        </ContentsInner>
                        <ContentsInnerRight>
                            {noLedger ? (
                                <span> 캐릭터 정보가 없습니다!</span>
                            ) : (
                                <Ranking
                                    title="이번 주 골드 순위"
                                    array={personalGoldThisWeekArr.map(({ name, raid, goods }) => {
                                        return { name: name, gold: raid + goods };
                                    })}
                                />
                            )}
                        </ContentsInnerRight>
                    </ContentsContainer>
                )}
            </ContentsDiv>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 75%;
    height: 100%;
    margin: 4em;
    padding: 4em;
    box-sizing: border-box;
    border: 1px solid;

    ${widthMedia.tablet} {
        margin: 3em;
        padding: 2em;
    }
`;

const TextDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;

    & > span {
        font-size: 1.1em;
        margin-bottom: 1em;
    }

    h2 {
        font-size: 1.3em;
    }
`;

const ContentsDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    & > article {
        margin-bottom: 1.2em;
    }
    h1 {
        font-size: 1.25em;
    }
`;

const ContentsContainer = styled.div`
    display: flex;
    width: 100%;
    ${widthMedia.desktop} {
        flex-direction: column;
    }
`;

const Contents = styled.div`
    display: flex;
    flex-basis: 25%;
    flex-direction: column;
    align-items: center;
    height: 100%;
    box-sizing: border-box;

    h2 {
        font-size: 1.1em;
        margin-top: 14px;
        margin-bottom: 13px;
        display: flex;
        align-items: center;
    }

    ${widthMedia.desktop} {
        flex-basis: 33.3%;
    }
`;

const WeekContent = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    height: 100%;

    h2 {
        font-size: 1.1em;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }

    ${widthMedia.phone} {
        margin-bottom: 1.2em;
    }
`;

const TopArea = styled.article`
    display: flex;
    border-bottom: 1px dashed;
    margin-bottom: 2em;
    padding-bottom: 3em;
    box-sizing: border-box;
`;

const Article = styled.article`
    display: flex;
    margin-left: 1em;
    box-sizing: border-box;
    align-items: center;
    span {
        display: flex;
        align-items: end;
    }
`;

const DayTitle = styled.div<{ active: boolean }>`
    display: flex;
    color: ${props => (props.active ? props.theme.colors.compassActive : props.theme.colors.gray)};
    font-weight: ${props => props.active && `600`};
    padding-left: 0.5em;
    align-items: center;
    padding-top: 0.3em;
    padding-bottom: 0.3em;

    box-sizing: border-box;
    span {
        margin-right: 5px;
    }
`;

const WeekTitle = styled.div`
    display: flex;
    padding-left: 0.5em;
    align-items: center;
    padding-top: 0.4em;
    padding-bottom: 0.4em;
    span {
        margin-left: 5px;
        font-weight: 600;
    }
`;

const ContentsInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-basis: 70%;

    box-sizing: border-box;
    ${widthMedia.phone} {
        flex-direction: column;
    }
`;

const InnerContents = styled.div`
    background: ${props => props.theme.colors.mainInner};
    padding: 1em;
    border-radius: 1em;
    box-sizing: border-box;
`;

const WeekContents = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-basis: 50%;
    height: 100%;

    ${widthMedia.desktop} {
        flex-basis: 66.6%;
    }

    ${widthMedia.tablet} {
        width: 100%;
        margin-top: 2em;
    }

    ${widthMedia.phone} {
        flex-direction: column;
        margin-top: 0em;
    }
`;

const GoTodoButton = styled(Button)`
    a {
        text-decoration: none;
    }
    &:hover {
        span > a {
            color: ${props => props.theme.colors.main};
        }
    }
`;

const ContentsInnerRight = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 30%;
    justify-content: center;

    ${widthMedia.desktop} {
        align-self: center;
        width: 80%;
        justify-content: center;
        margin-top: 3em;
    }

    & > span {
        text-align: center;
    }
`;

const GoTodo = styled.span`
    cursor: pointer;
    border: 1px solid ${props => props.theme.colors.text};
    padding: 0.8em 3em 0.8em 3em;
`;
export default Main;

export const getStaticProps: GetStaticProps = async () => {
    const { abyss, guardian } = await getWeeklyContents();

    if (!abyss || !guardian) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            abyss,
            guardian,
        },
    };
};
