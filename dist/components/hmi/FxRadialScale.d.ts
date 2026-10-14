import { FxRadialScaleElement } from '../base/FxRadialScaleElement';
export declare class FxRadialScale extends FxRadialScaleElement {
    subDivisions: number;
    outerRadius: number;
    majorInnerRadius: number;
    minorInnerRadius: number;
    textRadius: number;
    labelFontSize: number;
    renderTicks(): Generator<import("lit").TemplateResult<2>, void, unknown>;
    render(): import("lit").TemplateResult<1>;
}
