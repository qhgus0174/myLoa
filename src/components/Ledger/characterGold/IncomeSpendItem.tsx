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
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

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
        <Container>
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
        </Container>
    );
};

const Container = styled.li`
    display: flex;
    width: 100%;
    padding-top: 0.6em;
    padding-bottom: 0.6em;
    border-top: 0.5px solid ${props => props.theme.colors.gray};
    border-bottom: 0.5px solid ${props => props.theme.colors.gray};
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

const IconAndText = styled.div`
    display: flex;
    flex-basis: 40%;
    justify-content: center;
    align-items: center;
`;

const IconText = styled.div`
    padding-left: 1em;
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

const UpdateButton = styled.div`
    display: flex;
    flex-basis: 7%;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    height: 100%;
`;

export default IncomeSpendItem;
