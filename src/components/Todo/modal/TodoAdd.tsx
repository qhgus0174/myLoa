import React, { useContext, useState } from 'react';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import { useInput } from '@hooks/useInput';
import { ITodo, ICharacterTodo } from '@components/Todo/TodoType';
import { getResetCheckArr } from '@components/Todo/common/functions';
import AddButtonContainer from '@components/Container/Button/Add';
import { ICharacter } from '@components/Character/CharacterType';
import TodoForm from '@components/Todo/common/Form';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from '@common/types';
import { FormContainer } from '@style/common/modal';
import { useTheme } from '@emotion/react';
import { toast } from 'react-toastify';

const Todo = () => {
    const [type, setType] = useState<ScheduleType>('daily');
    const [contents, setContents] = useState<ScheduleContents>('chaos');
    const [checkType, setCheckType] = useState<ScheduleCheckType>('check');
    const [name, bindName, settingName] = useInput<string>('카던');

    const { closeModal } = useContext(ModalActionContext);
    const { storedTodo, storedTodoOrd, storedCharacter } = useContext(LocalStorageStateContext);
    const { setStoredTodo, setStoredTodoOrd } = useContext(LocalStorageActionContext);

    const theme = useTheme();

    const [showCharacterArr, setShowCharacterArr] = useState<number[]>(
        [...storedCharacter].map((character: ICharacter) => character.id),
    );

    const [color, setColor] = useState<string>(theme.colors.text);

    const onClickAdd = () => {
        const todoArr: ITodo[] = [...storedTodo];

        const maxTodoId = Math.max(...todoArr.map(todoObj => todoObj.id), 0);
        const todoId = todoArr.length == 0 ? 0 : maxTodoId + 1;

        addTodo(todoId);
        addTodoOrd(todoId);

        toast.success(`[${name}] 숙제가 추가되었습니다.`);

        closeModal();
    };

    const addTodo = (todoId: number) => {
        const todoArr: ITodo[] = [...storedTodo];

        const characterArr: ICharacter[] = [...storedCharacter];

        const checkArr = getResetCheckArr(contents);

        const characters: ICharacterTodo[] = characterArr.map((character: ICharacter) => {
            return {
                id: character.id,
                check: checkArr,
                relaxGauge: 0,
                oriRelaxGauge: 0,
                eponaName: contents === 'epona' ? new Array(3).fill('') : [],
                guardianInfo: { info: '2', step: '5' },
            };
        });

        const todoInfo: ITodo = {
            id: todoId,
            name: name,
            type: type,
            contents: contents,
            checkType: checkType,
            color: color,
            character: characters,
            showCharacter: showCharacterArr,
            isFixed: false,
        };

        todoArr.push(todoInfo);
        setStoredTodo(todoArr);
    };

    const addTodoOrd = (todoId: number) => {
        const todoOrdArr: number[] = [...storedTodoOrd];

        todoOrdArr.push(todoId);
        setStoredTodoOrd(todoOrdArr);
    };

    return (
        <FormContainer>
            <TodoForm
                type={type}
                contents={contents}
                color={color}
                showCharacterArr={showCharacterArr}
                setColor={setColor}
                setType={setType}
                setContents={setContents}
                setCheckType={setCheckType}
                bindName={bindName}
                settingName={settingName}
                setShowCharacterArr={setShowCharacterArr}
            />

            <AddButtonContainer addClassName="addTodo" onClickAdd={onClickAdd} />
        </FormContainer>
    );
};

export default Todo;
