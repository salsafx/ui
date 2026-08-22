import { html, css, svg, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxMeasureElement } from '../base/FxMeasureElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';
import { reflectOptionalTheme, type FxThemeMode } from '../base/Fx/ThemeManager/ThemeManager';
import './FxLinearScale';
import './ValueDisplay';
import { collectGaugeRegions, type ResolvedGaugeRegion } from './FxGaugeRegion';
import {
    gaugeRegionTooltipFromEvent,
    gaugeRegionUiStyles,
    renderGaugeRegionTooltip,
    type GaugeRegionTooltipState,
} from './FxGaugeRegionChrome';
import './FxGaugeRegion';
import {
    isNil,
    Guid,
    computeLinearScaleOffsets,
    getSlottedScaleValueOrigin,
    isLinearScaleReversed,
} from '../base/FxCore';

@customElement('fx-linear-gauge')
export class FxLinearGauge extends Animatable(FxMeasureElement) {
    private static readonly shellThickBase = 120;
    private static readonly shellLengthBase = 480;
    private static readonly compactEndInset = 10;
    private static readonly compactCaptionInset = 18;
    private static readonly compactMinPad = 4;
    private static readonly compactScaleBand = 38;
    private static readonly regionBand = 7;
    private static readonly regionGap = 1.5;

    private readonly guid = `fx-${Guid.newGuid()}`;
    private resizeObserver?: ResizeObserver;

    @property({ type: Boolean, attribute: 'has-scale-labels', reflect: true }) hasScaleLabels = true;
    @property({ type: String, attribute: 'ticks-side' }) ticksSide = 'left';
    @property({ type: Number }) count = 10;
    @property({ type: Number, attribute: 'sub-divisions' }) subDivisions = 5;
    @property({ type: String, reflect: true }) orientation = 'vertical';
    @property({ type: String, attribute: 'track-thickness' }) trackThickness: string | number = 'medium';
    @property({ type: String, attribute: 'value-origin', reflect: true }) valueOrigin: 'start' | 'end' = 'end';
    @property({ type: String }) caption = '';
    @property({ type: String, reflect: true, converter: reflectOptionalTheme })
    theme?: FxThemeMode;
    @property({ type: Number }) spacing = 4;
    @property({ type: Boolean, attribute: 'has-scale-connecting-line', reflect: true }) hasScaleConnectingLine = false;
    @property({ type: Boolean, attribute: 'is-rounded-track', reflect: true }) isRoundedTrack = true;
    @property({ type: Boolean, attribute: 'is-rounded-shell', reflect: true }) isRoundedShell = true;
    @property({ type: Boolean, attribute: 'has-shell', reflect: true }) hasShell = true;
    @property({ type: Boolean, attribute: 'has-region-tooltip', reflect: true }) hasRegionTooltip = false;

    @state() private layoutWidth = 0;
    @state() private layoutHeight = 0;
    @state() private regions: ResolvedGaugeRegion[] = [];
    @state() private regionTooltip: GaugeRegionTooltipState | null = null;

