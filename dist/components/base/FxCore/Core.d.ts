export type nil = null | undefined;
export declare const isNil: (value: unknown) => value is nil;
export declare const Guid: Readonly<{
    newGuid: () => string;
    isGuid: (value: string) => boolean;
}>;
export declare function roundToDecimals(value: number, decimals: number): number;
export declare function createWorker(workerFunction: () => void): Worker;
export declare const pipe: <T>(value: T, ...fns: Array<(x: any) => any>) => T;
export declare const compose: <T>(...fns: Array<(x: T) => T>) => (value: T) => T;
export declare namespace Text {
    function replaceMap(source: string, replacements: Record<string, string>): string;
    function escapeHtml(value: string): string;
    function toSlug(value: string): string;
    function hashOrSlug(value: string): string;
    class Template {
        private readonly source;
        constructor(source: string);
        render(vars: Record<string, string>): string;
    }
    class HtmlTemplate extends Template {
        render(vars: Record<string, string>): string;
        private escaped;
    }
}
