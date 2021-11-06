export const customMediaQueryWidth = (maxWidth: number): string => {
    return `@media (max-width: ${maxWidth}px)`;
};

export const customMediaQueryHeight = (maxWidth: number): string => {
    return `@media (max-height: ${maxWidth}px)`;
};

export const widthMedia = {
    custom: customMediaQueryWidth,
    desktop: customMediaQueryWidth(1280),
    tablet: customMediaQueryWidth(768),
    phone: customMediaQueryWidth(576),
};

export const heightMedia = {
    custom: customMediaQueryHeight,
    small: customMediaQueryHeight(620),
};
