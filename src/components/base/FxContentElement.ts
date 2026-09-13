import { property } from 'lit/decorators.js';
import { FxContainerElement } from './FxContainerElement';

export type ContentAlignX = 'left' | 'center' | 'right' | 'stretch';
export type ContentAlignY = 'top' | 'center' | 'bottom' | 'stretch';
export type ContentFlexDirection = 'row' | 'column';

export class FxContentElement extends FxContainerElement {
    @property({ type: String, attribute: 'align-x', reflect: true })
    alignX: ContentAlignX | '' = 'center';

    @property({ type: String, attribute: 'align-y', reflect: true })
    alignY: ContentAlignY | '' = 'center';

    @property({ type: String }) padding = '';

    get effectiveAlignX(): ContentAlignX {
        switch (this.alignX) {
            case 'left':
            case 'right':
            case 'stretch':
            case 'center':
                return this.alignX;
            default:
                return 'center';
        }
    }

    get effectiveAlignY(): ContentAlignY {
        switch (this.alignY) {
            case 'top':
            case 'bottom':
            case 'stretch':
            case 'center':
                return this.alignY;
            default:
                return 'center';
        }
    }

    get effectivePadding(): string {
        return this.padding;
    }

    protected mapAlignX(value: string): string {
        switch (value) {
            case 'left':
                return 'flex-start';
            case 'right':
                return 'flex-end';
            case 'stretch':
                return 'stretch';
            default:
                return 'center';
        }
    }

    protected mapAlignY(value: string): string {
        switch (value) {
            case 'top':
                return 'flex-start';
            case 'bottom':
                return 'flex-end';
            case 'stretch':
                return 'stretch';
            default:
                return 'center';
        }
    }

    protected contentFlexAlign(direction: ContentFlexDirection): {
        alignItems: string;
        justifyContent: string;
    } {
        switch (direction) {
            case 'column':
                return {
                    alignItems: this.mapAlignX(this.effectiveAlignX),
                    justifyContent: this.mapAlignY(this.effectiveAlignY),
                };
            default:
                return {
                    alignItems: this.mapAlignY(this.effectiveAlignY),
                    justifyContent: this.mapAlignX(this.effectiveAlignX),
                };
        }
    }
}
