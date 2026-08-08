import { html, css, nothing } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { FxMeasureElement } from './FxMeasureElement';
import { Animatable } from './Animatable';
import { themeVariables } from '../styles/FxTheme';
import { reflectOptionalTheme, type FxThemeMode } from './Fx/ThemeManager/ThemeManager';
import { computeLinearScaleOffsets, getSlottedScaleValueOrigin, isLinearScaleReversed, isNil, roundToDecimals, type ValueOrigin } from './FxCore';
import '../hmi/FxLinearScale';
import '../hmi/ValueDisplay';

export type FxLinearTrackCompactLayout = {
    cross: number;
    startPad: number;
    endPad: number;
    content: number;
    wellOuter: number;
    wellOffset: number;
    trackCenter: number;
};

export class FxLinearTrackElement extends Animatable(FxMeasureElement) {
    @property({ type: Boolean, attribute: 'has-value-display', reflect: true }) override hasValueDisplay = false;
    @property({ type: Boolean, attribute: 'has-well', reflect: true }) hasWell = true;
    @property({ type: Boolean, attribute: 'has-shell', reflect: true }) hasShell = true;
    @property({ type: String, reflect: true, converter: reflectOptionalTheme })
    theme?: FxThemeMode;
    @property({ type: Boolean, attribute: 'has-scale-labels', reflect: true }) hasScaleLabels = true;
    @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';
    @property({ type: String, attribute: 'ticks-side', reflect: true }) ticksSide = 'left';
    @property({ type: String, attribute: 'value-origin', reflect: true }) valueOrigin: ValueOrigin = 'end';
    @property({ type: Number, attribute: 'sub-divisions' }) subDivisions = 5;
    @property({ type: Number }) spacing = 4;
    @property({ type: Number }) ticks = 0;
    @property({ type: Number }) decimals = 2;
    @property({ type: String }) length = '';
    @property({ type: String }) caption = '';

    @state() protected areaWidth = 0;
    @state() protected areaHeight = 0;
    @state() protected isDragging = false;

    private resizeObserver?: ResizeObserver;

    protected get isInteractiveTrack(): boolean {
        return false;
    }

    protected get thumbSizePx(): number {
        return 0;
    }

    protected renderThumb(
        _compact: FxLinearTrackCompactLayout | null,
        _progress: number,
    ): unknown {
        return nothing;
    }

    protected renderTrackDecorations(_progress: number): unknown {
        return nothing;
    }

