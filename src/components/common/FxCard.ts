import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { themeVariables } from '../styles/FxTheme';
import { reflectOptionalTheme, type FxThemeMode } from '../base/Fx/ThemeManager/ThemeManager';
import { FxContentElement } from '../base/FxContentElement';
import { syncHostIcon } from '../base/FxCore';
import './FxIcon';

@customElement('fx-card')
export class FxCard extends FxContentElement {
    @property({ type: String }) title = '';
    @property({ type: String }) badge = '';
    @property({ type: String }) icon = '';
    @property({ type: String, attribute: 'accent-color' }) accentColor = '#f59e0b';
    @property({ type: String, attribute: 'badge-background' }) badgeBackground = '';
    @property({ type: String }) background = '';
    @property({ type: String, attribute: 'border-radius' }) borderRadius = '10px';
    @property({ type: String }) padding = '20px 18px';
    @property({ type: String }) gap = '12px';
    @property({ type: String, attribute: 'accent-width' }) accentWidth = '3px';
    @property({ type: String, reflect: true, converter: reflectOptionalTheme })
    theme?: FxThemeMode;

    static styles = [
        themeVariables,
        css`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
                overflow: hidden;
                --fx-card-background: var(--fx-theme-card-background, #111827);
            }
            :host([theme='silver']) {
                --fx-card-background: #1e293b;
            }
            :host([theme='darkgreen']) {
                --fx-card-background: #131920;
            }
            :host([theme='iron']) {
                --fx-card-background: #111827;
            }
            :host([theme='dark']) {
                --fx-card-background: #080b10;
            }
            :host([theme='darkblue']) {
                --fx-card-background: #0b111f;
            }
            :host([theme='darkergreen']) {
                --fx-card-background: #0c0e12;
            }
            :host([theme='snow']) {
                --fx-card-background: #ffffff;
            }
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 0.75rem;
            }
            .header-start {
                display: flex;
                align-items: center;
                gap: 8px;
                min-width: 0;
            }
            .title {
                font-size: 9px;
                font-weight: 700;
                color: #4a5a6e;
                text-transform: uppercase;
                letter-spacing: 0.14em;
                margin: 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .badge {
                flex-shrink: 0;
                font-size: 8px;
                font-weight: 700;
                padding: 2px 7px;
                border-radius: 3px;
                letter-spacing: 0.06em;
                text-transform: uppercase;
                line-height: 1.3;
            }
            .icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                line-height: 1;
                flex-shrink: 0;
            }
            .icon ::slotted(*) {
                font-size: inherit;
                color: inherit;
            }
            .content {
                display: flex;
                flex-direction: column;
                flex: 1;
                width: 100%;
                min-height: 0;
                box-sizing: border-box;
            }
        `,
    ];

    connectedCallback() {
        super.connectedCallback();
        syncHostIcon(this, this.icon);
    }

    protected updated(changed: Map<string | number | symbol, unknown>) {
        super.updated(changed);
        if (changed.has('icon')) {
            syncHostIcon(this, this.icon);
        }
    }

    private get resolvedBadgeBackground(): string {
        if (this.badgeBackground) {
            return this.badgeBackground;
        } else {
            return `color-mix(in srgb, ${this.accentColor} 18%, #0a0c10)`;
        }
    }

    private get resolvedBackground(): string {
        return this.background.trim()
            ? this.background
            : 'var(--fx-card-background)';
    }

    render() {
        const { alignItems, justifyContent } = this.contentFlexAlign('column');
        const hostStyle = `
            background: ${this.resolvedBackground};
            border-radius: ${this.borderRadius};
            border-top: ${this.accentWidth} solid ${this.accentColor};
            padding: ${this.padding};
            gap: ${this.gap};
        `;

        return html`
            <style>
                :host {
                    ${hostStyle}
                }
                .content {
                    gap: ${this.gap};
                    align-items: ${alignItems};
                    justify-content: ${justifyContent};
                }
                .icon {
                    color: ${this.accentColor};
                }
                .badge {
                    color: ${this.accentColor};
                    background: ${this.resolvedBadgeBackground};
                }
            </style>
            <div class="header" part="header">
                <div class="header-start">
                    <span class="icon" part="icon">
                        <slot name="icon"></slot>
                    </span>
                    ${this.title
                        ? html`<h2 class="title" part="title">${this.title}</h2>`
                        : nothing}
                </div>
                ${this.badge
                    ? html`<span class="badge" part="badge">${this.badge}</span>`
                    : nothing}
            </div>
            <div class="content" part="content">
                <slot></slot>
            </div>
        `;
    }
}
