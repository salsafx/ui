import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';

@customElement('fx-potentiometer-knob-rect')
export class FxPotentiometerKnobRect extends Animatable(FxElement) {
    @property({ type: Number }) angle = 0;
    @property({ type: Number }) value = 0;
    @property({ type: Number }) progress = 0;
    @property({ type: Boolean, attribute: 'is-dragging', reflect: true }) isDragging = false;

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
            overflow: visible;
            pointer-events: none;
        }
        .knob-rect {
            transition: none;
        }
        :host([is-animated]) .knob-rect:not([data-dragging="true"]) {
            transition: transform 0.3s cubic-bezier(0.1, 1, 0.1, 1);
        }
    `;

    render() {
        const cx = 50, cy = 50;

        const bodyW = 14;
        const bodyH = 26;
        const bodyY = -6; 
        const rx = 3;

        const tipY = -28;
        const arrowStartY = -2;

        return html`
            <svg viewBox="-4 -4 108 108">
                <defs>

                    <radialGradient id="fx-rect-knob-body" cx="30%" cy="25%" r="75%">
                        <stop offset="0%" stop-color="#4b5563"/>
                        <stop offset="15%" stop-color="#2d3748"/>
                        <stop offset="70%" stop-color="#1a202c"/>
                        <stop offset="100%" stop-color="#0f141d"/>
                    </radialGradient>

                    <linearGradient id="fx-rect-bevel-light" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#718096"/>
                        <stop offset="100%" stop-color="#1a202c"/>
                    </linearGradient>

                    <radialGradient id="fx-rect-shadow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="rgba(0, 0, 0, 0.4)"/>
                        <stop offset="80%" stop-color="rgba(0, 0, 0, 0.15)"/>
                        <stop offset="100%" stop-color="rgba(0, 0, 0, 0)"/>
                    </radialGradient>

                    <radialGradient id="fx-screw-grad" cx="40%" cy="40%" r="60%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="45%" stop-color="#cbd5e0"/>
                        <stop offset="80%" stop-color="#718096"/>
                        <stop offset="100%" stop-color="#4a5568"/>
                    </radialGradient>
                </defs>

                <g
                    class="knob-rect"
                    data-dragging="${this.isDragging}"
                    style="transform: translate(${cx}px, ${cy}px) rotate(${this.angle}deg);"
                >

                    <g transform="translate(1.5, 2.5)">

                        <rect x="${-bodyW/2}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="${rx}" fill="url(#fx-rect-shadow)" opacity="0.8"/>

                        <polygon points="0,${tipY} ${-bodyW/2 + 2},${arrowStartY} ${bodyW/2 - 2},${arrowStartY}" fill="url(#fx-rect-shadow)" opacity="0.6"/>
                    </g>

                    <polygon
                        points="0,${tipY - 0.8} ${-bodyW/2 - 0.8},${arrowStartY} ${-bodyW/2 - 0.8},${bodyY + bodyH + 0.8} ${bodyW/2 + 0.8},${bodyY + bodyH + 0.8} ${bodyW/2 + 0.8},${arrowStartY}"
                        fill="url(#fx-rect-bevel-light)"
                    />

                    <polygon
                        points="0,${tipY} ${-bodyW/2},${arrowStartY} ${bodyW/2},${arrowStartY}"
                        fill="url(#fx-rect-knob-body)"
                    />

                    <rect
                        x="${-bodyW/2}"
                        y="${bodyY}"
                        width="${bodyW}"
                        height="${bodyH}"
                        rx="${rx}"
                        fill="url(#fx-rect-knob-body)"
                    />

                    <polygon
                        points="0,${tipY + 1} ${-bodyW/2 + 1.5},${arrowStartY} 0,${arrowStartY}"
                        fill="rgba(255, 255, 255, 0.08)"
                    />

                    <polygon
                        points="0,${tipY + 1} ${bodyW/2 - 1.5},${arrowStartY} 0,${arrowStartY}"
                        fill="rgba(0, 0, 0, 0.2)"
                    />

                    <path
                        d="M ${-bodyW/2 + 1.2} ${bodyY + 2} L ${-bodyW/2 + 1.2} ${bodyY + bodyH - 2}"
                        stroke="rgba(255, 255, 255, 0.12)"
                        stroke-width="0.8"
                        stroke-linecap="round"
                    />

                    <line
                        x1="0"
                        y1="1"
                        x2="0"
                        y2="${tipY + 1.5}"
                        stroke="#ffffff"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.4))"
                    />

                    <g transform="translate(0, 10)">

                        <circle cx="0" cy="0" r="3.2" fill="#0f141d" stroke="#4a5568" stroke-width="0.5"/>

                        <circle cx="0" cy="0" r="2.4" fill="url(#fx-screw-grad)" stroke="#1a202c" stroke-width="0.3"/>

                        <line x1="-1.5" y1="-0.8" x2="1.5" y2="0.8" stroke="#2d3748" stroke-width="0.6" stroke-linecap="round"/>
                        <line x1="-1.5" y1="-0.8" x2="1.5" y2="0.8" stroke="#ffffff" stroke-width="0.3" stroke-linecap="round" opacity="0.6"/>
                    </g>
                </g>
            </svg>
        `;
    }
}
