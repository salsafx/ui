import type { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FxElement } from '../base/FxElement';
import { resolveSwatchColor } from '../base/FxCore';

export type ResolvedGaugeRegion = {
    from: number;
    to: number;
    color: string;
    label: string;
};

@customElement('fx-gauge-region')
export class FxGaugeRegion extends FxElement {
    @property({ type: Number, reflect: true }) from = 0;
    @property({ type: Number, reflect: true }) to = 0;
    @property({ reflect: true }) color = '';
    @property({ reflect: true }) label = '';

    connectedCallback() {
        super.connectedCallback();
        this.style.display = 'none';
    }

    resolveColor(index: number): string {
        return resolveSwatchColor(this.color, index);
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (
            changed.has('from') ||
            changed.has('to') ||
            changed.has('color') ||
            changed.has('label')
        ) {
            this.dispatchEvent(new CustomEvent('regionupdate', { bubbles: true, composed: true }));
        }
    }
}

export function collectGaugeRegions(host: HTMLElement): ResolvedGaugeRegion[] {
    return Array.from(host.querySelectorAll(':scope > fx-gauge-region')).map((el, index) => {
        const region = el as FxGaugeRegion;
        const from = Number(region.from);
        const to = Number(region.to);
        return {
            from: Number.isFinite(from) ? from : 0,
            to: Number.isFinite(to) ? to : 0,
            color: region.resolveColor(index),
            label: region.label ?? '',
        };
    });
}
