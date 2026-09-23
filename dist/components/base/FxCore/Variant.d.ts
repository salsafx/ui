export declare enum Variant {
    Primary = 0,
    Secondary = 1,
    Success = 2,
    Danger = 3,
    Warning = 4,
    Info = 5,
    Light = 6,
    Dark = 7
}
export type VariantAttribute = Variant | string;
export type VariantColors = {
    background: string;
    foreground: string;
    border: string;
};
export declare const VariantIcons: Record<Variant, string>;
export declare const VariantPalette: Record<Variant, VariantColors>;
export declare namespace Variant {
    const of: (value: VariantAttribute | null | undefined) => Variant | undefined;
    const toString: (variant: VariantAttribute) => string;
    const toColors: (variant: VariantAttribute) => VariantColors;
    const toIcon: (variant: VariantAttribute) => string;
    function tryParse(value: string | null | undefined): Variant | undefined;
    const resolvedColor: (custom: string, variant: VariantAttribute | undefined, fallback: string, swatch?: keyof VariantColors) => string;
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
