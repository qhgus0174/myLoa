import React, { useContext } from 'react';
import { IShareContents } from '@common/types/localStorage/ShareContents';
import TodoCheckbox from '@components/Input/TodoCheckbox';
import IconLabel from '@components/Label/IconLabel';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

const Weekly = () => {
    const { storedShareContents, storedDayContents } = useContext(LocalStorageStateContext);
    const { setStoredShareContents, setStoredDayContents } = useContext(LocalStorageActionContext);

    const setShareContents = ({ id }: { id: number }) => {
        const shareContens: IShareContents[] = [...storedShareContents];

        const index = storedShareContents.findIndex(({ id: storedId }) => id === storedId);
        shareContens[index].check = 1 - shareContens[index].check;

        setStoredShareContents(shareContens);
    };
    const setDayContents = ({ id }: { id: number }) => {
        const dayContens: IShareContents[] = [...storedDayContents];

        const index = storedDayContents.findIndex(({ id: storedId }) => id === storedId);
        dayContens[index].check = 1 - dayContens[index].check;

        setStoredDayContents(dayContens);
    };
    return (
        <WeeklyShare>
            <SharedLeftDiv>
                <SharedDiv>
                    <h3>일일</h3>
                    <SharedInner>
                        {storedDayContents.length < 1 ? (
                            <ContentsDiv border={false}>일일 컨텐츠가 없습니다.</ContentsDiv>
                        ) : (
                            storedDayContents.map(({ id, name, iconurl, check }, index) => {
                                return (
                                    <ContentsDiv border={true} key={index}>
                                        <LabelDiv>
                                            <IconLabel label={name} iconUrl={iconurl} />
                                        </LabelDiv>
                                        <CheckboxDiv>
                                            <TodoCheckbox
                                                onChange={() => setDayContents({ id: id })}
                                                checked={check === 1}
                                            />
                                        </CheckboxDiv>
                                    </ContentsDiv>
                                );
                            })
                        )}
                    </SharedInner>
                </SharedDiv>
            </SharedLeftDiv>
            <SharedRightDiv>
                <SharedDiv>
                    <h3>주간</h3>
                    <SharedInner>
                        {storedShareContents.map(({ id, name, iconurl, check }, index) => {
                            return (
                                <ContentsDiv border={true} key={index}>
                                    <LabelDiv>
                                        <IconLabel label={name} iconUrl={iconurl} />
                                    </LabelDiv>
                                    <CheckboxDiv>
                                        <TodoCheckbox
                                            onChange={() => setShareContents({ id: id })}
                                            checked={check === 1}
                                        />
                                    </CheckboxDiv>
                                </ContentsDiv>
                            );
                        })}
                    </SharedInner>
                </SharedDiv>
            </SharedRightDiv>
        </WeeklyShare>
    );
};

const SharedDiv = styled.div`
    display: flex;
    flex-direction: column;
    border-collapse: collapse;
    align-items: center;
    background: ${props => props.theme.colors.mainInner};
    padding: 1em 1.8em 1.5em 1.8em;
    border-radius: 1em;
    box-sizing: border-box;
    width: 90%;
    height: 100%;
    justify-content: space-around;

    h3 {
        font-size: 1.15em;
        text-decoration: underline;
        text-underline-position: under;
        margin-top: 1em;
        margin-bottom: 2em;
    }

    ${widthMedia.tablet} {
        margin-bottom: 1.1em;
    }
`;
const WeeklyShare = styled.article`
    display: flex;
    width: 100%;
    justify-content: center;
    height: 100%;
    margin-top: 2em;

    ${widthMedia.tablet} {
        flex-direction: column;
    }
`;

const SharedRightDiv = styled.div`
    display: flex;
    flex-basis: 35%;
    justify-content: center;
`;

const SharedLeftDiv = styled.div`
    display: flex;
    flex-basis: 35%;
    justify-content: center;
`;

const SharedInner = styled.div`
    padding-bottom: 10px;
    align-items: center;
    width: 80%;
    height: 300px;
    height: 100%;
`;

const LabelDiv = styled.div`
    flex-basis: 80%;
`;
const CheckboxDiv = styled.div`
    flex-basis: 20%;
`;

const ContentsDiv = styled.div<{ border: boolean }>`
    display: flex;
    padding-top: 1em;
    padding-bottom: 1em;
    align-items: center;
    justify-content: center;
    width: 100%;
    ${props => props.border && `border-bottom: 1px dashed ${props.theme.colors.scroll}`};
`;
export default Weekly;
