import { html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxMeasureElement } from '../base/FxMeasureElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';
import './FxLinearScale';
import './FxMeasureValueDisplay';
import {
    isNil,
    Guid,
    computeLinearScaleOffsets,
    getSlottedScaleValueOrigin,
    isLinearScaleReversed,
} from '../base/Core';

@customElement('fx-linear-gauge')
export class FxLinearGauge extends Animatable(FxMeasureElement) {
    private static readonly shellThickBase = 120;
    private static readonly shellLengthBase = 480;
    private static readonly insetBase = 36;
    private static readonly wellThickBase = 40;

    private readonly guid = `fx-${Guid.newGuid()}`;
    private resizeObserver?: ResizeObserver;

    @property({ type: Boolean, attribute: 'show-labels', reflect: true }) showLabels = true;
    @property({ type: String, attribute: 'ticks-side' }) ticksSide = 'left';
    @property({ type: Number }) count = 10;
    @property({ type: Number, attribute: 'sub-divisions' }) subDivisions = 5;
    @property({ type: String, reflect: true }) orientation = 'vertical';
    @property({ type: String, attribute: 'track-thickness' }) trackThickness: string | number = 'medium';
    @property({ type: String, attribute: 'value-origin', reflect: true }) valueOrigin: 'start' | 'end' = 'end';
    @property({ type: String }) caption = '';
    @property({ type: String, reflect: true }) theme: 'light' | 'dark' = 'dark';
    @property({ type: Number }) spacing = 0;
    @property({ type: Boolean, attribute: 'is-rounded-track', reflect: true }) isRoundedTrack = true;
    @property({ type: Boolean, attribute: 'is-rounded-shell', reflect: true }) isRoundedShell = true;

    @state() private layoutWidth = 0;
    @state() private layoutHeight = 0;

    static styles = [
        themeVariables,
        css`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                --fx-linear-gauge-width: 120px;
                --fx-linear-gauge-height: 480px;
                --fx-linear-scale-label-font-size: 9px;
                --fx-linear-scale-color: #cbd5e1;
                --fx-linear-scale-label-color: #64748b;
                --fx-linear-gauge-shell-fill: #f8fafc;
                --fx-linear-gauge-shell-stroke: #e2e8f0;
                --fx-linear-gauge-track-color: #e2e8f0;
                --fx-linear-gauge-shadow-opacity: 0.20;
                overflow: visible;
            }
            :host([theme="dark"]) {
                --fx-linear-scale-color: #5d6f88;
                --fx-linear-scale-label-color: #b0bdcd;
                --fx-linear-gauge-shell-fill: #1e293b;
                --fx-linear-gauge-shell-stroke: #334155;
                --fx-linear-gauge-track-color: #0f172a;
            }
            :host([orientation="horizontal"]) {
                flex-direction: row;
                align-items: center;
                gap: 20px;
                --fx-linear-gauge-width: 480px;
                --fx-linear-gauge-height: 120px;
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

    private get geometry() {
        const shellThick = FxLinearGauge.shellThickBase;
        const hasLayout = this.layoutWidth > 0 && this.layoutHeight > 0;
        const shellLength = hasLayout
            ? (this.isHorizontal
                ? shellThick * (this.layoutWidth / this.layoutHeight)
                : shellThick * (this.layoutHeight / this.layoutWidth))
            : FxLinearGauge.shellLengthBase;
        const inset = FxLinearGauge.insetBase;
        const wellLength = Math.max(shellLength - inset * 2, 0);

        return { shellThick, shellLength, inset, wellLength, viewCross: shellThick };
    }

    private getScaleValueOrigin(): 'start' | 'end' {
        return getSlottedScaleValueOrigin(this, 'scale', this.valueOrigin);
    }

    private get wellThick(): number {
        const base = FxLinearGauge.wellThickBase;
        const value = String(this.trackThickness).trim();
        switch (value) {
            case 'small': return base * 0.7;
            case 'medium': return base * 0.85;
            case 'large': return base;
            default:
                return /^\d+$/.test(value) ? parseInt(value, 10) : base;
        }
    }

    protected firstUpdated() {
        const body = this.shadowRoot?.querySelector('.body');
        if (!body || typeof ResizeObserver === 'undefined') return;

        this.resizeObserver = new ResizeObserver((entries) => {
            const rect = entries[0]?.contentRect;
            if (!rect) return;
            const width = rect.width;
            const height = rect.height;
            if (width === this.layoutWidth && height === this.layoutHeight) return;
            this.layoutWidth = width;
            this.layoutHeight = height;
        });
        this.resizeObserver.observe(body);
    }

    disconnectedCallback() {
        this.resizeObserver?.disconnect();
        this.resizeObserver = undefined;
        super.disconnectedCallback();
    }

    private renderDefs() {
        const { guid: id, isHorizontal } = this;
        const { wellLength, inset } = this.geometry;
        const wellEnd = inset + wellLength;
        const isReverse = isLinearScaleReversed(
            isHorizontal ? 'horizontal' : 'vertical',
            this.getScaleValueOrigin()
        );

        const stops = svg`
            <stop offset="0%" stop-color="var(--fx-linear-gauge-gradient-start, #0066ff)"/>
            <stop offset="50%" stop-color="var(--fx-linear-gauge-gradient-middle, #ffeb3b)"/>
            <stop offset="100%" stop-color="var(--fx-linear-gauge-gradient-end, #f44336)"/>
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
            geometry: { shellLength, wellLength, inset, shellThick, viewCross },
            wellThick: wellWidth,
            isRoundedShell,
            isRoundedTrack,
            progress
        } = this;
        const shellX = (viewCross - shellThick) / 2;
        const wellX = (viewCross - wellWidth) / 2;
        const shellRadius = isRoundedShell ? shellThick * 0.16 : 0;
        const wellRadius = isRoundedTrack ? wellWidth * (12 / 40) : 0;

