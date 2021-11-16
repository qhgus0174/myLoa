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
import { getStorage } from '@storage/index';
import { toast } from 'react-toastify';

const TodoEdit = ({
    id: oriId,
    name: newName,
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

    const [showCharacterArr, setShowCharacterArr] = useState<number[]>(newShowChracter);

    const onClickEdit = () => {
        editTodo();
        toast.success(`[${name}] 숙제가 수정되었습니다.`);
        closeModal();
    };

    const onClickDelete = () => {
        deleteTodo();
        deleteTodoOrd();
        toast.success(`[${name}] 숙제가 삭제되었습니다.`);
        closeModal();
    };

    const editTodo = () => {
        const todoArr: ITodo[] = getStorage('todo');

        const index = todoArr.findIndex((todoObj: ITodo) => todoObj.id === oriId);

        let newTodoArr = [...todoArr];

        const resetTodoCharacterArr: ICharacterTodo[] = newTodoArr[index].character.map((character: ICharacterTodo) => {
            return {
                ...character,
                check: contents === newContents ? character.check : getResetCheckArr(contents),
                eponaName: contents === 'epona' ? new Array(3).fill('') : [],
            };
        });

        newTodoArr[index] = {
            ...newTodoArr[index],
            name: name,
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
        const todoArr: ITodo[] = getStorage('todo');
        const resultArray = _.reject(todoArr, (todo: ITodo) => {
            return todo.id === oriId;
        });
        setStorageTodo(JSON.stringify(resultArray));
    };

    const deleteTodoOrd = () => {
        const todoArrOrd: number[] = getStorage('todoOrd');
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
                showCharacterArr={showCharacterArr}
                setColor={setColor}
                setType={setType}
                setContents={setContents}
                setCheckType={setCheckType}
                bindName={bindName}
                settingName={settingName}
                setShowCharacterArr={setShowCharacterArr}
            />
            <EditButtonContainer onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
        </FormContainer>
    );
};

export default TodoEdit;
