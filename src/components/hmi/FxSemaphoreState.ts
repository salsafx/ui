import { html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Variant, type VariantAttribute } from '../base/FxCore';

@customElement('fx-semaphore-state')
export class FxSemaphoreState extends FxElement {
    @property({ attribute: 'value' }) value = '';
    @property() color = '';
    @property({ reflect: true, converter: Variant.reflectOptional })
    variant?: VariantAttribute;
    @property() label = '';
    @property() icon = '';
    @property({ type: Boolean, attribute: 'is-blinking', reflect: true }) isBlinking = false;

    connectedCallback() {
        super.connectedCallback();
        this.style.display = 'none';
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (
            changed.has('value') ||
            changed.has('color') ||
            changed.has('variant') ||
            changed.has('label') ||
            changed.has('icon') ||
            changed.has('isBlinking')
        ) {
            this.dispatchEvent(new CustomEvent('stateupdate', { bubbles: true, composed: true }));
        }
    }

    render() {
        return html`<slot name="icon"></slot>`;
    }
}
