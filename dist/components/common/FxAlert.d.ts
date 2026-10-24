import { FxElement } from '../base/FxElement';
import { type VariantAttribute } from '../base/FxCore';
import './FxIcon';
export type AlertSize = 'x-small' | 'small' | 'medium' | 'large';
export type AlertTheme = 'dark' | 'light';
export declare class FxAlert extends FxElement {
    variant: VariantAttribute;
    icon: string;
    hasIcon: boolean;
    private readonly slottedIcons;
    hasShadow: boolean;
    text: string;
    backgroundColor: string;
    alertTheme?: AlertTheme;
    size: AlertSize;
    dismissible: boolean;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    private onFxConfiguration;
    protected updated(changed: Map<string | number | symbol, unknown>): void;
    private onDismiss;
    private resolvedIcon;
    private manageIcon;
    private appliedBackground;
    private appliedForeground;
    private appliedBorder;
    private resolvedAlertTheme;
    private applyColors;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'fx-alert': FxAlert;
    }
}
