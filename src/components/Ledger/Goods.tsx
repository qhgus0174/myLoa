import React from 'react';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { ILedgerHistoryRaid } from '@components/Ledger/LedgerType';
import IconPalette from '@components/Ledger/IconsPalette';
import TextBox from '@components/Input/TextBox';
import Button from '@components/Button/Button';
import GoldIcon from '@components/Image/Gold';
import { IGoodsImg } from '@common/types/response/ledger/goods';
import styled from '@emotion/styled';

export interface ISaveParam {
    goodsId: string;
    name?: string;
    gold?: number;
    imageId?: string;
    imgUrl?: string;
}

interface IGoods extends ILedgerHistoryRaid {
    imgPaletteArr?: IGoodsImg[];
    imgUrl?: string;
    categoryId?: string;
    imgId?: string;
    name?: string;
    saveFn: ({ name, gold, imageId, goodsId }: ISaveParam) => void;
    removeFn: ({ goodsId }: ISaveParam) => void;
}

const Goods = ({ categoryId, id, gold, name, imgId, imgPaletteArr, datetime, imgUrl, saveFn, removeFn }: IGoods) => {
    return (
        <GoodsList>
            {imgPaletteArr ? (
                <IconPalette
                    goodsId={id}
                    imgId={imgId}
                    imgPaletteArr={imgPaletteArr.filter(({ categoryid }) => categoryid === categoryId)}
                    onClick={saveFn}
                />
            ) : (
                imgUrl && <Image src={imgUrl} width="27" height="27" />
            )}
            <GoodsTitle
                divWidth="55"
                width="55"
                value={name}
                onChange={({ target: { value: nameValue } }) => {
                    saveFn({ name: nameValue, goodsId: id });
                }}
                onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select()}
            />
            {DateTime.fromISO(DateTime.fromSeconds(Number(datetime)).toISO()).toFormat('yy/MM/dd')}
            <GoodsGoldIcon>
                <GoldIcon type="basic" width="18" height="18" />
                <Gold
                    value={gold}
                    onChange={({ target: { value: goldValue } }) => {
                        saveFn({ gold: Number(goldValue), goodsId: id });
                    }}
                    onKeyPress={e => {
                        if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select()}
                />
                <Button onClick={() => removeFn({ goodsId: id })}>X</Button>
            </GoodsGoldIcon>
        </GoodsList>
    );
};

const GoodsList = styled.li`
    display: flex;
    align-items: center;
`;

const GoodsTitle = styled(TextBox)`
    width: 55%;
`;

const GoodsGoldIcon = styled.div`
    display: flex;
    align-items: center;
    width: 30%;
`;

const Gold = styled(TextBox)`
    margin-left: 0.3em;
`;

export default Goods;
