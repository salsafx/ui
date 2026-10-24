export type FxDisplayContentLayout = 'row' | 'labeled' | 'column';
export type FxDisplayGlow = 'none' | 'small' | 'medium' | 'large' | 'x-large';
export type FxDisplayTypography = 'classic' | 'segmented' | 'modern';
export type FxDisplayTheme = 'silver' | 'darkblue';
export type FxDisplayAlign = 'left' | 'center' | 'right' | 'space-between' | 'space-around';
export declare namespace DisplayTypography {
    function load(typography: FxDisplayTypography): void;
}
export declare namespace DisplayAttributeConverters {
    const typography: {
        fromAttribute: (value: string | null) => FxDisplayTypography;
        toAttribute: (value: FxDisplayTypography) => string | null;
    };
    const contentLayout: {
        fromAttribute: (value: string | null) => FxDisplayContentLayout;
        toAttribute: (value: FxDisplayContentLayout) => string | null;
    };
    const align: {
        fromAttribute: (value: string | null) => FxDisplayAlign;
        toAttribute: (value: FxDisplayAlign) => string | null;
    };
}
export declare namespace DisplaySize {
    const tokens: readonly ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
    type Token = (typeof tokens)[number];
    type Value = Token | number | (string & {});
    function toCssVars(size: string | number): string;
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
