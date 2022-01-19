import React, { useContext, useState } from 'react';
import reject from 'lodash-es/reject';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import { useInput } from '@hooks/useInput';
import TodoForm from '@components/Todo/common/Form';
import EditButtonContainer from '@components/Container/Button/DelEdit';
import { getResetCheckArr } from '@components/Todo/common/functions';
import { ICharacterTodo, ITodo } from '@common/types/localStorage/Todo';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from '@common/types/types';
import { Container } from '@style/common/modal';
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
    const { storedTodo, storedTodoOrd } = useContext(LocalStorageStateContext);
    const { setStoredTodo, setStoredTodoOrd } = useContext(LocalStorageActionContext);
    const { closeModal } = useContext(ModalActionContext);

    const [type, setType] = useState<ScheduleType>(newType);
    const [contents, setContents] = useState<ScheduleContents>(newContents);
    const [checkType, setCheckType] = useState<ScheduleCheckType>(newCheckType);
    const [color, setColor] = useState<string>(newColor);
    const [showCharacterArr, setShowCharacterArr] = useState<number[]>(newShowChracter);

    const [name, bindName, settingName] = useInput<string>(newName);

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
        const todoArr: ITodo[] = [...storedTodo];

        const index = todoArr.findIndex((todoObj: ITodo) => todoObj.id === oriId);

        let newTodoArr = [...todoArr];

        const resetTodoCharacterArr: ICharacterTodo[] = newTodoArr[index].character.map((character: ICharacterTodo) => {
            return {
                ...character,
                check: contents === newContents ? character.check : getResetCheckArr(contents),
                eponaName:
                    contents === 'epona'
                        ? character.eponaName && character.eponaName.length > 0
                            ? character.eponaName
                            : new Array(3).fill('')
                        : [],
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

        setStoredTodo(newTodoArr);
    };

    const deleteTodo = () => {
        const todoArr: ITodo[] = [...storedTodo];
        const resultArray = reject(todoArr, (todo: ITodo) => {
            return todo.id === oriId;
        });
        setStoredTodo(resultArray);
    };

    const deleteTodoOrd = () => {
        const todoArrOrd: number[] = [...storedTodoOrd];
        const resultOrd = reject(todoArrOrd, (ord: number) => {
            return ord === oriId;
        });
        setStoredTodoOrd(resultOrd);
    };

    return (
        <Container>
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
            <EditButtonContainer editClassName="editTodo" onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
        </Container>
    );
};

export default TodoEdit;
