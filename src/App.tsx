import React, { useEffect } from 'react';
import AppRouter from './Router';
import schedule from 'node-schedule';
import useTodo from '@hooks/storage/useTodo';
import { ITodo, ICharacterTodo } from '@components/Todo/TodoType';

import { ThemeProvider } from '@emotion/react';
import { basic } from '@style/theme';
import { GlobalStyle } from '@style/global-styles';

const App = () => {
    const [storageTodo, setStorageTodo] = useTodo();

    const resetDailyTodo = () => {
        const todoArr: ITodo[] = JSON.parse(JSON.parse(localStorage.getItem('todo') || '[]'));

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                //체크 최대수치 미만일때 휴게 계산
                //체크 최대수치 : 일일 - 2, 에포나 -3
                if (todo.type !== 'daily' || todo.contents == 'none') return character;

                const maxCheckCount = todo.contents === 'chaos' ? 2 : 3;
                const relaxGauge = (maxCheckCount - character.check) * 10;

                const calcRelaxGauge = character.relaxGauge >= 100 ? 100 : Number(character.relaxGauge) + relaxGauge;

                const resetTodoData: ICharacterTodo = {
                    ...character,
                    relaxGauge: calcRelaxGauge,
                    oriRelaxGauge: calcRelaxGauge,
                    check: 0,
                };

                return resetTodoData;
            });

            return todo;
        });

        setStorageTodo(JSON.stringify(calcResult));
    };

    const resetWeeklyTodo = () => {
        const todoArr: ITodo[] = JSON.parse(JSON.parse(localStorage.getItem('todo') || '[]'));

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                if (todo.type !== 'weekly') return character;

                const resetTodoData: ICharacterTodo = {
                    ...character,
                    check: 0,
                };

                return resetTodoData;
            });

            return todo;
        });

        setStorageTodo(JSON.stringify(calcResult));
    };

    useEffect(() => {
        // 일일 휴식 게이지, 체크 초기화 (매일 오전 6시)
        schedule.scheduleJob('0 0 6 * * *', () => {
            resetDailyTodo();
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
