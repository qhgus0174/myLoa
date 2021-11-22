import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { widthMedia } from '@style/device';
import Button from '@components/Button/Button';
import { ModalActionContext } from '@context/ModalContext';
import DayContents from '@components/Contents/DayContents';
import WeeklyContents from '@components/Contents/WeeklyContents';

const Compass = () => {
    const { setModalProps } = useContext(ModalActionContext);

    const openDayContents = () => {
        setModalProps({
            isOpen: true,
            content: <DayContents />,
            options: { width: '300', height: '210', headerTitle: '일일 컨텐츠', isHeaderClose: true },
        });
    };

    const openWeeklyContents = () => {
        setModalProps({
            isOpen: true,
            content: <WeeklyContents />,
            options: { width: '400', height: '400', headerTitle: '주간 컨텐츠', isHeaderClose: true },
        });
    };

    return (
        <CompassContainer>
            <Button onClick={openDayContents}>🔎 일일 컨텐츠</Button>
            <Button onClick={openWeeklyContents}>🔎 주간 컨텐츠</Button>
        </CompassContainer>
    );
};

const CompassContainer = styled(FlexDiv)`
    align-items: center;
    width: 50%;
    justify-content: space-around;
    font-weight: 500;

    ${widthMedia.desktop} {
        flex-direction: column;
    }

    ${widthMedia.phone} {
        width: 100%;
    }
`;

export default Compass;
