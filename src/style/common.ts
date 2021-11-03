import styled from '@emotion/styled';

type Direction = 'column' | 'column-reverse' | 'row-reverse' | 'row';

interface IBasis {
    direction?: Direction;
    basis?: string;
    height?: string;
}

export const FlexDiv = styled.div<IBasis>`
    display: flex;
    flex-direction: ${props => props.direction};
    flex-basis: ${props => props.basis}%;
    width: 100%;
    height: ${props => props.height}%;
`;

export const FlexLeftDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-basis: 20%;
    width: 100%;
`;

export const FlexRightDiv = styled.div`
    display: flex;
    flex-basis: 80%;
    width: 100%;
    align-items: center;
`;

export const FlexHoverDiv = styled(FlexLeftDiv)`
    height: 100%;
    align-items: center;
    &:hover {
        transition: 200ms ease;
        background: ${props => props.theme.colors.hoverGray};
    }
`;