    static styles: CSSResultGroup = [
        themeVariables,
        css`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                box-sizing: border-box;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-bar-width: 97px;
                --fx-bar-height: 480px;
                --fx-bar-background: #1e293b;
                --fx-bar-track-color: #0b111f;
                --fx-bar-well-background: var(--fx-bar-background);
                --fx-bar-well-border: color-mix(in srgb, var(--fx-bar-background) 65%, #000);
                --fx-bar-thumb-size: 28px;
                --fx-bar-thumb-background: #121a2b;
                --fx-bar-thumb-grip: #000000;
                --fx-bar-track-width: 10px;
                --fx-bar-well-pad: 5px;
                --fx-bar-track-inset: 10px;
                --fx-bar-track-caption-inset: 18px;
                --fx-bar-track-inset-start: var(--fx-bar-track-inset);
                --fx-bar-track-inset-end: var(--fx-bar-track-inset);
                --fx-bar-well-margin-start: var(--fx-bar-track-inset-start);
                --fx-bar-well-margin-end: var(--fx-bar-track-inset-end);
                --fx-linear-scale-color: #475569;
                --fx-linear-scale-label-color: #64748b;
                --fx-linear-scale-label-font-size: 9px;
                --fx-linear-scale-major-tick: 6;
                --fx-linear-scale-medium-tick: 4;
                --fx-linear-scale-minor-tick: 3;
            }
            :host([has-shell]) {
                background: var(--fx-theme-linear-shell-background, #080b10);
                border-radius: 8px;
                padding: 12px 8px;
            }
            :host([has-shell][theme="silver"]) {
                background: #1e293b;
            }
            :host([has-shell][theme="dark"]) {
                background: #080b10;
            }
            :host([orientation="horizontal"]) {
                --fx-bar-width: 480px;
                --fx-bar-height: 97px;
            }
            .shell {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: var(--fx-bar-width);
                height: var(--fx-bar-height);
                background: transparent;
                border: none;
                overflow: visible;
                box-sizing: border-box;
            }
            :host(:not([orientation="horizontal"])) .track-area {
                justify-content: flex-start;
            }
            :host([orientation="horizontal"]) .track-area {
                align-items: flex-start;
            }
            .track-area {
                position: relative;
                flex: 0 0 auto;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: default;
                touch-action: none;
            }
            :host([orientation="horizontal"]) .track-area {
                width: 100%;
                height: 100%;
            }
            .overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
                z-index: 1;
            }
            ::slotted([slot="scale"]) {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            .well {
                position: relative;
                box-sizing: border-box;
                width: calc(var(--fx-bar-track-width) + var(--fx-bar-well-pad) * 2);
                height: calc(100% - var(--fx-bar-well-margin-start) - var(--fx-bar-well-margin-end));
                margin-top: var(--fx-bar-well-margin-start);
                margin-bottom: var(--fx-bar-well-margin-end);
                padding: var(--fx-bar-well-pad);
                border-radius: calc(var(--fx-bar-track-width) / 2 + var(--fx-bar-well-pad));
                background: var(--fx-bar-well-background);
                border: 1px solid var(--fx-bar-well-border);
                box-shadow:
                    inset 0 2px 5px rgba(0, 0, 0, 0.325),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.02),
                    inset 1px 0 2px rgba(0, 0, 0, 0.175),
                    inset -1px 0 2px rgba(0, 0, 0, 0.175);
            }
            :host([orientation="horizontal"]) .well {
                width: calc(100% - var(--fx-bar-well-margin-start) - var(--fx-bar-well-margin-end));
                height: calc(var(--fx-bar-track-width) + var(--fx-bar-well-pad) * 2);
                margin-top: 0;
                margin-bottom: 0;
                margin-left: var(--fx-bar-well-margin-start);
                margin-right: var(--fx-bar-well-margin-end);
            }
            :host(:not([has-well])) .well {
                width: var(--fx-bar-track-width);
                padding: 0;
                border: none;
                background: transparent;
                box-shadow: none;
                border-radius: calc(var(--fx-bar-track-width) / 2);
            }
            :host([orientation="horizontal"]:not([has-well])) .well {
                width: calc(100% - var(--fx-bar-well-margin-start) - var(--fx-bar-well-margin-end));
                height: var(--fx-bar-track-width);
            }
            .track {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 999px;
                background: var(--fx-bar-track-color);
                overflow: hidden;
            }
            .fill {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 999px;
                background: linear-gradient(
                    180deg,
                    var(--fx-bar-gradient-end, #a855f7) 0%,
                    var(--fx-bar-gradient-middle, #6366f1) 50%,
                    var(--fx-bar-gradient-start, #06b6d4) 100%
                );
                transition: none;
            }
            :host([value-origin="start"]:not([orientation="horizontal"])) .fill {
                bottom: auto;
                top: 0;
                background: linear-gradient(
                    0deg,
                    var(--fx-bar-gradient-end, #a855f7) 0%,
                    var(--fx-bar-gradient-middle, #6366f1) 50%,
                    var(--fx-bar-gradient-start, #06b6d4) 100%
                );
            }
            :host([orientation="horizontal"]) .fill {
                top: 0;
                right: auto;
                bottom: 0;
                background: linear-gradient(
                    90deg,
                    var(--fx-bar-gradient-start, #06b6d4) 0%,
                    var(--fx-bar-gradient-middle, #6366f1) 50%,
                    var(--fx-bar-gradient-end, #a855f7) 100%
                );
            }
            :host([orientation="horizontal"][value-origin="end"]) .fill {
                left: auto;
                right: 0;
                background: linear-gradient(
                    270deg,
                    var(--fx-bar-gradient-start, #06b6d4) 0%,
                    var(--fx-bar-gradient-middle, #6366f1) 50%,
                    var(--fx-bar-gradient-end, #a855f7) 100%
                );
            }
            :host([is-animated]) .fill {
                transition: height 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([orientation="horizontal"][is-animated]) .fill {
                transition: width 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([is-animated]) .fill[data-dragging="true"] {
                transition: height 0.12s cubic-bezier(0.22, 1, 0.36, 1);
            }
            :host([orientation="horizontal"][is-animated]) .fill[data-dragging="true"] {
                transition: width 0.12s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .display-wrap {
                display: flex;
                justify-content: center;
                width: 100%;
            }
            ::slotted([slot="display"]) {
                pointer-events: none;
            }
        `,
    ];

