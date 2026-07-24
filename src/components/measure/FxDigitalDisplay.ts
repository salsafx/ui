import { html, css, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { isNil } from '../base/Core';
import { FxDisplay, FxDisplayRegion } from './FxDisplay';

@customElement('fx-digital-display-region')
export class FxDigitalDisplayRegion extends FxDisplayRegion {
    @property({ type: Boolean, attribute: 'is-digital', reflect: true }) isDigital = true;

    private static ensureFont() {
        const fontId = 'ds-digital-global-font';
        if (typeof document !== 'undefined' && !document.getElementById(fontId)) {
            const link = document.createElement('link');
            link.id = fontId;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.cdnfonts.com/css/ds-digital';
            document.head.appendChild(link);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        FxDigitalDisplayRegion.ensureFont();
    }

    static override styles: CSSResultGroup = [
        FxDisplayRegion.styles,
        css`
            :host([is-digital]) .value {
                font-family: 'DS-Digital', monospace;
                letter-spacing: 0.05em;
                text-shadow: 0 0 6px currentColor;
            }
        `
    ];

    protected renderValueContent() {
        return html`
            ${!isNil(this.value) ? html`<span class="value">${this.value}</span>` : ''}
        `;
    }
}

@customElement('fx-digital-display')
export class FxDigitalDisplay extends FxDisplay {
    @property({ type: Boolean, attribute: 'is-digital', reflect: true }) isDigital = true;

    protected renderRegionElement(props: any) {
        return html`
            <fx-digital-display-region
                .label="${props.label}"
                .prefix="${props.prefix}"
                .value="${props.value}"
                .suffix="${props.suffix}"
                .orientation="${props.orientation}"
                .align="${props.align}"
                .isDigital="${!isNil(props.isDigital) ? props.isDigital : this.isDigital}"
                .bg="${props.bg}"
                .color="${props.color}"
                .labelColor="${props.labelColor}"
                .prefixColor="${props.prefixColor}"
                .valueColor="${props.valueColor}"
                .suffixColor="${props.suffixColor}"
                .fontSize="${props.fontSize}"
                .labelSize="${props.labelSize}"
                .prefixSize="${props.prefixSize}"
                .valueSize="${props.valueSize}"
                .suffixSize="${props.suffixSize}"
                .labelWeight="${props.labelWeight}"
                .valueWeight="${props.valueWeight}"
                .prefixWeight="${props.prefixWeight}"
                .suffixWeight="${props.suffixWeight}"
                .icon="${props.icon}"
                .iconColor="${props.iconColor}"
                .iconSide="${props.iconSide}"
                style="${props.style || ''}"
            ></fx-digital-display-region>
        `;
    }
}
