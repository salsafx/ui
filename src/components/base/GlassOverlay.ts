import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = LitElement> = new (...args: any[]) => T;

export declare class GlassOverlayInterface {
    hasGlassOverlay: boolean;
}

export const GlassOverlay = <T extends Constructor>(Base: T) => {
    class GlassOverlayClass extends Base {
        @property({ type: Boolean, attribute: 'has-glass-overlay', reflect: true })
        hasGlassOverlay = false;
    }
    return GlassOverlayClass as Constructor<GlassOverlayInterface> & T;
};
