import { FxElement } from './FxElement';
export declare class FxMeasureElement extends FxElement {
    value: number;
    min: number;
    max: number;
    label: string;
    unit: string;
    hasValueDisplay: boolean;
    protected get progress(): number;
}
