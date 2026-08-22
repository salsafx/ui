import{LitElement as e,css as t,html as n,nothing as r,svg as i}from"lit";import{customElement as a,property as o,state as s}from"lit/decorators.js";var c=`fx-card,fx-group-box,fx-display,fx-display-region,fx-fader,fx-linear-gauge,fx-linear-bar,fx-radial-gauge,fx-push-button,fx-led-indicator,fx-semaphore,fx-alert,fx-toaster,fx-icon,fx-tab,fx-tabs,fx-stack-panel,fx-separator,fx-potentiometer,fx-rotary-selector,fx-switch,fx-radial-switch,fx-knob,fx-gauge-needle,fx-gauge-needle-triangle,fx-gauge-region,fx-linear-scale,fx-value-display,fx-metalic-knob,fx-radial-simple-scale,fx-radial-scale,fx-rotary-selector-sector,fx-semaphore-state,fx-switch-state{box-sizing:border-box}`;function l(e){return e===void 0||typeof e==`string`||e===null||e instanceof HTMLElement?!1:typeof e[Symbol.iterator]==`function`}var u=(function(){function e(t){return arguments.length===1?typeof t==`string`?t:(function(){return l(t)?Array.from(t).filter(function(e){return typeof e==`string`&&e!==``}).join(` `):``})():e(Array.prototype.slice.call(arguments))}let t=[`content`,`children`],n=`fragment`;function r(r,i,a){let o=r===n?document.createDocumentFragment():document.createElement(r);switch(typeof i){case`object`:if(l(i))i={content:i};else if(d(a)){let e=a;switch(typeof e){case`string`:Object.assign(i,{textContent:e});break;default:Object.assign(i,{content:e})}}Object.keys(i).forEach(function(a){if(r!==n||t.includes(a))switch(a){case`content`:case`children`:{let e=i[a];if(l(e)){let t,n=e[Symbol.iterator]();for(;t=n.next(),!t.done;)d(t.value)&&o.append(t.value)}else d(e)&&o.append(e);break}case`text`:case`textContent`:o.textContent=i[a];break;case`html`:case`innerHTML`:o.innerHTML=i[a];break;case`classes`:case`className`:o.setAttribute(`class`,e(i[a]));break;case`style`:{let e=i[a];switch(typeof e){case`string`:o.setAttribute(`style`,e);break;case`object`:Object.assign(o.style,e);break;default:throw console.error(`Invalid style`,e),Error(`Invalid style`)}break}default:a.indexOf(`on`)===0&&typeof i[a]==`function`?o[a]=i[a]:o.setAttribute(a,i[a])}});break;default:o.textContent=i}return o}let i=`a,abbr,abbr,acronym,address,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strong,style,sub,summary,sup,svg,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr`.split(`,`);function a(e){return i.reduce(function(e,t){return e[t]=function(e,n){return r(t,e,n)},e},e)}function o(e){return r(`div`,{html:e})}let s={ofString:function(e){return o(e).children},find:function(e){return document.querySelectorAll(e)}};function c(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()})}let f={create:r,custom:r,text:function(e){return document.createTextNode(e)},fragment:function(e){return r(`fragment`,e)},classNames:e,ofString:function(e){return o(e).firstElementChild},toString:function(e){return e.outerHTML},find:function(e){return document.querySelector(e)},children:function(e,t){return Object.assign(e,{innerHTML:u.div(t).innerHTML})},Collection:s,Array:{find:function(e){return Array.from(s.find(e))}},define:function(e,t,n){customElements.define(e,t,n)},add:function(){return Array.from(arguments).forEach(function(e){f[c(e)]=function(t,n){return r(e,t,n)}}),f}};return Object.defineProperties(f,{customElements:{value:window.customElements,writable:!1}}),a(f)})();function d(e){return e!=null&&e!==!1}var f=class{constructor(e=[]){this.configuratorList=[],this.defaultConfig=Object.freeze({}),this.config={};for(let t of e)this.use(t)}get defaults(){return this.defaultConfig}get configuration(){return this.config}get configurators(){return this.configuratorList}use(e){if(!this.configuratorList.includes(e)){this.configuratorList.push(e);let t=e.defaultConfig();this.config={...this.config,...t},this.defaultConfig=Object.freeze({...this.defaultConfig,...t}),e.applyConfig(this.config)}}configure(e={}){for(let t of this.configurators){let n=t.createConfig(e,this.configuration);Object.keys(n).length>0&&(this.config={...this.config,...n}),t.applyConfig(this.config)}}apply(){for(let e of this.configurators)e.applyConfig(this.config)}},p=`fx-alert.fx-card.fx-display.fx-display-region.fx-fader.fx-gauge-needle.fx-gauge-needle-triangle.fx-gauge-region.fx-group-box.fx-icon.fx-knob.fx-led-indicator.fx-linear-bar.fx-linear-gauge.fx-linear-scale.fx-metalic-knob.fx-potentiometer.fx-push-button.fx-radial-gauge.fx-radial-scale.fx-radial-simple-scale.fx-radial-switch.fx-rotary-selector.fx-rotary-selector-sector.fx-semaphore.fx-semaphore-state.fx-separator.fx-stack-panel.fx-switch.fx-switch-state.fx-tab.fx-tabs.fx-toaster.fx-value-display`.split(`.`),m=u.add(...p);function h(e,t){return e===`horizontal`?t===`end`:t===`start`}function g(e,t,n,r=0){let i=h(e,t),a=r,o=n-r;return e===`horizontal`?{startOffset:i?o:a,endOffset:i?a:o}:{startOffset:i?a:o,endOffset:i?o:a}}function _(e,t,n){return(e.shadowRoot?.querySelector(`slot[name="${t}"]`))?.assignedElements()[0]?.valueOrigin??n}var v=`data-fx-managed-icon`;function ee(e){return`icon-${e}`}function te(e){return typeof CSS<`u`&&typeof CSS.escape==`function`?CSS.escape(e):e.replace(/["\\]/g,`\\$&`)}function ne(e,t){return t===void 0?`:scope > [${e}]`:`:scope > [${e}="${te(t)}"]`}function re(e,t){return e.querySelector(ne(v,t))}function ie(e,t,n,r=ee(t)){let i=n?.trim(),a=re(e,t);i?(a&&a.localName!==`fx-icon`&&(a.remove(),a=null),a?(a.slot!==r&&(a.slot=r),a.getAttribute(`icon`)!==i&&(a.setAttribute(`icon`,i),`icon`in a&&(a.icon=i))):e.appendChild(m.fxIcon({[v]:t,"aria-hidden":`true`,icon:i,slot:r}))):a?.remove()}function ae(e,t){e.querySelectorAll(ne(v)).forEach(e=>{let n=e.getAttribute(v);(!n||!t.has(n))&&e.remove()})}function oe(e,t){let n=new Set(t.map(e=>e.id));for(let n of t)ie(e,n.id,n.icon);ae(e,n)}function se(e,t){let n=ee(t.value),r=[...t.children].filter(e=>e instanceof HTMLElement&&e.slot===`icon`);if(r.length>0){re(e,t.value)?.remove();for(let t of r)(t.parentElement!==e||t.slot!==n)&&(t.slot=n,t.parentElement!==e&&e.appendChild(t))}else t.icon?.trim()?ie(e,t.value,t.icon):e.querySelector(`${ne(`slot`,n)}:not([data-fx-managed-icon])`)||re(e,t.value)?.remove()}function ce(e,t){let n=new Set;for(let r of t)r.value&&(n.add(r.value),se(e,r));ae(e,n)}function le(e,t){let{arrayStates:n,stateElements:r,fallbackStates:i}=t;n.length>0?oe(e,n):r.length>0?ce(e,r):oe(e,i)}function ue(e,t,n={}){let r=n.slot??`icon`,i=n.id??r;e.querySelector(`${ne(`slot`,r)}:not([data-fx-managed-icon])`)?re(e,i)?.remove():ie(e,i,t,r)}function de(e,t){return!!e.querySelector(ne(`slot`,ee(t)))}function fe(e,t){return!!e.querySelector(ne(`slot`,t))}function pe(e,t){return e===t||e.length===t.length&&e.every((e,n)=>{let r=t[n];return e.id===r.id&&e.label===r.label&&e.icon===r.icon&&e.foregroundColor===r.foregroundColor&&e.backgroundColor===r.backgroundColor&&!!e.disabled==!!r.disabled})}function me(e){if(typeof document<`u`){let t=e.id??`fx-font-${e.family.trim().toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``)}`;document.getElementById(t)||(e.href.includes(`{`)?document.head.appendChild(m.style({id:t,textContent:e.href})):document.head.appendChild(m.link({id:t,rel:`stylesheet`,href:e.href})))}}var he=`@font-face {
    font-family: 'Chakra Petch';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src: url('@fontsource/chakra-petch/files/chakra-petch-latin-300-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Chakra Petch';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url('@fontsource/chakra-petch/files/chakra-petch-latin-400-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Chakra Petch';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: url('@fontsource/chakra-petch/files/chakra-petch-latin-500-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Chakra Petch';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url('@fontsource/chakra-petch/files/chakra-petch-latin-600-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Chakra Petch';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url('@fontsource/chakra-petch/files/chakra-petch-latin-700-normal.woff2') format('woff2');
}
`,ge=`@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src: url('@fontsource/inter/files/inter-latin-300-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url('@fontsource/inter/files/inter-latin-400-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: url('@fontsource/inter/files/inter-latin-500-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url('@fontsource/inter/files/inter-latin-600-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url('@fontsource/inter/files/inter-latin-700-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 800;
    src: url('@fontsource/inter/files/inter-latin-800-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 900;
    src: url('@fontsource/inter/files/inter-latin-900-normal.woff2') format('woff2');
}
`,_e=`@font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src: url('@fontsource/manrope/files/manrope-latin-300-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url('@fontsource/manrope/files/manrope-latin-400-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: url('@fontsource/manrope/files/manrope-latin-500-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url('@fontsource/manrope/files/manrope-latin-600-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url('@fontsource/manrope/files/manrope-latin-700-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-display: swap;
    font-weight: 800;
    src: url('@fontsource/manrope/files/manrope-latin-800-normal.woff2') format('woff2');
}
`,ve=`@font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src: url('@fontsource/noto-sans/files/noto-sans-latin-300-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url('@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: url('@fontsource/noto-sans/files/noto-sans-latin-500-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url('@fontsource/noto-sans/files/noto-sans-latin-600-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url('@fontsource/noto-sans/files/noto-sans-latin-700-normal.woff2') format('woff2');
}
`,ye=`@font-face {
    font-family: 'Oxanium';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src: url('@fontsource/oxanium/files/oxanium-latin-300-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Oxanium';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url('@fontsource/oxanium/files/oxanium-latin-400-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Oxanium';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: url('@fontsource/oxanium/files/oxanium-latin-500-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Oxanium';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url('@fontsource/oxanium/files/oxanium-latin-600-normal.woff2') format('woff2');
}
@font-face {
    font-family: 'Oxanium';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url('@fontsource/oxanium/files/oxanium-latin-700-normal.woff2') format('woff2');
}
`,be=``+new URL(`./assets/chakra-petch-latin-300-normal-GlM59gnw.woff2`,import.meta.url).href,xe=``+new URL(`./assets/chakra-petch-latin-400-normal-SafcrIr2.woff2`,import.meta.url).href,Se=``+new URL(`./assets/chakra-petch-latin-500-normal-BR1ody1F.woff2`,import.meta.url).href,Ce=``+new URL(`./assets/chakra-petch-latin-600-normal-DVQm9bgb.woff2`,import.meta.url).href,we=``+new URL(`./assets/chakra-petch-latin-700-normal-CnDBPjkL.woff2`,import.meta.url).href,Te=``+new URL(`./assets/inter-latin-300-normal-BVlfKGgI.woff2`,import.meta.url).href,Ee=``+new URL(`./assets/inter-latin-400-normal-C38fXH4l.woff2`,import.meta.url).href,De=``+new URL(`./assets/inter-latin-500-normal-Cerq10X2.woff2`,import.meta.url).href,Oe=``+new URL(`./assets/inter-latin-600-normal-LgqL8muc.woff2`,import.meta.url).href,ke=``+new URL(`./assets/inter-latin-700-normal-Yt3aPRUw.woff2`,import.meta.url).href,Ae=``+new URL(`./assets/inter-latin-800-normal-BYj_oED-.woff2`,import.meta.url).href,je=``+new URL(`./assets/inter-latin-900-normal-D4nM5aha.woff2`,import.meta.url).href,Me=``+new URL(`./assets/manrope-latin-300-normal-BgxWhS7-.woff2`,import.meta.url).href,Ne=``+new URL(`./assets/manrope-latin-400-normal-PaqtzbVb.woff2`,import.meta.url).href,Pe=``+new URL(`./assets/manrope-latin-500-normal-BYYD-dBL.woff2`,import.meta.url).href,Fe=``+new URL(`./assets/manrope-latin-600-normal-4f0koTD-.woff2`,import.meta.url).href,Ie=``+new URL(`./assets/manrope-latin-700-normal-BZp_XxE4.woff2`,import.meta.url).href,Le=``+new URL(`./assets/manrope-latin-800-normal-BfWYOv1c.woff2`,import.meta.url).href,Re=``+new URL(`./assets/noto-sans-latin-300-normal-CDkhyKSz.woff2`,import.meta.url).href,ze=``+new URL(`./assets/noto-sans-latin-400-normal-BTkUljjl.woff2`,import.meta.url).href,Be=``+new URL(`./assets/noto-sans-latin-500-normal-DCA2Z9Cj.woff2`,import.meta.url).href,Ve=``+new URL(`./assets/noto-sans-latin-600-normal-Dkgu5AE5.woff2`,import.meta.url).href,He=``+new URL(`./assets/noto-sans-latin-700-normal-CrvTEWhy.woff2`,import.meta.url).href,Ue=``+new URL(`./assets/oxanium-latin-300-normal-CNxMgW97.woff2`,import.meta.url).href,We=``+new URL(`./assets/oxanium-latin-400-normal-DcSlRu53.woff2`,import.meta.url).href,Ge=``+new URL(`./assets/oxanium-latin-500-normal-tnlOn7Ka.woff2`,import.meta.url).href,Ke=``+new URL(`./assets/oxanium-latin-600-normal-DW9ldEDP.woff2`,import.meta.url).href,qe=``+new URL(`./assets/oxanium-latin-700-normal-l0hKEjh4.woff2`,import.meta.url).href;function Je(e,t){return Object.entries(t).reduce((e,[t,n])=>e.replaceAll(t,n),e)}var Ye={Manrope:Je(_e,{"@fontsource/manrope/files/manrope-latin-300-normal.woff2":Me,"@fontsource/manrope/files/manrope-latin-400-normal.woff2":Ne,"@fontsource/manrope/files/manrope-latin-500-normal.woff2":Pe,"@fontsource/manrope/files/manrope-latin-600-normal.woff2":Fe,"@fontsource/manrope/files/manrope-latin-700-normal.woff2":Ie,"@fontsource/manrope/files/manrope-latin-800-normal.woff2":Le}),Inter:Je(ge,{"@fontsource/inter/files/inter-latin-300-normal.woff2":Te,"@fontsource/inter/files/inter-latin-400-normal.woff2":Ee,"@fontsource/inter/files/inter-latin-500-normal.woff2":De,"@fontsource/inter/files/inter-latin-600-normal.woff2":Oe,"@fontsource/inter/files/inter-latin-700-normal.woff2":ke,"@fontsource/inter/files/inter-latin-800-normal.woff2":Ae,"@fontsource/inter/files/inter-latin-900-normal.woff2":je}),NotoSans:Je(ve,{"@fontsource/noto-sans/files/noto-sans-latin-300-normal.woff2":Re,"@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff2":ze,"@fontsource/noto-sans/files/noto-sans-latin-500-normal.woff2":Be,"@fontsource/noto-sans/files/noto-sans-latin-600-normal.woff2":Ve,"@fontsource/noto-sans/files/noto-sans-latin-700-normal.woff2":He}),Oxanium:Je(ye,{"@fontsource/oxanium/files/oxanium-latin-300-normal.woff2":Ue,"@fontsource/oxanium/files/oxanium-latin-400-normal.woff2":We,"@fontsource/oxanium/files/oxanium-latin-500-normal.woff2":Ge,"@fontsource/oxanium/files/oxanium-latin-600-normal.woff2":Ke,"@fontsource/oxanium/files/oxanium-latin-700-normal.woff2":qe}),ChakraPetch:Je(he,{"@fontsource/chakra-petch/files/chakra-petch-latin-300-normal.woff2":be,"@fontsource/chakra-petch/files/chakra-petch-latin-400-normal.woff2":xe,"@fontsource/chakra-petch/files/chakra-petch-latin-500-normal.woff2":Se,"@fontsource/chakra-petch/files/chakra-petch-latin-600-normal.woff2":Ce,"@fontsource/chakra-petch/files/chakra-petch-latin-700-normal.woff2":we})},Xe={DsDigital:{family:`DS-Digital`,href:`https://fonts.cdnfonts.com/css/ds-digital`},ChakraPetch:{family:`Chakra Petch`,href:Ye.ChakraPetch},Oxanium:{family:`Oxanium`,href:Ye.Oxanium},Manrope:{family:`Manrope`,href:Ye.Manrope},Inter:{family:`Inter`,href:Ye.Inter},NotoSans:{family:`Noto Sans`,href:Ye.NotoSans}},Ze={Classic:`uiFont`,Segmented:Xe.DsDigital,Modern:Xe.ChakraPetch},y=e=>e==null,Qe=(()=>{let e=()=>Math.floor((1+Math.random())*65536).toString(16).substring(1);return Object.freeze({newGuid:typeof crypto<`u`&&typeof crypto.randomUUID==`function`?crypto.randomUUID.bind(crypto):()=>`${e()}${e()}-${e()}-${e()}-${e()}-${e()}${e()}${e()}`.toLowerCase(),isGuid:e=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)})})();function $e(e,t){let n=10**t;return Math.round(e*n)/n}var et=(e,...t)=>t.reduce((e,t)=>t(e),e),tt=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``);function nt(e){let t=tt(e),n=5381;for(let t=0;t<e.length;t++)n=(n<<5)+n^e.charCodeAt(t);let r=(n>>>0).toString(36);return t.length>0?`${t.slice(0,48)}-${r}`:r}var rt=Xe.Manrope,it=Ze.Segmented,at=class{defaultConfig(){return{uiFont:rt,displayFont:it}}resolveFont(e,t){return typeof e==`string`?Xe[e]??t:e??t}resolveDisplayFont(e,t){return e===`uiFont`?t:this.resolveFont(e,it)}applyFontVar(e,t,n){me(t),typeof document<`u`&&document.documentElement.style.setProperty(e,`'${t.family}', ${n}`)}createConfig(e,t){let n={};return y(e.uiFont)||(n.uiFont=this.resolveFont(e.uiFont,rt)),y(e.displayFont)||(n.displayFont=this.resolveDisplayFont(e.displayFont,y(e.uiFont)?t.uiFont:this.resolveFont(e.uiFont,rt))),n}applyConfig(e){this.applyFontVar(`--fx-font-family`,e.uiFont,`system-ui, sans-serif`),this.applyFontVar(`--fx-display-font-family`,e.displayFont,`monospace`)}},ot=`/*!
 * Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2026 Fonticons, Inc.
 */
.fa,.fa-brands,.fa-classic,.fa-regular,.fa-solid,.fab,.far,.fas{--_fa-family:var(--fa-family,var(--fa-style-family,"Font Awesome 7 Free"));-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:var(--fa-display,inline-block);font-family:var(--_fa-family);font-feature-settings:normal;font-style:normal;font-synthesis:none;font-variant:normal;font-weight:var(--fa-style,900);line-height:1;text-align:center;text-rendering:auto;width:var(--fa-width,1.25em)}:is(.fas,.far,.fab,.fa-solid,.fa-regular,.fa-brands,.fa-classic,.fa):before{content:var(--fa)/""}@supports not (content:""/""){:is(.fas,.far,.fab,.fa-solid,.fa-regular,.fa-brands,.fa-classic,.fa):before{content:var(--fa)}}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-2xs{font-size:.625em;line-height:.1em;vertical-align:.225em}.fa-xs{font-size:.75em;line-height:.08333em;vertical-align:.125em}.fa-sm{font-size:.875em;line-height:.07143em;vertical-align:.05357em}.fa-lg{font-size:1.25em;line-height:.05em;vertical-align:-.075em}.fa-xl{font-size:1.5em;line-height:.04167em;vertical-align:-.125em}.fa-2xl{font-size:2em;line-height:.03125em;vertical-align:-.1875em}.fa-width-auto{--fa-width:auto}.fa-fw,.fa-width-fixed{--fa-width:1.25em}.fa-canvas-square{padding-block:.125em;margin-block-end:-.125em}.fa-canvas-roomy{padding-block:.25em;padding-inline:.125em;margin-block-end:-.25em;box-sizing:content-box}.fa-ul{list-style-type:none;margin-inline-start:var(--fa-li-margin,2.5em);padding-inline-start:0}.fa-ul>li{position:relative}.fa-li{inset-inline-start:calc(var(--fa-li-width, 2em)*-1);position:absolute;text-align:center;width:var(--fa-li-width,2em);line-height:inherit}.fa-border{border-radius:var(--fa-border-radius,.1em);border:var(--fa-border-width,.0625em) var(--fa-border-style,solid) var(--fa-border-color,#eee);box-sizing:var(--fa-border-box-sizing,content-box);padding:var(--fa-border-padding,.1875em .25em)}.fa-pull-left,.fa-pull-start{float:inline-start;margin-inline-end:var(--fa-pull-margin,.3em)}.fa-pull-end,.fa-pull-right{float:inline-end;margin-inline-start:var(--fa-pull-margin,.3em)}.fa-beat{animation-name:fa-beat;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-bounce{animation-name:fa-bounce;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,cubic-bezier(.28,.84,.42,1))}.fa-fade{animation-name:fa-fade;animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-beat-fade,.fa-fade{animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s)}.fa-beat-fade{animation-name:fa-beat-fade;animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-flip{animation-name:fa-flip;animation-duration:var(--fa-animation-duration,1.5s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-flip,.fa-flip-360{animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal)}.fa-flip-360{animation-name:fa-flip-360;animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-shake{animation-name:fa-shake;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,.75s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-spin{animation-name:fa-spin;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,2s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,linear)}.fa-spin-reverse{--fa-animation-direction:reverse}.fa-pulse,.fa-spin-pulse{animation-name:fa-spin;animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,1s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,steps(8))}.fa-spin-snap{animation-name:fa-spin-snap;animation-duration:var(--fa-animation-duration,3s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,linear)}.fa-spin-snap,.fa-spin-snap-4{animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal)}.fa-spin-snap-4{animation-name:fa-spin-snap-4;animation-duration:var(--fa-animation-duration,2.4s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,linear)}.fa-spin-snap-8{animation-name:fa-spin-snap-8;animation-duration:var(--fa-animation-duration,4s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,linear)}.fa-buzz,.fa-spin-snap-8{animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal)}.fa-buzz{animation-name:fa-buzz;animation-duration:var(--fa-animation-duration,.6s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,linear)}.fa-wag{animation-name:fa-wag;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,.9s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-out);transform-origin:bottom center}.fa-float{animation-name:fa-float;animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal);animation-duration:var(--fa-animation-duration,3s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-in-out);will-change:transform}.fa-swing{animation-name:fa-swing;animation-duration:var(--fa-animation-duration,1.2s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-out);transform-origin:top center}.fa-jello,.fa-swing{animation-delay:var(--fa-animation-delay,0s);animation-direction:var(--fa-animation-direction,normal)}.fa-jello{animation-name:fa-jello;animation-duration:var(--fa-animation-duration,.9s);animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-timing-function:var(--fa-animation-timing,ease-out)}@media (prefers-reduced-motion:reduce){.fa-beat,.fa-beat-fade,.fa-bounce,.fa-buzz,.fa-fade,.fa-flip,.fa-flip-360,.fa-float,.fa-jello,.fa-pulse,.fa-shake,.fa-spin,.fa-spin-pulse,.fa-spin-snap,.fa-spin-snap-4,.fa-spin-snap-8,.fa-swing,.fa-wag{animation:none!important;transition:none!important}}@keyframes fa-beat{0%{transform:scale(1)}25%{transform:scale(calc(var(--fa-beat-scale, 1.25)*1.25))}45%{transform:scale(calc(var(--fa-beat-scale, 1.22)*1.22))}65%{transform:scale(calc(var(--fa-beat-scale, 1.25)*1.25))}90%{transform:scale(1)}}@keyframes fa-bounce{0%{transform:scale(1) translateY(0);animation-timing-function:var(--fa-animation-timing)}14%{transform:scale(var(--fa-bounce-start-scale-x,1.06),var(--fa-bounce-start-scale-y,.94)) translateY(var(--fa-bounce-anticipation,3px));animation-timing-function:cubic-bezier(.33,0,.66,.33)}32%{transform:scale(var(--fa-bounce-jump-scale-x,.94),var(--fa-bounce-jump-scale-y,1.12)) translateY(calc(var(--fa-bounce-height, .5em)*-1));animation-timing-function:cubic-bezier(.33,.66,.66,1)}52%{transform:scale(1) translateY(calc(var(--fa-bounce-height, .5em)*-1*1.1));animation-timing-function:cubic-bezier(.5,0,1,.5)}70%{transform:scale(var(--fa-bounce-land-scale-x,1.06),var(--fa-bounce-land-scale-y,.92)) translateY(0);animation-timing-function:cubic-bezier(.33,.33,.66,1)}85%{transform:scale(.98,1.04) translateY(calc(-2px*var(--fa-bounce-rebound, 1)));animation-timing-function:cubic-bezier(.33,0,.66,1)}to{transform:scale(1) translateY(0)}}@keyframes fa-fade{0%{opacity:1;transform:scale(1);animation-timing-function:cubic-bezier(.2,0,.4,1)}40%{opacity:var(--fa-fade-opacity,.4);transform:scale(.98);animation-timing-function:cubic-bezier(.4,0,.6,1)}to{opacity:1;transform:scale(1)}}@keyframes fa-beat-fade{0%{opacity:var(--fa-beat-fade-opacity,.4);transform:scale(1);animation-timing-function:cubic-bezier(.2,0,.4,1)}25%{opacity:calc(var(--fa-beat-fade-opacity, .4) + .4);transform:scale(var(--fa-beat-fade-scale,1.28));animation-timing-function:cubic-bezier(.4,0,.6,1)}45%{opacity:1;transform:scale(var(--fa-beat-fade-scale,1.25));animation-timing-function:cubic-bezier(.4,0,.2,1)}65%{opacity:calc(var(--fa-beat-fade-opacity, .4) + .4);transform:scale(var(--fa-beat-fade-scale,1.28));animation-timing-function:cubic-bezier(.4,0,.6,1)}to{opacity:var(--fa-beat-fade-opacity,.4);transform:scale(1)}}@keyframes fa-flip{0%{transform:perspective(2em) scale(1) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),0deg);animation-timing-function:cubic-bezier(.2,0,.4,1)}8%{transform:perspective(2em) scale(var(--fa-flip-anticipation-scale,.95)) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),0deg);animation-timing-function:cubic-bezier(.33,0,.66,.33)}35%{transform:perspective(2em) scale(1) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),calc(var(--fa-flip-angle, -1turn)*0.6));animation-timing-function:linear}65%{transform:perspective(2em) scale(1) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),calc(var(--fa-flip-angle, -1turn)*0.5));animation-timing-function:cubic-bezier(.33,.66,.66,1)}92%{transform:perspective(2em) scale(1) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),calc(var(--fa-flip-angle, -1turn)*var(--fa-flip-overshoot, 1.04)));animation-timing-function:cubic-bezier(.33,0,.66,1)}to{transform:perspective(2em) scale(1) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-1turn))}}@keyframes fa-flip-360{0%{transform:perspective(2em) scale(1) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),0deg);animation-timing-function:cubic-bezier(.2,0,.4,1)}8%{transform:perspective(2em) scale(var(--fa-flip-anticipation-scale,.95)) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),0deg);animation-timing-function:cubic-bezier(.33,0,.66,.33)}50%{transform:perspective(2em) scale(1) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),calc(var(--fa-flip-angle, -1turn)*0.6));animation-timing-function:cubic-bezier(.33,.66,.66,1)}80%{transform:perspective(2em) scale(1) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),calc(var(--fa-flip-angle, -1turn)*var(--fa-flip-overshoot, 1.04)));animation-timing-function:cubic-bezier(.33,0,.66,1)}to{transform:perspective(2em) scale(1) rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-1turn))}}@keyframes fa-shake{0%{transform:rotate(0deg);animation-timing-function:cubic-bezier(.2,0,.8,1)}8%{transform:rotate(35deg) translateX(1px);animation-timing-function:cubic-bezier(.3,0,.7,1)}20%{transform:rotate(-22deg) translateX(-1px);animation-timing-function:cubic-bezier(.3,0,.7,1)}35%{transform:rotate(15deg) translateX(1px);animation-timing-function:cubic-bezier(.3,0,.7,1)}50%{transform:rotate(-9deg);animation-timing-function:cubic-bezier(.4,0,.6,1)}65%{transform:rotate(5deg);animation-timing-function:cubic-bezier(.4,0,.6,1)}78%{transform:rotate(-3deg);animation-timing-function:cubic-bezier(.4,0,.6,1)}90%{transform:rotate(1deg);animation-timing-function:cubic-bezier(.4,0,.2,1)}to{transform:rotate(0deg)}}@keyframes fa-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes fa-spin-snap{0%{transform:rotate(0deg);animation-timing-function:cubic-bezier(0,0,.2,1)}12%{transform:rotate(60deg);animation-timing-function:cubic-bezier(.8,0,1,1)}16.67%{transform:rotate(60deg);animation-timing-function:cubic-bezier(0,0,.2,1)}28.67%{transform:rotate(120deg);animation-timing-function:cubic-bezier(.8,0,1,1)}33.33%{transform:rotate(120deg);animation-timing-function:cubic-bezier(0,0,.2,1)}45.33%{transform:rotate(180deg);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:rotate(180deg);animation-timing-function:cubic-bezier(0,0,.2,1)}62%{transform:rotate(240deg);animation-timing-function:cubic-bezier(.8,0,1,1)}66.67%{transform:rotate(240deg);animation-timing-function:cubic-bezier(0,0,.2,1)}78.67%{transform:rotate(300deg);animation-timing-function:cubic-bezier(.8,0,1,1)}83.33%{transform:rotate(300deg);animation-timing-function:cubic-bezier(0,0,.2,1)}95.33%{transform:rotate(1turn);animation-timing-function:cubic-bezier(.8,0,1,1)}to{transform:rotate(1turn)}}@keyframes fa-spin-snap-4{0%{transform:rotate(0deg);animation-timing-function:cubic-bezier(0,0,.2,1)}15%{transform:rotate(90deg);animation-timing-function:cubic-bezier(.8,0,1,1)}25%{transform:rotate(90deg);animation-timing-function:cubic-bezier(0,0,.2,1)}40%{transform:rotate(180deg);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:rotate(180deg);animation-timing-function:cubic-bezier(0,0,.2,1)}65%{transform:rotate(270deg);animation-timing-function:cubic-bezier(.8,0,1,1)}75%{transform:rotate(270deg);animation-timing-function:cubic-bezier(0,0,.2,1)}90%{transform:rotate(1turn);animation-timing-function:cubic-bezier(.8,0,1,1)}to{transform:rotate(1turn)}}@keyframes fa-spin-snap-8{0%{transform:rotate(0deg);animation-timing-function:cubic-bezier(0,0,.2,1)}9%{transform:rotate(45deg);animation-timing-function:cubic-bezier(.8,0,1,1)}12.5%{transform:rotate(45deg);animation-timing-function:cubic-bezier(0,0,.2,1)}21.5%{transform:rotate(90deg);animation-timing-function:cubic-bezier(.8,0,1,1)}25%{transform:rotate(90deg);animation-timing-function:cubic-bezier(0,0,.2,1)}34%{transform:rotate(135deg);animation-timing-function:cubic-bezier(.8,0,1,1)}37.5%{transform:rotate(135deg);animation-timing-function:cubic-bezier(0,0,.2,1)}46.5%{transform:rotate(180deg);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:rotate(180deg);animation-timing-function:cubic-bezier(0,0,.2,1)}59%{transform:rotate(225deg);animation-timing-function:cubic-bezier(.8,0,1,1)}62.5%{transform:rotate(225deg);animation-timing-function:cubic-bezier(0,0,.2,1)}71.5%{transform:rotate(270deg);animation-timing-function:cubic-bezier(.8,0,1,1)}75%{transform:rotate(270deg);animation-timing-function:cubic-bezier(0,0,.2,1)}84%{transform:rotate(315deg);animation-timing-function:cubic-bezier(.8,0,1,1)}87.5%{transform:rotate(315deg);animation-timing-function:cubic-bezier(0,0,.2,1)}96.5%{transform:rotate(1turn);animation-timing-function:cubic-bezier(.8,0,1,1)}to{transform:rotate(1turn)}}@keyframes fa-buzz{0%{transform:translateX(0) rotate(0deg);animation-timing-function:cubic-bezier(.1,0,.9,1)}5%{transform:translateX(var(--fa-buzz-distance,4px)) rotate(.5deg)}10%{transform:translateX(calc(var(--fa-buzz-distance, 4px)*-1)) rotate(-.5deg)}15%{transform:translateX(var(--fa-buzz-distance,4px)) rotate(.3deg)}20%{transform:translateX(calc(var(--fa-buzz-distance, 4px)*-1)) rotate(-.3deg)}25%{transform:translateX(calc(var(--fa-buzz-distance, 4px)*0.7)) rotate(.2deg)}30%{transform:translateX(calc(var(--fa-buzz-distance, 4px)*-1*0.7)) rotate(-.2deg)}35%{transform:translateX(calc(var(--fa-buzz-distance, 4px)*0.4)) rotate(.1deg)}40%{transform:translateX(0) rotate(0deg)}to{transform:translateX(0) rotate(0deg)}}@keyframes fa-wag{0%{transform:rotate(0deg);animation-timing-function:cubic-bezier(.2,0,.6,1)}12%{transform:rotate(var(--fa-wag-angle,12deg));animation-timing-function:cubic-bezier(.4,0,.2,1)}24%{transform:rotate(2deg);animation-timing-function:cubic-bezier(.2,0,.6,1)}36%{transform:rotate(calc(var(--fa-wag-angle, 12deg)*0.85));animation-timing-function:cubic-bezier(.4,0,.2,1)}48%{transform:rotate(1deg);animation-timing-function:cubic-bezier(.2,0,.6,1)}58%{transform:rotate(calc(var(--fa-wag-angle, 12deg)*0.6));animation-timing-function:cubic-bezier(.4,0,.2,1)}68%{transform:rotate(0deg)}to{transform:rotate(0deg)}}@keyframes fa-float{0%{transform:translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x,1.02),var(--fa-float-squash-y,.98));animation-timing-function:cubic-bezier(.33,0,.66,.33)}15%{transform:translateY(calc(var(--fa-float-height, 6px)*-0.4)) translateX(var(--fa-float-drift,1px)) rotate(var(--fa-float-tilt,1deg)) scale(1);animation-timing-function:cubic-bezier(.33,.66,.66,1)}35%{transform:translateY(calc(var(--fa-float-height, 6px)*-1)) translateX(0) rotate(0deg) scale(var(--fa-float-stretch-x,.98),var(--fa-float-stretch-y,1.03));animation-timing-function:cubic-bezier(.5,0,.5,0)}50%{transform:translateY(calc(var(--fa-float-height, 6px)*-0.92)) translateX(calc(var(--fa-float-drift, 1px)*-0.5)) rotate(calc(var(--fa-float-tilt, 1deg)*-0.5)) scale(.995,1.01);animation-timing-function:cubic-bezier(.33,0,.66,.33)}70%{transform:translateY(calc(var(--fa-float-height, 6px)*-0.3)) translateX(calc(var(--fa-float-drift, 1px)*-1)) rotate(calc(var(--fa-float-tilt, 1deg)*-1)) scale(1);animation-timing-function:cubic-bezier(.33,.66,.66,1)}90%{transform:translateY(calc(var(--fa-float-height, 6px)*0.05)) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x,1.02),var(--fa-float-squash-y,.98));animation-timing-function:cubic-bezier(.33,0,.66,1)}to{transform:translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x,1.02),var(--fa-float-squash-y,.98))}}@keyframes fa-swing{0%{transform:rotate(0deg);animation-timing-function:cubic-bezier(.2,0,.8,1)}8%{transform:rotate(var(--fa-swing-angle,22deg));animation-timing-function:cubic-bezier(.3,0,.7,1)}18%{transform:rotate(calc(var(--fa-swing-angle, 22deg)*-1*0.85));animation-timing-function:cubic-bezier(.3,0,.7,1)}28%{transform:rotate(calc(var(--fa-swing-angle, 22deg)*0.65));animation-timing-function:cubic-bezier(.35,0,.65,1)}38%{transform:rotate(calc(var(--fa-swing-angle, 22deg)*-1*0.45));animation-timing-function:cubic-bezier(.4,0,.6,1)}48%{transform:rotate(calc(var(--fa-swing-angle, 22deg)*0.25));animation-timing-function:cubic-bezier(.4,0,.6,1)}56%{transform:rotate(calc(var(--fa-swing-angle, 22deg)*-1*0.1));animation-timing-function:cubic-bezier(.4,0,.6,1)}64%{transform:rotate(0deg)}to{transform:rotate(0deg)}}@keyframes fa-jello{0%{transform:scale(1);animation-timing-function:cubic-bezier(.2,0,.8,1)}12%{transform:scale(var(--fa-jello-scale-x,1.15),calc(2 - var(--fa-jello-scale-x, 1.15)));animation-timing-function:cubic-bezier(.3,0,.7,1)}24%{transform:scale(calc(2 - var(--fa-jello-scale-y, 1.12)),var(--fa-jello-scale-y,1.12));animation-timing-function:cubic-bezier(.3,0,.7,1)}36%{transform:scale(calc(.5 + var(--fa-jello-scale-x, 1.15)*0.5),calc(1.5 - var(--fa-jello-scale-x, 1.15)*0.5));animation-timing-function:cubic-bezier(.4,0,.6,1)}48%{transform:scale(calc(1.3 - var(--fa-jello-scale-y, 1.12)*0.3),calc(.7 + var(--fa-jello-scale-y, 1.12)*0.3));animation-timing-function:cubic-bezier(.4,0,.6,1)}58%{transform:scale(1.02,.98);animation-timing-function:cubic-bezier(.4,0,.2,1)}68%{transform:scale(1)}to{transform:scale(1)}}.fa-rotate-90{transform:rotate(90deg)}.fa-rotate-180{transform:rotate(180deg)}.fa-rotate-270{transform:rotate(270deg)}.fa-flip-horizontal{transform:scaleX(-1)}.fa-flip-vertical{transform:scaleY(-1)}.fa-flip-both,.fa-flip-horizontal.fa-flip-vertical{transform:scale(-1)}.fa-rotate-by{transform:rotate(var(--fa-rotate-angle,0))}.fa-stack{display:inline-block;height:2em;line-height:2em;position:relative;vertical-align:middle;width:2.5em}.fa-stack-1x,.fa-stack-2x{--fa-width:100%;inset:0;position:absolute;text-align:center;width:var(--fa-width);z-index:var(--fa-stack-z-index,auto)}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:var(--fa-inverse,#fff)}

.fa-0{--fa:"\\30 "}.fa-1{--fa:"\\31 "}.fa-2{--fa:"\\32 "}.fa-3{--fa:"\\33 "}.fa-4{--fa:"\\34 "}.fa-5{--fa:"\\35 "}.fa-6{--fa:"\\36 "}.fa-7{--fa:"\\37 "}.fa-8{--fa:"\\38 "}.fa-9{--fa:"\\39 "}.fa-exclamation{--fa:"\\!"}.fa-hashtag{--fa:"\\#"}.fa-dollar,.fa-dollar-sign,.fa-usd{--fa:"\\$"}.fa-percent,.fa-percentage{--fa:"\\%"}.fa-asterisk{--fa:"\\*"}.fa-add,.fa-plus{--fa:"\\+"}.fa-less-than{--fa:"\\<"}.fa-equals{--fa:"\\="}.fa-greater-than{--fa:"\\>"}.fa-question{--fa:"\\?"}.fa-at{--fa:"\\@"}.fa-a{--fa:"A"}.fa-b{--fa:"B"}.fa-c{--fa:"C"}.fa-d{--fa:"D"}.fa-e{--fa:"E"}.fa-f{--fa:"F"}.fa-g{--fa:"G"}.fa-h{--fa:"H"}.fa-i{--fa:"I"}.fa-j{--fa:"J"}.fa-k{--fa:"K"}.fa-l{--fa:"L"}.fa-m{--fa:"M"}.fa-n{--fa:"N"}.fa-o{--fa:"O"}.fa-p{--fa:"P"}.fa-q{--fa:"Q"}.fa-r{--fa:"R"}.fa-s{--fa:"S"}.fa-t{--fa:"T"}.fa-u{--fa:"U"}.fa-v{--fa:"V"}.fa-w{--fa:"W"}.fa-x{--fa:"X"}.fa-y{--fa:"Y"}.fa-z{--fa:"Z"}.fa-faucet{--fa:"\\e005"}.fa-faucet-drip{--fa:"\\e006"}.fa-house-chimney-window{--fa:"\\e00d"}.fa-house-signal{--fa:"\\e012"}.fa-temperature-arrow-down,.fa-temperature-down{--fa:"\\e03f"}.fa-temperature-arrow-up,.fa-temperature-up{--fa:"\\e040"}.fa-trailer{--fa:"\\e041"}.fa-bacteria{--fa:"\\e059"}.fa-bacterium{--fa:"\\e05a"}.fa-box-tissue{--fa:"\\e05b"}.fa-hand-holding-medical{--fa:"\\e05c"}.fa-hand-sparkles{--fa:"\\e05d"}.fa-hands-bubbles,.fa-hands-wash{--fa:"\\e05e"}.fa-handshake-alt-slash,.fa-handshake-simple-slash,.fa-handshake-slash{--fa:"\\e060"}.fa-head-side-cough{--fa:"\\e061"}.fa-head-side-cough-slash{--fa:"\\e062"}.fa-head-side-mask{--fa:"\\e063"}.fa-head-side-virus{--fa:"\\e064"}.fa-house-chimney-user{--fa:"\\e065"}.fa-house-laptop,.fa-laptop-house{--fa:"\\e066"}.fa-lungs-virus{--fa:"\\e067"}.fa-people-arrows,.fa-people-arrows-left-right{--fa:"\\e068"}.fa-plane-slash{--fa:"\\e069"}.fa-pump-medical{--fa:"\\e06a"}.fa-pump-soap{--fa:"\\e06b"}.fa-shield-virus{--fa:"\\e06c"}.fa-sink{--fa:"\\e06d"}.fa-soap{--fa:"\\e06e"}.fa-stopwatch-20{--fa:"\\e06f"}.fa-shop-slash,.fa-store-alt-slash{--fa:"\\e070"}.fa-store-slash{--fa:"\\e071"}.fa-toilet-paper-slash{--fa:"\\e072"}.fa-users-slash{--fa:"\\e073"}.fa-virus{--fa:"\\e074"}.fa-virus-slash{--fa:"\\e075"}.fa-viruses{--fa:"\\e076"}.fa-vest{--fa:"\\e085"}.fa-vest-patches{--fa:"\\e086"}.fa-arrow-trend-down{--fa:"\\e097"}.fa-arrow-trend-up{--fa:"\\e098"}.fa-arrow-up-from-bracket{--fa:"\\e09a"}.fa-austral-sign{--fa:"\\e0a9"}.fa-baht-sign{--fa:"\\e0ac"}.fa-bitcoin-sign{--fa:"\\e0b4"}.fa-bolt-lightning{--fa:"\\e0b7"}.fa-book-bookmark{--fa:"\\e0bb"}.fa-camera-rotate{--fa:"\\e0d8"}.fa-cedi-sign{--fa:"\\e0df"}.fa-chart-column{--fa:"\\e0e3"}.fa-chart-gantt{--fa:"\\e0e4"}.fa-clapperboard{--fa:"\\e131"}.fa-closed-captioning-slash{--fa:"\\e135"}.fa-clover{--fa:"\\e139"}.fa-code-compare{--fa:"\\e13a"}.fa-code-fork{--fa:"\\e13b"}.fa-code-pull-request{--fa:"\\e13c"}.fa-colon-sign{--fa:"\\e140"}.fa-cruzeiro-sign{--fa:"\\e152"}.fa-display{--fa:"\\e163"}.fa-dong-sign{--fa:"\\e169"}.fa-elevator{--fa:"\\e16d"}.fa-filter-circle-xmark{--fa:"\\e17b"}.fa-florin-sign{--fa:"\\e184"}.fa-folder-closed{--fa:"\\e185"}.fa-franc-sign{--fa:"\\e18f"}.fa-guarani-sign{--fa:"\\e19a"}.fa-gun{--fa:"\\e19b"}.fa-hands-clapping{--fa:"\\e1a8"}.fa-home-user,.fa-house-user{--fa:"\\e1b0"}.fa-indian-rupee,.fa-indian-rupee-sign,.fa-inr{--fa:"\\e1bc"}.fa-kip-sign{--fa:"\\e1c4"}.fa-lari-sign{--fa:"\\e1c8"}.fa-litecoin-sign{--fa:"\\e1d3"}.fa-manat-sign{--fa:"\\e1d5"}.fa-mask-face{--fa:"\\e1d7"}.fa-mill-sign{--fa:"\\e1ed"}.fa-money-bills{--fa:"\\e1f3"}.fa-naira-sign{--fa:"\\e1f6"}.fa-notdef{--fa:"\\e1fe"}.fa-panorama{--fa:"\\e209"}.fa-peseta-sign{--fa:"\\e221"}.fa-peso-sign{--fa:"\\e222"}.fa-plane-up{--fa:"\\e22d"}.fa-rupiah-sign{--fa:"\\e23d"}.fa-stairs{--fa:"\\e289"}.fa-timeline{--fa:"\\e29c"}.fa-truck-front{--fa:"\\e2b7"}.fa-try,.fa-turkish-lira,.fa-turkish-lira-sign{--fa:"\\e2bb"}.fa-vault{--fa:"\\e2c5"}.fa-magic-wand-sparkles,.fa-wand-magic-sparkles{--fa:"\\e2ca"}.fa-wheat-alt,.fa-wheat-awn{--fa:"\\e2cd"}.fa-wheelchair-alt,.fa-wheelchair-move{--fa:"\\e2ce"}.fa-bangladeshi-taka-sign{--fa:"\\e2e6"}.fa-bowl-rice{--fa:"\\e2eb"}.fa-person-pregnant{--fa:"\\e31e"}.fa-home-lg,.fa-house-chimney{--fa:"\\e3af"}.fa-house-crack{--fa:"\\e3b1"}.fa-house-medical{--fa:"\\e3b2"}.fa-cent-sign{--fa:"\\e3f5"}.fa-plus-minus{--fa:"\\e43c"}.fa-sailboat{--fa:"\\e445"}.fa-section{--fa:"\\e447"}.fa-shrimp{--fa:"\\e448"}.fa-brazilian-real-sign{--fa:"\\e46c"}.fa-chart-simple{--fa:"\\e473"}.fa-diagram-next{--fa:"\\e476"}.fa-diagram-predecessor{--fa:"\\e477"}.fa-diagram-successor{--fa:"\\e47a"}.fa-earth-oceania,.fa-globe-oceania{--fa:"\\e47b"}.fa-bug-slash{--fa:"\\e490"}.fa-file-circle-plus{--fa:"\\e494"}.fa-shop-lock{--fa:"\\e4a5"}.fa-virus-covid{--fa:"\\e4a8"}.fa-virus-covid-slash{--fa:"\\e4a9"}.fa-anchor-circle-check{--fa:"\\e4aa"}.fa-anchor-circle-exclamation{--fa:"\\e4ab"}.fa-anchor-circle-xmark{--fa:"\\e4ac"}.fa-anchor-lock{--fa:"\\e4ad"}.fa-arrow-down-up-across-line{--fa:"\\e4af"}.fa-arrow-down-up-lock{--fa:"\\e4b0"}.fa-arrow-right-to-city{--fa:"\\e4b3"}.fa-arrow-up-from-ground-water{--fa:"\\e4b5"}.fa-arrow-up-from-water-pump{--fa:"\\e4b6"}.fa-arrow-up-right-dots{--fa:"\\e4b7"}.fa-arrows-down-to-line{--fa:"\\e4b8"}.fa-arrows-down-to-people{--fa:"\\e4b9"}.fa-arrows-left-right-to-line{--fa:"\\e4ba"}.fa-arrows-spin{--fa:"\\e4bb"}.fa-arrows-split-up-and-left{--fa:"\\e4bc"}.fa-arrows-to-circle{--fa:"\\e4bd"}.fa-arrows-to-dot{--fa:"\\e4be"}.fa-arrows-to-eye{--fa:"\\e4bf"}.fa-arrows-turn-right{--fa:"\\e4c0"}.fa-arrows-turn-to-dots{--fa:"\\e4c1"}.fa-arrows-up-to-line{--fa:"\\e4c2"}.fa-bore-hole{--fa:"\\e4c3"}.fa-bottle-droplet{--fa:"\\e4c4"}.fa-bottle-water{--fa:"\\e4c5"}.fa-bowl-food{--fa:"\\e4c6"}.fa-boxes-packing{--fa:"\\e4c7"}.fa-bridge{--fa:"\\e4c8"}.fa-bridge-circle-check{--fa:"\\e4c9"}.fa-bridge-circle-exclamation{--fa:"\\e4ca"}.fa-bridge-circle-xmark{--fa:"\\e4cb"}.fa-bridge-lock{--fa:"\\e4cc"}.fa-bridge-water{--fa:"\\e4ce"}.fa-bucket{--fa:"\\e4cf"}.fa-bugs{--fa:"\\e4d0"}.fa-building-circle-arrow-right{--fa:"\\e4d1"}.fa-building-circle-check{--fa:"\\e4d2"}.fa-building-circle-exclamation{--fa:"\\e4d3"}.fa-building-circle-xmark{--fa:"\\e4d4"}.fa-building-flag{--fa:"\\e4d5"}.fa-building-lock{--fa:"\\e4d6"}.fa-building-ngo{--fa:"\\e4d7"}.fa-building-shield{--fa:"\\e4d8"}.fa-building-un{--fa:"\\e4d9"}.fa-building-user{--fa:"\\e4da"}.fa-building-wheat{--fa:"\\e4db"}.fa-burst{--fa:"\\e4dc"}.fa-car-on{--fa:"\\e4dd"}.fa-car-tunnel{--fa:"\\e4de"}.fa-child-combatant,.fa-child-rifle{--fa:"\\e4e0"}.fa-children{--fa:"\\e4e1"}.fa-circle-nodes{--fa:"\\e4e2"}.fa-clipboard-question{--fa:"\\e4e3"}.fa-cloud-showers-water{--fa:"\\e4e4"}.fa-computer{--fa:"\\e4e5"}.fa-cubes-stacked{--fa:"\\e4e6"}.fa-envelope-circle-check{--fa:"\\e4e8"}.fa-explosion{--fa:"\\e4e9"}.fa-ferry{--fa:"\\e4ea"}.fa-file-circle-exclamation{--fa:"\\e4eb"}.fa-file-circle-minus{--fa:"\\e4ed"}.fa-file-circle-question{--fa:"\\e4ef"}.fa-file-shield{--fa:"\\e4f0"}.fa-fire-burner{--fa:"\\e4f1"}.fa-fish-fins{--fa:"\\e4f2"}.fa-flask-vial{--fa:"\\e4f3"}.fa-glass-water{--fa:"\\e4f4"}.fa-glass-water-droplet{--fa:"\\e4f5"}.fa-group-arrows-rotate{--fa:"\\e4f6"}.fa-hand-holding-hand{--fa:"\\e4f7"}.fa-handcuffs{--fa:"\\e4f8"}.fa-hands-bound{--fa:"\\e4f9"}.fa-hands-holding-child{--fa:"\\e4fa"}.fa-hands-holding-circle{--fa:"\\e4fb"}.fa-heart-circle-bolt{--fa:"\\e4fc"}.fa-heart-circle-check{--fa:"\\e4fd"}.fa-heart-circle-exclamation{--fa:"\\e4fe"}.fa-heart-circle-minus{--fa:"\\e4ff"}.fa-heart-circle-plus{--fa:"\\e500"}.fa-heart-circle-xmark{--fa:"\\e501"}.fa-helicopter-symbol{--fa:"\\e502"}.fa-helmet-un{--fa:"\\e503"}.fa-hill-avalanche{--fa:"\\e507"}.fa-hill-rockslide{--fa:"\\e508"}.fa-house-circle-check{--fa:"\\e509"}.fa-house-circle-exclamation{--fa:"\\e50a"}.fa-house-circle-xmark{--fa:"\\e50b"}.fa-house-fire{--fa:"\\e50c"}.fa-house-flag{--fa:"\\e50d"}.fa-house-flood-water{--fa:"\\e50e"}.fa-house-flood-water-circle-arrow-right{--fa:"\\e50f"}.fa-house-lock{--fa:"\\e510"}.fa-house-medical-circle-check{--fa:"\\e511"}.fa-house-medical-circle-exclamation{--fa:"\\e512"}.fa-house-medical-circle-xmark{--fa:"\\e513"}.fa-house-medical-flag{--fa:"\\e514"}.fa-house-tsunami{--fa:"\\e515"}.fa-jar{--fa:"\\e516"}.fa-jar-wheat{--fa:"\\e517"}.fa-jet-fighter-up{--fa:"\\e518"}.fa-jug-detergent{--fa:"\\e519"}.fa-kitchen-set{--fa:"\\e51a"}.fa-land-mine-on{--fa:"\\e51b"}.fa-landmark-flag{--fa:"\\e51c"}.fa-laptop-file{--fa:"\\e51d"}.fa-lines-leaning{--fa:"\\e51e"}.fa-location-pin-lock{--fa:"\\e51f"}.fa-locust{--fa:"\\e520"}.fa-magnifying-glass-arrow-right{--fa:"\\e521"}.fa-magnifying-glass-chart{--fa:"\\e522"}.fa-mars-and-venus-burst{--fa:"\\e523"}.fa-mask-ventilator{--fa:"\\e524"}.fa-mattress-pillow{--fa:"\\e525"}.fa-mobile-retro{--fa:"\\e527"}.fa-money-bill-transfer{--fa:"\\e528"}.fa-money-bill-trend-up{--fa:"\\e529"}.fa-money-bill-wheat{--fa:"\\e52a"}.fa-mosquito{--fa:"\\e52b"}.fa-mosquito-net{--fa:"\\e52c"}.fa-mound{--fa:"\\e52d"}.fa-mountain-city{--fa:"\\e52e"}.fa-mountain-sun{--fa:"\\e52f"}.fa-oil-well{--fa:"\\e532"}.fa-people-group{--fa:"\\e533"}.fa-people-line{--fa:"\\e534"}.fa-people-pulling{--fa:"\\e535"}.fa-people-robbery{--fa:"\\e536"}.fa-people-roof{--fa:"\\e537"}.fa-person-arrow-down-to-line{--fa:"\\e538"}.fa-person-arrow-up-from-line{--fa:"\\e539"}.fa-person-breastfeeding{--fa:"\\e53a"}.fa-person-burst{--fa:"\\e53b"}.fa-person-cane{--fa:"\\e53c"}.fa-person-chalkboard{--fa:"\\e53d"}.fa-person-circle-check{--fa:"\\e53e"}.fa-person-circle-exclamation{--fa:"\\e53f"}.fa-person-circle-minus{--fa:"\\e540"}.fa-person-circle-plus{--fa:"\\e541"}.fa-person-circle-question{--fa:"\\e542"}.fa-person-circle-xmark{--fa:"\\e543"}.fa-person-dress-burst{--fa:"\\e544"}.fa-person-drowning{--fa:"\\e545"}.fa-person-falling{--fa:"\\e546"}.fa-person-falling-burst{--fa:"\\e547"}.fa-person-half-dress{--fa:"\\e548"}.fa-person-harassing{--fa:"\\e549"}.fa-person-military-pointing{--fa:"\\e54a"}.fa-person-military-rifle{--fa:"\\e54b"}.fa-person-military-to-person{--fa:"\\e54c"}.fa-person-rays{--fa:"\\e54d"}.fa-person-rifle{--fa:"\\e54e"}.fa-person-shelter{--fa:"\\e54f"}.fa-person-walking-arrow-loop-left{--fa:"\\e551"}.fa-person-walking-arrow-right{--fa:"\\e552"}.fa-person-walking-dashed-line-arrow-right{--fa:"\\e553"}.fa-person-walking-luggage{--fa:"\\e554"}.fa-plane-circle-check{--fa:"\\e555"}.fa-plane-circle-exclamation{--fa:"\\e556"}.fa-plane-circle-xmark{--fa:"\\e557"}.fa-plane-lock{--fa:"\\e558"}.fa-plate-wheat{--fa:"\\e55a"}.fa-plug-circle-bolt{--fa:"\\e55b"}.fa-plug-circle-check{--fa:"\\e55c"}.fa-plug-circle-exclamation{--fa:"\\e55d"}.fa-plug-circle-minus{--fa:"\\e55e"}.fa-plug-circle-plus{--fa:"\\e55f"}.fa-plug-circle-xmark{--fa:"\\e560"}.fa-ranking-star{--fa:"\\e561"}.fa-road-barrier{--fa:"\\e562"}.fa-road-bridge{--fa:"\\e563"}.fa-road-circle-check{--fa:"\\e564"}.fa-road-circle-exclamation{--fa:"\\e565"}.fa-road-circle-xmark{--fa:"\\e566"}.fa-road-lock{--fa:"\\e567"}.fa-road-spikes{--fa:"\\e568"}.fa-rug{--fa:"\\e569"}.fa-sack-xmark{--fa:"\\e56a"}.fa-school-circle-check{--fa:"\\e56b"}.fa-school-circle-exclamation{--fa:"\\e56c"}.fa-school-circle-xmark{--fa:"\\e56d"}.fa-school-flag{--fa:"\\e56e"}.fa-school-lock{--fa:"\\e56f"}.fa-sheet-plastic{--fa:"\\e571"}.fa-shield-cat{--fa:"\\e572"}.fa-shield-dog{--fa:"\\e573"}.fa-shield-heart{--fa:"\\e574"}.fa-square-nfi{--fa:"\\e576"}.fa-square-person-confined{--fa:"\\e577"}.fa-square-virus{--fa:"\\e578"}.fa-rod-asclepius,.fa-rod-snake,.fa-staff-aesculapius,.fa-staff-snake{--fa:"\\e579"}.fa-sun-plant-wilt{--fa:"\\e57a"}.fa-tarp{--fa:"\\e57b"}.fa-tarp-droplet{--fa:"\\e57c"}.fa-tent{--fa:"\\e57d"}.fa-tent-arrow-down-to-line{--fa:"\\e57e"}.fa-tent-arrow-left-right{--fa:"\\e57f"}.fa-tent-arrow-turn-left{--fa:"\\e580"}.fa-tent-arrows-down{--fa:"\\e581"}.fa-tents{--fa:"\\e582"}.fa-toilet-portable{--fa:"\\e583"}.fa-toilets-portable{--fa:"\\e584"}.fa-tower-cell{--fa:"\\e585"}.fa-tower-observation{--fa:"\\e586"}.fa-tree-city{--fa:"\\e587"}.fa-trowel{--fa:"\\e589"}.fa-trowel-bricks{--fa:"\\e58a"}.fa-truck-arrow-right{--fa:"\\e58b"}.fa-truck-droplet{--fa:"\\e58c"}.fa-truck-field{--fa:"\\e58d"}.fa-truck-field-un{--fa:"\\e58e"}.fa-truck-plane{--fa:"\\e58f"}.fa-users-between-lines{--fa:"\\e591"}.fa-users-line{--fa:"\\e592"}.fa-users-rays{--fa:"\\e593"}.fa-users-rectangle{--fa:"\\e594"}.fa-users-viewfinder{--fa:"\\e595"}.fa-vial-circle-check{--fa:"\\e596"}.fa-vial-virus{--fa:"\\e597"}.fa-wheat-awn-circle-exclamation{--fa:"\\e598"}.fa-worm{--fa:"\\e599"}.fa-xmarks-lines{--fa:"\\e59a"}.fa-child-dress{--fa:"\\e59c"}.fa-child-reaching{--fa:"\\e59d"}.fa-file-circle-check{--fa:"\\e5a0"}.fa-file-circle-xmark{--fa:"\\e5a1"}.fa-person-through-window{--fa:"\\e5a9"}.fa-plant-wilt{--fa:"\\e5aa"}.fa-stapler{--fa:"\\e5af"}.fa-train-tram{--fa:"\\e5b4"}.fa-table-cells-column-lock{--fa:"\\e678"}.fa-table-cells-row-lock{--fa:"\\e67a"}.fa-thumb-tack-slash,.fa-thumbtack-slash{--fa:"\\e68f"}.fa-table-cells-row-unlock{--fa:"\\e691"}.fa-chart-diagram{--fa:"\\e695"}.fa-comment-nodes{--fa:"\\e696"}.fa-file-fragment{--fa:"\\e697"}.fa-file-half-dashed{--fa:"\\e698"}.fa-hexagon-nodes{--fa:"\\e699"}.fa-hexagon-nodes-bolt{--fa:"\\e69a"}.fa-square-binary{--fa:"\\e69b"}.fa-pentagon{--fa:"\\e790"}.fa-non-binary{--fa:"\\e807"}.fa-spiral{--fa:"\\e80a"}.fa-picture-in-picture{--fa:"\\e80b"}.fa-mobile-vibrate{--fa:"\\e816"}.fa-single-quote-left{--fa:"\\e81b"}.fa-single-quote-right{--fa:"\\e81c"}.fa-bus-side{--fa:"\\e81d"}.fa-heptagon,.fa-septagon{--fa:"\\e820"}.fa-aquarius{--fa:"\\e845"}.fa-aries{--fa:"\\e846"}.fa-cancer{--fa:"\\e847"}.fa-capricorn{--fa:"\\e848"}.fa-gemini{--fa:"\\e849"}.fa-leo{--fa:"\\e84a"}.fa-libra{--fa:"\\e84b"}.fa-pisces{--fa:"\\e84c"}.fa-sagittarius{--fa:"\\e84d"}.fa-scorpio{--fa:"\\e84e"}.fa-taurus{--fa:"\\e84f"}.fa-virgo{--fa:"\\e850"}.fa-glass-martini,.fa-martini-glass-empty{--fa:"\\f000"}.fa-music{--fa:"\\f001"}.fa-magnifying-glass,.fa-search{--fa:"\\f002"}.fa-heart{--fa:"\\f004"}.fa-star{--fa:"\\f005"}.fa-user,.fa-user-alt,.fa-user-large{--fa:"\\f007"}.fa-film,.fa-film-alt,.fa-film-simple{--fa:"\\f008"}.fa-table-cells-large,.fa-th-large{--fa:"\\f009"}.fa-table-cells,.fa-th{--fa:"\\f00a"}.fa-table-list,.fa-th-list{--fa:"\\f00b"}.fa-check{--fa:"\\f00c"}.fa-close,.fa-multiply,.fa-remove,.fa-times,.fa-xmark{--fa:"\\f00d"}.fa-magnifying-glass-plus,.fa-search-plus{--fa:"\\f00e"}.fa-magnifying-glass-minus,.fa-search-minus{--fa:"\\f010"}.fa-power-off{--fa:"\\f011"}.fa-signal,.fa-signal-5,.fa-signal-perfect{--fa:"\\f012"}.fa-cog,.fa-gear{--fa:"\\f013"}.fa-home,.fa-home-alt,.fa-home-lg-alt,.fa-house{--fa:"\\f015"}.fa-clock,.fa-clock-four{--fa:"\\f017"}.fa-road{--fa:"\\f018"}.fa-download{--fa:"\\f019"}.fa-inbox{--fa:"\\f01c"}.fa-arrow-right-rotate,.fa-arrow-rotate-forward,.fa-arrow-rotate-right,.fa-redo{--fa:"\\f01e"}.fa-arrows-rotate,.fa-refresh,.fa-sync{--fa:"\\f021"}.fa-list-alt,.fa-rectangle-list{--fa:"\\f022"}.fa-lock{--fa:"\\f023"}.fa-flag{--fa:"\\f024"}.fa-headphones,.fa-headphones-alt,.fa-headphones-simple{--fa:"\\f025"}.fa-volume-off{--fa:"\\f026"}.fa-volume-down,.fa-volume-low{--fa:"\\f027"}.fa-volume-high,.fa-volume-up{--fa:"\\f028"}.fa-qrcode{--fa:"\\f029"}.fa-barcode{--fa:"\\f02a"}.fa-tag{--fa:"\\f02b"}.fa-tags{--fa:"\\f02c"}.fa-book{--fa:"\\f02d"}.fa-bookmark{--fa:"\\f02e"}.fa-print{--fa:"\\f02f"}.fa-camera,.fa-camera-alt{--fa:"\\f030"}.fa-font{--fa:"\\f031"}.fa-bold{--fa:"\\f032"}.fa-italic{--fa:"\\f033"}.fa-text-height{--fa:"\\f034"}.fa-text-width{--fa:"\\f035"}.fa-align-left{--fa:"\\f036"}.fa-align-center{--fa:"\\f037"}.fa-align-right{--fa:"\\f038"}.fa-align-justify{--fa:"\\f039"}.fa-list,.fa-list-squares{--fa:"\\f03a"}.fa-dedent,.fa-outdent{--fa:"\\f03b"}.fa-indent{--fa:"\\f03c"}.fa-video,.fa-video-camera{--fa:"\\f03d"}.fa-image{--fa:"\\f03e"}.fa-location-pin,.fa-map-marker{--fa:"\\f041"}.fa-adjust,.fa-circle-half-stroke{--fa:"\\f042"}.fa-droplet,.fa-tint{--fa:"\\f043"}.fa-edit,.fa-pen-to-square{--fa:"\\f044"}.fa-arrows,.fa-arrows-up-down-left-right{--fa:"\\f047"}.fa-backward-step,.fa-step-backward{--fa:"\\f048"}.fa-backward-fast,.fa-fast-backward{--fa:"\\f049"}.fa-backward{--fa:"\\f04a"}.fa-play{--fa:"\\f04b"}.fa-pause{--fa:"\\f04c"}.fa-stop{--fa:"\\f04d"}.fa-forward{--fa:"\\f04e"}.fa-fast-forward,.fa-forward-fast{--fa:"\\f050"}.fa-forward-step,.fa-step-forward{--fa:"\\f051"}.fa-eject{--fa:"\\f052"}.fa-chevron-left{--fa:"\\f053"}.fa-chevron-right{--fa:"\\f054"}.fa-circle-plus,.fa-plus-circle{--fa:"\\f055"}.fa-circle-minus,.fa-minus-circle{--fa:"\\f056"}.fa-circle-xmark,.fa-times-circle,.fa-xmark-circle{--fa:"\\f057"}.fa-check-circle,.fa-circle-check{--fa:"\\f058"}.fa-circle-question,.fa-question-circle{--fa:"\\f059"}.fa-circle-info,.fa-info-circle{--fa:"\\f05a"}.fa-crosshairs{--fa:"\\f05b"}.fa-ban,.fa-cancel{--fa:"\\f05e"}.fa-arrow-left{--fa:"\\f060"}.fa-arrow-right{--fa:"\\f061"}.fa-arrow-up{--fa:"\\f062"}.fa-arrow-down{--fa:"\\f063"}.fa-mail-forward,.fa-share{--fa:"\\f064"}.fa-expand{--fa:"\\f065"}.fa-compress{--fa:"\\f066"}.fa-minus,.fa-subtract{--fa:"\\f068"}.fa-circle-exclamation,.fa-exclamation-circle{--fa:"\\f06a"}.fa-gift{--fa:"\\f06b"}.fa-leaf{--fa:"\\f06c"}.fa-fire{--fa:"\\f06d"}.fa-eye{--fa:"\\f06e"}.fa-eye-slash{--fa:"\\f070"}.fa-exclamation-triangle,.fa-triangle-exclamation,.fa-warning{--fa:"\\f071"}.fa-plane{--fa:"\\f072"}.fa-calendar-alt,.fa-calendar-days{--fa:"\\f073"}.fa-random,.fa-shuffle{--fa:"\\f074"}.fa-comment{--fa:"\\f075"}.fa-magnet{--fa:"\\f076"}.fa-chevron-up{--fa:"\\f077"}.fa-chevron-down{--fa:"\\f078"}.fa-retweet{--fa:"\\f079"}.fa-cart-shopping,.fa-shopping-cart{--fa:"\\f07a"}.fa-folder,.fa-folder-blank{--fa:"\\f07b"}.fa-folder-open{--fa:"\\f07c"}.fa-arrows-up-down,.fa-arrows-v{--fa:"\\f07d"}.fa-arrows-h,.fa-arrows-left-right{--fa:"\\f07e"}.fa-bar-chart,.fa-chart-bar{--fa:"\\f080"}.fa-camera-retro{--fa:"\\f083"}.fa-key{--fa:"\\f084"}.fa-cogs,.fa-gears{--fa:"\\f085"}.fa-comments{--fa:"\\f086"}.fa-star-half{--fa:"\\f089"}.fa-arrow-right-from-bracket,.fa-sign-out{--fa:"\\f08b"}.fa-thumb-tack,.fa-thumbtack{--fa:"\\f08d"}.fa-arrow-up-right-from-square,.fa-external-link{--fa:"\\f08e"}.fa-arrow-right-to-bracket,.fa-sign-in{--fa:"\\f090"}.fa-trophy{--fa:"\\f091"}.fa-upload{--fa:"\\f093"}.fa-lemon{--fa:"\\f094"}.fa-phone{--fa:"\\f095"}.fa-phone-square,.fa-square-phone{--fa:"\\f098"}.fa-unlock{--fa:"\\f09c"}.fa-credit-card,.fa-credit-card-alt{--fa:"\\f09d"}.fa-feed,.fa-rss{--fa:"\\f09e"}.fa-hard-drive,.fa-hdd{--fa:"\\f0a0"}.fa-bullhorn{--fa:"\\f0a1"}.fa-certificate{--fa:"\\f0a3"}.fa-hand-point-right{--fa:"\\f0a4"}.fa-hand-point-left{--fa:"\\f0a5"}.fa-hand-point-up{--fa:"\\f0a6"}.fa-hand-point-down{--fa:"\\f0a7"}.fa-arrow-circle-left,.fa-circle-arrow-left{--fa:"\\f0a8"}.fa-arrow-circle-right,.fa-circle-arrow-right{--fa:"\\f0a9"}.fa-arrow-circle-up,.fa-circle-arrow-up{--fa:"\\f0aa"}.fa-arrow-circle-down,.fa-circle-arrow-down{--fa:"\\f0ab"}.fa-globe{--fa:"\\f0ac"}.fa-wrench{--fa:"\\f0ad"}.fa-list-check,.fa-tasks{--fa:"\\f0ae"}.fa-filter{--fa:"\\f0b0"}.fa-briefcase{--fa:"\\f0b1"}.fa-arrows-alt,.fa-up-down-left-right{--fa:"\\f0b2"}.fa-users{--fa:"\\f0c0"}.fa-chain,.fa-link{--fa:"\\f0c1"}.fa-cloud{--fa:"\\f0c2"}.fa-flask{--fa:"\\f0c3"}.fa-cut,.fa-scissors{--fa:"\\f0c4"}.fa-copy{--fa:"\\f0c5"}.fa-paperclip{--fa:"\\f0c6"}.fa-floppy-disk,.fa-save{--fa:"\\f0c7"}.fa-square{--fa:"\\f0c8"}.fa-bars,.fa-navicon{--fa:"\\f0c9"}.fa-list-dots,.fa-list-ul{--fa:"\\f0ca"}.fa-list-1-2,.fa-list-numeric,.fa-list-ol{--fa:"\\f0cb"}.fa-strikethrough{--fa:"\\f0cc"}.fa-underline{--fa:"\\f0cd"}.fa-table{--fa:"\\f0ce"}.fa-magic,.fa-wand-magic{--fa:"\\f0d0"}.fa-truck{--fa:"\\f0d1"}.fa-money-bill{--fa:"\\f0d6"}.fa-caret-down{--fa:"\\f0d7"}.fa-caret-up{--fa:"\\f0d8"}.fa-caret-left{--fa:"\\f0d9"}.fa-caret-right{--fa:"\\f0da"}.fa-columns,.fa-table-columns{--fa:"\\f0db"}.fa-sort,.fa-unsorted{--fa:"\\f0dc"}.fa-sort-desc,.fa-sort-down{--fa:"\\f0dd"}.fa-sort-asc,.fa-sort-up{--fa:"\\f0de"}.fa-envelope{--fa:"\\f0e0"}.fa-arrow-left-rotate,.fa-arrow-rotate-back,.fa-arrow-rotate-backward,.fa-arrow-rotate-left,.fa-undo{--fa:"\\f0e2"}.fa-gavel,.fa-legal{--fa:"\\f0e3"}.fa-bolt,.fa-zap{--fa:"\\f0e7"}.fa-sitemap{--fa:"\\f0e8"}.fa-umbrella{--fa:"\\f0e9"}.fa-file-clipboard,.fa-paste{--fa:"\\f0ea"}.fa-lightbulb{--fa:"\\f0eb"}.fa-arrow-right-arrow-left,.fa-exchange{--fa:"\\f0ec"}.fa-cloud-arrow-down,.fa-cloud-download,.fa-cloud-download-alt{--fa:"\\f0ed"}.fa-cloud-arrow-up,.fa-cloud-upload,.fa-cloud-upload-alt{--fa:"\\f0ee"}.fa-user-doctor,.fa-user-md{--fa:"\\f0f0"}.fa-stethoscope{--fa:"\\f0f1"}.fa-suitcase{--fa:"\\f0f2"}.fa-bell{--fa:"\\f0f3"}.fa-coffee,.fa-mug-saucer{--fa:"\\f0f4"}.fa-hospital,.fa-hospital-alt,.fa-hospital-wide{--fa:"\\f0f8"}.fa-ambulance,.fa-truck-medical{--fa:"\\f0f9"}.fa-medkit,.fa-suitcase-medical{--fa:"\\f0fa"}.fa-fighter-jet,.fa-jet-fighter{--fa:"\\f0fb"}.fa-beer,.fa-beer-mug-empty{--fa:"\\f0fc"}.fa-h-square,.fa-square-h{--fa:"\\f0fd"}.fa-plus-square,.fa-square-plus{--fa:"\\f0fe"}.fa-angle-double-left,.fa-angles-left{--fa:"\\f100"}.fa-angle-double-right,.fa-angles-right{--fa:"\\f101"}.fa-angle-double-up,.fa-angles-up{--fa:"\\f102"}.fa-angle-double-down,.fa-angles-down{--fa:"\\f103"}.fa-angle-left{--fa:"\\f104"}.fa-angle-right{--fa:"\\f105"}.fa-angle-up{--fa:"\\f106"}.fa-angle-down{--fa:"\\f107"}.fa-laptop{--fa:"\\f109"}.fa-tablet-button{--fa:"\\f10a"}.fa-mobile-button{--fa:"\\f10b"}.fa-quote-left,.fa-quote-left-alt{--fa:"\\f10d"}.fa-quote-right,.fa-quote-right-alt{--fa:"\\f10e"}.fa-spinner{--fa:"\\f110"}.fa-circle{--fa:"\\f111"}.fa-face-smile,.fa-smile{--fa:"\\f118"}.fa-face-frown,.fa-frown{--fa:"\\f119"}.fa-face-meh,.fa-meh{--fa:"\\f11a"}.fa-gamepad{--fa:"\\f11b"}.fa-keyboard{--fa:"\\f11c"}.fa-flag-checkered{--fa:"\\f11e"}.fa-terminal{--fa:"\\f120"}.fa-code{--fa:"\\f121"}.fa-mail-reply-all,.fa-reply-all{--fa:"\\f122"}.fa-location-arrow{--fa:"\\f124"}.fa-crop{--fa:"\\f125"}.fa-code-branch{--fa:"\\f126"}.fa-chain-broken,.fa-chain-slash,.fa-link-slash,.fa-unlink{--fa:"\\f127"}.fa-info{--fa:"\\f129"}.fa-superscript{--fa:"\\f12b"}.fa-subscript{--fa:"\\f12c"}.fa-eraser{--fa:"\\f12d"}.fa-puzzle-piece{--fa:"\\f12e"}.fa-microphone{--fa:"\\f130"}.fa-microphone-slash{--fa:"\\f131"}.fa-shield,.fa-shield-blank{--fa:"\\f132"}.fa-calendar{--fa:"\\f133"}.fa-fire-extinguisher{--fa:"\\f134"}.fa-rocket{--fa:"\\f135"}.fa-chevron-circle-left,.fa-circle-chevron-left{--fa:"\\f137"}.fa-chevron-circle-right,.fa-circle-chevron-right{--fa:"\\f138"}.fa-chevron-circle-up,.fa-circle-chevron-up{--fa:"\\f139"}.fa-chevron-circle-down,.fa-circle-chevron-down{--fa:"\\f13a"}.fa-anchor{--fa:"\\f13d"}.fa-unlock-alt,.fa-unlock-keyhole{--fa:"\\f13e"}.fa-bullseye{--fa:"\\f140"}.fa-ellipsis,.fa-ellipsis-h{--fa:"\\f141"}.fa-ellipsis-v,.fa-ellipsis-vertical{--fa:"\\f142"}.fa-rss-square,.fa-square-rss{--fa:"\\f143"}.fa-circle-play,.fa-play-circle{--fa:"\\f144"}.fa-ticket{--fa:"\\f145"}.fa-minus-square,.fa-square-minus{--fa:"\\f146"}.fa-arrow-turn-up,.fa-level-up{--fa:"\\f148"}.fa-arrow-turn-down,.fa-level-down{--fa:"\\f149"}.fa-check-square,.fa-square-check{--fa:"\\f14a"}.fa-pen-square,.fa-pencil-square,.fa-square-pen{--fa:"\\f14b"}.fa-external-link-square,.fa-square-arrow-up-right{--fa:"\\f14c"}.fa-share-from-square,.fa-share-square{--fa:"\\f14d"}.fa-compass{--fa:"\\f14e"}.fa-caret-square-down,.fa-square-caret-down{--fa:"\\f150"}.fa-caret-square-up,.fa-square-caret-up{--fa:"\\f151"}.fa-caret-square-right,.fa-square-caret-right{--fa:"\\f152"}.fa-eur,.fa-euro,.fa-euro-sign{--fa:"\\f153"}.fa-gbp,.fa-pound-sign,.fa-sterling-sign{--fa:"\\f154"}.fa-rupee,.fa-rupee-sign{--fa:"\\f156"}.fa-cny,.fa-jpy,.fa-rmb,.fa-yen,.fa-yen-sign{--fa:"\\f157"}.fa-rouble,.fa-rub,.fa-ruble,.fa-ruble-sign{--fa:"\\f158"}.fa-krw,.fa-won,.fa-won-sign{--fa:"\\f159"}.fa-file{--fa:"\\f15b"}.fa-file-alt,.fa-file-lines,.fa-file-text{--fa:"\\f15c"}.fa-arrow-down-a-z,.fa-sort-alpha-asc,.fa-sort-alpha-down{--fa:"\\f15d"}.fa-arrow-up-a-z,.fa-sort-alpha-up{--fa:"\\f15e"}.fa-arrow-down-wide-short,.fa-sort-amount-asc,.fa-sort-amount-down{--fa:"\\f160"}.fa-arrow-up-wide-short,.fa-sort-amount-up{--fa:"\\f161"}.fa-arrow-down-1-9,.fa-sort-numeric-asc,.fa-sort-numeric-down{--fa:"\\f162"}.fa-arrow-up-1-9,.fa-sort-numeric-up{--fa:"\\f163"}.fa-thumbs-up{--fa:"\\f164"}.fa-thumbs-down{--fa:"\\f165"}.fa-arrow-down-long,.fa-long-arrow-down{--fa:"\\f175"}.fa-arrow-up-long,.fa-long-arrow-up{--fa:"\\f176"}.fa-arrow-left-long,.fa-long-arrow-left{--fa:"\\f177"}.fa-arrow-right-long,.fa-long-arrow-right{--fa:"\\f178"}.fa-female,.fa-person-dress{--fa:"\\f182"}.fa-male,.fa-person{--fa:"\\f183"}.fa-sun{--fa:"\\f185"}.fa-moon{--fa:"\\f186"}.fa-archive,.fa-box-archive{--fa:"\\f187"}.fa-bug{--fa:"\\f188"}.fa-caret-square-left,.fa-square-caret-left{--fa:"\\f191"}.fa-circle-dot,.fa-dot-circle{--fa:"\\f192"}.fa-wheelchair{--fa:"\\f193"}.fa-lira-sign{--fa:"\\f195"}.fa-shuttle-space,.fa-space-shuttle{--fa:"\\f197"}.fa-envelope-square,.fa-square-envelope{--fa:"\\f199"}.fa-bank,.fa-building-columns,.fa-institution,.fa-museum,.fa-university{--fa:"\\f19c"}.fa-graduation-cap,.fa-mortar-board{--fa:"\\f19d"}.fa-language{--fa:"\\f1ab"}.fa-fax{--fa:"\\f1ac"}.fa-building{--fa:"\\f1ad"}.fa-child{--fa:"\\f1ae"}.fa-paw{--fa:"\\f1b0"}.fa-cube{--fa:"\\f1b2"}.fa-cubes{--fa:"\\f1b3"}.fa-recycle{--fa:"\\f1b8"}.fa-automobile,.fa-car{--fa:"\\f1b9"}.fa-cab,.fa-taxi{--fa:"\\f1ba"}.fa-tree{--fa:"\\f1bb"}.fa-database{--fa:"\\f1c0"}.fa-file-pdf{--fa:"\\f1c1"}.fa-file-word{--fa:"\\f1c2"}.fa-file-excel{--fa:"\\f1c3"}.fa-file-powerpoint{--fa:"\\f1c4"}.fa-file-image{--fa:"\\f1c5"}.fa-file-archive,.fa-file-zipper{--fa:"\\f1c6"}.fa-file-audio{--fa:"\\f1c7"}.fa-file-video{--fa:"\\f1c8"}.fa-file-code{--fa:"\\f1c9"}.fa-life-ring{--fa:"\\f1cd"}.fa-circle-notch{--fa:"\\f1ce"}.fa-paper-plane{--fa:"\\f1d8"}.fa-clock-rotate-left,.fa-history{--fa:"\\f1da"}.fa-header,.fa-heading{--fa:"\\f1dc"}.fa-paragraph{--fa:"\\f1dd"}.fa-sliders,.fa-sliders-h{--fa:"\\f1de"}.fa-share-alt,.fa-share-nodes{--fa:"\\f1e0"}.fa-share-alt-square,.fa-square-share-nodes{--fa:"\\f1e1"}.fa-bomb{--fa:"\\f1e2"}.fa-futbol,.fa-futbol-ball,.fa-soccer-ball{--fa:"\\f1e3"}.fa-teletype,.fa-tty{--fa:"\\f1e4"}.fa-binoculars{--fa:"\\f1e5"}.fa-plug{--fa:"\\f1e6"}.fa-newspaper{--fa:"\\f1ea"}.fa-wifi,.fa-wifi-3,.fa-wifi-strong{--fa:"\\f1eb"}.fa-calculator{--fa:"\\f1ec"}.fa-bell-slash{--fa:"\\f1f6"}.fa-trash{--fa:"\\f1f8"}.fa-copyright{--fa:"\\f1f9"}.fa-eye-dropper,.fa-eye-dropper-empty,.fa-eyedropper{--fa:"\\f1fb"}.fa-paint-brush,.fa-paintbrush{--fa:"\\f1fc"}.fa-birthday-cake,.fa-cake,.fa-cake-candles{--fa:"\\f1fd"}.fa-area-chart,.fa-chart-area{--fa:"\\f1fe"}.fa-chart-pie,.fa-pie-chart{--fa:"\\f200"}.fa-chart-line,.fa-line-chart{--fa:"\\f201"}.fa-toggle-off{--fa:"\\f204"}.fa-toggle-on{--fa:"\\f205"}.fa-bicycle{--fa:"\\f206"}.fa-bus{--fa:"\\f207"}.fa-closed-captioning{--fa:"\\f20a"}.fa-ils,.fa-shekel,.fa-shekel-sign,.fa-sheqel,.fa-sheqel-sign{--fa:"\\f20b"}.fa-cart-plus{--fa:"\\f217"}.fa-cart-arrow-down{--fa:"\\f218"}.fa-diamond{--fa:"\\f219"}.fa-ship{--fa:"\\f21a"}.fa-user-secret{--fa:"\\f21b"}.fa-motorcycle{--fa:"\\f21c"}.fa-street-view{--fa:"\\f21d"}.fa-heart-pulse,.fa-heartbeat{--fa:"\\f21e"}.fa-venus{--fa:"\\f221"}.fa-mars{--fa:"\\f222"}.fa-mercury{--fa:"\\f223"}.fa-mars-and-venus{--fa:"\\f224"}.fa-transgender,.fa-transgender-alt{--fa:"\\f225"}.fa-venus-double{--fa:"\\f226"}.fa-mars-double{--fa:"\\f227"}.fa-venus-mars{--fa:"\\f228"}.fa-mars-stroke{--fa:"\\f229"}.fa-mars-stroke-up,.fa-mars-stroke-v{--fa:"\\f22a"}.fa-mars-stroke-h,.fa-mars-stroke-right{--fa:"\\f22b"}.fa-neuter{--fa:"\\f22c"}.fa-genderless{--fa:"\\f22d"}.fa-server{--fa:"\\f233"}.fa-user-plus{--fa:"\\f234"}.fa-user-times,.fa-user-xmark{--fa:"\\f235"}.fa-bed{--fa:"\\f236"}.fa-train{--fa:"\\f238"}.fa-subway,.fa-train-subway{--fa:"\\f239"}.fa-battery,.fa-battery-5,.fa-battery-full{--fa:"\\f240"}.fa-battery-4,.fa-battery-three-quarters{--fa:"\\f241"}.fa-battery-3,.fa-battery-half{--fa:"\\f242"}.fa-battery-2,.fa-battery-quarter{--fa:"\\f243"}.fa-battery-0,.fa-battery-empty{--fa:"\\f244"}.fa-arrow-pointer,.fa-mouse-pointer{--fa:"\\f245"}.fa-i-cursor{--fa:"\\f246"}.fa-object-group{--fa:"\\f247"}.fa-object-ungroup{--fa:"\\f248"}.fa-note-sticky,.fa-sticky-note{--fa:"\\f249"}.fa-clone{--fa:"\\f24d"}.fa-balance-scale,.fa-scale-balanced{--fa:"\\f24e"}.fa-hourglass-1,.fa-hourglass-start{--fa:"\\f251"}.fa-hourglass-2,.fa-hourglass-half{--fa:"\\f252"}.fa-hourglass-3,.fa-hourglass-end{--fa:"\\f253"}.fa-hourglass,.fa-hourglass-empty{--fa:"\\f254"}.fa-hand-back-fist,.fa-hand-rock{--fa:"\\f255"}.fa-hand,.fa-hand-paper{--fa:"\\f256"}.fa-hand-scissors{--fa:"\\f257"}.fa-hand-lizard{--fa:"\\f258"}.fa-hand-spock{--fa:"\\f259"}.fa-hand-pointer{--fa:"\\f25a"}.fa-hand-peace{--fa:"\\f25b"}.fa-trademark{--fa:"\\f25c"}.fa-registered{--fa:"\\f25d"}.fa-television,.fa-tv,.fa-tv-alt{--fa:"\\f26c"}.fa-calendar-plus{--fa:"\\f271"}.fa-calendar-minus{--fa:"\\f272"}.fa-calendar-times,.fa-calendar-xmark{--fa:"\\f273"}.fa-calendar-check{--fa:"\\f274"}.fa-industry{--fa:"\\f275"}.fa-map-pin{--fa:"\\f276"}.fa-map-signs,.fa-signs-post{--fa:"\\f277"}.fa-map{--fa:"\\f279"}.fa-comment-alt,.fa-message{--fa:"\\f27a"}.fa-circle-pause,.fa-pause-circle{--fa:"\\f28b"}.fa-circle-stop,.fa-stop-circle{--fa:"\\f28d"}.fa-bag-shopping,.fa-shopping-bag{--fa:"\\f290"}.fa-basket-shopping,.fa-shopping-basket{--fa:"\\f291"}.fa-universal-access{--fa:"\\f29a"}.fa-blind,.fa-person-walking-with-cane{--fa:"\\f29d"}.fa-audio-description{--fa:"\\f29e"}.fa-phone-volume,.fa-volume-control-phone{--fa:"\\f2a0"}.fa-braille{--fa:"\\f2a1"}.fa-assistive-listening-systems,.fa-ear-listen{--fa:"\\f2a2"}.fa-american-sign-language-interpreting,.fa-asl-interpreting,.fa-hands-american-sign-language-interpreting,.fa-hands-asl-interpreting{--fa:"\\f2a3"}.fa-deaf,.fa-deafness,.fa-ear-deaf,.fa-hard-of-hearing{--fa:"\\f2a4"}.fa-hands,.fa-sign-language,.fa-signing{--fa:"\\f2a7"}.fa-eye-low-vision,.fa-low-vision{--fa:"\\f2a8"}.fa-handshake,.fa-handshake-alt,.fa-handshake-simple{--fa:"\\f2b5"}.fa-envelope-open{--fa:"\\f2b6"}.fa-address-book,.fa-contact-book{--fa:"\\f2b9"}.fa-address-card,.fa-contact-card,.fa-vcard{--fa:"\\f2bb"}.fa-circle-user,.fa-user-circle{--fa:"\\f2bd"}.fa-id-badge{--fa:"\\f2c1"}.fa-drivers-license,.fa-id-card{--fa:"\\f2c2"}.fa-temperature-4,.fa-temperature-full,.fa-thermometer-4,.fa-thermometer-full{--fa:"\\f2c7"}.fa-temperature-3,.fa-temperature-three-quarters,.fa-thermometer-3,.fa-thermometer-three-quarters{--fa:"\\f2c8"}.fa-temperature-2,.fa-temperature-half,.fa-thermometer-2,.fa-thermometer-half{--fa:"\\f2c9"}.fa-temperature-1,.fa-temperature-quarter,.fa-thermometer-1,.fa-thermometer-quarter{--fa:"\\f2ca"}.fa-temperature-0,.fa-temperature-empty,.fa-thermometer-0,.fa-thermometer-empty{--fa:"\\f2cb"}.fa-shower{--fa:"\\f2cc"}.fa-bath,.fa-bathtub{--fa:"\\f2cd"}.fa-podcast{--fa:"\\f2ce"}.fa-window-maximize{--fa:"\\f2d0"}.fa-window-minimize{--fa:"\\f2d1"}.fa-window-restore{--fa:"\\f2d2"}.fa-square-xmark,.fa-times-square,.fa-xmark-square{--fa:"\\f2d3"}.fa-microchip{--fa:"\\f2db"}.fa-snowflake{--fa:"\\f2dc"}.fa-spoon,.fa-utensil-spoon{--fa:"\\f2e5"}.fa-cutlery,.fa-utensils{--fa:"\\f2e7"}.fa-rotate-back,.fa-rotate-backward,.fa-rotate-left,.fa-undo-alt{--fa:"\\f2ea"}.fa-trash-alt,.fa-trash-can{--fa:"\\f2ed"}.fa-rotate,.fa-sync-alt{--fa:"\\f2f1"}.fa-stopwatch{--fa:"\\f2f2"}.fa-right-from-bracket,.fa-sign-out-alt{--fa:"\\f2f5"}.fa-right-to-bracket,.fa-sign-in-alt{--fa:"\\f2f6"}.fa-redo-alt,.fa-rotate-forward,.fa-rotate-right{--fa:"\\f2f9"}.fa-poo{--fa:"\\f2fe"}.fa-images{--fa:"\\f302"}.fa-pencil,.fa-pencil-alt{--fa:"\\f303"}.fa-pen{--fa:"\\f304"}.fa-pen-alt,.fa-pen-clip{--fa:"\\f305"}.fa-octagon{--fa:"\\f306"}.fa-down-long,.fa-long-arrow-alt-down{--fa:"\\f309"}.fa-left-long,.fa-long-arrow-alt-left{--fa:"\\f30a"}.fa-long-arrow-alt-right,.fa-right-long{--fa:"\\f30b"}.fa-long-arrow-alt-up,.fa-up-long{--fa:"\\f30c"}.fa-hexagon{--fa:"\\f312"}.fa-file-edit,.fa-file-pen{--fa:"\\f31c"}.fa-expand-arrows-alt,.fa-maximize{--fa:"\\f31e"}.fa-clipboard{--fa:"\\f328"}.fa-arrows-alt-h,.fa-left-right{--fa:"\\f337"}.fa-arrows-alt-v,.fa-up-down{--fa:"\\f338"}.fa-alarm-clock{--fa:"\\f34e"}.fa-arrow-alt-circle-down,.fa-circle-down{--fa:"\\f358"}.fa-arrow-alt-circle-left,.fa-circle-left{--fa:"\\f359"}.fa-arrow-alt-circle-right,.fa-circle-right{--fa:"\\f35a"}.fa-arrow-alt-circle-up,.fa-circle-up{--fa:"\\f35b"}.fa-external-link-alt,.fa-up-right-from-square{--fa:"\\f35d"}.fa-external-link-square-alt,.fa-square-up-right{--fa:"\\f360"}.fa-exchange-alt,.fa-right-left{--fa:"\\f362"}.fa-repeat{--fa:"\\f363"}.fa-code-commit{--fa:"\\f386"}.fa-code-merge{--fa:"\\f387"}.fa-desktop,.fa-desktop-alt{--fa:"\\f390"}.fa-gem{--fa:"\\f3a5"}.fa-level-down-alt,.fa-turn-down{--fa:"\\f3be"}.fa-level-up-alt,.fa-turn-up{--fa:"\\f3bf"}.fa-lock-open{--fa:"\\f3c1"}.fa-location-dot,.fa-map-marker-alt{--fa:"\\f3c5"}.fa-microphone-alt,.fa-microphone-lines{--fa:"\\f3c9"}.fa-mobile-alt,.fa-mobile-screen-button{--fa:"\\f3cd"}.fa-mobile,.fa-mobile-android,.fa-mobile-phone{--fa:"\\f3ce"}.fa-mobile-android-alt,.fa-mobile-screen{--fa:"\\f3cf"}.fa-money-bill-1,.fa-money-bill-alt{--fa:"\\f3d1"}.fa-phone-slash{--fa:"\\f3dd"}.fa-image-portrait,.fa-portrait{--fa:"\\f3e0"}.fa-mail-reply,.fa-reply{--fa:"\\f3e5"}.fa-shield-alt,.fa-shield-halved{--fa:"\\f3ed"}.fa-tablet-alt,.fa-tablet-screen-button{--fa:"\\f3fa"}.fa-tablet,.fa-tablet-android{--fa:"\\f3fb"}.fa-ticket-alt,.fa-ticket-simple{--fa:"\\f3ff"}.fa-rectangle-times,.fa-rectangle-xmark,.fa-times-rectangle,.fa-window-close{--fa:"\\f410"}.fa-compress-alt,.fa-down-left-and-up-right-to-center{--fa:"\\f422"}.fa-expand-alt,.fa-up-right-and-down-left-from-center{--fa:"\\f424"}.fa-baseball-bat-ball{--fa:"\\f432"}.fa-baseball,.fa-baseball-ball{--fa:"\\f433"}.fa-basketball,.fa-basketball-ball{--fa:"\\f434"}.fa-bowling-ball{--fa:"\\f436"}.fa-chess{--fa:"\\f439"}.fa-chess-bishop{--fa:"\\f43a"}.fa-chess-board{--fa:"\\f43c"}.fa-chess-king{--fa:"\\f43f"}.fa-chess-knight{--fa:"\\f441"}.fa-chess-pawn{--fa:"\\f443"}.fa-chess-queen{--fa:"\\f445"}.fa-chess-rook{--fa:"\\f447"}.fa-dumbbell{--fa:"\\f44b"}.fa-football,.fa-football-ball{--fa:"\\f44e"}.fa-golf-ball,.fa-golf-ball-tee{--fa:"\\f450"}.fa-hockey-puck{--fa:"\\f453"}.fa-broom-ball,.fa-quidditch,.fa-quidditch-broom-ball{--fa:"\\f458"}.fa-square-full{--fa:"\\f45c"}.fa-ping-pong-paddle-ball,.fa-table-tennis,.fa-table-tennis-paddle-ball{--fa:"\\f45d"}.fa-volleyball,.fa-volleyball-ball{--fa:"\\f45f"}.fa-allergies,.fa-hand-dots{--fa:"\\f461"}.fa-band-aid,.fa-bandage{--fa:"\\f462"}.fa-box{--fa:"\\f466"}.fa-boxes,.fa-boxes-alt,.fa-boxes-stacked{--fa:"\\f468"}.fa-briefcase-medical{--fa:"\\f469"}.fa-burn,.fa-fire-flame-simple{--fa:"\\f46a"}.fa-capsules{--fa:"\\f46b"}.fa-clipboard-check{--fa:"\\f46c"}.fa-clipboard-list{--fa:"\\f46d"}.fa-diagnoses,.fa-person-dots-from-line{--fa:"\\f470"}.fa-dna{--fa:"\\f471"}.fa-dolly,.fa-dolly-box{--fa:"\\f472"}.fa-cart-flatbed,.fa-dolly-flatbed{--fa:"\\f474"}.fa-file-medical{--fa:"\\f477"}.fa-file-medical-alt,.fa-file-waveform{--fa:"\\f478"}.fa-first-aid,.fa-kit-medical{--fa:"\\f479"}.fa-circle-h,.fa-hospital-symbol{--fa:"\\f47e"}.fa-id-card-alt,.fa-id-card-clip{--fa:"\\f47f"}.fa-notes-medical{--fa:"\\f481"}.fa-pallet{--fa:"\\f482"}.fa-pills{--fa:"\\f484"}.fa-prescription-bottle{--fa:"\\f485"}.fa-prescription-bottle-alt,.fa-prescription-bottle-medical{--fa:"\\f486"}.fa-bed-pulse,.fa-procedures{--fa:"\\f487"}.fa-shipping-fast,.fa-truck-fast{--fa:"\\f48b"}.fa-smoking{--fa:"\\f48d"}.fa-syringe{--fa:"\\f48e"}.fa-tablets{--fa:"\\f490"}.fa-thermometer{--fa:"\\f491"}.fa-vial{--fa:"\\f492"}.fa-vials{--fa:"\\f493"}.fa-warehouse{--fa:"\\f494"}.fa-weight,.fa-weight-scale{--fa:"\\f496"}.fa-x-ray{--fa:"\\f497"}.fa-box-open{--fa:"\\f49e"}.fa-comment-dots,.fa-commenting{--fa:"\\f4ad"}.fa-comment-slash{--fa:"\\f4b3"}.fa-couch{--fa:"\\f4b8"}.fa-circle-dollar-to-slot,.fa-donate{--fa:"\\f4b9"}.fa-dove{--fa:"\\f4ba"}.fa-hand-holding{--fa:"\\f4bd"}.fa-hand-holding-heart{--fa:"\\f4be"}.fa-hand-holding-dollar,.fa-hand-holding-usd{--fa:"\\f4c0"}.fa-hand-holding-droplet,.fa-hand-holding-water{--fa:"\\f4c1"}.fa-hands-holding{--fa:"\\f4c2"}.fa-hands-helping,.fa-handshake-angle{--fa:"\\f4c4"}.fa-parachute-box{--fa:"\\f4cd"}.fa-people-carry,.fa-people-carry-box{--fa:"\\f4ce"}.fa-piggy-bank{--fa:"\\f4d3"}.fa-ribbon{--fa:"\\f4d6"}.fa-route{--fa:"\\f4d7"}.fa-seedling,.fa-sprout{--fa:"\\f4d8"}.fa-sign,.fa-sign-hanging{--fa:"\\f4d9"}.fa-face-smile-wink,.fa-smile-wink{--fa:"\\f4da"}.fa-tape{--fa:"\\f4db"}.fa-truck-loading,.fa-truck-ramp-box{--fa:"\\f4de"}.fa-truck-moving{--fa:"\\f4df"}.fa-video-slash{--fa:"\\f4e2"}.fa-wine-glass{--fa:"\\f4e3"}.fa-user-astronaut{--fa:"\\f4fb"}.fa-user-check{--fa:"\\f4fc"}.fa-user-clock{--fa:"\\f4fd"}.fa-user-cog,.fa-user-gear{--fa:"\\f4fe"}.fa-user-edit,.fa-user-pen{--fa:"\\f4ff"}.fa-user-friends,.fa-user-group{--fa:"\\f500"}.fa-user-graduate{--fa:"\\f501"}.fa-user-lock{--fa:"\\f502"}.fa-user-minus{--fa:"\\f503"}.fa-user-ninja{--fa:"\\f504"}.fa-user-shield{--fa:"\\f505"}.fa-user-alt-slash,.fa-user-large-slash,.fa-user-slash{--fa:"\\f506"}.fa-user-tag{--fa:"\\f507"}.fa-user-tie{--fa:"\\f508"}.fa-users-cog,.fa-users-gear{--fa:"\\f509"}.fa-balance-scale-left,.fa-scale-unbalanced{--fa:"\\f515"}.fa-balance-scale-right,.fa-scale-unbalanced-flip{--fa:"\\f516"}.fa-blender{--fa:"\\f517"}.fa-book-open{--fa:"\\f518"}.fa-broadcast-tower,.fa-tower-broadcast{--fa:"\\f519"}.fa-broom{--fa:"\\f51a"}.fa-blackboard,.fa-chalkboard{--fa:"\\f51b"}.fa-chalkboard-teacher,.fa-chalkboard-user{--fa:"\\f51c"}.fa-church{--fa:"\\f51d"}.fa-coins{--fa:"\\f51e"}.fa-compact-disc{--fa:"\\f51f"}.fa-crow{--fa:"\\f520"}.fa-crown{--fa:"\\f521"}.fa-dice{--fa:"\\f522"}.fa-dice-five{--fa:"\\f523"}.fa-dice-four{--fa:"\\f524"}.fa-dice-one{--fa:"\\f525"}.fa-dice-six{--fa:"\\f526"}.fa-dice-three{--fa:"\\f527"}.fa-dice-two{--fa:"\\f528"}.fa-divide{--fa:"\\f529"}.fa-door-closed{--fa:"\\f52a"}.fa-door-open{--fa:"\\f52b"}.fa-feather{--fa:"\\f52d"}.fa-frog{--fa:"\\f52e"}.fa-gas-pump{--fa:"\\f52f"}.fa-glasses{--fa:"\\f530"}.fa-greater-than-equal{--fa:"\\f532"}.fa-helicopter{--fa:"\\f533"}.fa-infinity{--fa:"\\f534"}.fa-kiwi-bird{--fa:"\\f535"}.fa-less-than-equal{--fa:"\\f537"}.fa-memory{--fa:"\\f538"}.fa-microphone-alt-slash,.fa-microphone-lines-slash{--fa:"\\f539"}.fa-money-bill-wave{--fa:"\\f53a"}.fa-money-bill-1-wave,.fa-money-bill-wave-alt{--fa:"\\f53b"}.fa-money-check{--fa:"\\f53c"}.fa-money-check-alt,.fa-money-check-dollar{--fa:"\\f53d"}.fa-not-equal{--fa:"\\f53e"}.fa-palette{--fa:"\\f53f"}.fa-parking,.fa-square-parking{--fa:"\\f540"}.fa-diagram-project,.fa-project-diagram{--fa:"\\f542"}.fa-receipt{--fa:"\\f543"}.fa-robot{--fa:"\\f544"}.fa-ruler{--fa:"\\f545"}.fa-ruler-combined{--fa:"\\f546"}.fa-ruler-horizontal{--fa:"\\f547"}.fa-ruler-vertical{--fa:"\\f548"}.fa-school{--fa:"\\f549"}.fa-screwdriver{--fa:"\\f54a"}.fa-shoe-prints{--fa:"\\f54b"}.fa-skull{--fa:"\\f54c"}.fa-ban-smoking,.fa-smoking-ban{--fa:"\\f54d"}.fa-store{--fa:"\\f54e"}.fa-shop,.fa-store-alt{--fa:"\\f54f"}.fa-bars-staggered,.fa-reorder,.fa-stream{--fa:"\\f550"}.fa-stroopwafel{--fa:"\\f551"}.fa-toolbox{--fa:"\\f552"}.fa-shirt,.fa-t-shirt,.fa-tshirt{--fa:"\\f553"}.fa-person-walking,.fa-walking{--fa:"\\f554"}.fa-wallet{--fa:"\\f555"}.fa-angry,.fa-face-angry{--fa:"\\f556"}.fa-archway{--fa:"\\f557"}.fa-atlas,.fa-book-atlas{--fa:"\\f558"}.fa-award{--fa:"\\f559"}.fa-backspace,.fa-delete-left{--fa:"\\f55a"}.fa-bezier-curve{--fa:"\\f55b"}.fa-bong{--fa:"\\f55c"}.fa-brush{--fa:"\\f55d"}.fa-bus-alt,.fa-bus-simple{--fa:"\\f55e"}.fa-cannabis{--fa:"\\f55f"}.fa-check-double{--fa:"\\f560"}.fa-cocktail,.fa-martini-glass-citrus{--fa:"\\f561"}.fa-bell-concierge,.fa-concierge-bell{--fa:"\\f562"}.fa-cookie{--fa:"\\f563"}.fa-cookie-bite{--fa:"\\f564"}.fa-crop-alt,.fa-crop-simple{--fa:"\\f565"}.fa-digital-tachograph,.fa-tachograph-digital{--fa:"\\f566"}.fa-dizzy,.fa-face-dizzy{--fa:"\\f567"}.fa-compass-drafting,.fa-drafting-compass{--fa:"\\f568"}.fa-drum{--fa:"\\f569"}.fa-drum-steelpan{--fa:"\\f56a"}.fa-feather-alt,.fa-feather-pointed{--fa:"\\f56b"}.fa-file-contract{--fa:"\\f56c"}.fa-file-arrow-down,.fa-file-download{--fa:"\\f56d"}.fa-arrow-right-from-file,.fa-file-export{--fa:"\\f56e"}.fa-arrow-right-to-file,.fa-file-import{--fa:"\\f56f"}.fa-file-invoice{--fa:"\\f570"}.fa-file-invoice-dollar{--fa:"\\f571"}.fa-file-prescription{--fa:"\\f572"}.fa-file-signature{--fa:"\\f573"}.fa-file-arrow-up,.fa-file-upload{--fa:"\\f574"}.fa-fill{--fa:"\\f575"}.fa-fill-drip{--fa:"\\f576"}.fa-fingerprint{--fa:"\\f577"}.fa-fish{--fa:"\\f578"}.fa-face-flushed,.fa-flushed{--fa:"\\f579"}.fa-face-frown-open,.fa-frown-open{--fa:"\\f57a"}.fa-glass-martini-alt,.fa-martini-glass{--fa:"\\f57b"}.fa-earth-africa,.fa-globe-africa{--fa:"\\f57c"}.fa-earth,.fa-earth-america,.fa-earth-americas,.fa-globe-americas{--fa:"\\f57d"}.fa-earth-asia,.fa-globe-asia{--fa:"\\f57e"}.fa-face-grimace,.fa-grimace{--fa:"\\f57f"}.fa-face-grin,.fa-grin{--fa:"\\f580"}.fa-face-grin-wide,.fa-grin-alt{--fa:"\\f581"}.fa-face-grin-beam,.fa-grin-beam{--fa:"\\f582"}.fa-face-grin-beam-sweat,.fa-grin-beam-sweat{--fa:"\\f583"}.fa-face-grin-hearts,.fa-grin-hearts{--fa:"\\f584"}.fa-face-grin-squint,.fa-grin-squint{--fa:"\\f585"}.fa-face-grin-squint-tears,.fa-grin-squint-tears{--fa:"\\f586"}.fa-face-grin-stars,.fa-grin-stars{--fa:"\\f587"}.fa-face-grin-tears,.fa-grin-tears{--fa:"\\f588"}.fa-face-grin-tongue,.fa-grin-tongue{--fa:"\\f589"}.fa-face-grin-tongue-squint,.fa-grin-tongue-squint{--fa:"\\f58a"}.fa-face-grin-tongue-wink,.fa-grin-tongue-wink{--fa:"\\f58b"}.fa-face-grin-wink,.fa-grin-wink{--fa:"\\f58c"}.fa-grid-horizontal,.fa-grip,.fa-grip-horizontal{--fa:"\\f58d"}.fa-grid-vertical,.fa-grip-vertical{--fa:"\\f58e"}.fa-headset{--fa:"\\f590"}.fa-highlighter{--fa:"\\f591"}.fa-hot-tub,.fa-hot-tub-person{--fa:"\\f593"}.fa-hotel{--fa:"\\f594"}.fa-joint{--fa:"\\f595"}.fa-face-kiss,.fa-kiss{--fa:"\\f596"}.fa-face-kiss-beam,.fa-kiss-beam{--fa:"\\f597"}.fa-face-kiss-wink-heart,.fa-kiss-wink-heart{--fa:"\\f598"}.fa-face-laugh,.fa-laugh{--fa:"\\f599"}.fa-face-laugh-beam,.fa-laugh-beam{--fa:"\\f59a"}.fa-face-laugh-squint,.fa-laugh-squint{--fa:"\\f59b"}.fa-face-laugh-wink,.fa-laugh-wink{--fa:"\\f59c"}.fa-cart-flatbed-suitcase,.fa-luggage-cart{--fa:"\\f59d"}.fa-map-location,.fa-map-marked{--fa:"\\f59f"}.fa-map-location-dot,.fa-map-marked-alt{--fa:"\\f5a0"}.fa-marker{--fa:"\\f5a1"}.fa-medal{--fa:"\\f5a2"}.fa-face-meh-blank,.fa-meh-blank{--fa:"\\f5a4"}.fa-face-rolling-eyes,.fa-meh-rolling-eyes{--fa:"\\f5a5"}.fa-monument{--fa:"\\f5a6"}.fa-mortar-pestle{--fa:"\\f5a7"}.fa-paint-roller{--fa:"\\f5aa"}.fa-passport{--fa:"\\f5ab"}.fa-pen-fancy{--fa:"\\f5ac"}.fa-pen-nib{--fa:"\\f5ad"}.fa-pen-ruler,.fa-pencil-ruler{--fa:"\\f5ae"}.fa-plane-arrival{--fa:"\\f5af"}.fa-plane-departure{--fa:"\\f5b0"}.fa-prescription{--fa:"\\f5b1"}.fa-face-sad-cry,.fa-sad-cry{--fa:"\\f5b3"}.fa-face-sad-tear,.fa-sad-tear{--fa:"\\f5b4"}.fa-shuttle-van,.fa-van-shuttle{--fa:"\\f5b6"}.fa-signature{--fa:"\\f5b7"}.fa-face-smile-beam,.fa-smile-beam{--fa:"\\f5b8"}.fa-solar-panel{--fa:"\\f5ba"}.fa-lotus,.fa-spa{--fa:"\\f5bb"}.fa-splotch{--fa:"\\f5bc"}.fa-spray-can{--fa:"\\f5bd"}.fa-stamp{--fa:"\\f5bf"}.fa-star-half-alt,.fa-star-half-stroke{--fa:"\\f5c0"}.fa-suitcase-rolling{--fa:"\\f5c1"}.fa-face-surprise,.fa-surprise{--fa:"\\f5c2"}.fa-swatchbook{--fa:"\\f5c3"}.fa-person-swimming,.fa-swimmer{--fa:"\\f5c4"}.fa-ladder-water,.fa-swimming-pool,.fa-water-ladder{--fa:"\\f5c5"}.fa-droplet-slash,.fa-tint-slash{--fa:"\\f5c7"}.fa-face-tired,.fa-tired{--fa:"\\f5c8"}.fa-tooth{--fa:"\\f5c9"}.fa-umbrella-beach{--fa:"\\f5ca"}.fa-weight-hanging{--fa:"\\f5cd"}.fa-wine-glass-alt,.fa-wine-glass-empty{--fa:"\\f5ce"}.fa-air-freshener,.fa-spray-can-sparkles{--fa:"\\f5d0"}.fa-apple-alt,.fa-apple-whole{--fa:"\\f5d1"}.fa-atom{--fa:"\\f5d2"}.fa-bone{--fa:"\\f5d7"}.fa-book-open-reader,.fa-book-reader{--fa:"\\f5da"}.fa-brain{--fa:"\\f5dc"}.fa-car-alt,.fa-car-rear{--fa:"\\f5de"}.fa-battery-car,.fa-car-battery{--fa:"\\f5df"}.fa-car-burst,.fa-car-crash{--fa:"\\f5e1"}.fa-car-side{--fa:"\\f5e4"}.fa-charging-station{--fa:"\\f5e7"}.fa-diamond-turn-right,.fa-directions{--fa:"\\f5eb"}.fa-draw-polygon,.fa-vector-polygon{--fa:"\\f5ee"}.fa-laptop-code{--fa:"\\f5fc"}.fa-layer-group{--fa:"\\f5fd"}.fa-location,.fa-location-crosshairs{--fa:"\\f601"}.fa-lungs{--fa:"\\f604"}.fa-microscope{--fa:"\\f610"}.fa-oil-can{--fa:"\\f613"}.fa-poop{--fa:"\\f619"}.fa-shapes,.fa-triangle-circle-square{--fa:"\\f61f"}.fa-star-of-life{--fa:"\\f621"}.fa-dashboard,.fa-gauge,.fa-gauge-med,.fa-tachometer-alt-average{--fa:"\\f624"}.fa-gauge-high,.fa-tachometer-alt,.fa-tachometer-alt-fast{--fa:"\\f625"}.fa-gauge-simple,.fa-gauge-simple-med,.fa-tachometer-average{--fa:"\\f629"}.fa-gauge-simple-high,.fa-tachometer,.fa-tachometer-fast{--fa:"\\f62a"}.fa-teeth{--fa:"\\f62e"}.fa-teeth-open{--fa:"\\f62f"}.fa-masks-theater,.fa-theater-masks{--fa:"\\f630"}.fa-traffic-light{--fa:"\\f637"}.fa-truck-monster{--fa:"\\f63b"}.fa-truck-pickup{--fa:"\\f63c"}.fa-ad,.fa-rectangle-ad{--fa:"\\f641"}.fa-ankh{--fa:"\\f644"}.fa-bible,.fa-book-bible{--fa:"\\f647"}.fa-briefcase-clock,.fa-business-time{--fa:"\\f64a"}.fa-city{--fa:"\\f64f"}.fa-comment-dollar{--fa:"\\f651"}.fa-comments-dollar{--fa:"\\f653"}.fa-cross{--fa:"\\f654"}.fa-dharmachakra{--fa:"\\f655"}.fa-envelope-open-text{--fa:"\\f658"}.fa-folder-minus{--fa:"\\f65d"}.fa-folder-plus{--fa:"\\f65e"}.fa-filter-circle-dollar,.fa-funnel-dollar{--fa:"\\f662"}.fa-gopuram{--fa:"\\f664"}.fa-hamsa{--fa:"\\f665"}.fa-bahai,.fa-haykal{--fa:"\\f666"}.fa-jedi{--fa:"\\f669"}.fa-book-journal-whills,.fa-journal-whills{--fa:"\\f66a"}.fa-kaaba{--fa:"\\f66b"}.fa-khanda{--fa:"\\f66d"}.fa-landmark{--fa:"\\f66f"}.fa-envelopes-bulk,.fa-mail-bulk{--fa:"\\f674"}.fa-menorah{--fa:"\\f676"}.fa-mosque{--fa:"\\f678"}.fa-om{--fa:"\\f679"}.fa-pastafarianism,.fa-spaghetti-monster-flying{--fa:"\\f67b"}.fa-peace{--fa:"\\f67c"}.fa-place-of-worship{--fa:"\\f67f"}.fa-poll,.fa-square-poll-vertical{--fa:"\\f681"}.fa-poll-h,.fa-square-poll-horizontal{--fa:"\\f682"}.fa-person-praying,.fa-pray{--fa:"\\f683"}.fa-hands-praying,.fa-praying-hands{--fa:"\\f684"}.fa-book-quran,.fa-quran{--fa:"\\f687"}.fa-magnifying-glass-dollar,.fa-search-dollar{--fa:"\\f688"}.fa-magnifying-glass-location,.fa-search-location{--fa:"\\f689"}.fa-socks{--fa:"\\f696"}.fa-square-root-alt,.fa-square-root-variable{--fa:"\\f698"}.fa-star-and-crescent{--fa:"\\f699"}.fa-star-of-david{--fa:"\\f69a"}.fa-synagogue{--fa:"\\f69b"}.fa-scroll-torah,.fa-torah{--fa:"\\f6a0"}.fa-torii-gate{--fa:"\\f6a1"}.fa-vihara{--fa:"\\f6a7"}.fa-volume,.fa-volume-medium{--fa:"\\f6a8"}.fa-volume-mute,.fa-volume-times,.fa-volume-xmark{--fa:"\\f6a9"}.fa-yin-yang{--fa:"\\f6ad"}.fa-blender-phone{--fa:"\\f6b6"}.fa-book-dead,.fa-book-skull{--fa:"\\f6b7"}.fa-campground{--fa:"\\f6bb"}.fa-cat{--fa:"\\f6be"}.fa-chair{--fa:"\\f6c0"}.fa-cloud-moon{--fa:"\\f6c3"}.fa-cloud-sun{--fa:"\\f6c4"}.fa-cow{--fa:"\\f6c8"}.fa-dice-d20{--fa:"\\f6cf"}.fa-dice-d6{--fa:"\\f6d1"}.fa-dog{--fa:"\\f6d3"}.fa-dragon{--fa:"\\f6d5"}.fa-drumstick-bite{--fa:"\\f6d7"}.fa-dungeon{--fa:"\\f6d9"}.fa-file-csv{--fa:"\\f6dd"}.fa-fist-raised,.fa-hand-fist{--fa:"\\f6de"}.fa-ghost{--fa:"\\f6e2"}.fa-hammer{--fa:"\\f6e3"}.fa-hanukiah{--fa:"\\f6e6"}.fa-hat-wizard{--fa:"\\f6e8"}.fa-hiking,.fa-person-hiking{--fa:"\\f6ec"}.fa-hippo{--fa:"\\f6ed"}.fa-horse{--fa:"\\f6f0"}.fa-house-chimney-crack,.fa-house-damage{--fa:"\\f6f1"}.fa-hryvnia,.fa-hryvnia-sign{--fa:"\\f6f2"}.fa-mask{--fa:"\\f6fa"}.fa-mountain{--fa:"\\f6fc"}.fa-network-wired{--fa:"\\f6ff"}.fa-otter{--fa:"\\f700"}.fa-ring{--fa:"\\f70b"}.fa-person-running,.fa-running{--fa:"\\f70c"}.fa-scroll{--fa:"\\f70e"}.fa-skull-crossbones{--fa:"\\f714"}.fa-slash{--fa:"\\f715"}.fa-spider{--fa:"\\f717"}.fa-toilet-paper,.fa-toilet-paper-alt,.fa-toilet-paper-blank{--fa:"\\f71e"}.fa-tractor{--fa:"\\f722"}.fa-user-injured{--fa:"\\f728"}.fa-vr-cardboard{--fa:"\\f729"}.fa-wand-sparkles{--fa:"\\f72b"}.fa-wind{--fa:"\\f72e"}.fa-wine-bottle{--fa:"\\f72f"}.fa-cloud-meatball{--fa:"\\f73b"}.fa-cloud-moon-rain{--fa:"\\f73c"}.fa-cloud-rain{--fa:"\\f73d"}.fa-cloud-showers-heavy{--fa:"\\f740"}.fa-cloud-sun-rain{--fa:"\\f743"}.fa-democrat{--fa:"\\f747"}.fa-flag-usa{--fa:"\\f74d"}.fa-hurricane{--fa:"\\f751"}.fa-landmark-alt,.fa-landmark-dome{--fa:"\\f752"}.fa-meteor{--fa:"\\f753"}.fa-person-booth{--fa:"\\f756"}.fa-poo-bolt,.fa-poo-storm{--fa:"\\f75a"}.fa-rainbow{--fa:"\\f75b"}.fa-republican{--fa:"\\f75e"}.fa-smog{--fa:"\\f75f"}.fa-temperature-high{--fa:"\\f769"}.fa-temperature-low{--fa:"\\f76b"}.fa-cloud-bolt,.fa-thunderstorm{--fa:"\\f76c"}.fa-tornado{--fa:"\\f76f"}.fa-volcano{--fa:"\\f770"}.fa-check-to-slot,.fa-vote-yea{--fa:"\\f772"}.fa-water{--fa:"\\f773"}.fa-baby{--fa:"\\f77c"}.fa-baby-carriage,.fa-carriage-baby{--fa:"\\f77d"}.fa-biohazard{--fa:"\\f780"}.fa-blog{--fa:"\\f781"}.fa-calendar-day{--fa:"\\f783"}.fa-calendar-week{--fa:"\\f784"}.fa-candy-cane{--fa:"\\f786"}.fa-carrot{--fa:"\\f787"}.fa-cash-register{--fa:"\\f788"}.fa-compress-arrows-alt,.fa-minimize{--fa:"\\f78c"}.fa-dumpster{--fa:"\\f793"}.fa-dumpster-fire{--fa:"\\f794"}.fa-ethernet{--fa:"\\f796"}.fa-gifts{--fa:"\\f79c"}.fa-champagne-glasses,.fa-glass-cheers{--fa:"\\f79f"}.fa-glass-whiskey,.fa-whiskey-glass{--fa:"\\f7a0"}.fa-earth-europe,.fa-globe-europe{--fa:"\\f7a2"}.fa-grip-lines{--fa:"\\f7a4"}.fa-grip-lines-vertical{--fa:"\\f7a5"}.fa-guitar{--fa:"\\f7a6"}.fa-heart-broken,.fa-heart-crack{--fa:"\\f7a9"}.fa-holly-berry{--fa:"\\f7aa"}.fa-horse-head{--fa:"\\f7ab"}.fa-icicles{--fa:"\\f7ad"}.fa-igloo{--fa:"\\f7ae"}.fa-mitten{--fa:"\\f7b5"}.fa-mug-hot{--fa:"\\f7b6"}.fa-radiation{--fa:"\\f7b9"}.fa-circle-radiation,.fa-radiation-alt{--fa:"\\f7ba"}.fa-restroom{--fa:"\\f7bd"}.fa-satellite{--fa:"\\f7bf"}.fa-satellite-dish{--fa:"\\f7c0"}.fa-sd-card{--fa:"\\f7c2"}.fa-sim-card{--fa:"\\f7c4"}.fa-person-skating,.fa-skating{--fa:"\\f7c5"}.fa-person-skiing,.fa-skiing{--fa:"\\f7c9"}.fa-person-skiing-nordic,.fa-skiing-nordic{--fa:"\\f7ca"}.fa-sleigh{--fa:"\\f7cc"}.fa-comment-sms,.fa-sms{--fa:"\\f7cd"}.fa-person-snowboarding,.fa-snowboarding{--fa:"\\f7ce"}.fa-snowman{--fa:"\\f7d0"}.fa-snowplow{--fa:"\\f7d2"}.fa-tenge,.fa-tenge-sign{--fa:"\\f7d7"}.fa-toilet{--fa:"\\f7d8"}.fa-screwdriver-wrench,.fa-tools{--fa:"\\f7d9"}.fa-cable-car,.fa-tram{--fa:"\\f7da"}.fa-fire-alt,.fa-fire-flame-curved{--fa:"\\f7e4"}.fa-bacon{--fa:"\\f7e5"}.fa-book-medical{--fa:"\\f7e6"}.fa-bread-slice{--fa:"\\f7ec"}.fa-cheese{--fa:"\\f7ef"}.fa-clinic-medical,.fa-house-chimney-medical{--fa:"\\f7f2"}.fa-clipboard-user{--fa:"\\f7f3"}.fa-comment-medical{--fa:"\\f7f5"}.fa-crutch{--fa:"\\f7f7"}.fa-disease{--fa:"\\f7fa"}.fa-egg{--fa:"\\f7fb"}.fa-folder-tree{--fa:"\\f802"}.fa-burger,.fa-hamburger{--fa:"\\f805"}.fa-hand-middle-finger{--fa:"\\f806"}.fa-hard-hat,.fa-hat-hard,.fa-helmet-safety{--fa:"\\f807"}.fa-hospital-user{--fa:"\\f80d"}.fa-hotdog{--fa:"\\f80f"}.fa-ice-cream{--fa:"\\f810"}.fa-laptop-medical{--fa:"\\f812"}.fa-pager{--fa:"\\f815"}.fa-pepper-hot{--fa:"\\f816"}.fa-pizza-slice{--fa:"\\f818"}.fa-sack-dollar{--fa:"\\f81d"}.fa-book-tanakh,.fa-tanakh{--fa:"\\f827"}.fa-bars-progress,.fa-tasks-alt{--fa:"\\f828"}.fa-trash-arrow-up,.fa-trash-restore{--fa:"\\f829"}.fa-trash-can-arrow-up,.fa-trash-restore-alt{--fa:"\\f82a"}.fa-user-nurse{--fa:"\\f82f"}.fa-wave-square{--fa:"\\f83e"}.fa-biking,.fa-person-biking{--fa:"\\f84a"}.fa-border-all{--fa:"\\f84c"}.fa-border-none{--fa:"\\f850"}.fa-border-style,.fa-border-top-left{--fa:"\\f853"}.fa-digging,.fa-person-digging{--fa:"\\f85e"}.fa-fan{--fa:"\\f863"}.fa-heart-music-camera-bolt,.fa-icons{--fa:"\\f86d"}.fa-phone-alt,.fa-phone-flip{--fa:"\\f879"}.fa-phone-square-alt,.fa-square-phone-flip{--fa:"\\f87b"}.fa-photo-film,.fa-photo-video{--fa:"\\f87c"}.fa-remove-format,.fa-text-slash{--fa:"\\f87d"}.fa-arrow-down-z-a,.fa-sort-alpha-desc,.fa-sort-alpha-down-alt{--fa:"\\f881"}.fa-arrow-up-z-a,.fa-sort-alpha-up-alt{--fa:"\\f882"}.fa-arrow-down-short-wide,.fa-sort-amount-desc,.fa-sort-amount-down-alt{--fa:"\\f884"}.fa-arrow-up-short-wide,.fa-sort-amount-up-alt{--fa:"\\f885"}.fa-arrow-down-9-1,.fa-sort-numeric-desc,.fa-sort-numeric-down-alt{--fa:"\\f886"}.fa-arrow-up-9-1,.fa-sort-numeric-up-alt{--fa:"\\f887"}.fa-spell-check{--fa:"\\f891"}.fa-voicemail{--fa:"\\f897"}.fa-hat-cowboy{--fa:"\\f8c0"}.fa-hat-cowboy-side{--fa:"\\f8c1"}.fa-computer-mouse,.fa-mouse{--fa:"\\f8cc"}.fa-radio{--fa:"\\f8d7"}.fa-record-vinyl{--fa:"\\f8d9"}.fa-walkie-talkie{--fa:"\\f8ef"}.fa-caravan{--fa:"\\f8ff"}
:host,:root{--fa-family-brands:"Font Awesome 7 Brands";--fa-font-brands:normal 400 1em/1 var(--fa-family-brands)}@font-face{font-family:"Font Awesome 7 Brands";font-style:normal;font-weight:400;font-display:block;src:url(../webfonts/fa-brands-400.woff2)}.fa-brands,.fa-classic.fa-brands,.fab{--fa-family:var(--fa-family-brands);--fa-style:400}.fa-firefox-browser{--fa:"\\e007"}.fa-ideal{--fa:"\\e013"}.fa-microblog{--fa:"\\e01a"}.fa-pied-piper-square,.fa-square-pied-piper{--fa:"\\e01e"}.fa-unity{--fa:"\\e049"}.fa-dailymotion{--fa:"\\e052"}.fa-instagram-square,.fa-square-instagram{--fa:"\\e055"}.fa-mixer{--fa:"\\e056"}.fa-shopify{--fa:"\\e057"}.fa-deezer{--fa:"\\e077"}.fa-edge-legacy{--fa:"\\e078"}.fa-google-pay{--fa:"\\e079"}.fa-rust{--fa:"\\e07a"}.fa-tiktok{--fa:"\\e07b"}.fa-unsplash{--fa:"\\e07c"}.fa-cloudflare{--fa:"\\e07d"}.fa-guilded{--fa:"\\e07e"}.fa-hive{--fa:"\\e07f"}.fa-42-group,.fa-innosoft{--fa:"\\e080"}.fa-instalod{--fa:"\\e081"}.fa-octopus-deploy{--fa:"\\e082"}.fa-perbyte{--fa:"\\e083"}.fa-uncharted{--fa:"\\e084"}.fa-watchman-monitoring{--fa:"\\e087"}.fa-wodu{--fa:"\\e088"}.fa-wirsindhandwerk,.fa-wsh{--fa:"\\e2d0"}.fa-bots{--fa:"\\e340"}.fa-cmplid{--fa:"\\e360"}.fa-bilibili{--fa:"\\e3d9"}.fa-golang{--fa:"\\e40f"}.fa-pix{--fa:"\\e43a"}.fa-sitrox{--fa:"\\e44a"}.fa-hashnode{--fa:"\\e499"}.fa-meta{--fa:"\\e49b"}.fa-padlet{--fa:"\\e4a0"}.fa-nfc-directional{--fa:"\\e530"}.fa-nfc-symbol{--fa:"\\e531"}.fa-screenpal{--fa:"\\e570"}.fa-space-awesome{--fa:"\\e5ac"}.fa-square-font-awesome{--fa:"\\e5ad"}.fa-gitlab-square,.fa-square-gitlab{--fa:"\\e5ae"}.fa-odysee{--fa:"\\e5c6"}.fa-stubber{--fa:"\\e5c7"}.fa-debian{--fa:"\\e60b"}.fa-shoelace{--fa:"\\e60c"}.fa-threads{--fa:"\\e618"}.fa-square-threads{--fa:"\\e619"}.fa-square-x-twitter{--fa:"\\e61a"}.fa-x-twitter{--fa:"\\e61b"}.fa-opensuse{--fa:"\\e62b"}.fa-letterboxd{--fa:"\\e62d"}.fa-square-letterboxd{--fa:"\\e62e"}.fa-mintbit{--fa:"\\e62f"}.fa-google-scholar{--fa:"\\e63b"}.fa-brave{--fa:"\\e63c"}.fa-brave-reverse{--fa:"\\e63d"}.fa-pixiv{--fa:"\\e640"}.fa-upwork{--fa:"\\e641"}.fa-webflow{--fa:"\\e65c"}.fa-signal-messenger{--fa:"\\e663"}.fa-bluesky{--fa:"\\e671"}.fa-jxl{--fa:"\\e67b"}.fa-square-upwork{--fa:"\\e67c"}.fa-web-awesome{--fa:"\\e682"}.fa-square-web-awesome{--fa:"\\e683"}.fa-square-web-awesome-stroke{--fa:"\\e684"}.fa-dart-lang{--fa:"\\e693"}.fa-flutter{--fa:"\\e694"}.fa-files-pinwheel{--fa:"\\e69f"}.fa-css{--fa:"\\e6a2"}.fa-square-bluesky{--fa:"\\e6a3"}.fa-openai{--fa:"\\e7cf"}.fa-square-linkedin{--fa:"\\e7d0"}.fa-cash-app{--fa:"\\e7d4"}.fa-disqus{--fa:"\\e7d5"}.fa-11ty,.fa-eleventy{--fa:"\\e7d6"}.fa-kakao-talk{--fa:"\\e7d7"}.fa-linktree{--fa:"\\e7d8"}.fa-notion{--fa:"\\e7d9"}.fa-pandora{--fa:"\\e7da"}.fa-pixelfed{--fa:"\\e7db"}.fa-tidal{--fa:"\\e7dc"}.fa-vsco{--fa:"\\e7dd"}.fa-w3c{--fa:"\\e7de"}.fa-lumon{--fa:"\\e7e2"}.fa-lumon-drop{--fa:"\\e7e3"}.fa-square-figma{--fa:"\\e7e4"}.fa-tex{--fa:"\\e7ff"}.fa-duolingo{--fa:"\\e812"}.fa-supportnow{--fa:"\\e833"}.fa-tor-browser{--fa:"\\e838"}.fa-typescript{--fa:"\\e840"}.fa-square-deskpro{--fa:"\\e844"}.fa-circle-zulip{--fa:"\\e851"}.fa-julia{--fa:"\\e852"}.fa-zulip{--fa:"\\e853"}.fa-unison{--fa:"\\e854"}.fa-bgg,.fa-board-game-geek{--fa:"\\e855"}.fa-ko-fi{--fa:"\\e856"}.fa-kubernetes{--fa:"\\e857"}.fa-postgresql{--fa:"\\e858"}.fa-scaleway{--fa:"\\e859"}.fa-venmo{--fa:"\\e85a"}.fa-venmo-v{--fa:"\\e85b"}.fa-unreal-engine{--fa:"\\e85c"}.fa-globaleaks{--fa:"\\e85d"}.fa-solana{--fa:"\\e85e"}.fa-threema{--fa:"\\e85f"}.fa-forgejo{--fa:"\\e860"}.fa-claude{--fa:"\\e861"}.fa-gitee{--fa:"\\e863"}.fa-xmpp{--fa:"\\e864"}.fa-fediverse{--fa:"\\e865"}.fa-tailwind-css{--fa:"\\e866"}.fa-arch-linux{--fa:"\\e867"}.fa-svelte{--fa:"\\e868"}.fa-hugging-face{--fa:"\\e869"}.fa-leetcode{--fa:"\\e86a"}.fa-openstreetmap{--fa:"\\e86b"}.fa-ultralytics{--fa:"\\e86d"}.fa-ultralytics-hub{--fa:"\\e86e"}.fa-ultralytics-yolo{--fa:"\\e86f"}.fa-obsidian{--fa:"\\e879"}.fa-zoom{--fa:"\\e87b"}.fa-vim{--fa:"\\e88a"}.fa-symfonycasts{--fa:"\\e8ab"}.fa-build-awesome{--fa:"\\e8ac"}.fa-codeberg{--fa:"\\e8ad"}.fa-devpost{--fa:"\\e8ae"}.fa-internet-archive{--fa:"\\e8b1"}.fa-lets-encrypt{--fa:"\\e8b2"}.fa-matrix{--fa:"\\e8b3"}.fa-mattermost{--fa:"\\e8b4"}.fa-nextcloud{--fa:"\\e8b5"}.fa-roblox-creator-studio{--fa:"\\e8b6"}.fa-square-build-awesome-stroke{--fa:"\\e8b7"}.fa-substack{--fa:"\\e8b8"}.fa-tesla{--fa:"\\e8b9"}.fa-xrp{--fa:"\\e8ba"}.fa-xrpl{--fa:"\\e8bb"}.fa-youtube-shorts{--fa:"\\e8bc"}.fa-ror{--fa:"\\e8bd"}.fa-visual-studio{--fa:"\\e8be"}.fa-dolibarr{--fa:"\\e8bf"}.fa-obs-studio{--fa:"\\e8c0"}.fa-storybook{--fa:"\\e8c1"}.fa-a11y-project{--fa:"\\e8c2"}.fa-copilot{--fa:"\\e8c7"}.fa-square-twitter,.fa-twitter-square{--fa:"\\f081"}.fa-facebook-square,.fa-square-facebook{--fa:"\\f082"}.fa-linkedin{--fa:"\\f08c"}.fa-github-square,.fa-square-github{--fa:"\\f092"}.fa-twitter{--fa:"\\f099"}.fa-facebook{--fa:"\\f09a"}.fa-github{--fa:"\\f09b"}.fa-pinterest{--fa:"\\f0d2"}.fa-pinterest-square,.fa-square-pinterest{--fa:"\\f0d3"}.fa-google-plus-square,.fa-square-google-plus{--fa:"\\f0d4"}.fa-google-plus-g{--fa:"\\f0d5"}.fa-linkedin-in{--fa:"\\f0e1"}.fa-github-alt{--fa:"\\f113"}.fa-maxcdn{--fa:"\\f136"}.fa-html5{--fa:"\\f13b"}.fa-css3{--fa:"\\f13c"}.fa-btc{--fa:"\\f15a"}.fa-youtube{--fa:"\\f167"}.fa-xing{--fa:"\\f168"}.fa-square-xing,.fa-xing-square{--fa:"\\f169"}.fa-dropbox{--fa:"\\f16b"}.fa-stack-overflow{--fa:"\\f16c"}.fa-instagram{--fa:"\\f16d"}.fa-flickr{--fa:"\\f16e"}.fa-adn{--fa:"\\f170"}.fa-bitbucket{--fa:"\\f171"}.fa-tumblr{--fa:"\\f173"}.fa-square-tumblr,.fa-tumblr-square{--fa:"\\f174"}.fa-apple{--fa:"\\f179"}.fa-windows{--fa:"\\f17a"}.fa-android{--fa:"\\f17b"}.fa-linux{--fa:"\\f17c"}.fa-dribbble{--fa:"\\f17d"}.fa-skype{--fa:"\\f17e"}.fa-foursquare{--fa:"\\f180"}.fa-trello{--fa:"\\f181"}.fa-gratipay{--fa:"\\f184"}.fa-vk{--fa:"\\f189"}.fa-weibo{--fa:"\\f18a"}.fa-renren{--fa:"\\f18b"}.fa-pagelines{--fa:"\\f18c"}.fa-stack-exchange{--fa:"\\f18d"}.fa-square-vimeo,.fa-vimeo-square{--fa:"\\f194"}.fa-slack,.fa-slack-hash{--fa:"\\f198"}.fa-wordpress{--fa:"\\f19a"}.fa-openid{--fa:"\\f19b"}.fa-yahoo{--fa:"\\f19e"}.fa-google{--fa:"\\f1a0"}.fa-reddit{--fa:"\\f1a1"}.fa-reddit-square,.fa-square-reddit{--fa:"\\f1a2"}.fa-stumbleupon-circle{--fa:"\\f1a3"}.fa-stumbleupon{--fa:"\\f1a4"}.fa-delicious{--fa:"\\f1a5"}.fa-digg{--fa:"\\f1a6"}.fa-pied-piper-pp{--fa:"\\f1a7"}.fa-pied-piper-alt{--fa:"\\f1a8"}.fa-drupal{--fa:"\\f1a9"}.fa-joomla{--fa:"\\f1aa"}.fa-behance{--fa:"\\f1b4"}.fa-behance-square,.fa-square-behance{--fa:"\\f1b5"}.fa-steam{--fa:"\\f1b6"}.fa-square-steam,.fa-steam-square{--fa:"\\f1b7"}.fa-spotify{--fa:"\\f1bc"}.fa-deviantart{--fa:"\\f1bd"}.fa-soundcloud{--fa:"\\f1be"}.fa-vine{--fa:"\\f1ca"}.fa-codepen{--fa:"\\f1cb"}.fa-jsfiddle{--fa:"\\f1cc"}.fa-rebel{--fa:"\\f1d0"}.fa-empire{--fa:"\\f1d1"}.fa-git-square,.fa-square-git{--fa:"\\f1d2"}.fa-git{--fa:"\\f1d3"}.fa-hacker-news{--fa:"\\f1d4"}.fa-tencent-weibo{--fa:"\\f1d5"}.fa-qq{--fa:"\\f1d6"}.fa-weixin{--fa:"\\f1d7"}.fa-slideshare{--fa:"\\f1e7"}.fa-twitch{--fa:"\\f1e8"}.fa-yelp{--fa:"\\f1e9"}.fa-paypal{--fa:"\\f1ed"}.fa-google-wallet{--fa:"\\f1ee"}.fa-cc-visa{--fa:"\\f1f0"}.fa-cc-mastercard{--fa:"\\f1f1"}.fa-cc-discover{--fa:"\\f1f2"}.fa-cc-amex{--fa:"\\f1f3"}.fa-cc-paypal{--fa:"\\f1f4"}.fa-cc-stripe{--fa:"\\f1f5"}.fa-lastfm{--fa:"\\f202"}.fa-lastfm-square,.fa-square-lastfm{--fa:"\\f203"}.fa-ioxhost{--fa:"\\f208"}.fa-angellist{--fa:"\\f209"}.fa-buysellads{--fa:"\\f20d"}.fa-connectdevelop{--fa:"\\f20e"}.fa-dashcube{--fa:"\\f210"}.fa-forumbee{--fa:"\\f211"}.fa-leanpub{--fa:"\\f212"}.fa-sellsy{--fa:"\\f213"}.fa-shirtsinbulk{--fa:"\\f214"}.fa-simplybuilt{--fa:"\\f215"}.fa-skyatlas{--fa:"\\f216"}.fa-pinterest-p{--fa:"\\f231"}.fa-whatsapp{--fa:"\\f232"}.fa-viacoin{--fa:"\\f237"}.fa-medium,.fa-medium-m{--fa:"\\f23a"}.fa-y-combinator{--fa:"\\f23b"}.fa-optin-monster{--fa:"\\f23c"}.fa-opencart{--fa:"\\f23d"}.fa-expeditedssl{--fa:"\\f23e"}.fa-cc-jcb{--fa:"\\f24b"}.fa-cc-diners-club{--fa:"\\f24c"}.fa-creative-commons{--fa:"\\f25e"}.fa-gg{--fa:"\\f260"}.fa-gg-circle{--fa:"\\f261"}.fa-odnoklassniki{--fa:"\\f263"}.fa-odnoklassniki-square,.fa-square-odnoklassniki{--fa:"\\f264"}.fa-get-pocket{--fa:"\\f265"}.fa-wikipedia-w{--fa:"\\f266"}.fa-safari{--fa:"\\f267"}.fa-chrome{--fa:"\\f268"}.fa-firefox{--fa:"\\f269"}.fa-opera{--fa:"\\f26a"}.fa-internet-explorer{--fa:"\\f26b"}.fa-contao{--fa:"\\f26d"}.fa-500px{--fa:"\\f26e"}.fa-amazon{--fa:"\\f270"}.fa-houzz{--fa:"\\f27c"}.fa-vimeo-v{--fa:"\\f27d"}.fa-black-tie{--fa:"\\f27e"}.fa-fonticons{--fa:"\\f280"}.fa-reddit-alien{--fa:"\\f281"}.fa-edge{--fa:"\\f282"}.fa-codiepie{--fa:"\\f284"}.fa-modx{--fa:"\\f285"}.fa-fort-awesome{--fa:"\\f286"}.fa-usb{--fa:"\\f287"}.fa-product-hunt{--fa:"\\f288"}.fa-mixcloud{--fa:"\\f289"}.fa-scribd{--fa:"\\f28a"}.fa-bluetooth{--fa:"\\f293"}.fa-bluetooth-b{--fa:"\\f294"}.fa-gitlab{--fa:"\\f296"}.fa-wpbeginner{--fa:"\\f297"}.fa-wpforms{--fa:"\\f298"}.fa-envira{--fa:"\\f299"}.fa-glide{--fa:"\\f2a5"}.fa-glide-g{--fa:"\\f2a6"}.fa-viadeo{--fa:"\\f2a9"}.fa-square-viadeo,.fa-viadeo-square{--fa:"\\f2aa"}.fa-snapchat,.fa-snapchat-ghost{--fa:"\\f2ab"}.fa-snapchat-square,.fa-square-snapchat{--fa:"\\f2ad"}.fa-pied-piper{--fa:"\\f2ae"}.fa-first-order{--fa:"\\f2b0"}.fa-yoast{--fa:"\\f2b1"}.fa-themeisle{--fa:"\\f2b2"}.fa-google-plus{--fa:"\\f2b3"}.fa-font-awesome,.fa-font-awesome-flag,.fa-font-awesome-logo-full{--fa:"\\f2b4"}.fa-linode{--fa:"\\f2b8"}.fa-quora{--fa:"\\f2c4"}.fa-free-code-camp{--fa:"\\f2c5"}.fa-telegram,.fa-telegram-plane{--fa:"\\f2c6"}.fa-bandcamp{--fa:"\\f2d5"}.fa-grav{--fa:"\\f2d6"}.fa-etsy{--fa:"\\f2d7"}.fa-imdb{--fa:"\\f2d8"}.fa-ravelry{--fa:"\\f2d9"}.fa-sellcast{--fa:"\\f2da"}.fa-superpowers{--fa:"\\f2dd"}.fa-wpexplorer{--fa:"\\f2de"}.fa-meetup{--fa:"\\f2e0"}.fa-font-awesome-alt,.fa-square-font-awesome-stroke{--fa:"\\f35c"}.fa-accessible-icon{--fa:"\\f368"}.fa-accusoft{--fa:"\\f369"}.fa-adversal{--fa:"\\f36a"}.fa-affiliatetheme{--fa:"\\f36b"}.fa-algolia{--fa:"\\f36c"}.fa-amilia{--fa:"\\f36d"}.fa-angrycreative{--fa:"\\f36e"}.fa-app-store{--fa:"\\f36f"}.fa-app-store-ios{--fa:"\\f370"}.fa-apper{--fa:"\\f371"}.fa-asymmetrik{--fa:"\\f372"}.fa-audible{--fa:"\\f373"}.fa-avianex{--fa:"\\f374"}.fa-aws{--fa:"\\f375"}.fa-bimobject{--fa:"\\f378"}.fa-bitcoin{--fa:"\\f379"}.fa-bity{--fa:"\\f37a"}.fa-blackberry{--fa:"\\f37b"}.fa-blogger{--fa:"\\f37c"}.fa-blogger-b{--fa:"\\f37d"}.fa-buromobelexperte{--fa:"\\f37f"}.fa-centercode{--fa:"\\f380"}.fa-cloudscale{--fa:"\\f383"}.fa-cloudsmith{--fa:"\\f384"}.fa-cloudversify{--fa:"\\f385"}.fa-cpanel{--fa:"\\f388"}.fa-css3-alt{--fa:"\\f38b"}.fa-cuttlefish{--fa:"\\f38c"}.fa-d-and-d{--fa:"\\f38d"}.fa-deploydog{--fa:"\\f38e"}.fa-deskpro{--fa:"\\f38f"}.fa-digital-ocean{--fa:"\\f391"}.fa-discord{--fa:"\\f392"}.fa-discourse{--fa:"\\f393"}.fa-dochub{--fa:"\\f394"}.fa-docker{--fa:"\\f395"}.fa-draft2digital{--fa:"\\f396"}.fa-dribbble-square,.fa-square-dribbble{--fa:"\\f397"}.fa-dyalog{--fa:"\\f399"}.fa-earlybirds{--fa:"\\f39a"}.fa-erlang{--fa:"\\f39d"}.fa-facebook-f{--fa:"\\f39e"}.fa-facebook-messenger{--fa:"\\f39f"}.fa-firstdraft{--fa:"\\f3a1"}.fa-fonticons-fi{--fa:"\\f3a2"}.fa-fort-awesome-alt{--fa:"\\f3a3"}.fa-freebsd{--fa:"\\f3a4"}.fa-gitkraken{--fa:"\\f3a6"}.fa-gofore{--fa:"\\f3a7"}.fa-goodreads{--fa:"\\f3a8"}.fa-goodreads-g{--fa:"\\f3a9"}.fa-google-drive{--fa:"\\f3aa"}.fa-google-play{--fa:"\\f3ab"}.fa-gripfire{--fa:"\\f3ac"}.fa-grunt{--fa:"\\f3ad"}.fa-gulp{--fa:"\\f3ae"}.fa-hacker-news-square,.fa-square-hacker-news{--fa:"\\f3af"}.fa-hire-a-helper{--fa:"\\f3b0"}.fa-hotjar{--fa:"\\f3b1"}.fa-hubspot{--fa:"\\f3b2"}.fa-itunes{--fa:"\\f3b4"}.fa-itunes-note{--fa:"\\f3b5"}.fa-jenkins{--fa:"\\f3b6"}.fa-joget{--fa:"\\f3b7"}.fa-js{--fa:"\\f3b8"}.fa-js-square,.fa-square-js{--fa:"\\f3b9"}.fa-keycdn{--fa:"\\f3ba"}.fa-kickstarter,.fa-square-kickstarter{--fa:"\\f3bb"}.fa-kickstarter-k{--fa:"\\f3bc"}.fa-laravel{--fa:"\\f3bd"}.fa-line{--fa:"\\f3c0"}.fa-lyft{--fa:"\\f3c3"}.fa-magento{--fa:"\\f3c4"}.fa-medapps{--fa:"\\f3c6"}.fa-medrt{--fa:"\\f3c8"}.fa-microsoft{--fa:"\\f3ca"}.fa-mix{--fa:"\\f3cb"}.fa-mizuni{--fa:"\\f3cc"}.fa-monero{--fa:"\\f3d0"}.fa-napster{--fa:"\\f3d2"}.fa-node-js{--fa:"\\f3d3"}.fa-npm{--fa:"\\f3d4"}.fa-ns8{--fa:"\\f3d5"}.fa-nutritionix{--fa:"\\f3d6"}.fa-page4{--fa:"\\f3d7"}.fa-palfed{--fa:"\\f3d8"}.fa-patreon{--fa:"\\f3d9"}.fa-periscope{--fa:"\\f3da"}.fa-phabricator{--fa:"\\f3db"}.fa-phoenix-framework{--fa:"\\f3dc"}.fa-playstation{--fa:"\\f3df"}.fa-pushed{--fa:"\\f3e1"}.fa-python{--fa:"\\f3e2"}.fa-red-river{--fa:"\\f3e3"}.fa-rendact,.fa-wpressr{--fa:"\\f3e4"}.fa-replyd{--fa:"\\f3e6"}.fa-resolving{--fa:"\\f3e7"}.fa-rocketchat{--fa:"\\f3e8"}.fa-rockrms{--fa:"\\f3e9"}.fa-schlix{--fa:"\\f3ea"}.fa-searchengin{--fa:"\\f3eb"}.fa-servicestack{--fa:"\\f3ec"}.fa-sistrix{--fa:"\\f3ee"}.fa-speakap{--fa:"\\f3f3"}.fa-staylinked{--fa:"\\f3f5"}.fa-steam-symbol{--fa:"\\f3f6"}.fa-sticker-mule{--fa:"\\f3f7"}.fa-studiovinari{--fa:"\\f3f8"}.fa-supple{--fa:"\\f3f9"}.fa-uber{--fa:"\\f402"}.fa-uikit{--fa:"\\f403"}.fa-uniregistry{--fa:"\\f404"}.fa-untappd{--fa:"\\f405"}.fa-ussunnah{--fa:"\\f407"}.fa-vaadin{--fa:"\\f408"}.fa-viber{--fa:"\\f409"}.fa-vimeo{--fa:"\\f40a"}.fa-vnv{--fa:"\\f40b"}.fa-square-whatsapp,.fa-whatsapp-square{--fa:"\\f40c"}.fa-whmcs{--fa:"\\f40d"}.fa-wordpress-simple{--fa:"\\f411"}.fa-xbox{--fa:"\\f412"}.fa-yandex{--fa:"\\f413"}.fa-yandex-international{--fa:"\\f414"}.fa-apple-pay{--fa:"\\f415"}.fa-cc-apple-pay{--fa:"\\f416"}.fa-fly{--fa:"\\f417"}.fa-node{--fa:"\\f419"}.fa-osi{--fa:"\\f41a"}.fa-react{--fa:"\\f41b"}.fa-autoprefixer{--fa:"\\f41c"}.fa-less{--fa:"\\f41d"}.fa-sass{--fa:"\\f41e"}.fa-vuejs{--fa:"\\f41f"}.fa-angular{--fa:"\\f420"}.fa-aviato{--fa:"\\f421"}.fa-ember{--fa:"\\f423"}.fa-gitter{--fa:"\\f426"}.fa-hooli{--fa:"\\f427"}.fa-strava{--fa:"\\f428"}.fa-stripe{--fa:"\\f429"}.fa-stripe-s{--fa:"\\f42a"}.fa-typo3{--fa:"\\f42b"}.fa-amazon-pay{--fa:"\\f42c"}.fa-cc-amazon-pay{--fa:"\\f42d"}.fa-ethereum{--fa:"\\f42e"}.fa-korvue{--fa:"\\f42f"}.fa-elementor{--fa:"\\f430"}.fa-square-youtube,.fa-youtube-square{--fa:"\\f431"}.fa-flipboard{--fa:"\\f44d"}.fa-hips{--fa:"\\f452"}.fa-php{--fa:"\\f457"}.fa-quinscape{--fa:"\\f459"}.fa-readme{--fa:"\\f4d5"}.fa-java{--fa:"\\f4e4"}.fa-pied-piper-hat{--fa:"\\f4e5"}.fa-creative-commons-by{--fa:"\\f4e7"}.fa-creative-commons-nc{--fa:"\\f4e8"}.fa-creative-commons-nc-eu{--fa:"\\f4e9"}.fa-creative-commons-nc-jp{--fa:"\\f4ea"}.fa-creative-commons-nd{--fa:"\\f4eb"}.fa-creative-commons-pd{--fa:"\\f4ec"}.fa-creative-commons-pd-alt{--fa:"\\f4ed"}.fa-creative-commons-remix{--fa:"\\f4ee"}.fa-creative-commons-sa{--fa:"\\f4ef"}.fa-creative-commons-sampling{--fa:"\\f4f0"}.fa-creative-commons-sampling-plus{--fa:"\\f4f1"}.fa-creative-commons-share{--fa:"\\f4f2"}.fa-creative-commons-zero{--fa:"\\f4f3"}.fa-ebay{--fa:"\\f4f4"}.fa-keybase{--fa:"\\f4f5"}.fa-mastodon{--fa:"\\f4f6"}.fa-r-project{--fa:"\\f4f7"}.fa-researchgate{--fa:"\\f4f8"}.fa-teamspeak{--fa:"\\f4f9"}.fa-first-order-alt{--fa:"\\f50a"}.fa-fulcrum{--fa:"\\f50b"}.fa-galactic-republic{--fa:"\\f50c"}.fa-galactic-senate{--fa:"\\f50d"}.fa-jedi-order{--fa:"\\f50e"}.fa-mandalorian{--fa:"\\f50f"}.fa-old-republic{--fa:"\\f510"}.fa-phoenix-squadron{--fa:"\\f511"}.fa-sith{--fa:"\\f512"}.fa-trade-federation{--fa:"\\f513"}.fa-wolf-pack-battalion{--fa:"\\f514"}.fa-hornbill{--fa:"\\f592"}.fa-mailchimp{--fa:"\\f59e"}.fa-megaport{--fa:"\\f5a3"}.fa-nimblr{--fa:"\\f5a8"}.fa-rev{--fa:"\\f5b2"}.fa-shopware{--fa:"\\f5b5"}.fa-squarespace{--fa:"\\f5be"}.fa-themeco{--fa:"\\f5c6"}.fa-weebly{--fa:"\\f5cc"}.fa-wix{--fa:"\\f5cf"}.fa-ello{--fa:"\\f5f1"}.fa-hackerrank{--fa:"\\f5f7"}.fa-kaggle{--fa:"\\f5fa"}.fa-markdown{--fa:"\\f60f"}.fa-neos{--fa:"\\f612"}.fa-zhihu{--fa:"\\f63f"}.fa-alipay{--fa:"\\f642"}.fa-the-red-yeti{--fa:"\\f69d"}.fa-critical-role{--fa:"\\f6c9"}.fa-d-and-d-beyond{--fa:"\\f6ca"}.fa-dev{--fa:"\\f6cc"}.fa-fantasy-flight-games{--fa:"\\f6dc"}.fa-wizards-of-the-coast{--fa:"\\f730"}.fa-think-peaks{--fa:"\\f731"}.fa-reacteurope{--fa:"\\f75d"}.fa-artstation{--fa:"\\f77a"}.fa-atlassian{--fa:"\\f77b"}.fa-canadian-maple-leaf{--fa:"\\f785"}.fa-centos{--fa:"\\f789"}.fa-confluence{--fa:"\\f78d"}.fa-dhl{--fa:"\\f790"}.fa-diaspora{--fa:"\\f791"}.fa-fedex{--fa:"\\f797"}.fa-fedora{--fa:"\\f798"}.fa-figma{--fa:"\\f799"}.fa-intercom{--fa:"\\f7af"}.fa-invision{--fa:"\\f7b0"}.fa-jira{--fa:"\\f7b1"}.fa-mendeley{--fa:"\\f7b3"}.fa-raspberry-pi{--fa:"\\f7bb"}.fa-redhat{--fa:"\\f7bc"}.fa-sketch{--fa:"\\f7c6"}.fa-sourcetree{--fa:"\\f7d3"}.fa-suse{--fa:"\\f7d6"}.fa-ubuntu{--fa:"\\f7df"}.fa-ups{--fa:"\\f7e0"}.fa-usps{--fa:"\\f7e1"}.fa-yarn{--fa:"\\f7e3"}.fa-airbnb{--fa:"\\f834"}.fa-battle-net{--fa:"\\f835"}.fa-bootstrap{--fa:"\\f836"}.fa-buffer{--fa:"\\f837"}.fa-chromecast{--fa:"\\f838"}.fa-evernote{--fa:"\\f839"}.fa-itch-io{--fa:"\\f83a"}.fa-salesforce{--fa:"\\f83b"}.fa-speaker-deck{--fa:"\\f83c"}.fa-symfony{--fa:"\\f83d"}.fa-waze{--fa:"\\f83f"}.fa-yammer{--fa:"\\f840"}.fa-git-alt{--fa:"\\f841"}.fa-stackpath{--fa:"\\f842"}.fa-cotton-bureau{--fa:"\\f89e"}.fa-buy-n-large{--fa:"\\f8a6"}.fa-mdb{--fa:"\\f8ca"}.fa-orcid{--fa:"\\f8d2"}.fa-swift{--fa:"\\f8e1"}.fa-umbraco{--fa:"\\f8e8"}:host,:root{--fa-font-regular:normal 400 1em/1 var(--fa-family-classic)}@font-face{font-family:"Font Awesome 7 Free";font-style:normal;font-weight:400;font-display:block;src:url(../webfonts/fa-regular-400.woff2)}.far{--fa-family:var(--fa-family-classic)}.fa-regular,.far{--fa-style:400}:host,:root{--fa-family-classic:"Font Awesome 7 Free";--fa-font-solid:normal 900 1em/1 var(--fa-family-classic);--fa-style-family-classic:var(--fa-family-classic)}@font-face{font-family:"Font Awesome 7 Free";font-style:normal;font-weight:900;font-display:block;src:url(../webfonts/fa-solid-900.woff2)}.fas{--fa-style:900}.fa-classic,.fas{--fa-family:var(--fa-family-classic)}.fa-solid{--fa-style:900}@font-face{font-family:"Font Awesome 5 Brands";font-display:block;font-weight:400;src:url(../webfonts/fa-brands-400.woff2) format("woff2")}@font-face{font-family:"Font Awesome 5 Free";font-display:block;font-weight:900;src:url(../webfonts/fa-solid-900.woff2) format("woff2")}@font-face{font-family:"Font Awesome 5 Free";font-display:block;font-weight:400;src:url(../webfonts/fa-regular-400.woff2) format("woff2")}@font-face{font-family:"FontAwesome";font-display:block;src:url(../webfonts/fa-solid-900.woff2) format("woff2")}@font-face{font-family:"FontAwesome";font-display:block;src:url(../webfonts/fa-brands-400.woff2) format("woff2")}@font-face{font-family:"FontAwesome";font-display:block;src:url(../webfonts/fa-regular-400.woff2) format("woff2");unicode-range:u+f003,u+f006,u+f014,u+f016-f017,u+f01a-f01b,u+f01d,u+f022,u+f03e,u+f044,u+f046,u+f05c-f05d,u+f06e,u+f070,u+f087-f088,u+f08a,u+f094,u+f096-f097,u+f09d,u+f0a0,u+f0a2,u+f0a4-f0a7,u+f0c5,u+f0c7,u+f0e5-f0e6,u+f0eb,u+f0f6-f0f8,u+f10c,u+f114-f115,u+f118-f11a,u+f11c-f11d,u+f133,u+f147,u+f14e,u+f150-f152,u+f185-f186,u+f18e,u+f190-f192,u+f196,u+f1c1-f1c9,u+f1d9,u+f1db,u+f1e3,u+f1ea,u+f1f7,u+f1f9,u+f20a,u+f247-f248,u+f24a,u+f24d,u+f255-f25b,u+f25d,u+f271-f274,u+f278,u+f27b,u+f28c,u+f28e,u+f29c,u+f2b5,u+f2b7,u+f2ba,u+f2bc,u+f2be,u+f2c0-f2c1,u+f2c3,u+f2d0,u+f2d2,u+f2d4,u+f2dc}@font-face{font-family:"FontAwesome";font-display:block;src:url(../webfonts/fa-v4compatibility.woff2) format("woff2");unicode-range:u+f041,u+f047,u+f065-f066,u+f07d-f07e,u+f080,u+f08b,u+f08e,u+f090,u+f09a,u+f0ac,u+f0ae,u+f0b2,u+f0d0,u+f0d6,u+f0e4,u+f0ec,u+f10a-f10b,u+f123,u+f13e,u+f148-f149,u+f14c,u+f156,u+f15e,u+f160-f161,u+f163,u+f175-f178,u+f195,u+f1f8,u+f219,u+f27a}`,st=``+new URL(`./assets/fa-brands-400-Bs6tcqqs.woff2`,import.meta.url).href,ct=``+new URL(`./assets/fa-regular-400-DRN8N0d1.woff2`,import.meta.url).href,lt=``+new URL(`./assets/fa-solid-900-IAB4Droh.woff2`,import.meta.url).href,ut=``+new URL(`./assets/fa-v4compatibility-CErXDOsT.woff2`,import.meta.url).href,dt=`salsafx:fontawesome`,ft=Je(ot,{"../webfonts/fa-brands-400.woff2":st,"../webfonts/fa-regular-400.woff2":ct,"../webfonts/fa-solid-900.woff2":lt,"../webfonts/fa-v4compatibility.woff2":ut}),pt={FontAwesome:dt,MaterialDesign:`https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css`,MaterialSymbols:`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0`,Lucide:`https://cdn.jsdelivr.net/npm/lucide-static@0.468.0/font/lucide.css`,Phosphor:`https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css`,Tabler:`https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css`},mt={[pt.FontAwesome]:ft},ht=class{defaultConfig(){return{iconPacks:[]}}resolvePack(e){let t=e in pt?pt[e]:e;return{href:t,id:`fx-icons-${nt(t)}`}}markAsIconPack(e){return e.setAttribute(`data-fx-icon-pack`,``),e}assignIconPack(e,t){return et(e,e=>Object.assign(e,{id:t.id,rel:`stylesheet`,href:t.href}),e=>this.markAsIconPack(e))}ensureStylePack(e,t){if(typeof document<`u`){let n=document.getElementById(e.id);y(n)?document.head.appendChild(u.style({id:e.id,"data-fx-icon-pack":``,textContent:t})):n instanceof HTMLStyleElement?(n.setAttribute(`data-fx-icon-pack`,``),n.textContent=t):(n.remove(),this.ensureStylePack(e,t))}}ensureIconPack(e){let t=mt[e.href];if(t)this.ensureStylePack(e,t);else if(typeof document<`u`){let t=document.getElementById(e.id);y(t)?document.head.appendChild(u.link({id:e.id,rel:`stylesheet`,href:e.href,"data-fx-icon-pack":``})):this.assignIconPack(t,e)}}createConfig(e){return y(e.iconPacks)?{}:{iconPacks:e.iconPacks.map(e=>this.resolvePack(e))}}applyConfig(e){if(typeof document<`u`){let t=new Set(e.iconPacks.map(e=>e.id));for(let e of document.querySelectorAll(`[data-fx-icon-pack]`))t.has(e.id)||e.remove();for(let t of e.iconPacks)this.ensureIconPack(t)}}},gt={FxDisplay:{silver:{"--fx-theme-display-shell-background":`#1e293b`,"--fx-theme-display-shell-border":`#334155`},darkblue:{"--fx-theme-display-shell-background":`#0b111f`,"--fx-theme-display-shell-border":`#334155`}},FxSwitch:{snow:{"--fx-theme-switch-track-color":`#ffffff`,"--fx-theme-switch-border-color":`#e5e7eb`,"--fx-theme-switch-text-inactive":`#374151`,"--fx-theme-switch-text-hover":`#111827`,"--fx-theme-switch-divider-color":`#e5e7eb`},silver:{"--fx-theme-switch-track-color":`#1e293b`,"--fx-theme-switch-border-color":`#334155`,"--fx-theme-switch-text-inactive":`#94a3b8`,"--fx-theme-switch-text-hover":`#f8fafc`,"--fx-theme-switch-divider-color":`#475569`}},FxLinearTrackElement:{silver:{"--fx-theme-linear-shell-background":`#1e293b`},dark:{"--fx-theme-linear-shell-background":`#080b10`}},FxRadialGauge:{silver:{"--fx-theme-radial-gauge-shell-fill":`#1e293b`},dark:{"--fx-theme-radial-gauge-shell-fill":`#080b10`}},FxPotentiometer:{silver:{"--fx-theme-potentiometer-bezel-fill":`#1e293b`,"--fx-theme-potentiometer-bezel-stroke":`#334155`,"--fx-theme-potentiometer-knob":`#1e293b`,"--fx-theme-potentiometer-knob-ring":`#334155`},dark:{"--fx-theme-potentiometer-bezel-fill":`#080b10`,"--fx-theme-potentiometer-bezel-stroke":`#12161e`,"--fx-theme-potentiometer-knob":`#080b10`,"--fx-theme-potentiometer-knob-ring":`#1f2937`}},FxCard:{silver:{"--fx-theme-card-background":`#1e293b`},darkgreen:{"--fx-theme-card-background":`#131920`},iron:{"--fx-theme-card-background":`#111827`},dark:{"--fx-theme-card-background":`#080b10`},darkblue:{"--fx-theme-card-background":`#0b111f`},darkergreen:{"--fx-theme-card-background":`#0c0e12`},snow:{"--fx-theme-card-background":`#ffffff`}},FxGroupBox:{silver:{"--fx-theme-group-box-background":`#1e293b`,"--fx-theme-group-box-border":`1px solid #334155`},darkgreen:{"--fx-theme-group-box-background":`#131920`,"--fx-theme-group-box-border":`1px solid #1f2937`},iron:{"--fx-theme-group-box-background":`#111827`,"--fx-theme-group-box-border":`1px solid #1f2937`},dark:{"--fx-theme-group-box-background":`#080b10`,"--fx-theme-group-box-border":`1px solid #12161e`},darkblue:{"--fx-theme-group-box-background":`#0b111f`,"--fx-theme-group-box-border":`1px solid #334155`},darkergreen:{"--fx-theme-group-box-background":`#0c0e12`,"--fx-theme-group-box-border":`1px solid #18222e`},snow:{"--fx-theme-group-box-background":`#ffffff`,"--fx-theme-group-box-border":`1px solid #e5e7eb`}},FxTabs:{darkgreen:{"--fx-tabs-background":`#131920`,"--fx-tabs-nav-background":`#0c0e12`,"--fx-tabs-nav-border":`#2a3a4a`},iron:{"--fx-tabs-background":`#111827`,"--fx-tabs-nav-background":`#0c0e12`,"--fx-tabs-nav-border":`#1f2937`},darkergreen:{"--fx-tabs-background":`#0c0e12`,"--fx-tabs-nav-background":`#080b10`,"--fx-tabs-nav-border":`#2a3a4a`}}},_t=[`silver`,`darkgreen`,`iron`,`dark`,`darkblue`,`darkergreen`,`snow`],b={fromAttribute:e=>_t.includes(e)?e:void 0,toAttribute:e=>e??null},vt={FxDisplay:`darkblue`,FxSwitch:`silver`,FxLinearTrackElement:`dark`,FxRadialGauge:`silver`,FxPotentiometer:`silver`,FxCard:`iron`,FxGroupBox:`iron`,FxTabs:`darkergreen`},yt={start:`#06b6d4`,middle:`#6366f1`,end:`#a855f7`},bt={Default:{components:{...vt},gradients:{...yt}},SilverBlue:{components:{FxDisplay:`darkblue`,FxSwitch:`silver`,FxLinearTrackElement:`silver`,FxRadialGauge:`silver`,FxPotentiometer:`silver`,FxCard:`iron`,FxGroupBox:`iron`,FxTabs:`darkergreen`},gradients:{...yt}},DarkGreen:{components:{FxDisplay:`darkblue`,FxSwitch:`silver`,FxLinearTrackElement:`dark`,FxRadialGauge:`dark`,FxPotentiometer:`dark`,FxCard:`darkgreen`,FxGroupBox:`darkgreen`,FxTabs:`darkergreen`},gradients:{start:`#fde68a`,middle:`#f59e0b`,end:`#ea580c`}}},xt=class{defaultConfig(){return{theme:{components:{...vt},gradients:{...yt}}}}resolveTheme(e){return typeof e==`string`?bt[e]:e}createConfig(e,t){if(y(e.theme))return{};{let n=this.resolveTheme(e.theme);return{theme:{components:{...t.theme?.components??vt,...n.components},gradients:{...t.theme?.gradients??yt,...n.gradients}}}}}applyTokens(e){if(typeof document<`u`){let t=document.documentElement;for(let[n,r]of Object.entries(e))t.style.setProperty(n,r)}}applyGradients(e){this.applyTokens({"--fx-theme-gradient-start":e.start,"--fx-theme-gradient-middle":e.middle,"--fx-theme-gradient-end":e.end})}applyConfig(e){this.applyGradients(e.theme.gradients);for(let t of Object.keys(gt)){let n=e.theme.components[t],r=gt[t],i=r[n]??r[vt[t]];y(i)||this.applyTokens(i)}}},St;(function(e){e.normalizeLength=(e,t=``)=>{if(typeof e==`number`&&Number.isFinite(e))return`${e}px`;{let n=String(e).trim();return n?/^\d+(\.\d+)?$/.test(n)?`${n}px`:n:t}}})(St||={});function Ct(e){switch(e){case`modern`:me(Xe.Oxanium);break;case`segmented`:me(Ze.Segmented)}}var wt={fromAttribute:e=>{switch(e){case`classic`:case`modern`:case`segmented`:return e;default:return`segmented`}},toAttribute:e=>e===`segmented`?null:e},Tt={fromAttribute:e=>{switch(e){case`row`:case`labeled`:case`column`:return e;default:return`labeled`}},toAttribute:e=>e===`labeled`?null:e},Et={fromAttribute:e=>{switch(e){case`left`:case`center`:case`right`:case`space-between`:case`space-around`:return e;default:return`center`}},toAttribute:e=>e===`center`?null:e},Dt=[`x-small`,`small`,`medium`,`large`,`x-large`,`xx-large`],Ot=new Set(Dt);function kt(e){let t=typeof e==`string`?e.trim():e;return typeof t==`string`&&Ot.has(t)?null:St.normalizeLength(e)||null}function At(e){let t=kt(e);return t?`
        --fx-display-value-size: ${t};
        --fx-display-label-size: calc(${t} * 0.22);
        --fx-display-region-gap: calc(${t} * 0.08);
        --fx-display-region-padding: calc(${t} * 0.08);
        --fx-display-shell-pad: calc(${t} * 0.12);
        --fx-display-shell-radius: calc(${t} * 0.16);
    `:``}var jt=function(e){return e.Lime=`#84cc16`,e.Orange=`#f97316`,e.Navy=`#1e3a8a`,e.Imperial=`#66023C`,e.Yellow=`#eab308`,e.Turquoise=`#00D9B5`,e.Fuchsia=`#d946ef`,e.Red=`#FF0000`,e.Skyblue=`#87CEEB`,e.Darkgreen=`#15803d`,e}({}),Mt=Object.keys(jt).map(e=>jt[e]),Nt=Object.keys(jt).map(e=>({key:e,color:jt[e]})),Pt=new Map(Nt.flatMap(e=>[[e.key,e.color],[e.key.toLowerCase(),e.color]]));function Ft(e,t,n){let r=t/100,i=n/100,a=(1-Math.abs(2*i-1))*r,o=a*(1-Math.abs(e/60%2-1)),s=i-a/2,c=0,l=0,u=0;e<60?(c=a,l=o):e<120?(c=o,l=a):e<180?(l=a,u=o):e<240?(l=o,u=a):e<300?(c=o,u=a):(c=a,u=o);let d=e=>Math.round((e+s)*255).toString(16).padStart(2,`0`);return`#${d(c)}${d(l)}${d(u)}`}function It(e){return Ft(e*137.508%360,68+e%3*8,46+e%4*5)}function Lt(e){return Mt[e]??It(Math.max(e,0)-Mt.length)}function Rt(e,t=0){let n=(e??``).trim();return n?Pt.get(n)??Pt.get(n.toLowerCase())??n:Lt(t)}var x=function(e){return e[e.Primary=0]=`Primary`,e[e.Secondary=1]=`Secondary`,e[e.Success=2]=`Success`,e[e.Danger=3]=`Danger`,e[e.Warning=4]=`Warning`,e[e.Info=5]=`Info`,e[e.Light=6]=`Light`,e[e.Dark=7]=`Dark`,e}({}),zt={0:`fa-solid fa-flag`,1:`fa-solid fa-ellipsis`,2:`fa-solid fa-circle-check`,3:`fa-solid fa-circle-xmark`,4:`fa-solid fa-triangle-exclamation`,5:`fa-solid fa-circle-info`,6:`fa-solid fa-sun`,7:`fa-solid fa-moon`},Bt={0:{background:`#0c1420`,foreground:`#93c5fd`,border:`#3b82f6`},1:{background:`#121418`,foreground:`#cbd5e1`,border:`#64748b`},2:{background:`#0a140e`,foreground:`#86efac`,border:`#22c55e`},3:{background:`#14090b`,foreground:`#f0b4b4`,border:`#ef4444`},4:{background:`#141008`,foreground:`#f0d48a`,border:`#f59e0b`},5:{background:`#0a1418`,foreground:`#7dd3fc`,border:`#38bdf8`},6:{background:`#1a1c20`,foreground:`#e5e7eb`,border:`#d1d5db`},7:{background:`#0a0c10`,foreground:`#94a3b8`,border:`#475569`}};(function(e){e.coerce=e=>{if(typeof e==`number`)return typeof x[e]==`string`?e:void 0;if(typeof e==`string`)return x.tryParse(e)},e.toString=e=>{let t=x.coerce(e);if(typeof t==`number`)return x[t].toLowerCase();throw Error(`Unknown variant`)},e.toColors=e=>{let t=x.coerce(e);if(typeof t==`number`)return Bt[t];throw Error(`Unknown variant`)},e.toIcon=e=>{let t=x.coerce(e);if(typeof t==`number`)return zt[t];throw Error(`Unknown variant`)},e.tryParse=e=>{if(e){let t=e.trim().toLowerCase();if(t)for(let e of Object.keys(x)){let n=x[e];if(typeof n==`number`&&e.toLowerCase()===t)return n}}else return},e.reflectOptional={fromAttribute:e=>x.tryParse(e),toAttribute:e=>{let t=x.coerce(e);return typeof t==`number`?x.toString(t):null}},e.resolvedColor=(e,t,n,r=`border`)=>{let i=e.trim();if(i)return i;{let e=x.coerce(t);return typeof e==`number`?x.toColors(e)[r]:n}},e.parse=e=>{let t=x.tryParse(e);if(typeof t==`number`)return t;throw Error(`Unknown variant`)}})(x||={});var Vt=new f,Ht=Object.freeze({use:e=>(Vt.use(e),Ht),configure:(e={})=>(Vt.configure(e),Ht),apply:()=>(Vt.apply(),Ht),get configuration(){return Vt.configuration},get defaults(){return Vt.defaults},Fonts:Object.freeze(Xe),DisplayFonts:Object.freeze(Ze),Themes:Object.freeze(bt),IconPacks:Object.freeze(pt)});Ht.use(new at).use(new ht).use(new xt),typeof document<`u`&&Ht.apply();function S(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Ut=new CSSStyleSheet;Ut.replaceSync(`
:host([disabled]) {
    opacity: 0.5 !important;
    cursor: not-allowed;
    pointer-events: none;
}
`);var C=class extends e{constructor(...e){super(...e),this.disabled=!1}static{this.styles=t`
        :host([disabled]) {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }
    `}createRenderRoot(){let e=super.createRenderRoot();return e instanceof ShadowRoot&&!e.adoptedStyleSheets.includes(Ut)&&(e.adoptedStyleSheets=[...e.adoptedStyleSheets,Ut]),e}updated(e){super.updated(e),e.has(`disabled`)&&(this.disabled?this.setAttribute(`aria-disabled`,`true`):this.removeAttribute(`aria-disabled`))}};S([o({type:Boolean,reflect:!0})],C.prototype,`disabled`,void 0);var w=class extends C{constructor(...e){super(...e),this.value=0,this.min=0,this.max=100,this.label=``,this.unit=``,this.hasValueDisplay=!0}get progress(){let{min:e,max:t,value:n}=this,r=t-e;return r===0?0:(Math.min(Math.max(n,e),t)-e)/r}};S([o({type:Number})],w.prototype,`value`,void 0),S([o({type:Number})],w.prototype,`min`,void 0),S([o({type:Number})],w.prototype,`max`,void 0),S([o({type:String})],w.prototype,`label`,void 0),S([o({type:String})],w.prototype,`unit`,void 0),S([o({type:Boolean,attribute:`has-value-display`,reflect:!0})],w.prototype,`hasValueDisplay`,void 0);var T=e=>{class t extends e{constructor(...e){super(...e),this.isAnimated=!0}}return S([o({type:Boolean,attribute:`is-animated`,reflect:!0})],t.prototype,`isAnimated`,void 0),t};function Wt(e){return!!e&&typeof e.isAnimated==`boolean`}var Gt=e=>{class t extends e{constructor(...e){super(...e),this.hasShell=!1}}return S([o({type:Boolean,attribute:`has-shell`,reflect:!0})],t.prototype,`hasShell`,void 0),t},E=t`
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
`,Kt=class extends C{constructor(...e){super(...e),this.from=0,this.to=0,this.color=``,this.label=``}connectedCallback(){super.connectedCallback(),this.style.display=`none`}resolveColor(e){return Rt(this.color,e)}updated(e){super.updated(e),(e.has(`from`)||e.has(`to`)||e.has(`color`)||e.has(`label`))&&this.dispatchEvent(new CustomEvent(`regionupdate`,{bubbles:!0,composed:!0}))}};S([o({type:Number,reflect:!0})],Kt.prototype,`from`,void 0),S([o({type:Number,reflect:!0})],Kt.prototype,`to`,void 0),S([o({reflect:!0})],Kt.prototype,`color`,void 0),S([o({reflect:!0})],Kt.prototype,`label`,void 0),Kt=S([a(`fx-gauge-region`)],Kt);function qt(e){return Array.from(e.querySelectorAll(`:scope > fx-gauge-region`)).map((e,t)=>{let n=e,r=Number(n.from),i=Number(n.to);return{from:Number.isFinite(r)?r:0,to:Number.isFinite(i)?i:0,color:n.resolveColor(t),label:n.label??``}})}var Jt=t`
    .fx-region-tooltip {
        position: absolute;
        z-index: 30;
        pointer-events: none;
        padding: 5px 8px;
        border-radius: 4px;
        background: #0f172a;
        border: 1px solid #334155;
        color: #f1f5f9;
        font-size: 11px;
        font-family: var(--fx-font-family, sans-serif);
        white-space: nowrap;
        transform: translate(-50%, calc(-100% - 8px));
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }
`;function Yt(e){return e.label?.trim()??``}function Xt(e){return e?.text?n`
        <div
            class="fx-region-tooltip"
            part="region-tooltip"
            style="left: ${e.x}px; top: ${e.y}px;"
        >
            ${e.text}
        </div>
    `:r}function Zt(e,t,n){let r=Yt(n);if(!r)return null;let i=e.getBoundingClientRect();return{text:r,x:t.clientX-i.left,y:t.clientY-i.top}}var Qt=class extends w{constructor(...e){super(...e),this.startAngle=-135,this.arcLength=270,this.hasShadow=!1,this.displayAngle=this.startAngle,this.hasDisplayAngle=!1}willUpdate(e){super.willUpdate(e);let t=this.startAngle+this.progress*this.arcLength;if(!this.hasDisplayAngle)this.displayAngle=t,this.hasDisplayAngle=!0;else{let e=((t-this.displayAngle+180)%360+360)%360-180;this.displayAngle+=e}}};S([o({type:Number,attribute:`start-angle`})],Qt.prototype,`startAngle`,void 0),S([o({type:Number,attribute:`arc-length`})],Qt.prototype,`arcLength`,void 0),S([o({type:Boolean,attribute:`has-shadow`,reflect:!0})],Qt.prototype,`hasShadow`,void 0),S([s()],Qt.prototype,`displayAngle`,void 0);var $t=class extends Qt{constructor(...e){super(...e),this.thickness=2}static{this.styles=t`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        }
        :host([has-shadow]) svg {
            overflow: visible;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.55));
        }
    `}render(){let{displayAngle:e,thickness:t}=this,r=12.5;return n`
            <svg viewBox="-4 -4 108 108">
                <defs>
                    <linearGradient 
                        id="fx-needle-default-gradient" 
                        x1="0" y1="${50}" 
                        x2="0" y2="${r}" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stop-color="var(--fx-gauge-needle-gradient-start, #f97316)" />
                        <stop offset="100%" stop-color="var(--fx-gauge-needle-gradient-end, #ef4444)" />
                    </linearGradient>
                </defs>
                <g style="transform: rotate(${e}deg); transform-origin: ${50}px ${50}px; transition: var(--fx-gauge-transition, none);">
                    <line
                        x1="${50}" y1="${50}"
                        x2="${50}" y2="${r}"
                        stroke="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                        stroke-width="${t}"
                        stroke-linecap="round"
                    />
                    <circle
                        cx="${50}" cy="${50}" r="3"
                        fill="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                    />
                </g>
            </svg>
        `}};S([o({type:Number})],$t.prototype,`thickness`,void 0),$t=S([a(`fx-gauge-needle`)],$t);var en=class extends w{constructor(...e){super(...e),this.offsetX=`0`,this.offsetY=`0`,this.align=`center`}formatOffset(e){if(y(e))return`0px`;{let t=String(e).trim();return t===``?`0px`:/^-?\d+(\.\d+)?$/.test(t)?`${t}%`:t}}static{this.styles=t`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: var(--fx-font-family, sans-serif);
            pointer-events: none;
            user-select: none;
            margin-top: var(--fx-value-display-margin-top, 0);
            transform: translate(
                var(--fx-value-display-offset-x, var(--display-offset-x-prop, 0px)), 
                var(--fx-value-display-offset-y, var(--display-offset-y-prop, 0px))
            );
        }
        :host([align="left"]) {
            align-items: flex-start;
        }
        :host([align="right"]) {
            align-items: flex-end;
        }
        :host([align="left"]) .label {
            text-align: left;
        }
        :host([align="right"]) .label {
            text-align: right;
        }
        .value {
            font-size: var(--fx-gauge-value-font-size, 1.25rem);
            font-weight: var(--fx-gauge-value-font-weight, 400);
            color: var(--fx-gauge-text-primary, #cbd5e1);
            line-height: 1;
        }
        .unit {
            font-size: var(--fx-gauge-unit-font-size, 0.625rem);
            font-weight: var(--fx-gauge-unit-font-weight, 400);
            color: var(--fx-gauge-text-secondary, #94a3b8);
            margin-top: 3px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .label {
            font-size: var(--fx-gauge-label-font-size, 0.55rem);
            font-weight: var(--fx-gauge-label-font-weight, 400);
            color: var(--fx-gauge-text-secondary, #94a3b8);
            margin-top: 5px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            text-align: center;
            max-width: 120px;
        }
    `}render(){let e=this.formatOffset(this.offsetX),t=this.formatOffset(this.offsetY);return n`
            <style>
                :host {
                    --display-offset-x-prop: ${e};
                    --display-offset-y-prop: ${t};
                }
            </style>
            <span class="value">${this.value}</span>
            ${this.unit?n`<span class="unit">${this.unit}</span>`:``}
            ${this.label?n`<span class="label">${this.label}</span>`:``}
        `}};S([o({attribute:`offset-x`})],en.prototype,`offsetX`,void 0),S([o({attribute:`offset-y`})],en.prototype,`offsetY`,void 0),S([o({type:String,reflect:!0})],en.prototype,`align`,void 0),en=S([a(`fx-value-display`)],en);var D=class extends C{constructor(...e){super(...e),this.min=0,this.max=100,this.count=10,this.hasScaleLabels=!0,this.replacements={},this.valueOrigin=`end`}resolveLabel(e){let t=Math.round(e);return t in this.replacements?this.replacements[t]:t}};S([o({type:Number})],D.prototype,`min`,void 0),S([o({type:Number})],D.prototype,`max`,void 0),S([o({type:Number})],D.prototype,`count`,void 0),S([o({type:Boolean,attribute:`has-scale-labels`})],D.prototype,`hasScaleLabels`,void 0),S([o({type:Object})],D.prototype,`replacements`,void 0),S([o({type:String,attribute:`value-origin`,reflect:!0})],D.prototype,`valueOrigin`,void 0);var tn=class extends D{constructor(...e){super(...e),this.startAngle=-135,this.arcLength=270}static{this.styles=t`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    `}get isFullCircle(){return Math.abs(this.arcLength)>=360}};S([o({type:Number,attribute:`start-angle`})],tn.prototype,`startAngle`,void 0),S([o({type:Number,attribute:`arc-length`})],tn.prototype,`arcLength`,void 0);var O=class extends tn{constructor(...e){super(...e),this.subDivisions=5,this.outerRadius=39.5,this.majorInnerRadius=32.5,this.minorInnerRadius=36,this.textRadius=28,this.labelFontSize=4}*renderTicks(){let{count:e,startAngle:t,arcLength:n,min:r,max:a,subDivisions:o,hasScaleLabels:s,isFullCircle:c,outerRadius:l,majorInnerRadius:u,minorInnerRadius:d,textRadius:f,labelFontSize:p}=this,m=e*o,h=c?m-1:m;for(let c=0;c<=h;c++){let h=c%o===0,g=(t+c/m*n)*Math.PI/180,_=h?u:d,v=50+l*Math.sin(g),ee=50-l*Math.cos(g),te=50+_*Math.sin(g),ne=50-_*Math.cos(g);if(yield i`
                <line
                    x1="${v}" y1="${ee}"
                    x2="${te}" y2="${ne}"
                    stroke="${h?`var(--fx-radial-scale-color, #94a3b8)`:`var(--fx-radial-scale-label-color, #cbd5e1)`}"
                    stroke-width="${h?`1`:`0.55`}"
                    stroke-linecap="round"
                />
            `,h&&s){let t=c/o,n=a-r,s=r+t/e*n,l=50+f*Math.sin(g),u=50-f*Math.cos(g);yield i`
                    <text
                        x="${l}"
                        y="${u}"
                        fill="var(--fx-radial-scale-label-color, #cbd5e1)"
                        font-size="${p}"
                        font-family="var(--fx-font-family, sans-serif)"
                        font-weight="600"
                        text-anchor="middle"
                        dominant-baseline="central"
                    >
                        ${this.resolveLabel(s)}
                    </text>
                `}}}render(){return n`
            <svg viewBox="-4 -4 108 108">
                ${this.renderTicks()}
            </svg>
        `}};S([o({type:Number,attribute:`sub-divisions`})],O.prototype,`subDivisions`,void 0),S([o({type:Number,attribute:`outer-radius`})],O.prototype,`outerRadius`,void 0),S([o({type:Number,attribute:`major-inner-radius`})],O.prototype,`majorInnerRadius`,void 0),S([o({type:Number,attribute:`minor-inner-radius`})],O.prototype,`minorInnerRadius`,void 0),S([o({type:Number,attribute:`text-radius`})],O.prototype,`textRadius`,void 0),S([o({type:Number,attribute:`label-font-size`})],O.prototype,`labelFontSize`,void 0),O=S([a(`fx-radial-scale`)],O);var k=class extends T(Gt(w)){constructor(...e){super(...e),this.hasShell=!0,this.startAngle=-135,this.arcLength=270,this.hasScaleLabels=!0,this.hasTrack=!0,this.hasRegionTooltip=!1,this.regions=[],this.regionTooltip=null,this.onRegionsChanged=()=>this.refreshRegions(),this.refreshRegions=()=>{this.regions=qt(this)},this.showRegionTooltip=(e,t)=>{this.hasRegionTooltip&&(this.regionTooltip=Zt(this,e,t))},this.moveRegionTooltip=(e,t)=>{!this.hasRegionTooltip||!this.regionTooltip||(this.regionTooltip=Zt(this,e,t))},this.hideRegionTooltip=()=>{this.regionTooltip=null},this.syncNeedleShadows=()=>{let e=this.shadowRoot?.querySelector(`slot[name="needle"]`);if(e){let t=e.assignedElements(),n=t.length>0?t:Array.from(e.querySelectorAll(`fx-gauge-needle, fx-gauge-needle-triangle`));for(let e of n)`hasShadow`in e&&(e.hasShadow=this.hasShell)}}}static{this.styles=[E,Jt,t`
            :host {
                position: relative;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                width: var(--fx-gauge-size, 340px);
            }
            :host([has-shell]) {
                --fx-gauge-shell-fill: var(--fx-theme-radial-gauge-shell-fill, #1e293b);
            }
            :host([has-shell][theme='silver']) {
                --fx-gauge-shell-fill: #1e293b;
            }
            :host([has-shell][theme='dark']) {
                --fx-gauge-shell-fill: #080b10;
            }
            :host([is-animated]) {
                --fx-gauge-transition: stroke-dashoffset 0.8s cubic-bezier(0.1, 1, 0.1, 1), transform 0.85s cubic-bezier(0.1, 1, 0.1, 1);
            }
            .gauge-wrap {
                position: relative;
                width: 100%;
                aspect-ratio: 1;
            }
            svg.track {
                width: 100%;
                height: 100%;
            }
            svg.regions {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: visible;
            }
            svg.regions .region-arc {
                pointer-events: none;
            }
            svg.regions .region-hit {
                pointer-events: stroke;
                stroke: rgba(0, 0, 0, 0.01);
            }
            :host([has-region-tooltip]) svg.regions .region-hit {
                cursor: help;
            }
            svg.glass {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                opacity: var(--fx-glass-opacity, 0.6);
            }
            .overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
                overflow: visible;
            }
            .overlay ::slotted([slot="needle"]),
            .overlay fx-gauge-needle,
            .overlay fx-gauge-needle-triangle {
                position: absolute;
                inset: 0;
                overflow: visible;
            }
            .center {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .center fx-value-display,
            .center ::slotted(fx-value-display),
            .center ::slotted([slot="display"]) {
                --fx-value-display-margin-top: 40%;
            }
        `]}connectedCallback(){super.connectedCallback(),this.addEventListener(`regionupdate`,this.onRegionsChanged),this.refreshRegions()}disconnectedCallback(){this.removeEventListener(`regionupdate`,this.onRegionsChanged),super.disconnectedCallback()}valueToAngle(e){let t=this.max-this.min,n=t===0?0:(e-this.min)/t;return this.startAngle+Math.min(Math.max(n,0),1)*this.arcLength}describeArc(e,t,n,r,i){let a=e=>e*Math.PI/180,o=r=>({x:e+n*Math.sin(a(r)),y:t-n*Math.cos(a(r))}),s=i-r;if(s>=360){let e=o(r),t=o(r+180),i=o(r+360);return`M ${e.x} ${e.y} A ${n} ${n} 0 1 1 ${t.x} ${t.y} A ${n} ${n} 0 1 1 ${i.x} ${i.y}`}let c=o(r),l=o(i),u=+(s>180);return`M ${c.x} ${c.y} A ${n} ${n} 0 ${u} 1 ${l.x} ${l.y}`}render(){let{startAngle:e,arcLength:t,progress:a}=this,o=e+t,s=this.regions.length>0?2/45*(180/Math.PI):0,c=e+s,l=o-s,u=Math.max(l-c,0),d=this.describeArc(50,50,45,c,l),f=2*Math.PI*45*(u/360),p=f*(1-a),m=this.hasTrack?48:45,h=this.regions.map(e=>{let t=Math.min(e.from,e.to),n=Math.max(e.from,e.to);if(n<=this.min||t>=this.max)return r;let a=this.valueToAngle(t),o=this.valueToAngle(n);if(o<=a)return r;let s=this.describeArc(50,50,49.2,a,o);return i`
                <path
                    class="region-arc"
                    d="${s}"
                    fill="none"
                    stroke="${e.color}"
                    stroke-width="2.4"
                    stroke-linecap="butt"
                />
                <path
                    class="region-hit"
                    d="${s}"
                    fill="none"
                    stroke-width="8"
                    stroke-linecap="butt"
                    @pointerenter=${t=>this.showRegionTooltip(t,e)}
                    @pointermove=${t=>this.moveRegionTooltip(t,e)}
                    @pointerleave=${this.hideRegionTooltip}
                />
            `});return n`
            <div class="gauge-wrap">
                <svg class="track" viewBox="-4 -4 108 108">
                    <defs>
                        <linearGradient id="fx-gauge-default-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="var(--fx-gauge-gradient-start, #06b6d4)" />
                            <stop offset="50%" stop-color="var(--fx-gauge-gradient-middle, #6366f1)" />
                            <stop offset="100%" stop-color="var(--fx-gauge-gradient-end, #a855f7)" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="${50}"
                        cy="${50}"
                        r="${m}"
                        fill="var(--fx-gauge-shell-fill, transparent)"
                    />
                    ${this.hasTrack?i`
                    <path
                        d="${d}"
                        fill="none"
                        stroke="var(--fx-gauge-track-color, #0f172a)"
                        stroke-width="${4}"
                        stroke-linecap="round"
                    />
                    <path
                        d="${d}"
                        fill="none"
                        stroke="var(--fx-gauge-fill-color, url(#fx-gauge-default-gradient))"
                        stroke-width="${4}"
                        stroke-linecap="round"
                        stroke-dasharray="${f}"
                        stroke-dashoffset="${p}"
                        style="transition: var(--fx-gauge-transition, none);"
                    />
                    `:r}
                </svg>
                <slot @slotchange=${this.refreshRegions} style="display:none;"></slot>
                <div class="overlay">
                    <slot name="scale">
                        <fx-radial-scale
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .count=${10}
                            .startAngle=${this.startAngle}
                            .arcLength=${this.arcLength}
                            .hasScaleLabels=${this.hasScaleLabels}
                        ></fx-radial-scale>
                    </slot>
                </div>

                <div class="overlay">
                    <slot name="needle" @slotchange=${this.syncNeedleShadows}>
                        <fx-gauge-needle
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .startAngle=${this.startAngle}
                            .arcLength=${this.arcLength}
                            .hasShadow=${this.hasShell}
                        ></fx-gauge-needle>
                    </slot>
                </div>

                ${this.hasValueDisplay?n`
                <div class="center">
                    <slot name="display" @slotchange="${this.updateSlottedDisplay}">
                        <fx-value-display
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .unit=${this.unit}
                            .label=${this.label}
                        ></fx-value-display>
                    </slot>
                </div>
                `:``}

                ${this.hasShell?n`
                <svg class="glass" viewBox="-4 -4 108 108">
                    <defs>
                        <clipPath id="fx-gauge-glass-clip">
                            <circle cx="50" cy="50" r="${m}" />
                        </clipPath>
                        <linearGradient id="fx-gauge-glass-rim-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="var(--fx-glass-color, #ffffff)" stop-opacity="0.35" />
                            <stop offset="45%" stop-color="var(--fx-glass-color, #ffffff)" stop-opacity="0.05" />
                            <stop offset="100%" stop-color="var(--fx-glass-color, #ffffff)" stop-opacity="0.12" />
                        </linearGradient>
                    </defs>
                    <g clip-path="url(#fx-gauge-glass-clip)">
                        <ellipse cx="32" cy="20" rx="62" ry="28" fill="var(--fx-glass-color, #ffffff)" opacity="0.14" transform="rotate(-12 32 20)" />
                        <ellipse cx="26" cy="10" rx="30" ry="10" fill="var(--fx-glass-color, #ffffff)" opacity="0.2" transform="rotate(-12 26 10)" />
                    </g>
                    <circle cx="50" cy="50" r="${m-.5}" fill="none" stroke="url(#fx-gauge-glass-rim-gradient)" stroke-width="0.5" />
                </svg>`:``}

                ${this.regions.length?n`
                        <svg class="regions" viewBox="-4 -4 108 108">
                            ${h}
                        </svg>
                    `:r}
            </div>
            ${Xt(this.regionTooltip)}
        `}updated(e){super.updated(e),(e.has(`value`)||e.has(`min`)||e.has(`max`)||e.has(`unit`)||e.has(`label`))&&this.updateSlottedDisplay(),e.has(`hasShell`)&&this.syncNeedleShadows()}updateSlottedDisplay(){let e=this.shadowRoot?.querySelector(`slot[name="display"]`);if(e){let t=e.assignedElements()[0];t&&(`value`in t&&(t.value=this.value),`min`in t&&(t.min=this.min),`max`in t&&(t.max=this.max),`unit`in t&&(t.unit=this.unit),`label`in t&&(t.label=this.label))}}};S([o({type:Boolean,attribute:`has-shell`,reflect:!0})],k.prototype,`hasShell`,void 0),S([o({type:Number,attribute:`start-angle`})],k.prototype,`startAngle`,void 0),S([o({type:Number,attribute:`arc-length`})],k.prototype,`arcLength`,void 0),S([o({type:Boolean,attribute:`has-scale-labels`,reflect:!0})],k.prototype,`hasScaleLabels`,void 0),S([o({type:Boolean,attribute:`has-track`,reflect:!0})],k.prototype,`hasTrack`,void 0),S([o({type:Boolean,attribute:`has-region-tooltip`,reflect:!0})],k.prototype,`hasRegionTooltip`,void 0),S([o({type:String,reflect:!0,converter:b})],k.prototype,`theme`,void 0),S([s()],k.prototype,`regions`,void 0),S([s()],k.prototype,`regionTooltip`,void 0),k=S([a(`fx-radial-gauge`)],k);var A=class extends D{constructor(...e){super(...e),this.value=0,this.subDivisions=5,this.side=`left`,this.orientation=`vertical`,this.startOffset=140,this.endOffset=0,this.viewBoxWidth=20,this.viewBoxHeight=140,this.preserveAspectRatio=`xMidYMid meet`,this.hasScaleConnectingLine=!1,this.trackThickness=`medium`,this.caption=``,this.spacing=0,this.captionOffset=14,this.trackCenter=NaN,this.viewportScale=1}static{this.styles=t`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
        }
        svg {
            width: 100%;
            height: 100%;
            overflow: visible;
        }
        text {
            font-family: var(--fx-font-family, sans-serif);
            font-weight: 400;
        }
    `}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncViewportScale())}disconnectedCallback(){this.resizeObserver?.disconnect(),this.resizeObserver=void 0,super.disconnectedCallback()}firstUpdated(e){super.firstUpdated(e),this.resizeObserver?.observe(this),this.syncViewportScale()}updated(e){super.updated(e),(e.has(`viewBoxWidth`)||e.has(`viewBoxHeight`))&&this.syncViewportScale()}readLabelFontSizePx(){let e=getComputedStyle(this).getPropertyValue(`--fx-linear-scale-label-font-size`).trim(),t=parseFloat(e);return Number.isFinite(t)?t:9}syncViewportScale(){let e=this.getBoundingClientRect(),t=Math.min(e.width/Math.max(this.viewBoxWidth,1),e.height/Math.max(this.viewBoxHeight,1)),n=t>0&&Number.isFinite(t)?t:1;Math.abs(n-this.viewportScale)>.001&&(this.viewportScale=n)}pxToUserUnits(e){return e/Math.max(this.viewportScale,.001)}get labelFontSizeUu(){return this.pxToUserUnits(this.readLabelFontSizePx())}get captionOffsetUu(){return this.pxToUserUnits(this.captionOffset)}get colors(){return{ticks:`var(--fx-linear-scale-color, #475569)`,label:`var(--fx-linear-scale-label-color, var(--fx-gauge-text-secondary, #94a3b8))`}}get tickLengths(){let e=(e,t)=>{let n=getComputedStyle(this).getPropertyValue(e).trim(),r=parseFloat(n);return Number.isFinite(r)?r:t};return{major:e(`--fx-linear-scale-major-tick`,10),medium:e(`--fx-linear-scale-medium-tick`,7),minor:e(`--fx-linear-scale-minor-tick`,5)}}tickLength(e,t){let{major:n,medium:r,minor:i}=this.tickLengths;return e?n:t?r:i}get activeSide(){let{side:e,orientation:t}=this;return t===`horizontal`?e===`left`?`top`:e===`right`?`bottom`:e:e}get thicknessValue(){let e=String(this.trackThickness).trim();switch(e){case`x-large`:case`xlarge`:return 36;case`large`:return 27;case`medium`:return 18;case`small`:return 9;default:return/^\d+$/.test(e)?parseInt(e,10):18}}get trackMidCross(){return Number.isFinite(this.trackCenter)?this.trackCenter:this.orientation===`horizontal`?this.viewBoxHeight/2:this.viewBoxWidth/2}*renderVerticalConnectingLine(){let{startOffset:e,endOffset:t,side:n,spacing:r}=this,a=this.colors.ticks,o=this.trackMidCross,s=this.thicknessValue/2;if(n===`left`||n===`both`){let n=o-s-r;yield i`<line x1="${n}" y1="${e}" x2="${n}" y2="${t}" stroke="${a}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`}if(n===`right`||n===`both`){let n=o+s+r;yield i`<line x1="${n}" y1="${e}" x2="${n}" y2="${t}" stroke="${a}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`}}*renderHorizontalConnectingLine(){let{startOffset:e,endOffset:t,spacing:n}=this,r=this.colors.ticks,a=this.activeSide,o=this.trackMidCross,s=this.thicknessValue/2;if(a===`top`||a===`both`){let a=o-s-n;yield i`<line x1="${e}" y1="${a}" x2="${t}" y2="${a}" stroke="${r}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`}if(a===`bottom`||a===`both`){let a=o+s+n;yield i`<line x1="${e}" y1="${a}" x2="${t}" y2="${a}" stroke="${r}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`}}*renderConnectingLines(){this.hasScaleConnectingLine&&(this.orientation===`horizontal`?yield*this.renderHorizontalConnectingLine():yield*this.renderVerticalConnectingLine())}*renderLeftTick(e,t,n,r){let{ticks:a,label:o}=this.colors,{spacing:s}=this,c=this.trackMidCross,l=this.thicknessValue/2,u=this.tickLength(n,r),d=c-l-s,f=d-u;if(yield i`<line x1="${f}" y1="${e}" x2="${d}" y2="${e}" stroke="${a}" stroke-width="${n?`1.2`:r?`0.9`:`0.6`}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`,n&&this.hasScaleLabels){let n=this.getVerticalLeftLabelX();yield i`<text x="${n}" y="${e}" fill="${o}" font-size="${this.labelFontSizeUu}" text-anchor="end" dominant-baseline="middle">${this.resolveLabel(t)}</text>`}}*renderRightTick(e,t,n,r){let{ticks:a,label:o}=this.colors,{spacing:s}=this,c=this.trackMidCross,l=this.thicknessValue/2,u=this.tickLength(n,r),d=c+l+s,f=d+u;if(yield i`<line x1="${d}" y1="${e}" x2="${f}" y2="${e}" stroke="${a}" stroke-width="${n?`1.2`:r?`0.9`:`0.6`}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`,n&&this.hasScaleLabels){let n=this.getVerticalRightLabelX();yield i`<text x="${n}" y="${e}" fill="${o}" font-size="${this.labelFontSizeUu}" text-anchor="start" dominant-baseline="middle">${this.resolveLabel(t)}</text>`}}getVerticalLeftLabelX(){let{spacing:e,thicknessValue:t}=this,n=this.trackMidCross,r=t/2,i=this.tickLengths.major;return n-r-e-i-4}getVerticalRightLabelX(){let{spacing:e,thicknessValue:t}=this,n=this.trackMidCross,r=t/2,i=this.tickLengths.major;return n+r+e+i+4}getHorizontalTopLabelY(){let{spacing:e,thicknessValue:t}=this,n=this.trackMidCross,r=t/2,i=this.tickLengths.major;return n-r-e-i-7}getHorizontalBottomLabelY(){let{spacing:e,thicknessValue:t}=this,n=this.trackMidCross,r=t/2,i=this.tickLengths.major;return n+r+e+i+7}*renderTopTick(e,t,n,r){let{ticks:a,label:o}=this.colors,{spacing:s}=this,c=this.trackMidCross,l=this.thicknessValue/2,u=this.tickLength(n,r),d=c-l-s,f=d-u;if(yield i`<line x1="${e}" y1="${f}" x2="${e}" y2="${d}" stroke="${a}" stroke-width="${n?`1.2`:r?`0.9`:`0.6`}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`,n&&this.hasScaleLabels){let n=this.getHorizontalTopLabelY();yield i`<text x="${e}" y="${n}" fill="${o}" font-size="${this.labelFontSizeUu}" text-anchor="middle" dominant-baseline="middle">${this.resolveLabel(t)}</text>`}}*renderBottomTick(e,t,n,r){let{ticks:a,label:o}=this.colors,{spacing:s}=this,c=this.trackMidCross,l=this.thicknessValue/2,u=this.tickLength(n,r),d=c+l+s,f=d+u;if(yield i`<line x1="${e}" y1="${d}" x2="${e}" y2="${f}" stroke="${a}" stroke-width="${n?`1.2`:r?`0.9`:`0.6`}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`,n&&this.hasScaleLabels){let n=this.getHorizontalBottomLabelY();yield i`<text x="${e}" y="${n}" fill="${o}" font-size="${this.labelFontSizeUu}" text-anchor="middle" dominant-baseline="middle">${this.resolveLabel(t)}</text>`}}*renderVerticalTicks(e,t,n,r){let{startOffset:i,endOffset:a,side:o}=this,s=i+e*(a-i);(o===`left`||o===`both`)&&(yield*this.renderLeftTick(s,t,n,r)),(o===`right`||o===`both`)&&(yield*this.renderRightTick(s,t,n,r))}*renderHorizontalTicks(e,t,n,r){let{startOffset:i,endOffset:a}=this,o=i+e*(a-i),s=this.activeSide;(s===`top`||s===`both`)&&(yield*this.renderTopTick(o,t,n,r)),(s===`bottom`||s===`both`)&&(yield*this.renderBottomTick(o,t,n,r))}*renderTicks(){let{count:e,subDivisions:t,min:n,max:r,orientation:i}=this,a=e*t,o=i===`horizontal`;for(let e=0;e<=a;e++){let i=e%t===0,s=!i&&t%2==0&&e%t===t/2,c=e/a,l=n+c*(r-n);o?yield*this.renderHorizontalTicks(c,l,i,s):yield*this.renderVerticalTicks(c,l,i,s)}}*renderCaption(){if(this.caption){let{orientation:e,side:t,startOffset:n,endOffset:r}=this,a=e===`horizontal`,o=this.colors.label,s=this.labelFontSizeUu,c=this.captionOffsetUu;if(a){let e=Math.max(n,r)+c,t=this.activeSide;if(t===`top`){let t=this.getHorizontalTopLabelY();yield i`<text x="${e}" y="${t}" fill="${o}" font-size="${s}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`}else if(t===`bottom`){let t=this.getHorizontalBottomLabelY();yield i`<text x="${e}" y="${t}" fill="${o}" font-size="${s}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`}else{let t=this.trackMidCross;yield i`<text x="${e}" y="${t}" fill="${o}" font-size="${s}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`}}else{let e=Math.min(n,r)-c;if(t===`left`){let t=this.getVerticalLeftLabelX();yield i`<text x="${t}" y="${e}" fill="${o}" font-size="${s}" text-anchor="end" dominant-baseline="middle">${this.caption}</text>`}else if(t===`right`){let t=this.getVerticalRightLabelX();yield i`<text x="${t}" y="${e}" fill="${o}" font-size="${s}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`}else{let t=this.trackMidCross;yield i`<text x="${t}" y="${e}" fill="${o}" font-size="${s}" text-anchor="middle" dominant-baseline="middle">${this.caption}</text>`}}}}*renderSvgTicks(){yield*this.renderConnectingLines(),yield*this.renderTicks(),yield*this.renderCaption()}render(){let{viewBoxWidth:e,viewBoxHeight:t,preserveAspectRatio:r}=this;return n`
            <svg viewBox="0 0 ${e} ${t}" preserveAspectRatio="${r}">
                ${this.renderSvgTicks()}
            </svg>
        `}};S([o({type:Number})],A.prototype,`value`,void 0),S([o({type:Number,attribute:`sub-divisions`})],A.prototype,`subDivisions`,void 0),S([o({type:String})],A.prototype,`side`,void 0),S([o({type:String,reflect:!0})],A.prototype,`orientation`,void 0),S([o({type:Number,attribute:`start-offset`})],A.prototype,`startOffset`,void 0),S([o({type:Number,attribute:`end-offset`})],A.prototype,`endOffset`,void 0),S([o({type:Number,attribute:`view-box-width`})],A.prototype,`viewBoxWidth`,void 0),S([o({type:Number,attribute:`view-box-height`})],A.prototype,`viewBoxHeight`,void 0),S([o({type:String,attribute:`preserve-aspect-ratio`})],A.prototype,`preserveAspectRatio`,void 0),S([o({type:Boolean,attribute:`has-scale-connecting-line`})],A.prototype,`hasScaleConnectingLine`,void 0),S([o({attribute:`track-thickness`})],A.prototype,`trackThickness`,void 0),S([o({type:String})],A.prototype,`caption`,void 0),S([o({type:Number})],A.prototype,`spacing`,void 0),S([o({type:Number,attribute:`caption-offset`})],A.prototype,`captionOffset`,void 0),S([o({type:Number,attribute:`track-center`})],A.prototype,`trackCenter`,void 0),S([s()],A.prototype,`viewportScale`,void 0),A=S([a(`fx-linear-scale`)],A);var j=class e extends T(w){constructor(...e){super(...e),this.hasValueDisplay=!1,this.hasWell=!0,this.hasShell=!0,this.hasScaleLabels=!0,this.orientation=`vertical`,this.ticksSide=`left`,this.valueOrigin=`end`,this.subDivisions=5,this.spacing=4,this.ticks=0,this.decimals=2,this.length=``,this.caption=``,this.hasRegionTooltip=!1,this.areaWidth=0,this.areaHeight=0,this.isDragging=!1,this.regions=[],this.regionTooltip=null,this.onRegionsChanged=()=>this.refreshRegions(),this.refreshRegions=()=>{this.regions=qt(this)},this.showRegionTooltip=(e,t)=>{this.hasRegionTooltip&&(this.regionTooltip=Zt(this,e,t))},this.moveRegionTooltip=(e,t)=>{!this.hasRegionTooltip||!this.regionTooltip||(this.regionTooltip=Zt(this,e,t))},this.hideRegionTooltip=()=>{this.regionTooltip=null},this.updateSlottedDisplay=()=>{let e=this.shadowRoot?.querySelector(`slot[name="display"]`);if(e){let t=e.assignedElements()[0];t&&(`value`in t&&(t.value=this.roundedValue),`min`in t&&(t.min=this.min),`max`in t&&(t.max=this.max),`unit`in t&&(t.unit=this.unit),`label`in t&&(t.label=this.label))}},this.updateSlottedScale=()=>{this.syncTrackInsets();let e=this.shadowRoot?.querySelector(`slot[name="scale"]`);if(e){let t=e.assignedElements();if(t.length>0){let{viewBoxWidth:e,viewBoxHeight:n,startOffset:r,endOffset:i,trackThickness:a,spacing:o,trackCenter:s}=this.tickLayout;t.forEach(t=>{`orientation`in t&&(t.orientation=this.orientation),`valueOrigin`in t&&(t.valueOrigin=this.scaleValueOrigin),`startOffset`in t&&(t.startOffset=r),`endOffset`in t&&(t.endOffset=i),`viewBoxWidth`in t&&(t.viewBoxWidth=e),`viewBoxHeight`in t&&(t.viewBoxHeight=n),`trackCenter`in t&&(t.trackCenter=s),`trackThickness`in t&&!t.hasAttribute(`track-thickness`)&&(t.trackThickness=a),`side`in t&&(t.side=this.ticksSide),`hasScaleLabels`in t&&y(t.hasScaleLabels)&&(t.hasScaleLabels=this.hasScaleLabels),`value`in t&&y(t.value)&&(t.value=this.value),`min`in t&&y(t.min)&&(t.min=this.min),`max`in t&&y(t.max)&&(t.max=this.max),`spacing`in t&&(t.spacing=o),`caption`in t&&!t.caption&&(t.caption=this.caption)})}}}}get isInteractiveTrack(){return!1}get thumbSizePx(){return 0}renderThumb(e,t){return r}renderTrackDecorations(e){return r}static{this.styles=[E,Jt,t`
            :host {
                position: relative;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                box-sizing: border-box;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-bar-width: 97px;
                --fx-bar-height: 480px;
                --fx-bar-background: #1e293b;
                --fx-bar-track-color: #0b111f;
                --fx-bar-well-background: var(--fx-bar-background);
                --fx-bar-well-border: color-mix(in srgb, var(--fx-bar-background) 65%, #000);
                --fx-bar-thumb-size: 28px;
                --fx-bar-thumb-background: #121a2b;
                --fx-bar-thumb-grip: #000000;
                --fx-bar-track-width: 10px;
                --fx-bar-well-pad: 5px;
                --fx-bar-track-inset: 10px;
                --fx-bar-track-caption-inset: 18px;
                --fx-bar-track-inset-start: var(--fx-bar-track-inset);
                --fx-bar-track-inset-end: var(--fx-bar-track-inset);
                --fx-bar-well-margin-start: var(--fx-bar-track-inset-start);
                --fx-bar-well-margin-end: var(--fx-bar-track-inset-end);
                --fx-linear-scale-color: #475569;
                --fx-linear-scale-label-color: #64748b;
                --fx-linear-scale-label-font-size: 9px;
                --fx-linear-scale-major-tick: 6;
                --fx-linear-scale-medium-tick: 4;
                --fx-linear-scale-minor-tick: 3;
            }
            :host([has-shell]) {
                background: var(--fx-theme-linear-shell-background, #080b10);
                border-radius: 8px;
            }
            .inner {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
            }
            :host([has-shell]) .inner {
                padding: 12px 8px;
            }
            :host([has-shell][theme="silver"]) {
                background: #1e293b;
            }
            :host([has-shell][theme="dark"]) {
                background: #080b10;
            }
            :host([orientation="horizontal"]) {
                --fx-bar-width: 480px;
                --fx-bar-height: 97px;
            }
            .shell {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: var(--fx-bar-width);
                height: var(--fx-bar-height);
                background: transparent;
                border: none;
                overflow: visible;
                box-sizing: border-box;
            }
            :host(:not([orientation="horizontal"])) .track-area {
                justify-content: flex-start;
            }
            :host([orientation="horizontal"]) .track-area {
                align-items: flex-start;
            }
            .track-area {
                position: relative;
                flex: 0 0 auto;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: default;
                touch-action: none;
            }
            :host([orientation="horizontal"]) .track-area {
                width: 100%;
                height: 100%;
            }
            .overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
                z-index: 1;
            }
            ::slotted([slot="scale"]) {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            .well {
                position: relative;
                box-sizing: border-box;
                width: calc(var(--fx-bar-track-width) + var(--fx-bar-well-pad) * 2);
                height: calc(100% - var(--fx-bar-well-margin-start) - var(--fx-bar-well-margin-end));
                margin-top: var(--fx-bar-well-margin-start);
                margin-bottom: var(--fx-bar-well-margin-end);
                padding: var(--fx-bar-well-pad);
                border-radius: calc(var(--fx-bar-track-width) / 2 + var(--fx-bar-well-pad));
                background: var(--fx-bar-well-background);
                border: 1px solid var(--fx-bar-well-border);
                box-shadow:
                    inset 0 2px 5px rgba(0, 0, 0, 0.325),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.02),
                    inset 1px 0 2px rgba(0, 0, 0, 0.175),
                    inset -1px 0 2px rgba(0, 0, 0, 0.175);
            }
            :host([orientation="horizontal"]) .well {
                width: calc(100% - var(--fx-bar-well-margin-start) - var(--fx-bar-well-margin-end));
                height: calc(var(--fx-bar-track-width) + var(--fx-bar-well-pad) * 2);
                margin-top: 0;
                margin-bottom: 0;
                margin-left: var(--fx-bar-well-margin-start);
                margin-right: var(--fx-bar-well-margin-end);
            }
            :host(:not([has-well])) .well {
                width: var(--fx-bar-track-width);
                padding: 0;
                border: none;
                background: transparent;
                box-shadow: none;
                border-radius: calc(var(--fx-bar-track-width) / 2);
            }
            :host([orientation="horizontal"]:not([has-well])) .well {
                width: calc(100% - var(--fx-bar-well-margin-start) - var(--fx-bar-well-margin-end));
                height: var(--fx-bar-track-width);
            }
            .track {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 999px;
                background: var(--fx-bar-track-color);
                overflow: hidden;
            }
            .region-band {
                position: absolute;
                pointer-events: none;
                z-index: 0;
            }
            :host([has-region-tooltip]) .region-rail .region-band {
                pointer-events: auto;
                cursor: help;
            }
            .region-rail {
                position: absolute;
                pointer-events: none;
                z-index: 2;
                box-sizing: border-box;
            }
            :host(:not([orientation="horizontal"])) .region-rail {
                top: var(--fx-region-rail-inset-start);
                bottom: var(--fx-region-rail-inset-end);
                left: var(--fx-region-rail-offset, 0px);
                width: var(--fx-region-rail-thickness, 7px);
            }
            :host([orientation="horizontal"]) .region-rail {
                left: var(--fx-region-rail-inset-start);
                right: var(--fx-region-rail-inset-end);
                top: var(--fx-region-rail-offset, 0px);
                height: var(--fx-region-rail-thickness, 7px);
            }
            :host(:not([orientation="horizontal"])) .region-rail .region-band {
                left: 0;
                right: 0;
                width: 100%;
            }
            :host([orientation="horizontal"]) .region-rail .region-band {
                top: 0;
                bottom: 0;
                height: 100%;
            }
            .fill {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                border-radius: 999px;
                background: linear-gradient(
                    180deg,
                    var(--fx-bar-gradient-end, #a855f7) 0%,
                    var(--fx-bar-gradient-middle, #6366f1) 50%,
                    var(--fx-bar-gradient-start, #06b6d4) 100%
                );
                transition: none;
            }
            :host([value-origin="start"]:not([orientation="horizontal"])) .fill {
                bottom: auto;
                top: 0;
                background: linear-gradient(
                    0deg,
                    var(--fx-bar-gradient-end, #a855f7) 0%,
                    var(--fx-bar-gradient-middle, #6366f1) 50%,
                    var(--fx-bar-gradient-start, #06b6d4) 100%
                );
            }
            :host([orientation="horizontal"]) .fill {
                top: 0;
                right: auto;
                bottom: 0;
                background: linear-gradient(
                    90deg,
                    var(--fx-bar-gradient-start, #06b6d4) 0%,
                    var(--fx-bar-gradient-middle, #6366f1) 50%,
                    var(--fx-bar-gradient-end, #a855f7) 100%
                );
            }
            :host([orientation="horizontal"][value-origin="end"]) .fill {
                left: auto;
                right: 0;
                background: linear-gradient(
                    270deg,
                    var(--fx-bar-gradient-start, #06b6d4) 0%,
                    var(--fx-bar-gradient-middle, #6366f1) 50%,
                    var(--fx-bar-gradient-end, #a855f7) 100%
                );
            }
            :host([is-animated]) .fill {
                transition: height 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([orientation="horizontal"][is-animated]) .fill {
                transition: width 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([is-animated]) .fill[data-dragging="true"] {
                transition: height 0.12s cubic-bezier(0.22, 1, 0.36, 1);
            }
            :host([orientation="horizontal"][is-animated]) .fill[data-dragging="true"] {
                transition: width 0.12s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .display-wrap {
                display: flex;
                justify-content: center;
                width: 100%;
            }
            ::slotted([slot="display"]) {
                pointer-events: none;
            }
        `]}get isHorizontal(){return this.orientation===`horizontal`}connectedCallback(){super.connectedCallback(),this.applyLength(),this.addEventListener(`regionupdate`,this.onRegionsChanged),this.refreshRegions(),this.resizeObserver=new ResizeObserver(e=>{let t=e[0]?.contentRect;t&&(t.width!==this.areaWidth||t.height!==this.areaHeight)&&(this.areaWidth=t.width,this.areaHeight=t.height)})}disconnectedCallback(){this.removeEventListener(`regionupdate`,this.onRegionsChanged),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,super.disconnectedCallback()}valueToTrackFraction(e){let t=this.max-this.min;return t===0?0:Math.min(Math.max((e-this.min)/t,0),1)}renderRegionBands(){let e=h(this.isHorizontal?`horizontal`:`vertical`,this.valueOrigin);return this.regions.map(t=>{let i=Math.min(t.from,t.to),a=Math.max(t.from,t.to);if(a<=this.min||i>=this.max)return r;let o=this.valueToTrackFraction(i),s=this.valueToTrackFraction(a);if(s<=o)return r;let c=(s-o)*100,l=e?(1-s)*100:o*100,u=this.isHorizontal?`left: ${l}%; width: ${c}%; background: ${t.color};`:`bottom: ${l}%; height: ${c}%; background: ${t.color};`;return n`
                <div
                    class="region-band"
                    style="${u}"
                    @pointerenter=${e=>this.showRegionTooltip(e,t)}
                    @pointermove=${e=>this.moveRegionTooltip(e,t)}
                    @pointerleave=${this.hideRegionTooltip}
                ></div>
            `})}firstUpdated(e){super.firstUpdated(e);let t=this.shadowRoot?.querySelector(`.track-area`);if(t&&this.resizeObserver){this.resizeObserver.observe(t);let e=t.getBoundingClientRect();this.areaWidth=e.width,this.areaHeight=e.height}}updated(e){super.updated(e),(e.has(`length`)||e.has(`orientation`))&&this.applyLength(),(e.has(`value`)||e.has(`min`)||e.has(`max`)||e.has(`unit`)||e.has(`label`)||e.has(`decimals`))&&this.updateSlottedDisplay(),(e.has(`value`)||e.has(`min`)||e.has(`max`)||e.has(`ticks`)||e.has(`ticksSide`)||e.has(`hasScaleLabels`)||e.has(`spacing`)||e.has(`hasWell`)||e.has(`hasShell`)||e.has(`orientation`)||e.has(`valueOrigin`)||e.has(`caption`)||e.has(`areaWidth`)||e.has(`areaHeight`)||e.has(`regions`))&&this.updateSlottedScale()}get trackWidthPx(){let e=getComputedStyle(this).getPropertyValue(`--fx-bar-track-width`).trim(),t=parseFloat(e);return Number.isFinite(t)?t:10}get hasCustomScale(){return this.querySelector(`[slot="scale"]`)!=null}get scaleValueOrigin(){return _(this,`scale`,this.valueOrigin)}get isFillReversed(){return h(this.orientation,this.scaleValueOrigin)}get travelPadPx(){return this.wellPadPx}get hasAnyCaption(){return this.caption?!0:Array.from(this.querySelectorAll(`:scope > [slot="scale"]`)).some(e=>{let t=e.caption??e.getAttribute(`caption`)??``;return String(t).length>0})}readCssPx(e,t){let n=getComputedStyle(this).getPropertyValue(e).trim(),r=parseFloat(n);return Number.isFinite(r)?r:t}get trackEndInsetPx(){return this.readCssPx(`--fx-bar-track-inset`,10)}get trackCaptionInsetPx(){return this.readCssPx(`--fx-bar-track-caption-inset`,28)}get trackInsetStartPx(){let e=this.trackEndInsetPx;return this.isHorizontal?e:this.hasAnyCaption?this.trackCaptionInsetPx:e}get trackInsetEndPx(){let e=this.trackEndInsetPx;return this.isHorizontal&&this.hasAnyCaption?this.trackCaptionInsetPx:e}get scaleInnerPadPx(){return 0}get wellMarginStartPx(){return Math.max(this.trackInsetStartPx-this.wellPadPx,0)}get wellMarginEndPx(){return Math.max(this.trackInsetEndPx-this.wellPadPx,0)}get scaleSideFlags(){if(this.ticks>1||this.hasCustomScale){let e=Array.from(this.querySelectorAll(`:scope > [slot="scale"]`));if(e.length>0){let t=!1,n=!1;for(let r of e){let e=String(r.side??r.getAttribute(`side`)??this.ticksSide);(e===`left`||e===`top`||e===`both`)&&(t=!0),(e===`right`||e===`bottom`||e===`both`)&&(n=!0)}return{start:t,end:n}}{let e=this.ticksSide;return{start:e===`left`||e===`both`,end:e===`right`||e===`both`}}}return{start:!1,end:!1}}static{this.regionBand=7}static{this.regionGap=2}get regionRailCross(){return this.regions.length>0?e.regionBand+e.regionGap:0}get compactCrossLayout(){let e=this.regionRailCross,t=this.hasWell?this.trackWidthPx+this.wellPadPx*2:this.trackWidthPx,n=Math.max(this.thumbSizePx,t),r=this.scaleSideFlags,i=r.start?36:4,a=(r.end?36:4)+e;return{cross:i+n+a,startPad:i,endPad:a,content:n,wellOuter:t,wellOffset:i+(n-t)/2,trackCenter:i+n/2}}get tickLayout(){let e=Math.max(this.areaWidth,this.isHorizontal?100:60),t=Math.max(this.areaHeight,this.isHorizontal?60:100),n=this.trackInsetStartPx,r=this.trackInsetEndPx,i=this.scaleInnerPadPx,a=this.isHorizontal?e:t,o=Math.max(a-n-r,0),{startOffset:s,endOffset:c}=g(this.isHorizontal?`horizontal`:`vertical`,this.scaleValueOrigin,o,i),l=this.regionRailCross,u=this.compactCrossLayout.trackCenter+l/2;return{viewBoxWidth:e,viewBoxHeight:t,startOffset:n+s,endOffset:n+c,trackThickness:this.trackWidthPx+l,spacing:this.spacing+this.wellPadPx,trackCenter:u}}syncTrackInsets(){let e=this.shadowRoot?.querySelector(`.shell`);e&&(e.style.setProperty(`--fx-bar-track-inset-start`,`${this.trackInsetStartPx}px`),e.style.setProperty(`--fx-bar-track-inset-end`,`${this.trackInsetEndPx}px`),e.style.setProperty(`--fx-bar-well-margin-start`,`${this.wellMarginStartPx}px`),e.style.setProperty(`--fx-bar-well-margin-end`,`${this.wellMarginEndPx}px`))}renderTicksSlot(){if(this.ticks<=1&&!this.hasCustomScale)return n``;{let{viewBoxWidth:e,viewBoxHeight:t,startOffset:r,endOffset:i,trackThickness:a,spacing:o,trackCenter:s}=this.tickLayout;return n`
                <div class="overlay">
                    <slot name="scale" @slotchange=${this.updateSlottedScale}>
                        ${this.ticks>1?n`
                            <fx-linear-scale
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .count=${this.ticks-1}
                                .subDivisions=${this.subDivisions}
                                .side=${this.ticksSide}
                                .hasScaleLabels=${this.hasScaleLabels}
                                .orientation=${this.orientation}
                                .valueOrigin=${this.scaleValueOrigin}
                                .startOffset=${r}
                                .endOffset=${i}
                                .viewBoxWidth=${e}
                                .viewBoxHeight=${t}
                                .trackThickness=${a}
                                .trackCenter=${s}
                                .spacing=${o}
                                .caption=${this.caption}
                            ></fx-linear-scale>
                        `:null}
                    </slot>
                </div>
            `}}applyLength(){let e=this.resolveLengthValue(),t=this.isHorizontal?`--fx-bar-width`:`--fx-bar-height`,n=this.isHorizontal?`--fx-bar-height`:`--fx-bar-width`;this.style.removeProperty(n),e?this.style.setProperty(t,e):this.style.removeProperty(t)}resolveLengthValue(){return St.normalizeLength(this.length)}get roundedValue(){return $e(this.value,this.decimals)}get wellPadPx(){if(this.hasWell){let e=getComputedStyle(this).getPropertyValue(`--fx-bar-well-pad`).trim(),t=parseFloat(e);return Number.isFinite(t)?t:5}return 0}handleTrackMouseDown(e){}handleTrackTouchStart(e){}render(){let{progress:t,isDragging:i}=this,a=t*100,o=this.compactCrossLayout,s=this.regions.length>0?o.wellOffset+o.wellOuter+e.regionGap:0,c=[o?this.isHorizontal?`height: ${o.cross}px`:`width: ${o.cross}px`:``,`--fx-bar-track-inset-start: ${this.trackInsetStartPx}px`,`--fx-bar-track-inset-end: ${this.trackInsetEndPx}px`,`--fx-bar-well-margin-start: ${this.wellMarginStartPx}px`,`--fx-bar-well-margin-end: ${this.wellMarginEndPx}px`,this.regions.length?`--fx-region-rail-offset: ${s}px; --fx-region-rail-thickness: ${e.regionBand}px; --fx-region-rail-inset-start: ${this.trackInsetStartPx}px; --fx-region-rail-inset-end: ${this.trackInsetEndPx}px`:``].filter(Boolean).join(`; `),l=o?this.isHorizontal?`margin-top: ${o.wellOffset}px;`:`margin-left: ${o.wellOffset}px;`:``,u=this.isInteractiveTrack?{mousedown:this.handleTrackMouseDown,touchstart:this.handleTrackTouchStart}:{};return n`
            <div class="inner">
            <div class="shell" style="${c}">
                <div
                    class="track-area"
                    @mousedown=${u.mousedown}
                    @touchstart=${u.touchstart}
                >
                    <div class="well" style="${l}">
                        <div class="track">
                            <div
                                class="fill"
                                data-dragging="${i}"
                                data-full="${t>=1}"
                                style="${this.isHorizontal?`width: ${a}%;`:`height: ${a}%;`}"
                            ></div>
                            ${this.renderTrackDecorations(t)}
                        </div>
                    </div>
                    ${this.regions.length?n`<div class="region-rail">${this.renderRegionBands()}</div>`:r}
                    ${this.renderTicksSlot()}
                    ${this.renderThumb(o,t)}
                </div>
            </div>
            <slot @slotchange=${this.refreshRegions} style="display:none;"></slot>
            ${this.hasValueDisplay?n`
                <div class="display-wrap">
                    <slot name="display" @slotchange=${this.updateSlottedDisplay}>
                        <fx-value-display
                            .value=${this.roundedValue}
                            .min=${this.min}
                            .max=${this.max}
                            .unit=${this.unit}
                            .label=${this.label}
                        ></fx-value-display>
                    </slot>
                </div>
            `:null}
            ${Xt(this.regionTooltip)}
            </div>
        `}};S([o({type:Boolean,attribute:`has-value-display`,reflect:!0})],j.prototype,`hasValueDisplay`,void 0),S([o({type:Boolean,attribute:`has-well`,reflect:!0})],j.prototype,`hasWell`,void 0),S([o({type:Boolean,attribute:`has-shell`,reflect:!0})],j.prototype,`hasShell`,void 0),S([o({type:String,reflect:!0,converter:b})],j.prototype,`theme`,void 0),S([o({type:Boolean,attribute:`has-scale-labels`,reflect:!0})],j.prototype,`hasScaleLabels`,void 0),S([o({type:String,reflect:!0})],j.prototype,`orientation`,void 0),S([o({type:String,attribute:`ticks-side`,reflect:!0})],j.prototype,`ticksSide`,void 0),S([o({type:String,attribute:`value-origin`,reflect:!0})],j.prototype,`valueOrigin`,void 0),S([o({type:Number,attribute:`sub-divisions`})],j.prototype,`subDivisions`,void 0),S([o({type:Number})],j.prototype,`spacing`,void 0),S([o({type:Number})],j.prototype,`ticks`,void 0),S([o({type:Number})],j.prototype,`decimals`,void 0),S([o({type:String})],j.prototype,`length`,void 0),S([o({type:String})],j.prototype,`caption`,void 0),S([o({type:Boolean,attribute:`has-region-tooltip`,reflect:!0})],j.prototype,`hasRegionTooltip`,void 0),S([s()],j.prototype,`areaWidth`,void 0),S([s()],j.prototype,`areaHeight`,void 0),S([s()],j.prototype,`isDragging`,void 0),S([s()],j.prototype,`regions`,void 0),S([s()],j.prototype,`regionTooltip`,void 0);var nn=class extends j{constructor(...e){super(...e),this.snapToTicks=!1,this.fitTicks=!1,this.handleTrackMouseDown=e=>{this.disabled||(e.preventDefault(),this.startDrag(e.clientX,e.clientY))},this.handleTrackTouchStart=e=>{!this.disabled&&e.touches.length>0&&this.startDrag(e.touches[0].clientX,e.touches[0].clientY)},this.handleMouseMove=e=>{this.isDragging&&this.updateValueFromPointer(e.clientX,e.clientY)},this.handleTouchMove=e=>{this.isDragging&&e.touches.length>0&&(e.preventDefault(),this.updateValueFromPointer(e.touches[0].clientX,e.touches[0].clientY))},this.handleMouseUp=()=>{this.endDrag()},this.handleTouchEnd=()=>{this.endDrag()}}get isInteractiveTrack(){return!0}get thumbSizePx(){let e=getComputedStyle(this).getPropertyValue(`--fx-bar-thumb-size`).trim(),t=parseFloat(e);return Number.isFinite(t)?t:28}get travelPadPx(){return this.fitTicks&&this.ticks>1?this.wellPadPx+this.trackWidthPx/2:this.wellPadPx}get scaleInnerPadPx(){return this.fitTicks&&this.ticks>1?this.wellPadPx+this.trackWidthPx/2:0}static{this.styles=[j.styles,t`
            .track-area {
                cursor: pointer;
            }
            .thumb {
                position: absolute;
                left: 50%;
                width: var(--fx-bar-thumb-size);
                height: var(--fx-bar-thumb-size);
                margin-left: calc(var(--fx-bar-thumb-size) / -2);
                border-radius: 8px;
                background: var(--fx-bar-thumb-background);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(255, 255, 255, 0.04) inset;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 3px;
                pointer-events: none;
                z-index: 2;
                transition: none;
            }
            :host([orientation="horizontal"]) .thumb {
                top: 50%;
                left: auto;
                margin-left: 0;
                margin-top: calc(var(--fx-bar-thumb-size) / -2);
                flex-direction: row;
            }
            :host([is-animated]) .thumb {
                transition: top 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([orientation="horizontal"][is-animated]) .thumb {
                transition: left 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([is-animated]) .thumb[data-dragging="true"] {
                transition: top 0.28s cubic-bezier(0.22, 1, 0.36, 1);
            }
            :host([orientation="horizontal"][is-animated]) .thumb[data-dragging="true"] {
                transition: left 0.28s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .grip {
                width: 12px;
                height: 1.5px;
                border-radius: 1px;
                background: var(--fx-bar-thumb-grip);
            }
            :host([orientation="horizontal"]) .grip {
                width: 1.5px;
                height: 12px;
            }
        `]}renderThumb(e,t){let r=this.scaleInnerPadPx,i=this.trackInsetStartPx,a=this.trackInsetEndPx,o=this.isFillReversed?1-t:t,s=i+r,c=`100% - ${i+a+r*2}px`,l=this.isHorizontal?`calc(${s}px + (${c}) * ${o} - (var(--fx-bar-thumb-size) / 2))`:`calc(${s}px + (${c}) * ${1-o} - (var(--fx-bar-thumb-size) / 2))`,u=this.isHorizontal?e?`left: ${l}; top: ${e.trackCenter}px;`:`left: ${l};`:e?`top: ${l}; left: ${e.trackCenter}px; margin-left: calc(var(--fx-bar-thumb-size) / -2);`:`top: ${l};`;return n`
            <div
                class="thumb"
                data-dragging="${this.isDragging}"
                style="${u}"
            >
                <span class="grip"></span>
                <span class="grip"></span>
            </div>
        `}updated(e){super.updated(e),e.has(`fitTicks`)&&this.updateSlottedScale()}getEventDetail(){return{value:this.value,displayValue:this.roundedValue}}dispatchInputEvent(){this.dispatchEvent(new CustomEvent(`input`,{detail:this.getEventDetail(),bubbles:!0,composed:!0}))}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent(`change`,{detail:this.getEventDetail(),bubbles:!0,composed:!0}))}startDrag(e,t){this.disabled||(this.isDragging=!0,this.updateValueFromPointer(e,t),window.addEventListener(`mousemove`,this.handleMouseMove),window.addEventListener(`mouseup`,this.handleMouseUp),window.addEventListener(`touchmove`,this.handleTouchMove,{passive:!1}),window.addEventListener(`touchend`,this.handleTouchEnd))}endDrag(){this.isDragging&&(this.isDragging=!1,window.removeEventListener(`mousemove`,this.handleMouseMove),window.removeEventListener(`mouseup`,this.handleMouseUp),window.removeEventListener(`touchmove`,this.handleTouchMove),window.removeEventListener(`touchend`,this.handleTouchEnd),this.dispatchChangeEvent())}updateValueFromPointer(e,t){let n=this.shadowRoot?.querySelector(`.well`);if(n){let r=n.getBoundingClientRect(),i=this.travelPadPx,a;if(this.fitTicks&&this.ticks>1){let n=Math.max((this.isHorizontal?r.width:r.height)-i*2,1);if(this.isHorizontal){let t=e-r.left-i;a=Math.min(Math.max(t/n,0),1)}else{let e=t-r.top-i;a=1-Math.min(Math.max(e/n,0),1)}}else{let n=this.thumbSizePx,i=this.wellPadPx;if(this.isHorizontal){let t=Math.max(r.width-i*2-n,1),o=e-r.left-i-n/2;a=Math.min(Math.max(o/t,0),1)}else{let e=Math.max(r.height-i*2-n,1),o=t-r.top-i-n/2;a=1-Math.min(Math.max(o/e,0),1)}}this.isFillReversed&&(a=1-a);let o=this.min+a*(this.max-this.min);if(this.ticks>1&&this.snapToTicks){let e=(this.max-this.min)/(this.ticks-1),t=Math.round((o-this.min)/e);o=this.min+t*e}this.value=o,this.dispatchInputEvent()}}};S([o({type:Boolean,attribute:`snap-to-ticks`,reflect:!0})],nn.prototype,`snapToTicks`,void 0),S([o({type:Boolean,attribute:`fit-ticks`,reflect:!0})],nn.prototype,`fitTicks`,void 0),nn=S([a(`fx-fader`)],nn);var rn=class extends j{constructor(...e){super(...e),this.hasValueDisplay=!0,this.isSegmented=!0,this.isRounded=!1,this.trackThickness=`medium`}get segmentCount(){return this.ticks>1?(this.ticks-1)*2:this.ticks>=1?this.ticks*2:20}static{this.styles=[j.styles,t`
            :host {
                --fx-bar-width: 110px;
                --fx-bar-track-width: 16px;
            }
            :host([orientation="horizontal"]) {
                --fx-bar-height: 110px;
            }
            :host([track-thickness="small"]) {
                --fx-bar-track-width: 10px;
            }
            :host([track-thickness="medium"]) {
                --fx-bar-track-width: 16px;
            }
            :host([track-thickness="large"]) {
                --fx-bar-track-width: 24px;
            }

            :host([is-animated]) .fill {
                transition: height 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([orientation="horizontal"][is-animated]) .fill {
                transition: width 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .fill {
                border-radius: 0;
            }
            
            :host([is-rounded]:not([orientation="horizontal"]):not([value-origin="start"])) .fill {
                border-bottom-left-radius: 999px;
                border-bottom-right-radius: 999px;
            }
            :host([is-rounded]:not([orientation="horizontal"]):not([value-origin="start"])) .fill[data-full="true"] {
                border-top-left-radius: 999px;
                border-top-right-radius: 999px;
            }
            :host([is-rounded][value-origin="start"]:not([orientation="horizontal"])) .fill {
                border-top-left-radius: 999px;
                border-top-right-radius: 999px;
            }
            :host([is-rounded][value-origin="start"]:not([orientation="horizontal"])) .fill[data-full="true"] {
                border-bottom-left-radius: 999px;
                border-bottom-right-radius: 999px;
            }
            :host([is-rounded][orientation="horizontal"]:not([value-origin="end"])) .fill {
                border-top-left-radius: 999px;
                border-bottom-left-radius: 999px;
            }
            :host([is-rounded][orientation="horizontal"]:not([value-origin="end"])) .fill[data-full="true"] {
                border-top-right-radius: 999px;
                border-bottom-right-radius: 999px;
            }
            :host([is-rounded][orientation="horizontal"][value-origin="end"]) .fill {
                border-top-right-radius: 999px;
                border-bottom-right-radius: 999px;
            }
            :host([is-rounded][orientation="horizontal"][value-origin="end"]) .fill[data-full="true"] {
                border-top-left-radius: 999px;
                border-bottom-left-radius: 999px;
            }

            :host(:not([is-rounded])) .track {
                border-radius: 2px;
            }
            :host(:not([is-rounded])) .well {
                border-radius: 3px;
            }

            .segment-lines {
                position: absolute;
                inset: 0;
                pointer-events: none;
                z-index: 1;
            }
            .segment-line {
                position: absolute;
                background: var(--fx-bar-track-color, #0b111f);
            }
            :host(:not([orientation="horizontal"])) .segment-line {
                left: 0;
                right: 0;
                height: var(--fx-linear-bar-segment-gap, 2px);
                transform: translateY(50%);
            }
            :host([orientation="horizontal"]) .segment-line {
                top: 0;
                bottom: 0;
                width: var(--fx-linear-bar-segment-gap, 2px);
                transform: translateX(-50%);
            }
        `]}connectedCallback(){super.connectedCallback(),this.applyTrackThickness()}updated(e){super.updated(e),e.has(`trackThickness`)&&(this.applyTrackThickness(),this.updateSlottedScale())}applyTrackThickness(){let e=String(this.trackThickness).trim().toLowerCase();/^\d+(\.\d+)?$/.test(e)?this.style.setProperty(`--fx-bar-track-width`,`${e}px`):this.style.removeProperty(`--fx-bar-track-width`)}renderTrackDecorations(e){let t=Math.max(1,Math.round(this.segmentCount));return this.isSegmented&&t>=2?n`
                        <div class="segment-lines" aria-hidden="true">
                            ${Array.from({length:t-1},(e,r)=>{let i=(r+1)/t*100,a=this.isHorizontal?`left: ${i}%;`:`bottom: ${i}%;`;return n`<div class="segment-line" style="${a}"></div>`})}
                        </div>
                    `:r}};S([o({type:Boolean,attribute:`has-value-display`,reflect:!0})],rn.prototype,`hasValueDisplay`,void 0),S([o({type:Boolean,attribute:`is-segmented`,reflect:!0})],rn.prototype,`isSegmented`,void 0),S([o({type:Boolean,attribute:`is-rounded`,reflect:!0,converter:{fromAttribute:e=>e!==null&&e!==`false`,toAttribute:e=>e?``:null}})],rn.prototype,`isRounded`,void 0),S([o({type:String,attribute:`track-thickness`,reflect:!0})],rn.prototype,`trackThickness`,void 0),rn=S([a(`fx-linear-bar`)],rn);var an=class extends Qt{constructor(...e){super(...e),this.thickness=2.5}static{this.styles=t`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        }
        :host([has-shadow]) svg {
            overflow: visible;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.55));
        }
    `}render(){let{displayAngle:e,thickness:t}=this,r=`M ${50-t} 50 L 50 12.5 L ${50+t} 50 Z`;return n`
            <svg viewBox="-4 -4 108 108">
                <defs>
                    <linearGradient id="fx-needle-default-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="var(--fx-gauge-needle-gradient-start, #f97316)" />
                        <stop offset="100%" stop-color="var(--fx-gauge-needle-gradient-end, #ef4444)" />
                    </linearGradient>
                </defs>
                <g style="transform: rotate(${e}deg); transform-origin: ${50}px ${50}px; transition: var(--fx-gauge-transition, none);">
                    <path
                        d="${r}"
                        fill="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                        stroke="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                        stroke-width="0.5"
                        stroke-linejoin="round"
                    />
                    <circle
                        cx="${50}" cy="${50}" r="4"
                        fill="var(--fx-gauge-text-primary, #111827)"
                        stroke="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                        stroke-width="1"
                    />
                    <circle
                        cx="${50}" cy="${50}" r="1.5"
                        fill="var(--fx-gauge-needle-color, url(#fx-needle-default-gradient))"
                    />
                </g>
            </svg>
        `}};S([o({type:Number})],an.prototype,`thickness`,void 0),an=S([a(`fx-gauge-needle-triangle`)],an);var M,N=class extends T(w){static{M=this}constructor(...e){super(...e),this.guid=`fx-${Qe.newGuid()}`,this.hasScaleLabels=!0,this.ticksSide=`left`,this.count=10,this.subDivisions=5,this.orientation=`vertical`,this.trackThickness=`medium`,this.valueOrigin=`end`,this.caption=``,this.spacing=4,this.hasScaleConnectingLine=!1,this.isRoundedTrack=!0,this.isRoundedShell=!0,this.hasShell=!0,this.hasRegionTooltip=!1,this.layoutWidth=0,this.layoutHeight=0,this.regions=[],this.regionTooltip=null,this.onRegionsChanged=()=>this.refreshRegions(),this.refreshRegions=()=>{this.regions=qt(this)},this.showRegionTooltip=(e,t)=>{this.hasRegionTooltip&&(this.regionTooltip=Zt(this,e,t))},this.moveRegionTooltip=(e,t)=>{!this.hasRegionTooltip||!this.regionTooltip||(this.regionTooltip=Zt(this,e,t))},this.hideRegionTooltip=()=>{this.regionTooltip=null},this.onScaleSlotChange=()=>{this.updateSlottedScale(),this.requestUpdate()}}static{this.shellThickBase=120}static{this.shellLengthBase=480}static{this.compactEndInset=10}static{this.compactCaptionInset=18}static{this.compactMinPad=4}static{this.compactScaleBand=38}static{this.regionBand=7}static{this.regionGap=1.5}static{this.styles=[E,Jt,t`
            :host {
                position: relative;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                font-family: var(--fx-font-family, sans-serif);
                --fx-linear-gauge-width: 120px;
                --fx-linear-gauge-height: 480px;
                --fx-linear-scale-label-font-size: 9px;
                --fx-linear-scale-color: #475569;
                --fx-linear-scale-label-color: #64748b;
                --fx-linear-gauge-track-color: #0f172a;
                --fx-linear-gauge-shadow-opacity: 0.25;
                --fx-linear-gauge-gradient-start: var(--fx-theme-gradient-start, #06b6d4);
                --fx-linear-gauge-gradient-middle: var(--fx-theme-gradient-middle, #6366f1);
                --fx-linear-gauge-gradient-end: var(--fx-theme-gradient-end, #a855f7);
                gap: 8px;
                overflow: visible;
                box-sizing: border-box;
            }
            :host([has-shell]) {
                background: var(--fx-theme-linear-shell-background, #080b10);
                border-radius: 8px;
            }
            .inner {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
            }
            :host([has-shell]) .inner {
                padding: 12px 8px;
            }
            :host([has-shell][theme="silver"]) {
                background: #1e293b;
            }
            :host([has-shell][theme="dark"]) {
                background: #080b10;
            }
            :host([orientation="horizontal"]) {
                flex-direction: row;
                align-items: center;
                gap: 8px;
                --fx-linear-gauge-width: 480px;
                --fx-linear-gauge-height: 120px;
            }
            :host([orientation="horizontal"]) .inner {
                flex-direction: row;
                align-items: center;
            }
            :host([is-animated]) {
                --fx-linear-gauge-transition: height 0.8s cubic-bezier(0.1, 1, 0.1, 1),
                    y 0.8s cubic-bezier(0.1, 1, 0.1, 1),
                    width 0.8s cubic-bezier(0.1, 1, 0.1, 1),
                    x 0.8s cubic-bezier(0.1, 1, 0.1, 1);
            }

            .body {
                position: relative;
                width: var(--fx-linear-gauge-width);
                height: var(--fx-linear-gauge-height);
                overflow: visible;
            }
            .body svg .region-band {
                pointer-events: all;
            }
            :host([has-region-tooltip]) .body svg .region-band {
                cursor: help;
            }
            .body svg {
                display: block;
                width: 100%;
                height: 100%;
                overflow: visible;
            }
            .scale {
                position: absolute;
                inset: 0;
                pointer-events: none;
                overflow: visible;
            }
            ::slotted([slot="scale"]) {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            .display {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            :host([orientation="horizontal"]) .display {
                align-items: flex-start;
            }
        `]}get isHorizontal(){return this.orientation===`horizontal`}get scaleSideFlags(){let e=Array.from(this.querySelectorAll(`:scope > [slot="scale"]`));if(e.length>0){let t=!1,n=!1;for(let r of e){let e=String(r.side??r.getAttribute(`side`)??`left`);(e===`left`||e===`top`||e===`both`)&&(t=!0),(e===`right`||e===`bottom`||e===`both`)&&(n=!0)}return{start:t,end:n}}let t=this.ticksSide;return{start:t===`left`||t===`both`,end:t===`right`||t===`both`}}get hasAnyCaption(){return this.caption?!0:Array.from(this.querySelectorAll(`:scope > [slot="scale"]`)).some(e=>{let t=e.caption??e.getAttribute(`caption`)??``;return String(t).length>0})}get regionRailCross(){return this.regions.length>0?M.regionBand+M.regionGap:0}get geometry(){let e=M.shellThickBase,t=this.wellThick,n=this.scaleSideFlags,r=this.regionRailCross,i=n.start?M.compactScaleBand:M.compactMinPad,a=(n.end?M.compactScaleBand:M.compactMinPad)+r,o=i+t+a,s=i,c=this.layoutWidth>0&&this.layoutHeight>0,l=c?this.isHorizontal?o*(this.layoutWidth/this.layoutHeight):o*(this.layoutHeight/this.layoutWidth):o*(M.shellLengthBase/e),u=this.hasAnyCaption?M.compactCaptionInset:M.compactEndInset,d=M.compactEndInset,f=this.isHorizontal?d:u,p=this.isHorizontal?u:d,m=c?this.isHorizontal?this.layoutWidth:this.layoutHeight:M.shellLengthBase,h=f/m*l,g=p/m*l,_=Math.max(l-h-g,0),v=s+t/2;return{shellThick:e,shellLength:l,inset:h,insetStart:h,insetEnd:g,wellLength:_,viewCross:o,trackOrigin:s,trackCenter:v,scaleTrackThickness:t+r,scaleTrackCenter:v+r/2}}get bodyStyle(){let{viewCross:e}=this.geometry,t=e/M.shellThickBase;return this.isHorizontal?`width: var(--fx-linear-gauge-width); height: calc(var(--fx-linear-gauge-height) * ${t});`:`width: calc(var(--fx-linear-gauge-width) * ${t}); height: var(--fx-linear-gauge-height);`}getScaleValueOrigin(){return _(this,`scale`,this.valueOrigin)}get wellThick(){let e=String(this.trackThickness).trim();switch(e){case`small`:return 9;case`medium`:return 18;case`large`:return 27;case`x-large`:case`xlarge`:return 36;default:return/^\d+$/.test(e)?parseInt(e,10):18}}firstUpdated(){this.refreshRegions(),this.addEventListener(`regionupdate`,this.onRegionsChanged);let e=this.shadowRoot?.querySelector(`.body`);e&&typeof ResizeObserver<`u`&&(this.resizeObserver=new ResizeObserver(e=>{let t=e[0]?.contentRect;if(t){let e=t.width,n=t.height;(e!==this.layoutWidth||n!==this.layoutHeight)&&(this.layoutWidth=e,this.layoutHeight=n)}}),this.resizeObserver.observe(e))}disconnectedCallback(){this.removeEventListener(`regionupdate`,this.onRegionsChanged),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,super.disconnectedCallback()}valueToTrackFraction(e){let t=this.max-this.min;return t===0?0:Math.min(Math.max((e-this.min)/t,0),1)}renderRegions(e,t,n,a,o){let s=M.regionBand,c=M.regionGap,l=h(e?`horizontal`:`vertical`,this.getScaleValueOrigin());return this.regions.map(u=>{let d=Math.min(u.from,u.to),f=Math.max(u.from,u.to);if(f<=this.min||d>=this.max)return r;let p=this.valueToTrackFraction(d),m=this.valueToTrackFraction(f);if(m<=p)return r;let h={pointerenter:e=>this.showRegionTooltip(e,u),pointermove:e=>this.moveRegionTooltip(e,u),pointerleave:this.hideRegionTooltip};if(e){let e=l?t+(1-m)*n:t+p*n,r=(m-p)*n,d=a+o+c;return i`
                    <rect
                        class="region-band"
                        x="${e}"
                        y="${d}"
                        width="${r}"
                        height="${s}"
                        fill="${u.color}"
                        @pointerenter=${h.pointerenter}
                        @pointermove=${h.pointermove}
                        @pointerleave=${h.pointerleave}
                    />
                `}let g=l?t+p*n:t+(1-m)*n,_=(m-p)*n,v=a+o+c;return i`
                <rect
                    class="region-band"
                    x="${v}"
                    y="${g}"
                    width="${s}"
                    height="${_}"
                    fill="${u.color}"
                    @pointerenter=${h.pointerenter}
                    @pointermove=${h.pointermove}
                    @pointerleave=${h.pointerleave}
                />
            `})}renderDefs(){let{guid:e,isHorizontal:t}=this,{wellLength:n,insetStart:r}=this.geometry,a=r+n,o=h(t?`horizontal`:`vertical`,this.getScaleValueOrigin()),s=i`
            <stop offset="0%" stop-color="var(--fx-linear-gauge-gradient-start, #06b6d4)"/>
            <stop offset="50%" stop-color="var(--fx-linear-gauge-gradient-middle, #6366f1)"/>
            <stop offset="100%" stop-color="var(--fx-linear-gauge-gradient-end, #a855f7)"/>
        `,c=i`
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
            <stop offset="48%" stop-color="#ffffff" stop-opacity="0.2"/>
            <stop offset="52%" stop-color="#000000" stop-opacity="0.05"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.15"/>
        `,l=o?a:r,u=o?r:a,d=o?r:a,f=o?a:r,p=i`
            <filter id="${e}-inset-shadow" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
                <feOffset in="SourceAlpha" dx="0" dy="1.5" result="offset"></feOffset>
                <feGaussianBlur in="offset" stdDeviation="2.2" result="blurred"></feGaussianBlur>
                <feComposite operator="out" in="SourceAlpha" in2="blurred" result="inverse"></feComposite>
                <feFlood flood-color="#000000" flood-opacity="var(--fx-linear-gauge-shadow-opacity)" result="shadowColor"></feFlood>
                <feComposite operator="in" in="shadowColor" in2="inverse" result="shadow"></feComposite>
                <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite>
            </filter>
        `;return t?i`
                    <defs>
                        <linearGradient id="${e}-grad" x1="${l}" y1="0" x2="${u}" y2="0" gradientUnits="userSpaceOnUse">
                            ${s}
                        </linearGradient>
                        <linearGradient id="${e}-shine" x1="0" y1="0" x2="0" y2="1">
                            ${c}
                        </linearGradient>
                        ${p}
                    </defs>
                `:i`
                    <defs>
                        <linearGradient id="${e}-grad" x1="0" y1="${d}" x2="0" y2="${f}" gradientUnits="userSpaceOnUse">
                            ${s}
                        </linearGradient>
                        <linearGradient id="${e}-shine" x1="0" y1="0" x2="1" y2="0">
                            ${c}
                        </linearGradient>
                        ${p}
                    </defs>
                `}renderVerticalTube(){let{guid:e,geometry:{shellLength:t,wellLength:r,insetStart:i,viewCross:a,trackOrigin:o},wellThick:s,isRoundedTrack:c,progress:l}=this,u=s+2,d=o-1,f=o,p=c?12/40*u:0,m=c?12/40*s:0,g=h(`vertical`,this.getScaleValueOrigin()),_=Math.max(l*r,0),v=g?i:i+r-_;return n`
            <svg viewBox="0 0 ${a} ${t}">
                ${this.renderDefs()}
                <defs>
                    <clipPath id="${e}-clip">
                        <rect
                            x="${f}"
                            y="${v}"
                            width="${s}"
                            height="${_}"
                            style="transition: ${`var(--fx-linear-gauge-transition, none)`};"
                        />
                    </clipPath>
                </defs>

                <rect
                    x="${d}" y="${i-1}" width="${u}" height="${r+2}" rx="${p}"
                    fill="var(--fx-linear-gauge-track-color, #0f172a)"
                    filter="url(#${e}-inset-shadow)"
                />
                <g clip-path="url(#${e}-clip)">
                    <rect
                        x="${f}" y="${i}" width="${s}" height="${r}" rx="${m}"
                        fill="url(#${e}-grad)"
                    />
                    <rect
                        x="${f+1}" y="${i}" width="${Math.max(s-2,0)}" height="${r}" rx="${m}"
                        fill="url(#${e}-shine)"
                        opacity="0.35"
                    />
                </g>
                ${this.renderRegions(!1,i,r,o,s)}
            </svg>
        `}renderHorizontalTube(){let{guid:e,geometry:{shellLength:t,wellLength:r,insetStart:i,viewCross:a,trackOrigin:o},wellThick:s,isRoundedTrack:c,progress:l}=this,u=s+2,d=o-1,f=o,p=c?12/40*u:0,m=c?12/40*s:0,g=h(`horizontal`,this.getScaleValueOrigin()),_=Math.max(l*r,0),v=g?i+r-_:i;return n`
            <svg viewBox="0 0 ${t} ${a}">
                ${this.renderDefs()}
                <defs>
                    <clipPath id="${e}-clip">
                        <rect
                            x="${v}"
                            y="${f}"
                            width="${_}"
                            height="${s}"
                            style="transition: ${`var(--fx-linear-gauge-transition, none)`};"
                        />
                    </clipPath>
                </defs>

                <rect
                    x="${i-1}" y="${d}" width="${r+2}" height="${u}" rx="${p}"
                    fill="var(--fx-linear-gauge-track-color, #0f172a)"
                    filter="url(#${e}-inset-shadow)"
                />
                <g clip-path="url(#${e}-clip)">
                    <rect
                        x="${i}" y="${f}" width="${r}" height="${s}" rx="${m}"
                        fill="url(#${e}-grad)"
                    />
                    <rect
                        x="${i}" y="${f+1}" width="${r}" height="${Math.max(s-2,0)}" rx="${m}"
                        fill="url(#${e}-shine)"
                        opacity="0.35"
                    />
                </g>
                ${this.renderRegions(!0,i,r,o,s)}
            </svg>
        `}get scaleOffsets(){let{isHorizontal:e,geometry:{insetStart:t,wellLength:n,shellLength:r,viewCross:i,scaleTrackCenter:a,scaleTrackThickness:o}}=this,s=e?`horizontal`:`vertical`,{startOffset:c,endOffset:l}=g(s,this.getScaleValueOrigin(),n,0);return{orientation:s,start:t+c,end:t+l,viewBoxWidth:e?r:i,viewBoxHeight:e?i:r,trackCenter:a,trackThickness:o}}renderScale(){let{scaleOffsets:{orientation:e,start:t,end:r,viewBoxWidth:i,viewBoxHeight:a,trackCenter:o,trackThickness:s}}=this;return n`
            <slot name="scale" @slotchange=${this.onScaleSlotChange}>
                <fx-linear-scale
                    .value=${this.value}
                    .min=${this.min}
                    .max=${this.max}
                    .count=${this.count}
                    .subDivisions=${this.subDivisions}
                    .side=${this.ticksSide}
                    .hasScaleLabels=${this.hasScaleLabels}
                    .orientation=${e}
                    .valueOrigin=${this.valueOrigin}
                    .startOffset=${t}
                    .endOffset=${r}
                    .viewBoxWidth=${i}
                    .viewBoxHeight=${a}
                    .trackThickness=${s}
                    .trackCenter=${o}
                    .caption=${this.caption}
                    .captionOffset=${14}
                    .spacing=${this.spacing}
                    .hasScaleConnectingLine=${this.hasScaleConnectingLine}
                ></fx-linear-scale>
            </slot>
        `}renderDisplay(){return this.hasValueDisplay?n`
                    <div class="display">
                        <slot name="display" @slotchange=${this.updateSlottedDisplay}>
                            <fx-value-display
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .unit=${this.unit}
                                .label=${this.label}
                                .align=${this.isHorizontal?`left`:`center`}
                            ></fx-value-display>
                        </slot>
                    </div>
                `:n``}render(){return n`
            <div class="inner">
                <div class="body" style="${this.bodyStyle}">
                    ${this.isHorizontal?this.renderHorizontalTube():this.renderVerticalTube()}
                    <div class="scale">${this.renderScale()}</div>
                </div>
                <slot @slotchange=${this.refreshRegions} style="display:none;"></slot>
                ${this.renderDisplay()}
                ${Xt(this.regionTooltip)}
            </div>
        `}updated(e){super.updated(e),(e.has(`value`)||e.has(`min`)||e.has(`max`)||e.has(`unit`)||e.has(`label`))&&this.updateSlottedDisplay(),(e.has(`value`)||e.has(`min`)||e.has(`max`)||e.has(`orientation`)||e.has(`valueOrigin`)||e.has(`trackThickness`)||e.has(`hasScaleLabels`)||e.has(`caption`)||e.has(`theme`)||e.has(`spacing`)||e.has(`hasScaleConnectingLine`)||e.has(`hasShell`)||e.has(`ticksSide`)||e.has(`layoutWidth`)||e.has(`layoutHeight`)||e.has(`regions`))&&this.updateSlottedScale()}updateSlottedScale(){let e=this.shadowRoot?.querySelector(`slot[name="scale"]`);if(e){let t=e.assignedElements();if(t.length){let{caption:e,max:n,min:r,scaleOffsets:{orientation:i,start:a,end:o,viewBoxWidth:s,viewBoxHeight:c,trackCenter:l,trackThickness:u},hasScaleLabels:d,hasScaleConnectingLine:f,spacing:p,value:m}=this;for(let h of t)`orientation`in h&&(h.orientation=i),`startOffset`in h&&(h.startOffset=a),`endOffset`in h&&(h.endOffset=o),`viewBoxWidth`in h&&(h.viewBoxWidth=s),`viewBoxHeight`in h&&(h.viewBoxHeight=c),`trackCenter`in h&&(h.trackCenter=l),`trackThickness`in h&&!h.hasAttribute(`track-thickness`)&&(h.trackThickness=u),`spacing`in h&&!h.hasAttribute(`spacing`)&&(h.spacing=p),`hasScaleConnectingLine`in h&&!h.hasAttribute(`has-scale-connecting-line`)&&(h.hasScaleConnectingLine=f),`captionOffset`in h&&!h.hasAttribute(`caption-offset`)&&(h.captionOffset=14),`hasScaleLabels`in h&&y(h.hasScaleLabels)&&(h.hasScaleLabels=d),`value`in h&&y(h.value)&&(h.value=m),`min`in h&&y(h.min)&&(h.min=r),`max`in h&&y(h.max)&&(h.max=n),`caption`in h&&!h.caption&&(h.caption=e)}}}updateSlottedDisplay(){let e=(this.shadowRoot?.querySelector(`slot[name="display"]`))?.assignedElements()[0];e&&(`value`in e&&(e.value=this.value),`min`in e&&(e.min=this.min),`max`in e&&(e.max=this.max),`unit`in e&&(e.unit=this.unit),`label`in e&&(e.label=this.label))}};S([o({type:Boolean,attribute:`has-scale-labels`,reflect:!0})],N.prototype,`hasScaleLabels`,void 0),S([o({type:String,attribute:`ticks-side`})],N.prototype,`ticksSide`,void 0),S([o({type:Number})],N.prototype,`count`,void 0),S([o({type:Number,attribute:`sub-divisions`})],N.prototype,`subDivisions`,void 0),S([o({type:String,reflect:!0})],N.prototype,`orientation`,void 0),S([o({type:String,attribute:`track-thickness`})],N.prototype,`trackThickness`,void 0),S([o({type:String,attribute:`value-origin`,reflect:!0})],N.prototype,`valueOrigin`,void 0),S([o({type:String})],N.prototype,`caption`,void 0),S([o({type:String,reflect:!0,converter:b})],N.prototype,`theme`,void 0),S([o({type:Number})],N.prototype,`spacing`,void 0),S([o({type:Boolean,attribute:`has-scale-connecting-line`,reflect:!0})],N.prototype,`hasScaleConnectingLine`,void 0),S([o({type:Boolean,attribute:`is-rounded-track`,reflect:!0})],N.prototype,`isRoundedTrack`,void 0),S([o({type:Boolean,attribute:`is-rounded-shell`,reflect:!0})],N.prototype,`isRoundedShell`,void 0),S([o({type:Boolean,attribute:`has-shell`,reflect:!0})],N.prototype,`hasShell`,void 0),S([o({type:Boolean,attribute:`has-region-tooltip`,reflect:!0})],N.prototype,`hasRegionTooltip`,void 0),S([s()],N.prototype,`layoutWidth`,void 0),S([s()],N.prototype,`layoutHeight`,void 0),S([s()],N.prototype,`regions`,void 0),S([s()],N.prototype,`regionTooltip`,void 0),N=M=S([a(`fx-linear-gauge`)],N);var P=class extends tn{constructor(...e){super(...e),this.hasScaleLabels=!1,this.outerRadius=39.5,this.innerRadius=34.5,this.textRadius=31,this.labelFontSize=4}*renderTicks(){let{count:e,startAngle:t,arcLength:n,min:r,max:a,hasScaleLabels:o,isFullCircle:s}=this,{outerRadius:c,innerRadius:l,textRadius:u,labelFontSize:d}=this,f=s?e-1:e;for(let s=0;s<=f;s++){let f=(t+s/e*n)*Math.PI/180,p=50+c*Math.sin(f),m=50-c*Math.cos(f),h=50+l*Math.sin(f),g=50-l*Math.cos(f);if(yield i`
                <line
                    x1="${p}" y1="${m}"
                    x2="${h}" y2="${g}"
                    stroke="var(--fx-radial-scale-color, #94a3b8)"
                    stroke-width="1"
                    stroke-linecap="round"
                />
            `,o){let t=a-r,n=r+s/e*t,o=50+u*Math.sin(f),c=50-u*Math.cos(f);yield i`
                    <text
                        x="${o}"
                        y="${c}"
                        fill="var(--fx-radial-scale-label-color, #cbd5e1)"
                        font-size="${d}"
                        font-family="var(--fx-font-family, sans-serif)"
                        font-weight="600"
                        text-anchor="middle"
                        dominant-baseline="central"
                    >
                        ${this.resolveLabel(n)}
                    </text>
                `}}}render(){return n`
            <svg viewBox="-4 -4 108 108">
                ${this.renderTicks()}
            </svg>
        `}};S([o({type:Boolean,attribute:`has-scale-labels`})],P.prototype,`hasScaleLabels`,void 0),S([o({type:Number,attribute:`outer-radius`})],P.prototype,`outerRadius`,void 0),S([o({type:Number,attribute:`inner-radius`})],P.prototype,`innerRadius`,void 0),S([o({type:Number,attribute:`text-radius`})],P.prototype,`textRadius`,void 0),S([o({type:Number,attribute:`label-font-size`})],P.prototype,`labelFontSize`,void 0),P=S([a(`fx-radial-simple-scale`)],P);var on=class extends T(C){constructor(...e){super(...e),this.angle=0,this.radius=40}static{this.styles=[E,t`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
            svg {
                display: block;
                width: 100%;
                height: 100%;
                overflow: visible;
                pointer-events: none;
            }
            .knob {
                fill: var(--fx-knob, #1e293b);
                stroke: var(--fx-knob-ring, #334155);
                stroke-width: 2;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
            }
            .pointer-group {
                transform-origin: center;
                transition: none;
            }
            :host([is-animated]) .pointer-group {
                transition: transform 0.32s cubic-bezier(0.1, 1, 0.1, 1);
            }
            .pointer {
                stroke: var(--fx-knob-pointer, #f8fafc);
                stroke-width: 3;
                stroke-linecap: round;
            }
        `]}render(){let{radius:e,angle:t}=this,r=e*2,i=e,a=e;return n`
            <svg viewBox="0 0 ${r} ${r}" aria-hidden="true">
                <circle class="knob" cx="${i}" cy="${a}" r="${e}" />
                <g
                    class="pointer-group"
                    style="transform-origin: ${i}px ${a}px; transform: rotate(${t}deg);"
                >
                    <line
                        class="pointer"
                        x1="${i}"
                        y1="${a-e+10}"
                        x2="${i}"
                        y2="${a-e+2}"
                    />
                </g>
            </svg>
        `}};S([o({type:Number})],on.prototype,`angle`,void 0),on=S([a(`fx-knob`)],on);var F=class extends T(w){constructor(...e){super(...e),this.hasValueDisplay=!1,this.startAngle=-135,this.arcLength=270,this.hasScaleLabels=!0,this.ticks=0,this.snapToTicks=!1,this.isDragging=!1,this.hasCustomKnob=!1,this.hasCustomScale=!1,this.handleMouseMove=e=>{this.isDragging&&this.updateValueFromCoordinates(e)},this.handleTouchMove=e=>{this.isDragging&&(e.preventDefault(),this.updateValueFromCoordinates(e))},this.handleMouseUp=()=>{this.endDrag()},this.handleTouchEnd=()=>{this.endDrag()}}static{this.styles=[E,t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-potentiometer-size: 220px;
                --fx-potentiometer-theme-color: #06b6d4;
                --fx-potentiometer-track-color: #0f172a;
                --fx-potentiometer-fill-color: linear-gradient(
                    135deg,
                    var(--fx-theme-gradient-start, #06b6d4),
                    var(--fx-theme-gradient-middle, #6366f1),
                    var(--fx-theme-gradient-end, #a855f7)
                );
                --fx-potentiometer-bezel-fill: var(--fx-theme-potentiometer-bezel-fill, #1e293b);
                --fx-potentiometer-bezel-stroke: var(--fx-theme-potentiometer-bezel-stroke, #334155);
                --fx-potentiometer-gradient-start: var(--fx-theme-gradient-start, #06b6d4);
                --fx-potentiometer-gradient-middle: var(--fx-theme-gradient-middle, #6366f1);
                --fx-potentiometer-gradient-end: var(--fx-theme-gradient-end, #a855f7);
                --fx-knob: var(--fx-theme-potentiometer-knob, #1e293b);
                --fx-knob-ring: var(--fx-theme-potentiometer-knob-ring, #334155);
                --fx-knob-pointer: var(--fx-potentiometer-theme-color, #3b82f6);
                --fx-radial-scale-color: #475569;
                --fx-radial-scale-label-color: #64748b;
            }
            :host([theme='silver']) {
                --fx-potentiometer-bezel-fill: #1e293b;
                --fx-potentiometer-bezel-stroke: #334155;
                --fx-knob: #1e293b;
                --fx-knob-ring: #334155;
            }
            :host([theme='dark']) {
                --fx-potentiometer-bezel-fill: #080b10;
                --fx-potentiometer-bezel-stroke: #12161e;
                --fx-knob: #080b10;
                --fx-knob-ring: #1f2937;
            }

            .potentiometer-wrap {
                position: relative;
                width: var(--fx-potentiometer-size);
                height: var(--fx-potentiometer-size);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            svg.dial {
                width: 100%;
                height: 100%;
                cursor: pointer;
                touch-action: none;
                overflow: visible;
            }

            .overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }

            .knob-host {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 1;
            }
            .knob-host--custom {
                inset: 0;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                transform: none;
            }
            .knob-host ::slotted(*) {
                display: block;
                width: 100%;
                height: 100%;
            }

            .track-fill-path {
                transition: none;
            }

            :host([is-animated]) .track-fill-path:not(.dragging) {
                transition: stroke-dashoffset 0.3s cubic-bezier(0.1, 1, 0.1, 1) !important;
            }

            .info-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                z-index: 1;
            }

            .info-wrap fx-value-display,
            .info-wrap ::slotted(fx-value-display),
            .info-wrap ::slotted([slot="display"]) {
                --fx-value-display-margin-top: 0.1rem;
            }
        `]}handleMouseDown(e){this.disabled||this.startDrag(e)}handleTouchStart(e){this.disabled||this.startDrag(e)}startDrag(e){this.disabled||(this.isDragging=!0,this.updateValueFromCoordinates(e),window.addEventListener(`mousemove`,this.handleMouseMove),window.addEventListener(`mouseup`,this.handleMouseUp),window.addEventListener(`touchmove`,this.handleTouchMove,{passive:!1}),window.addEventListener(`touchend`,this.handleTouchEnd))}endDrag(){this.isDragging&&(this.isDragging=!1,window.removeEventListener(`mousemove`,this.handleMouseMove),window.removeEventListener(`mouseup`,this.handleMouseUp),window.removeEventListener(`touchmove`,this.handleTouchMove),window.removeEventListener(`touchend`,this.handleTouchEnd),this.dispatchChangeEvent())}updateValueFromCoordinates(e){let t=this.shadowRoot?.querySelector(`svg.dial`);if(t){let n=t.getBoundingClientRect(),r=`touches`in e?e.touches[0].clientX:e.clientX,i=`touches`in e?e.touches[0].clientY:e.clientY,a=n.left+n.width/2,o=n.top+n.height/2,s=r-a,c=i-o,l=Math.atan2(c,s)*180/Math.PI+90;l<-180&&(l+=360),l>180&&(l-=360);let{min:u,max:d,startAngle:f,arcLength:p}=this,m=l-f;for(;m<0;)m+=360;for(;m>=360;)m-=360;let h=0;if(m<=p)h=m/p;else{let e=p+(360-p)/2;h=+(m<e)}let g=u+h*(d-u);if(this.ticks>1&&this.snapToTicks){let e=(d-u)/(this.ticks-1);g=u+Math.round((g-u)/e)*e}this.value=Math.round(g*100)/100,this.dispatchEvent(new CustomEvent(`input`,{detail:{value:this.value},bubbles:!0,composed:!0}))}}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent(`change`,{detail:{value:this.value},bubbles:!0,composed:!0}))}updated(e){super.updated(e),(e.has(`value`)||e.has(`min`)||e.has(`max`)||e.has(`startAngle`)||e.has(`arcLength`)||e.has(`isDragging`)||e.has(`isAnimated`))&&this.updateSlottedKnob(),(e.has(`value`)||e.has(`min`)||e.has(`max`)||e.has(`startAngle`)||e.has(`arcLength`)||e.has(`hasScaleLabels`))&&this.updateSlottedScale(),(e.has(`value`)||e.has(`min`)||e.has(`max`)||e.has(`unit`)||e.has(`label`))&&this.updateSlottedDisplay()}updateSlottedDisplay(){let e=this.shadowRoot?.querySelector(`slot[name="display"]`);if(e){let t=e.assignedElements()[0];t&&(`value`in t&&(t.value=this.value),`min`in t&&(t.min=this.min),`max`in t&&(t.max=this.max),`unit`in t&&(t.unit=this.unit),`label`in t&&(t.label=this.label))}}updateSlottedKnob(){let e=this.shadowRoot?.querySelector(`slot[name="knob"]`);if(e){let t=e.assignedElements();this.hasCustomKnob=t.length>0;let n=t[0];if(n){let e=this.startAngle+this.progress*this.arcLength;`angle`in n&&(n.angle=e),`value`in n&&(n.value=this.value),`progress`in n&&(n.progress=this.progress),`isDragging`in n&&(n.isDragging=this.isDragging),Wt(n)&&(n.isAnimated=this.isAnimated)}}}updateSlottedScale(){let e=this.shadowRoot?.querySelector(`slot[name="scale"]`);if(e){let t=e.assignedElements();this.hasCustomScale=t.length>0;let n=t[0];n&&(`value`in n&&(n.value=this.value),`min`in n&&(n.min=this.min),`max`in n&&(n.max=this.max),`startAngle`in n&&(n.startAngle=this.startAngle),`arcLength`in n&&(n.arcLength=this.arcLength),`hasScaleLabels`in n&&(n.hasScaleLabels=this.hasScaleLabels),`outerRadius`in n&&(n.outerRadius=38),`innerRadius`in n&&(n.innerRadius=35),`majorInnerRadius`in n&&(n.majorInnerRadius=35),`minorInnerRadius`in n&&(n.minorInnerRadius=36.5),`textRadius`in n&&(n.textRadius=30.5),`labelFontSize`in n&&(n.labelFontSize=5))}}describeArc(e,t,n,r,i){let a=e=>e*Math.PI/180,o=e+n*Math.sin(a(r)),s=t-n*Math.cos(a(r)),c=e+n*Math.sin(a(i)),l=t-n*Math.cos(a(i));return`M ${o} ${s} A ${n} ${n} 0 ${+(i-r>180)} 1 ${c} ${l}`}render(){let{startAngle:e,arcLength:t,progress:r,isDragging:i,ticks:a,hasCustomKnob:o,hasCustomScale:s}=this,c=e+r*t,l=e+t,u=a>1,d=u||s,f=d?43.5:39,p=d?4.5:5,m=d?36:54,h=this.describeArc(50,50,f,e,l),g=2*Math.PI*f*(t/360),_=g*(1-r);return n`
            <div class="potentiometer-wrap">
                <svg 
                    class="dial" 
                    viewBox="-4 -4 108 108"
                    @mousedown="${this.handleMouseDown}"
                    @touchstart="${this.handleTouchStart}"
                >
                    <defs>
                        <linearGradient id="fx-pot-fill-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="var(--fx-potentiometer-gradient-start, #06b6d4)" />
                            <stop offset="50%" stop-color="var(--fx-potentiometer-gradient-middle, #6366f1)" />
                            <stop offset="100%" stop-color="var(--fx-potentiometer-gradient-end, #a855f7)" />
                        </linearGradient>
                    </defs>

                    <circle
                        cx="${50}"
                        cy="${50}"
                        r="${48}"
                        fill="var(--fx-potentiometer-bezel-fill, #1e293b)"
                        stroke="var(--fx-potentiometer-bezel-stroke, #334155)"
                        stroke-width="1.5"
                    />
                    <circle
                        cx="${50}"
                        cy="${50}"
                        r="${44.5}"
                        fill="none"
                        stroke="var(--fx-potentiometer-bezel-stroke, #334155)"
                        stroke-width="0.6"
                        opacity="0.55"
                    />

                    <path
                        d="${h}"
                        fill="none"
                        stroke="var(--fx-potentiometer-track-color, #0f172a)"
                        stroke-width="${p}"
                        stroke-linecap="round"
                    />

                    <path
                        class="track-fill-path ${i?`dragging`:``}"
                        d="${h}"
                        fill="none"
                        stroke="url(#fx-pot-fill-grad)"
                        stroke-width="${p}"
                        stroke-linecap="round"
                        stroke-dasharray="${g}"
                        stroke-dashoffset="${_}"
                    />
                </svg>

                <div
                    class="knob-host ${o?`knob-host--custom`:``}"
                    style="${o?``:`width: ${m}%; height: ${m}%;`}"
                >
                    <slot name="knob" @slotchange="${this.updateSlottedKnob}">
                        <fx-knob
                            .angle=${c}
                            .isAnimated=${this.isAnimated&&!i}
                        ></fx-knob>
                    </slot>
                </div>

                <div class="overlay">
                    <slot name="scale" @slotchange=${this.updateSlottedScale}>
                        ${u?n`
                            <fx-radial-simple-scale
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .count=${a-1}
                                .startAngle=${e}
                                .arcLength=${t}
                                .hasScaleLabels=${this.hasScaleLabels}
                                .outerRadius=${38}
                                .innerRadius=${35}
                                .textRadius=${30.5}
                                .labelFontSize=${5}
                            ></fx-radial-simple-scale>
                        `:``}
                    </slot>
                </div>
            </div>

            ${this.hasValueDisplay?n`
                <div class="info-wrap">
                    <slot name="display" @slotchange="${this.updateSlottedDisplay}">
                        <fx-value-display
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .unit=${this.unit}
                            .label=${this.label}
                        ></fx-value-display>
                    </slot>
                </div>
            `:``}
        `}};S([o({type:Boolean,attribute:`has-value-display`,reflect:!0})],F.prototype,`hasValueDisplay`,void 0),S([o({type:Number,attribute:`start-angle`,reflect:!0})],F.prototype,`startAngle`,void 0),S([o({type:Number,attribute:`arc-length`,reflect:!0})],F.prototype,`arcLength`,void 0),S([o({type:Boolean,attribute:`has-scale-labels`,reflect:!0})],F.prototype,`hasScaleLabels`,void 0),S([o({type:Number})],F.prototype,`ticks`,void 0),S([o({type:Boolean,attribute:`snap-to-ticks`,reflect:!0})],F.prototype,`snapToTicks`,void 0),S([o({type:String,reflect:!0,converter:b})],F.prototype,`theme`,void 0),S([s()],F.prototype,`isDragging`,void 0),S([s()],F.prototype,`hasCustomKnob`,void 0),S([s()],F.prototype,`hasCustomScale`,void 0),F=S([a(`fx-potentiometer`)],F);var sn=class extends T(C){constructor(...e){super(...e),this.guid=`fx-met-${Qe.newGuid()}`,this.angle=0,this.value=0,this.progress=0,this.isDragging=!1}static{this.styles=t`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
            overflow: visible;
            pointer-events: none;
        }
        .face-group {
            transition: none;
        }
        :host([is-animated]) .face-group:not([data-dragging="true"]) {
            transition: transform 0.3s cubic-bezier(0.1, 1, 0.1, 1);
        }
    `}renderBrushStops(){let e=[],t=[`#f8fafc`,`#e2e8f0`,`#cbd5e1`,`#94a3b8`,`#e2e8f0`,`#64748b`];for(let n=0;n<=36;n++){let r=n/36;e.push(i`
                <stop
                    offset="${(r*100).toFixed(2)}%"
                    stop-color="${t[n%t.length]}"
                />
            `)}return e}render(){let{guid:e,angle:t,isDragging:r}=this;return n`
            <svg viewBox="-4 -4 108 108" aria-hidden="true">
                <defs>
                    <filter id="${e}-shadow" x="-40%" y="-40%" width="180%" height="180%">
                        <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.35" />
                    </filter>
                    <radialGradient id="${e}-ring" cx="32%" cy="28%" r="72%">
                        <stop offset="0%" stop-color="#ffffff" />
                        <stop offset="28%" stop-color="#d7dbe0" />
                        <stop offset="58%" stop-color="#8b929a" />
                        <stop offset="82%" stop-color="#c5CAD1" />
                        <stop offset="100%" stop-color="#6b7280" />
                    </radialGradient>
                    <radialGradient id="${e}-ring-inner" cx="68%" cy="72%" r="70%">
                        <stop offset="0%" stop-color="#4b5563" stop-opacity="0.55" />
                        <stop offset="55%" stop-color="#9ca3af" stop-opacity="0.15" />
                        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                    </radialGradient>
                    <conicGradient id="${e}-brush" cx="50%" cy="50%">
                        ${this.renderBrushStops()}
                    </conicGradient>
                </defs>

                <g filter="url(#${e}-shadow)">
                    <circle cx="${50}" cy="${50}" r="${22}" fill="url(#${e}-ring)" />
                    <circle cx="${50}" cy="${50}" r="${22}" fill="url(#${e}-ring-inner)" />
                    <circle
                        cx="${50}"
                        cy="${50}"
                        r="${21.3}"
                        fill="none"
                        stroke="rgba(255,255,255,0.35)"
                        stroke-width="0.9"
                    />
                    <circle
                        cx="${50}"
                        cy="${50}"
                        r="${18.55}"
                        fill="none"
                        stroke="rgba(15,23,42,0.45)"
                        stroke-width="1.1"
                    />
                    <circle cx="${50}" cy="${50}" r="${18.2}" fill="#94a3b8" />

                    <g
                        class="face-group"
                        data-dragging="${r}"
                        style="transform-origin: ${50}px ${50}px; transform: rotate(${t}deg);"
                    >
                        <circle cx="${50}" cy="${50}" r="${17.2}" fill="url(#${e}-brush)" />
                        <circle
                            cx="${50}"
                            cy="${50}"
                            r="${16.8}"
                            fill="none"
                            stroke="rgba(15,23,42,0.2)"
                            stroke-width="0.7"
                        />
                        <line
                            x1="${50}"
                            y1="${39.8}"
                            x2="${50}"
                            y2="${35}"
                            stroke="var(--fx-metalic-knob-pointer, #0f172a)"
                            stroke-width="2.4"
                            stroke-linecap="round"
                        />
                    </g>
                </g>
            </svg>
        `}};S([o({type:Number})],sn.prototype,`angle`,void 0),S([o({type:Number})],sn.prototype,`value`,void 0),S([o({type:Number})],sn.prototype,`progress`,void 0),S([o({type:Boolean,attribute:`is-dragging`,reflect:!0})],sn.prototype,`isDragging`,void 0),sn=S([a(`fx-metalic-knob`)],sn);var cn=new Set([`x-small`,`small`,`medium`,`large`,`x-large`,`xx-large`]);function ln(e){let t=String(e).trim();return t&&!cn.has(t)?St.normalizeLength(t):null}function un(e){return e.toLowerCase().endsWith(`.svg`)}var dn=class extends C{constructor(...e){super(...e),this.icon=``,this.color=``,this.size=``}static{this.styles=[E,t`
            :host {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                align-self: center;
                box-sizing: border-box;
                line-height: 1;
                color: inherit;
                font-size: 1em;
                user-select: none;
            }

            :host([size='x-small']) {
                font-size: 0.65rem;
            }
            :host([size='small']) {
                font-size: 0.85rem;
            }
            :host([size='medium']) {
                font-size: 1rem;
            }
            :host([size='large']) {
                font-size: 1.25rem;
            }
            :host([size='x-large']) {
                font-size: 1.5rem;
            }
            :host([size='xx-large']) {
                font-size: 2rem;
            }

            i,
            img,
            ::slotted(*) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
            }

            img,
            ::slotted(img) {
                width: 1em;
                height: 1em;
                display: block;
                object-fit: contain;
            }
        `]}connectedCallback(){super.connectedCallback(),this.syncHostStyles(),this.syncIcon()}updated(e){super.updated(e),(e.has(`color`)||e.has(`size`))&&this.syncHostStyles(),e.has(`icon`)&&this.syncIcon()}syncHostStyles(){this.style.color=this.color.trim()||``,this.style.fontSize=ln(this.size)||``}get hasManualContent(){return Array.from(this.children).some(e=>e instanceof HTMLElement&&!e.hasAttribute(`data-fx-managed-icon`))}syncIcon(){let e=this.querySelector(`:scope > [${v}]`),t=this.icon.trim();this.hasManualContent||!t?e?.remove():un(t)?e instanceof HTMLImageElement?e.getAttribute(`src`)!==t&&e.setAttribute(`src`,t):(e?.remove(),this.appendChild(m.img({[v]:`icon`,src:t,alt:``,"aria-hidden":`true`}))):e&&e.tagName===`I`?e.className!==t&&(e.className=t):(e?.remove(),this.appendChild(m.i({[v]:`icon`,"aria-hidden":`true`,className:t})))}render(){return n`<slot></slot>`}};S([o({type:String})],dn.prototype,`icon`,void 0),S([o({type:String})],dn.prototype,`color`,void 0),S([o({type:String,reflect:!0,converter:{fromAttribute:e=>e??``,toAttribute:e=>e||null}})],dn.prototype,`size`,void 0),dn=S([a(`fx-icon`)],dn);var I=class extends T(C){constructor(...e){super(...e),this.label=``,this.labelPosition=`plate`,this.type=`momentary`,this.isActive=!1,this.backgroundColor=``,this.foregroundColor=``,this.icon=``,this.iconRenderingMode=`shaded`,this.textRenderingMode=`foregroundColor`,this.shape=`round`,this.isPressedDown=!1,this.hasIcon=!1,this.syncingIcons=!1,this.iconPresenceKey=``,this.handleGlobalRelease=()=>{this.disabled||this.type===`momentary`&&this.isPressedDown&&(this.isPressedDown=!1,this.isActive=!1,this.dispatchChangeEvent(),this.dispatchEvent(new CustomEvent(`release`,{bubbles:!0,composed:!0})))}}syncIcons(){if(!this.syncingIcons){this.syncingIcons=!0;try{ue(this,this.icon);let e=fe(this,`icon`)?`icon`:``;e!==this.iconPresenceKey&&(this.iconPresenceKey=e,this.hasIcon=!!e,this.requestUpdate())}finally{this.syncingIcons=!1}}}connectedCallback(){super.connectedCallback(),window.addEventListener(`mouseup`,this.handleGlobalRelease),window.addEventListener(`touchend`,this.handleGlobalRelease)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`mouseup`,this.handleGlobalRelease),window.removeEventListener(`touchend`,this.handleGlobalRelease)}firstUpdated(){this.syncIcons()}updated(e){e.has(`icon`)&&this.syncIcons()}handleSlotChange(){this.syncIcons()}handlePress(e){this.disabled||(e.preventDefault(),this.isPressedDown=!0,this.type===`momentary`?(this.isActive=!0,this.dispatchChangeEvent(),this.dispatchEvent(new CustomEvent(`press`,{bubbles:!0,composed:!0}))):(this.isActive=!this.isActive,this.dispatchChangeEvent(),this.dispatchEvent(new CustomEvent(`press`,{detail:{active:this.isActive,isActive:this.isActive},bubbles:!0,composed:!0}))))}handleRelease(){this.disabled||(this.type===`momentary`&&this.isPressedDown?(this.isPressedDown=!1,this.isActive=!1,this.dispatchChangeEvent(),this.dispatchEvent(new CustomEvent(`release`,{bubbles:!0,composed:!0}))):this.isPressedDown=!1)}handleKeyDown(e){this.disabled||(e.key===` `||e.key===`Enter`)&&(e.preventDefault(),this.isPressedDown||this.handlePress(e))}handleKeyUp(e){this.disabled||(e.key===` `||e.key===`Enter`)&&(e.preventDefault(),this.handleRelease())}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent(`change`,{detail:{active:this.isActive,isActive:this.isActive,type:this.type},bubbles:!0,composed:!0}))}static{this.styles=[E,t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                vertical-align: middle;
            }

            .label-plate {
                font-family: var(--fx-font-family, sans-serif);
                font-size: var(--fx-push-button-font-size, 0.875rem);
                font-weight: 700;
                letter-spacing: 0.01em;
                line-height: 1.2;
                color: var(--fx-gauge-text-secondary, #9ca3af);
                margin-bottom: 12px;
                text-align: center;
                box-sizing: border-box;
            }

            :host([shape="round"]) .bezel-glossy {
                border-radius: 50%;
                width: 48px;
                height: 48px;
            }

            :host([shape="pill"]) .bezel-glossy {
                border-radius: 9999px;
                min-width: 118px;
                height: 48px;
            }

            :host([shape="rect"]) .bezel-glossy {
                border-radius: 2px;
                min-width: 118px;
                height: 48px;
            }

            :host([shape="roundedRect"]) .bezel-glossy {
                border-radius: var(--fx-switch-btn-border-radius, 12px);
                min-width: 118px;
                height: 48px;
            }

            :host(:not([is-animated])) .cap-glossy,
            :host(:not([is-animated])) ::slotted([slot="icon"]) {
                transition: none !important;
            }

            .groove-glossy {
                background: #111827;
                border-radius: inherit;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.7);
                padding: 1.5px;
                box-sizing: border-box;
            }

            .cap-glossy {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                cursor: pointer;
                outline: none;
                transition: 
                    transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
                    filter 0.3s ease,
                    box-shadow 0.3s ease;

                background-color: var(--fx-push-button-background-color, #6366f1);
                border: 1px solid rgba(0, 0, 0, 0.2);
                overflow: hidden;
            }
            :host([label-position="inside"]) .cap-glossy {
                flex-direction: row;
                gap: 4px;
                padding: 0 16px;
            }

            .cap-glossy:hover {
                filter: brightness(1.06);
            }

            .bezel-glossy:active .cap-glossy,
            :host([is-active]) .cap-glossy {
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
                filter: brightness(0.92);
                transform: translateY(1px);
            }

            .internal-label {
                font-family: var(--fx-font-family, sans-serif);
                font-size: var(--fx-push-button-font-size, 1rem);
                font-weight: 700;
                letter-spacing: 0.01em;
                line-height: 1.2;
                white-space: nowrap;
                color: var(--fx-push-button-foreground-color, #ffffff);
                text-align: center;
                padding: 0 4px;
                pointer-events: none;
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--fx-switch-icon-gap, 6px);
            }
            :host([text-rendering-mode="shaded"]) .internal-label {
                color: rgba(0, 0, 0, 0.35);
            }

            .status-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                pointer-events: none;
                z-index: 2;
            }
            :host([label-position="inside"]) .status-indicator {
                width: auto;
                height: auto;
            }

            .status-indicator[hidden] {
                display: none !important;
            }

            ::slotted([slot="icon"]) {
                color: rgba(0, 0, 0, 0.35);
                font-size: var(--fx-switch-icon-size, 1.125rem);
                line-height: 1;
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                transition: transform 0.1s ease, filter 0.15s ease;
            }
            :host([icon-rendering-mode="foregroundColor"]) ::slotted([slot="icon"]) {
                color: var(--fx-push-button-foreground-color, #ffffff);
            }

            :host([is-active]) ::slotted([slot="icon"]) {
                transform: scale(0.95);
            }
        `]}get indicatorContent(){return this.hasIcon||this.icon?.trim()?n`
                <div class="status-indicator">
                    <slot name="icon" @slotchange="${this.handleSlotChange}"></slot>
                </div>
            `:n`<slot name="icon" @slotchange="${this.handleSlotChange}"></slot>`}get resolvedBackgroundColor(){return x.resolvedColor(this.backgroundColor,this.variant,`#6366f1`)}get resolvedForegroundColor(){return x.resolvedColor(this.foregroundColor,this.variant,`#ffffff`,`foreground`)}render(){let{indicatorContent:e}=this,t=this.label&&this.labelPosition===`inside`?n`
            <div class="internal-label">
                <span>${this.label}</span>
            </div>
        `:n`
            <div class="internal-label">
                <slot></slot>
            </div>
        `;return n`
            ${this.label&&this.labelPosition===`plate`?n`
                <div class="label-plate">${this.label}</div>
            `:``}

            ${n`
                <div 
                    class="bezel-glossy"
                    @mousedown="${this.handlePress}"
                    @mouseup="${this.handleRelease}"
                    @mouseleave="${this.handleRelease}"
                    @touchstart="${this.handlePress}"
                    @touchend="${this.handleRelease}"
                >
                    <div class="groove-glossy">
                        <div 
                            class="cap-glossy"
                            style="
                                --fx-push-button-background-color: ${this.resolvedBackgroundColor};
                                --fx-push-button-foreground-color: ${this.resolvedForegroundColor};
                            "
                            role="button"
                            tabindex="0"
                            aria-pressed="${this.isActive}"
                            aria-disabled="${this.disabled}"
                            @keydown="${this.handleKeyDown}"
                            @keyup="${this.handleKeyUp}"
                        >
                            ${e}
                            ${t}
                        </div>
                    </div>
                </div>
            `}
        `}};S([o({type:String})],I.prototype,`label`,void 0),S([o({type:String,attribute:`label-position`,reflect:!0})],I.prototype,`labelPosition`,void 0),S([o({type:String})],I.prototype,`type`,void 0),S([o({type:Boolean,attribute:`is-active`,reflect:!0})],I.prototype,`isActive`,void 0),S([o({type:String,attribute:`background-color`})],I.prototype,`backgroundColor`,void 0),S([o({type:String,attribute:`foreground-color`})],I.prototype,`foregroundColor`,void 0),S([o({reflect:!0,converter:x.reflectOptional})],I.prototype,`variant`,void 0),S([o({type:String})],I.prototype,`icon`,void 0),S([o({type:String,attribute:`icon-rendering-mode`,reflect:!0})],I.prototype,`iconRenderingMode`,void 0),S([o({type:String,attribute:`text-rendering-mode`,reflect:!0})],I.prototype,`textRenderingMode`,void 0),S([o({type:String,reflect:!0})],I.prototype,`shape`,void 0),S([s()],I.prototype,`isPressedDown`,void 0),S([s()],I.prototype,`hasIcon`,void 0),I=S([a(`fx-push-button`)],I);var L=class extends C{constructor(...e){super(...e),this.value=``,this.label=``,this.color=``,this.textColor=``,this.ranges=[],this.startDeg=0,this.endDeg=0}connectedCallback(){super.connectedCallback(),this.style.display=`none`}updated(e){super.updated(e),this.dispatchEvent(new CustomEvent(`sectorupdate`,{bubbles:!0}))}};S([o({reflect:!0})],L.prototype,`value`,void 0),S([o({reflect:!0})],L.prototype,`label`,void 0),S([o({reflect:!0})],L.prototype,`color`,void 0),S([o({attribute:`text-color`,reflect:!0})],L.prototype,`textColor`,void 0),S([o({type:Array,reflect:!0})],L.prototype,`ranges`,void 0),S([o({type:Number,attribute:`start-deg`,reflect:!0})],L.prototype,`startDeg`,void 0),S([o({type:Number,attribute:`end-deg`,reflect:!0})],L.prototype,`endDeg`,void 0),L=S([a(`fx-rotary-selector-sector`)],L);var fn=150,pn=150,mn=130;function hn(e){return e*Math.PI/180}function R(e,t){let n=hn(e-90);return{x:fn+t*Math.cos(n),y:pn+t*Math.sin(n)}}function gn(e,t,n,r){let i=t;i<=e&&(i+=360);let a=R(e,n),o=R(i,n),s=R(i,r),c=R(e,r),l=+(i-e>180);return`M ${a.x} ${a.y} A ${n} ${n} 0 ${l} 1 ${o.x} ${o.y} L ${s.x} ${s.y} A ${r} ${r} 0 ${l} 0 ${c.x} ${c.y} Z`}function _n(e){let t=e.endDeg;t<=e.startDeg&&(t+=360);let n=e.startDeg+(t-e.startDeg)/2;return n>=360&&(n-=360),n}function vn(e){let t=e.endDeg;return t<=e.startDeg&&(t+=360),t-e.startDeg}function yn(e,t){let n=vn(e),r=e.ranges.length===1?.5:t/(e.ranges.length-1),i=e.startDeg+r*n*.85+n*.075;return i>=360&&(i-=360),i}function bn(e,t){let n=null;for(let r of e)if(!n){let e=r.endDeg;e<=r.startDeg&&(e+=360);let i=t;r.startDeg>180&&i<90&&(i+=360),i>=r.startDeg&&i<e&&(n=r)}return n}var z=class extends C{constructor(...e){super(...e),this.sectors=[],this.selectedSector=``,this.selectedRange=``,this.slottedSectors=[],this.needleAngle=10,this.raf=null,this.animAngle=10,this.isDragging=!1,this.modeLabels={off:`OFF`,acv:`Voltage AC`,dcv:`Voltage DC`,res:`Resistance`,cap:`Capacitance`,dca:`Current DC`,diode:`Diode / hFE`}}static{this.styles=t`
        :host {
            display: inline-block;
            font-family: var(--fx-font, monospace);
        }

        .wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--fx-gap, 20px);
        }

        svg {
            cursor: pointer;
            user-select: none;
            touch-action: none;
            width: var(--fx-size, 280px);
            height: var(--fx-size, 280px);
        }

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }

        .mode-label {
            font-size: 11px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--fx-label-color, #888);
        }

        .range-value {
            font-size: 20px;
            font-weight: 600;
            color: var(--fx-value-color, #eee);
            min-width: 120px;
            text-align: center;
        }

        .ranges {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            justify-content: center;
        }

        button {
            font-size: 11px;
            padding: 3px 9px;
            border: 0.5px solid #555;
            border-radius: 6px;
            background: transparent;
            color: #888;
            cursor: pointer;
            font-family: inherit;
            transition:
                background 0.12s,
                color 0.12s,
                border-color 0.12s;
        }

        button:hover {
            border-color: #888;
            color: #ccc;
        }

        button.active {
            background: #2a2a2a;
            color: #eee;
            border-color: #999;
        }
    `}get effectiveSectors(){return this.sectors.length>0?this.sectors:this.slottedSectors}connectedCallback(){super.connectedCallback(),this.addEventListener(`sectorupdate`,this.onSectorUpdate),this.syncNeedle(!1)}firstUpdated(e){super.firstUpdated(e),this.collectSlottedSectors();let t=this.effectiveSectors;if(!this.selectedSector&&t.length>0){let e=t[0];this.selectedSector=e.id,this.selectedRange=e.ranges[0]||``,this.syncNeedle(!1)}}updated(e){super.updated(e),(e.has(`selectedSector`)||e.has(`selectedRange`)||e.has(`sectors`)||e.has(`slottedSectors`))&&this.syncNeedle(!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`sectorupdate`,this.onSectorUpdate),this.raf&&cancelAnimationFrame(this.raf)}onSectorUpdate(){this.collectSlottedSectors()}collectSlottedSectors(){let e=this.shadowRoot?.querySelector(`slot.sectors`);if(e&&(this.slottedSectors=e.assignedElements().filter(e=>e instanceof L).map(e=>{let t=e;return{id:t.value||t.id,label:t.label,color:t.color,textColor:t.textColor,ranges:t.ranges,startDeg:t.startDeg,endDeg:t.endDeg}}),!this.selectedSector&&this.slottedSectors.length>0)){let e=this.slottedSectors[0];this.selectedSector=e.id,this.selectedRange=e.ranges[0]||``,this.syncNeedle(!1)}}select(e,t){if(!this.disabled){let n=this.effectiveSectors.find(t=>t.id===e);n&&(this.selectedSector=e,this.selectedRange=t??n.ranges[Math.floor((n.ranges.length-1)/2)],this.emitChange())}}currentSector(){return this.effectiveSectors.find(e=>e.id===this.selectedSector)}syncNeedle(e){let t=this.currentSector();if(t){let n=t.ranges.indexOf(this.selectedRange),r=yn(t,n<0?Math.floor((t.ranges.length-1)/2):n);e?this.animateTo(r):(this.animAngle=r,this.needleAngle=r)}}animateTo(e){this.raf&&cancelAnimationFrame(this.raf);let t=()=>{let n=e-this.animAngle;Math.abs(n)<.3?(this.animAngle=e,this.needleAngle=e):(this.animAngle+=n*.12,this.needleAngle=this.animAngle,this.raf=requestAnimationFrame(t))};t()}emitChange(){this.dispatchEvent(new CustomEvent(`change`,{detail:{sectorId:this.selectedSector,range:this.selectedRange},bubbles:!0,composed:!0}))}angleFromPointer(e){let t=this.renderRoot.querySelector(`svg`);if(t){let n=t.getBoundingClientRect(),r=`touches`in e?e.touches[0].clientX:e.clientX,i=`touches`in e?e.touches[0].clientY:e.clientY,a=300/n.width,o=300/n.height,s=(r-n.left)*a-fn,c=(i-n.top)*o-pn,l=Math.atan2(c,s)*180/Math.PI+90;return l<0&&(l+=360),l}return 0}onPointerDown(e){this.disabled||(this.isDragging=!0,this.handleAngle(e))}onPointerMove(e){!this.disabled&&this.isDragging&&this.handleAngle(e)}onPointerUp(){this.isDragging=!1}handleAngle(e){if(!this.disabled){let t=this.angleFromPointer(e),n=bn(this.effectiveSectors,t);n&&n.id!==this.selectedSector&&this.select(n.id)}}selectRange(e){this.disabled||(this.selectedRange=e,this.syncNeedle(!0),this.emitChange())}renderKnurling(){return Array.from({length:36},(e,t)=>{let n=hn(t*10-90),r=fn+44*Math.cos(n),a=pn+44*Math.sin(n),o=fn+50*Math.cos(n),s=pn+50*Math.sin(n);return i`<line x1=${r} y1=${a} x2=${o} y2=${s} stroke="#555" stroke-width="1.2"/>`})}renderSectors(){return this.effectiveSectors.map(e=>{let t=e.id===this.selectedSector,n=R(e.startDeg,64),r=R(e.startDeg,mn);return i`
        <path
          d=${gn(e.startDeg,e.endDeg,mn,64)}
          fill=${e.color}
          opacity=${t?`1`:`0.55`}
          data-id=${e.id}
          style="transition: opacity 0.2s; cursor: pointer;"
        />
        <line x1=${n.x} y1=${n.y} x2=${r.x} y2=${r.y} stroke="#111" stroke-width="1.5"/>
      `})}renderTicks(){return this.effectiveSectors.flatMap(e=>e.ranges.map((t,n)=>{let r=vn(e),a=e.ranges.length===1?.5:n/(e.ranges.length-1),o=e.startDeg+a*r*.85+r*.075;o>=360&&(o-=360);let s=R(o,129),c=R(o,137),l=R(o,146),u=o>90&&o<270?o+180:o;return i`
          <line x1=${s.x} y1=${s.y} x2=${c.x} y2=${c.y} stroke=${e.textColor} stroke-width="1.2"/>
          <text
            x=${l.x} y=${l.y}
            text-anchor="middle" dominant-baseline="middle"
            font-size="8" fill=${e.textColor} font-family="monospace"
            transform=${`rotate(${u},${l.x},${l.y})`}
          >${t}</text>
        `}))}renderLabels(){return this.effectiveSectors.map(e=>{let t=_n(e),n=R(t,97),r=t>90&&t<270?t+180:t,a=e.id===`off`||e.id===`diode`?`9`:`11`;return i`
        <text
          x=${n.x} y=${n.y}
          text-anchor="middle" dominant-baseline="middle"
          font-size=${a} font-weight="600"
          fill=${e.textColor} font-family="monospace"
          transform=${`rotate(${r},${n.x},${n.y})`}
        >${e.label}</text>
      `})}renderNeedle(){let e=R(this.needleAngle,46);return i`
      <line x1=${fn} y1=${pn} x2=${e.x} y2=${e.y} stroke="#e8e8e8" stroke-width="3" stroke-linecap="round"/>
      <circle cx=${fn} cy=${pn} r="7" fill="#555"/>
      <circle cx=${fn} cy=${pn} r="4" fill="#888"/>
    `}render(){let e=this.currentSector(),t=e?this.modeLabels[e.id]??e.id:``,r=e?.id===`off`?`— OFF —`:this.selectedRange;return n`
            <slot class="sectors" @slotchange=${this.collectSlottedSectors} style="display:none;"></slot>
            <div class="wrap">
                <svg
                    viewBox="0 0 300 300"
                    role="img"
                    aria-label="Rotary selector switch"
                    @mousedown=${this.onPointerDown}
                    @mousemove=${this.onPointerMove}
                    @mouseup=${this.onPointerUp}
                    @mouseleave=${this.onPointerUp}
                    @touchstart=${this.onPointerDown}
                    @touchmove=${this.onPointerMove}
                    @touchend=${this.onPointerUp}
                >

                    <circle cx="150" cy="150" r="138" fill="#2a2a2a" />
                    <circle cx="150" cy="150" r="133" fill="#1e1e1e" />

                    ${this.renderSectors()}

                    ${this.renderTicks()}

                    ${this.renderLabels()}

                    <circle cx="150" cy="150" r="58" fill="#2e2e2e" />
                    <circle cx="150" cy="150" r="54" fill="#383838" />
                    <circle cx="150" cy="150" r="50" fill="#3a3a3a" />

                    ${this.renderKnurling()}

                    ${this.renderNeedle()}
                </svg>

                <div class="info">
                    <span class="mode-label">${t}</span>
                    <span class="range-value">${r}</span>
                </div>

                ${e&&e.ranges.length>1?n`
                          <div class="ranges">
                              ${e.ranges.map(e=>n`
                                      <button
                                          class=${e===this.selectedRange?`active`:``}
                                          @click=${()=>this.selectRange(e)}
                                      >
                                          ${e}
                                      </button>
                                  `)}
                          </div>
                      `:``}
            </div>
        `}};S([o({type:Array})],z.prototype,`sectors`,void 0),S([o({type:String,attribute:`selected-sector`,reflect:!0})],z.prototype,`selectedSector`,void 0),S([o({type:String,attribute:`selected-range`,reflect:!0})],z.prototype,`selectedRange`,void 0),S([s()],z.prototype,`slottedSectors`,void 0),S([s()],z.prototype,`needleAngle`,void 0),z=S([a(`fx-rotary-selector`)],z);var B=class extends C{constructor(...e){super(...e),this.value=``,this.label=``,this.icon=``,this.foregroundColor=``,this.backgroundColor=``}connectedCallback(){super.connectedCallback(),this.style.display=`none`}updated(e){super.updated(e),(e.has(`value`)||e.has(`label`)||e.has(`icon`)||e.has(`foregroundColor`)||e.has(`backgroundColor`)||e.has(`disabled`))&&this.dispatchEvent(new CustomEvent(`stateupdate`,{bubbles:!0,composed:!0}))}render(){return n`<slot name="icon"></slot>`}};S([o({attribute:`value`})],B.prototype,`value`,void 0),S([o()],B.prototype,`label`,void 0),S([o()],B.prototype,`icon`,void 0),S([o({attribute:`foreground-color`})],B.prototype,`foregroundColor`,void 0),S([o({attribute:`background-color`})],B.prototype,`backgroundColor`,void 0),B=S([a(`fx-switch-state`)],B);var V=class extends T(C){constructor(...e){super(...e),this.states=[],this.activeId=``,this.orientation=`horizontal`,this.foregroundColor=`#ffffff`,this.backgroundColor=`#3b82f6`,this.stateWidth=72,this.slottedStates=[],this.syncingIcons=!1,this.iconPresenceKey=``,this.onStateUpdate=()=>{this.collectSlottedStates(),this.syncIcons()},this.onStatesSlotChange=()=>{this.collectSlottedStates(),this.syncIcons()}}resolveStateWidth(){return St.normalizeLength(this.stateWidth,`72px`)}get effectiveStates(){return this.states.length>0?this.states:this.slottedStates.length>0?this.slottedStates:[{id:`off`,label:`OFF`,foregroundColor:`#6b7280`,backgroundColor:`#f3f4f6`},{id:`on`,label:`ON`,foregroundColor:`#ffffff`,backgroundColor:`#a855f7`}]}getAssignedStateElements(){let e=this.shadowRoot?.querySelector(`slot.states`);return e?e.assignedElements().filter(e=>e instanceof B):[]}syncIcons(){if(!this.syncingIcons){this.syncingIcons=!0;try{le(this,{arrayStates:this.states,stateElements:this.getAssignedStateElements(),fallbackStates:this.effectiveStates});let e=this.effectiveStates.filter(e=>de(this,e.id)).map(e=>e.id).join(`\0`);e!==this.iconPresenceKey&&(this.iconPresenceKey=e,this.requestUpdate())}finally{this.syncingIcons=!1}}}connectedCallback(){super.connectedCallback(),this.addEventListener(`stateupdate`,this.onStateUpdate)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`stateupdate`,this.onStateUpdate)}collectSlottedStates(){let e=this.getAssignedStateElements().map(e=>({id:e.value,label:e.label,icon:e.icon||void 0,foregroundColor:e.foregroundColor||void 0,backgroundColor:e.backgroundColor||void 0,disabled:e.disabled||void 0}));pe(this.slottedStates,e)||(this.slottedStates=e);let t=this.effectiveStates;!this.activeId&&t.length>0&&(this.activeId=t[0].id)}firstUpdated(){this.collectSlottedStates(),this.syncIcons();let e=this.effectiveStates;!this.activeId&&e.length>0&&(this.activeId=e[0].id)}updated(e){super.updated(e),(e.has(`states`)||e.has(`slottedStates`))&&this.syncIcons()}handleStateChange(e){if(!this.disabled){let t=this.effectiveStates.find(t=>t.id===e);t&&!t.disabled&&this.activeId!==e&&(this.activeId=e,this.dispatchEvent(new CustomEvent(`change`,{detail:{id:e,state:t},bubbles:!0,composed:!0})))}}static{this.styles=[E,t`
            :host {
                display: inline-flex;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-switch-track-color: var(--fx-theme-switch-track-color, #1e293b);
                --fx-switch-border-color: var(--fx-theme-switch-border-color, #334155);
                --fx-switch-text-inactive: var(--fx-theme-switch-text-inactive, #94a3b8);
                --fx-switch-text-hover: var(--fx-theme-switch-text-hover, #f8fafc);
                --fx-switch-divider-color: var(--fx-theme-switch-divider-color, #475569);
                --fx-switch-shadow: var(--fx-shell-shadow, 0 1px 2px rgba(0, 0, 0, 0.35));
            }
            :host([orientation="horizontal"]) {
                flex-direction: row;
            }
            :host([orientation="vertical"]) {
                flex-direction: column;
            }
            :host([theme="snow"]) {
                --fx-switch-track-color: #ffffff;
                --fx-switch-border-color: #e5e7eb;
                --fx-switch-text-inactive: #374151;
                --fx-switch-text-hover: #111827;
                --fx-switch-divider-color: #e5e7eb;
                --fx-switch-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
            }
            :host([theme="silver"]) {
                --fx-switch-track-color: #1e293b;
                --fx-switch-border-color: #334155;
                --fx-switch-text-inactive: #94a3b8;
                --fx-switch-text-hover: #f8fafc;
                --fx-switch-divider-color: #475569;
                --fx-switch-shadow: var(--fx-shell-shadow, 0 1px 2px rgba(0, 0, 0, 0.35));
            }
            .switch-container {
                display: inline-flex;
                background-color: var(--fx-switch-track-color);
                border-radius: var(--fx-switch-border-radius, 16px);
                padding: var(--fx-switch-padding, 4px);
                position: relative;
                gap: 0;
                border: 1px solid var(--fx-switch-border-color);
                box-shadow: var(--fx-switch-shadow);
                box-sizing: border-box;
            }
            :host([orientation="horizontal"]) .switch-container {
                flex-direction: row;
                width: 100%;
            }
            :host([orientation="vertical"]) .switch-container {
                flex-direction: column;
                height: 100%;
            }
            .switch-thumb {
                position: absolute;
                top: var(--fx-switch-padding, 4px);
                bottom: var(--fx-switch-padding, 4px);
                left: var(--fx-switch-padding, 4px);
                border-radius: var(--fx-switch-btn-border-radius, 12px);
                transition: none;
                z-index: 1;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06);
            }
            :host([is-animated]) .switch-thumb {
                transition: transform 0.28s cubic-bezier(0.1, 1, 0.1, 1), background-color 0.24s ease-out;
            }
            .switch-button {
                flex: 1 1 0%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: var(--fx-switch-icon-gap, 6px);
                border: none;
                background: none;
                cursor: pointer;
                font-family: inherit;
                font-size: var(--fx-switch-font-size, 0.8125rem);
                font-weight: 700;
                padding: var(--fx-switch-btn-padding, 12px 18px);
                border-radius: var(--fx-switch-btn-border-radius, 12px);
                transition: none;
                color: var(--fx-switch-text-inactive, #374151);
                position: relative;
                z-index: 2;
                letter-spacing: 0.01em;
                min-width: var(--fx-switch-state-width, 72px);
                box-sizing: border-box;
            }
            :host([orientation="horizontal"]) .switch-button {
                width: 0;
            }
            :host([orientation="vertical"]) .switch-button {
                height: 0;
            }
            :host([is-animated]) .switch-button {
                transition: color 0.24s ease-out;
            }
            :host([orientation="vertical"]) .switch-button {
                padding: var(--fx-switch-btn-padding-vert, 14px 12px);
                min-width: var(--fx-switch-state-width, 96px);
            }
            .switch-button:hover:not(.active) {
                color: var(--fx-switch-text-hover, #111827);
            }
            .switch-button.active {
                color: var(--active-text-color, #ffffff);
                font-weight: 700;
            }
            .switch-button.is-disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .switch-icon {
                display: inline-flex;
                font-size: var(--fx-switch-icon-size, 1.125rem);
                line-height: 1;
                pointer-events: none;
                align-items: center;
                justify-content: center;
            }
            .switch-icon[hidden] {
                display: none !important;
            }
            ::slotted([slot^="icon-"]) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
            }
            .switch-label {
                line-height: 1.2;
                white-space: nowrap;
            }

            :host([orientation="horizontal"]) .switch-button:not(.active):not(:last-child)::after {
                content: '';
                position: absolute;
                top: 2.5%;
                bottom: 2.5%;
                right: 0;
                width: 1px;
                background: linear-gradient(
                    to bottom,
                    transparent 0%,
                    var(--fx-switch-divider-color, #e5e7eb) 18%,
                    var(--fx-switch-divider-color, #e5e7eb) 82%,
                    transparent 100%
                );
                pointer-events: none;
            }
            :host([orientation="horizontal"]) .switch-button:has(+ .active)::after,
            :host([orientation="horizontal"]) .switch-button.active::after {
                display: none;
            }

            :host([orientation="vertical"]) .switch-button:not(.active):not(:last-child)::after {
                content: '';
                position: absolute;
                left: 2.5%;
                right: 2.5%;
                bottom: 0;
                height: 1px;
                background: linear-gradient(
                    to right,
                    transparent 0%,
                    var(--fx-switch-divider-color, #e5e7eb) 18%,
                    var(--fx-switch-divider-color, #e5e7eb) 82%,
                    transparent 100%
                );
                pointer-events: none;
            }
            :host([orientation="vertical"]) .switch-button:has(+ .active)::after,
            :host([orientation="vertical"]) .switch-button.active::after {
                display: none;
            }
        `]}render(){let e=this.effectiveStates,t=e.length,r=Math.max(0,e.findIndex(e=>e.id===this.activeId)),i=e[r],a=i?.backgroundColor||this.backgroundColor||`#3b82f6`,o=i?.foregroundColor||this.foregroundColor||`#ffffff`,s=this.orientation===`horizontal`,c=this.resolveStateWidth(),l=s?`
                width: calc((100% - 2 * var(--fx-switch-padding, 4px)) / ${t});
                height: calc(100% - 2 * var(--fx-switch-padding, 4px));
                transform: translateX(calc(${r} * 100%));
                background-color: ${a};
            `:`
                height: calc((100% - 2 * var(--fx-switch-padding, 4px)) / ${t});
                width: calc(100% - 2 * var(--fx-switch-padding, 4px));
                transform: translateY(calc(${r} * 100%));
                background-color: ${a};
            `;return n`
            <slot class="states" @slotchange=${this.onStatesSlotChange} style="display:none;"></slot>

            <div class="switch-container" style="--fx-switch-state-width: ${c};">
                <div class="switch-thumb" style="${l}"></div>

                ${e.map(e=>{let t=this.activeId===e.id,r=!!e.disabled||this.disabled,i=t?`--active-text-color: ${o};`:``,a=ee(e.id),s=!!e.icon?.trim()||de(this,e.id),c=[`switch-button`,t?`active`:``,e.disabled&&!this.disabled?`is-disabled`:``].filter(Boolean).join(` `);return n`
                        <button
                            type="button"
                            class="${c}"
                            style="${i}"
                            ?disabled=${r}
                            aria-disabled="${r}"
                            @click=${()=>this.handleStateChange(e.id)}
                        >
                            <span class="switch-icon" ?hidden=${!s}>
                                <slot name="${a}"></slot>
                            </span>
                            <span class="switch-label">${e.label}</span>
                        </button>
                    `})}
            </div>
        `}};S([o({type:Array})],V.prototype,`states`,void 0),S([o({type:String,attribute:`active-id`,reflect:!0})],V.prototype,`activeId`,void 0),S([o({type:String,reflect:!0})],V.prototype,`orientation`,void 0),S([o({type:String,reflect:!0,converter:b})],V.prototype,`theme`,void 0),S([o({type:String,attribute:`foreground-color`})],V.prototype,`foregroundColor`,void 0),S([o({type:String,attribute:`background-color`})],V.prototype,`backgroundColor`,void 0),S([o({attribute:`state-width`})],V.prototype,`stateWidth`,void 0),S([s()],V.prototype,`slottedStates`,void 0),V=S([a(`fx-switch`)],V);var H=class extends T(C){constructor(...e){super(...e),this.knobRadius=40,this.knobGap=4,this.defaultOuterRadius=96,this.viewPadding=4,this.wedgeGap=2.5,this.states=[],this.activeId=``,this.foregroundColor=`#ffffff`,this.backgroundColor=`#3b82f6`,this.size=280,this.trackWidth=52,this.slottedStates=[],this.pointerAngle=0,this.syncingIcons=!1,this.onStateUpdate=()=>{this.collectSlottedStates(),this.syncIcons()},this.onStatesSlotChange=()=>{this.collectSlottedStates(),this.syncIcons()}}get innerRadius(){return this.knobRadius+this.knobGap}get outerRadius(){let e=Number.isFinite(this.trackWidth)?this.trackWidth:52;return this.innerRadius+Math.max(8,e)}get labelRadius(){return(this.outerRadius+this.innerRadius)/2}get viewSize(){return(this.outerRadius+this.viewPadding)*2}get centerX(){return this.viewSize/2}get centerY(){return this.viewSize/2}shortestAngleDelta(e,t){let n=(e%360+360)%360,r=(t%360+360)%360-n;return r>180&&(r-=360),r<-180&&(r+=360),r}syncPointerAngle(){let e=this.effectiveStates,t=Math.max(e.length,1),n=e.findIndex(e=>e.id===this.activeId);n<0&&(n=0);let r=this.segmentGeometry(t,n).mid;this.pointerAngle+=this.shortestAngleDelta(this.pointerAngle,r)}degToRad(e){return e*Math.PI/180}polar(e,t){let n=this.degToRad(e-90);return{x:this.centerX+t*Math.cos(n),y:this.centerY+t*Math.sin(n)}}wedgePath(e,t,n,r){let i=t;i<=e&&(i+=360);let a=i-e,o=this.polar(e,n),s=this.polar(i,n),c=this.polar(i,r),l=this.polar(e,r),u=+(a>180);return`M ${o.x} ${o.y} A ${n} ${n} 0 ${u} 1 ${s.x} ${s.y} L ${c.x} ${c.y} A ${r} ${r} 0 ${u} 0 ${l.x} ${l.y} Z`}resolveSize(){let e=this.size,t=null;if(typeof e==`number`&&Number.isFinite(e))t=e;else{let n=String(e??``).trim();if(!n)t=280;else if(/^\d+(\.\d+)?$/.test(n))t=Number(n);else if(/^\d+(\.\d+)?px$/i.test(n))t=parseFloat(n);else return n}return`${t*(this.outerRadius/this.defaultOuterRadius)}px`}get effectiveStates(){return this.states.length>0?this.states:this.slottedStates.length>0?this.slottedStates:[]}getAssignedStateElements(){let e=this.shadowRoot?.querySelector(`slot.states`);return e?e.assignedElements().filter(e=>e instanceof B):[]}syncIcons(){if(!this.syncingIcons){this.syncingIcons=!0;try{le(this,{arrayStates:this.states,stateElements:this.getAssignedStateElements(),fallbackStates:this.effectiveStates})}finally{this.syncingIcons=!1}}}connectedCallback(){super.connectedCallback(),this.addEventListener(`stateupdate`,this.onStateUpdate)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`stateupdate`,this.onStateUpdate)}collectSlottedStates(){let e=this.getAssignedStateElements().map(e=>({id:e.value,label:e.label,icon:e.icon||void 0,foregroundColor:e.foregroundColor||void 0,backgroundColor:e.backgroundColor||void 0}));pe(this.slottedStates,e)||(this.slottedStates=e);let t=this.effectiveStates;!this.activeId&&t.length>0&&(this.activeId=t[0].id)}firstUpdated(){this.collectSlottedStates(),this.syncIcons();let e=this.effectiveStates;!this.activeId&&e.length>0&&(this.activeId=e[0].id)}willUpdate(e){super.willUpdate(e),(e.has(`activeId`)||e.has(`states`)||e.has(`slottedStates`))&&this.syncPointerAngle()}updated(e){super.updated(e),(e.has(`states`)||e.has(`slottedStates`))&&this.syncIcons(),(e.has(`activeId`)||e.has(`states`)||e.has(`slottedStates`)||e.has(`isAnimated`))&&this.updateSlottedKnob()}updateSlottedKnob(){let e=this.shadowRoot?.querySelector(`slot[name="knob"]`);if(e){let t=e.assignedElements()[0];t&&(`angle`in t&&(t.angle=this.pointerAngle),Wt(t)&&(t.isAnimated=this.isAnimated))}}handleStateChange(e){if(!this.disabled&&this.activeId!==e){this.activeId=e;let t=this.effectiveStates.find(t=>t.id===e);this.dispatchEvent(new CustomEvent(`change`,{detail:{id:e,state:t},bubbles:!0,composed:!0}))}}segmentGeometry(e,t){let n=360/Math.max(e,1);return{start:t*n,end:(t+1)*n,mid:t*n+n/2,span:n}}static{this.styles=[E,t`
            :host {
                display: inline-block;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-knob: #1e293b;
                --fx-knob-ring: #334155;
                --fx-knob-pointer: #f8fafc;
                --fx-radial-switch-gap: #0f172a;
                --fx-radial-switch-shadow-opacity: 0.35;
            }
            .radial {
                position: relative;
                width: var(--fx-radial-switch-size, 280px);
                height: var(--fx-radial-switch-size, 280px);
            }
            .radial svg {
                display: block;
                width: 100%;
                height: 100%;
                overflow: visible;
            }
            .wedge {
                cursor: pointer;
                transition: filter 0.2s ease;
            }
            .wedge:hover:not(.active) {
                filter: brightness(1.08);
            }
            .wedge-gap {
                stroke: var(--fx-radial-switch-gap);
                stroke-linecap: butt;
                pointer-events: none;
            }
            .knob-host {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 1;
            }
            .knob-host ::slotted(*) {
                display: block;
                width: 100%;
                height: 100%;
            }
            .labels {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }
            .label-btn {
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 4px;
                border: none;
                background: none;
                padding: 0;
                margin: 0;
                cursor: pointer;
                pointer-events: auto;
                font-family: inherit;
                color: var(--label-color, #ffffff);
                transform: translate(-50%, -50%);
                max-width: 28%;
            }
            .label-icon {
                font-size: var(--fx-radial-switch-icon-size, 0.95rem);
                line-height: 1;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            .label-icon[hidden] {
                display: none !important;
            }
            ::slotted([slot^="icon-"]) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
            }
            .label-text {
                font-size: var(--fx-radial-switch-font-size, 0.62rem);
                font-weight: 600;
                letter-spacing: 0.04em;
                line-height: 1.1;
                text-align: center;
            }
            .label-text[hidden] {
                display: none !important;
            }
        `]}render(){let e=this.effectiveStates,t=Math.max(e.length,1),r=this.resolveSize(),a=this.viewSize,o=this.centerX,s=this.centerY;return n`
            <slot class="states" @slotchange=${this.onStatesSlotChange} style="display:none;"></slot>

            <div class="radial" style="--fx-radial-switch-size: ${r};">
                <svg viewBox="0 0 ${a} ${a}" aria-hidden="true">
                    <defs>
                        <filter id="fx-radial-pressed" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
                            <feComponentTransfer in="SourceGraphic" result="darkened">
                                <feFuncR type="linear" slope="0.79"></feFuncR>
                                <feFuncG type="linear" slope="0.79"></feFuncG>
                                <feFuncB type="linear" slope="0.79"></feFuncB>
                            </feComponentTransfer>
                            <feOffset in="darkened" dx="0" dy="1.9" result="offset"></feOffset>
                            <feGaussianBlur in="offset" stdDeviation="2.6" result="blurred"></feGaussianBlur>
                            <feComposite operator="out" in="darkened" in2="blurred" result="inverse"></feComposite>
                            <feFlood flood-color="#000000" flood-opacity="var(--fx-radial-switch-shadow-opacity)" result="shadowColor"></feFlood>
                            <feComposite operator="in" in="shadowColor" in2="inverse" result="shadow"></feComposite>
                            <feComposite operator="over" in="shadow" in2="darkened"></feComposite>
                        </filter>
                    </defs>

                    <circle cx="${o}" cy="${s}" r="${this.outerRadius+1}" fill="var(--fx-radial-switch-gap)" />

                    ${e.map((e,n)=>{let{start:r,end:a}=this.segmentGeometry(t,n),o=e.backgroundColor||this.backgroundColor,s=e.id===this.activeId;return i`
                            <path
                                class="wedge ${s?`active`:``}"
                                d="${this.wedgePath(r,a,this.outerRadius,this.innerRadius)}"
                                fill="${o}"
                                filter="${s?`url(#fx-radial-pressed)`:`none`}"
                                @click=${()=>this.handleStateChange(e.id)}
                            />
                        `})}

                    ${e.map((e,n)=>{let{start:r}=this.segmentGeometry(t,n),a=this.polar(r,this.innerRadius-.5),o=this.polar(r,this.outerRadius+.5);return i`
                            <line
                                class="wedge-gap"
                                x1="${a.x}"
                                y1="${a.y}"
                                x2="${o.x}"
                                y2="${o.y}"
                                stroke-width="${this.wedgeGap}"
                            />
                        `})}
                </svg>

                <div
                    class="knob-host"
                    style="width: ${this.knobRadius*2/a*100}%; height: ${this.knobRadius*2/a*100}%;"
                >
                    <slot name="knob" @slotchange=${this.updateSlottedKnob}>
                        <fx-knob
                            .angle=${this.pointerAngle}
                            .isAnimated=${this.isAnimated}
                        ></fx-knob>
                    </slot>
                </div>

                <div class="labels">
                    ${e.map((e,r)=>{let{mid:i}=this.segmentGeometry(t,r),o=this.polar(i,this.labelRadius),s=o.x/a*100,c=o.y/a*100,l=e.foregroundColor||this.foregroundColor,u=ee(e.id),d=!!e.label?.trim();return n`
                            <button
                                type="button"
                                class="label-btn"
                                style="left: ${s}%; top: ${c}%; --label-color: ${l};"
                                @click=${()=>this.handleStateChange(e.id)}
                            >
                                <span class="label-icon">
                                    <slot name="${u}"></slot>
                                </span>
                                <span class="label-text" ?hidden=${!d}>${e.label}</span>
                            </button>
                        `})}
                </div>
            </div>
        `}};S([o({type:Array})],H.prototype,`states`,void 0),S([o({type:String,attribute:`active-id`,reflect:!0})],H.prototype,`activeId`,void 0),S([o({type:String,attribute:`foreground-color`})],H.prototype,`foregroundColor`,void 0),S([o({type:String,attribute:`background-color`})],H.prototype,`backgroundColor`,void 0),S([o()],H.prototype,`size`,void 0),S([o({type:Number,attribute:`track-width`})],H.prototype,`trackWidth`,void 0),S([s()],H.prototype,`slottedStates`,void 0),H=S([a(`fx-radial-switch`)],H);var U=class extends T(C){constructor(...e){super(...e),this.label=``,this.labelPosition=`top`,this.shape=`round`,this.size=`medium`,this.color=``,this.name=``,this.isActive=!1,this.isBlinking=!1,this.isInteractive=!1}static{this.styles=[E,t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                vertical-align: middle;
                --fx-led-size: 18px;
                --fx-led-label-size: 0.7rem;
            }

            :host([size="small"]) {
                --fx-led-size: 9px;
                --fx-led-label-size: 0.6rem;
            }

            :host([size="medium"]) {
                --fx-led-size: 18px;
                --fx-led-label-size: 0.7rem;
            }

            :host([size="large"]) {
                --fx-led-size: 24px;
                --fx-led-label-size: 0.75rem;
            }

            :host([size="x-large"]) {
                --fx-led-size: 36px;
                --fx-led-label-size: 0.8rem;
            }

            .label-plate {
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: var(--fx-led-label-size, 0.7rem);
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                text-align: center;
                line-height: 1;
                white-space: nowrap;
            }

            :host([label-position="top"]) .label-plate {
                margin-bottom: 8px;
            }

            :host([label-position="bottom"]) .label-plate {
                margin-top: 8px;
            }

            .bezel {
                position: relative;
                flex-shrink: 0;
                box-sizing: border-box;
                cursor: default;
                outline: none;
                overflow: visible;
                padding: 1.5px;
                background: #090d16;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.6);
            }

            :host([is-interactive]:not([disabled])) .bezel {
                cursor: pointer;
            }

            :host([is-interactive]:not([disabled])) .bezel:focus-visible {
                outline: 2px solid rgba(255, 255, 255, 0.4);
                outline-offset: 2px;
            }

            :host([shape="round"]) .bezel {
                border-radius: 50%;
                width: var(--fx-led-size, 18px);
                height: var(--fx-led-size, 18px);
            }

            :host([shape="square"]) .bezel {
                border-radius: 4px;
                width: var(--fx-led-size, 18px);
                height: var(--fx-led-size, 18px);
            }

            :host([shape="rect"]) .bezel {
                border-radius: 6px;
                width: calc(var(--fx-led-size, 18px) * 2.6);
                height: var(--fx-led-size, 18px);
            }

            .lens {
                width: 100%;
                height: 100%;
                border-radius: inherit;
                position: relative;
                overflow: visible;
                box-sizing: border-box;
                background: radial-gradient(
                    circle at center,
                    var(--led-color-light) 0%,
                    var(--led-color) 70%,
                    var(--led-color-dark) 100%
                );
                border: 1px solid rgba(255, 255, 255, 0.25);
                box-shadow:
                    inset 0 1px 1.5px rgba(255, 255, 255, 0.5),
                    0 0 calc(var(--fx-led-size, 18px) * 0.6) var(--led-glow, rgba(34, 197, 94, 0.75)),
                    0 0 calc(var(--fx-led-size, 18px) * 1.3) var(--led-glow-outer, rgba(34, 197, 94, 0.35));
                opacity: 0.22;
            }

            :host([shape="round"]) .lens {
                border-radius: 50%;
            }

            :host([shape="square"]) .lens {
                border-radius: 2.5px;
            }

            :host([shape="rect"]) .lens {
                border-radius: 4.5px;
            }

            :host([is-active]) .lens {
                opacity: 1;
            }

            :host([disabled]) .lens {
                box-shadow: inset 0 1px 1.5px rgba(255, 255, 255, 0.35);
                filter: none;
                animation: none !important;
            }

            :host([is-animated]:not([disabled])) .lens {
                transition: opacity 0.18s ease;
            }

            @keyframes fx-led-blink {
                0%, 100% {
                    opacity: 1;
                    filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.15));
                }
                50% {
                    opacity: 0.22;
                    filter: drop-shadow(0 0 0px transparent);
                }
            }

            :host([is-active][is-blinking][is-animated]:not([disabled])) .lens {
                animation: fx-led-blink 1.0s ease-in-out infinite;
            }
        `]}handleClick(){!this.disabled&&this.isInteractive&&(this.name?(this.getRootNode().querySelectorAll(`fx-led-indicator[name="${this.name}"]`).forEach(e=>{e!==this&&(e.isActive=!1)}),this.isActive=!0):this.isActive=!this.isActive,this.dispatchEvent(new CustomEvent(`change`,{detail:{isActive:this.isActive,name:this.name},bubbles:!0,composed:!0})))}handleKeyDown(e){!this.disabled&&this.isInteractive&&(e.key===` `||e.key===`Enter`)&&(e.preventDefault(),this.handleClick())}get resolvedColor(){return x.resolvedColor(this.color,this.variant,`#22c55e`)}get colorVars(){let e=this.resolvedColor.replace(`#`,``),t=parseInt(e.substring(0,2),16),n=parseInt(e.substring(2,4),16),r=parseInt(e.substring(4,6),16);if(Number.isNaN(t)||Number.isNaN(n)||Number.isNaN(r))return`--led-color: ${this.resolvedColor}`;let i=e=>Math.min(255,Math.round(e+(255-e)*.55)),a=e=>Math.max(0,Math.round(e*.72)),o=`rgb(${i(t)}, ${i(n)}, ${i(r)})`,s=`rgb(${a(t)}, ${a(n)}, ${a(r)})`;return[`--led-color: ${this.resolvedColor}`,`--led-color-light: ${o}`,`--led-color-dark: ${s}`,`--led-glow: rgba(${t}, ${n}, ${r}, 0.65)`,`--led-glow-outer: rgba(${t}, ${n}, ${r}, 0.3)`].join(`; `)}render(){let{label:e,labelPosition:t,colorVars:i}=this,a=e?n`<div class="label-plate">${e}</div>`:``;return n`
            ${t===`top`?a:``}
            <div
                class="bezel"
                style="${i}"
                role="${this.isInteractive?`button`:`img`}"
                tabindex="${this.isInteractive?`0`:`-1`}"
                aria-pressed="${this.isInteractive?String(this.isActive):r}"
                @click="${this.handleClick}"
                @keydown="${this.handleKeyDown}"
            >
                <div class="lens"></div>
            </div>
            ${t===`bottom`?a:``}
        `}};S([o({type:String})],U.prototype,`label`,void 0),S([o({type:String,attribute:`label-position`,reflect:!0})],U.prototype,`labelPosition`,void 0),S([o({type:String,reflect:!0})],U.prototype,`shape`,void 0),S([o({type:String,reflect:!0})],U.prototype,`size`,void 0),S([o({type:String})],U.prototype,`color`,void 0),S([o({reflect:!0,converter:x.reflectOptional})],U.prototype,`variant`,void 0),S([o({type:String})],U.prototype,`name`,void 0),S([o({type:Boolean,attribute:`is-active`,reflect:!0})],U.prototype,`isActive`,void 0),S([o({type:Boolean,attribute:`is-blinking`,reflect:!0})],U.prototype,`isBlinking`,void 0),S([o({type:Boolean,attribute:`is-interactive`,reflect:!0})],U.prototype,`isInteractive`,void 0),U=S([a(`fx-led-indicator`)],U);var W=class extends C{constructor(...e){super(...e),this.value=``,this.color=``,this.label=``,this.icon=``,this.isBlinking=!1}connectedCallback(){super.connectedCallback(),this.style.display=`none`}updated(e){super.updated(e),(e.has(`value`)||e.has(`color`)||e.has(`variant`)||e.has(`label`)||e.has(`icon`)||e.has(`isBlinking`))&&this.dispatchEvent(new CustomEvent(`stateupdate`,{bubbles:!0,composed:!0}))}render(){return n`<slot name="icon"></slot>`}};S([o({attribute:`value`})],W.prototype,`value`,void 0),S([o()],W.prototype,`color`,void 0),S([o({reflect:!0,converter:x.reflectOptional})],W.prototype,`variant`,void 0),S([o()],W.prototype,`label`,void 0),S([o()],W.prototype,`icon`,void 0),S([o({type:Boolean,attribute:`is-blinking`,reflect:!0})],W.prototype,`isBlinking`,void 0),W=S([a(`fx-semaphore-state`)],W);var xn,G=class extends T(C){static{xn=this}constructor(...e){super(...e),this.value=``,this.label=``,this.hasShell=!0,this.size=`medium`,this.orientation=`vertical`,this.slottedStates=[],this.syncingIcons=!1,this.iconPresenceKey=``,this.onStateUpdate=()=>{this.collectSlottedStates(),this.syncIcons()},this.onStatesSlotChange=()=>{this.collectSlottedStates(),this.syncIcons()}}static{this.defaultStates=[{value:`stop`,color:``,variant:x.Danger,label:``},{value:`warn`,color:``,variant:x.Warning,label:``},{value:`go`,color:``,variant:x.Success,label:``}]}get effectiveStates(){return this.slottedStates.length>0?this.slottedStates:[...xn.defaultStates]}connectedCallback(){super.connectedCallback(),this.addEventListener(`stateupdate`,this.onStateUpdate)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`stateupdate`,this.onStateUpdate)}getAssignedStateElements(){let e=this.shadowRoot?.querySelector(`slot.states`);return e?e.assignedElements().filter(e=>e instanceof W):[]}statesEqual(e,t){return e.length===t.length&&e.every((e,n)=>e.value===t[n].value&&e.color===t[n].color&&e.variant===t[n].variant&&e.label===t[n].label&&(e.icon||``)===(t[n].icon||``)&&!!e.isBlinking==!!t[n].isBlinking)}collectSlottedStates(){let e=this.getAssignedStateElements().map(e=>({value:e.value,color:e.color||``,variant:e.variant,label:e.label||``,icon:e.icon||void 0,isBlinking:e.isBlinking}));this.statesEqual(this.slottedStates,e)||(this.slottedStates=e)}syncIcons(){if(!this.syncingIcons){this.syncingIcons=!0;try{let e=this.getAssignedStateElements();le(this,{arrayStates:[],stateElements:e,fallbackStates:this.effectiveStates.map(e=>({id:e.value,icon:e.icon}))});let t=this.effectiveStates.filter(e=>de(this,e.value)).map(e=>e.value).join(`\0`);t!==this.iconPresenceKey&&(this.iconPresenceKey=t,this.requestUpdate())}finally{this.syncingIcons=!1}}}firstUpdated(){this.collectSlottedStates(),this.syncIcons()}updated(e){super.updated(e),e.has(`slottedStates`)&&this.syncIcons()}static{this.styles=[E,t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                vertical-align: middle;
            }

            .shell {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding: 12px 10px;
                background: #1e293b;
                border: 1.5px solid #334155;
                border-radius: 12px;
                box-sizing: border-box;
            }

            :host([orientation="horizontal"]) .shell {
                flex-direction: row;
                padding: 10px 12px;
            }

            :host(:not([has-shell])) .shell {
                background: transparent;
                border: none;
                padding: 0;
                border-radius: 0;
            }

            .lamp {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }

            .lamp-caption {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                line-height: 1;
            }

            .lamp-caption[hidden] {
                display: none !important;
            }

            .lamp-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: var(--fx-semaphore-icon-size, 0.85rem);
                line-height: 1;
                pointer-events: none;
            }

            .lamp-icon[hidden] {
                display: none !important;
            }

            ::slotted([slot^="icon-"]) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
            }

            .lamp-text {
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: 0.7rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                text-align: center;
                white-space: nowrap;
            }

            :host([size="small"]) .lamp-text {
                font-size: 0.6rem;
            }

            :host([size="small"]) .lamp-icon {
                font-size: 0.7rem;
            }

            :host([size="large"]) .lamp-text {
                font-size: 0.75rem;
            }

            :host([size="large"]) .lamp-icon {
                font-size: 1rem;
            }

            :host([size="x-large"]) .lamp-text {
                font-size: 0.8rem;
            }

            :host([size="x-large"]) .lamp-icon {
                font-size: 1.125rem;
            }

            .label-plate {
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: 0.7rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                text-align: center;
                line-height: 1;
                white-space: nowrap;
                margin-top: 10px;
            }

            :host([size="small"]) .label-plate {
                font-size: 0.6rem;
            }

            :host([size="large"]) .label-plate {
                font-size: 0.75rem;
            }

            :host([size="x-large"]) .label-plate {
                font-size: 0.8rem;
            }
        `]}render(){let e=this.effectiveStates;return n`
            <slot class="states" @slotchange=${this.onStatesSlotChange} style="display:none;"></slot>

            <div class="shell" role="img" aria-label="${this.label||`semaphore`}">
                ${e.map(e=>{let t=ee(e.value),r=!!e.icon?.trim()||de(this,e.value),i=!!e.label;return n`
                        <div class="lamp">
                            <div class="lamp-caption" ?hidden=${!(r||i)}>
                                <span class="lamp-icon" ?hidden=${!r}>
                                    <slot name="${t}"></slot>
                                </span>
                                ${i?n`<span class="lamp-text">${e.label}</span>`:``}
                            </div>
                            <fx-led-indicator
                                label-position="none"
                                shape="round"
                                size="${this.size}"
                                color="${x.resolvedColor(e.color,e.variant,`#22c55e`)}"
                                ?is-active=${this.value===e.value}
                                ?is-blinking=${!!e.isBlinking}
                                ?is-animated=${this.isAnimated}
                                ?disabled=${this.disabled}
                            ></fx-led-indicator>
                        </div>
                    `})}
            </div>

            ${this.label?n`<div class="label-plate">${this.label}</div>`:``}
        `}};S([o({type:String})],G.prototype,`value`,void 0),S([o({type:String})],G.prototype,`label`,void 0),S([o({type:Boolean,attribute:`has-shell`,reflect:!0})],G.prototype,`hasShell`,void 0),S([o({type:String,reflect:!0})],G.prototype,`size`,void 0),S([o({type:String,reflect:!0})],G.prototype,`orientation`,void 0),S([s()],G.prototype,`slottedStates`,void 0),G=xn=S([a(`fx-semaphore`)],G);var K=class extends C{constructor(...e){super(...e),this.label=``,this.prefix=``,this.value=``,this.suffix=``,this.valueTemplate=``,this.contentLayout=`labeled`,this.align=`center`,this.size=`small`,this.backgroundColor=``,this.color=``,this.labelColor=`#9ca3af`,this.prefixColor=``,this.foregroundColor=`#38bdf8`,this.suffixColor=``,this.fontSize=``,this.labelSize=``,this.prefixSize=``,this.valueSize=``,this.suffixSize=``,this.labelWeight=``,this.valueWeight=``,this.prefixWeight=``,this.suffixWeight=``,this.icon=``,this.iconColor=``,this.iconSide=`left`,this.typography=`segmented`,this.isSelectable=!1}static{this.styles=[E,t`
            :host {
                display: flex;
                box-sizing: border-box;
                min-width: 0;
                min-height: 0;
                width: var(--fx-display-region-width);
                height: var(--fx-display-region-height);
                border-radius: var(--fx-display-region-border-radius, 4px);
                transition: all 0.15s ease;
                overflow: visible;
                font-family: var(--fx-display-font-family, 'DS-Digital', monospace);
                letter-spacing: var(--fx-display-letter-spacing, 0.05em);
                user-select: none;
                cursor: default;
                --fx-display-label-size: 0.6rem;
                --fx-display-value-size: 1.75rem;
                --fx-display-region-gap: 3px;
            }

            :host([size='x-small']) {
                --fx-display-label-size: 0.55rem;
                --fx-display-value-size: 1.35rem;
                --fx-display-region-gap: 2px;
                --fx-display-region-padding: 4px;
            }
            :host([size='small']) {
                --fx-display-label-size: 0.6rem;
                --fx-display-value-size: 1.75rem;
                --fx-display-region-gap: 3px;
                --fx-display-region-padding: 4px;
            }
            :host([size='medium']) {
                --fx-display-label-size: 0.65rem;
                --fx-display-value-size: 2.35rem;
                --fx-display-region-gap: 4px;
                --fx-display-region-padding: 6px;
            }
            :host([size='large']) {
                --fx-display-label-size: 0.7rem;
                --fx-display-value-size: 3rem;
                --fx-display-region-gap: 4px;
                --fx-display-region-padding: 6px;
            }
            :host([size='x-large']) {
                --fx-display-label-size: 0.75rem;
                --fx-display-value-size: 4rem;
                --fx-display-region-gap: 6px;
                --fx-display-region-padding: 8px;
            }
            :host([size='xx-large']) {
                --fx-display-label-size: 0.85rem;
                --fx-display-value-size: 5.25rem;
                --fx-display-region-gap: 6px;
                --fx-display-region-padding: 8px;
            }

            :host([is-selectable]) {
                user-select: text;
                cursor: text;
            }

            .region-wrap {
                display: flex;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: var(--fx-display-region-padding, 4px);
                gap: var(--fx-display-region-gap);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }

            :host([content-layout='row']) .region-wrap {
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }

            :host([content-layout='column']) .region-wrap {
                flex-direction: column;
                justify-content: center;
            }

            :host([align='left']) .region-wrap {
                align-items: flex-start;
                text-align: left;
            }
            :host([align='right']) .region-wrap {
                align-items: flex-end;
                text-align: right;
            }
            :host([align='space-between']) .region-wrap {
                justify-content: space-between;
                align-items: center;
            }
            :host([align='space-around']) .region-wrap {
                justify-content: space-around;
                align-items: center;
            }

            :host([content-layout='row'][align='left']) .region-wrap,
            :host([content-layout='row'][align='right']) .region-wrap {
                align-items: center;
            }

            .label {
                text-transform: uppercase;
                letter-spacing: var(--fx-display-label-letter-spacing, 0.1em);
                font-size: var(--fx-display-label-size);
                font-weight: var(--fx-display-label-weight, 700);
                line-height: 1.1;
                flex-shrink: 0;
            }

            :host([content-layout='row']) .label {
                margin-right: 4px;
            }

            .value-container {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-wrap: nowrap;
                gap: 6px;
                white-space: nowrap;
                line-height: 1;
            }

            .value-container ::slotted([slot='start']),
            .value-container ::slotted([slot='end']) {
                display: inline-flex;
                align-items: center;
                flex-shrink: 0;
                color: var(--fx-display-icon-color, inherit);
                font-size: calc(var(--fx-display-value-size) * 0.48);
                line-height: 1;
                text-shadow: var(--fx-display-glow, none);
            }

            :host([content-layout='column']) .value-container {
                flex-direction: column;
                align-items: center;
                white-space: normal;
            }

            :host([align='left']) .value-container {
                justify-content: flex-start;
            }
            :host([align='right']) .value-container {
                justify-content: flex-end;
            }

            .icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
                font-size: calc(var(--fx-display-value-size) * 0.48);
                font-family: var(--fx-font-family, sans-serif);
            }

            .icon ::slotted([slot='icon']),
            .icon ::slotted(i),
            .icon ::slotted(fx-icon) {
                font-size: inherit;
                line-height: 1;
                color: inherit;
                text-shadow: var(--fx-display-glow, none);
            }

            .icon-top {
                flex-direction: column;
                align-items: center;
            }
            .icon-bottom {
                flex-direction: column-reverse;
                align-items: center;
            }
            .icon-left {
                flex-direction: row;
                align-items: center;
            }
            .icon-right {
                flex-direction: row-reverse;
                align-items: center;
            }

            .prefix,
            .suffix {
                opacity: 0.85;
                font-size: calc(var(--fx-display-value-size) * 0.72);
                font-weight: var(--fx-display-value-weight, 700);
            }

            .value {
                font-size: var(--fx-display-value-size);
                font-weight: var(--fx-display-value-weight, 700);
            }

            .readout-measure {
                display: inline-grid;
                justify-items: center;
                align-items: center;
            }

            :host([align='left']) .readout-measure {
                justify-items: start;
            }

            :host([align='right']) .readout-measure {
                justify-items: end;
            }

            .readout-sizer,
            .readout-live {
                grid-area: 1 / 1;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-wrap: nowrap;
                gap: 6px;
                white-space: nowrap;
                line-height: 1;
            }

            :host([align='left']) .readout-sizer,
            :host([align='left']) .readout-live {
                justify-content: flex-start;
            }

            :host([align='right']) .readout-sizer,
            :host([align='right']) .readout-live {
                justify-content: flex-end;
            }

            .readout-sizer {
                visibility: hidden;
            }

            :host([content-layout='column']) .readout-sizer,
            :host([content-layout='column']) .readout-live {
                flex-direction: column;
                align-items: center;
                white-space: normal;
            }

            .label,
            .prefix,
            .value,
            .suffix,
            .icon {
                text-shadow: var(--fx-display-glow, none);
            }

            :host([typography='classic']) {
                --fx-display-font-family: var(--fx-font-family, system-ui, sans-serif);
                --fx-display-letter-spacing: normal;
                --fx-display-label-letter-spacing: 0.08em;
            }

            :host([typography='segmented']) {
                --fx-display-letter-spacing: 0.05em;
                --fx-display-label-letter-spacing: 0.1em;
                --fx-display-label-weight: 700;
                --fx-display-value-weight: 700;
            }

            :host([typography='modern']) {
                --fx-display-font-family: 'Oxanium', 'Chakra Petch', sans-serif;
                --fx-display-letter-spacing: 0.02em;
                --fx-display-label-letter-spacing: 0.08em;
                --fx-display-label-weight: 400;
                --fx-display-value-weight: 400;
            }
        `]}updated(e){super.updated(e),e.has(`typography`)&&Ct(this.typography),e.has(`icon`)&&this.syncIcon()}connectedCallback(){super.connectedCallback(),Ct(this.typography),this.syncIcon()}syncIcon(){ue(this,this.icon)}renderValueContent(e){return e?n`<span class="value">${e}</span>`:``}renderIcon(){return this.icon||fe(this,`icon`)?n`<span class="icon"><slot name="icon"></slot></span>`:null}renderSizerIcon(){return this.icon||fe(this,`icon`)?n`<span class="icon" aria-hidden="true">▮</span>`:null}renderReadoutParts(e,t){let r=t?this.renderSizerIcon():this.renderIcon(),i=this.renderValueContent(t&&this.valueTemplate||e),a=!!r&&(this.iconSide===`left`||this.iconSide===`top`),o=!!r&&(this.iconSide===`right`||this.iconSide===`bottom`);return n`
            ${a?r:``}
            ${this.prefix?n`<span class="prefix">${this.prefix}</span>`:``}
            ${i}
            ${this.suffix?n`<span class="suffix">${this.suffix}</span>`:``}
            ${o?r:``}
        `}render(){let e=this.color||`inherit`,t=this.foregroundColor||this.color||`#38bdf8`,r=this.labelColor||`#9ca3af`,i=this.prefixColor||this.foregroundColor||`#38bdf8`,a=this.suffixColor||this.foregroundColor||`#38bdf8`,o=this.iconColor||this.foregroundColor||`#38bdf8`,s=y(this.value)?``:String(this.value),c=n`
            <style>
                :host {
                    background-color: ${this.backgroundColor||`transparent`};
                    color: ${e};
                    --fx-display-icon-color: ${o};
                    ${this.fontSize?`font-size: ${this.fontSize};`:``}
                    ${At(this.size)}
                }
                .label {
                    color: ${r};
                    ${this.labelSize?`font-size: ${this.labelSize};`:``}
                    ${this.labelWeight?`font-weight: ${this.labelWeight};`:``}
                }
                .prefix {
                    color: ${i};
                    ${this.prefixSize?`font-size: ${this.prefixSize};`:``}
                    ${this.prefixWeight?`font-weight: ${this.prefixWeight};`:``}
                }
                .value {
                    color: ${t};
                    ${this.valueSize?`font-size: ${this.valueSize};`:``}
                    ${this.valueWeight?`font-weight: ${this.valueWeight};`:``}
                }
                .suffix {
                    color: ${a};
                    ${this.suffixSize?`font-size: ${this.suffixSize};`:``}
                    ${this.suffixWeight?`font-weight: ${this.suffixWeight};`:``}
                }
                .icon {
                    color: ${o};
                }
            </style>
        `,l=`icon-left`;switch(this.iconSide){case`right`:l=`icon-right`;break;case`top`:l=`icon-top`;break;case`bottom`:l=`icon-bottom`}let u;return u=this.valueTemplate?n`
                <span class="readout-measure">
                    <span class="readout-sizer ${l}" aria-hidden="true">
                        ${this.renderReadoutParts(s,!0)}
                    </span>
                    <span class="readout-live ${l}">
                        ${this.renderReadoutParts(s,!1)}
                    </span>
                </span>
            `:this.renderReadoutParts(s,!1),n`
            ${c}
            <div class="region-wrap">
                ${this.label?n`<span class="label">${this.label}</span>`:``}
                <div class="value-container ${l}">
                    <slot name="start"></slot>
                    ${u}
                    <slot name="end"></slot>
                </div>
            </div>
        `}};S([o({type:String})],K.prototype,`label`,void 0),S([o({type:String})],K.prototype,`prefix`,void 0),S([o({type:String})],K.prototype,`value`,void 0),S([o({type:String})],K.prototype,`suffix`,void 0),S([o({type:String,attribute:`value-template`})],K.prototype,`valueTemplate`,void 0),S([o({type:String,attribute:`content-layout`,reflect:!0,converter:Tt})],K.prototype,`contentLayout`,void 0),S([o({type:String,reflect:!0,converter:Et})],K.prototype,`align`,void 0),S([o({type:String,reflect:!0})],K.prototype,`size`,void 0),S([o({type:String,attribute:`background-color`})],K.prototype,`backgroundColor`,void 0),S([o({type:String})],K.prototype,`color`,void 0),S([o({type:String,attribute:`label-color`})],K.prototype,`labelColor`,void 0),S([o({type:String,attribute:`prefix-color`})],K.prototype,`prefixColor`,void 0),S([o({type:String,attribute:`foreground-color`})],K.prototype,`foregroundColor`,void 0),S([o({type:String,attribute:`suffix-color`})],K.prototype,`suffixColor`,void 0),S([o({type:String,attribute:`font-size`})],K.prototype,`fontSize`,void 0),S([o({type:String,attribute:`label-size`})],K.prototype,`labelSize`,void 0),S([o({type:String,attribute:`prefix-size`})],K.prototype,`prefixSize`,void 0),S([o({type:String,attribute:`value-size`})],K.prototype,`valueSize`,void 0),S([o({type:String,attribute:`suffix-size`})],K.prototype,`suffixSize`,void 0),S([o({type:String,attribute:`label-weight`})],K.prototype,`labelWeight`,void 0),S([o({type:String,attribute:`value-weight`})],K.prototype,`valueWeight`,void 0),S([o({type:String,attribute:`prefix-weight`})],K.prototype,`prefixWeight`,void 0),S([o({type:String,attribute:`suffix-weight`})],K.prototype,`suffixWeight`,void 0),S([o({type:String})],K.prototype,`icon`,void 0),S([o({type:String,attribute:`icon-color`})],K.prototype,`iconColor`,void 0),S([o({type:String,attribute:`icon-side`})],K.prototype,`iconSide`,void 0),S([o({type:String,reflect:!0,converter:wt})],K.prototype,`typography`,void 0),S([o({type:Boolean,attribute:`is-selectable`,reflect:!0})],K.prototype,`isSelectable`,void 0),K=S([a(`fx-display-region`)],K);var q=class extends C{constructor(...e){super(...e),this.layout=`vertical`,this.gap=`4px`,this.gridTemplate=``,this.padding=``,this.border=``,this.borderRadius=``,this.backgroundColor=``,this.hasShell=!0,this.size=`small`,this.contentLayout=`labeled`,this.typography=`segmented`,this.glow=`small`,this.isSelectable=!1,this.regionConfigs=[],this.label=``,this.prefix=``,this.value=``,this.suffix=``,this.valueTemplate=``,this.align=`center`,this.color=``,this.labelColor=`#9ca3af`,this.prefixColor=``,this.foregroundColor=`#38bdf8`,this.suffixColor=``,this.fontSize=``,this.labelSize=``,this.prefixSize=``,this.valueSize=``,this.suffixSize=``,this.labelWeight=``,this.valueWeight=``,this.prefixWeight=``,this.suffixWeight=``,this.icon=``,this.iconColor=``,this.iconSide=`left`,this.hasSlottedRegions=!1}get regions(){return this.regionConfigs}set regions(e){let t=this.regionConfigs;if(typeof e==`string`)try{this.regionConfigs=JSON.parse(e)}catch(e){console.error(`Failed to parse regions JSON:`,e),this.regionConfigs=[]}else this.regionConfigs=Array.isArray(e)?e:[];this.requestUpdate(`regions`,t)}static{this.styles=[E,t`
            :host {
                display: inline-flex;
                box-sizing: border-box;
                min-width: 0;
                min-height: 0;
                width: var(--fx-display-width);
                height: var(--fx-display-height);
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                cursor: default;
                --fx-display-shell-background: var(--fx-theme-display-shell-background, #0b111f);
                --fx-display-shell-border: var(--fx-theme-display-shell-border, #334155);
                --fx-display-shell-radius: 10px;
                --fx-display-shell-pad: 8px;
                --fx-display-glow: 0 0 2px currentColor;
                --fx-display-letter-spacing: 0.05em;
                --fx-display-label-letter-spacing: 0.1em;
                --fx-display-label-weight: 700;
                --fx-display-value-weight: 700;
            }

            :host([theme='silver']) {
                --fx-display-shell-background: #1e293b;
                --fx-display-shell-border: #334155;
            }

            :host([theme='darkblue']) {
                --fx-display-shell-background: #0b111f;
                --fx-display-shell-border: #334155;
            }

            :host([typography='classic']) {
                --fx-display-font-family: var(--fx-font-family, system-ui, sans-serif);
                --fx-display-letter-spacing: normal;
                --fx-display-label-letter-spacing: 0.08em;
            }

            :host([typography='modern']) {
                --fx-display-font-family: 'Oxanium', 'Chakra Petch', sans-serif;
                --fx-display-letter-spacing: 0.02em;
                --fx-display-label-letter-spacing: 0.08em;
                --fx-display-label-weight: 400;
                --fx-display-value-weight: 400;
            }

            :host([glow='none']) {
                --fx-display-glow: none;
            }
            :host([glow='small']) {
                --fx-display-glow: 0 0 2px currentColor;
            }
            :host([glow='medium']) {
                --fx-display-glow: 0 0 4px currentColor;
            }
            :host([glow='large']) {
                --fx-display-glow: 0 0 6px currentColor;
            }
            :host([glow='x-large']) {
                --fx-display-glow: 0 0 10px currentColor, 0 0 3px currentColor;
            }

            :host([size='x-small']) {
                --fx-display-shell-pad: 6px;
                --fx-display-shell-radius: 8px;
            }
            :host([size='small']) {
                --fx-display-shell-pad: 8px;
                --fx-display-shell-radius: 10px;
            }
            :host([size='medium']) {
                --fx-display-shell-pad: 10px;
                --fx-display-shell-radius: 12px;
            }
            :host([size='large']) {
                --fx-display-shell-pad: 10px;
                --fx-display-shell-radius: 12px;
            }
            :host([size='x-large']) {
                --fx-display-shell-pad: 12px;
                --fx-display-shell-radius: 14px;
            }
            :host([size='xx-large']) {
                --fx-display-shell-pad: 12px;
                --fx-display-shell-radius: 14px;
            }

            :host([is-selectable]) {
                user-select: text;
                cursor: text;
            }

            .shell {
                position: relative;
                display: flex;
                width: 100%;
                min-width: 0;
                box-sizing: border-box;
                background: var(--fx-display-shell-background);
                border: 1.5px solid var(--fx-display-shell-border);
                border-radius: var(--fx-display-shell-radius);
                padding: var(--fx-display-shell-pad);
                box-shadow:
                    var(--fx-shell-shadow, 0 1px 2px rgba(0, 0, 0, 0.35)),
                    inset 0 1px 0 rgba(255, 255, 255, 0.06),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.28);
            }

            :host([has-shell='false']) .shell {
                background: transparent;
                border: none;
                border-radius: 0;
                padding: 0;
                box-shadow: none;
            }

            .display-container {
                display: flex;
                width: 100%;
                min-width: 0;
                height: auto;
                box-sizing: border-box;
                transition: all 0.2s ease;
            }
            .display-container.vertical,
            .display-container.v {
                flex-direction: column;
            }
            .display-container.horizontal,
            .display-container.h {
                flex-direction: row;
                align-items: stretch;
            }
            .display-container.grid {
                display: grid;
                justify-items: stretch;
                align-items: center;
            }
        `]}connectedCallback(){super.connectedCallback(),Ct(this.typography)}updated(e){super.updated(e),e.has(`typography`)&&Ct(this.typography),(e.has(`isSelectable`)||e.has(`size`)||e.has(`contentLayout`)||e.has(`typography`)||e.has(`align`)||e.has(`foregroundColor`)||e.has(`labelColor`)||e.has(`prefixColor`)||e.has(`suffixColor`)||e.has(`color`)||e.has(`valueTemplate`))&&this.syncHostPropsToSlottedRegions()}handleSlotChange(e){let t=e.target;this.hasSlottedRegions=t.assignedElements({flatten:!0}).length>0,this.syncHostPropsToSlottedRegions()}syncHostPropsToSlottedRegions(){for(let e of this.querySelectorAll(`fx-display-region`))if(e.closest(`fx-display`)===this){let t=e;t.isSelectable=this.isSelectable,t.hasAttribute(`size`)||(t.size=this.size),t.hasAttribute(`typography`)||(t.typography=this.typography),t.hasAttribute(`content-layout`)||(t.contentLayout=this.contentLayout),t.hasAttribute(`align`)||(t.align=this.align),t.hasAttribute(`foreground-color`)||(t.foregroundColor=this.foregroundColor),t.hasAttribute(`label-color`)||(t.labelColor=this.labelColor),!t.hasAttribute(`prefix-color`)&&this.prefixColor&&(t.prefixColor=this.prefixColor),!t.hasAttribute(`suffix-color`)&&this.suffixColor&&(t.suffixColor=this.suffixColor),!t.hasAttribute(`color`)&&this.color&&(t.color=this.color),!t.hasAttribute(`value-template`)&&this.valueTemplate&&(t.valueTemplate=this.valueTemplate)}}renderRegionElement(e){return n`
            <fx-display-region
                .label="${e.label}"
                .prefix="${e.prefix}"
                .value="${e.value}"
                .suffix="${e.suffix}"
                .valueTemplate="${e.valueTemplate||``}"
                .contentLayout="${e.contentLayout}"
                .align="${e.align}"
                .size="${e.size}"
                .backgroundColor="${e.backgroundColor}"
                .color="${e.color}"
                .labelColor="${e.labelColor}"
                .prefixColor="${e.prefixColor}"
                .foregroundColor="${e.foregroundColor}"
                .suffixColor="${e.suffixColor}"
                .fontSize="${e.fontSize}"
                .labelSize="${e.labelSize}"
                .prefixSize="${e.prefixSize}"
                .valueSize="${e.valueSize}"
                .suffixSize="${e.suffixSize}"
                .labelWeight="${e.labelWeight}"
                .valueWeight="${e.valueWeight}"
                .prefixWeight="${e.prefixWeight}"
                .suffixWeight="${e.suffixWeight}"
                .icon="${e.icon}"
                .iconColor="${e.iconColor}"
                .iconSide="${e.iconSide}"
                .typography="${e.typography}"
                ?is-selectable=${!!e.isSelectable}
                style="${e.style||``}"
            ></fx-display-region>
        `}render(){let e=`vertical`;switch(this.layout){case`grid`:e=`grid`;break;case`horizontal`:case`h`:e=`horizontal`}let t=`
            gap: ${this.gap};
            grid-template-columns: ${this.gridTemplate||`repeat(auto-fit, max-content)`};
        `,r=n`
            <style>
                :host {
                    ${this.backgroundColor?`--fx-display-shell-background: ${this.backgroundColor};`:``}
                    ${this.borderRadius?`--fx-display-shell-radius: ${this.borderRadius};`:``}
                    ${this.padding?`--fx-display-shell-pad: ${this.padding};`:``}
                    ${At(this.size)}
                }
                .shell {
                    ${this.border?`border: ${this.border};`:``}
                }
            </style>
        `,i=n`
            <div class="display-container ${e}" style="${t}">
                <slot @slotchange="${this.handleSlotChange}" style="display: contents;"></slot>

                ${!this.hasSlottedRegions&&this.regions.length>0?this.regions.map(e=>this.renderRegionElement({label:e.label||``,prefix:e.prefix||``,value:y(e.value)?``:String(e.value),suffix:e.suffix||``,valueTemplate:e.valueTemplate||this.valueTemplate,contentLayout:e.contentLayout||this.contentLayout,align:e.align||`center`,size:e.size||this.size,backgroundColor:e.backgroundColor||``,color:e.color||``,labelColor:e.labelColor||``,prefixColor:e.prefixColor||``,foregroundColor:e.foregroundColor||this.foregroundColor,suffixColor:e.suffixColor||``,fontSize:e.fontSize||``,labelSize:e.labelSize||``,prefixSize:e.prefixSize||``,valueSize:e.valueSize||``,suffixSize:e.suffixSize||``,labelWeight:e.labelWeight||``,valueWeight:e.valueWeight||``,prefixWeight:e.prefixWeight||``,suffixWeight:e.suffixWeight||``,icon:e.icon||``,iconColor:e.iconColor||``,iconSide:e.iconSide||`left`,typography:e.typography||this.typography,isSelectable:y(e.isSelectable)?this.isSelectable:e.isSelectable,style:`
                                ${y(e.flex)?``:`flex: ${e.flex};`}
                                ${e.width?`width: ${e.width};`:``}
                                ${e.height?`height: ${e.height};`:``}
                                ${e.padding?`padding: ${e.padding};`:``}
                                ${e.margin?`margin: ${e.margin};`:``}
                                ${e.border?`border: ${e.border};`:``}
                                ${e.borderRadius?`border-radius: ${e.borderRadius};`:``}
                            `})):``}

                ${!this.hasSlottedRegions&&this.regions.length===0?this.renderRegionElement({label:this.label,prefix:this.prefix,value:this.value,suffix:this.suffix,valueTemplate:this.valueTemplate,contentLayout:this.contentLayout,align:this.align,size:this.size,backgroundColor:``,color:this.color,labelColor:this.labelColor,prefixColor:this.prefixColor,foregroundColor:this.foregroundColor,suffixColor:this.suffixColor,fontSize:this.fontSize,labelSize:this.labelSize,prefixSize:this.prefixSize,valueSize:this.valueSize,suffixSize:this.suffixSize,labelWeight:this.labelWeight,valueWeight:this.valueWeight,prefixWeight:this.prefixWeight,suffixWeight:this.suffixWeight,icon:this.icon,iconColor:this.iconColor,iconSide:this.iconSide,typography:this.typography,isSelectable:this.isSelectable,style:`flex: 1;`}):``}
            </div>
        `;return n`
            ${r}
            <div class="shell">${i}</div>
        `}};S([o({type:String,reflect:!0})],q.prototype,`layout`,void 0),S([o({type:String})],q.prototype,`gap`,void 0),S([o({type:String,attribute:`grid-template`})],q.prototype,`gridTemplate`,void 0),S([o({type:String})],q.prototype,`padding`,void 0),S([o({type:String})],q.prototype,`border`,void 0),S([o({type:String,attribute:`border-radius`})],q.prototype,`borderRadius`,void 0),S([o({type:String,attribute:`background-color`})],q.prototype,`backgroundColor`,void 0),S([o({type:Boolean,attribute:`has-shell`,reflect:!0,converter:{fromAttribute:e=>e!==`false`,toAttribute:e=>e?``:`false`}})],q.prototype,`hasShell`,void 0),S([o({type:String,reflect:!0})],q.prototype,`size`,void 0),S([o({type:String,attribute:`content-layout`,reflect:!0,converter:Tt})],q.prototype,`contentLayout`,void 0),S([o({type:String,reflect:!0,converter:wt})],q.prototype,`typography`,void 0),S([o({type:String,reflect:!0,converter:b})],q.prototype,`theme`,void 0),S([o({type:String,reflect:!0})],q.prototype,`glow`,void 0),S([o({type:Boolean,attribute:`is-selectable`,reflect:!0})],q.prototype,`isSelectable`,void 0),S([o({type:Array})],q.prototype,`regions`,null),S([o({type:String})],q.prototype,`label`,void 0),S([o({type:String})],q.prototype,`prefix`,void 0),S([o({type:String})],q.prototype,`value`,void 0),S([o({type:String})],q.prototype,`suffix`,void 0),S([o({type:String,attribute:`value-template`})],q.prototype,`valueTemplate`,void 0),S([o({type:String,attribute:`region-align`,reflect:!0,converter:Et})],q.prototype,`align`,void 0),S([o({type:String})],q.prototype,`color`,void 0),S([o({type:String,attribute:`label-color`})],q.prototype,`labelColor`,void 0),S([o({type:String,attribute:`prefix-color`})],q.prototype,`prefixColor`,void 0),S([o({type:String,attribute:`foreground-color`})],q.prototype,`foregroundColor`,void 0),S([o({type:String,attribute:`suffix-color`})],q.prototype,`suffixColor`,void 0),S([o({type:String,attribute:`font-size`})],q.prototype,`fontSize`,void 0),S([o({type:String,attribute:`label-size`})],q.prototype,`labelSize`,void 0),S([o({type:String,attribute:`prefix-size`})],q.prototype,`prefixSize`,void 0),S([o({type:String,attribute:`value-size`})],q.prototype,`valueSize`,void 0),S([o({type:String,attribute:`suffix-size`})],q.prototype,`suffixSize`,void 0),S([o({type:String,attribute:`label-weight`})],q.prototype,`labelWeight`,void 0),S([o({type:String,attribute:`value-weight`})],q.prototype,`valueWeight`,void 0),S([o({type:String,attribute:`prefix-weight`})],q.prototype,`prefixWeight`,void 0),S([o({type:String,attribute:`suffix-weight`})],q.prototype,`suffixWeight`,void 0),S([o({type:String})],q.prototype,`icon`,void 0),S([o({type:String,attribute:`icon-color`})],q.prototype,`iconColor`,void 0),S([o({type:String,attribute:`icon-side`})],q.prototype,`iconSide`,void 0),S([s()],q.prototype,`hasSlottedRegions`,void 0),q=S([a(`fx-display`)],q);var Sn=class extends C{},J=class extends Sn{constructor(...e){super(...e),this.alignX=`center`,this.alignY=`center`,this.padding=``}get effectiveAlignX(){switch(this.alignX){case`left`:case`right`:case`stretch`:case`center`:return this.alignX;default:return`center`}}get effectiveAlignY(){switch(this.alignY){case`top`:case`bottom`:case`stretch`:case`center`:return this.alignY;default:return`center`}}get effectivePadding(){return this.padding}mapAlignX(e){switch(e){case`left`:return`flex-start`;case`right`:return`flex-end`;case`stretch`:return`stretch`;default:return`center`}}mapAlignY(e){switch(e){case`top`:return`flex-start`;case`bottom`:return`flex-end`;case`stretch`:return`stretch`;default:return`center`}}contentFlexAlign(e){switch(e){case`column`:return{alignItems:this.mapAlignX(this.effectiveAlignX),justifyContent:this.mapAlignY(this.effectiveAlignY)};default:return{alignItems:this.mapAlignY(this.effectiveAlignY),justifyContent:this.mapAlignX(this.effectiveAlignX)}}}};S([o({type:String,attribute:`align-x`,reflect:!0})],J.prototype,`alignX`,void 0),S([o({type:String,attribute:`align-y`,reflect:!0})],J.prototype,`alignY`,void 0),S([o({type:String})],J.prototype,`padding`,void 0);var Y=class extends J{constructor(...e){super(...e),this.title=``,this.titleColor=`#94a3b8`,this.background=``,this.border=``,this.borderRadius=`8px`,this.padding=`20px`,this.gap=`20px`,this.flexDirection=`column`}static{this.styles=[E,t`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                overflow: hidden;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
                --fx-group-box-background: var(--fx-theme-group-box-background, #111827);
                --fx-group-box-border: var(--fx-theme-group-box-border, 1px solid #1f2937);
            }
            :host([theme='silver']) {
                --fx-group-box-background: #1e293b;
                --fx-group-box-border: 1px solid #334155;
            }
            :host([theme='darkgreen']) {
                --fx-group-box-background: #131920;
                --fx-group-box-border: 1px solid #1f2937;
            }
            :host([theme='iron']) {
                --fx-group-box-background: #111827;
                --fx-group-box-border: 1px solid #1f2937;
            }
            :host([theme='dark']) {
                --fx-group-box-background: #080b10;
                --fx-group-box-border: 1px solid #12161e;
            }
            :host([theme='darkblue']) {
                --fx-group-box-background: #0b111f;
                --fx-group-box-border: 1px solid #334155;
            }
            :host([theme='darkergreen']) {
                --fx-group-box-background: #0c0e12;
                --fx-group-box-border: 1px solid #18222e;
            }
            :host([theme='snow']) {
                --fx-group-box-background: #ffffff;
                --fx-group-box-border: 1px solid #e5e7eb;
            }
            .groupbox-header {
                width: 100%;
                border-bottom: 1px solid #1e293b;
                padding-bottom: 12px;
                margin-bottom: 16px;
                box-sizing: border-box;
            }
            .groupbox-title {
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                margin: 0;
                opacity: 0.9;
            }
            .inner {
                display: flex;
                flex-direction: column;
                flex: 1;
                min-height: 0;
                box-sizing: border-box;
            }
            .groupbox-content {
                display: flex;
                box-sizing: border-box;
                width: 100%;
                flex: 1;
                min-height: 0;
            }
        `]}get resolvedBackground(){return this.background.trim()?this.background:`var(--fx-group-box-background)`}get resolvedBorder(){return this.border.trim()?this.border:`var(--fx-group-box-border)`}render(){let e=this.flexDirection===`row`?`row`:`column`,{alignItems:t,justifyContent:r}=this.contentFlexAlign(e),i=`
            background: ${this.resolvedBackground};
            border: ${this.resolvedBorder};
            border-radius: ${this.borderRadius};
        `;return n`
            <style>
                :host {
                    ${i}
                }
                .inner {
                    padding: ${this.padding};
                }
                .groupbox-title {
                    color: ${this.titleColor};
                }
                .groupbox-content {
                    gap: ${this.gap};
                    flex-direction: ${e};
                    align-items: ${t};
                    justify-content: ${r};
                }
            </style>
            <div class="inner">
                ${this.title?n`<div class="groupbox-header">
                          <h2 class="groupbox-title">${this.title}</h2>
                      </div>`:``}
                <div class="groupbox-content" part="content">
                    <slot></slot>
                </div>
            </div>
        `}};S([o({type:String})],Y.prototype,`title`,void 0),S([o({type:String,attribute:`title-color`})],Y.prototype,`titleColor`,void 0),S([o({type:String})],Y.prototype,`background`,void 0),S([o({type:String})],Y.prototype,`border`,void 0),S([o({type:String,attribute:`border-radius`})],Y.prototype,`borderRadius`,void 0),S([o({type:String})],Y.prototype,`padding`,void 0),S([o({type:String})],Y.prototype,`gap`,void 0),S([o({type:String,attribute:`flex-direction`})],Y.prototype,`flexDirection`,void 0),S([o({type:String,reflect:!0,converter:b})],Y.prototype,`theme`,void 0),Y=S([a(`fx-group-box`)],Y);var Cn=class extends J{constructor(...e){super(...e),this.orientation=`vertical`,this.spacing=`0px`,this.width=``,this.height=``}static{this.styles=t`
        :host {
            display: flex;
            box-sizing: border-box;
            width: 100%;
        }
        :host([orientation='horizontal']) {
            width: auto;
        }
        .inner {
            display: flex;
            flex: 1;
            box-sizing: border-box;
            min-width: 0;
            min-height: 0;
        }
        :host([orientation='vertical']) .inner {
            flex-direction: column;
            width: 100%;
        }
        :host([orientation='horizontal']) .inner {
            flex-direction: row;
        }
    `}get flexDirection(){return this.orientation===`horizontal`?`row`:`column`}get extraStyles(){return Object.entries({width:this.width,height:this.height}).filter(([e,t])=>!y(t)&&t!==``).map(([e,t])=>`${e}: ${t};`)}render(){let{alignItems:e,justifyContent:t}=this.contentFlexAlign(this.flexDirection),r=this.padding.trim();return n`
            <style>
                :host {
                    ${this.extraStyles.join(` `)}
                }
                .inner {
                    gap: ${this.spacing};
                    align-items: ${e};
                    justify-content: ${t};
                    ${r?`padding: ${r};`:``}
                }
            </style>
            <div class="inner">
                <slot></slot>
            </div>
        `}};S([o({type:String,reflect:!0})],Cn.prototype,`orientation`,void 0),S([o({type:String})],Cn.prototype,`spacing`,void 0),S([o({type:String})],Cn.prototype,`width`,void 0),S([o({type:String})],Cn.prototype,`height`,void 0),Cn=S([a(`fx-stack-panel`)],Cn);var wn=class extends C{constructor(...e){super(...e),this.orientation=`horizontal`,this.thickness=`thin`,this.mode=`normal`,this.padding=`none`}static{this.styles=[C.styles,t`
            :host {
                display: block;
                flex-shrink: 0;
                background: transparent;
                box-sizing: border-box;
                --fx-separator-bleed: 0.63rem;
            }
            :host([orientation='horizontal']) {
                width: 100%;
                height: auto;
            }
            :host([orientation='vertical']) {
                width: auto;
                height: auto;
                align-self: stretch;
            }
            :host([orientation='horizontal'][padding='small']) .groove {
                padding-block: 0.25rem;
            }
            :host([orientation='horizontal'][padding='medium']) .groove {
                padding-block: 0.5rem;
            }
            :host([orientation='horizontal'][padding='large']) .groove {
                padding-block: 0.75rem;
            }
            :host([orientation='horizontal'][padding='x-large']) .groove {
                padding-block: 1rem;
            }
            :host([orientation='vertical'][padding='small']) .groove {
                padding-inline: 0.25rem;
            }
            :host([orientation='vertical'][padding='medium']) .groove {
                padding-inline: 0.5rem;
            }
            :host([orientation='vertical'][padding='large']) .groove {
                padding-inline: 0.75rem;
            }
            :host([orientation='vertical'][padding='x-large']) .groove {
                padding-inline: 1rem;
            }
            :host([mode='smooth'][orientation='horizontal']) {
                width: calc(100% + 2 * var(--fx-separator-bleed));
                margin-inline: calc(-1 * var(--fx-separator-bleed));
            }
            :host([mode='smooth'][orientation='vertical']) {
                height: calc(100% + 2 * var(--fx-separator-bleed));
                margin-block: calc(-1 * var(--fx-separator-bleed));
                align-self: stretch;
            }

            .groove {
                display: flex;
                width: 100%;
                height: 100%;
            }
            :host([orientation='horizontal']) .groove {
                flex-direction: column;
            }
            :host([orientation='vertical']) .groove {
                flex-direction: row;
                height: 100%;
                min-height: 100%;
                align-self: stretch;
            }
            :host([mode='smooth'][orientation='horizontal']) .groove {
                -webkit-mask-image: linear-gradient(
                    to right,
                    transparent 0%,
                    #000 12%,
                    #000 88%,
                    transparent 100%
                );
                mask-image: linear-gradient(
                    to right,
                    transparent 0%,
                    #000 12%,
                    #000 88%,
                    transparent 100%
                );
            }
            :host([mode='smooth'][orientation='vertical']) .groove {
                -webkit-mask-image: linear-gradient(
                    to bottom,
                    transparent 0%,
                    #000 12%,
                    #000 88%,
                    transparent 100%
                );
                mask-image: linear-gradient(
                    to bottom,
                    transparent 0%,
                    #000 12%,
                    #000 88%,
                    transparent 100%
                );
            }
            .line {
                flex-shrink: 0;
                border: none;
                padding: 0;
                margin: 0;
            }
            .line.highlight {
                background: rgb(255 255 255 / 6.9%);
            }
            .line.shadow {
                background: rgb(0 0 0 / 32%);
            }
            :host([orientation='horizontal']) .line {
                width: 100%;
                height: 1px;
            }
            :host([orientation='vertical']) .line {
                width: 1px;
                height: 100%;
                min-height: 2rem;
                align-self: stretch;
            }
        `]}render(){return n`
            <div class="groove" part="groove" aria-hidden="true">
                ${this.thickness===`thick`?n`<div class="line shadow" part="shadow"></div>`:r}
                <div class="line highlight" part="highlight"></div>
            </div>
        `}};S([o({type:String,reflect:!0})],wn.prototype,`orientation`,void 0),S([o({type:String,reflect:!0})],wn.prototype,`thickness`,void 0),S([o({type:String,reflect:!0})],wn.prototype,`mode`,void 0),S([o({type:String,reflect:!0})],wn.prototype,`padding`,void 0),wn=S([a(`fx-separator`)],wn);var X=class extends J{constructor(...e){super(...e),this.title=``,this.badge=``,this.icon=``,this.accentColor=`#f59e0b`,this.badgeBackground=``,this.background=``,this.borderRadius=`10px`,this.padding=`20px 18px`,this.gap=`12px`,this.accentWidth=`3px`}static{this.styles=[E,t`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
                overflow: hidden;
                --fx-card-background: var(--fx-theme-card-background, #111827);
            }
            :host([theme='silver']) {
                --fx-card-background: #1e293b;
            }
            :host([theme='darkgreen']) {
                --fx-card-background: #131920;
            }
            :host([theme='iron']) {
                --fx-card-background: #111827;
            }
            :host([theme='dark']) {
                --fx-card-background: #080b10;
            }
            :host([theme='darkblue']) {
                --fx-card-background: #0b111f;
            }
            :host([theme='darkergreen']) {
                --fx-card-background: #0c0e12;
            }
            :host([theme='snow']) {
                --fx-card-background: #ffffff;
            }
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 0.75rem;
            }
            .header-start {
                display: flex;
                align-items: center;
                gap: 8px;
                min-width: 0;
            }
            .title {
                font-size: 9px;
                font-weight: 700;
                color: #4a5a6e;
                text-transform: uppercase;
                letter-spacing: 0.14em;
                margin: 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .badge {
                flex-shrink: 0;
                font-size: 8px;
                font-weight: 700;
                padding: 2px 7px;
                border-radius: 3px;
                letter-spacing: 0.06em;
                text-transform: uppercase;
                line-height: 1.3;
            }
            .icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                line-height: 1;
                flex-shrink: 0;
            }
            .icon ::slotted(*) {
                font-size: inherit;
                color: inherit;
            }
            .inner {
                display: flex;
                flex-direction: column;
                flex: 1;
                min-height: 0;
                box-sizing: border-box;
            }
            .content {
                display: flex;
                flex-direction: column;
                flex: 1;
                width: 100%;
                min-height: 0;
                box-sizing: border-box;
            }
        `]}connectedCallback(){super.connectedCallback(),ue(this,this.icon)}updated(e){super.updated(e),e.has(`icon`)&&ue(this,this.icon)}get resolvedBadgeBackground(){return this.badgeBackground?this.badgeBackground:`color-mix(in srgb, ${this.accentColor} 18%, #0a0c10)`}get resolvedBackground(){return this.background.trim()?this.background:`var(--fx-card-background)`}render(){let{alignItems:e,justifyContent:t}=this.contentFlexAlign(`column`),i=`
            background: ${this.resolvedBackground};
            border-radius: ${this.borderRadius};
            border-top: ${this.accentWidth} solid ${this.accentColor};
        `;return n`
            <style>
                :host {
                    ${i}
                }
                .inner {
                    padding: ${this.padding};
                    gap: ${this.gap};
                }
                .content {
                    gap: ${this.gap};
                    align-items: ${e};
                    justify-content: ${t};
                }
                .icon {
                    color: ${this.accentColor};
                }
                .badge {
                    color: ${this.accentColor};
                    background: ${this.resolvedBadgeBackground};
                }
            </style>
            <div class="inner">
                <div class="header" part="header">
                    <div class="header-start">
                        <span class="icon" part="icon">
                            <slot name="icon"></slot>
                        </span>
                        ${this.title?n`<h2 class="title" part="title">${this.title}</h2>`:r}
                    </div>
                    ${this.badge?n`<span class="badge" part="badge">${this.badge}</span>`:r}
                </div>
                <div class="content" part="content">
                    <slot></slot>
                </div>
            </div>
        `}};S([o({type:String})],X.prototype,`title`,void 0),S([o({type:String})],X.prototype,`badge`,void 0),S([o({type:String})],X.prototype,`icon`,void 0),S([o({type:String,attribute:`accent-color`})],X.prototype,`accentColor`,void 0),S([o({type:String,attribute:`badge-background`})],X.prototype,`badgeBackground`,void 0),S([o({type:String})],X.prototype,`background`,void 0),S([o({type:String,attribute:`border-radius`})],X.prototype,`borderRadius`,void 0),S([o({type:String})],X.prototype,`padding`,void 0),S([o({type:String})],X.prototype,`gap`,void 0),S([o({type:String,attribute:`accent-width`})],X.prototype,`accentWidth`,void 0),S([o({type:String,reflect:!0,converter:b})],X.prototype,`theme`,void 0),X=S([a(`fx-card`)],X);var Z=class extends J{constructor(...e){super(...e),this.header=``,this.selectionColor=``,this.badge=``,this.icon=``,this.selected=!1,this.alignX=``,this.alignY=``}static{this.styles=t`
        :host {
            display: none;
            box-sizing: border-box;
        }

        :host([selected]) {
            display: flex;
            flex-direction: column;
        }

        .inner {
            display: flex;
            flex-direction: column;
            flex: 1;
            box-sizing: border-box;
            min-height: 0;
            width: 100%;
        }

        .icon-slot {
            display: none;
        }
    `}get tabsParent(){let e=this.closest(`fx-tabs`);return e instanceof J?e:null}get effectiveAlignX(){switch(this.alignX){case`left`:case`right`:case`stretch`:case`center`:return this.alignX;default:return this.tabsParent?.effectiveAlignX??`center`}}get effectiveAlignY(){switch(this.alignY){case`top`:case`bottom`:case`stretch`:case`center`:return this.alignY;default:return this.tabsParent?.effectiveAlignY??`center`}}get effectivePadding(){return this.padding.trim()?this.padding:this.tabsParent?.effectivePadding??``}connectedCallback(){super.connectedCallback(),ue(this,this.icon)}updated(e){super.updated(e),e.has(`icon`)&&ue(this,this.icon),(e.has(`header`)||e.has(`selectionColor`)||e.has(`badge`)||e.has(`icon`)||e.has(`disabled`))&&this.dispatchEvent(new CustomEvent(`tabupdate`,{bubbles:!0,composed:!0}))}render(){let{alignItems:e,justifyContent:t}=this.contentFlexAlign(`column`),r=this.effectivePadding.trim(),i=r?`padding: ${r};`:``;return n`
            <style>
                .inner {
                    align-items: ${e};
                    justify-content: ${t};
                    ${i}
                }
            </style>
            <div class="icon-slot">
                <slot name="icon"></slot>
            </div>
            <div class="inner">
                <slot></slot>
            </div>
        `}};S([o({type:String})],Z.prototype,`header`,void 0),S([o({type:String,attribute:`selection-color`})],Z.prototype,`selectionColor`,void 0),S([o({type:String})],Z.prototype,`badge`,void 0),S([o({type:String})],Z.prototype,`icon`,void 0),S([o({type:Boolean,reflect:!0})],Z.prototype,`selected`,void 0),S([o({type:String,attribute:`align-x`,reflect:!0})],Z.prototype,`alignX`,void 0),S([o({type:String,attribute:`align-y`,reflect:!0})],Z.prototype,`alignY`,void 0),Z=S([a(`fx-tab`)],Z);function Tn(e){return`icon-${e}`}var En=class extends T(J){constructor(...e){super(...e),this.selectedIndex=0,this.selectionColor=`#f59e0b`,this.tabSignature=``,this.syncingIcons=!1,this.onTabUpdate=()=>{this.refreshTabs()},this.onSlotChange=()=>{this.refreshTabs()}}static{this.styles=[E,t`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
                color: #e2e8f0;
                background: var(--fx-tabs-background, #0c0e12);
            }
            :host([theme='darkgreen']) {
                --fx-tabs-background: #131920;
                --fx-tabs-nav-background: #0c0e12;
                --fx-tabs-nav-border: #2a3a4a;
            }
            :host([theme='iron']) {
                --fx-tabs-background: #111827;
                --fx-tabs-nav-background: #0c0e12;
                --fx-tabs-nav-border: #1f2937;
            }
            :host([theme='darkergreen']) {
                --fx-tabs-background: #0c0e12;
                --fx-tabs-nav-background: #080b10;
                --fx-tabs-nav-border: #2a3a4a;
            }

            .nav {
                position: relative;
                z-index: 1;
                display: flex;
                align-items: flex-end;
                gap: 3px;
                padding: 8px 20px 0;
                background: var(--fx-tabs-nav-background, #080b10);
                border-bottom: 1px solid var(--fx-tabs-nav-border, #2a3a4a);
                box-sizing: border-box;
            }

            .tab {
                position: relative;
                z-index: 0;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                height: 40px;
                margin-bottom: -1px;
                padding: 0 16px;
                border-style: solid;
                border-width: 1px;
                border-color: #1c2530 #1c2530 #0a0d12 #1c2530;
                border-radius: 6px 6px 0 0;
                background: #0a0d12;
                color: #475569;
                outline: none;
                cursor: pointer;
                font-family: inherit;
                font-size: 0.72rem;
                font-weight: 700;
                letter-spacing: 0.09em;
                text-transform: uppercase;
                box-sizing: border-box;
            }

            :host([is-animated]) .tab {
                transition:
                    color 0.18s ease,
                    background-color 0.18s ease,
                    border-color 0.18s ease,
                    border-top-width 0.18s ease;
            }

            .tab[aria-selected='true'] {
                z-index: 2;
                border-width: 3px 1px 1px 1px;
                border-color: var(--fx-tab-color, #f59e0b) #2a3a4a
                    var(--fx-tabs-background, #0c0e12) #2a3a4a;
                background: var(--fx-tabs-background, #0c0e12);
                color: var(--fx-tab-color, #f59e0b);
            }

            .tab:focus-visible {
                box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--fx-tab-color, #f59e0b) 55%, transparent);
            }

            .icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 0.95em;
                line-height: 1;
            }

            .icon ::slotted(*) {
                font-size: inherit;
                color: inherit;
                line-height: 1;
            }

            .badge {
                background: var(--fx-tab-color, #f59e0b);
                color: #fff;
                font-size: 0.6rem;
                font-weight: 800;
                padding: 1px 5px;
                border-radius: 10px;
                line-height: 1.3;
            }

            .panels {
                box-sizing: border-box;
                min-height: 0;
            }

            @keyframes fxTabEnter {
                from {
                    opacity: 0;
                    transform: translateY(6px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            :host([is-animated]) ::slotted(fx-tab[selected]) {
                animation: fxTabEnter 0.22s ease;
            }
        `]}connectedCallback(){super.connectedCallback(),this.addEventListener(`tabupdate`,this.onTabUpdate)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`tabupdate`,this.onTabUpdate)}getAssignedTabs(){let e=this.shadowRoot?.querySelector(`slot.tabs`);return e?e.assignedElements({flatten:!0}).filter(e=>e instanceof Z):[]}refreshTabs(){let e=this.getAssignedTabs();this.syncSelection(e),this.syncTabIcons(e);let t=e.map((e,t)=>{let n=!!this.querySelector(`:scope > [slot="${Tn(t)}"]`);return`${t}:${e.header}:${e.selectionColor}:${e.badge}:${e.icon}:${e.disabled}:${n?`1`:`0`}`}).join(`|`);t!==this.tabSignature&&(this.tabSignature=t)}syncSelection(e){if(e.length>0){let t=this.selectedIndex;t<0?t=0:t>=e.length&&(t=e.length-1),t!==this.selectedIndex&&(this.selectedIndex=t),e.forEach((e,n)=>{let r=n===t&&!e.disabled;e.selected!==r&&(e.selected=r)})}}syncTabIcons(e){if(!this.syncingIcons){this.syncingIcons=!0;try{let t=new Set;e.forEach((e,n)=>{let r=Tn(n),i=String(n);t.add(r);let a=[...e.children].filter(e=>e instanceof HTMLElement&&e.slot===`icon`&&!e.hasAttribute(`data-fx-managed-icon`));if(a.length>0){ie(this,i,``,r);for(let e of a)(e.parentElement!==this||e.slot!==r)&&(e.slot=r,e.parentElement!==this&&this.appendChild(e))}else e.icon.trim()?(this.querySelectorAll(`:scope > [slot="${r}"]:not([${v}])`).forEach(e=>e.remove()),ie(this,i,e.icon,r)):this.querySelector(`:scope > [slot="${r}"]:not([data-fx-managed-icon])`)||ie(this,i,``,r)}),this.querySelectorAll(`:scope > [slot^="icon-"]`).forEach(e=>{let n=e.getAttribute(`slot`);n&&!t.has(n)&&e.remove()})}finally{this.syncingIcons=!1}}}selectTab(e){if(!this.disabled){let t=this.getAssignedTabs(),n=t[e];n&&!n.disabled&&e!==this.selectedIndex&&(this.selectedIndex=e,this.syncSelection(t),this.dispatchEvent(new CustomEvent(`change`,{detail:{index:e,tab:n},bubbles:!0,composed:!0})))}}firstUpdated(){this.refreshTabs()}updated(e){if(super.updated(e),e.has(`selectedIndex`)&&this.syncSelection(this.getAssignedTabs()),e.has(`alignX`)||e.has(`alignY`)||e.has(`padding`))for(let e of this.getAssignedTabs())e.requestUpdate()}resolveTabSelectionColor(e){return e.selectionColor.trim()||this.selectionColor.trim()||`#f59e0b`}renderTabButton(e,t){let i=t===this.selectedIndex&&!e.disabled,a=this.resolveTabSelectionColor(e),o=Tn(t),s=!!this.querySelector(`:scope > [slot="${o}"]`);return n`
            <button
                class="tab"
                type="button"
                role="tab"
                part="tab"
                style="--fx-tab-color: ${a}"
                aria-selected=${i?`true`:`false`}
                ?disabled=${e.disabled}
                @click=${()=>this.selectTab(t)}
            >
                ${s?n`<span class="icon" part="tab-icon"><slot name=${o}></slot></span>`:r}
                <span part="tab-header">${e.header}</span>
                ${e.badge.trim()?n`<span class="badge" part="tab-badge">${e.badge}</span>`:r}
            </button>
        `}render(){let e=this.getAssignedTabs();return n`
            <div class="nav" part="nav" role="tablist">
                ${e.map((e,t)=>this.renderTabButton(e,t))}
            </div>
            <div class="panels" part="panels">
                <slot class="tabs" @slotchange=${this.onSlotChange}></slot>
            </div>
        `}};S([o({type:Number,attribute:`selected-index`,reflect:!0})],En.prototype,`selectedIndex`,void 0),S([o({type:String,attribute:`selection-color`})],En.prototype,`selectionColor`,void 0),S([o({type:String,reflect:!0,converter:b})],En.prototype,`theme`,void 0),S([s()],En.prototype,`tabSignature`,void 0),En=S([a(`fx-tabs`)],En);var Dn={fromAttribute:e=>e?x.parse(e):x.Info,toAttribute:e=>x.toString(e)},On={fromAttribute:e=>e!==`false`,toAttribute:e=>e?null:`false`},Q=class extends C{constructor(...e){super(...e),this.variant=x.Info,this.icon=``,this.hasIcon=!0,this.hasShadow=!1,this.text=``,this.size=`large`,this.dismissible=!1}static{this.styles=[E,t`
            :host {
                display: flex;
                box-sizing: border-box;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
                overflow: visible;
                background: var(--fx-alert-background);
                color: var(--fx-alert-foreground);
                border-radius: 10px;
                border-left: 3px solid var(--fx-alert-border);
                box-shadow: 0 0 2px color-mix(in srgb, var(--fx-alert-border) 55%, transparent);
            }
            .inner {
                display: flex;
                align-items: center;
                box-sizing: border-box;
                width: 100%;
                gap: 14px;
            }
            :host([has-shadow]) {
                box-shadow:
                    0 0 2px color-mix(in srgb, var(--fx-alert-border) 55%, transparent),
                    0 8px 20px rgba(0, 0, 0, 0.5);
            }
            :host([size='small']) {
                font-size: 13px;
                min-height: 40px;
            }
            :host([size='small']) .inner {
                padding: 10px 14px;
                gap: 10px;
            }
            :host([size='medium']) {
                font-size: 15px;
                min-height: 48px;
            }
            :host([size='medium']) .inner {
                padding: 14px 18px;
            }
            :host([size='large']) {
                font-size: 16px;
                min-height: 56px;
                border-left-width: 4px;
            }
            :host([size='large']) .inner {
                padding: 18px 22px;
                gap: 16px;
            }
            .icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                color: var(--fx-alert-border);
                line-height: 1;
            }
            :host([size='small']) .icon {
                font-size: 14px;
            }
            :host([size='medium']) .icon {
                font-size: 18px;
            }
            :host([size='large']) .icon {
                font-size: 22px;
            }
            .icon ::slotted(*) {
                font-size: inherit;
                color: inherit;
            }
            .body {
                min-width: 0;
                flex: 1;
                font-weight: 500;
                letter-spacing: 0.01em;
                line-height: 1.35;
                text-align: start;
                overflow-wrap: break-word;
                white-space: pre-line;
            }
            .close {
                flex-shrink: 0;
                align-self: center;
                margin-inline-start: auto;
                appearance: none;
                border: 0;
                background: transparent;
                color: inherit;
                opacity: 0.65;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                font-size: 1.15em;
            }
            .close:hover {
                opacity: 1;
            }
            :host([size='small']) .close {
                font-size: 14px;
            }
            :host([size='medium']) .close {
                font-size: 16px;
            }
            :host([size='large']) .close {
                font-size: 18px;
            }
        `]}connectedCallback(){super.connectedCallback(),this.applyColors(),this.syncIcon()}updated(e){super.updated(e),e.has(`variant`)&&this.applyColors(),(e.has(`icon`)||e.has(`variant`)||e.has(`hasIcon`))&&this.syncIcon()}onDismiss(e){e.stopPropagation(),this.dispatchEvent(new CustomEvent(`dismiss`,{bubbles:!0,composed:!0}))}resolvedIcon(){return this.icon.trim()||x.toIcon(this.variant)}syncIcon(){ue(this,this.hasIcon?this.resolvedIcon():``)}applyColors(){let e=x.coerce(this.variant)??x.Info,t=x.toColors(e);this.style.setProperty(`--fx-alert-background`,t.background),this.style.setProperty(`--fx-alert-foreground`,t.foreground),this.style.setProperty(`--fx-alert-border`,t.border),this.setAttribute(`role`,e===x.Danger||e===x.Warning?`alert`:`status`)}render(){return n`
            <div class="inner">
                ${this.hasIcon?n`
                        <span class="icon" part="icon">
                            <slot name="icon"></slot>
                        </span>
                    `:r}
                <span class="body" part="body"><slot>${this.text?this.text:r}</slot></span>
                ${this.dismissible?n`
                        <button class="close" part="close" type="button" aria-label="Dismiss" @click=${this.onDismiss}>×</button>
                    `:r}
            </div>
        `}};S([o({reflect:!0,converter:Dn})],Q.prototype,`variant`,void 0),S([o({type:String})],Q.prototype,`icon`,void 0),S([o({attribute:`has-icon`,reflect:!0,converter:On})],Q.prototype,`hasIcon`,void 0),S([o({type:Boolean,attribute:`has-shadow`,reflect:!0})],Q.prototype,`hasShadow`,void 0),S([o({type:String})],Q.prototype,`text`,void 0),S([o({type:String,reflect:!0})],Q.prototype,`size`,void 0),S([o({type:Boolean,reflect:!0})],Q.prototype,`dismissible`,void 0),Q=S([a(`fx-alert`)],Q);var $,kn=[`top-start`,`top-center`,`top-end`,`bottom-start`,`bottom-center`,`bottom-end`],An={placement:`top-center`,duration:4e3,margin:16,variant:x.Info,icon:``,hasIcon:!0,hasShadow:!0,size:`large`},jn={fromAttribute:e=>kn.includes(e)?e:`top-center`,toAttribute:e=>e},Mn=class e{constructor(e){this.config=e}setup(t){return new e({...this.config,...t})}show(e,t={}){let n=Nn.ensure(t.placement??this.config.placement);return n.margin=this.config.margin,n.show({text:e,variant:t.variant??this.config.variant,icon:t.icon??this.config.icon,hasIcon:t.hasIcon??this.config.hasIcon,hasShadow:t.hasShadow??this.config.hasShadow,size:t.size??this.config.size,duration:t.duration??this.config.duration})}primary(e,t={}){return this.show(e,{...t,variant:x.Primary})}secondary(e,t={}){return this.show(e,{...t,variant:x.Secondary})}success(e,t={}){return this.show(e,{...t,variant:x.Success})}danger(e,t={}){return this.show(e,{...t,variant:x.Danger})}warning(e,t={}){return this.show(e,{...t,variant:x.Warning})}info(e,t={}){return this.show(e,{...t,variant:x.Info})}light(e,t={}){return this.show(e,{...t,variant:x.Light})}dark(e,t={}){return this.show(e,{...t,variant:x.Dark})}},Nn=class extends C{static{$=this}constructor(...e){super(...e),this.placement=An.placement,this.duration=An.duration,this.margin=An.margin,this.timers=new Map}static{this.styles=[E,t`
            :host {
                position: fixed;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 12px;
                width: min(420px, calc(100vw - (2 * var(--fx-toaster-margin, 16px))));
                pointer-events: none;
                box-sizing: border-box;
                --fx-toaster-margin: 16px;
            }
            :host([placement='top-start']) {
                top: var(--fx-toaster-margin);
                left: var(--fx-toaster-margin);
            }
            :host([placement='top-center']) {
                top: var(--fx-toaster-margin);
                left: 50%;
                transform: translateX(-50%);
            }
            :host([placement='top-end']) {
                top: var(--fx-toaster-margin);
                right: var(--fx-toaster-margin);
            }
            :host([placement='bottom-start']) {
                bottom: var(--fx-toaster-margin);
                left: var(--fx-toaster-margin);
            }
            :host([placement='bottom-center']) {
                bottom: var(--fx-toaster-margin);
                left: 50%;
                transform: translateX(-50%);
            }
            :host([placement='bottom-end']) {
                bottom: var(--fx-toaster-margin);
                right: var(--fx-toaster-margin);
            }
            ::slotted(.toast) {
                pointer-events: auto;
                width: 100%;
                cursor: pointer;
            }
        `]}disconnectedCallback(){super.disconnectedCallback();for(let e of this.timers.values())window.clearTimeout(e);this.timers.clear()}connectedCallback(){super.connectedCallback(),this.applyMargin()}updated(e){super.updated(e),e.has(`margin`)&&this.applyMargin()}applyMargin(){this.style.setProperty(`--fx-toaster-margin`,St.normalizeLength(this.margin))}static setup(e={}){return new Mn({...An,...e})}static ensure(e=An.placement){return Array.from(document.querySelectorAll(`fx-toaster`)).find(t=>t instanceof $&&t.placement===e)||document.body.appendChild(m.fxToaster({placement:e}))}static show(e,t={}){return $.setup().show(e,t)}static primary(e,t={}){return $.setup().primary(e,t)}static secondary(e,t={}){return $.setup().secondary(e,t)}static success(e,t={}){return $.setup().success(e,t)}static danger(e,t={}){return $.setup().danger(e,t)}static warning(e,t={}){return $.setup().warning(e,t)}static info(e,t={}){return $.setup().info(e,t)}static light(e,t={}){return $.setup().light(e,t)}static dark(e,t={}){return $.setup().dark(e,t)}show(e){let t=Qe.newGuid(),n=e.duration??this.duration,r=this.appendChild(m.fxAlert({className:`toast`,"data-toast-id":t,icon:e.icon??``,text:e.text,size:e.size??`large`}));if(r.variant=e.variant??x.Info,r.hasIcon=e.hasIcon??!0,r.hasShadow=e.hasShadow??!0,n>0?r.addEventListener(`click`,()=>this.dismiss(t)):(r.dismissible=!0,r.addEventListener(`dismiss`,()=>this.dismiss(t))),r.animate([{opacity:0,transform:`translateY(-8px)`},{opacity:1,transform:`none`}],{duration:180,easing:`ease`}),n>0){let e=window.setTimeout(()=>this.dismiss(t),n);this.timers.set(t,e)}return t}dismiss(e){let t=this.timers.get(e);t!==void 0&&(window.clearTimeout(t),this.timers.delete(e)),this.querySelector(`[data-toast-id="${e}"]`)?.remove()}render(){return n`<slot></slot>`}};S([o({reflect:!0,converter:jn})],Nn.prototype,`placement`,void 0),S([o({type:Number})],Nn.prototype,`duration`,void 0),S([o()],Nn.prototype,`margin`,void 0),Nn=$=S([a(`fx-toaster`)],Nn);var Pn=`salsafx-css`;typeof document<`u`&&!document.getElementById(Pn)&&document.head.appendChild(u.style({id:Pn,textContent:c}));export{Ze as DisplayFonts,Xe as Fonts,Ht as Fx,Q as FxAlert,X as FxCard,q as FxDisplay,K as FxDisplayRegion,nn as FxFader,$t as FxGaugeNeedle,an as FxGaugeNeedleTriangle,Kt as FxGaugeRegion,Y as FxGroupBox,dn as FxIcon,on as FxKnob,U as FxLedIndicator,rn as FxLinearBar,N as FxLinearGauge,A as FxLinearScale,sn as FxMetalicKnob,F as FxPotentiometer,I as FxPushButton,k as FxRadialGauge,O as FxRadialScale,P as FxRadialSimpleScale,H as FxRadialSwitch,z as FxRotarySelector,L as FxRotarySelectorSector,G as FxSemaphore,W as FxSemaphoreState,wn as FxSeparator,Cn as FxStackPanel,V as FxSwitch,B as FxSwitchState,Z as FxTab,En as FxTabs,Nn as FxToaster,Mn as FxToasterApi,pt as IconPacks,jt as SwatchColor,Mt as SwatchColors,bt as Themes,en as ValueDisplay,x as Variant,qt as collectGaugeRegions,At as customDisplaySizeVars,Dt as displaySizeTokens,Ct as ensureDisplayTypography,nt as hashOrSlug,kt as normalizeCustomSizeLength,Et as reflectNonDefaultAlign,Tt as reflectNonDefaultContentLayout,wt as reflectNonDefaultTypography,Rt as resolveSwatchColor,Lt as swatchColorAt,E as themeVariables};