    static styles = [
        themeVariables,
        gaugeRegionUiStyles,
        css`
            :host {
                position: relative;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                font-family: var(--fx-font-family, sans-serif);
                --fx-linear-gauge-width: 120px;
                --fx-linear-gauge-height: 480px;
                --fx-linear-scale-label-font-size: 9px;
                --fx-linear-scale-color: #475569;
                --fx-linear-scale-label-color: #64748b;
                --fx-linear-gauge-track-color: #0f172a;
                --fx-linear-gauge-shadow-opacity: 0.25;
                --fx-linear-gauge-gradient-start: var(--fx-theme-gradient-start, #06b6d4);
                --fx-linear-gauge-gradient-middle: var(--fx-theme-gradient-middle, #6366f1);
                --fx-linear-gauge-gradient-end: var(--fx-theme-gradient-end, #a855f7);
                gap: 8px;
                overflow: visible;
                box-sizing: border-box;
            }
            :host([has-shell]) {
                background: var(--fx-theme-linear-shell-background, #080b10);
                border-radius: 8px;
            }
            .inner {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
            }
            :host([has-shell]) .inner {
                padding: 12px 8px;
            }
            :host([has-shell][theme="silver"]) {
                background: #1e293b;
            }
            :host([has-shell][theme="dark"]) {
                background: #080b10;
            }
            :host([orientation="horizontal"]) {
                flex-direction: row;
                align-items: center;
                gap: 8px;
                --fx-linear-gauge-width: 480px;
                --fx-linear-gauge-height: 120px;
            }
            :host([orientation="horizontal"]) .inner {
                flex-direction: row;
                align-items: center;
            }
            :host([is-animated]) {
                --fx-linear-gauge-transition: height 0.8s cubic-bezier(0.1, 1, 0.1, 1),
                    y 0.8s cubic-bezier(0.1, 1, 0.1, 1),
                    width 0.8s cubic-bezier(0.1, 1, 0.1, 1),
                    x 0.8s cubic-bezier(0.1, 1, 0.1, 1);
            }

            .body {
                position: relative;
                width: var(--fx-linear-gauge-width);
                height: var(--fx-linear-gauge-height);
                overflow: visible;
            }
            .body svg .region-band {
                pointer-events: all;
            }
            :host([has-region-tooltip]) .body svg .region-band {
                cursor: help;
            }
            .body svg {
                display: block;
                width: 100%;
                height: 100%;
                overflow: visible;
            }
            .scale {
                position: absolute;
                inset: 0;
                pointer-events: none;
                overflow: visible;
            }
            ::slotted([slot="scale"]) {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            .display {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            :host([orientation="horizontal"]) .display {
                align-items: flex-start;
            }
        `
    ];

    private get isHorizontal(): boolean {
        return this.orientation === 'horizontal';
    }

    private get scaleSideFlags(): { start: boolean; end: boolean } {
        const slotted = Array.from(this.querySelectorAll(':scope > [slot="scale"]'));
        if (slotted.length > 0) {
            let start = false;
            let end = false;
            for (const el of slotted) {
                const side = String((el as any).side ?? el.getAttribute('side') ?? 'left');
                if (side === 'left' || side === 'top' || side === 'both') start = true;
                if (side === 'right' || side === 'bottom' || side === 'both') end = true;
            }
            return { start, end };
        }
        const side = this.ticksSide;
        return {
            start: side === 'left' || side === 'both',
            end: side === 'right' || side === 'both',
        };
    }

    private get hasAnyCaption(): boolean {
        if (this.caption) {
            return true;
        } else {
            return Array.from(this.querySelectorAll(':scope > [slot="scale"]')).some((el) => {
                const value = (el as any).caption ?? el.getAttribute('caption') ?? '';
                return String(value).length > 0;
            });
        }
    }

    private get regionRailCross(): number {
        return this.regions.length > 0
            ? FxLinearGauge.regionBand + FxLinearGauge.regionGap
            : 0;
    }

