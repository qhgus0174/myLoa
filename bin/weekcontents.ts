#!/usr/bin/env node

import { weeklyAbyss } from '../client/src/common/data/weeklyAbyss';
import { weeklyGuardian } from '../client/src/common/data/weeklyGuardian';
import axios from '../node_modules/axios';
import { IResponse, IWeeklyContents } from '../client/src/common/responseType';

const getStartIndex = (arr: string[] | string[][], oriData: string): string => {
    const length = arr.length;
    const index = Number(oriData) + 1;
    const startIndex = index >= length ? 0 : index;

    return String(startIndex);
};

const updateWeeklyContents = async () => {
    const {
        result: { guardian: guardianIndex, abyss: abyssIndex },
    } = (await (
        await axios.get(`/api/weeklyContents`)
    ).data) as IResponse<IWeeklyContents>;

    await axios.put(`/api/weeklyContents/edit`, {
        guardian: getStartIndex(weeklyGuardian, guardianIndex),
        abyss: getStartIndex(weeklyAbyss, abyssIndex),
    });
};

updateWeeklyContents();
