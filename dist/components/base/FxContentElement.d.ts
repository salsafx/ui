import { FxContainerElement } from './FxContainerElement';
export type ContentAlignX = 'left' | 'center' | 'right' | 'stretch';
export type ContentAlignY = 'top' | 'center' | 'bottom' | 'stretch';
export type ContentFlexDirection = 'row' | 'column';
export declare class FxContentElement extends FxContainerElement {
    alignX: ContentAlignX | '';
    alignY: ContentAlignY | '';
    padding: string;
    get effectiveAlignX(): ContentAlignX;
    get effectiveAlignY(): ContentAlignY;
    get effectivePadding(): string;
    protected mapAlignX(value: string): string;
    protected mapAlignY(value: string): string;
    protected contentFlexAlign(direction: ContentFlexDirection): {
        alignItems: string;
        justifyContent: string;
    };
}
