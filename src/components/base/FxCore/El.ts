/**
 * El.ts
 *
 * Copyright 2023 - 2026, Frank Hliva
 * All rights reserved.
 *
 * License: BSD Clause 3 license
 */

type HtmlTag =
| 'a' | 'abbr' | 'acronym' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base'
| 'basefont' | 'bdi' | 'bdo' | 'big' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption'
| 'center' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist' | 'dd' | 'del' | 'details'
| 'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure'
| 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hr' | 'html'
| 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kbd' | 'label' | 'legend' | 'li' | 'link' | 'main'
| 'map' | 'mark' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option'
| 'output' | 'p' | 'param' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's'
| 'samp' | 'script' | 'section' | 'select' | 'small' | 'source' | 'span' | 'strong' | 'style'
| 'sub' | 'summary' | 'sup' | 'svg' | 'table' | 'tbody' | 'td' | 'template' | 'textarea' | 'tfoot'
| 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr';

export enum ElementProps {
    Content = 'content',
    Children = 'children',
    Text = 'text',
    TextContent = 'textContent',
    ClassName = 'className',
    Classes = 'classes',
    Html = 'html',
    InnerHTML = 'innerHTML',
    Style = 'style',
}

export type ToCamelCase<S extends string> = S extends `${infer Head}-${infer Tail}`
    ? `${Head}${Capitalize<ToCamelCase<Tail>>}`
    : S;

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
type TagFactory<K extends string> = K extends keyof HTMLElementTagNameMap
    ? (props?: CreateInput, children?: Child | Iterable<Child>) => HTMLElementTagNameMap[K]
    : ElFactory;

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
    add<T extends string>(...tagNames: T[]): ElApi & { [K in ToCamelCase<T>]: ElFactory };
};

export type ElApi = ElBase & { [K in HtmlTag]: TagFactory<K> };

function isIterableCollection(value: unknown): value is Iterable<unknown>
{
    return typeof value === 'undefined' ||
        typeof value === 'string' ||
        value === null ||
        value instanceof HTMLElement
            ? false
            : typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function';
}

