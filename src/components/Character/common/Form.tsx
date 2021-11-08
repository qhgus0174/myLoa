import React from 'react';
import TextBox from '@components/Input/TextBox';
import { FlexDiv } from '@style/common';
import { FormDivContainer, ContentsDivTitle, ContentsDiv } from '@style/common/modal';
import { CompactPicker, ColorResult } from 'react-color';

interface ICharacter {
    color: string;
    setColor: (e: string) => void;
    bindName: any;
}

const CharacterForm = ({ color, setColor, bindName }: ICharacter) => {
    return (
        <FormDivContainer>
            <FlexDiv direction="column">
                <ContentsDivTitle>캐릭터명</ContentsDivTitle>
                <ContentsDiv>
                    <TextBox {...bindName} />
                </ContentsDiv>
            </FlexDiv>

            <FlexDiv direction="column">
                <ContentsDivTitle>색상</ContentsDivTitle>
                <ContentsDiv>
                    <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                </ContentsDiv>
            </FlexDiv>
        </FormDivContainer>
    );
};

export default CharacterForm;
