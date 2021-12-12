import { Theme } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { Interpolation } from '@emotion/serialize';
import * as React from 'react';

const SvgComponent = (
    props: JSX.IntrinsicAttributes & { css?: Interpolation<Theme> } & React.SVGProps<SVGSVGElement> & {
            css?: Interpolation<Theme>;
        },
) => <svg xmlns="http://www.w3.org/2000/svg" width={400} height={74.419} {...props} />;

export default SvgComponent;
