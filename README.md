# Constant-Flow Procurement

> Luxury React + Vite landing page for Constantflow — global industrial procurement of oil & gas equipment, heavy machinery, industrial components, and power systems.

---

## Stack

| Layer | Tooling |
|---|---|
| Framework | **React 18.3** (`react-jsx` runtime) |
| Build | **Vite 5.4** + `@vitejs/plugin-react` |
| TypeScript | 5.5 strict, `baseUrl: "."` → `paths: { "@/*": ["./src/*"] }` (via `vite-tsconfig-paths` plugin) |
| Styling | **Tailwind CSS 3.4** + PostCSS / Autoprefixer — brand palette: `#080A7E` navy / `#D78034` gold / `#F8F9FC` page |
| Animations | **framer-motion** (hero halos, gradient card photo micro-interactions) |
| Variants | **class-variance-authority** (GradientCard CVA, header variants) |
| Class merge | `clsx` + `tailwind-merge` → `cn()` in `@/lib/utils` (shadcn pattern) |

### Vector icon libraries (tree-shaken, individually importable)

Three libraries so engineers can pick by aesthetic:

| Library | Best for | Import path |
|---|---|---|
| **lucide-react** (already in use) | System UI, actions, controls (Arrows, Crown, Globe, Settings, Factory) | `import { … } from "lucide-react"` |
| **@tabler/icons-react** | Heavy-industry glyphs (Truck, Factory, World, Certificate, Flame, Gauge) | `import { Icon… } from "@tabler/icons-react"` |
| **react-icons** | Massive catalog of category marks — Gi (game/industrial), Md (Material), Fa (Font Awesome), etc. | `import { GiOilCan } from "react-icons/gi"` / `import { MdBuild } from "react-icons/md"` |

Install command (already applied):
```bash
npm install --save lucide-react @tabler/icons-react react-icons
```

`vite`'s ESM bundler dead-code eliminates any icon not explicitly imported (no 10+ MB full-library leak into the production bundle). See § Icons below.

---

## Quick start

```bash
npm install --legacy-peer-deps
npm run dev      # Vite dev server
npm run build    # tsc -b strict then vite build
npm run vercel-build  # matches production: postinstall-repair → tsc -b → vite build
npm run preview  # serve dist/ locally
```

Project root: `c:\Users\prosp\Desktop\Procurement`

---

## Folder structure

```
Procurement/
├─ index.html
├─ package.json · vite.config.ts · tsconfig.json · tsconfig.app.json · tailwind.config.js · postcss.config.js
├─ scripts/
│  └─ postinstall-repair.mjs        # node_modules integrity self-check (runs on install / prebuild)
└─ src/
   ├─ main.tsx · index.css · App.tsx · App.css
   ├─ lib/
   │  └─ utils.ts                    # cn(...) — shadcn class-merge helper (clsx + tailwind-merge)
   ├─ assets/
   │  ├─ hero.png · mobile hero bg.png
   │  ├─ condenser.png · excavator.png · transformer.png · pipe.png
   │  └─ (logo marks etc.)
   └─ components/
      ├─ Header.tsx · Header.css      # sticky light header (global strip)
      ├─ DarkHeader.tsx · DarkHeader.css  # transparent hero header + premium slide-in mobile menu
      ├─ PageSplash.tsx
      └─ ui/
         ├─ glassmorphism-trust-hero.tsx
         ├─ gradient-card.tsx         # CVA brand-gradient product cards
         ├─ ServicesCategories.tsx    # "WHAT WE PROCURE" → 4 product cards
         └─ AppendixIconShowcase.tsx  # ← Icon playground / reference UI
```

---

## Icons

### 1. Basic import

Always import **individual icons by name** — this enables tree-shaking:

```tsx
import { ArrowRight, Globe2, Factory, Crown, Target, CheckCircle2 } from "lucide-react";

// @tabler/icons-react 3.x ships per-icon ESM files.
// The package.json "module" entry in 3.46.0 references a missing top-level barrel.
// So import from the deep icons index — Vite resolves it, still tree-shaken:
import {
  IconTruckDelivery,
  IconBuildingFactory2,
  IconWorld,
  IconCertificate,
  IconFlame,
  IconGauge,
} from "@tabler/icons-react/dist/esm/icons/index.mjs";

import { FaOilCan } from "react-icons/fa";
import { GiFactory, GiElectric, GiPipes } from "react-icons/gi";
import { MdOutlineElectricalServices } from "react-icons/md";
```

