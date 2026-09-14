import { type CSSResultGroup, type PropertyValues } from 'lit';
import { FxContentElement, type ContentAlignX, type ContentAlignY } from '../base/FxContentElement';
import './FxIcon';
export declare class FxTab extends FxContentElement {
    header: string;
    selectionColor: string;
    badge: string;
    icon: string;
    selected: boolean;
    alignX: ContentAlignX | '';
    alignY: ContentAlignY | '';
    private readonly slottedIcons;
    static styles: CSSResultGroup;
    private get tabsParent();
    get effectiveAlignX(): ContentAlignX;
    get effectiveAlignY(): ContentAlignY;
    get effectivePadding(): string;
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
}
