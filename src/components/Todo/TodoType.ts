export interface ITodo {
    id: number;
    name: string;
    type: string;
    contents: string;
    checkType: string;
    color: string;
    character: ICharacterTodo[];
}

export interface ICharacterTodo {
    id: number;
    check: number;
    relaxGauge: number;
    memo?: string;
}

export interface ITodoCheck {
    todoId: number;
    id: number;
    check: number;
    relaxGauge: number;
    memo?: string;
}
