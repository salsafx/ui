import { FxElement } from '../base/FxElement';
import { type VariantAttribute } from '../base/FxCore';
import '../common/FxIcon';
import './FxSemaphoreState';
import './FxLedIndicator';
export interface FxSemaphoreStateData {
    value: string;
    color: string;
    variant?: VariantAttribute;
    label: string;
    icon?: string;
    isBlinking?: boolean;
}
declare const FxSemaphore_base: (new (...args: any[]) => import("../base/Animatable").AnimatableInterface) & typeof FxElement;
export declare class FxSemaphore extends FxSemaphore_base {
    static readonly defaultStates: ReadonlyArray<FxSemaphoreStateData>;
    value: string;
    label: string;
    hasShell: boolean;
    size: 'small' | 'medium' | 'large' | 'x-large';
    orientation: 'horizontal' | 'vertical';
    private slottedStates;
    private readonly slottedIcons;
    private managingIcons;
    private iconPresenceKey;
    protected get effectiveStates(): FxSemaphoreStateData[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    private onStateUpdate;
    private getAssignedStateElements;
    private statesEqual;
    protected collectSlottedStates(): void;
    private manageIcons;
    firstUpdated(): void;
    updated(changed: Map<string | number | symbol, unknown>): void;
    private onStatesSlotChange;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
export {};
