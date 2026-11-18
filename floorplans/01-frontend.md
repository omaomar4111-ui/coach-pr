# Floorplan: 01-Frontend (User Interface & Client Experience)

```
[Founder Suite: Active] | [Floorplan: Active]
Scope: PR Agent Web Application, Dashboard, Navigation & PWA
Repository: coach-pr (PR Agent Pure Edition)
Status: Operational
```

---

## 1. Executive Overview & Routing Matrix

The frontend of PR Agent is built on Next.js 16 with the App Router architecture, TypeScript, Tailwind CSS, Lucide icons, and Shadcn/UI primitives. It operates with 0% legacy code, providing a pure autonomous AI agent management dashboard and modern dark n8n-style marketing UI.

### Route Breakdown

| Route | File Path | Rendering Mode | Purpose |
|---|---|---|---|
| `/` | `src/app/page.tsx` | SSR / Static Pre-rendered | Dark n8n theme marketing landing page, hero preview, and direct CTA. |
| `/inbox` | `src/app/inbox/page.tsx` | Client Component (`'use client'`) | Omnichannel unified inbox (Instagram, WhatsApp, Messenger, Webhook events). |
| `/pipeline` | `src/app/pipeline/page.tsx` | Client Component (`'use client'`) | Visual drag-and-drop / Kanban sales & order stage tracking. |
| `/fleet` | `src/app/fleet/page.tsx` | Client Component (`'use client'`) | Multi-agent control center (10 autonomous PR agents status & toggles). |
| `/flows` | `src/app/flows/page.tsx` | Client Component (`'use client'`) | Interactive drag-and-drop automation builder (triggers, actions, branching). |
| `/settings` | `src/app/settings/page.tsx` | Client Component (`'use client'`) | 5-tab enterprise settings (Profile, Team, Integrations, API/Webhooks, Billing). |
| `/pricing` | `src/app/pricing/page.tsx` | Static Pre-rendered | Localized Egyptian & MENA tier plans (EGP pricing, InstaPay checkout). |
| `/privacy` | `src/app/privacy/page.tsx` | Static Pre-rendered | GDPR & Egyptian PDPL compliance and data retention terms. |
| `/terms` | `src/app/terms/page.tsx` | Static Pre-rendered | Platform service agreements and acceptable AI usage terms. |

---

## 2. Shared Core Components

1. **`src/components/Logo.tsx`**:
   - Universal SVG brand mark representing autonomous AI moderation and agentic routing.
   - Strictly branded as `PR Agent` with dynamic sizing (`sm`, `md`, `lg`) and gradient highlights.

2. **`src/components/PwaInstallPrompt.tsx`**:
   - Native browser detection for iOS Safari (`BeforeInstallPromptEvent` fallback) and Android Chrome.
   - PWA metadata aligned with `public/manifest.json`: Name "PR Agent", short name "PR Agent", dark theme color `#0B0F17`.

3. **`src/components/Sidebar.tsx` / Navigation Shell**:
   - Collapsible omnichannel navigation bar.
   - Unread badges linked to real-time conversation state.
   - Workspace switcher supporting multi-tenant isolation.

---

## 3. Client State & Performance Best Practices

- **Caching & Hydration**: Pages utilize React Server Components for static shells with selective `'use client'` boundaries on data-dense tables and interactive canvas boards.
- **Styling Standards**: Custom CSS variables defined in `src/app/globals.css` ensuring contrast ratios exceeding WCAG AAA standards.
- **PWA Capabilities**: Service worker caching and offline fallback for network disruptions during merchant mobile usage.
