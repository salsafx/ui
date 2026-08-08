import { html, css, type CSSResultGroup, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
    FxContentElement,
    type ContentAlignX,
    type ContentAlignY,
} from '../base/FxContentElement';
import { syncHostIcon } from '../base/FxCore';
import './FxIcon';

@customElement('fx-tab')
export class FxTab extends FxContentElement {
    @property({ type: String }) header = '';
    @property({ type: String, attribute: 'selection-color' }) selectionColor = '';
    @property({ type: String }) badge = '';
    @property({ type: String }) icon = '';
    @property({ type: Boolean, reflect: true }) selected = false;

    @property({ type: String, attribute: 'align-x', reflect: true })
    alignX: ContentAlignX | '' = '';

    @property({ type: String, attribute: 'align-y', reflect: true })
    alignY: ContentAlignY | '' = '';

    static styles: CSSResultGroup = css`
        :host {
            display: none;
            box-sizing: border-box;
        }

        :host([selected]) {
            display: flex;
            flex-direction: column;
        }

        .icon-slot {
            display: none;
        }
    `;

    private get tabsParent(): FxContentElement | null {
        const host = this.closest('fx-tabs');
        return host instanceof FxContentElement ? host : null;
    }

    override get effectiveAlignX(): ContentAlignX {
        switch (this.alignX) {
            case 'left':
            case 'right':
            case 'stretch':
            case 'center':
                return this.alignX;
            default:
                return this.tabsParent?.effectiveAlignX ?? 'center';
        }
    }

    override get effectiveAlignY(): ContentAlignY {
        switch (this.alignY) {
            case 'top':
            case 'bottom':
            case 'stretch':
            case 'center':
                return this.alignY;
            default:
                return this.tabsParent?.effectiveAlignY ?? 'center';
        }
    }

    override get effectivePadding(): string {
        return this.padding.trim()
            ? this.padding
            : (this.tabsParent?.effectivePadding ?? '');
    }

    connectedCallback() {
        super.connectedCallback();
        syncHostIcon(this, this.icon);
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('icon')) {
            syncHostIcon(this, this.icon);
        }
        if (
            changed.has('header') ||
            changed.has('selectionColor') ||
            changed.has('badge') ||
            changed.has('icon') ||
            changed.has('disabled')
        ) {
            this.dispatchEvent(
                new CustomEvent('tabupdate', { bubbles: true, composed: true }),
            );
        }
    }

    render() {
        const { alignItems, justifyContent } = this.contentFlexAlign('column');
        const padding = this.effectivePadding.trim();
        const paddingStyle = padding ? `padding: ${padding};` : '';
        return html`
            <style>
                :host([selected]) {
                    align-items: ${alignItems};
                    justify-content: ${justifyContent};
                    ${paddingStyle}
                }
            </style>
            <div class="icon-slot">
                <slot name="icon"></slot>
            </div>
            <slot></slot>
        `;
    }
}
