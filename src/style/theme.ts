import { Theme } from '@emotion/react';

export type IThemeStyle =
    | 'none'
    | 'basic'
    | 'pink'
    | 'violet'
    | 'green'
    | 'cold'
    | 'autumn'
    | 'violetBrown'
    | 'flower'
    | 'pinkBeige'
    | 'darkBrown'
    | 'darkYellow'
    | 'darkPink'
    | 'veryCold'
    | 'darkCyan'
    | 'lego'
    | 'blue';

export interface mainColor {
    name: IThemeStyle;
    mainColor: string;
}

export const mainColor: mainColor[] = [
    { name: 'basic', mainColor: '#1f2c3c' },
    { name: 'pink', mainColor: '#e4ddd7' },
    { name: 'violet', mainColor: '#ddd3e9' },
    { name: 'green', mainColor: '#dfdbd8' },
    { name: 'cold', mainColor: '#dbe5e5' },
    { name: 'autumn', mainColor: '#e8b2a0' },
    { name: 'violetBrown', mainColor: '#93808c' },
    { name: 'flower', mainColor: '#ffd5de' },
    { name: 'pinkBeige', mainColor: '#F7DAD9' },
    { name: 'darkBrown', mainColor: '#423F3E' },
    { name: 'darkYellow', mainColor: '#393E46' },
    { name: 'darkPink', mainColor: '#595B83' },
    { name: 'veryCold', mainColor: '#9890b0' },
    { name: 'darkCyan', mainColor: '#363a43' },
    { name: 'lego', mainColor: '#0f609d' },
    { name: 'blue', mainColor: '#c7d7e4' },
];

export const none: Theme = {
    visible: false,
    colors: {
        main: '#ffffff',
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
        navBorder: '#1b2736',
        warn: '#f6f8fd',
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
        paging: {
            background: '#ffffff',
            color: '#000000',
        },
    },
    check: {
        background: '#f6f8fd',
        basicMark: '#000000',
        mark: '#fcc101',
        border: '#f6f8fd',
    },

    logoColor: '#f6f8fd',

    graph: {
        primary: '#396EB0',
        secondary: '#F2789F',
        quaternary: '#9B72AA',
        tertiary: '#e38649',
    },
    ledger: {
        income: '#4596e6',
        spending: '#e38649',
    },
};

export const basic: Theme = {
    visible: true,
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
        navBorder: '#1b2736',
        warn: '#f6f8fd',
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
        paging: {
            background: '#ffffff',
            color: '#000000',
        },
    },
    check: {
        background: '#f6f8fd',
        basicMark: '#000000',
        mark: '#fcc101',
        border: '#f6f8fd',
    },

    logoColor: '#f6f8fd',

    graph: {
        primary: '#396EB0',
        secondary: '#F2789F',
        quaternary: '#9B72AA',
        tertiary: '#f77768',
    },

    ledger: {
        income: '#4596e6',
        spending: '#f77768',
    },
};

export const pink: Theme = {
    visible: true,
    colors: {
        main: mainColor[1].mainColor,
        mainInner: '#debfc4',
        relax: '#65cc7c',
        shadow: '#7D5A5A',
        hover: '#d7b1b7',
        scroll: '#7a6864',
        pin: '#CE0F3D',
        text: '#7a6864',
        compassActive: '#F25287',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#F6F6F6',
        gray: '#9f979a',
        navBorder: '#debfc4',
        warn: '#7a6864',
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
        paging: {
            background: '#7a6864',
            color: mainColor[1].mainColor,
        },
    },

    check: {
        background: mainColor[1].mainColor,
        mark: '#7a6864',
        basicMark: '#000000',
        border: '#7a6864',
    },

    logoColor: '#7a6864',

    graph: {
        primary: '#F8BD7F',
        secondary: '#82ca9d',
        quaternary: '#396EB0',
        tertiary: '#EC4646',
    },
    ledger: {
        income: '#2D46B9',
        spending: '#EC4646',
    },
};

