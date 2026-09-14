import { type FxSetupSettings, type IConfigurator } from './FxSetup';
export type { FxSetupSettings, FxSetupConfig, } from './FxSetup';
export { FxSetup, type IConfigurator } from './FxSetup';
export { FontManager, defaultUiFont, defaultDisplayFont, type UIFont } from './FontManager';
export { IconManager, IconPacks, type IconPackInfo, } from './IconManager';
export { ThemeManager, Themes, reflectOptionalTheme, type FxThemeMode, type FxSurfaceThemeMode, type FxThemeComponentKey, type FxThemeComponents, type FxThemeSettings, type FxThemeConfig, type FxThemeGradients, type FxThemePreset, defaultGradients, } from './ThemeManager/ThemeManager';
export declare const Fx: Readonly<{
    use: (configurator: IConfigurator) => Readonly</*elided*/ any>;
    configure: (settings?: Partial<FxSetupSettings>) => Readonly</*elided*/ any>;
    apply: () => Readonly</*elided*/ any>;
    readonly configuration: Readonly<import("./FxSetup").FxSetupConfig>;
    readonly defaults: Readonly<import("./FxSetup").FxSetupConfig>;
    Fonts: Readonly<{
        DsDigital: {
            family: string;
            href: string;
        };
        ChakraPetch: {
            family: string;
            href: string;
        };
        Oxanium: {
            family: string;
            href: string;
        };
        Manrope: {
            family: string;
            href: string;
        };
        Inter: {
            family: string;
            href: string;
        };
        NotoSans: {
            family: string;
            href: string;
        };
    }>;
    DisplayFonts: Readonly<{
        Classic: "uiFont";
        Segmented: {
            family: string;
            href: string;
        };
        Modern: {
            family: string;
            href: string;
        };
    }>;
    Themes: Readonly<{
        readonly Default: {
            readonly components: {
                readonly FxDisplay: 'silver' | 'darkblue';
                readonly FxSwitch: 'snow' | 'silver';
                readonly FxLinearTrackElement: 'silver' | 'dark';
                readonly FxRadialGauge: 'silver' | 'dark';
                readonly FxPotentiometer: 'silver' | 'dark';
                readonly FxCard: import(".").FxSurfaceThemeMode;
                readonly FxGroupBox: import(".").FxSurfaceThemeMode;
                readonly FxTabs: 'darkgreen' | 'iron' | 'darkergreen';
            };
            readonly gradients: {
                readonly start: string;
                readonly middle: string;
                readonly end: string;
            };
        };
        readonly SilverBlue: {
            readonly components: {
                readonly FxDisplay: 'darkblue';
                readonly FxSwitch: 'silver';
                readonly FxLinearTrackElement: 'silver';
                readonly FxRadialGauge: 'silver';
                readonly FxPotentiometer: 'silver';
                readonly FxCard: 'iron';
                readonly FxGroupBox: 'iron';
                readonly FxTabs: 'darkergreen';
            };
            readonly gradients: {
                readonly start: string;
                readonly middle: string;
                readonly end: string;
            };
        };
        readonly DarkGreen: {
            readonly components: {
                readonly FxDisplay: 'darkblue';
                readonly FxSwitch: 'silver';
                readonly FxLinearTrackElement: 'dark';
                readonly FxRadialGauge: 'dark';
                readonly FxPotentiometer: 'dark';
                readonly FxCard: 'darkgreen';
                readonly FxGroupBox: 'darkgreen';
                readonly FxTabs: 'darkergreen';
            };
            readonly gradients: {
                readonly start: '#fde68a';
                readonly middle: '#f59e0b';
                readonly end: '#ea580c';
            };
        };
    }>;
    IconPacks: Readonly<{
        readonly FontAwesome: "salsafx:fontawesome";
        readonly MaterialDesign: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css';
        readonly MaterialSymbols: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
        readonly Lucide: 'https://cdn.jsdelivr.net/npm/lucide-static@0.468.0/font/lucide.css';
        readonly Phosphor: 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
        readonly Tabler: 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css';
    }>;
}>;
