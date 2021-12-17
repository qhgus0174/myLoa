import React, { useContext, useState } from 'react';
import DayContents from '@components/Contents/DayContents';
import WeeklyContents from '@components/Contents/WeeklyContents';
import { SpinnerContext } from '@context/SpinnerContext';
import styled from '@emotion/styled';

const Main = () => {
    return (
        <Container>
            <DayContents /> <WeeklyContents />
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    width: 80%;
    height: 100%;
    padding: 1em;
    margin: 1em;
    border: 1px solid;
`;

export default Main;
