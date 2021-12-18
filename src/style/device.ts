export const customMediaQueryWidth = (maxWidth: number): string => {
    return `@media (max-width: ${maxWidth}px)`;
};

export const customMediaQueryHeight = (maxWidth: number): string => {
    return `@media (max-height: ${maxWidth}px)`;
};

interface IDevice {
    bigDesktop: number;
    wideDesktop: number;
    mediumDesktop: number;
    desktop: number;
    smallDesktop: number;
    tablet: number;
    phone: number;
    smallPhone: number;
}

export const responsiveWidth: IDevice = {
    bigDesktop: 1920,
    wideDesktop: 1600,
    mediumDesktop: 1400,
    desktop: 1200,
    smallDesktop: 960,
    tablet: 768,
    phone: 576,
    smallPhone: 450,
};

export const widthMedia = {
    custom: customMediaQueryWidth,
    bigDesktop: customMediaQueryWidth(responsiveWidth.bigDesktop),
    desktop: customMediaQueryWidth(responsiveWidth.desktop),
    mediumDesktop: customMediaQueryWidth(responsiveWidth.mediumDesktop),
    smallDesktop: customMediaQueryWidth(responsiveWidth.smallDesktop),
    tablet: customMediaQueryWidth(responsiveWidth.tablet),
    phone: customMediaQueryWidth(responsiveWidth.phone),
    smallPhone: customMediaQueryWidth(responsiveWidth.smallPhone),
};

export const heightMedia = {
    custom: customMediaQueryHeight,
    verybig: customMediaQueryHeight(1080),
    big: customMediaQueryHeight(900),
    medium: customMediaQueryHeight(720),
    small: customMediaQueryHeight(620),
};
