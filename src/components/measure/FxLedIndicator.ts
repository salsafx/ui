import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { Animatable } from '../base/Animatable';
import { themeVariables } from '../styles/FxTheme';

@customElement('fx-led-indicator')
export class FxLedIndicator extends Animatable(FxElement) {
    @property({ type: String }) label = '';
    @property({ type: String, attribute: 'label-position', reflect: true })
    labelPosition: 'top' | 'bottom' | 'none' = 'top';
    @property({ type: String, reflect: true })
    shape: 'round' | 'rect' | 'square' = 'round';
    @property({ type: String }) color = '#22c55e';
    @property({ type: String }) name = '';
    @property({ type: Boolean, attribute: 'is-active', reflect: true }) isActive = false;
    @property({ type: Boolean, attribute: 'is-blinking', reflect: true }) isBlinking = false;
    @property({ type: Boolean, attribute: 'has-frame', reflect: true }) hasFrame = true;
    @property({ type: Boolean, attribute: 'is-interactive', reflect: true }) isInteractive = false;

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
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: 0.7rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                text-align: center;
                line-height: 1;
                white-space: nowrap;
            }

            :host([label-position="top"]) .label-plate {
                margin-bottom: 8px;
            }

            :host([label-position="bottom"]) .label-plate {
                margin-top: 8px;
            }

            .bezel {
                position: relative;
                flex-shrink: 0;
                box-sizing: border-box;
                cursor: default;
                outline: none;
            }

            :host([is-interactive]) .bezel {
                cursor: pointer;
            }

            :host([is-interactive]) .bezel:focus-visible {
                outline: 2px solid rgba(255, 255, 255, 0.4);
                outline-offset: 2px;
            }

            :host([has-frame]) .bezel {
                padding: 3px;
                background: linear-gradient(150deg, #1e2d3d 0%, #0a0f1c 55%, #141e2e 100%);
                box-shadow:
                    inset 1px 1px 0 rgba(255, 255, 255, 0.11),
                    inset -1px -1px 0 rgba(0, 0, 0, 0.7),
                    0 0 0 1px rgba(0, 0, 0, 0.55),
                    0 2px 6px rgba(0, 0, 0, 0.75),
                    0 1px 0 rgba(255, 255, 255, 0.05);
            }

            :host([is-active][has-frame]) .bezel {
                box-shadow:
                    inset 1px 1px 0 rgba(255, 255, 255, 0.11),
                    inset -1px -1px 0 rgba(0, 0, 0, 0.7),
                    0 0 0 1px rgba(0, 0, 0, 0.55),
                    0 2px 6px rgba(0, 0, 0, 0.75),
                    0 1px 0 rgba(255, 255, 255, 0.05),
                    0 0 10px var(--led-glow, rgba(34, 197, 94, 0.35));
            }

            :host(:not([has-frame])) .bezel {
                padding: 0;
            }

            :host([shape="round"]) .bezel {
                border-radius: 50%;
                width: var(--fx-led-size, 20px);
                height: var(--fx-led-size, 20px);
            }

            :host([shape="square"]) .bezel {
                border-radius: 4px;
                width: var(--fx-led-size, 20px);
                height: var(--fx-led-size, 20px);
            }

            :host([shape="rect"]) .bezel {
                border-radius: 5px;
                width: calc(var(--fx-led-size, 20px) * 2.6);
                height: var(--fx-led-size, 20px);
            }

            .lens {
                width: 100%;
                height: 100%;
                border-radius: inherit;
                position: relative;
                overflow: hidden;
                box-sizing: border-box;
                background: var(--led-inactive, rgba(34, 197, 94, 0.16));
                box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.85);
            }

            :host([is-active]) .lens {
                background: var(--led-color, #22c55e);
                box-shadow:
                    inset 0 1px 2px rgba(255, 255, 255, 0.3),
                    0 0 5px var(--led-color, #22c55e),
                    0 0 14px var(--led-glow, rgba(34, 197, 94, 0.45)),
                    0 0 28px var(--led-glow-wide, rgba(34, 197, 94, 0.18));
            }

            :host([is-animated]) .lens {
                transition:
                    background 0.18s ease,
                    box-shadow 0.18s ease;
            }

            :host([is-animated][has-frame]) .bezel {
                transition: box-shadow 0.18s ease;
            }

            .lens::after {
                content: '';
                position: absolute;
                top: 10%;
                left: 10%;
                width: 44%;
                height: 40%;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.29);
                filter: blur(0.5px);
                pointer-events: none;
            }

            @keyframes fx-led-blink {
                0%, 100% { opacity: 1; }
                50%       { opacity: 0.1; }
            }

            :host([is-active][is-blinking][is-animated]) .lens {
                animation: fx-led-blink 1.1s ease-in-out infinite;
            }
        `
    ];

    private handleClick() {
        if (!this.isInteractive) return;

        if (this.name) {
            const root = this.getRootNode() as Document | ShadowRoot;
            root.querySelectorAll<FxLedIndicator>(`fx-led-indicator[name="${this.name}"]`)
                .forEach(sibling => { if (sibling !== this) sibling.isActive = false; });
            this.isActive = true;
        } else {
            this.isActive = !this.isActive;
        }

        this.dispatchEvent(new CustomEvent('change', {
            detail: { isActive: this.isActive, name: this.name },
            bubbles: true,
            composed: true,
        }));
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (!this.isInteractive) return;
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this.handleClick();
        }
    }

    private get colorVars(): string {
        const hex = this.color.replace('#', '');
        const red   = parseInt(hex.substring(0, 2), 16);
        const green = parseInt(hex.substring(2, 4), 16);
        const blue  = parseInt(hex.substring(4, 6), 16);
        return [
            `--led-color: ${this.color}`,
            `--led-inactive: rgba(${red}, ${green}, ${blue}, 0.25)`,
            `--led-glow: rgba(${red}, ${green}, ${blue}, 0.65)`,
            `--led-glow-wide: rgba(${red}, ${green}, ${blue}, 0.30)`,
        ].join('; ');
    }

    render() {
        const { label, labelPosition, colorVars } = this;
        const labelElement = label
            ? html`<div class="label-plate">${label}</div>`
            : '';

        return html`
            ${labelPosition === 'top' ? labelElement : ''}
            <div
                class="bezel"
                role="${this.isInteractive ? 'button' : 'img'}"
                tabindex="${this.isInteractive ? '0' : '-1'}"
                aria-pressed="${this.isInteractive ? String(this.isActive) : nothing}"
                @click="${this.handleClick}"
                @keydown="${this.handleKeyDown}"
            >
                <div class="lens" style="${colorVars}"></div>
            </div>
            ${labelPosition === 'bottom' ? labelElement : ''}
        `;
    }
}
