import React, { useContext, useState } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';
import useCharacter from '@hooks/storage/useCharacter';
import { ITodo, ICharacterTodo } from '@components/Todo/TodoType';
import AddButtonContainer from '@components/Container/Button/Add';
import { ICharacter } from '@components/Character/CharacterType';
import TodoForm from '@components/Todo/common/Form';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from '@common/types';
import { useTheme } from '@emotion/react';
import { FormContainer } from '@style/common/modal';

const Todo = () => {
    const [type, setType] = useState<ScheduleType>('daily');
    const [contents, setContents] = useState<ScheduleContents>('chaos');
    const [checkType, setCheckType] = useState<ScheduleCheckType>('check');

    const { closeModal } = useContext(ModalActionContext);

    const [name, bindName, settingName] = useInput<string>('카던');
    const [detailName, setDetailName] = useState<string[]>(new Array(3).fill(''));

    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();
    const [storageCharacter] = useCharacter();

    const [color, setColor] = useState<string>('#ffffff');

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const maxTodoId = Math.max(...todoArr.map(todoObj => todoObj.id), 0);
        const todoId = todoArr.length == 0 ? 0 : maxTodoId + 1;

        addTodo(todoId);
        addTodoOrd(todoId);

        closeModal();
    };

    const addTodo = (todoId: number) => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const characterArr: ICharacter[] = JSON.parse(storageCharacter);

        const checkArr = isMultipleArr(contents) ? new Array(getArrayLength(contents)).fill(0) : new Array(1).fill(0);

        const characters: ICharacterTodo[] = characterArr.map((character: ICharacter) => {
            return { id: character.id, check: checkArr, relaxGauge: 0, oriRelaxGauge: 0, hide: false };
        });

        const todoInfo: ITodo = {
            id: todoId,
            name: name,
            detailName: detailName,
            type: type,
            contents: contents,
            checkType: checkType,
            color: color,
            character: characters,
        };

        todoArr.push(todoInfo);
        setStorageTodo(JSON.stringify(todoArr));
    };

    const addTodoOrd = (todoId: number) => {
        const todoOrdArr: number[] = JSON.parse(storageTodoOrd);

        todoOrdArr.push(todoId);
        setStorageTodoOrd(JSON.stringify(todoOrdArr));
    };

    const isMultipleArr = (contents: ScheduleContents): boolean => {
        return ['chaos', 'epona'].includes(contents);
    };

    const getArrayLength = (contents: ScheduleContents): number => {
        return contents === 'chaos' ? 2 : 3;
    };

    const onChangeDetailName = (oriArr: string[], e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const {
            target: { value },
        } = e;
        const newArr = [...oriArr];
        newArr[idx] = value;
        setDetailName(newArr);
    };

    return (
        <FormContainer>
            <TodoForm
                type={type}
                contents={contents}
                color={color}
                setColor={setColor}
                setType={setType}
                setContents={setContents}
                setCheckType={setCheckType}
                bindName={bindName}
                settingName={settingName}
                detailName={detailName}
                onChangeDetailName={onChangeDetailName}
            />

            <AddButtonContainer onClickAdd={onClickAdd} />
        </FormContainer>
    );
};

export default Todo;
