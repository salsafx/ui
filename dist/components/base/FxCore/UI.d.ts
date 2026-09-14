export declare namespace LinearScale {
    type Orientation = 'horizontal' | 'vertical';
    type ValueOrigin = 'start' | 'end';
    function isReversed(orientation: Orientation, valueOrigin: ValueOrigin): boolean;
    function offsets(orientation: Orientation, valueOrigin: ValueOrigin, trackLength: number, padding?: number): {
        startOffset: number;
        endOffset: number;
    };
    function slottedValueOrigin(host: HTMLElement & {
        shadowRoot: ShadowRoot | null;
    }, slotName: string, fallback: ValueOrigin): ValueOrigin;
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
export declare class SlottedIconManager {
    private readonly host;
    static readonly managedAttr = "data-fx-managed-icon";
    static slotName(stateId: string): string;
    static statesEqual(a: SlottedIconState[], b: SlottedIconState[]): boolean;
    constructor(host: HTMLElement);
    manage(icon?: string, options?: {
        slot?: string;
        id?: string;
    }): void;
    manage(states: SlottedIconSource[]): void;
    manage(elements: SlottedIconStateElement[]): void;
    has(slot: string): boolean;
    set(stateId: string, icon?: string, slot?: string): void;
    private find;
    private hasManual;
    private prune;
    private manageList;
    private applyStateElement;
    private manageStateElements;
    private static escapeAttr;
    private static attrSelector;
}
export type FontProps = {
    family: string;
    href: string;
    id?: string;
};
export declare namespace Font {
    function load(font: FontProps): void;
}
export {};
