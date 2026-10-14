import { html, css, type CSSResultGroup, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { SlottedIconManager, Css } from '../base/FxCore';
import { adoptFxIconStyles, releaseFxIconStyles } from '../base/Fx/IconManager';

const sizeTokens = new Set([
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large',
]);

function normalizeCustomSize(size: string): string | null {
    const raw = String(size).trim();
    if (raw && !sizeTokens.has(raw)) {
        return Css.normalizeLength(raw);
    } else {
        return null;
    }
}

function isSvgIcon(icon: string): boolean {
    return icon.toLowerCase().endsWith('.svg');
}

@customElement('fx-icon')
export class FxIcon extends FxElement {
    @property({ type: String }) icon = '';

    @property({ type: String }) color = '';

    @property({
        type: String,
        reflect: true,
        converter: {
            fromAttribute: (value: string | null) => value ?? '',
            toAttribute: (value: string) => (value ? value : null),
        },
    })
    size = '';

    static styles: CSSResultGroup = [
        css`
            :host {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                align-self: center;
                box-sizing: border-box;
                line-height: 1;
                color: inherit;
                font-size: 1em;
                user-select: none;
            }

            :host([size='x-small']) {
                font-size: 0.65rem;
            }
            :host([size='small']) {
                font-size: 0.85rem;
            }
            :host([size='medium']) {
                font-size: 1rem;
            }
            :host([size='large']) {
                font-size: 1.25rem;
            }
            :host([size='x-large']) {
                font-size: 1.5rem;
            }
            :host([size='xx-large']) {
                font-size: 2rem;
            }

            i,
            img,
            ::slotted(*) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
            }

            img,
            ::slotted(img) {
                width: 1em;
                height: 1em;
                display: block;
                object-fit: contain;
            }
        `,
    ];

    protected createRenderRoot() {
        const root = super.createRenderRoot();
        if (root instanceof ShadowRoot) {
            adoptFxIconStyles(root);
        }
        return root;
    }

    connectedCallback() {
        super.connectedCallback();
        this.syncHostStyles();
        this.stripManagedLightDom();
    }

    disconnectedCallback() {
        if (this.shadowRoot) {
            releaseFxIconStyles(this.shadowRoot);
        }
        super.disconnectedCallback();
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('color') || changed.has('size')) {
            this.syncHostStyles();
        }
    }

    private syncHostStyles() {
        this.style.color = this.color.trim() || '';
        this.style.fontSize = normalizeCustomSize(this.size) || '';
    }

    private stripManagedLightDom() {
        this.querySelectorAll(`[${SlottedIconManager.managedAttr}]`).forEach((node) => node.remove());
    }

    private get hasManualContent(): boolean {
        return Array.from(this.children).some(
            (child) => child instanceof HTMLElement && !child.hasAttribute(SlottedIconManager.managedAttr),
        );
    }

    render() {
        if (this.hasManualContent) {
            return html`<slot></slot>`;
        }
        const value = this.icon.trim();
        if (!value) {
            return html`<slot></slot>`;
        }
        if (isSvgIcon(value)) {
            return html`<img src=${value} alt="" aria-hidden="true" />`;
        }
        return html`<i class=${value} aria-hidden="true"></i>`;
    }
}
