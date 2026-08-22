import { html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';

@customElement('fx-switch-state')
export class FxSwitchState extends FxElement {
    @property({ attribute: 'value' }) value = '';
    @property() label = '';
    @property() icon = '';
    @property({ attribute: 'foreground-color' }) foregroundColor = '';
    @property({ attribute: 'background-color' }) backgroundColor = '';

    connectedCallback() {
        super.connectedCallback();
        this.style.display = 'none';
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (
            changed.has('value') ||
            changed.has('label') ||
            changed.has('icon') ||
            changed.has('foregroundColor') ||
            changed.has('backgroundColor') ||
            changed.has('disabled')
        ) {
            this.dispatchEvent(new CustomEvent('stateupdate', { bubbles: true, composed: true }));
        }
    }

    render() {
        return html`<slot name="icon"></slot>`;
    }
}
