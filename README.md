# BARS Second Brain — cold outreach

Healthcare & Wellness cold mailing for **BARS Consulting**.

## Daily automation (Mon–Fri 10:00 IST)

Cloud agent runs each weekday:

1. Pick **20** unsent researched leads from `leads/`
2. Draft with `BARS_Email/specs/outreach-templates.md` plates
3. Write `BARS_Email/cold_mailing/personalising/DD-mon.md` pack
4. SMTP send via `connect@barsconsulting.in` (`send_cold_batch.mjs`)
5. Update `companies.csv` + `sent-log.md`
6. Write `BARS_Email/cold_mailing/personalising/YYYY-MM-DD_sentmails.md`
7. Commit + push pack updates
8. Telegram notify (outbound only) with the day’s sentmails + sent-log summary

## Secrets (Cloud Agent / local `.env`)

Copy `BARS_Email/.secrets/.env.example` → `.env` (never commit `.env`):

| Key | Purpose |
|-----|---------|
| `CONNECT_EMAIL` | `connect@barsconsulting.in` |
| `CONNECT_APP_PASSWORD` | Gmail app password |
| `TELEGRAM_BOT_TOKEN` | BotFather token |
| `TELEGRAM_CHAT_ID` | Your chat id |

## Lead source

- `leads/25k-leads-researched-only.xlsx` / `.csv` / `researched-leads.json`
- Dedup against `BARS_Email/cold_mailing/personalising/companies.csv` and prior packs

## Manual send

```bash
cd BARS_Email/cold_mailing
node send_cold_batch.mjs --dry-run personalising/29th-sep.md
node send_cold_batch.mjs --send personalising/29th-sep.md
```
