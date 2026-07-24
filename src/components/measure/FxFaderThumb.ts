import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';

@customElement('fx-fader-thumb')
export class FxFaderThumb extends Animatable(FxElement) {
    @property({ type: Number, reflect: true }) value = 0;
    @property({ type: Number, reflect: true }) progress = 0;
    @property({ type: Boolean, attribute: 'is-dragging', reflect: true }) isDragging = false;
    @property({ type: String, reflect: true }) orientation = 'horizontal';

    static styles = [
        themeVariables,
        css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
            .thumb-inner {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: radial-gradient(circle at 35% 30%, #ffffff 0%, #f3f4f6 30%, #d1d5db 70%, #9ca3af 100%);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1), inset 0 1px 0 #ffffff;
                box-sizing: border-box;
                border: 1px solid #9ca3af;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .dot {
                width: 6px;
                height: 6px;
                background-color: var(--fx-fader-theme-color, #3b82f6);
                border-radius: 50%;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2);
            }
            :host([is-dragging]) .thumb-inner {
                border-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-animated]) .thumb-inner {
                transition: border-color 0.15s ease, transform 0.15s ease;
            }
        `
    ];

    render() {
        return html`
            <div class="thumb-inner">
                <div class="dot"></div>
            </div>
        `;
    }
}
