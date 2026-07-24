import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { isNil } from '../base/Core';
import { FxPanelElement } from '../base/FxPanelElement';

@customElement('fx-stack-panel')
export class FxStackPanel extends FxPanelElement {
    @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';
    @property({ type: String }) spacing = '0px';
    @property({ type: String, reflect: true }) align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
    @property({ type: String }) width = '';
    @property({ type: String }) height = '';
    @property({ type: String }) padding = '';

    static styles = css`
        :host {
            display: flex;
            box-sizing: border-box;
            width: 100%;
        }
        :host([orientation="vertical"]) {
            flex-direction: column;
        }
        :host([orientation="horizontal"]) {
            flex-direction: row;
            width: auto;
        }
    `;

    get extraStyles() {
        return Object.entries({
            width: this.width,
            height: this.height,
            padding: this.padding
        })
            .filter(([_, value]) => !isNil(value) && value !== '')
            .map(([prop, value]) => `${prop}: ${value};`);
    }

    render() {
        return html`
            <style>
                :host {
                    gap: ${this.spacing};
                    align-items: ${this.align};
                    ${this.extraStyles.join(' ')}
                }
            </style>
            <slot></slot>
        `;
    }
}
