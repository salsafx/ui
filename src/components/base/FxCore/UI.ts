import { El } from './El.SalsaFX';

export namespace LinearScale {
    export type Orientation = 'horizontal' | 'vertical';
    export type ValueOrigin = 'start' | 'end';

    export function isReversed(orientation: Orientation, valueOrigin: ValueOrigin): boolean {
        return orientation === 'horizontal'
            ? valueOrigin === 'end'
            : valueOrigin === 'start';
    }

    export function offsets(
        orientation: Orientation,
        valueOrigin: ValueOrigin,
        trackLength: number,
        padding = 0,
    ): { startOffset: number; endOffset: number } {
        const reversed = isReversed(orientation, valueOrigin);
        const innerStart = padding;
        const innerEnd = trackLength - padding;
        return (
            orientation === 'horizontal'
                ?
                    {
                        startOffset: reversed ? innerEnd : innerStart,
                        endOffset: reversed ? innerStart : innerEnd,
                    }
                :
                    {
                        startOffset: reversed ? innerStart : innerEnd,
                        endOffset: reversed ? innerEnd : innerStart,
                    }
        );
    }

    export function slottedValueOrigin(
        host: HTMLElement & { shadowRoot: ShadowRoot | null },
        slotName: string,
        fallback: ValueOrigin,
    ): ValueOrigin {
        const slot = host.shadowRoot?.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement | null;
        const el = slot?.assignedElements()[0] as { valueOrigin?: ValueOrigin } | undefined;
        return el?.valueOrigin ?? fallback;
    }
}

export type LinearOrientation = LinearScale.Orientation;
export type ValueOrigin = LinearScale.ValueOrigin;

type SlottedIconSource = {
    id: string;
    icon?: string;
};

type SlottedIconState = SlottedIconSource & {
    label?: string;
    foregroundColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
};

type SlottedIconStateElement = HTMLElement & {
    value: string;
    icon: string;
};

export class SlottedIconManager {
    static readonly managedAttr = 'data-fx-managed-icon';

    static slotName(stateId: string): string {
        return `icon-${stateId}`;
    }

    static statesEqual(a: SlottedIconState[], b: SlottedIconState[]): boolean {
        if (a === b) {
            return true;
        } else if (a.length !== b.length) {
            return false;
        } else {
            return a.every((x, i) => {
                const y = b[i];
                return (
                    x.id === y.id &&
                    x.label === y.label &&
                    x.icon === y.icon &&
                    x.foregroundColor === y.foregroundColor &&
                    x.backgroundColor === y.backgroundColor &&
                    !!x.disabled === !!y.disabled
                );
            });
        }
    }

    constructor(private readonly host: HTMLElement) {}

    manage(icon?: string, options?: { slot?: string; id?: string }): void;
    manage(states: SlottedIconSource[]): void;
    manage(elements: SlottedIconStateElement[]): void;
    manage(
        input?: string | SlottedIconSource[] | SlottedIconStateElement[],
        options: { slot?: string; id?: string } = {},
    ) {
        if (Array.isArray(input)) {
            if (input.length > 0 && input[0] instanceof HTMLElement) {
                this.manageStateElements(input as SlottedIconStateElement[]);
            } else {
                this.manageList(input as SlottedIconSource[]);
            }
        } else {
            const slot = options.slot ?? 'icon';
            const id = options.id ?? slot;
            if (this.hasManual(slot)) {
                this.find(id)?.remove();
            } else {
                this.set(id, input, slot);
            }
        }
    }

    has(slot: string): boolean {
        return !!this.host.querySelector(SlottedIconManager.attrSelector('slot', slot));
    }

    set(stateId: string, icon?: string, slot: string = SlottedIconManager.slotName(stateId)) {
        const value = icon?.trim();
        let existing = this.find(stateId);

        if (!value) {
            existing?.remove();
        } else {
            if (existing && existing.localName !== 'fx-icon') {
                existing.remove();
                existing = null;
            }

            if (existing) {
                if (existing.slot !== slot) {
                    existing.slot = slot;
                }
                if (existing.getAttribute('icon') !== value) {
                    existing.setAttribute('icon', value);
                    if ('icon' in existing) {
                        (existing as HTMLElement & { icon: string }).icon = value;
                    }
                }
            } else {
                this.host.appendChild(El.fxIcon({
                    [SlottedIconManager.managedAttr]: stateId,
                    'aria-hidden': 'true',
                    icon: value,
                    slot,
                }));
            }
        }
    }

    private find(stateId: string): HTMLElement | null {
        return this.host.querySelector(SlottedIconManager.attrSelector(SlottedIconManager.managedAttr, stateId));
    }

    private hasManual(slot: string): boolean {
        return !!this.host.querySelector(
            `${SlottedIconManager.attrSelector('slot', slot)}:not([${SlottedIconManager.managedAttr}])`,
        );
    }

