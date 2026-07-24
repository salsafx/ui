import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';

@customElement('fx-fader-thumb-pointer')
export class FxFaderThumbPointer extends Animatable(FxElement) {
    @property({ type: Number, reflect: true }) value = 0;
    @property({ type: Number, reflect: true }) progress = 0;
    @property({ type: Boolean, attribute: 'is-dragging', reflect: true }) isDragging = false;
    @property({ type: String, reflect: true }) orientation = 'horizontal';
    @property({ type: String, attribute: 'ticks-side', reflect: true }) ticksSide = 'left';

    static styles = [
        themeVariables,
        css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
            .thumb-pointer {
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 40%, #e5e7eb 70%, #d1d5db 100%);
                border: 1.5px solid #9ca3af;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1), inset 0 1px 0 #ffffff;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            :host([orientation="horizontal"]) .thumb-pointer {
                border-radius: 4px 4px 12px 12px;
            }
            :host([orientation="vertical"]) .thumb-pointer {
                border-radius: 4px 12px 12px 4px;
            }

            :host([orientation="horizontal"][ticks-side="top"]) .thumb-pointer {
                border-radius: 12px 12px 4px 4px;
            }
            :host([orientation="horizontal"][ticks-side="bottom"]) .thumb-pointer {
                border-radius: 4px 4px 12px 12px;
            }

            :host([orientation="vertical"][ticks-side="left"]) .thumb-pointer {
                border-radius: 12px 4px 4px 12px;
            }
            :host([orientation="vertical"][ticks-side="right"]) .thumb-pointer {
                border-radius: 4px 12px 12px 4px;
            }

            .notch {
                position: absolute;
                width: 0;
                height: 0;
                border-style: solid;
            }

            :host([orientation="horizontal"]) .notch {
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                border-width: 6px 5px 0 5px;
                border-color: #9ca3af transparent transparent transparent;
            }
            :host([orientation="horizontal"]) .notch::after {
                content: '';
                position: absolute;
                bottom: 1.5px;
                left: -5px;
                border-width: 5px 4px 0 4px;
                border-color: #f3f4f6 transparent transparent transparent;
            }

            :host([orientation="horizontal"][ticks-side="top"]) .notch {
                top: -6px;
                bottom: auto;
                border-width: 0 5px 6px 5px;
                border-color: transparent transparent #9ca3af transparent;
            }
            :host([orientation="horizontal"][ticks-side="top"]) .notch::after {
                bottom: auto;
                top: 1.5px;
                border-width: 0 4px 5px 4px;
                border-color: transparent transparent #f3f4f6 transparent;
            }

            :host([orientation="horizontal"][ticks-side="bottom"]) .notch {
                bottom: -6px;
                top: auto;
                border-width: 6px 5px 0 5px;
                border-color: #9ca3af transparent transparent transparent;
            }
            :host([orientation="horizontal"][ticks-side="bottom"]) .notch::after {
                top: auto;
                bottom: 1.5px;
                border-width: 5px 4px 0 4px;
                border-color: #f3f4f6 transparent transparent transparent;
            }

            :host([orientation="vertical"]) .notch {
                right: -6px;
                top: 50%;
                transform: translateY(-50%);
                border-width: 5px 0 5px 6px;
                border-color: transparent transparent transparent #9ca3af;
            }
            :host([orientation="vertical"]) .notch::after {
                content: '';
                position: absolute;
                right: 1.5px;
                top: -5px;
                border-width: 4px 0 4px 5px;
                border-color: transparent transparent transparent #f3f4f6;
            }

            :host([orientation="vertical"][ticks-side="left"]) .notch {
                left: -6px;
                right: auto;
                border-width: 5px 6px 5px 0;
                border-color: transparent #9ca3af transparent transparent;
            }
            :host([orientation="vertical"][ticks-side="left"]) .notch::after {
                right: auto;
                left: 1.5px;
                border-width: 4px 5px 4px 0;
                border-color: transparent #f3f4f6 transparent transparent;
            }

            :host([orientation="vertical"][ticks-side="right"]) .notch {
                right: -6px;
                left: auto;
                border-width: 5px 0 5px 6px;
                border-color: transparent transparent transparent #9ca3af;
            }
            :host([orientation="vertical"][ticks-side="right"]) .notch::after {
                left: auto;
                right: 1.5px;
                border-width: 4px 0 4px 5px;
                border-color: transparent transparent transparent #f3f4f6;
            }

            .grip-line {
                width: 2px;
                height: 10px;
                background-color: var(--fx-fader-theme-color, #3b82f6);
                border-radius: 99px;
                opacity: 0.8;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            :host([orientation="vertical"]) .grip-line {
                width: 10px;
                height: 2px;
            }

            :host([is-dragging]) .thumb-pointer {
                border-color: var(--fx-fader-theme-color, #3b82f6);
            }

            :host([is-dragging]) .notch {
                border-color: transparent;
            }
            :host([is-dragging][orientation="horizontal"][ticks-side="top"]) .notch {
                border-bottom-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="horizontal"]) .notch {
                border-top-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="horizontal"][ticks-side="bottom"]) .notch {
                border-top-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="vertical"]) .notch {
                border-left-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="vertical"][ticks-side="left"]) .notch {
                border-right-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="vertical"][ticks-side="right"]) .notch {
                border-left-color: var(--fx-fader-theme-color, #3b82f6);
            }

            :host([is-dragging]) .grip-line {
                background-color: var(--fx-fader-theme-color, #3b82f6);
                opacity: 1;
            }

            :host([is-animated]) .thumb-pointer {
                transition: border-color 0.15s ease;
            }
            :host([is-animated]) .grip-line {
                transition: background-color 0.15s ease, height 0.15s ease, width 0.15s ease;
            }
        `
    ];

    render() {
        return html`
            <div class="thumb-pointer">
                <div class="notch"></div>
                <div class="grip-line"></div>
            </div>
        `;
    }
}
