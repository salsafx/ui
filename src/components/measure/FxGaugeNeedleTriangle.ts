import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxGaugeNeedleElement } from '../base/FxGaugeNeedleElement';

@customElement('fx-gauge-needle-triangle')
export class FxGaugeNeedleTriangle extends FxGaugeNeedleElement {
    @property({ type: Number }) thickness = 2.5;

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

        const tipY = centerY - radius; 

        const leftX = centerX - thickness;
        const rightX = centerX + thickness;
        const baseY = centerY;

        const pathData = `M ${leftX} ${baseY} L ${centerX} ${tipY} L ${rightX} ${baseY} Z`;

        return html`
            <svg viewBox="-4 -4 108 108">
                <defs>
                    <linearGradient id="fx-needle-default-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="var(--fx-gauge-needle-gradient-start, #ef4444)" />
                        <stop offset="100%" stop-color="var(--fx-gauge-needle-gradient-end, #f97316)" />
                    </linearGradient>
                </defs>
                <g style="transform: rotate(${angle}deg); transform-origin: ${centerX}px ${centerY}px; transition: var(--fx-gauge-transition, none);">
                    <path
                        d="${pathData}"
                        fill="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                        stroke="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                        stroke-width="0.5"
                        stroke-linejoin="round"
                    />
                    <circle
                        cx="${centerX}" cy="${centerY}" r="4"
                        fill="var(--fx-gauge-text-primary, #111827)"
                        stroke="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                        stroke-width="1"
                    />
                    <circle
                        cx="${centerX}" cy="${centerY}" r="1.5"
                        fill="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                    />
                </g>
            </svg>
        `;
    }
}
