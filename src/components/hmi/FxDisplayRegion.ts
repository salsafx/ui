import { html, css, type CSSResultGroup, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { isNil, syncHostIcon, hostHasNamedSlot } from '../base/FxCore';
import '../common/FxIcon';
import { themeVariables } from '../styles/FxTheme';
import {
    type FxDisplayContentLayout,
    type FxDisplaySize,
    type FxDisplayTypography,
    type FxDisplayAlign,
    customDisplaySizeVars,
    ensureDisplayTypography,
    reflectNonDefaultTypography,
    reflectNonDefaultContentLayout,
    reflectNonDefaultAlign,
} from '../base/FxCore/Display';

@customElement('fx-display-region')
export class FxDisplayRegion extends FxElement {
    @property({ type: String }) label = '';
    @property({ type: String }) prefix = '';
    @property({ type: String }) value = '';
    @property({ type: String }) suffix = '';
    @property({ type: String, attribute: 'value-template' }) valueTemplate = '';

    @property({ type: String, attribute: 'content-layout', reflect: true, converter: reflectNonDefaultContentLayout })
    contentLayout: FxDisplayContentLayout = 'labeled';

    @property({ type: String, reflect: true, converter: reflectNonDefaultAlign })
    align: FxDisplayAlign = 'center';

    @property({ type: String, reflect: true })
    size: FxDisplaySize = 'small';

    @property({ type: String, attribute: 'background-color' }) backgroundColor = '';
    @property({ type: String }) color = '';
    @property({ type: String, attribute: 'label-color' }) labelColor = '#9ca3af';
    @property({ type: String, attribute: 'prefix-color' }) prefixColor = '';
    @property({ type: String, attribute: 'foreground-color' }) foregroundColor = '#38bdf8';
    @property({ type: String, attribute: 'suffix-color' }) suffixColor = '';

    @property({ type: String, attribute: 'font-size' }) fontSize = '';
    @property({ type: String, attribute: 'label-size' }) labelSize = '';
    @property({ type: String, attribute: 'prefix-size' }) prefixSize = '';
    @property({ type: String, attribute: 'value-size' }) valueSize = '';
    @property({ type: String, attribute: 'suffix-size' }) suffixSize = '';

    @property({ type: String, attribute: 'label-weight' }) labelWeight = '';
    @property({ type: String, attribute: 'value-weight' }) valueWeight = '';
    @property({ type: String, attribute: 'prefix-weight' }) prefixWeight = '';
    @property({ type: String, attribute: 'suffix-weight' }) suffixWeight = '';

    @property({ type: String }) icon = '';
    @property({ type: String, attribute: 'icon-color' }) iconColor = '';
    @property({ type: String, attribute: 'icon-side' }) iconSide: 'left' | 'right' | 'top' | 'bottom' = 'left';

    @property({ type: String, reflect: true, converter: reflectNonDefaultTypography })
    typography: FxDisplayTypography = 'segmented';

    @property({ type: Boolean, attribute: 'is-selectable', reflect: true }) isSelectable = false;

    static styles: CSSResultGroup = [
        themeVariables,
        css`
            :host {
                display: flex;
                box-sizing: border-box;
                min-width: 0;
                min-height: 0;
                width: var(--fx-display-region-width);
                height: var(--fx-display-region-height);
                border-radius: var(--fx-display-region-border-radius, 4px);
                padding: var(--fx-display-region-padding, 4px);
                transition: all 0.15s ease;
                overflow: visible;
                font-family: var(--fx-display-font-family, 'DS-Digital', monospace);
                letter-spacing: var(--fx-display-letter-spacing, 0.05em);
                user-select: none;
                cursor: default;
                --fx-display-label-size: 0.6rem;
                --fx-display-value-size: 1.75rem;
                --fx-display-region-gap: 3px;
            }

            :host([size='x-small']) {
                --fx-display-label-size: 0.55rem;
                --fx-display-value-size: 1.35rem;
                --fx-display-region-gap: 2px;
                --fx-display-region-padding: 4px;
            }
            :host([size='small']) {
                --fx-display-label-size: 0.6rem;
                --fx-display-value-size: 1.75rem;
                --fx-display-region-gap: 3px;
                --fx-display-region-padding: 4px;
            }
            :host([size='medium']) {
                --fx-display-label-size: 0.65rem;
                --fx-display-value-size: 2.35rem;
                --fx-display-region-gap: 4px;
                --fx-display-region-padding: 6px;
            }
            :host([size='large']) {
                --fx-display-label-size: 0.7rem;
                --fx-display-value-size: 3rem;
                --fx-display-region-gap: 4px;
                --fx-display-region-padding: 6px;
            }
            :host([size='x-large']) {
                --fx-display-label-size: 0.75rem;
                --fx-display-value-size: 4rem;
                --fx-display-region-gap: 6px;
                --fx-display-region-padding: 8px;
            }
            :host([size='xx-large']) {
                --fx-display-label-size: 0.85rem;
                --fx-display-value-size: 5.25rem;
                --fx-display-region-gap: 6px;
                --fx-display-region-padding: 8px;
            }

            :host([is-selectable]) {
                user-select: text;
                cursor: text;
            }

            .region-wrap {
                display: flex;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                gap: var(--fx-display-region-gap);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }

            :host([content-layout='row']) .region-wrap {
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }

            :host([content-layout='column']) .region-wrap {
                flex-direction: column;
                justify-content: center;
            }

            :host([align='left']) .region-wrap {
                align-items: flex-start;
                text-align: left;
            }
            :host([align='right']) .region-wrap {
                align-items: flex-end;
                text-align: right;
            }
            :host([align='space-between']) .region-wrap {
                justify-content: space-between;
                align-items: center;
            }
            :host([align='space-around']) .region-wrap {
                justify-content: space-around;
                align-items: center;
            }

            :host([content-layout='row'][align='left']) .region-wrap,
            :host([content-layout='row'][align='right']) .region-wrap {
                align-items: center;
            }

            .label {
                text-transform: uppercase;
                letter-spacing: var(--fx-display-label-letter-spacing, 0.1em);
                font-size: var(--fx-display-label-size);
                font-weight: var(--fx-display-label-weight, 700);
                line-height: 1.1;
                flex-shrink: 0;
            }

            :host([content-layout='row']) .label {
                margin-right: 4px;
            }

            .value-container {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-wrap: nowrap;
                gap: 6px;
                white-space: nowrap;
                line-height: 1;
            }

            .value-container ::slotted([slot='start']),
            .value-container ::slotted([slot='end']) {
                display: inline-flex;
                align-items: center;
                flex-shrink: 0;
                color: var(--fx-display-icon-color, inherit);
                font-size: calc(var(--fx-display-value-size) * 0.48);
                line-height: 1;
                text-shadow: var(--fx-display-glow, none);
            }

            :host([content-layout='column']) .value-container {
                flex-direction: column;
                align-items: center;
                white-space: normal;
            }

            :host([align='left']) .value-container {
                justify-content: flex-start;
            }
            :host([align='right']) .value-container {
                justify-content: flex-end;
            }

            .icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
                font-size: calc(var(--fx-display-value-size) * 0.48);
                font-family: var(--fx-font-family, sans-serif);
            }

            .icon ::slotted([slot='icon']),
            .icon ::slotted(i),
            .icon ::slotted(fx-icon) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
                text-shadow: var(--fx-display-glow, none);
            }

            .icon-top {
                flex-direction: column;
                align-items: center;
            }
            .icon-bottom {
                flex-direction: column-reverse;
                align-items: center;
            }
            .icon-left {
                flex-direction: row;
                align-items: center;
            }
            .icon-right {
                flex-direction: row-reverse;
                align-items: center;
            }

            .prefix,
            .suffix {
                opacity: 0.85;
                font-size: calc(var(--fx-display-value-size) * 0.72);
                font-weight: var(--fx-display-value-weight, 700);
            }

            .value {
                font-size: var(--fx-display-value-size);
                font-weight: var(--fx-display-value-weight, 700);
            }

            .readout-measure {
                display: inline-grid;
                justify-items: center;
                align-items: center;
            }

            :host([align='left']) .readout-measure {
                justify-items: start;
            }

            :host([align='right']) .readout-measure {
                justify-items: end;
            }

            .readout-sizer,
            .readout-live {
                grid-area: 1 / 1;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-wrap: nowrap;
                gap: 6px;
                white-space: nowrap;
                line-height: 1;
            }

            :host([align='left']) .readout-sizer,
            :host([align='left']) .readout-live {
                justify-content: flex-start;
            }

            :host([align='right']) .readout-sizer,
            :host([align='right']) .readout-live {
                justify-content: flex-end;
            }

            .readout-sizer {
                visibility: hidden;
            }

            :host([content-layout='column']) .readout-sizer,
            :host([content-layout='column']) .readout-live {
                flex-direction: column;
                align-items: center;
                white-space: normal;
            }

            .label,
            .prefix,
            .value,
            .suffix,
            .icon {
                text-shadow: var(--fx-display-glow, none);
            }

            :host([typography='classic']) {
                --fx-display-font-family: var(--fx-font-family, system-ui, sans-serif);
                --fx-display-letter-spacing: normal;
                --fx-display-label-letter-spacing: 0.08em;
            }

            :host([typography='segmented']) {
                --fx-display-letter-spacing: 0.05em;
                --fx-display-label-letter-spacing: 0.1em;
                --fx-display-label-weight: 700;
                --fx-display-value-weight: 700;
            }

            :host([typography='modern']) {
                --fx-display-font-family: 'Oxanium', 'Chakra Petch', sans-serif;
                --fx-display-letter-spacing: 0.02em;
                --fx-display-label-letter-spacing: 0.08em;
                --fx-display-label-weight: 400;
                --fx-display-value-weight: 400;
            }
        `,
    ];

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('typography')) {
            ensureDisplayTypography(this.typography);
        }
        if (changed.has('icon')) this.syncIcon();
    }

    connectedCallback() {
        super.connectedCallback();
        ensureDisplayTypography(this.typography);
        this.syncIcon();
    }

    private syncIcon() {
        syncHostIcon(this, this.icon);
    }

    protected renderValueContent(text: string) {
        if (!text) {
            return '';
        }
        return html`<span class="value">${text}</span>`;
    }

    private renderIcon() {
        if (this.icon || hostHasNamedSlot(this, 'icon')) {
            return html`<span class="icon"><slot name="icon"></slot></span>`;
        }
        return null;
    }

    private renderSizerIcon() {
        if (this.icon || hostHasNamedSlot(this, 'icon')) {
            return html`<span class="icon" aria-hidden="true">▮</span>`;
        }
        return null;
    }

    private renderReadoutParts(valueText: string, forSizer: boolean) {
        const iconMarkup = forSizer ? this.renderSizerIcon() : this.renderIcon();
        const valueMarkup = this.renderValueContent(forSizer ? this.valueTemplate || valueText : valueText);
        const showLeftIcon = !!iconMarkup && (this.iconSide === 'left' || this.iconSide === 'top');
        const showRightIcon = !!iconMarkup && (this.iconSide === 'right' || this.iconSide === 'bottom');

        return html`
            ${showLeftIcon ? iconMarkup : ''}
            ${this.prefix ? html`<span class="prefix">${this.prefix}</span>` : ''}
            ${valueMarkup}
            ${this.suffix ? html`<span class="suffix">${this.suffix}</span>` : ''}
            ${showRightIcon ? iconMarkup : ''}
        `;
    }

    render() {
        const fallbackColor = this.color || 'inherit';
        const activeForeground = this.foregroundColor || this.color || '#38bdf8';
        const activeLabelColor = this.labelColor || '#9ca3af';
        const activePrefixColor = this.prefixColor || this.foregroundColor || '#38bdf8';
        const activeSuffixColor = this.suffixColor || this.foregroundColor || '#38bdf8';
        const activeIconColor = this.iconColor || this.foregroundColor || '#38bdf8';
        const text = isNil(this.value) ? '' : String(this.value);

        const customStyles = html`
            <style>
                :host {
                    background-color: ${this.backgroundColor || 'transparent'};
                    color: ${fallbackColor};
                    --fx-display-icon-color: ${activeIconColor};
                    ${this.fontSize ? `font-size: ${this.fontSize};` : ''}
                    ${customDisplaySizeVars(this.size)}
                }
                .label {
                    color: ${activeLabelColor};
                    ${this.labelSize ? `font-size: ${this.labelSize};` : ''}
                    ${this.labelWeight ? `font-weight: ${this.labelWeight};` : ''}
                }
                .prefix {
                    color: ${activePrefixColor};
                    ${this.prefixSize ? `font-size: ${this.prefixSize};` : ''}
                    ${this.prefixWeight ? `font-weight: ${this.prefixWeight};` : ''}
                }
                .value {
                    color: ${activeForeground};
                    ${this.valueSize ? `font-size: ${this.valueSize};` : ''}
                    ${this.valueWeight ? `font-weight: ${this.valueWeight};` : ''}
                }
                .suffix {
                    color: ${activeSuffixColor};
                    ${this.suffixSize ? `font-size: ${this.suffixSize};` : ''}
                    ${this.suffixWeight ? `font-weight: ${this.suffixWeight};` : ''}
                }
                .icon {
                    color: ${activeIconColor};
                }
            </style>
        `;

        let iconLayoutClass = 'icon-left';
        switch (this.iconSide) {
            case 'right':
                iconLayoutClass = 'icon-right';
                break;
            case 'top':
                iconLayoutClass = 'icon-top';
                break;
            case 'bottom':
                iconLayoutClass = 'icon-bottom';
                break;
            case 'left':
                break;
        }

        let readout;
        if (this.valueTemplate) {
            readout = html`
                <span class="readout-measure">
                    <span class="readout-sizer ${iconLayoutClass}" aria-hidden="true">
                        ${this.renderReadoutParts(text, true)}
                    </span>
                    <span class="readout-live ${iconLayoutClass}">
                        ${this.renderReadoutParts(text, false)}
                    </span>
                </span>
            `;
        } else {
            readout = this.renderReadoutParts(text, false);
        }

        return html`
            ${customStyles}
            <div class="region-wrap">
                ${this.label ? html`<span class="label">${this.label}</span>` : ''}
                <div class="value-container ${iconLayoutClass}">
                    <slot name="start"></slot>
                    ${readout}
                    <slot name="end"></slot>
                </div>
            </div>
        `;
    }
}
