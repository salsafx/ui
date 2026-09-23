import { html, css, svg } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

    @property({ type: Boolean, attribute: 'has-scale-connecting-line' }) hasScaleConnectingLine = false;
    @property({ attribute: 'track-thickness' }) trackThickness: string | number = 'medium';
    @property({ type: String }) caption = '';
    @property({ type: Number }) spacing = 0;
    
    @property({ type: Number, attribute: 'caption-offset' }) captionOffset = 14;
    @property({ type: Number, attribute: 'track-center' }) trackCenter = NaN;

    @state() private viewportScale = 1;
    private resizeObserver?: ResizeObserver;

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
        text {
            font-family: var(--fx-font-family, sans-serif);
            font-weight: 400;
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(() => this.syncViewportScale());
    }

    disconnectedCallback() {
        this.resizeObserver?.disconnect();
        this.resizeObserver = undefined;
        super.disconnectedCallback();
    }

    protected firstUpdated(changed: PropertyValues) {
        super.firstUpdated(changed);
        this.resizeObserver?.observe(this);
        this.syncViewportScale();
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('viewBoxWidth') || changed.has('viewBoxHeight')) {
            this.syncViewportScale();
        }
    }

    private readLabelFontSizePx(): number {
        const raw = getComputedStyle(this).getPropertyValue('--fx-linear-scale-label-font-size').trim();
        const n = parseFloat(raw);
        return Number.isFinite(n) ? n : 9;
    }

    private syncViewportScale() {
        const rect = this.getBoundingClientRect();
        const scale = Math.min(
            rect.width / Math.max(this.viewBoxWidth, 1),
            rect.height / Math.max(this.viewBoxHeight, 1),
        );
        const next = scale > 0 && Number.isFinite(scale) ? scale : 1;
        if (Math.abs(next - this.viewportScale) > 0.001) {
            this.viewportScale = next;
        }
    }

    private pxToUserUnits(px: number): number {
        return px / Math.max(this.viewportScale, 0.001);
    }

    private get labelFontSizeUu(): number {
        return this.pxToUserUnits(this.readLabelFontSizePx());
    }

    private get captionOffsetUu(): number {
        return this.pxToUserUnits(this.captionOffset);
    }

    private get colors() {
        return {
            ticks: 'var(--fx-linear-scale-color, #475569)',
            label: 'var(--fx-linear-scale-label-color, var(--fx-gauge-text-secondary, #94a3b8))'
        };
    }

    private get tickLengths() {
        const read = (name: string, fallback: number) => {
            const raw = getComputedStyle(this).getPropertyValue(name).trim();
            const n = parseFloat(raw);
            return Number.isFinite(n) ? n : fallback;
        };
        return {
            major: read('--fx-linear-scale-major-tick', 10),
            medium: read('--fx-linear-scale-medium-tick', 7),
            minor: read('--fx-linear-scale-minor-tick', 5),
        };
    }

    private tickLength(isMajor: boolean, isMedium: boolean): number {
        const { major, medium, minor } = this.tickLengths;
        return isMajor ? major : (isMedium ? medium : minor);
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
            case 'x-large':
            case 'xlarge': {
                return 36;
            }
            case 'large': {
                return 27;
            }
            case 'medium': {
                return 18;
            }
            case 'small': {
                return 9;
            }
            default: {
                if (/^\d+$/.test(val)) {
                    return parseInt(val, 10);
                } else {
                    return 18;
                }
            }
        }
    }

    private get trackMidCross(): number {
        if (Number.isFinite(this.trackCenter)) return this.trackCenter;
        return this.orientation === 'horizontal'
            ? this.viewBoxHeight / 2
            : this.viewBoxWidth / 2;
    }

    private *renderVerticalConnectingLine() {
        const { startOffset, endOffset, side, spacing } = this;
        const color = this.colors.ticks;
        const mid = this.trackMidCross;
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
        const { startOffset, endOffset, spacing } = this;
        const color = this.colors.ticks;
        const active = this.activeSide;
        const mid = this.trackMidCross;
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
        if (this.hasScaleConnectingLine) {
            if (this.orientation !== 'horizontal') {
                yield* this.renderVerticalConnectingLine();
            } else {
                yield* this.renderHorizontalConnectingLine();
            }
        }
    }

    private *renderLeftTick(y: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { ticks: tickColor, label: labelColor } = this.colors;
        const { spacing } = this;
        const mid = this.trackMidCross;
        const offset = this.thicknessValue / 2;
        const length = this.tickLength(isMajor, isMedium);
        const x2 = mid - offset - spacing;
        const x1 = x2 - length;

        yield svg`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${tickColor}" stroke-width="${isMajor ? '1.2' : (isMedium ? '0.9' : '0.6')}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;

        if (isMajor && this.hasScaleLabels) {
            const lx = this.getVerticalLeftLabelX();
            yield svg`<text x="${lx}" y="${y}" fill="${labelColor}" font-size="${this.labelFontSizeUu}" text-anchor="end" dominant-baseline="middle">${this.resolveLabel(tickValue)}</text>`;
        }
    }

    private *renderRightTick(y: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { ticks: tickColor, label: labelColor } = this.colors;
        const { spacing } = this;
        const mid = this.trackMidCross;
        const offset = this.thicknessValue / 2;
        const length = this.tickLength(isMajor, isMedium);
        const x1 = mid + offset + spacing;
        const x2 = x1 + length;

        yield svg`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${tickColor}" stroke-width="${isMajor ? '1.2' : (isMedium ? '0.9' : '0.6')}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;

        if (isMajor && this.hasScaleLabels) {
            const lx = this.getVerticalRightLabelX();
            yield svg`<text x="${lx}" y="${y}" fill="${labelColor}" font-size="${this.labelFontSizeUu}" text-anchor="start" dominant-baseline="middle">${this.resolveLabel(tickValue)}</text>`;
        }
    }

    private getVerticalLeftLabelX(): number {
        const { spacing, thicknessValue } = this;
        const mid = this.trackMidCross;
        const offset = thicknessValue / 2;
        const majorLength = this.tickLengths.major;
        const labelGap = 4;
        const x2 = mid - offset - spacing;
        return x2 - majorLength - labelGap;
    }

    private getVerticalRightLabelX(): number {
        const { spacing, thicknessValue } = this;
        const mid = this.trackMidCross;
        const offset = thicknessValue / 2;
        const majorLength = this.tickLengths.major;
        const labelGap = 4;
        const x1 = mid + offset + spacing;
        return x1 + majorLength + labelGap;
    }

    private getHorizontalTopLabelY(): number {
        const { spacing, thicknessValue } = this;
        const mid = this.trackMidCross;
        const offset = thicknessValue / 2;
        const majorLength = this.tickLengths.major;
        const y2 = mid - offset - spacing;
        return y2 - majorLength - 7;
    }

    private getHorizontalBottomLabelY(): number {
        const { spacing, thicknessValue } = this;
        const mid = this.trackMidCross;
        const offset = thicknessValue / 2;
        const majorLength = this.tickLengths.major;
        const y1 = mid + offset + spacing;
        return y1 + majorLength + 7;
    }

    private *renderTopTick(x: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { ticks: tickColor, label: labelColor } = this.colors;
        const { spacing } = this;
        const mid = this.trackMidCross;
        const offset = this.thicknessValue / 2;
        const length = this.tickLength(isMajor, isMedium);
        const y2 = mid - offset - spacing;
        const y1 = y2 - length;

        yield svg`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${tickColor}" stroke-width="${isMajor ? '1.2' : (isMedium ? '0.9' : '0.6')}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;

        if (isMajor && this.hasScaleLabels) {
            const ly = this.getHorizontalTopLabelY();
            yield svg`<text x="${x}" y="${ly}" fill="${labelColor}" font-size="${this.labelFontSizeUu}" text-anchor="middle" dominant-baseline="middle">${this.resolveLabel(tickValue)}</text>`;
        }
    }

    private *renderBottomTick(x: number, tickValue: number, isMajor: boolean, isMedium: boolean) {
        const { ticks: tickColor, label: labelColor } = this.colors;
        const { spacing } = this;
        const mid = this.trackMidCross;
        const offset = this.thicknessValue / 2;
        const length = this.tickLength(isMajor, isMedium);
        const y1 = mid + offset + spacing;
        const y2 = y1 + length;

        yield svg`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${tickColor}" stroke-width="${isMajor ? '1.2' : (isMedium ? '0.9' : '0.6')}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;

        if (isMajor && this.hasScaleLabels) {
            const ly = this.getHorizontalBottomLabelY();
            yield svg`<text x="${x}" y="${ly}" fill="${labelColor}" font-size="${this.labelFontSizeUu}" text-anchor="middle" dominant-baseline="middle">${this.resolveLabel(tickValue)}</text>`;
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
            const { orientation, side, startOffset, endOffset } = this;
            const isHorizontal = orientation === 'horizontal';
            const color = this.colors.label;
            const fontSize = this.labelFontSizeUu;
            const offset = this.captionOffsetUu;

            if (!isHorizontal) {
                const y = Math.min(startOffset, endOffset) - offset;

                if (side === 'left') {
                    const x = this.getVerticalLeftLabelX();
                    yield svg`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" text-anchor="end" dominant-baseline="middle">${this.caption}</text>`;
                } else if (side === 'right') {
                    const x = this.getVerticalRightLabelX();
                    yield svg`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`;
                } else {
                    const mid = this.trackMidCross;
                    yield svg`<text x="${mid}" y="${y}" fill="${color}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">${this.caption}</text>`;
                }
            } else {
                const x = Math.max(startOffset, endOffset) + offset;
                const active = this.activeSide;

                if (active === 'top') {
                    const y = this.getHorizontalTopLabelY();
                    yield svg`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`;
                } else if (active === 'bottom') {
                    const y = this.getHorizontalBottomLabelY();
                    yield svg`<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`;
                } else {
                    const mid = this.trackMidCross;
                    yield svg`<text x="${x}" y="${mid}" fill="${color}" font-size="${fontSize}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`;
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
