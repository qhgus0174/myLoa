import React from 'react';
import styled from '@emotion/styled';
import { FlexArticle } from '@style/common';

interface IWeekSum {
    title: string;
    common: number;
    personal: number;
}

const WeekSum = ({ title, common, personal }: IWeekSum) => {
    return (
        <Container direction="column">
            <h3>{title}</h3>
            <div>
                <div>총 계 : {(common + personal).toLocaleString()}</div>
                <div>공통 합 : {common.toLocaleString()}</div>
                <div>개인별 합 : {personal.toLocaleString()}</div>
            </div>
        </Container>
    );
};

const Container = styled(FlexArticle)``;

export default WeekSum;
