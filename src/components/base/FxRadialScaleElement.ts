import { css } from 'lit';
import { property } from 'lit/decorators.js';
import { FxScaleElement } from './FxScaleElement';

export class FxRadialScaleElement extends FxScaleElement {
    @property({ type: Number, attribute: 'start-angle' }) startAngle = -135;
    @property({ type: Number, attribute: 'arc-length' }) arcLength = 270;

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    `;

    protected get isFullCircle(): boolean {
        return Math.abs(this.arcLength) >= 360;
    }
}
