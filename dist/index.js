import { LitElement as e, css as t, html as n, nothing as r, svg as i } from "lit";
import { customElement as a, property as o, state as s } from "lit/decorators.js";
//#region src/stories/base/FxElement.ts
var c = class extends e {};
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/decorate.js
function l(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/stories/base/FxMeasureElement.ts
var u = class extends c {
	constructor(...e) {
		super(...e), this.value = 0, this.min = 0, this.max = 100, this.label = "", this.unit = "", this.showValue = !0;
	}
	get progress() {
		let { min: e, max: t, value: n } = this, r = t - e;
		return r === 0 ? 0 : (Math.min(Math.max(n, e), t) - e) / r;
	}
};
l([o({ type: Number })], u.prototype, "value", void 0), l([o({ type: Number })], u.prototype, "min", void 0), l([o({ type: Number })], u.prototype, "max", void 0), l([o({ type: String })], u.prototype, "label", void 0), l([o({ type: String })], u.prototype, "unit", void 0), l([o({
	type: Boolean,
	attribute: "show-value",
	reflect: !0
})], u.prototype, "showValue", void 0);
//#endregion
//#region src/stories/base/Animatable.ts
var d = (e) => {
	class t extends e {
		constructor(...e) {
			super(...e), this.isAnimated = !0;
		}
	}
	return l([o({
		type: Boolean,
		attribute: "is-animated",
		reflect: !0
	})], t.prototype, "isAnimated", void 0), t;
};
function f(e) {
	return !!e && typeof e.isAnimated == "boolean";
}
//#endregion
//#region src/stories/base/GlassOverlay.ts
var p = (e) => {
	class t extends e {
		constructor(...e) {
			super(...e), this.hasGlassOverlay = !1;
		}
	}
	return l([o({
		type: Boolean,
		attribute: "has-glass-overlay",
		reflect: !0
	})], t.prototype, "hasGlassOverlay", void 0), t;
}, m = t`
    :host {
        --fx-gauge-size: 280px;
        --fx-gauge-stroke-width: 12px;

        --fx-gauge-track-color: #1f2937;

        --fx-gauge-fill-color: url(#fx-gauge-default-gradient);
        --fx-gauge-gradient-start: #06b6d4;
        --fx-gauge-gradient-middle: #3b82f6;
        --fx-gauge-gradient-end: #8b5cf6;

        --fx-gauge-needle-color: url(#fx-needle-default-gradient);
        --fx-gauge-needle-gradient-start: #f97316;
        --fx-gauge-needle-gradient-end: #ef4444;

        --fx-gauge-text-primary: #cbd5e1;
        --fx-gauge-text-secondary: #94a3b8;
        --fx-gauge-value-font-weight: 400;
        --fx-gauge-unit-font-weight: 400;
        --fx-gauge-label-font-weight: 400;

        --fx-font-family: 'Inter', system-ui, -apple-system, sans-serif;

        --fx-linear-gauge-width: 140px;
        --fx-linear-gauge-track-color: #1f2937;
        --fx-linear-gauge-gradient-start: #3b82f6;
        --fx-linear-gauge-gradient-middle: #f59e0b;
        --fx-linear-gauge-gradient-end: #ef4444;

        --fx-fader-track-color: #334155;
        --fx-potentiometer-track-color: #1f2937;
    }
`, h = class extends u {
	constructor(...e) {
		super(...e), this.startAngle = -135, this.arcLength = 270, this.displayAngle = this.startAngle, this.hasDisplayAngle = !1;
	}
	willUpdate(e) {
		super.willUpdate(e);
		let t = this.startAngle + this.progress * this.arcLength;
		if (!this.hasDisplayAngle) {
			this.displayAngle = t, this.hasDisplayAngle = !0;
			return;
		}
		let n = ((t - this.displayAngle + 180) % 360 + 360) % 360 - 180;
		this.displayAngle += n;
	}
};
l([o({
	type: Number,
	attribute: "start-angle"
})], h.prototype, "startAngle", void 0), l([o({
	type: Number,
	attribute: "arc-length"
})], h.prototype, "arcLength", void 0), l([s()], h.prototype, "displayAngle", void 0);
//#endregion
//#region src/stories/measure/FxGaugeNeedle.ts
var g = class extends h {
	constructor(...e) {
		super(...e), this.thickness = 2;
	}
	static {
		this.styles = t`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    `;
	}
	render() {
		let { displayAngle: e, thickness: t } = this, r = 12.5;
		return n`
            <svg viewBox="-4 -4 108 108">
                <defs>
                    <linearGradient 
                        id="fx-needle-default-gradient" 
                        x1="0" y1="${50}" 
                        x2="0" y2="${r}" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stop-color="var(--fx-gauge-needle-gradient-start, #ef4444)" />
                        <stop offset="100%" stop-color="var(--fx-gauge-needle-gradient-end, #f97316)" />
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
        `;
	}
};
l([o({ type: Number })], g.prototype, "thickness", void 0), g = l([a("fx-gauge-needle")], g);
//#endregion
//#region src/stories/base/Core.ts
var _ = (e) => e == null, ee = (() => {
	let e = () => Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
	return Object.freeze({
		newGuid: typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID.bind(crypto) : () => `${e()}${e()}-${e()}-${e()}-${e()}-${e()}${e()}${e()}`.toLowerCase(),
		isGuid: (e) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)
	});
})();
function te(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
function v(e, t) {
	return e === "horizontal" ? t === "end" : t === "start";
}
function ne(e, t, n, r = 0) {
	let i = v(e, t), a = r, o = n - r;
	return e === "horizontal" ? {
		startOffset: i ? o : a,
		endOffset: i ? a : o
	} : {
		startOffset: i ? a : o,
		endOffset: i ? o : a
	};
}
function re(e, t, n) {
	let r = e.shadowRoot?.querySelector(`slot[name="${t}"]`);
	if (r) {
		let e = r.assignedElements();
		if (e.length > 0) {
			let t = e[0];
			if (!_(t.valueOrigin)) return t.valueOrigin;
		}
	}
	return n;
}
var ie = "data-fx-managed-icon";
function y(e) {
	return `icon-${e}`;
}
function ae(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function oe(e, t) {
	return t === void 0 ? `:scope > [${e}]` : `:scope > [${e}="${ae(t)}"]`;
}
function se(e, t) {
	return e.querySelector(oe(ie, t));
}
function ce(e, t, n) {
	let r = n?.trim(), i = se(e, t);
	if (!r) {
		i?.remove();
		return;
	}
	if (i) {
		let e = y(t);
		i.slot !== e && (i.slot = e), i.className !== r && (i.className = r);
		return;
	}
	let a = document.createElement("i");
	a.setAttribute(ie, t), a.setAttribute("aria-hidden", "true"), a.slot = y(t), a.className = r, e.appendChild(a);
}
function le(e, t) {
	e.querySelectorAll(oe(ie)).forEach((e) => {
		let n = e.getAttribute(ie);
		(!n || !t.has(n)) && e.remove();
	});
}
function ue(e, t) {
	let n = new Set(t.map((e) => e.id));
	for (let n of t) ce(e, n.id, n.icon);
	le(e, n);
}
function de(e, t) {
	let n = y(t.value), r = [...t.children].filter((e) => e instanceof HTMLElement && e.slot === "icon");
	if (r.length > 0) {
		se(e, t.value)?.remove();
		for (let t of r) t.parentElement === e && t.slot === n || (t.slot = n, t.parentElement !== e && e.appendChild(t));
		return;
	}
	if (t.icon?.trim()) {
		ce(e, t.value, t.icon);
		return;
	}
	e.querySelector(`${oe("slot", n)}:not([data-fx-managed-icon])`) || se(e, t.value)?.remove();
}
function fe(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r of t) r.value && (n.add(r.value), de(e, r));
	le(e, n);
}
function pe(e, t) {
	let { arrayStates: n, stateElements: r, fallbackStates: i } = t;
	if (n.length > 0) return ue(e, n);
	if (r.length > 0) return fe(e, r);
	ue(e, i);
}
function me(e, t) {
	return !!e.querySelector(oe("slot", y(t)));
}
function he(e, t) {
	return e === t ? !0 : e.length === t.length ? e.every((e, n) => {
		let r = t[n];
		return e.id === r.id && e.label === r.label && e.icon === r.icon && e.color === r.color && e.backgroundColor === r.backgroundColor;
	}) : !1;
}
//#endregion
//#region src/stories/measure/FxMeasureValueDisplay.ts
var b = class extends u {
	constructor(...e) {
		super(...e), this.offsetX = "0", this.offsetY = "0", this.align = "center";
	}
	formatOffset(e) {
		if (_(e)) return "0px";
		let t = String(e).trim();
		return t === "" ? "0px" : /^-?\d+(\.\d+)?$/.test(t) ? `${t}%` : t;
	}
	static {
		this.styles = t`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: var(--fx-font-family, sans-serif);
            pointer-events: none;
            user-select: none;
            margin-top: var(--fx-measure-value-display-margin-top, 0);
            transform: translate(
                var(--fx-measure-value-display-offset-x, var(--display-offset-x-prop, 0px)), 
                var(--fx-measure-value-display-offset-y, var(--display-offset-y-prop, 0px))
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
    `;
	}
	render() {
		return n`
            <style>
                :host {
                    --display-offset-x-prop: ${this.formatOffset(this.offsetX)};
                    --display-offset-y-prop: ${this.formatOffset(this.offsetY)};
                }
            </style>
            <span class="value">${this.value}</span>
            ${this.unit ? n`<span class="unit">${this.unit}</span>` : ""}
            ${this.label ? n`<span class="label">${this.label}</span>` : ""}
        `;
	}
};
l([o({ attribute: "offset-x" })], b.prototype, "offsetX", void 0), l([o({ attribute: "offset-y" })], b.prototype, "offsetY", void 0), l([o({
	type: String,
	reflect: !0
})], b.prototype, "align", void 0), b = l([a("fx-measure-value-display")], b);
//#endregion
//#region src/stories/base/FxScaleElement.ts
var x = class extends c {
	constructor(...e) {
		super(...e), this.min = 0, this.max = 100, this.count = 10, this.showLabels = !0, this.replacements = {}, this.valueOrigin = "end";
	}
	resolveLabel(e) {
		let t = Math.round(e);
		return t in this.replacements ? this.replacements[t] : t;
	}
};
l([o({ type: Number })], x.prototype, "min", void 0), l([o({ type: Number })], x.prototype, "max", void 0), l([o({ type: Number })], x.prototype, "count", void 0), l([o({
	type: Boolean,
	attribute: "show-labels"
})], x.prototype, "showLabels", void 0), l([o({ type: Object })], x.prototype, "replacements", void 0), l([o({
	type: String,
	attribute: "value-origin",
	reflect: !0
})], x.prototype, "valueOrigin", void 0);
//#endregion
//#region src/stories/base/FxRadialScaleElement.ts
var S = class extends x {
	constructor(...e) {
		super(...e), this.startAngle = -135, this.arcLength = 270;
	}
	static {
		this.styles = t`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    `;
	}
	get isFullCircle() {
		return Math.abs(this.arcLength) >= 360;
	}
};
l([o({
	type: Number,
	attribute: "start-angle"
})], S.prototype, "startAngle", void 0), l([o({
	type: Number,
	attribute: "arc-length"
})], S.prototype, "arcLength", void 0);
//#endregion
//#region src/stories/measure/FxRadialScale.ts
var C = class extends S {
	constructor(...e) {
		super(...e), this.subDivisions = 5, this.outerRadius = 39.5, this.majorInnerRadius = 32.5, this.minorInnerRadius = 36, this.textRadius = 28, this.labelFontSize = 4;
	}
	*renderTicks() {
		let { count: e, startAngle: t, arcLength: n, min: r, max: a, subDivisions: o, showLabels: s, isFullCircle: c, outerRadius: l, majorInnerRadius: u, minorInnerRadius: d, textRadius: f, labelFontSize: p } = this, m = e * o, h = c ? m - 1 : m;
		for (let c = 0; c <= h; c++) {
			let h = c % o === 0, g = (t + c / m * n) * Math.PI / 180, _ = h ? u : d;
			if (yield i`
                <line
                    x1="${50 + l * Math.sin(g)}" y1="${50 - l * Math.cos(g)}"
                    x2="${50 + _ * Math.sin(g)}" y2="${50 - _ * Math.cos(g)}"
                    stroke="${h ? "var(--fx-radial-scale-color, #94a3b8)" : "var(--fx-radial-scale-label-color, #cbd5e1)"}"
                    stroke-width="${h ? "1" : "0.55"}"
                    stroke-linecap="round"
                />
            `, h && s) {
				let t = c / o, n = a - r, s = r + t / e * n;
				yield i`
                    <text
                        x="${50 + f * Math.sin(g)}"
                        y="${50 - f * Math.cos(g)}"
                        fill="var(--fx-radial-scale-label-color, #cbd5e1)"
                        font-size="${p}"
                        font-family="var(--fx-font-family, sans-serif)"
                        font-weight="600"
                        text-anchor="middle"
                        dominant-baseline="central"
                    >
                        ${this.resolveLabel(s)}
                    </text>
                `;
			}
		}
	}
	render() {
		return n`
            <svg viewBox="-4 -4 108 108">
                ${this.renderTicks()}
            </svg>
        `;
	}
};
l([o({
	type: Number,
	attribute: "sub-divisions"
})], C.prototype, "subDivisions", void 0), l([o({
	type: Number,
	attribute: "outer-radius"
})], C.prototype, "outerRadius", void 0), l([o({
	type: Number,
	attribute: "major-inner-radius"
})], C.prototype, "majorInnerRadius", void 0), l([o({
	type: Number,
	attribute: "minor-inner-radius"
})], C.prototype, "minorInnerRadius", void 0), l([o({
	type: Number,
	attribute: "text-radius"
})], C.prototype, "textRadius", void 0), l([o({
	type: Number,
	attribute: "label-font-size"
})], C.prototype, "labelFontSize", void 0), C = l([a("fx-radial-scale")], C);
//#endregion
//#region src/stories/measure/FxRadialGauge.ts
var w = class extends d(p(u)) {
	constructor(...e) {
		super(...e), this.hasGlassOverlay = !0, this.startAngle = -135, this.arcLength = 270, this.showLabels = !0, this.showTrack = !0;
	}
	static {
		this.styles = [m, t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                width: var(--fx-gauge-size, 340px);
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
            svg.glass {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            .overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }
            .overlay ::slotted([slot="needle"]) {
                position: absolute;
                inset: 0;
            }
            .center {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .center fx-measure-value-display,
            .center ::slotted(fx-measure-value-display),
            .center ::slotted([slot="display"]) {
                --fx-measure-value-display-margin-top: 40%;
            }
        `];
	}
	describeArc(e, t, n, r, i) {
		let a = (e) => e * Math.PI / 180, o = (r) => ({
			x: e + n * Math.sin(a(r)),
			y: t - n * Math.cos(a(r))
		}), s = i - r;
		if (s >= 360) {
			let e = o(r), t = o(r + 180), i = o(r + 360);
			return `M ${e.x} ${e.y} A ${n} ${n} 0 1 1 ${t.x} ${t.y} A ${n} ${n} 0 1 1 ${i.x} ${i.y}`;
		}
		let c = o(r), l = o(i), u = +(s > 180);
		return `M ${c.x} ${c.y} A ${n} ${n} 0 ${u} 1 ${l.x} ${l.y}`;
	}
	render() {
		let { startAngle: e, arcLength: t, progress: a } = this, o = e + t, s = this.describeArc(50, 50, 45, e, o), c = 2 * Math.PI * 45 * (t / 360), l = c * (1 - a), u = this.showTrack ? 48 : 45;
		return n`
            <div class="gauge-wrap">
                <svg class="track" viewBox="-4 -4 108 108">
                    <defs>
                        <linearGradient id="fx-gauge-default-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="var(--fx-gauge-gradient-start, #3b82f6)" />
                            <stop offset="50%" stop-color="var(--fx-gauge-gradient-middle, #6366f1)" />
                            <stop offset="100%" stop-color="var(--fx-gauge-gradient-end, #8b5cf6)" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="${50}"
                        cy="${50}"
                        r="${u}"
                        fill="var(--fx-gauge-shell-fill, transparent)"
                    />
                    ${this.showTrack ? i`
                    <path
                        d="${s}"
                        fill="none"
                        stroke="var(--fx-gauge-track-color, #e5e7eb)"
                        stroke-width="${4}"
                        stroke-linecap="round"
                    />
                    <path
                        d="${s}"
                        fill="none"
                        stroke="var(--fx-gauge-fill-color, url(#fx-gauge-default-gradient))"
                        stroke-width="${4}"
                        stroke-linecap="round"
                        stroke-dasharray="${c}"
                        stroke-dashoffset="${l}"
                        style="transition: var(--fx-gauge-transition, none);"
                    />
                    ` : r}
                </svg>
                <div class="overlay">
                    <slot name="scale">
                        <fx-radial-scale
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .count=${10}
                            .startAngle=${this.startAngle}
                            .arcLength=${this.arcLength}
                            .showLabels=${this.showLabels}
                        ></fx-radial-scale>
                    </slot>
                </div>

                <div class="overlay">
                    <slot name="needle">
                        <fx-gauge-needle
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .startAngle=${this.startAngle}
                            .arcLength=${this.arcLength}
                        ></fx-gauge-needle>
                    </slot>
                </div>

                ${this.showValue ? n`
                <div class="center">
                    <slot name="display" @slotchange="${this.updateSlottedDisplay}">
                        <fx-measure-value-display
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .unit=${this.unit}
                            .label=${this.label}
                        ></fx-measure-value-display>
                    </slot>
                </div>
                ` : ""}
                ${this.hasGlassOverlay ? n`
                <svg class="glass" viewBox="-4 -4 108 108">
                    <defs>
                        <clipPath id="fx-gauge-glass-clip">
                            <circle cx="50" cy="50" r="${u}" />
                        </clipPath>
                        <linearGradient id="fx-gauge-glass-rim-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="var(--fx-glass-color, #ffffff)" stop-opacity="0.35" />
                            <stop offset="45%" stop-color="var(--fx-glass-color, #ffffff)" stop-opacity="0.05" />
                            <stop offset="100%" stop-color="var(--fx-glass-color, #ffffff)" stop-opacity="0.12" />
                        </linearGradient>
                    </defs>
                    <g clip-path="url(#fx-gauge-glass-clip)">
                        <ellipse cx="32" cy="20" rx="62" ry="28" fill="var(--fx-glass-color, #ffffff)" opacity="var(--fx-glass-opacity, 0.14)" transform="rotate(-12 32 20)" />
                        <ellipse cx="26" cy="10" rx="30" ry="10" fill="var(--fx-glass-color, #ffffff)" opacity="var(--fx-glass-highlight-opacity, 0.2)" transform="rotate(-12 26 10)" />
                    </g>
                    <circle cx="50" cy="50" r="${u - .5}" fill="none" stroke="url(#fx-gauge-glass-rim-gradient)" stroke-width="1.4" />
                </svg>` : ""}
            </div>
        `;
	}
	updated(e) {
		super.updated(e), (e.has("value") || e.has("min") || e.has("max") || e.has("unit") || e.has("label")) && this.updateSlottedDisplay();
	}
	updateSlottedDisplay() {
		let e = this.shadowRoot?.querySelector("slot[name=\"display\"]");
		if (e) {
			let t = e.assignedElements()[0];
			t && ("value" in t && (t.value = this.value), "min" in t && (t.min = this.min), "max" in t && (t.max = this.max), "unit" in t && (t.unit = this.unit), "label" in t && (t.label = this.label));
		}
	}
};
l([o({
	type: Boolean,
	attribute: "has-glass-overlay",
	reflect: !0
})], w.prototype, "hasGlassOverlay", void 0), l([o({
	type: Number,
	attribute: "start-angle"
})], w.prototype, "startAngle", void 0), l([o({
	type: Number,
	attribute: "arc-length"
})], w.prototype, "arcLength", void 0), l([o({
	type: Boolean,
	attribute: "show-labels",
	reflect: !0
})], w.prototype, "showLabels", void 0), l([o({
	type: Boolean,
	attribute: "show-track",
	reflect: !0
})], w.prototype, "showTrack", void 0), w = l([a("fx-radial-gauge")], w);
//#endregion
//#region src/stories/measure/FxFaderThumb.ts
var T = class extends d(c) {
	constructor(...e) {
		super(...e), this.value = 0, this.progress = 0, this.isDragging = !1, this.orientation = "horizontal";
	}
	static {
		this.styles = [m, t`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
            .thumb-inner {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: radial-gradient(circle at 35% 30%, #ffffff 0%, #f3f4f6 30%, #d1d5db 70%, #9ca3af 100%);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1), inset 0 1px 0 #ffffff;
                box-sizing: border-box;
                border: 1px solid #9ca3af;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .dot {
                width: 6px;
                height: 6px;
                background-color: var(--fx-fader-theme-color, #3b82f6);
                border-radius: 50%;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2);
            }
            :host([is-dragging]) .thumb-inner {
                border-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-animated]) .thumb-inner {
                transition: border-color 0.15s ease, transform 0.15s ease;
            }
        `];
	}
	render() {
		return n`
            <div class="thumb-inner">
                <div class="dot"></div>
            </div>
        `;
	}
};
l([o({
	type: Number,
	reflect: !0
})], T.prototype, "value", void 0), l([o({
	type: Number,
	reflect: !0
})], T.prototype, "progress", void 0), l([o({
	type: Boolean,
	attribute: "is-dragging",
	reflect: !0
})], T.prototype, "isDragging", void 0), l([o({
	type: String,
	reflect: !0
})], T.prototype, "orientation", void 0), T = l([a("fx-fader-thumb")], T);
//#endregion
//#region src/stories/measure/FxFaderThumbConsole.ts
var E = class extends d(c) {
	constructor(...e) {
		super(...e), this.value = 0, this.progress = 0, this.isDragging = !1, this.orientation = "vertical", this.theme = "light";
	}
	static {
		this.styles = [m, t`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }

            .console-cap {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border-radius: 4px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.15s ease, box-shadow 0.15s ease;
            }

            :host([orientation="vertical"][theme="light"]) .console-cap,
            :host([orientation="vertical"]:not([theme])) .console-cap {
                background: linear-gradient(
                    to bottom,
                    #f1f5f9 0%,
                    #e2e8f0 10%,
                    #cbd5e1 35%,
                    #94a3b8 48%,
                    #475569 50%,
                    #64748b 52%,
                    #cbd5e1 65%,
                    #e2e8f0 90%,
                    #f8fafc 100%
                );
                box-shadow: 
                    0 4px 10px rgba(0, 0, 0, 0.3),
                    0 1px 3px rgba(0, 0, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8),
                    inset 0 -1px 1px rgba(0, 0, 0, 0.2);
                border: 1px solid #94a3b8;
            }

            :host([orientation="horizontal"][theme="light"]) .console-cap,
            :host([orientation="horizontal"]:not([theme])) .console-cap {
                background: linear-gradient(
                    to right,
                    #f1f5f9 0%,
                    #e2e8f0 10%,
                    #cbd5e1 35%,
                    #94a3b8 48%,
                    #475569 50%,
                    #64748b 52%,
                    #cbd5e1 65%,
                    #e2e8f0 90%,
                    #f8fafc 100%
                );
                box-shadow: 
                    0 4px 10px rgba(0, 0, 0, 0.3),
                    0 1px 3px rgba(0, 0, 0, 0.15),
                    inset 1px 0 0 rgba(255, 255, 255, 0.8),
                    inset -1px 0 1px rgba(0, 0, 0, 0.2);
                border: 1px solid #94a3b8;
            }

            :host([orientation="vertical"][theme="dark"]) .console-cap {
                background: linear-gradient(
                    to bottom,
                    #2a2a2a 0%,
                    #1e1e1e 10%,
                    #121212 35%,
                    #0a0a0a 48%,
                    #000000 50%,
                    #0a0a0a 52%,
                    #121212 65%,
                    #1e1e1e 90%,
                    #2a2a2a 100%
                );
                box-shadow: 
                    0 4px 10px rgba(0, 0, 0, 0.7),
                    0 1px 3px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.08),
                    inset 0 -1px 1px rgba(0, 0, 0, 0.8);
                border: 1px solid #0a0a0a;
            }

            :host([orientation="horizontal"][theme="dark"]) .console-cap {
                background: linear-gradient(
                    to right,
                    #2a2a2a 0%,
                    #1e1e1e 10%,
                    #121212 35%,
                    #0a0a0a 48%,
                    #000000 50%,
                    #0a0a0a 52%,
                    #121212 65%,
                    #1e1e1e 90%,
                    #2a2a2a 100%
                );
                box-shadow: 
                    0 4px 10px rgba(0, 0, 0, 0.7),
                    0 1px 3px rgba(0, 0, 0, 0.5),
                    inset 1px 0 0 rgba(255, 255, 255, 0.08),
                    inset -1px 0 1px rgba(0, 0, 0, 0.8);
                border: 1px solid #0a0a0a;
            }

            .metallic-sheen {
                position: absolute;
                inset: 0;
                border-radius: 3px;
                pointer-events: none;
            }

            :host([orientation="vertical"]) .metallic-sheen {
                background: linear-gradient(
                    to right,
                    rgba(0, 0, 0, 0.15) 0%,
                    rgba(255, 255, 255, 0.4) 4%,
                    rgba(255, 255, 255, 0.0) 25%,
                    rgba(0, 0, 0, 0.0) 50%,
                    rgba(0, 0, 0, 0.0) 75%,
                    rgba(255, 255, 255, 0.2) 96%,
                    rgba(0, 0, 0, 0.25) 100%
                );
            }

            :host([orientation="horizontal"]) .metallic-sheen {
                background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.15) 0%,
                    rgba(255, 255, 255, 0.4) 4%,
                    rgba(255, 255, 255, 0.0) 25%,
                    rgba(0, 0, 0, 0.0) 50%,
                    rgba(0, 0, 0, 0.0) 75%,
                    rgba(255, 255, 255, 0.2) 96%,
                    rgba(0, 0, 0, 0.25) 100%
                );
            }

            .grooves {
                position: absolute;
                display: flex;
                pointer-events: none;
            }

            :host([orientation="vertical"]) .grooves {
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                flex-direction: column;
                justify-content: space-evenly;
                padding: 4px 0;
                box-sizing: border-box;
            }

            :host([orientation="horizontal"]) .grooves {
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                flex-direction: row;
                justify-content: space-evenly;
                padding: 0 4px;
                box-sizing: border-box;
            }

            .groove {
                background: rgba(0, 0, 0, 0.25);
                border-bottom: 1px solid rgba(255, 255, 255, 0.4);
            }

            :host([orientation="vertical"]) .groove {
                width: 100%;
                height: 1px;
            }

            :host([orientation="horizontal"]) .groove {
                height: 100%;
                width: 1px;
            }

            :host([theme="light"]) .center-line,
            :host(:not([theme])) .center-line {
                position: absolute;
                z-index: 5;
                background: #020617;
                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
            }

            :host([theme="dark"]) .center-line {
                position: absolute;
                z-index: 5;
                background: #000000;
                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.15);
            }

            :host([orientation="vertical"]) .center-line {
                width: 100%;
                height: 2px;
                top: 50%;
                transform: translateY(-50%);
            }

            :host([orientation="horizontal"]) .center-line {
                width: 2px;
                height: 100%;
                left: 50%;
                transform: translateX(-50%);
            }

            :host([is-dragging]) .console-cap {
                transform: scale(0.97);
                box-shadow: 
                    0 2px 6px rgba(0, 0, 0, 0.4),
                    inset 0 1px 1px rgba(255, 255, 255, 0.4);
            }
        `];
	}
	render() {
		return n`
            <div class="console-cap">
                <div class="metallic-sheen"></div>
                <div class="grooves">
                    <div class="groove"></div>
                    <div class="groove"></div>
                    <div class="groove"></div>
                    <div class="groove"></div>
                </div>
                <div class="center-line"></div>
            </div>
        `;
	}
};
l([o({
	type: Number,
	reflect: !0
})], E.prototype, "value", void 0), l([o({
	type: Number,
	reflect: !0
})], E.prototype, "progress", void 0), l([o({
	type: Boolean,
	attribute: "is-dragging",
	reflect: !0
})], E.prototype, "isDragging", void 0), l([o({
	type: String,
	reflect: !0
})], E.prototype, "orientation", void 0), l([o({
	type: String,
	reflect: !0
})], E.prototype, "theme", void 0), E = l([a("fx-fader-thumb-console")], E);
//#endregion
//#region src/stories/measure/FxLinearScale.ts
var D = class extends x {
	constructor(...e) {
		super(...e), this.value = 0, this.subDivisions = 5, this.side = "left", this.orientation = "vertical", this.startOffset = 140, this.endOffset = 0, this.viewBoxWidth = 20, this.viewBoxHeight = 140, this.preserveAspectRatio = "xMidYMid meet", this.showConnectingLine = !1, this.trackThickness = "medium", this.caption = "", this.spacing = 0, this.captionOffset = 8;
	}
	static {
		this.styles = t`
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
    `;
	}
	get colors() {
		return {
			ticks: "var(--fx-linear-scale-color, #475569)",
			label: "var(--fx-linear-scale-label-color, var(--fx-gauge-text-secondary, #94a3b8))"
		};
	}
	get activeSide() {
		let { side: e, orientation: t } = this;
		return t === "horizontal" ? e === "left" ? "top" : e === "right" ? "bottom" : e : e;
	}
	get thicknessValue() {
		let e = String(this.trackThickness).trim();
		switch (e) {
			case "large": return 15;
			case "medium": return 10;
			case "small": return 5;
			default: return /^\d+$/.test(e) ? parseInt(e, 10) : 10;
		}
	}
	*renderVerticalConnectingLine() {
		let { startOffset: e, endOffset: t, side: n, viewBoxWidth: r, spacing: a } = this, o = this.colors.ticks, s = r / 2, c = this.thicknessValue / 2;
		if (n === "left" || n === "both") {
			let n = s - c - a;
			yield i`<line x1="${n}" y1="${e}" x2="${n}" y2="${t}" stroke="${o}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;
		}
		if (n === "right" || n === "both") {
			let n = s + c + a;
			yield i`<line x1="${n}" y1="${e}" x2="${n}" y2="${t}" stroke="${o}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;
		}
	}
	*renderHorizontalConnectingLine() {
		let { startOffset: e, endOffset: t, viewBoxHeight: n, spacing: r } = this, a = this.colors.ticks, o = this.activeSide, s = n / 2, c = this.thicknessValue / 2;
		if (o === "top" || o === "both") {
			let n = s - c - r;
			yield i`<line x1="${e}" y1="${n}" x2="${t}" y2="${n}" stroke="${a}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;
		}
		if (o === "bottom" || o === "both") {
			let n = s + c + r;
			yield i`<line x1="${e}" y1="${n}" x2="${t}" y2="${n}" stroke="${a}" stroke-width="0.8" stroke-linecap="round" vector-effect="non-scaling-stroke" />`;
		}
	}
	*renderConnectingLines() {
		this.showConnectingLine && (this.orientation === "horizontal" ? yield* this.renderHorizontalConnectingLine() : yield* this.renderVerticalConnectingLine());
	}
	*renderLeftTick(e, t, n, r) {
		let { ticks: a, label: o } = this.colors, { viewBoxWidth: s, spacing: c } = this, l = s / 2, u = this.thicknessValue / 2, d = n ? 10 : r ? 7 : 5, f = l - u - c;
		yield i`<line x1="${f - d}" y1="${e}" x2="${f}" y2="${e}" stroke="${a}" stroke-width="${n ? "1.2" : r ? "0.9" : "0.6"}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`, n && this.showLabels && (yield i`<text x="${this.getVerticalLeftLabelX()}" y="${e}" fill="${o}" font-size="${this.labelFontSize}" font-family="var(--fx-font-family, sans-serif)" font-weight="600" text-anchor="end" dominant-baseline="middle">${this.resolveLabel(t)}</text>`);
	}
	*renderRightTick(e, t, n, r) {
		let { ticks: a, label: o } = this.colors, { viewBoxWidth: s, spacing: c } = this, l = s / 2, u = this.thicknessValue / 2, d = n ? 10 : r ? 7 : 5, f = l + u + c;
		yield i`<line x1="${f}" y1="${e}" x2="${f + d}" y2="${e}" stroke="${a}" stroke-width="${n ? "1.2" : r ? "0.9" : "0.6"}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`, n && this.showLabels && (yield i`<text x="${this.getVerticalRightLabelX()}" y="${e}" fill="${o}" font-size="${this.labelFontSize}" font-family="var(--fx-font-family, sans-serif)" font-weight="600" text-anchor="start" dominant-baseline="middle">${this.resolveLabel(t)}</text>`);
	}
	get labelFontSize() {
		return "var(--fx-linear-scale-label-font-size, 3.2px)";
	}
	getVerticalLeftLabelX() {
		let { viewBoxWidth: e, spacing: t, thicknessValue: n } = this;
		return e / 2 - n / 2 - t - 10 - 4;
	}
	getVerticalRightLabelX() {
		let { viewBoxWidth: e, spacing: t, thicknessValue: n } = this;
		return e / 2 + n / 2 + t + 10 + 4;
	}
	getHorizontalTopLabelY() {
		let { viewBoxHeight: e, spacing: t, thicknessValue: n } = this;
		return e / 2 - n / 2 - t - 10 - 7;
	}
	getHorizontalBottomLabelY() {
		let { viewBoxHeight: e, spacing: t, thicknessValue: n } = this;
		return e / 2 + n / 2 + t + 10 + 7;
	}
	*renderTopTick(e, t, n, r) {
		let { ticks: a, label: o } = this.colors, { viewBoxHeight: s, spacing: c } = this, l = s / 2, u = this.thicknessValue / 2, d = n ? 10 : r ? 7 : 5, f = l - u - c;
		yield i`<line x1="${e}" y1="${f - d}" x2="${e}" y2="${f}" stroke="${a}" stroke-width="${n ? "1.2" : r ? "0.9" : "0.6"}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`, n && this.showLabels && (yield i`<text x="${e}" y="${this.getHorizontalTopLabelY()}" fill="${o}" font-size="${this.labelFontSize}" font-family="var(--fx-font-family, sans-serif)" font-weight="600" text-anchor="middle" dominant-baseline="middle">${this.resolveLabel(t)}</text>`);
	}
	*renderBottomTick(e, t, n, r) {
		let { ticks: a, label: o } = this.colors, { viewBoxHeight: s, spacing: c } = this, l = s / 2, u = this.thicknessValue / 2, d = n ? 10 : r ? 7 : 5, f = l + u + c;
		yield i`<line x1="${e}" y1="${f}" x2="${e}" y2="${f + d}" stroke="${a}" stroke-width="${n ? "1.2" : r ? "0.9" : "0.6"}" stroke-linecap="round" vector-effect="non-scaling-stroke" />`, n && this.showLabels && (yield i`<text x="${e}" y="${this.getHorizontalBottomLabelY()}" fill="${o}" font-size="${this.labelFontSize}" font-family="var(--fx-font-family, sans-serif)" font-weight="600" text-anchor="middle" dominant-baseline="middle">${this.resolveLabel(t)}</text>`);
	}
	*renderVerticalTicks(e, t, n, r) {
		let { startOffset: i, endOffset: a, side: o } = this, s = i + e * (a - i);
		(o === "left" || o === "both") && (yield* this.renderLeftTick(s, t, n, r)), (o === "right" || o === "both") && (yield* this.renderRightTick(s, t, n, r));
	}
	*renderHorizontalTicks(e, t, n, r) {
		let { startOffset: i, endOffset: a } = this, o = i + e * (a - i), s = this.activeSide;
		(s === "top" || s === "both") && (yield* this.renderTopTick(o, t, n, r)), (s === "bottom" || s === "both") && (yield* this.renderBottomTick(o, t, n, r));
	}
	*renderTicks() {
		let { count: e, subDivisions: t, min: n, max: r, orientation: i } = this, a = e * t, o = i === "horizontal";
		for (let e = 0; e <= a; e++) {
			let i = e % t === 0, s = !i && t % 2 == 0 && e % t === t / 2, c = e / a, l = n + c * (r - n);
			o ? yield* this.renderHorizontalTicks(c, l, i, s) : yield* this.renderVerticalTicks(c, l, i, s);
		}
	}
	*renderCaption() {
		if (this.caption) {
			let { orientation: e, side: t, viewBoxWidth: n, viewBoxHeight: r, startOffset: a, endOffset: o, captionOffset: s } = this, c = e === "horizontal", l = this.colors.label, u = this.labelFontSize, d = "var(--fx-font-family, sans-serif)";
			if (c) {
				let e = Math.max(a, o) + s, t = this.activeSide;
				t === "top" ? yield i`<text x="${e}" y="${this.getHorizontalTopLabelY()}" fill="${l}" font-size="${u}" font-family="${d}" font-weight="${"800"}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>` : t === "bottom" ? yield i`<text x="${e}" y="${this.getHorizontalBottomLabelY()}" fill="${l}" font-size="${u}" font-family="${d}" font-weight="${"800"}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>` : yield i`<text x="${e}" y="${r / 2}" fill="${l}" font-size="${u}" font-family="${d}" font-weight="${"800"}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>`;
			} else {
				let e = Math.min(a, o) - s;
				t === "left" ? yield i`<text x="${this.getVerticalLeftLabelX()}" y="${e}" fill="${l}" font-size="${u}" font-family="${d}" font-weight="${"800"}" text-anchor="end" dominant-baseline="middle">${this.caption}</text>` : t === "right" ? yield i`<text x="${this.getVerticalRightLabelX()}" y="${e}" fill="${l}" font-size="${u}" font-family="${d}" font-weight="${"800"}" text-anchor="start" dominant-baseline="middle">${this.caption}</text>` : yield i`<text x="${n / 2}" y="${e}" fill="${l}" font-size="${u}" font-family="${d}" font-weight="${"800"}" text-anchor="middle" dominant-baseline="middle">${this.caption}</text>`;
			}
		}
	}
	*renderSvgTicks() {
		yield* this.renderConnectingLines(), yield* this.renderTicks(), yield* this.renderCaption();
	}
	render() {
		let { viewBoxWidth: e, viewBoxHeight: t, preserveAspectRatio: r } = this;
		return n`
            <svg viewBox="0 0 ${e} ${t}" preserveAspectRatio="${r}">
                ${this.renderSvgTicks()}
            </svg>
        `;
	}
};
l([o({ type: Number })], D.prototype, "value", void 0), l([o({
	type: Number,
	attribute: "sub-divisions"
})], D.prototype, "subDivisions", void 0), l([o({ type: String })], D.prototype, "side", void 0), l([o({
	type: String,
	reflect: !0
})], D.prototype, "orientation", void 0), l([o({
	type: Number,
	attribute: "start-offset"
})], D.prototype, "startOffset", void 0), l([o({
	type: Number,
	attribute: "end-offset"
})], D.prototype, "endOffset", void 0), l([o({
	type: Number,
	attribute: "view-box-width"
})], D.prototype, "viewBoxWidth", void 0), l([o({
	type: Number,
	attribute: "view-box-height"
})], D.prototype, "viewBoxHeight", void 0), l([o({
	type: String,
	attribute: "preserve-aspect-ratio"
})], D.prototype, "preserveAspectRatio", void 0), l([o({
	type: Boolean,
	attribute: "show-connecting-line"
})], D.prototype, "showConnectingLine", void 0), l([o({ attribute: "track-thickness" })], D.prototype, "trackThickness", void 0), l([o({ type: String })], D.prototype, "caption", void 0), l([o({ type: Number })], D.prototype, "spacing", void 0), l([o({
	type: Number,
	attribute: "caption-offset"
})], D.prototype, "captionOffset", void 0), D = l([a("fx-linear-scale")], D);
//#endregion
//#region src/stories/measure/FxFader.ts
var O, k = class extends d(u) {
	static {
		O = this;
	}
	constructor(...e) {
		super(...e), this.showValue = !1, this.orientation = "horizontal", this.ticks = 0, this.snapToTicks = !1, this.showLabels = !0, this.ticksSide = "left", this.trackThickness = "medium", this.subDivisions = 5, this.spacing = 0, this.length = "", this.valueOrigin = "start", this.decimals = 2, this.containerWidth = 0, this.containerHeight = 0, this.isDragging = !1, this.handleMouseMove = (e) => {
			this.isDragging && this.updateValueFromCoordinates(e.clientX, e.clientY);
		}, this.handleTouchMove = (e) => {
			this.isDragging && e.touches.length > 0 && (e.preventDefault(), this.updateValueFromCoordinates(e.touches[0].clientX, e.touches[0].clientY));
		}, this.handleMouseUp = () => {
			this.endDrag();
		}, this.handleTouchEnd = () => {
			this.endDrag();
		};
	}
	get verticalCorrection() {
		let e = getComputedStyle(this).getPropertyValue("--fx-fader-vertical-correction").trim();
		return e ? parseFloat(e) : 0;
	}
	static {
		this.CROSS_AXIS = 60;
	}
	static {
		this.FALLBACK_TRACK_LENGTH = 140;
	}
	static {
		this.styles = [m, t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-fader-length: 240px;
                --fx-fader-width: 80px;
                --fx-fader-height: 280px;
                --fx-fader-thumb-width: 20px;
                --fx-fader-thumb-height: 20px;
                --fx-fader-theme-color: #3b82f6;
            }
            :host([orientation="vertical"]) {
                flex-direction: row;
                align-items: center;
                gap: 16px;
                --fx-fader-width: 80px;
                --fx-fader-height: var(--fx-fader-length);
            }
            :host([orientation="horizontal"]) {
                --fx-fader-width: var(--fx-fader-length);
                --fx-fader-height: 80px;
            }

            .fader-outer-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
            }
            :host([orientation="horizontal"]) .fader-outer-wrap {
                width: 100%;
            }
            :host([orientation="vertical"]) .fader-outer-wrap {
                flex-direction: row;
            }

            .fader-wrap {
                position: relative;
                width: var(--fx-fader-width);
                height: var(--fx-fader-height);
                box-sizing: border-box;
                padding: 28px 0;
            }
            :host([orientation="horizontal"]) .fader-wrap {
                padding: 0 28px;
                width: var(--fx-fader-width);
                max-width: 100%;
                box-sizing: border-box;
            }

            .fader-container {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }

            svg.track-svg {
                width: 100%;
                height: 100%;
                overflow: visible;
            }

            .thumb {
                position: absolute;
                width: var(--fx-fader-thumb-width);
                height: var(--fx-fader-thumb-height);
                cursor: grab;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: auto;
                transform: translate(-50%, -50%);
            }
            .thumb:active {
                cursor: grabbing;
                transform: translate(-50%, -50%) scale(1.1);
            }
            ::slotted([slot="thumb"]) {
                pointer-events: none;
                width: 100%;
                height: 100%;
            }
            :host([is-animated]) .thumb {
                transition: left 0.3s cubic-bezier(0.15, 0.85, 0.3, 1), 
                           top 0.3s cubic-bezier(0.15, 0.85, 0.3, 1), 
                           bottom 0.3s cubic-bezier(0.15, 0.85, 0.3, 1), 
                           transform 0.15s ease;
            }

            .overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
                --fx-linear-scale-label-font-size: 7px;
            }

            ::slotted([slot="scale"]) {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .display-wrap {
                display: flex;
                justify-content: center;
            }
            :host([orientation="vertical"]) .display-wrap {
                align-items: flex-start;
            }
            :host([orientation="horizontal"]) .display-wrap {
                width: 100%;
                justify-content: center;
            }
        `];
	}
	get layoutMetrics() {
		let e = O.CROSS_AXIS, t = O.FALLBACK_TRACK_LENGTH, n = this.orientation === "horizontal";
		if (this.containerWidth <= 0 || this.containerHeight <= 0) return {
			trackLength: t,
			viewBoxWidth: n ? t : e,
			viewBoxHeight: n ? e : t
		};
		if (n) {
			let t = e, n = e * (this.containerWidth / this.containerHeight);
			return {
				trackLength: n,
				viewBoxWidth: n,
				viewBoxHeight: t
			};
		}
		let r = e, i = e * (this.containerHeight / this.containerWidth);
		return {
			trackLength: i,
			viewBoxWidth: r,
			viewBoxHeight: i
		};
	}
	get tickLayout() {
		let { orientation: e } = this, t = this.thicknessValue / 2, { trackLength: n, viewBoxWidth: r, viewBoxHeight: i } = this.layoutMetrics, { startOffset: a, endOffset: o } = ne(e, this.getScaleValueOrigin(), n, t);
		return {
			trackLength: n,
			viewBoxWidth: r,
			viewBoxHeight: i,
			startOffset: a,
			endOffset: o
		};
	}
	connectedCallback() {
		super.connectedCallback(), this.applyLength(), this.resizeObserver = new ResizeObserver((e) => {
			let t = e[0];
			if (!t) return;
			let { width: n, height: r } = t.contentRect;
			(n !== this.containerWidth || r !== this.containerHeight) && (this.containerWidth = n, this.containerHeight = r);
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.resizeObserver?.disconnect();
	}
	firstUpdated(e) {
		super.firstUpdated(e);
		let t = this.shadowRoot?.querySelector(".fader-container");
		if (t && this.resizeObserver) {
			this.resizeObserver.observe(t);
			let e = t.getBoundingClientRect();
			this.containerWidth = e.width, this.containerHeight = e.height;
		}
	}
	applyLength() {
		let e = this.resolveLengthValue();
		e ? this.style.setProperty("--fx-fader-length", e) : this.style.removeProperty("--fx-fader-length");
	}
	resolveLengthValue() {
		let e = this.length.trim();
		return e ? /^\d+(\.\d+)?$/.test(e) ? `${e}px` : e : "";
	}
	get thicknessValue() {
		let e = String(this.trackThickness).trim();
		switch (e) {
			case "large": return 15;
			case "medium": return 10;
			case "small": return 5;
			default: {
				if (/^\d+$/.test(e)) return parseInt(e, 10);
				let t = getComputedStyle(this).getPropertyValue("--fx-fader-thickness").trim();
				return t && /^\d+/.test(t) ? parseFloat(t) : 10;
			}
		}
	}
	handleMouseDown(e) {
		this.startDrag(e.clientX, e.clientY);
	}
	handleTouchStart(e) {
		e.touches.length > 0 && this.startDrag(e.touches[0].clientX, e.touches[0].clientY);
	}
	startDrag(e, t) {
		this.isDragging = !0, this.updateValueFromCoordinates(e, t), window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp), window.addEventListener("touchmove", this.handleTouchMove, { passive: !1 }), window.addEventListener("touchend", this.handleTouchEnd);
	}
	endDrag() {
		this.isDragging && (this.isDragging = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), window.removeEventListener("touchmove", this.handleTouchMove), window.removeEventListener("touchend", this.handleTouchEnd), this.dispatchChangeEvent());
	}
	getScaleValueOrigin() {
		return re(this, "scale", this.valueOrigin);
	}
	get displayValue() {
		return this.getScaleValueOrigin() === (this.orientation === "horizontal" ? "start" : "end") ? this.value : this.max - (this.value - this.min);
	}
	get roundedDisplayValue() {
		return te(this.displayValue, this.decimals);
	}
	getEventDetail() {
		return {
			value: this.displayValue,
			displayValue: this.roundedDisplayValue
		};
	}
	dispatchInputEvent() {
		this.dispatchEvent(new CustomEvent("input", {
			detail: this.getEventDetail(),
			bubbles: !0,
			composed: !0
		}));
	}
	dispatchChangeEvent() {
		this.dispatchEvent(new CustomEvent("change", {
			detail: this.getEventDetail(),
			bubbles: !0,
			composed: !0
		}));
	}
	computeDragRatio(e, t, n) {
		let r = n.getBoundingClientRect(), { trackLength: i } = this.layoutMetrics, a = this.thicknessValue / 2, o = a / i, s = (i - 2 * a) / i;
		if (this.orientation === "horizontal") {
			let t = e - r.left, n = r.width * o, i = r.width * s;
			return i <= 0 ? 0 : Math.min(Math.max((t - n) / i, 0), 1);
		} else {
			let e = t - r.top, n = r.height * o, i = r.height * s, { verticalCorrection: a } = this, c = e - (-a + (this.progress || 0) * (2 * a));
			return i <= 0 ? 0 : Math.min(Math.max(1 - (c - n) / i, 0), 1);
		}
	}
	updateValueFromCoordinates(e, t) {
		let n = this.shadowRoot?.querySelector(".fader-container");
		if (!n) return;
		let { min: r, max: i } = this, a = r + this.computeDragRatio(e, t, n) * (i - r);
		if (this.ticks > 1 && this.snapToTicks) {
			let e = (i - r) / (this.ticks - 1);
			a = r + Math.round((a - r) / e) * e;
		}
		this.value = a, this.dispatchInputEvent();
	}
	updated(e) {
		super.updated(e), e.has("length") && this.applyLength(), (e.has("value") || e.has("min") || e.has("max") || e.has("unit") || e.has("label") || e.has("decimals") || e.has("valueOrigin")) && this.updateSlottedDisplay(), (e.has("value") || e.has("min") || e.has("max") || e.has("orientation") || e.has("isDragging") || e.has("ticks") || e.has("ticksSide") || e.has("showLabels") || e.has("trackThickness") || e.has("valueOrigin") || e.has("containerWidth") || e.has("containerHeight")) && (this.updateSlottedThumb(), this.updateSlottedScale());
	}
	updateSlottedDisplay() {
		let e = this.shadowRoot?.querySelector("slot[name=\"display\"]");
		if (e) {
			let t = e.assignedElements()[0];
			t && ("value" in t && (t.value = this.roundedDisplayValue), "min" in t && (t.min = this.min), "max" in t && (t.max = this.max), "unit" in t && (t.unit = this.unit), "label" in t && (t.label = this.label));
		}
	}
	updateSlottedThumb() {
		let e = this.shadowRoot?.querySelector("slot[name=\"thumb\"]");
		if (e) {
			let t = e.assignedElements()[0];
			t && ("value" in t && (t.value = this.value), "progress" in t && (t.progress = this.progress), "orientation" in t && (t.orientation = this.orientation), "isDragging" in t && (t.isDragging = this.isDragging), f(t) && (t.isAnimated = this.isAnimated), "ticksSide" in t && (t.ticksSide = this.ticksSide));
		}
	}
	updateSlottedScale() {
		let e = this.shadowRoot?.querySelector("slot[name=\"scale\"]");
		if (e) {
			let t = e.assignedElements();
			if (t.length > 0) {
				let { viewBoxWidth: e, viewBoxHeight: n, startOffset: r, endOffset: i } = this.tickLayout;
				t.forEach((t) => {
					t && ("orientation" in t && (t.orientation = this.orientation), "startOffset" in t && (t.startOffset = r), "endOffset" in t && (t.endOffset = i), "viewBoxWidth" in t && (t.viewBoxWidth = e), "viewBoxHeight" in t && (t.viewBoxHeight = n), "trackThickness" in t && !t.hasAttribute("track-thickness") && (t.trackThickness = this.trackThickness), "side" in t && (t.side = this.ticksSide), "showLabels" in t && _(t.showLabels) && (t.showLabels = this.showLabels), "value" in t && _(t.value) && (t.value = this.value), "min" in t && _(t.min) && (t.min = this.min), "max" in t && _(t.max) && (t.max = this.max), "spacing" in t && (t.spacing = this.spacing));
				}), this.updateSlottedDisplay();
			}
		}
	}
	renderVerticalTrackAndFill() {
		let { progress: e, thicknessValue: t } = this, { trackLength: r, viewBoxWidth: i, viewBoxHeight: a } = this.layoutMetrics, o = e * r, s = r - o, c = i / 2 - t / 2;
		return n`
            <svg class="track-svg" viewBox="0 0 ${i} ${a}">
                <defs>
                    <linearGradient 
                        id="fx-fader-vertical-gradient-${this.orientation}" 
                        x1="0" y1="${r}" 
                        x2="0" y2="0" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stop-color="var(--fx-fader-gradient-start, #3b82f6)" />
                        <stop offset="50%" stop-color="var(--fx-fader-gradient-middle, #6366f1)" />
                        <stop offset="100%" stop-color="var(--fx-fader-gradient-end, #8b5cf6)" />
                    </linearGradient>
                </defs>
                <rect
                    x="${c}"
                    y="0"
                    width="${t}"
                    height="${r}"
                    fill="var(--fx-fader-track-color, #e5e7eb)"
                    rx="${t / 2}"
                />
                <rect
                    x="${c}"
                    y="${s}"
                    width="${t}"
                    height="${o}"
                    fill="var(--fx-fader-fill-color, url(#fx-fader-vertical-gradient-${this.orientation}))"
                    rx="${t / 2}"
                    style="transition: ${this.isAnimated ? "height 0.3s cubic-bezier(0.15, 0.85, 0.3, 1), y 0.3s cubic-bezier(0.15, 0.85, 0.3, 1)" : "none"};"
                />
            </svg>
        `;
	}
	renderHorizontalTrackAndFill() {
		let { progress: e } = this, { trackLength: t, viewBoxWidth: r, viewBoxHeight: i } = this.layoutMetrics, a = e * t, o = this.thicknessValue, s = i / 2 - o / 2;
		return n`
            <svg class="track-svg" viewBox="0 0 ${r} ${i}">
                <defs>
                    <linearGradient 
                        id="fx-fader-horizontal-gradient-${this.orientation}" 
                        x1="0" y1="0" 
                        x2="${t}" y2="0" 
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stop-color="var(--fx-fader-gradient-start, #3b82f6)" />
                        <stop offset="50%" stop-color="var(--fx-fader-gradient-middle, #6366f1)" />
                        <stop offset="100%" stop-color="var(--fx-fader-gradient-end, #8b5cf6)" />
                    </linearGradient>
                </defs>
                <rect
                    x="0"
                    y="${s}"
                    width="${t}"
                    height="${o}"
                    fill="var(--fx-fader-track-color, #e5e7eb)"
                    rx="${o / 2}"
                />
                <rect
                    x="0"
                    y="${s}"
                    width="${a}"
                    height="${o}"
                    fill="var(--fx-fader-fill-color, url(#fx-fader-horizontal-gradient-${this.orientation}))"
                    rx="${o / 2}"
                    style="transition: ${this.isAnimated ? "width 0.3s cubic-bezier(0.15, 0.85, 0.3, 1)" : "none"};"
                />
            </svg>
        `;
	}
	renderTrackAndFill() {
		return this.orientation === "horizontal" ? this.renderHorizontalTrackAndFill() : this.renderVerticalTrackAndFill();
	}
	renderTicksSlot() {
		if (this.ticks <= 1) return n``;
		let { orientation: e } = this, { viewBoxWidth: t, viewBoxHeight: r, startOffset: i, endOffset: a } = this.tickLayout;
		return n`
            <slot name="scale" @slotchange="${this.updateSlottedScale}">
                <fx-linear-scale
                    .value=${this.value}
                    .min=${this.min}
                    .max=${this.max}
                    .count=${this.ticks - 1}
                    .subDivisions=${this.subDivisions}
                    .side=${this.ticksSide}
                    .showLabels=${this.showLabels}
                    .orientation=${e}
                    .valueOrigin=${this.valueOrigin}
                    .startOffset=${i}
                    .endOffset=${a}
                    .viewBoxWidth=${t}
                    .viewBoxHeight=${r}
                    .trackThickness=${this.trackThickness}
                    .spacing=${this.spacing}
                ></fx-linear-scale>
            </slot>
        `;
	}
	renderThumb() {
		let { progress: e, orientation: t, isDragging: r, thicknessValue: i, verticalCorrection: a } = this, { trackLength: o } = this.layoutMetrics, s = i / 2, c = s / o * 100, l = (o - 2 * s) / o * 100, u = -a + 2 * a * e, d = t === "horizontal" ? `left: calc(${c}% + ${e} * ${l}%); top: 50%;` : `top: calc(${100 - c}% - ${e} * ${l}% + ${u}px); left: 50%;`;
		return n`
            <div 
                class="thumb ${r ? "dragging" : ""}" 
                style="${d}"
            >
                <slot name="thumb" @slotchange="${this.updateSlottedThumb}">
                    <fx-fader-thumb
                        .value="${this.value}"
                        .progress="${e}"
                        .isDragging="${r}"
                        .orientation="${t}"
                        .isAnimated="${this.isAnimated}"
                    ></fx-fader-thumb>
                </slot>
            </div>
        `;
	}
	render() {
		return n`
            <div class="fader-outer-wrap">
                <div class="fader-wrap">
                    <div 
                        class="fader-container"
                        @mousedown="${this.handleMouseDown}"
                        @touchstart="${this.handleTouchStart}"
                    >
                        ${this.renderTrackAndFill()}
                        <div class="overlay">
                            ${this.renderTicksSlot()}
                        </div>
                        ${this.renderThumb()}
                    </div>
                </div>

                ${this.showValue ? n`
                    <div class="display-wrap">
                        <slot name="display" @slotchange="${this.updateSlottedDisplay}">
                            <fx-measure-value-display
                                .value=${this.roundedDisplayValue}
                                .min=${this.min}
                                .max=${this.max}
                                .unit=${this.unit}
                                .label=${this.label}
                            ></fx-measure-value-display>
                        </slot>
                    </div>
                ` : ""}
            </div>
        `;
	}
};
l([o({
	type: Boolean,
	attribute: "show-value",
	reflect: !0
})], k.prototype, "showValue", void 0), l([o({
	type: String,
	reflect: !0
})], k.prototype, "orientation", void 0), l([o({ type: Number })], k.prototype, "ticks", void 0), l([o({
	type: Boolean,
	attribute: "snap-to-ticks",
	reflect: !0
})], k.prototype, "snapToTicks", void 0), l([o({
	type: Boolean,
	attribute: "show-labels",
	reflect: !0
})], k.prototype, "showLabels", void 0), l([o({
	type: String,
	attribute: "ticks-side",
	reflect: !0
})], k.prototype, "ticksSide", void 0), l([o({
	type: String,
	attribute: "track-thickness"
})], k.prototype, "trackThickness", void 0), l([o({
	type: Number,
	attribute: "sub-divisions"
})], k.prototype, "subDivisions", void 0), l([o({ type: Number })], k.prototype, "spacing", void 0), l([o({
	type: String,
	reflect: !0
})], k.prototype, "length", void 0), l([o({
	type: String,
	attribute: "value-origin",
	reflect: !0
})], k.prototype, "valueOrigin", void 0), l([o({ type: Number })], k.prototype, "decimals", void 0), l([s()], k.prototype, "containerWidth", void 0), l([s()], k.prototype, "containerHeight", void 0), l([s()], k.prototype, "isDragging", void 0), k = O = l([a("fx-fader")], k);
//#endregion
//#region src/stories/measure/FxFaderThumbFader.ts
var A = class extends d(c) {
	constructor(...e) {
		super(...e), this.value = 0, this.progress = 0, this.isDragging = !1, this.orientation = "horizontal";
	}
	static {
		this.styles = [m, t`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
            .fader-cap {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border: 1px solid #111827;
                border-radius: 4px;
                position: relative;
                overflow: hidden;
                box-shadow: 
                    0 4px 6px -1px rgba(0, 0, 0, 0.4), 
                    0 2px 4px -1px rgba(0, 0, 0, 0.3), 
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.4);
                cursor: grab;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            :host([is-dragging]) .fader-cap {
                cursor: grabbing;
                border-color: var(--fx-fader-theme-color, #3b82f6);
                box-shadow: 
                    0 6px 10px rgba(0, 0, 0, 0.5), 
                    0 2px 5px rgba(0, 0, 0, 0.3), 
                    inset 0 1px 0 rgba(255, 255, 255, 0.25),
                    0 0 4px var(--fx-fader-theme-color, rgba(59, 130, 246, 0.4));
            }

                        :host([orientation="vertical"]) .fader-cap {
                            background: linear-gradient(
                                to bottom,
                                rgba(75, 85, 99, 0.95) 0%,
                                rgba(55, 65, 81, 0.95) 8%,
                                rgba(31, 41, 55, 0.95) 25%,
                                rgba(17, 24, 39, 0.95) 48%,
                                rgba(17, 24, 39, 0.95) 52%,
                                rgba(31, 41, 55, 0.95) 75%,
                                rgba(55, 65, 81, 0.95) 92%,
                                rgba(75, 85, 99, 0.95) 100%
                            );
                        }

                        :host([orientation="horizontal"]) .fader-cap {
                            background: linear-gradient(
                                to right,
                                rgba(75, 85, 99, 0.95) 0%,
                                rgba(55, 65, 81, 0.95) 8%,
                                rgba(31, 41, 55, 0.95) 25%,
                                rgba(17, 24, 39, 0.95) 48%,
                                rgba(17, 24, 39, 0.95) 52%,
                                rgba(31, 41, 55, 0.95) 75%,
                                rgba(55, 65, 81, 0.95) 92%,
                                rgba(75, 85, 99, 0.95) 100%
                            );
                        }

            .bevel-overlay {
                position: absolute;
                inset: 1px;
                border-radius: 3px;
                pointer-events: none;
            }

            :host([orientation="vertical"]) .bevel-overlay {
                background: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0.12) 0%,
                    rgba(255, 255, 255, 0.05) 15%,
                    rgba(0, 0, 0, 0.15) 45%,
                    rgba(0, 0, 0, 0.4) 50%,
                    rgba(0, 0, 0, 0.15) 55%,
                    rgba(255, 255, 255, 0.05) 85%,
                    rgba(255, 255, 255, 0.12) 100%
                );
            }

            :host([orientation="horizontal"]) .bevel-overlay {
                background: linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.12) 0%,
                    rgba(255, 255, 255, 0.05) 15%,
                    rgba(0, 0, 0, 0.15) 45%,
                    rgba(0, 0, 0, 0.4) 50%,
                    rgba(0, 0, 0, 0.15) 55%,
                    rgba(255, 255, 255, 0.05) 85%,
                    rgba(255, 255, 255, 0.12) 100%
                );
            }

            .center-groove {
                position: absolute;
                background-color: #090d16;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.8);
            }

            :host([orientation="vertical"]) .center-groove {
                left: 0;
                right: 0;
                top: 50%;
                height: 4px;
                transform: translateY(-50%);
                border-top: 1px solid rgba(0, 0, 0, 0.5);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }

            :host([orientation="horizontal"]) .center-groove {
                top: 0;
                bottom: 0;
                left: 50%;
                width: 4px;
                transform: translateX(-50%);
                border-left: 1px solid rgba(0, 0, 0, 0.5);
                border-right: 1px solid rgba(255, 255, 255, 0.05);
            }

            .indicator-line {
                position: absolute;
                background-color: var(--fx-fader-theme-color, #ef4444);
                box-shadow: 
                    0 0 2px var(--fx-fader-theme-color, #ef4444),
                    0 0 4px var(--fx-fader-theme-color, rgba(239, 68, 68, 0.5));
            }

            :host([orientation="vertical"]) .indicator-line {
                left: 0;
                right: 0;
                top: 50%;
                height: 2px;
                transform: translateY(-50%);
            }

            :host([orientation="horizontal"]) .indicator-line {
                top: 0;
                bottom: 0;
                left: 50%;
                width: 2px;
                transform: translateX(-50%);
            }

            .finger-grips {
                position: absolute;
                display: flex;
                pointer-events: none;
            }

            :host([orientation="vertical"]) .finger-grips {
                flex-direction: row;
                justify-content: space-between;
                left: 4px;
                right: 4px;
                top: 50%;
                transform: translateY(-50%);
            }

            :host([orientation="horizontal"]) .finger-grips {
                flex-direction: column;
                justify-content: space-between;
                top: 4px;
                bottom: 4px;
                left: 50%;
                transform: translateX(-50%);
            }

            .grip-mark {
                background-color: rgba(0, 0, 0, 0.35);
                box-shadow: 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.07);
            }

            :host([orientation="vertical"]) .grip-mark {
                width: 1px;
                height: 10px;
            }

            :host([orientation="horizontal"]) .grip-mark {
                height: 1px;
                width: 10px;
            }

            .silver-highlight {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.08);
                pointer-events: none;
            }

            :host([orientation="vertical"]) .silver-highlight {
                left: 1px;
                right: 1px;
                top: 1px;
                height: 35%;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
            }

            :host([orientation="horizontal"]) .silver-highlight {
                left: 1px;
                top: 1px;
                bottom: 1px;
                width: 35%;
                background: linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
            }
        `];
	}
	render() {
		return n`
            <div class="fader-cap">
                <div class="silver-highlight"></div>
                <div class="bevel-overlay"></div>
                <div class="finger-grips">
                    <div class="grip-mark"></div>
                    <div class="grip-mark"></div>
                    <div class="grip-mark"></div>
                </div>
                <div class="center-groove"></div>
                <div class="indicator-line"></div>
            </div>
        `;
	}
};
l([o({
	type: Number,
	reflect: !0
})], A.prototype, "value", void 0), l([o({
	type: Number,
	reflect: !0
})], A.prototype, "progress", void 0), l([o({
	type: Boolean,
	attribute: "is-dragging",
	reflect: !0
})], A.prototype, "isDragging", void 0), l([o({
	type: String,
	reflect: !0
})], A.prototype, "orientation", void 0), A = l([a("fx-fader-thumb-fader")], A);
//#endregion
//#region src/stories/measure/FxFaderThumbPointer.ts
var j = class extends d(c) {
	constructor(...e) {
		super(...e), this.value = 0, this.progress = 0, this.isDragging = !1, this.orientation = "horizontal", this.ticksSide = "left";
	}
	static {
		this.styles = [m, t`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
            .thumb-pointer {
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 40%, #e5e7eb 70%, #d1d5db 100%);
                border: 1.5px solid #9ca3af;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1), inset 0 1px 0 #ffffff;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            :host([orientation="horizontal"]) .thumb-pointer {
                border-radius: 4px 4px 12px 12px;
            }
            :host([orientation="vertical"]) .thumb-pointer {
                border-radius: 4px 12px 12px 4px;
            }

            :host([orientation="horizontal"][ticks-side="top"]) .thumb-pointer {
                border-radius: 12px 12px 4px 4px;
            }
            :host([orientation="horizontal"][ticks-side="bottom"]) .thumb-pointer {
                border-radius: 4px 4px 12px 12px;
            }

            :host([orientation="vertical"][ticks-side="left"]) .thumb-pointer {
                border-radius: 12px 4px 4px 12px;
            }
            :host([orientation="vertical"][ticks-side="right"]) .thumb-pointer {
                border-radius: 4px 12px 12px 4px;
            }

            .notch {
                position: absolute;
                width: 0;
                height: 0;
                border-style: solid;
            }

            :host([orientation="horizontal"]) .notch {
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                border-width: 6px 5px 0 5px;
                border-color: #9ca3af transparent transparent transparent;
            }
            :host([orientation="horizontal"]) .notch::after {
                content: '';
                position: absolute;
                bottom: 1.5px;
                left: -5px;
                border-width: 5px 4px 0 4px;
                border-color: #f3f4f6 transparent transparent transparent;
            }

            :host([orientation="horizontal"][ticks-side="top"]) .notch {
                top: -6px;
                bottom: auto;
                border-width: 0 5px 6px 5px;
                border-color: transparent transparent #9ca3af transparent;
            }
            :host([orientation="horizontal"][ticks-side="top"]) .notch::after {
                bottom: auto;
                top: 1.5px;
                border-width: 0 4px 5px 4px;
                border-color: transparent transparent #f3f4f6 transparent;
            }

            :host([orientation="horizontal"][ticks-side="bottom"]) .notch {
                bottom: -6px;
                top: auto;
                border-width: 6px 5px 0 5px;
                border-color: #9ca3af transparent transparent transparent;
            }
            :host([orientation="horizontal"][ticks-side="bottom"]) .notch::after {
                top: auto;
                bottom: 1.5px;
                border-width: 5px 4px 0 4px;
                border-color: #f3f4f6 transparent transparent transparent;
            }

            :host([orientation="vertical"]) .notch {
                right: -6px;
                top: 50%;
                transform: translateY(-50%);
                border-width: 5px 0 5px 6px;
                border-color: transparent transparent transparent #9ca3af;
            }
            :host([orientation="vertical"]) .notch::after {
                content: '';
                position: absolute;
                right: 1.5px;
                top: -5px;
                border-width: 4px 0 4px 5px;
                border-color: transparent transparent transparent #f3f4f6;
            }

            :host([orientation="vertical"][ticks-side="left"]) .notch {
                left: -6px;
                right: auto;
                border-width: 5px 6px 5px 0;
                border-color: transparent #9ca3af transparent transparent;
            }
            :host([orientation="vertical"][ticks-side="left"]) .notch::after {
                right: auto;
                left: 1.5px;
                border-width: 4px 5px 4px 0;
                border-color: transparent #f3f4f6 transparent transparent;
            }

            :host([orientation="vertical"][ticks-side="right"]) .notch {
                right: -6px;
                left: auto;
                border-width: 5px 0 5px 6px;
                border-color: transparent transparent transparent #9ca3af;
            }
            :host([orientation="vertical"][ticks-side="right"]) .notch::after {
                left: auto;
                right: 1.5px;
                border-width: 4px 0 4px 5px;
                border-color: transparent transparent transparent #f3f4f6;
            }

            .grip-line {
                width: 2px;
                height: 10px;
                background-color: var(--fx-fader-theme-color, #3b82f6);
                border-radius: 99px;
                opacity: 0.8;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            :host([orientation="vertical"]) .grip-line {
                width: 10px;
                height: 2px;
            }

            :host([is-dragging]) .thumb-pointer {
                border-color: var(--fx-fader-theme-color, #3b82f6);
            }

            :host([is-dragging]) .notch {
                border-color: transparent;
            }
            :host([is-dragging][orientation="horizontal"][ticks-side="top"]) .notch {
                border-bottom-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="horizontal"]) .notch {
                border-top-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="horizontal"][ticks-side="bottom"]) .notch {
                border-top-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="vertical"]) .notch {
                border-left-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="vertical"][ticks-side="left"]) .notch {
                border-right-color: var(--fx-fader-theme-color, #3b82f6);
            }
            :host([is-dragging][orientation="vertical"][ticks-side="right"]) .notch {
                border-left-color: var(--fx-fader-theme-color, #3b82f6);
            }

            :host([is-dragging]) .grip-line {
                background-color: var(--fx-fader-theme-color, #3b82f6);
                opacity: 1;
            }

            :host([is-animated]) .thumb-pointer {
                transition: border-color 0.15s ease;
            }
            :host([is-animated]) .grip-line {
                transition: background-color 0.15s ease, height 0.15s ease, width 0.15s ease;
            }
        `];
	}
	render() {
		return n`
            <div class="thumb-pointer">
                <div class="notch"></div>
                <div class="grip-line"></div>
            </div>
        `;
	}
};
l([o({
	type: Number,
	reflect: !0
})], j.prototype, "value", void 0), l([o({
	type: Number,
	reflect: !0
})], j.prototype, "progress", void 0), l([o({
	type: Boolean,
	attribute: "is-dragging",
	reflect: !0
})], j.prototype, "isDragging", void 0), l([o({
	type: String,
	reflect: !0
})], j.prototype, "orientation", void 0), l([o({
	type: String,
	attribute: "ticks-side",
	reflect: !0
})], j.prototype, "ticksSide", void 0), j = l([a("fx-fader-thumb-pointer")], j);
//#endregion
//#region src/stories/measure/FxGaugeNeedleTriangle.ts
var M = class extends h {
	constructor(...e) {
		super(...e), this.thickness = 2.5;
	}
	static {
		this.styles = t`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    `;
	}
	render() {
		let { displayAngle: e, thickness: t } = this;
		return n`
            <svg viewBox="-4 -4 108 108">
                <defs>
                    <linearGradient id="fx-needle-default-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="var(--fx-gauge-needle-gradient-start, #ef4444)" />
                        <stop offset="100%" stop-color="var(--fx-gauge-needle-gradient-end, #f97316)" />
                    </linearGradient>
                </defs>
                <g style="transform: rotate(${e}deg); transform-origin: ${50}px ${50}px; transition: var(--fx-gauge-transition, none);">
                    <path
                        d="${`M ${50 - t} 50 L 50 12.5 L ${50 + t} 50 Z`}"
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
        `;
	}
};
l([o({ type: Number })], M.prototype, "thickness", void 0), M = l([a("fx-gauge-needle-triangle")], M);
//#endregion
//#region src/stories/measure/FxLinearGauge.ts
var N, P = class extends d(u) {
	static {
		N = this;
	}
	constructor(...e) {
		super(...e), this.guid = `fx-${ee.newGuid()}`, this.showLabels = !0, this.ticksSide = "left", this.count = 10, this.subDivisions = 5, this.orientation = "vertical", this.trackThickness = "medium", this.valueOrigin = "end", this.caption = "", this.theme = "dark", this.spacing = 0, this.isRoundedTrack = !0, this.isRoundedShell = !0, this.layoutWidth = 0, this.layoutHeight = 0, this.onScaleSlotChange = () => {
			this.updateSlottedScale(), this.requestUpdate();
		};
	}
	static {
		this.shellThickBase = 120;
	}
	static {
		this.shellLengthBase = 480;
	}
	static {
		this.insetBase = 36;
	}
	static {
		this.wellThickBase = 40;
	}
	static {
		this.styles = [m, t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                --fx-linear-gauge-width: 120px;
                --fx-linear-gauge-height: 480px;
                --fx-linear-scale-label-font-size: 9px;
                --fx-linear-scale-color: #cbd5e1;
                --fx-linear-scale-label-color: #64748b;
                --fx-linear-gauge-shell-fill: #f8fafc;
                --fx-linear-gauge-shell-stroke: #e2e8f0;
                --fx-linear-gauge-track-color: #e2e8f0;
                --fx-linear-gauge-shadow-opacity: 0.20;
                overflow: visible;
            }
            :host([theme="dark"]) {
                --fx-linear-scale-color: #5d6f88;
                --fx-linear-scale-label-color: #b0bdcd;
                --fx-linear-gauge-shell-fill: #1e293b;
                --fx-linear-gauge-shell-stroke: #334155;
                --fx-linear-gauge-track-color: #0f172a;
            }
            :host([orientation="horizontal"]) {
                flex-direction: row;
                align-items: center;
                gap: 20px;
                --fx-linear-gauge-width: 480px;
                --fx-linear-gauge-height: 120px;
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
        `];
	}
	get isHorizontal() {
		return this.orientation === "horizontal";
	}
	get geometry() {
		let e = N.shellThickBase, t = this.layoutWidth > 0 && this.layoutHeight > 0 ? this.isHorizontal ? e * (this.layoutWidth / this.layoutHeight) : e * (this.layoutHeight / this.layoutWidth) : N.shellLengthBase, n = N.insetBase;
		return {
			shellThick: e,
			shellLength: t,
			inset: n,
			wellLength: Math.max(t - n * 2, 0),
			viewCross: e
		};
	}
	getScaleValueOrigin() {
		return re(this, "scale", this.valueOrigin);
	}
	get wellThick() {
		let e = N.wellThickBase, t = String(this.trackThickness).trim();
		switch (t) {
			case "small": return e * .7;
			case "medium": return e * .85;
			case "large": return e;
			default: return /^\d+$/.test(t) ? parseInt(t, 10) : e;
		}
	}
	firstUpdated() {
		let e = this.shadowRoot?.querySelector(".body");
		!e || typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver((e) => {
			let t = e[0]?.contentRect;
			if (!t) return;
			let n = t.width, r = t.height;
			n === this.layoutWidth && r === this.layoutHeight || (this.layoutWidth = n, this.layoutHeight = r);
		}), this.resizeObserver.observe(e));
	}
	disconnectedCallback() {
		this.resizeObserver?.disconnect(), this.resizeObserver = void 0, super.disconnectedCallback();
	}
	renderDefs() {
		let { guid: e, isHorizontal: t } = this, { wellLength: n, inset: r } = this.geometry, a = r + n, o = v(t ? "horizontal" : "vertical", this.getScaleValueOrigin()), s = i`
            <stop offset="0%" stop-color="var(--fx-linear-gauge-gradient-start, #0066ff)"/>
            <stop offset="50%" stop-color="var(--fx-linear-gauge-gradient-middle, #ffeb3b)"/>
            <stop offset="100%" stop-color="var(--fx-linear-gauge-gradient-end, #f44336)"/>
        `, c = i`
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
            <stop offset="48%" stop-color="#ffffff" stop-opacity="0.2"/>
            <stop offset="52%" stop-color="#000000" stop-opacity="0.05"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.15"/>
        `, l = o ? a : r, u = o ? r : a, d = o ? r : a, f = o ? a : r, p = i`
            <filter id="${e}-inset-shadow" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
                <feOffset in="SourceAlpha" dx="0" dy="1.5" result="offset"></feOffset>
                <feGaussianBlur in="offset" stdDeviation="2.2" result="blurred"></feGaussianBlur>
                <feComposite operator="out" in="SourceAlpha" in2="blurred" result="inverse"></feComposite>
                <feFlood flood-color="#000000" flood-opacity="var(--fx-linear-gauge-shadow-opacity)" result="shadowColor"></feFlood>
                <feComposite operator="in" in="shadowColor" in2="inverse" result="shadow"></feComposite>
                <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite>
            </filter>
        `;
		return t ? i`
                    <defs>
                        <linearGradient id="${e}-grad" x1="${l}" y1="0" x2="${u}" y2="0" gradientUnits="userSpaceOnUse">
                            ${s}
                        </linearGradient>
                        <linearGradient id="${e}-shine" x1="0" y1="0" x2="0" y2="1">
                            ${c}
                        </linearGradient>
                        ${p}
                    </defs>
                ` : i`
                    <defs>
                        <linearGradient id="${e}-grad" x1="0" y1="${d}" x2="0" y2="${f}" gradientUnits="userSpaceOnUse">
                            ${s}
                        </linearGradient>
                        <linearGradient id="${e}-shine" x1="0" y1="0" x2="1" y2="0">
                            ${c}
                        </linearGradient>
                        ${p}
                    </defs>
                `;
	}
	renderVerticalTube() {
		let { guid: e, geometry: { shellLength: t, wellLength: r, inset: i, shellThick: a, viewCross: o }, wellThick: s, isRoundedShell: c, isRoundedTrack: l, progress: u } = this, d = (o - a) / 2, f = (o - s) / 2, p = c ? a * .16 : 0, m = l ? 12 / 40 * s : 0, h = v("vertical", this.getScaleValueOrigin()), g = Math.max(u * r, 0), _ = h ? i : i + r - g;
		return n`
            <svg viewBox="0 0 ${o} ${t}">
                ${this.renderDefs()}
                <defs>
                    <clipPath id="${e}-clip">
                        <rect
                            x="${f}"
                            y="${_}"
                            width="${s}"
                            height="${g}"
                            style="transition: ${"var(--fx-linear-gauge-transition, none)"};"
                        />
                    </clipPath>
                </defs>

                <rect
                    x="${d}" y="0" width="${a}" height="${t}" rx="${p}"
                    fill="var(--fx-linear-gauge-shell-fill, #f8fafc)"
                    stroke="var(--fx-linear-gauge-shell-stroke, #e2e8f0)"
                    stroke-width="2"
                    vector-effect="non-scaling-stroke"
                />
                <rect
                    x="${f}" y="${i}" width="${s}" height="${r}" rx="${m}"
                    fill="var(--fx-linear-gauge-track-color, #e2e8f0)"
                    filter="url(#${e}-inset-shadow)"
                />
                <g clip-path="url(#${e}-clip)">
                    <rect
                        x="${f}" y="${i}" width="${s}" height="${r}" rx="${m}"
                        fill="url(#${e}-grad)"
                    />
                    <rect
                        x="${f + 1}" y="${i}" width="${Math.max(s - 2, 0)}" height="${r}" rx="${m}"
                        fill="url(#${e}-shine)"
                        opacity="0.65"
                    />
                </g>
            </svg>
        `;
	}
	renderHorizontalTube() {
		let { guid: e, geometry: { shellLength: t, wellLength: r, inset: i, shellThick: a, viewCross: o }, wellThick: s, isRoundedShell: c, isRoundedTrack: l, progress: u } = this, d = (o - a) / 2, f = (o - s) / 2, p = c ? a * .16 : 0, m = l ? 12 / 40 * s : 0, h = v("horizontal", this.getScaleValueOrigin()), g = Math.max(u * r, 0), _ = h ? i + r - g : i;
		return n`
            <svg viewBox="0 0 ${t} ${o}">
                ${this.renderDefs()}
                <defs>
                    <clipPath id="${e}-clip">
                        <rect
                            x="${_}"
                            y="${f}"
                            width="${g}"
                            height="${s}"
                            style="transition: ${"var(--fx-linear-gauge-transition, none)"};"
                        />
                    </clipPath>
                </defs>

                <rect
                    x="0" y="${d}" width="${t}" height="${a}" rx="${p}"
                    fill="var(--fx-linear-gauge-shell-fill, #f8fafc)"
                    stroke="var(--fx-linear-gauge-shell-stroke, #e2e8f0)"
                    stroke-width="2"
                    vector-effect="non-scaling-stroke"
                />
                <rect
                    x="${i}" y="${f}" width="${r}" height="${s}" rx="${m}"
                    fill="var(--fx-linear-gauge-track-color, #e2e8f0)"
                    filter="url(#${e}-inset-shadow)"
                />
                <g clip-path="url(#${e}-clip)">
                    <rect
                        x="${i}" y="${f}" width="${r}" height="${s}" rx="${m}"
                        fill="url(#${e}-grad)"
                    />
                    <rect
                        x="${i}" y="${f + 1}" width="${r}" height="${Math.max(s - 2, 0)}" rx="${m}"
                        fill="url(#${e}-shine)"
                        opacity="0.65"
                    />
                </g>
            </svg>
        `;
	}
	get scaleOffsets() {
		let { isHorizontal: e, geometry: { inset: t, wellLength: n, shellLength: r, viewCross: i } } = this, a = e ? "horizontal" : "vertical", { startOffset: o, endOffset: s } = ne(a, this.getScaleValueOrigin(), n, 0);
		return {
			orientation: a,
			start: t + o,
			end: t + s,
			viewBoxWidth: e ? r : i,
			viewBoxHeight: e ? i : r
		};
	}
	renderScale() {
		let { scaleOffsets: { orientation: e, start: t, end: r, viewBoxWidth: i, viewBoxHeight: a } } = this;
		return n`
            <slot name="scale" @slotchange=${this.onScaleSlotChange}>
                <fx-linear-scale
                    .value=${this.value}
                    .min=${this.min}
                    .max=${this.max}
                    .count=${this.count}
                    .subDivisions=${this.subDivisions}
                    .side=${this.ticksSide}
                    .showLabels=${this.showLabels}
                    .orientation=${e}
                    .valueOrigin=${this.valueOrigin}
                    .startOffset=${t}
                    .endOffset=${r}
                    .viewBoxWidth=${i}
                    .viewBoxHeight=${a}
                    .trackThickness=${this.wellThick}
                    .caption=${this.caption}
                    .captionOffset=${15}
                    .spacing=${this.spacing}
                    ?show-connecting-line=${!0}
                ></fx-linear-scale>
            </slot>
        `;
	}
	renderDisplay() {
		return this.showValue ? n`
                    <div class="display">
                        <slot name="display" @slotchange=${this.updateSlottedDisplay}>
                            <fx-measure-value-display
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .unit=${this.unit}
                                .label=${this.label}
                                .align=${this.isHorizontal ? "left" : "center"}
                            ></fx-measure-value-display>
                        </slot>
                    </div>
                ` : n``;
	}
	render() {
		return n`
            <div class="body">
                ${this.isHorizontal ? this.renderHorizontalTube() : this.renderVerticalTube()}
                <div class="scale">${this.renderScale()}</div>
            </div>
            ${this.renderDisplay()}
        `;
	}
	updated(e) {
		super.updated(e), (e.has("value") || e.has("min") || e.has("max") || e.has("unit") || e.has("label")) && this.updateSlottedDisplay(), (e.has("value") || e.has("min") || e.has("max") || e.has("orientation") || e.has("valueOrigin") || e.has("trackThickness") || e.has("showLabels") || e.has("caption") || e.has("theme") || e.has("spacing") || e.has("layoutWidth") || e.has("layoutHeight")) && this.updateSlottedScale();
	}
	updateSlottedScale() {
		let e = this.shadowRoot?.querySelector("slot[name=\"scale\"]");
		if (!e) return;
		let t = e.assignedElements();
		if (t.length) {
			let { caption: e, max: n, min: r, scaleOffsets: { orientation: i, start: a, end: o, viewBoxWidth: s, viewBoxHeight: c }, showLabels: l, spacing: u, value: d, wellThick: f } = this;
			for (let p of t) "orientation" in p && (p.orientation = i), "startOffset" in p && (p.startOffset = a), "endOffset" in p && (p.endOffset = o), "viewBoxWidth" in p && (p.viewBoxWidth = s), "viewBoxHeight" in p && (p.viewBoxHeight = c), "trackThickness" in p && !p.hasAttribute("track-thickness") && (p.trackThickness = f), "spacing" in p && !p.hasAttribute("spacing") && (p.spacing = u), "captionOffset" in p && !p.hasAttribute("caption-offset") && (p.captionOffset = 15), "showLabels" in p && _(p.showLabels) && (p.showLabels = l), "value" in p && _(p.value) && (p.value = d), "min" in p && _(p.min) && (p.min = r), "max" in p && _(p.max) && (p.max = n), "caption" in p && !p.caption && (p.caption = e);
		}
	}
	updateSlottedDisplay() {
		let e = (this.shadowRoot?.querySelector("slot[name=\"display\"]"))?.assignedElements()[0];
		e && ("value" in e && (e.value = this.value), "min" in e && (e.min = this.min), "max" in e && (e.max = this.max), "unit" in e && (e.unit = this.unit), "label" in e && (e.label = this.label));
	}
};
l([o({
	type: Boolean,
	attribute: "show-labels",
	reflect: !0
})], P.prototype, "showLabels", void 0), l([o({
	type: String,
	attribute: "ticks-side"
})], P.prototype, "ticksSide", void 0), l([o({ type: Number })], P.prototype, "count", void 0), l([o({
	type: Number,
	attribute: "sub-divisions"
})], P.prototype, "subDivisions", void 0), l([o({
	type: String,
	reflect: !0
})], P.prototype, "orientation", void 0), l([o({
	type: String,
	attribute: "track-thickness"
})], P.prototype, "trackThickness", void 0), l([o({
	type: String,
	attribute: "value-origin",
	reflect: !0
})], P.prototype, "valueOrigin", void 0), l([o({ type: String })], P.prototype, "caption", void 0), l([o({
	type: String,
	reflect: !0
})], P.prototype, "theme", void 0), l([o({ type: Number })], P.prototype, "spacing", void 0), l([o({
	type: Boolean,
	attribute: "is-rounded-track",
	reflect: !0
})], P.prototype, "isRoundedTrack", void 0), l([o({
	type: Boolean,
	attribute: "is-rounded-shell",
	reflect: !0
})], P.prototype, "isRoundedShell", void 0), l([s()], P.prototype, "layoutWidth", void 0), l([s()], P.prototype, "layoutHeight", void 0), P = N = l([a("fx-linear-gauge")], P);
//#endregion
//#region src/stories/measure/FxRadialSimpleScale.ts
var F = class extends S {
	constructor(...e) {
		super(...e), this.showLabels = !1, this.outerRadius = 39.5, this.innerRadius = 34.5, this.textRadius = 31, this.labelFontSize = 4;
	}
	*renderTicks() {
		let { count: e, startAngle: t, arcLength: n, min: r, max: a, showLabels: o, isFullCircle: s } = this, { outerRadius: c, innerRadius: l, textRadius: u, labelFontSize: d } = this, f = s ? e - 1 : e;
		for (let s = 0; s <= f; s++) {
			let f = (t + s / e * n) * Math.PI / 180;
			if (yield i`
                <line
                    x1="${50 + c * Math.sin(f)}" y1="${50 - c * Math.cos(f)}"
                    x2="${50 + l * Math.sin(f)}" y2="${50 - l * Math.cos(f)}"
                    stroke="var(--fx-radial-scale-color, #94a3b8)"
                    stroke-width="1"
                    stroke-linecap="round"
                />
            `, o) {
				let t = a - r, n = r + s / e * t;
				yield i`
                    <text
                        x="${50 + u * Math.sin(f)}"
                        y="${50 - u * Math.cos(f)}"
                        fill="var(--fx-radial-scale-label-color, #cbd5e1)"
                        font-size="${d}"
                        font-family="var(--fx-font-family, sans-serif)"
                        font-weight="600"
                        text-anchor="middle"
                        dominant-baseline="central"
                    >
                        ${this.resolveLabel(n)}
                    </text>
                `;
			}
		}
	}
	render() {
		return n`
            <svg viewBox="-4 -4 108 108">
                ${this.renderTicks()}
            </svg>
        `;
	}
};
l([o({
	type: Boolean,
	attribute: "show-labels"
})], F.prototype, "showLabels", void 0), l([o({
	type: Number,
	attribute: "outer-radius"
})], F.prototype, "outerRadius", void 0), l([o({
	type: Number,
	attribute: "inner-radius"
})], F.prototype, "innerRadius", void 0), l([o({
	type: Number,
	attribute: "text-radius"
})], F.prototype, "textRadius", void 0), l([o({
	type: Number,
	attribute: "label-font-size"
})], F.prototype, "labelFontSize", void 0), F = l([a("fx-radial-simple-scale")], F);
//#endregion
//#region src/stories/measure/FxKnob.ts
var I = class extends d(c) {
	constructor(...e) {
		super(...e), this.angle = 0, this.radius = 40;
	}
	static {
		this.styles = [m, t`
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
        `];
	}
	render() {
		let { radius: e, angle: t } = this, r = e * 2, i = e, a = e;
		return n`
            <svg viewBox="0 0 ${r} ${r}" aria-hidden="true">
                <circle class="knob" cx="${i}" cy="${a}" r="${e}" />
                <g
                    class="pointer-group"
                    style="transform-origin: ${i}px ${a}px; transform: rotate(${t}deg);"
                >
                    <line
                        class="pointer"
                        x1="${i}"
                        y1="${a - e + 10}"
                        x2="${i}"
                        y2="${a - e + 2}"
                    />
                </g>
            </svg>
        `;
	}
};
l([o({ type: Number })], I.prototype, "angle", void 0), I = l([a("fx-knob")], I);
//#endregion
//#region src/stories/measure/FxPotentiometer.ts
var L = class extends d(u) {
	constructor(...e) {
		super(...e), this.showValue = !1, this.startAngle = -135, this.arcLength = 270, this.showLabels = !0, this.ticks = 0, this.snapToTicks = !1, this.isDragging = !1, this.hasCustomKnob = !1, this.hasCustomScale = !1, this.handleMouseMove = (e) => {
			this.isDragging && this.updateValueFromCoordinates(e);
		}, this.handleTouchMove = (e) => {
			this.isDragging && (e.preventDefault(), this.updateValueFromCoordinates(e));
		}, this.handleMouseUp = () => {
			this.endDrag();
		}, this.handleTouchEnd = () => {
			this.endDrag();
		};
	}
	static {
		this.styles = [m, t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-potentiometer-size: 220px;
                --fx-potentiometer-theme-color: #3b82f6;
                --fx-potentiometer-track-color: #0f172a;
                --fx-potentiometer-fill-color: linear-gradient(135deg, #3b82f6, #6366f1);
                --fx-potentiometer-bezel-fill: #1e293b;
                --fx-potentiometer-bezel-stroke: #334155;
                --fx-knob: #1e293b;
                --fx-knob-ring: #334155;
                --fx-knob-pointer: var(--fx-potentiometer-theme-color, #3b82f6);
                --fx-radial-scale-color: #475569;
                --fx-radial-scale-label-color: #64748b;
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

            .info-wrap fx-measure-value-display,
            .info-wrap ::slotted(fx-measure-value-display),
            .info-wrap ::slotted([slot="display"]) {
                --fx-measure-value-display-margin-top: 0.1rem;
            }
        `];
	}
	handleMouseDown(e) {
		this.startDrag(e);
	}
	handleTouchStart(e) {
		this.startDrag(e);
	}
	startDrag(e) {
		this.isDragging = !0, this.updateValueFromCoordinates(e), window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp), window.addEventListener("touchmove", this.handleTouchMove, { passive: !1 }), window.addEventListener("touchend", this.handleTouchEnd);
	}
	endDrag() {
		this.isDragging && (this.isDragging = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("mouseup", this.handleMouseUp), window.removeEventListener("touchmove", this.handleTouchMove), window.removeEventListener("touchend", this.handleTouchEnd), this.dispatchChangeEvent());
	}
	updateValueFromCoordinates(e) {
		let t = this.shadowRoot?.querySelector("svg.dial");
		if (!t) return;
		let n = t.getBoundingClientRect(), r = "touches" in e ? e.touches[0].clientX : e.clientX, i = "touches" in e ? e.touches[0].clientY : e.clientY, a = n.left + n.width / 2, o = n.top + n.height / 2, s = r - a, c = i - o, l = Math.atan2(c, s) * 180 / Math.PI + 90;
		l < -180 && (l += 360), l > 180 && (l -= 360);
		let { min: u, max: d, startAngle: f, arcLength: p } = this, m = l - f;
		for (; m < 0;) m += 360;
		for (; m >= 360;) m -= 360;
		let h = 0;
		if (m <= p) h = m / p;
		else {
			let e = p + (360 - p) / 2;
			h = +(m < e);
		}
		let g = u + h * (d - u);
		if (this.ticks > 1 && this.snapToTicks) {
			let e = (d - u) / (this.ticks - 1);
			g = u + Math.round((g - u) / e) * e;
		}
		this.value = Math.round(g * 100) / 100, this.dispatchEvent(new CustomEvent("input", {
			detail: { value: this.value },
			bubbles: !0,
			composed: !0
		}));
	}
	dispatchChangeEvent() {
		this.dispatchEvent(new CustomEvent("change", {
			detail: { value: this.value },
			bubbles: !0,
			composed: !0
		}));
	}
	updated(e) {
		super.updated(e), (e.has("value") || e.has("min") || e.has("max") || e.has("startAngle") || e.has("arcLength") || e.has("isDragging") || e.has("isAnimated")) && this.updateSlottedKnob(), (e.has("value") || e.has("min") || e.has("max") || e.has("startAngle") || e.has("arcLength") || e.has("showLabels")) && this.updateSlottedScale(), (e.has("value") || e.has("min") || e.has("max") || e.has("unit") || e.has("label")) && this.updateSlottedDisplay();
	}
	updateSlottedDisplay() {
		let e = this.shadowRoot?.querySelector("slot[name=\"display\"]");
		if (e) {
			let t = e.assignedElements()[0];
			t && ("value" in t && (t.value = this.value), "min" in t && (t.min = this.min), "max" in t && (t.max = this.max), "unit" in t && (t.unit = this.unit), "label" in t && (t.label = this.label));
		}
	}
	updateSlottedKnob() {
		let e = this.shadowRoot?.querySelector("slot[name=\"knob\"]");
		if (e) {
			let t = e.assignedElements();
			this.hasCustomKnob = t.length > 0;
			let n = t[0];
			if (n) {
				let e = this.startAngle + this.progress * this.arcLength;
				"angle" in n && (n.angle = e), "value" in n && (n.value = this.value), "progress" in n && (n.progress = this.progress), "isDragging" in n && (n.isDragging = this.isDragging), f(n) && (n.isAnimated = this.isAnimated);
			}
		}
	}
	updateSlottedScale() {
		let e = this.shadowRoot?.querySelector("slot[name=\"scale\"]");
		if (!e) return;
		let t = e.assignedElements();
		this.hasCustomScale = t.length > 0;
		let n = t[0];
		n && ("value" in n && (n.value = this.value), "min" in n && (n.min = this.min), "max" in n && (n.max = this.max), "startAngle" in n && (n.startAngle = this.startAngle), "arcLength" in n && (n.arcLength = this.arcLength), "showLabels" in n && (n.showLabels = this.showLabels), "outerRadius" in n && (n.outerRadius = 38), "innerRadius" in n && (n.innerRadius = 35), "majorInnerRadius" in n && (n.majorInnerRadius = 35), "minorInnerRadius" in n && (n.minorInnerRadius = 36.5), "textRadius" in n && (n.textRadius = 30.5), "labelFontSize" in n && (n.labelFontSize = 5));
	}
	describeArc(e, t, n, r, i) {
		let a = (e) => e * Math.PI / 180, o = e + n * Math.sin(a(r)), s = t - n * Math.cos(a(r)), c = e + n * Math.sin(a(i)), l = t - n * Math.cos(a(i));
		return `M ${o} ${s} A ${n} ${n} 0 ${+(i - r > 180)} 1 ${c} ${l}`;
	}
	render() {
		let { startAngle: e, arcLength: t, progress: r, isDragging: i, ticks: a, hasCustomKnob: o, hasCustomScale: s } = this, c = e + r * t, l = e + t, u = a > 1, d = u || s, f = d ? 43.5 : 39, p = d ? 4.5 : 5, m = d ? 36 : 54, h = this.describeArc(50, 50, f, e, l), g = 2 * Math.PI * f * (t / 360), _ = g * (1 - r);
		return n`
            <div class="potentiometer-wrap">
                <svg 
                    class="dial" 
                    viewBox="-4 -4 108 108"
                    @mousedown="${this.handleMouseDown}"
                    @touchstart="${this.handleTouchStart}"
                >
                    <defs>
                        <linearGradient id="fx-pot-fill-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="var(--fx-potentiometer-theme-color, #3b82f6)" />
                            <stop offset="100%" stop-color="#8b5cf6" />
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
                        class="track-fill-path ${i ? "dragging" : ""}"
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
                    class="knob-host ${o ? "knob-host--custom" : ""}"
                    style="${o ? "" : `width: ${m}%; height: ${m}%;`}"
                >
                    <slot name="knob" @slotchange="${this.updateSlottedKnob}">
                        <fx-knob
                            .angle=${c}
                            .isAnimated=${this.isAnimated && !i}
                        ></fx-knob>
                    </slot>
                </div>

                <div class="overlay">
                    <slot name="scale" @slotchange=${this.updateSlottedScale}>
                        ${u ? n`
                            <fx-radial-simple-scale
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .count=${a - 1}
                                .startAngle=${e}
                                .arcLength=${t}
                                .showLabels=${this.showLabels}
                                .outerRadius=${38}
                                .innerRadius=${35}
                                .textRadius=${30.5}
                                .labelFontSize=${5}
                            ></fx-radial-simple-scale>
                        ` : ""}
                    </slot>
                </div>
            </div>

            ${this.showValue ? n`
                <div class="info-wrap">
                    <slot name="display" @slotchange="${this.updateSlottedDisplay}">
                        <fx-measure-value-display
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .unit=${this.unit}
                            .label=${this.label}
                        ></fx-measure-value-display>
                    </slot>
                </div>
            ` : ""}
        `;
	}
};
l([o({
	type: Boolean,
	attribute: "show-value",
	reflect: !0
})], L.prototype, "showValue", void 0), l([o({
	type: Number,
	attribute: "start-angle",
	reflect: !0
})], L.prototype, "startAngle", void 0), l([o({
	type: Number,
	attribute: "arc-length",
	reflect: !0
})], L.prototype, "arcLength", void 0), l([o({
	type: Boolean,
	attribute: "show-labels",
	reflect: !0
})], L.prototype, "showLabels", void 0), l([o({ type: Number })], L.prototype, "ticks", void 0), l([o({
	type: Boolean,
	attribute: "snap-to-ticks",
	reflect: !0
})], L.prototype, "snapToTicks", void 0), l([s()], L.prototype, "isDragging", void 0), l([s()], L.prototype, "hasCustomKnob", void 0), l([s()], L.prototype, "hasCustomScale", void 0), L = l([a("fx-potentiometer")], L);
//#endregion
//#region src/stories/measure/FxPotentiometerKnobRect.ts
var R = class extends d(c) {
	constructor(...e) {
		super(...e), this.angle = 0, this.value = 0, this.progress = 0, this.isDragging = !1;
	}
	static {
		this.styles = t`
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
        .knob-rect {
            transition: none;
        }
        :host([is-animated]) .knob-rect:not([data-dragging="true"]) {
            transition: transform 0.3s cubic-bezier(0.1, 1, 0.1, 1);
        }
    `;
	}
	render() {
		return n`
            <svg viewBox="-4 -4 108 108">
                <defs>

                    <radialGradient id="fx-rect-knob-body" cx="30%" cy="25%" r="75%">
                        <stop offset="0%" stop-color="#4b5563"/>
                        <stop offset="15%" stop-color="#2d3748"/>
                        <stop offset="70%" stop-color="#1a202c"/>
                        <stop offset="100%" stop-color="#0f141d"/>
                    </radialGradient>

                    <linearGradient id="fx-rect-bevel-light" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#718096"/>
                        <stop offset="100%" stop-color="#1a202c"/>
                    </linearGradient>

                    <radialGradient id="fx-rect-shadow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="rgba(0, 0, 0, 0.4)"/>
                        <stop offset="80%" stop-color="rgba(0, 0, 0, 0.15)"/>
                        <stop offset="100%" stop-color="rgba(0, 0, 0, 0)"/>
                    </radialGradient>

                    <radialGradient id="fx-screw-grad" cx="40%" cy="40%" r="60%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="45%" stop-color="#cbd5e0"/>
                        <stop offset="80%" stop-color="#718096"/>
                        <stop offset="100%" stop-color="#4a5568"/>
                    </radialGradient>
                </defs>

                <g
                    class="knob-rect"
                    data-dragging="${this.isDragging}"
                    style="transform: translate(${50}px, ${50}px) rotate(${this.angle}deg);"
                >

                    <g transform="translate(1.5, 2.5)">

                        <rect x="${-14 / 2}" y="${-6}" width="${14}" height="${26}" rx="${3}" fill="url(#fx-rect-shadow)" opacity="0.8"/>

                        <polygon points="0,${-28} ${-5},${-2} ${14 / 2 - 2},${-2}" fill="url(#fx-rect-shadow)" opacity="0.6"/>
                    </g>

                    <polygon
                        points="0,${-28.8} ${-14 / 2 - .8},${-2} ${-14 / 2 - .8},${20.8} ${7.8},${20.8} ${7.8},${-2}"
                        fill="url(#fx-rect-bevel-light)"
                    />

                    <polygon
                        points="0,${-28} ${-14 / 2},${-2} ${14 / 2},${-2}"
                        fill="url(#fx-rect-knob-body)"
                    />

                    <rect
                        x="${-14 / 2}"
                        y="${-6}"
                        width="${14}"
                        height="${26}"
                        rx="${3}"
                        fill="url(#fx-rect-knob-body)"
                    />

                    <polygon
                        points="0,${-27} ${-5.5},${-2} 0,${-2}"
                        fill="rgba(255, 255, 255, 0.08)"
                    />

                    <polygon
                        points="0,${-27} ${14 / 2 - 1.5},${-2} 0,${-2}"
                        fill="rgba(0, 0, 0, 0.2)"
                    />

                    <path
                        d="M ${-5.8} ${-4} L ${-5.8} ${18}"
                        stroke="rgba(255, 255, 255, 0.12)"
                        stroke-width="0.8"
                        stroke-linecap="round"
                    />

                    <line
                        x1="0"
                        y1="1"
                        x2="0"
                        y2="${-26.5}"
                        stroke="#ffffff"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.4))"
                    />

                    <g transform="translate(0, 10)">

                        <circle cx="0" cy="0" r="3.2" fill="#0f141d" stroke="#4a5568" stroke-width="0.5"/>

                        <circle cx="0" cy="0" r="2.4" fill="url(#fx-screw-grad)" stroke="#1a202c" stroke-width="0.3"/>

                        <line x1="-1.5" y1="-0.8" x2="1.5" y2="0.8" stroke="#2d3748" stroke-width="0.6" stroke-linecap="round"/>
                        <line x1="-1.5" y1="-0.8" x2="1.5" y2="0.8" stroke="#ffffff" stroke-width="0.3" stroke-linecap="round" opacity="0.6"/>
                    </g>
                </g>
            </svg>
        `;
	}
};
l([o({ type: Number })], R.prototype, "angle", void 0), l([o({ type: Number })], R.prototype, "value", void 0), l([o({ type: Number })], R.prototype, "progress", void 0), l([o({
	type: Boolean,
	attribute: "is-dragging",
	reflect: !0
})], R.prototype, "isDragging", void 0), R = l([a("fx-potentiometer-knob-rect")], R);
//#endregion
//#region src/stories/measure/FxPushButton.ts
var z = class extends d(c) {
	constructor(...e) {
		super(...e), this.label = "", this.labelPosition = "plate", this.type = "momentary", this.isActive = !1, this.disabled = !1, this.color = "#ef4444", this.shape = "round", this.hasRoundedCorners = !0, this.isPressedDown = !1, this.hasIcon = !1, this.handleGlobalRelease = () => {
			this.disabled || this.type === "momentary" && this.isPressedDown && (this.isPressedDown = !1, this.isActive = !1, this.dispatchChangeEvent(), this.dispatchEvent(new CustomEvent("release", {
				bubbles: !0,
				composed: !0
			})));
		};
	}
	connectedCallback() {
		super.connectedCallback(), window.addEventListener("mouseup", this.handleGlobalRelease), window.addEventListener("touchend", this.handleGlobalRelease);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.removeEventListener("mouseup", this.handleGlobalRelease), window.removeEventListener("touchend", this.handleGlobalRelease);
	}
	handleSlotChange(e) {
		let t = e.target.assignedNodes({ flatten: !0 }).filter((e) => !!(e.nodeType === Node.ELEMENT_NODE || e.nodeType === Node.TEXT_NODE && e.textContent?.trim()));
		this.hasIcon = t.length > 0;
	}
	handlePress(e) {
		this.disabled || (e.preventDefault(), this.isPressedDown = !0, this.type === "momentary" ? (this.isActive = !0, this.dispatchChangeEvent(), this.dispatchEvent(new CustomEvent("press", {
			bubbles: !0,
			composed: !0
		}))) : (this.isActive = !this.isActive, this.dispatchChangeEvent(), this.dispatchEvent(new CustomEvent("press", {
			detail: {
				active: this.isActive,
				isActive: this.isActive
			},
			bubbles: !0,
			composed: !0
		}))));
	}
	handleRelease() {
		this.disabled || (this.type === "momentary" && this.isPressedDown ? (this.isPressedDown = !1, this.isActive = !1, this.dispatchChangeEvent(), this.dispatchEvent(new CustomEvent("release", {
			bubbles: !0,
			composed: !0
		}))) : this.isPressedDown = !1);
	}
	handleKeyDown(e) {
		this.disabled || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.isPressedDown || this.handlePress(e));
	}
	handleKeyUp(e) {
		this.disabled || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.handleRelease());
	}
	dispatchChangeEvent() {
		this.dispatchEvent(new CustomEvent("change", {
			detail: {
				active: this.isActive,
				isActive: this.isActive,
				type: this.type
			},
			bubbles: !0,
			composed: !0
		}));
	}
	static {
		this.styles = [m, t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                vertical-align: middle;
            }

            :host([disabled]) {
                opacity: 0.5;
                cursor: not-allowed;
            }

            :host([disabled]) .bezel-glossy {
                pointer-events: none;
            }

            .label-plate {
                color: var(--fx-gauge-text-secondary, #9ca3af);
                font-size: 0.7rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin-bottom: 12px;
                text-align: center;
                box-sizing: border-box;
            }

            :host([shape="round"]) .bezel-glossy {
                border-radius: 50%;
                width: 48px;
                height: 48px;
            }

            :host([shape="rect"]) .bezel-glossy {
                border-radius: 18px;
                min-width: 118px;
                height: 48px;
            }

            :host([shape="square"]) .bezel-glossy {
                border-radius: 12px;
                width: 48px;
                height: 48px;
            }

            :host([shape="pill"]) .bezel-glossy {
                border-radius: 9999px;
                min-width: 118px;
                height: 48px;
            }

            :host(:not([has-rounded-corners])) .bezel-glossy {
                border-radius: 2px !important;
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

                background-color: var(--button-color, #ef4444);
                border: 1px solid rgba(0, 0, 0, 0.2);
                overflow: hidden;
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
                font-size: 0.75rem;
                font-weight: 800;
                color: #ffffff;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                text-align: center;
                padding: 0 4px;
                pointer-events: none;
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }

            .cap-glossy .internal-label {
                text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
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

            .status-indicator[hidden] {
                display: none !important;
            }

            ::slotted([slot="icon"]) {
                color: rgba(0, 0, 0, 0.35);
                font-size: 1.1rem;
                line-height: 1;
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                transition: transform 0.1s ease, filter 0.15s ease;
            }

            :host([is-active]) ::slotted([slot="icon"]) {
                transform: scale(0.95);
            }
        `];
	}
	get indicatorContent() {
		return this.hasIcon ? n`
                <div class="status-indicator">
                    <slot name="icon" @slotchange="${this.handleSlotChange}"></slot>
                </div>
            ` : n`<slot name="icon" @slotchange="${this.handleSlotChange}"></slot>`;
	}
	render() {
		let { indicatorContent: e } = this, t = this.color, r = this.label && this.labelPosition === "inside" ? n`
            <div class="internal-label">
                <span>${this.label}</span>
            </div>
        ` : n`
            <div class="internal-label">
                <slot></slot>
            </div>
        `;
		return n`
            ${this.label && this.labelPosition === "plate" ? n`
                <div class="label-plate">${this.label}</div>
            ` : ""}

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
                            style="--button-color: ${t};"
                            role="button"
                            tabindex="0"
                            aria-pressed="${this.isActive}"
                            aria-disabled="${this.disabled}"
                            @keydown="${this.handleKeyDown}"
                            @keyup="${this.handleKeyUp}"
                        >
                            ${e}
                            ${r}
                        </div>
                    </div>
                </div>
            `}
        `;
	}
};
l([o({ type: String })], z.prototype, "label", void 0), l([o({
	type: String,
	attribute: "label-position"
})], z.prototype, "labelPosition", void 0), l([o({ type: String })], z.prototype, "type", void 0), l([o({
	type: Boolean,
	attribute: "is-active",
	reflect: !0
})], z.prototype, "isActive", void 0), l([o({
	type: Boolean,
	reflect: !0
})], z.prototype, "disabled", void 0), l([o({ type: String })], z.prototype, "color", void 0), l([o({
	type: String,
	reflect: !0
})], z.prototype, "shape", void 0), l([o({
	type: Boolean,
	attribute: "has-rounded-corners",
	reflect: !0
})], z.prototype, "hasRoundedCorners", void 0), l([s()], z.prototype, "isPressedDown", void 0), l([s()], z.prototype, "hasIcon", void 0), z = l([a("fx-push-button")], z);
//#endregion
//#region src/stories/measure/FxRotarySelectorSector.ts
var B = class extends e {
	constructor(...e) {
		super(...e), this.value = "", this.label = "", this.color = "", this.textColor = "", this.ranges = [], this.startDeg = 0, this.endDeg = 0;
	}
	connectedCallback() {
		super.connectedCallback(), this.style.display = "none";
	}
	updated() {
		this.dispatchEvent(new CustomEvent("sectorupdate", { bubbles: !0 }));
	}
};
l([o({ reflect: !0 })], B.prototype, "value", void 0), l([o({ reflect: !0 })], B.prototype, "label", void 0), l([o({ reflect: !0 })], B.prototype, "color", void 0), l([o({
	attribute: "text-color",
	reflect: !0
})], B.prototype, "textColor", void 0), l([o({
	type: Array,
	reflect: !0
})], B.prototype, "ranges", void 0), l([o({
	type: Number,
	attribute: "start-deg",
	reflect: !0
})], B.prototype, "startDeg", void 0), l([o({
	type: Number,
	attribute: "end-deg",
	reflect: !0
})], B.prototype, "endDeg", void 0), B = l([a("fx-rotary-selector-sector")], B);
//#endregion
//#region src/stories/measure/FxRotarySelector.ts
var V = 150, H = 150, ge = 130;
function _e(e) {
	return e * Math.PI / 180;
}
function U(e, t) {
	let n = _e(e - 90);
	return {
		x: V + t * Math.cos(n),
		y: H + t * Math.sin(n)
	};
}
function ve(e, t, n, r) {
	let i = t;
	i <= e && (i += 360);
	let a = U(e, n), o = U(i, n), s = U(i, r), c = U(e, r), l = +(i - e > 180);
	return `M ${a.x} ${a.y} A ${n} ${n} 0 ${l} 1 ${o.x} ${o.y} L ${s.x} ${s.y} A ${r} ${r} 0 ${l} 0 ${c.x} ${c.y} Z`;
}
function ye(e) {
	let t = e.endDeg;
	t <= e.startDeg && (t += 360);
	let n = e.startDeg + (t - e.startDeg) / 2;
	return n >= 360 && (n -= 360), n;
}
function be(e) {
	let t = e.endDeg;
	return t <= e.startDeg && (t += 360), t - e.startDeg;
}
function xe(e, t) {
	let n = be(e), r = e.ranges.length === 1 ? .5 : t / (e.ranges.length - 1), i = e.startDeg + r * n * .85 + n * .075;
	return i >= 360 && (i -= 360), i;
}
function Se(e, t) {
	for (let n of e) {
		let e = n.endDeg;
		e <= n.startDeg && (e += 360);
		let r = t;
		if (n.startDeg > 180 && r < 90 && (r += 360), r >= n.startDeg && r < e) return n;
	}
	return null;
}
var W = class extends e {
	constructor(...e) {
		super(...e), this.sectors = [], this.selectedSector = "", this.selectedRange = "", this.slottedSectors = [], this.needleAngle = 10, this.raf = null, this.animAngle = 10, this.isDragging = !1, this.modeLabels = {
			off: "OFF",
			acv: "Voltage AC",
			dcv: "Voltage DC",
			res: "Resistance",
			cap: "Capacitance",
			dca: "Current DC",
			diode: "Diode / hFE"
		};
	}
	static {
		this.styles = t`
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
    `;
	}
	get effectiveSectors() {
		return this.sectors.length > 0 ? this.sectors : this.slottedSectors;
	}
	connectedCallback() {
		super.connectedCallback(), this.addEventListener("sectorupdate", this.onSectorUpdate), this.syncNeedle(!1);
	}
	firstUpdated(e) {
		super.firstUpdated(e), this.collectSlottedSectors();
		let t = this.effectiveSectors;
		if (!this.selectedSector && t.length > 0) {
			let e = t[0];
			this.selectedSector = e.id, this.selectedRange = e.ranges[0] || "", this.syncNeedle(!1);
		}
	}
	updated(e) {
		super.updated(e), (e.has("selectedSector") || e.has("selectedRange") || e.has("sectors") || e.has("slottedSectors")) && this.syncNeedle(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeEventListener("sectorupdate", this.onSectorUpdate), this.raf && cancelAnimationFrame(this.raf);
	}
	onSectorUpdate() {
		this.collectSlottedSectors();
	}
	collectSlottedSectors() {
		let e = this.shadowRoot?.querySelector("slot.sectors");
		if (e && (this.slottedSectors = e.assignedElements().filter((e) => e instanceof B).map((e) => {
			let t = e;
			return {
				id: t.value || t.id,
				label: t.label,
				color: t.color,
				textColor: t.textColor,
				ranges: t.ranges,
				startDeg: t.startDeg,
				endDeg: t.endDeg
			};
		}), !this.selectedSector && this.slottedSectors.length > 0)) {
			let e = this.slottedSectors[0];
			this.selectedSector = e.id, this.selectedRange = e.ranges[0] || "", this.syncNeedle(!1);
		}
	}
	select(e, t) {
		let n = this.effectiveSectors.find((t) => t.id === e);
		n && (this.selectedSector = e, this.selectedRange = t ?? n.ranges[Math.floor((n.ranges.length - 1) / 2)], this.emitChange());
	}
	currentSector() {
		return this.effectiveSectors.find((e) => e.id === this.selectedSector);
	}
	syncNeedle(e) {
		let t = this.currentSector();
		if (!t) return;
		let n = t.ranges.indexOf(this.selectedRange), r = xe(t, n < 0 ? Math.floor((t.ranges.length - 1) / 2) : n);
		e ? this.animateTo(r) : (this.animAngle = r, this.needleAngle = r);
	}
	animateTo(e) {
		this.raf && cancelAnimationFrame(this.raf);
		let t = () => {
			let n = e - this.animAngle;
			if (Math.abs(n) < .3) {
				this.animAngle = e, this.needleAngle = e;
				return;
			}
			this.animAngle += n * .12, this.needleAngle = this.animAngle, this.raf = requestAnimationFrame(t);
		};
		t();
	}
	emitChange() {
		this.dispatchEvent(new CustomEvent("fx-change", {
			detail: {
				sectorId: this.selectedSector,
				range: this.selectedRange
			},
			bubbles: !0,
			composed: !0
		}));
	}
	angleFromPointer(e) {
		let t = this.renderRoot.querySelector("svg");
		if (!t) return 0;
		let n = t.getBoundingClientRect(), r = "touches" in e ? e.touches[0].clientX : e.clientX, i = "touches" in e ? e.touches[0].clientY : e.clientY, a = 300 / n.width, o = 300 / n.height, s = (r - n.left) * a - V, c = (i - n.top) * o - H, l = Math.atan2(c, s) * 180 / Math.PI + 90;
		return l < 0 && (l += 360), l;
	}
	onPointerDown(e) {
		this.isDragging = !0, this.handleAngle(e);
	}
	onPointerMove(e) {
		this.isDragging && this.handleAngle(e);
	}
	onPointerUp() {
		this.isDragging = !1;
	}
	handleAngle(e) {
		let t = this.angleFromPointer(e), n = Se(this.effectiveSectors, t);
		!n || n.id === this.selectedSector || this.select(n.id);
	}
	selectRange(e) {
		this.selectedRange = e, this.syncNeedle(!0), this.emitChange();
	}
	renderKnurling() {
		return Array.from({ length: 36 }, (e, t) => {
			let n = _e(t * 10 - 90);
			return i`<line x1=${V + 44 * Math.cos(n)} y1=${H + 44 * Math.sin(n)} x2=${V + 50 * Math.cos(n)} y2=${H + 50 * Math.sin(n)} stroke="#555" stroke-width="1.2"/>`;
		});
	}
	renderSectors() {
		return this.effectiveSectors.map((e) => {
			let t = e.id === this.selectedSector, n = U(e.startDeg, 64), r = U(e.startDeg, ge);
			return i`
        <path
          d=${ve(e.startDeg, e.endDeg, ge, 64)}
          fill=${e.color}
          opacity=${t ? "1" : "0.55"}
          data-id=${e.id}
          style="transition: opacity 0.2s; cursor: pointer;"
        />
        <line x1=${n.x} y1=${n.y} x2=${r.x} y2=${r.y} stroke="#111" stroke-width="1.5"/>
      `;
		});
	}
	renderTicks() {
		return this.effectiveSectors.flatMap((e) => e.ranges.map((t, n) => {
			let r = be(e), a = e.ranges.length === 1 ? .5 : n / (e.ranges.length - 1), o = e.startDeg + a * r * .85 + r * .075;
			o >= 360 && (o -= 360);
			let s = U(o, ge - 1), c = U(o, 137), l = U(o, 146), u = o > 90 && o < 270 ? o + 180 : o;
			return i`
          <line x1=${s.x} y1=${s.y} x2=${c.x} y2=${c.y} stroke=${e.textColor} stroke-width="1.2"/>
          <text
            x=${l.x} y=${l.y}
            text-anchor="middle" dominant-baseline="middle"
            font-size="8" fill=${e.textColor} font-family="monospace"
            transform=${`rotate(${u},${l.x},${l.y})`}
          >${t}</text>
        `;
		}));
	}
	renderLabels() {
		return this.effectiveSectors.map((e) => {
			let t = ye(e), n = U(t, 194 / 2), r = t > 90 && t < 270 ? t + 180 : t, a = e.id === "off" || e.id === "diode" ? "9" : "11";
			return i`
        <text
          x=${n.x} y=${n.y}
          text-anchor="middle" dominant-baseline="middle"
          font-size=${a} font-weight="600"
          fill=${e.textColor} font-family="monospace"
          transform=${`rotate(${r},${n.x},${n.y})`}
        >${e.label}</text>
      `;
		});
	}
	renderNeedle() {
		let e = U(this.needleAngle, 46);
		return i`
      <line x1=${V} y1=${H} x2=${e.x} y2=${e.y} stroke="#e8e8e8" stroke-width="3" stroke-linecap="round"/>
      <circle cx=${V} cy=${H} r="7" fill="#555"/>
      <circle cx=${V} cy=${H} r="4" fill="#888"/>
    `;
	}
	render() {
		let e = this.currentSector(), t = e ? this.modeLabels[e.id] ?? e.id : "", r = e?.id === "off" ? "— OFF —" : this.selectedRange;
		return n`
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

                ${e && e.ranges.length > 1 ? n`
                          <div class="ranges">
                              ${e.ranges.map((e) => n`
                                      <button
                                          class=${e === this.selectedRange ? "active" : ""}
                                          @click=${() => this.selectRange(e)}
                                      >
                                          ${e}
                                      </button>
                                  `)}
                          </div>
                      ` : ""}
            </div>
        `;
	}
};
l([o({ type: Array })], W.prototype, "sectors", void 0), l([o({
	type: String,
	attribute: "selected-sector",
	reflect: !0
})], W.prototype, "selectedSector", void 0), l([o({
	type: String,
	attribute: "selected-range",
	reflect: !0
})], W.prototype, "selectedRange", void 0), l([s()], W.prototype, "slottedSectors", void 0), l([s()], W.prototype, "needleAngle", void 0), W = l([a("fx-rotary-selector")], W);
//#endregion
//#region src/stories/measure/FxSwitchState.ts
var G = class extends e {
	constructor(...e) {
		super(...e), this.value = "", this.label = "", this.icon = "", this.color = "", this.backgroundColor = "";
	}
	connectedCallback() {
		super.connectedCallback(), this.style.display = "none";
	}
	updated(e) {
		(e.has("value") || e.has("label") || e.has("icon") || e.has("color") || e.has("backgroundColor")) && this.dispatchEvent(new CustomEvent("stateupdate", {
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return n`<slot name="icon"></slot>`;
	}
};
l([o({ attribute: "value" })], G.prototype, "value", void 0), l([o()], G.prototype, "label", void 0), l([o()], G.prototype, "icon", void 0), l([o()], G.prototype, "color", void 0), l([o({ attribute: "background-color" })], G.prototype, "backgroundColor", void 0), G = l([a("fx-switch-state")], G);
//#endregion
//#region src/stories/measure/FxSwitch.ts
var K = class extends d(c) {
	constructor(...e) {
		super(...e), this.states = [], this.activeId = "", this.orientation = "horizontal", this.theme = "dark", this.color = "#ffffff", this.backgroundColor = "#3b82f6", this.stateWidth = 72, this.slottedStates = [], this.syncingIcons = !1, this.iconPresenceKey = "", this.onStateUpdate = () => {
			this.collectSlottedStates(), this.syncIcons();
		}, this.onStatesSlotChange = () => {
			this.collectSlottedStates(), this.syncIcons();
		};
	}
	resolveStateWidth() {
		let e = this.stateWidth;
		if (typeof e == "number" && Number.isFinite(e)) return `${e}px`;
		let t = String(e ?? "").trim();
		return t ? /^\d+(\.\d+)?$/.test(t) ? `${t}px` : t : "72px";
	}
	get effectiveStates() {
		return this.states.length > 0 ? this.states : this.slottedStates.length > 0 ? this.slottedStates : [{
			id: "off",
			label: "OFF",
			color: "#6b7280",
			backgroundColor: "#f3f4f6"
		}, {
			id: "on",
			label: "ON",
			color: "#ffffff",
			backgroundColor: "#3b82f6"
		}];
	}
	getAssignedStateElements() {
		let e = this.shadowRoot?.querySelector("slot.states");
		return e ? e.assignedElements().filter((e) => e instanceof G) : [];
	}
	syncIcons() {
		if (!this.syncingIcons) {
			this.syncingIcons = !0;
			try {
				pe(this, {
					arrayStates: this.states,
					stateElements: this.getAssignedStateElements(),
					fallbackStates: this.effectiveStates
				});
				let e = this.effectiveStates.filter((e) => me(this, e.id)).map((e) => e.id).join("\0");
				e !== this.iconPresenceKey && (this.iconPresenceKey = e, this.requestUpdate());
			} finally {
				this.syncingIcons = !1;
			}
		}
	}
	connectedCallback() {
		super.connectedCallback(), this.addEventListener("stateupdate", this.onStateUpdate);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeEventListener("stateupdate", this.onStateUpdate);
	}
	collectSlottedStates() {
		let e = this.getAssignedStateElements().map((e) => ({
			id: e.value,
			label: e.label,
			icon: e.icon || void 0,
			color: e.color || void 0,
			backgroundColor: e.backgroundColor || void 0
		}));
		he(this.slottedStates, e) || (this.slottedStates = e);
		let t = this.effectiveStates;
		!this.activeId && t.length > 0 && (this.activeId = t[0].id);
	}
	firstUpdated() {
		this.collectSlottedStates(), this.syncIcons();
		let e = this.effectiveStates;
		!this.activeId && e.length > 0 && (this.activeId = e[0].id);
	}
	updated(e) {
		(e.has("states") || e.has("slottedStates")) && this.syncIcons();
	}
	handleStateChange(e) {
		if (this.activeId !== e) {
			this.activeId = e;
			let t = this.effectiveStates.find((t) => t.id === e);
			this.dispatchEvent(new CustomEvent("change", {
				detail: {
					id: e,
					state: t
				},
				bubbles: !0,
				composed: !0
			}));
		}
	}
	static {
		this.styles = [m, t`
            :host {
                display: inline-flex;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
            }
            :host([orientation="horizontal"]) {
                flex-direction: row;
            }
            :host([orientation="vertical"]) {
                flex-direction: column;
            }
            :host([theme="dark"]) {
                --fx-switch-track-color: #1e293b;
                --fx-switch-border-color: #334155;
                --fx-switch-text-inactive: #94a3b8;
                --fx-switch-text-hover: #f8fafc;
                --fx-switch-divider-color: #475569;
                --fx-switch-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
            }
            .switch-container {
                display: inline-flex;
                background-color: var(--fx-switch-track-color, #ffffff);
                border-radius: var(--fx-switch-border-radius, 16px);
                padding: var(--fx-switch-padding, 4px);
                position: relative;
                gap: 0;
                border: 1px solid var(--fx-switch-border-color, #e5e7eb);
                box-shadow: var(--fx-switch-shadow, 0 1px 2px rgba(15, 23, 42, 0.06));
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
        `];
	}
	render() {
		let e = this.effectiveStates, t = e.length, r = Math.max(0, e.findIndex((e) => e.id === this.activeId)), i = e[r], a = i?.backgroundColor || this.backgroundColor || "#3b82f6", o = i?.color || this.color || "#ffffff", s = this.orientation === "horizontal", c = this.resolveStateWidth(), l = s ? `
                width: calc((100% - 2 * var(--fx-switch-padding, 4px)) / ${t});
                height: calc(100% - 2 * var(--fx-switch-padding, 4px));
                transform: translateX(calc(${r} * 100%));
                background-color: ${a};
            ` : `
                height: calc((100% - 2 * var(--fx-switch-padding, 4px)) / ${t});
                width: calc(100% - 2 * var(--fx-switch-padding, 4px));
                transform: translateY(calc(${r} * 100%));
                background-color: ${a};
            `;
		return n`
            <slot class="states" @slotchange=${this.onStatesSlotChange} style="display:none;"></slot>

            <div class="switch-container" style="--fx-switch-state-width: ${c};">
                <div class="switch-thumb" style="${l}"></div>

                ${e.map((e) => {
			let t = this.activeId === e.id, r = t ? `--active-text-color: ${o};` : "", i = y(e.id), a = !!e.icon?.trim() || me(this, e.id);
			return n`
                        <button
                            type="button"
                            class="switch-button ${t ? "active" : ""}"
                            style="${r}"
                            @click=${() => this.handleStateChange(e.id)}
                        >
                            <span class="switch-icon" ?hidden=${!a}>
                                <slot name="${i}"></slot>
                            </span>
                            <span class="switch-label">${e.label}</span>
                        </button>
                    `;
		})}
            </div>
        `;
	}
};
l([o({ type: Array })], K.prototype, "states", void 0), l([o({
	type: String,
	attribute: "active-id",
	reflect: !0
})], K.prototype, "activeId", void 0), l([o({
	type: String,
	reflect: !0
})], K.prototype, "orientation", void 0), l([o({
	type: String,
	reflect: !0
})], K.prototype, "theme", void 0), l([o({ type: String })], K.prototype, "color", void 0), l([o({
	type: String,
	attribute: "background-color"
})], K.prototype, "backgroundColor", void 0), l([o({ attribute: "state-width" })], K.prototype, "stateWidth", void 0), l([s()], K.prototype, "slottedStates", void 0), K = l([a("fx-switch")], K);
//#endregion
//#region src/stories/measure/FxRadialSwitch.ts
var q = class extends d(c) {
	constructor(...e) {
		super(...e), this.knobRadius = 40, this.knobGap = 4, this.defaultOuterRadius = 96, this.viewPadding = 4, this.wedgeGap = 2.5, this.states = [], this.activeId = "", this.color = "#ffffff", this.backgroundColor = "#3b82f6", this.size = 280, this.trackWidth = 52, this.slottedStates = [], this.pointerAngle = 0, this.syncingIcons = !1, this.onStateUpdate = () => {
			this.collectSlottedStates(), this.syncIcons();
		}, this.onStatesSlotChange = () => {
			this.collectSlottedStates(), this.syncIcons();
		};
	}
	get innerRadius() {
		return this.knobRadius + this.knobGap;
	}
	get outerRadius() {
		let e = Number.isFinite(this.trackWidth) ? this.trackWidth : 52;
		return this.innerRadius + Math.max(8, e);
	}
	get labelRadius() {
		return (this.outerRadius + this.innerRadius) / 2;
	}
	get viewSize() {
		return (this.outerRadius + this.viewPadding) * 2;
	}
	get centerX() {
		return this.viewSize / 2;
	}
	get centerY() {
		return this.viewSize / 2;
	}
	shortestAngleDelta(e, t) {
		let n = (e % 360 + 360) % 360, r = (t % 360 + 360) % 360 - n;
		return r > 180 && (r -= 360), r < -180 && (r += 360), r;
	}
	syncPointerAngle() {
		let e = this.effectiveStates, t = Math.max(e.length, 1), n = e.findIndex((e) => e.id === this.activeId);
		n < 0 && (n = 0);
		let r = this.segmentGeometry(t, n).mid;
		this.pointerAngle += this.shortestAngleDelta(this.pointerAngle, r);
	}
	degToRad(e) {
		return e * Math.PI / 180;
	}
	polar(e, t) {
		let n = this.degToRad(e - 90);
		return {
			x: this.centerX + t * Math.cos(n),
			y: this.centerY + t * Math.sin(n)
		};
	}
	wedgePath(e, t, n, r) {
		let i = t;
		i <= e && (i += 360);
		let a = i - e, o = this.polar(e, n), s = this.polar(i, n), c = this.polar(i, r), l = this.polar(e, r), u = +(a > 180);
		return `M ${o.x} ${o.y} A ${n} ${n} 0 ${u} 1 ${s.x} ${s.y} L ${c.x} ${c.y} A ${r} ${r} 0 ${u} 0 ${l.x} ${l.y} Z`;
	}
	resolveSize() {
		let e = this.size, t = null;
		if (typeof e == "number" && Number.isFinite(e)) t = e;
		else {
			let n = String(e ?? "").trim();
			if (!n) t = 280;
			else if (/^\d+(\.\d+)?$/.test(n)) t = Number(n);
			else if (/^\d+(\.\d+)?px$/i.test(n)) t = parseFloat(n);
			else return n;
		}
		return `${t * (this.outerRadius / this.defaultOuterRadius)}px`;
	}
	get effectiveStates() {
		return this.states.length > 0 ? this.states : this.slottedStates.length > 0 ? this.slottedStates : [];
	}
	getAssignedStateElements() {
		let e = this.shadowRoot?.querySelector("slot.states");
		return e ? e.assignedElements().filter((e) => e instanceof G) : [];
	}
	syncIcons() {
		if (!this.syncingIcons) {
			this.syncingIcons = !0;
			try {
				pe(this, {
					arrayStates: this.states,
					stateElements: this.getAssignedStateElements(),
					fallbackStates: this.effectiveStates
				});
			} finally {
				this.syncingIcons = !1;
			}
		}
	}
	connectedCallback() {
		super.connectedCallback(), this.addEventListener("stateupdate", this.onStateUpdate);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeEventListener("stateupdate", this.onStateUpdate);
	}
	collectSlottedStates() {
		let e = this.getAssignedStateElements().map((e) => ({
			id: e.value,
			label: e.label,
			icon: e.icon || void 0,
			color: e.color || void 0,
			backgroundColor: e.backgroundColor || void 0
		}));
		he(this.slottedStates, e) || (this.slottedStates = e);
		let t = this.effectiveStates;
		!this.activeId && t.length > 0 && (this.activeId = t[0].id);
	}
	firstUpdated() {
		this.collectSlottedStates(), this.syncIcons();
		let e = this.effectiveStates;
		!this.activeId && e.length > 0 && (this.activeId = e[0].id);
	}
	willUpdate(e) {
		(e.has("activeId") || e.has("states") || e.has("slottedStates")) && this.syncPointerAngle();
	}
	updated(e) {
		(e.has("states") || e.has("slottedStates")) && this.syncIcons(), (e.has("activeId") || e.has("states") || e.has("slottedStates") || e.has("isAnimated")) && this.updateSlottedKnob();
	}
	updateSlottedKnob() {
		let e = this.shadowRoot?.querySelector("slot[name=\"knob\"]");
		if (!e) return;
		let t = e.assignedElements()[0];
		t && ("angle" in t && (t.angle = this.pointerAngle), f(t) && (t.isAnimated = this.isAnimated));
	}
	handleStateChange(e) {
		if (this.activeId === e) return;
		this.activeId = e;
		let t = this.effectiveStates.find((t) => t.id === e);
		this.dispatchEvent(new CustomEvent("change", {
			detail: {
				id: e,
				state: t
			},
			bubbles: !0,
			composed: !0
		}));
	}
	segmentGeometry(e, t) {
		let n = 360 / Math.max(e, 1);
		return {
			start: t * n,
			end: (t + 1) * n,
			mid: t * n + n / 2,
			span: n
		};
	}
	static {
		this.styles = [m, t`
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
        `];
	}
	render() {
		let e = this.effectiveStates, t = Math.max(e.length, 1), r = this.resolveSize(), a = this.viewSize, o = this.centerX, s = this.centerY;
		return n`
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

                    <circle cx="${o}" cy="${s}" r="${this.outerRadius + 1}" fill="var(--fx-radial-switch-gap)" />

                    ${e.map((e, n) => {
			let { start: r, end: a } = this.segmentGeometry(t, n), o = e.backgroundColor || this.backgroundColor, s = e.id === this.activeId;
			return i`
                            <path
                                class="wedge ${s ? "active" : ""}"
                                d="${this.wedgePath(r, a, this.outerRadius, this.innerRadius)}"
                                fill="${o}"
                                filter="${s ? "url(#fx-radial-pressed)" : "none"}"
                                @click=${() => this.handleStateChange(e.id)}
                            />
                        `;
		})}

                    ${e.map((e, n) => {
			let { start: r } = this.segmentGeometry(t, n), a = this.polar(r, this.innerRadius - .5), o = this.polar(r, this.outerRadius + .5);
			return i`
                            <line
                                class="wedge-gap"
                                x1="${a.x}"
                                y1="${a.y}"
                                x2="${o.x}"
                                y2="${o.y}"
                                stroke-width="${this.wedgeGap}"
                            />
                        `;
		})}
                </svg>

                <div
                    class="knob-host"
                    style="width: ${this.knobRadius * 2 / a * 100}%; height: ${this.knobRadius * 2 / a * 100}%;"
                >
                    <slot name="knob" @slotchange=${this.updateSlottedKnob}>
                        <fx-knob
                            .angle=${this.pointerAngle}
                            .isAnimated=${this.isAnimated}
                        ></fx-knob>
                    </slot>
                </div>

                <div class="labels">
                    ${e.map((e, r) => {
			let { mid: i } = this.segmentGeometry(t, r), o = this.polar(i, this.labelRadius);
			return n`
                            <button
                                type="button"
                                class="label-btn"
                                style="left: ${o.x / a * 100}%; top: ${o.y / a * 100}%; --label-color: ${e.color || this.color};"
                                @click=${() => this.handleStateChange(e.id)}
                            >
                                <span class="label-icon">
                                    <slot name="${y(e.id)}"></slot>
                                </span>
                                <span class="label-text" ?hidden=${!e.label?.trim()}>${e.label}</span>
                            </button>
                        `;
		})}
                </div>
            </div>
        `;
	}
};
l([o({ type: Array })], q.prototype, "states", void 0), l([o({
	type: String,
	attribute: "active-id",
	reflect: !0
})], q.prototype, "activeId", void 0), l([o({ type: String })], q.prototype, "color", void 0), l([o({
	type: String,
	attribute: "background-color"
})], q.prototype, "backgroundColor", void 0), l([o()], q.prototype, "size", void 0), l([o({
	type: Number,
	attribute: "track-width"
})], q.prototype, "trackWidth", void 0), l([s()], q.prototype, "slottedStates", void 0), q = l([a("fx-radial-switch")], q);
//#endregion
//#region src/stories/measure/FxLedIndicator.ts
var J = class extends d(c) {
	constructor(...e) {
		super(...e), this.label = "", this.labelPosition = "top", this.shape = "round", this.color = "#22c55e", this.name = "", this.isActive = !1, this.isBlinking = !1, this.hasFrame = !0, this.isInteractive = !1;
	}
	static {
		this.styles = [m, t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                vertical-align: middle;
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
            }

            :host([is-interactive]) .bezel {
                cursor: pointer;
            }

            :host([is-interactive]) .bezel:focus-visible {
                outline: 2px solid rgba(255, 255, 255, 0.4);
                outline-offset: 2px;
            }

            :host([has-frame]) .bezel {
                padding: 3px;
                background: linear-gradient(150deg, #1e2d3d 0%, #0a0f1c 55%, #141e2e 100%);
                box-shadow:
                    inset 1px 1px 0 rgba(255, 255, 255, 0.11),
                    inset -1px -1px 0 rgba(0, 0, 0, 0.7),
                    0 0 0 1px rgba(0, 0, 0, 0.55),
                    0 2px 6px rgba(0, 0, 0, 0.75),
                    0 1px 0 rgba(255, 255, 255, 0.05);
            }

            :host([is-active][has-frame]) .bezel {
                box-shadow:
                    inset 1px 1px 0 rgba(255, 255, 255, 0.11),
                    inset -1px -1px 0 rgba(0, 0, 0, 0.7),
                    0 0 0 1px rgba(0, 0, 0, 0.55),
                    0 2px 6px rgba(0, 0, 0, 0.75),
                    0 1px 0 rgba(255, 255, 255, 0.05),
                    0 0 10px var(--led-glow, rgba(34, 197, 94, 0.35));
            }

            :host(:not([has-frame])) .bezel {
                padding: 0;
            }

            :host([shape="round"]) .bezel {
                border-radius: 50%;
                width: var(--fx-led-size, 20px);
                height: var(--fx-led-size, 20px);
            }

            :host([shape="square"]) .bezel {
                border-radius: 4px;
                width: var(--fx-led-size, 20px);
                height: var(--fx-led-size, 20px);
            }

            :host([shape="rect"]) .bezel {
                border-radius: 5px;
                width: calc(var(--fx-led-size, 20px) * 2.6);
                height: var(--fx-led-size, 20px);
            }

            .lens {
                width: 100%;
                height: 100%;
                border-radius: inherit;
                position: relative;
                overflow: hidden;
                box-sizing: border-box;
                background: var(--led-inactive, rgba(34, 197, 94, 0.16));
                box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.85);
            }

            :host([is-active]) .lens {
                background: var(--led-color, #22c55e);
                box-shadow:
                    inset 0 1px 2px rgba(255, 255, 255, 0.3),
                    0 0 5px var(--led-color, #22c55e),
                    0 0 14px var(--led-glow, rgba(34, 197, 94, 0.45)),
                    0 0 28px var(--led-glow-wide, rgba(34, 197, 94, 0.18));
            }

            :host([is-animated]) .lens {
                transition:
                    background 0.18s ease,
                    box-shadow 0.18s ease;
            }

            :host([is-animated][has-frame]) .bezel {
                transition: box-shadow 0.18s ease;
            }

            .lens::after {
                content: '';
                position: absolute;
                top: 10%;
                left: 10%;
                width: 44%;
                height: 40%;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.29);
                filter: blur(0.5px);
                pointer-events: none;
            }

            @keyframes fx-led-blink {
                0%, 100% { opacity: 1; }
                50%       { opacity: 0.1; }
            }

            :host([is-active][is-blinking][is-animated]) .lens {
                animation: fx-led-blink 1.1s ease-in-out infinite;
            }
        `];
	}
	handleClick() {
		this.isInteractive && (this.name ? (this.getRootNode().querySelectorAll(`fx-led-indicator[name="${this.name}"]`).forEach((e) => {
			e !== this && (e.isActive = !1);
		}), this.isActive = !0) : this.isActive = !this.isActive, this.dispatchEvent(new CustomEvent("change", {
			detail: {
				isActive: this.isActive,
				name: this.name
			},
			bubbles: !0,
			composed: !0
		})));
	}
	handleKeyDown(e) {
		this.isInteractive && (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.handleClick());
	}
	get colorVars() {
		let e = this.color.replace("#", ""), t = parseInt(e.substring(0, 2), 16), n = parseInt(e.substring(2, 4), 16), r = parseInt(e.substring(4, 6), 16);
		return [
			`--led-color: ${this.color}`,
			`--led-inactive: rgba(${t}, ${n}, ${r}, 0.25)`,
			`--led-glow: rgba(${t}, ${n}, ${r}, 0.65)`,
			`--led-glow-wide: rgba(${t}, ${n}, ${r}, 0.30)`
		].join("; ");
	}
	render() {
		let { label: e, labelPosition: t, colorVars: i } = this, a = e ? n`<div class="label-plate">${e}</div>` : "";
		return n`
            ${t === "top" ? a : ""}
            <div
                class="bezel"
                role="${this.isInteractive ? "button" : "img"}"
                tabindex="${this.isInteractive ? "0" : "-1"}"
                aria-pressed="${this.isInteractive ? String(this.isActive) : r}"
                @click="${this.handleClick}"
                @keydown="${this.handleKeyDown}"
            >
                <div class="lens" style="${i}"></div>
            </div>
            ${t === "bottom" ? a : ""}
        `;
	}
};
l([o({ type: String })], J.prototype, "label", void 0), l([o({
	type: String,
	attribute: "label-position",
	reflect: !0
})], J.prototype, "labelPosition", void 0), l([o({
	type: String,
	reflect: !0
})], J.prototype, "shape", void 0), l([o({ type: String })], J.prototype, "color", void 0), l([o({ type: String })], J.prototype, "name", void 0), l([o({
	type: Boolean,
	attribute: "is-active",
	reflect: !0
})], J.prototype, "isActive", void 0), l([o({
	type: Boolean,
	attribute: "is-blinking",
	reflect: !0
})], J.prototype, "isBlinking", void 0), l([o({
	type: Boolean,
	attribute: "has-frame",
	reflect: !0
})], J.prototype, "hasFrame", void 0), l([o({
	type: Boolean,
	attribute: "is-interactive",
	reflect: !0
})], J.prototype, "isInteractive", void 0), J = l([a("fx-led-indicator")], J);
//#endregion
//#region src/stories/measure/FxVuMeter.ts
var Y = class extends u {
	constructor(...e) {
		super(...e), this.segments = 15, this.orientation = "vertical", this.hasPeakHold = !0, this.showLabels = !0, this.isStereo = !1, this.peakValueL = 0, this.peakValueR = 0, this.peakTimerL = null, this.decayInterval = null;
	}
	static {
		this.styles = [m, t`
            :host {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                font-family: var(--fx-font-family, sans-serif);
                user-select: none;
                --fx-vu-meter-size: 200px;  
                --fx-vu-gap: 3px;
                --fx-vu-bg-opacity: 0.15;
                --fx-vu-glow-intensity: 8px;
            }

            .vu-container {
                display: flex;
                background: var(--fx-vu-meter-background, #1e293b);
                border: 2px solid var(--fx-vu-meter-border-color, #334155);
                border-radius: 8px;
                padding: 10px;
                box-shadow: 
                    inset 0 4px 6px rgba(0, 0, 0, 0.6),
                    0 4px 10px rgba(0, 0, 0, 0.3),
                    0 1px 0 rgba(255, 255, 255, 0.1);
                box-sizing: border-box;
                position: relative;
            }

            :host([orientation="vertical"]) .vu-container {
                flex-direction: row;
                height: var(--fx-vu-meter-size);
                width: auto;
                min-width: 48px;
            }

            :host([orientation="vertical"][is-stereo]) .vu-container {
                min-width: 76px;
            }

            :host([orientation="horizontal"]) .vu-container {
                flex-direction: column;
                width: var(--fx-vu-meter-size);
                height: auto;
                min-height: 48px;
            }

            :host([orientation="horizontal"][is-stereo]) .vu-container {
                min-height: 76px;
            }

            .bar {
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
            }

            :host([orientation="vertical"]) .bar {
                flex-direction: column-reverse;
                height: 100%;
                width: 20px;
                margin: 0 4px;
            }

            :host([orientation="horizontal"]) .bar {
                flex-direction: row;
                width: 100%;
                height: 20px;
                margin: 4px 0;
            }

            .segment {
                flex: 1;
                border-radius: 2px;
                box-sizing: border-box;
                position: relative;
                transition: background-color 0.05s ease, box-shadow 0.05s ease;
            }

            :host([orientation="vertical"]) .segment {
                margin: var(--fx-vu-gap) 0;
                width: 100%;
            }

            :host([orientation="horizontal"]) .segment {
                margin: 0 var(--fx-vu-gap);
                height: 100%;
            }

            .glass-reflection {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%);
                pointer-events: none;
                border-radius: 6px;
            }

            .info-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .info-wrap fx-measure-value-display,
            .info-wrap ::slotted(fx-measure-value-display),
            .info-wrap ::slotted([slot="display"]) {
                --fx-measure-value-display-margin-top: 0.55em;
            }

            .scale-labels {
                display: flex;
                justify-content: space-between;
                pointer-events: none;
                font-size: 13px;
                color: var(--fx-vu-meter-label-color, #cbd5e1);
                font-weight: 600;
            }

            :host([orientation="vertical"]) .scale-labels {
                flex-direction: column-reverse;
                height: 100%;
                padding: var(--fx-vu-gap) 6px var(--fx-vu-gap) 0;
            }

            :host([orientation="horizontal"]) .scale-labels {
                flex-direction: row;
                width: 100%;
                padding: 0 var(--fx-vu-gap) 6px var(--fx-vu-gap);
            }
        `];
	}
	connectedCallback() {
		super.connectedCallback(), this.startPeakDecay();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.stopPeakDecay();
	}
	startPeakDecay() {
		this.decayInterval = setInterval(() => {
			this.peakValueL > this.progress && (this.peakValueL = Math.max(this.progress, this.peakValueL - .02)), this.peakValueR > this.progress && (this.peakValueR = Math.max(this.progress, this.peakValueR - .02));
		}, 50);
	}
	stopPeakDecay() {
		this.decayInterval && clearInterval(this.decayInterval);
	}
	updated(e) {
		if (super.updated(e), e.has("value") || e.has("min") || e.has("max")) {
			let e = this.progress;
			e >= this.peakValueL && (this.peakValueL = e, this.peakTimerL && clearTimeout(this.peakTimerL), this.peakTimerL = setTimeout(() => {}, 1e3));
			let t = e * (.95 + Math.sin(Date.now() / 150) * .05), n = Math.max(0, Math.min(1, t));
			n >= this.peakValueR && (this.peakValueR = n);
		}
		(e.has("value") || e.has("min") || e.has("max") || e.has("unit") || e.has("label")) && this.updateSlottedDisplay();
	}
	updateSlottedDisplay() {
		let e = this.shadowRoot?.querySelector("slot[name=\"display\"]");
		if (e) {
			let t = e.assignedElements()[0];
			t && ("value" in t && (t.value = this.value), "min" in t && (t.min = this.min), "max" in t && (t.max = this.max), "unit" in t && (t.unit = this.unit), "label" in t && (t.label = this.label));
		}
	}
	getSegmentColor(e, t) {
		let n = "#10b981", r = "rgba(16, 185, 129, 0.4)";
		return e > .85 ? (n = "#ef4444", r = "rgba(239, 68, 68, 0.6)") : e > .65 && (n = "#f59e0b", r = "rgba(245, 158, 11, 0.5)"), t ? {
			style: `background-color: ${n}; box-shadow: 0 0 var(--fx-vu-glow-intensity) ${r};`,
			active: !0
		} : {
			style: `background-color: ${n}; opacity: var(--fx-vu-bg-opacity);`,
			active: !1
		};
	}
	renderBar(e, t = !1) {
		let { segments: r, progress: i } = this, a = t ? Math.max(0, Math.min(1, i * (.95 + Math.sin(Date.now() / 150) * .05))) : i, o = [], s = Math.floor(e * (r - 1));
		for (let t = 0; t < r; t++) {
			let i = t / (r - 1), c = a >= i, l = this.hasPeakHold && t === s && e > .02, u = this.getSegmentColor(i, c || l), d = l && !c ? `${u.style} opacity: 1; filter: brightness(1.2);` : u.style;
			o.push(n`
                <div class="segment" style="${d}"></div>
            `);
		}
		return n`
            <div class="bar">
                ${o}
            </div>
        `;
	}
	renderScaleLabels() {
		let { min: e, max: t, showLabels: r } = this;
		if (!r) return "";
		let i = [], a = (t - e) / 4;
		for (let t = 0; t <= 4; t++) {
			let r = Math.round(e + t * a);
			i.push(n`<div>${r}</div>`);
		}
		return n`
            <div class="scale-labels">
                ${i}
            </div>
        `;
	}
	render() {
		return n`
            <div class="vu-container">

                ${this.renderScaleLabels()}

                ${this.renderBar(this.peakValueL, !1)}

                ${this.isStereo ? this.renderBar(this.peakValueR, !0) : ""}

                <div class="glass-reflection"></div>
            </div>

            ${this.showValue ? n`
                <div class="info-wrap">
                    <slot name="display" @slotchange="${this.updateSlottedDisplay}">
                        <fx-measure-value-display
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            .unit=${this.unit}
                            .label=${this.label}
                        ></fx-measure-value-display>
                    </slot>
                </div>
            ` : ""}
        `;
	}
};
l([o({ type: Number })], Y.prototype, "segments", void 0), l([o({
	type: String,
	reflect: !0
})], Y.prototype, "orientation", void 0), l([o({
	type: Boolean,
	attribute: "has-peak-hold",
	reflect: !0
})], Y.prototype, "hasPeakHold", void 0), l([o({
	type: Boolean,
	attribute: "show-labels",
	reflect: !0
})], Y.prototype, "showLabels", void 0), l([o({
	type: Boolean,
	attribute: "is-stereo",
	reflect: !0
})], Y.prototype, "isStereo", void 0), l([s()], Y.prototype, "peakValueL", void 0), l([s()], Y.prototype, "peakValueR", void 0), Y = l([a("fx-vu-meter")], Y);
//#endregion
//#region src/stories/measure/FxDisplay.ts
var X = class extends e {
	constructor(...e) {
		super(...e), this.label = "", this.prefix = "", this.value = "", this.suffix = "", this.orientation = "horizontal", this.align = "center", this.bg = "", this.color = "", this.labelColor = "", this.prefixColor = "", this.valueColor = "", this.suffixColor = "", this.fontSize = "", this.labelSize = "", this.prefixSize = "", this.valueSize = "", this.suffixSize = "", this.labelWeight = "", this.valueWeight = "", this.prefixWeight = "", this.suffixWeight = "", this.icon = "", this.iconColor = "", this.iconSide = "left";
	}
	static {
		this.styles = t`
        :host {
            display: flex;
            box-sizing: border-box;
            border-radius: var(--fx-display-region-border-radius, 4px);
            padding: var(--fx-display-region-padding, 8px);
            transition: all 0.15s ease;
            overflow: hidden;
            width: 100%;
        }
        .region-wrap {
            display: flex;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }
        :host([orientation="vertical"]) .region-wrap,
        :host([orientation="v"]) .region-wrap {
            flex-direction: column;
            justify-content: center;
        }
        :host([orientation="horizontal"]) .region-wrap,
        :host([orientation="h"]) .region-wrap {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        :host([align="left"]) .region-wrap {
            align-items: flex-start;
            text-align: left;
        }
        :host([align="right"]) .region-wrap {
            align-items: flex-end;
            text-align: right;
        }
        :host([align="center"]) .region-wrap {
            align-items: center;
            text-align: center;
        }
        :host([align="space-between"]) .region-wrap {
            justify-content: space-between;
            align-items: center;
        }
        :host([align="space-around"]) .region-wrap {
            justify-content: space-around;
            align-items: center;
        }
        :host([orientation="vertical"][align="left"]) .region-wrap,
        :host([orientation="v"][align="left"]) .region-wrap {
            align-items: flex-start;
        }
        :host([orientation="vertical"][align="right"]) .region-wrap,
        :host([orientation="v"][align="right"]) .region-wrap {
            align-items: flex-end;
        }
        :host([orientation="vertical"][align="center"]) .region-wrap,
        :host([orientation="v"][align="center"]) .region-wrap {
            align-items: center;
        }

        .label {
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 2px;
        }

        :host([orientation="horizontal"]) .label,
        :host([orientation="h"]) .label {
            margin-bottom: 0;
            margin-right: 8px;
        }

        .value-container {
            display: inline-flex;
            align-items: baseline;
            justify-content: inherit;
            flex-wrap: wrap;
            gap: 4px;
        }
        .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
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
            align-items: baseline;
        }
        .icon-right {
            flex-direction: row-reverse;
            align-items: baseline;
        }

        .prefix, .suffix {
            opacity: 0.85;
        }
    `;
	}
	renderValueContent() {
		return n`
            ${_(this.value) ? "" : n`<span class="value">${this.value}</span>`}
        `;
	}
	render() {
		let e = this.color || "inherit", t = this.valueColor || this.color || "inherit", r = this.labelColor || this.valueColor || this.color || "#9ca3af", i = this.prefixColor || this.valueColor || this.color || "inherit", a = this.suffixColor || this.valueColor || this.color || "inherit", o = this.iconColor || this.valueColor || this.color || "inherit", s = n`
            <style>
                :host {
                    background-color: ${this.bg || "transparent"};
                    color: ${e};
                    ${this.fontSize ? `font-size: ${this.fontSize};` : ""}
                }
                .label {
                    color: ${r};
                    ${this.labelSize ? `font-size: ${this.labelSize};` : ""}
                    ${this.labelWeight ? `font-weight: ${this.labelWeight};` : ""}
                }
                .prefix {
                    color: ${i};
                    ${this.prefixSize ? `font-size: ${this.prefixSize};` : ""}
                    ${this.prefixWeight ? `font-weight: ${this.prefixWeight};` : ""}
                }
                .value {
                    color: ${t};
                    ${this.valueSize ? `font-size: ${this.valueSize};` : ""}
                    ${this.valueWeight ? `font-weight: ${this.valueWeight};` : ""}
                }
                .suffix {
                    color: ${a};
                    ${this.suffixSize ? `font-size: ${this.suffixSize};` : ""}
                    ${this.suffixWeight ? `font-weight: ${this.suffixWeight};` : ""}
                }
                .icon {
                    color: ${o};
                }
            </style>
        `, c = "icon-left";
		return this.iconSide === "right" ? c = "icon-right" : this.iconSide === "top" ? c = "icon-top" : this.iconSide === "bottom" && (c = "icon-bottom"), n`
            ${s}
            <div class="region-wrap">
                ${this.label ? n`<span class="label">${this.label}</span>` : ""}
                <div class="value-container ${c}">
                    ${this.icon && (this.iconSide === "left" || this.iconSide === "top") ? n`<span class="icon" style="margin-right: 4px;">${this.icon}</span>` : ""}
                    ${this.prefix ? n`<span class="prefix">${this.prefix}</span>` : ""}

                    <div style="position: relative; display: inline-flex; align-items: baseline;">
                        ${this.renderValueContent()}
                    </div>

                    ${this.suffix ? n`<span class="suffix">${this.suffix}</span>` : ""}
                    ${this.icon && (this.iconSide === "right" || this.iconSide === "bottom") ? n`<span class="icon" style="margin-left: 4px;">${this.icon}</span>` : ""}
                </div>
            </div>
        `;
	}
};
l([o({ type: String })], X.prototype, "label", void 0), l([o({ type: String })], X.prototype, "prefix", void 0), l([o({ type: String })], X.prototype, "value", void 0), l([o({ type: String })], X.prototype, "suffix", void 0), l([o({
	type: String,
	reflect: !0
})], X.prototype, "orientation", void 0), l([o({
	type: String,
	reflect: !0
})], X.prototype, "align", void 0), l([o({ type: String })], X.prototype, "bg", void 0), l([o({ type: String })], X.prototype, "color", void 0), l([o({
	type: String,
	attribute: "label-color"
})], X.prototype, "labelColor", void 0), l([o({
	type: String,
	attribute: "prefix-color"
})], X.prototype, "prefixColor", void 0), l([o({
	type: String,
	attribute: "value-color"
})], X.prototype, "valueColor", void 0), l([o({
	type: String,
	attribute: "suffix-color"
})], X.prototype, "suffixColor", void 0), l([o({
	type: String,
	attribute: "font-size"
})], X.prototype, "fontSize", void 0), l([o({
	type: String,
	attribute: "label-size"
})], X.prototype, "labelSize", void 0), l([o({
	type: String,
	attribute: "prefix-size"
})], X.prototype, "prefixSize", void 0), l([o({
	type: String,
	attribute: "value-size"
})], X.prototype, "valueSize", void 0), l([o({
	type: String,
	attribute: "suffix-size"
})], X.prototype, "suffixSize", void 0), l([o({
	type: String,
	attribute: "label-weight"
})], X.prototype, "labelWeight", void 0), l([o({
	type: String,
	attribute: "value-weight"
})], X.prototype, "valueWeight", void 0), l([o({
	type: String,
	attribute: "prefix-weight"
})], X.prototype, "prefixWeight", void 0), l([o({
	type: String,
	attribute: "suffix-weight"
})], X.prototype, "suffixWeight", void 0), l([o({ type: String })], X.prototype, "icon", void 0), l([o({
	type: String,
	attribute: "icon-color"
})], X.prototype, "iconColor", void 0), l([o({
	type: String,
	attribute: "icon-side"
})], X.prototype, "iconSide", void 0), X = l([a("fx-display-region")], X);
var Z = class extends e {
	constructor(...e) {
		super(...e), this.layout = "vertical", this.gap = "4px", this.gridTemplate = "", this.width = "", this.height = "", this.padding = "8px", this.border = "1px solid #1f2937", this.borderRadius = "8px", this.bg = "#0b0f19", this._regions = [], this.label = "", this.prefix = "", this.value = "", this.suffix = "", this.orientation = "horizontal", this.align = "center", this.color = "", this.labelColor = "", this.prefixColor = "", this.valueColor = "", this.suffixColor = "", this.fontSize = "", this.labelSize = "", this.prefixSize = "", this.valueSize = "", this.suffixSize = "", this.labelWeight = "", this.valueWeight = "", this.prefixWeight = "", this.suffixWeight = "", this.icon = "", this.iconColor = "", this.iconSide = "left", this.hasSlottedRegions = !1;
	}
	get regions() {
		return this._regions;
	}
	set regions(e) {
		let t = this._regions;
		if (typeof e == "string") try {
			this._regions = JSON.parse(e);
		} catch (e) {
			console.error("Failed to parse regions JSON:", e), this._regions = [];
		}
		else Array.isArray(e) ? this._regions = e : this._regions = [];
		this.requestUpdate("regions", t);
	}
	static {
		this.styles = t`
        :host {
            display: inline-flex;
            box-sizing: border-box;
            font-family: var(--fx-font-family, sans-serif);
            overflow: hidden;
            width: 100%;
        }
        .display-container {
            display: flex;
            width: 100%;
            height: 100%;
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
        }

        .display-container.grid {
            display: grid;
        }
    `;
	}
	handleSlotChange(e) {
		let t = e.target.assignedElements({ flatten: !0 });
		this.hasSlottedRegions = t.length > 0;
	}
	renderRegionElement(e) {
		return n`
            <fx-display-region
                .label="${e.label}"
                .prefix="${e.prefix}"
                .value="${e.value}"
                .suffix="${e.suffix}"
                .orientation="${e.orientation}"
                .align="${e.align}"
                .bg="${e.bg}"
                .color="${e.color}"
                .labelColor="${e.labelColor}"
                .prefixColor="${e.prefixColor}"
                .valueColor="${e.valueColor}"
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
                style="${e.style || ""}"
            ></fx-display-region>
        `;
	}
	render() {
		let e = this.layout === "grid", t = this.layout === "horizontal" || this.layout === "h", r = "vertical";
		e ? r = "grid" : t && (r = "horizontal");
		let i = `
            gap: ${this.gap};
            grid-template-columns: ${this.gridTemplate || "repeat(auto-fit, minmax(0, 1fr))"};
        `;
		return n`
            ${n`
            <style>
                :host {
                    ${this.width ? `width: ${this.width};` : ""}
                    ${this.height ? `height: ${this.height};` : ""}
                    background-color: ${this.bg || "transparent"};
                    border: ${this.border};
                    border-radius: ${this.borderRadius};
                    padding: ${this.padding};
                }
            </style>
        `}
            <div class="display-container ${r}" style="${i}">
                <slot @slotchange="${this.handleSlotChange}" style="display: contents;"></slot>

                ${!this.hasSlottedRegions && this.regions && this.regions.length > 0 ? this.regions.map((e) => this.renderRegionElement({
			label: e.label || "",
			prefix: e.prefix || "",
			value: _(e.value) ? "" : String(e.value),
			suffix: e.suffix || "",
			orientation: e.orientation || "horizontal",
			align: e.align || "center",
			bg: e.bg || "",
			color: e.color || "",
			labelColor: e.labelColor || "",
			prefixColor: e.prefixColor || "",
			valueColor: e.valueColor || "",
			suffixColor: e.suffixColor || "",
			fontSize: e.fontSize || "",
			labelSize: e.labelSize || "",
			prefixSize: e.prefixSize || "",
			valueSize: e.valueSize || "",
			suffixSize: e.suffixSize || "",
			labelWeight: e.labelWeight || "",
			valueWeight: e.valueWeight || "",
			prefixWeight: e.prefixWeight || "",
			suffixWeight: e.suffixWeight || "",
			icon: e.icon || "",
			iconColor: e.iconColor || "",
			iconSide: e.iconSide || "left",
			style: `
                        ${_(e.flex) ? "" : `flex: ${e.flex};`}
                        ${e.width ? `width: ${e.width};` : ""}
                        ${e.height ? `height: ${e.height};` : ""}
                        ${e.padding ? `padding: ${e.padding};` : ""}
                        ${e.margin ? `margin: ${e.margin};` : ""}
                        ${e.border ? `border: ${e.border};` : ""}
                        ${e.borderRadius ? `border-radius: ${e.borderRadius};` : ""}
                    `
		})) : ""}

                ${!this.hasSlottedRegions && (!this.regions || this.regions.length === 0) ? this.renderRegionElement({
			label: this.label,
			prefix: this.prefix,
			value: this.value,
			suffix: this.suffix,
			orientation: this.orientation,
			align: this.align,
			bg: this.bg === "#0b0f19" ? "" : this.bg,
			color: this.color,
			labelColor: this.labelColor,
			prefixColor: this.prefixColor,
			valueColor: this.valueColor,
			suffixColor: this.suffixColor,
			fontSize: this.fontSize,
			labelSize: this.labelSize,
			prefixSize: this.prefixSize,
			valueSize: this.valueSize,
			suffixSize: this.suffixSize,
			labelWeight: this.labelWeight,
			valueWeight: this.valueWeight,
			prefixWeight: this.prefixWeight,
			suffixWeight: this.suffixWeight,
			icon: this.icon,
			iconColor: this.iconColor,
			iconSide: this.iconSide,
			style: "flex: 1;"
		}) : ""}
            </div>
        `;
	}
};
l([o({
	type: String,
	reflect: !0
})], Z.prototype, "layout", void 0), l([o({ type: String })], Z.prototype, "gap", void 0), l([o({
	type: String,
	attribute: "grid-template"
})], Z.prototype, "gridTemplate", void 0), l([o({ type: String })], Z.prototype, "width", void 0), l([o({ type: String })], Z.prototype, "height", void 0), l([o({ type: String })], Z.prototype, "padding", void 0), l([o({ type: String })], Z.prototype, "border", void 0), l([o({
	type: String,
	attribute: "border-radius"
})], Z.prototype, "borderRadius", void 0), l([o({
	type: String,
	attribute: "bg"
})], Z.prototype, "bg", void 0), l([o({ type: Array })], Z.prototype, "regions", null), l([o({ type: String })], Z.prototype, "label", void 0), l([o({ type: String })], Z.prototype, "prefix", void 0), l([o({ type: String })], Z.prototype, "value", void 0), l([o({ type: String })], Z.prototype, "suffix", void 0), l([o({
	type: String,
	attribute: "region-orientation"
})], Z.prototype, "orientation", void 0), l([o({
	type: String,
	attribute: "region-align"
})], Z.prototype, "align", void 0), l([o({ type: String })], Z.prototype, "color", void 0), l([o({
	type: String,
	attribute: "label-color"
})], Z.prototype, "labelColor", void 0), l([o({
	type: String,
	attribute: "prefix-color"
})], Z.prototype, "prefixColor", void 0), l([o({
	type: String,
	attribute: "value-color"
})], Z.prototype, "valueColor", void 0), l([o({
	type: String,
	attribute: "suffix-color"
})], Z.prototype, "suffixColor", void 0), l([o({
	type: String,
	attribute: "font-size"
})], Z.prototype, "fontSize", void 0), l([o({
	type: String,
	attribute: "label-size"
})], Z.prototype, "labelSize", void 0), l([o({
	type: String,
	attribute: "prefix-size"
})], Z.prototype, "prefixSize", void 0), l([o({
	type: String,
	attribute: "value-size"
})], Z.prototype, "valueSize", void 0), l([o({
	type: String,
	attribute: "suffix-size"
})], Z.prototype, "suffixSize", void 0), l([o({
	type: String,
	attribute: "label-weight"
})], Z.prototype, "labelWeight", void 0), l([o({
	type: String,
	attribute: "value-weight"
})], Z.prototype, "valueWeight", void 0), l([o({
	type: String,
	attribute: "prefix-weight"
})], Z.prototype, "prefixWeight", void 0), l([o({
	type: String,
	attribute: "suffix-weight"
})], Z.prototype, "suffixWeight", void 0), l([o({ type: String })], Z.prototype, "icon", void 0), l([o({
	type: String,
	attribute: "icon-color"
})], Z.prototype, "iconColor", void 0), l([o({
	type: String,
	attribute: "icon-side"
})], Z.prototype, "iconSide", void 0), l([s()], Z.prototype, "hasSlottedRegions", void 0), Z = l([a("fx-display")], Z);
//#endregion
//#region src/stories/measure/FxDigitalDisplay.ts
var Ce, we = class extends X {
	static {
		Ce = this;
	}
	constructor(...e) {
		super(...e), this.isDigital = !0;
	}
	static ensureFont() {
		let e = "ds-digital-global-font";
		if (typeof document < "u" && !document.getElementById(e)) {
			let t = document.createElement("link");
			t.id = e, t.rel = "stylesheet", t.href = "https://fonts.cdnfonts.com/css/ds-digital", document.head.appendChild(t);
		}
	}
	connectedCallback() {
		super.connectedCallback(), Ce.ensureFont();
	}
	static {
		this.styles = [X.styles, t`
            :host([is-digital]) .value {
                font-family: 'DS-Digital', monospace;
                letter-spacing: 0.05em;
                text-shadow: 0 0 6px currentColor;
            }
        `];
	}
	renderValueContent() {
		return n`
            ${_(this.value) ? "" : n`<span class="value">${this.value}</span>`}
        `;
	}
};
l([o({
	type: Boolean,
	attribute: "is-digital",
	reflect: !0
})], we.prototype, "isDigital", void 0), we = Ce = l([a("fx-digital-display-region")], we);
var Te = class extends Z {
	constructor(...e) {
		super(...e), this.isDigital = !0;
	}
	renderRegionElement(e) {
		return n`
            <fx-digital-display-region
                .label="${e.label}"
                .prefix="${e.prefix}"
                .value="${e.value}"
                .suffix="${e.suffix}"
                .orientation="${e.orientation}"
                .align="${e.align}"
                .isDigital="${_(e.isDigital) ? this.isDigital : e.isDigital}"
                .bg="${e.bg}"
                .color="${e.color}"
                .labelColor="${e.labelColor}"
                .prefixColor="${e.prefixColor}"
                .valueColor="${e.valueColor}"
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
                style="${e.style || ""}"
            ></fx-digital-display-region>
        `;
	}
};
l([o({
	type: Boolean,
	attribute: "is-digital",
	reflect: !0
})], Te.prototype, "isDigital", void 0), Te = l([a("fx-digital-display")], Te);
//#endregion
//#region src/stories/base/FxPanelElement.ts
var Ee = class extends c {}, Q = class extends Ee {
	constructor(...e) {
		super(...e), this.title = "", this.titleColor = "#94a3b8", this.bg = "#111827", this.border = "1px solid #1f2937", this.borderRadius = "8px", this.padding = "20px", this.gap = "20px", this.flexDirection = "column", this.layout = "flex", this.gridTemplate = "";
	}
	static {
		this.styles = [m, t`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
                overflow: hidden;
                width: 100%;
                font-family: var(--fx-font-family, sans-serif);
            }
        .panel-header {
            width: 100%;
            border-bottom: 1px solid #1f2937;
            padding-bottom: 8px;
            margin-bottom: 12px;
            box-sizing: border-box;
        }
        .panel-title {
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin: 0;
        }
        .panel-content {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
        }
        .panel-content.flex {
            display: flex;
        }
        .panel-content.grid {
            display: grid;
        }
    `];
	}
	render() {
		let e = `
            background: ${this.bg};
            border: ${this.border};
            border-radius: ${this.borderRadius};
            padding: ${this.padding};
        `, t = `
            gap: ${this.gap};
            flex-direction: ${this.flexDirection};
            grid-template-columns: ${this.gridTemplate || "repeat(auto-fit, minmax(0, 1fr))"};
        `;
		return n`
            <style>
                :host {
                    ${e}
                }
                .panel-title {
                    color: ${this.titleColor};
                }
            </style>
            ${this.title ? n`
                <div class="panel-header">
                    <h2 class="panel-title">${this.title}</h2>
                </div>
            ` : ""}
            <div class="panel-content ${this.layout}" style="${t}">
                <slot></slot>
            </div>
        `;
	}
};
l([o({ type: String })], Q.prototype, "title", void 0), l([o({
	type: String,
	attribute: "title-color"
})], Q.prototype, "titleColor", void 0), l([o({ type: String })], Q.prototype, "bg", void 0), l([o({ type: String })], Q.prototype, "border", void 0), l([o({
	type: String,
	attribute: "border-radius"
})], Q.prototype, "borderRadius", void 0), l([o({ type: String })], Q.prototype, "padding", void 0), l([o({ type: String })], Q.prototype, "gap", void 0), l([o({
	type: String,
	attribute: "flex-direction"
})], Q.prototype, "flexDirection", void 0), l([o({ type: String })], Q.prototype, "layout", void 0), l([o({
	type: String,
	attribute: "grid-template"
})], Q.prototype, "gridTemplate", void 0), Q = l([a("fx-panel")], Q);
//#endregion
//#region src/stories/panels/FxStackPanel.ts
var $ = class extends Ee {
	constructor(...e) {
		super(...e), this.orientation = "vertical", this.spacing = "0px", this.align = "stretch", this.width = "", this.height = "", this.padding = "";
	}
	static {
		this.styles = t`
        :host {
            display: flex;
            box-sizing: border-box;
            width: 100%;
        }
        :host([orientation="vertical"]) {
            flex-direction: column;
        }
        :host([orientation="horizontal"]) {
            flex-direction: row;
            width: auto;
        }
    `;
	}
	get extraStyles() {
		return Object.entries({
			width: this.width,
			height: this.height,
			padding: this.padding
		}).filter(([e, t]) => !_(t) && t !== "").map(([e, t]) => `${e}: ${t};`);
	}
	render() {
		return n`
            <style>
                :host {
                    gap: ${this.spacing};
                    align-items: ${this.align};
                    ${this.extraStyles.join(" ")}
                }
            </style>
            <slot></slot>
        `;
	}
};
l([o({
	type: String,
	reflect: !0
})], $.prototype, "orientation", void 0), l([o({ type: String })], $.prototype, "spacing", void 0), l([o({
	type: String,
	reflect: !0
})], $.prototype, "align", void 0), l([o({ type: String })], $.prototype, "width", void 0), l([o({ type: String })], $.prototype, "height", void 0), l([o({ type: String })], $.prototype, "padding", void 0), $ = l([a("fx-stack-panel")], $);
//#endregion
export { Te as FxDigitalDisplay, we as FxDigitalDisplayRegion, Z as FxDisplay, X as FxDisplayRegion, k as FxFader, T as FxFaderThumb, A as FxFaderThumbFader, j as FxFaderThumbPointer, g as FxGaugeNeedle, M as FxGaugeNeedleTriangle, I as FxKnob, J as FxLedIndicator, P as FxLinearGauge, D as FxLinearScale, b as FxMeasureValueDisplay, Q as FxPanel, L as FxPotentiometer, R as FxPotentiometerKnobRect, z as FxPushButton, w as FxRadialGauge, C as FxRadialScale, F as FxRadialSimpleScale, q as FxRadialSwitch, W as FxRotarySelector, B as FxRotarySelectorSector, $ as FxStackPanel, K as FxSwitch, G as FxSwitchState, Y as FxVuMeter, m as themeVariables };
