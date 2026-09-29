# Zoho Workflow

**Status:** locked  
**Decision:** [[decisions/04-crm-setup]]  
**Playbook:** [[manual-pilot-playbook#Step 4 — Send]]

---

## When to create/update a lead

| Trigger | Action | Lead Status |
|---------|--------|-------------|
| Email sent | Create lead in Zoho | `Contacted` |
| Reply received | Update lead | `Replied` |
| Discovery call booked | Update lead | `Meeting` |
| Client signed | Update lead | `Converted` |
| Not interested / no fit | Update lead | `Lost` |

## Fields (pilot)

Use **default Leads fields only:**

| Field | Value |
|-------|-------|
| Company | From xlsx `Company Name` |
| First Name / Last Name | From research |
| Email | Found email |
| Lead Source | `DPIIT Cold Outreach` |
| Description | Paste Stage, Industry, research hook |
| Owner | Person who sent |

No custom fields for pilot.

## xlsx ↔ Zoho

**Manual sync** — no script, no integration for pilot.

| xlsx column | When |
|-------------|------|
| `sent_date` | On send |
| `zoho_id` | After creating Zoho lead |
| `reply_received` | On reply |
| `meeting_booked` | On call booked |

## Email integration

**Skip for pilot.** Check replies in Gmail inbox for `connect@barsconsulting.in`, update Zoho manually.

Post-pilot: consider Zoho ↔ Google Workspace integration.
