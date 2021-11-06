import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import { useInput } from '@hooks/useInput';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { ModalActionContext } from '@context/ModalContext';
import { toast } from 'react-toastify';
import useTodo from '@hooks/storage/useTodo';
import TextBox from '@components/Input/TextBox';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import { ICharacter } from '../CharacterType';
import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { FlexDiv } from '@style/common';
import styled from '@emotion/styled';
import { ColorResult, CompactPicker } from 'react-color';
import { SpinnerContext } from '@context/SpinnerContext';
import {
    ContentsDiv,
    ContentsDivTitle,
    FormButtonContainer,
    FormContainer,
    FormDivContainer,
} from '@style/common/modal';

const CharacterAdd = ({ perPage, setCurrentPage }: { perPage: number; setCurrentPage: (e: number) => void }) => {
    const [storageCharacter, setStorageCharacter] = useCharacter();
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();
    const { setSpinnerVisible } = useContext(SpinnerContext);

    const [color, setColor] = useState<string>('#ffffff');
    const { closeModal } = useContext(ModalActionContext);

    const [name, bindName] = useInput<string>('');

    const validate = () => {
        const characterArr: ICharacter[] = JSON.parse(storageCharacter);
        return characterArr.some(character => character.name === name);
    };

    const onClickAdd = async () => {
        setSpinnerVisible(true);
        await setCharacterInfo();
        setSpinnerVisible(false);
    };

    const setCharacterInfo = async () => {
        try {
            const { data }: AxiosResponse<string> = await axios.get(
                `https://cors-anywhere.herokuapp.com/https://lostark.game.onstove.com/Profile/Character/${name}`,
            );
            const $ = load(data);
            const crollJob: string | undefined = $('.profile-character-info__img').attr('alt');
            const crollLevel: string | undefined = $('.level-info2__expedition>span:nth-child(2)').text();

            addCharacter(crollJob || '', crollLevel || '');
        } catch (e: unknown) {
            //todo : 에러처리 - 메시지
        }
    };

    const addCharacter = (p: string, pp: string) => {
        if (validate()) {
            toast.error('중복된 캐릭터명 입니다.');
            return;
        }

        const characterArr: ICharacter[] = JSON.parse(storageCharacter);
        const characterOrdArr: number[] = JSON.parse(storageCharacterOrd);

        const maxValueId = Math.max(...characterArr.map(o => o.id), 0);

        const characterId = characterArr.length == 0 ? 0 : maxValueId + 1;

        const characterInfo: ICharacter = {
            id: characterId,
            name: name,
            level: pp,
            job: p,
            color: color,
            lastSearch: 0,
        };

        characterArr.push(characterInfo);
        characterOrdArr.push(characterId);

        setStorageCharacter(JSON.stringify(characterArr));
        setStorageCharacterOrd(JSON.stringify(characterOrdArr));

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

        const currentPage = Math.ceil(
            JSON.parse(JSON.parse(localStorage.getItem('character') || '[]')).length / perPage,
        );
        setCurrentPage(currentPage);

        closeModal();
    };

    return (
        <FormContainer>
            <FormDivContainer>
                <FlexDiv direction="column">
                    <ContentsDivTitle>캐릭터명</ContentsDivTitle>
                    <ContentsDiv>
                        <TextBox {...bindName} />
                    </ContentsDiv>
                </FlexDiv>

                <FlexDiv direction="column">
                    <ContentsDivTitle>색상</ContentsDivTitle>
                    <ContentsDiv>
                        <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
                    </ContentsDiv>
                </FlexDiv>
            </FormDivContainer>
            <FormButtonContainer>
                <Button onClick={onClickAdd}>추가</Button>
                <Button onClick={() => closeModal()}>닫기</Button>
            </FormButtonContainer>
        </FormContainer>
    );
};

export default CharacterAdd;
