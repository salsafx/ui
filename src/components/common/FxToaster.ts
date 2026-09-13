import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { themeVariables } from '../styles/FxTheme';
import { FxElement } from '../base/FxElement';
import { El, Guid, Variant, Css, type VariantAttribute } from '../base/FxCore';
import { FxAlert, type AlertSize } from './FxAlert';

export type ToasterPlacement =
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end';

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

const placements: ReadonlyArray<ToasterPlacement> = [
    'top-start',
    'top-center',
    'top-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
];

const defaultSetup: FxToasterSetupConfig = {
    placement: 'top-center',
    duration: 4000,
    margin: 16,
    variant: Variant.Info,
    icon: '',
    hasIcon: true,
    hasShadow: true,
    size: 'large',
};

const reflectPlacement = {
    fromAttribute: (value: string | null): ToasterPlacement =>
        placements.includes(value as ToasterPlacement) ? (value as ToasterPlacement) : 'top-center',
    toAttribute: (value: ToasterPlacement): string => value,
};

export class FxToasterApi {
    constructor(private readonly config: FxToasterSetupConfig) {}

    setup(patch: Partial<FxToasterSetupConfig>): FxToasterApi {
        return new FxToasterApi({ ...this.config, ...patch });
    }

    show(text: string, options: ToastShowOptions = {}): string {
        const toaster = FxToaster.ensure(options.placement ?? this.config.placement);
        toaster.margin = this.config.margin;
        return toaster.show({
            text,
            variant: options.variant ?? this.config.variant,
            icon: options.icon ?? this.config.icon,
            hasIcon: options.hasIcon ?? this.config.hasIcon,
            hasShadow: options.hasShadow ?? this.config.hasShadow,
            size: options.size ?? this.config.size,
            duration: options.duration ?? this.config.duration,
        });
    }

    primary(text: string, options: ToastShowOptions = {}): string {
        return this.show(text, { ...options, variant: Variant.Primary });
    }

    secondary(text: string, options: ToastShowOptions = {}): string {
        return this.show(text, { ...options, variant: Variant.Secondary });
    }

    success(text: string, options: ToastShowOptions = {}): string {
        return this.show(text, { ...options, variant: Variant.Success });
    }

    danger(text: string, options: ToastShowOptions = {}): string {
        return this.show(text, { ...options, variant: Variant.Danger });
    }

    warning(text: string, options: ToastShowOptions = {}): string {
        return this.show(text, { ...options, variant: Variant.Warning });
    }

    info(text: string, options: ToastShowOptions = {}): string {
        return this.show(text, { ...options, variant: Variant.Info });
    }

    light(text: string, options: ToastShowOptions = {}): string {
        return this.show(text, { ...options, variant: Variant.Light });
    }

    dark(text: string, options: ToastShowOptions = {}): string {
        return this.show(text, { ...options, variant: Variant.Dark });
    }
}

@customElement('fx-toaster')
export class FxToaster extends FxElement {
    @property({ reflect: true, converter: reflectPlacement })
    placement: ToasterPlacement = defaultSetup.placement;

    @property({ type: Number }) duration = defaultSetup.duration;

    @property() margin: string | number = defaultSetup.margin;

    private timers = new Map<string, number>();

    static styles = [
        themeVariables,
        css`
            :host {
                position: fixed;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 12px;
                width: min(420px, calc(100vw - (2 * var(--fx-toaster-margin, 16px))));
                pointer-events: none;
                box-sizing: border-box;
                --fx-toaster-margin: 16px;
            }
            :host([placement='top-start']) {
                top: var(--fx-toaster-margin);
                left: var(--fx-toaster-margin);
            }
            :host([placement='top-center']) {
                top: var(--fx-toaster-margin);
                left: 50%;
                transform: translateX(-50%);
            }
            :host([placement='top-end']) {
                top: var(--fx-toaster-margin);
                right: var(--fx-toaster-margin);
            }
            :host([placement='bottom-start']) {
                bottom: var(--fx-toaster-margin);
                left: var(--fx-toaster-margin);
            }
            :host([placement='bottom-center']) {
                bottom: var(--fx-toaster-margin);
                left: 50%;
                transform: translateX(-50%);
            }
            :host([placement='bottom-end']) {
                bottom: var(--fx-toaster-margin);
                right: var(--fx-toaster-margin);
            }
            ::slotted(.toast) {
                pointer-events: auto;
                width: 100%;
                cursor: pointer;
            }
        `,
    ];

