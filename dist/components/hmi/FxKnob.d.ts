import { FxElement } from '../base/FxElement';
declare const FxKnob_base: (new (...args: any[]) => import("../base/Animatable").AnimatableInterface) & typeof FxElement;
export declare class FxKnob extends FxKnob_base {
    angle: number;
    private readonly radius;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
export {};
