import type { FxSetupSettings, IConfigurator, FxSetupConfig } from './FxSetup';
export type IconPackInfo = {
    id: string;
    href: string;
};
export declare const IconPacks: {
    readonly FontAwesome: "salsafx:fontawesome";
    readonly MaterialDesign: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css';
    readonly MaterialSymbols: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
    readonly Lucide: 'https://cdn.jsdelivr.net/npm/lucide-static@0.468.0/font/lucide.css';
    readonly Phosphor: 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
    readonly Tabler: 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css';
};
declare module './FxSetup' {
    interface FxSetupSettings {
        iconPacks?: ReadonlyArray<string>;
    }
    interface FxSetupConfig {
        iconPacks: ReadonlyArray<IconPackInfo>;
    }
}
export declare class IconManager implements IConfigurator {
    defaultConfig(): Partial<FxSetupConfig>;
    private resolvePack;
    private markAsIconPack;
    private assignIconPack;
    private ensureStylePack;
    private ensureIconPack;
    createConfig(settings: FxSetupSettings): Partial<FxSetupConfig>;
    applyConfig(config: FxSetupConfig): void;
}
