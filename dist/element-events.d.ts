export type FxAlertDismissEvent = CustomEvent<Record<string, unknown>>;
export type FxFaderInputEvent = CustomEvent<{
    value: number;
    displayValue: number;
}>;
export type FxFaderChangeEvent = CustomEvent<{
    value: number;
    displayValue: number;
}>;
export type FxGaugeRegionRegionupdateEvent = CustomEvent<Record<string, unknown>>;
export type FxLedIndicatorChangeEvent = CustomEvent<{
    isActive: string;
    name: string;
}>;
export type FxPotentiometerInputEvent = CustomEvent<{
    value: number;
}>;
export type FxPotentiometerChangeEvent = CustomEvent<{
    value: number;
}>;
export type FxPushButtonReleaseEvent = CustomEvent<{
    active: string;
    isActive: string;
}>;
export type FxPushButtonPressEvent = CustomEvent<{
    active: string;
    isActive: string;
}>;
export type FxPushButtonChangeEvent = CustomEvent<{
    active: string;
    isActive: string;
}>;
export type FxRadialSwitchChangeEvent = CustomEvent<{
    state: string;
}>;
export type FxRotarySelectorChangeEvent = CustomEvent<{
    sectorId: string;
    range: string;
}>;
export type FxRotarySelectorSectorSectorupdateEvent = CustomEvent<Record<string, unknown>>;
export type FxSemaphoreStateStateupdateEvent = CustomEvent<Record<string, unknown>>;
export type FxSwitchChangeEvent = CustomEvent<{
    state: string;
}>;
export type FxSwitchStateStateupdateEvent = CustomEvent<Record<string, unknown>>;
export type FxTabTabupdateEvent = CustomEvent<Record<string, unknown>>;
export type FxTabsChangeEvent = CustomEvent<Record<string, unknown>>;
