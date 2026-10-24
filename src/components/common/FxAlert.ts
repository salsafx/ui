import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { SlottedIconManager, Variant, VariantAttributeConverters, type VariantAttribute } from '../base/FxCore';
import { Fx } from '../base/Fx';
import './FxIcon';

export type AlertSize = 'x-small' | 'small' | 'medium' | 'large';
export type AlertTheme = 'dark' | 'light';

const reflectHasIcon = {
    fromAttribute: (value: string | null): boolean => value !== 'false',
    toAttribute: (value: boolean): string | null => (value ? null : 'false'),
};

const reflectAlertTheme = {
    fromAttribute: (value: string | null): AlertTheme | undefined =>
        value === 'light' ? 'light' : value === 'dark' ? 'dark' : undefined,
    toAttribute: (value: AlertTheme | undefined): string | null =>
        value === 'light' || value === 'dark' ? value : null,
};

@customElement('fx-alert')
export class FxAlert extends FxElement {
    @property({ reflect: true, converter: VariantAttributeConverters.required })
    variant: VariantAttribute = Variant.Info;

    @property({ type: String }) icon = '';

    @property({ attribute: 'has-icon', reflect: true, converter: reflectHasIcon })
    hasIcon = true;

    private readonly slottedIcons = new SlottedIconManager(this);

    @property({ type: Boolean, attribute: 'has-shadow', reflect: true })
    hasShadow = false;

    @property({ type: String }) text = '';

    @property({ type: String, attribute: 'background-color' })
    backgroundColor = '';

    @property({ attribute: 'alert-theme', reflect: true, converter: reflectAlertTheme })
    alertTheme?: AlertTheme;

    @property({ type: String, reflect: true })
    size: AlertSize = 'large';

    @property({ type: Boolean, reflect: true })
    dismissible = false;

    static styles = [
        css`
            :host {
                display: flex;
                box-sizing: border-box;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
                overflow: visible;
                --fx-alert-background: #0a1418;
                --fx-alert-foreground: #7dd3fc;
                --fx-alert-border: #38bdf8;
                background: var(--fx-alert-background);
                color: var(--fx-alert-foreground);
                border-radius: 10px;
                border-left: 3px solid var(--fx-alert-border);
                --fx-alert-shadow-opacity: 0.5;
                box-shadow: 0 0 2px color-mix(in srgb, var(--fx-alert-border) 55%, transparent);
            }
            :host([data-alert-theme='light']) {
                --fx-alert-background: color-mix(in srgb, var(--fx-alert-border) 7%, white);
                --fx-alert-foreground: color-mix(in srgb, var(--fx-alert-border) 22%, #0f172a);
            }
            .inner {
                display: flex;
                align-items: center;
                box-sizing: border-box;
                width: 100%;
                gap: 14px;
            }
            :host([has-shadow]) {
                box-shadow:
                    0 0 2px color-mix(in srgb, var(--fx-alert-border) 55%, transparent),
                    0 8px 20px rgba(0, 0, 0, var(--fx-alert-shadow-opacity));
            }
            :host([size='x-small']) {
                font-size: 11px;
                min-height: 32px;
            }
            :host([size='x-small']) .inner {
                padding: 6px 10px;
                gap: 8px;
            }
            :host([size='small']) {
                font-size: 13px;
                min-height: 40px;
            }
            :host([size='small']) .inner {
                padding: 10px 14px;
                gap: 10px;
            }
            :host([size='medium']) {
                font-size: 15px;
                min-height: 48px;
            }
            :host([size='medium']) .inner {
                padding: 14px 18px;
            }
            :host([size='large']) {
                font-size: 16px;
                min-height: 56px;
                border-left-width: 4px;
            }
            :host([size='large']) .inner {
                padding: 18px 22px;
                gap: 16px;
            }
            .icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                color: var(--fx-alert-border);
                line-height: 1;
            }
            :host([size='x-small']) .icon {
                font-size: 12px;
            }
            :host([size='small']) .icon {
                font-size: 14px;
            }
            :host([size='medium']) .icon {
                font-size: 18px;
            }
            :host([size='large']) .icon {
                font-size: 22px;
            }
            .icon ::slotted(*) {
                font-size: inherit;
                color: inherit;
            }
            .body {
                min-width: 0;
                flex: 1;
                font-weight: 500;
                letter-spacing: 0.01em;
                line-height: 1.35;
                text-align: start;
                overflow-wrap: break-word;
                white-space: pre-line;
            }
            .close {
                flex-shrink: 0;
                align-self: center;
                margin-inline-start: auto;
                appearance: none;
                border: 0;
                background: transparent;
                color: inherit;
                opacity: 0.65;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                font-size: 1.15em;
            }
            .close:hover {
                opacity: 1;
            }
            :host([size='x-small']) .close {
                font-size: 12px;
            }
            :host([size='small']) .close {
                font-size: 14px;
            }
            :host([size='medium']) .close {
                font-size: 16px;
            }
            :host([size='large']) .close {
                font-size: 18px;
            }
        `,
    ];

