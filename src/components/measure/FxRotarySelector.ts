import { LitElement, html, svg, css } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./FxRotarySelectorSector";
import { FxRotarySelectorSector } from "./FxRotarySelectorSector";

export type RotarySector = {
    id: string;
    label: string;
    color: string;
    textColor: string;
    ranges: string[];
    startDeg: number;
    endDeg: number;
}

export type RotaryChangeEvent = {
    sectorId: string;
    range: string;
}

const CX = 150;
const CY = 150;
const OUTER_R = 130;
const INNER_R = 62;

function degToRad(d: number): number {
    return (d * Math.PI) / 180;
}

function polarToXY(deg: number, r: number): { x: number; y: number } {
    const rad = degToRad(deg - 90);
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function arcPath(
    startDeg: number,
    endDeg: number,
    outerR: number,
    innerR: number,
): string {
    let end = endDeg;
    if (end <= startDeg) end += 360;
    const s1 = polarToXY(startDeg, outerR);
    const e1 = polarToXY(end, outerR);
    const s2 = polarToXY(end, innerR);
    const e2 = polarToXY(startDeg, innerR);
    const large = end - startDeg > 180 ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 ${large} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerR} ${innerR} 0 ${large} 0 ${e2.x} ${e2.y} Z`;
}

function midAngle(s: RotarySector): number {
    let e = s.endDeg;
    if (e <= s.startDeg) e += 360;
    let mid = s.startDeg + (e - s.startDeg) / 2;
    if (mid >= 360) mid -= 360;
    return mid;
}

function sectorSpan(s: RotarySector): number {
    let e = s.endDeg;
    if (e <= s.startDeg) e += 360;
    return e - s.startDeg;
}

function rangeAngle(s: RotarySector, rangeIdx: number): number {
    const span = sectorSpan(s);
    const frac = s.ranges.length === 1 ? 0.5 : rangeIdx / (s.ranges.length - 1);
    let deg = s.startDeg + frac * span * 0.85 + span * 0.075;
    if (deg >= 360) deg -= 360;
    return deg;
}

function findSectorAtAngle(
    sectors: RotarySector[],
    deg: number,
): RotarySector | null {
    for (const s of sectors) {
        let e = s.endDeg;
        if (e <= s.startDeg) e += 360;
        let d = deg;
        if (s.startDeg > 180 && d < 90) d += 360;
        if (d >= s.startDeg && d < e) return s;
    }
    return null;
}

@customElement("fx-rotary-selector")
export class FxRotarySelector extends LitElement {
    static styles = css`
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

    @property({ type: Array }) sectors: RotarySector[] = [];
    @property({ type: String, attribute: "selected-sector", reflect: true }) selectedSector = "";
    @property({ type: String, attribute: "selected-range", reflect: true }) selectedRange = "";

    @state() private slottedSectors: RotarySector[] = [];
    @state() private needleAngle = 10;

    private raf: number | null = null;
    private animAngle = 10;
    private isDragging = false;

    private modeLabels: Record<string, string> = {
        off: "OFF",
        acv: "Voltage AC",
        dcv: "Voltage DC",
        res: "Resistance",
        cap: "Capacitance",
        dca: "Current DC",
        diode: "Diode / hFE",
    };

    private get effectiveSectors(): RotarySector[] {
        return this.sectors.length > 0 ? this.sectors : this.slottedSectors;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('sectorupdate', this.onSectorUpdate);
        this.syncNeedle(false);
    }

    firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.collectSlottedSectors();

        const effective = this.effectiveSectors;
        if (!this.selectedSector && effective.length > 0) {
            const first = effective[0];
            this.selectedSector = first.id;
            this.selectedRange = first.ranges[0] || '';
            this.syncNeedle(false);
        }
    }

    updated(changed: PropertyValues): void {
        super.updated(changed);
        if (changed.has("selectedSector") || changed.has("selectedRange") || changed.has("sectors") || changed.has("slottedSectors")) {
            this.syncNeedle(true);
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('sectorupdate', this.onSectorUpdate);
        if (this.raf) cancelAnimationFrame(this.raf);
    }

    private onSectorUpdate() {
        this.collectSlottedSectors();
    }

    private collectSlottedSectors() {
        const slot = this.shadowRoot?.querySelector('slot.sectors') as HTMLSlotElement | null;
        if (slot) {
            this.slottedSectors = slot.assignedElements()
                .filter(el => el instanceof FxRotarySelectorSector)
                .map(el => {
                    const s = el as FxRotarySelectorSector;
                    return {
                        id: s.value || s.id,
                        label: s.label,
                        color: s.color,
                        textColor: s.textColor,
                        ranges: s.ranges,
                        startDeg: s.startDeg,
                        endDeg: s.endDeg,
                    };
                });

            if (!this.selectedSector && this.slottedSectors.length > 0) {
                const first = this.slottedSectors[0];
                this.selectedSector = first.id;
                this.selectedRange = first.ranges[0] || '';
                this.syncNeedle(false);
            }
        }
    }

    select(sectorId: string, range?: string): void {
        const sector = this.effectiveSectors.find((s) => s.id === sectorId);
        if (!sector) return;
        this.selectedSector = sectorId;
        this.selectedRange =
            range ?? sector.ranges[Math.floor((sector.ranges.length - 1) / 2)];
        this.emitChange();
    }

    private currentSector(): RotarySector | undefined {
        return this.effectiveSectors.find((s) => s.id === this.selectedSector);
    }

    private syncNeedle(animate: boolean): void {
        const sector = this.currentSector();
        if (!sector) return;
        const ri = sector.ranges.indexOf(this.selectedRange);
        const target = rangeAngle(
            sector,
            ri < 0 ? Math.floor((sector.ranges.length - 1) / 2) : ri,
        );
        if (animate) {
            this.animateTo(target);
        } else {
            this.animAngle = target;
            this.needleAngle = target;
        }
    }

    private animateTo(target: number): void {
        if (this.raf) cancelAnimationFrame(this.raf);
        const step = () => {
            const diff = target - this.animAngle;
            if (Math.abs(diff) < 0.3) {
                this.animAngle = target;
                this.needleAngle = target;
                return;
            }
            this.animAngle += diff * 0.12;
            this.needleAngle = this.animAngle;
            this.raf = requestAnimationFrame(step);
        };
        step();
    }

    private emitChange(): void {
        this.dispatchEvent(
            new CustomEvent<RotaryChangeEvent>("fx-change", {
                detail: {
                    sectorId: this.selectedSector,
                    range: this.selectedRange,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    private angleFromPointer(e: MouseEvent | TouchEvent): number {
        const svgEl = this.renderRoot.querySelector("svg") as SVGSVGElement;
        if (!svgEl) return 0;
        const rect = svgEl.getBoundingClientRect();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        const scaleX = 300 / rect.width;
        const scaleY = 300 / rect.height;
        const x = (clientX - rect.left) * scaleX - CX;
        const y = (clientY - rect.top) * scaleY - CY;
        let deg = (Math.atan2(y, x) * 180) / Math.PI + 90;
        if (deg < 0) deg += 360;
        return deg;
    }

    private onPointerDown(e: MouseEvent | TouchEvent): void {
        this.isDragging = true;
        this.handleAngle(e);
    }

    private onPointerMove(e: MouseEvent | TouchEvent): void {
        if (!this.isDragging) return;
        this.handleAngle(e);
    }

    private onPointerUp(): void {
        this.isDragging = false;
    }

    private handleAngle(e: MouseEvent | TouchEvent): void {
        const deg = this.angleFromPointer(e);
        const sector = findSectorAtAngle(this.effectiveSectors, deg);
        if (!sector || sector.id === this.selectedSector) return;
        this.select(sector.id);
    }

    private selectRange(range: string): void {
        this.selectedRange = range;
        this.syncNeedle(true);
        this.emitChange();
    }

    private renderKnurling() {
        return Array.from({ length: 36 }, (_, i) => {
            const a = degToRad(i * 10 - 90);
            const x1 = CX + 44 * Math.cos(a);
            const y1 = CY + 44 * Math.sin(a);
            const x2 = CX + 50 * Math.cos(a);
            const y2 = CY + 50 * Math.sin(a);
            return svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="#555" stroke-width="1.2"/>`;
        });
    }

    private renderSectors() {
        return this.effectiveSectors.map((s) => {
            const active = s.id === this.selectedSector;
            const p1 = polarToXY(s.startDeg, INNER_R + 2);
            const p2 = polarToXY(s.startDeg, OUTER_R);
            return svg`
        <path
          d=${arcPath(s.startDeg, s.endDeg, OUTER_R, INNER_R + 2)}
          fill=${s.color}
          opacity=${active ? "1" : "0.55"}
          data-id=${s.id}
          style="transition: opacity 0.2s; cursor: pointer;"
        />
        <line x1=${p1.x} y1=${p1.y} x2=${p2.x} y2=${p2.y} stroke="#111" stroke-width="1.5"/>
      `;
        });
    }

    private renderTicks() {
        return this.effectiveSectors.flatMap((s) =>
            s.ranges.map((rng, ri) => {
                const span = sectorSpan(s);
                const frac =
                    s.ranges.length === 1 ? 0.5 : ri / (s.ranges.length - 1);
                let tickDeg = s.startDeg + frac * span * 0.85 + span * 0.075;
                if (tickDeg >= 360) tickDeg -= 360;

                const t1 = polarToXY(tickDeg, OUTER_R - 1);
                const t2 = polarToXY(tickDeg, OUTER_R + 7);
                const lp = polarToXY(tickDeg, OUTER_R + 16);
                const rot =
                    tickDeg > 90 && tickDeg < 270 ? tickDeg + 180 : tickDeg;

                return svg`
          <line x1=${t1.x} y1=${t1.y} x2=${t2.x} y2=${t2.y} stroke=${s.textColor} stroke-width="1.2"/>
          <text
            x=${lp.x} y=${lp.y}
            text-anchor="middle" dominant-baseline="middle"
            font-size="8" fill=${s.textColor} font-family="monospace"
            transform=${`rotate(${rot},${lp.x},${lp.y})`}
          >${rng}</text>
        `;
            }),
        );
    }

    private renderLabels() {
        return this.effectiveSectors.map((s) => {
            const mid = midAngle(s);
            const labelR = (OUTER_R + INNER_R + 2) / 2;
            const lp = polarToXY(mid, labelR);
            const rot = mid > 90 && mid < 270 ? mid + 180 : mid;
            const fontSize = s.id === "off" || s.id === "diode" ? "9" : "11";
            return svg`
        <text
          x=${lp.x} y=${lp.y}
          text-anchor="middle" dominant-baseline="middle"
          font-size=${fontSize} font-weight="600"
          fill=${s.textColor} font-family="monospace"
          transform=${`rotate(${rot},${lp.x},${lp.y})`}
        >${s.label}</text>
      `;
        });
    }

    private renderNeedle() {
        const tip = polarToXY(this.needleAngle, 46);
        return svg`
      <line x1=${CX} y1=${CY} x2=${tip.x} y2=${tip.y} stroke="#e8e8e8" stroke-width="3" stroke-linecap="round"/>
      <circle cx=${CX} cy=${CY} r="7" fill="#555"/>
      <circle cx=${CX} cy=${CY} r="4" fill="#888"/>
    `;
    }

    render() {
        const sector = this.currentSector();
        const modeLabel = sector
            ? (this.modeLabels[sector.id] ?? sector.id)
            : "";
        const displayValue =
            sector?.id === "off" ? "— OFF —" : this.selectedRange;

        return html`
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
                    <span class="mode-label">${modeLabel}</span>
                    <span class="range-value">${displayValue}</span>
                </div>

                ${sector && sector.ranges.length > 1
                    ? html`
                          <div class="ranges">
                              ${sector.ranges.map(
                                  (r) => html`
                                      <button
                                          class=${r === this.selectedRange
                                              ? "active"
                                              : ""}
                                          @click=${() => this.selectRange(r)}
                                      >
                                          ${r}
                                      </button>
                                  `,
                              )}
                          </div>
                      `
                    : ""}
            </div>
        `;
    }
}
