import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxGaugeNeedleElement } from '../base/FxGaugeNeedleElement';

@customElement('fx-gauge-needle')
export class FxGaugeNeedle extends FxGaugeNeedleElement {
    @property({ type: Number }) thickness = 2;

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    `;

    render() {
        const { displayAngle: angle, thickness } = this;

        const centerX = 50;
        const centerY = 50;
        const radius = 37.5;
        const y2 = centerY - radius;

        return html`
            <svg viewBox="-4 -4 108 108">
                <defs>
                    <linearGradient 
                        id="fx-needle-default-gradient" 
                        x1="0" y1="${centerY}" 
                        x2="0" y2="${y2}" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stop-color="var(--fx-gauge-needle-gradient-start, #ef4444)" />
                        <stop offset="100%" stop-color="var(--fx-gauge-needle-gradient-end, #f97316)" />
                    </linearGradient>
                </defs>
                <g style="transform: rotate(${angle}deg); transform-origin: ${centerX}px ${centerY}px; transition: var(--fx-gauge-transition, none);">
                    <line
                        x1="${centerX}" y1="${centerY}"
                        x2="${centerX}" y2="${y2}"
                        stroke="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                        stroke-width="${thickness}"
                        stroke-linecap="round"
                    />
                    <circle
                        cx="${centerX}" cy="${centerY}" r="3"
                        fill="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                    />
                </g>
            </svg>
        `;
    }
}
