import React from 'react';
import { IRaid } from '@common/types/localStorage/Raid';
import styled from '@emotion/styled';
import { FlexDiv, FlexLeftDiv } from '@style/common';
import IconLabel from '@components/Label/IconLabel';

interface ICheckbox {
    raid: IRaid;
}

const CheckboxText = ({ raid }: ICheckbox) => {
    return (
        <Container>
            <Article>
                <FlexDiv basis="10"></FlexDiv>
                <RealText basis="80" color={raid.color}>
                    <IconLabel label={raid.name} iconUrl={raid.imgurl} />
                </RealText>
                <FlexDiv basis="10"></FlexDiv>
            </Article>
        </Container>
    );
};

const RealText = styled(FlexDiv)`
    color: ${props => props.color};
    justify-content: center;
    padding: 10px;
`;

const Container = styled(FlexLeftDiv)`
    width: 100%;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        transition: 200ms ease;
        background: ${props => props.theme.colors.hover};
    }
`;

const Article = styled(FlexDiv)`
    width: 100%;
    height: 100%;
    flex-basis: 100%;
    align-items: center;
    justify-content: center;
`;

export default CheckboxText;
