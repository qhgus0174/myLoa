import React from 'react';
import Image from 'next/image';
import WeekDayPicker from '@components/Picker/WeekDayPicker';
import { IGoodsImg } from '@common/types/response/ledger/goods';
import IconPalette from '@components/Ledger/IconsPalette';
import IconLabel from '@components/Label/IconLabel';
import RadioButton from '@components/Input/Radio';
import TextBox from '@components/Input/TextBox';
import GoldIcon from '@components/Image/Gold';
import { ICommonGold } from '@common/types/response/ledger/common';
import styled from '@emotion/styled';
import { ContentArticle, ContentContainer, Contents, InnerContent, Title } from '@style/common/modal';

interface IGoodsFieldSet {
    getGoods: string;
    day: string;
    gold: number;
    goods: ICommonGold[];
    goodsIconId?: string;
    defaultImgUrl?: string;
    imgPaletteArr?: IGoodsImg[];
    setGetGoods: (e: string) => void;
    setDay: (e: string) => void;
    bindName: (e: string) => void;
    setGold: (e: number) => void;
    setGoodsIconId?: (e: string) => void;
    setDefaultImgUrl?: (e: string) => void;
}

const Form = ({
    getGoods,
    day,
    gold,
    goods,
    goodsIconId,
    defaultImgUrl,
    imgPaletteArr,
    setGetGoods,
    setDay,
    bindName,
    setGold,
    setGoodsIconId,
    setDefaultImgUrl,
}: IGoodsFieldSet) => {
    return (
        <ContentContainer>
            <ContentArticle>
                <Title>날짜</Title>
                <InnerContent>
                    <WeekDayPicker setDay={setDay} day={day} />
                </InnerContent>
            </ContentArticle>
            <ContentArticle>
                <Title>골드 수급처</Title>
                <InnerContent>
                    {goods.map(({ id, defaultimgurl, name }, goodsIndex: number) => {
                        return (
                            <RadioButton
                                key={goodsIndex}
                                text={<IconLabel label={name} iconUrl={defaultimgurl} />}
                                name="goodsCategory"
                                value={id}
                                onChange={() => {
                                    setGetGoods(id);
                                    setGoodsIconId && setGoodsIconId('1');
                                    setDefaultImgUrl && setDefaultImgUrl(defaultimgurl);
                                }}
                                checked={id == getGoods}
                            />
                        );
                    })}
                </InnerContent>
            </ContentArticle>

            <ContentArticle>
                <Title>내용</Title>
                <Contents>
                    <>
                        {imgPaletteArr ? (
                            <IconPalette
                                imgPaletteArr={imgPaletteArr.filter(({ categoryid }) => categoryid == getGoods)}
                                imgId={getGoods}
                                onClick={setGoodsIconId ? setGoodsIconId : () => {}}
                                goodsIconId={goodsIconId ? goodsIconId : ''}
                            />
                        ) : (
                            <Image alt="재화 아이콘" src={defaultImgUrl} width="27" height="27" />
                        )}
                        <TextBox
                            width="100"
                            {...bindName}
                            placeholder={
                                goods[
                                    goods.findIndex(({ id }) => {
                                        return id == getGoods;
                                    })
                                ].name
                            }
                        />
                    </>
                </Contents>
            </ContentArticle>
            <ContentArticle>
                <Title>금액</Title>
                <Contents>
                    <GoldIcon type="basic" width="17" />
                    <TextBox
                        onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select()}
                        value={gold.toLocaleString()}
                        onChange={({ target: { value: goldValue } }) => {
                            setGold(Number(goldValue.replaceAll(',', '')));
                        }}
                        width="100"
                        placeholder="골드 수입"
                    />
                </Contents>
            </ContentArticle>
        </ContentContainer>
    );
};

export default Form;
