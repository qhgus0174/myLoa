import React, { useContext } from 'react';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { ModalActionContext } from '@context/ModalContext';
import EditIncomeSpending from '@components/Ledger/modal/common/EditIncomeSpending';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import { ILedgerHistoryRaid } from '@common/types/localStorage/Ledger';
import { ICommonGold } from '@common/types/response/ledger/common';
import { ILedgerSaveParam, IncomeSpendingType } from '@common/types/types';
import { useTheme } from '@emotion/react';
import { widthMedia } from '@style/device';
import styled from '@emotion/styled';

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
        <Container>
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
            <Update>
                <Image
                    alt="수정 아이콘"
                    src="/static/img/icon/edit.png"
                    width="14"
                    height="14"
                    onClick={() => openWriteIncomeGoods()}
                />
            </Update>
            <Delete>
                <Image
                    alt="삭제 아이콘"
                    src="/static/img/icon/x-mark.png"
                    width="14"
                    height="14"
                    onClick={() => removeFn({ goodsId: id })}
                />
            </Delete>
        </Container>
    );
};

const Container = styled.li`
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

const Update = styled.div`
    display: flex;
    flex-basis: 5%;
    justify-content: center;
    cursor: pointer;
`;

const Delete = styled.div`
    display: flex;
    flex-basis: 5%;
    justify-content: center;
    cursor: pointer;
`;
export default IncomeSpendItem;