export const violet: Theme = {
    visible: true,
    colors: {
        main: mainColor[2].mainColor,
        mainInner: '#be9bcd',
        relax: '#5de55d',
        shadow: '#7D5A5A',
        hover: '#b088c3',
        scroll: '#514963',
        pin: '#ea1f5f',
        text: '#514963',
        compassActive: '#8e3fb0',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#edeff6',
        gray: '#7b728c',
        navBorder: '#be9bcd',
        warn: '#514963',
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
        paging: {
            background: '#7d6793',
            color: mainColor[2].mainColor,
        },
    },

    check: {
        background: '#edeff6',
        mark: '#514963',
        basicMark: '#000000',
        border: '#7d6793',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#B4AEE8',
        secondary: '#4C3F91',
        quaternary: '#F9C5D5',
        tertiary: '#DE4463',
    },
    ledger: {
        income: '#1F3C88',
        spending: '#DE4463',
    },
};

export const green: Theme = {
    visible: true,
    colors: {
        main: mainColor[3].mainColor,
        mainInner: '#6e9a79',
        relax: '#5de55d',
        shadow: '#3a3834',
        hover: '#567f60',
        scroll: '#375a45',
        pin: '#CE0F3D',
        text: '#3a3834',
        compassActive: '#008e5c',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#edeff6',
        gray: '#747b75',
        navBorder: '#6e9a79',
        warn: '#3a3834',
    },

    button: {
        color: '#3a3834',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#3a3834',
            color: mainColor[3].mainColor,
        },
        paging: {
            background: '#3a3834',
            color: mainColor[3].mainColor,
        },
    },

    check: {
        background: mainColor[3].mainColor,
        mark: '#3a3834',
        basicMark: '#000000',
        border: '#3a3834',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#3E8E7E',
        secondary: '#C7B198',
        quaternary: '#79B4B7',
        tertiary: '#EE6F57',
    },
    ledger: {
        income: '#1F3C88',
        spending: '#EE6F57',
    },
};

export const cold: Theme = {
    visible: true,
    colors: {
        main: mainColor[4].mainColor,
        mainInner: '#a2b9b5',
        relax: '#5de55d',
        shadow: '#799d9f',
        hover: '#94aca8',
        scroll: '#777172',
        pin: '#CE0F3D',
        text: '#777172',
        compassActive: '#0a938a',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#edeff6',
        gray: '#799d9f',
        navBorder: '#a2b9b5',
        warn: '#777172',
    },

    button: {
        color: '#777172',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#777172',
            color: mainColor[4].mainColor,
        },
        paging: {
            background: '#777172',
            color: mainColor[4].mainColor,
        },
    },

    check: {
        background: mainColor[4].mainColor,
        mark: '#777172',
        basicMark: '#000000',
        border: '#777172',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#7CD1B8',
        secondary: '#5584AC',
        quaternary: '#907FA4',
        tertiary: '#EC4646',
    },
    ledger: {
        income: '#1F3C88',
        spending: '#EC4646',
    },
};

export const autumn: Theme = {
    visible: true,
    colors: {
        main: mainColor[5].mainColor,
        mainInner: '#ce8e72',
        relax: '#5de55d',
        shadow: '#485a50',
        hover: '#c88264',
        scroll: '#485a50',
        pin: '#de0639',
        text: '#ffffff',
        compassActive: '#e64941',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#edeff6',
        gray: '#485a50',
        navBorder: '#ce8e72',
        warn: '#ffffff',
    },

    button: {
        color: '#ffffff',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#ffffff',
            color: mainColor[5].mainColor,
        },
        paging: {
            background: '#ffffff',
            color: mainColor[5].mainColor,
        },
    },

    check: {
        background: mainColor[5].mainColor,
        mark: '#333333',
        basicMark: '#000000',
        border: '#333333',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#DE834D',
        secondary: '#A3423C',
        quaternary: '#FF8882',
        tertiary: '#A91D1D',
    },
    ledger: {
        income: '#2F24C1',
        spending: '#A91D1D',
    },
};

