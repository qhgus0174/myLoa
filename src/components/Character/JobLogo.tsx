import React from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';

type IIconType =
    | 'Destroyer'
    | 'Warrior'
    | 'Berserker'
    | 'Holyknight'
    | 'BattleMaster'
    | 'Infighter'
    | 'SoulMaster'
    | 'LanceMaster'
    | 'Striker'
    | 'DevilHunter'
    | 'Blaster'
    | 'HawkEye'
    | 'Scouter'
    | 'Gunslinger'
    | 'Bard'
    | 'Summoner'
    | 'Arcana'
    | 'Sorceress'
    | 'Demonic'
    | 'Blade'
    | 'Reaper'
    | 'Artist'
    | 'Weather';

interface IIcon {
    shape: string;
    width?: number;
    height?: number;
}

const JobLogo = ({ shape, width = 28, height = 27 }: IIcon) => {
    const icon = () => {
        let engName: IIconType | '' = '';

        switch (shape) {
            case '디스트로이어':
                engName = 'Destroyer';
                break;
            case '워로드':
                engName = 'Warrior';
                break;
            case '버서커':
                engName = 'Berserker';
                break;
            case '홀리나이트':
                engName = 'Holyknight';
                break;
            case '배틀마스터':
                engName = 'BattleMaster';
                break;
            case '인파이터':
                engName = 'Infighter';
                break;
            case '기공사':
                engName = 'SoulMaster';
                break;
            case '창술사':
                engName = 'LanceMaster';
                break;
            case '스트라이커':
                engName = 'Striker';
                break;
            case '데빌헌터':
                engName = 'DevilHunter';
                break;
            case '블래스터':
                engName = 'Blaster';
                break;
            case '호크아이':
                engName = 'HawkEye';
                break;
            case '스카우터':
                engName = 'Scouter';
                break;
            case '건슬링어':
                engName = 'Gunslinger';
                break;
            case '바드':
                engName = 'Bard';
                break;
            case '서머너':
                engName = 'Summoner';
                break;
            case '아르카나':
                engName = 'Arcana';
                break;
            case '소서리스':
                engName = 'Sorceress';
                break;
            case '데모닉':
                engName = 'Demonic';
                break;
            case '블레이드':
                engName = 'Blade';
                break;
            case '리퍼':
                engName = 'Reaper';
                break;
            case '도화가':
                engName = 'Artist';
                break;
            case '기상술사':
                engName = 'Weather';
                break;
            default:
                break;
        }

        return (
            <Image
                alt="직업 로고"
                width={calcRatio().width}
                height={calcRatio().height}
                src={engName ? `/static/img/job/${engName}.png` : `/static/img/job/warning.svg`}
            />
        );
    };

    const calcRatio = (): { width: number; height: number } => {
        var ratio = Math.min(33 / width, 30 / height);

        return { width: width * ratio, height: height * ratio };
    };

    return icon();
};

export default JobLogo;
