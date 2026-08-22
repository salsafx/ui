import type { FontProps } from './UI';
import { bundledFontStylesheets } from '../../../assets/fonts/urls';

export const Fonts = {
    DsDigital: {
        family: 'DS-Digital',
        href: 'https://fonts.cdnfonts.com/css/ds-digital',
    },
    ChakraPetch: {
        family: 'Chakra Petch',
        href: bundledFontStylesheets.ChakraPetch,
    },
    Oxanium: {
        family: 'Oxanium',
        href: bundledFontStylesheets.Oxanium,
    },
    Manrope: {
        family: 'Manrope',
        href: bundledFontStylesheets.Manrope,
    },
    Inter: {
        family: 'Inter',
        href: bundledFontStylesheets.Inter,
    },
    NotoSans: {
        family: 'Noto Sans',
        href: bundledFontStylesheets.NotoSans,
    },
} satisfies Record<string, FontProps>;

export const DisplayFonts = {
    Classic: "uiFont",
    Segmented: Fonts.DsDigital,
    Modern: Fonts.ChakraPetch,
} satisfies Record<string, FontProps | "uiFont">;
