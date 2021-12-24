import React from 'react';
import Image from 'next/image';

interface IImage {
    type: 'basic' | 'stack';
    width?: string;
    height?: string;
}

const GoldIcon = ({ type, width, height }: IImage) => (
    <Image
        alt="골드 아이콘"
        layout="fixed"
        src={`/static/img/lostark/gold/${type}.png`}
        width={width ? width : '19'}
        height={height ? height : '15'}
    />
);

export default GoldIcon;
