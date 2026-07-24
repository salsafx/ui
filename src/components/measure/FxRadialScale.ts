import { html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxRadialScaleElement } from '../base/FxRadialScaleElement';

@customElement('fx-radial-scale')
export class FxRadialScale extends FxRadialScaleElement {
    @property({ type: Number, attribute: 'sub-divisions' }) subDivisions = 5;
    @property({ type: Number, attribute: 'outer-radius' }) outerRadius = 39.5;
    @property({ type: Number, attribute: 'major-inner-radius' }) majorInnerRadius = 32.5;
    @property({ type: Number, attribute: 'minor-inner-radius' }) minorInnerRadius = 36.0;
    @property({ type: Number, attribute: 'text-radius' }) textRadius = 28.0;
    @property({ type: Number, attribute: 'label-font-size' }) labelFontSize = 4;

    *renderTicks() {
        const {
            count, startAngle, arcLength, min, max, subDivisions, showLabels, isFullCircle,
            outerRadius, majorInnerRadius, minorInnerRadius, textRadius, labelFontSize,
        } = this;
        const centerX = 50;
        const centerY = 50;

        const totalIntervals = count * subDivisions;
        const loopCount = isFullCircle ? totalIntervals - 1 : totalIntervals;

        for (let i = 0; i <= loopCount; i++) {
            const isMajor = i % subDivisions === 0;
            const angle = startAngle + (i / totalIntervals) * arcLength;
            const rad = (angle * Math.PI) / 180;

            const currentInnerRadius = isMajor ? majorInnerRadius : minorInnerRadius;

            const x1 = centerX + outerRadius * Math.sin(rad);
            const y1 = centerY - outerRadius * Math.cos(rad);
            const x2 = centerX + currentInnerRadius * Math.sin(rad);
            const y2 = centerY - currentInnerRadius * Math.cos(rad);

            yield svg`
                <line
                    x1="${x1}" y1="${y1}"
                    x2="${x2}" y2="${y2}"
                    stroke="${isMajor ? 'var(--fx-radial-scale-color, #94a3b8)' : 'var(--fx-radial-scale-label-color, #cbd5e1)'}"
                    stroke-width="${isMajor ? '1' : '0.55'}"
                    stroke-linecap="round"
                />
            `;

            if (isMajor && showLabels) {
                const majorIndex = i / subDivisions;
                const valueRange = max - min;
                const tickValue = min + (majorIndex / count) * valueRange;

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
