import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { ICharacter } from '@components/Character/CharacterType';
import { insertErrorDB } from '@common/error';

export interface ICrollInfo {
    status: 'success' | 'error';
    validMsg?: string;
    crollJob?: string | undefined;
    crollLevel?: string | undefined;
}

export const getCrollCharacterInfo = async (name: string): Promise<ICrollInfo> => {
    try {
        const { data }: AxiosResponse<string> = await axios.get(
            `https://corsanywheremyloa.herokuapp.com/https://lostark.game.onstove.com/Profile/Character/${name}`,
        );
        const $ = load(data);
        const crollJob: string | undefined =
            $('.profile-character-info__img').length > 0
                ? $('.profile-character-info__img').prop('alt')
                : $('.myinfo__badge > dd > img').prop('alt');

        const crollLevel: string | undefined =
            $('.level-info2__expedition>span:nth-child(2)').length > 0
                ? $('.level-info2__expedition>span:nth-child(2)').text()
                : $('dl[class="define item"] > .level').text();

        return { status: 'success', crollJob: crollJob, crollLevel: crollLevel.replace('Lv.', '') };
    } catch (err: unknown) {
        insertErrorDB({ catchErr: err, errType: 'croll' });
        return { status: 'error', validMsg: '캐릭터 정보를 불러올 수 없습니다.', crollJob: '', crollLevel: '' };
    }
};

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
