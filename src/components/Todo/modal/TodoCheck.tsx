import React, { useContext, useEffect, useState } from 'react';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import { useInput } from '@hooks/useInput';
import { ITodo, ITodoCheck } from '@common/types/localStorage/Todo';
import { getShowCheckTodo } from '@components/Todo/common/functions';
import EditButtonContainer from '@components/Container/Button/Edit';
import { ICharacter } from '@common/types/localStorage/Character';
import BasicCheckbox from '@components/Input/BasicCheckbox';
import TextBox from '@components/Input/TextBox';
import { ScheduleType } from '@common/types/types';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Contents, Title, Container, ContentContainer, TopInfo, TopInfoTitle } from '@style/common/modal';
import { FlexDiv, RemarkDiv } from '@style/common/layout/common';
import { toast } from 'react-toastify';

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

    const { storedTodo, storedCharacter } = useContext(LocalStorageStateContext);
    const { setStoredTodo } = useContext(LocalStorageActionContext);
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
        const characterArr: ICharacter[] = [...storedCharacter];
        const characterIndex = characterArr.findIndex(char => char.id === characterId);
        setCharacterName(characterArr[characterIndex].name);
    };

    const onClickEdit = () => {
        editTodoCheck();
        toast.success(`[${characterName} -${todoName}] 개별 수정되었습니다.`);
        closeModal();
    };

    const editTodoCheck = () => {
        const todoArr: ITodo[] = [...storedTodo];
        const characterArr: ICharacter[] = [...storedCharacter];

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

        setStoredTodo(todoArr);
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
        <Container>
            <TopInfo>
                <div>
                    숙제 :<TopInfoTitle>{todoName}</TopInfoTitle>
                </div>
                <div>
                    캐릭터명 :<TopInfoTitle>{characterName}</TopInfoTitle>
                </div>
            </TopInfo>
            {todoType === 'daily' && ['chaos', 'guardian'].includes(todoContents) && (
                <RemarkDiv>* 휴식게이지 수동 입력 시 수행횟수는 초기화 됩니다.</RemarkDiv>
            )}
            <ContentContainer>
                {checkType === 'text' ? (
                    <Content direction="column">
                        <Title>텍스트</Title>
                        <Contents>
                            <TextBox {...bindText} />
                        </Contents>
                    </Content>
                ) : (
                    todoType === 'daily' &&
                    ['chaos', 'guardian'].includes(todoContents) && (
                        <Content direction="column">
                            <Title
                                css={css`
                                    color: ${theme.colors.relax};
                                `}
                            >
                                휴식 게이지
                            </Title>
                            <Contents>
                                <TextBox {...bindRelaxGauge} />
                            </Contents>
                        </Content>
                    )
                )}

                {todoContents === 'epona' && (
                    <Content direction="column">
                        <Title>에포나 명</Title>
                        <Contents>
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
                        </Contents>
                    </Content>
                )}
                <Content direction="column">
                    <Title>메모</Title>
                    <Contents>
                        <TextBox {...bindMemo} />
                    </Contents>
                </Content>
                <Content>
                    <HideTitle>숨김</HideTitle>
                    <HideContents>
                        <BasicCheckbox
                            value={characterId}
                            checked={!showCharacter.includes(characterId)}
                            onChange={e => setShowCharacter(getShowCheckTodo(e, showCharacter, characterId))}
                        />
                    </HideContents>
                </Content>
            </ContentContainer>
            <EditButtonContainer onClickEdit={onClickEdit} />
        </Container>
    );
};

const Content = styled(FlexDiv)`
    margin-bottom: 2em;
`;

const HideTitle = styled(Title)`
    margin-bottom: 0;
    flex-basis: 10%;
`;

const HideContents = styled(Title)`
    flex-basis: 90%;
`;

export default TodoCheck;