⚠️ Never do this — it defeats tree-shaking (DO **NOT** commit):
```tsx
import * as icons from "lucide-react";   // ❌ pulls entire ~6 MB catalog into your bundle
import { GiOilCan as _ } from "react-icons/gi/index.mjs";  // ❌ forces a non-ESM entry
```

### 2. Sizing & scaling

The three libraries share a common pattern — pass `width` / `height` props OR a Tailwind `w-* h-*` utility:

```tsx
<div className="flex items-end gap-5">
  <ArrowRight width={14} height={14} />
  <ArrowRight className="w-5 h-5" />      {/* 20px */}
  <ArrowRight className="w-6 h-6" />      {/* 24px */}
  <ArrowRight className="w-9 h-9" />      {/* 36px */}
  <ArrowRight className="w-12 h-12" />    {/* 48px */}
</div>
```

### 3. Color via Tailwind classes

Stick to the brand palette in `tailwind.config.js → theme.extend.colors.brand.*`:

| Brand token | Hex | Use on icons |
|---|---|---|
| `brand-primary` | `#080A7E` | Nav, primary CTAs, navy accent marks |
| `brand-accent` | `#D78034` | Gold CTAs, "Sourcing live" dots, hero gradient passes |
| `brand-success` | `#2E7D4F` | Verified supplier pills, QC badges |
| `brand-warning` | `#D78034` | Alert / amber status chips |
| `brand-textPrimary` | `#1A1C2E` | Copy ink |
| `brand-textSecondary` | `#5A5E7A` | Subcopy, labels |

```tsx
<Crown className="w-10 h-10 text-brand-accent fill-brand-accent/10" /> {/* filled gold crown */}
<Globe2 className="w-6 h-6 text-brand-primary" />                     {/* solid navy globe */}
<CheckCircle2 className="w-5 h-5 text-brand-success" />                {/* green check */}
<Factory className="w-5 h-5 text-brand-textSecondary/50" />            {/* muted 50% factory */}
```

### 4. Rotation & stroke width (stroke libraries: Lucide / Tabler)

- **Lucide** accepts `strokeWidth={1.25 | 1.5 | 1.75 | 2.25}`
- **Tabler** accepts `stroke={1.25 | 1.5 | 2}`
- **Rotate** any SVG icon via Tailwind `rotate-*` / `origin-center`:

```tsx
<div className="flex items-center gap-6">
  <ArrowRight className="w-9 h-9 text-brand-primary origin-center rotate-0" />
  <ArrowRight className="w-9 h-9 text-brand-primary origin-center rotate-45" strokeWidth={1.25} />
  <ArrowRight className="w-9 h-9 text-brand-primary origin-center rotate-90" strokeWidth={1.75} />
  <ArrowRight
    className="w-9 h-9 text-brand-primary origin-center"
    style={{ transform: "rotate(-15deg)" }}
    strokeWidth={2.25}
  />
</div>
```

### 5. Dynamic icon swap (common pattern — CTAs / status pills)

```tsx
import { useState } from "react";
import { Factory, ArrowRight, Globe2, CheckCircle2 } from "lucide-react";

const ORDER_STAGES = [
  { label: "Procure", Icon: Factory,  color: "text-brand-primary" },
  { label: "Deliver", Icon: ArrowRight, color: "text-brand-accent" },
  { label: "Global",  Icon: Globe2,    color: "text-brand-success" },
  { label: "Quality", Icon: CheckCircle2, color: "text-brand-warning" },
] as const;

export function StatusPill() {
  const [i, setI] = useState(0);
  const { Icon, label, color } = ORDER_STAGES[i];
  return (
    <button onClick={() => setI((i + 1) % ORDER_STAGES.length)} className="flex items-center gap-3">
      <Icon width={36} height={36} className={`${color} text-white`} />
      <span>{label}</span>
    </button>
  );
}
```

### 6. Which library should I pick? (decision helper)

