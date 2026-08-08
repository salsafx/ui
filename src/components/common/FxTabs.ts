import { html, css, nothing, type CSSResultGroup, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FxContentElement } from '../base/FxContentElement';
import { Animatable } from '../base/Animatable';
import { ensureManagedIcon, fxManagedIconAttr } from '../base/FxCore';
import { themeVariables } from '../styles/FxTheme';
import { reflectOptionalTheme, type FxThemeMode } from '../base/Fx/ThemeManager/ThemeManager';
import { FxTab } from './FxTab';
import './FxIcon';

function tabIconSlotName(index: number): string {
    return `icon-${index}`;
}

@customElement('fx-tabs')
export class FxTabs extends Animatable(FxContentElement) {
    @property({ type: Number, attribute: 'selected-index', reflect: true }) selectedIndex = 0;
    @property({ type: String, attribute: 'selection-color' }) selectionColor = '#f59e0b';
    @property({ type: String, reflect: true, converter: reflectOptionalTheme })
    theme?: FxThemeMode;

    @state() private tabSignature = '';

    private syncingIcons = false;

    static styles: CSSResultGroup = [
        themeVariables,
        css`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
                color: #e2e8f0;
                background: var(--fx-tabs-background, #0c0e12);
            }
            :host([theme='darkgreen']) {
                --fx-tabs-background: #131920;
                --fx-tabs-nav-background: #0c0e12;
                --fx-tabs-nav-border: #2a3a4a;
            }
            :host([theme='iron']) {
                --fx-tabs-background: #111827;
                --fx-tabs-nav-background: #0c0e12;
                --fx-tabs-nav-border: #1f2937;
            }
            :host([theme='darkergreen']) {
                --fx-tabs-background: #0c0e12;
                --fx-tabs-nav-background: #080b10;
                --fx-tabs-nav-border: #2a3a4a;
            }

            .nav {
                position: relative;
                z-index: 1;
                display: flex;
                align-items: flex-end;
                gap: 3px;
                padding: 8px 20px 0;
                background: var(--fx-tabs-nav-background, #080b10);
                border-bottom: 1px solid var(--fx-tabs-nav-border, #2a3a4a);
                box-sizing: border-box;
            }

            .tab {
                position: relative;
                z-index: 0;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                height: 40px;
                margin-bottom: -1px;
                padding: 0 16px;
                border-style: solid;
                border-width: 1px;
                border-color: #1c2530 #1c2530 #0a0d12 #1c2530;
                border-radius: 6px 6px 0 0;
                background: #0a0d12;
                color: #475569;
                outline: none;
                cursor: pointer;
                font-family: inherit;
                font-size: 0.72rem;
                font-weight: 700;
                letter-spacing: 0.09em;
                text-transform: uppercase;
                box-sizing: border-box;
            }

            :host([is-animated]) .tab {
                transition:
                    color 0.18s ease,
                    background-color 0.18s ease,
                    border-color 0.18s ease,
                    border-top-width 0.18s ease;
            }

            .tab[aria-selected='true'] {
                z-index: 2;
                border-width: 3px 1px 1px 1px;
                border-color: var(--fx-tab-color, #f59e0b) #2a3a4a
                    var(--fx-tabs-background, #0c0e12) #2a3a4a;
                background: var(--fx-tabs-background, #0c0e12);
                color: var(--fx-tab-color, #f59e0b);
            }

            .tab:focus-visible {
                box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--fx-tab-color, #f59e0b) 55%, transparent);
            }

            .icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 0.95em;
                line-height: 1;
            }

            .icon ::slotted(*) {
                font-size: inherit;
                color: inherit;
                line-height: 1;
            }

            .badge {
                background: var(--fx-tab-color, #f59e0b);
                color: #fff;
                font-size: 0.6rem;
                font-weight: 800;
                padding: 1px 5px;
                border-radius: 10px;
                line-height: 1.3;
            }

            .panels {
                box-sizing: border-box;
                min-height: 0;
            }

            @keyframes fxTabEnter {
                from {
                    opacity: 0;
                    transform: translateY(6px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            :host([is-animated]) ::slotted(fx-tab[selected]) {
                animation: fxTabEnter 0.22s ease;
            }
        `,
    ];

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('tabupdate', this.onTabUpdate);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('tabupdate', this.onTabUpdate);
    }

    private onTabUpdate = () => {
        this.refreshTabs();
    };

    private getAssignedTabs(): FxTab[] {
        const slot = this.shadowRoot?.querySelector('slot.tabs') as HTMLSlotElement | null;
        return (
            slot
                ?
                    slot
                        .assignedElements({ flatten: true })
                        .filter((el): el is FxTab => el instanceof FxTab)
                :
                    []
        );
    }

    private refreshTabs() {
        const tabs = this.getAssignedTabs();
        this.syncSelection(tabs);
        this.syncTabIcons(tabs);
        const signature = tabs
            .map((tab, index) => {
                const hasIcon = !!this.querySelector(
                    `:scope > [slot="${tabIconSlotName(index)}"]`,
                );
                return `${index}:${tab.header}:${tab.selectionColor}:${tab.badge}:${tab.icon}:${tab.disabled}:${hasIcon ? '1' : '0'}`;
            })
            .join('|');
        if (signature !== this.tabSignature) {
            this.tabSignature = signature;
        }
    }

    private syncSelection(tabs: FxTab[]) {
        if (tabs.length > 0) {
            let index = this.selectedIndex;
            if (index < 0) {
                index = 0;
            } else if (index >= tabs.length) {
                index = tabs.length - 1;
            }
            if (index !== this.selectedIndex) {
                this.selectedIndex = index;
            }
            tabs.forEach((tab, i) => {
                const selected = i === index && !tab.disabled;
                if (tab.selected !== selected) {
                    tab.selected = selected;
                }
            });
        }
    }

    private syncTabIcons(tabs: FxTab[]) {
        if (!this.syncingIcons) {
            this.syncingIcons = true;
            try {
                const keep = new Set<string>();
                tabs.forEach((tab, index) => {
                    const slotName = tabIconSlotName(index);
                    const stateId = String(index);
                    keep.add(slotName);
    
                    const manualOnTab = [...tab.children].filter(
                        (child): child is HTMLElement =>
                            child instanceof HTMLElement &&
                            child.slot === 'icon' &&
                            !child.hasAttribute(fxManagedIconAttr),
                    );
    
                    if (manualOnTab.length > 0) {
                        ensureManagedIcon(this, stateId, '', slotName);
                        for (const icon of manualOnTab) {
                            if (!(icon.parentElement === this && icon.slot === slotName)) {
                                icon.slot = slotName;
                                if (icon.parentElement !== this) {
                                    this.appendChild(icon);
                                }
                            }
                        }
                    } else if (tab.icon.trim()) {
                        this.querySelectorAll(
                            `:scope > [slot="${slotName}"]:not([${fxManagedIconAttr}])`,
                        ).forEach((node) => node.remove());
                        ensureManagedIcon(this, stateId, tab.icon, slotName);
                    } else {
                        const hasHostManual = !!this.querySelector(
                            `:scope > [slot="${slotName}"]:not([${fxManagedIconAttr}])`,
                        );
                        if (!hasHostManual) {
                            ensureManagedIcon(this, stateId, '', slotName);
                        }
                    }
                });
                this.querySelectorAll(':scope > [slot^="icon-"]').forEach((node) => {
                    const slot = node.getAttribute('slot');
                    if (slot && !keep.has(slot)) {
                        node.remove();
                    }
                });
            } finally {
                this.syncingIcons = false;
            }
        }
    }

    private selectTab(index: number) {
        if (!this.disabled) {
            const tabs = this.getAssignedTabs();
            const tab = tabs[index];
            if (tab && !tab.disabled && index !== this.selectedIndex) {
                this.selectedIndex = index;
                this.syncSelection(tabs);
                this.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { index, tab },
                        bubbles: true,
                        composed: true,
                    }),
                );
            }
        }
    }

    protected firstUpdated() {
        this.refreshTabs();
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('selectedIndex')) {
            this.syncSelection(this.getAssignedTabs());
        }
        if (
            changed.has('alignX') ||
            changed.has('alignY') ||
            changed.has('padding')
        ) {
            for (const tab of this.getAssignedTabs()) {
                tab.requestUpdate();
            }
        }
    }

    private onSlotChange = () => {
        this.refreshTabs();
    };

    private resolveTabSelectionColor(tab: FxTab): string {
        const value = tab.selectionColor.trim();
        return value ? value : (this.selectionColor.trim() || '#f59e0b');
    }

    private renderTabButton(tab: FxTab, index: number) {
        const selected = index === this.selectedIndex && !tab.disabled;
        const color = this.resolveTabSelectionColor(tab);
        const slotName = tabIconSlotName(index);
        const hasIcon = !!this.querySelector(`:scope > [slot="${slotName}"]`);

        return html`
            <button
                class="tab"
                type="button"
                role="tab"
                part="tab"
                style="--fx-tab-color: ${color}"
                aria-selected=${selected ? 'true' : 'false'}
                ?disabled=${tab.disabled}
                @click=${() => this.selectTab(index)}
            >
                ${hasIcon
                    ? html`<span class="icon" part="tab-icon"><slot name=${slotName}></slot></span>`
                    : nothing}
                <span part="tab-header">${tab.header}</span>
                ${tab.badge.trim()
                    ? html`<span class="badge" part="tab-badge">${tab.badge}</span>`
                    : nothing}
            </button>
        `;
    }

    render() {
        const tabs = this.getAssignedTabs();
        return html`
            <div class="nav" part="nav" role="tablist">
                ${tabs.map((tab, index) => this.renderTabButton(tab, index))}
            </div>
            <div class="panels" part="panels">
                <slot class="tabs" @slotchange=${this.onSlotChange}></slot>
            </div>
        `;
    }
}
