import { type FxThemeMode } from '../base/Fx/ThemeManager/ThemeManager';
import { FxContentElement } from '../base/FxContentElement';
import './FxIcon';
export declare class FxCard extends FxContentElement {
    title: string;
    badge: string;
    icon: string;
    accentColor: string;
    badgeBackground: string;
    background: string;
    borderRadius: string;
    padding: string;
    gap: string;
    accentWidth: string;
    theme?: FxThemeMode;
    private readonly slottedIcons;
    private readonly slottedBadges;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    protected updated(changed: Map<string | number | symbol, unknown>): void;
    private syncBadge;
    private get resolvedBadgeBackground();
    private get resolvedBackground();
    render(): import("lit").TemplateResult<1>;
}
