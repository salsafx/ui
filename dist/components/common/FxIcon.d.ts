import { type CSSResultGroup, type PropertyValues } from 'lit';
import { FxElement } from '../base/FxElement';
export declare class FxIcon extends FxElement {
    icon: string;
    color: string;
    size: string;
    static styles: CSSResultGroup;
    protected createRenderRoot(): DocumentFragment | HTMLElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private syncHostStyles;
    private stripManagedLightDom;
    private get hasManualContent();
    render(): import("lit").TemplateResult<1>;
}
