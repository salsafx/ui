import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';
import './FxSwitchState';
import { FxSwitchState as FxSwitchStateElement } from './FxSwitchState';
import { hostHasIconSlot, iconSlotName, syncSwitchHostIcons, switchStatesEqual } from '../base/Core';

export interface FxSwitchState {
    id: string;
    label: string;
    icon?: string;
    color?: string;
    backgroundColor?: string;
}

@customElement('fx-switch')
export class FxSwitch extends Animatable(FxElement) {
    @property({ type: Array }) states: FxSwitchState[] = [];
    @property({ type: String, attribute: 'active-id', reflect: true }) activeId = '';
    @property({ type: String, reflect: true }) orientation = 'horizontal';
    @property({ type: String, reflect: true }) theme: 'light' | 'dark' = 'dark';
    @property({ type: String }) color = '#ffffff';
    @property({ type: String, attribute: 'background-color' }) backgroundColor = '#3b82f6';
    @property({ attribute: 'state-width' }) stateWidth: string | number = 72;

    @state() private slottedStates: FxSwitchState[] = [];

    private resolveStateWidth(): string {
        const value = this.stateWidth;
        if (typeof value === 'number' && Number.isFinite(value)) return `${value}px`;
        const raw = String(value ?? '').trim();
        if (!raw) return '72px';
        if (/^\d+(\.\d+)?$/.test(raw)) return `${raw}px`;
        return raw;
    }

    protected get effectiveStates(): FxSwitchState[] {
        if (this.states.length > 0) return this.states;
        if (this.slottedStates.length > 0) return this.slottedStates;
        return [
            { id: 'off', label: 'OFF', color: '#6b7280', backgroundColor: '#f3f4f6' },
            { id: 'on', label: 'ON', color: '#ffffff', backgroundColor: '#3b82f6' },
        ];
    }

    private getAssignedStateElements(): FxSwitchStateElement[] {
        const slot = this.shadowRoot?.querySelector('slot.states') as HTMLSlotElement | null;
        if (!slot) return [];
        return slot.assignedElements().filter((el): el is FxSwitchStateElement => el instanceof FxSwitchStateElement);
    }

    private syncingIcons = false;
    private iconPresenceKey = '';

