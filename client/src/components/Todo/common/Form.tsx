import React, { useContext } from 'react';
import _ from 'lodash';
import { ColorResult, CompactPicker } from 'react-color';
import { LocalStorageStateContext } from '@context/LocalStorageContext';
import { getShowCheckTodo } from '@components/Todo/common/functions';
import { ICharacter } from '@components/Character/CharacterType';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import RadioButton from '@components/Input/Radio';
import TextBox from '@components/Input/TextBox';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from '@common/types';
import styled from '@emotion/styled';
import { ContentsArticle, ContentsArticleTitle, ContentsInnerArticle, FormArticleContainer } from '@style/common/modal';
import { FlexArticle } from '@style/common';

interface ITodo {
    type: ScheduleType;
    contents: ScheduleContents;
    color: string;
    showCharacterArr: number[];
    setColor: (e: string) => void;
    setType: (e: ScheduleType) => void;
    setContents: (e: ScheduleContents) => void;
    setCheckType: (e: ScheduleCheckType) => void;
    bindName: any;
    settingName: (e: any) => void;
    setShowCharacterArr: (e: number[]) => void;
}

const TodoForm = ({
    type,
    contents,
    color,
    showCharacterArr,
    setColor,
    setType,
    setContents,
    setCheckType,
    bindName,
    settingName,
    setShowCharacterArr,
}: ITodo) => {
    const { storedCharacter, storedCharacterOrd } = useContext(LocalStorageStateContext);

    return (
        <FormArticleContainer>
            <FormFlexArticle direction="column">
                <ContentsArticleTitle>숙제 유형</ContentsArticleTitle>
                <ContentsInnerArticle>
                    <ContentsArticle>
                        <SmallTitle>체크박스형</SmallTitle>
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
                    </ContentsArticle>
                    <ContentsArticle>
                        <SmallTitle>텍스트형</SmallTitle>
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
                    </ContentsArticle>
                </ContentsInnerArticle>
            </FormFlexArticle>
            {type === 'daily' && (
                <FormFlexArticle direction="column">
                    <ContentsArticleTitle>컨텐츠</ContentsArticleTitle>
                    <ContentsInnerArticle>
                        <ContentsArticle>
                            <SmallTitle>특수</SmallTitle>
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
                        </ContentsArticle>
                        <ContentsArticle>
                            <SmallTitle>일반</SmallTitle>
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
                        </ContentsArticle>
                    </ContentsInnerArticle>
                </FormFlexArticle>
            )}
            {storedCharacter.length > 0 && (
                <FormFlexArticle direction="column">
                    <ContentsArticleTitle>숙제 표시 할 캐릭터</ContentsArticleTitle>
                    <ContentsInnerArticle>
                        <ContentsCharacterArticle>
                            {storedCharacter
                                .sort((a: ICharacter, b: ICharacter) => {
                                    return storedCharacterOrd.indexOf(a.id) - storedCharacterOrd.indexOf(b.id);
                                })
                                .map((character: ICharacter, characterIndex: number) => {
                                    return (
                                        <ShowCharacterArticle key={`todo_show_${characterIndex}`}>
                                            <BasicCheckbox
                                                value={character.id}
                                                checked={showCharacterArr.includes(character.id)}
                                                onChange={e =>
                                                    setShowCharacterArr(
                                                        getShowCheckTodo(e, showCharacterArr, character.id),
                                                    )
                                                }
                                                label={character.name}
                                            />
                                        </ShowCharacterArticle>
                                    );
                                })}
                        </ContentsCharacterArticle>
                    </ContentsInnerArticle>
                </FormFlexArticle>
            )}

            <FormFlexArticle direction="column">
                <ContentsArticleTitle>숙제 명</ContentsArticleTitle>
                <ContentsArticle>
                    <TextBox width="100" placeholder="숙제 이름 입력 (e.g. 비아키스)" {...bindName} />
                </ContentsArticle>
            </FormFlexArticle>
            <FormFlexArticle direction="column">
                <ContentsArticleTitle>색상</ContentsArticleTitle>
                <ContentsArticle>
                    <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                </ContentsArticle>
            </FormFlexArticle>
        </FormArticleContainer>
    );
};

const FormFlexArticle = styled(FlexArticle)`
    margin-bottom: 1.5em;
`;

const SmallTitle = styled.article`
    font-weight: 500;
    margin-left: 0.7em;
    margin-right: 0.5em;
`;

const ShowCharacterArticle = styled(FlexArticle)`
    align-items: center;
    box-sizing: border-box;
    & > span {
        margin-left: 0.3em;
    }
`;

const ContentsCharacterArticle = styled(ContentsArticle)`
    overflow-y: auto;
    max-height: 79px;
    flex-flow: wrap;
    & > article {
        margin-left: 2em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }
    box-sizing: border-box;
`;

export default TodoForm;
