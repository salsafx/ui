import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { themeVariables } from '../styles/FxTheme';
import { FxElement } from '../base/FxElement';
import { syncHostIcon, Variant, type VariantAttribute } from '../base/FxCore';
import './FxIcon';

export type AlertSize = 'small' | 'medium' | 'large';

const reflectVariant = {
    fromAttribute: (value: string | null): Variant =>
        value ? Variant.parse(value) : Variant.Info,
    toAttribute: (value: VariantAttribute): string => Variant.toString(value),
};

const reflectHasIcon = {
    fromAttribute: (value: string | null): boolean => value !== 'false',
    toAttribute: (value: boolean): string | null => (value ? null : 'false'),
};

@customElement('fx-alert')
export class FxAlert extends FxElement {
    @property({ reflect: true, converter: reflectVariant })
    variant: VariantAttribute = Variant.Info;

    @property({ type: String }) icon = '';

    @property({ attribute: 'has-icon', reflect: true, converter: reflectHasIcon })
    hasIcon = true;

    @property({ type: Boolean, attribute: 'has-shadow', reflect: true })
    hasShadow = false;

    @property({ type: String }) text = '';

    @property({ type: String, reflect: true })
    size: AlertSize = 'large';

    @property({ type: Boolean, reflect: true })
    dismissible = false;

    static styles = [
        themeVariables,
        css`
            :host {
                display: flex;
                box-sizing: border-box;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
                overflow: visible;
                background: var(--fx-alert-background);
                color: var(--fx-alert-foreground);
                border-radius: 10px;
                border-left: 3px solid var(--fx-alert-border);
                box-shadow: 0 0 2px color-mix(in srgb, var(--fx-alert-border) 55%, transparent);
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
                    0 8px 20px rgba(0, 0, 0, 0.5);
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
        this.applyColors();
        this.syncIcon();
    }

    protected updated(changed: Map<string | number | symbol, unknown>) {
        super.updated(changed);
        if (changed.has('variant')) {
            this.applyColors();
        }
        if (changed.has('icon') || changed.has('variant') || changed.has('hasIcon')) {
            this.syncIcon();
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

    private syncIcon() {
        syncHostIcon(this, this.hasIcon ? this.resolvedIcon() : '');
    }

    private applyColors() {
        const variant = Variant.coerce(this.variant) ?? Variant.Info;
        const colors = Variant.toColors(variant);
        this.style.setProperty('--fx-alert-background', colors.background);
        this.style.setProperty('--fx-alert-foreground', colors.foreground);
        this.style.setProperty('--fx-alert-border', colors.border);
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