    private syncIcons() {
        if (this.syncingIcons) return;
        this.syncingIcons = true;
        try {
            syncSwitchHostIcons(this, {
                arrayStates: this.states,
                stateElements: this.getAssignedStateElements(),
                fallbackStates: this.effectiveStates,
            });
            const key = this.effectiveStates
                .filter((s) => hostHasIconSlot(this, s.id))
                .map((s) => s.id)
                .join('\0');
            if (key !== this.iconPresenceKey) {
                this.iconPresenceKey = key;
                this.requestUpdate();
            }
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

    updated(changed: Map<string | number | symbol, unknown>) {
        if (changed.has('states') || changed.has('slottedStates')) {
            this.syncIcons();
        }
    }

    protected handleStateChange(id: string) {
        if (this.activeId !== id) {
            this.activeId = id;
            const stateObj = this.effectiveStates.find((s) => s.id === id);
            this.dispatchEvent(new CustomEvent('change', {
                detail: { id, state: stateObj },
                bubbles: true,
                composed: true,
            }));
        }
    }

    static styles = [
        themeVariables,
        css`
            :host {
                display: inline-flex;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
            }
            :host([orientation="horizontal"]) {
                flex-direction: row;
            }
            :host([orientation="vertical"]) {
                flex-direction: column;
            }
            :host([theme="dark"]) {
                --fx-switch-track-color: #1e293b;
                --fx-switch-border-color: #334155;
                --fx-switch-text-inactive: #94a3b8;
                --fx-switch-text-hover: #f8fafc;
                --fx-switch-divider-color: #475569;
                --fx-switch-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
            }
            .switch-container {
                display: inline-flex;
                background-color: var(--fx-switch-track-color, #ffffff);
                border-radius: var(--fx-switch-border-radius, 16px);
                padding: var(--fx-switch-padding, 4px);
                position: relative;
                gap: 0;
                border: 1px solid var(--fx-switch-border-color, #e5e7eb);
                box-shadow: var(--fx-switch-shadow, 0 1px 2px rgba(15, 23, 42, 0.06));
                box-sizing: border-box;
            }
            :host([orientation="horizontal"]) .switch-container {
                flex-direction: row;
                width: 100%;
            }
            :host([orientation="vertical"]) .switch-container {
                flex-direction: column;
                height: 100%;
            }
            .switch-thumb {
                position: absolute;
                top: var(--fx-switch-padding, 4px);
                bottom: var(--fx-switch-padding, 4px);
                left: var(--fx-switch-padding, 4px);
                border-radius: var(--fx-switch-btn-border-radius, 12px);
                transition: none;
                z-index: 1;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06);
            }
            :host([is-animated]) .switch-thumb {
                transition: transform 0.28s cubic-bezier(0.1, 1, 0.1, 1), background-color 0.24s ease-out;
            }
            .switch-button {
                flex: 1 1 0%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: var(--fx-switch-icon-gap, 6px);
                border: none;
                background: none;
                cursor: pointer;
                font-size: var(--fx-switch-font-size, 0.8125rem);
                font-weight: 700;
                padding: var(--fx-switch-btn-padding, 12px 18px);
                border-radius: var(--fx-switch-btn-border-radius, 12px);
                transition: none;
                color: var(--fx-switch-text-inactive, #374151);
                position: relative;
                z-index: 2;
                letter-spacing: 0.01em;
                min-width: var(--fx-switch-state-width, 72px);
                box-sizing: border-box;
            }
            :host([orientation="horizontal"]) .switch-button {
                width: 0;
            }
            :host([orientation="vertical"]) .switch-button {
                height: 0;
            }
            :host([is-animated]) .switch-button {
                transition: color 0.24s ease-out;
            }
            :host([orientation="vertical"]) .switch-button {
                padding: var(--fx-switch-btn-padding-vert, 14px 12px);
                min-width: var(--fx-switch-state-width, 96px);
            }
            .switch-button:hover:not(.active) {
                color: var(--fx-switch-text-hover, #111827);
            }
            .switch-button.active {
                color: var(--active-text-color, #ffffff);
                font-weight: 700;
            }
            .switch-icon {
                display: inline-flex;
                font-size: var(--fx-switch-icon-size, 1.125rem);
                line-height: 1;
                pointer-events: none;
                align-items: center;
                justify-content: center;
            }
            .switch-icon[hidden] {
                display: none !important;
            }
            ::slotted([slot^="icon-"]) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
            }
            .switch-label {
                line-height: 1.2;
                white-space: nowrap;
            }

            :host([orientation="horizontal"]) .switch-button:not(.active):not(:last-child)::after {
                content: '';
                position: absolute;
                top: 2.5%;
                bottom: 2.5%;
                right: 0;
                width: 1px;
                background: linear-gradient(
                    to bottom,
                    transparent 0%,
                    var(--fx-switch-divider-color, #e5e7eb) 18%,
                    var(--fx-switch-divider-color, #e5e7eb) 82%,
                    transparent 100%
                );
                pointer-events: none;
            }
            :host([orientation="horizontal"]) .switch-button:has(+ .active)::after,
            :host([orientation="horizontal"]) .switch-button.active::after {
                display: none;
            }

            :host([orientation="vertical"]) .switch-button:not(.active):not(:last-child)::after {
                content: '';
                position: absolute;
                left: 2.5%;
                right: 2.5%;
                bottom: 0;
                height: 1px;
                background: linear-gradient(
                    to right,
                    transparent 0%,
                    var(--fx-switch-divider-color, #e5e7eb) 18%,
                    var(--fx-switch-divider-color, #e5e7eb) 82%,
                    transparent 100%
                );
                pointer-events: none;
            }
            :host([orientation="vertical"]) .switch-button:has(+ .active)::after,
            :host([orientation="vertical"]) .switch-button.active::after {
                display: none;
            }
        `,
    ];

    render() {
        const states = this.effectiveStates;
        const N = states.length;
        const activeIndex = Math.max(0, states.findIndex((s) => s.id === this.activeId));
        const activeState = states[activeIndex];

        const thumbBg = activeState?.backgroundColor || this.backgroundColor || '#3b82f6';
        const activeTextColor = activeState?.color || this.color || '#ffffff';

        const isHorizontal = this.orientation === 'horizontal';
        const stateWidth = this.resolveStateWidth();

        const thumbStyle = isHorizontal
            ? `
                width: calc((100% - 2 * var(--fx-switch-padding, 4px)) / ${N});
                height: calc(100% - 2 * var(--fx-switch-padding, 4px));
                transform: translateX(calc(${activeIndex} * 100%));
                background-color: ${thumbBg};
            `
            : `
                height: calc((100% - 2 * var(--fx-switch-padding, 4px)) / ${N});
                width: calc(100% - 2 * var(--fx-switch-padding, 4px));
                transform: translateY(calc(${activeIndex} * 100%));
                background-color: ${thumbBg};
            `;

        return html`
            <slot class="states" @slotchange=${this.onStatesSlotChange} style="display:none;"></slot>

            <div class="switch-container" style="--fx-switch-state-width: ${stateWidth};">
                <div class="switch-thumb" style="${thumbStyle}"></div>

                ${states.map((stateObj) => {
                    const isActive = this.activeId === stateObj.id;
                    const styleMap = isActive ? `--active-text-color: ${activeTextColor};` : '';
                    const slotName = iconSlotName(stateObj.id);
                    const hasIcon = !!stateObj.icon?.trim() || hostHasIconSlot(this, stateObj.id);

                    return html`
                        <button
                            type="button"
                            class="switch-button ${isActive ? 'active' : ''}"
                            style="${styleMap}"
                            @click=${() => this.handleStateChange(stateObj.id)}
                        >
                            <span class="switch-icon" ?hidden=${!hasIcon}>
                                <slot name="${slotName}"></slot>
                            </span>
                            <span class="switch-label">${stateObj.label}</span>
                        </button>
                    `;
                })}
            </div>
        `;
    }

    private onStatesSlotChange = () => {
        this.collectSlottedStates();
        this.syncIcons();
    };
}
