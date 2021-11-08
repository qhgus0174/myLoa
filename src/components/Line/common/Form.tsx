import React from 'react';
import { CompactPicker, ColorResult } from 'react-color';
import { FormDivContainer, ContentsDivTitle, ContentsDiv } from '@style/common/modal';
import { FlexDiv } from '@style/common';

interface ICharacter {
    color: string;
    setColor: (e: string) => void;
}

const LineForm = ({ color, setColor }: ICharacter) => {
    return (
        <FormDivContainer>
            <FlexDiv direction="column" basis="90">
                <ContentsDivTitle>색상</ContentsDivTitle>
                <ContentsDiv>
                    <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                </ContentsDiv>
            </FlexDiv>
        </FormDivContainer>
    );
};

export default LineForm;