export const violetBrown: Theme = {
    visible: true,
    colors: {
        main: mainColor[6].mainColor,
        mainInner: '#705b64',
        relax: '#5de55d',
        shadow: '#4f4647',
        hover: '#5c4b53',
        scroll: '#4f4647',
        pin: '#B61919',
        text: '#f4ece7',
        compassActive: '#f4ece7',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#edeff6',
        gray: '#4f4647',
        navBorder: '#705b64',
        warn: '#f4ece7',
    },

    button: {
        color: '#f4ece7',
        ok: '#8BC34A',
        cancel: '#B61919',
        none: 'transparent',
        hover: {
            background: '#f4ece7',
            color: mainColor[6].mainColor,
        },
        paging: {
            background: '#f4ece7',
            color: mainColor[6].mainColor,
        },
    },

    check: {
        background: mainColor[6].mainColor,
        mark: '#4f4647',
        basicMark: '#4f4647',
        border: '#f4ece7',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#D8B6A4',
        secondary: '#A2416B',
        quaternary: '#C26565',
        tertiary: '#F999B7',
    },
    ledger: {
        income: '#DBE6FD',
        spending: '#F999B7',
    },
};

export const flower: Theme = {
    visible: true,
    colors: {
        main: mainColor[7].mainColor,
        mainInner: '#ffa9b9',
        relax: '#9FE6A0',
        shadow: '#768378',
        hover: '#f887a1',
        scroll: '#a2455f',
        pin: '#BA135D',
        text: '#a2455f',
        compassActive: '#822a62',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#edeff6',
        gray: '#768378',
        navBorder: '#feb3c1',
        warn: '#a2455f',
    },

    button: {
        color: '#a2455f',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#a2455f',
            color: mainColor[7].mainColor,
        },
        paging: {
            background: '#a2455f',
            color: mainColor[7].mainColor,
        },
    },

    check: {
        background: mainColor[7].mainColor,
        mark: '#a2455f',
        basicMark: '#4f4647',
        border: '#a2455f',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#B24080',
        secondary: '#664E88',
        quaternary: '#FE91CA',
        tertiary: '#E4406F',
    },
    ledger: {
        income: '#0033C7',
        spending: '#E4406F',
    },
};

export const pinkBeige: Theme = {
    visible: true,
    colors: {
        main: mainColor[8].mainColor,
        mainInner: '#d5c5c2',
        relax: '#5de55d',
        shadow: '#5D534A',
        hover: '#c8b4b0',
        scroll: '#635e59',
        pin: '#EC5858',
        text: '#5D534A',
        compassActive: '#5D534A',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#fafaf9',
        gray: '#97979f',
        navBorder: '#d5c5c2',
        warn: '#5D534A',
    },

    button: {
        color: '#635e59',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#635e59',
            color: mainColor[8].mainColor,
        },
        paging: {
            background: '#635e59',
            color: mainColor[8].mainColor,
        },
    },

    check: {
        background: mainColor[8].mainColor,
        mark: '#5D534A',
        basicMark: '#5D534A',
        border: '#5D534A',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#8884d8',
        secondary: '#EB92BE',
        quaternary: '#F1C6E7',
        tertiary: '#e38649',
    },
    ledger: {
        income: '#1F3C88',
        spending: '#e38649',
    },
};

