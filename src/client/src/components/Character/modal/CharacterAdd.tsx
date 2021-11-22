import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { PagingActionContext, PagingStateContext } from '@context/PagingContext';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import useTodo from '@hooks/storage/useTodo';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import { getCrollCharacterInfo, isDuplicate } from '@components/Character/common/functions';
import { ICharacter } from '@components/Character/CharacterType';
import CharacterForm from '@components/Character/common/Form';
import AddButtonContainer from '@components/Container/Button/Add';
import { FormContainer } from '@style/common/modal';
import { getResetCheckArr } from '@components/Todo/common/functions';
import { getStorage } from '@storage/index';
import { useTheme } from '@emotion/react';

const CharacterAdd = () => {
    const [storageCharacter, setStorageCharacter] = useCharacter();
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();

    const { setSpinnerVisible } = useContext(SpinnerContext);
    const { setCurrentPage } = useContext(PagingActionContext);
    const { perPage } = useContext(PagingStateContext);

    const theme = useTheme();

    const [color, setColor] = useState<string>(theme.colors.text);

    const { closeModal } = useContext(ModalActionContext);

    const [name, setName] = useState<string>('');

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
        const characterArr: ICharacter[] = getStorage('character');
        const maxCharacterId = Math.max(...characterArr.map(char => char.id), 0);
        const characterId = characterArr.length == 0 ? 0 : maxCharacterId + 1;

        const resultArr = addCharacterInfo(crollJob, crollLevel, characterId);
        addCharacterOrd(characterId);
        addTodoCharacterInfo(characterId);
        setCurrentCharacterPage(resultArr);

        toast.success(`[${name}] 캐릭터가 추가되었습니다.`);

        closeModal();
    };

    const addCharacterInfo = (crollJob: string, crollLevel: string, characterId: number): ICharacter[] => {
        const characterArr: ICharacter[] = getStorage('character');

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
        return characterArr;
    };

    const addCharacterOrd = (characterId: number) => {
        const characterOrdArr: number[] = getStorage('characterOrd');

        characterOrdArr.push(characterId);
        setStorageCharacterOrd(JSON.stringify(characterOrdArr));
    };

    const addTodoCharacterInfo = (characterId: number) => {
        const todoArr: ITodo[] = getStorage('todo');

        const todoCharacterArr = todoArr.map((todo: ITodo) => {
            const todoCharacter: ICharacterTodo = {
                id: characterId,
                check: getResetCheckArr(todo.contents),
                relaxGauge: 0,
                oriRelaxGauge: 0,
                eponaName: todo.contents === 'epona' ? new Array(3).fill('') : [],
                guardianInfo: { info: '2', step: '5' },
            };
            todo.showCharacter.push(characterId);

            return todo.type === 'line' ? todo : Object.assign({}, todo, todo.character.push(todoCharacter));
        });

        setStorageTodo(JSON.stringify(todoCharacterArr));
    };

    const setCurrentCharacterPage = (arr: ICharacter[]) => {
        const currentPage = Math.ceil(arr.length / perPage);
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
            <CharacterForm color={color} name={name} setName={setName} setColor={setColor} />
            <AddButtonContainer onClickAdd={onClickAdd} />
        </FormContainer>
    );
};

export default CharacterAdd;
