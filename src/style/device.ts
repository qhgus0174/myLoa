export const customMediaQueryWidth = (maxWidth: number): string => {
    return `@media (max-width: ${maxWidth}px)`;
};

export const customMediaQueryHeight = (maxWidth: number): string => {
    return `@media (max-height: ${maxWidth}px)`;
};

interface IDevice {
    desktop: number;
    smallDesktop: number;
    tablet: number;
    phone: number;
    smallPhone: number;
}

export const responsiveWidth: IDevice = {
    desktop: 1280,
    smallDesktop: 960,
    tablet: 768,
    phone: 576,
    smallPhone: 450,
};

export const widthMedia = {
    custom: customMediaQueryWidth,
    desktop: customMediaQueryWidth(responsiveWidth.desktop),
    smallDesktop: customMediaQueryWidth(responsiveWidth.smallDesktop),
    tablet: customMediaQueryWidth(responsiveWidth.tablet),
    phone: customMediaQueryWidth(responsiveWidth.phone),
    smallPhone: customMediaQueryWidth(responsiveWidth.smallPhone),
};

export const heightMedia = {
    custom: customMediaQueryHeight,
    small: customMediaQueryHeight(620),
};
