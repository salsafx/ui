import { FxRadialScaleElement } from '../base/FxRadialScaleElement';
export declare class FxRadialSimpleScale extends FxRadialScaleElement {
    hasScaleLabels: boolean;
    outerRadius: number;
    innerRadius: number;
    textRadius: number;
    labelFontSize: number;
    renderTicks(): Generator<import("lit").TemplateResult<2>, void, unknown>;
    render(): import("lit").TemplateResult<1>;
}
