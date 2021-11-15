import { Theme } from '@emotion/react';

export type IThemeStyle = 'basic' | 'pink' | 'violet';

export interface mainColor {
    name: IThemeStyle;
    mainColor: string;
}

export const mainColor: mainColor[] = [
    { name: 'basic', mainColor: '#1f2c3c' },
    { name: 'pink', mainColor: '#f1e8e2' },
    { name: 'violet', mainColor: '#ddd3e9' },
];

export const basic: Theme = {
    colors: {
        main: mainColor[0].mainColor,
        mainInner: '#1b2736',
        relax: '#5de55d',
        shadow: '#0d1721',
        pureWhite: '#ffffff',
        hover: '#333f50',
        scroll: '#C9CCD5',
        pin: '#ED3833',
        text: '#f6f8fd',
        compassActive: '#51C2D5',
        black: '#000000',
        white: '#f6f8fd',
        gray: '#6d6d6d',
    },

    button: {
        color: '#f7f6fd',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#ffffff',
            color: '#000000',
        },
    },
    check: {
        background: '#f6f8fd',
        mark: '#fcc101',
        border: '#f6f8fd',
    },

    logoColor: '#f6f8fd',
};

export const pink: Theme = {
    colors: {
        main: mainColor[1].mainColor,
        mainInner: '#e7c9cc',
        relax: '#5de55d',
        shadow: '#7D5A5A',
        hover: '#e1c0c3',
        scroll: '#7a6864',
        pin: '#CE0F3D',
        text: '#7a6864',
        compassActive: '#51C2D5',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#F6F6F6',
        gray: '#9f979a',
    },

    button: {
        color: '#7a6864',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#7a6864',
            color: mainColor[1].mainColor,
        },
    },

    check: {
        background: mainColor[1].mainColor,
        mark: '#7a6864',
        border: '#7a6864',
    },

    logoColor: '#7a6864',
};

export const violet: Theme = {
    colors: {
        main: mainColor[2].mainColor,
        mainInner: '#be9bcd',
        relax: '#5de55d',
        shadow: '#7D5A5A',
        hover: '#b58fc6',
        scroll: '#514963',
        pin: '#ea1f5f',
        text: '#514963',
        compassActive: '#8e3fb0',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#edeff6',
        gray: '#7b728c',
    },

    button: {
        color: '#7d6793',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#7d6793',
            color: mainColor[2].mainColor,
        },
    },

    check: {
        background: '#edeff6',
        mark: '#514963',
        border: '#7d6793',
    },

    logoColor: '#7a6864',
};
