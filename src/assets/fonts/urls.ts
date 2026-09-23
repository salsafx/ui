import chakraPetchCss from './chakra-petch.css?raw';
import interCss from './inter.css?raw';
import manropeCss from './manrope.css?raw';
import notoSansCss from './noto-sans.css?raw';
import oxaniumCss from './oxanium.css?raw';
import chakraPetch300 from '@fontsource/chakra-petch/files/chakra-petch-latin-300-normal.woff2?url';
import chakraPetch400 from '@fontsource/chakra-petch/files/chakra-petch-latin-400-normal.woff2?url';
import chakraPetch500 from '@fontsource/chakra-petch/files/chakra-petch-latin-500-normal.woff2?url';
import chakraPetch600 from '@fontsource/chakra-petch/files/chakra-petch-latin-600-normal.woff2?url';
import chakraPetch700 from '@fontsource/chakra-petch/files/chakra-petch-latin-700-normal.woff2?url';
import inter300 from '@fontsource/inter/files/inter-latin-300-normal.woff2?url';
import inter400 from '@fontsource/inter/files/inter-latin-400-normal.woff2?url';
import inter500 from '@fontsource/inter/files/inter-latin-500-normal.woff2?url';
import inter600 from '@fontsource/inter/files/inter-latin-600-normal.woff2?url';
import inter700 from '@fontsource/inter/files/inter-latin-700-normal.woff2?url';
import inter800 from '@fontsource/inter/files/inter-latin-800-normal.woff2?url';
import inter900 from '@fontsource/inter/files/inter-latin-900-normal.woff2?url';
import manrope300 from '@fontsource/manrope/files/manrope-latin-300-normal.woff2?url';
import manrope400 from '@fontsource/manrope/files/manrope-latin-400-normal.woff2?url';
import manrope500 from '@fontsource/manrope/files/manrope-latin-500-normal.woff2?url';
import manrope600 from '@fontsource/manrope/files/manrope-latin-600-normal.woff2?url';
import manrope700 from '@fontsource/manrope/files/manrope-latin-700-normal.woff2?url';
import manrope800 from '@fontsource/manrope/files/manrope-latin-800-normal.woff2?url';
import notoSans300 from '@fontsource/noto-sans/files/noto-sans-latin-300-normal.woff2?url';
import notoSans400 from '@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff2?url';
import notoSans500 from '@fontsource/noto-sans/files/noto-sans-latin-500-normal.woff2?url';
import notoSans600 from '@fontsource/noto-sans/files/noto-sans-latin-600-normal.woff2?url';
import notoSans700 from '@fontsource/noto-sans/files/noto-sans-latin-700-normal.woff2?url';
import oxanium300 from '@fontsource/oxanium/files/oxanium-latin-300-normal.woff2?url';
import oxanium400 from '@fontsource/oxanium/files/oxanium-latin-400-normal.woff2?url';
import oxanium500 from '@fontsource/oxanium/files/oxanium-latin-500-normal.woff2?url';
import oxanium600 from '@fontsource/oxanium/files/oxanium-latin-600-normal.woff2?url';
import oxanium700 from '@fontsource/oxanium/files/oxanium-latin-700-normal.woff2?url';
import { withAssetUrls } from '../withAssetUrls';

export const bundledFontStylesheets = {
    Manrope: withAssetUrls(manropeCss, {
        '@fontsource/manrope/files/manrope-latin-300-normal.woff2': manrope300,
        '@fontsource/manrope/files/manrope-latin-400-normal.woff2': manrope400,
        '@fontsource/manrope/files/manrope-latin-500-normal.woff2': manrope500,
        '@fontsource/manrope/files/manrope-latin-600-normal.woff2': manrope600,
        '@fontsource/manrope/files/manrope-latin-700-normal.woff2': manrope700,
        '@fontsource/manrope/files/manrope-latin-800-normal.woff2': manrope800,
    }),
    Inter: withAssetUrls(interCss, {
        '@fontsource/inter/files/inter-latin-300-normal.woff2': inter300,
        '@fontsource/inter/files/inter-latin-400-normal.woff2': inter400,
        '@fontsource/inter/files/inter-latin-500-normal.woff2': inter500,
        '@fontsource/inter/files/inter-latin-600-normal.woff2': inter600,
        '@fontsource/inter/files/inter-latin-700-normal.woff2': inter700,
        '@fontsource/inter/files/inter-latin-800-normal.woff2': inter800,
        '@fontsource/inter/files/inter-latin-900-normal.woff2': inter900,
    }),
    NotoSans: withAssetUrls(notoSansCss, {
        '@fontsource/noto-sans/files/noto-sans-latin-300-normal.woff2': notoSans300,
        '@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff2': notoSans400,
        '@fontsource/noto-sans/files/noto-sans-latin-500-normal.woff2': notoSans500,
        '@fontsource/noto-sans/files/noto-sans-latin-600-normal.woff2': notoSans600,
        '@fontsource/noto-sans/files/noto-sans-latin-700-normal.woff2': notoSans700,
    }),
    Oxanium: withAssetUrls(oxaniumCss, {
        '@fontsource/oxanium/files/oxanium-latin-300-normal.woff2': oxanium300,
        '@fontsource/oxanium/files/oxanium-latin-400-normal.woff2': oxanium400,
        '@fontsource/oxanium/files/oxanium-latin-500-normal.woff2': oxanium500,
        '@fontsource/oxanium/files/oxanium-latin-600-normal.woff2': oxanium600,
        '@fontsource/oxanium/files/oxanium-latin-700-normal.woff2': oxanium700,
    }),
    ChakraPetch: withAssetUrls(chakraPetchCss, {
        '@fontsource/chakra-petch/files/chakra-petch-latin-300-normal.woff2': chakraPetch300,
        '@fontsource/chakra-petch/files/chakra-petch-latin-400-normal.woff2': chakraPetch400,
        '@fontsource/chakra-petch/files/chakra-petch-latin-500-normal.woff2': chakraPetch500,
        '@fontsource/chakra-petch/files/chakra-petch-latin-600-normal.woff2': chakraPetch600,
        '@fontsource/chakra-petch/files/chakra-petch-latin-700-normal.woff2': chakraPetch700,
    }),
} as const;