    protected get isHorizontal(): boolean {
        return this.orientation === 'horizontal';
    }

    connectedCallback() {
        super.connectedCallback();
        this.applyLength();
        this.resizeObserver = new ResizeObserver((entries) => {
            const rect = entries[0]?.contentRect;
            if (rect) {
                if (rect.width !== this.areaWidth || rect.height !== this.areaHeight) {
                    this.areaWidth = rect.width;
                    this.areaHeight = rect.height;
                }
            }
        });
    }

    disconnectedCallback() {
        this.resizeObserver?.disconnect();
        this.resizeObserver = undefined;
        super.disconnectedCallback();
    }

    firstUpdated(changed: Map<string | number | symbol, unknown>) {
        super.firstUpdated(changed);
        const area = this.shadowRoot?.querySelector('.track-area');
        if (area && this.resizeObserver) {
            this.resizeObserver.observe(area);
            const rect = area.getBoundingClientRect();
            this.areaWidth = rect.width;
            this.areaHeight = rect.height;
        }
    }

    updated(changed: Map<string | number | symbol, unknown>) {
        super.updated(changed);
        if (changed.has('length') || changed.has('orientation')) {
            this.applyLength();
        }
        if (
            changed.has('value') ||
            changed.has('min') ||
            changed.has('max') ||
            changed.has('unit') ||
            changed.has('label') ||
            changed.has('decimals')
        ) {
            this.updateSlottedDisplay();
        }
        if (
            changed.has('value') ||
            changed.has('min') ||
            changed.has('max') ||
            changed.has('ticks') ||
            changed.has('ticksSide') ||
            changed.has('hasScaleLabels') ||
            changed.has('spacing') ||
            changed.has('hasWell') ||
            changed.has('hasShell') ||
            changed.has('orientation') ||
            changed.has('valueOrigin') ||
            changed.has('caption') ||
            changed.has('areaWidth') ||
            changed.has('areaHeight')
        ) {
            this.updateSlottedScale();
        }
    }

    protected updateSlottedDisplay = () => {
        const slot = this.shadowRoot?.querySelector('slot[name="display"]') as HTMLSlotElement | null;
        if (slot) {
            const customDisplay = slot.assignedElements()[0] as any;
            if (customDisplay) {
                if ('value' in customDisplay) customDisplay.value = this.roundedValue;
                if ('min' in customDisplay) customDisplay.min = this.min;
                if ('max' in customDisplay) customDisplay.max = this.max;
                if ('unit' in customDisplay) customDisplay.unit = this.unit;
                if ('label' in customDisplay) customDisplay.label = this.label;
            }
        }
    };

    protected get trackWidthPx(): number {
        const raw = getComputedStyle(this).getPropertyValue('--fx-bar-track-width').trim();
        const n = parseFloat(raw);
        return Number.isFinite(n) ? n : 10;
    }

    protected get hasCustomScale(): boolean {
        return this.querySelector('[slot="scale"]') != null;
    }

