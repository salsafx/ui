import { isNil } from '../../FxCore/Core';
import { componentLooks } from './ComponentLooks';
import type { FxSetupSettings, IConfigurator, FxSetupConfig } from '../FxSetup';

export type FxThemeMode =
    | 'silver'
    | 'darkgreen'
    | 'iron'
    | 'dark'
    | 'darkblue'
    | 'darkergreen'
    | 'snow';

const themeModes: ReadonlyArray<FxThemeMode> = [
    'silver',
    'darkgreen',
    'iron',
    'dark',
    'darkblue',
    'darkergreen',
    'snow',
];

export const reflectOptionalTheme = {
    fromAttribute: (value: string | null): FxThemeMode | undefined =>
        themeModes.includes(value as FxThemeMode) ? (value as FxThemeMode) : undefined,
    toAttribute: (value: FxThemeMode | undefined): string | null =>
        value ?? null,
};

export type FxThemeComponentKey =
    | 'FxDisplay'
    | 'FxSwitch'
    | 'FxLinearTrackElement'
    | 'FxRadialGauge'
    | 'FxPotentiometer'
    | 'FxCard'
    | 'FxGroupBox'
    | 'FxTabs';

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

export const defaultComponents: Required<FxThemeComponents> = {
    FxDisplay: 'darkblue',
    FxSwitch: 'silver',
    FxLinearTrackElement: 'dark',
    FxRadialGauge: 'silver',
    FxPotentiometer: 'silver',
    FxCard: 'iron',
    FxGroupBox: 'iron',
    FxTabs: 'darkergreen',
};

export const defaultGradients: FxThemeGradients = {
    start: '#06b6d4',
    middle: '#6366f1',
    end: '#a855f7',
};

export const Themes = {
    Default: {
        components: { ...defaultComponents },
        gradients: { ...defaultGradients },
    },
    SilverBlue: {
        components: {
            FxDisplay: 'darkblue',
            FxSwitch: 'silver',
            FxLinearTrackElement: 'silver',
            FxRadialGauge: 'silver',
            FxPotentiometer: 'silver',
            FxCard: 'iron',
            FxGroupBox: 'iron',
            FxTabs: 'darkergreen',
        },
        gradients: { ...defaultGradients },
    },
    DarkGreen: {
        components: {
            FxDisplay: 'darkblue',
            FxSwitch: 'silver',
            FxLinearTrackElement: 'dark',
            FxRadialGauge: 'dark',
            FxPotentiometer: 'dark',
            FxCard: 'darkgreen',
            FxGroupBox: 'darkgreen',
            FxTabs: 'darkergreen',
        },
        gradients: {
            start: '#fde68a',
            middle: '#f59e0b',
            end: '#ea580c',
        },
    },
} as const satisfies Record<string, FxThemeSettings & { components: Required<FxThemeComponents> }>;

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

export class ThemeManager implements IConfigurator {
    defaultConfig(): Partial<FxSetupConfig> {
        return {
            theme: {
                components: { ...defaultComponents },
                gradients: { ...defaultGradients },
            },
        };
    }

    private resolveTheme(theme: FxThemeSettings | FxThemePreset): FxThemeSettings {
        return typeof theme === 'string' ? Themes[theme] : theme;
    }

    createConfig(settings: FxSetupSettings, currentConfig: FxSetupConfig): Partial<FxSetupConfig> {
        if (isNil(settings.theme)) {
            return {};
        } else {
            const resolved = this.resolveTheme(settings.theme);
            return {
                theme: {
                    components: {
                        ...(currentConfig.theme?.components ?? defaultComponents),
                        ...resolved.components,
                    },
                    gradients: {
                        ...(currentConfig.theme?.gradients ?? defaultGradients),
                        ...resolved.gradients,
                    },
                },
            };
        }
    }

    private applyTokens(tokens: ThemeTokens): void {
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            for (const [name, value] of Object.entries(tokens)) {
                root.style.setProperty(name, value);
            }
        }
    }

    private applyGradients(gradients: FxThemeGradients): void {
        this.applyTokens({
            '--fx-theme-gradient-start': gradients.start,
            '--fx-theme-gradient-middle': gradients.middle,
            '--fx-theme-gradient-end': gradients.end,
        });
    }

    applyConfig(config: FxSetupConfig): void {
        this.applyGradients(config.theme.gradients);
        for (const key of Object.keys(componentLooks) as FxThemeComponentKey[]) {
            const mode = config.theme.components[key];
            const looks = componentLooks[key] as Partial<Record<FxThemeMode, ThemeTokens>>;
            const tokens = looks[mode] ?? looks[defaultComponents[key]];
            if (!isNil(tokens)) {
                this.applyTokens(tokens);
            }
        }
    }
}
