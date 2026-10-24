export declare enum Variant {
    Primary = 0,
    Secondary = 1,
    Success = 2,
    Danger = 3,
    Warning = 4,
    Info = 5,
    Light = 6,
    Dark = 7,
    Dominant = 8,
    Accent = 9
}
export type VariantAttribute = Variant | string;
export type VariantColors = {
    background: string;
    foreground: string;
    border: string;
};
export type VariantGradient = {
    start: string;
    middle: string;
    end: string;
};
export declare const VariantIcons: Record<Variant, string>;
export declare const VariantPalette: Record<Variant, VariantColors>;
export declare const VariantGradients: Record<Variant, VariantGradient>;
export declare namespace Variant {
    const of: (value: VariantAttribute | null | undefined) => Variant | undefined;
    const toString: (variant: VariantAttribute) => string;
    const toColors: (variant: VariantAttribute) => VariantColors;
    const toGradient: (variant: VariantAttribute) => VariantGradient;
    const toIcon: (variant: VariantAttribute) => string;
    function tryParse(value: string | null | undefined): Variant | undefined;
    const resolvedColor: (custom: string, variant: VariantAttribute | undefined, fallback: string, swatch?: keyof VariantColors) => string;
    const applyHostGradient: (host: HTMLElement, variant: VariantAttribute | undefined) => void;
    const parse: (value: string) => Variant;
}
export declare namespace VariantAttributeConverters {
    const optional: {
        fromAttribute: (value: string | null) => Variant | undefined;
        toAttribute: (value: VariantAttribute | undefined) => string | null;
    };
    const required: {
        fromAttribute: (value: string | null) => Variant;
        toAttribute: (value: VariantAttribute) => string;
    };
}
