import { ScheduleCheckType, ScheduleContents, ScheduleType } from 'common/types';

export interface ITodo {
    id: number;
    name: string;
    type: ScheduleType;
    contents: ScheduleContents;
    checkType: ScheduleCheckType;
    color: string;
    showCharacter: number[];
    character: ICharacterTodo[];
    detailName?: string[];
}

export interface ICharacterTodo {
    id: number;
    check: number[];
    relaxGauge: number;
    oriRelaxGauge: number;
    text?: string;
    memo?: string;
}

export interface ITodoCheck extends ICharacterTodo {
    todoType: ScheduleType;
    todoId: number;
    todoContents: ScheduleContents;
    showCharacter: number[];
    checkType: ScheduleCheckType;
}
