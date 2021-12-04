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
    isFixed: boolean;
}

export interface IGuardianInfo {
    step: string;
    info: string;
}

export interface ICharacterTodo {
    id: number;
    check: number[];
    relaxGauge: number;
    oriRelaxGauge: number;
    eponaName: string[];
    guardianInfo: IGuardianInfo;
    text?: string;
    memo?: string;
}

export interface ITodoCheck extends ICharacterTodo {
    todoType: ScheduleType;
    todoId: number;
    todoName: string;
    todoContents: ScheduleContents;
    showCharacter: number[];
    checkType: ScheduleCheckType;
    setTodo: (e: any[]) => void;
}
