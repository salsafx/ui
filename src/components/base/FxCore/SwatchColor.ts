export enum SwatchColor {
    Lime = '#84cc16',
    Orange = '#f97316',
    Navy = '#1e3a8a',
    Imperial = '#66023C',
    Yellow = '#eab308',
    Turquoise = '#00D9B5',
    Fuchsia = '#d946ef',
    Red = '#FF0000',
    Skyblue = '#87CEEB',
    Darkgreen = '#15803d',
}

export const SwatchColors = (
    Object.keys(SwatchColor) as Array<keyof typeof SwatchColor>
).map((key) => SwatchColor[key] as string);

export const SwatchColorEntries = (
    Object.keys(SwatchColor) as Array<keyof typeof SwatchColor>
).map((key) => ({
    key: key as string,
    color: SwatchColor[key] as string,
}));

export const SwatchColorMap = new Map(
    SwatchColorEntries.flatMap((entry) => [
        [entry.key, entry.color],
        [entry.key.toLowerCase(), entry.color],
    ]),
);

function hslToHex(hue: number, saturationPercent: number, lightnessPercent: number): string {
    const saturation = saturationPercent / 100;
    const lightness = lightnessPercent / 100;
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const intermediate = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
    const match = lightness - chroma / 2;
    let red = 0, green = 0, blue = 0;

    if (hue < 60) {
        red = chroma;
        green = intermediate;
    } else if (hue < 120) {
        red = intermediate;
        green = chroma;
    } else if (hue < 180) {
        green = chroma;
        blue = intermediate;
    } else if (hue < 240) {
        green = intermediate;
        blue = chroma;
    } else if (hue < 300) {
        red = intermediate;
        blue = chroma;
    } else {
        red = chroma;
        blue = intermediate;
    }

    const toHex = (channel: number) =>
        Math.round((channel + match) * 255)
            .toString(16)
            .padStart(2, '0');

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

export function generateSwatchColor(afterPaletteIndex: number): string {
    const hue = (afterPaletteIndex * 137.508) % 360;
    const saturation = 68 + (afterPaletteIndex % 3) * 8;
    const lightness = 46 + (afterPaletteIndex % 4) * 5;
    return hslToHex(hue, saturation, lightness);
}

export function swatchColorAt(index: number): string {
    return SwatchColors[index] ?? generateSwatchColor(Math.max(index, 0) - SwatchColors.length);
}

export function resolveSwatchColor(color: string | null | undefined, index = 0): string {
    const raw = (color ?? '').trim();
    return (
        raw
            ? (SwatchColorMap.get(raw) ?? SwatchColorMap.get(raw.toLowerCase()) ?? raw)
            : swatchColorAt(index)
    );
}
