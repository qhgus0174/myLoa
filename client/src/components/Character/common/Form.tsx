import React from 'react';
import { CompactPicker, ColorResult } from 'react-color';
import TextBox from '@components/Input/TextBox';
import styled from '@emotion/styled';
import { FlexDiv, RemarkDiv } from '@style/common';
import { FormDivContainer, ContentsDivTitle, ContentsDiv } from '@style/common/modal';

interface ICharacter {
    color: string;
    name: string;
    setColor: (e: string) => void;
    setName: (e: string) => void;
}

const CharacterForm = ({ color, setColor, name, setName }: ICharacter) => {
    return (
        <FormDivContainer>
            <RemarkDiv>* 로스트아크 서버 점검 시간에는 캐릭터 정보를 불러올 수 없습니다.</RemarkDiv>
            <CharacterFormDiv direction="column">
                <ContentsDivTitle>캐릭터명</ContentsDivTitle>
                <ContentsDiv>
                    <TextBox value={name} onChange={e => setName(e.target.value)} />
                </ContentsDiv>
            </CharacterFormDiv>

            <CharacterFormDiv direction="column">
                <ContentsDivTitle>색상</ContentsDivTitle>
                <ContentsDiv>
                    <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                </ContentsDiv>
            </CharacterFormDiv>
        </FormDivContainer>
    );
};

const CharacterFormDiv = styled(FlexDiv)`
    margin-bottom: 2em;
`;

export default CharacterForm;
