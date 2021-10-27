import { ScheduleCheckType, ScheduleContents, ScheduleType } from 'common/types';

export interface ITodo {
    id: number;
    name: string;
    type: ScheduleType;
    contents: ScheduleContents;
    checkType: ScheduleCheckType;
    color: string;
    character: ICharacterTodo[];
}

export interface ICharacterTodo {
    id: number;
    check: number;
    text?: string;
    relaxGauge: number;
    oriRelaxGauge: number;
    memo?: string;
}

export interface ITodoCheck extends ICharacterTodo {
    todoType: ScheduleType;
    todoId: number;
    checkType: ScheduleCheckType;
}
