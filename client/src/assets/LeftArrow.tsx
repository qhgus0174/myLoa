import { Theme } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { Interpolation } from '@emotion/serialize';
import * as React from 'react';

const SvgComponent = (
    props: JSX.IntrinsicAttributes & { css?: Interpolation<Theme> } & React.SVGProps<SVGSVGElement> & {
            css?: Interpolation<Theme>;
        },
) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.23 26.23" xmlSpace="preserve" {...props}>
        <path d="M21.561 25.849v-5.877l-8.308-6.557a.392.392 0 0 1 0-.6l8.308-6.555V.38a.382.382 0 0 0-.209-.343.389.389 0 0 0-.406.046L4.805 12.815a.396.396 0 0 0 0 .6l16.14 12.734a.39.39 0 0 0 .406.043.38.38 0 0 0 .21-.343z" />
    </svg>
);

export default SvgComponent;
