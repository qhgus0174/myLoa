import React from 'react';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { ILedgerHistoryRaid } from '@common/types/localStorage/Ledger';
import IconPalette from '@components/Ledger/IconsPalette';
import TextBox from '@components/Input/TextBox';
import GoldIcon from '@components/Image/Gold';
import { IGoodsImg } from '@common/types/response/ledger/goods';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

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
            <Date>{DateTime.fromISO(DateTime.fromSeconds(Number(datetime)).toISO()).toFormat('MM/dd')}</Date>
            <Icon>
                {imgPaletteArr ? (
                    <IconPalette
                        goodsId={id}
                        imgId={imgId}
                        imgPaletteArr={imgPaletteArr.filter(({ categoryid }) => categoryid === categoryId)}
                        onClick={saveFn}
                    />
                ) : (
                    imgUrl && <Image alt="재화 아이콘" src={imgUrl} width="27" height="27" />
                )}
            </Icon>
            <Titile>
                <TextBox
                    divWidth="100"
                    width="100"
                    value={name}
                    onChange={({ target: { value: nameValue } }) => {
                        saveFn({ name: nameValue, goodsId: id });
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select()}
                />
            </Titile>
            <Gold>
                <GoodsGoldIcon>
                    <TextBox
                        icon={<GoldIcon type="basic" />}
                        divWidth="100"
                        width="100"
                        value={gold.toLocaleString()}
                        onChange={({ target: { value: goldValue } }) => {
                            saveFn({ gold: Number(goldValue.replaceAll(',', '')), goodsId: id });
                        }}
                        onKeyPress={e => {
                            if (!/[0-9]/.test(e.key)) e.preventDefault();
                        }}
                        onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select()}
                    />
                </GoodsGoldIcon>
            </Gold>
            <Delete>
                <Image
                    alt="삭제 아이콘"
                    src="/static/img/icon/x-mark.png"
                    width="14"
                    height="14"
                    onClick={() => removeFn({ goodsId: id })}
                />
            </Delete>
        </GoodsList>
    );
};

const GoodsList = styled.li`
    display: flex;
    width: 100%;
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    border-top: 0.5px dashed ${props => props.theme.colors.white};
    border-bottom: 0.5px dashed ${props => props.theme.colors.white};
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
`;

const GoodsGoldIcon = styled.div`
    display: flex;
    align-items: center;
    input {
        padding-left: 5px;
    }
`;

const Icon = styled.div`
    display: flex;
    flex-basis: 10%;
    justify-content: center;
`;

const Titile = styled.div`
    display: flex;
    flex-basis: 40%;
    justify-content: center;

    ${widthMedia.phone} {
        display: none;
        flex-basis: 0%;
    }
`;

const Date = styled.div`
    display: flex;
    flex-basis: 15%;
    justify-content: center;
`;

const Gold = styled.div`
    display: flex;
    flex-basis: 25%;
    justify-content: center;

    ${widthMedia.phone} {
        flex-basis: 40%;
    }
`;

const Delete = styled.div`
    display: flex;
    flex-basis: 5%;
    justify-content: center;
    cursor: pointer;
`;
export default Goods;
