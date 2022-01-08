import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

export const Contents = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;

    border-bottom: 1px solid ${props => props.theme.colors.gray};
`;

export const InnerContents = styled.div<{ name?: boolean }>`
    width: ${props => (props.name ? `30%` : `calc(70% / 4);`)};
    text-align: center;
    box-sizing: border-box;

    padding-left: 0.5em;
    padding-right: 0.5em;
`;

export const ListItem = styled.div<{ selected: boolean }>`
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 0.9em;
    padding-bottom: 0.9em;

    cursor: pointer;

    ${props => props.selected && `background : ${props.theme.colors.hover}`};

    &:hover {
        transition: 0.2s ease;
        background: ${props => props.theme.colors.hover};
    }
`;

export const ItemContainer = styled.li`
    display: flex;
    width: 100%;
    padding-top: 0.6em;
    padding-bottom: 0.6em;
    border-top: 0.5px dashed ${props => props.theme.colors.gray};
    border-bottom: 0.5px dashed ${props => props.theme.colors.gray};
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
`;

export const GoodsGoldIcon = styled.div`
    display: flex;
    align-items: center;
    input {
        padding-left: 5px;
    }
`;

export const IconAndText = styled.div`
    display: flex;
    flex-basis: 40%;
    justify-content: center;
    align-items: center;
`;

export const IconText = styled.div`
    padding-left: 1em;
`;

export const Date = styled.div`
    display: flex;
    flex-basis: 15%;
    justify-content: center;
`;

export const Gold = styled.div`
    display: flex;
    flex-basis: 25%;
    justify-content: center;

    ${widthMedia.phone} {
        flex-basis: 40%;
    }
`;

export const UpdateButton = styled.div`
    display: flex;
    flex-basis: 7%;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    height: 100%;
`;
