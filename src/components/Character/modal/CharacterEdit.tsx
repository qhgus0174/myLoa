import React, { useContext, useEffect, useState } from 'react';
import reject from 'lodash-es/reject';
import { toast } from 'react-toastify';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { PagingActionContext, PagingStateContext } from '@context/PagingContext';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import { isDuplicate } from '@components/Character/common/functions';
import { getCrollCharacterInfo } from '@components/Character/common/croll';
import { ICharacterTodo, ITodo } from '@common/types/localStorage/Todo';
import EditButtonContainer from '@components/Container/Button/DelEdit';
import { ICharacter } from '@common/types/localStorage/Character';
import CharacterForm from '@components/Character/common/Form';
import { IRaid, IRaidCharacter } from '@common/types/localStorage/Raid';
import { ILedgerOwn, ILedger } from '@common/types/localStorage/Ledger';
import Button from '@components/Button/Button';
import { Container } from '@style/common/modal';
import styled from '@emotion/styled';

interface ICharacterEdit {
    id: number;
    name: string;
    color: string;
}

const CharacterEdit = ({ id: oriId, name: newName, color: oriColor }: ICharacterEdit) => {
    const { storedTodo, storedCharacter, storedCharacterOrd, storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredTodo, setStoredCharacter, setStoredCharacterOrd, setStoredLedger } =
        useContext(LocalStorageActionContext);

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
            nodata: () => toast.error(validMsg || ''),
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

        toast.success(type === 'edit' ? `[${name}] ???????????? ?????????????????????.` : `${name} ???????????? ?????????????????????.`);

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

        toast.success(`[${name}] ???????????? ?????????????????????.`);

        closeModal();
    };

    const checkNameIsDuplicate = (): boolean => {
        if (newName !== name && isDuplicate(name)) {
            toast.error('????????? ???????????? ?????????.');
            return true;
        }

        return false;
    };

    const checkNameIsEmpty = (): boolean => {
        if (!name) {
            toast.error('????????? ?????? ?????? ??? ?????????.');
            return true;
        }

        return false;
    };

    const onClickDelete = () => {
        const deletedCharacterArr = deleteCharacterInfo();
        deleteTodo();
        setCurrentCharacterPage(deletedCharacterArr);
        deleteLedger();

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
        const resultArray = reject(characterArr, ({ id }: ICharacter) => {
            return id === oriId;
        });
        setStoredCharacter(resultArray);

        return resultArray;
    };

    const deleteCharacterOrd = () => {
        const characterOrdArr: number[] = [...storedCharacterOrd];
        const resultOrd = reject(characterOrdArr, (ord: number) => {
            return ord === oriId;
        });
        setStoredCharacterOrd(resultOrd);
    };

    const deleteTodo = () => {
        const todoArr: ITodo[] = [...storedTodo];

        const deleteResult = todoArr.map((todoObj: ITodo) => {
            todoObj.character = reject(todoObj.character, (character: ICharacterTodo) => {
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

    const deleteLedger = () => {
        const ledger = { ...storedLedger };

        const rejectedLedger = reject(ledger.own, ({ characterId }: ILedgerOwn) => {
            return characterId === oriId;
        });

        const result: ILedger = {
            ...ledger,
            own: rejectedLedger,
        };

        setStoredLedger(result);
    };

    return (
        <Container>
            <AbsoulteDiv>
                <Button className="reCrollCharacter" onClick={async () => await reCrollCharacterInfo()}>
                    ??????
                </Button>
            </AbsoulteDiv>
            <CharacterForm color={color} setColor={setColor} name={name} setName={setName} />
            <EditButtonContainer
                editClassName="editCharacter"
                onClickDelete={onClickDelete}
                onClickEdit={onClickEdit}
            />
        </Container>
    );
};

const AbsoulteDiv = styled.div`
    position: absolute;
    top: 2.5rem;
    right: 3rem;
    width: 60px;
`;

export default CharacterEdit;
