import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { CompassInfo } from '@common/data/compass';
import styled from '@emotion/styled';
import { InnerContent } from '@style/common/modal';
import Image from 'next/image';
import { getDayContents } from '@common/getCommonData';

const DayContents = () => {
    const [fieldBoss, setFieldBoss] = useState<boolean>(false);
    const [ghost, setGhost] = useState<boolean>(false);
    const [chaosGate, setChaosGate] = useState<boolean>(false);

    useEffect(() => {
        const { fieldBoss, ghost, chaosGate } = getDayContents();

        setFieldBoss(fieldBoss);
        setGhost(ghost);
        setChaosGate(chaosGate);
    }, []);

    return (
        <Container>
            <Article>
                <span> {fieldBoss ? '⭕' : '❌'}</span>
                <TextDiv active={fieldBoss}>
                    <span>필드 보스</span>
                    <Image src="/static/img/lostark/contents/fieldboss.png" width="20" height="20" />
                </TextDiv>
            </Article>
            <Article>
                <span> {ghost ? '⭕' : '❌'}</span>
                <TextDiv active={ghost}>
                    <span>유령선</span>
                    <Image src="/static/img/lostark/contents/ghost.png" width="20" height="20" />
                </TextDiv>
            </Article>
            <Article>
                <span> {chaosGate ? '⭕' : '❌'}</span>
                <TextDiv active={chaosGate}>
                    <span>카오스 게이트</span>
                    <Image src="/static/img/lostark/contents/choasgate.png" width="20" height="20" />
                </TextDiv>
            </Article>
        </Container>
    );
};

const Container = styled(InnerContent)`
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: space-evenly;
`;

const Article = styled.article`
    display: flex;
    margin-left: 1em;
    span {
        display: flex;
        align-items: end;
    }
`;

const TextDiv = styled.div<{ active: boolean }>`
    display: flex;
    color: ${props => (props.active ? props.theme.colors.compassActive : props.theme.colors.gray)};
    font-weight: ${props => props.active && `600`};
    padding-left: 0.5em;
    align-items: center;

    span {
        margin-right: 5px;
    }
`;

export default DayContents;
