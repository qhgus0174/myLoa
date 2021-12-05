import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { PagingActionContext, PagingStateContext } from '@context/PagingContext';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import { getCrollCharacterInfo, isDuplicate } from '@components/Character/common/functions';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import EditButtonContainer from '@components/Container/Button/DelEdit';
import { ICharacter } from '@components/Character/CharacterType';
import CharacterForm from '@components/Character/common/Form';
import { FormContainer } from '@style/common/modal';

import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';

interface ICharacterEdit {
    id: number;
    name: string;
    color: string;
}

const CharacterEdit = ({ id: oriId, name: newName, color: oriColor }: ICharacterEdit) => {
    const { storedTodo, storedCharacter, storedCharacterOrd } = useContext(LocalStorageStateContext);
    const { setStoredTodo, setStoredCharacter, setStoredCharacterOrd } = useContext(LocalStorageActionContext);

    const { setCurrentPage } = useContext(PagingActionContext);
    const { closeModal } = useContext(ModalActionContext);
    const { currentPage, perPage } = useContext(PagingStateContext);

    const [color, setColor] = useState<string>(oriColor);

    const [name, setName] = useState<string>('');

    useEffect(() => {
        setName(newName);
    }, [newName]);

    const { setSpinnerVisible } = useContext(SpinnerContext);

    const onClickEdit = async () => {
        if (checkNameIsEmpty() || checkNameIsDuplicate()) return;

        try {
            setSpinnerVisible(true);
            name === newName ? editCharacterColor() : await crollCharacterInfo('edit');
        } finally {
            setSpinnerVisible(false);
        }
    };

    const crollCharacterInfo = async (type: 'edit' | 'refresh') => {
        const { status, validMsg, crollJob, crollLevel } = await getCrollCharacterInfo(name);

        const setCharacterInfo = {
            success: () => editCharacter(crollJob || '', crollLevel || '', type),
            error: () => toast.error(validMsg || ''),
        };

        setCharacterInfo[status] && setCharacterInfo[status]();
    };

    const editCharacter = (crollJob: string, crollLevel: string, type: 'edit' | 'refresh') => {
        const characterArr: ICharacter[] = [...storedCharacter];

        const index = characterArr.findIndex((char: ICharacter) => char.id === oriId);

        let newCharacterArr = [...characterArr];

        newCharacterArr[index] = {
            ...newCharacterArr[index],
            name: name,
            color: color,
            level: crollLevel,
            job: crollJob,
        };

        setStoredCharacter(newCharacterArr);

        toast.success(type === 'edit' ? `[${name}] 캐릭터가 수정되었습니다.` : `${name} 캐릭터가 갱신되었습니다.`);

        closeModal();
    };

    const editCharacterColor = () => {
        const characterArr: ICharacter[] = [...storedCharacter];

        const index = characterArr.findIndex((char: ICharacter) => char.id === oriId);

        let newCharacterArr = [...characterArr];

        newCharacterArr[index] = {
            ...newCharacterArr[index],
            color: color,
        };

        setStoredCharacter(newCharacterArr);

        toast.success(`[${name}] 캐릭터가 수정되었습니다.`);

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
        const page = Math.ceil(arr.length / perPage);
        page < currentPage && setCurrentPage(page);
    };

    const deleteCharacterInfo = (): ICharacter[] => {
        deleteCharacterOrd();
        return deleteCharacter();
    };

    const deleteCharacter = (): ICharacter[] => {
        const characterArr: ICharacter[] = [...storedCharacter];
        const resultArray = _.reject(characterArr, ({ id }: ICharacter) => {
            return id === oriId;
        });
        setStoredCharacter(resultArray);

        return resultArray;
    };

    const deleteCharacterOrd = () => {
        const characterOrdArr: number[] = [...storedCharacterOrd];
        const resultOrd = _.reject(characterOrdArr, (ord: number) => {
            return ord === oriId;
        });
        setStoredCharacterOrd(resultOrd);
    };

    const deleteTodo = () => {
        const todoArr: ITodo[] = [...storedTodo];

        const deleteResult = todoArr.map((todoObj: ITodo) => {
            todoObj.character = _.reject(todoObj.character, (character: ICharacterTodo) => {
                return character.id === oriId;
            });

            return todoObj;
        });

        setStoredTodo(deleteResult);
    };

    const reCrollCharacterInfo = async () => {
        try {
            setSpinnerVisible(true);
            await crollCharacterInfo('refresh');
        } finally {
            setSpinnerVisible(false);
        }
    };

    return (
        <FormContainer>
            <RefreshButtonArticle>
                <Button className="reCrollCharacter" onClick={async () => await reCrollCharacterInfo()}>
                    갱신
                </Button>
            </RefreshButtonArticle>
            <CharacterForm color={color} setColor={setColor} name={name} setName={setName} />
            <EditButtonContainer
                editClassName="editCharacter"
                onClickDelete={onClickDelete}
                onClickEdit={onClickEdit}
            />
        </FormContainer>
    );
};

const RefreshButtonArticle = styled.article`
    position: absolute;
    top: 2.5rem;
    right: 3rem;
    width: 60px;
`;

export default CharacterEdit;
