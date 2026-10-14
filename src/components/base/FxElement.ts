import { LitElement, css } from 'lit';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { fxThemeSheet } from '../styles/FxTheme';

const disabledHostSheet = new CSSStyleSheet();
disabledHostSheet.replaceSync(`
:host([disabled]) {
    opacity: 0.5 !important;
    cursor: not-allowed;
    pointer-events: none;
}
`);

const sharedSheets = [disabledHostSheet, fxThemeSheet];

export class FxElement extends LitElement {
    @property({ type: Boolean, reflect: true }) disabled = false;

    static styles: CSSResultGroup = css`
        :host([disabled]) {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }
    `;

    protected createRenderRoot() {
        const root = super.createRenderRoot();
        if (root instanceof ShadowRoot) {
            const extra = sharedSheets.filter((sheet) => !root.adoptedStyleSheets.includes(sheet));
            if (extra.length > 0) {
                root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...extra];
            }
        }
        return root;
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('disabled')) {
            if (this.disabled) this.setAttribute('aria-disabled', 'true');
            else this.removeAttribute('aria-disabled');
        }
    }
}
