import { FxMeasureElement } from '../base/FxMeasureElement';
export declare class ValueDisplay extends FxMeasureElement {
    offsetX: string | number;
    offsetY: string | number;
    align: 'left' | 'center' | 'right';
    private formatOffset;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
}
