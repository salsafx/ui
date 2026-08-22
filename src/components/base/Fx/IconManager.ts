import { fontAwesomeCss, fontAwesomeStylesheetUrl } from '../../../assets/icons/fontawesome';
import { hashOrSlug, isNil, pipe } from '../FxCore/Core';
import { El } from '../FxCore/El';
import type { FxSetupSettings, IConfigurator, FxSetupConfig } from './FxSetup';

export type IconPackInfo = {
    id: string;
    href: string;
};

export const IconPacks = {
    FontAwesome: fontAwesomeStylesheetUrl,
    MaterialDesign: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css',
    MaterialSymbols: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0',
    Lucide: 'https://cdn.jsdelivr.net/npm/lucide-static@0.468.0/font/lucide.css',
    Phosphor: 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css',
    Tabler: 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css',
} as const;

const bundledIconCss: Record<string, string> = {
    [IconPacks.FontAwesome]: fontAwesomeCss,
};

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

    private ensureStylePack(pack: IconPackInfo, css: string): void {
        if (typeof document !== 'undefined') {
            const existing = document.getElementById(pack.id);
            if (isNil(existing)) {
                document.head.appendChild(El.style({
                    id: pack.id,
                    'data-fx-icon-pack': '',
                    textContent: css,
                }));
            } else if (existing instanceof HTMLStyleElement) {
                existing.setAttribute('data-fx-icon-pack', '');
                existing.textContent = css;
            } else {
                existing.remove();
                this.ensureStylePack(pack, css);
            }
        }
    }

    private ensureIconPack(pack: IconPackInfo): void {
        const css = bundledIconCss[pack.href];
        if (css) {
            this.ensureStylePack(pack, css);
        } else if (typeof document !== 'undefined') {
            const existing = document.getElementById(pack.id) as HTMLLinkElement | null;
            if (isNil(existing)) {
                document.head.appendChild(El.link({
                    id: pack.id,
                    rel: 'stylesheet',
                    href: pack.href,
                    'data-fx-icon-pack': '',
                }));
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

            for (const packEl of document.querySelectorAll('[data-fx-icon-pack]')) {
                if (!activeIds.has(packEl.id)) {
                    packEl.remove();
                }
            }

            for (const pack of config.iconPacks) {
                this.ensureIconPack(pack);
            }
        }
    }
}