export const El = (function ()
{
    function classNames(classes?: unknown): string
    {
        if (arguments.length === 1)
        {
            return typeof classes === 'string'
                ? classes
                : (function ()
                {
                    return isIterableCollection(classes)
                        ? Array.from(classes)
                            .filter(function (className)
                            {
                                return typeof className === 'string' && className !== '';
                            })
                            .join(' ')
                        : '';
                })();
        }
        else
        {
            return classNames(Array.prototype.slice.call(arguments));
        }
    }

    const contentProps = [
        ElementProps.Content,
        ElementProps.Children
    ];

    const FRAGMENT = 'fragment';

    function create(tagName: string, props?: any, children?: any)
    {
        const element: any = tagName === FRAGMENT
            ? document.createDocumentFragment()
            : document.createElement(tagName);
        switch (typeof props)
        {
            case 'object':
            {
                if (isIterableCollection(props))
                {
                    props = { content: props };
                }
                else if (hasValue(children))
                {
                    const content = children;
                    switch (typeof content)
                    {
                        case 'string':
                        {
                            Object.assign(props, { textContent: content });
                            break;
                        }
                        default:
                        {
                            Object.assign(props, { content: content });
                        }
                    }
                }
                Object.keys(props).forEach(function (propName)
                {
                    if (tagName !== FRAGMENT || contentProps.includes(propName as ElementProps))
                    {
                        switch (propName)
                        {
                            case ElementProps.Content:
                            case ElementProps.Children:
                            {
                                const content = props[propName];
                                if (isIterableCollection(content))
                                {
                                    let cursor;
                                    const iterator = content[Symbol.iterator]();
                                    while (((cursor = iterator.next()), !cursor.done))
                                    {
                                        if (hasValue(cursor.value))
                                        {
                                            element.append(cursor.value);
                                        }
                                    }
                                }
                                else if (hasValue(content))
                                {
                                    element.append(content);
                                }
                                break;
                            }
                            case ElementProps.Text:
                            case ElementProps.TextContent:
                            {
                                element.textContent = props[propName];
                                break;
                            }
                            case ElementProps.Html:
                            case ElementProps.InnerHTML:
                            {
                                element.innerHTML = props[propName];
                                break;
                            }
                            case ElementProps.Classes:
                            case ElementProps.ClassName:
                            {
                                element.setAttribute('class', classNames(props[propName]));
                                break;
                            }
                            case ElementProps.Style:
                            {
                                const style = props[propName];
                                switch (typeof style)
                                {
                                    case 'string':
                                    {
                                        element.setAttribute('style', style);
                                        break;
                                    }
                                    case 'object':
                                    {
                                        Object.assign(element.style, style);
                                        break;
                                    }
                                    default:
                                    {
                                        console.error('Invalid style', style);
                                        throw new Error('Invalid style');
                                    }
                                }
                                break;
                            }
                            default:
                            {
                                if (
                                    propName.indexOf('on') === 0 &&
                                    typeof props[propName] === 'function'
                                )
                                {
                                    element[propName] = props[propName];
                                }
                                else
                                {
                                    element.setAttribute(propName, props[propName]);
                                }
                            }
                        }
                    }
                });
                break;
            }
            default:
            {
                element[ElementProps.TextContent] = props;
            }
        }
        return element;
    }

    const allHtmlElements =
        'a,abbr,abbr,acronym,address,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strong,style,sub,summary,sup,svg,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr'.split(
            ','
        );

    function addHtmlElementFactories(documentElement: any)
    {
        return allHtmlElements.reduce(
            function (acc, tagName)
            {
                acc[tagName] = function (props?: any, children?: any)
                {
                    return create(tagName, props, children);
                };
                return acc;
            },
            documentElement
        );
    }

    function wrapHtml(htmlText: string)
    {
        return create('div', { html: htmlText });
    }

    const Collection = {
        ofString: function (htmlText: string)
        {
            return wrapHtml(htmlText).children;
        },
        find: function (selector: string)
        {
            return document.querySelectorAll(selector);
        }
    };

    function toCamelCase(str: string)
    {
        return str.replace(/-([a-z])/g, function (_match, letter)
        {
            return letter.toUpperCase();
        });
    }

    const DocumentElement: any = {
        create: create,
        custom: create,
        text: function (text: string)
        {
            return document.createTextNode(text);
        },
        fragment: function (children?: any)
        {
            return create('fragment', children);
        },
        classNames: classNames,
        ofString: function (htmlText: string)
        {
            return wrapHtml(htmlText).firstElementChild;
        },
        toString: function (element: HTMLElement)
        {
            return element.outerHTML;
        },
        find: function (selector: string)
        {
            return document.querySelector(selector);
        },
        children: function (element: HTMLElement, children?: any)
        {
            return Object.assign(element, {
                innerHTML: El.div(children).innerHTML
            });
        },
        Collection: Collection,
        Array: {
            find: function (selector: string)
            {
                return Array.from(Collection.find(selector));
            }
        },
        define: function (tagName: string, constructor: CustomElementConstructor, props?: ElementDefinitionOptions)
        {
            customElements.define(tagName, constructor, props);
        },
        add: function ()
        {
            Array.from(arguments).forEach(function (tagName: string)
            {
                DocumentElement[toCamelCase(tagName)] = function (props?: any, children?: any)
                {
                    return create(tagName, props, children);
                };
            });
            return DocumentElement;
        }
    };

    Object.defineProperties(DocumentElement, {
        customElements: {
            value: window.customElements,
            writable: false
        }
    });

    return addHtmlElementFactories(DocumentElement);
})() as ElApi;

function hasValue(value: unknown): boolean
{
    return typeof value !== 'undefined' && value !== null && value !== false;
}

export class Lazy<T>
{
    #value?: T;
    #resolved = false;

    constructor(private readonly func: () => T)
    {
    }

    get value(): T
    {
        return this.force();
    }

    force(): T
    {
        if (!this.#resolved)
        {
            this.#value = this.func();
            this.#resolved = true;
        }
        return this.#value as T;
    }
}