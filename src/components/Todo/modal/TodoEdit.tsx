import React, { useContext, useState } from 'react';
import _ from 'lodash';
import { ModalActionContext } from '@context/ModalContext';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import { useInput } from '@hooks/useInput';
import useTodo from '@hooks/storage/useTodo';
import EditButtonContainer from '@components/Container/Button/DelEdit';
import TodoForm from '@components/Todo/common/Form';
import { ITodo } from '@components/Todo/TodoType';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from '@common/types';
import { FormContainer } from '@style/common/modal';

const TodoEdit = ({
    id: oriId,
    name: newName,
    type: newType,
    contents: newContents,
    checkType: newCheckType,
    color: newColor,
}: Omit<ITodo, 'character'>) => {
    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const { closeModal } = useContext(ModalActionContext);

    const [type, setType] = useState<ScheduleType>(newType);
    const [contents, setContents] = useState<ScheduleContents>(newContents);
    const [checkType, setCheckType] = useState<ScheduleCheckType>(newCheckType);
    const [color, setColor] = useState<string>(newColor);

    const [name, bindName] = useInput<string>(newName);

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
        newTodoArr[index] = {
            ...newTodoArr[index],
            name: name,
            type: type,
            contents: contents,
            checkType: checkType,
            color: color,
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
            />
            <EditButtonContainer onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
        </FormContainer>
    );
};

export default TodoEdit;
