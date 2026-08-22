import { ensureFont, Fonts, DisplayFonts } from '.';
import { Css } from './Css';

export type FxDisplayContentLayout = 'row' | 'labeled' | 'column';
export type FxDisplayGlow = 'none' | 'small' | 'medium' | 'large' | 'x-large';
export type FxDisplayTypography = 'classic' | 'segmented' | 'modern';
export type FxDisplayTheme = 'silver' | 'darkblue';

export function ensureDisplayTypography(typography: FxDisplayTypography): void {
    switch (typography) {
        case 'modern':
            ensureFont(Fonts.Oxanium);
            break;
        case 'segmented':
            ensureFont(DisplayFonts.Segmented);
            break;
        case 'classic':
            break;
    }
}

export const reflectNonDefaultTypography = {
    fromAttribute: (value: string | null): FxDisplayTypography => {
        switch (value) {
            case 'classic':
            case 'modern':
            case 'segmented':
                return value;
            default:
                return 'segmented';
        }
    },
    toAttribute: (value: FxDisplayTypography): string | null =>
        value === 'segmented' ? null : value,
};

export type FxDisplayAlign = 'left' | 'center' | 'right' | 'space-between' | 'space-around';

export const reflectNonDefaultContentLayout = {
    fromAttribute: (value: string | null): FxDisplayContentLayout => {
        switch (value) {
            case 'row':
            case 'labeled':
            case 'column':
                return value;
            default:
                return 'labeled';
        }
    },
    toAttribute: (value: FxDisplayContentLayout): string | null =>
        value === 'labeled' ? null : value,
};

export const reflectNonDefaultAlign = {
    fromAttribute: (value: string | null): FxDisplayAlign => {
        switch (value) {
            case 'left':
            case 'center':
            case 'right':
            case 'space-between':
            case 'space-around':
                return value;
            default:
                return 'center';
        }
    },
    toAttribute: (value: FxDisplayAlign): string | null =>
        value === 'center' ? null : value,
};

export const displaySizeTokens = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large',
] as const;

export type FxDisplaySizeToken = (typeof displaySizeTokens)[number];
export type FxDisplaySize = FxDisplaySizeToken | number | (string & {});

const displaySizeTokenSet = new Set<string>(displaySizeTokens);

export function normalizeCustomSizeLength(size: string | number): string | null {
    const raw = typeof size === 'string' ? size.trim() : size;
    if (typeof raw === 'string' && displaySizeTokenSet.has(raw)) {
        return null;
    } else {
        return Css.normalizeLength(size) || null;
    }
}

export function customDisplaySizeVars(size: string | number): string {
    const valueSize = normalizeCustomSizeLength(size);
    return valueSize
        ? `
        --fx-display-value-size: ${valueSize};
        --fx-display-label-size: calc(${valueSize} * 0.22);
        --fx-display-region-gap: calc(${valueSize} * 0.08);
        --fx-display-region-padding: calc(${valueSize} * 0.08);
        --fx-display-shell-pad: calc(${valueSize} * 0.12);
        --fx-display-shell-radius: calc(${valueSize} * 0.16);
    `
        : '';
}

export interface FxDisplayRegionConfig {
    label?: string;
    prefix?: string;
    value?: string | number;
    suffix?: string;
    valueTemplate?: string;
    contentLayout?: FxDisplayContentLayout;
    align?: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
    flex?: string | number;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    border?: string;
    borderRadius?: string;
    backgroundColor?: string;
    color?: string;
    labelColor?: string;
    prefixColor?: string;
    foregroundColor?: string;
    suffixColor?: string;
    fontSize?: string;
    labelSize?: string;
    prefixSize?: string;
    valueSize?: string;
    suffixSize?: string;
    labelWeight?: string;
    prefixWeight?: string;
    valueWeight?: string;
    suffixWeight?: string;
    icon?: string;
    iconColor?: string;
    iconSide?: 'left' | 'right' | 'top' | 'bottom';
    typography?: FxDisplayTypography;
    isSelectable?: boolean;
    size?: FxDisplaySize;
}
