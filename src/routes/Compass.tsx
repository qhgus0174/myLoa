import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { DateTime } from 'luxon';
import { CompassInfo } from '@common/compass';
import { widthMedia } from '@style/device';

const Compass = () => {
    useEffect(() => {
        getCompass();
    }, []);

    const [fieldBoss, setFieldBoss] = useState<boolean>(false);
    const [ghost, setGhost] = useState<boolean>(false);
    const [chaosGate, setChaosGate] = useState<boolean>(false);

    const getCompass = () => {
        const dayOfWeek = Number(DateTime.now().toFormat('c'));
        const hour = Number(DateTime.now().toFormat('H'));
        const calcDayOfWeek = hour > 5 ? dayOfWeek - 1 : dayOfWeek - 2;

        const { ghost, chaosGate, fieldBoss } = CompassInfo;

        fieldBoss[calcDayOfWeek] === 1 && setFieldBoss(true);
        ghost[calcDayOfWeek] === 1 && setGhost(true);
        chaosGate[calcDayOfWeek] === 1 && setChaosGate(true);
    };

    return (
        <CompassContainer>
            <CompassDiv active={fieldBoss}>
                <span>필드 보스</span>
                <span> : {fieldBoss ? 'O' : 'X'}</span>
            </CompassDiv>
            <CompassDiv active={ghost}>
                <span>유령선</span>
                <span> : {ghost ? 'O' : 'X'}</span>
            </CompassDiv>
            <CompassDiv active={chaosGate}>
                <span>카오스 게이트</span>
                <span> : {chaosGate ? 'O' : 'X'}</span>
            </CompassDiv>
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

const CompassDiv = styled.span<{ active: boolean }>`
    span {
        color: ${props => (props.active ? props.theme.colors.compassActive : props.theme.colors.gray)};
        ${props => props.active && `font-weight:600;`}
    }

    ${widthMedia.phone} {
        span:nth-of-type(2) {
            display: none;
        }
    }
`;

export default Compass;
