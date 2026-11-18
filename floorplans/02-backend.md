# Floorplan: 02-Backend (API Routes, Webhooks & Service Endpoints)

```
[Founder Suite: Active] | [Floorplan: Active]
Scope: Serverless API Architecture, Webhook Ingestion & Orchestration
Repository: coach-pr (PR Agent Pure Edition)
Status: Operational
```

---

## 1. API Architecture Matrix

All backend operations are served via Next.js App Router API route handlers (`route.ts`), running in an edge/serverless execution model with typed request schemas and structured error handling.

| Endpoint | Method | Security / Auth | Responsibility |
|---|---|---|---|
| `/api/webhooks/meta` | `GET`, `POST` | HMAC-SHA256 (`X-Hub-Signature-256`) | Webhook handshake validation (`hub.challenge`) and live event stream from Instagram & Messenger. |
| `/api/webhooks/whatsapp-evolution` | `POST` | Bearer Token / Global API Key | Ingestion of incoming WhatsApp chats, media messages, and delivery receipts from Evolution API. |
| `/api/chat` | `POST` | Tenant Session / API Token | Multi-agent reasoning pipeline, contextual message resolution, and LLM orchestration. |
| `/api/orders/extract` | `POST` | Tenant Session | Structured order extraction from Arabic dialect text (Name, Phone, Address, Items, Total). |
| `/api/payments/verify` | `POST` | Tenant Session | Vision-based InstaPay & Vodafone Cash receipt validation and fraud cross-check. |
| `/api/settings/config` | `GET`, `POST` | Tenant Admin Token | Workspace configuration, API key generation, and webhook URL registrations. |

---

## 2. Webhook Ingestion & Security Pipelines

### 2.1 Meta Graph Ingestion (`/api/webhooks/meta`)
- **Handshake Verification**: Responds to Meta verification challenge via `hub.verify_token`.
- **Payload Parsing**: Extracts sender ID, recipient ID, message text, and media attachments.
- **Comment-to-DM Pipeline**: Detects post comment triggers and automatically kicks off private DM sequences.

### 2.2 WhatsApp Evolution Ingestion (`/api/webhooks/whatsapp-evolution`)
- **Event Filtering**: Discards group notifications and status updates; isolates direct customer messages (`messages.upsert`).
- **Media Preprocessing**: Converts incoming audio notes and payment receipt screenshots into base64 buffers for LLM inspection.

---

## 3. Idempotency & Error Handling

- **Deduplication Engine**: Uses incoming message IDs (`mid` or `key.id`) cached in-memory and committed to Postgres to guarantee single-delivery execution.
- **Graceful Fallbacks**: If external inference APIs experience latency spikes, the endpoint responds with guaranteed 200 OK within 3000ms and executes processing asynchronously.
