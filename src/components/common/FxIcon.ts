import { html, css, type CSSResultGroup, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { El, fxManagedIconAttr, Css } from '../base/FxCore';
import { themeVariables } from '../styles/FxTheme';

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
        themeVariables,
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

    connectedCallback() {
        super.connectedCallback();
        this.syncHostStyles();
        this.syncIcon();
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('color') || changed.has('size')) {
            this.syncHostStyles();
        }
        if (changed.has('icon')) {
            this.syncIcon();
        }
    }

    private syncHostStyles() {
        this.style.color = this.color.trim() || '';
        this.style.fontSize = normalizeCustomSize(this.size) || '';
    }

    private get hasManualContent(): boolean {
        return Array.from(this.children).some(
            (child) => child instanceof HTMLElement && !child.hasAttribute(fxManagedIconAttr),
        );
    }

    private syncIcon() {
        const managed = this.querySelector(
            `:scope > [${fxManagedIconAttr}]`,
        ) as HTMLElement | null;
        const value = this.icon.trim();

        if (this.hasManualContent || !value) {
            managed?.remove();
        } else if (isSvgIcon(value)) {
            if (managed instanceof HTMLImageElement) {
                if (managed.getAttribute('src') !== value) {
                    managed.setAttribute('src', value);
                }
            } else {
                managed?.remove();
                this.appendChild(El.img({
                    [fxManagedIconAttr]: 'icon',
                    src: value,
                    alt: '',
                    'aria-hidden': 'true',
                }));
            }
        } else if (managed && managed.tagName === 'I') {
            if (managed.className !== value) {
                managed.className = value;
            }
        } else {
            managed?.remove();
            this.appendChild(El.i({
                [fxManagedIconAttr]: 'icon',
                'aria-hidden': 'true',
                className: value,
            }));
        }
    }

    render() {
        return html`<slot></slot>`;
    }
}
