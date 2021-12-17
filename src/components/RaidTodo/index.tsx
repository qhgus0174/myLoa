import React, { useContext } from 'react';
import { LocalStorageStateContext } from '@context/LocalStorageContext';
import CheckboxText from '@components/RaidTodo/view/CheckboxText';
import { IRaid } from '@common/types/localStorage/Raid';
import Checkbox from '@components/RaidTodo/view/Checkbox';
import { ScheduleContents } from '@common/types/types';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { heightMedia, widthMedia } from '@style/device';

const RaidTodo = () => {
    const { storedRaid, storedRaidCharacterOrd } = useContext(LocalStorageStateContext);

    return (
        <RaidContainer>
            <FlexDiv direction="column">
                {(storedRaid as IRaid[]).map((raid: IRaid, raidIndex: number, oriArray: IRaid[]) => {
                    return (
                        <div key={`drag_${raidIndex}`}>
                            <CheckList>
                                <CheckboxText raid={raid} />
                                <Checkbox raid={raid} />
                            </CheckList>
                            {oriArray[raidIndex + 1] && <Hr />}
                        </div>
                    );
                })}
            </FlexDiv>
        </RaidContainer>
    );
};

const RaidContainer = styled.section`
    height: 60vh;

    ${heightMedia.big} {
        height: 55vh;
    }

    ${heightMedia.medium} {
        height: 60vh;
    }

    ${widthMedia.tablet} {
        height: 55vh;
    }

    overflow-y: auto;
`;

const CheckList = styled.section<{ contents?: ScheduleContents }>`
    display: flex;
    align-items: center;
    margin-top: 0.3em;
    margin-bottom: 0.2em;
    box-sizing: border-box;
`;

const Hr = styled.div`
    border: 0.7px solid ${props => props.theme.colors.gray};
    opacity: 0.4;
`;

export default RaidTodo;
