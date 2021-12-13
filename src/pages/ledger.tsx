import React, { useContext, useEffect, useState } from 'react';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import styled from '@emotion/styled';
import { ILedger, ILedgerHistoryGoods, ILedgerHistoryRaid, ILedgerOwn } from '@components/Ledger/LedgerType';
import { ModalActionContext } from '@context/ModalContext';
import RaidGold from '@components/Ledger/RaidGold';
import GoldHistory from '@components/Ledger/GoldHistory';
import DownArrow from '@components/Image/DownArrow';
import { getCharacterInfoById, parseStorageItem, stringifyStorageItem } from '@common/utils';
import PlusIcon from '@components/Image/PlusIcon';
import GoodsGold from '@components/Ledger/GoodsGold';
import Button from '@components/Button/Button';
import { useTheme } from '@emotion/react';
import CommonGold from '@components/Ledger/CommonGold';
import { SpinnerContext } from '@context/SpinnerContext';
import { insertErrorDB } from '@common/error';
import { getRaidDetail, getRaid } from '@apis/ledger/raid';
import { getCommon, initCommonDropDown } from '@apis/ledger/common';
import { IDropdown } from '@common/types/types';
import { IRaidGold, IRaidGoldDetail } from '@common/types/response/ledger/raid';
import { FlexDiv } from '@style/common';
import TextBox from '@components/Input/TextBox';
import { IGoods, IGoodsImg } from '@common/types/response/ledger/goods';
import { getGoods, getGoodsImg } from '@apis/ledger/goods';
import { usePromiseEffect } from '@hooks/usePromiseEffect';
import Spinner from '@components/Spinner/Spinner';
import { ICommonGold } from '@common/types/response/ledger/common';
import { calcSum } from '@components/Ledger/common/functions';
import { DateTime } from 'luxon';
import { initCommonHistory } from '@hooks/useLocalStorage';

interface ILedgerObjects {
    raid: IRaidGold[];
    raidDetail: IRaidGoldDetail[];
    common: ICommonGold[];
    goods: IGoods[];
    goodsImg: IGoodsImg[];
}

