import React, { useContext } from 'react';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { ModalActionContext } from '@context/ModalContext';
import EditIncomeSpending from '@components/Ledger/modal/character/EditIncomeSpending';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import ImageBackground from '@components/ImageBackground';
import { GoldType, ILedgerHistoryRaid } from '@common/types/localStorage/Ledger';
import { IGoods, IGoodsImg } from '@common/types/response/ledger/goods';
import { ILedgerSaveParam } from '@common/types/types';
import { useTheme } from '@emotion/react';
import {
    Gold,
    GoodsGoldIcon,
    IconAndText,
    IconText,
    ItemContainer,
    UpdateButton,
    Date,
} from '@style/common/layout/table';

interface IIncomeSpendItem extends ILedgerHistoryRaid {
    imgPaletteArr: IGoodsImg[];
    goods: IGoods[];
    imgUrl?: string;
    categoryId: string;
    imgId: string;
    name: string;
    removeFn: ({ goodsId, type }: Pick<ILedgerSaveParam, 'goodsId' | 'type'>) => void;
    type: GoldType;
    characterId: number;
}

const IncomeSpendItem = ({
    categoryId,
    id,
    gold,
    name,
    imgId,
    goods,
    imgPaletteArr,
    datetime,
    imgUrl,
    removeFn,
    type,
    characterId,
}: IIncomeSpendItem) => {
    const theme = useTheme();

    const { setModalProps } = useContext(ModalActionContext);

    const openWriteIncomeGoods = ({ characterId }: { characterId: number }) => {
        setModalProps({
            isOpen: true,
            content: (
                <EditIncomeSpending
                    characterId={characterId}
                    goods={goods}
                    imgPaletteArr={imgPaletteArr}
                    type={type === 'goods' ? 'income' : 'spending'}
                    incomeSpendId={id}
                    oriGoodsId={categoryId}
                    oriImgId={imgId}
                    oriDay={DateTime.fromISO(DateTime.fromSeconds(Number(datetime)).toISO()).toFormat('yyyy/MM/dd')}
                    oriName={name}
                    oriGold={gold}
                />
            ),
            options: { width: '500', height: '540', headerTitle: '재화 수입' },
        });
    };

    return (
        <ItemContainer>
            <Date>{DateTime.fromISO(DateTime.fromSeconds(Number(datetime)).toISO()).toFormat('MM/dd')}</Date>
            <IconAndText>
                {['goods', 'spending'].includes(type) ? (
                    <ImageBackground
                        pointer={false}
                        grade={
                            imgPaletteArr.filter(({ categoryid }) => categoryid == categoryId)[
                                imgPaletteArr
                                    .filter(({ categoryid }) => categoryid == categoryId)
                                    .findIndex(({ id }) => {
                                        return id == imgId;
                                    })
                            ].background
                        }
                        hover={{ effect: false }}
                        width="27"
                        height="27"
                    >
                        <Image
                            alt="재화 아이콘"
                            src={`/static/img/lostark/${
                                imgPaletteArr.filter(({ categoryid }) => categoryid == categoryId)[
                                    imgPaletteArr
                                        .filter(({ categoryid }) => categoryid == categoryId)
                                        .findIndex(({ id }) => {
                                            return id == imgId;
                                        })
                                ].folder
                            }/${
                                imgPaletteArr.filter(({ categoryid }) => categoryid == categoryId)[
                                    imgPaletteArr
                                        .filter(({ categoryid }) => categoryid == categoryId)
                                        .findIndex(({ id }) => {
                                            return id == imgId;
                                        })
                                ].filename
                            }`}
                            width="25"
                            height="25"
                        />
                    </ImageBackground>
                ) : (
                    <Image src={imgId} width="25" height="25" />
                )}
                <IconText>{name}</IconText>
            </IconAndText>
            <Gold>
                <GoodsGoldIcon>
                    <TitleAndGold
                        gold={gold}
                        underline={false}
                        goldTextColor={['goods', 'raid'].includes(type) ? theme.ledger.income : theme.ledger.spending}
                    />
                </GoodsGoldIcon>
            </Gold>
            <UpdateButton onClick={() => openWriteIncomeGoods({ characterId: characterId })}>
                {['goods', 'spending'].includes(type) && (
                    <Image alt="수정 아이콘" src="/static/img/icon/edit.png" width="14" height="14" />
                )}
            </UpdateButton>
            <UpdateButton onClick={() => removeFn({ goodsId: id, type: type })}>
                {['goods', 'spending'].includes(type) && (
                    <Image alt="삭제 아이콘" src="/static/img/icon/x-mark.png" width="14" height="14" />
                )}
            </UpdateButton>
        </ItemContainer>
    );
};

export default IncomeSpendItem;
