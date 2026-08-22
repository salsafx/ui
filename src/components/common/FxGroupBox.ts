import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { themeVariables } from '../styles/FxTheme';
import { reflectOptionalTheme, type FxThemeMode } from '../base/Fx/ThemeManager/ThemeManager';
import { FxContentElement, type ContentFlexDirection } from '../base/FxContentElement';

@customElement('fx-group-box')
export class FxGroupBox extends FxContentElement {
    @property({ type: String }) title = '';
    @property({ type: String, attribute: 'title-color' }) titleColor = '#94a3b8';
    @property({ type: String }) background = '';
    @property({ type: String }) border = '';
    @property({ type: String, attribute: 'border-radius' }) borderRadius = '8px';
    @property({ type: String }) padding = '20px';
    @property({ type: String }) gap = '20px';
    @property({ type: String, attribute: 'flex-direction' })
    flexDirection: ContentFlexDirection = 'column';
    @property({ type: String, reflect: true, converter: reflectOptionalTheme })
    theme?: FxThemeMode;

    static styles = [
        themeVariables,
        css`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                overflow: hidden;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
                --fx-group-box-background: var(--fx-theme-group-box-background, #111827);
                --fx-group-box-border: var(--fx-theme-group-box-border, 1px solid #1f2937);
            }
            :host([theme='silver']) {
                --fx-group-box-background: #1e293b;
                --fx-group-box-border: 1px solid #334155;
            }
            :host([theme='darkgreen']) {
                --fx-group-box-background: #131920;
                --fx-group-box-border: 1px solid #1f2937;
            }
            :host([theme='iron']) {
                --fx-group-box-background: #111827;
                --fx-group-box-border: 1px solid #1f2937;
            }
            :host([theme='dark']) {
                --fx-group-box-background: #080b10;
                --fx-group-box-border: 1px solid #12161e;
            }
            :host([theme='darkblue']) {
                --fx-group-box-background: #0b111f;
                --fx-group-box-border: 1px solid #334155;
            }
            :host([theme='darkergreen']) {
                --fx-group-box-background: #0c0e12;
                --fx-group-box-border: 1px solid #18222e;
            }
            :host([theme='snow']) {
                --fx-group-box-background: #ffffff;
                --fx-group-box-border: 1px solid #e5e7eb;
            }
            .groupbox-header {
                width: 100%;
                border-bottom: 1px solid #1e293b;
                padding-bottom: 12px;
                margin-bottom: 16px;
                box-sizing: border-box;
            }
            .groupbox-title {
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                margin: 0;
                opacity: 0.9;
            }
            .inner {
                display: flex;
                flex-direction: column;
                flex: 1;
                min-height: 0;
                box-sizing: border-box;
            }
            .groupbox-content {
                display: flex;
                box-sizing: border-box;
                width: 100%;
                flex: 1;
                min-height: 0;
            }
        `,
    ];

    private get resolvedBackground(): string {
        return this.background.trim()
            ? this.background
            : 'var(--fx-group-box-background)';
    }

    private get resolvedBorder(): string {
        return this.border.trim()
            ? this.border
            : 'var(--fx-group-box-border)';
    }

    render() {
        const direction: ContentFlexDirection =
            this.flexDirection === 'row' ? 'row' : 'column';
        const { alignItems, justifyContent } = this.contentFlexAlign(direction);
        const hostStyle = `
            background: ${this.resolvedBackground};
            border: ${this.resolvedBorder};
            border-radius: ${this.borderRadius};
        `;

        return html`
            <style>
                :host {
                    ${hostStyle}
                }
                .inner {
                    padding: ${this.padding};
                }
                .groupbox-title {
                    color: ${this.titleColor};
                }
                .groupbox-content {
                    gap: ${this.gap};
                    flex-direction: ${direction};
                    align-items: ${alignItems};
                    justify-content: ${justifyContent};
                }
            </style>
            <div class="inner">
                ${this.title
                    ? html`<div class="groupbox-header">
                          <h2 class="groupbox-title">${this.title}</h2>
                      </div>`
                    : ''}
                <div class="groupbox-content" part="content">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}
