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
        const dayOfWeek = Number(DateTime.now().toFormat('c')) - 1;
        const hour = Number(DateTime.now().toFormat('H'));

        const { ghost, chaosGate, fieldBoss } = CompassInfo;

        if (hour > 5) {
            fieldBoss[dayOfWeek] === 1 && setFieldBoss(true);
            ghost[dayOfWeek] === 1 && setGhost(true);
            chaosGate[dayOfWeek] === 1 && setChaosGate(true);
        }
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

    ${widthMedia.desktop} {
        flex-direction: column;
    }

    ${widthMedia.phone} {
        width: 100%;
    }
`;

const CompassDiv = styled.span<{ active: boolean }>`
    span {
        color: ${props => (props.active ? '#51C2D5' : props.theme.colors.translucent)};
    }

    ${widthMedia.phone} {
        span:nth-of-type(2) {
            display: none;
        }
    }
`;

export default Compass;