    protected get scaleValueOrigin(): ValueOrigin {
        return getSlottedScaleValueOrigin(this, 'scale', this.valueOrigin);
    }

    protected get isFillReversed(): boolean {
        return isLinearScaleReversed(this.orientation, this.scaleValueOrigin);
    }

    protected get travelPadPx(): number {
        return this.wellPadPx;
    }

    protected get hasAnyCaption(): boolean {
        if (this.caption) {
            return true;
        } else {
            return Array.from(this.querySelectorAll(':scope > [slot="scale"]')).some((el) => {
                const value = (el as any).caption ?? el.getAttribute('caption') ?? '';
                return String(value).length > 0;
            });
        }
    }

    protected readCssPx(name: string, fallback: number): number {
        const raw = getComputedStyle(this).getPropertyValue(name).trim();
        const n = parseFloat(raw);
        return Number.isFinite(n) ? n : fallback;
    }

    protected get trackEndInsetPx(): number {
        return this.readCssPx('--fx-bar-track-inset', 10);
    }

    protected get trackCaptionInsetPx(): number {
        return this.readCssPx('--fx-bar-track-caption-inset', 28);
    }

    protected get trackInsetStartPx(): number {
        const end = this.trackEndInsetPx;
        return this.isHorizontal
            ? end
            : (this.hasAnyCaption ? this.trackCaptionInsetPx : end);
    }

    protected get trackInsetEndPx(): number {
        const end = this.trackEndInsetPx;
        return this.isHorizontal
            ? (this.hasAnyCaption ? this.trackCaptionInsetPx : end)
            : end;
    }

    protected get scaleInnerPadPx(): number {
        return 0;
    }

    protected get wellMarginStartPx(): number {
        return Math.max(this.trackInsetStartPx - this.wellPadPx, 0);
    }

    protected get wellMarginEndPx(): number {
        return Math.max(this.trackInsetEndPx - this.wellPadPx, 0);
    }

    protected get scaleSideFlags(): { start: boolean; end: boolean } {
        const hasTicks = this.ticks > 1 || this.hasCustomScale;
        if (!hasTicks) {
            return { start: false, end: false };
        } else {
            const slotted = Array.from(this.querySelectorAll(':scope > [slot="scale"]'));
            if (slotted.length > 0) {
                let start = false;
                let end = false;
                for (const el of slotted) {
                    const side = String((el as any).side ?? el.getAttribute('side') ?? this.ticksSide);
                    if (side === 'left' || side === 'top' || side === 'both') start = true;
                    if (side === 'right' || side === 'bottom' || side === 'both') end = true;
                }
                return { start, end };
            } else {
                const side = this.ticksSide;
                return {
                    start: side === 'left' || side === 'both',
                    end: side === 'right' || side === 'both',
                };
            }
        }
    }

    protected get compactCrossLayout(): FxLinearTrackCompactLayout {
        const minPad = 4;
        const scaleBand = 36;
        const wellOuter = this.hasWell
            ? this.trackWidthPx + this.wellPadPx * 2
            : this.trackWidthPx;
        const content = Math.max(this.thumbSizePx, wellOuter);
        const sides = this.scaleSideFlags;
        const startPad = sides.start ? scaleBand : minPad;
        const endPad = sides.end ? scaleBand : minPad;
        const cross = startPad + content + endPad;
        const wellOffset = startPad + (content - wellOuter) / 2;
        const trackCenter = startPad + content / 2;
        return { cross, startPad, endPad, content, wellOuter, wellOffset, trackCenter };
    }

