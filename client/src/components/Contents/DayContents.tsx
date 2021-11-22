import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { ModalActionContext } from '@context/ModalContext';
import { CompassInfo } from '@common/data/compass';
import styled from '@emotion/styled';
import { ContentsInnerDiv, FormContainer } from '@style/common/modal';

const DayContents = () => {
    const [fieldBoss, setFieldBoss] = useState<boolean>(false);
    const [ghost, setGhost] = useState<boolean>(false);
    const [chaosGate, setChaosGate] = useState<boolean>(false);

    const { closeModal } = useContext(ModalActionContext);

    useEffect(() => {
        getCompass();
    }, []);

    const getCompass = () => {
        const dayOfWeek = Number(DateTime.now().toFormat('c'));
        const hour = Number(DateTime.now().toFormat('H'));
        const calcDayOfWeek = hour > 5 ? dayOfWeek - 1 : dayOfWeek - 2 < 0 ? 0 : dayOfWeek - 2;

        const { ghost, chaosGate, fieldBoss } = CompassInfo;

        fieldBoss[calcDayOfWeek] === 1 && setFieldBoss(true);
        ghost[calcDayOfWeek] === 1 && setGhost(true);
        chaosGate[calcDayOfWeek] === 1 && setChaosGate(true);
    };

    return (
        <CompassContainer>
            <CompassDiv active={fieldBoss}>
                <span> {fieldBoss ? '⭕' : '❌'}</span>
                <span>필드 보스</span>
            </CompassDiv>
            <CompassDiv active={ghost}>
                <span> {ghost ? '⭕' : '❌'}</span>
                <span>유령선</span>
            </CompassDiv>
            <CompassDiv active={chaosGate}>
                <span> {chaosGate ? '⭕' : '❌'}</span>
                <span>카오스 게이트</span>
            </CompassDiv>
        </CompassContainer>
    );
};

const CompassContainer = styled(ContentsInnerDiv)`
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: space-evenly;
`;

const CompassDiv = styled.div<{ active: boolean }>`
    display: flex;
    margin-left: 1em;
    span:nth-of-type(2) {
        color: ${props => (props.active ? props.theme.colors.compassActive : props.theme.colors.gray)};
        font-weight: ${props => props.active && `600`};
        padding-left: 0.5em;
    }
`;

export default DayContents;
