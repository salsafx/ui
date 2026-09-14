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
    export const of = (value: VariantAttribute | null | undefined): Variant | undefined => {
        switch (typeof value) {
            case 'number':
                return typeof Variant[value] === 'string' ? value : undefined;
            case 'string':
                return Variant.tryParse(value);
            default:
                return undefined;
        }
    };

    export const toString = (variant: VariantAttribute) => {
        const resolved = Variant.of(variant);
        if (typeof resolved === 'number') {
            return Variant[resolved].toLowerCase();
        } else {
            throw new Error('Unknown variant');
        }
    };

    export const toColors = (variant: VariantAttribute) => {
        const resolved = Variant.of(variant);
        if (typeof resolved === 'number') {
            return VariantPalette[resolved];
        } else {
            throw new Error('Unknown variant');
        }
    };

    export const toIcon = (variant: VariantAttribute) => {
        const resolved = Variant.of(variant);
        if (typeof resolved === 'number') {
            return VariantIcons[resolved];
        } else {
            throw new Error('Unknown variant');
        }
    };

    export function tryParse(value: string | null | undefined): Variant | undefined {
        switch (value?.trim().toLowerCase()) {
            case 'primary':
                return Variant.Primary;
            case 'secondary':
                return Variant.Secondary;
            case 'success':
                return Variant.Success;
            case 'danger':
                return Variant.Danger;
            case 'warning':
                return Variant.Warning;
            case 'info':
                return Variant.Info;
            case 'light':
                return Variant.Light;
            case 'dark':
                return Variant.Dark;
            default:
                return undefined;
        }
    }

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
            const resolved = Variant.of(variant);
            switch (typeof resolved) {
                case 'number': return Variant.toColors(resolved)[swatch];
                default: return fallback;
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

export namespace VariantAttributeConverters {
    export const optional = {
        fromAttribute: (value: string | null): Variant | undefined =>
            Variant.tryParse(value),
        toAttribute: (value: VariantAttribute | undefined): string | null => {
            const resolved = Variant.of(value);
            return typeof resolved === 'number' ? Variant.toString(resolved) : null;
        },
    };

    export const required = {
        fromAttribute: (value: string | null): Variant =>
            Variant.tryParse(value) ?? Variant.Info,
        toAttribute: (value: VariantAttribute): string =>
            Variant.toString(value),
    };
}