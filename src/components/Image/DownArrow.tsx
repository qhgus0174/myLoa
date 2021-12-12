import { Theme } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { Interpolation } from '@emotion/serialize';
import * as React from 'react';

const SvgComponent = (
    props: JSX.IntrinsicAttributes & { css?: Interpolation<Theme> } & React.SVGProps<SVGSVGElement> & {
            css?: Interpolation<Theme>;
        },
) => (
    <svg width={512} height={512} viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>{'caret-down'}</title>
        <path d="M64 208h192l-96 112-96-112Z" />
    </svg>
);

export default SvgComponent;
