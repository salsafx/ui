import { type PropertyValues } from 'lit';
import { FxElement } from '../base/FxElement';
import { type VariantAttribute } from '../base/FxCore';
export declare class FxSemaphoreState extends FxElement {
    value: string;
    color: string;
    variant?: VariantAttribute;
    label: string;
    icon: string;
    isBlinking: boolean;
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
}
