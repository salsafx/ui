import { FxElement } from '../base/FxElement';
import { type VariantAttribute } from '../base/FxCore';
import './FxIcon';
export type AlertSize = 'small' | 'medium' | 'large';
export declare class FxAlert extends FxElement {
    variant: VariantAttribute;
    icon: string;
    hasIcon: boolean;
    private readonly slottedIcons;
    hasShadow: boolean;
    text: string;
    size: AlertSize;
    dismissible: boolean;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    protected updated(changed: Map<string | number | symbol, unknown>): void;
    private onDismiss;
    private resolvedIcon;
    private manageIcon;
    private applyColors;
    render(): import("lit").TemplateResult<1>;
}
