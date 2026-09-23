export interface FxSetupSettings {
}
export interface FxSetupConfig {
}
export interface IConfigurator {
    defaultConfig(): Partial<FxSetupConfig>;
    createConfig(settings: FxSetupSettings, currentConfig?: FxSetupConfig): Partial<FxSetupConfig>;
    applyConfig(config: FxSetupConfig): void;
}
export declare class FxSetup {
    private readonly configuratorList;
    private defaultConfig;
    private config;
    constructor(configurators?: ReadonlyArray<IConfigurator>);
    get defaults(): Readonly<FxSetupConfig>;
    get configuration(): Readonly<FxSetupConfig>;
    get configurators(): ReadonlyArray<IConfigurator>;
    use(configurator: IConfigurator): void;
    configure(settings?: Partial<FxSetupSettings>): void;
    apply(): void;
}
