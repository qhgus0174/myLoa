import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { NextSeo } from 'next-seo';
import { toast } from 'react-toastify';
import { GA } from '@service/ga';
import { getShareContents } from '@apis/contents/share';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { SpinnerContext } from '@context/SpinnerContext';
import { initDayContents, initLedger } from '@hooks/useLocalStorage';
import { usePromiseEffect } from '@hooks/usePromiseEffect';
import { useInput } from '@hooks/useInput';
import { allCharacter, getCrollCharacterInfo } from '@components/Character/common/croll';
import { getResetCheckArr } from '@components/Todo/common/functions';
import AllCustom from '@components/Todo/view/AllCustom';
import Weekly from '@components/Todo/view/Weekly';
import TextBox from '@components/Input/TextBox';
import Button from '@components/Button/Button';
import { IShareContents } from '@common/types/localStorage/ShareContents';
import { ITodo, ICharacterTodo } from '@common/types/localStorage/Todo';
import { ILedger, ILedgerOwn } from '@common/types/localStorage/Ledger';
import { parseStorageItem, stringifyStorageItem } from '@common/utils';
import { ICharacter } from '@common/types/localStorage/Character';
import { ScheduleContents } from '@common/types/types';
import { insertErrorDB } from '@common/error';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

export interface IFileterRaidLevel {
    id: string;
    showArr: number[];
}

