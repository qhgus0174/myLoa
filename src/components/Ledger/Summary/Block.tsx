import React from 'react';
import IconLabel from '@components/Label/IconLabel';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';
import { Comment } from '@style/common/text';

interface IBlock {
    title: string;
    iconUrl: string;
    body: JSX.Element;
    rightButton?: JSX.Element;
    comment?: string;
}

const Block = ({ title, iconUrl, body, rightButton, comment }: IBlock) => {
    return (
        <Container>
            <Header>
                <IconLabel label={<h2>{title}</h2>} iconUrl={iconUrl} width="24" height="24" />
                {rightButton}
            </Header>
            <Body>{body}</Body>
            {comment && <Comment>* 골드 수입만 계산 된 값 입니다.</Comment>}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px dashed ${props => props.theme.colors.text};
    padding: 1.5em;
    margin-left: 1.5em;
    margin-right: 1.5em;
    box-sizing: border-box;
    height: 100%;

    ${widthMedia.tablet} {
        margin-bottom: 2em;
        padding-bottom: 2em;
    }

    ${widthMedia.phone} {
        margin: 0;
        padding: 1em;
        margin-bottom: 10px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
`;

const Body = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 1em;
    margin-bottom: 0.5em;
    width: 100%;
`;

export default Block;