    private get geometry() {
        const shellThick = FxLinearGauge.shellThickBase;
        const wellThick = this.wellThick;
        const sides = this.scaleSideFlags;
        const regionRail = this.regionRailCross;
        const startPad = sides.start ? FxLinearGauge.compactScaleBand : FxLinearGauge.compactMinPad;
        const endPad = (sides.end ? FxLinearGauge.compactScaleBand : FxLinearGauge.compactMinPad) + regionRail;
        const viewCross = startPad + wellThick + endPad;
        const trackOrigin = startPad;

        const hasLayout = this.layoutWidth > 0 && this.layoutHeight > 0;
        const shellLength = hasLayout
            ? (this.isHorizontal
                ? viewCross * (this.layoutWidth / this.layoutHeight)
                : viewCross * (this.layoutHeight / this.layoutWidth))
            : viewCross * (FxLinearGauge.shellLengthBase / shellThick);

        const captionInsetPx = this.hasAnyCaption
            ? FxLinearGauge.compactCaptionInset
            : FxLinearGauge.compactEndInset;
        const endInsetPx = FxLinearGauge.compactEndInset;
        const startInsetPx = this.isHorizontal ? endInsetPx : captionInsetPx;
        const axisEndInsetPx = this.isHorizontal ? captionInsetPx : endInsetPx;
        const lengthPx = hasLayout
            ? (this.isHorizontal ? this.layoutWidth : this.layoutHeight)
            : FxLinearGauge.shellLengthBase;
        const insetStart = shellLength * (startInsetPx / lengthPx);
        const insetEnd = shellLength * (axisEndInsetPx / lengthPx);
        const wellLength = Math.max(shellLength - insetStart - insetEnd, 0);
        const trackCenter = trackOrigin + wellThick / 2;
        // Expand thickness toward the end side so end-side ticks clear the region rail,
        // while start-side ticks stay flush with the track.
        const scaleTrackThickness = wellThick + regionRail;
        const scaleTrackCenter = trackCenter + regionRail / 2;

        return {
            shellThick,
            shellLength,
            inset: insetStart,
            insetStart,
            insetEnd,
            wellLength,
            viewCross,
            trackOrigin,
            trackCenter,
            scaleTrackThickness,
            scaleTrackCenter,
        };
    }

    private get bodyStyle() {
        const { viewCross } = this.geometry;
        const ratio = viewCross / FxLinearGauge.shellThickBase;
        return this.isHorizontal
            ? `width: var(--fx-linear-gauge-width); height: calc(var(--fx-linear-gauge-height) * ${ratio});`
            : `width: calc(var(--fx-linear-gauge-width) * ${ratio}); height: var(--fx-linear-gauge-height);`;
    }

    private getScaleValueOrigin(): 'start' | 'end' {
        return getSlottedScaleValueOrigin(this, 'scale', this.valueOrigin);
    }

    private get wellThick(): number {
        const value = String(this.trackThickness).trim();
        switch (value) {
            case 'small': return 9;
            case 'medium': return 18;
            case 'large': return 27;
            case 'x-large':
            case 'xlarge': return 36;
            default:
                return /^\d+$/.test(value) ? parseInt(value, 10) : 18;
        }
    }

    protected firstUpdated() {
        this.refreshRegions();
        this.addEventListener('regionupdate', this.onRegionsChanged);
        const body = this.shadowRoot?.querySelector('.body');
        if (body && typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver((entries) => {
                const rect = entries[0]?.contentRect;
                if (rect) {
                    const width = rect.width;
                    const height = rect.height;
                    if (width !== this.layoutWidth || height !== this.layoutHeight) {
                        this.layoutWidth = width;
                        this.layoutHeight = height;
                    }
                }
            });
            this.resizeObserver.observe(body);
        }
    }

    disconnectedCallback() {
        this.removeEventListener('regionupdate', this.onRegionsChanged);
        this.resizeObserver?.disconnect();
        this.resizeObserver = undefined;
        super.disconnectedCallback();
    }

    private onRegionsChanged = () => this.refreshRegions();

    private refreshRegions = () => {
        this.regions = collectGaugeRegions(this);
    };

    private showRegionTooltip = (event: PointerEvent, region: ResolvedGaugeRegion) => {
        if (!this.hasRegionTooltip) return;
        this.regionTooltip = gaugeRegionTooltipFromEvent(this, event, region);
    };

    private moveRegionTooltip = (event: PointerEvent, region: ResolvedGaugeRegion) => {
        if (!this.hasRegionTooltip || !this.regionTooltip) return;
        this.regionTooltip = gaugeRegionTooltipFromEvent(this, event, region);
    };

    private hideRegionTooltip = () => {
        this.regionTooltip = null;
    };

    private valueToTrackFraction(value: number): number {
        const span = this.max - this.min;
        if (span === 0) return 0;
        return Math.min(Math.max((value - this.min) / span, 0), 1);
    }

