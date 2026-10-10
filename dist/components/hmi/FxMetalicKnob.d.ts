import { FxElement } from '../base/FxElement';
declare const FxMetalicKnob_base: (new (...args: any[]) => import("../base/Animatable").AnimatableInterface) & typeof FxElement;
export declare class FxMetalicKnob extends FxMetalicKnob_base {
    private readonly guid;
    angle: number;
    value: number;
    progress: number;
    isDragging: boolean;
    static styles: import("lit").CSSResult;
    private renderBrushStops;
    render(): import("lit").TemplateResult<1>;
}
export {};
