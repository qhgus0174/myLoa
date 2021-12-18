import { DateTime } from 'luxon';
import { CompassInfo } from '@common/data/compass';
import { getWeekContents } from '@apis/contents/weekly';
import { weeklyGuardian } from '@common/data/weeklyGuardian';
import { weeklyAbyss } from '@common/data/weeklyAbyss';

interface IDayContents {
    fieldBoss: boolean;
    ghost: boolean;
    chaosGate: boolean;
}

export const getDayContents = (): IDayContents => {
    const dayOfWeek = Number(DateTime.now().toFormat('c'));
    const hour = Number(DateTime.now().toFormat('H'));
    const calcDayOfWeek = hour > 5 ? dayOfWeek - 1 : dayOfWeek - 2 < 0 ? 0 : dayOfWeek - 2;

    const { ghost, chaosGate, fieldBoss } = CompassInfo;

    return {
        fieldBoss: fieldBoss[calcDayOfWeek] === 1,
        ghost: ghost[calcDayOfWeek] === 1,
        chaosGate: chaosGate[calcDayOfWeek] === 1,
    };
};

export interface IWeeklyContents {
    abyss: string[];
    guardian: string[];
}

export const getWeeklyContents = async (): Promise<IWeeklyContents> => {
    const { guardian, abyss } = await getWeekContents();

    const guardianIndex = Number(guardian);
    const abyssIndex = Number(abyss);

    const guardianLength = weeklyGuardian.length;
    const secondIndex = guardianIndex + 1;
    const thirdIndex = guardianIndex + 2;

    return {
        abyss: [weeklyAbyss[abyssIndex][0], weeklyAbyss[abyssIndex][1]],
        guardian: [
            weeklyGuardian[guardianIndex],
            weeklyGuardian[calcIndex(secondIndex, guardianLength)],
            weeklyGuardian[calcIndex(thirdIndex, guardianLength)],
        ],
    };
};

const calcIndex = (index: number, length: number): number => {
    return index >= length ? index - length : index;
};
