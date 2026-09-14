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
        :host([orientation='horizontal']) {
            width: auto;
        }
        .inner {
            display: flex;
            flex: 1;
            box-sizing: border-box;
            min-width: 0;
            min-height: 0;
        }
        :host([orientation='vertical']) .inner {
            flex-direction: column;
            width: 100%;
        }
        :host([orientation='horizontal']) .inner {
            flex-direction: row;
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
        })
            .filter(([_, value]) => !isNil(value) && value !== '')
            .map(([prop, value]) => `${prop}: ${value};`);
    }

    render() {
        const { alignItems, justifyContent } = this.contentFlexAlign(this.flexDirection);
        const padding = this.padding.trim();
        return html`
            <style>
                :host {
                    ${this.extraStyles.join(' ')}
                }
                .inner {
                    gap: ${this.spacing};
                    align-items: ${alignItems};
                    justify-content: ${justifyContent};
                    ${padding ? `padding: ${padding};` : ''}
                }
            </style>
            <div class="inner">
                <slot></slot>
            </div>
        `;
    }
}
