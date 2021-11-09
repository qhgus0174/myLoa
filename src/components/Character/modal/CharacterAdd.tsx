import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { PagingActionContext, PagingStateContext } from '@context/PagingContext';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import { useInput } from '@hooks/useInput';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import useTodo from '@hooks/storage/useTodo';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import { getCrollCharacterInfo, isDuplicate } from '@components/Character/common/functions';
import { ICharacter } from '@components/Character/CharacterType';
import CharacterForm from '@components/Character/common/Form';
import AddButtonContainer from '@components/Container/Button/Add';
import { getStorage } from '@storage/index';
import { FormContainer } from '@style/common/modal';

const CharacterAdd = () => {
    const [storageCharacter, setStorageCharacter] = useCharacter();
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();

    const { setSpinnerVisible } = useContext(SpinnerContext);
    const { setCurrentPage } = useContext(PagingActionContext);
    const { perPage } = useContext(PagingStateContext);

    const [color, setColor] = useState<string>('#ffffff');

    const { closeModal } = useContext(ModalActionContext);

    const [name, bindName] = useInput<string>('');

    const onClickAdd = async () => {
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
            success: () => addCharacter(crollJob || '', crollLevel || ''),
            error: () => toast.error(validMsg || ''),
        };

        setCharacterInfo[status] && setCharacterInfo[status]();
    };

    const addCharacter = (crollJob: string, crollLevel: string) => {
        const characterArr: ICharacter[] = JSON.parse(storageCharacter);
        const maxCharacterId = Math.max(...characterArr.map(char => char.id), 0);
        const characterId = characterArr.length == 0 ? 0 : maxCharacterId + 1;

        addCharacterInfo(crollJob, crollLevel, characterId);
        addCharacterOrd(characterId);
        addTodoCharacterInfo(characterId);
        setCurrentCharacterPage();
        closeModal();
    };

    const addCharacterInfo = (crollJob: string, crollLevel: string, characterId: number) => {
        const characterArr: ICharacter[] = JSON.parse(storageCharacter);

        const characterInfo: ICharacter = {
            id: characterId,
            name: name,
            level: crollLevel,
            job: crollJob,
            color: color,
            lastSearch: 0,
        };

        characterArr.push(characterInfo);
        setStorageCharacter(JSON.stringify(characterArr));
    };

    const addCharacterOrd = (characterId: number) => {
        const characterOrdArr: number[] = JSON.parse(storageCharacterOrd);

        characterOrdArr.push(characterId);
        setStorageCharacterOrd(JSON.stringify(characterOrdArr));
    };

    const addTodoCharacterInfo = (characterId: number) => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const todoCharacter: ICharacterTodo = {
            id: characterId,
            check: 0,
            relaxGauge: 0,
            oriRelaxGauge: 0,
            hide: false,
        };

        const todoCharacterArr = todoArr.map((todo: ITodo) => {
            return todo.type === 'line' ? todo : Object.assign({}, todo, todo.character.push(todoCharacter));
        });

        setStorageTodo(JSON.stringify(todoCharacterArr));
    };

    const setCurrentCharacterPage = () => {
        const currentPage = Math.ceil(getStorage('character').length / perPage);
        setCurrentPage(currentPage);
    };

    const checkNameIsDuplicate = (): boolean => {
        if (name && isDuplicate(name)) {
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

    return (
        <FormContainer>
            <CharacterForm color={color} setColor={setColor} bindName={bindName} />
            <AddButtonContainer onClickAdd={onClickAdd} />
        </FormContainer>
    );
};

export default CharacterAdd;
