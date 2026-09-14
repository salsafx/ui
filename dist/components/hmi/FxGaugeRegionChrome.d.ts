import { nothing } from 'lit';
import type { ResolvedGaugeRegion } from './FxGaugeRegion';
export declare const gaugeRegionUiStyles: import("lit").CSSResult;
export type GaugeRegionTooltipState = {
    text: string;
    x: number;
    y: number;
};
export declare function formatGaugeRegionTooltip(region: ResolvedGaugeRegion): string;
export declare function renderGaugeRegionTooltip(tooltip: GaugeRegionTooltipState | null): typeof nothing | import("lit").TemplateResult<1>;
export declare function gaugeRegionTooltipFromEvent(host: HTMLElement, event: PointerEvent, region: ResolvedGaugeRegion): GaugeRegionTooltipState | null;
