import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';

@customElement('fx-knob')
export class FxKnob extends Animatable(FxElement) {
    @property({ type: Number }) angle = 0;

    private readonly radius = 40;

    static styles = [
        themeVariables,
        css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
            svg {
                display: block;
                width: 100%;
                height: 100%;
                overflow: visible;
                pointer-events: none;
            }
            .knob {
                fill: var(--fx-knob, #1e293b);
                stroke: var(--fx-knob-ring, #334155);
                stroke-width: 2;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
            }
            .pointer-group {
                transform-origin: center;
                transition: none;
            }
            :host([is-animated]) .pointer-group {
                transition: transform 0.32s cubic-bezier(0.1, 1, 0.1, 1);
            }
            .pointer {
                stroke: var(--fx-knob-pointer, #f8fafc);
                stroke-width: 3;
                stroke-linecap: round;
            }
        `,
    ];

    render() {
        const { radius, angle } = this;
        const size = radius * 2;
        const cx = radius;
        const cy = radius;

        return html`
            <svg viewBox="0 0 ${size} ${size}" aria-hidden="true">
                <circle class="knob" cx="${cx}" cy="${cy}" r="${radius}" />
                <g
                    class="pointer-group"
                    style="transform-origin: ${cx}px ${cy}px; transform: rotate(${angle}deg);"
                >
                    <line
                        class="pointer"
                        x1="${cx}"
                        y1="${cy - radius + 10}"
                        x2="${cx}"
                        y2="${cy - radius + 2}"
                    />
                </g>
            </svg>
        `;
    }
}
