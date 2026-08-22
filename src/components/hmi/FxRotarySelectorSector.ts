import type { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';

@customElement('fx-rotary-selector-sector')
export class FxRotarySelectorSector extends FxElement {
    @property({ reflect: true }) value = '';
    @property({ reflect: true }) label = '';
    @property({ reflect: true }) color = '';
    @property({ attribute: 'text-color', reflect: true }) textColor = '';
    @property({ type: Array, reflect: true }) ranges: string[] = [];
    @property({ type: Number, attribute: 'start-deg', reflect: true }) startDeg = 0;
    @property({ type: Number, attribute: 'end-deg', reflect: true }) endDeg = 0;

    connectedCallback() {
        super.connectedCallback();
        this.style.display = 'none';
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        this.dispatchEvent(new CustomEvent('sectorupdate', { bubbles: true }));
    }
}
