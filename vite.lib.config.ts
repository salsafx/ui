import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// Avoid Vite `build.lib` here: it always base64-inlines assets (fonts/icons).
// ES entry + assetsInlineLimit:0 emits separate CSS/woff2 files for the npm package.
export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        assetsInlineLimit: 0,
        cssCodeSplit: true,
        rollupOptions: {
            input: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
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
