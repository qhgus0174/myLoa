#!/usr/bin/env node

import { weeklyAbyss } from '@common/data/weeklyAbyss';
import { weeklyGuardian } from '@common/data/weeklyGuardian';
import { IResponse } from '@common/types/response';
import { IWeeklyContents } from '@common/types/response/contents/weekly';
import axios from 'axios';
import { DateTime } from 'luxon';

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
console.log('now : ', DateTime.now().toISO());
DateTime.now().toFormat('c') === '3' && updateWeeklyContents();
