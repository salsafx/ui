import { type FxThemeMode } from '../base/Fx/ThemeManager/ThemeManager';
import { FxContentElement, type ContentFlexDirection } from '../base/FxContentElement';
export declare class FxGroupBox extends FxContentElement {
    title: string;
    titleColor: string;
    background: string;
    border: string;
    borderRadius: string;
    padding: string;
    gap: string;
    flexDirection: ContentFlexDirection;
    theme?: FxThemeMode;
    static styles: import("lit").CSSResult[];
    private get resolvedBackground();
    private get resolvedBorder();
    render(): import("lit").TemplateResult<1>;
}
