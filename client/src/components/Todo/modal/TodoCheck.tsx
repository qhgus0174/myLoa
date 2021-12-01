import React, { useContext, useEffect, useState } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import { useInput } from '@hooks/useInput';
import useTodo from '@hooks/storage/useTodo';
import { ITodo, ITodoCheck } from '@components/Todo/TodoType';
import { getShowCheckTodo } from '@components/Todo/common/functions';
import EditButtonContainer from '@components/Container/Button/Edit';
import { ICharacter } from '@components/Character/CharacterType';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import TextBox from '@components/Input/TextBox';
import { ScheduleType } from '@common/types';
import { getStorage } from '@storage/index';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
    ContentsArticle,
    ContentsArticleTitle,
    ContentsInnerArticle,
    FormContainer,
    FormArticleContainer,
} from '@style/common/modal';
import { FlexArticle, RemarkArticle } from '@style/common';
import { toast } from 'react-toastify';
import useCharacter from '@hooks/storage/useCharacter';

const TodoCheck = ({
    id: characterId,
    relaxGauge: oriRelax,
    memo: oriMemo,
    text: oriText,
    checkType,
    todoId,
    todoName,
    todoType: oriTodoType,
    todoContents,
    showCharacter: oriShowCharacter,
    eponaName: oriEponaName,
}: ITodoCheck) => {
    const theme = useTheme();

    const [storageTodo, setStorageTodo] = useTodo();
    const [storageCharacter, setStorageCharacter] = useCharacter();

    const { closeModal } = useContext(ModalActionContext);

    const [relaxGauge, bindRelaxGauge] = useInput<number>(oriRelax, { maxLength: 3, numberOnly: true });
    const [text, bindText] = useInput<string>(oriText || '');
    const [memo, bindMemo] = useInput<string>(oriMemo || '');

    const [todoType] = useState<ScheduleType>(oriTodoType);
    const [showCharacter, setShowCharacter] = useState<number[]>(oriShowCharacter);
    const [eponaName, setEponaName] = useState<string[]>(oriEponaName);

    const [characterName, setCharacterName] = useState<string>('');

    useEffect(() => {
        setCharacterNameState();
    });

    const setCharacterNameState = () => {
        const characterArr: ICharacter[] = getStorage('character');
        const characterIndex = characterArr.findIndex(char => char.id === characterId);
        setCharacterName(characterArr[characterIndex].name);
    };

    const onClickEdit = () => {
        editTodoCheck();
        toast.success(`[${characterName} -${todoName}] 개별 수정되었습니다.`);
        closeModal();
    };

    const editTodoCheck = () => {
        const todoArr: ITodo[] = getStorage('todo');
        const characterArr: ICharacter[] = getStorage('character');

        const todoIndex = todoArr.findIndex(todo => todo.id === todoId);
        const characterIndex = characterArr.findIndex(char => char.id === characterId);

        todoArr[todoIndex] = {
            ...todoArr[todoIndex],
            showCharacter: showCharacter,
        };

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            check:
                relaxGauge !== todoArr[todoIndex].character[characterIndex].oriRelaxGauge
                    ? todoArr[todoIndex].character[characterIndex].check.fill(0)
                    : todoArr[todoIndex].character[characterIndex].check,
            relaxGauge: relaxGauge,
            oriRelaxGauge: relaxGauge,
            memo: memo,
            eponaName: eponaName,
        };

        setStorageTodo(JSON.stringify(todoArr));
    };

    const onChangeDetailName = (e: React.ChangeEvent<HTMLInputElement>, oriArr: string[], idx: number) => {
        const {
            target: { value },
        } = e;
        const newArr = [...oriArr];
        newArr[idx] = value;

        setEponaName(newArr);
    };

    return (
        <FormContainer>
            <ContentsInnerFlexArticle>
                <div>
                    숙제 :<SmallTitleSpan>{todoName}</SmallTitleSpan>
                </div>
                <div>
                    캐릭터명 :<SmallTitleSpan>{characterName}</SmallTitleSpan>
                </div>
            </ContentsInnerFlexArticle>
            {todoType === 'daily' && ['chaos', 'guardian'].includes(todoContents) && (
                <RemarkArticle>* 휴식게이지 수동 입력 시 수행횟수는 초기화 됩니다.</RemarkArticle>
            )}
            <FormArticleContainer>
                {checkType === 'text' ? (
                    <TodoCheckArticle direction="column">
                        <ContentsArticleTitle>텍스트</ContentsArticleTitle>
                        <ContentsArticle>
                            <TextBox {...bindText} />
                        </ContentsArticle>
                    </TodoCheckArticle>
                ) : (
                    todoType === 'daily' &&
                    ['chaos', 'guardian'].includes(todoContents) && (
                        <TodoCheckArticle direction="column">
                            <ContentsArticleTitle
                                css={css`
                                    color: ${theme.colors.relax};
                                `}
                            >
                                휴식 게이지
                            </ContentsArticleTitle>
                            <ContentsArticle>
                                <TextBox {...bindRelaxGauge} />
                            </ContentsArticle>
                        </TodoCheckArticle>
                    )
                )}

                {todoContents === 'epona' && (
                    <TodoCheckArticle direction="column">
                        <ContentsArticleTitle>에포나 명</ContentsArticleTitle>
                        <ContentsArticle>
                            {eponaName.map((eName: string, eNameIdx: number, oriArr: string[]) => {
                                return (
                                    <TextBox
                                        key={`epona_name_${eNameIdx}`}
                                        width="75"
                                        placeholder={`에포나명${eNameIdx + 1}`}
                                        value={eName}
                                        onChange={e => onChangeDetailName(e, oriArr, eNameIdx)}
                                    />
                                );
                            })}
                        </ContentsArticle>
                    </TodoCheckArticle>
                )}
                <TodoCheckArticle direction="column">
                    <ContentsArticleTitle>메모</ContentsArticleTitle>
                    <ContentsArticle>
                        <TextBox {...bindMemo} />
                    </ContentsArticle>
                </TodoCheckArticle>
                <TodoCheckArticle>
                    <HideDivTitle>숨김</HideDivTitle>
                    <HideDivContents>
                        <BasicCheckbox
                            value={characterId}
                            checked={!showCharacter.includes(characterId)}
                            onChange={e => setShowCharacter(getShowCheckTodo(e, showCharacter, characterId))}
                        />
                    </HideDivContents>
                </TodoCheckArticle>
            </FormArticleContainer>
            <EditButtonContainer onClickEdit={onClickEdit} />
        </FormContainer>
    );
};

const TodoCheckArticle = styled(FlexArticle)`
    margin-bottom: 2em;
`;

const ContentsInnerFlexArticle = styled(ContentsInnerArticle)`
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
`;

const HideDivTitle = styled(ContentsArticleTitle)`
    margin-bottom: 0;
    flex-basis: 10%;
`;

const HideDivContents = styled(ContentsArticleTitle)`
    flex-basis: 90%;
`;

const SmallTitleSpan = styled.span`
    font-weight: 500;
    margin-left: 0.7em;
    margin-right: 0.5em;
`;

export default TodoCheck;
