import React, { useContext } from 'react';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { ModalActionContext } from '@context/ModalContext';
import EditIncomeSpending from '@components/Ledger/modal/common/EditIncomeSpending';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import { ILedgerSaveParam, IncomeSpendingType } from '@common/types/types';
import { ILedgerHistoryRaid } from '@common/types/localStorage/Ledger';
import { ICommonGold } from '@common/types/response/ledger/common';
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
    imgUrl: string;
    name: string;
    removeFn: ({ goodsId }: Pick<ILedgerSaveParam, 'goodsId'>) => void;
    type: IncomeSpendingType;
    commonData: ICommonGold[];
}

const IncomeSpendItem = ({ id, gold, name, datetime, imgUrl, removeFn, type, commonData }: IIncomeSpendItem) => {
    const theme = useTheme();

    const { setModalProps } = useContext(ModalActionContext);

    const openWriteIncomeGoods = () => {
        setModalProps({
            isOpen: true,
            content: (
                <EditIncomeSpending
                    goods={commonData}
                    type="income"
                    oriId={id}
                    oriDay={DateTime.fromISO(DateTime.fromSeconds(Number(datetime)).toISO()).toFormat('yyyy/MM/dd')}
                    oriName={name}
                    oriImgUrl={imgUrl}
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
                <Image src={imgUrl} width="25" height="25" />
                <IconText>{name}</IconText>
            </IconAndText>
            <Gold>
                <GoodsGoldIcon>
                    <TitleAndGold
                        gold={gold}
                        underline={false}
                        goldTextColor={type === 'income' ? theme.ledger.income : theme.ledger.spending}
                    />
                </GoodsGoldIcon>
            </Gold>
            <UpdateButton>
                <Image
                    alt="수정 아이콘"
                    src="/static/img/icon/edit.png"
                    width="14"
                    height="14"
                    onClick={() => openWriteIncomeGoods()}
                />
            </UpdateButton>
            <UpdateButton>
                <Image
                    alt="삭제 아이콘"
                    src="/static/img/icon/x-mark.png"
                    width="14"
                    height="14"
                    onClick={() => removeFn({ goodsId: id })}
                />
            </UpdateButton>
        </ItemContainer>
    );
};

export default IncomeSpendItem;
