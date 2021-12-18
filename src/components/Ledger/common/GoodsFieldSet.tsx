import React from 'react';
import Image from 'next/image';
import ImageBackground from '@components/ImageBackground';
import { ICommonGold } from '@common/types/response/ledger/common';
import styled from '@emotion/styled';

interface IGoodsFieldSet extends ICommonGold {
    onClick: ({ imgUrl, name }: { imgUrl: string; name: string }) => void;
}

const GoodsFieldSet = ({
    array,
    onClickCommon,
    onClickPersonal,
}: {
    array: ICommonGold[];
    onClickCommon?: ({ imgUrl, name }: { imgUrl: string; name: string }) => void;
    onClickPersonal?: ({ id }: { id: string }) => void;
}) => {
    return (
        <Container>
            <legend>
                <h4>골드 수급처</h4>
            </legend>
            <ImageContainer>
                {array.map(({ id, defaultimgurl, name, defaultbackground }, goodsIndex: number) => {
                    return (
                        <ImageBackground
                            key={goodsIndex}
                            pointer={true}
                            grade={defaultbackground}
                            hover={{ effect: true, message: name }}
                            onClick={() => {
                                onClickCommon && onClickCommon({ imgUrl: defaultimgurl, name: name });
                                onClickPersonal && onClickPersonal({ id: id });
                            }}
                        >
                            <Image src={defaultimgurl} width="40" height="40" />
                        </ImageBackground>
                    );
                })}
            </ImageContainer>
        </Container>
    );
};

const Container = styled.fieldset`
    border: 1px solid ${props => props.theme.colors.text};
    padding: 1em;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageContainer = styled.section`
    display: flex;
`;
export default GoodsFieldSet;
