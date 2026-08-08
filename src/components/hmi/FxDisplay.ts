import { html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { isNil } from '../base/FxCore';
import { themeVariables } from '../styles/FxTheme';
import { reflectOptionalTheme } from '../base/Fx/ThemeManager/ThemeManager';
import {
    type FxDisplayContentLayout,
    type FxDisplaySize,
    type FxDisplayGlow,
    type FxDisplayTypography,
    type FxDisplayTheme,
    type FxDisplayAlign,
    type FxDisplayRegionConfig,
    customDisplaySizeVars,
    ensureDisplayTypography,
    reflectNonDefaultTypography,
    reflectNonDefaultContentLayout,
    reflectNonDefaultAlign,
} from '../base/FxCore/Display';
import { FxDisplayRegion } from './FxDisplayRegion';
import '../common/FxIcon';

export * from '../base/FxCore/Display';
export { FxDisplayRegion } from './FxDisplayRegion';
export { FxIcon } from '../common/FxIcon';

@customElement('fx-display')
export class FxDisplay extends FxElement {
    @property({ type: String, reflect: true }) layout: 'horizontal' | 'vertical' | 'grid' | 'h' | 'v' = 'vertical';
    @property({ type: String }) gap = '4px';
    @property({ type: String, attribute: 'grid-template' }) gridTemplate = '';

    @property({ type: String }) padding = '';
    @property({ type: String }) border = '';
    @property({ type: String, attribute: 'border-radius' }) borderRadius = '';
    @property({ type: String, attribute: 'background-color' }) backgroundColor = '';

    @property({
        type: Boolean,
        attribute: 'has-shell',
        reflect: true,
        converter: {
            fromAttribute: (value: string | null) => value !== 'false',
            toAttribute: (value: boolean) => (value ? '' : 'false'),
        },
    })
    hasShell = true;

    @property({ type: String, reflect: true })
    size: FxDisplaySize = 'small';

    @property({ type: String, attribute: 'content-layout', reflect: true, converter: reflectNonDefaultContentLayout })
    contentLayout: FxDisplayContentLayout = 'labeled';

    @property({ type: String, reflect: true, converter: reflectNonDefaultTypography })
    typography: FxDisplayTypography = 'segmented';

    @property({ type: String, reflect: true, converter: reflectOptionalTheme })
    theme?: FxDisplayTheme;

    @property({ type: String, reflect: true })
    glow: FxDisplayGlow = 'small';

    @property({ type: Boolean, attribute: 'is-selectable', reflect: true }) isSelectable = false;

    @property({ type: Array })
    get regions(): FxDisplayRegionConfig[] {
        return this.regionConfigs;
    }
    set regions(val: string | FxDisplayRegionConfig[]) {
        const oldVal = this.regionConfigs;
        if (typeof val === 'string') {
            try {
                this.regionConfigs = JSON.parse(val);
            } catch (e) {
                console.error('Failed to parse regions JSON:', e);
                this.regionConfigs = [];
            }
        } else if (Array.isArray(val)) {
            this.regionConfigs = val;
        } else {
            this.regionConfigs = [];
        }
        this.requestUpdate('regions', oldVal);
    }
    private regionConfigs: FxDisplayRegionConfig[] = [];

    @property({ type: String }) label = '';
    @property({ type: String }) prefix = '';
    @property({ type: String }) value = '';
    @property({ type: String }) suffix = '';
    @property({ type: String, attribute: 'value-template' }) valueTemplate = '';
    @property({ type: String, attribute: 'region-align', reflect: true, converter: reflectNonDefaultAlign })
    align: FxDisplayAlign = 'center';
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

    @state() private hasSlottedRegions = false;

    static styles = [
        themeVariables,
        css`
            :host {
                display: inline-flex;
                box-sizing: border-box;
                min-width: 0;
                min-height: 0;
                width: var(--fx-display-width);
                height: var(--fx-display-height);
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                cursor: default;
                --fx-display-shell-background: var(--fx-theme-display-shell-background, #0b111f);
                --fx-display-shell-border: var(--fx-theme-display-shell-border, #334155);
                --fx-display-shell-radius: 10px;
                --fx-display-shell-pad: 8px;
                --fx-display-glow: 0 0 2px currentColor;
                --fx-display-letter-spacing: 0.05em;
                --fx-display-label-letter-spacing: 0.1em;
                --fx-display-label-weight: 700;
                --fx-display-value-weight: 700;
            }

            :host([theme='silver']) {
                --fx-display-shell-background: #1e293b;
                --fx-display-shell-border: #334155;
            }

            :host([theme='darkblue']) {
                --fx-display-shell-background: #0b111f;
                --fx-display-shell-border: #334155;
            }

            :host([typography='classic']) {
                --fx-display-font-family: var(--fx-font-family, system-ui, sans-serif);
                --fx-display-letter-spacing: normal;
                --fx-display-label-letter-spacing: 0.08em;
            }

            :host([typography='modern']) {
                --fx-display-font-family: 'Oxanium', 'Chakra Petch', sans-serif;
                --fx-display-letter-spacing: 0.02em;
                --fx-display-label-letter-spacing: 0.08em;
                --fx-display-label-weight: 400;
                --fx-display-value-weight: 400;
            }

            :host([glow='none']) {
                --fx-display-glow: none;
            }
            :host([glow='small']) {
                --fx-display-glow: 0 0 2px currentColor;
            }
            :host([glow='medium']) {
                --fx-display-glow: 0 0 4px currentColor;
            }
            :host([glow='large']) {
                --fx-display-glow: 0 0 6px currentColor;
            }
            :host([glow='x-large']) {
                --fx-display-glow: 0 0 10px currentColor, 0 0 3px currentColor;
            }

            :host([size='x-small']) {
                --fx-display-shell-pad: 6px;
                --fx-display-shell-radius: 8px;
            }
            :host([size='small']) {
                --fx-display-shell-pad: 8px;
                --fx-display-shell-radius: 10px;
            }
            :host([size='medium']) {
                --fx-display-shell-pad: 10px;
                --fx-display-shell-radius: 12px;
            }
            :host([size='large']) {
                --fx-display-shell-pad: 10px;
                --fx-display-shell-radius: 12px;
            }
            :host([size='x-large']) {
                --fx-display-shell-pad: 12px;
                --fx-display-shell-radius: 14px;
            }
            :host([size='xx-large']) {
                --fx-display-shell-pad: 12px;
                --fx-display-shell-radius: 14px;
            }

            :host([is-selectable]) {
                user-select: text;
                cursor: text;
            }

            .shell {
                position: relative;
                display: flex;
                width: 100%;
                min-width: 0;
                box-sizing: border-box;
                background: var(--fx-display-shell-background);
                border: 1.5px solid var(--fx-display-shell-border);
                border-radius: var(--fx-display-shell-radius);
                padding: var(--fx-display-shell-pad);
                box-shadow:
                    var(--fx-shell-shadow, 0 1px 2px rgba(0, 0, 0, 0.35)),
                    inset 0 1px 0 rgba(255, 255, 255, 0.06),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.28);
            }

            :host([has-shell='false']) .shell {
                background: transparent;
                border: none;
                border-radius: 0;
                padding: 0;
                box-shadow: none;
            }

            .display-container {
                display: flex;
                width: 100%;
                min-width: 0;
                height: auto;
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
                align-items: stretch;
            }
            .display-container.grid {
                display: grid;
                justify-items: stretch;
                align-items: center;
            }
        `,
    ];

    connectedCallback() {
        super.connectedCallback();
        ensureDisplayTypography(this.typography);
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('typography')) {
            ensureDisplayTypography(this.typography);
        }
        if (
            changed.has('isSelectable') ||
            changed.has('size') ||
            changed.has('contentLayout') ||
            changed.has('typography') ||
            changed.has('align') ||
            changed.has('foregroundColor') ||
            changed.has('labelColor') ||
            changed.has('prefixColor') ||
            changed.has('suffixColor') ||
            changed.has('color') ||
            changed.has('valueTemplate')
        ) {
            this.syncHostPropsToSlottedRegions();
        }
    }

    private handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this.hasSlottedRegions = slot.assignedElements({ flatten: true }).length > 0;
        this.syncHostPropsToSlottedRegions();
    }

    private syncHostPropsToSlottedRegions() {
        for (const el of this.querySelectorAll('fx-display-region')) {
            if (el.closest('fx-display') === this) {
                const region = el as FxDisplayRegion;
                region.isSelectable = this.isSelectable;
                if (!region.hasAttribute('size')) region.size = this.size;
                if (!region.hasAttribute('typography')) region.typography = this.typography;
                if (!region.hasAttribute('content-layout')) region.contentLayout = this.contentLayout;
                if (!region.hasAttribute('align')) region.align = this.align;
                if (!region.hasAttribute('foreground-color')) region.foregroundColor = this.foregroundColor;
                if (!region.hasAttribute('label-color')) region.labelColor = this.labelColor;
                if (!region.hasAttribute('prefix-color') && this.prefixColor) {
                    region.prefixColor = this.prefixColor;
                }
                if (!region.hasAttribute('suffix-color') && this.suffixColor) {
                    region.suffixColor = this.suffixColor;
                }
                if (!region.hasAttribute('color') && this.color) region.color = this.color;
                if (!region.hasAttribute('value-template') && this.valueTemplate) {
                    region.valueTemplate = this.valueTemplate;
                }
            }
        }
    }

    protected renderRegionElement(props: Record<string, unknown>) {
        return html`
            <fx-display-region
                .label="${props.label}"
                .prefix="${props.prefix}"
                .value="${props.value}"
                .suffix="${props.suffix}"
                .valueTemplate="${props.valueTemplate || ''}"
                .contentLayout="${props.contentLayout}"
                .align="${props.align}"
                .size="${props.size}"
                .backgroundColor="${props.backgroundColor}"
                .color="${props.color}"
                .labelColor="${props.labelColor}"
                .prefixColor="${props.prefixColor}"
                .foregroundColor="${props.foregroundColor}"
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
                .typography="${props.typography}"
                ?is-selectable=${!!props.isSelectable}
                style="${props.style || ''}"
            ></fx-display-region>
        `;
    }

    render() {
        let layoutClass = 'vertical';
        switch (this.layout) {
            case 'grid':
                layoutClass = 'grid';
                break;
            case 'horizontal':
            case 'h':
                layoutClass = 'horizontal';
                break;
            case 'vertical':
            case 'v':
                break;
        }

        const containerStyle = `
            gap: ${this.gap};
            grid-template-columns: ${this.gridTemplate || 'repeat(auto-fit, max-content)'};
        `;

        const hostStyles = html`
            <style>
                :host {
                    ${this.backgroundColor ? `--fx-display-shell-background: ${this.backgroundColor};` : ''}
                    ${this.borderRadius ? `--fx-display-shell-radius: ${this.borderRadius};` : ''}
                    ${this.padding ? `--fx-display-shell-pad: ${this.padding};` : ''}
                    ${customDisplaySizeVars(this.size)}
                }
                .shell {
                    ${this.border ? `border: ${this.border};` : ''}
                }
            </style>
        `;

        const body = html`
            <div class="display-container ${layoutClass}" style="${containerStyle}">
                <slot @slotchange="${this.handleSlotChange}" style="display: contents;"></slot>

                ${!this.hasSlottedRegions && this.regions.length > 0
                    ? this.regions.map((r) =>
                          this.renderRegionElement({
                              label: r.label || '',
                              prefix: r.prefix || '',
                              value: !isNil(r.value) ? String(r.value) : '',
                              suffix: r.suffix || '',
                              valueTemplate: r.valueTemplate || this.valueTemplate,
                              contentLayout: r.contentLayout || this.contentLayout,
                              align: r.align || 'center',
                              size: r.size || this.size,
                              backgroundColor: r.backgroundColor || '',
                              color: r.color || '',
                              labelColor: r.labelColor || '',
                              prefixColor: r.prefixColor || '',
                              foregroundColor: r.foregroundColor || this.foregroundColor,
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
                              typography: r.typography || this.typography,
                              isSelectable: !isNil(r.isSelectable) ? r.isSelectable : this.isSelectable,
                              style: `
                                ${!isNil(r.flex) ? `flex: ${r.flex};` : ''}
                                ${r.width ? `width: ${r.width};` : ''}
                                ${r.height ? `height: ${r.height};` : ''}
                                ${r.padding ? `padding: ${r.padding};` : ''}
                                ${r.margin ? `margin: ${r.margin};` : ''}
                                ${r.border ? `border: ${r.border};` : ''}
                                ${r.borderRadius ? `border-radius: ${r.borderRadius};` : ''}
                            `,
                          }),
                      )
                    : ''}

                ${!this.hasSlottedRegions && this.regions.length === 0
                    ? this.renderRegionElement({
                          label: this.label,
                          prefix: this.prefix,
                          value: this.value,
                          suffix: this.suffix,
                          valueTemplate: this.valueTemplate,
                          contentLayout: this.contentLayout,
                          align: this.align,
                          size: this.size,
                          backgroundColor: '',
                          color: this.color,
                          labelColor: this.labelColor,
                          prefixColor: this.prefixColor,
                          foregroundColor: this.foregroundColor,
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
                          typography: this.typography,
                          isSelectable: this.isSelectable,
                          style: 'flex: 1;',
                      })
                    : ''}
            </div>
        `;

        return html`
            ${hostStyles}
            <div class="shell">${body}</div>
        `;
    }
}
