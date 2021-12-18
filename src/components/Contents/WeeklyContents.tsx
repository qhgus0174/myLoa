import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerContext } from '@context/SpinnerContext';
import { IWeeklyContents } from '@common/types/response/contents/weekly';
import { IResponse } from '@common/types/response';
import { weeklyGuardian } from '@common/data/weeklyGuardian';
import { weeklyAbyss } from '@common/data/weeklyAbyss';
import styled from '@emotion/styled';
import { Title, InnerContent, Container, ContentContainer } from '@style/common/modal';
import { getWeekContents } from '@apis/contents/weekly';
import Image from 'next/image';
import { getWeeklyContents } from '@common/getCommonData';

const WeeklyContents = () => {
    const [guardian, setGuardian] = useState<string[]>([]);
    const [abyss, setAbyss] = useState<string[]>([]);

    const { setSpinnerVisible } = useContext(SpinnerContext);

    useEffect(() => {
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
            <ContentContainer>
                {guardian.length > 0 && (
                    <Article>
                        <Title>
                            <Image src="/static/img/lostark/contents/guardian.png" width="24" height="24" />
                            <span>도전 가디언 토벌</span>
                        </Title>
                        <InnerContent>
                            {guardian.map((name, guardianIndex) => {
                                return <Contents key={guardianIndex}>🔹 {name}</Contents>;
                            })}
                        </InnerContent>
                    </Article>
                )}
                {abyss.length > 0 && (
                    <Article>
                        <Title>
                            <Image src="/static/img/lostark/contents/abyss.png" width="24" height="24" />
                            <span>도전 어비스 던전</span>
                        </Title>
                        <InnerContent>
                            {abyss.map((name, abyssIndex) => {
                                return <Contents key={abyssIndex}>🔹 {name}</Contents>;
                            })}
                        </InnerContent>
                    </Article>
                )}
            </ContentContainer>
        </Container>
    );
};

const Article = styled.article`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5em;
`;

const Contents = styled.article`
    line-height: 2.5rem;
    padding-left: 0.8em;
`;

export default WeeklyContents;
