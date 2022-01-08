import React, { useContext, useState } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import IncomeSpending from '@components/Ledger/modal/common/IncomeSpending';
import IncomeSpendList from '@components/Ledger/commonGold/IncomeSpendList';
import CommonCalendar from '@components/Ledger/commonGold/Calendar';
import TitleAndGold from '@components/Ledger/TitleAndGold';
import Histories from '@components/Ledger/Histories';
import { ICommonGold } from '@common/types/response/ledger/common';
import { useTheme } from '@emotion/react';
import { ListItem, Contents, InnerContents } from '@style/common/layout/table';

interface IListItem {
    incomeGold: number;
    spendingGold: number;
    prevGold: number;
}

const CommonListItem = ({
    commonData,
    incomeGold,
    spendingGold,
    prevGold,
}: { commonData: ICommonGold[] } & IListItem) => {
    const theme = useTheme();

    const [isShow, setIsShow] = useState<boolean>(false);

    const { setModalProps } = useContext(ModalActionContext);

    const openWriteIncomeGoods = () => {
        setModalProps({
            isOpen: true,
            content: <IncomeSpending goods={commonData} type="income" />,
            options: { width: '500', height: '560', headerTitle: '재화 수입' },
        });
    };

    const openWriteSpending = () => {
        setModalProps({
            isOpen: true,
            content: <IncomeSpending type="spending" goods={commonData} />,
            options: { width: '500', height: '560', headerTitle: '재화 지출' },
        });
    };

    return (
        <Contents>
            <ListItem
                selected={isShow}
                onClick={() => {
                    setIsShow(!isShow);
                }}
            >
                <InnerContents name={true}>공통</InnerContents>
                <InnerContents>
                    <TitleAndGold
                        isPadding={false}
                        underline={false}
                        gold={incomeGold}
                        goldTextColor={theme.ledger.income}
                    />
                </InnerContents>
                <InnerContents>
                    <TitleAndGold
                        underline={false}
                        gold={spendingGold}
                        negative={true}
                        isPadding={false}
                        goldTextColor={theme.ledger.spending}
                    />
                </InnerContents>
                <InnerContents>
                    <TitleAndGold isPadding={false} underline={false} gold={incomeGold - spendingGold} />
                </InnerContents>
                <InnerContents>
                    <TitleAndGold
                        isPadding={false}
                        underline={false}
                        gold={prevGold}
                        goldTextColor={theme.colors.gray}
                    />
                </InnerContents>
            </ListItem>
            <Histories
                visible={isShow}
                list={<IncomeSpendList commonData={commonData} />}
                calendar={<CommonCalendar totalGold={incomeGold - spendingGold} />}
                onClickIncome={() => openWriteIncomeGoods()}
                onClickSpending={() => openWriteSpending()}
                hasRaid={false}
            />
        </Contents>
    );
};

export default CommonListItem;
