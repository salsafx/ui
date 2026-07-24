import { html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxRadialScaleElement } from '../base/FxRadialScaleElement';

@customElement('fx-radial-simple-scale')
export class FxRadialSimpleScale extends FxRadialScaleElement {
    @property({ type: Boolean, attribute: 'show-labels' }) showLabels = false;
    @property({ type: Number, attribute: 'outer-radius' }) outerRadius = 39.5;
    @property({ type: Number, attribute: 'inner-radius' }) innerRadius = 34.5;
    @property({ type: Number, attribute: 'text-radius' }) textRadius = 31.0;
    @property({ type: Number, attribute: 'label-font-size' }) labelFontSize = 4;

    *renderTicks() {
        const { count, startAngle, arcLength, min, max, showLabels, isFullCircle } = this;
        const centerX = 50;
        const centerY = 50;
        const { outerRadius, innerRadius, textRadius, labelFontSize } = this;
        const loopCount = isFullCircle ? count - 1 : count;

        for (let i = 0; i <= loopCount; i++) {
            const angle = startAngle + (i / count) * arcLength;
            const rad = (angle * Math.PI) / 180;

            const x1 = centerX + outerRadius * Math.sin(rad);
            const y1 = centerY - outerRadius * Math.cos(rad);
            const x2 = centerX + innerRadius * Math.sin(rad);
            const y2 = centerY - innerRadius * Math.cos(rad);

            yield svg`
                <line
                    x1="${x1}" y1="${y1}"
                    x2="${x2}" y2="${y2}"
                    stroke="var(--fx-radial-scale-color, #94a3b8)"
                    stroke-width="1"
                    stroke-linecap="round"
                />
            `;

            if (showLabels) {
                const valueRange = max - min;
                const tickValue = min + (i / count) * valueRange;
                const tx = centerX + textRadius * Math.sin(rad);
                const ty = centerY - textRadius * Math.cos(rad);

                yield svg`
                    <text
                        x="${tx}"
                        y="${ty}"
                        fill="var(--fx-radial-scale-label-color, #cbd5e1)"
                        font-size="${labelFontSize}"
                        font-family="var(--fx-font-family, sans-serif)"
                        font-weight="600"
                        text-anchor="middle"
                        dominant-baseline="central"
                    >
                        ${this.resolveLabel(tickValue)}
                    </text>
                `;
            }
        }
    }

    render() {
        return html`
            <svg viewBox="-4 -4 108 108">
                ${this.renderTicks()}
            </svg>
        `;
    }
}
