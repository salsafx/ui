import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';

@customElement('fx-push-button')
export class FxPushButton extends Animatable(FxElement) {
    @property({ type: String }) label = '';
    @property({ type: String, attribute: 'label-position' }) labelPosition: 'inside' | 'plate' | 'none' = 'plate';
    @property({ type: String }) type: 'momentary' | 'latching' = 'momentary';
    @property({ type: Boolean, attribute: 'is-active', reflect: true }) isActive = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) color = '#ef4444';
    @property({ type: String, reflect: true }) shape: 'round' | 'rect' | 'square' | 'pill' = 'round';
    @property({ type: Boolean, attribute: 'has-rounded-corners', reflect: true }) hasRoundedCorners = true;

    @state() private isPressedDown = false;
    @state() private hasIcon = false;

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

    private handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        const assigned = slot.assignedNodes({ flatten: true }).filter(node => {
            if (node.nodeType === Node.ELEMENT_NODE) return true;
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) return true;
            return false;
        });
        this.hasIcon = assigned.length > 0;
    }

    private handleGlobalRelease = () => {
        if (this.disabled) return;
        if (this.type === 'momentary' && this.isPressedDown) {
            this.isPressedDown = false;
            this.isActive = false;
            this.dispatchChangeEvent();
            this.dispatchEvent(new CustomEvent('release', { bubbles: true, composed: true }));
        }
    };

    private handlePress(e: Event) {
        if (this.disabled) return;
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

    private handleRelease() {
        if (this.disabled) return;

        if (this.type === 'momentary' && this.isPressedDown) {
            this.isPressedDown = false;
            this.isActive = false;
            this.dispatchChangeEvent();
            this.dispatchEvent(new CustomEvent('release', { bubbles: true, composed: true }));
        } else {
            this.isPressedDown = false;
        }
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (this.disabled) return;
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!this.isPressedDown) {
                this.handlePress(e);
            }
        }
    }

    private handleKeyUp(e: KeyboardEvent) {
        if (this.disabled) return;
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.handleRelease();
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

            :host([disabled]) {
                opacity: 0.5;
                cursor: not-allowed;
            }

            :host([disabled]) .bezel-glossy {
                pointer-events: none;
            }

            .label-plate {
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: 0.7rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin-bottom: 12px;
                text-align: center;
                box-sizing: border-box;
            }

            :host([shape="round"]) .bezel-glossy {
                border-radius: 50%;
                width: 48px;
                height: 48px;
            }

            :host([shape="rect"]) .bezel-glossy {
                border-radius: 18px;
                min-width: 118px;
                height: 48px;
            }

            :host([shape="square"]) .bezel-glossy {
                border-radius: 12px;
                width: 48px;
                height: 48px;
            }

            :host([shape="pill"]) .bezel-glossy {
                border-radius: 9999px;
                min-width: 118px;
                height: 48px;
            }

            :host(:not([has-rounded-corners])) .bezel-glossy {
                border-radius: 2px !important;
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

                background-color: var(--button-color, #ef4444);
                border: 1px solid rgba(0, 0, 0, 0.2);
                overflow: hidden;
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
                font-size: 0.75rem;
                font-weight: 800;
                color: #ffffff;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                text-align: center;
                padding: 0 4px;
                pointer-events: none;
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }

            .cap-glossy .internal-label {
                text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
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

            .status-indicator[hidden] {
                display: none !important;
            }

            ::slotted([slot="icon"]) {
                color: rgba(0, 0, 0, 0.35);
                font-size: 1.1rem;
                line-height: 1;
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                transition: transform 0.1s ease, filter 0.15s ease;
            }

            :host([is-active]) ::slotted([slot="icon"]) {
                transform: scale(0.95);
            }
        `
    ];

    private get indicatorContent() {
        if (this.hasIcon) {
            return html`
                <div class="status-indicator">
                    <slot name="icon" @slotchange="${this.handleSlotChange}"></slot>
                </div>
            `;
        }
        return html`<slot name="icon" @slotchange="${this.handleSlotChange}"></slot>`;
    }

    render() {
        const { indicatorContent } = this;
        const baseColor = this.color;

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
                            style="--button-color: ${baseColor};"
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
