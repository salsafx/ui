/**
 * El.ts - SalsaFX
 *
 * Extends El with SalsaFX Web Components support.
 * Provides type-safe factory methods for all fx-* custom elements.
 *
 * @example
 * import { El } from './El.SalsaFX';
 *
 * El.fxAlert({ variant: 'info' }, 'Message');
 * El.fxIcon({ icon: 'fa-solid fa-heart' });
 * El.fxCard({}, 'Content');
 *
 * Copyright 2025 - 2026, Frank Hliva
 * All rights reserved.
 *
 * License: BSD Clause 3 license
 */

import { El as BaseEl, type ToCamelCase } from './El';

const salsaFxElements = [
    'fx-alert',
    'fx-card',
    'fx-display',
    'fx-display-region',
    'fx-fader',
    'fx-gauge-needle',
    'fx-gauge-needle-triangle',
    'fx-gauge-region',
    'fx-group-box',
    'fx-icon',
    'fx-knob',
    'fx-led-indicator',
    'fx-linear-bar',
    'fx-linear-gauge',
    'fx-linear-scale',
    'fx-metalic-knob',
    'fx-potentiometer',
    'fx-push-button',
    'fx-radial-gauge',
    'fx-radial-scale',
    'fx-radial-simple-scale',
    'fx-radial-switch',
    'fx-rotary-selector',
    'fx-rotary-selector-sector',
    'fx-semaphore',
    'fx-semaphore-state',
    'fx-separator',
    'fx-stack-panel',
    'fx-switch',
    'fx-switch-state',
    'fx-tab',
    'fx-tabs',
    'fx-toaster',
    'fx-value-display',
] as const;

type SalsaFXElementTags = ToCamelCase<typeof salsaFxElements[number]>;

export const El = BaseEl.add(...salsaFxElements);
export type { SalsaFXElementTags };
