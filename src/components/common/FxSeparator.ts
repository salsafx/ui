import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';

@customElement('fx-separator')
export class FxSeparator extends FxElement {
    @property({ type: String, reflect: true })
    orientation: 'horizontal' | 'vertical' = 'horizontal';

    @property({ type: String, reflect: true })
    thickness: 'thin' | 'thick' = 'thin';

    @property({ type: String, reflect: true })
    mode: 'normal' | 'smooth' = 'normal';

    @property({ type: String, reflect: true })
    padding: 'none' | 'small' | 'medium' | 'large' | 'x-large' = 'none';

    static styles = [
        FxElement.styles,
        css`
            :host {
                display: block;
                flex-shrink: 0;
                background: transparent;
                box-sizing: border-box;
                --fx-separator-bleed: 0.63rem;
            }
            :host([orientation='horizontal']) {
                width: 100%;
                height: auto;
            }
            :host([orientation='vertical']) {
                width: auto;
                height: auto;
                align-self: stretch;
            }
            :host([orientation='horizontal'][padding='small']) .groove {
                padding-block: 0.25rem;
            }
            :host([orientation='horizontal'][padding='medium']) .groove {
                padding-block: 0.5rem;
            }
            :host([orientation='horizontal'][padding='large']) .groove {
                padding-block: 0.75rem;
            }
            :host([orientation='horizontal'][padding='x-large']) .groove {
                padding-block: 1rem;
            }
            :host([orientation='vertical'][padding='small']) .groove {
                padding-inline: 0.25rem;
            }
            :host([orientation='vertical'][padding='medium']) .groove {
                padding-inline: 0.5rem;
            }
            :host([orientation='vertical'][padding='large']) .groove {
                padding-inline: 0.75rem;
            }
            :host([orientation='vertical'][padding='x-large']) .groove {
                padding-inline: 1rem;
            }
            :host([mode='smooth'][orientation='horizontal']) {
                width: calc(100% + 2 * var(--fx-separator-bleed));
                margin-inline: calc(-1 * var(--fx-separator-bleed));
            }
            :host([mode='smooth'][orientation='vertical']) {
                height: calc(100% + 2 * var(--fx-separator-bleed));
                margin-block: calc(-1 * var(--fx-separator-bleed));
                align-self: stretch;
            }

            .groove {
                display: flex;
                width: 100%;
                height: 100%;
            }
            :host([orientation='horizontal']) .groove {
                flex-direction: column;
            }
            :host([orientation='vertical']) .groove {
                flex-direction: row;
                height: 100%;
                min-height: 100%;
                align-self: stretch;
            }
            :host([mode='smooth'][orientation='horizontal']) .groove {
                -webkit-mask-image: linear-gradient(
                    to right,
                    transparent 0%,
                    #000 12%,
                    #000 88%,
                    transparent 100%
                );
                mask-image: linear-gradient(
                    to right,
                    transparent 0%,
                    #000 12%,
                    #000 88%,
                    transparent 100%
                );
            }
            :host([mode='smooth'][orientation='vertical']) .groove {
                -webkit-mask-image: linear-gradient(
                    to bottom,
                    transparent 0%,
                    #000 12%,
                    #000 88%,
                    transparent 100%
                );
                mask-image: linear-gradient(
                    to bottom,
                    transparent 0%,
                    #000 12%,
                    #000 88%,
                    transparent 100%
                );
            }
            .line {
                flex-shrink: 0;
                border: none;
                padding: 0;
                margin: 0;
            }
            .line.highlight {
                background: rgb(255 255 255 / 6.9%);
            }
            .line.shadow {
                background: rgb(0 0 0 / 32%);
            }
            :host([orientation='horizontal']) .line {
                width: 100%;
                height: 1px;
            }
            :host([orientation='vertical']) .line {
                width: 1px;
                height: 100%;
                min-height: 2rem;
                align-self: stretch;
            }
        `,
    ];

    render() {
        return html`
            <div class="groove" part="groove" aria-hidden="true">
                ${
                    this.thickness === 'thick'
                        ? html`<div class="line shadow" part="shadow"></div>`
                        : nothing
                }
                <div class="line highlight" part="highlight"></div>
            </div>
        `;
    }
}
