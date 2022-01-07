import styled from '@emotion/styled';

export const Contents = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${props => props.theme.colors.gray};
`;

export const InnerContents = styled.div<{ name?: boolean }>`
    width: ${props => (props.name ? `30%` : `calc(100% / 5)`)};
    text-align: center;
    padding: 0.5em 0.5em;
`;
export const ListItem = styled.div<{ selected: boolean }>`
    display: flex;
    align-items: center;

    cursor: pointer;

    ${props => props.selected && `background : ${props.theme.colors.hover}`};

    &:hover {
        transition: 0.2s ease;
        background: ${props => props.theme.colors.hover};
    }
`;
