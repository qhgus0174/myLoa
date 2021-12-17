import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { insertErrorDB } from '@common/error';

export interface ICrollInfo {
    status: 'success' | 'error';
    validMsg?: string;
    crollJob?: string | undefined;
    crollLevel?: string | undefined;
}

export interface ICrollInfoAll {
    status: 'success' | 'error';
    validMsg?: string;
    data: string[];
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
        return {
            status: 'error',
            validMsg: '캐릭터 정보를 불러올 수 없습니다. 로스트아크 점검시간이 아닌지 확인 해 주세요.',
            crollJob: '',
            crollLevel: '',
        };
    }
};

export const allCharacter = async (name: string): Promise<ICrollInfoAll> => {
    try {
        const { data }: AxiosResponse<string> = await axios.get(
            `https://corsanywheremyloa.herokuapp.com/https://lostark.game.onstove.com/Profile/Character/${name}`,
        );
        const $ = load(data);

        const server = $('.profile-character-info__server').text();
        const otherServer = $('.profile-character-list__server');

        let characterArr: string[] = [];
        otherServer.each((i, allServerData) => {
            const all = $(allServerData);

            if (all.text() === server) {
                $(all.next())
                    .find('span')
                    .each((j, sameServerData) => {
                        $(sameServerData).find('span').text() != '' &&
                            characterArr.push($(sameServerData).find('span').text());
                    });
            }
        });

        return { status: 'success', data: characterArr };
    } catch (err: unknown) {
        insertErrorDB({ catchErr: err, errType: 'croll' });
        return {
            status: 'error',
            validMsg: '캐릭터 정보를 불러올 수 없습니다. 로스트아크 점검시간이 아닌지 확인 해 주세요.',
            data: [],
        };
    }
};
