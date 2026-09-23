import type { FxThemeComponentKey, FxThemeMode, ThemeTokens } from "./ThemeManager";

export const componentLooks = {
    FxDisplay: {
        silver: {
            '--fx-theme-display-shell-background': '#1e293b',
            '--fx-theme-display-shell-border': '#334155',
        },
        darkblue: {
            '--fx-theme-display-shell-background': '#0b111f',
            '--fx-theme-display-shell-border': '#334155',
        },
    },
    FxSwitch: {
        snow: {
            '--fx-theme-switch-track-color': '#ffffff',
            '--fx-theme-switch-border-color': '#e5e7eb',
            '--fx-theme-switch-text-inactive': '#374151',
            '--fx-theme-switch-text-hover': '#111827',
            '--fx-theme-switch-divider-color': '#e5e7eb',
        },
        silver: {
            '--fx-theme-switch-track-color': '#1e293b',
            '--fx-theme-switch-border-color': '#334155',
            '--fx-theme-switch-text-inactive': '#94a3b8',
            '--fx-theme-switch-text-hover': '#f8fafc',
            '--fx-theme-switch-divider-color': '#475569',
        },
    },
    FxLinearTrackElement: {
        silver: {
            '--fx-theme-linear-shell-background': '#1e293b',
        },
        dark: {
            '--fx-theme-linear-shell-background': '#080b10',
        },
    },
    FxRadialGauge: {
        silver: {
            '--fx-theme-radial-gauge-shell-fill': '#1e293b',
        },
        dark: {
            '--fx-theme-radial-gauge-shell-fill': '#080b10',
        },
    },
    FxPotentiometer: {
        silver: {
            '--fx-theme-potentiometer-bezel-fill': '#1e293b',
            '--fx-theme-potentiometer-bezel-stroke': '#334155',
            '--fx-theme-potentiometer-knob': '#1e293b',
            '--fx-theme-potentiometer-knob-ring': '#334155',
        },
        dark: {
            '--fx-theme-potentiometer-bezel-fill': '#080b10',
            '--fx-theme-potentiometer-bezel-stroke': '#12161e',
            '--fx-theme-potentiometer-knob': '#080b10',
            '--fx-theme-potentiometer-knob-ring': '#1f2937',
        },
    },
    FxCard: {
        silver: {
            '--fx-theme-card-background': '#1e293b',
        },
        darkgreen: {
            '--fx-theme-card-background': '#131920',
        },
        iron: {
            '--fx-theme-card-background': '#111827',
        },
        dark: {
            '--fx-theme-card-background': '#080b10',
        },
        darkblue: {
            '--fx-theme-card-background': '#0b111f',
        },
        darkergreen: {
            '--fx-theme-card-background': '#0c0e12',
        },
        snow: {
            '--fx-theme-card-background': '#ffffff',
        },
    },
    FxGroupBox: {
        silver: {
            '--fx-theme-group-box-background': '#1e293b',
            '--fx-theme-group-box-border': '1px solid #334155',
        },
        darkgreen: {
            '--fx-theme-group-box-background': '#131920',
            '--fx-theme-group-box-border': '1px solid #1f2937',
        },
        iron: {
            '--fx-theme-group-box-background': '#111827',
            '--fx-theme-group-box-border': '1px solid #1f2937',
        },
        dark: {
            '--fx-theme-group-box-background': '#080b10',
            '--fx-theme-group-box-border': '1px solid #12161e',
        },
        darkblue: {
            '--fx-theme-group-box-background': '#0b111f',
            '--fx-theme-group-box-border': '1px solid #334155',
        },
        darkergreen: {
            '--fx-theme-group-box-background': '#0c0e12',
            '--fx-theme-group-box-border': '1px solid #18222e',
        },
        snow: {
            '--fx-theme-group-box-background': '#ffffff',
            '--fx-theme-group-box-border': '1px solid #e5e7eb',
        },
    },
    FxTabs: {
        darkgreen: {
            '--fx-tabs-background': '#131920',
            '--fx-tabs-nav-background': '#0c0e12',
            '--fx-tabs-nav-border': '#2a3a4a',
        },
        iron: {
            '--fx-tabs-background': '#111827',
            '--fx-tabs-nav-background': '#0c0e12',
            '--fx-tabs-nav-border': '#1f2937',
        },
        darkergreen: {
            '--fx-tabs-background': '#0c0e12',
            '--fx-tabs-nav-background': '#080b10',
            '--fx-tabs-nav-border': '#2a3a4a',
        },
    },
} as const satisfies Record<FxThemeComponentKey, Partial<Record<FxThemeMode, ThemeTokens>>>;