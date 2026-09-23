/**
 * El.ts
 *
 * Copyright 2023 - 2026, Frank Hliva
 * All rights reserved.
 *
 * License: BSD Clause 3 license
 */
type HtmlTag = 'a' | 'abbr' | 'acronym' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'basefont' | 'bdi' | 'bdo' | 'big' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption' | 'center' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist' | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kbd' | 'label' | 'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option' | 'output' | 'p' | 'param' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'small' | 'source' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'svg' | 'table' | 'tbody' | 'td' | 'template' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr';
export declare enum ElementProps {
    Content = "content",
    Children = "children",
    Text = "text",
    TextContent = "textContent",
    ClassName = "className",
    Classes = "classes",
    Html = "html",
    InnerHTML = "innerHTML",
    Style = "style"
}
export type ToCamelCase<S extends string> = S extends `${infer Head}-${infer Tail}` ? `${Head}${Capitalize<ToCamelCase<Tail>>}` : S;
export type Child = Node | string;
export type ElProps = {
    id?: string;
    children?: Child | Iterable<Child>;
    content?: Child | Iterable<Child>;
    text?: string;
    textContent?: string;
    classes?: Iterable<string | false | null | undefined> | string;
    className?: Iterable<string | false | null | undefined> | string;
    class?: string;
    html?: string;
    innerHTML?: string;
    style?: Partial<CSSStyleDeclaration> | string;
    [key: string]: unknown;
};
export type FragmentProps = {
    content?: Child | Iterable<Child>;
    children?: Child | Iterable<Child>;
};
type CreateInput = ElProps | Child | Iterable<Child> | undefined;
type ElFactory = (props?: CreateInput, children?: Child | Iterable<Child>) => HTMLElement;
type TagFactory<K extends string> = K extends keyof HTMLElementTagNameMap ? (props?: CreateInput, children?: Child | Iterable<Child>) => HTMLElementTagNameMap[K] : ElFactory;
type ElBase = {
    create(tagName: string, props?: CreateInput, children?: Child | Iterable<Child>): HTMLElement | DocumentFragment;
    custom(tagName: string, props?: CreateInput, children?: Child | Iterable<Child>): HTMLElement;
    text(text: string): Text;
    fragment(children?: FragmentProps | Child | Iterable<Child>): DocumentFragment;
    classNames(...classes: Array<string | false | null | undefined | Iterable<string | false | null | undefined>>): string;
    ofString(html: string): HTMLElement;
    toString(element: HTMLElement): string;
    find(selector: string): Element | null;
    children(element: HTMLElement, children: Child | Iterable<Child>): HTMLElement;
    Collection: {
        ofString(html: string): HTMLCollection;
        find(selector: string): NodeListOf<Element>;
    };
    Array: {
        find(selector: string): Element[];
    };
    readonly customElements: CustomElementRegistry;
    define(tagName: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void;
    add<T extends string>(...tagNames: T[]): ElApi & {
        [K in ToCamelCase<T>]: ElFactory;
    };
};
export type ElApi = ElBase & {
    [K in HtmlTag]: TagFactory<K>;
};
export declare const El: ElApi;
export declare class Lazy<T> {
    #private;
    private readonly func;
    constructor(func: () => T);
    get value(): T;
    force(): T;
}
export {};
