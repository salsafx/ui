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
import { type ToCamelCase } from './El';
declare const salsaFxElements: readonly ['fx-alert', 'fx-badge', 'fx-card', 'fx-display', 'fx-display-region', 'fx-fader', 'fx-gauge-needle', 'fx-gauge-needle-triangle', 'fx-gauge-region', 'fx-group-box', 'fx-icon', 'fx-knob', 'fx-led-indicator', 'fx-linear-bar', 'fx-linear-gauge', 'fx-linear-scale', 'fx-metalic-knob', 'fx-pill', 'fx-potentiometer', 'fx-push-button', 'fx-radial-gauge', 'fx-radial-scale', 'fx-radial-simple-scale', 'fx-radial-switch', 'fx-rotary-selector', 'fx-rotary-selector-sector', 'fx-semaphore', 'fx-semaphore-state', 'fx-separator', 'fx-stack-panel', 'fx-switch', 'fx-switch-state', 'fx-tab', 'fx-tabs', 'fx-toaster', 'fx-value-display'];
type SalsaFXElementTags = ToCamelCase<typeof salsaFxElements[number]>;
export declare const El: {
    create(tagName: string, props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>): HTMLElement | DocumentFragment;
    custom(tagName: string, props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>): HTMLElement;
    text(text: string): Text;
    fragment(children?: import("./El").FragmentProps | import("./El").Child | Iterable<import("./El").Child>): DocumentFragment;
    classNames(...classes: Array<string | false | null | undefined | Iterable<string | false | null | undefined>>): string;
    ofString(html: string): HTMLElement;
    toString(element: HTMLElement): string;
    find(selector: string): Element | null;
    children(element: HTMLElement, children: import("./El").Child | Iterable<import("./El").Child>): HTMLElement;
    Collection: {
        ofString(html: string): HTMLCollection;
        find(selector: string): NodeListOf<Element>;
    };
    Array: {
        find(selector: string): Element[];
    };
    readonly customElements: CustomElementRegistry;
    define(tagName: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void;
    add<T extends string>(...tagNames: T[]): import("./El").ElApi & { [K in ToCamelCase<T>]: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement; };
} & {
    a: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLAnchorElement;
    abbr: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    acronym: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    address: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    area: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLAreaElement;
    article: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    aside: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    audio: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLAudioElement;
    b: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    base: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLBaseElement;
    basefont: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    bdi: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    bdo: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    big: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    blockquote: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLQuoteElement;
    body: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLBodyElement;
    br: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLBRElement;
    button: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLButtonElement;
    canvas: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLCanvasElement;
    caption: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableCaptionElement;
    center: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    cite: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    code: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    col: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableColElement;
    colgroup: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableColElement;
    data: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLDataElement;
    datalist: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLDataListElement;
    dd: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    del: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLModElement;
    details: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLDetailsElement;
    dfn: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    dialog: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLDialogElement;
    div: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLDivElement;
    dl: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLDListElement;
    dt: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    em: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    embed: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLEmbedElement;
    fieldset: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLFieldSetElement;
    figcaption: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    figure: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    footer: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    form: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLFormElement;
    h1: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLHeadingElement;
    h2: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLHeadingElement;
    h3: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLHeadingElement;
    h4: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLHeadingElement;
    h5: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLHeadingElement;
    h6: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLHeadingElement;
    head: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLHeadElement;
    header: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    hr: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLHRElement;
    html: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLHtmlElement;
    i: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    iframe: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLIFrameElement;
    img: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLImageElement;
    input: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLInputElement;
    ins: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLModElement;
    kbd: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    label: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLLabelElement;
    legend: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLLegendElement;
    li: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLLIElement;
    link: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLLinkElement;
    main: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    map: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLMapElement;
    mark: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    meta: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLMetaElement;
    meter: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLMeterElement;
    nav: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    noscript: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    object: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLObjectElement;
    ol: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLOListElement;
    optgroup: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLOptGroupElement;
    option: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLOptionElement;
    output: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLOutputElement;
    p: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLParagraphElement;
    param: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    picture: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLPictureElement;
    pre: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLPreElement;
    progress: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLProgressElement;
    q: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLQuoteElement;
    rp: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    rt: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    ruby: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    s: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    samp: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    script: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLScriptElement;
    section: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    select: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLSelectElement;
    small: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    source: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLSourceElement;
    span: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLSpanElement;
    strong: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    style: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLStyleElement;
    sub: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    summary: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    sup: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    svg: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    table: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableElement;
    tbody: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableSectionElement;
    td: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableCellElement;
    template: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTemplateElement;
    textarea: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTextAreaElement;
    tfoot: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableSectionElement;
    th: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableCellElement;
    thead: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableSectionElement;
    time: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTimeElement;
    title: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTitleElement;
    tr: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTableRowElement;
    track: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLTrackElement;
    u: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    ul: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLUListElement;
    var: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    video: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLVideoElement;
    wbr: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
} & {
    fxAlert: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxBadge: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxCard: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxDisplay: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxDisplayRegion: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxFader: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxGaugeNeedle: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxGaugeNeedleTriangle: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxGaugeRegion: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxGroupBox: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxIcon: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxKnob: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxLedIndicator: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxLinearBar: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxLinearGauge: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxLinearScale: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxMetalicKnob: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxPill: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxPotentiometer: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxPushButton: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxRadialGauge: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxRadialScale: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxRadialSimpleScale: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxRadialSwitch: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxRotarySelector: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxRotarySelectorSector: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxSemaphore: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxSemaphoreState: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxSeparator: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxStackPanel: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxSwitch: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxSwitchState: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxTab: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxTabs: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxToaster: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
    fxValueDisplay: (props?: import("./El").ElProps | Iterable<import("./El").Child> | import("./El").Child | undefined, children?: import("./El").Child | Iterable<import("./El").Child>) => HTMLElement;
};
export type { SalsaFXElementTags };
