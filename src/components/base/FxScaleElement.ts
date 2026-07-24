import { property } from 'lit/decorators.js';
import { FxElement } from './FxElement';

export class FxScaleElement extends FxElement {
    @property({ type: Number }) min = 0;
    @property({ type: Number }) max = 100;
    @property({ type: Number }) count = 10;
    @property({ type: Boolean, attribute: 'show-labels' }) showLabels = true;
    @property({ type: Object }) replacements: Record<number, number> = {};
    @property({ type: String, attribute: 'value-origin', reflect: true })
    valueOrigin: 'start' | 'end' = 'end';

    protected resolveLabel(tickValue: number): number {
        const rounded = Math.round(tickValue);
        return rounded in this.replacements ? this.replacements[rounded] : rounded;
    }
}
