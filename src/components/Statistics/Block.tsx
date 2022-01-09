import React from 'react';
import IconLabel from '@components/Label/IconLabel';
import styled from '@emotion/styled';
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
            {body}
            {comment && <Comment>* 골드 수입만 계산 된 값 입니다.</Comment>}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-basis: 45%;
    flex-direction: column;
    width: 100%;
    border: 1px dashed ${props => props.theme.colors.text};
    padding: 1em;
    margin-top: 1em;
    box-sizing: border-box;
`;

const Header = styled.div`
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
`;

export default Block;
