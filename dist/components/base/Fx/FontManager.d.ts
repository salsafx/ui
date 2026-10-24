import { type FontProps } from '../FxCore/UI';
import { Fonts } from '../FxCore/Typography';
import type { FxSetupSettings, IConfigurator, FxSetupConfig } from './FxSetup';
export declare const defaultUiFont: {
    family: string;
    href: string;
};
export declare const defaultDisplayFont: {
    family: string;
    href: string;
};
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
export declare class FontManager implements IConfigurator {
    defaultConfig(): Partial<FxSetupConfig>;
    private resolveFont;
    private resolveDisplayFont;
    private applyFontVar;
    createConfig(settings: FxSetupSettings, currentConfig: FxSetupConfig): Partial<FxSetupConfig>;
    applyConfig(config: FxSetupConfig): void;
}
