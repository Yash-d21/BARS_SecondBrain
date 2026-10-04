# 2026-10-04 send results

**Pack:** none drafted today  
**From:** `connect@barsconsulting.in` · **Reply-To:** `anirudh@barsconsulting.in`  
**Result:** **not sent**  
**Reason:** `BARS_Email/.secrets/.env` is missing. `CONNECT_APP_PASSWORD`, `TELEGRAM_BOT_TOKEN`, and `TELEGRAM_CHAT_ID` are not in the process environment. SMTP auth was not attempted and no message was handed to Gmail. Telegram was not notified.  
**Dry-run:** queued drafts only, 80 companies / 146 messages. No new pack.  
**companies.csv:** unchanged (not marked `sent=yes`).

Queued drafts stay unsent, oldest first:

| Pack | Companies | Messages | Send result |
|------|-----------|----------|-------------|
| `BARS_Email/cold_mailing/personalising/2026-09-29.md` | 20 | 29 | not sent |
| `BARS_Email/cold_mailing/personalising/2026-09-30.md` | 20 | 29 | not sent |
| `BARS_Email/cold_mailing/personalising/2026-10-01.md` | 20 | 41 | not sent |
| `BARS_Email/cold_mailing/personalising/2026-10-02.md` | 20 | 47 | not sent |

Company, inbox, and subject rows for each pack are already in that date's `*_sentmails.md`. Do not draft a new slice until these four are actually sent.