const Main = () => {
    const theme = useTheme();

    const { setSpinnerVisible } = useContext(SpinnerContext);
    const [activeTab, setActiveTab] = useState<number>(1);

    const { storedCharacter } = useContext(LocalStorageStateContext);
    const { setStoredShareContents, setStoredCharacter, setStoredCharacterOrd, setStoredLedger } =
        useContext(LocalStorageActionContext);

    const [repreCharacter, bindRepreCharacter] = useInput<string>('');

    useEffect(() => {
        calcReset();
    }, []);

    useEffect(() => GA.trackPageView({ path: window.location.pathname }), []);

    const resolePromise = usePromiseEffect(async () => {
        setSpinnerVisible(true);

        !localStorage.getItem('shareDay') && localStorage.setItem('shareDay', stringifyStorageItem(initDayContents()));
        (!localStorage.getItem('share') || parseStorageItem(localStorage.getItem('share') as string).length < 1) &&
            (await initShareContents());

        !localStorage.getItem('ledger') && ledgerInit();
        setSpinnerVisible(false);
    }, []);

    const ledgerInit = () => {
        if (
            !parseStorageItem(localStorage.getItem('character') as string) ||
            parseStorageItem(localStorage.getItem('character') as string).length < 1
        )
            return;

        const commonLedger = initLedger.common;

        const goodsLedger: ILedger['own'] = parseStorageItem(localStorage.getItem('character') as string).map(
            (character: ICharacter) => {
                const charactersLedger: ILedgerOwn = {
                    characterId: character.id,
                    prevWeekGold: [0, 0, 0, 0],
                    histories: { raid: { fold: true, data: [] }, goods: { fold: true, data: [] } },
                };
                return charactersLedger;
            },
        );
        setStoredLedger(Object.assign({}, { common: commonLedger }, { own: goodsLedger }));
    };

    const initShareContents = async () => {
        try {
            setSpinnerVisible(true);
            const shareContents = await getShareContents();
            const initData = shareContents.map(({ id, name, iconurl }) => {
                const result: IShareContents = {
                    id: Number(id),
                    name: name,
                    check: 0,
                    iconurl: iconurl,
                };
                return result;
            }) as unknown as IShareContents[];

            setStoredShareContents(initData);
        } catch (err: unknown) {
            insertErrorDB({ catchErr: err, errType: 'initShare' });
        } finally {
            setSpinnerVisible(false);
        }
    };

    const crollAllMyCharacter = async () => {
        if (!repreCharacter) {
            toast.error('캐릭터 명을 입력해주세요.');
            return;
        }

        setSpinnerVisible(true);

        try {
            const { status, validMsg, data } = await allCharacter(repreCharacter);

            const setCharacterInfo = {
                success: async () => await initAllCharacters(data),
                error: () => toast.error(validMsg || ''),
            };

            setCharacterInfo[status] && (await setCharacterInfo[status]());
        } catch (err: unknown) {
            setSpinnerVisible(false);
            toast.error('캐릭터 정보를 불러올 수 없습니다. 로스트아크 점검시간이 아닌지 확인 해 주세요.');
            insertErrorDB({ catchErr: err, errType: 'croll' });
        }
    };

    const initAllCharacters = async (array: string[]) => {
        let characters: ICharacter[] = [];
        let charactersOrd: number[] = [];
        let ledger: ILedger = initLedger;

        for (let index = 0; index < array.length; index++) {
            const { status, validMsg, crollJob, crollLevel } = await getCrollCharacterInfo(array[index]);

            const setCharacterInfo = {
                success: () =>
                    addCharacter(
                        array[index],
                        crollJob || '',
                        crollLevel || '',
                        index + 1,
                        characters,
                        charactersOrd,
                        ledger,
                    ),
                error: () => toast.error(validMsg || ''),
            };
            setCharacterInfo[status] && setCharacterInfo[status]();
        }

        setStoredCharacter(characters);

        const levelSortArr = characters
            .sort(({ level: beforeLevel }, { level: afterLevel }) => {
                return Number(afterLevel.replaceAll(',', '')) - Number(beforeLevel.replaceAll(',', ''));
            })
            .map(({ id }) => id);

        await initShareContents();
        setStoredCharacterOrd(levelSortArr);
        localStorage.setItem('ledger', stringifyStorageItem(ledger));
    };

    const addCharacter = (
        name: string,
        crollJob: string,
        crollLevel: string,
        characterId: number,
        characters: ICharacter[],
        charactersOrd: number[],
        ledger: ILedger,
    ) => {
        characters.push(addCharacterInfo(name, crollJob, crollLevel, characterId));
        charactersOrd.push(characterId);
        ledger.own.push(setLedger(characterId));
    };

    const setLedger = (characterId: number) => {
        const charactersLedger: ILedgerOwn = {
            characterId: characterId,
            prevWeekGold: [0, 0, 0, 0],
            histories: { raid: { fold: true, data: [] }, goods: { fold: true, data: [] } },
        };
        return charactersLedger;
    };

    const addCharacterInfo = (name: string, crollJob: string, crollLevel: string, characterId: number): ICharacter => {
        const characterInfo: ICharacter = {
            id: characterId,
            name: name,
            level: crollLevel,
            job: crollJob,
            color: theme.colors.text,
            lastSearch: 0,
        };

        return characterInfo;
    };

    const resetDailyTodoRelax = (diffDays: number) => {
        const todoArr: ITodo[] = [...parseStorageItem(localStorage.getItem('todo') as string)];
        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                if (todo.type !== 'daily') return character;

                const resets = {
                    chaos: () => calcRelaxGauge(todo, character, diffDays),
                    guardian: () => calcRelaxGauge(todo, character, diffDays),
                    basicReset: () => resetCheck(todo.contents, character),
                    epona: () => resetCheck(todo.contents, character),
                    basic: () => character,
                    none: () => character,
                };

                return resets[todo.contents] && resets[todo.contents]();
            });

            return todo;
        });

        localStorage.setItem('todo', stringifyStorageItem(calcResult));
    };

    const resetWeeklyTodo = () => {
        localStorage.getItem('todo') && resetTodoWeek();
        localStorage.getItem('share') && resetShareWeek();
    };

    const resetTodoWeek = () => {
        const todoArr: ITodo[] = [...parseStorageItem(localStorage.getItem('todo') as string)];

        const calcResult: ITodo[] = todoArr.map((todo: ITodo) => {
            todo.character = todo.character.map((character: ICharacterTodo) => {
                return todo.type === 'weekly' ? resetCheck(todo.contents, character) : character;
            });

            return todo;
        });

        localStorage.setItem('todo', stringifyStorageItem(calcResult));
    };

    const resetShareWeek = () => {
        const shareArr: IShareContents[] = [...parseStorageItem(localStorage.getItem('share') as string)];

        const calcResult: IShareContents[] = shareArr.map((shared: IShareContents) => {
            return { ...shared, check: 0 };
        });

        localStorage.setItem('share', stringifyStorageItem(calcResult));
    };

    const resetCheck = (contents: ScheduleContents, character: ICharacterTodo): ICharacterTodo => {
        const resetTodoData: ICharacterTodo = {
            ...character,
            check: getResetCheckArr(contents),
        };

        return resetTodoData;
    };

    const calcRelaxGauge = (todo: ITodo, character: ICharacterTodo, diffDays: number): ICharacterTodo => {
        const maxCheckCount = ['chaos', 'guardian'].includes(todo.contents) ? 2 : 1;

        const addGauge = (maxCheckCount * diffDays - getCheckCounts(character.check)) * 10;

        const relaxGauge = Number(character.relaxGauge) + addGauge;

        const resetTodoData: ICharacterTodo = {
            ...character,
            relaxGauge: relaxGauge >= 100 ? 100 : relaxGauge,
            oriRelaxGauge: relaxGauge >= 100 ? 100 : relaxGauge,
            check: getResetCheckArr(todo.contents),
        };

        return resetTodoData;
    };

    const getCheckCounts = (checkArr: number[]): number => {
        return checkArr.reduce((count, num) => (num === 1 ? count + 1 : count), 0);
    };

    const calcReset = () => {
        const now = DateTime.now();

        const lastVisitTimeStamp = localStorage.getItem('datetime')
            ? localStorage.getItem('datetime')
            : now.toFormat('X');
        const lastVisitDate = DateTime.fromISO(DateTime.fromSeconds(Number(lastVisitTimeStamp)).toISO());
        const lastVisitDateHour = lastVisitDate.toFormat('HH');

        const resetDateTime =
            Number(lastVisitDateHour) < 6
                ? DateTime.fromISO(lastVisitDate.toFormat('yyyy-LL-dd')).plus({
                      hours: 6,
                  })
                : DateTime.fromISO(lastVisitDate.toFormat('yyyy-LL-dd')).plus({
                      days: 1,
                      hours: 6,
                  });

        const { days: dayDiff } = now.diff(resetDateTime, 'days');

        dayDiff && dayDiff > 0 && resetTodo({ dayDiff: dayDiff, lastVisitDate: lastVisitDate });

        localStorage.setItem('datetime', now.toFormat('X'));
    };

    const resetTodo = ({ dayDiff, lastVisitDate }: { dayDiff: number; lastVisitDate: DateTime }) => {
        resetDailyTodoRelax(Math.ceil(dayDiff));
        localStorage.setItem('shareDay', stringifyStorageItem(initDayContents()));

        const now = DateTime.now();

        const lastVisitStartOfWeek = lastVisitDate.startOf('week');
        const lastVisitWendsdaySixHour = lastVisitStartOfWeek.plus({ days: 2, hours: 6, minutes: 0 });
        const resetWeekDate =
            lastVisitWendsdaySixHour < lastVisitDate
                ? lastVisitWendsdaySixHour.plus({ days: 7 })
                : lastVisitWendsdaySixHour;

        const nowStartOfWeek = now.startOf('week');
        const nowWendsdaySixHour = nowStartOfWeek.plus({ days: 2, hours: 6, minutes: 0 });
        const resetWeekDateNow = nowWendsdaySixHour < now ? nowWendsdaySixHour.plus({ days: 7 }) : nowWendsdaySixHour;

        resetWeekDate < resetWeekDateNow && resetWeeklyTodo();
    };

    return (
        <>
            <NextSeo
                title="로요일좋아 - 로스트아크 숙제 관리"
                description="로스트 아크 숙제 관리 페이지입니다. 일일, 주간 컨텐츠를 편하게 체크해보세요."
                openGraph={{
                    title: '로요일좋아 - 로스트아크 숙제 관리',
                    description: '로스트 아크 숙제 관리 페이지입니다. 일일, 주간 컨텐츠를 편하게 체크해보세요.',
                    url: 'https://loa-day.com/todo',
                    locale: 'ko_KR',
                    type: 'website',
                    images: [
                        {
                            url: 'https://loa-day.com/static/img/logo/logo.png',
                            width: 1200,
                            height: 1200,
                            type: 'image/png',
                        },
                    ],
                }}
            />
            {storedCharacter.length < 1 ? (
                <NodataDiv>
                    <NodataInner>
                        <h2>
                            데이터가 존재하지 않습니다.
                            <br /> 보유 캐릭터 중 하나를 입력하여 추가 해보세요!
                        </h2>
                    </NodataInner>
                    <NodataInner>
                        <TextBox
                            placeholder="캐릭터 명 입력"
                            width="80"
                            divWidth="70"
                            align="center"
                            {...bindRepreCharacter}
                            onKeyPress={e => {
                                if (e.key === 'Enter') crollAllMyCharacter();
                            }}
                        />
                        <Button width="45" className="crollAllCharacter" onClick={() => crollAllMyCharacter()}>
                            모든 캐릭터 가져오기😎
                        </Button>
                    </NodataInner>
                </NodataDiv>
            ) : (
                resolePromise.status === 'fulfilled' && (
                    <MainContainer>
                        <TabsContainer activetab={activeTab} role="tabs">
                            <TabList role="tablist">
                                <Tab onClick={() => setActiveTab(1)} selected={activeTab == 1} role="tab">
                                    원정대 공유
                                </Tab>
                                <Tab onClick={() => setActiveTab(2)} selected={activeTab == 2} role="tab">
                                    일일 / 주간
                                </Tab>
                            </TabList>
                            <TabPanel role="tabpanel">
                                <Weekly />
                            </TabPanel>
                            <TabPanel>
                                <AllCustom />
                            </TabPanel>
                        </TabsContainer>
                    </MainContainer>
                )
            )}
        </>
    );
};

