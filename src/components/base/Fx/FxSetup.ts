export interface FxSetupSettings {}
export interface FxSetupConfig {}

export interface IConfigurator {
    defaultConfig(): Partial<FxSetupConfig>;
    createConfig(settings: FxSetupSettings, currentConfig?: FxSetupConfig): Partial<FxSetupConfig>;
    applyConfig(config: FxSetupConfig): void;
}

export class FxSetup {
    private readonly configuratorList: IConfigurator[] = [];
    private defaultConfig: Readonly<FxSetupConfig> = Object.freeze({} as FxSetupConfig);
    private config: FxSetupConfig = {} as FxSetupConfig;

    constructor(configurators: ReadonlyArray<IConfigurator> = []) {
        for (const configurator of configurators) {
            this.use(configurator);
        }
    }

    get defaults(): Readonly<FxSetupConfig> {
        return this.defaultConfig;
    }

    get configuration(): Readonly<FxSetupConfig> {
        return this.config;
    }

    get configurators(): ReadonlyArray<IConfigurator> {
        return this.configuratorList;
    }

    use(configurator: IConfigurator): void {
        if (!this.configuratorList.includes(configurator)) {
            this.configuratorList.push(configurator);

            const partialConfig = configurator.defaultConfig();
            this.config = { ...this.config, ...partialConfig };
            this.defaultConfig = Object.freeze({ ...this.defaultConfig, ...partialConfig });
            configurator.applyConfig(this.config);
        }
    }

    configure(settings: Partial<FxSetupSettings> = {}): void {
        for (const configurator of this.configurators) {
            const partialConfig = configurator.createConfig(settings, this.configuration);
            if (Object.keys(partialConfig).length > 0) {
                this.config = { ...this.config, ...partialConfig };
            }
            configurator.applyConfig(this.config);
        }
    }

    apply(): void {
        for (const configurator of this.configurators) {
            configurator.applyConfig(this.config);
        }
    }
}
