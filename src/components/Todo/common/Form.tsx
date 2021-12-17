import React, { useContext } from 'react';
import _ from 'lodash';
import { ColorResult, CompactPicker } from 'react-color';
import { LocalStorageStateContext } from '@context/LocalStorageContext';
import { getShowCheckTodo } from '@components/Todo/common/functions';
import { ICharacter } from '@common/types/localStorage/Character';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import RadioButton from '@components/Input/Radio';
import TextBox from '@components/Input/TextBox';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from '@common/types/types';
import styled from '@emotion/styled';
import { Contents, Title, InnerContent, ContentContainer, ContentArticle } from '@style/common/modal';
import { FlexDiv } from '@style/common';
import IconLabel from '@components/Label/IconLabel';
import EmojiTitle from '@components/Emoji/EmojiTitle';

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
        <ContentContainer>
            <ContentArticle>
                <Title>숙제 유형</Title>
                <InnerContent>
                    <Contents>
                        <SmallTitle>체크박스형</SmallTitle>
                        <RadioButton
                            text={<EmojiTitle label={<p>일일</p>} symbol={'⏰'} />}
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
                            text={<EmojiTitle label={<p>주간</p>} symbol={'7️⃣'} />}
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
                    </Contents>
                    <Contents>
                        <SmallTitle>텍스트형</SmallTitle>
                        <RadioButton
                            text={<EmojiTitle label={<p>텍스트</p>} symbol={'📝'} />}
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
                    </Contents>
                </InnerContent>
            </ContentArticle>
            {type === 'daily' && (
                <ContentArticle>
                    <Title>컨텐츠</Title>
                    <InnerContent>
                        <Contents>
                            <SmallTitle>특수</SmallTitle>
                            <RadioButton
                                text={<IconLabel label="카던" iconUrl="/static/img/lostark/contents/chaos.png" />}
                                name="contents"
                                value="chaos"
                                onChange={() => {
                                    setContents('chaos');
                                    settingName('카던');
                                }}
                                checked={contents === 'chaos'}
                            />
                            <RadioButton
                                text={<IconLabel label="가디언" iconUrl="/static/img/lostark/contents/guardian.png" />}
                                name="contents"
                                value="guardian"
                                onChange={() => {
                                    setContents('guardian');
                                    settingName('가디언');
                                }}
                                checked={contents === 'guardian'}
                            />
                            <RadioButton
                                text={<IconLabel label="에포나" iconUrl="/static/img/lostark/contents/epona.png" />}
                                name="contents"
                                value="epona"
                                onClick={() => settingName('에포나')}
                                onChange={() => {
                                    setContents('epona');
                                    settingName('에포나');
                                }}
                                checked={contents === 'epona'}
                            />
                        </Contents>
                        <Contents>
                            <SmallTitle>초기화</SmallTitle>
                            <RadioButton
                                text={<EmojiTitle label={<p>예</p>} symbol={'⭕'} />}
                                name="contents"
                                value="basicReset"
                                onChange={() => {
                                    setContents('basicReset');
                                    settingName('');
                                }}
                                checked={contents === 'basicReset'}
                            />
                            <RadioButton
                                text={<EmojiTitle label={<p>아니오</p>} symbol={'❌'} />}
                                name="contents"
                                value="basic"
                                onChange={() => {
                                    setContents('basic');
                                    settingName('');
                                }}
                                checked={contents === 'basic'}
                            />
                        </Contents>
                    </InnerContent>
                </ContentArticle>
            )}
            {storedCharacter.length > 0 && (
                <ContentArticle>
                    <Title>숙제 표시 할 캐릭터</Title>
                    <InnerContent>
                        <InnerDiv>
                            {storedCharacter
                                .sort((a: ICharacter, b: ICharacter) => {
                                    return storedCharacterOrd.indexOf(a.id) - storedCharacterOrd.indexOf(b.id);
                                })
                                .map((character: ICharacter, characterIndex: number) => {
                                    return (
                                        <Character key={`todo_show_${characterIndex}`}>
                                            <BasicCheckbox
                                                value={character.id}
                                                checked={showCharacterArr.includes(character.id)}
                                                onChange={e =>
                                                    setShowCharacterArr(
                                                        getShowCheckTodo(e, showCharacterArr, character.id),
                                                    )
                                                }
                                                label={<span>{character.name}</span>}
                                            />
                                        </Character>
                                    );
                                })}
                        </InnerDiv>
                    </InnerContent>
                </ContentArticle>
            )}

            <ContentArticle>
                <Title>숙제 명</Title>
                <Contents>
                    <TextBox width="100" placeholder="숙제 이름 입력 (e.g. 비아키스)" {...bindName} />
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

const SmallTitle = styled.h3`
    font-weight: 600;
    margin-left: 0.7em;
    margin-right: 0.5em;
`;

const Character = styled.article`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    & > span {
        margin-left: 0.3em;
    }
`;

const InnerDiv = styled.div`
    display: flex;
    align-items: center;
    overflow-y: auto;
    max-height: 79px;
    flex-flow: wrap;
    & > article {
        margin-left: 1.8em;
        margin-top: 0.3em;
        margin-bottom: 0.3em;
    }
    box-sizing: border-box;
`;

export default TodoForm;
