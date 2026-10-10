import { FxElement } from './FxElement';
export declare class FxScaleElement extends FxElement {
    min: number;
    max: number;
    count: number;
    hasScaleLabels: boolean;
    replacements: Record<number, number>;
    valueOrigin: 'start' | 'end';
    protected resolveLabel(tickValue: number): number;
}
