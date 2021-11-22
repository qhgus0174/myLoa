import axios from 'axios';
import { IResponse } from 'types/response';

interface IAbyss {
    id: string;
    name1: string;
    name2: string;
}

interface IGuardian {
    id: string;
    name: string;
}

const getStartIndex = (arr: string[] | string[][], oriData: string): string => {
    const length = arr.length;
    const index = Number(oriData) + 1;
    const startIndex = index >= length ? 0 : index;

    return String(startIndex);
};

const updateWeeklyContents = async () => {
    const { result: weeklyGuardian } = (await (await axios.get(`/guardian`)).data) as IResponse;
    const { result: weeklyAbyss } = (await (await axios.get(`/abyss`)).data) as IResponse;

    const { result: weeklycontents } = (await (await axios.get(`/weeklyContents`)).data) as IResponse;

    const guardianArr = weeklyGuardian.map((wG: IGuardian) => {
        return wG.name;
    });

    const abyssArr = weeklyAbyss.map((wA: IAbyss) => {
        return [wA.name1, wA.name2];
    });

    const guardianIndex = weeklycontents.guardian;
    const abyssIndex = weeklycontents.abyss;
    await axios.put(`/weeklyContents/edit`, {
        guardian: getStartIndex(guardianArr, guardianIndex),
        abyss: getStartIndex(abyssArr, abyssIndex),
    });
};

updateWeeklyContents();
