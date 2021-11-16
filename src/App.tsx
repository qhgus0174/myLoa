import React, { useEffect } from 'react';
import AppRouter from './Router';
import schedule from 'node-schedule';
import { CronJob } from 'cron';

import GlobalThemeContext from '@context/GlobalThemeContext';
import useTodo from '@hooks/storage/useTodo';
import { getStorage } from '@storage/index';
import { getResetCheckArr } from '@components/Todo/common/functions';
import { ITodo, ICharacterTodo } from '@components/Todo/TodoType';
import { ScheduleContents } from '@common/types';

const App = () => {
    const [storageTodo, setStorageTodo] = useTodo();

    const resetDailyTodoRelax = () => {
        const todoArr: ITodo[] = getStorage('todo');

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                //체크 최대수치 미만일때 휴게 계산
                //체크 최대수치 : 일일 - 2, 에포나 -3

                if (todo.type !== 'daily') return character;

                const resets = {
                    chaos: () => calcRelaxGauge(todo, character),
                    guardian: () => calcRelaxGauge(todo, character),
                    basicReset: () => resetCheck(todo.contents, character),
                    epona: () => resetCheck(todo.contents, character),
                    basic: () => character,
                    none: () => character,
                };

                return resets[todo.contents] && resets[todo.contents]();
            });

            return todo;
        });

        setStorageTodo(JSON.stringify(calcResult));
    };

    const resetCheck = (contents: ScheduleContents, character: ICharacterTodo): ICharacterTodo => {
        const resetTodoData: ICharacterTodo = {
            ...character,
            check: getResetCheckArr(contents),
        };

        return resetTodoData;
    };

    const calcRelaxGauge = (todo: ITodo, character: ICharacterTodo): ICharacterTodo => {
        const maxCheckCount = ['chaos', 'guardian'].includes(todo.contents) ? 2 : 1;
        const addGauge = (maxCheckCount - getCheckCounts(character.check)) * 10;

        const relaxGauge = character.relaxGauge >= 100 ? 100 : Number(character.relaxGauge) + addGauge;

        const resetTodoData: ICharacterTodo = {
            ...character,
            relaxGauge: relaxGauge,
            oriRelaxGauge: relaxGauge,
            check: getResetCheckArr(todo.contents),
        };

        return resetTodoData;
    };

    const getCheckCounts = (checkArr: number[]): number => {
        return checkArr.reduce((count, num) => (num === 1 ? count + 1 : count), 0);
    };

    const resetWeeklyTodo = () => {
        const todoArr: ITodo[] = getStorage('todo');

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                return todo.type === 'weekly' ? resetCheck(todo.contents, character) : character;
            });

            return todo;
        });

        setStorageTodo(JSON.stringify(calcResult));
    };

    useEffect(() => {
        const jobDaily = new CronJob('0 30 17 * * *', () => resetDailyTodoRelax(), null, true, 'Asia/Seoul');
        jobDaily.start();

        const jobWeek = new CronJob('0 0 6 * * 3', () => resetWeeklyTodo(), null, true, 'Asia/Seoul');
        jobWeek.start();
    }, []);

    return (
        <>
            <GlobalThemeContext>
                <AppRouter />
            </GlobalThemeContext>
        </>
    );
};

export default App;
