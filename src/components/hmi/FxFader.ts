import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxLinearTrackElement, type FxLinearTrackCompactLayout } from '../base/FxLinearTrackElement';

@customElement('fx-fader')
export class FxFader extends FxLinearTrackElement {
    @property({ type: Boolean, attribute: 'snap-to-ticks', reflect: true }) snapToTicks = false;
    @property({ type: Boolean, attribute: 'fit-ticks', reflect: true }) fitTicks = false;

    protected override get isInteractiveTrack(): boolean {
        return true;
    }

    protected override get thumbSizePx(): number {
        const raw = getComputedStyle(this).getPropertyValue('--fx-bar-thumb-size').trim();
        const n = parseFloat(raw);
        return Number.isFinite(n) ? n : 28;
    }

    protected override get travelPadPx(): number {
        if (this.fitTicks && this.ticks > 1) {
            return this.wellPadPx + this.trackWidthPx / 2;
        }
        return this.wellPadPx;
    }

    protected override get scaleInnerPadPx(): number {
        if (this.fitTicks && this.ticks > 1) {
            return this.wellPadPx + this.trackWidthPx / 2;
        }
        return 0;
    }

    static override styles = [
        FxLinearTrackElement.styles,
        css`
            .track-area {
                cursor: pointer;
            }
            .thumb {
                position: absolute;
                left: 50%;
                width: var(--fx-bar-thumb-size);
                height: var(--fx-bar-thumb-size);
                margin-left: calc(var(--fx-bar-thumb-size) / -2);
                border-radius: 8px;
                background: var(--fx-bar-thumb-background);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(255, 255, 255, 0.04) inset;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 3px;
                pointer-events: none;
                z-index: 2;
                transition: none;
            }
            :host([orientation="horizontal"]) .thumb {
                top: 50%;
                left: auto;
                margin-left: 0;
                margin-top: calc(var(--fx-bar-thumb-size) / -2);
                flex-direction: row;
            }
            :host([is-animated]) .thumb {
                transition: top 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([orientation="horizontal"][is-animated]) .thumb {
                transition: left 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([is-animated]) .thumb[data-dragging="true"] {
                transition: top 0.28s cubic-bezier(0.22, 1, 0.36, 1);
            }
            :host([orientation="horizontal"][is-animated]) .thumb[data-dragging="true"] {
                transition: left 0.28s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .grip {
                width: 12px;
                height: 1.5px;
                border-radius: 1px;
                background: var(--fx-bar-thumb-grip);
            }
            :host([orientation="horizontal"]) .grip {
                width: 1.5px;
                height: 12px;
            }
        `,
    ];

    protected override renderThumb(
        compact: FxLinearTrackCompactLayout | null,
        progress: number,
    ) {
        const pad = this.scaleInnerPadPx;
        const insetStart = this.trackInsetStartPx;
        const insetEnd = this.trackInsetEndPx;
        const along = this.isFillReversed ? 1 - progress : progress;
        const start = insetStart + pad;
        const travel = `100% - ${insetStart + insetEnd + pad * 2}px`;
        const thumbTravel = this.isHorizontal
            ? `calc(${start}px + (${travel}) * ${along} - (var(--fx-bar-thumb-size) / 2))`
            : `calc(${start}px + (${travel}) * ${1 - along} - (var(--fx-bar-thumb-size) / 2))`;

        const thumbStyle = this.isHorizontal
            ? (compact
                ? `left: ${thumbTravel}; top: ${compact.trackCenter}px;`
                : `left: ${thumbTravel};`)
            : (compact
                ? `top: ${thumbTravel}; left: ${compact.trackCenter}px; margin-left: calc(var(--fx-bar-thumb-size) / -2);`
                : `top: ${thumbTravel};`);

        return html`
            <div
                class="thumb"
                data-dragging="${this.isDragging}"
                style="${thumbStyle}"
            >
                <span class="grip"></span>
                <span class="grip"></span>
            </div>
        `;
    }

    override updated(changed: Map<string | number | symbol, unknown>) {
        super.updated(changed);
        if (changed.has('fitTicks')) {
            this.updateSlottedScale();
        }
    }

    private getEventDetail() {
        return {
            value: this.value,
            displayValue: this.roundedValue,
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

    protected override handleTrackMouseDown = (e: MouseEvent) => {
        if (!this.disabled) {
            e.preventDefault();
            this.startDrag(e.clientX, e.clientY);
        }
    };

    protected override handleTrackTouchStart = (e: TouchEvent) => {
        if (!this.disabled && e.touches.length > 0) {
            this.startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    private startDrag(clientX: number, clientY: number) {
        if (!this.disabled) {
            this.isDragging = true;
            this.updateValueFromPointer(clientX, clientY);
            window.addEventListener('mousemove', this.handleMouseMove);
            window.addEventListener('mouseup', this.handleMouseUp);
            window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            window.addEventListener('touchend', this.handleTouchEnd);
        }
    }

    private handleMouseMove = (e: MouseEvent) => {
        if (this.isDragging) {
            this.updateValueFromPointer(e.clientX, e.clientY);
        }
    };

    private handleTouchMove = (e: TouchEvent) => {
        if (this.isDragging && e.touches.length > 0) {
            e.preventDefault();
            this.updateValueFromPointer(e.touches[0].clientX, e.touches[0].clientY);
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

    private updateValueFromPointer(clientX: number, clientY: number) {
        const well = this.shadowRoot?.querySelector('.well');
        if (well) {
            const rect = well.getBoundingClientRect();
            const padPx = this.travelPadPx;

            let progress: number;
            if (this.fitTicks && this.ticks > 1) {
                const usable = Math.max((this.isHorizontal ? rect.width : rect.height) - padPx * 2, 1);
                if (this.isHorizontal) {
                    const x = clientX - rect.left - padPx;
                    progress = Math.min(Math.max(x / usable, 0), 1);
                } else {
                    const y = clientY - rect.top - padPx;
                    progress = 1 - Math.min(Math.max(y / usable, 0), 1);
                }
        } else {
            const thumb = this.thumbSizePx;
            const wellPad = this.wellPadPx;
            if (this.isHorizontal) {
                const usable = Math.max(rect.width - wellPad * 2 - thumb, 1);
                const x = clientX - rect.left - wellPad - thumb / 2;
                progress = Math.min(Math.max(x / usable, 0), 1);
            } else {
                const usable = Math.max(rect.height - wellPad * 2 - thumb, 1);
                const y = clientY - rect.top - wellPad - thumb / 2;
                progress = 1 - Math.min(Math.max(y / usable, 0), 1);
            }
        }

        if (this.isFillReversed) {
            progress = 1 - progress;
        }

        let exactValue = this.min + progress * (this.max - this.min);

        if (this.ticks > 1 && this.snapToTicks) {
            const step = (this.max - this.min) / (this.ticks - 1);
            const tickIndex = Math.round((exactValue - this.min) / step);
            exactValue = this.min + tickIndex * step;
        }

        this.value = exactValue;
        this.dispatchInputEvent();
        }
    }
}
