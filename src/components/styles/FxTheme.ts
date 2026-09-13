import { css } from 'lit';

export const themeVariables = css`
    :host {
        --fx-gauge-size: 280px;
        --fx-gauge-stroke-width: 12px;

        --fx-gauge-track-color: #0f172a;

        --fx-gauge-fill-color: url(#fx-gauge-default-gradient);
        --fx-gauge-gradient-start: var(--fx-theme-gradient-start, #06b6d4);
        --fx-gauge-gradient-middle: var(--fx-theme-gradient-middle, #6366f1);
        --fx-gauge-gradient-end: var(--fx-theme-gradient-end, #a855f7);

        --fx-gauge-needle-color: url(#fx-needle-default-gradient);
        --fx-gauge-needle-gradient-start: #f97316;
        --fx-gauge-needle-gradient-end: #ef4444;

        --fx-gauge-text-primary: #cbd5e1;
        --fx-gauge-text-secondary: #94a3b8;
        --fx-gauge-value-font-weight: 400;
        --fx-gauge-unit-font-weight: 400;
        --fx-gauge-label-font-weight: 400;

        --fx-shell-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
        --fx-shell-background-dark: #080b10;
        --fx-shell-background-light: #1e293b;

        --fx-linear-gauge-width: 140px;
        --fx-linear-gauge-track-color: #0f172a;
        --fx-linear-gauge-gradient-start: var(--fx-theme-gradient-start, #06b6d4);
        --fx-linear-gauge-gradient-middle: var(--fx-theme-gradient-middle, #6366f1);
        --fx-linear-gauge-gradient-end: var(--fx-theme-gradient-end, #a855f7);

        --fx-bar-gradient-start: var(--fx-theme-gradient-start, #06b6d4);
        --fx-bar-gradient-middle: var(--fx-theme-gradient-middle, #6366f1);
        --fx-bar-gradient-end: var(--fx-theme-gradient-end, #a855f7);

        --fx-potentiometer-track-color: #1f2937;
        --fx-potentiometer-gradient-start: var(--fx-theme-gradient-start, #06b6d4);
        --fx-potentiometer-gradient-middle: var(--fx-theme-gradient-middle, #6366f1);
        --fx-potentiometer-gradient-end: var(--fx-theme-gradient-end, #a855f7);
    }
`;
