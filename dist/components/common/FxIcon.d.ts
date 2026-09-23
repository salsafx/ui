import { type CSSResultGroup, type PropertyValues } from 'lit';
import { FxElement } from '../base/FxElement';
export declare class FxIcon extends FxElement {
    icon: string;
    color: string;
    size: string;
    static styles: CSSResultGroup;
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private syncHostStyles;
    private get hasManualContent();
    private manageIcon;
    render(): import("lit").TemplateResult<1>;
}
