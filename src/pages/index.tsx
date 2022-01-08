import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import IconLabel from '@components/Label/IconLabel';
import { getWeeklyContents, IWeeklyContents } from '@common/getCommonData';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

const Main = ({ abyss, guardian }: IWeeklyContents) => {
    return (
        <Container>
            <Head>
                <title>로요일좋아 - 로스트아크 유틸 모음</title>
                <meta
                    name="description"
                    content="로스트 아크 유틸 모음 페이지입니다. 로요일을 기다리면서 숙제 체크와 골드 가계부를 작성해보세요!"
                />
            </Head>
            <TopArea>
                <TextDiv>
                    <Image alt="로요일좋아 로고" src="/static/img/logo/logo.png" width="350" height="140" />
                    <br />
                    <ExplainText>로요일을 기다리면서 숙제 체크와 골드 가계부를 작성해보세요!</ExplainText>
                    <br />
                    <GoTodoButtons>
                        <Link href="/todo">
                            <GoTodo>
                                <IconLabel
                                    label={<h3>숙제 관리</h3>}
                                    iconUrl="/static/img/icon/mococo/jump.png"
                                    width="30"
                                    height="30"
                                />
                            </GoTodo>
                        </Link>
                        <Link href="/ledger">
                            <GoTodo>
                                <IconLabel
                                    label={<h3>골드 가계부 작성</h3>}
                                    iconUrl="/static/img/icon/mococo/jump.png"
                                    width="30"
                                    height="30"
                                />
                            </GoTodo>
                        </Link>
                    </GoTodoButtons>
                </TextDiv>
            </TopArea>
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
        margin-bottom: 1em;
    }
`;

const TopArea = styled.article`
    display: flex;
    margin-bottom: 2em;
    padding-bottom: 3em;
    box-sizing: border-box;
`;

const GoTodo = styled.span`
    cursor: pointer;
    border: 1px solid ${props => props.theme.colors.text};
    padding: 0.8em 3em 0.8em 3em;
`;

const GoTodoButtons = styled.article`
    width: 100%;
    display: flex;
    justify-content: center;
    span:nth-of-type(1) {
        margin-right: 1em;
    }

    ${widthMedia.phone} {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-self: center;
        span:nth-of-type(1) {
            margin-right: 0;
            margin-bottom: 1em;
        }
    }
`;

const ExplainText = styled.span`
    font-weight: 600;
    font-size: 1.4em;
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
