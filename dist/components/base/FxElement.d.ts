import { LitElement } from 'lit';
import type { CSSResultGroup, PropertyValues } from 'lit';
export declare class FxElement extends LitElement {
    disabled: boolean;
    static styles: CSSResultGroup;
    protected createRenderRoot(): DocumentFragment | HTMLElement;
    protected updated(changed: PropertyValues): void;
}