const Ledger = () => {
    const { setSpinnerVisible } = useContext(SpinnerContext);

    const { storedCharacter, storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredLedger } = useContext(LocalStorageActionContext);

    const { status, result: ledgerData } = usePromiseEffect(async (): Promise<ILedgerObjects> => {
        setSpinnerVisible(true);

        const raid = await getRaid();
        const raidDetail = await getRaidDetail();
        const common = await getCommon();
        const goods = await getGoods();
        const goodsImg = await getGoodsImg();
        localStorage.getItem('ledger') && calcWeekGold();
        setSpinnerVisible(false);

        return { raid, raidDetail, common, goods, goodsImg };
    }, []);

    const theme = useTheme();

    const foldGoodsDiv = ({ characterIndex, foldState }: { characterIndex: number; foldState: boolean }) => {
        const ledgerArr: ILedger = Object.assign({}, storedLedger);

        ledgerArr.own[characterIndex].histories.goods.fold = !foldState;
        setStoredLedger(ledgerArr);
    };

    const foldRaidDiv = ({ characterIndex, foldState }: { characterIndex: number; foldState: boolean }) => {
        const ledgerArr: ILedger = Object.assign({}, storedLedger);

        ledgerArr.own[characterIndex].histories.raid.fold = !foldState;
        setStoredLedger(ledgerArr);
    };

    const calcWeekGold = () => {
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

        const lastVisitStartOfWeek = lastVisitDate.startOf('week');
        const lastVisitWendsdaySixHour = lastVisitStartOfWeek.plus({ days: 2, hours: 6, minutes: 0 });
        const resetWeekDate =
            lastVisitWendsdaySixHour < lastVisitDate
                ? lastVisitWendsdaySixHour.plus({ days: 7 })
                : lastVisitWendsdaySixHour;

        const nowStartOfWeek = now.startOf('week');
        const nowWendsdaySixHour = nowStartOfWeek.plus({ days: 2, hours: 6, minutes: 0 });
        const resetWeekDateNow = nowWendsdaySixHour < now ? nowWendsdaySixHour.plus({ days: 7 }) : nowWendsdaySixHour;

        dayDiff && dayDiff > 0 && resetWeekDate < resetWeekDateNow && calcGold();
    };

    const calcGold = () => {
        const newLedger: ILedger = { ...parseStorageItem(localStorage.getItem('ledger') as string) },
            { common, own } = newLedger;

        //지난주 계산
        //공통 골드
        common.prevWeekGold.pop();
        common.prevWeekGold.unshift(calcSum(newLedger.common.histories));
        common.histories = initCommonHistory;

        //개인 골드
        own.forEach(({ characterId }: ILedgerOwn, index) => {
            const goodsIndex = newLedger.own.findIndex(
                ({ characterId: goodsCharId }: ILedgerOwn) => goodsCharId == characterId,
            );
            const goodsTotalGold = newLedger.own[goodsIndex]
                ? calcSum(newLedger.own[goodsIndex].histories.goods.data)
                : 0;
            const raidTotalGold = newLedger.own[goodsIndex]
                ? calcSum(newLedger.own[goodsIndex].histories.raid.data)
                : 0;
            newLedger.own[goodsIndex].prevWeekGold.pop();
            newLedger.own[goodsIndex].prevWeekGold.unshift(goodsTotalGold + raidTotalGold);

            own[goodsIndex].histories = { goods: { fold: true, data: [] }, raid: { fold: true, data: [] } };
        });

        setStoredLedger(newLedger);
    };

    return (
        <>
            {status === 'fulfilled' && ledgerData && (
                <Container>
                    <Article>
                        <GoldHistory name="공통" prevWeekGold={storedLedger.common.prevWeekGold[0]} />
                        총 골드 : <TextBox value={calcSum(storedLedger.common.histories)} readOnly />
                        <CommonGold commonData={ledgerData.common} />
                    </Article>
                    {storedLedger.own.map(
                        (
                            {
                                characterId,
                                prevWeekGold,
                                histories: {
                                    goods: { fold: goodsFold },
                                    raid: { fold: raidFold },
                                },
                            }: ILedgerOwn,
                            ledgerIndex: number,
                        ) => {
                            const level = getCharacterInfoById({ dataArray: storedCharacter, id: characterId }).level;
                            const goodsIndex = storedLedger.own.findIndex(
                                ({ characterId: goodsCharId }: ILedgerOwn) => goodsCharId === characterId,
                            );

                            const goodsTotalGold = calcSum(storedLedger.own[goodsIndex].histories.goods.data);
                            const raidTotalGold = calcSum(storedLedger.own[goodsIndex].histories.raid.data);

                            return (
                                <Article key={ledgerIndex}>
                                    <GoldHistory
                                        name={
                                            getCharacterInfoById({ dataArray: storedCharacter, id: characterId }).name
                                        }
                                        prevWeekGold={prevWeekGold[0]}
                                    />
                                    <div>이번 주 총 합 : {goodsTotalGold + raidTotalGold}</div>
                                    <FlexDiv
                                        onClick={() =>
                                            foldGoodsDiv({ characterIndex: goodsIndex, foldState: goodsFold })
                                        }
                                    >
                                        재화
                                        <DownArrow fill={theme.colors.text} width="25" height="25" />
                                        총 골드 : <TextBox value={goodsTotalGold} readOnly />
                                    </FlexDiv>
                                    <GoldDiv fold={goodsFold}>
                                        <GoodsGold
                                            characterId={characterId}
                                            goods={ledgerData.goods}
                                            imgPaletteArr={ledgerData.goodsImg}
                                        />
                                    </GoldDiv>
                                    <FlexDiv
                                        onClick={() => foldRaidDiv({ characterIndex: goodsIndex, foldState: raidFold })}
                                    >
                                        레이드
                                        <DownArrow fill={theme.colors.text} width="25" height="25" />
                                        총 골드 : <TextBox value={raidTotalGold} readOnly />
                                    </FlexDiv>
                                    <GoldDiv fold={raidFold}>
                                        <RaidGold
                                            raidCategory={ledgerData.raid}
                                            raidDetailData={ledgerData.raidDetail}
                                            characterId={characterId}
                                            characterLevel={Number(level.replace(/\,/g, ''))}
                                        />
                                    </GoldDiv>
                                </Article>
                            );
                        },
                    )}
                </Container>
            )}
        </>
    );
};

const GoldDiv = styled.div<{ fold: boolean }>`
    display: ${props => (props.fold ? `none` : 'flex')};
    flex-direction: column;
`;

const Container = styled.section`
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin-top: 5em;
`;

const Article = styled.article`
    border: 1px solid ${props => props.theme.colors.gray};
    padding: 2em;
`;

export default Ledger;
