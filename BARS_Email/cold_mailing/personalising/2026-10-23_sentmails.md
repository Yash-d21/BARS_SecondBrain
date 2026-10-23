# 2026-10-23 send results

**Pack:** none drafted  
**From:** `connect@barsconsulting.in` · **Reply-To:** `anirudh@barsconsulting.in`  
**Result:** **not sent**  
**Sent date:** 2026-10-23  
**SMTP:** 0 companies / 0 messages · failed 0  
**companies.csv:** unchanged

Fewer than 20 sendable healthcare rows remained. After dedupe against `companies.csv` (`sent=yes`) and every dated pack, including the held `23rd-sep.md` draft, no unsent row still has an Active CIN, a High inbox for this company, a healthcare or wellness product the research supports, and a domain that accepts mail.

MX was rechecked for domains earlier left off only for routing. `fitsocial.in`, `urbanhelps.in`, `healthup.care`, `drpatros.com`, `viyonapharmaceuticals.com`, `originfertilitycenter.com`, `mindvera.com`, and `aetherrain.com` still have no MX. `foynaturals.com` publishes a null MX. `biochiol.com` and `healtheeliving.com` still point MX at the website host. `uwe.care` resolves to a parking exchanger.

Blocked, masked, NOT UNLOCKED, brand-only or no-CIN, strike-off, CIRP, liquidation, dormant, filing, and non-healthcare rows stayed off. SMTP was not called. Nothing was marked sent.

| # | Company | Emails | Subject | Send result |
|---|---------|--------|---------|-------------|
| — | — | — | — | no sendable company |

Telegram notify did not run: `TELEGRAM_CHAT_ID` is unset. The bot username is not a chat id, and this run did not poll `getUpdates`. Do not treat a Telegram summary as sent.
