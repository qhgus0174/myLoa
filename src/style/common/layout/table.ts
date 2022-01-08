import styled from '@emotion/styled';

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
