import React from 'react';
import { CompactPicker, ColorResult } from 'react-color';
import { ContentContainer, Title, Contents } from '@style/common/modal';
import { FlexDiv } from '@style/common/layout/common';

interface ICharacter {
    color: string;
    setColor: (e: string) => void;
}

const LineForm = ({ color, setColor }: ICharacter) => {
    return (
        <ContentContainer>
            <FlexDiv direction="column">
                <Title>색상</Title>
                <Contents>
                    <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                </Contents>
            </FlexDiv>
        </ContentContainer>
    );
};

export default LineForm;
