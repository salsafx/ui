import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxLinearTrackElement } from '../base/FxLinearTrackElement';

@customElement('fx-linear-bar')
export class FxLinearBar extends FxLinearTrackElement {
    @property({ type: Boolean, attribute: 'has-value-display', reflect: true }) override hasValueDisplay = true;
    @property({ type: Boolean, attribute: 'is-segmented', reflect: true }) isSegmented = true;
    @property({
        type: Boolean,
        attribute: 'is-rounded',
        reflect: true,
        converter: {
            fromAttribute: (value: string | null) => value !== null && value !== 'false',
            toAttribute: (value: boolean) => (value ? '' : null),
        },
    })
    isRounded = false;
    @property({ type: String, attribute: 'track-thickness', reflect: true }) trackThickness: string | number = 'medium';

    protected get segmentCount(): number {
        if (this.ticks > 1) {
            return (this.ticks - 1) * 2;
        } else if (this.ticks >= 1) {
            return this.ticks * 2;
        } else {
            return 20;
        }
    }

    static override styles = [
        FxLinearTrackElement.styles,
        css`
            :host {
                --fx-bar-width: 110px;
                --fx-bar-track-width: 16px;
            }
            :host([orientation="horizontal"]) {
                --fx-bar-height: 110px;
            }
            :host([track-thickness="small"]) {
                --fx-bar-track-width: 10px;
            }
            :host([track-thickness="medium"]) {
                --fx-bar-track-width: 16px;
            }
            :host([track-thickness="large"]) {
                --fx-bar-track-width: 24px;
            }

            :host([is-animated]) .fill {
                transition: height 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([orientation="horizontal"][is-animated]) .fill {
                transition: width 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .fill {
                border-radius: 0;
            }
            
            :host([is-rounded]:not([orientation="horizontal"]):not([value-origin="start"])) .fill {
                border-bottom-left-radius: 999px;
                border-bottom-right-radius: 999px;
            }
            :host([is-rounded]:not([orientation="horizontal"]):not([value-origin="start"])) .fill[data-full="true"] {
                border-top-left-radius: 999px;
                border-top-right-radius: 999px;
            }
            :host([is-rounded][value-origin="start"]:not([orientation="horizontal"])) .fill {
                border-top-left-radius: 999px;
                border-top-right-radius: 999px;
            }
            :host([is-rounded][value-origin="start"]:not([orientation="horizontal"])) .fill[data-full="true"] {
                border-bottom-left-radius: 999px;
                border-bottom-right-radius: 999px;
            }
            :host([is-rounded][orientation="horizontal"]:not([value-origin="end"])) .fill {
                border-top-left-radius: 999px;
                border-bottom-left-radius: 999px;
            }
            :host([is-rounded][orientation="horizontal"]:not([value-origin="end"])) .fill[data-full="true"] {
                border-top-right-radius: 999px;
                border-bottom-right-radius: 999px;
            }
            :host([is-rounded][orientation="horizontal"][value-origin="end"]) .fill {
                border-top-right-radius: 999px;
                border-bottom-right-radius: 999px;
            }
            :host([is-rounded][orientation="horizontal"][value-origin="end"]) .fill[data-full="true"] {
                border-top-left-radius: 999px;
                border-bottom-left-radius: 999px;
            }

            :host(:not([is-rounded])) .track {
                border-radius: 2px;
            }
            :host(:not([is-rounded])) .well {
                border-radius: 3px;
            }

            .segment-lines {
                position: absolute;
                inset: 0;
                pointer-events: none;
                z-index: 1;
            }
            .segment-line {
                position: absolute;
                background: var(--fx-bar-track-color, #0b111f);
            }
            :host(:not([orientation="horizontal"])) .segment-line {
                left: 0;
                right: 0;
                height: var(--fx-linear-bar-segment-gap, 2px);
                transform: translateY(50%);
            }
            :host([orientation="horizontal"]) .segment-line {
                top: 0;
                bottom: 0;
                width: var(--fx-linear-bar-segment-gap, 2px);
                transform: translateX(-50%);
            }
        `,
    ];

    override connectedCallback() {
        super.connectedCallback();
        this.applyTrackThickness();
    }

    override updated(changed: Map<string | number | symbol, unknown>) {
        super.updated(changed);
        if (changed.has('trackThickness')) {
            this.applyTrackThickness();
            this.updateSlottedScale();
        }
    }

    private applyTrackThickness() {
        const value = String(this.trackThickness).trim().toLowerCase();
        if (/^\d+(\.\d+)?$/.test(value)) {
            this.style.setProperty('--fx-bar-track-width', `${value}px`);
        } else {
            this.style.removeProperty('--fx-bar-track-width');
        }
    }

    protected override renderTrackDecorations(_progress: number) {
        const n = Math.max(1, Math.round(this.segmentCount));
        return (
            this.isSegmented && n >= 2
                ?
                    html`
                        <div class="segment-lines" aria-hidden="true">
                            ${Array.from({ length: n - 1 }, (_, i) => {
                                const t = ((i + 1) / n) * 100;
                                const style = this.isHorizontal
                                    ? `left: ${t}%;`
                                    : `bottom: ${t}%;`;
                                return html`<div class="segment-line" style="${style}"></div>`;
                            })}
                        </div>
                    `
                :
                    nothing
        );
    }
}