    disconnectedCallback() {
        super.disconnectedCallback();
        for (const timer of this.timers.values()) {
            window.clearTimeout(timer);
        }
        this.timers.clear();
    }

    connectedCallback() {
        super.connectedCallback();
        this.applyMargin();
    }

    protected updated(changed: Map<string | number | symbol, unknown>) {
        super.updated(changed);
        if (changed.has('margin')) {
            this.applyMargin();
        }
    }

    private applyMargin() {
        this.style.setProperty('--fx-toaster-margin', Css.normalizeLength(this.margin));
    }

    static setup(patch: Partial<FxToasterSetupConfig> = {}): FxToasterApi {
        return new FxToasterApi({ ...defaultSetup, ...patch });
    }

    static ensure(placement: ToasterPlacement = defaultSetup.placement): FxToaster {
        const existing = Array.from(document.querySelectorAll('fx-toaster')).find(
            (node): node is FxToaster =>
                node instanceof FxToaster && node.placement === placement,
        );
        if (existing) {
            return existing;
        } else {
            return document.body.appendChild(
                El.fxToaster({ placement }) as FxToaster
            );
        }
    }

    static show(text: string, options: ToastShowOptions = {}): string {
        return FxToaster.setup().show(text, options);
    }

    static primary(text: string, options: ToastShowOptions = {}): string {
        return FxToaster.setup().primary(text, options);
    }

    static secondary(text: string, options: ToastShowOptions = {}): string {
        return FxToaster.setup().secondary(text, options);
    }

    static success(text: string, options: ToastShowOptions = {}): string {
        return FxToaster.setup().success(text, options);
    }

    static danger(text: string, options: ToastShowOptions = {}): string {
        return FxToaster.setup().danger(text, options);
    }

    static warning(text: string, options: ToastShowOptions = {}): string {
        return FxToaster.setup().warning(text, options);
    }

    static info(text: string, options: ToastShowOptions = {}): string {
        return FxToaster.setup().info(text, options);
    }

    static light(text: string, options: ToastShowOptions = {}): string {
        return FxToaster.setup().light(text, options);
    }

    static dark(text: string, options: ToastShowOptions = {}): string {
        return FxToaster.setup().dark(text, options);
    }

    show(options: ToastOptions): string {
        const id = Guid.newGuid();
        const duration = options.duration ?? this.duration;
        const alert = this.appendChild(El.fxAlert({
            className: 'toast',
            'data-toast-id': id,
            icon: options.icon ?? '',
            text: options.text,
            size: options.size ?? 'large',
        }) as FxAlert);
        alert.variant = options.variant ?? Variant.Info;
        alert.hasIcon = options.hasIcon ?? true;
        alert.hasShadow = options.hasShadow ?? true;
        if (duration > 0) {
            alert.addEventListener('click', () => this.dismiss(id));
        } else {
            alert.dismissible = true;
            alert.addEventListener('dismiss', () => this.dismiss(id));
        }
        alert.animate(
            [
                { opacity: 0, transform: 'translateY(-8px)' },
                { opacity: 1, transform: 'none' },
            ],
            { duration: 180, easing: 'ease' },
        );
        if (duration > 0) {
            const timer = window.setTimeout(() => this.dismiss(id), duration);
            this.timers.set(id, timer);
        }
        return id;
    }

    dismiss(id: string): void {
        const timer = this.timers.get(id);
        if (timer !== undefined) {
            window.clearTimeout(timer);
            this.timers.delete(id);
        }
        this.querySelector(`[data-toast-id="${id}"]`)?.remove();
    }

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fx-toaster': FxToaster;
    }
}
