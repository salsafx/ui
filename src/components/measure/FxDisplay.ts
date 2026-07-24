import { LitElement, html, css, type CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { isNil } from '../base/Core';

export interface FxDisplayRegionConfig {
    label?: string;
    prefix?: string;
    value?: string | number;
    suffix?: string;

    orientation?: 'horizontal' | 'vertical' | 'h' | 'v';
    align?: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
    flex?: string | number;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    border?: string;
    borderRadius?: string;

    bg?: string;
    color?: string;
    labelColor?: string;
    prefixColor?: string;
    valueColor?: string;
    suffixColor?: string;

    fontSize?: string;
    labelSize?: string;
    prefixSize?: string;
    valueSize?: string;
    suffixSize?: string;

    fontWeight?: string;
    labelWeight?: string;
    prefixWeight?: string;
    valueWeight?: string;
    suffixWeight?: string;

    icon?: string;
    iconColor?: string;
    iconSide?: 'left' | 'right' | 'top' | 'bottom';
}

@customElement('fx-display-region')
export class FxDisplayRegion extends LitElement {
    @property({ type: String }) label = '';
    @property({ type: String }) prefix = '';
    @property({ type: String }) value = '';
    @property({ type: String }) suffix = '';
    @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' | 'h' | 'v' = 'horizontal';
    @property({ type: String, reflect: true }) align: 'left' | 'center' | 'right' | 'space-between' | 'space-around' = 'center';

    @property({ type: String }) bg = '';
    @property({ type: String }) color = '';
    @property({ type: String, attribute: 'label-color' }) labelColor = '';
    @property({ type: String, attribute: 'prefix-color' }) prefixColor = '';
    @property({ type: String, attribute: 'value-color' }) valueColor = '';
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

    static styles: CSSResultGroup = css`
        :host {
            display: flex;
            box-sizing: border-box;
            border-radius: var(--fx-display-region-border-radius, 4px);
            padding: var(--fx-display-region-padding, 8px);
            transition: all 0.15s ease;
            overflow: hidden;
            width: 100%;
        }
        .region-wrap {
            display: flex;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }
        :host([orientation="vertical"]) .region-wrap,
        :host([orientation="v"]) .region-wrap {
            flex-direction: column;
            justify-content: center;
        }
        :host([orientation="horizontal"]) .region-wrap,
        :host([orientation="h"]) .region-wrap {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        :host([align="left"]) .region-wrap {
            align-items: flex-start;
            text-align: left;
        }
        :host([align="right"]) .region-wrap {
            align-items: flex-end;
            text-align: right;
        }
        :host([align="center"]) .region-wrap {
            align-items: center;
            text-align: center;
        }
        :host([align="space-between"]) .region-wrap {
            justify-content: space-between;
            align-items: center;
        }
        :host([align="space-around"]) .region-wrap {
            justify-content: space-around;
            align-items: center;
        }
        :host([orientation="vertical"][align="left"]) .region-wrap,
        :host([orientation="v"][align="left"]) .region-wrap {
            align-items: flex-start;
        }
        :host([orientation="vertical"][align="right"]) .region-wrap,
        :host([orientation="v"][align="right"]) .region-wrap {
            align-items: flex-end;
        }
        :host([orientation="vertical"][align="center"]) .region-wrap,
        :host([orientation="v"][align="center"]) .region-wrap {
            align-items: center;
        }

        .label {
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 2px;
        }

        :host([orientation="horizontal"]) .label,
        :host([orientation="h"]) .label {
            margin-bottom: 0;
            margin-right: 8px;
        }

        .value-container {
            display: inline-flex;
            align-items: baseline;
            justify-content: inherit;
            flex-wrap: wrap;
            gap: 4px;
        }
        .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
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
            align-items: baseline;
        }
        .icon-right {
            flex-direction: row-reverse;
            align-items: baseline;
        }

        .prefix, .suffix {
            opacity: 0.85;
        }
    `;

    protected renderValueContent() {
        return html`
            ${!isNil(this.value) ? html`<span class="value">${this.value}</span>` : ''}
        `;
    }

    render() {
        const fallbackColor = this.color || 'inherit';
        const activeValueColor = this.valueColor || this.color || 'inherit';
        const activeLabelColor = this.labelColor || this.valueColor || this.color || '#9ca3af';
        const activePrefixColor = this.prefixColor || this.valueColor || this.color || 'inherit';
        const activeSuffixColor = this.suffixColor || this.valueColor || this.color || 'inherit';
        const activeIconColor = this.iconColor || this.valueColor || this.color || 'inherit';

        const customStyles = html`
            <style>
                :host {
                    background-color: ${this.bg || 'transparent'};
                    color: ${fallbackColor};
                    ${this.fontSize ? `font-size: ${this.fontSize};` : ''}
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
                    color: ${activeValueColor};
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
        if (this.iconSide === 'right') iconLayoutClass = 'icon-right';
        else if (this.iconSide === 'top') iconLayoutClass = 'icon-top';
        else if (this.iconSide === 'bottom') iconLayoutClass = 'icon-bottom';

        return html`
            ${customStyles}
            <div class="region-wrap">
                ${this.label ? html`<span class="label">${this.label}</span>` : ''}
                <div class="value-container ${iconLayoutClass}">
                    ${this.icon && (this.iconSide === 'left' || this.iconSide === 'top') ? html`<span class="icon" style="margin-right: 4px;">${this.icon}</span>` : ''}
                    ${this.prefix ? html`<span class="prefix">${this.prefix}</span>` : ''}

                    <div style="position: relative; display: inline-flex; align-items: baseline;">
                        ${this.renderValueContent()}
                    </div>

                    ${this.suffix ? html`<span class="suffix">${this.suffix}</span>` : ''}
                    ${this.icon && (this.iconSide === 'right' || this.iconSide === 'bottom') ? html`<span class="icon" style="margin-left: 4px;">${this.icon}</span>` : ''}
                </div>
            </div>
        `;
    }
}

@customElement('fx-display')
export class FxDisplay extends LitElement {
    @property({ type: String, reflect: true }) layout: 'horizontal' | 'vertical' | 'grid' | 'h' | 'v' = 'vertical';
    @property({ type: String }) gap = '4px';
    @property({ type: String, attribute: 'grid-template' }) gridTemplate = '';

    @property({ type: String }) width = '';
    @property({ type: String }) height = '';
    @property({ type: String }) padding = '8px';
    @property({ type: String }) border = '1px solid #1f2937';
    @property({ type: String, attribute: 'border-radius' }) borderRadius = '8px';
    @property({ type: String, attribute: 'bg' }) bg = '#0b0f19';

    @property({ type: Array }) 
    get regions(): FxDisplayRegionConfig[] {
        return this._regions;
    }
    set regions(val: string | FxDisplayRegionConfig[]) {
        const oldVal = this._regions;
        if (typeof val === 'string') {
            try {
                this._regions = JSON.parse(val);
            } catch (e) {
                console.error('Failed to parse regions JSON:', e);
                this._regions = [];
            }
        } else if (Array.isArray(val)) {
            this._regions = val;
        } else {
            this._regions = [];
        }
        this.requestUpdate('regions', oldVal);
    }
    private _regions: FxDisplayRegionConfig[] = [];

    @property({ type: String }) label = '';
    @property({ type: String }) prefix = '';
    @property({ type: String }) value = '';
    @property({ type: String }) suffix = '';
    @property({ type: String, attribute: 'region-orientation' }) orientation: 'horizontal' | 'vertical' | 'h' | 'v' = 'horizontal';
    @property({ type: String, attribute: 'region-align' }) align: 'left' | 'center' | 'right' | 'space-between' | 'space-around' = 'center';
    @property({ type: String }) color = '';
    @property({ type: String, attribute: 'label-color' }) labelColor = '';
    @property({ type: String, attribute: 'prefix-color' }) prefixColor = '';
    @property({ type: String, attribute: 'value-color' }) valueColor = '';
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

    @state() private hasSlottedRegions = false;

    static styles = css`
        :host {
            display: inline-flex;
            box-sizing: border-box;
            font-family: var(--fx-font-family, sans-serif);
            overflow: hidden;
            width: 100%;
        }
        .display-container {
            display: flex;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            transition: all 0.2s ease;
        }

        .display-container.vertical,
        .display-container.v {
            flex-direction: column;
        }

        .display-container.horizontal,
        .display-container.h {
            flex-direction: row;
        }

        .display-container.grid {
            display: grid;
        }
    `;

    private handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        const assigned = slot.assignedElements({ flatten: true });

        this.hasSlottedRegions = assigned.length > 0;
    }

    protected renderRegionElement(props: any) {
        return html`
            <fx-display-region
                .label="${props.label}"
                .prefix="${props.prefix}"
                .value="${props.value}"
                .suffix="${props.suffix}"
                .orientation="${props.orientation}"
                .align="${props.align}"
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
            ></fx-display-region>
        `;
    }

    render() {
        const isGrid = this.layout === 'grid';
        const isHoriz = this.layout === 'horizontal' || this.layout === 'h';

        let layoutClass = 'vertical';
        if (isGrid) layoutClass = 'grid';
        else if (isHoriz) layoutClass = 'horizontal';

        const containerStyle = `
            gap: ${this.gap};
            grid-template-columns: ${this.gridTemplate || 'repeat(auto-fit, minmax(0, 1fr))'};
        `;

        const hostStyles = html`
            <style>
                :host {
                    ${this.width ? `width: ${this.width};` : ''}
                    ${this.height ? `height: ${this.height};` : ''}
                    background-color: ${this.bg || 'transparent'};
                    border: ${this.border};
                    border-radius: ${this.borderRadius};
                    padding: ${this.padding};
                }
            </style>
        `;

        return html`
            ${hostStyles}
            <div class="display-container ${layoutClass}" style="${containerStyle}">
                <slot @slotchange="${this.handleSlotChange}" style="display: contents;"></slot>

                ${!this.hasSlottedRegions && this.regions && this.regions.length > 0 ? this.regions.map(r => this.renderRegionElement({
                    label: r.label || '',
                    prefix: r.prefix || '',
                    value: !isNil(r.value) ? String(r.value) : '',
                    suffix: r.suffix || '',
                    orientation: r.orientation || 'horizontal',
                    align: r.align || 'center',
                    bg: r.bg || '',
                    color: r.color || '',
                    labelColor: r.labelColor || '',
                    prefixColor: r.prefixColor || '',
                    valueColor: r.valueColor || '',
                    suffixColor: r.suffixColor || '',
                    fontSize: r.fontSize || '',
                    labelSize: r.labelSize || '',
                    prefixSize: r.prefixSize || '',
                    valueSize: r.valueSize || '',
                    suffixSize: r.suffixSize || '',
                    labelWeight: r.labelWeight || '',
                    valueWeight: r.valueWeight || '',
                    prefixWeight: r.prefixWeight || '',
                    suffixWeight: r.suffixWeight || '',
                    icon: r.icon || '',
                    iconColor: r.iconColor || '',
                    iconSide: r.iconSide || 'left',
                    style: `
                        ${!isNil(r.flex) ? `flex: ${r.flex};` : ''}
                        ${r.width ? `width: ${r.width};` : ''}
                        ${r.height ? `height: ${r.height};` : ''}
                        ${r.padding ? `padding: ${r.padding};` : ''}
                        ${r.margin ? `margin: ${r.margin};` : ''}
                        ${r.border ? `border: ${r.border};` : ''}
                        ${r.borderRadius ? `border-radius: ${r.borderRadius};` : ''}
                    `
                })) : ''}

                ${!this.hasSlottedRegions && (!this.regions || this.regions.length === 0) ? this.renderRegionElement({
                    label: this.label,
                    prefix: this.prefix,
                    value: this.value,
                    suffix: this.suffix,
                    orientation: this.orientation,
                    align: this.align,
                    bg: this.bg === '#0b0f19' ? '' : this.bg,
                    color: this.color,
                    labelColor: this.labelColor,
                    prefixColor: this.prefixColor,
                    valueColor: this.valueColor,
                    suffixColor: this.suffixColor,
                    fontSize: this.fontSize,
                    labelSize: this.labelSize,
                    prefixSize: this.prefixSize,
                    valueSize: this.valueSize,
                    suffixSize: this.suffixSize,
                    labelWeight: this.labelWeight,
                    valueWeight: this.valueWeight,
                    prefixWeight: this.prefixWeight,
                    suffixWeight: this.suffixWeight,
                    icon: this.icon,
                    iconColor: this.iconColor,
                    iconSide: this.iconSide,
                    style: 'flex: 1;'
                }) : ''}
            </div>
        `;
    }
}
