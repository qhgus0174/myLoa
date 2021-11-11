import React from 'react';
import { ColorResult, CompactPicker } from 'react-color';
import TextBox from '@components/Input/TextBox';
import RadioButton from '@components/Input/Radio';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from '@common/types';
import styled from '@emotion/styled';
import { ContentsDiv, ContentsDivTitle, FormDivContainer } from '@style/common/modal';
import { FlexDiv } from '@style/common';
import { css, useTheme } from '@emotion/react';

interface ITodo {
    type: ScheduleType;
    contents: ScheduleContents;
    color: string;
    detailName: string[];
    setColor: (e: string) => void;
    setType: (e: ScheduleType) => void;
    setContents: (e: ScheduleContents) => void;
    setCheckType: (e: ScheduleCheckType) => void;
    bindName: any;
    settingName: (e: any) => void;
    onChangeDetailName: (o: string[], e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
}

const TodoForm = ({
    type,
    contents,
    color,
    detailName,
    setColor,
    setType,
    setContents,
    setCheckType,
    bindName,
    settingName,
    onChangeDetailName,
}: ITodo) => {
    const theme = useTheme();
    return (
        <FormDivContainer>
            <FlexDiv direction="column">
                <ContentsDivTitle>숙제 유형</ContentsDivTitle>
                <ContentsDivs>
                    <ContentsDiv>
                        <SmallTitleDiv>체크박스형</SmallTitleDiv>
                        <RadioButton
                            text="일일"
                            name="type"
                            value="daily"
                            onChange={() => {
                                setType('daily');
                                setContents('chaos');
                                setCheckType('check');
                                settingName('카던');
                            }}
                            checked={type === 'daily'}
                        />
                        <RadioButton
                            text="주간"
                            name="type"
                            value="weekly"
                            onChange={() => {
                                setType('weekly');
                                setContents('none');
                                setCheckType('check');
                                settingName('');
                            }}
                            checked={type === 'weekly'}
                        />
                    </ContentsDiv>
                    <ContentsDiv>
                        <SmallTitleDiv>텍스트형</SmallTitleDiv>
                        <RadioButton
                            text="텍스트"
                            name="type"
                            value="other"
                            onChange={() => {
                                setType('other');
                                setContents('none');
                                setCheckType('text');

                                settingName('');
                            }}
                            checked={type === 'other'}
                        />
                    </ContentsDiv>
                </ContentsDivs>
            </FlexDiv>
            {type === 'daily' && (
                <FlexDiv direction="column">
                    <ContentsDivTitle>컨텐츠</ContentsDivTitle>
                    <ContentsDivs>
                        <ContentsDiv>
                            <SmallTitleDiv>특수</SmallTitleDiv>
                            <RadioButton
                                text="카던"
                                name="contents"
                                value="chaos"
                                onChange={() => {
                                    setContents('chaos');
                                    settingName('카던');
                                }}
                                checked={contents === 'chaos'}
                            />
                            <RadioButton
                                text="가디언"
                                name="contents"
                                value="guardian"
                                onChange={() => {
                                    setContents('guardian');
                                    settingName('가디언');
                                }}
                                checked={contents === 'guardian'}
                            />
                            <RadioButton
                                text="에포나"
                                name="contents"
                                value="epona"
                                onClick={() => settingName('에포나')}
                                onChange={() => {
                                    setContents('epona');
                                    settingName('에포나');
                                }}
                                checked={contents === 'epona'}
                            />
                        </ContentsDiv>
                        <ContentsDiv>
                            <SmallTitleDiv>일반</SmallTitleDiv>
                            <RadioButton
                                text="초기화 O"
                                name="contents"
                                value="basicReset"
                                onChange={() => {
                                    setContents('basicReset');
                                    settingName('');
                                }}
                                checked={contents === 'basicReset'}
                            />
                            <RadioButton
                                text="초기화 X"
                                name="contents"
                                value="basic"
                                onChange={() => {
                                    setContents('basic');
                                    settingName('');
                                }}
                                checked={contents === 'basic'}
                            />
                        </ContentsDiv>
                    </ContentsDivs>
                </FlexDiv>
            )}
            <FlexDiv direction="column">
                <ContentsDivTitle>숙제 명</ContentsDivTitle>
                {contents === 'epona' ? (
                    <EponaContentsDiv>
                        {detailName.map((names: string, nameIdx: number, oriArr: string[]) => {
                            return (
                                <TextBox
                                    key={`names_${nameIdx}`}
                                    width="60"
                                    placeholder={`에포나명${nameIdx + 1}`}
                                    value={names}
                                    onChange={e => onChangeDetailName(oriArr, e, nameIdx)}
                                />
                            );
                        })}
                    </EponaContentsDiv>
                ) : (
                    <ContentsDiv>
                        <TextBox width="100" placeholder="숙제 이름 입력 (e.g. 비아키스)" {...bindName} />
                    </ContentsDiv>
                )}
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

const SmallTitleDiv = styled.div`
    font-weight: 400;
    margin-left: 0.7em;
    margin-right: 0.5em;
`;

const ContentsDivs = styled.div`
    background: ${props => props.theme.colors.mainDark};
    padding: 0.5em;
    border-radius: 1em;
`;

const EponaContentsDiv = styled(FlexDiv)``;

export default TodoForm;
