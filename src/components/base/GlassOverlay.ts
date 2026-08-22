import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = LitElement> = new (...args: any[]) => T;

export declare class GlassOverlayInterface {
    hasShell: boolean;
}

export const GlassOverlay = <T extends Constructor>(Base: T) => {
    class GlassOverlayClass extends Base {
        @property({ type: Boolean, attribute: 'has-shell', reflect: true })
        hasShell = false;
    }
    return GlassOverlayClass as Constructor<GlassOverlayInterface> & T;
};
