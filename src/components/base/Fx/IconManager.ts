import { hashOrSlug, isNil, pipe } from '../FxCore/Core';
import type { FxSetupSettings, IConfigurator, FxSetupConfig } from './FxSetup';

export type IconPackInfo = {
    id: string;
    href: string;
};

export const IconPacks = {
    FontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
    MaterialDesign: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css',
    MaterialSymbols: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0',
    Lucide: 'https://cdn.jsdelivr.net/npm/lucide-static@0.468.0/font/lucide.css',
    Phosphor: 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css',
    Tabler: 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css',
} as const;

declare module './FxSetup' {
    interface FxSetupSettings {
        iconPacks?: ReadonlyArray<string>;
    }
    interface FxSetupConfig {
        iconPacks: ReadonlyArray<IconPackInfo>;
    }
}

export class IconManager implements IConfigurator {
    defaultConfig(): Partial<FxSetupConfig> {
        return {
            iconPacks: [],
        };
    }

    private resolvePack(pack: string): IconPackInfo {
        const href = pack in IconPacks
            ? IconPacks[pack as keyof typeof IconPacks]
            : pack;

        return {
            href,
            id: `fx-icons-${hashOrSlug(href)}`,
        };
    }

    private markAsIconPack(linkEl: HTMLLinkElement): HTMLLinkElement {
        linkEl.setAttribute('data-fx-icon-pack', '');
        return linkEl;
    }

    private assignIconPack(linkEl: HTMLLinkElement, pack: IconPackInfo): HTMLLinkElement {
        return pipe(
            linkEl,
            linkEl => Object.assign(linkEl, {
                id: pack.id,
                rel: 'stylesheet',
                href: pack.href,
            }),
            linkEl => this.markAsIconPack(linkEl),
        );
    }

    private ensureIconPack(pack: IconPackInfo): void {
        if (typeof document !== 'undefined') {
            const existing = document.getElementById(pack.id) as HTMLLinkElement | null;
            if (isNil(existing)) {
                pipe(
                    document.createElement('link'),
                    linkEl => this.assignIconPack(linkEl, pack),
                    linkEl => document.head.appendChild(linkEl),
                );
            } else {
                this.assignIconPack(existing, pack);
            }
        }
    }

    createConfig(settings: FxSetupSettings): Partial<FxSetupConfig> {
        return isNil(settings.iconPacks)
            ? {}
            : { iconPacks: settings.iconPacks.map((pack) => this.resolvePack(pack)) };
    }

    applyConfig(config: FxSetupConfig): void {
        if (typeof document !== 'undefined') {
            const activeIds = new Set(config.iconPacks.map((pack) => pack.id));

            for (const linkEl of document.querySelectorAll('link[data-fx-icon-pack]')) {
                if (!activeIds.has(linkEl.id)) {
                    linkEl.remove();
                }
            }

            for (const pack of config.iconPacks) {
                this.ensureIconPack(pack);
            }
        }
    }
}