| Need | Library | Example |
|---|---|---|
| UI buttons / system icons — hero CTAs, menus, chevrons | ✅ **lucide-react** | ArrowRight, Menu, X, CircleDot, Check, Eye |
| Heavy-industry / operations — truck, factory, plant, gauge | ✅ **@tabler/icons-react** | IconTruckDelivery, IconBuildingFactory2, IconFlame, IconGauge |
| Brand / category marks that Lucide+Tabler miss (oil drum, turbine, crane) | ✅ **react-icons** (`gi/`, `md/`, `fa6/`) | GiPipette, MdOutlineElectricalServices, FaOilCan |

### 7. Troubleshooting

| Symptom | Root cause / fix |
|---|---|
| Build blows up with **TS2307 cannot find module `@tabler/icons-react`** | Ensure you ran `npm install --legacy-peer-deps` after checkout; `node_modules/@tabler/icons-react/package.json` must exist. |
| **Vite: Failed to resolve entry for package "@tabler/icons-react"** | `@tabler/icons-react@3.46.0` package.json declares `module: ./dist/esm/tabler-icons-react.mjs` but the barrel file is **not shipped** (only per-icon files in `dist/esm/icons/*.mjs` exist). Fix: import from the deep ESM icons index exactly as shown above: `from "@tabler/icons-react/dist/esm/icons/index.mjs"`. |
| Vercel `vite build` produces a **huge JS bundle** (5+ MB) | Somebody star-imported a full icon library — grep for `import * as … from "lucide-react"` / `from "react-icons/fa"` without individual destructuring. Replace with named imports. |
| Icon **color won't change** with `text-*` on a `react-icons/*` icon | Most `react-icons` exports already bake a `fill="currentColor"` so Tailwind `text-*` works; if not, wrap it: `<span className="text-brand-accent"><GiOilCan /></span>`. |
| Lucide `strokeWidth` **not applying** (icon still looks too thick) | Make sure you're passing the `strokeWidth` numeric prop directly to the Lucide icon, **not** a Tailwind class — Tailwind doesn't have a `stroke-width` utility by default in this project. |
| GradientCard PNGs **obscuring icons** inside the product card | Keep icons in the lower text column (`> 140 px from top`) — see `pt-[140px] sm:pt-[150px]` safe zone in [gradient-card.tsx](./src/components/ui/gradient-card.tsx). |
| Icons render **invisible** in dark (navy) cards | Gold/navy tokens exist: `text-[#ffd89b]` for CTAs on dark gradients, `text-white` for headlines, `text-white/80` for subcopy labels. |

Live reference UI: scroll to the **Vector icon playground** section on the homepage at `#/` → [AppendixIconShowcase.tsx](./src/components/ui/AppendixIconShowcase.tsx) demonstrates all 7 recipes above against the production Tailwind theme.

---

## Design conventions

- **Breakpoint ladder** (Tailwind screens):
  - mobile default → `sm: 640px` → `md: 791px` (tablet ≤ 790px stays mobile) → `lg: 1024px` → `xl: 1280px` → `2xl: 1536px`
- **Z-index production ceiling** (premium mobile-menu stacking):
  - Sticky / fixed headers → `z-900`, slide-in mobile panels → `z-1000`
  - Panels must be rendered outside any `backdrop-filter` / `sticky` ancestor (use React Fragment so the menu is a sibling of the `<header>`, not a child) — see [DarkHeader.tsx](./src/components/DarkHeader.tsx) / [Header.tsx](./src/components/Header.tsx).
- **Scrollbars hidden globally** (index.css) via: `scrollbar-width: none` (Firefox), `-ms-overflow-style: none` (Legacy), `::-webkit-scrollbar { display:none }` (WebKit).
- **Tabular-nums for all clocks / timestamps** — `font-variant-numeric: tabular-nums` + `font-feature-settings: "tnum"` fallback.

---

## Production deploys

Managed via GitHub + Vercel. The `vercel-build` script runs:

```
1. node ./scripts/postinstall-repair.mjs   (12/12 integrity ok → continue)
2. tsc -b                                  (strict TS, fails unused locals TS6133)
3. vite build                              (→ dist/)
```

If Vercel still shows an old commit SHA in the deploy log even after you pushed, open the Vercel dashboard → Deployments → Redeploy with the latest `main` without picking a specific commit. Use `git status` / `git log -1 --oneline` locally to confirm your HEAD matches the deployed commit id.
