import axios from 'axios';
import { ICharacter } from '@common/types/localStorage/Character';

export const isDuplicate = (name: string) => {
    const characterArr: ICharacter[] = JSON.parse(JSON.parse(localStorage.getItem('character') as string));
    return characterArr.some(character => character.name === name);
};

export const sortOrd = (array: number[], start: number, destination: number) => {
    const newArr = [...array];
    const [reorderedItem] = newArr.splice(start, 1);
    newArr.splice(destination, 0, reorderedItem);

    return newArr;
};
