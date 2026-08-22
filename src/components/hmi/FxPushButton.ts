import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { hostHasNamedSlot, syncHostIcon, Variant, type VariantAttribute } from '../base/FxCore';
import { themeVariables } from '../styles/FxTheme';
import '../common/FxIcon';

@customElement('fx-push-button')
export class FxPushButton extends Animatable(FxElement) {
    @property({ type: String }) label = '';
    @property({ type: String, attribute: 'label-position', reflect: true }) labelPosition: 'inside' | 'plate' | 'none' = 'plate';
    @property({ type: String }) type: 'momentary' | 'latching' = 'momentary';
    @property({ type: Boolean, attribute: 'is-active', reflect: true }) isActive = false;
    @property({ type: String, attribute: 'background-color' }) backgroundColor = '';
    @property({ type: String, attribute: 'foreground-color' }) foregroundColor = '';
    @property({ reflect: true, converter: Variant.reflectOptional })
    variant?: VariantAttribute;
    @property({ type: String }) icon = '';
    @property({ type: String, attribute: 'icon-rendering-mode', reflect: true })
    iconRenderingMode: 'shaded' | 'foregroundColor' = 'shaded';
    @property({ type: String, attribute: 'text-rendering-mode', reflect: true })
    textRenderingMode: 'shaded' | 'foregroundColor' = 'foregroundColor';
    @property({ type: String, reflect: true }) shape: 'round' | 'pill' | 'rect' | 'roundedRect' = 'round';

    @state() private isPressedDown = false;
    @state() private hasIcon = false;

    private syncingIcons = false;
    private iconPresenceKey = '';

