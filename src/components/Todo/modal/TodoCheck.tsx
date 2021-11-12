import React, { useContext, useState } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import { useInput } from '@hooks/useInput';
import useTodo from '@hooks/storage/useTodo';
import { ITodo, ITodoCheck } from '@components/Todo/TodoType';
import EditButtonContainer from '@components/Container/Button/Edit';
import TextBox from '@components/Input/TextBox';
import { ScheduleType } from '@common/types';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ContentsDiv, ContentsDivTitle, FormContainer, FormDivContainer } from '@style/common/modal';
import { FlexDiv } from '@style/common';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import { getShowCheckTodo } from '../common/functions';
import { getStorage } from '@storage/index';

const TodoCheck = ({
    id: characterId,
    relaxGauge: oriRelax,
    memo: oriMemo,
    text: oriText,
    checkType,
    todoId,
    todoType: oriTodoType,
    todoContents,
    showCharacter: oriShowCharacter,
    eponaName: oriEponaName,
}: ITodoCheck) => {
    const theme = useTheme();

    const [storageTodo, setStorageTodo] = useTodo();

    const { closeModal } = useContext(ModalActionContext);

    const [relaxGauge, bindRelaxGauge] = useInput<number>(oriRelax, { maxLength: 3, numberOnly: true });
    const [text, bindText] = useInput<string>(oriText || '');
    const [memo, bindMemo] = useInput<string>(oriMemo || '');

    const [todoType] = useState<ScheduleType>(oriTodoType);
    const [showCharacter, setShowCharacter] = useState<number[]>(oriShowCharacter);
    const [eponaName, setEponaName] = useState<string[]>(oriEponaName);

    const onClickEdit = () => {
        editTodoCheck();
        closeModal();
    };

    const editTodoCheck = () => {
        const todoArr: ITodo[] = getStorage('todo');

        const todoIndex = todoArr.findIndex(todo => todo.id === todoId);
        const characterIndex = todoArr.findIndex(todo => todo.id === characterId);

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
            {todoType === 'daily' && ['chaos', 'guardian'].includes(todoContents) && (
                <RemarkDiv>* 휴식게이지 수동 입력 시 수행횟수는 초기화 됩니다.</RemarkDiv>
            )}
            <FormDivContainer>
                {checkType === 'text' ? (
                    <FlexDiv direction="column">
                        <ContentsDivTitle>텍스트</ContentsDivTitle>
                        <ContentsDiv>
                            <TextBox {...bindText} />
                        </ContentsDiv>
                    </FlexDiv>
                ) : (
                    todoType === 'daily' &&
                    ['chaos', 'guardian'].includes(todoContents) && (
                        <FlexDiv direction="column">
                            <ContentsDivTitle
                                css={css`
                                    color: ${theme.colors.relax};
                                `}
                            >
                                휴식 게이지
                            </ContentsDivTitle>
                            <ContentsDiv>
                                <TextBox {...bindRelaxGauge} />
                            </ContentsDiv>
                        </FlexDiv>
                    )
                )}

                {todoContents === 'epona' && (
                    <FlexDiv direction="column">
                        <ContentsDivTitle>에포나 명</ContentsDivTitle>
                        <ContentsDiv>
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
                        </ContentsDiv>
                    </FlexDiv>
                )}
                <FlexDiv direction="column">
                    <ContentsDivTitle>메모</ContentsDivTitle>
                    <ContentsDiv>
                        <TextBox {...bindMemo} />
                    </ContentsDiv>
                </FlexDiv>
                <FlexDiv>
                    <HideDivTitle>숨김</HideDivTitle>
                    <HideDivContents>
                        <BasicCheckbox
                            value={characterId}
                            checked={!showCharacter.includes(characterId)}
                            onChange={e => setShowCharacter(getShowCheckTodo(e, showCharacter, characterId))}
                        />
                    </HideDivContents>
                </FlexDiv>
            </FormDivContainer>
            <EditButtonContainer onClickEdit={onClickEdit} />
        </FormContainer>
    );
};

const RemarkDiv = styled(FlexDiv)`
    justify-content: flex-end;
    color: ${props => props.theme.colors.translucent};
`;

const HideDivTitle = styled(ContentsDivTitle)`
    margin-bottom: 0;
    flex-basis: 10%;
`;

const HideDivContents = styled(ContentsDivTitle)`
    flex-basis: 90%;
`;

export default TodoCheck;
