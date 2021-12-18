import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { PagingActionContext, PagingStateContext } from '@context/PagingContext';
import { ModalActionContext } from '@context/ModalContext';
import { SpinnerContext } from '@context/SpinnerContext';
import { ICharacterTodo, ITodo } from '@common/types/localStorage/Todo';
import { isDuplicate } from '@components/Character/common/functions';
import { getCrollCharacterInfo } from '@components/Character/common/croll';
import { getResetCheckArr } from '@components/Todo/common/functions';
import AddButtonContainer from '@components/Container/Button/Add';
import { ICharacter } from '@common/types/localStorage/Character';
import CharacterForm from '@components/Character/common/Form';
import { ILedgerOwn } from '@common/types/localStorage/Ledger';
import { useTheme } from '@emotion/react';
import { Container } from '@style/common/modal';
import { IRaid, IRaidCharacter } from '@common/types/localStorage/Raid';
import { IFileterRaidLevel } from 'pages/todo';
import { IRaidGold } from '@common/types/response/ledger/raid';
import { getRaid } from '@apis/ledger/raid';

const CharacterAdd = () => {
    const { storedTodo, storedCharacter, storedCharacterOrd, storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredTodo, setStoredCharacter, setStoredCharacterOrd, setStoredLedger } =
        useContext(LocalStorageActionContext);

    const { setSpinnerVisible } = useContext(SpinnerContext);
    const { setCurrentPage } = useContext(PagingActionContext);
    const { perPage } = useContext(PagingStateContext);

    const theme = useTheme();

    const [color, setColor] = useState<string>(theme.colors.text);

    const { closeModal } = useContext(ModalActionContext);

    const [name, setName] = useState<string>('');

    const onClickAdd = async () => {
        if (checkNameIsEmpty()) return;
        if (storedCharacterOrd.length > 0 && checkNameIsDuplicate()) return;

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
            nodata: () => toast.error(validMsg || ''),
        };

        setCharacterInfo[status] && setCharacterInfo[status]();
    };

    const addCharacter = (crollJob: string, crollLevel: string) => {
        const characterArr: ICharacter[] = [...storedCharacter];
        const maxCharacterId = Math.max(...characterArr.map(char => char.id), 0);
        const characterId = characterArr.length == 0 ? 0 : maxCharacterId + 1;

        const resultArr = addCharacterInfo(crollJob, crollLevel, characterId);
        addCharacterOrd(characterId);
        addTodoCharacterInfo(characterId);
        setCurrentCharacterPage(resultArr);
        setLedger(characterId);

        toast.success(`[${name}] 캐릭터가 추가되었습니다.`);

        closeModal();
    };

    const setLedger = (characterId: number) => {
        const ledgerCharacterArr = storedLedger.own!.map((goods: ILedgerOwn) => {
            return goods.characterId;
        });

        if (ledgerCharacterArr.includes(characterId)) return;

        const charactersLedger: ILedgerOwn = {
            characterId: characterId,
            prevWeekGold: [0, 0, 0, 0],
            histories: { raid: { fold: true, data: [] }, goods: { fold: true, data: [] } },
        };

        setStoredLedger(Object.assign({}, storedLedger, { ...storedLedger }.own.push(charactersLedger)));
    };

    const addCharacterInfo = (crollJob: string, crollLevel: string, characterId: number): ICharacter[] => {
        const characterArr: ICharacter[] = [...storedCharacter];

        const characterInfo: ICharacter = {
            id: characterId,
            name: name,
            level: crollLevel,
            job: crollJob,
            color: color,
            lastSearch: 0,
        };

        characterArr.push(characterInfo);
        setStoredCharacter(characterArr);
        return characterArr;
    };

    const addCharacterOrd = (characterId: number) => {
        const characterOrdArr: number[] = [...storedCharacterOrd];

        characterOrdArr.push(characterId);
        setStoredCharacterOrd(characterOrdArr);
    };

    const addTodoCharacterInfo = (characterId: number) => {
        const todoArr: ITodo[] = [...storedTodo];

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

        setStoredTodo(todoCharacterArr);
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
        <Container>
            <CharacterForm color={color} name={name} setName={setName} setColor={setColor} />
            <AddButtonContainer addClassName="addCharacter" onClickAdd={onClickAdd} />
        </Container>
    );
};

export default CharacterAdd;
