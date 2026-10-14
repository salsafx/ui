export function withAssetUrls(css: string, assets: Record<string, string>): string {
    return Object.entries(assets).reduce(
        (next, [from, to]) => next.replaceAll(from, to),
        css,
    );
}
