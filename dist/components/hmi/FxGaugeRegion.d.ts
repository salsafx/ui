import type { PropertyValues } from 'lit';
import { FxElement } from '../base/FxElement';
export type ResolvedGaugeRegion = {
    from: number;
    to: number;
    color: string;
    label: string;
};
export declare class FxGaugeRegion extends FxElement {
    from: number;
    to: number;
    color: string;
    label: string;
    connectedCallback(): void;
    resolveColor(index: number): string;
    protected updated(changed: PropertyValues): void;
}
export declare function collectGaugeRegions(host: HTMLElement): ResolvedGaugeRegion[];