export const darkBrown: Theme = {
    visible: true,
    colors: {
        main: mainColor[9].mainColor,
        mainInner: '#363535',
        relax: '#5de55d',
        shadow: '#171010',
        hover: '#2d2d2d',
        scroll: '#efebeb',
        pin: '#EC5858',
        text: '#efebeb',
        compassActive: '#cbbf61',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#efebeb',
        gray: '#8a8583',
        navBorder: '#363535',
        warn: '#efebeb',
    },

    button: {
        color: '#efebeb',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#efebeb',
            color: mainColor[9].mainColor,
        },
        paging: {
            background: '#efebeb',
            color: mainColor[9].mainColor,
        },
    },

    check: {
        background: '#d5cccc',
        mark: '#2b2b2b',
        basicMark: '#000000',
        border: '#efebeb',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#865439',
        secondary: '#C68B59',
        quaternary: '#EA9085',
        tertiary: '#e38649',
    },
    ledger: {
        income: '#78C4D4',
        spending: '#e38649',
    },
};

export const darkYellow: Theme = {
    visible: true,
    colors: {
        main: mainColor[10].mainColor,
        mainInner: '#272e39',
        relax: '#5de55d',
        shadow: '#171010',
        hover: '#212530',
        scroll: '#EEEEEE',
        pin: '#FF0000',
        text: '#EEEEEE',
        compassActive: '#edf2fc',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#EEEEEE',
        gray: '#8a8583',
        navBorder: '#272e39',
        warn: '#EEEEEE',
    },

    button: {
        color: '#EEEEEE',
        ok: '#8BC34A',
        cancel: '#EC4646',
        none: 'transparent',
        hover: {
            background: '#EEEEEE',
            color: mainColor[10].mainColor,
        },
        paging: {
            background: '#EEEEEE',
            color: mainColor[10].mainColor,
        },
    },

    check: {
        background: '#d7d4d4',
        mark: '#1a1f27',
        basicMark: '#000000',
        border: '#d7d4d4',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#22577E',
        secondary: '#E2C275',
        quaternary: '#808C6C',
        tertiary: '#e38649',
    },
    ledger: {
        income: '#4596e6',
        spending: '#e38649',
    },
};

export const darkPink: Theme = {
    visible: true,
    colors: {
        main: mainColor[11].mainColor,
        mainInner: '#333456',
        relax: '#5de55d',
        shadow: '#171010',
        hover: '#2b2c49',
        scroll: '#EEEEEE',
        pin: '#f0417e',
        text: '#EEEEEE',
        compassActive: '#F4ABC4',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#EEEEEE',
        gray: '#8a8583',
        navBorder: '#333456',
        warn: '#EEEEEE',
    },

    button: {
        color: '#EEEEEE',
        ok: '#8BC34A',
        cancel: '#fe5757',
        none: 'transparent',
        hover: {
            background: '#EEEEEE',
            color: mainColor[11].mainColor,
        },
        paging: {
            background: '#EEEEEE',
            color: mainColor[11].mainColor,
        },
    },

    check: {
        background: '#EEEEEE',
        mark: '#F4ABC4',
        basicMark: '#000000',
        border: '#EEEEEE',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#8884d8',
        secondary: '#82ca9d',
        quaternary: '#BBBBBB',
        tertiary: '#FFA3AC',
    },
    ledger: {
        income: '#81CBC8',
        spending: '#FFA3AC',
    },
};

export const veryCold: Theme = {
    visible: true,
    colors: {
        main: mainColor[12].mainColor,
        mainInner: '#5f5774',
        relax: '#5de55d',
        shadow: '#352F44',
        hover: '#564e68',
        scroll: '#EEEEEE',
        pin: '#D72323',
        text: '#EEEEEE',
        compassActive: '#EEEEEE',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#EEEEEE',
        gray: '#706e77',
        navBorder: '#897f9e',
        warn: '#EEEEEE',
    },

    button: {
        color: '#EEEEEE',
        ok: '#8BC34A',
        cancel: '#fe5757',
        none: 'transparent',
        hover: {
            background: '#5f5774',
            color: mainColor[12].mainColor,
        },
        paging: {
            background: '#EEEEEE',
            color: '#5f5774',
        },
    },

    check: {
        background: '#EEEEEE',
        mark: '#5C5470',
        basicMark: '#000000',
        border: '#EEEEEE',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#916BBF',
        secondary: '#EB92BE',
        quaternary: '#93B5E1',
        tertiary: '#B72A67',
    },
    ledger: {
        income: '#BBF1FA',
        spending: '#FBACCC',
    },
};

