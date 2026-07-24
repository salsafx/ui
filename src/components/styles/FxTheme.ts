import { css } from 'lit';

export const themeVariables = css`
    :host {
        --fx-gauge-size: 280px;
        --fx-gauge-stroke-width: 12px;

        --fx-gauge-track-color: #1f2937;

        --fx-gauge-fill-color: url(#fx-gauge-default-gradient);
        --fx-gauge-gradient-start: #06b6d4;
        --fx-gauge-gradient-middle: #3b82f6;
        --fx-gauge-gradient-end: #8b5cf6;

        --fx-gauge-needle-color: url(#fx-needle-default-gradient);
        --fx-gauge-needle-gradient-start: #f97316;
        --fx-gauge-needle-gradient-end: #ef4444;

        --fx-gauge-text-primary: #cbd5e1;
        --fx-gauge-text-secondary: #94a3b8;
        --fx-gauge-value-font-weight: 400;
        --fx-gauge-unit-font-weight: 400;
        --fx-gauge-label-font-weight: 400;

        --fx-font-family: 'Inter', system-ui, -apple-system, sans-serif;

        --fx-linear-gauge-width: 140px;
        --fx-linear-gauge-track-color: #1f2937;
        --fx-linear-gauge-gradient-start: #3b82f6;
        --fx-linear-gauge-gradient-middle: #f59e0b;
        --fx-linear-gauge-gradient-end: #ef4444;

        --fx-fader-track-color: #334155;
        --fx-potentiometer-track-color: #1f2937;
    }
`;
