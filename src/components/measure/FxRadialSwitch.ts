import { html, svg, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable, isAnimatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';
import './FxSwitchState';
import './FxKnob';
import { FxSwitchState as FxSwitchStateElement } from './FxSwitchState';
import type { FxSwitchState } from './FxSwitch';
import { iconSlotName, syncSwitchHostIcons, switchStatesEqual } from '../base/Core';

@customElement('fx-radial-switch')
export class FxRadialSwitch extends Animatable(FxElement) {
    private readonly knobRadius = 40;
    private readonly knobGap = 4;
    private readonly defaultOuterRadius = 96;
    private readonly viewPadding = 4;
    private readonly wedgeGap = 2.5;

    @property({ type: Array }) states: FxSwitchState[] = [];
    @property({ type: String, attribute: 'active-id', reflect: true }) activeId = '';
    @property({ type: String }) color = '#ffffff';
    @property({ type: String, attribute: 'background-color' }) backgroundColor = '#3b82f6';
    @property() size: string | number = 280;
    @property({ type: Number, attribute: 'track-width' }) trackWidth = 52;

    @state() private slottedStates: FxSwitchState[] = [];
    private pointerAngle = 0;

    private get innerRadius(): number {
        return this.knobRadius + this.knobGap;
    }

    private get outerRadius(): number {
        const width = Number.isFinite(this.trackWidth) ? this.trackWidth : 52;
        return this.innerRadius + Math.max(8, width);
    }

    private get labelRadius(): number {
        return (this.outerRadius + this.innerRadius) / 2;
    }

    private get viewSize(): number {
        return (this.outerRadius + this.viewPadding) * 2;
    }

    private get centerX(): number {
        return this.viewSize / 2;
    }

    private get centerY(): number {
        return this.viewSize / 2;
    }

    private shortestAngleDelta(fromDeg: number, toDeg: number): number {
        const from = ((fromDeg % 360) + 360) % 360;
        const to = ((toDeg % 360) + 360) % 360;
        let delta = to - from;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        return delta;
    }

    private syncPointerAngle() {
        const states = this.effectiveStates;
        const count = Math.max(states.length, 1);
        let activeIndex = states.findIndex((s) => s.id === this.activeId);
        if (activeIndex < 0) activeIndex = 0;
        const target = this.segmentGeometry(count, activeIndex).mid;
        this.pointerAngle += this.shortestAngleDelta(this.pointerAngle, target);
    }

    private degToRad(d: number): number {
        return (d * Math.PI) / 180;
    }

    private polar(deg: number, radius: number): { x: number; y: number } {
        const rad = this.degToRad(deg - 90);
        return {
            x: this.centerX + radius * Math.cos(rad),
            y: this.centerY + radius * Math.sin(rad),
        };
    }

    private wedgePath(startDeg: number, endDeg: number, outerRadius: number, innerRadius: number): string {
        let end = endDeg;
        if (end <= startDeg) end += 360;
        const span = end - startDeg;
        const s1 = this.polar(startDeg, outerRadius);
        const e1 = this.polar(end, outerRadius);
        const s2 = this.polar(end, innerRadius);
        const e2 = this.polar(startDeg, innerRadius);
        const large = span > 180 ? 1 : 0;
        return `M ${s1.x} ${s1.y} A ${outerRadius} ${outerRadius} 0 ${large} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerRadius} ${innerRadius} 0 ${large} 0 ${e2.x} ${e2.y} Z`;
    }

    private resolveSize(): string {
        const value = this.size;
        let px: number | null = null;
        if (typeof value === 'number' && Number.isFinite(value)) {
            px = value;
        } else {
            const raw = String(value ?? '').trim();
            if (!raw) px = 280;
            else if (/^\d+(\.\d+)?$/.test(raw)) px = Number(raw);
            else if (/^\d+(\.\d+)?px$/i.test(raw)) px = parseFloat(raw);
            else return raw;
        }
        return `${px * (this.outerRadius / this.defaultOuterRadius)}px`;
    }

    protected get effectiveStates(): FxSwitchState[] {
        if (this.states.length > 0) return this.states;
        if (this.slottedStates.length > 0) return this.slottedStates;
        return [];
    }

    private getAssignedStateElements(): FxSwitchStateElement[] {
        const slot = this.shadowRoot?.querySelector('slot.states') as HTMLSlotElement | null;
        if (!slot) return [];
        return slot.assignedElements().filter((el): el is FxSwitchStateElement => el instanceof FxSwitchStateElement);
    }

    private syncingIcons = false;

    private syncIcons() {
        if (this.syncingIcons) return;
        this.syncingIcons = true;
        try {
            syncSwitchHostIcons(this, {
                arrayStates: this.states,
                stateElements: this.getAssignedStateElements(),
                fallbackStates: this.effectiveStates,
            });
        } finally {
            this.syncingIcons = false;
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('stateupdate', this.onStateUpdate);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('stateupdate', this.onStateUpdate);
    }

    private onStateUpdate = () => {
        this.collectSlottedStates();
        this.syncIcons();
    };

    protected collectSlottedStates() {
        const elements = this.getAssignedStateElements();
        const next = elements.map((s) => ({
            id: s.value,
            label: s.label,
            icon: s.icon || undefined,
            color: s.color || undefined,
            backgroundColor: s.backgroundColor || undefined,
        }));
        if (!switchStatesEqual(this.slottedStates, next)) {
            this.slottedStates = next;
        }

        const effective = this.effectiveStates;
        if (!this.activeId && effective.length > 0) {
            this.activeId = effective[0].id;
        }
    }

    firstUpdated() {
        this.collectSlottedStates();
        this.syncIcons();
        const effective = this.effectiveStates;
        if (!this.activeId && effective.length > 0) {
            this.activeId = effective[0].id;
        }
    }

    willUpdate(changed: Map<string | number | symbol, unknown>) {
        if (
            changed.has('activeId') ||
            changed.has('states') ||
            changed.has('slottedStates')
        ) {
            this.syncPointerAngle();
        }
    }

    updated(changed: Map<string | number | symbol, unknown>) {
        if (changed.has('states') || changed.has('slottedStates')) {
            this.syncIcons();
        }
        if (changed.has('activeId') || changed.has('states') || changed.has('slottedStates') || changed.has('isAnimated')) {
            this.updateSlottedKnob();
        }
    }

    private updateSlottedKnob() {
        const slot = this.shadowRoot?.querySelector('slot[name="knob"]') as HTMLSlotElement | null;
        if (!slot) return;
        const customKnob = slot.assignedElements()[0] as any;
        if (!customKnob) return;
        if ('angle' in customKnob) customKnob.angle = this.pointerAngle;
        if (isAnimatable(customKnob)) customKnob.isAnimated = this.isAnimated;
    }

    protected handleStateChange(id: string) {
        if (this.activeId === id) return;
        this.activeId = id;
        const stateObj = this.effectiveStates.find((s) => s.id === id);
        this.dispatchEvent(new CustomEvent('change', {
            detail: { id, state: stateObj },
            bubbles: true,
            composed: true,
        }));
    }

    private segmentGeometry(count: number, index: number) {
        const span = 360 / Math.max(count, 1);
        const start = index * span;
        const end = (index + 1) * span;
        const mid = index * span + span / 2;
        return { start, end, mid, span };
    }

    private onStatesSlotChange = () => {
        this.collectSlottedStates();
        this.syncIcons();
    };

    static styles = [
        themeVariables,
        css`
            :host {
                display: inline-block;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-knob: #1e293b;
                --fx-knob-ring: #334155;
                --fx-knob-pointer: #f8fafc;
                --fx-radial-switch-gap: #0f172a;
                --fx-radial-switch-shadow-opacity: 0.35;
            }
            .radial {
                position: relative;
                width: var(--fx-radial-switch-size, 280px);
                height: var(--fx-radial-switch-size, 280px);
            }
            .radial svg {
                display: block;
                width: 100%;
                height: 100%;
                overflow: visible;
            }
            .wedge {
                cursor: pointer;
                transition: filter 0.2s ease;
            }
            .wedge:hover:not(.active) {
                filter: brightness(1.08);
            }
            .wedge-gap {
                stroke: var(--fx-radial-switch-gap);
                stroke-linecap: butt;
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
            .knob-host ::slotted(*) {
                display: block;
                width: 100%;
                height: 100%;
            }
            .labels {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }
            .label-btn {
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 4px;
                border: none;
                background: none;
                padding: 0;
                margin: 0;
                cursor: pointer;
                pointer-events: auto;
                color: var(--label-color, #ffffff);
                transform: translate(-50%, -50%);
                max-width: 28%;
            }
            .label-icon {
                font-size: var(--fx-radial-switch-icon-size, 0.95rem);
                line-height: 1;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            .label-icon[hidden] {
                display: none !important;
            }
            ::slotted([slot^="icon-"]) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
            }
            .label-text {
                font-size: var(--fx-radial-switch-font-size, 0.62rem);
                font-weight: 600;
                letter-spacing: 0.04em;
                line-height: 1.1;
                text-align: center;
            }
            .label-text[hidden] {
                display: none !important;
            }
        `,
    ];

    render() {
        const states = this.effectiveStates;
        const N = Math.max(states.length, 1);
        const size = this.resolveSize();
        const view = this.viewSize;
        const cx = this.centerX;
        const cy = this.centerY;

        return html`
            <slot class="states" @slotchange=${this.onStatesSlotChange} style="display:none;"></slot>

            <div class="radial" style="--fx-radial-switch-size: ${size};">
                <svg viewBox="0 0 ${view} ${view}" aria-hidden="true">
                    <defs>
                        <filter id="fx-radial-pressed" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
                            <feComponentTransfer in="SourceGraphic" result="darkened">
                                <feFuncR type="linear" slope="0.79"></feFuncR>
                                <feFuncG type="linear" slope="0.79"></feFuncG>
                                <feFuncB type="linear" slope="0.79"></feFuncB>
                            </feComponentTransfer>
                            <feOffset in="darkened" dx="0" dy="1.9" result="offset"></feOffset>
                            <feGaussianBlur in="offset" stdDeviation="2.6" result="blurred"></feGaussianBlur>
                            <feComposite operator="out" in="darkened" in2="blurred" result="inverse"></feComposite>
                            <feFlood flood-color="#000000" flood-opacity="var(--fx-radial-switch-shadow-opacity)" result="shadowColor"></feFlood>
                            <feComposite operator="in" in="shadowColor" in2="inverse" result="shadow"></feComposite>
                            <feComposite operator="over" in="shadow" in2="darkened"></feComposite>
                        </filter>
                    </defs>

                    <circle cx="${cx}" cy="${cy}" r="${this.outerRadius + 1}" fill="var(--fx-radial-switch-gap)" />

                    ${states.map((stateObj, i) => {
                        const { start, end } = this.segmentGeometry(N, i);
                        const fill = stateObj.backgroundColor || this.backgroundColor;
                        const isActive = stateObj.id === this.activeId;
                        return svg`
                            <path
                                class="wedge ${isActive ? 'active' : ''}"
                                d="${this.wedgePath(start, end, this.outerRadius, this.innerRadius)}"
                                fill="${fill}"
                                filter="${isActive ? 'url(#fx-radial-pressed)' : 'none'}"
                                @click=${() => this.handleStateChange(stateObj.id)}
                            />
                        `;
                    })}

                    ${states.map((_, i) => {
                        const { start } = this.segmentGeometry(N, i);
                        const inner = this.polar(start, this.innerRadius - 0.5);
                        const outer = this.polar(start, this.outerRadius + 0.5);
                        return svg`
                            <line
                                class="wedge-gap"
                                x1="${inner.x}"
                                y1="${inner.y}"
                                x2="${outer.x}"
                                y2="${outer.y}"
                                stroke-width="${this.wedgeGap}"
                            />
                        `;
                    })}
                </svg>

                <div
                    class="knob-host"
                    style="width: ${(this.knobRadius * 2 / view) * 100}%; height: ${(this.knobRadius * 2 / view) * 100}%;"
                >
                    <slot name="knob" @slotchange=${this.updateSlottedKnob}>
                        <fx-knob
                            .angle=${this.pointerAngle}
                            .isAnimated=${this.isAnimated}
                        ></fx-knob>
                    </slot>
                </div>

                <div class="labels">
                    ${states.map((stateObj, i) => {
                        const { mid } = this.segmentGeometry(N, i);
                        const pt = this.polar(mid, this.labelRadius);
                        const left = (pt.x / view) * 100;
                        const top = (pt.y / view) * 100;
                        const labelColor = stateObj.color || this.color;
                        const slotName = iconSlotName(stateObj.id);
                        const hasLabel = !!stateObj.label?.trim();

                        return html`
                            <button
                                type="button"
                                class="label-btn"
                                style="left: ${left}%; top: ${top}%; --label-color: ${labelColor};"
                                @click=${() => this.handleStateChange(stateObj.id)}
                            >
                                <span class="label-icon">
                                    <slot name="${slotName}"></slot>
                                </span>
                                <span class="label-text" ?hidden=${!hasLabel}>${stateObj.label}</span>
                            </button>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}
