import { Theme } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { Interpolation } from '@emotion/serialize';
import * as React from 'react';

const SvgComponent = (
    props: JSX.IntrinsicAttributes & { css?: Interpolation<Theme> } & React.SVGProps<SVGSVGElement> & {
            css?: Interpolation<Theme>;
        },
) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.633 20.633" xmlSpace="preserve" {...props}>
        <path d="M15.621 9.844 5.971.195A.652.652 0 0 0 5.5 0a.664.664 0 0 0-.473.195l-.013.012a.677.677 0 0 0-.197.475v4.682c0 .178.071.348.197.471l4.481 4.482-4.481 4.479a.667.667 0 0 0-.197.475v4.68c0 .18.071.354.197.475l.013.01a.664.664 0 0 0 .947 0l9.647-9.646a.671.671 0 0 0 0-.946z" />
    </svg>
);

export default SvgComponent;
