import { html, css, nothing } from 'lit';
import type { ResolvedGaugeRegion } from './FxGaugeRegion';

export const gaugeRegionUiStyles = css`
    .fx-region-tooltip {
        position: absolute;
        z-index: 30;
        pointer-events: none;
        padding: 5px 8px;
        border-radius: 4px;
        background: #0f172a;
        border: 1px solid #334155;
        color: #f1f5f9;
        font-size: 11px;
        font-family: var(--fx-font-family, sans-serif);
        white-space: nowrap;
        transform: translate(-50%, calc(-100% - 8px));
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }
`;

export type GaugeRegionTooltipState = {
    text: string;
    x: number;
    y: number;
};

export function formatGaugeRegionTooltip(region: ResolvedGaugeRegion): string {
    return region.label?.trim() ?? '';
}

export function renderGaugeRegionTooltip(tooltip: GaugeRegionTooltipState | null) {
    if (!tooltip?.text) return nothing;
    return html`
        <div
            class="fx-region-tooltip"
            part="region-tooltip"
            style="left: ${tooltip.x}px; top: ${tooltip.y}px;"
        >
            ${tooltip.text}
        </div>
    `;
}

export function gaugeRegionTooltipFromEvent(
    host: HTMLElement,
    event: PointerEvent,
    region: ResolvedGaugeRegion,
): GaugeRegionTooltipState | null {
    const text = formatGaugeRegionTooltip(region);
    if (!text) return null;
    const rect = host.getBoundingClientRect();
    return {
        text,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}
