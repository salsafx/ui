import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';

@customElement('fx-fader-thumb-fader')
export class FxFaderThumbFader extends Animatable(FxElement) {
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
            .fader-cap {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border: 1px solid #111827;
                border-radius: 4px;
                position: relative;
                overflow: hidden;
                box-shadow: 
                    0 4px 6px -1px rgba(0, 0, 0, 0.4), 
                    0 2px 4px -1px rgba(0, 0, 0, 0.3), 
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.4);
                cursor: grab;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            :host([is-dragging]) .fader-cap {
                cursor: grabbing;
                border-color: var(--fx-fader-theme-color, #3b82f6);
                box-shadow: 
                    0 6px 10px rgba(0, 0, 0, 0.5), 
                    0 2px 5px rgba(0, 0, 0, 0.3), 
                    inset 0 1px 0 rgba(255, 255, 255, 0.25),
                    0 0 4px var(--fx-fader-theme-color, rgba(59, 130, 246, 0.4));
            }

                        :host([orientation="vertical"]) .fader-cap {
                            background: linear-gradient(
                                to bottom,
                                rgba(75, 85, 99, 0.95) 0%,
                                rgba(55, 65, 81, 0.95) 8%,
                                rgba(31, 41, 55, 0.95) 25%,
                                rgba(17, 24, 39, 0.95) 48%,
                                rgba(17, 24, 39, 0.95) 52%,
                                rgba(31, 41, 55, 0.95) 75%,
                                rgba(55, 65, 81, 0.95) 92%,
                                rgba(75, 85, 99, 0.95) 100%
                            );
                        }

                        :host([orientation="horizontal"]) .fader-cap {
                            background: linear-gradient(
                                to right,
                                rgba(75, 85, 99, 0.95) 0%,
                                rgba(55, 65, 81, 0.95) 8%,
                                rgba(31, 41, 55, 0.95) 25%,
                                rgba(17, 24, 39, 0.95) 48%,
                                rgba(17, 24, 39, 0.95) 52%,
                                rgba(31, 41, 55, 0.95) 75%,
                                rgba(55, 65, 81, 0.95) 92%,
                                rgba(75, 85, 99, 0.95) 100%
                            );
                        }

            .bevel-overlay {
                position: absolute;
                inset: 1px;
                border-radius: 3px;
                pointer-events: none;
            }

            :host([orientation="vertical"]) .bevel-overlay {
                background: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0.12) 0%,
                    rgba(255, 255, 255, 0.05) 15%,
                    rgba(0, 0, 0, 0.15) 45%,
                    rgba(0, 0, 0, 0.4) 50%,
                    rgba(0, 0, 0, 0.15) 55%,
                    rgba(255, 255, 255, 0.05) 85%,
                    rgba(255, 255, 255, 0.12) 100%
                );
            }

            :host([orientation="horizontal"]) .bevel-overlay {
                background: linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.12) 0%,
                    rgba(255, 255, 255, 0.05) 15%,
                    rgba(0, 0, 0, 0.15) 45%,
                    rgba(0, 0, 0, 0.4) 50%,
                    rgba(0, 0, 0, 0.15) 55%,
                    rgba(255, 255, 255, 0.05) 85%,
                    rgba(255, 255, 255, 0.12) 100%
                );
            }

            .center-groove {
                position: absolute;
                background-color: #090d16;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.8);
            }

            :host([orientation="vertical"]) .center-groove {
                left: 0;
                right: 0;
                top: 50%;
                height: 4px;
                transform: translateY(-50%);
                border-top: 1px solid rgba(0, 0, 0, 0.5);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }

            :host([orientation="horizontal"]) .center-groove {
                top: 0;
                bottom: 0;
                left: 50%;
                width: 4px;
                transform: translateX(-50%);
                border-left: 1px solid rgba(0, 0, 0, 0.5);
                border-right: 1px solid rgba(255, 255, 255, 0.05);
            }

            .indicator-line {
                position: absolute;
                background-color: var(--fx-fader-theme-color, #ef4444);
                box-shadow: 
                    0 0 2px var(--fx-fader-theme-color, #ef4444),
                    0 0 4px var(--fx-fader-theme-color, rgba(239, 68, 68, 0.5));
            }

            :host([orientation="vertical"]) .indicator-line {
                left: 0;
                right: 0;
                top: 50%;
                height: 2px;
                transform: translateY(-50%);
            }

            :host([orientation="horizontal"]) .indicator-line {
                top: 0;
                bottom: 0;
                left: 50%;
                width: 2px;
                transform: translateX(-50%);
            }

            .finger-grips {
                position: absolute;
                display: flex;
                pointer-events: none;
            }

            :host([orientation="vertical"]) .finger-grips {
                flex-direction: row;
                justify-content: space-between;
                left: 4px;
                right: 4px;
                top: 50%;
                transform: translateY(-50%);
            }

            :host([orientation="horizontal"]) .finger-grips {
                flex-direction: column;
                justify-content: space-between;
                top: 4px;
                bottom: 4px;
                left: 50%;
                transform: translateX(-50%);
            }

            .grip-mark {
                background-color: rgba(0, 0, 0, 0.35);
                box-shadow: 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.07);
            }

            :host([orientation="vertical"]) .grip-mark {
                width: 1px;
                height: 10px;
            }

            :host([orientation="horizontal"]) .grip-mark {
                height: 1px;
                width: 10px;
            }

            .silver-highlight {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.08);
                pointer-events: none;
            }

            :host([orientation="vertical"]) .silver-highlight {
                left: 1px;
                right: 1px;
                top: 1px;
                height: 35%;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
            }

            :host([orientation="horizontal"]) .silver-highlight {
                left: 1px;
                top: 1px;
                bottom: 1px;
                width: 35%;
                background: linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
            }
        `
    ];

    render() {
        return html`
            <div class="fader-cap">
                <div class="silver-highlight"></div>
                <div class="bevel-overlay"></div>
                <div class="finger-grips">
                    <div class="grip-mark"></div>
                    <div class="grip-mark"></div>
                    <div class="grip-mark"></div>
                </div>
                <div class="center-groove"></div>
                <div class="indicator-line"></div>
            </div>
        `;
    }
}