        const isReverse = isLinearScaleReversed('vertical', this.getScaleValueOrigin());
        const fillLength = Math.max(progress * wellLength, 0);
        const fillY = isReverse ? inset : (inset + wellLength - fillLength);
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
                    x="${shellX}" y="0" width="${shellThick}" height="${shellLength}" rx="${shellRadius}"
                    fill="var(--fx-linear-gauge-shell-fill, #f8fafc)"
                    stroke="var(--fx-linear-gauge-shell-stroke, #e2e8f0)"
                    stroke-width="2"
                    vector-effect="non-scaling-stroke"
                />
                <rect
                    x="${wellX}" y="${inset}" width="${wellWidth}" height="${wellLength}" rx="${wellRadius}"
                    fill="var(--fx-linear-gauge-track-color, #e2e8f0)"
                    filter="url(#${id}-inset-shadow)"
                />
                <g clip-path="url(#${id}-clip)">
                    <rect
                        x="${wellX}" y="${inset}" width="${wellWidth}" height="${wellLength}" rx="${wellRadius}"
                        fill="url(#${id}-grad)"
                    />
                    <rect
                        x="${wellX + 1}" y="${inset}" width="${Math.max(wellWidth - 2, 0)}" height="${wellLength}" rx="${wellRadius}"
                        fill="url(#${id}-shine)"
                        opacity="0.65"
                    />
                </g>
            </svg>
        `;
    }

    private renderHorizontalTube() {
        const {
            guid: id,
            geometry: { shellLength, wellLength, inset, shellThick, viewCross },
            wellThick: wellHeight,
            isRoundedShell,
            isRoundedTrack,
            progress
        } = this;
        const shellY = (viewCross - shellThick) / 2;
        const wellY = (viewCross - wellHeight) / 2;
        const shellRadius = isRoundedShell ? shellThick * 0.16 : 0;
        const wellRadius = isRoundedTrack ? wellHeight * (12 / 40) : 0;

        const isReverse = isLinearScaleReversed('horizontal', this.getScaleValueOrigin());
        const fillLength = Math.max(progress * wellLength, 0);
        const fillX = isReverse ? (inset + wellLength - fillLength) : inset;
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
                    x="0" y="${shellY}" width="${shellLength}" height="${shellThick}" rx="${shellRadius}"
                    fill="var(--fx-linear-gauge-shell-fill, #f8fafc)"
                    stroke="var(--fx-linear-gauge-shell-stroke, #e2e8f0)"
                    stroke-width="2"
                    vector-effect="non-scaling-stroke"
                />
                <rect
                    x="${inset}" y="${wellY}" width="${wellLength}" height="${wellHeight}" rx="${wellRadius}"
                    fill="var(--fx-linear-gauge-track-color, #e2e8f0)"
                    filter="url(#${id}-inset-shadow)"
                />
                <g clip-path="url(#${id}-clip)">
                    <rect
                        x="${inset}" y="${wellY}" width="${wellLength}" height="${wellHeight}" rx="${wellRadius}"
                        fill="url(#${id}-grad)"
                    />
                    <rect
                        x="${inset}" y="${wellY + 1}" width="${wellLength}" height="${Math.max(wellHeight - 2, 0)}" rx="${wellRadius}"
                        fill="url(#${id}-shine)"
                        opacity="0.65"
                    />
                </g>
            </svg>
        `;
    }

    private get scaleOffsets() {
        const {
            isHorizontal,
            geometry: { inset, wellLength, shellLength, viewCross }
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
            start: inset + startOffset,
            end: inset + endOffset,
            viewBoxWidth: isHorizontal ? shellLength : viewCross,
            viewBoxHeight: isHorizontal ? viewCross : shellLength,
        };
    }

    private renderScale() {
        const {
            scaleOffsets: { orientation, start, end, viewBoxWidth, viewBoxHeight }
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
                    .showLabels=${this.showLabels}
                    .orientation=${orientation}
                    .valueOrigin=${this.valueOrigin}
                    .startOffset=${start}
                    .endOffset=${end}
                    .viewBoxWidth=${viewBoxWidth}
                    .viewBoxHeight=${viewBoxHeight}
                    .trackThickness=${this.wellThick}
                    .caption=${this.caption}
                    .captionOffset=${15}
                    .spacing=${this.spacing}
                    ?show-connecting-line=${true}
                ></fx-linear-scale>
            </slot>
        `;
    }

    private onScaleSlotChange = () => {
        this.updateSlottedScale();
        this.requestUpdate();
    };

    private renderDisplay() {
        return this.showValue
            ? 
                html`
                    <div class="display">
                        <slot name="display" @slotchange=${this.updateSlottedDisplay}>
                            <fx-measure-value-display
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .unit=${this.unit}
                                .label=${this.label}
                                .align=${this.isHorizontal ? 'left' : 'center'}
                            ></fx-measure-value-display>
                        </slot>
                    </div>
                `
            :
                html``;
    }

    render() {
        return html`
            <div class="body">
                ${this.isHorizontal ? this.renderHorizontalTube() : this.renderVerticalTube()}
                <div class="scale">${this.renderScale()}</div>
            </div>
            ${this.renderDisplay()}
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
            changed.has('trackThickness') || changed.has('showLabels') ||
            changed.has('caption') || changed.has('theme') || changed.has('spacing') ||
            changed.has('layoutWidth') || changed.has('layoutHeight')
        ) {
            this.updateSlottedScale();
        }
    }

    private updateSlottedScale() {
        const slot = this.shadowRoot?.querySelector('slot[name="scale"]') as HTMLSlotElement | null;
        if (!slot) return;

        const elements = slot.assignedElements();
        if (elements.length)
        {
            const {
                caption,
                max,
                min,
                scaleOffsets: { orientation, start, end, viewBoxWidth, viewBoxHeight },
                showLabels,
                spacing,
                value,
                wellThick
            } = this;

            for (const el of elements as any[]) {
                if ('orientation' in el) el.orientation = orientation;
                if ('startOffset' in el) el.startOffset = start;
                if ('endOffset' in el) el.endOffset = end;
                if ('viewBoxWidth' in el) el.viewBoxWidth = viewBoxWidth;
                if ('viewBoxHeight' in el) el.viewBoxHeight = viewBoxHeight;
                if ('trackThickness' in el && !el.hasAttribute('track-thickness')) {
                    el.trackThickness = wellThick;
                }
                if ('spacing' in el && !el.hasAttribute('spacing')) {
                    el.spacing = spacing;
                }
                if ('captionOffset' in el && !el.hasAttribute('caption-offset')) {
                    el.captionOffset = 15;
                }
                if ('showLabels' in el && isNil(el.showLabels)) el.showLabels = showLabels;
                if ('value' in el && isNil(el.value)) el.value = value;
                if ('min' in el && isNil(el.min)) el.min = min;
                if ('max' in el && isNil(el.max)) el.max = max;
                if ('caption' in el && !el.caption) el.caption = caption;
            }
        }
    }

    private updateSlottedDisplay() {
        const slot = this.shadowRoot?.querySelector('slot[name="display"]') as HTMLSlotElement | null;
        const el = slot?.assignedElements()[0] as any;
        if (!el) return;
        if ('value' in el) el.value = this.value;
        if ('min' in el) el.min = this.min;
        if ('max' in el) el.max = this.max;
        if ('unit' in el) el.unit = this.unit;
        if ('label' in el) el.label = this.label;
    }
}
