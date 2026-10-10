export type nil = null | undefined;

export const isNil = (value: unknown): value is nil =>
    typeof value === 'undefined' || value === null;

export const Guid = (() => {
    const newS4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    const newGuid = () => `${newS4()}${newS4()}-${newS4()}-${newS4()}-${newS4()}-${newS4()}${newS4()}${newS4()}`.toLowerCase();

    return Object.freeze({
        newGuid: (
            typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
                ? crypto.randomUUID.bind(crypto)
                : newGuid
        ),
        isGuid: (value: string): boolean =>
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value),
    });
})();

export function roundToDecimals(value: number, decimals: number): number {
    const multiplier = Math.pow(10, decimals);
    return Math.round(value * multiplier) / multiplier;
}

export function createWorker(workerFunction: () => void): Worker {
    const source = `(${workerFunction.toString()})();`;
    const blob = new Blob([source], { type: "application/javascript" });
    return new Worker(URL.createObjectURL(blob));
}

export const pipe = <T>(value: T, ...fns: Array<(x: any) => any>) =>
    fns.reduce((acc, fn) => fn(acc), value as any) as T;

export const compose = <T>(...fns: Array<(x: T) => T>) =>
    (value: T): T => fns.reduce((acc, fn) => fn(acc), value);

export namespace Text {
    export function replaceMap(source: string, replacements: Record<string, string>): string {
        return Object.entries(replacements).reduce(
            (filled, [from, to]) => filled.replaceAll(from, to),
            source,
        );
    }

    export function escapeHtml(value: string): string {
        return replaceMap(value, {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
        });
    }

    export function toSlug(value: string): string {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    export function hashOrSlug(value: string): string {
        const slug = toSlug(value);
        let hash = 5381;
        for (let i = 0; i < value.length; i++) {
            hash = ((hash << 5) + hash) ^ value.charCodeAt(i);
        }
        const hashPart = (hash >>> 0).toString(36);
        return slug.length > 0
            ? `${slug.slice(0, 48)}-${hashPart}`
            : hashPart;
    }

    export class Template {
        constructor(private readonly source: string) {}

        render(vars: Record<string, string>): string {
            return replaceMap(
                this.source,
                Object.fromEntries(
                    Object.entries(vars).map(([key, value]) => [`{$${key}}`, value]),
                ),
            );
        }
    }

    export class HtmlTemplate extends Template {
        override render(vars: Record<string, string>): string {
            return super.render(this.escaped(vars));
        }

        private escaped(vars: Record<string, string>): Record<string, string> {
            return Object.fromEntries(
                Object.entries(vars).map(([key, value]) => [key, escapeHtml(value)]),
            );
        }
    }
}