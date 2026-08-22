export namespace Css {
    export const normalizeLength = (value: string | number, fallback = ''): string => {
        if (typeof value === 'number' && Number.isFinite(value)) {
            return `${value}px`;
        } else {
            const raw = String(value).trim();
            if (raw) {
                return /^\d+(\.\d+)?$/.test(raw) ? `${raw}px` : raw;
            } else {
                return fallback;
            }
        }
    };
}