    connectedCallback() {
        super.connectedCallback();
        this.manageIcon();
        document.addEventListener('fx-configuration', this.onFxConfiguration);
        this.applyColors();
    }

    disconnectedCallback() {
        document.removeEventListener('fx-configuration', this.onFxConfiguration);
        super.disconnectedCallback();
    }

    private onFxConfiguration = () => {
        this.applyColors();
    };

    protected updated(changed: Map<string | number | symbol, unknown>) {
        super.updated(changed);
        if (
            changed.has('variant') ||
            changed.has('backgroundColor') ||
            changed.has('alertTheme')
        ) {
            this.applyColors();
        }
        if (changed.has('icon') || changed.has('variant') || changed.has('hasIcon')) {
            this.manageIcon();
        }
    }

    private onDismiss(event: Event) {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
    }

    private resolvedIcon(): string {
        const custom = this.icon.trim();
        return custom ? custom : Variant.toIcon(this.variant);
    }

    private manageIcon() {
        this.slottedIcons.manage(this.hasIcon ? this.resolvedIcon() : '');
    }

    private appliedBackground = '';
    private appliedForeground = '';
    private appliedBorder = '';

    private resolvedAlertTheme(): AlertTheme {
        return this.alertTheme === 'light' || this.alertTheme === 'dark'
            ? this.alertTheme
            : Fx.configuration.alertTheme ?? 'dark';
    }

    private applyColors() {
        const variant = Variant.of(this.variant) ?? Variant.Info;
        const colors = Variant.toColors(variant);
        const light = this.resolvedAlertTheme() === 'light';
        this.dataset.alertTheme = light ? 'light' : 'dark';
        const customBackground = this.backgroundColor.trim();
        const background = customBackground || (light ? '' : colors.background);
        const foreground = light ? '' : colors.foreground;
        const apply = (name: string, next: string, previous: string) => {
            if (next) {
                this.style.setProperty(name, next);
            } else if (previous) {
                this.style.removeProperty(name);
            }
        };
        apply('--fx-alert-background', background, this.appliedBackground);
        apply('--fx-alert-foreground', foreground, this.appliedForeground);
        apply('--fx-alert-border', colors.border, this.appliedBorder);
        this.appliedBackground = background;
        this.appliedForeground = foreground;
        this.appliedBorder = colors.border;
        this.setAttribute('role', variant === Variant.Danger || variant === Variant.Warning
            ? 'alert'
            : 'status'
        );
    }

    render() {
        return html`
            <div class="inner">
                ${this.hasIcon
                    ? html`
                        <span class="icon" part="icon">
                            <slot name="icon"></slot>
                        </span>
                    `
                    : nothing}
                <span class="body" part="body"><slot>${this.text ? this.text : nothing}</slot></span>
                ${this.dismissible
                    ? html`
                        <button class="close" part="close" type="button" aria-label="Dismiss" @click=${this.onDismiss}>×</button>
                    `
                    : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fx-alert': FxAlert;
    }
}