    private prune(keepIds: Set<string>) {
        this.host.querySelectorAll(SlottedIconManager.attrSelector(SlottedIconManager.managedAttr)).forEach((node) => {
            const id = node.getAttribute(SlottedIconManager.managedAttr);
            if (!id || !keepIds.has(id)) node.remove();
        });
    }

    private manageList(states: SlottedIconSource[]) {
        const ids = new Set(states.map((state) => state.id));
        for (const state of states) this.set(state.id, state.icon);
        this.prune(ids);
    }

    private applyStateElement(stateElement: SlottedIconStateElement) {
        const targetSlot = SlottedIconManager.slotName(stateElement.value);
        const manualIcons = [...stateElement.children].filter(
            (child): child is HTMLElement => child instanceof HTMLElement && child.slot === 'icon',
        );

        if (manualIcons.length > 0) {
            this.find(stateElement.value)?.remove();
            for (const icon of manualIcons) {
                if (!(icon.parentElement === this.host && icon.slot === targetSlot)) {
                    icon.slot = targetSlot;
                    if (icon.parentElement !== this.host) this.host.appendChild(icon);
                }
            }
        } else if (stateElement.icon?.trim()) {
            this.set(stateElement.value, stateElement.icon);
        } else if (!this.hasManual(targetSlot)) {
            this.find(stateElement.value)?.remove();
        }
    }

    private manageStateElements(stateElements: SlottedIconStateElement[]) {
        const ids = new Set<string>();
        for (const stateElement of stateElements) {
            if (stateElement.value) {
                ids.add(stateElement.value);
                this.applyStateElement(stateElement);
            }
        }
        this.prune(ids);
    }

    private static escapeAttr(value: string): string {
        return typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
            ? CSS.escape(value)
            : value.replace(/["\\]/g, '\\$&');
    }

    private static attrSelector(attr: string, value?: string): string {
        return value === undefined
            ? `:scope > [${attr}]`
            : `:scope > [${attr}="${SlottedIconManager.escapeAttr(value)}"]`;
    }
}

export class SlottedBadgeManager {
    static readonly managedAttr = 'data-fx-managed-badge';
    static readonly slotName = 'badge';

    constructor(private readonly host: HTMLElement) {}

    manage(text: string, options: { color?: string; background?: string } = {}) {
        if (this.hasManual()) {
            this.find()?.remove();
        } else {
            this.set(text, options);
        }
    }

    private set(text: string, options: { color?: string; background?: string }) {
        const value = text.trim();
        const useFxBadge = !!customElements.get('fx-badge');
        const tag = useFxBadge ? 'fx-badge' : 'span';
        let existing = this.find();

        if (!value) {
            existing?.remove();
            return;
        }

        if (existing && existing.localName !== tag) {
            existing.remove();
            existing = null;
        }

        if (!existing) {
            existing = document.createElement(tag);
            existing.setAttribute(SlottedBadgeManager.managedAttr, SlottedBadgeManager.slotName);
            existing.slot = SlottedBadgeManager.slotName;
            this.host.appendChild(existing);
        }

        if (useFxBadge) {
            existing.removeAttribute('class');
            existing.textContent = '';
            this.setProp(existing, 'label', value);
            this.setProp(existing, 'color', options.color ?? '');
            this.setProp(existing, 'background', options.background ?? '');
            this.setProp(existing, 'size', 'small');
        } else {
            existing.className = 'badge';
            existing.textContent = value;
            existing.style.color = options.color ?? '';
            existing.style.background = options.background ?? '';
        }
    }

    private setProp(element: HTMLElement, name: string, value: string) {
        element.setAttribute(name, value);
        if (name in element) {
            (element as HTMLElement & Record<string, string>)[name] = value;
        }
    }

    private find(): HTMLElement | null {
        return this.host.querySelector(
            `:scope > [${SlottedBadgeManager.managedAttr}="${SlottedBadgeManager.slotName}"]`,
        );
    }

    private hasManual(): boolean {
        return !!this.host.querySelector(
            `:scope > [slot="${SlottedBadgeManager.slotName}"]:not([${SlottedBadgeManager.managedAttr}])`,
        );
    }
}

export type FontProps = {
    family: string;
    href: string;
    id?: string;
};

export namespace Font {
    export function load(font: FontProps): void {
        if (typeof document !== 'undefined') {
            const fontId =
                font.id ??
                `fx-font-${font.family
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '')}`;

            if (!document.getElementById(fontId)) {
                if (font.href.includes('{')) {
                    document.head.appendChild(El.style({
                        id: fontId,
                        textContent: font.href,
                    }));
                } else {
                    document.head.appendChild(El.link({
                        id: fontId,
                        rel: 'stylesheet',
                        href: font.href,
                    }));
                }
            }
        }
    }
}
