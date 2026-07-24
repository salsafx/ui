import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';

@customElement('fx-fader-thumb-console')
export class FxFaderThumbConsole extends Animatable(FxElement) {
    @property({ type: Number, reflect: true }) value = 0;
    @property({ type: Number, reflect: true }) progress = 0;
    @property({ type: Boolean, attribute: 'is-dragging', reflect: true }) isDragging = false;
    @property({ type: String, reflect: true }) orientation = 'vertical';
    @property({ type: String, reflect: true }) theme = 'light'; 

    static styles = [
        themeVariables,
        css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }

            .console-cap {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border-radius: 4px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.15s ease, box-shadow 0.15s ease;
            }

            :host([orientation="vertical"][theme="light"]) .console-cap,
            :host([orientation="vertical"]:not([theme])) .console-cap {
                background: linear-gradient(
                    to bottom,
                    #f1f5f9 0%,
                    #e2e8f0 10%,
                    #cbd5e1 35%,
                    #94a3b8 48%,
                    #475569 50%,
                    #64748b 52%,
                    #cbd5e1 65%,
                    #e2e8f0 90%,
                    #f8fafc 100%
                );
                box-shadow: 
                    0 4px 10px rgba(0, 0, 0, 0.3),
                    0 1px 3px rgba(0, 0, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8),
                    inset 0 -1px 1px rgba(0, 0, 0, 0.2);
                border: 1px solid #94a3b8;
            }

            :host([orientation="horizontal"][theme="light"]) .console-cap,
            :host([orientation="horizontal"]:not([theme])) .console-cap {
                background: linear-gradient(
                    to right,
                    #f1f5f9 0%,
                    #e2e8f0 10%,
                    #cbd5e1 35%,
                    #94a3b8 48%,
                    #475569 50%,
                    #64748b 52%,
                    #cbd5e1 65%,
                    #e2e8f0 90%,
                    #f8fafc 100%
                );
                box-shadow: 
                    0 4px 10px rgba(0, 0, 0, 0.3),
                    0 1px 3px rgba(0, 0, 0, 0.15),
                    inset 1px 0 0 rgba(255, 255, 255, 0.8),
                    inset -1px 0 1px rgba(0, 0, 0, 0.2);
                border: 1px solid #94a3b8;
            }

            :host([orientation="vertical"][theme="dark"]) .console-cap {
                background: linear-gradient(
                    to bottom,
                    #2a2a2a 0%,
                    #1e1e1e 10%,
                    #121212 35%,
                    #0a0a0a 48%,
                    #000000 50%,
                    #0a0a0a 52%,
                    #121212 65%,
                    #1e1e1e 90%,
                    #2a2a2a 100%
                );
                box-shadow: 
                    0 4px 10px rgba(0, 0, 0, 0.7),
                    0 1px 3px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.08),
                    inset 0 -1px 1px rgba(0, 0, 0, 0.8);
                border: 1px solid #0a0a0a;
            }

            :host([orientation="horizontal"][theme="dark"]) .console-cap {
                background: linear-gradient(
                    to right,
                    #2a2a2a 0%,
                    #1e1e1e 10%,
                    #121212 35%,
                    #0a0a0a 48%,
                    #000000 50%,
                    #0a0a0a 52%,
                    #121212 65%,
                    #1e1e1e 90%,
                    #2a2a2a 100%
                );
                box-shadow: 
                    0 4px 10px rgba(0, 0, 0, 0.7),
                    0 1px 3px rgba(0, 0, 0, 0.5),
                    inset 1px 0 0 rgba(255, 255, 255, 0.08),
                    inset -1px 0 1px rgba(0, 0, 0, 0.8);
                border: 1px solid #0a0a0a;
            }

            .metallic-sheen {
                position: absolute;
                inset: 0;
                border-radius: 3px;
                pointer-events: none;
            }

            :host([orientation="vertical"]) .metallic-sheen {
                background: linear-gradient(
                    to right,
                    rgba(0, 0, 0, 0.15) 0%,
                    rgba(255, 255, 255, 0.4) 4%,
                    rgba(255, 255, 255, 0.0) 25%,
                    rgba(0, 0, 0, 0.0) 50%,
                    rgba(0, 0, 0, 0.0) 75%,
                    rgba(255, 255, 255, 0.2) 96%,
                    rgba(0, 0, 0, 0.25) 100%
                );
            }

            :host([orientation="horizontal"]) .metallic-sheen {
                background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.15) 0%,
                    rgba(255, 255, 255, 0.4) 4%,
                    rgba(255, 255, 255, 0.0) 25%,
                    rgba(0, 0, 0, 0.0) 50%,
                    rgba(0, 0, 0, 0.0) 75%,
                    rgba(255, 255, 255, 0.2) 96%,
                    rgba(0, 0, 0, 0.25) 100%
                );
            }

            .grooves {
                position: absolute;
                display: flex;
                pointer-events: none;
            }

            :host([orientation="vertical"]) .grooves {
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                flex-direction: column;
                justify-content: space-evenly;
                padding: 4px 0;
                box-sizing: border-box;
            }

            :host([orientation="horizontal"]) .grooves {
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                flex-direction: row;
                justify-content: space-evenly;
                padding: 0 4px;
                box-sizing: border-box;
            }

            .groove {
                background: rgba(0, 0, 0, 0.25);
                border-bottom: 1px solid rgba(255, 255, 255, 0.4);
            }

            :host([orientation="vertical"]) .groove {
                width: 100%;
                height: 1px;
            }

            :host([orientation="horizontal"]) .groove {
                height: 100%;
                width: 1px;
            }

            :host([theme="light"]) .center-line,
            :host(:not([theme])) .center-line {
                position: absolute;
                z-index: 5;
                background: #020617;
                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
            }

            :host([theme="dark"]) .center-line {
                position: absolute;
                z-index: 5;
                background: #000000;
                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.15);
            }

            :host([orientation="vertical"]) .center-line {
                width: 100%;
                height: 2px;
                top: 50%;
                transform: translateY(-50%);
            }

            :host([orientation="horizontal"]) .center-line {
                width: 2px;
                height: 100%;
                left: 50%;
                transform: translateX(-50%);
            }

            :host([is-dragging]) .console-cap {
                transform: scale(0.97);
                box-shadow: 
                    0 2px 6px rgba(0, 0, 0, 0.4),
                    inset 0 1px 1px rgba(255, 255, 255, 0.4);
            }
        `
    ];

    render() {
        return html`
            <div class="console-cap">
                <div class="metallic-sheen"></div>
                <div class="grooves">
                    <div class="groove"></div>
                    <div class="groove"></div>
                    <div class="groove"></div>
                    <div class="groove"></div>
                </div>
                <div class="center-line"></div>
            </div>
        `;
    }
}
