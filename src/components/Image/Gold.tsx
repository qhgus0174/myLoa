import React from 'react';
import Image from 'next/image';

interface IImage {
    type: 'basic' | 'stack';
}

const GoldIcon = ({ type }: IImage) => (
    <Image layout="fixed" src={`/static/img/lostark/gold/${type}.png`} width="19" height="15" />
);

export default GoldIcon;
