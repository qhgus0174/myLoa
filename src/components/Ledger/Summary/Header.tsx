import React from 'react';
import IconLabel from '@components/Label/IconLabel';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import Button from '@components/Button/Button';

interface ISummary {
    title: string;
    rightButton?: JSX.Element;
    rightDynamic?: {
        button?: JSX.Element;
        visible?: boolean;
        onclick: () => void;
    };
}

const SummaryHeader = ({ title, rightButton, rightDynamic }: ISummary) => {
    return (
        <Container>
            <Header>
                <Title>
                    <IconLabel
                        label={<h1>{title}</h1>}
                        iconUrl="/static/img/icon/mococo/yeah.png"
                        width="24"
                        height="24"
                    />
                    {rightButton && rightButton}
                </Title>
                {rightDynamic && (
                    <RightTitle visible={rightDynamic.visible!}>
                        <Button onClick={rightDynamic.onclick}>새로고침</Button>
                    </RightTitle>
                )}
            </Header>
        </Container>
    );
};

const Container = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1em;
`;

const RightTitle = styled.div<{ visible: boolean }>`
    display: ${props => (props.visible ? `flex` : `none`)};
    justify-content: flex-end;
    width: 120px;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    button {
        margin-left: 1em;
    }

    ${widthMedia.mediumDesktop} {
        flex-basis: 30%;
    }

    ${widthMedia.desktop} {
        flex-basis: 30%;
    }

    ${widthMedia.smallDesktop} {
        flex-basis: 35%;
    }

    ${widthMedia.tablet} {
        flex-basis: 45%;
    }

    ${widthMedia.phone} {
        flex-basis: 100%;
        justify-content: space-between;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
`;

export default SummaryHeader;
