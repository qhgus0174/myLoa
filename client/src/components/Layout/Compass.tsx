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
            <Button className="selectDayContents" onClick={openDayContents}>
                🔎 일일 <ButtonInnerText>컨텐츠</ButtonInnerText>
            </Button>
            <Button className="selectWeeklyContents" onClick={openWeeklyContents}>
                🔎 주간 <ButtonInnerText>컨텐츠</ButtonInnerText>
            </Button>
        </CompassContainer>
    );
};

const CompassContainer = styled(FlexDiv)`
    align-items: center;
    justify-content: center;
    font-weight: 500;
    width: 80%;

    button:nth-of-type(2) {
        margin-left: 2em;
    }

    ${widthMedia.tablet} {
        flex-direction: column;
        button:nth-of-type(1) {
            margin-bottom: 0.5em;
        }
        button:nth-of-type(2) {
            margin-left: 0;
        }
    }

    ${widthMedia.phone} {
        width: 100%;
    }
`;

const ButtonInnerText = styled.span`
    ${widthMedia.phone} {
        display: none;
    }
`;

export default Compass;
