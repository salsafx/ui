import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxMeasureElement } from '../base/FxMeasureElement';
import { Animatable, isAnimatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';
import './FxRadialScale';
import './FxRadialSimpleScale';
import './FxMeasureValueDisplay';
import './FxKnob';

@customElement('fx-potentiometer')
export class FxPotentiometer extends Animatable(FxMeasureElement) {
    @property({ type: Boolean, attribute: 'show-value', reflect: true }) override showValue = false;
    @property({ type: Number, attribute: 'start-angle', reflect: true }) startAngle = -135;
    @property({ type: Number, attribute: 'arc-length', reflect: true }) arcLength = 270;
    @property({ type: Boolean, attribute: 'show-labels', reflect: true }) showLabels = true;
    @property({ type: Number }) ticks = 0;
    @property({ type: Boolean, attribute: 'snap-to-ticks', reflect: true }) snapToTicks = false;

    @state() private isDragging = false;
    @state() private hasCustomKnob = false;
    @state() private hasCustomScale = false;

    static styles = [
        themeVariables,
        css`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-potentiometer-size: 220px;
                --fx-potentiometer-theme-color: #3b82f6;
                --fx-potentiometer-track-color: #0f172a;
                --fx-potentiometer-fill-color: linear-gradient(135deg, #3b82f6, #6366f1);
                --fx-potentiometer-bezel-fill: #1e293b;
                --fx-potentiometer-bezel-stroke: #334155;
                --fx-knob: #1e293b;
                --fx-knob-ring: #334155;
                --fx-knob-pointer: var(--fx-potentiometer-theme-color, #3b82f6);
                --fx-radial-scale-color: #475569;
                --fx-radial-scale-label-color: #64748b;
            }

            .potentiometer-wrap {
                position: relative;
                width: var(--fx-potentiometer-size);
                height: var(--fx-potentiometer-size);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            svg.dial {
                width: 100%;
                height: 100%;
                cursor: pointer;
                touch-action: none;
                overflow: visible;
            }

            .overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }

            .knob-host {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 1;
            }
            .knob-host--custom {
                inset: 0;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                transform: none;
            }
            .knob-host ::slotted(*) {
                display: block;
                width: 100%;
                height: 100%;
            }

            .track-fill-path {
                transition: none;
            }

            :host([is-animated]) .track-fill-path:not(.dragging) {
                transition: stroke-dashoffset 0.3s cubic-bezier(0.1, 1, 0.1, 1) !important;
            }

            .info-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                z-index: 1;
            }

            .info-wrap fx-measure-value-display,
            .info-wrap ::slotted(fx-measure-value-display),
            .info-wrap ::slotted([slot="display"]) {
                --fx-measure-value-display-margin-top: 0.1rem;
            }
        `
    ];

    private handleMouseDown(e: MouseEvent) {
        this.startDrag(e);
    }

    private handleTouchStart(e: TouchEvent) {
        this.startDrag(e);
    }

    private startDrag(e: MouseEvent | TouchEvent) {
        this.isDragging = true;
        this.updateValueFromCoordinates(e);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        window.addEventListener('touchend', this.handleTouchEnd);
    }

    private handleMouseMove = (e: MouseEvent) => {
        if (this.isDragging) {
            this.updateValueFromCoordinates(e);
        }
    };

    private handleTouchMove = (e: TouchEvent) => {
        if (this.isDragging) {
            e.preventDefault();
            this.updateValueFromCoordinates(e);
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

    private updateValueFromCoordinates(e: MouseEvent | TouchEvent) {
        const svgEl = this.shadowRoot?.querySelector('svg.dial') as SVGSVGElement | null;
        if (!svgEl) return;

        const rect = svgEl.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = clientX - centerX;
        const dy = clientY - centerY;

        let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        if (deg < -180) deg += 360;
        if (deg > 180) deg -= 360;

        const { min, max, startAngle, arcLength } = this;

        let relativeAngle = deg - startAngle;
        while (relativeAngle < 0) relativeAngle += 360;
        while (relativeAngle >= 360) relativeAngle -= 360;

        let ratio = 0;
        if (relativeAngle <= arcLength) {
            ratio = relativeAngle / arcLength;
        } else {

            const deadZoneCenter = arcLength + (360 - arcLength) / 2;
            if (relativeAngle < deadZoneCenter) {
                ratio = 1; 
            } else {
                ratio = 0; 
            }
        }

        let exactValue = min + ratio * (max - min);

        if (this.ticks > 1 && this.snapToTicks) {
            const step = (max - min) / (this.ticks - 1);
            const tickIndex = Math.round((exactValue - min) / step);
            exactValue = min + tickIndex * step;
        }

        this.value = Math.round(exactValue * 100) / 100;

        this.dispatchEvent(new CustomEvent('input', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    private dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        super.updated(changedProperties);
        if (
            changedProperties.has('value') ||
            changedProperties.has('min') ||
            changedProperties.has('max') ||
            changedProperties.has('startAngle') ||
            changedProperties.has('arcLength') ||
            changedProperties.has('isDragging') ||
            changedProperties.has('isAnimated')
        ) {
            this.updateSlottedKnob();
        }
        if (
            changedProperties.has('value') ||
            changedProperties.has('min') ||
            changedProperties.has('max') ||
            changedProperties.has('startAngle') ||
            changedProperties.has('arcLength') ||
            changedProperties.has('showLabels')
        ) {
            this.updateSlottedScale();
        }
        if (
            changedProperties.has('value') ||
            changedProperties.has('min') ||
            changedProperties.has('max') ||
            changedProperties.has('unit') ||
            changedProperties.has('label')
        ) {
            this.updateSlottedDisplay();
        }
    }

    private updateSlottedDisplay() {
        const slot = this.shadowRoot?.querySelector('slot[name="display"]') as HTMLSlotElement | null;
        if (slot) {
            const customDisplay = slot.assignedElements()[0] as any;
            if (customDisplay) {
                if ('value' in customDisplay) customDisplay.value = this.value;
                if ('min' in customDisplay) customDisplay.min = this.min;
                if ('max' in customDisplay) customDisplay.max = this.max;
                if ('unit' in customDisplay) customDisplay.unit = this.unit;
                if ('label' in customDisplay) customDisplay.label = this.label;
            }
        }
    }

    private updateSlottedKnob() {
        const slot = this.shadowRoot?.querySelector('slot[name="knob"]') as HTMLSlotElement | null;
        if (slot) {
            const assigned = slot.assignedElements();
            this.hasCustomKnob = assigned.length > 0;
            const customKnob = assigned[0] as any;
            if (customKnob) {
                const currentAngle = this.startAngle + this.progress * this.arcLength;
                if ('angle' in customKnob) customKnob.angle = currentAngle;
                if ('value' in customKnob) customKnob.value = this.value;
                if ('progress' in customKnob) customKnob.progress = this.progress;
                if ('isDragging' in customKnob) customKnob.isDragging = this.isDragging;
                if (isAnimatable(customKnob)) customKnob.isAnimated = this.isAnimated;
            }
        }
    }

    private updateSlottedScale() {
        const slot = this.shadowRoot?.querySelector('slot[name="scale"]') as HTMLSlotElement | null;
        if (!slot) return;
        const assigned = slot.assignedElements();
        this.hasCustomScale = assigned.length > 0;
        const scale = assigned[0] as any;
        if (!scale) return;
        if ('value' in scale) scale.value = this.value;
        if ('min' in scale) scale.min = this.min;
        if ('max' in scale) scale.max = this.max;
        if ('startAngle' in scale) scale.startAngle = this.startAngle;
        if ('arcLength' in scale) scale.arcLength = this.arcLength;
        if ('showLabels' in scale) scale.showLabels = this.showLabels;
        if ('outerRadius' in scale) scale.outerRadius = 38;
        if ('innerRadius' in scale) scale.innerRadius = 35;
        if ('majorInnerRadius' in scale) scale.majorInnerRadius = 35;
        if ('minorInnerRadius' in scale) scale.minorInnerRadius = 36.5;
        if ('textRadius' in scale) scale.textRadius = 30.5;
        if ('labelFontSize' in scale) scale.labelFontSize = 5;
    }

    private describeArc(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const x1 = centerX + radius * Math.sin(toRad(startAngle));
        const y1 = centerY - radius * Math.cos(toRad(startAngle));
        const x2 = centerX + radius * Math.sin(toRad(endAngle));
        const y2 = centerY - radius * Math.cos(toRad(endAngle));
        const large = endAngle - startAngle > 180 ? 1 : 0;
        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
    }

    render() {
        const { startAngle, arcLength, progress, isDragging, ticks, hasCustomKnob, hasCustomScale } = this;
        const currentAngle = startAngle + progress * arcLength;
        const endAngle = startAngle + arcLength;
        const hasDefaultScale = ticks > 1;
        const hasScale = hasDefaultScale || hasCustomScale;

        const cx = 50;
        const cy = 50;
        const bezelRadius = 48;
        const trackRadius = hasScale ? 43.5 : 39;
        const trackWidth = hasScale ? 4.5 : 5;
        const knobPct = hasScale ? 36 : 54;
        const tickOuterRadius = 38;
        const tickInnerRadius = 35;
        const tickTextRadius = 30.5;
        const tickLabelFontSize = 5;

        const trackPath = this.describeArc(cx, cy, trackRadius, startAngle, endAngle);
        const totalLength = (2 * Math.PI * trackRadius) * (arcLength / 360);
        const dashOffset = totalLength * (1 - progress);

        return html`
            <div class="potentiometer-wrap">
                <svg 
                    class="dial" 
                    viewBox="-4 -4 108 108"
                    @mousedown="${this.handleMouseDown}"
                    @touchstart="${this.handleTouchStart}"
                >
                    <defs>
                        <linearGradient id="fx-pot-fill-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="var(--fx-potentiometer-theme-color, #3b82f6)" />
                            <stop offset="100%" stop-color="#8b5cf6" />
                        </linearGradient>
                    </defs>

                    <circle
                        cx="${cx}"
                        cy="${cy}"
                        r="${bezelRadius}"
                        fill="var(--fx-potentiometer-bezel-fill, #1e293b)"
                        stroke="var(--fx-potentiometer-bezel-stroke, #334155)"
                        stroke-width="1.5"
                    />
                    <circle
                        cx="${cx}"
                        cy="${cy}"
                        r="${bezelRadius - 3.5}"
                        fill="none"
                        stroke="var(--fx-potentiometer-bezel-stroke, #334155)"
                        stroke-width="0.6"
                        opacity="0.55"
                    />

                    <path
                        d="${trackPath}"
                        fill="none"
                        stroke="var(--fx-potentiometer-track-color, #0f172a)"
                        stroke-width="${trackWidth}"
                        stroke-linecap="round"
                    />

                    <path
                        class="track-fill-path ${isDragging ? 'dragging' : ''}"
                        d="${trackPath}"
                        fill="none"
                        stroke="url(#fx-pot-fill-grad)"
                        stroke-width="${trackWidth}"
                        stroke-linecap="round"
                        stroke-dasharray="${totalLength}"
                        stroke-dashoffset="${dashOffset}"
                    />
                </svg>

                <div
                    class="knob-host ${hasCustomKnob ? 'knob-host--custom' : ''}"
                    style="${hasCustomKnob ? '' : `width: ${knobPct}%; height: ${knobPct}%;`}"
                >
                    <slot name="knob" @slotchange="${this.updateSlottedKnob}">
                        <fx-knob
                            .angle=${currentAngle}
                            .isAnimated=${this.isAnimated && !isDragging}
                        ></fx-knob>
                    </slot>
                </div>

                <div class="overlay">
                    <slot name="scale" @slotchange=${this.updateSlottedScale}>
                        ${hasDefaultScale ? html`
                            <fx-radial-simple-scale
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .count=${ticks - 1}
                                .startAngle=${startAngle}
                                .arcLength=${arcLength}
                                .showLabels=${this.showLabels}
                                .outerRadius=${tickOuterRadius}
                                .innerRadius=${tickInnerRadius}
                                .textRadius=${tickTextRadius}
                                .labelFontSize=${tickLabelFontSize}
                            ></fx-radial-simple-scale>
                        ` : ''}
                    </slot>
                </div>
            </div>

            ${this.showValue ? html`
                <div class="info-wrap">
                    <slot name="display" @slotchange="${this.updateSlottedDisplay}">
                        <fx-measure-value-display
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .unit=${this.unit}
                            .label=${this.label}
                        ></fx-measure-value-display>
                    </slot>
                </div>
            ` : ''}
        `;
    }
}
