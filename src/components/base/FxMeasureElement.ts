import { property } from 'lit/decorators.js';
import { FxElement } from './FxElement';

export class FxMeasureElement extends FxElement {
    @property({ type: Number }) value = 0;
    @property({ type: Number }) min = 0;
    @property({ type: Number }) max = 100;
    @property({ type: String }) label = '';
    @property({ type: String }) unit = '';
    @property({ type: Boolean, attribute: 'show-value', reflect: true }) showValue = true;

    protected get progress(): number {
        const { min, max, value } = this;
        const range = max - min;

        if (range === 0) {
            return 0;
        } else {
            const clampedValue = Math.min(Math.max(value, min), max);
            return (clampedValue - min) / range;
        }
    }
}
