const resetDailyTodoRelax = () => {
    const todoArr = JSON.parse(JSON.parse(window.localStorage.getItem('todo')));

    const calcResult = todoArr.map(todo => {
        todo.character = todo.character.map(character => {
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

    window.localStorage.setItem('todo', JSON.stringify(calcResult));

    const dayOfWeek = Number(DateTime.now().toFormat('c'));
    dayOfWeek === 2 && resetWeeklyTodo();
};

const resetCheck = (contents, character) => {
    const resetTodoData = {
        ...character,
        check: getResetCheckArr(contents),
    };

    return resetTodoData;
};

const calcRelaxGauge = (todo, character) => {
    const maxCheckCount = ['chaos', 'guardian'].includes(todo.contents) ? 2 : 1;
    const addGauge = (maxCheckCount - getCheckCounts(character.check)) * 10;

    const relaxGauge = character.relaxGauge >= 100 ? 100 : Number(character.relaxGauge) + addGauge;

    const resetTodoData = {
        ...character,
        relaxGauge: relaxGauge,
        oriRelaxGauge: relaxGauge,
        check: getResetCheckArr(todo.contents),
    };

    return resetTodoData;
};

const getCheckCounts = checkArr => {
    return checkArr.reduce((count, num) => (num === 1 ? count + 1 : count), 0);
};

const resetWeeklyTodo = () => {
    const todoArr = JSON.parse(JSON.parse(window.localStorage.getItem('todo')));

    const calcResult = todoArr.map(todo => {
        todo.character = todo.character.map(character => {
            return todo.type === 'weekly' ? resetCheck(todo.contents, character) : character;
        });

        return todo;
    });

    window.localStorage.setItem('todo', JSON.stringify(calcResult));
};

resetDailyTodoRelax();
