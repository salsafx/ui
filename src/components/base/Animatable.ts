import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = LitElement> = new (...args: any[]) => T;

export declare class AnimatableInterface {
    isAnimated: boolean;
}

export const Animatable = <T extends Constructor>(Base: T) => {
    class AnimatableClass extends Base {
        @property({ type: Boolean, attribute: 'is-animated', reflect: true })
        isAnimated = true;
    }
    return AnimatableClass as Constructor<AnimatableInterface> & T;
};

export function isAnimatable(el: unknown): el is AnimatableInterface {
    return !!el && typeof (el as { isAnimated?: unknown }).isAnimated === 'boolean';
}
