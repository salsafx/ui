import type { PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { FxMeasureElement } from './FxMeasureElement';

export class FxGaugeNeedleElement extends FxMeasureElement {
    @property({ type: Number, attribute: 'start-angle' }) startAngle = -135;
    @property({ type: Number, attribute: 'arc-length' }) arcLength = 270;

    @state() protected displayAngle = this.startAngle;
    private hasDisplayAngle = false;

    protected willUpdate(changedProperties: PropertyValues) {
        super.willUpdate(changedProperties);

        const targetAngle = this.startAngle + this.progress * this.arcLength;

        if (!this.hasDisplayAngle) {
            this.displayAngle = targetAngle;
            this.hasDisplayAngle = true;
            return;
        }

        const diff = (((targetAngle - this.displayAngle + 180) % 360) + 360) % 360 - 180;
        this.displayAngle += diff;
    }
}
