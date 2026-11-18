# 🎨 CoachPRB - System Design & Architecture Specification (`design.md`)

> **Platform:** CoachPRB (كوتش بي آر بي)  
> **Aesthetic:** Dark Luxury Bento Grid / Minimalist Cyber-Strength  
> **Color System:** Deep Obsidian (`#07040D`), Rich Void (`#0B0714`), Electric Violet (`#7C3AED`), Emerald Glow (`#10B981`), Crimson Alert (`#EF4444`)  
> **Typography:** Arabic primary font (Cairo / Readex Pro / IBM Plex Sans Arabic fallback) with Geist / Inter for English digits and metrics.

---

## 🎨 1. UI/UX Design System & Tokens

### Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `bg-primary` | `#07040D` | Main canvas, global dark background |
| `bg-surface` | `#110B1F` | Bento cards, glass modals, elevated surfaces |
| `border-subtle` | `rgba(255, 255, 255, 0.08)` | Bento container borders with 1px hairline |
| `accent-purple` | `#7C3AED` | Primary CTA buttons, brand badges, active tab glow |
| `accent-glow` | `#9061F9` | Hover states, neon border gradients |
| `status-success` | `#10B981` | Completed sets, PR records, healthy client status |
| `status-warning` | `#F59E0B` | RIR 0 (Failure), check-in pending |
| `status-danger` | `#EF4444` | Churn risk (>= 5 days missed), joint injury alerts |

### Bento Grid Philosophy
- All cards share `rounded-2xl border border-white/10 bg-[#110B1F]/60 backdrop-blur-xl`.
- Subtle radial glow effects centered behind primary hero metrics.
- High-contrast typography optimized for dimly lit gym environments and OLED mobile screens.
- Generous tap targets (minimum 48x48px) for quick input while wearing lifting straps or wraps.

---

## 🏗️ 2. Information Architecture & Navigation

```mermaid
graph TD
    Landing["/ (Landing Page - Bento Grid)"]
    CoachAuth["/login (Coach Authentication)"]
    Dashboard["/dashboard (Coach Overview)"]
    Clients["/dashboard/clients (Client Roster)"]
    ClientProfile["/dashboard/clients/:id (Medical & Progress Vault)"]
    Builder["/dashboard/builder (Workout Builder Pro)"]
    FormCheck["/dashboard/formcheck (Video Form Check)"]
    AthleteApp["/app (Trainee Gym PWA Mode)"]

    Landing --> CoachAuth
    CoachAuth --> Dashboard
    Dashboard --> Clients
    Clients --> ClientProfile
    ClientProfile --> Builder
    Dashboard --> Builder
    Dashboard --> FormCheck
    Landing --> AthleteApp
```

---

## 🗄️ 3. Database Schema (Supabase / PostgreSQL)

### ERD Diagram
```mermaid
erDiagram
    COACHES ||--o{ CLIENTS : manages
    CLIENTS ||--o{ WORKOUT_PLANS : assigned_to
    WORKOUT_PLANS ||--o{ WORKOUT_DAYS : contains
    WORKOUT_DAYS ||--o{ EXERCISE_BLOCKS : contains
    EXERCISE_BLOCKS ||--o{ SET_PRESCRIPTIONS : prescribes
    CLIENTS ||--o{ WORKOUT_LOGS : performs
    WORKOUT_LOGS ||--o{ LOGGED_SETS : records
    CLIENTS ||--o{ FORM_CHECKS : submits

    COACHES {
        uuid id PK
        string full_name
        string email
        string phone
        string tier
        timestamp created_at
    }

    CLIENTS {
        uuid id PK
        uuid coach_id FK
        string full_name
        string phone
        string goal
        text[] injuries
        string status
        timestamp last_active_at
    }

    WORKOUT_PLANS {
        uuid id PK
        uuid coach_id FK
        uuid client_id FK
        string title
        text description
        boolean is_active
        timestamp created_at
    }

    WORKOUT_DAYS {
        uuid id PK
        uuid plan_id FK
        string day_name
        int sort_order
    }

    EXERCISE_BLOCKS {
        uuid id PK
        uuid day_id FK
        string exercise_name
        string target_muscle
        string joint_caution
        int sort_order
    }

    SET_PRESCRIPTIONS {
        uuid id PK
        uuid exercise_block_id FK
        int set_number
        float target_weight_kg
        int target_reps
        int target_rir
        int rest_seconds
    }

    WORKOUT_LOGS {
        uuid id PK
        uuid client_id FK
        uuid day_id FK
        timestamp completed_at
        text athlete_feedback
    }

    LOGGED_SETS {
        uuid id PK
        uuid workout_log_id FK
        uuid exercise_block_id FK
        int set_number
        float actual_weight_kg
        int actual_reps
        int actual_rir
    }

    FORM_CHECKS {
        uuid id PK
        uuid client_id FK
        string exercise_name
        string video_url
        string status
        text coach_notes
        string voice_note_url
        timestamp created_at
    }
```

---

## ⚡ 4. Offline Service Worker & Sync Protocol
1. **App Shell Caching:** All Next.js static chunks, `/`, `/dashboard`, `/dashboard/builder`, and `/app` are pre-cached on PWA registration.
2. **Offline Mutation Queue:** In-gym logged sets write immediately to local storage (`localStorage` / `IndexedDB`).
3. **Background Sync:** The service worker intercepts network recovery (`window.addEventListener('online')`), flushes cached sets to `/api/logs/sync`, and displays a toast confirmation to the athlete.
