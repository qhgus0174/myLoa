import React, { useEffect, useState } from 'react';
import { ICharacter } from '@components/Character/CharacterType';
import { ITodo } from '@components/Todo/TodoType';

export const useLocalStorage = () => {
    const [storedTodo, setStoredTodo] = useState<ITodo[]>([]);
    const [storedTodoOrd, setStoredTodoOrd] = useState<number[]>([]);
    const [storedCharacter, setStoredCharacter] = useState<ICharacter[]>([]);
    const [storedCharacterOrd, setStoredCharacterOrd] = useState<number[]>([]);

    useEffect(() => {
        const todoData = JSON.parse(JSON.parse(localStorage.getItem('todo') as string));

        if (todoData) {
            setStoredTodo(todoData);
        }
    }, []);

    useEffect(() => {
        const todoOrdData = JSON.parse(JSON.parse(localStorage.getItem('todoOrd') as string));

        if (todoOrdData) {
            setStoredTodoOrd(todoOrdData);
        }
    }, []);

    useEffect(() => {
        const characterData = JSON.parse(JSON.parse(localStorage.getItem('character') as string));

        if (characterData) {
            setStoredCharacter(characterData);
        }
    }, []);

    useEffect(() => {
        const characterOrdData = JSON.parse(JSON.parse(localStorage.getItem('characterOrd') as string));

        if (characterOrdData) {
            setStoredCharacterOrd(characterOrdData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(JSON.stringify(storedTodo)));
    }, [storedTodo]);

    useEffect(() => {
        localStorage.setItem('todoOrd', JSON.stringify(JSON.stringify(storedTodoOrd)));
    }, [storedTodoOrd]);

    useEffect(() => {
        localStorage.setItem('character', JSON.stringify(JSON.stringify(storedCharacter)));
    }, [storedCharacter]);

    useEffect(() => {
        localStorage.setItem('characterOrd', JSON.stringify(JSON.stringify(storedCharacterOrd)));
    }, [storedCharacterOrd]);

    return {
        storedTodo,
        storedTodoOrd,
        storedCharacter,
        storedCharacterOrd,
        setStoredTodo,
        setStoredTodoOrd,
        setStoredCharacter,
        setStoredCharacterOrd,
    };
};
