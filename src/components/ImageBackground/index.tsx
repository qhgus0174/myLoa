import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';
import { BackgroundGrade } from '@style/common/img';

export interface IImageBackground extends React.HTMLAttributes<HTMLElement> {
    children: JSX.Element;
    grade: BackgroundGrade;
    pointer?: boolean;
    active?: boolean;
    width?: string;
    height?: string;
    hover: {
        effect: boolean;
        message?: JSX.Element | string;
    };
}

const gradeBackground = (grade: BackgroundGrade) => {
    switch (grade) {
        case 'default':
            return '135deg, #232323, #575757';
        case 'high':
            return '135deg, #18220b, #304911';
        case 'rare':
            return '135deg, #111f2c, #113d5d';
        case 'hero':
            return '135deg, #261331, #480d5d';
        case 'legend':
            return '135deg, #362003, #9e5f04';
        case 'relics':
            return '135deg, #341a09, #a24006';
    }
};

const gradeHoverBackground = (grade: BackgroundGrade) => {
    switch (grade) {
        case 'default':
            return '135deg, #0a0909, #1a1913';
        case 'legend':
            return '135deg, #1e1000, #633b02';
        case 'relics':
            return '135deg, #1e0f05, #632602';
    }
};

const ImageBackground = ({ children, grade, pointer, active, hover, width, height, ...rest }: IImageBackground) => {
    return (
        <ImageContainer
            width={width}
            height={height}
            hover={hover}
            grade={grade}
            pointer={pointer}
            active={active}
            {...rest}
        >
            {children}
            {hover.message && <span>{hover.message}</span>}
            {active && (
                <ActiveDiv grade={grade}>
                    <Image src="/static/img/icon/check.png" width="25" height="25" />
                </ActiveDiv>
            )}
        </ImageContainer>
    );
};

const ImageContainer = styled.article<Omit<IImageBackground, 'children'>>`
    background: linear-gradient(${props => gradeBackground(props.grade)});

    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    width: ${props => (props.width ? `${props.width}px` : `42px`)};
    height: ${props => (props.height ? `${props.height}px` : `42px`)};
    border: 1px solid #000;
    box-sizing: border-box;
    transition: all 0.09s;

    ${props => props.pointer && `cursor : pointer`};
    ${props =>
        props.hover.effect &&
        `
        &:hover{
            border : 1px solid ${props.theme.colors.white};
            opacity : 0.75;
        }
        ${
            props.hover.message &&
            `&:hover{
                opacity:0.9;
                background: linear-gradient(${gradeHoverBackground(props.grade)});
                &>span{
                    position: absolute;
                    display: block;
                    width: 33px;
                    text-align: center;
                    opacity: 1;
                    font-size: 0.8em;
                }
                span{
                    color:white;
                }
                span:nth-of-type(1) img{
                    opacity: 0.5;
                }
            }`
        }
    `};

    & > span {
        display: none;
    }

    ${props =>
        props.active &&
        `
        background: linear-gradient(${gradeHoverBackground(props.grade)});
        &>span:nth-of-type(1) img {
            opacity: 0.5;
        }
    `};
`;

const ActiveDiv = styled.div<Pick<IImageBackground, 'grade'>>`
    position: absolute;
    display: flex;
`;

export default ImageBackground;
