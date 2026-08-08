import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { isNil } from '../base/FxCore';
import { FxContentElement, type ContentFlexDirection } from '../base/FxContentElement';

@customElement('fx-stack-panel')
export class FxStackPanel extends FxContentElement {
    @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' =
        'vertical';
    @property({ type: String }) spacing = '0px';
    @property({ type: String }) width = '';
    @property({ type: String }) height = '';

    static styles = css`
        :host {
            display: flex;
            box-sizing: border-box;
            width: 100%;
        }
        :host([orientation='vertical']) {
            flex-direction: column;
        }
        :host([orientation='horizontal']) {
            flex-direction: row;
            width: auto;
        }
    `;

    private get flexDirection(): ContentFlexDirection {
        if (this.orientation === 'horizontal') {
            return 'row';
        } else {
            return 'column';
        }
    }

    get extraStyles() {
        return Object.entries({
            width: this.width,
            height: this.height,
            padding: this.padding,
        })
            .filter(([_, value]) => !isNil(value) && value !== '')
            .map(([prop, value]) => `${prop}: ${value};`);
    }

    render() {
        const { alignItems, justifyContent } = this.contentFlexAlign(this.flexDirection);
        return html`
            <style>
                :host {
                    gap: ${this.spacing};
                    align-items: ${alignItems};
                    justify-content: ${justifyContent};
                    ${this.extraStyles.join(' ')}
                }
            </style>
            <slot></slot>
        `;
    }
}
