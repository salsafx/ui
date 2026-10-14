import { FxElement } from '../base/FxElement';
export declare class FxSeparator extends FxElement {
    orientation: 'horizontal' | 'vertical';
    thickness: 'thin' | 'thick';
    mode: 'normal' | 'smooth';
    padding: 'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
    static styles: import("lit").CSSResultGroup[];
    render(): import("lit").TemplateResult<1>;
}
