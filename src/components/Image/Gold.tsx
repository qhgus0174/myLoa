import React from 'react';
import Image from 'next/image';

interface IImage {
    width: string;
    height: string;
    type: 'basic' | 'stack';
}

const GoldIcon = ({ width, height, type }: IImage) => (
    <Image src={`/static/img/lostark/gold/${type}.png`} width={width} height={height} />
);

export default GoldIcon;
