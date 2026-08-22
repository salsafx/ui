import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { hostHasIconSlot, iconSlotName, syncSwitchHostIcons, Variant, type VariantAttribute } from '../base/FxCore';
import { themeVariables } from '../styles/FxTheme';
import '../common/FxIcon';
import './FxSemaphoreState';
import { FxSemaphoreState as FxSemaphoreStateElement } from './FxSemaphoreState';
import './FxLedIndicator';

export interface FxSemaphoreStateData {
    value: string;
    color: string;
    variant?: VariantAttribute;
    label: string;
    icon?: string;
    isBlinking?: boolean;
}

@customElement('fx-semaphore')
export class FxSemaphore extends Animatable(FxElement) {
    static readonly defaultStates: ReadonlyArray<FxSemaphoreStateData> = [
        { value: 'stop', color: '', variant: Variant.Danger, label: '' },
        { value: 'warn', color: '', variant: Variant.Warning, label: '' },
        { value: 'go', color: '', variant: Variant.Success, label: '' },
    ];

    @property({ type: String }) value = '';
    @property({ type: String }) label = '';
    @property({ type: Boolean, attribute: 'has-shell', reflect: true }) hasShell = true;
    @property({ type: String, reflect: true })
    size: 'small' | 'medium' | 'large' | 'x-large' = 'medium';
    @property({ type: String, reflect: true })
    orientation: 'horizontal' | 'vertical' = 'vertical';

    @state() private slottedStates: FxSemaphoreStateData[] = [];

    private syncingIcons = false;
    private iconPresenceKey = '';

    protected get effectiveStates(): FxSemaphoreStateData[] {
        return this.slottedStates.length > 0 ? this.slottedStates : [...FxSemaphore.defaultStates];
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

    private getAssignedStateElements(): FxSemaphoreStateElement[] {
        const slot = this.shadowRoot?.querySelector('slot.states') as HTMLSlotElement | null;
        if (slot) {
            return slot.assignedElements().filter((el): el is FxSemaphoreStateElement => el instanceof FxSemaphoreStateElement);
        } else {
            return [];
        }
    }

    private statesEqual(a: FxSemaphoreStateData[], b: FxSemaphoreStateData[]): boolean {
        if (a.length !== b.length) {
            return false;
        } else {
            return a.every((s, i) =>
                s.value === b[i].value &&
                s.color === b[i].color &&
                s.variant === b[i].variant &&
                s.label === b[i].label &&
                (s.icon || '') === (b[i].icon || '') &&
                !!s.isBlinking === !!b[i].isBlinking
            );
        }
    }

    protected collectSlottedStates() {
        const next = this.getAssignedStateElements().map((s) => ({
            value: s.value,
            color: s.color || '',
            variant: s.variant,
            label: s.label || '',
            icon: s.icon || undefined,
            isBlinking: s.isBlinking,
        }));
        if (!this.statesEqual(this.slottedStates, next)) {
            this.slottedStates = next;
        }
    }

    private syncIcons() {
        if (!this.syncingIcons) {
            this.syncingIcons = true;
            try {
                const stateElements = this.getAssignedStateElements();
                syncSwitchHostIcons(this, {
                    arrayStates: [],
                    stateElements,
                    fallbackStates: this.effectiveStates.map((s) => ({ id: s.value, icon: s.icon })),
                });
                const key = this.effectiveStates
                    .filter((s) => hostHasIconSlot(this, s.value))
                    .map((s) => s.value)
                    .join('\0');
                if (key !== this.iconPresenceKey) {
                    this.iconPresenceKey = key;
                    this.requestUpdate();
                }
            } finally {
                this.syncingIcons = false;
            }
        }
    }

    firstUpdated() {
        this.collectSlottedStates();
        this.syncIcons();
    }

    updated(changed: Map<string | number | symbol, unknown>) {
        super.updated(changed);
        if (changed.has('slottedStates')) {
            this.syncIcons();
        }
    }

    private onStatesSlotChange = () => {
        this.collectSlottedStates();
        this.syncIcons();
    };

    static styles = [
        themeVariables,
        css`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                vertical-align: middle;
            }

            .shell {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding: 12px 10px;
                background: #1e293b;
                border: 1.5px solid #334155;
                border-radius: 12px;
                box-sizing: border-box;
            }

            :host([orientation="horizontal"]) .shell {
                flex-direction: row;
                padding: 10px 12px;
            }

            :host(:not([has-shell])) .shell {
                background: transparent;
                border: none;
                padding: 0;
                border-radius: 0;
            }

            .lamp {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }

            .lamp-caption {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                line-height: 1;
            }

            .lamp-caption[hidden] {
                display: none !important;
            }

            .lamp-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: var(--fx-semaphore-icon-size, 0.85rem);
                line-height: 1;
                pointer-events: none;
            }

            .lamp-icon[hidden] {
                display: none !important;
            }

            ::slotted([slot^="icon-"]) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
            }

            .lamp-text {
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: 0.7rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                text-align: center;
                white-space: nowrap;
            }

            :host([size="small"]) .lamp-text {
                font-size: 0.6rem;
            }

            :host([size="small"]) .lamp-icon {
                font-size: 0.7rem;
            }

            :host([size="large"]) .lamp-text {
                font-size: 0.75rem;
            }

            :host([size="large"]) .lamp-icon {
                font-size: 1rem;
            }

            :host([size="x-large"]) .lamp-text {
                font-size: 0.8rem;
            }

            :host([size="x-large"]) .lamp-icon {
                font-size: 1.125rem;
            }

            .label-plate {
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: 0.7rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                text-align: center;
                line-height: 1;
                white-space: nowrap;
                margin-top: 10px;
            }

            :host([size="small"]) .label-plate {
                font-size: 0.6rem;
            }

            :host([size="large"]) .label-plate {
                font-size: 0.75rem;
            }

            :host([size="x-large"]) .label-plate {
                font-size: 0.8rem;
            }
        `,
    ];

    render() {
        const states = this.effectiveStates;

        return html`
            <slot class="states" @slotchange=${this.onStatesSlotChange} style="display:none;"></slot>

            <div class="shell" role="img" aria-label="${this.label || 'semaphore'}">
                ${states.map((stateObj) => {
                    const slotName = iconSlotName(stateObj.value);
                    const hasIcon = !!stateObj.icon?.trim() || hostHasIconSlot(this, stateObj.value);
                    const hasLabel = !!stateObj.label;
                    const hasCaption = hasIcon || hasLabel;

                    return html`
                        <div class="lamp">
                            <div class="lamp-caption" ?hidden=${!hasCaption}>
                                <span class="lamp-icon" ?hidden=${!hasIcon}>
                                    <slot name="${slotName}"></slot>
                                </span>
                                ${hasLabel
                                    ? html`<span class="lamp-text">${stateObj.label}</span>`
                                    : ''}
                            </div>
                            <fx-led-indicator
                                label-position="none"
                                shape="round"
                                size="${this.size}"
                                color="${Variant.resolvedColor(stateObj.color, stateObj.variant, '#22c55e')}"
                                ?is-active=${this.value === stateObj.value}
                                ?is-blinking=${!!stateObj.isBlinking}
                                ?is-animated=${this.isAnimated}
                                ?disabled=${this.disabled}
                            ></fx-led-indicator>
                        </div>
                    `;
                })}
            </div>

            ${this.label
                ? html`<div class="label-plate">${this.label}</div>`
                : ''}
        `;
    }
}
