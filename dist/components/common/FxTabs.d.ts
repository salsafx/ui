import { type CSSResultGroup, type PropertyValues } from 'lit';
import { FxContentElement } from '../base/FxContentElement';
import { type FxThemeMode } from '../base/Fx/ThemeManager/ThemeManager';
import './FxIcon';
declare const FxTabs_base: (new (...args: any[]) => import("../base/Animatable").AnimatableInterface) & typeof FxContentElement;
export declare class FxTabs extends FxTabs_base {
    selectedIndex: number;
    selectionColor: string;
    theme?: FxThemeMode;
    private tabSignature;
    private readonly slottedIcons;
    private managingIcons;
    static styles: CSSResultGroup;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private onTabUpdate;
    private getAssignedTabs;
    private refreshTabs;
    private syncSelection;
    private manageTabIcons;
    private selectTab;
    protected firstUpdated(): void;
    protected updated(changed: PropertyValues): void;
    private onSlotChange;
    private resolveTabSelectionColor;
    private renderTabButton;
    render(): import("lit").TemplateResult<1>;
}
export {};
