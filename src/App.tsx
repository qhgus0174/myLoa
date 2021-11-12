import React, { useEffect } from 'react';
import AppRouter from './Router';
import schedule from 'node-schedule';
import useTodo from '@hooks/storage/useTodo';
import { ITodo, ICharacterTodo } from '@components/Todo/TodoType';
import { ThemeProvider } from '@emotion/react';
import { basic } from '@style/theme';
import { GlobalStyle } from '@style/global-styles';
import { ScheduleContents } from '@common/types';
import { getResetCheckArr } from '@components/Todo/common/functions';

const App = () => {
    const [storageTodo, setStorageTodo] = useTodo();

    const resetDailyTodoRelax = () => {
        const todoArr: ITodo[] = JSON.parse(JSON.parse(localStorage.getItem('todo') || '[]'));

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                //체크 최대수치 미만일때 휴게 계산
                //체크 최대수치 : 일일 - 2, 에포나 -3

                if (todo.type !== 'daily') return character;

                const resets = {
                    chaos: () => calcRelaxGauge(todo, character),
                    guardian: () => calcRelaxGauge(todo, character),
                    basicReset: () => resetCheck(todo.contents, character),
                    epona: () => character,
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
        const maxCheckCount = 2;
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
        return checkArr.reduce((count, num) => (num === 2 ? count + 1 : count), 0);
    };

    const resetWeeklyTodo = () => {
        const todoArr: ITodo[] = JSON.parse(JSON.parse(localStorage.getItem('todo') || '[]'));

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                return todo.type === 'weekly' ? resetCheck(todo.contents, character) : character;
            });

            return todo;
        });

        setStorageTodo(JSON.stringify(calcResult));
    };

    useEffect(() => {
        // 일일 휴식 게이지, 체크 초기화 (매일 오전 6시)
        schedule.scheduleJob('0 0 6 * * *', () => {
            resetDailyTodoRelax();
        });

        // 주간 초기화 (수요일 오전 6시)
        schedule.scheduleJob('0 0 6 * * 3', () => {
            resetWeeklyTodo();
        });
    }, []);

    return (
        <>
            <ThemeProvider theme={basic}>
                <GlobalStyle />
                <AppRouter />
            </ThemeProvider>
        </>
    );
};

export default App;
