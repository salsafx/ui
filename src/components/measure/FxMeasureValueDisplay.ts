import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxMeasureElement } from '../base/FxMeasureElement';
import { isNil } from '../base/Core';

@customElement('fx-measure-value-display')
export class FxMeasureValueDisplay extends FxMeasureElement {
    @property({ attribute: 'offset-x' }) offsetX: string | number = '0';
    @property({ attribute: 'offset-y' }) offsetY: string | number = '0';
    @property({ type: String, reflect: true }) align: 'left' | 'center' | 'right' = 'center';

    private formatOffset(val: string | number | null | undefined): string {
        if (isNil(val)) return '0px';
        const str = String(val).trim();
        if (str === '') return '0px';
        if (/^-?\d+(\.\d+)?$/.test(str)) {
            return `${str}%`;
        }
        return str;
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: var(--fx-font-family, sans-serif);
            pointer-events: none;
            user-select: none;
            margin-top: var(--fx-measure-value-display-margin-top, 0);
            transform: translate(
                var(--fx-measure-value-display-offset-x, var(--display-offset-x-prop, 0px)), 
                var(--fx-measure-value-display-offset-y, var(--display-offset-y-prop, 0px))
            );
        }
        :host([align="left"]) {
            align-items: flex-start;
        }
        :host([align="right"]) {
            align-items: flex-end;
        }
        :host([align="left"]) .label {
            text-align: left;
        }
        :host([align="right"]) .label {
            text-align: right;
        }
        .value {
            font-size: var(--fx-gauge-value-font-size, 1.25rem);
            font-weight: var(--fx-gauge-value-font-weight, 400);
            color: var(--fx-gauge-text-primary, #cbd5e1);
            line-height: 1;
        }
        .unit {
            font-size: var(--fx-gauge-unit-font-size, 0.625rem);
            font-weight: var(--fx-gauge-unit-font-weight, 400);
            color: var(--fx-gauge-text-secondary, #94a3b8);
            margin-top: 3px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .label {
            font-size: var(--fx-gauge-label-font-size, 0.55rem);
            font-weight: var(--fx-gauge-label-font-weight, 400);
            color: var(--fx-gauge-text-secondary, #94a3b8);
            margin-top: 5px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            text-align: center;
            max-width: 120px;
        }
    `;

    render() {
        const styleX = this.formatOffset(this.offsetX);
        const styleY = this.formatOffset(this.offsetY);

        return html`
            <style>
                :host {
                    --display-offset-x-prop: ${styleX};
                    --display-offset-y-prop: ${styleY};
                }
            </style>
            <span class="value">${this.value}</span>
            ${this.unit ? html`<span class="unit">${this.unit}</span>` : ''}
            ${this.label ? html`<span class="label">${this.label}</span>` : ''}
        `;
    }
}
