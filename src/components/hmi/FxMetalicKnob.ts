import { html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { Guid } from '../base/FxCore';

@customElement('fx-metalic-knob')
export class FxMetalicKnob extends Animatable(FxElement) {
    private readonly guid = `fx-met-${Guid.newGuid()}`;

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
        .face-group {
            transition: none;
        }
        :host([is-animated]) .face-group:not([data-dragging="true"]) {
            transition: transform 0.3s cubic-bezier(0.1, 1, 0.1, 1);
        }
    `;

    private renderBrushStops() {
        const stops = [];
        const bands = 36;
        const tones = ['#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8', '#e2e8f0', '#64748b'];
        for (let i = 0; i <= bands; i++) {
            const t = i / bands;
            stops.push(svg`
                <stop
                    offset="${(t * 100).toFixed(2)}%"
                    stop-color="${tones[i % tones.length]}"
                />
            `);
        }
        return stops;
    }

    render() {
        const { guid: id, angle, isDragging } = this;
        const cx = 50;
        const cy = 50;
        const outerR = 22;
        const gutterR = 18.2;
        const faceR = 17.2;
        const tickOuter = faceR - 2.2;
        const tickInner = faceR - 7;

        return html`
            <svg viewBox="-4 -4 108 108" aria-hidden="true">
                <defs>
                    <filter id="${id}-shadow" x="-40%" y="-40%" width="180%" height="180%">
                        <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.35" />
                    </filter>
                    <radialGradient id="${id}-ring" cx="32%" cy="28%" r="72%">
                        <stop offset="0%" stop-color="#ffffff" />
                        <stop offset="28%" stop-color="#d7dbe0" />
                        <stop offset="58%" stop-color="#8b929a" />
                        <stop offset="82%" stop-color="#c5CAD1" />
                        <stop offset="100%" stop-color="#6b7280" />
                    </radialGradient>
                    <radialGradient id="${id}-ring-inner" cx="68%" cy="72%" r="70%">
                        <stop offset="0%" stop-color="#4b5563" stop-opacity="0.55" />
                        <stop offset="55%" stop-color="#9ca3af" stop-opacity="0.15" />
                        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                    </radialGradient>
                    <conicGradient id="${id}-brush" cx="50%" cy="50%">
                        ${this.renderBrushStops()}
                    </conicGradient>
                </defs>

                <g filter="url(#${id}-shadow)">
                    <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="url(#${id}-ring)" />
                    <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="url(#${id}-ring-inner)" />
                    <circle
                        cx="${cx}"
                        cy="${cy}"
                        r="${outerR - 0.7}"
                        fill="none"
                        stroke="rgba(255,255,255,0.35)"
                        stroke-width="0.9"
                    />
                    <circle
                        cx="${cx}"
                        cy="${cy}"
                        r="${gutterR + 0.35}"
                        fill="none"
                        stroke="rgba(15,23,42,0.45)"
                        stroke-width="1.1"
                    />
                    <circle cx="${cx}" cy="${cy}" r="${gutterR}" fill="#94a3b8" />

                    <g
                        class="face-group"
                        data-dragging="${isDragging}"
                        style="transform-origin: ${cx}px ${cy}px; transform: rotate(${angle}deg);"
                    >
                        <circle cx="${cx}" cy="${cy}" r="${faceR}" fill="url(#${id}-brush)" />
                        <circle
                            cx="${cx}"
                            cy="${cy}"
                            r="${faceR - 0.4}"
                            fill="none"
                            stroke="rgba(15,23,42,0.2)"
                            stroke-width="0.7"
                        />
                        <line
                            x1="${cx}"
                            y1="${cy - tickInner}"
                            x2="${cx}"
                            y2="${cy - tickOuter}"
                            stroke="var(--fx-metalic-knob-pointer, #0f172a)"
                            stroke-width="2.4"
                            stroke-linecap="round"
                        />
                    </g>
                </g>
            </svg>
        `;
    }
}
