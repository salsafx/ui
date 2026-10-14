import { type PropertyValues } from 'lit';
import { FxElement } from '../base/FxElement';
export declare class FxSwitchState extends FxElement {
    value: string;
    label: string;
    icon: string;
    foregroundColor: string;
    backgroundColor: string;
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
}
