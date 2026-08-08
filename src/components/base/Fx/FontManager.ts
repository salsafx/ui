import { ensureFont, type FontProps } from '../FxCore/UI';
import { DisplayFonts, Fonts } from '../FxCore/Typography';
import { isNil, type nil } from '../FxCore/Core';
import type { FxSetupSettings, IConfigurator, FxSetupConfig } from './FxSetup';

export const defaultUiFont = Fonts.Manrope;
export const defaultDisplayFont = DisplayFonts.Segmented;

export type UIFont = FontProps | keyof typeof Fonts;

declare module './FxSetup' {
    interface FxSetupSettings {
        uiFont?: UIFont;
        displayFont?: UIFont | "uiFont";
    }
    interface FxSetupConfig {
        uiFont: FontProps;
        displayFont: FontProps;
    }
}

export class FontManager implements IConfigurator {
    defaultConfig(): Partial<FxSetupConfig> {
        return {
            uiFont: defaultUiFont,
            displayFont: defaultDisplayFont,
        };
    }

    private resolveFont(font: UIFont | nil, fallback: FontProps): FontProps {
        return typeof font === 'string'
            ? Fonts[font] ?? fallback
            : font ?? fallback;
    }

    private resolveDisplayFont(
        font: UIFont | 'uiFont' | nil,
        uiFont: FontProps,
    ): FontProps {
        return font === 'uiFont'
            ? uiFont
            : this.resolveFont(font, defaultDisplayFont);
    }

    private applyFontVar(cssVar: string, font: FontProps, fallbackStack: string): void {
        ensureFont(font);
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty(
                cssVar,
                `'${font.family}', ${fallbackStack}`,
            );
        }
    }

    createConfig(settings: FxSetupSettings, currentConfig: FxSetupConfig): Partial<FxSetupConfig> {
        const partialConfig: Partial<FxSetupConfig> = {};

        if (!isNil(settings.uiFont)) {
            partialConfig.uiFont = this.resolveFont(settings.uiFont, defaultUiFont);
        }

        if (!isNil(settings.displayFont)) {
            partialConfig.displayFont = this.resolveDisplayFont(
                settings.displayFont,
                isNil(settings.uiFont)
                    ? currentConfig.uiFont
                    : this.resolveFont(settings.uiFont, defaultUiFont)
            );
        }

        return partialConfig;
    }

    applyConfig(config: FxSetupConfig): void {
        this.applyFontVar('--fx-font-family', config.uiFont, 'system-ui, sans-serif');
        this.applyFontVar('--fx-display-font-family', config.displayFont, 'monospace');
    }
}
