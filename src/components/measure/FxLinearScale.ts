import { html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxScaleElement } from '../base/FxScaleElement';

@customElement('fx-linear-scale')
export class FxLinearScale extends FxScaleElement {
    @property({ type: Number }) value = 0;
    @property({ type: Number, attribute: 'sub-divisions' }) subDivisions = 5;
    @property({ type: String }) side = 'left';
    @property({ type: String, reflect: true }) orientation = 'vertical';

    @property({ type: Number, attribute: 'start-offset' }) startOffset = 140;
    @property({ type: Number, attribute: 'end-offset' }) endOffset = 0;
    @property({ type: Number, attribute: 'view-box-width' }) viewBoxWidth = 20;
    @property({ type: Number, attribute: 'view-box-height' }) viewBoxHeight = 140;
    @property({ type: String, attribute: 'preserve-aspect-ratio' }) preserveAspectRatio = 'xMidYMid meet';

    @property({ type: Boolean, attribute: 'show-connecting-line' }) showConnectingLine = false;
    @property({ attribute: 'track-thickness' }) trackThickness: string | number = 'medium';
    @property({ type: String }) caption = '';
    @property({ type: Number }) spacing = 0;
    
    @property({ type: Number, attribute: 'caption-offset' }) captionOffset = 8;

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
        }
        svg {
            width: 100%;
            height: 100%;
            overflow: visible;
        }
    `;

    private get colors() {
        return {
            ticks: 'var(--fx-linear-scale-color, #475569)',
            label: 'var(--fx-linear-scale-label-color, var(--fx-gauge-text-secondary, #94a3b8))'
        };
    }

    private get activeSide(): string {
        const { side, orientation } = this;
        return orientation === 'horizontal' 
            ? (side === 'left' ? 'top' : (side === 'right' ? 'bottom' : side))
            : side;
    }

    private get thicknessValue(): number {
        const val = String(this.trackThickness).trim();

        switch (val) {
            case 'large': {
                return 15;
            }
            case 'medium': {
                return 10;
            }
            case 'small': {
                return 5;
            }
            default: {
                if (/^\d+$/.test(val)) {
                    return parseInt(val, 10);
                } else {
                    return 10;
                }
            }
        }
    }

    private *renderVerticalConnectingLine() {
        const { startOffset, endOffset, side, viewBoxWidth, spacing } = this;
        const color = this.colors.ticks;
        const mid = viewBoxWidth / 2;
        const offset = this.thicknessValue / 2;

        if (side === 'left' || side === 'both') {
            const x = mid - offset - spacing;
            yield svg`<line x1="${x}" y1="${startOffset}" x2="${x}" y2="${endOffset}" stroke="${color}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;
        }
        if (side === 'right' || side === 'both') {
            const x = mid + offset + spacing;
            yield svg`<line x1="${x}" y1="${startOffset}" x2="${x}" y2="${endOffset}" stroke="${color}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;
        }
    }

    private *renderHorizontalConnectingLine() {
        const { startOffset, endOffset, viewBoxHeight, spacing } = this;
        const color = this.colors.ticks;
        const active = this.activeSide;
        const mid = viewBoxHeight / 2;
        const offset = this.thicknessValue / 2;

        if (active === 'top' || active === 'both') {
            const y = mid - offset - spacing;
            yield svg`<line x1="${startOffset}" y1="${y}" x2="${endOffset}" y2="${y}" stroke="${color}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;
        }
        if (active === 'bottom' || active === 'both') {
            const y = mid + offset + spacing;
            yield svg`<line x1="${startOffset}" y1="${y}" x2="${endOffset}" y2="${y}" stroke="${color}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;
        }
    }

    private *renderConnectingLines() {
        if (this.showConnectingLine) {
            if (this.orientation !== 'horizontal') {
                yield* this.renderVerticalConnectingLine();
            } else {
                yield* this.renderHorizontalConnectingLine();
            }
        }
    }

    private *renderLeftTick(y: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { ticks: tickColor, label: labelColor } = this.colors;
        const { viewBoxWidth, spacing } = this;
        const mid = viewBoxWidth / 2;
        const offset = this.thicknessValue / 2;
        const length = isMajor ? 10 : (isMedium ? 7 : 5);
        const x2 = mid - offset - spacing;
        const x1 = x2 - length;

        yield svg`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${tickColor}" stroke-width="${isMajor ? '1.2' : (isMedium ? '0.9' : '0.6')}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;

        if (isMajor && this.showLabels) {
            const lx = this.getVerticalLeftLabelX();
            yield svg`<text x="${lx}" y="${y}" fill="${labelColor}" font-size="${this.labelFontSize}" font-family="var(--fx-font-family, sans-serif)" font-weight="600" text-anchor="end" dominant-baseline="middle">${this.resolveLabel(tickValue)}</text>`;
        }
    }

    private *renderRightTick(y: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { ticks: tickColor, label: labelColor } = this.colors;
        const { viewBoxWidth, spacing } = this;
        const mid = viewBoxWidth / 2;
        const offset = this.thicknessValue / 2;
        const length = isMajor ? 10 : (isMedium ? 7 : 5);
        const x1 = mid + offset + spacing;
        const x2 = x1 + length;

        yield svg`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${tickColor}" stroke-width="${isMajor ? '1.2' : (isMedium ? '0.9' : '0.6')}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;

        if (isMajor && this.showLabels) {
            const lx = this.getVerticalRightLabelX();
            yield svg`<text x="${lx}" y="${y}" fill="${labelColor}" font-size="${this.labelFontSize}" font-family="var(--fx-font-family, sans-serif)" font-weight="600" text-anchor="start" dominant-baseline="middle">${this.resolveLabel(tickValue)}</text>`;
        }
    }

    private get labelFontSize() {
        return 'var(--fx-linear-scale-label-font-size, 3.2px)';
    }

    private getVerticalLeftLabelX(): number {
        const { viewBoxWidth, spacing, thicknessValue } = this;
        const mid = viewBoxWidth / 2;
        const offset = thicknessValue / 2;
        const majorLength = 10;
        const labelGap = 4;
        const x2 = mid - offset - spacing;
        return x2 - majorLength - labelGap;
    }

    private getVerticalRightLabelX(): number {
        const { viewBoxWidth, spacing, thicknessValue } = this;
        const mid = viewBoxWidth / 2;
        const offset = thicknessValue / 2;
        const majorLength = 10;
        const labelGap = 4;
        const x1 = mid + offset + spacing;
        return x1 + majorLength + labelGap;
    }

    private getHorizontalTopLabelY(): number {
        const { viewBoxHeight, spacing, thicknessValue } = this;
        const mid = viewBoxHeight / 2;
        const offset = thicknessValue / 2;
        const majorLength = 10;
        const y2 = mid - offset - spacing;
        return y2 - majorLength - 7;
    }

    private getHorizontalBottomLabelY(): number {
        const { viewBoxHeight, spacing, thicknessValue } = this;
        const mid = viewBoxHeight / 2;
        const offset = thicknessValue / 2;
        const majorLength = 10;
        const y1 = mid + offset + spacing;
        return y1 + majorLength + 7;
    }

    private *renderTopTick(x: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { ticks: tickColor, label: labelColor } = this.colors;
        const { viewBoxHeight, spacing } = this;
        const mid = viewBoxHeight / 2;
        const offset = this.thicknessValue / 2;
        const length = isMajor ? 10 : (isMedium ? 7 : 5);
        const y2 = mid - offset - spacing;
        const y1 = y2 - length;

        yield svg`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${tickColor}" stroke-width="${isMajor ? '1.2' : (isMedium ? '0.9' : '0.6')}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;

        if (isMajor && this.showLabels) {
            const ly = this.getHorizontalTopLabelY();
            yield svg`<text x="${x}" y="${ly}" fill="${labelColor}" font-size="${this.labelFontSize}" font-family="var(--fx-font-family, sans-serif)" font-weight="600" text-anchor="middle" dominant-baseline="middle">${this.resolveLabel(tickValue)}</text>`;
        }
    }

    private *renderBottomTick(x: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { ticks: tickColor, label: labelColor } = this.colors;
        const { viewBoxHeight, spacing } = this;
        const mid = viewBoxHeight / 2;
        const offset = this.thicknessValue / 2;
        const length = isMajor ? 10 : (isMedium ? 7 : 5);
        const y1 = mid + offset + spacing;
        const y2 = y1 + length;

        yield svg`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${tickColor}" stroke-width="${isMajor ? '1.2' : (isMedium ? '0.9' : '0.6')}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;

        if (isMajor && this.showLabels) {
            const ly = this.getHorizontalBottomLabelY();
            yield svg`<text x="${x}" y="${ly}" fill="${labelColor}" font-size="${this.labelFontSize}" font-family="var(--fx-font-family, sans-serif)" font-weight="600" text-anchor="middle" dominant-baseline="middle">${this.resolveLabel(tickValue)}</text>`;
        }
    }

    private *renderVerticalTicks(progressFraction: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { startOffset, endOffset, side } = this;
        const y = startOffset + progressFraction * (endOffset - startOffset);

        if (side === 'left' || side === 'both') {
            yield* this.renderLeftTick(y, tickValue, isMajor, isMedium);
        }
        if (side === 'right' || side === 'both') {
            yield* this.renderRightTick(y, tickValue, isMajor, isMedium);
        }
    }

    private *renderHorizontalTicks(progressFraction: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { startOffset, endOffset } = this;
        const x = startOffset + progressFraction * (endOffset - startOffset);
        const active = this.activeSide;

        if (active === 'top' || active === 'both') {
            yield* this.renderTopTick(x, tickValue, isMajor, isMedium);
        }
        if (active === 'bottom' || active === 'both') {
            yield* this.renderBottomTick(x, tickValue, isMajor, isMedium);
        }
    }

    private *renderTicks() {
        const { count, subDivisions, min, max, orientation } = this;
        const totalIntervals = count * subDivisions;
        const isHorizontal = orientation === 'horizontal';

        for (let i = 0; i <= totalIntervals; i++) {
            const isMajor = i % subDivisions === 0;
            const isMedium = !isMajor && subDivisions % 2 === 0 && (i % subDivisions) === (subDivisions / 2);
            const progressFraction = i / totalIntervals;
            const tickValue = min + progressFraction * (max - min);

            if (!isHorizontal) {
                yield* this.renderVerticalTicks(progressFraction, tickValue, isMajor, isMedium);
            } else {
                yield* this.renderHorizontalTicks(progressFraction, tickValue, isMajor, isMedium);
            }
        }
    }

    private *renderCaption() {
        if (this.caption) {
            const { orientation, side, viewBoxWidth, viewBoxHeight, startOffset, endOffset, captionOffset } = this;
            const isHorizontal = orientation === 'horizontal';
            const color = this.colors.label;
            const fontSize = this.labelFontSize;
            const fontFamily = 'var(--fx-font-family, sans-serif)';
            const fontWeight = '800';

            if (!isHorizontal) {
                const y = Math.min(startOffset, endOffset) - captionOffset;

                if (side === 'left') {
                    const x = this.getVerticalLeftLabelX();
                    yield svg`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" font-family="${fontFamily}" font-weight="${fontWeight}" text-anchor="end" dominant-baseline="middle">${this.caption}</text>`;
                } else if (side === 'right') {
                    const x = this.getVerticalRightLabelX();
                    yield svg`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" font-family="${fontFamily}" font-weight="${fontWeight}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`;
                } else {
                    const mid = viewBoxWidth / 2;
                    yield svg`<text x="${mid}" y="${y}" fill="${color}" font-size="${fontSize}" font-family="${fontFamily}" font-weight="${fontWeight}" text-anchor="middle" dominant-baseline="middle">${this.caption}</text>`;
                }
            } else {
                const x = Math.max(startOffset, endOffset) + captionOffset;
                const active = this.activeSide;

                if (active === 'top') {
                    const y = this.getHorizontalTopLabelY();
                    yield svg`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" font-family="${fontFamily}" font-weight="${fontWeight}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`;
                } else if (active === 'bottom') {
                    const y = this.getHorizontalBottomLabelY();
                    yield svg`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" font-family="${fontFamily}" font-weight="${fontWeight}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`;
                } else {
                    const mid = viewBoxHeight / 2;
                    yield svg`<text x="${x}" y="${mid}" fill="${color}" font-size="${fontSize}" font-family="${fontFamily}" font-weight="${fontWeight}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`;
                }
            }
        }
    }

    private *renderSvgTicks() {
        yield* this.renderConnectingLines();
        yield* this.renderTicks();
        yield* this.renderCaption();
    }

    render() {
        const { viewBoxWidth, viewBoxHeight, preserveAspectRatio } = this;
        return html`
            <svg viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" preserveAspectRatio="${preserveAspectRatio}">
                ${this.renderSvgTicks()}
            </svg>
        `;
    }
}