export const darkCyan: Theme = {
    visible: true,
    colors: {
        main: mainColor[13].mainColor,
        mainInner: '#252b36',
        relax: '#5de55d',
        shadow: '#222831',
        hover: '#1e232d',
        scroll: '#00ADB5',
        pin: '#E23E57',
        text: '#00ADB5',
        compassActive: '#00FFF5',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#EEEEEE',
        gray: '#706e77',
        navBorder: '#252b36',
        warn: '#00ADB5',
    },

    button: {
        color: '#00ADB5',
        ok: '#8BC34A',
        cancel: '#fe5757',
        none: 'transparent',
        hover: {
            background: '#222831',
            color: '#00ADB5',
        },
        paging: {
            background: '#00ADB5',
            color: '#252b36',
        },
    },

    check: {
        background: '#393E46',
        mark: '#00FFF5',
        basicMark: '#00FFF5',
        border: '#00ADB5',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#22577A',
        secondary: '#87A8A4',
        quaternary: '#00416D',
        tertiary: '#e38649',
    },
    ledger: {
        income: '#7971EA',
        spending: '#e38649',
    },
};

export const lego: Theme = {
    visible: true,
    colors: {
        main: mainColor[14].mainColor,
        mainInner: '#09355c',
        relax: '#5de55d',
        shadow: '#001F3F',
        hover: '#082d4e',
        scroll: '#FFD717',
        pin: '#FF004D',
        text: '#FFD717',
        compassActive: '#FFD717',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#EEEEEE',
        gray: '#4d4f50',
        navBorder: '#114a7c',
        warn: '#FFD717',
    },

    button: {
        color: '#FFD717',
        ok: '#8BC34A',
        cancel: '#fe5757',
        none: 'transparent',
        hover: {
            background: '#FFD717',
            color: '#083358',
        },
        paging: {
            background: '#FFD717',
            color: '#083358',
        },
    },

    check: {
        background: '#0D63A5',
        mark: '#FFD717',
        basicMark: '#FFD717',
        border: '#FFD717',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#FF7600',
        secondary: '#00C1D4',
        quaternary: '#3D84B8',
        tertiary: '#F67280',
    },
    ledger: {
        income: '#24BDDF',
        spending: '#F67280',
    },
};

export const blue: Theme = {
    visible: true,
    colors: {
        main: mainColor[15].mainColor,
        mainInner: '#148cad',
        relax: '#5de55d',
        shadow: '#276678',
        hover: '#137d9a',
        scroll: '#F6F5F5',
        pin: '#FF577F',
        text: '#194551',
        compassActive: '#ffffff',
        pureWhite: '#ffffff',
        black: '#000000',
        white: '#F6F5F5',
        gray: '#276678',
        navBorder: '#90a5ab',
        warn: '#194551',
    },

    button: {
        color: '#194551',
        ok: '#8BC34A',
        cancel: '#fe5757',
        none: 'transparent',
        hover: {
            background: '#1687A7',
            color: '#F6F5F5',
        },
        paging: {
            background: mainColor[15].mainColor,
            color: '#148cad',
        },
    },

    check: {
        background: mainColor[15].mainColor,
        mark: '#1687A7',
        basicMark: '#276678',
        border: '#F6F5F5',
    },

    logoColor: '#7a6864',
    graph: {
        primary: '#262A53',
        secondary: '#628395',
        quaternary: '#325288',
        tertiary: '#e38649',
    },
    ledger: {
        income: '#2D46B9',
        spending: '#F999B7',
    },
};
