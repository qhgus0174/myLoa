import { ScheduleContents } from '@common/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { widthMedia } from '@style/device';

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
    flex-basis: 12%;
    ${widthMedia.tablet} {
        flex-basis: 30%;
    }
`;

export const FlexRightDiv = styled.div`
    display: flex;
    flex-basis: 88%;
    ${widthMedia.tablet} {
        flex-basis: 70%;
    }
    align-items: center;
    justify-content: center;
`;

export const FlexHoverDiv = styled(FlexLeftDiv)`
    height: 100%;
    align-items: center;

    flex-basis: 15.8%;

    ${widthMedia.desktop} {
        flex-basis: 23.75%;
    }

    ${widthMedia.tablet} {
        flex-basis: 47.5%;
    }

    ${widthMedia.phone} {
        flex-basis: 90%;
    }

    &:hover {
        transition: 200ms ease;
        background: ${props => props.theme.colors.hoverGray};
    }

    cursor: pointer;
`;

export const CharactersDiv = styled(FlexRightDiv)<{ length: number; contents?: ScheduleContents }>`
    height: ${props => (props.contents === 'guardian' ? '7.75em' : '4.55em')};

    ${props => {
        if (props.length > 4) {
            return css`
                justify-content: space-around;
            `;
        } else if (props.length > 2) {
            return css`
                justify-content: space-evenly;
            `;
        } else if (props.length > 0) {
            return css`
                justify-content: flex-start;
                & > div {
                    margin-right: 6em;
                    ${widthMedia.tablet} {
                        margin-right: 0em;
                    }
                }
            `;
        }
    }}

    ${widthMedia.tablet} {
        justify-content: center;
    }
`;