const TabsContainer = styled(Tabs)<{ activetab: number }>`
    & > ul {
        display: flex;
        justify-content: center;
        margin-top: 1em;
        margin-bottom: 1.5em;
    }

    & > ul > li {
        cursor: pointer;
        padding-top: 0.7em;
        padding-bottom: 0.7em;
        padding-right: 2.5em;
        padding-left: 2.5em;
        border: 1px solid;
        background: ${props => props.theme.colors.mainInner};
    }
    ${props =>
        props.activetab == 1
            ? `& > ul > li:nth-of-type(2){
        opacity:0.5;
    }`
            : `& > ul > li:nth-of-type(1){
        opacity:0.5;
    }`}
`;

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    width: 88%;
    margin-top: 1.2vh;

    ${widthMedia.tablet} {
        margin-top: 2.8vh;
    }

    ${widthMedia.phone} {
        width: 95%;
    }
`;

const NodataDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;
    height: 100%;
    margin-top: 9em;
    justify-content: center;
    align-items: center;
    ${widthMedia.desktop} {
        width: 40%;
    }
    ${widthMedia.mediumDesktop} {
        width: 45%;
    }
    ${widthMedia.smallDesktop} {
        width: 60%;
    }
    ${widthMedia.tablet} {
        width: 70%;
    }

    ${widthMedia.tablet} {
        width: 70%;
    }

    ${widthMedia.smallPhone} {
        width: 80%;
    }
`;

const NodataInner = styled.div`
    display: flex;
    width: 80%;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    align-items: center;
    text-align: center;
    justify-content: center;

    h2 {
        font-size: 1.3em;
    }
`;

export default Main;
