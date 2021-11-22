import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerContext } from '@context/SpinnerContext';
import { IResponse, IWeeklyContents } from '@common/responseType';
import { weeklyGuardian } from '@common/data/weeklyGuardian';
import { weeklyAbyss } from '@common/data/weeklyAbyss';
import styled from '@emotion/styled';
import { ContentsDivTitle, ContentsInnerDiv, FormContainer, FormDivContainer } from '@style/common/modal';
import { FlexDiv } from '@style/common';

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

        setGuardian([
            weeklyGuardian[guardianIndex],
            weeklyGuardian[guardianIndex + 1],
            weeklyGuardian[guardianIndex + 2],
        ]);
        setAbyss([weeklyAbyss[abyssIndex][0], weeklyAbyss[abyssIndex][1]]);
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
            <FormDivContainer>
                {guardian.length > 0 && (
                    <GuardianDiv>
                        <ContentsDivTitle>도전 가디언 토벌</ContentsDivTitle>
                        <ContentsInnerDiv>
                            {guardian.map(name => {
                                return <ContentsDiv>🔹 {name}</ContentsDiv>;
                            })}
                        </ContentsInnerDiv>
                    </GuardianDiv>
                )}
                {abyss.length > 0 && (
                    <AbyssDiv>
                        <ContentsDivTitle>도전 도비스 던전</ContentsDivTitle>
                        <ContentsInnerDiv>
                            {abyss.map(name => {
                                return <ContentsDiv>🔹 {name}</ContentsDiv>;
                            })}
                        </ContentsInnerDiv>
                    </AbyssDiv>
                )}
            </FormDivContainer>
        </FormContainer>
    );
};

const GuardianDiv = styled(FlexDiv)`
    flex-direction: column;
`;

const AbyssDiv = styled(FlexDiv)`
    flex-direction: column;
`;

const ContentsDiv = styled.div`
    line-height: 2.5rem;
    padding-left: 0.8em;
`;

export default WeeklyContents;
