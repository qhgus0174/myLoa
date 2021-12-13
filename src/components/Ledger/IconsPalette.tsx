import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { IGoodsImg } from '@common/types/response/ledger/goods';
import ImageBackground from '@components/ImageBackground';
import styled from '@emotion/styled';

interface IIconPalette {
    imgId?: string;
    imgPaletteArr: IGoodsImg[];
    goodsId: string;
    onClick: ({ imageId, goodsId }: { imageId: string; goodsId: string }) => void;
}

const IconPalette = ({ imgId, imgPaletteArr, goodsId, onClick }: IIconPalette) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [goodsImgIndx, setGoodsImgIndx] = useState<number>(0);

    const ref = useRef<HTMLElement>(null);

    useOnClickOutside(ref, () => setVisible(false));

    useEffect(() => {
        const iconIndex = imgPaletteArr.findIndex(({ id }) => {
            return id == imgId;
        });
        setGoodsImgIndx(iconIndex);
    }, [imgPaletteArr]);

    return (
        <Container ref={ref}>
            <SelectedImg onClick={() => setVisible(!visible)}>
                <ImageBackground
                    pointer={true}
                    grade={imgPaletteArr[goodsImgIndx].background}
                    hover={{ effect: true }}
                    width="27"
                    height="27"
                >
                    <Image
                        src={`/static/img/lostark/${imgPaletteArr[goodsImgIndx].folder}/${imgPaletteArr[goodsImgIndx].filename}`}
                        width="25"
                        height="25"
                    />
                </ImageBackground>
            </SelectedImg>
            <Palette visible={visible}>
                {imgPaletteArr.map(({ folder, filename, id, background }, index) => {
                    return (
                        <ImageBackground
                            key={index}
                            pointer={true}
                            grade={background}
                            hover={{ effect: true }}
                            width="30"
                            height="30"
                            onClick={() => {
                                onClick({ imageId: id, goodsId: goodsId });
                                setVisible(false);
                            }}
                        >
                            <Image src={`/static/img/lostark/${folder}/${filename}`} width="25" height="25" />
                        </ImageBackground>
                    );
                })}
            </Palette>
        </Container>
    );
};

const Container = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
`;

const Palette = styled.article<{ visible: boolean }>`
    display: ${props => (props.visible ? 'flex' : 'none')};
    flex-wrap: wrap;
    background: ${props => props.theme.colors.mainInner};
    width: 10em;
    top: 30px;
    position: absolute;
    transition: all 0.09s;
    z-index: 10;
    padding: 0.5em;
`;

const SelectedImg = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default IconPalette;
