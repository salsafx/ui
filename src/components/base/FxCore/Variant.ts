export enum Variant {
    Primary,
    Secondary,
    Success,
    Danger,
    Warning,
    Info,
    Light,
    Dark,
}

export type VariantAttribute = Variant | string;

export type VariantColors = {
    background: string;
    foreground: string;
    border: string;
};

export const VariantIcons: Record<Variant, string> = {
    [Variant.Primary]: 'fa-solid fa-flag',
    [Variant.Secondary]: 'fa-solid fa-ellipsis',
    [Variant.Success]: 'fa-solid fa-circle-check',
    [Variant.Danger]: 'fa-solid fa-circle-xmark',
    [Variant.Warning]: 'fa-solid fa-triangle-exclamation',
    [Variant.Info]: 'fa-solid fa-circle-info',
    [Variant.Light]: 'fa-solid fa-sun',
    [Variant.Dark]: 'fa-solid fa-moon',
};

export const VariantPalette: Record<Variant, VariantColors> = {
    [Variant.Primary]: {
        background: '#0c1420',
        foreground: '#93c5fd',
        border: '#3b82f6',
    },
    [Variant.Secondary]: {
        background: '#121418',
        foreground: '#cbd5e1',
        border: '#64748b',
    },
    [Variant.Success]: {
        background: '#0a140e',
        foreground: '#86efac',
        border: '#22c55e',
    },
    [Variant.Danger]: {
        background: '#14090b',
        foreground: '#f0b4b4',
        border: '#ef4444',
    },
    [Variant.Warning]: {
        background: '#141008',
        foreground: '#f0d48a',
        border: '#f59e0b',
    },
    [Variant.Info]: {
        background: '#0a1418',
        foreground: '#7dd3fc',
        border: '#38bdf8',
    },
    [Variant.Light]: {
        background: '#1a1c20',
        foreground: '#e5e7eb',
        border: '#d1d5db',
    },
    [Variant.Dark]: {
        background: '#0a0c10',
        foreground: '#94a3b8',
        border: '#475569',
    },
};

export namespace Variant {
    export const coerce = (value: VariantAttribute | null | undefined): Variant | undefined => {
        if (typeof value === 'number') {
            if (typeof Variant[value] === 'string') {
                return value;
            } else {
                return undefined;
            }
        } else if (typeof value === 'string') {
            return Variant.tryParse(value);
        } else {
            return undefined;
        }
    };

    export const toString = (variant: VariantAttribute) => {
        const resolved = Variant.coerce(variant);
        if (typeof resolved === 'number') {
            return Variant[resolved].toLowerCase();
        } else {
            throw new Error('Unknown variant');
        }
    };

    export const toColors = (variant: VariantAttribute) => {
        const resolved = Variant.coerce(variant);
        if (typeof resolved === 'number') {
            return VariantPalette[resolved];
        } else {
            throw new Error('Unknown variant');
        }
    };

    export const toIcon = (variant: VariantAttribute) => {
        const resolved = Variant.coerce(variant);
        if (typeof resolved === 'number') {
            return VariantIcons[resolved];
        } else {
            throw new Error('Unknown variant');
        }
    };

    export const tryParse = (value: string | null | undefined): Variant | undefined => {
        if (value) {
            const needle = value.trim().toLowerCase();
            if (needle) {
                for (const key of Object.keys(Variant)) {
                    const member = Variant[key as keyof typeof Variant];
                    if (typeof member === 'number' && key.toLowerCase() === needle) {
                        return member;
                    }
                }
            }
        } else {
            return undefined;
        }
    };

    export const reflectOptional = {
        fromAttribute: (value: string | null): Variant | undefined =>
            Variant.tryParse(value),
        toAttribute: (value: VariantAttribute | undefined): string | null => {
            const resolved = Variant.coerce(value);
            if (typeof resolved === 'number') {
                return Variant.toString(resolved);
            } else {
                return null;
            }
        },
    };

    export const resolvedColor = (
        custom: string,
        variant: VariantAttribute | undefined,
        fallback: string,
        swatch: keyof VariantColors = 'border',
    ): string => {
        const trimmed = custom.trim();
        if (trimmed) {
            return trimmed;
        } else {
            const resolved = Variant.coerce(variant);
            if (typeof resolved === 'number') {
                return Variant.toColors(resolved)[swatch];
            } else {
                return fallback;
            }
        }
    };

    export const parse = (value: string) => {
        const parsed = Variant.tryParse(value);
        if (typeof parsed === 'number') {
            return parsed;
        } else {
            throw new Error('Unknown variant');
        }
    };
}