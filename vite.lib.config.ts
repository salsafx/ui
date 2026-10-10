import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export function createLibConfig(kind: 'oss' | 'pro' = 'oss') {
    const isPro = kind === 'pro';
    return defineConfig({
        base: './',
        build: {
            outDir: isPro ? 'dist-pro' : 'dist',
            emptyOutDir: true,
            assetsInlineLimit: 0,
            cssCodeSplit: true,
            rollupOptions: {
                input: fileURLToPath(new URL(isPro ? './src/index.pro.ts' : './src/index.ts', import.meta.url)),
                external: [
                    'lit',
                    'lit/decorators.js',
                    'lit/directives/class-map.js',
                ],
                output: {
                    format: 'es',
                    entryFileNames: 'index.js',
                    assetFileNames: 'assets/[name]-[hash][extname]',
                },
                preserveEntrySignatures: 'strict',
            },
        },
        experimental: {
            renderBuiltUrl(filename, { hostType }) {
                if (hostType === 'js') {
                    return {
                        runtime: `new URL(${JSON.stringify(`./${filename}`)}, import.meta.url).href`,
                    };
                }
                return { relative: true };
            },
        },
    });
}

export default createLibConfig('oss');
