import { LitElement } from 'lit';
type Constructor<T = LitElement> = new (...args: any[]) => T;
export declare class AnimatableInterface {
    isAnimated: boolean;
}
export declare const Animatable: <T extends Constructor>(Base: T) => Constructor<AnimatableInterface> & T;
export declare function isAnimatable(el: unknown): el is AnimatableInterface;
export {};
