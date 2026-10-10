export declare enum SwatchColor {
    Lime = "#84cc16",
    Orange = "#f97316",
    Navy = "#1e3a8a",
    Imperial = "#66023C",
    Yellow = "#eab308",
    Turquoise = "#00D9B5",
    Fuchsia = "#d946ef",
    Red = "#FF0000",
    Skyblue = "#87CEEB",
    Darkgreen = "#15803d"
}
export declare const SwatchColors: string[];
export declare const SwatchColorEntries: {
    key: string;
    color: string;
}[];
export declare const SwatchColorMap: Map<string, string>;
export declare function generateSwatchColor(afterPaletteIndex: number): string;
export declare function swatchColorAt(index: number): string;
export declare function resolveSwatchColor(color: string | null | undefined, index?: number): string;
