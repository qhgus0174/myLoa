import React, { useState } from 'react';
import Button from '@components/Button/Button';
import { getThisWeek, stringToFormat } from '@common/utils';
import styled from '@emotion/styled';
import IconLabel from '@components/Label/IconLabel';
import PlusIcon from '@components/Image/PlusIcon';
import { useTheme } from '@emotion/react';
import { widthMedia } from '@style/device';

interface IHistories {
    visible: boolean;
    calendar: JSX.Element;
    list: JSX.Element;
    hasRaid?: boolean;
    onClickIncome: () => void;
    onClickSpending: () => void;
    onClickRaid?: () => void;
}

const Histories = ({
    visible,
    calendar,
    list,
    hasRaid = true,
    onClickIncome,
    onClickSpending,
    onClickRaid,
}: IHistories) => {
    const [weekArr] = useState<string[]>(getThisWeek());

    const theme = useTheme();

    return (
        <Container visible={visible}>
            <Title>
                <IconLabel
                    label={
                        <h3>
                            이번 주 로생 :{' '}
                            {`${stringToFormat({
                                date: weekArr[0],
                                fromFormat: 'yyyy/MM/dd',
                                toFormat: 'MM/dd',
                            })} ~ ${stringToFormat({ date: weekArr[6], fromFormat: 'yyyy/MM/dd', toFormat: 'MM/dd' })}`}
                        </h3>
                    }
                    iconUrl="/static/img/icon/mococo/rabbit.png"
                    width="24"
                    height="24"
                />
            </Title>
            {calendar}
            <ListTitle>
                <IconLabel
                    label={<h3>내역</h3>}
                    iconUrl="/static/img/icon/mococo/what_rabbit.png"
                    width="24"
                    height="24"
                />
                <Buttons count={hasRaid ? 3 : 2}>
                    <Button
                        onClick={onClickIncome}
                        icon={<PlusIcon fill={theme.button.color} width="13" height="13" />}
                    >
                        수입
                    </Button>
                    <Button
                        onClick={onClickSpending}
                        icon={<PlusIcon fill={theme.button.color} width="13" height="13" />}
                    >
                        지출
                    </Button>
                    {hasRaid && (
                        <Button
                            onClick={onClickRaid}
                            icon={<PlusIcon fill={theme.button.color} width="13" height="13" />}
                        >
                            레이드 수입
                        </Button>
                    )}
                </Buttons>
            </ListTitle>
            {list}
        </Container>
    );
};

const Container = styled.div<{ visible: boolean }>`
    display: ${props => (props.visible ? 'flex; flex-direction:column;' : 'none;')};
    background: ${props => props.theme.colors.mainInner};
    padding-top: 3em;
    padding-bottom: 3em;
    padding-left: 5em;
    padding-right: 5em;

    ${widthMedia.smallPhone} {
        padding-left: 1em;
        padding-right: 1em;
    }
`;

const ListTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2em;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.7em;
`;

const Buttons = styled.div<{ count: number }>`
    display: flex;
    button {
        margin-left: 0.7em;
    }
`;

export default Histories;
