import { html, css, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxMeasureElement } from '../base/FxMeasureElement';
import { Animatable } from '../base/Animatable';
import { GlassOverlay } from '../base/GlassOverlay';
import { themeVariables } from '../styles/FxTheme';
import { reflectOptionalTheme, type FxThemeMode } from '../base/Fx/ThemeManager/ThemeManager';
import './FxGaugeNeedle';
import './ValueDisplay';
import './FxRadialScale';

@customElement('fx-radial-gauge')
export class FxRadialGauge extends Animatable(GlassOverlay(FxMeasureElement)) {
    @property({ type: Boolean, attribute: 'has-shell', reflect: true }) override hasShell = true;
    @property({ type: Number, attribute: 'start-angle' }) startAngle = -135;
    @property({ type: Number, attribute: 'arc-length' }) arcLength = 270;
    @property({ type: Boolean, attribute: 'has-scale-labels', reflect: true }) hasScaleLabels = true;
    @property({ type: Boolean, attribute: 'has-track', reflect: true }) hasTrack = true;
    @property({ type: String, reflect: true, converter: reflectOptionalTheme })
    theme?: FxThemeMode;

    static styles = [
        themeVariables,
        css`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                width: var(--fx-gauge-size, 340px);
            }
            :host([has-shell]) {
                --fx-gauge-shell-fill: var(--fx-theme-radial-gauge-shell-fill, #1e293b);
            }
            :host([has-shell][theme='silver']) {
                --fx-gauge-shell-fill: #1e293b;
            }
            :host([has-shell][theme='dark']) {
                --fx-gauge-shell-fill: #080b10;
            }
            :host([is-animated]) {
                --fx-gauge-transition: stroke-dashoffset 0.8s cubic-bezier(0.1, 1, 0.1, 1), transform 0.85s cubic-bezier(0.1, 1, 0.1, 1);
            }
            .gauge-wrap {
                position: relative;
                width: 100%;
                aspect-ratio: 1;
            }
            svg.track {
                width: 100%;
                height: 100%;
            }
            svg.glass {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                opacity: var(--fx-glass-opacity, 0.6);
            }
            .overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
                overflow: visible;
            }
            .overlay ::slotted([slot="needle"]),
            .overlay fx-gauge-needle,
            .overlay fx-gauge-needle-triangle {
                position: absolute;
                inset: 0;
                overflow: visible;
            }
            .center {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .center fx-value-display,
            .center ::slotted(fx-value-display),
            .center ::slotted([slot="display"]) {
                --fx-value-display-margin-top: 40%;
            }
        `
    ];

    private describeArc(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const point = (angle: number) => ({
            x: centerX + radius * Math.sin(toRad(angle)),
            y: centerY - radius * Math.cos(toRad(angle)),
        });

        const sweep = endAngle - startAngle;

        if (sweep >= 360) {
            const start = point(startAngle);
            const mid = point(startAngle + 180);
            const end = point(startAngle + 360);
            return `M ${start.x} ${start.y} A ${radius} ${radius} 0 1 1 ${mid.x} ${mid.y} A ${radius} ${radius} 0 1 1 ${end.x} ${end.y}`;
        }

        const start = point(startAngle);
        const end = point(endAngle);
        const large = sweep > 180 ? 1 : 0;
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
    }

