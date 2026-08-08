import type { FontProps } from './UI';

export const Fonts = {
    DsDigital: {
        family: 'DS-Digital',
        href: 'https://fonts.cdnfonts.com/css/ds-digital',
    },
    ChakraPetch: {
        family: 'Chakra Petch',
        href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&display=swap',
    },
    Oxanium: {
        family: 'Oxanium',
        href: 'https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700&display=swap',
    },
    Manrope: {
        family: 'Manrope',
        href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap',
    },
    Inter: {
        family: 'Inter',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    },
    NotoSans: {
        family: 'Noto Sans',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap',
    },
} satisfies Record<string, FontProps>;

export const DisplayFonts = {
    Classic: "uiFont",
    Segmented: Fonts.DsDigital,
    Modern: Fonts.ChakraPetch,
} satisfies Record<string, FontProps | "uiFont">;