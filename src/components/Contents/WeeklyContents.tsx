import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerContext } from '@context/SpinnerContext';
import { IWeeklyContents } from '@common/types/response/weeklyContents';
import { IResponse } from '@common/types/response';
import { weeklyGuardian } from '@common/data/weeklyGuardian';
import { weeklyAbyss } from '@common/data/weeklyAbyss';
import styled from '@emotion/styled';
import { ContentsArticleTitle, ContentsInnerArticle, FormContainer, FormArticleContainer } from '@style/common/modal';
import { FlexArticle } from '@style/common';

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
        <FormContainer>
            <FormArticleContainer>
                {guardian.length > 0 && (
                    <GuardianArticle>
                        <ContentsArticleTitle>도전 가디언 토벌</ContentsArticleTitle>
                        <ContentsInnerArticle>
                            {guardian.map((name, guardianIndex) => {
                                return <ContentsArticle key={guardianIndex}>🔹 {name}</ContentsArticle>;
                            })}
                        </ContentsInnerArticle>
                    </GuardianArticle>
                )}
                {abyss.length > 0 && (
                    <AbyssArticle>
                        <ContentsArticleTitle>도전 어비스 던전</ContentsArticleTitle>
                        <ContentsInnerArticle>
                            {abyss.map((name, abyssIndex) => {
                                return <ContentsArticle key={abyssIndex}>🔹 {name}</ContentsArticle>;
                            })}
                        </ContentsInnerArticle>
                    </AbyssArticle>
                )}
            </FormArticleContainer>
        </FormContainer>
    );
};

const GuardianArticle = styled(FlexArticle)`
    flex-direction: column;
    margin-bottom: 1.5em;
`;

const AbyssArticle = styled(FlexArticle)`
    flex-direction: column;
`;

const ContentsArticle = styled.article`
    line-height: 2.5rem;
    padding-left: 0.8em;
`;

export default WeeklyContents;
