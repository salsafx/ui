import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxMeasureElement } from '../base/FxMeasureElement';
import { themeVariables } from '../styles/FxTheme';

@customElement('fx-vu-meter')
export class FxVuMeter extends FxMeasureElement {
    @property({ type: Number }) segments = 15;
    @property({ type: String, reflect: true }) orientation = 'vertical';
    @property({ type: Boolean, attribute: 'has-peak-hold', reflect: true }) hasPeakHold = true;
    @property({ type: Boolean, attribute: 'show-labels', reflect: true }) showLabels = true;
    @property({ type: Boolean, attribute: 'is-stereo', reflect: true }) isStereo = false; 

    @state() private peakValueL = 0;
    @state() private peakValueR = 0;

    private peakTimerL: any = null;
    private decayInterval: any = null;

    static styles = [
        themeVariables,
        css`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-vu-meter-size: 200px;  
                --fx-vu-gap: 3px;
                --fx-vu-bg-opacity: 0.15;
                --fx-vu-glow-intensity: 8px;
            }

            .vu-container {
                display: flex;
                background: var(--fx-vu-meter-background, #1e293b);
                border: 2px solid var(--fx-vu-meter-border-color, #334155);
                border-radius: 8px;
                padding: 10px;
                box-shadow: 
                    inset 0 4px 6px rgba(0, 0, 0, 0.6),
                    0 4px 10px rgba(0, 0, 0, 0.3),
                    0 1px 0 rgba(255, 255, 255, 0.1);
                box-sizing: border-box;
                position: relative;
            }

            :host([orientation="vertical"]) .vu-container {
                flex-direction: row;
                height: var(--fx-vu-meter-size);
                width: auto;
                min-width: 48px;
            }

            :host([orientation="vertical"][is-stereo]) .vu-container {
                min-width: 76px;
            }

            :host([orientation="horizontal"]) .vu-container {
                flex-direction: column;
                width: var(--fx-vu-meter-size);
                height: auto;
                min-height: 48px;
            }

            :host([orientation="horizontal"][is-stereo]) .vu-container {
                min-height: 76px;
            }

            .bar {
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
            }

            :host([orientation="vertical"]) .bar {
                flex-direction: column-reverse;
                height: 100%;
                width: 20px;
                margin: 0 4px;
            }

            :host([orientation="horizontal"]) .bar {
                flex-direction: row;
                width: 100%;
                height: 20px;
                margin: 4px 0;
            }

            .segment {
                flex: 1;
                border-radius: 2px;
                box-sizing: border-box;
                position: relative;
                transition: background-color 0.05s ease, box-shadow 0.05s ease;
            }

            :host([orientation="vertical"]) .segment {
                margin: var(--fx-vu-gap) 0;
                width: 100%;
            }

            :host([orientation="horizontal"]) .segment {
                margin: 0 var(--fx-vu-gap);
                height: 100%;
            }

            .glass-reflection {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%);
                pointer-events: none;
                border-radius: 6px;
            }

            .info-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .info-wrap fx-measure-value-display,
            .info-wrap ::slotted(fx-measure-value-display),
            .info-wrap ::slotted([slot="display"]) {
                --fx-measure-value-display-margin-top: 0.55em;
            }

            .scale-labels {
                display: flex;
                justify-content: space-between;
                pointer-events: none;
                font-size: 13px;
                color: var(--fx-vu-meter-label-color, #cbd5e1);
                font-weight: 600;
            }

            :host([orientation="vertical"]) .scale-labels {
                flex-direction: column-reverse;
                height: 100%;
                padding: var(--fx-vu-gap) 6px var(--fx-vu-gap) 0;
            }

            :host([orientation="horizontal"]) .scale-labels {
                flex-direction: row;
                width: 100%;
                padding: 0 var(--fx-vu-gap) 6px var(--fx-vu-gap);
            }
        `
    ];

    connectedCallback() {
        super.connectedCallback();
        this.startPeakDecay();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.stopPeakDecay();
    }

    private startPeakDecay() {
        this.decayInterval = setInterval(() => {
            if (this.peakValueL > this.progress) {
                this.peakValueL = Math.max(this.progress, this.peakValueL - 0.02);
            }
            if (this.peakValueR > this.progress) {
                this.peakValueR = Math.max(this.progress, this.peakValueR - 0.02);
            }
        }, 50);
    }

    private stopPeakDecay() {
        if (this.decayInterval) {
            clearInterval(this.decayInterval);
        }
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('value') || changedProperties.has('min') || changedProperties.has('max')) {
            const currentProgress = this.progress;

            if (currentProgress >= this.peakValueL) {
                this.peakValueL = currentProgress;
                if (this.peakTimerL) clearTimeout(this.peakTimerL);
                this.peakTimerL = setTimeout(() => {

                }, 1000);
            }

            const rightValue = currentProgress * (0.95 + Math.sin(Date.now() / 150) * 0.05); 
            const rightProgress = Math.max(0, Math.min(1, rightValue));
            if (rightProgress >= this.peakValueR) {
                this.peakValueR = rightProgress;
            }
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

    private getSegmentColor(fraction: number, isActive: boolean) {

        let color = '#10b981'; 
        let glowColor = 'rgba(16, 185, 129, 0.4)';

        if (fraction > 0.85) {
            color = '#ef4444'; 
            glowColor = 'rgba(239, 68, 68, 0.6)';
        } else if (fraction > 0.65) {
            color = '#f59e0b'; 
            glowColor = 'rgba(245, 158, 11, 0.5)';
        }

        if (isActive) {
            return {
                style: `background-color: ${color}; box-shadow: 0 0 var(--fx-vu-glow-intensity) ${glowColor};`,
                active: true
            };
        } else {
            return {
                style: `background-color: ${color}; opacity: var(--fx-vu-bg-opacity);`,
                active: false
            };
        }
    }

    private renderBar(peakValue: number, isRightBar = false) {
        const { segments, progress } = this;
        const barProgress = isRightBar 
            ? Math.max(0, Math.min(1, progress * (0.95 + Math.sin(Date.now() / 150) * 0.05)))
            : progress;

        const renderedSegments = [];
        const peakSegmentIndex = Math.floor(peakValue * (segments - 1));

        for (let i = 0; i < segments; i++) {
            const segmentFraction = i / (segments - 1);
            const isActive = barProgress >= segmentFraction;
            const isPeak = this.hasPeakHold && i === peakSegmentIndex && peakValue > 0.02;

            const colorDetails = this.getSegmentColor(segmentFraction, isActive || isPeak);

            const finalStyle = isPeak && !isActive
                ? `${colorDetails.style} opacity: 1; filter: brightness(1.2);`
                : colorDetails.style;

            renderedSegments.push(html`
                <div class="segment" style="${finalStyle}"></div>
            `);
        }

        return html`
            <div class="bar">
                ${renderedSegments}
            </div>
        `;
    }

    private renderScaleLabels() {
        const { min, max, showLabels } = this;
        if (!showLabels) return '';

        const labelElements = [];
        const step = (max - min) / 4;

        for (let i = 0; i <= 4; i++) {
            const val = Math.round(min + i * step);
            labelElements.push(html`<div>${val}</div>`);
        }

        return html`
            <div class="scale-labels">
                ${labelElements}
            </div>
        `;
    }

    render() {
        return html`
            <div class="vu-container">

                ${this.renderScaleLabels()}

                ${this.renderBar(this.peakValueL, false)}

                ${this.isStereo ? this.renderBar(this.peakValueR, true) : ''}

                <div class="glass-reflection"></div>
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
