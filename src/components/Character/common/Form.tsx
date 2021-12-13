import React from 'react';
import { CompactPicker, ColorResult } from 'react-color';
import TextBox from '@components/Input/TextBox';
import styled from '@emotion/styled';
import { FlexDiv, RemarkDiv } from '@style/common';
import { ContentContainer, Title, Contents, ContentArticle } from '@style/common/modal';

interface ICharacter {
    color: string;
    name: string;
    setColor: (e: string) => void;
    setName: (e: string) => void;
}

const CharacterForm = ({ color, setColor, name, setName }: ICharacter) => {
    return (
        <ContentContainer>
            <RemarkDiv>* 로스트아크 서버 점검 시간에는 캐릭터 정보를 불러올 수 없습니다.</RemarkDiv>
            <ContentArticle>
                <Title>캐릭터명</Title>
                <Contents>
                    <TextBox value={name} onChange={e => setName(e.target.value)} />
                </Contents>
            </ContentArticle>

            <ContentArticle>
                <Title>색상</Title>
                <Contents>
                    <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                </Contents>
            </ContentArticle>
        </ContentContainer>
    );
};

export default CharacterForm;
