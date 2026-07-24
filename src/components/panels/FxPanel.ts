import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { themeVariables } from '../styles/FxTheme';
import { FxPanelElement } from '../base/FxPanelElement';

@customElement('fx-panel')
export class FxPanel extends FxPanelElement {
    @property({ type: String }) title = '';
    @property({ type: String, attribute: 'title-color' }) titleColor = '#94a3b8';
    @property({ type: String }) bg = '#111827';
    @property({ type: String }) border = '1px solid #1f2937';
    @property({ type: String, attribute: 'border-radius' }) borderRadius = '8px';
    @property({ type: String }) padding = '20px';
    @property({ type: String }) gap = '20px';
    @property({ type: String, attribute: 'flex-direction' }) flexDirection = 'column';
    @property({ type: String }) layout = 'flex';
    @property({ type: String, attribute: 'grid-template' }) gridTemplate = '';

    static styles = [
        themeVariables,
        css`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
                overflow: hidden;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
            }
        .panel-header {
            width: 100%;
            border-bottom: 1px solid #1f2937;
            padding-bottom: 8px;
            margin-bottom: 12px;
            box-sizing: border-box;
        }
        .panel-title {
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin: 0;
        }
        .panel-content {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
        }
        .panel-content.flex {
            display: flex;
        }
        .panel-content.grid {
            display: grid;
        }
    `];

    render() {
        const hostStyle = `
            background: ${this.bg};
            border: ${this.border};
            border-radius: ${this.borderRadius};
            padding: ${this.padding};
        `;

        const contentStyle = `
            gap: ${this.gap};
            flex-direction: ${this.flexDirection};
            grid-template-columns: ${this.gridTemplate || 'repeat(auto-fit, minmax(0, 1fr))'};
        `;

        return html`
            <style>
                :host {
                    ${hostStyle}
                }
                .panel-title {
                    color: ${this.titleColor};
                }
            </style>
            ${this.title ? html`
                <div class="panel-header">
                    <h2 class="panel-title">${this.title}</h2>
                </div>
            ` : ''}
            <div class="panel-content ${this.layout}" style="${contentStyle}">
                <slot></slot>
            </div>
        `;
    }
}
