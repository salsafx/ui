import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxMeasureElement } from '../base/FxMeasureElement';
import { Animatable, isAnimatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';
import './FxMeasureValueDisplay';
import './FxFaderThumb';
import './FxFaderThumbConsole';
import './FxLinearScale';
import {
    computeLinearScaleOffsets,
    getSlottedScaleValueOrigin,
    isNil,
    roundToDecimals,
} from '../base/Core';

@customElement('fx-fader')
export class FxFader extends Animatable(FxMeasureElement) {
    @property({ type: Boolean, attribute: 'show-value', reflect: true }) override showValue = false;
    @property({ type: String, reflect: true }) orientation = 'horizontal';
    @property({ type: Number }) ticks = 0;
    @property({ type: Boolean, attribute: 'snap-to-ticks', reflect: true }) snapToTicks = false;
    @property({ type: Boolean, attribute: 'show-labels', reflect: true }) showLabels = true;
    @property({ type: String, attribute: 'ticks-side', reflect: true }) ticksSide = 'left';
    @property({ type: String, attribute: 'track-thickness' }) trackThickness: string | number = 'medium';
    @property({ type: Number, attribute: 'sub-divisions' }) subDivisions = 5;
    @property({ type: Number }) spacing = 0;
    @property({ type: String, reflect: true }) length = '';
    @property({ type: String, attribute: 'value-origin', reflect: true }) valueOrigin: 'start' | 'end' = 'start';
    @property({ type: Number }) decimals = 2;

    private get verticalCorrection(): number {
        const val = getComputedStyle(this).getPropertyValue('--fx-fader-vertical-correction').trim();
        return val ? parseFloat(val) : 0;
    }

    private static readonly CROSS_AXIS = 60;
    private static readonly FALLBACK_TRACK_LENGTH = 140;

    @state() private containerWidth = 0;
    @state() private containerHeight = 0;
    @state() private isDragging = false;

    private resizeObserver?: ResizeObserver;

    static styles = [
        themeVariables,
        css`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-fader-length: 240px;
                --fx-fader-width: 80px;
                --fx-fader-height: 280px;
                --fx-fader-thumb-width: 20px;
                --fx-fader-thumb-height: 20px;
                --fx-fader-theme-color: #3b82f6;
            }
            :host([orientation="vertical"]) {
                flex-direction: row;
                align-items: center;
                gap: 16px;
                --fx-fader-width: 80px;
                --fx-fader-height: var(--fx-fader-length);
            }
            :host([orientation="horizontal"]) {
                --fx-fader-width: var(--fx-fader-length);
                --fx-fader-height: 80px;
            }

            .fader-outer-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
            }
            :host([orientation="horizontal"]) .fader-outer-wrap {
                width: 100%;
            }
            :host([orientation="vertical"]) .fader-outer-wrap {
                flex-direction: row;
            }

            .fader-wrap {
                position: relative;
                width: var(--fx-fader-width);
                height: var(--fx-fader-height);
                box-sizing: border-box;
                padding: 28px 0;
            }
            :host([orientation="horizontal"]) .fader-wrap {
                padding: 0 28px;
                width: var(--fx-fader-width);
                max-width: 100%;
                box-sizing: border-box;
            }

            .fader-container {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }

            svg.track-svg {
                width: 100%;
                height: 100%;
                overflow: visible;
            }

            .thumb {
                position: absolute;
                width: var(--fx-fader-thumb-width);
                height: var(--fx-fader-thumb-height);
                cursor: grab;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: auto;
                transform: translate(-50%, -50%);
            }
            .thumb:active {
                cursor: grabbing;
                transform: translate(-50%, -50%) scale(1.1);
            }
            ::slotted([slot="thumb"]) {
                pointer-events: none;
                width: 100%;
                height: 100%;
            }
            :host([is-animated]) .thumb {
                transition: left 0.3s cubic-bezier(0.15, 0.85, 0.3, 1), 
                           top 0.3s cubic-bezier(0.15, 0.85, 0.3, 1), 
                           bottom 0.3s cubic-bezier(0.15, 0.85, 0.3, 1), 
                           transform 0.15s ease;
            }

            .overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
                --fx-linear-scale-label-font-size: 7px;
            }

            ::slotted([slot="scale"]) {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .display-wrap {
                display: flex;
                justify-content: center;
            }
            :host([orientation="vertical"]) .display-wrap {
                align-items: flex-start;
            }
            :host([orientation="horizontal"]) .display-wrap {
                width: 100%;
                justify-content: center;
            }
        `
    ];

    private get layoutMetrics() {
        const crossAxis = FxFader.CROSS_AXIS;
        const fallback = FxFader.FALLBACK_TRACK_LENGTH;
        const isHorizontal = this.orientation === 'horizontal';

        if (this.containerWidth <= 0 || this.containerHeight <= 0) {
            return {
                trackLength: fallback,
                viewBoxWidth: isHorizontal ? fallback : crossAxis,
                viewBoxHeight: isHorizontal ? crossAxis : fallback,
            };
        }

        if (isHorizontal) {
            const viewBoxHeight = crossAxis;
            const viewBoxWidth = crossAxis * (this.containerWidth / this.containerHeight);
            return { trackLength: viewBoxWidth, viewBoxWidth, viewBoxHeight };
        }

        const viewBoxWidth = crossAxis;
        const viewBoxHeight = crossAxis * (this.containerHeight / this.containerWidth);
        return { trackLength: viewBoxHeight, viewBoxWidth, viewBoxHeight };
    }

    private get tickLayout() {
        const { orientation } = this;
        const padding = this.thicknessValue / 2;
        const { trackLength, viewBoxWidth, viewBoxHeight } = this.layoutMetrics;
        const scaleValueOrigin = this.getScaleValueOrigin();
        const { startOffset, endOffset } = computeLinearScaleOffsets(
            orientation as 'horizontal' | 'vertical',
            scaleValueOrigin,
            trackLength,
            padding
        );

        return { trackLength, viewBoxWidth, viewBoxHeight, startOffset, endOffset };
    }

    connectedCallback() {
        super.connectedCallback();
        this.applyLength();
        this.resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;

            const { width, height } = entry.contentRect;
            if (width !== this.containerWidth || height !== this.containerHeight) {
                this.containerWidth = width;
                this.containerHeight = height;
            }
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.resizeObserver?.disconnect();
    }

    firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
        super.firstUpdated(changedProperties);
        const container = this.shadowRoot?.querySelector('.fader-container');
        if (container && this.resizeObserver) {
            this.resizeObserver.observe(container);
            const rect = container.getBoundingClientRect();
            this.containerWidth = rect.width;
            this.containerHeight = rect.height;
        }
    }

    private applyLength() {
        const resolved = this.resolveLengthValue();
        if (resolved) {
            this.style.setProperty('--fx-fader-length', resolved);
        } else {
            this.style.removeProperty('--fx-fader-length');
        }
    }

    private resolveLengthValue(): string {
        const trimmed = this.length.trim();
        if (!trimmed) return '';
        if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}px`;
        else return trimmed;
    }

    private get thicknessValue(): number {
        const val = String(this.trackThickness).trim();
        switch (val) {
            case 'large': return 15;
            case 'medium': return 10;
            case 'small': return 5;
            default: {
                if (/^\d+$/.test(val)) {
                    return parseInt(val, 10);
                }
                const cssVar = getComputedStyle(this).getPropertyValue('--fx-fader-thickness').trim();
                if (cssVar && /^\d+/.test(cssVar)) {
                    return parseFloat(cssVar);
                }
                return 10;
            }
        }
    }

    private handleMouseDown(e: MouseEvent) {
        this.startDrag(e.clientX, e.clientY);
    }

    private handleTouchStart(e: TouchEvent) {
        if (e.touches.length > 0) {
            this.startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
    }

    private startDrag(clientX: number, clientY: number) {
        this.isDragging = true;
        this.updateValueFromCoordinates(clientX, clientY);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        window.addEventListener('touchend', this.handleTouchEnd);
    }

    private handleMouseMove = (e: MouseEvent) => {
        if (this.isDragging) {
            this.updateValueFromCoordinates(e.clientX, e.clientY);
        }
    };

    private handleTouchMove = (e: TouchEvent) => {
        if (this.isDragging && e.touches.length > 0) {
            e.preventDefault();
            this.updateValueFromCoordinates(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    private handleMouseUp = () => {
        this.endDrag();
    };

    private handleTouchEnd = () => {
        this.endDrag();
    };

    private endDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            window.removeEventListener('mousemove', this.handleMouseMove);
            window.removeEventListener('mouseup', this.handleMouseUp);
            window.removeEventListener('touchmove', this.handleTouchMove);
            window.removeEventListener('touchend', this.handleTouchEnd);
            this.dispatchChangeEvent();
        }
    }

    private getScaleValueOrigin(): 'start' | 'end' {
        return getSlottedScaleValueOrigin(this, 'scale', this.valueOrigin);
    }

    private get displayValue(): number {
        const scaleValueOrigin = this.getScaleValueOrigin();
        const isHorizontal = this.orientation === 'horizontal';
        if (scaleValueOrigin === (isHorizontal ? 'start' : 'end')) {
            return this.value;
        } else {
            return this.max - (this.value - this.min);
        }
    }

    private get roundedDisplayValue(): number {
        return roundToDecimals(this.displayValue, this.decimals);
    }

    private getEventDetail() {
        return {
            value: this.displayValue,
            displayValue: this.roundedDisplayValue,
        };
    }

    private dispatchInputEvent() {
        this.dispatchEvent(new CustomEvent('input', {
            detail: this.getEventDetail(),
            bubbles: true,
            composed: true,
        }));
    }

    private dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: this.getEventDetail(),
            bubbles: true,
            composed: true,
        }));
    }

    private computeDragRatio(clientX: number, clientY: number, container: Element): number {
        const rect = container.getBoundingClientRect();
        const { trackLength } = this.layoutMetrics;
        const padding = this.thicknessValue / 2;
        const startPercent = padding / trackLength;
        const rangePercent = (trackLength - 2 * padding) / trackLength;

        if (this.orientation === 'horizontal') {
            const x = clientX - rect.left;
            const startPx = rect.width * startPercent;
            const rangePx = rect.width * rangePercent;
            if (rangePx <= 0) return 0;
            return Math.min(Math.max((x - startPx) / rangePx, 0), 1);
        } else {
            const y = clientY - rect.top;
            const startPx = rect.height * startPercent;
            const rangePx = rect.height * rangePercent;
            const { verticalCorrection } = this;
            const offsetPx = -verticalCorrection + (this.progress || 0) * (2 * verticalCorrection);
            const correctedY = y - offsetPx;
            if (rangePx <= 0) return 0;
            return Math.min(Math.max(1 - (correctedY - startPx) / rangePx, 0), 1);
        }
    }

    private updateValueFromCoordinates(clientX: number, clientY: number) {
        const container = this.shadowRoot?.querySelector('.fader-container');
        if (!container) return;

        const { min, max } = this;
        let exactValue = min + this.computeDragRatio(clientX, clientY, container) * (max - min);

        if (this.ticks > 1 && this.snapToTicks) {
            const step = (max - min) / (this.ticks - 1);
            const tickIndex = Math.round((exactValue - min) / step);
            exactValue = min + tickIndex * step;
        }

        this.value = exactValue;
        this.dispatchInputEvent();
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('length')) {
            this.applyLength();
        }

        if (
            changedProperties.has('value') ||
            changedProperties.has('min') ||
            changedProperties.has('max') ||
            changedProperties.has('unit') ||
            changedProperties.has('label') ||
            changedProperties.has('decimals') ||
            changedProperties.has('valueOrigin')
        ) {
            this.updateSlottedDisplay();
        }

        if (
            changedProperties.has('value') ||
            changedProperties.has('min') ||
            changedProperties.has('max') ||
            changedProperties.has('orientation') ||
            changedProperties.has('isDragging') ||
            changedProperties.has('ticks') ||
            changedProperties.has('ticksSide') ||
            changedProperties.has('showLabels') ||
            changedProperties.has('trackThickness') ||
            changedProperties.has('valueOrigin') ||
            changedProperties.has('containerWidth') ||
            changedProperties.has('containerHeight')
        ) {
            this.updateSlottedThumb();
            this.updateSlottedScale();
        }
    }

    private updateSlottedDisplay() {
        const slot = this.shadowRoot?.querySelector('slot[name="display"]') as HTMLSlotElement | null;
        if (slot) {
            const customDisplay = slot.assignedElements()[0] as any;
            if (customDisplay) {
                if ('value' in customDisplay) customDisplay.value = this.roundedDisplayValue;
                if ('min' in customDisplay) customDisplay.min = this.min;
                if ('max' in customDisplay) customDisplay.max = this.max;
                if ('unit' in customDisplay) customDisplay.unit = this.unit;
                if ('label' in customDisplay) customDisplay.label = this.label;
            }
        }
    }

    private updateSlottedThumb() {
        const slot = this.shadowRoot?.querySelector('slot[name="thumb"]') as HTMLSlotElement | null;
        if (slot) {
            const customThumb = slot.assignedElements()[0] as any;
            if (customThumb) {
                if ('value' in customThumb) customThumb.value = this.value;
                if ('progress' in customThumb) customThumb.progress = this.progress;
                if ('orientation' in customThumb) customThumb.orientation = this.orientation;
                if ('isDragging' in customThumb) customThumb.isDragging = this.isDragging;
                if (isAnimatable(customThumb)) customThumb.isAnimated = this.isAnimated;
                if ('ticksSide' in customThumb) customThumb.ticksSide = this.ticksSide;
            }
        }
    }

    private updateSlottedScale() {
        const slot = this.shadowRoot?.querySelector('slot[name="scale"]') as HTMLSlotElement | null;
        if (slot) {
            const elements = slot.assignedElements();

            if (elements.length > 0) {
                const { viewBoxWidth, viewBoxHeight, startOffset, endOffset } = this.tickLayout;

                elements.forEach((el: any) => {
                    if (el) {
                        if ('orientation' in el) el.orientation = this.orientation;
                        if ('startOffset' in el) el.startOffset = startOffset;
                        if ('endOffset' in el) el.endOffset = endOffset;
                        if ('viewBoxWidth' in el) el.viewBoxWidth = viewBoxWidth;
                        if ('viewBoxHeight' in el) el.viewBoxHeight = viewBoxHeight;
                        if ('trackThickness' in el && !el.hasAttribute('track-thickness')) {
                            el.trackThickness = this.trackThickness;
                        }
                        if ('side' in el) el.side = this.ticksSide;
                        if ('showLabels' in el && isNil(el.showLabels)) el.showLabels = this.showLabels;
                        if ('value' in el && isNil(el.value)) el.value = this.value;
                        if ('min' in el && isNil(el.min)) el.min = this.min;
                        if ('max' in el && isNil(el.max)) el.max = this.max;
                        if ('spacing' in el) el.spacing = this.spacing;
                    }
                });
                this.updateSlottedDisplay();
            }
        }
    }

    private renderVerticalTrackAndFill() {
        const { progress, thicknessValue: thick } = this;
        const { trackLength, viewBoxWidth, viewBoxHeight } = this.layoutMetrics;
        const fillHeight = progress * trackLength;
        const fillTopY = trackLength - fillHeight;
        const x = viewBoxWidth / 2 - (thick / 2);

        return html`
            <svg class="track-svg" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}">
                <defs>
                    <linearGradient 
                        id="fx-fader-vertical-gradient-${this.orientation}" 
                        x1="0" y1="${trackLength}" 
                        x2="0" y2="0" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stop-color="var(--fx-fader-gradient-start, #3b82f6)" />
                        <stop offset="50%" stop-color="var(--fx-fader-gradient-middle, #6366f1)" />
                        <stop offset="100%" stop-color="var(--fx-fader-gradient-end, #8b5cf6)" />
                    </linearGradient>
                </defs>
                <rect
                    x="${x}"
                    y="0"
                    width="${thick}"
                    height="${trackLength}"
                    fill="var(--fx-fader-track-color, #e5e7eb)"
                    rx="${thick / 2}"
                />
                <rect
                    x="${x}"
                    y="${fillTopY}"
                    width="${thick}"
                    height="${fillHeight}"
                    fill="var(--fx-fader-fill-color, url(#fx-fader-vertical-gradient-${this.orientation}))"
                    rx="${thick / 2}"
                    style="transition: ${this.isAnimated ? 'height 0.3s cubic-bezier(0.15, 0.85, 0.3, 1), y 0.3s cubic-bezier(0.15, 0.85, 0.3, 1)' : 'none'};"
                />
            </svg>
        `;
    }

    private renderHorizontalTrackAndFill() {
        const { progress } = this;
        const { trackLength, viewBoxWidth, viewBoxHeight } = this.layoutMetrics;
        const fillWidth = progress * trackLength;
        const thick = this.thicknessValue;
        const y = viewBoxHeight / 2 - (thick / 2);

        return html`
            <svg class="track-svg" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}">
                <defs>
                    <linearGradient 
                        id="fx-fader-horizontal-gradient-${this.orientation}" 
                        x1="0" y1="0" 
                        x2="${trackLength}" y2="0" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stop-color="var(--fx-fader-gradient-start, #3b82f6)" />
                        <stop offset="50%" stop-color="var(--fx-fader-gradient-middle, #6366f1)" />
                        <stop offset="100%" stop-color="var(--fx-fader-gradient-end, #8b5cf6)" />
                    </linearGradient>
                </defs>
                <rect
                    x="0"
                    y="${y}"
                    width="${trackLength}"
                    height="${thick}"
                    fill="var(--fx-fader-track-color, #e5e7eb)"
                    rx="${thick / 2}"
                />
                <rect
                    x="0"
                    y="${y}"
                    width="${fillWidth}"
                    height="${thick}"
                    fill="var(--fx-fader-fill-color, url(#fx-fader-horizontal-gradient-${this.orientation}))"
                    rx="${thick / 2}"
                    style="transition: ${this.isAnimated ? 'width 0.3s cubic-bezier(0.15, 0.85, 0.3, 1)' : 'none'};"
                />
            </svg>
        `;
    }

    private renderTrackAndFill() {
        return this.orientation === 'horizontal' 
            ? this.renderHorizontalTrackAndFill() 
            : this.renderVerticalTrackAndFill();
    }

    private renderTicksSlot() {
        if (this.ticks <= 1) return html``;

        const { orientation } = this;
        const { viewBoxWidth, viewBoxHeight, startOffset, endOffset } = this.tickLayout;

        return html`
            <slot name="scale" @slotchange="${this.updateSlottedScale}">
                <fx-linear-scale
                    .value=${this.value}
                    .min=${this.min}
                    .max=${this.max}
                    .count=${this.ticks - 1}
                    .subDivisions=${this.subDivisions}
                    .side=${this.ticksSide}
                    .showLabels=${this.showLabels}
                    .orientation=${orientation}
                    .valueOrigin=${this.valueOrigin}
                    .startOffset=${startOffset}
                    .endOffset=${endOffset}
                    .viewBoxWidth=${viewBoxWidth}
                    .viewBoxHeight=${viewBoxHeight}
                    .trackThickness=${this.trackThickness}
                    .spacing=${this.spacing}
                ></fx-linear-scale>
            </slot>
        `;
    }

    private renderThumb() {
        const { progress, orientation, isDragging, thicknessValue, verticalCorrection } = this;

        const { trackLength } = this.layoutMetrics;
        const padding = thicknessValue / 2;
        const startPercent = (padding / trackLength) * 100;
        const rangePercent = ((trackLength - 2 * padding) / trackLength) * 100;

        const offsetPx = -verticalCorrection + progress * (2 * verticalCorrection);

        const thumbStyle = orientation === 'horizontal'
            ? `left: calc(${startPercent}% + ${progress} * ${rangePercent}%); top: 50%;`
            : `top: calc(${(100 - startPercent)}% - ${progress} * ${rangePercent}% + ${offsetPx}px); left: 50%;`;

        return html`
            <div 
                class="thumb ${isDragging ? 'dragging' : ''}" 
                style="${thumbStyle}"
            >
                <slot name="thumb" @slotchange="${this.updateSlottedThumb}">
                    <fx-fader-thumb
                        .value="${this.value}"
                        .progress="${progress}"
                        .isDragging="${isDragging}"
                        .orientation="${orientation}"
                        .isAnimated="${this.isAnimated}"
                    ></fx-fader-thumb>
                </slot>
            </div>
        `;
    }

    render() {
        return html`
            <div class="fader-outer-wrap">
                <div class="fader-wrap">
                    <div 
                        class="fader-container"
                        @mousedown="${this.handleMouseDown}"
                        @touchstart="${this.handleTouchStart}"
                    >
                        ${this.renderTrackAndFill()}
                        <div class="overlay">
                            ${this.renderTicksSlot()}
                        </div>
                        ${this.renderThumb()}
                    </div>
                </div>

                ${this.showValue ? html`
                    <div class="display-wrap">
                        <slot name="display" @slotchange="${this.updateSlottedDisplay}">
                            <fx-measure-value-display
                                .value=${this.roundedDisplayValue}
                                .min=${this.min}
                                .max=${this.max}
                                .unit=${this.unit}
                                .label=${this.label}
                            ></fx-measure-value-display>
                        </slot>
                    </div>
                ` : ''}
            </div>
        `;
    }
}
