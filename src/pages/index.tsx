import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SpinnerContext } from '@context/SpinnerContext';
import { getDayContents, getWeeklyContents } from '@common/getCommonData';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import EmojiTitle from '@components/Emoji/EmojiTitle';
import Button from '@components/Button/Button';
import { widthMedia } from '@style/device';
import { NextSeo } from 'next-seo';

const Main = () => {
    const [fieldBoss, setFieldBoss] = useState<boolean>(false);
    const [ghost, setGhost] = useState<boolean>(false);
    const [chaosGate, setChaosGate] = useState<boolean>(false);
    const [guardian, setGuardian] = useState<string[]>([]);
    const [abyss, setAbyss] = useState<string[]>([]);

    const { setSpinnerVisible } = useContext(SpinnerContext);

    useEffect(() => {
        const { fieldBoss, ghost, chaosGate } = getDayContents();

        setFieldBoss(fieldBoss);
        setGhost(ghost);
        setChaosGate(chaosGate);

        const getWeekly = async () => {
            try {
                setSpinnerVisible(true);
                const { abyss, guardian } = await getWeeklyContents();
                setGuardian(guardian);
                setAbyss(abyss);
            } catch {
            } finally {
                setSpinnerVisible(false);
            }
        };

        getWeekly();
    }, []);

    return (
        <Container>
            <NextSeo
                title="로요일좋아"
                description="로스트 아크 유틸 모음 페이지입니다! 내 캐릭터 골드 수입 확인도 하고 일일, 주간 숙제를 편하게 체크해보세요."
                openGraph={{
                    title: '로요일좋아',
                    description:
                        '로스트 아크 유틸 모음 페이지입니다! 내 캐릭터 골드 수입 확인도 하고 일일, 주간 숙제를 편하게 체크해보세요.',
                    url: 'https://loa-day.com/todo',
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
            <TopArea>
                <TextDiv>
                    <span>
                        더 이상 숙제 관리를 엑셀로 하지마세요😵
                        <br />
                        로요일좋아를 통해 로스트아크 일일, 주간 숙제 관리를 편하게 하세요!😎
                    </span>
                    <Link href="/todo">
                        <Button>숙제 관리 바로가기</Button>
                    </Link>
                </TextDiv>
            </TopArea>
            <ContentsDiv>
                <EmojiTitle label={<h1>이번주 일정</h1>} symbol={'📅'} />
                <ContentsInner>
                    <Contents>
                        <EmojiTitle label={<h2>일일 컨텐츠</h2>} symbol={'⏰'} />
                        <InnerContents>
                            <Article>
                                <span> {fieldBoss ? '⭕' : '❌'}</span>
                                <DayTitle active={fieldBoss}>
                                    <span>필드 보스</span>
                                    <Image src="/static/img/lostark/contents/fieldboss.png" width="20" height="20" />
                                </DayTitle>
                            </Article>
                            <Article>
                                <span> {ghost ? '⭕' : '❌'}</span>
                                <DayTitle active={ghost}>
                                    <span>유령선</span>
                                    <Image src="/static/img/lostark/contents/ghost.png" width="20" height="20" />
                                </DayTitle>
                            </Article>
                            <Article>
                                <span> {chaosGate ? '⭕' : '❌'}</span>
                                <DayTitle active={chaosGate}>
                                    <span>카오스 게이트</span>
                                    <Image src="/static/img/lostark/contents/choasgate.png" width="20" height="20" />
                                </DayTitle>
                            </Article>
                        </InnerContents>
                    </Contents>
                    <WeekContents>
                        <WeekContent>
                            <h2>
                                <Image src="/static/img/lostark/contents/guardian.png" width="24" height="24" />
                                도전 가디언 토벌
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
                        <WeekContent>
                            <h2>
                                <Image src="/static/img/lostark/contents/abyss.png" width="24" height="24" /> 도전
                                어비스 던전
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
                    </WeekContents>
                </ContentsInner>
            </ContentsDiv>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 80%;
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

const Contents = styled.div`
    display: flex;
    flex-basis: 25%;
    flex-direction: column;
    align-items: center;
    height: 100%;
    box-sizing: border-box;

    h2 {
        font-size: 1.1em;
        margin-top: 10px;
        margin-bottom: 10px;
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

    box-sizing: border-box;
    ${widthMedia.tablet} {
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
        flex-basis: 57%;
        width: 100%;
        margin-top: 2em;
    }

    ${widthMedia.phone} {
        flex-direction: column;
    }
`;

export default Main;
