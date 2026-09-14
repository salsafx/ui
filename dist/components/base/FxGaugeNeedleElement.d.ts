import type { PropertyValues } from 'lit';
import { FxMeasureElement } from './FxMeasureElement';
export declare class FxGaugeNeedleElement extends FxMeasureElement {
    startAngle: number;
    arcLength: number;
    hasShadow: boolean;
    protected displayAngle: number;
    private hasDisplayAngle;
    protected willUpdate(changedProperties: PropertyValues): void;
}
