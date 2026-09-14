import { FxElement } from '../base/FxElement';
import { type VariantAttribute } from '../base/FxCore';
declare const FxLedIndicator_base: (new (...args: any[]) => import("../base/Animatable").AnimatableInterface) & typeof FxElement;
export declare class FxLedIndicator extends FxLedIndicator_base {
    label: string;
    labelPosition: 'top' | 'bottom' | 'none';
    shape: 'round' | 'rect' | 'square';
    size: 'small' | 'medium' | 'large' | 'x-large';
    color: string;
    variant?: VariantAttribute;
    name: string;
    isActive: boolean;
    isBlinking: boolean;
    isInteractive: boolean;
    static styles: import("lit").CSSResult[];
    private handleClick;
    private handleKeyDown;
    private get resolvedColor();
    private get colorVars();
    render(): import("lit").TemplateResult<1>;
}
export {};
