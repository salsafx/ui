import faCss from '@fortawesome/fontawesome-free/css/all.min.css?raw';
import faBrands400 from '@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2?url';
import faRegular400 from '@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2?url';
import faSolid900 from '@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2?url';
import faV4compat from '@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.woff2?url';
import { withAssetUrls } from '../withAssetUrls';

export const fontAwesomeStylesheetUrl = 'salsafx:fontawesome';

export const fontAwesomeCss = withAssetUrls(faCss, {
    '../webfonts/fa-brands-400.woff2': faBrands400,
    '../webfonts/fa-regular-400.woff2': faRegular400,
    '../webfonts/fa-solid-900.woff2': faSolid900,
    '../webfonts/fa-v4compatibility.woff2': faV4compat,
});