    private renderRegions(
        isHorizontal: boolean,
        insetStart: number,
        wellLength: number,
        trackOrigin: number,
        wellThick: number,
    ) {
        const band = FxLinearGauge.regionBand;
        const gap = FxLinearGauge.regionGap;
        const isReverse = isLinearScaleReversed(
            isHorizontal ? 'horizontal' : 'vertical',
            this.getScaleValueOrigin(),
        );

        return this.regions.map((region) => {
            const from = Math.min(region.from, region.to);
            const to = Math.max(region.from, region.to);
            if (to <= this.min || from >= this.max) return nothing;
            const t0 = this.valueToTrackFraction(from);
            const t1 = this.valueToTrackFraction(to);
            if (t1 <= t0) return nothing;

            const handlers = {
                pointerenter: (e: PointerEvent) => this.showRegionTooltip(e, region),
                pointermove: (e: PointerEvent) => this.moveRegionTooltip(e, region),
                pointerleave: this.hideRegionTooltip,
            };

            if (isHorizontal) {
                const x0 = isReverse
                    ? insetStart + (1 - t1) * wellLength
                    : insetStart + t0 * wellLength;
                const width = (t1 - t0) * wellLength;
                const y = trackOrigin + wellThick + gap;
                return svg`
                    <rect
                        class="region-band"
                        x="${x0}"
                        y="${y}"
                        width="${width}"
                        height="${band}"
                        fill="${region.color}"
                        @pointerenter=${handlers.pointerenter}
                        @pointermove=${handlers.pointermove}
                        @pointerleave=${handlers.pointerleave}
                    />
                `;
            }

            const y0 = isReverse
                ? insetStart + t0 * wellLength
                : insetStart + (1 - t1) * wellLength;
            const height = (t1 - t0) * wellLength;
            const x = trackOrigin + wellThick + gap;
            return svg`
                <rect
                    class="region-band"
                    x="${x}"
                    y="${y0}"
                    width="${band}"
                    height="${height}"
                    fill="${region.color}"
                    @pointerenter=${handlers.pointerenter}
                    @pointermove=${handlers.pointermove}
                    @pointerleave=${handlers.pointerleave}
                />
            `;
        });
    }

    private renderDefs() {
        const { guid: id, isHorizontal } = this;
        const { wellLength, insetStart: inset } = this.geometry;
        const wellEnd = inset + wellLength;
        const isReverse = isLinearScaleReversed(
            isHorizontal ? 'horizontal' : 'vertical',
            this.getScaleValueOrigin()
        );

        const stops = svg`
            <stop offset="0%" stop-color="var(--fx-linear-gauge-gradient-start, #06b6d4)"/>
            <stop offset="50%" stop-color="var(--fx-linear-gauge-gradient-middle, #6366f1)"/>
            <stop offset="100%" stop-color="var(--fx-linear-gauge-gradient-end, #a855f7)"/>
        `;

        const shineStops = svg`
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
            <stop offset="48%" stop-color="#ffffff" stop-opacity="0.2"/>
            <stop offset="52%" stop-color="#000000" stop-opacity="0.05"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.15"/>
        `;

        const gradX1 = isReverse ? wellEnd : inset;
        const gradX2 = isReverse ? inset : wellEnd;
        const gradY1 = isReverse ? inset : wellEnd;
        const gradY2 = isReverse ? wellEnd : inset;

        const insetShadow = svg`
            <filter id="${id}-inset-shadow" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
                <feOffset in="SourceAlpha" dx="0" dy="1.5" result="offset"></feOffset>
                <feGaussianBlur in="offset" stdDeviation="2.2" result="blurred"></feGaussianBlur>
                <feComposite operator="out" in="SourceAlpha" in2="blurred" result="inverse"></feComposite>
                <feFlood flood-color="#000000" flood-opacity="var(--fx-linear-gauge-shadow-opacity)" result="shadowColor"></feFlood>
                <feComposite operator="in" in="shadowColor" in2="inverse" result="shadow"></feComposite>
                <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite>
            </filter>
        `;

        return isHorizontal
            ?
                svg`
                    <defs>
                        <linearGradient id="${id}-grad" x1="${gradX1}" y1="0" x2="${gradX2}" y2="0" gradientUnits="userSpaceOnUse">
                            ${stops}
                        </linearGradient>
                        <linearGradient id="${id}-shine" x1="0" y1="0" x2="0" y2="1">
                            ${shineStops}
                        </linearGradient>
                        ${insetShadow}
                    </defs>
                `
            :
                svg`
                    <defs>
                        <linearGradient id="${id}-grad" x1="0" y1="${gradY1}" x2="0" y2="${gradY2}" gradientUnits="userSpaceOnUse">
                            ${stops}
                        </linearGradient>
                        <linearGradient id="${id}-shine" x1="0" y1="0" x2="1" y2="0">
                            ${shineStops}
                        </linearGradient>
                        ${insetShadow}
                    </defs>
                `;
    }

