import { Css } from './Css';
import { DisplayFonts, Fonts } from './Typography';
import { Font } from './UI';

export type FxDisplayContentLayout = 'row' | 'labeled' | 'column';
export type FxDisplayGlow = 'none' | 'small' | 'medium' | 'large' | 'x-large';
export type FxDisplayTypography = 'classic' | 'segmented' | 'modern';
export type FxDisplayTheme = 'silver' | 'darkblue';
export type FxDisplayAlign = 'left' | 'center' | 'right' | 'space-between' | 'space-around';

export namespace DisplayTypography {
    export function load(typography: FxDisplayTypography): void {
        switch (typography) {
            case 'modern':
                Font.load(Fonts.Oxanium);
                break;
            case 'segmented':
                Font.load(DisplayFonts.Segmented);
                break;
            case 'classic':
                break;
        }
    }
}

export namespace DisplayAttributeConverters {
    export const typography = {
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

    export const contentLayout = {
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

    export const align = {
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
}

export namespace DisplaySize {
    export const tokens = [
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large',
    ] as const;

    export type Token = (typeof tokens)[number];
    export type Value = Token | number | (string & {});

    const tokenSet = new Set<string>(tokens);

    function normalizeCustomLength(size: string | number): string | null {
        const raw = typeof size === 'string' ? size.trim() : size;
        return (
            typeof raw === 'string' && tokenSet.has(raw)
                ? null
                : Css.normalizeLength(size) || null
        );
    }

    export function toCssVars(size: string | number): string {
        const valueSize = normalizeCustomLength(size);
        return valueSize
            ?
                `
                    --fx-display-value-size: ${valueSize};
                    --fx-display-label-size: calc(${valueSize} * 0.22);
                    --fx-display-region-gap: calc(${valueSize} * 0.08);
                    --fx-display-region-padding: calc(${valueSize} * 0.08);
                    --fx-display-shell-pad: calc(${valueSize} * 0.12);
                    --fx-display-shell-radius: calc(${valueSize} * 0.16);
                `
            :
                '';
    }
}

export type FxDisplaySize = DisplaySize.Value;

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
