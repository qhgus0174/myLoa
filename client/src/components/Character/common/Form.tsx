import React from 'react';
import { CompactPicker, ColorResult } from 'react-color';
import TextBox from '@components/Input/TextBox';
import styled from '@emotion/styled';
import { FlexArticle, RemarkArticle } from '@style/common';
import { FormArticleContainer, ContentsArticleTitle, ContentsArticle } from '@style/common/modal';

interface ICharacter {
    color: string;
    name: string;
    setColor: (e: string) => void;
    setName: (e: string) => void;
}

const CharacterForm = ({ color, setColor, name, setName }: ICharacter) => {
    return (
        <FormArticleContainer>
            <RemarkArticle>* 로스트아크 서버 점검 시간에는 캐릭터 정보를 불러올 수 없습니다.</RemarkArticle>
            <CharacterFormArticle direction="column">
                <ContentsArticleTitle>캐릭터명</ContentsArticleTitle>
                <ContentsArticle>
                    <TextBox value={name} onChange={e => setName(e.target.value)} />
                </ContentsArticle>
            </CharacterFormArticle>

            <CharacterFormArticle direction="column">
                <ContentsArticleTitle>색상</ContentsArticleTitle>
                <ContentsArticle>
                    <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                </ContentsArticle>
            </CharacterFormArticle>
        </FormArticleContainer>
    );
};

const CharacterFormArticle = styled(FlexArticle)`
    margin-bottom: 2em;
`;

export default CharacterForm;
