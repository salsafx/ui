import { FxLinearTrackElement, type FxLinearTrackCompactLayout } from '../base/FxLinearTrackElement';
export declare class FxFader extends FxLinearTrackElement {
    snapToTicks: boolean;
    fitTicks: boolean;
    protected get isInteractiveTrack(): boolean;
    protected get thumbSizePx(): number;
    protected get travelPadPx(): number;
    protected get scaleInnerPadPx(): number;
    static styles: import("lit").CSSResultGroup[];
    protected renderThumb(compact: FxLinearTrackCompactLayout | null, progress: number): import("lit").TemplateResult<1>;
    updated(changed: Map<string | number | symbol, unknown>): void;
    private getEventDetail;
    private dispatchInputEvent;
    private dispatchChangeEvent;
    protected handleTrackMouseDown: (e: MouseEvent) => void;
    protected handleTrackTouchStart: (e: TouchEvent) => void;
    private startDrag;
    private handleMouseMove;
    private handleTouchMove;
    private handleMouseUp;
    private handleTouchEnd;
    private endDrag;
    private updateValueFromPointer;
}
