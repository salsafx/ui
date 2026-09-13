import { FxSetup, type FxSetupSettings, type IConfigurator } from './FxSetup';
import { FontManager } from './FontManager';
import { IconManager, IconPacks } from './IconManager';
import { ThemeManager, Themes } from './ThemeManager/ThemeManager';
import { Fonts, DisplayFonts } from '../FxCore';

export type {
    FxSetupSettings,
    FxSetupConfig,
} from './FxSetup';
export { FxSetup, type IConfigurator } from './FxSetup';
export { FontManager, defaultUiFont, defaultDisplayFont, type UIFont } from './FontManager';
export {
    IconManager,
    IconPacks,
    type IconPackInfo,
} from './IconManager';
export {
    ThemeManager,
    Themes,
    reflectOptionalTheme,
    type FxThemeMode,
    type FxSurfaceThemeMode,
    type FxThemeComponentKey,
    type FxThemeComponents,
    type FxThemeSettings,
    type FxThemeConfig,
    type FxThemeGradients,
    type FxThemePreset,
    defaultGradients,
} from './ThemeManager/ThemeManager';

const fxSetup = new FxSetup();

export const Fx = Object.freeze({
    use: (configurator: IConfigurator) => {
        fxSetup.use(configurator);
        return Fx;
    },
    configure: (settings: Partial<FxSetupSettings> = {}) => {
        fxSetup.configure(settings);
        return Fx;
    },
    apply: () => {
        fxSetup.apply();
        return Fx;
    },
    get configuration() {
        return fxSetup.configuration;
    },
    get defaults() {
        return fxSetup.defaults;
    },
    Fonts: Object.freeze(Fonts),
    DisplayFonts: Object.freeze(DisplayFonts),
    Themes: Object.freeze(Themes),
    IconPacks: Object.freeze(IconPacks),
});

Fx.use(new FontManager())
    .use(new IconManager())
    .use(new ThemeManager());

if (typeof document !== 'undefined') {
    Fx.apply();
}
