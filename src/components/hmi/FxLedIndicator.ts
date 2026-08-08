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
    @property({ type: String, reflect: true })
    size: 'small' | 'medium' | 'large' | 'x-large' = 'medium';
    @property({ type: String }) color = '#22c55e';
    @property({ type: String }) name = '';
    @property({ type: Boolean, attribute: 'is-active', reflect: true }) isActive = false;
    @property({ type: Boolean, attribute: 'is-blinking', reflect: true }) isBlinking = false;
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
                --fx-led-size: 18px;
                --fx-led-label-size: 0.7rem;
            }

            :host([size="small"]) {
                --fx-led-size: 9px;
                --fx-led-label-size: 0.6rem;
            }

            :host([size="medium"]) {
                --fx-led-size: 18px;
                --fx-led-label-size: 0.7rem;
            }

            :host([size="large"]) {
                --fx-led-size: 24px;
                --fx-led-label-size: 0.75rem;
            }

            :host([size="x-large"]) {
                --fx-led-size: 36px;
                --fx-led-label-size: 0.8rem;
            }

            .label-plate {
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: var(--fx-led-label-size, 0.7rem);
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
                overflow: visible;
                padding: 1.5px;
                background: #090d16;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.6);
            }

            :host([is-interactive]:not([disabled])) .bezel {
                cursor: pointer;
            }

            :host([is-interactive]:not([disabled])) .bezel:focus-visible {
                outline: 2px solid rgba(255, 255, 255, 0.4);
                outline-offset: 2px;
            }

            :host([shape="round"]) .bezel {
                border-radius: 50%;
                width: var(--fx-led-size, 18px);
                height: var(--fx-led-size, 18px);
            }

            :host([shape="square"]) .bezel {
                border-radius: 4px;
                width: var(--fx-led-size, 18px);
                height: var(--fx-led-size, 18px);
            }

            :host([shape="rect"]) .bezel {
                border-radius: 6px;
                width: calc(var(--fx-led-size, 18px) * 2.6);
                height: var(--fx-led-size, 18px);
            }

            .lens {
                width: 100%;
                height: 100%;
                border-radius: inherit;
                position: relative;
                overflow: visible;
                box-sizing: border-box;
                background: radial-gradient(
                    circle at center,
                    var(--led-color-light) 0%,
                    var(--led-color) 70%,
                    var(--led-color-dark) 100%
                );
                border: 1px solid rgba(255, 255, 255, 0.25);
                box-shadow:
                    inset 0 1px 1.5px rgba(255, 255, 255, 0.5),
                    0 0 calc(var(--fx-led-size, 18px) * 0.6) var(--led-glow, rgba(34, 197, 94, 0.75)),
                    0 0 calc(var(--fx-led-size, 18px) * 1.3) var(--led-glow-outer, rgba(34, 197, 94, 0.35));
                opacity: 0.22;
            }

            :host([shape="round"]) .lens {
                border-radius: 50%;
            }

            :host([shape="square"]) .lens {
                border-radius: 2.5px;
            }

            :host([shape="rect"]) .lens {
                border-radius: 4.5px;
            }

            :host([is-active]) .lens {
                opacity: 1;
            }

            :host([disabled]) .lens {
                box-shadow: inset 0 1px 1.5px rgba(255, 255, 255, 0.35);
                filter: none;
                animation: none !important;
            }

            :host([is-animated]:not([disabled])) .lens {
                transition: opacity 0.18s ease;
            }

            @keyframes fx-led-blink {
                0%, 100% {
                    opacity: 1;
                    filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.15));
                }
                50% {
                    opacity: 0.22;
                    filter: drop-shadow(0 0 0px transparent);
                }
            }

            :host([is-active][is-blinking][is-animated]:not([disabled])) .lens {
                animation: fx-led-blink 1.0s ease-in-out infinite;
            }
        `
    ];

    private handleClick() {
        if (!this.disabled && this.isInteractive) {
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
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (!this.disabled && this.isInteractive) {
            if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                this.handleClick();
            }
        }
    }

    private get colorVars(): string {
        const hex = this.color.replace('#', '');
        const red   = parseInt(hex.substring(0, 2), 16);
        const green = parseInt(hex.substring(2, 4), 16);
        const blue  = parseInt(hex.substring(4, 6), 16);
        if (Number.isNaN(red) || Number.isNaN(green) || Number.isNaN(blue)) {
            return `--led-color: ${this.color}`;
        }
        const lighten = (channel: number) =>
            Math.min(255, Math.round(channel + (255 - channel) * 0.55));
        const darken = (channel: number) =>
            Math.max(0, Math.round(channel * 0.72));
        const light = `rgb(${lighten(red)}, ${lighten(green)}, ${lighten(blue)})`;
        const dark = `rgb(${darken(red)}, ${darken(green)}, ${darken(blue)})`;
        return [
            `--led-color: ${this.color}`,
            `--led-color-light: ${light}`,
            `--led-color-dark: ${dark}`,
            `--led-glow: rgba(${red}, ${green}, ${blue}, 0.65)`,
            `--led-glow-outer: rgba(${red}, ${green}, ${blue}, 0.3)`,
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
                style="${colorVars}"
                role="${this.isInteractive ? 'button' : 'img'}"
                tabindex="${this.isInteractive ? '0' : '-1'}"
                aria-pressed="${this.isInteractive ? String(this.isActive) : nothing}"
                @click="${this.handleClick}"
                @keydown="${this.handleKeyDown}"
            >
                <div class="lens"></div>
            </div>
            ${labelPosition === 'bottom' ? labelElement : ''}
        `;
    }
}
