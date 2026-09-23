import { FxElement } from '../base/FxElement';
import { type FxThemeMode } from '../base/Fx/ThemeManager/ThemeManager';
import './FxSwitchState';
import '../common/FxIcon';
export interface FxSwitchState {
    id: string;
    label: string;
    icon?: string;
    foregroundColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
}
declare const FxSwitch_base: (new (...args: any[]) => import("../base/Animatable").AnimatableInterface) & typeof FxElement;
export declare class FxSwitch extends FxSwitch_base {
    states: FxSwitchState[];
    activeId: string;
    orientation: string;
    theme?: FxThemeMode;
    foregroundColor: string;
    backgroundColor: string;
    stateWidth: string | number;
    private slottedStates;
    private readonly slottedIcons;
    private resolveStateWidth;
    protected get effectiveStates(): FxSwitchState[];
    private getAssignedStateElements;
    private managingIcons;
    private iconPresenceKey;
    private manageIcons;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private onStateUpdate;
    protected collectSlottedStates(): void;
    firstUpdated(): void;
    updated(changed: Map<string | number | symbol, unknown>): void;
    protected handleStateChange(id: string): void;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
    private onStatesSlotChange;
}
export {};