    private renderVerticalTube() {
        const {
            guid: id,
            geometry: { shellLength, wellLength, insetStart, viewCross, trackOrigin },
            wellThick: wellWidth,
            isRoundedTrack,
            progress
        } = this;
        const trackPad = 1;
        const wellBgWidth = wellWidth + trackPad * 2;
        const wellBgX = trackOrigin - trackPad;
        const wellX = trackOrigin;
        const wellBgRadius = isRoundedTrack ? wellBgWidth * (12 / 40) : 0;
        const wellRadius = isRoundedTrack ? wellWidth * (12 / 40) : 0;

        const isReverse = isLinearScaleReversed('vertical', this.getScaleValueOrigin());
        const fillLength = Math.max(progress * wellLength, 0);
        const fillY = isReverse ? insetStart : (insetStart + wellLength - fillLength);
        const transition = 'var(--fx-linear-gauge-transition, none)';

        return html`
            <svg viewBox="0 0 ${viewCross} ${shellLength}">
                ${this.renderDefs()}
                <defs>
                    <clipPath id="${id}-clip">
                        <rect
                            x="${wellX}"
                            y="${fillY}"
                            width="${wellWidth}"
                            height="${fillLength}"
                            style="transition: ${transition};"
                        />
                    </clipPath>
                </defs>

                <rect
                    x="${wellBgX}" y="${insetStart - trackPad}" width="${wellBgWidth}" height="${wellLength + trackPad * 2}" rx="${wellBgRadius}"
                    fill="var(--fx-linear-gauge-track-color, #0f172a)"
                    filter="url(#${id}-inset-shadow)"
                />
                <g clip-path="url(#${id}-clip)">
                    <rect
                        x="${wellX}" y="${insetStart}" width="${wellWidth}" height="${wellLength}" rx="${wellRadius}"
                        fill="url(#${id}-grad)"
                    />
                    <rect
                        x="${wellX + 1}" y="${insetStart}" width="${Math.max(wellWidth - 2, 0)}" height="${wellLength}" rx="${wellRadius}"
                        fill="url(#${id}-shine)"
                        opacity="0.35"
                    />
                </g>
                ${this.renderRegions(false, insetStart, wellLength, trackOrigin, wellWidth)}
            </svg>
        `;
    }