    private syncIcons() {
        if (!this.syncingIcons) {
            this.syncingIcons = true;
            try {
                syncHostIcon(this, this.icon);
                const key = hostHasNamedSlot(this, 'icon') ? 'icon' : '';
                if (key !== this.iconPresenceKey) {
                    this.iconPresenceKey = key;
                    this.hasIcon = !!key;
                    this.requestUpdate();
                }
            } finally {
                this.syncingIcons = false;
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('mouseup', this.handleGlobalRelease);
        window.addEventListener('touchend', this.handleGlobalRelease);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('mouseup', this.handleGlobalRelease);
        window.removeEventListener('touchend', this.handleGlobalRelease);
    }

    protected firstUpdated() {
        this.syncIcons();
    }

    protected updated(changed: Map<string | number | symbol, unknown>) {
        if (changed.has('icon')) this.syncIcons();
    }

    private handleSlotChange() {
        this.syncIcons();
    }

    private handleGlobalRelease = () => {
        if (!this.disabled) {
            if (this.type === 'momentary' && this.isPressedDown) {
                this.isPressedDown = false;
                this.isActive = false;
                this.dispatchChangeEvent();
                this.dispatchEvent(new CustomEvent('release', { bubbles: true, composed: true }));
            }
        }
    };

    private handlePress(e: Event) {
        if (!this.disabled) {
            e.preventDefault();

            this.isPressedDown = true;

            if (this.type === 'momentary') {
                this.isActive = true;
                this.dispatchChangeEvent();
                this.dispatchEvent(new CustomEvent('press', { bubbles: true, composed: true }));
            } else {
                this.isActive = !this.isActive;
                this.dispatchChangeEvent();
                this.dispatchEvent(new CustomEvent('press', {
                    detail: { active: this.isActive, isActive: this.isActive },
                    bubbles: true,
                    composed: true
                }));
            }
        }
    }

    private handleRelease() {
        if (!this.disabled) {
            if (this.type === 'momentary' && this.isPressedDown) {
                this.isPressedDown = false;
                this.isActive = false;
                this.dispatchChangeEvent();
                this.dispatchEvent(new CustomEvent('release', { bubbles: true, composed: true }));
            } else {
                this.isPressedDown = false;
            }
        }
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (!this.disabled) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!this.isPressedDown) {
                    this.handlePress(e);
                }
            }
        }
    }

    private handleKeyUp(e: KeyboardEvent) {
        if (!this.disabled) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.handleRelease();
            }
        }
    }

    private dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { active: this.isActive, isActive: this.isActive, type: this.type },
            bubbles: true,
            composed: true
        }));
    }

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

            .label-plate {
                font-family: var(--fx-font-family, sans-serif);
                font-size: var(--fx-push-button-font-size, 0.875rem);
                font-weight: 700;
                letter-spacing: 0.01em;
                line-height: 1.2;
                color: var(--fx-gauge-text-secondary, #9ca3af);
                margin-bottom: 12px;
                text-align: center;
                box-sizing: border-box;
            }

            :host([shape="round"]) .bezel-glossy {
                border-radius: 50%;
                width: 48px;
                height: 48px;
            }

            :host([shape="pill"]) .bezel-glossy {
                border-radius: 9999px;
                min-width: 118px;
                height: 48px;
            }

            :host([shape="rect"]) .bezel-glossy {
                border-radius: 2px;
                min-width: 118px;
                height: 48px;
            }

            :host([shape="roundedRect"]) .bezel-glossy {
                border-radius: var(--fx-switch-btn-border-radius, 12px);
                min-width: 118px;
                height: 48px;
            }

            :host(:not([is-animated])) .cap-glossy,
            :host(:not([is-animated])) ::slotted([slot="icon"]) {
                transition: none !important;
            }

            .groove-glossy {
                background: #111827;
                border-radius: inherit;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.7);
                padding: 1.5px;
                box-sizing: border-box;
            }

            .cap-glossy {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                cursor: pointer;
                outline: none;
                transition: 
                    transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
                    filter 0.3s ease,
                    box-shadow 0.3s ease;

                background-color: var(--fx-push-button-background-color, #6366f1);
                border: 1px solid rgba(0, 0, 0, 0.2);
                overflow: hidden;
            }
            :host([label-position="inside"]) .cap-glossy {
                flex-direction: row;
                gap: 4px;
                padding: 0 16px;
            }

            .cap-glossy:hover {
                filter: brightness(1.06);
            }

            .bezel-glossy:active .cap-glossy,
            :host([is-active]) .cap-glossy {
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
                filter: brightness(0.92);
                transform: translateY(1px);
            }

            .internal-label {
                font-family: var(--fx-font-family, sans-serif);
                font-size: var(--fx-push-button-font-size, 1rem);
                font-weight: 700;
                letter-spacing: 0.01em;
                line-height: 1.2;
                white-space: nowrap;
                color: var(--fx-push-button-foreground-color, #ffffff);
                text-align: center;
                padding: 0 4px;
                pointer-events: none;
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--fx-switch-icon-gap, 6px);
            }
            :host([text-rendering-mode="shaded"]) .internal-label {
                color: rgba(0, 0, 0, 0.35);
            }

            .status-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                pointer-events: none;
                z-index: 2;
            }
            :host([label-position="inside"]) .status-indicator {
                width: auto;
                height: auto;
            }

            .status-indicator[hidden] {
                display: none !important;
            }

            ::slotted([slot="icon"]) {
                color: rgba(0, 0, 0, 0.35);
                font-size: var(--fx-switch-icon-size, 1.125rem);
                line-height: 1;
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                transition: transform 0.1s ease, filter 0.15s ease;
            }
            :host([icon-rendering-mode="foregroundColor"]) ::slotted([slot="icon"]) {
                color: var(--fx-push-button-foreground-color, #ffffff);
            }

            :host([is-active]) ::slotted([slot="icon"]) {
                transform: scale(0.95);
            }
        `
    ];

    private get indicatorContent() {
        if (this.hasIcon || this.icon?.trim()) {
            return html`
                <div class="status-indicator">
                    <slot name="icon" @slotchange="${this.handleSlotChange}"></slot>
                </div>
            `;
        }
        return html`<slot name="icon" @slotchange="${this.handleSlotChange}"></slot>`;
    }

    private get resolvedBackgroundColor(): string {
        return Variant.resolvedColor(this.backgroundColor, this.variant, '#6366f1');
    }

    private get resolvedForegroundColor(): string {
        return Variant.resolvedColor(this.foregroundColor, this.variant, '#ffffff', 'foreground');
    }

    render() {
        const { indicatorContent } = this;

        const labelContent = this.label && this.labelPosition === 'inside' ? html`
            <div class="internal-label">
                <span>${this.label}</span>
            </div>
        ` : html`
            <div class="internal-label">
                <slot></slot>
            </div>
        `;

        return html`
            ${this.label && this.labelPosition === 'plate' ? html`
                <div class="label-plate">${this.label}</div>
            ` : ''}

            ${html`
                <div 
                    class="bezel-glossy"
                    @mousedown="${this.handlePress}"
                    @mouseup="${this.handleRelease}"
                    @mouseleave="${this.handleRelease}"
                    @touchstart="${this.handlePress}"
                    @touchend="${this.handleRelease}"
                >
                    <div class="groove-glossy">
                        <div 
                            class="cap-glossy"
                            style="
                                --fx-push-button-background-color: ${this.resolvedBackgroundColor};
                                --fx-push-button-foreground-color: ${this.resolvedForegroundColor};
                            "
                            role="button"
                            tabindex="0"
                            aria-pressed="${this.isActive}"
                            aria-disabled="${this.disabled}"
                            @keydown="${this.handleKeyDown}"
                            @keyup="${this.handleKeyUp}"
                        >
                            ${indicatorContent}
                            ${labelContent}
                        </div>
                    </div>
                </div>
            `}
        `;
    }
}
