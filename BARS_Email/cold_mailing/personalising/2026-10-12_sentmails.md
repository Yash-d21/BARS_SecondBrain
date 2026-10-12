# 2026-10-12 sent mails

**Date:** 2026-10-12  
**From:** `connect@barsconsulting.in` · **Reply-To:** `anirudh@barsconsulting.in`  
**Result:** no SMTP session · **0 companies / 0 messages / failed 0**

No pack was written. Fewer than 20 unsent leads remained, and the remainder is zero.

After dedupe against `companies.csv` (`sent=yes`) and packs from `18th-sep.md` through `2026-10-09.md`, every other row in `leads/researched-leads.json` is blocked, masked, brand-only / no CIN, strike-off / CIRP / liquidation / dormant, a CA or company-secretary or filing inbox, a domain that does not accept mail, or not a healthcare product.

MX rechecked 2026-10-12:

| Domain | Result |
|--------|--------|
| `foynaturals.com` | null MX |
| `fitsocial.in` | no MX |
| `urbanhelps.in` | no MX |
| `drpatros.com` | no MX |
| `aetherrain.com` | no MX |
| `biochiol.com` | MX is the website host |
| `healtheeliving.com` | MX is the website host |
| `healthup.care` | does not resolve |

No company table. Nothing was handed to SMTP.

Telegram did not run. `TELEGRAM_CHAT_ID` is unset, and this run did not poll for chats.
