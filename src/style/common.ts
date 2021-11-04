import styled from '@emotion/styled';

type Direction = 'column' | 'column-reverse' | 'row-reverse' | 'row';

interface IBasis {
    direction?: Direction;
    basis?: string;
    width?: string;
    height?: string;
}

export const FlexDiv = styled.div<IBasis>`
    display: flex;
    flex-direction: ${props => (props.direction ? props.direction : `row`)};
    ${props => props.basis && `flex-basis: ${props.basis}%`};
    ${props => props.width && `width: ${props.width}%`};
    ${props => props.height && `height: ${props.height}%`};
`;

export const FlexLeftDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-basis: 10%;
    width: 100%;
`;

export const FlexRightDiv = styled.div`
    display: flex;
    flex-basis: 85%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const FlexHoverDiv = styled(FlexLeftDiv)`
    height: 100%;
    align-items: center;
    flex-basis: 19%;
    &:hover {
        transition: 200ms ease;
        background: ${props => props.theme.colors.hoverGray};
    }
`;
