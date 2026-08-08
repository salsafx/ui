export type LinearOrientation = 'horizontal' | 'vertical';
export type ValueOrigin = 'start' | 'end';

export function isLinearScaleReversed(
    orientation: LinearOrientation,
    valueOrigin: ValueOrigin
): boolean {
    return orientation === 'horizontal'
        ? valueOrigin === 'end'
        : valueOrigin === 'start';
}

export function computeLinearScaleOffsets(
    orientation: LinearOrientation,
    valueOrigin: ValueOrigin,
    trackLength: number,
    padding = 0
): { startOffset: number; endOffset: number } {
    const isReverse = isLinearScaleReversed(orientation, valueOrigin);
    const innerStart = padding;
    const innerEnd = trackLength - padding;

    if (orientation === 'horizontal') {
        return {
            startOffset: isReverse ? innerEnd : innerStart,
            endOffset: isReverse ? innerStart : innerEnd,
        };
    } else {
        return {
            startOffset: isReverse ? innerStart : innerEnd,
            endOffset: isReverse ? innerEnd : innerStart,
        };
    }
}

export function getSlottedScaleValueOrigin(
    host: HTMLElement & { shadowRoot: ShadowRoot | null },
    slotName: string,
    fallback: ValueOrigin
): ValueOrigin {
    const slot = host.shadowRoot?.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement | null;
    const el = slot?.assignedElements()[0] as { valueOrigin?: ValueOrigin } | undefined;
    return el?.valueOrigin ?? fallback;
}

export type SwitchStateIconSource = {
    id: string;
    icon?: string;
};

export type SwitchStateFull = SwitchStateIconSource & {
    label?: string;
    foregroundColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
};

export type SwitchStateElementLike = HTMLElement & {
    value: string;
    icon: string;
};

export const fxManagedIconAttr = 'data-fx-managed-icon';

export function iconSlotName(stateId: string): string {
    return `icon-${stateId}`;
}

function escapeAttr(value: string): string {
    return typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
        ? CSS.escape(value)
        : value.replace(/["\\]/g, '\\$&');
}

function attrSelector(attr: string, value?: string): string {
    return value === undefined
        ? `:scope > [${attr}]`
        : `:scope > [${attr}="${escapeAttr(value)}"]`;
}

function managedIconOf(host: HTMLElement, stateId: string): HTMLElement | null {
    return host.querySelector(attrSelector(fxManagedIconAttr, stateId));
}

export function ensureManagedIcon(
    host: HTMLElement,
    stateId: string,
    icon?: string,
    slotName: string = iconSlotName(stateId),
) {
    const value = icon?.trim();
    let existing = managedIconOf(host, stateId);

    if (!value) {
        existing?.remove();
    } else {
        if (existing && existing.localName !== 'fx-icon') {
            existing.remove();
            existing = null;
        }

        if (existing) {
            if (existing.slot !== slotName) {
                existing.slot = slotName;
            }
            if (existing.getAttribute('icon') !== value) {
                existing.setAttribute('icon', value);
                if ('icon' in existing) {
                    (existing as HTMLElement & { icon: string }).icon = value;
                }
            }
        } else {
            const fxIconEl = document.createElement('fx-icon');
            fxIconEl.setAttribute(fxManagedIconAttr, stateId);
            fxIconEl.setAttribute('aria-hidden', 'true');
            fxIconEl.setAttribute('icon', value);
            fxIconEl.slot = slotName;
            host.appendChild(fxIconEl);
        }
    }
}

function pruneManagedIcons(host: HTMLElement, keepIds: Set<string>) {
    host.querySelectorAll(attrSelector(fxManagedIconAttr)).forEach((node) => {
        const id = node.getAttribute(fxManagedIconAttr);
        if (!id || !keepIds.has(id)) node.remove();
    });
}

function syncManagedIconList(host: HTMLElement, states: SwitchStateIconSource[]) {
    const ids = new Set(states.map((s) => s.id));
    for (const s of states) ensureManagedIcon(host, s.id, s.icon);
    pruneManagedIcons(host, ids);
}

function applyStateElementIcon(host: HTMLElement, el: SwitchStateElementLike) {
    const targetSlot = iconSlotName(el.value);
    const manualIcons = [...el.children].filter(
        (child): child is HTMLElement => child instanceof HTMLElement && child.slot === 'icon'
    );

    if (manualIcons.length > 0) {
        managedIconOf(host, el.value)?.remove();
        for (const icon of manualIcons) {
            if (!(icon.parentElement === host && icon.slot === targetSlot)) {
                icon.slot = targetSlot;
                if (icon.parentElement !== host) host.appendChild(icon);
            }
        }
    } else if (el.icon?.trim()) {
        ensureManagedIcon(host, el.value, el.icon);
    } else {
        const hasHostManualIcon = !!host.querySelector(
            `${attrSelector('slot', targetSlot)}:not([${fxManagedIconAttr}])`
        );
        if (!hasHostManualIcon) managedIconOf(host, el.value)?.remove();
    }
}

function syncStateElementIcons(host: HTMLElement, stateElements: SwitchStateElementLike[]) {
    const ids = new Set<string>();
    for (const el of stateElements) {
        if (el.value) {
            ids.add(el.value);
            applyStateElementIcon(host, el);
        }
    }
    pruneManagedIcons(host, ids);
}

export function syncSwitchHostIcons(
    host: HTMLElement,
    options: {
        arrayStates: SwitchStateIconSource[];
        stateElements: SwitchStateElementLike[];
        fallbackStates: SwitchStateIconSource[];
    }
) {
    const { arrayStates, stateElements, fallbackStates } = options;

    if (arrayStates.length > 0) {
        syncManagedIconList(host, arrayStates);
    } else if (stateElements.length > 0) {
        syncStateElementIcons(host, stateElements);
    } else {
        syncManagedIconList(host, fallbackStates);
    }
}

export function syncHostIcon(
    host: HTMLElement,
    icon?: string,
    options: { slot?: string; id?: string } = {},
) {
    const slot = options.slot ?? 'icon';
    const id = options.id ?? slot;
    const hasManual = !!host.querySelector(
        `${attrSelector('slot', slot)}:not([${fxManagedIconAttr}])`
    );
    if (hasManual) {
        managedIconOf(host, id)?.remove();
    } else {
        ensureManagedIcon(host, id, icon, slot);
    }
}

export function hostHasIconSlot(host: HTMLElement, stateId: string): boolean {
    return !!host.querySelector(attrSelector('slot', iconSlotName(stateId)));
}

export function hostHasNamedSlot(host: HTMLElement, slotName: string): boolean {
    return !!host.querySelector(attrSelector('slot', slotName));
}

export function switchStatesEqual(a: SwitchStateFull[], b: SwitchStateFull[]): boolean {
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

export type FontProps = {
    family: string;
    href: string;
    id?: string;
};

export function ensureFont(font: FontProps): void {
    if (typeof document !== 'undefined') {
        const fontId =
            font.id ??
            `fx-font-${font.family
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')}`;

        if (!document.getElementById(fontId)) {
            const linkEl = document.createElement('link');
            linkEl.id = fontId;
            linkEl.rel = 'stylesheet';
            linkEl.href = font.href;
            document.head.appendChild(linkEl);
        }
    }
}