import { nothing } from 'lit';
import { FxLinearTrackElement } from '../base/FxLinearTrackElement';
export declare class FxLinearBar extends FxLinearTrackElement {
    hasValueDisplay: boolean;
    isSegmented: boolean;
    isRounded: boolean;
    trackThickness: string | number;
    protected get segmentCount(): number;
    static styles: import("lit").CSSResultGroup[];
    connectedCallback(): void;
    updated(changed: Map<string | number | symbol, unknown>): void;
    private applyTrackThickness;
    protected renderTrackDecorations(_progress: number): typeof nothing | import("lit").TemplateResult<1>;
}
