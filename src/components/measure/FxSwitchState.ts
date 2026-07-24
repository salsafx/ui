import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('fx-switch-state')
export class FxSwitchState extends LitElement {
    @property({ attribute: 'value' }) value = '';
    @property() label = '';
    @property() icon = '';
    @property() color = '';
    @property({ attribute: 'background-color' }) backgroundColor = '';

    connectedCallback() {
        super.connectedCallback();
        this.style.display = 'none';
    }

    protected updated(changed: Map<string | number | symbol, unknown>) {
        if (
            changed.has('value') ||
            changed.has('label') ||
            changed.has('icon') ||
            changed.has('color') ||
            changed.has('backgroundColor')
        ) {
            this.dispatchEvent(new CustomEvent('stateupdate', { bubbles: true, composed: true }));
        }
    }

    render() {
        return html`<slot name="icon"></slot>`;
    }
}
