import type { PropertyValues } from 'lit';
import { FxElement } from '../base/FxElement';
export declare class FxRotarySelectorSector extends FxElement {
    value: string;
    label: string;
    color: string;
    textColor: string;
    ranges: string[];
    startDeg: number;
    endDeg: number;
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
}