    protected get tickLayout() {
        const viewBoxWidth = Math.max(this.areaWidth, this.isHorizontal ? 100 : 60);
        const viewBoxHeight = Math.max(this.areaHeight, this.isHorizontal ? 60 : 100);
        const insetStart = this.trackInsetStartPx;
        const insetEnd = this.trackInsetEndPx;
        const padding = this.scaleInnerPadPx;
        const trackLength = this.isHorizontal ? viewBoxWidth : viewBoxHeight;
        const wellLength = Math.max(trackLength - insetStart - insetEnd, 0);
        const { startOffset, endOffset } = computeLinearScaleOffsets(
            this.isHorizontal ? 'horizontal' : 'vertical',
            this.scaleValueOrigin,
            wellLength,
            padding
        );
        const trackCenter = this.compactCrossLayout.trackCenter;
        return {
            viewBoxWidth,
            viewBoxHeight,
            startOffset: insetStart + startOffset,
            endOffset: insetStart + endOffset,
            trackThickness: this.trackWidthPx,
            spacing: this.spacing + this.wellPadPx,
            trackCenter,
        };
    }

    protected syncTrackInsets() {
        const shell = this.shadowRoot?.querySelector('.shell') as HTMLElement | null;
        if (shell) {
            shell.style.setProperty('--fx-bar-track-inset-start', `${this.trackInsetStartPx}px`);
            shell.style.setProperty('--fx-bar-track-inset-end', `${this.trackInsetEndPx}px`);
            shell.style.setProperty('--fx-bar-well-margin-start', `${this.wellMarginStartPx}px`);
            shell.style.setProperty('--fx-bar-well-margin-end', `${this.wellMarginEndPx}px`);
        }
    }

    protected updateSlottedScale = () => {
        this.syncTrackInsets();
        const slot = this.shadowRoot?.querySelector('slot[name="scale"]') as HTMLSlotElement | null;
        if (slot) {
            const elements = slot.assignedElements();
            if (elements.length > 0) {
                const {
                    viewBoxWidth,
                    viewBoxHeight,
                    startOffset,
                    endOffset,
                    trackThickness,
                    spacing,
                    trackCenter,
                } = this.tickLayout;

                elements.forEach((el: any) => {
                    if ('orientation' in el) el.orientation = this.orientation;
                    if ('valueOrigin' in el) el.valueOrigin = this.scaleValueOrigin;
                    if ('startOffset' in el) el.startOffset = startOffset;
                    if ('endOffset' in el) el.endOffset = endOffset;
                    if ('viewBoxWidth' in el) el.viewBoxWidth = viewBoxWidth;
                    if ('viewBoxHeight' in el) el.viewBoxHeight = viewBoxHeight;
                    if ('trackCenter' in el) el.trackCenter = trackCenter;
                    if ('trackThickness' in el && !el.hasAttribute('track-thickness')) {
                        el.trackThickness = trackThickness;
                    }
                    if ('side' in el) el.side = this.ticksSide;
                    if ('hasScaleLabels' in el && isNil(el.hasScaleLabels)) el.hasScaleLabels = this.hasScaleLabels;
                    if ('value' in el && isNil(el.value)) el.value = this.value;
                    if ('min' in el && isNil(el.min)) el.min = this.min;
                    if ('max' in el && isNil(el.max)) el.max = this.max;
                    if ('spacing' in el) el.spacing = spacing;
                    if ('caption' in el && !el.caption) el.caption = this.caption;
                });
            }
        }
    };
    protected renderTicksSlot() {
        if (this.ticks <= 1 && !this.hasCustomScale) {
            return html``;
        } else {
            const {
                viewBoxWidth,
                viewBoxHeight,
                startOffset,
                endOffset,
                trackThickness,
                spacing,
                trackCenter,
            } = this.tickLayout;

            return html`
                <div class="overlay">
                    <slot name="scale" @slotchange=${this.updateSlottedScale}>
                        ${this.ticks > 1 ? html`
                            <fx-linear-scale
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .count=${this.ticks - 1}
                                .subDivisions=${this.subDivisions}
                                .side=${this.ticksSide}
                                .hasScaleLabels=${this.hasScaleLabels}
                                .orientation=${this.orientation}
                                .valueOrigin=${this.scaleValueOrigin}
                                .startOffset=${startOffset}
                                .endOffset=${endOffset}
                                .viewBoxWidth=${viewBoxWidth}
                                .viewBoxHeight=${viewBoxHeight}
                                .trackThickness=${trackThickness}
                                .trackCenter=${trackCenter}
                                .spacing=${spacing}
                                .caption=${this.caption}
                            ></fx-linear-scale>
                        ` : null}
                    </slot>
                </div>
            `;
        }
    }

