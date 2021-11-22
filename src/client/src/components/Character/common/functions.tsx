import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { ICharacter } from '@components/Character/CharacterType';
import { getStorage } from '@storage/index';
import { IError } from 'types/response';

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
        const { message } = err as Error;

        await axios.post('/api/error', { message: message, errType: 'croll' } as IError);

        return { status: 'error', validMsg: '캐릭터 정보를 불러올 수 없습니다.', crollJob: '', crollLevel: '' };
    }
};

export const isDuplicate = (name: string) => {
    const characterArr: ICharacter[] = getStorage('character');
    return characterArr.some(character => character.name === name);
};