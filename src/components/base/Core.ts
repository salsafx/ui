type nil = null | undefined;

export const isNil = (value: unknown): value is nil =>
    typeof value === 'undefined' || value === null;

export const Guid = (() => {
    const newS4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    const newGuid = () => `${newS4()}${newS4()}-${newS4()}-${newS4()}-${newS4()}-${newS4()}${newS4()}${newS4()}`.toLowerCase();

    return Object.freeze({
        newGuid: (
            typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
                ? crypto.randomUUID.bind(crypto)
                : newGuid
        ),
        isGuid: (value: string): boolean =>
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value),
    });
})();

export function roundToDecimals(value: number, decimals: number): number {
    const multiplier = Math.pow(10, decimals);
    return Math.round(value * multiplier) / multiplier;
}

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
    if (slot) {
        const elements = slot.assignedElements();
        if (elements.length > 0) {
            const el = elements[0] as { valueOrigin?: ValueOrigin };
            if (!isNil(el.valueOrigin)) {
                return el.valueOrigin;
            }
        }
    }
    return fallback;
}

export type SwitchStateIconSource = {
    id: string;
    icon?: string;
};

export type SwitchStateFull = SwitchStateIconSource & {
    label?: string;
    color?: string;
    backgroundColor?: string;
};

export type SwitchStateElementLike = HTMLElement & {
    value: string;
    icon: string;
};

export const FX_MANAGED_ICON_ATTR = 'data-fx-managed-icon';

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
    return host.querySelector(attrSelector(FX_MANAGED_ICON_ATTR, stateId));
}

export function ensureManagedIcon(host: HTMLElement, stateId: string, iconClass?: string) {
    const cls = iconClass?.trim();
    const existing = managedIconOf(host, stateId);

    if (!cls) {
        existing?.remove();
        return;
    }

    if (existing) {
        const slot = iconSlotName(stateId);
        if (existing.slot !== slot) existing.slot = slot;
        if (existing.className !== cls) existing.className = cls;
        return;
    }

    const el = document.createElement('i');
    el.setAttribute(FX_MANAGED_ICON_ATTR, stateId);
    el.setAttribute('aria-hidden', 'true');
    el.slot = iconSlotName(stateId);
    el.className = cls;
    host.appendChild(el);
}

function pruneManagedIcons(host: HTMLElement, keepIds: Set<string>) {
    host.querySelectorAll(attrSelector(FX_MANAGED_ICON_ATTR)).forEach((node) => {
        const id = node.getAttribute(FX_MANAGED_ICON_ATTR);
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
            if (icon.parentElement === host && icon.slot === targetSlot) continue;
            icon.slot = targetSlot;
            if (icon.parentElement !== host) host.appendChild(icon);
        }
        return;
    }

    if (el.icon?.trim()) {
        ensureManagedIcon(host, el.value, el.icon);
        return;
    }

    const hasHostManualIcon = !!host.querySelector(
        `${attrSelector('slot', targetSlot)}:not([${FX_MANAGED_ICON_ATTR}])`
    );
    if (!hasHostManualIcon) managedIconOf(host, el.value)?.remove();
}

function syncStateElementIcons(host: HTMLElement, stateElements: SwitchStateElementLike[]) {
    const ids = new Set<string>();
    for (const el of stateElements) {
        if (!el.value) continue;
        ids.add(el.value);
        applyStateElementIcon(host, el);
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

    if (arrayStates.length > 0) return syncManagedIconList(host, arrayStates);
    if (stateElements.length > 0) return syncStateElementIcons(host, stateElements);
    syncManagedIconList(host, fallbackStates);
}

export function hostHasIconSlot(host: HTMLElement, stateId: string): boolean {
    return !!host.querySelector(attrSelector('slot', iconSlotName(stateId)));
}

export function switchStatesEqual(a: SwitchStateFull[], b: SwitchStateFull[]): boolean {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    return a.every((x, i) => {
        const y = b[i];
        return (
            x.id === y.id &&
            x.label === y.label &&
            x.icon === y.icon &&
            x.color === y.color &&
            x.backgroundColor === y.backgroundColor
        );
    });
}