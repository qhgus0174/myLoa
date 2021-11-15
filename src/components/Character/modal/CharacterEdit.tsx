import React, { useContext, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { PagingActionContext, PagingStateContext } from '@context/PagingContext';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { useInput } from '@hooks/useInput';
import useCharacter from '@hooks/storage/useCharacter';
import useTodo from '@hooks/storage/useTodo';
import { getCrollCharacterInfo, isDuplicate } from '@components/Character/common/functions';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import EditButtonContainer from '@components/Container/Button/DelEdit';
import { ICharacter } from '@components/Character/CharacterType';
import CharacterForm from '@components/Character/common/Form';
import { FormContainer } from '@style/common/modal';
import { getStorage } from '@storage/index';

interface ICharacterEdit {
    id: number;
    name: string;
    color: string;
}

const CharacterEdit = ({ id: oriId, name: newName, color: oriColor }: ICharacterEdit) => {
    const [character, setCharacter] = useCharacter();
    const [characterOrd, setCharacterOrd] = useCharacterOrd();
    const [todo, setTodo] = useTodo();

    const { setCurrentPage } = useContext(PagingActionContext);
    const { closeModal } = useContext(ModalActionContext);
    const { perPage } = useContext(PagingStateContext);

    const [color, setColor] = useState<string>(oriColor);

    const [name, bindName] = useInput<string>(newName);

    const { setSpinnerVisible } = useContext(SpinnerContext);

    const onClickEdit = async () => {
        if (checkNameIsEmpty() || checkNameIsDuplicate()) return;

        try {
            setSpinnerVisible(true);
            await crollCharacterInfo();
        } finally {
            setSpinnerVisible(false);
        }
    };

    const crollCharacterInfo = async () => {
        const { status, validMsg, crollJob, crollLevel } = await getCrollCharacterInfo(name);

        const setCharacterInfo = {
            success: () => editCharacter(crollJob || '', crollLevel || ''),
            error: () => toast.error(validMsg || ''),
        };

        setCharacterInfo[status] && setCharacterInfo[status]();
    };

    const editCharacter = (crollJob: string, crollLevel: string) => {
        const characterArr: ICharacter[] = getStorage('character');

        const index = characterArr.findIndex((char: ICharacter) => char.id === oriId);

        let newCharacterArr = [...characterArr];

        newCharacterArr[index] = {
            ...newCharacterArr[index],
            name: name,
            color: color,
            level: crollLevel,
            job: crollJob,
        };

        setCharacter(JSON.stringify(newCharacterArr));

        closeModal();
    };

    const checkNameIsDuplicate = (): boolean => {
        if (newName !== name && isDuplicate(name)) {
            toast.error('중복된 캐릭터명 입니다.');
            return true;
        }

        return false;
    };

    const checkNameIsEmpty = (): boolean => {
        if (!name) {
            toast.error('캐릭터 명을 입력 해 주세요.');
            return true;
        }

        return false;
    };

    const onClickDelete = () => {
        const deletedCharacterArr = deleteCharacterInfo();
        deleteTodo();
        setCurrentCharacterPage(deletedCharacterArr);

        closeModal();
    };

    const setCurrentCharacterPage = (arr: ICharacter[]) => {
        const currentPage = Math.ceil(arr.length / perPage);
        setCurrentPage(currentPage);
    };

    const deleteCharacterInfo = (): ICharacter[] => {
        deleteCharacterOrd();
        return deleteCharacter();
    };

    const deleteCharacter = (): ICharacter[] => {
        const characterArr: ICharacter[] = getStorage('character');
        const resultArray = _.reject(characterArr, ({ id }: ICharacter) => {
            return id === oriId;
        });
        setCharacter(JSON.stringify(resultArray));

        return resultArray;
    };

    const deleteCharacterOrd = () => {
        const characterOrdArr: number[] = getStorage('characterOrd');
        const resultOrd = _.reject(characterOrdArr, (ord: number) => {
            return ord === oriId;
        });
        setCharacterOrd(JSON.stringify(resultOrd));
    };

    const deleteTodo = () => {
        const todoArr: ITodo[] = getStorage('todo');

        const deleteResult = todoArr.map((todoObj: ITodo) => {
            todoObj.character = _.reject(todoObj.character, (character: ICharacterTodo) => {
                return character.id === oriId;
            });

            return todoObj;
        });

        setTodo(JSON.stringify(deleteResult));
    };

    return (
        <FormContainer>
            <CharacterForm color={color} setColor={setColor} name={name} />
            <EditButtonContainer onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
        </FormContainer>
    );
};

export default CharacterEdit;