    render() {
        const centerX = 50;
        const centerY = 50;
        const radius = 45;
        const strokeWidth = 4;
        const { startAngle, arcLength, progress } = this;
        const endAngle = startAngle + arcLength;

        const trackPath = this.describeArc(centerX, centerY, radius, startAngle, endAngle);
        const totalLength = (2 * Math.PI * radius) * (arcLength / 360);
        const dashOffset = totalLength * (1 - progress);
        const glassRadius = this.hasTrack ? radius + strokeWidth / 2 + 1 : radius;

        return html`
            <div class="gauge-wrap">
                <svg class="track" viewBox="-4 -4 108 108">
                    <defs>
                        <linearGradient id="fx-gauge-default-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="var(--fx-gauge-gradient-start, #06b6d4)" />
                            <stop offset="50%" stop-color="var(--fx-gauge-gradient-middle, #6366f1)" />
                            <stop offset="100%" stop-color="var(--fx-gauge-gradient-end, #a855f7)" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="${centerX}"
                        cy="${centerY}"
                        r="${glassRadius}"
                        fill="var(--fx-gauge-shell-fill, transparent)"
                    />
                    ${this.hasTrack ? svg`
                    <path
                        d="${trackPath}"
                        fill="none"
                        stroke="var(--fx-gauge-track-color, #0f172a)"
                        stroke-width="${strokeWidth}"
                        stroke-linecap="round"
                    />
                    <path
                        d="${trackPath}"
                        fill="none"
                        stroke="var(--fx-gauge-fill-color, url(#fx-gauge-default-gradient))"
                        stroke-width="${strokeWidth}"
                        stroke-linecap="round"
                        stroke-dasharray="${totalLength}"
                        stroke-dashoffset="${dashOffset}"
                        style="transition: var(--fx-gauge-transition, none);"
                    />
                    ` : nothing}
                </svg>
                <div class="overlay">
                    <slot name="scale">
                        <fx-radial-scale
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .count=${10}
                            .startAngle=${this.startAngle}
                            .arcLength=${this.arcLength}
                            .hasScaleLabels=${this.hasScaleLabels}
                        ></fx-radial-scale>
                    </slot>
                </div>

                <div class="overlay">
                    <slot name="needle" @slotchange=${this.syncNeedleShadows}>
                        <fx-gauge-needle
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .startAngle=${this.startAngle}
                            .arcLength=${this.arcLength}
                            .hasShadow=${this.hasShell}
                        ></fx-gauge-needle>
                    </slot>
                </div>

                ${this.hasValueDisplay ? html`
                <div class="center">
                    <slot name="display" @slotchange="${this.updateSlottedDisplay}">
                        <fx-value-display
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .unit=${this.unit}
                            .label=${this.label}
                        ></fx-value-display>
                    </slot>
                </div>
                ` : ''}

                ${this.hasShell ? html`
                <svg class="glass" viewBox="-4 -4 108 108">
                    <defs>
                        <clipPath id="fx-gauge-glass-clip">
                            <circle cx="50" cy="50" r="${glassRadius}" />
                        </clipPath>
                        <linearGradient id="fx-gauge-glass-rim-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="var(--fx-glass-color, #ffffff)" stop-opacity="0.35" />
                            <stop offset="45%" stop-color="var(--fx-glass-color, #ffffff)" stop-opacity="0.05" />
                            <stop offset="100%" stop-color="var(--fx-glass-color, #ffffff)" stop-opacity="0.12" />
                        </linearGradient>
                    </defs>
                    <g clip-path="url(#fx-gauge-glass-clip)">
                        <ellipse cx="32" cy="20" rx="62" ry="28" fill="var(--fx-glass-color, #ffffff)" opacity="0.14" transform="rotate(-12 32 20)" />
                        <ellipse cx="26" cy="10" rx="30" ry="10" fill="var(--fx-glass-color, #ffffff)" opacity="0.2" transform="rotate(-12 26 10)" />
                    </g>
                    <circle cx="50" cy="50" r="${glassRadius - 0.5}" fill="none" stroke="url(#fx-gauge-glass-rim-gradient)" stroke-width="0.5" />
                </svg>` : ''}
            </div>
        `;
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        super.updated(changedProperties);
        if (
            changedProperties.has('value') ||
            changedProperties.has('min') ||
            changedProperties.has('max') ||
            changedProperties.has('unit') ||
            changedProperties.has('label')
        ) {
            this.updateSlottedDisplay();
        }
        if (changedProperties.has('hasShell')) {
            this.syncNeedleShadows();
        }
    }

    private syncNeedleShadows = () => {
        const slot = this.shadowRoot?.querySelector('slot[name="needle"]') as HTMLSlotElement | null;
        if (slot) {
            const assigned = slot.assignedElements();
            const needles = assigned.length > 0
                ? assigned
                : Array.from(slot.querySelectorAll('fx-gauge-needle, fx-gauge-needle-triangle'));

            for (const el of needles as Array<{ hasShadow?: boolean }>) {
                if ('hasShadow' in el) el.hasShadow = this.hasShell;
            }
        }
    };

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
}