    private renderHorizontalTube() {
        const {
            guid: id,
            geometry: { shellLength, wellLength, insetStart, viewCross, trackOrigin },
            wellThick: wellHeight,
            isRoundedTrack,
            progress
        } = this;
        const trackPad = 1;
        const wellBgHeight = wellHeight + trackPad * 2;
        const wellBgY = trackOrigin - trackPad;
        const wellY = trackOrigin;
        const wellBgRadius = isRoundedTrack ? wellBgHeight * (12 / 40) : 0;
        const wellRadius = isRoundedTrack ? wellHeight * (12 / 40) : 0;

        const isReverse = isLinearScaleReversed('horizontal', this.getScaleValueOrigin());
        const fillLength = Math.max(progress * wellLength, 0);
        const fillX = isReverse ? (insetStart + wellLength - fillLength) : insetStart;
        const transition = 'var(--fx-linear-gauge-transition, none)';

        return html`
            <svg viewBox="0 0 ${shellLength} ${viewCross}">
                ${this.renderDefs()}
                <defs>
                    <clipPath id="${id}-clip">
                        <rect
                            x="${fillX}"
                            y="${wellY}"
                            width="${fillLength}"
                            height="${wellHeight}"
                            style="transition: ${transition};"
                        />
                    </clipPath>
                </defs>

                <rect
                    x="${insetStart - trackPad}" y="${wellBgY}" width="${wellLength + trackPad * 2}" height="${wellBgHeight}" rx="${wellBgRadius}"
                    fill="var(--fx-linear-gauge-track-color, #0f172a)"
                    filter="url(#${id}-inset-shadow)"
                />
                <g clip-path="url(#${id}-clip)">
                    <rect
                        x="${insetStart}" y="${wellY}" width="${wellLength}" height="${wellHeight}" rx="${wellRadius}"
                        fill="url(#${id}-grad)"
                    />
                    <rect
                        x="${insetStart}" y="${wellY + 1}" width="${wellLength}" height="${Math.max(wellHeight - 2, 0)}" rx="${wellRadius}"
                        fill="url(#${id}-shine)"
                        opacity="0.35"
                    />
                </g>
                ${this.renderRegions(true, insetStart, wellLength, trackOrigin, wellHeight)}
            </svg>
        `;
    }

    private get scaleOffsets() {
        const {
            isHorizontal,
            geometry: {
                insetStart,
                wellLength,
                shellLength,
                viewCross,
                scaleTrackCenter,
                scaleTrackThickness,
            }
        } = this;
        const orientation = isHorizontal ? 'horizontal' as const : 'vertical' as const;
        const { startOffset, endOffset } = computeLinearScaleOffsets(
            orientation,
            this.getScaleValueOrigin(),
            wellLength,
            0
        );
        return {
            orientation,
            start: insetStart + startOffset,
            end: insetStart + endOffset,
            viewBoxWidth: isHorizontal ? shellLength : viewCross,
            viewBoxHeight: isHorizontal ? viewCross : shellLength,
            trackCenter: scaleTrackCenter,
            trackThickness: scaleTrackThickness,
        };
    }

    private renderScale() {
        const {
            scaleOffsets: {
                orientation,
                start,
                end,
                viewBoxWidth,
                viewBoxHeight,
                trackCenter,
                trackThickness,
            }
        } = this;

        return html`
            <slot name="scale" @slotchange=${this.onScaleSlotChange}>
                <fx-linear-scale
                    .value=${this.value}
                    .min=${this.min}
                    .max=${this.max}
                    .count=${this.count}
                    .subDivisions=${this.subDivisions}
                    .side=${this.ticksSide}
                    .hasScaleLabels=${this.hasScaleLabels}
                    .orientation=${orientation}
                    .valueOrigin=${this.valueOrigin}
                    .startOffset=${start}
                    .endOffset=${end}
                    .viewBoxWidth=${viewBoxWidth}
                    .viewBoxHeight=${viewBoxHeight}
                    .trackThickness=${trackThickness}
                    .trackCenter=${trackCenter}
                    .caption=${this.caption}
                    .captionOffset=${14}
                    .spacing=${this.spacing}
                    .hasScaleConnectingLine=${this.hasScaleConnectingLine}
                ></fx-linear-scale>
            </slot>
        `;
    }

    private onScaleSlotChange = () => {
        this.updateSlottedScale();
        this.requestUpdate();
    };

    private renderDisplay() {
        return this.hasValueDisplay
            ? 
                html`
                    <div class="display">
                        <slot name="display" @slotchange=${this.updateSlottedDisplay}>
                            <fx-value-display
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .unit=${this.unit}
                                .label=${this.label}
                                .align=${this.isHorizontal ? 'left' : 'center'}
                            ></fx-value-display>
                        </slot>
                    </div>
                `
            :
                html``;
    }

