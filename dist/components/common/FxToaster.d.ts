import { FxElement } from '../base/FxElement';
import { type VariantAttribute } from '../base/FxCore';
import { type AlertSize } from './FxAlert';
export type ToasterPlacement = 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
export type ToastOptions = {
    text: string;
    variant?: VariantAttribute;
    icon?: string;
    hasIcon?: boolean;
    hasShadow?: boolean;
    size?: AlertSize;
    duration?: number;
};
export type FxToasterSetupConfig = {
    placement: ToasterPlacement;
    duration: number;
    margin: string | number;
    variant: VariantAttribute;
    icon: string;
    hasIcon: boolean;
    hasShadow: boolean;
    size: AlertSize;
};
export type ToastShowOptions = Omit<ToastOptions, 'text'> & {
    placement?: ToasterPlacement;
};
export declare class FxToasterApi {
    private readonly config;
    constructor(config: FxToasterSetupConfig);
    setup(patch: Partial<FxToasterSetupConfig>): FxToasterApi;
    show(text: string, options?: ToastShowOptions): string;
    primary(text: string, options?: ToastShowOptions): string;
    secondary(text: string, options?: ToastShowOptions): string;
    success(text: string, options?: ToastShowOptions): string;
    danger(text: string, options?: ToastShowOptions): string;
    warning(text: string, options?: ToastShowOptions): string;
    info(text: string, options?: ToastShowOptions): string;
    light(text: string, options?: ToastShowOptions): string;
    dark(text: string, options?: ToastShowOptions): string;
}
export declare class FxToaster extends FxElement {
    placement: ToasterPlacement;
    duration: number;
    margin: string | number;
    private timers;
    static styles: import("lit").CSSResult[];
    disconnectedCallback(): void;
    connectedCallback(): void;
    protected updated(changed: Map<string | number | symbol, unknown>): void;
    private applyMargin;
    static setup(patch?: Partial<FxToasterSetupConfig>): FxToasterApi;
    static ensure(placement?: ToasterPlacement): FxToaster;
    static show(text: string, options?: ToastShowOptions): string;
    static primary(text: string, options?: ToastShowOptions): string;
    static secondary(text: string, options?: ToastShowOptions): string;
    static success(text: string, options?: ToastShowOptions): string;
    static danger(text: string, options?: ToastShowOptions): string;
    static warning(text: string, options?: ToastShowOptions): string;
    static info(text: string, options?: ToastShowOptions): string;
    static light(text: string, options?: ToastShowOptions): string;
    static dark(text: string, options?: ToastShowOptions): string;
    show(options: ToastOptions): string;
    dismiss(id: string): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'fx-toaster': FxToaster;
    }
}
