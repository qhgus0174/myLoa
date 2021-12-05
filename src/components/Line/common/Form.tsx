import React from 'react';
import { CompactPicker, ColorResult } from 'react-color';
import { FormArticleContainer, ContentsArticleTitle, ContentsArticle } from '@style/common/modal';
import { FlexArticle } from '@style/common';

interface ICharacter {
    color: string;
    setColor: (e: string) => void;
}

const LineForm = ({ color, setColor }: ICharacter) => {
    return (
        <FormArticleContainer>
            <FlexArticle direction="column">
                <ContentsArticleTitle>색상</ContentsArticleTitle>
                <ContentsArticle>
                    <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                </ContentsArticle>
            </FlexArticle>
        </FormArticleContainer>
    );
};

export default LineForm;