    render() {
        return html`
            <div class="inner">
                <div class="body" style="${this.bodyStyle}">
                    ${this.isHorizontal ? this.renderHorizontalTube() : this.renderVerticalTube()}
                    <div class="scale">${this.renderScale()}</div>
                </div>
                <slot @slotchange=${this.refreshRegions} style="display:none;"></slot>
                ${this.renderDisplay()}
                ${renderGaugeRegionTooltip(this.regionTooltip)}
            </div>
        `;
    }

    updated(changed: Map<string | number | symbol, unknown>) {
        super.updated(changed);
        if (
            changed.has('value') || changed.has('min') || changed.has('max') ||
            changed.has('unit') || changed.has('label')
        ) {
            this.updateSlottedDisplay();
        }
        if (
            changed.has('value') || changed.has('min') || changed.has('max') ||
            changed.has('orientation') || changed.has('valueOrigin') ||
            changed.has('trackThickness') || changed.has('hasScaleLabels') ||
            changed.has('caption') || changed.has('theme') || changed.has('spacing') ||
            changed.has('hasScaleConnectingLine') ||
            changed.has('hasShell') ||
            changed.has('ticksSide') ||
            changed.has('layoutWidth') || changed.has('layoutHeight') ||
            changed.has('regions')
        ) {
            this.updateSlottedScale();
        }
    }

    private updateSlottedScale() {
        const slot = this.shadowRoot?.querySelector('slot[name="scale"]') as HTMLSlotElement | null;
        if (slot) {
            const elements = slot.assignedElements();
            if (elements.length) {
                const {
                    caption,
                    max,
                    min,
                    scaleOffsets: {
                        orientation,
                        start,
                        end,
                        viewBoxWidth,
                        viewBoxHeight,
                        trackCenter,
                        trackThickness,
                    },
                    hasScaleLabels,
                    hasScaleConnectingLine,
                    spacing,
                    value,
                } = this;

                for (const el of elements as any[]) {
                    if ('orientation' in el) el.orientation = orientation;
                    if ('startOffset' in el) el.startOffset = start;
                    if ('endOffset' in el) el.endOffset = end;
                    if ('viewBoxWidth' in el) el.viewBoxWidth = viewBoxWidth;
                    if ('viewBoxHeight' in el) el.viewBoxHeight = viewBoxHeight;
                    if ('trackCenter' in el) el.trackCenter = trackCenter;
                    if ('trackThickness' in el && !el.hasAttribute('track-thickness')) {
                        el.trackThickness = trackThickness;
                    }
                    if ('spacing' in el && !el.hasAttribute('spacing')) {
                        el.spacing = spacing;
                    }
                    if ('hasScaleConnectingLine' in el && !el.hasAttribute('has-scale-connecting-line')) {
                        el.hasScaleConnectingLine = hasScaleConnectingLine;
                    }
                    if ('captionOffset' in el && !el.hasAttribute('caption-offset')) {
                        el.captionOffset = 14;
                    }
                    if ('hasScaleLabels' in el && isNil(el.hasScaleLabels)) el.hasScaleLabels = hasScaleLabels;
                    if ('value' in el && isNil(el.value)) el.value = value;
                    if ('min' in el && isNil(el.min)) el.min = min;
                    if ('max' in el && isNil(el.max)) el.max = max;
                    if ('caption' in el && !el.caption) el.caption = caption;
                }
            }
        }
    }

    private updateSlottedDisplay() {
        const slot = this.shadowRoot?.querySelector('slot[name="display"]') as HTMLSlotElement | null;
        const el = slot?.assignedElements()[0] as any;
        if (el) {
            if ('value' in el) el.value = this.value;
            if ('min' in el) el.min = this.min;
            if ('max' in el) el.max = this.max;
            if ('unit' in el) el.unit = this.unit;
            if ('label' in el) el.label = this.label;
        }
    }
}
