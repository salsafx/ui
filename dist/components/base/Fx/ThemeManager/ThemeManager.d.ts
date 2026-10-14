import type { FxSetupSettings, IConfigurator, FxSetupConfig } from '../FxSetup';
export type FxThemeMode = 'silver' | 'darkgreen' | 'iron' | 'dark' | 'darkblue' | 'darkergreen' | 'snow';
export declare const reflectOptionalTheme: {
    fromAttribute: (value: string | null) => FxThemeMode | undefined;
    toAttribute: (value: FxThemeMode | undefined) => string | null;
};
export type FxThemeComponentKey = 'FxDisplay' | 'FxSwitch' | 'FxLinearTrackElement' | 'FxRadialGauge' | 'FxPotentiometer' | 'FxCard' | 'FxGroupBox' | 'FxTabs';
export type FxSurfaceThemeMode = FxThemeMode;
export type FxThemeComponents = {
    FxDisplay?: 'silver' | 'darkblue';
    FxSwitch?: 'snow' | 'silver';
    FxLinearTrackElement?: 'silver' | 'dark';
    FxRadialGauge?: 'silver' | 'dark';
    FxPotentiometer?: 'silver' | 'dark';
    FxCard?: FxSurfaceThemeMode;
    FxGroupBox?: FxSurfaceThemeMode;
    FxTabs?: 'darkgreen' | 'iron' | 'darkergreen';
};
export type FxThemeGradients = {
    start: string;
    middle: string;
    end: string;
};
export type FxThemeSettings = {
    components?: FxThemeComponents;
    gradients?: Partial<FxThemeGradients>;
};
export type FxThemeConfig = {
    components: Required<FxThemeComponents>;
    gradients: FxThemeGradients;
};
export declare const defaultComponents: Required<FxThemeComponents>;
export declare const defaultGradients: FxThemeGradients;
export declare const Themes: {
    readonly Default: {
        readonly components: {
            readonly FxDisplay: 'silver' | 'darkblue';
            readonly FxSwitch: 'snow' | 'silver';
            readonly FxLinearTrackElement: 'silver' | 'dark';
            readonly FxRadialGauge: 'silver' | 'dark';
            readonly FxPotentiometer: 'silver' | 'dark';
            readonly FxCard: FxSurfaceThemeMode;
            readonly FxGroupBox: FxSurfaceThemeMode;
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
};
export type FxThemePreset = keyof typeof Themes;
export type ThemeTokens = Record<string, string>;
declare module '../FxSetup' {
    interface FxSetupSettings {
        theme?: FxThemeSettings | FxThemePreset;
    }
    interface FxSetupConfig {
        theme: FxThemeConfig;
    }
}
export declare class ThemeManager implements IConfigurator {
    defaultConfig(): Partial<FxSetupConfig>;
    private resolveTheme;
    createConfig(settings: FxSetupSettings, currentConfig: FxSetupConfig): Partial<FxSetupConfig>;
    private applyTokens;
    private applyGradients;
    applyConfig(config: FxSetupConfig): void;
}
