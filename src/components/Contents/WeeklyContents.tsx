import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerContext } from '@context/SpinnerContext';
import { IWeeklyContents } from '@common/types/response/weeklyContents';
import { IResponse } from '@common/types/response';
import { weeklyGuardian } from '@common/data/weeklyGuardian';
import { weeklyAbyss } from '@common/data/weeklyAbyss';
import styled from '@emotion/styled';
import { Title, InnerContent, Container, ContentContainer } from '@style/common/modal';

const WeeklyContents = () => {
    const [guardian, setGuardian] = useState<string[]>([]);
    const [abyss, setAbyss] = useState<string[]>([]);

    const { setSpinnerVisible } = useContext(SpinnerContext);

    const setData = async () => {
        const {
            result: { guardian, abyss },
        } = (await (
            await axios.get(`/api/weeklyContents`)
        ).data) as IResponse<IWeeklyContents>;

        const guardianIndex = Number(guardian);
        const abyssIndex = Number(abyss);

        const guardianLength = weeklyGuardian.length;
        const secondIndex = guardianIndex + 1;
        const thirdIndex = guardianIndex + 2;

        setGuardian([
            weeklyGuardian[guardianIndex],
            weeklyGuardian[calcIndex(secondIndex, guardianLength)],
            weeklyGuardian[calcIndex(thirdIndex, guardianLength)],
        ]);
        setAbyss([weeklyAbyss[abyssIndex][0], weeklyAbyss[abyssIndex][1]]);
    };

    const calcIndex = (index: number, length: number): number => {
        return index >= length ? index - length : index;
    };

    useEffect(() => {
        const getWeekly = async () => {
            try {
                setSpinnerVisible(true);
                await setData();
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
                        <Title>도전 가디언 토벌</Title>
                        <InnerContent>
                            {guardian.map((name, guardianIndex) => {
                                return <Contents key={guardianIndex}>🔹 {name}</Contents>;
                            })}
                        </InnerContent>
                    </Article>
                )}
                {abyss.length > 0 && (
                    <Article>
                        <Title>도전 어비스 던전</Title>
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
