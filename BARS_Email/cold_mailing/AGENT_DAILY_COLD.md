# Agent playbook â€” daily 20 cold sends

**Schedule:** Mondayâ€“Friday 10:00 IST  
**Count:** exactly **20** companies per run (unless fewer unsent remain)  
**From:** `connect@barsconsulting.in` Â· **Reply-To:** `anirudh@barsconsulting.in`  
**Cal.com:** `https://cal.com/anirudh-reddy`  
**Template (mandatory):** BARS_Email/specs/outreach-templates.md + BARS_Email/specs/email-structure.md · every draft MUST use the locked plates (interaction / pain / stay-on / BARS close / Cal.com CTA). No URL, city, or CIN in the body. Bold keywords. 75–120 words.

## Do not

- Invent CIN, product, or revenue facts
- Put URL, city, or CIN in the email body
- Re-mail anyone already in `companies.csv` with `sent=yes`, or listed in `18th-sep.md` / `23rd-sep.md` / `26th-sep.md` / `29th-sep.md` / later packs
- Mail blocked / no-inbox / NOT UNLOCKED rows
- Commit `.secrets/.env` or app passwords
- Listen on Telegram (outbound notify only)

## Steps each run

1. Read prior packs + `companies.csv` + `sent-log.md`. Build exclude set (emails + normalized company names).
2. Load `leads/researched-leads.json` (or xlsx/csv). Pick next **20** High-confidence sendable healthcare/wellness leads with unlocked inbox.
3. Draft using outreach-templates plates (75â€“120 words, bold keywords, no em dash). Write `personalising/<D>th-sep.md` or `YYYY-MM-DD.md` pack in the same format as `29th-sep.md` (headers + Send-to list + Subject + fenced body).
4. Dry-run: `node send_cold_batch.mjs --dry-run personalising/<pack>.md`
5. Send: `node send_cold_batch.mjs --send personalising/<pack>.md` (requires `CONNECT_APP_PASSWORD` in env or `.secrets/.env`)
6. Append CSV rows (`sent=yes`, todayâ€™s date). Append `sent-log.md` section.
7. Write `personalising/YYYY-MM-DD_sentmails.md` listing company, emails, subject, send status.
8. `git add` packs/CSV/sent-log/sentmails â†’ commit â†’ `git push` to `main`.
9. Telegram (one message + optional file docs):
   - `https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage`
   - chat_id=`$TELEGRAM_CHAT_ID`
   - text: summary (date, count sent, failed, pack path)
   - `sendDocument` for `YYYY-MM-DD_sentmails.md` and `sent-log.md` (or the new section)

## Stop conditions

- If unsent researched leads &lt; 20: send remaining, note in Telegram, stop future volume claims.
- If SMTP auth fails: do not invent sends; Telegram the error; leave packs as draft.

