import { FxContentElement } from '../base/FxContentElement';
export declare class FxStackPanel extends FxContentElement {
    orientation: 'horizontal' | 'vertical';
    spacing: string;
    width: string;
    height: string;
    static styles: import("lit").CSSResult;
    private get flexDirection();
    get extraStyles(): string[];
    render(): import("lit").TemplateResult<1>;
}
