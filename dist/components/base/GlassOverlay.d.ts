import { LitElement } from 'lit';
type Constructor<T = LitElement> = new (...args: any[]) => T;
export declare class GlassOverlayInterface {
    hasShell: boolean;
}
export declare const GlassOverlay: <T extends Constructor>(Base: T) => Constructor<GlassOverlayInterface> & T;
export {};
