import React, { useContext } from 'react';
import { LocalStorageStateContext, LocalStorageActionContext } from '@context/LocalStorageContext';
import { PagingStateContext } from '@context/PagingContext';
import { default as CheckboxInput } from '@components/Input/TodoCheckbox';
import { IRaidGoldDetail } from '@common/types/response/ledger/raid';
import { IRaid, IRaidCharacter } from '@common/types/localStorage/Raid';
import { CharactersDiv, FlexDiv, FlexHoverArticle } from '@style/common';
import styled from '@emotion/styled';

interface ICheckbox {
    raid: IRaid;
}

const Checkbox = ({ raid: pRaid }: ICheckbox) => {
    const { storedRaid, storedCharacter, storedRaidCharacterOrd, storedLedger } = useContext(LocalStorageStateContext);
    const { setStoredRaid, setStoredLedger } = useContext(LocalStorageActionContext);
    const { perPage, currentPage } = useContext(PagingStateContext);

    const onClickCheckRaid = (e: React.ChangeEvent<HTMLInputElement>, characterId: number) => {
        const {
            target: { checked },
        } = e;

        const raidArr: IRaid[] = [...storedRaid];
        const raidIndex = raidArr.findIndex(td => td.id === pRaid.id);
        const characterIndex = raidArr[raidIndex].character.findIndex(character => character.id === characterId);

        raidArr[raidIndex].character[characterIndex] = {
            ...raidArr[raidIndex].character[characterIndex],
            check: 1 - Number(raidArr[raidIndex].character[characterIndex].check),
        };

        setStoredRaid(raidArr);
    };

    const onClickCheckRaidHoverArea = (e: React.MouseEvent<HTMLElement>, characterId: number) => {
        if (e.target !== e.currentTarget) return;

        const raidArr: IRaid[] = [...storedRaid];

        const raidIndex = raidArr.findIndex(td => td.id === pRaid.id);

        const characterIndex = raidArr[raidIndex].character.findIndex(character => character.id === characterId);

        raidArr[raidIndex].character[characterIndex] = {
            ...raidArr[raidIndex].character[characterIndex],
            check: 1 - raidArr[raidIndex].character[characterIndex].check,
        };

        setStoredRaid(raidArr);
    };

    return (
        <>
            <WhiteSpace></WhiteSpace>
            <CharactersDiv length={storedCharacter.length - (currentPage - 1) * perPage}>
                {pRaid.character
                    ?.sort((a: IRaidCharacter, b: IRaidCharacter) => {
                        return storedRaidCharacterOrd.indexOf(a.id) - storedRaidCharacterOrd.indexOf(b.id);
                    })
                    .slice(
                        currentPage === 1 ? 0 : (currentPage - 1) * perPage,
                        currentPage === 1 ? perPage : (currentPage - 1) * perPage + perPage,
                    )
                    .map((charRaid: IRaidCharacter, characterIndex: number) => {
                        return (
                            <FlexHoverArticle
                                key={`drag_char_${characterIndex}`}
                                onClick={e => onClickCheckRaidHoverArea(e, charRaid.id)}
                            >
                                {pRaid.showCharacter.includes(charRaid.id) && (
                                    <FlexDiv direction="column" width="100">
                                        <EContainer>
                                            <Article>
                                                <Content>
                                                    <CheckboxInput
                                                        className="raidCheckbox"
                                                        checked={charRaid.check === 1}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                            onClickCheckRaid(e, charRaid.id)
                                                        }
                                                    />
                                                </Content>
                                            </Article>
                                        </EContainer>
                                    </FlexDiv>
                                )}
                            </FlexHoverArticle>
                        );
                    })}
            </CharactersDiv>
            <WhiteSpace></WhiteSpace>
        </>
    );
};

const Article = styled.article`
    display: flex;
    justify-content: space-evenly;

    & > label:nth-of-type(2),
    & > label:nth-of-type(3) {
        margin-left: 0.5em;
    }
`;

const Text = styled.article`
    display: flex;
    flex-direction: column;
    flex-basis: 15%;
    justify-content: center;
`;

const RelaxGauge = styled.article`
    justify-content: center;
    text-align: center;
    color: ${props => props.theme.colors.relax};
    font-weight: 600;
`;

const WhiteSpace = styled.div`
    display: flex;
    width: 2.5%;
    flex-basis: 2.5%;
`;

const Content = styled.label`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items: center;
    flex-basis: 33%;
    font-size: 0.9em;
`;

const EponaText = styled.article`
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    width: 46.75px;
    margin-top: 0.1em;
    box-sizing: border-box;
`;

const EContainer = styled(FlexDiv)`
    height: 100%;
    justify-content: center;
`;

export default Checkbox;
