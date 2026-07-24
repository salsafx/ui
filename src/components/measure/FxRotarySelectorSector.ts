import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('fx-rotary-selector-sector')
export class FxRotarySelectorSector extends LitElement {
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

    updated() {
        this.dispatchEvent(new CustomEvent('sectorupdate', { bubbles: true }));
    }
}
