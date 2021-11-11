import React, { useContext, useState } from 'react';
import _ from 'lodash';
import { ModalActionContext } from '@context/ModalContext';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import { useInput } from '@hooks/useInput';
import useTodo from '@hooks/storage/useTodo';
import EditButtonContainer from '@components/Container/Button/DelEdit';
import TodoForm from '@components/Todo/common/Form';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from '@common/types';
import { FormContainer } from '@style/common/modal';
import { ICharacter } from '@components/Character/CharacterType';
import { getResetCheckArr } from '../common/functions';

const TodoEdit = ({
    id: oriId,
    name: newName,
    detailName: newDetailName,
    type: newType,
    contents: newContents,
    checkType: newCheckType,
    color: newColor,
    showCharacter: newShowChracter,
}: Omit<ITodo, 'character'>) => {
    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const { closeModal } = useContext(ModalActionContext);

    const [type, setType] = useState<ScheduleType>(newType);
    const [contents, setContents] = useState<ScheduleContents>(newContents);
    const [checkType, setCheckType] = useState<ScheduleCheckType>(newCheckType);
    const [color, setColor] = useState<string>(newColor);

    const [name, bindName, settingName] = useInput<string>(newName);
    const [detailName, setDetailName] = useState<string[]>(newDetailName || []);

    const [showCharacterArr, setShowCharacterArr] = useState<number[]>(newShowChracter);

    const onClickEdit = () => {
        editTodo();
        closeModal();
    };

    const onClickDelete = () => {
        deleteTodo();
        deleteTodoOrd();
        closeModal();
    };

    const editTodo = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const index = todoArr.findIndex((todoObj: ITodo) => todoObj.id === oriId);

        let newTodoArr = [...todoArr];

        const resetTodoCharacterArr: ICharacterTodo[] = newTodoArr[index].character.map((character: ICharacterTodo) => {
            return { ...character, check: getResetCheckArr(contents) };
        });

        newTodoArr[index] = {
            ...newTodoArr[index],
            name: name,
            detailName: contents === 'epona' ? detailName : [],
            type: type,
            contents: contents,
            checkType: checkType,
            color: color,
            character: resetTodoCharacterArr,
            showCharacter: showCharacterArr,
        };

        setStorageTodo(JSON.stringify(newTodoArr));
    };

    const deleteTodo = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const resultArray = _.reject(todoArr, (todo: ITodo) => {
            return todo.id === oriId;
        });
        setStorageTodo(JSON.stringify(resultArray));
    };

    const deleteTodoOrd = () => {
        const todoArrOrd: number[] = JSON.parse(storageTodoOrd);
        const resultOrd = _.reject(todoArrOrd, (ord: number) => {
            return ord === oriId;
        });
        setStorageTodoOrd(JSON.stringify(resultOrd));
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
                showCharacterArr={showCharacterArr}
                setColor={setColor}
                setType={setType}
                setContents={setContents}
                setCheckType={setCheckType}
                bindName={bindName}
                settingName={settingName}
                detailName={detailName}
                setDetailName={setDetailName}
                onChangeDetailName={onChangeDetailName}
                setShowCharacterArr={setShowCharacterArr}
            />
            <EditButtonContainer onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
        </FormContainer>
    );
};

export default TodoEdit;