    protected applyLength() {
        const resolved = this.resolveLengthValue();
        const lengthVar = this.isHorizontal ? '--fx-bar-width' : '--fx-bar-height';
        const otherVar = this.isHorizontal ? '--fx-bar-height' : '--fx-bar-width';
        this.style.removeProperty(otherVar);
        if (resolved) {
            this.style.setProperty(lengthVar, resolved);
        } else {
            this.style.removeProperty(lengthVar);
        }
    }

    protected resolveLengthValue(): string {
        const trimmed = this.length.trim();
        if (!trimmed) {
            return '';
        } else if (/^\d+(\.\d+)?$/.test(trimmed)) {
            return `${trimmed}px`;
        } else {
            return trimmed;
        }
    }

    protected get roundedValue(): number {
        return roundToDecimals(this.value, this.decimals);
    }

    protected get wellPadPx(): number {
        if (!this.hasWell) {
            return 0;
        } else {
            const raw = getComputedStyle(this).getPropertyValue('--fx-bar-well-pad').trim();
            const n = parseFloat(raw);
            return Number.isFinite(n) ? n : 5;
        }
    }

    protected handleTrackMouseDown(_e: MouseEvent) {}
    protected handleTrackTouchStart(_e: TouchEvent) {}

    render(): TemplateResult {
        const { progress, isDragging } = this;
        const fillPct = progress * 100;

        const compact = this.compactCrossLayout;
        const shellStyle = [
            compact
                ? (this.isHorizontal ? `height: ${compact.cross}px` : `width: ${compact.cross}px`)
                : '',
            `--fx-bar-track-inset-start: ${this.trackInsetStartPx}px`,
            `--fx-bar-track-inset-end: ${this.trackInsetEndPx}px`,
            `--fx-bar-well-margin-start: ${this.wellMarginStartPx}px`,
            `--fx-bar-well-margin-end: ${this.wellMarginEndPx}px`,
        ].filter(Boolean).join('; ');
        const wellStyle = compact
            ? (this.isHorizontal
                ? `margin-top: ${compact.wellOffset}px;`
                : `margin-left: ${compact.wellOffset}px;`)
            : '';

        const trackHandlers = this.isInteractiveTrack
            ? {
                mousedown: this.handleTrackMouseDown,
                touchstart: this.handleTrackTouchStart,
            }
            : {};

        return html`
            <div class="shell" style="${shellStyle}">
                <div
                    class="track-area"
                    @mousedown=${trackHandlers.mousedown}
                    @touchstart=${trackHandlers.touchstart}
                >
                    <div class="well" style="${wellStyle}">
                        <div class="track">
                            <div
                                class="fill"
                                data-dragging="${isDragging}"
                                data-full="${progress >= 1}"
                                style="${this.isHorizontal
                                    ? `width: ${fillPct}%;`
                                    : `height: ${fillPct}%;`}"
                            ></div>
                            ${this.renderTrackDecorations(progress)}
                        </div>
                    </div>
                    ${this.renderTicksSlot()}
                    ${this.renderThumb(compact, progress)}
                </div>
            </div>
            ${this.hasValueDisplay ? html`
                <div class="display-wrap">
                    <slot name="display" @slotchange=${this.updateSlottedDisplay}>
                        <fx-value-display
                            .value=${this.roundedValue}
                            .min=${this.min}
                            .max=${this.max}
                            .unit=${this.unit}
                            .label=${this.label}
                        ></fx-value-display>
                    </slot>
                </div>
            ` : null}
        `;
    }
}
