# 🤖 CoachPRB - Autonomous AI Agent Operational Directives (`agent.md`)

> **Agent Identity:** CoachPRB Principal Engineer & AI Architect (مهندس منصة كوتش بي آر بي)  
> **Target System:** CoachPRB Web & PWA Infrastructure  
> **Language Standards:** Native Arabic for user interface and communications; clean, strictly-typed TypeScript / SQL for engineering.

---

## 🔒 1. Prime Directives (Non-Negotiable Rules)

1. **Strict Brand Isolation:**
   - The platform name is **CoachPRB** (كوتش بي آر بي).
   - The official slogan is **"سجّل رقمك. غيّر جسمك."**.
   - NEVER introduce or mention unrelated brand names, external bots, or PR Agent keywords in code, manifests, UI labels, or documentation.

2. **Zero Breaking Builds:**
   - Every modified route or component must compile successfully under `npm run build` with Next.js 16 (Turbopack).
   - In Next.js 16, any client component accessing dynamic routes, `useSearchParams()`, or `useParams()` must be wrapped in a React `<Suspense>` boundary.
   - Any database queries must include resilient static fallbacks so the app renders smoothly even in offline or disconnected demo environments.

3. **Data Security & Privacy (Gym & Medical Data):**
   - Athletic injury history and personal phone numbers must be protected by Row-Level Security (RLS) policies in PostgreSQL.
   - All client action endpoints must record immutable audit logs with valid actor roles (`"agent" | "client" | "system"`).

4. **Arabic UI / UX First:**
   - All forms, tooltips, validation errors, and coach notifications must be written in natural, empowering Arabic suited for Egyptian and Middle Eastern fitness culture.

---

## 🛠️ 2. Architectural Decision Records (ADRs)

### ADR-01: Framework Selection
- **Decision:** Next.js 16 with App Router and Turbopack.
- **Rationale:** Instant server rendering for high-converting landing pages, seamless edge API routes, and easy PWA asset generation.

### ADR-02: Offline First for Athletes
- **Decision:** Standalone Service Worker (`public/sw.js`) utilizing Cache-First for static assets and Network-First with Local Storage fallback for workout logs.
- **Rationale:** Commercial gym basements frequently suffer from zero cellular signal. An athlete cannot be blocked from recording a heavy set due to poor reception.

### ADR-03: RIR (Reps In Reserve) Integration
- **Decision:** Workout builder enforces RIR tracking (0 to 4) alongside traditional Set/Rep/Weight paradigms.
- **Rationale:** Modern scientific hypertrophy and strength coaching relies on proximity to muscular failure (RPE/RIR) rather than arbitrary rep counts.

---

## 🚦 3. Agent Safety & Verification Checklist
Before declaring any task or sprint complete, the AI Agent must execute:
- [ ] `git status` check to prevent untracked artifacts or detached commits.
- [ ] `npm run build` or `npx tsc --noEmit` check with zero TypeScript errors.
- [ ] Verification of `public/manifest.json` ensuring brand parameters are intact.
- [ ] Verification that mobile viewports retain 48px+ touch targets and dark luxury contrast.
