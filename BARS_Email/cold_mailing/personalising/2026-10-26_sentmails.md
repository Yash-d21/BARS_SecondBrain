# 2026-10-26 send results

**Pack:** none drafted  
**From:** `connect@barsconsulting.in` · **Reply-To:** `anirudh@barsconsulting.in`  
**Result:** **not sent**  
**Sent date:** 2026-10-26  
**SMTP:** 0 companies / 0 messages · failed 0  
**companies.csv:** unchanged

Fewer than 20 sendable healthcare rows remained. After dedupe against `companies.csv` (`sent=yes`) and every dated pack, including the held `23rd-sep.md` draft, no unsent row still has an Active CIN, a High inbox for this company, a healthcare or wellness product the research supports, and a domain that accepts mail.

MX recheck on 2026-10-26 did not revive previously skipped domains. `fitsocial.in`, `urbanhelps.in`, `healthup.care`, `drpatros.com`, `viyonapharmaceuticals.com`, `originfertilitycenter.com`, `mindvera.com`, and `aetherrain.com` still have no MX. `digitalmeds.co`, `ethikaworklife.com`, and `tridhascholars.com` also have no MX. `foynaturals.com` publishes a null MX. `biochiol.com`, `healtheeliving.com`, and `nmantra.in` still point MX at the website host. `uwe.care` still resolves to the parking exchanger `park-mx.above.com`.

Blocked, masked, NOT UNLOCKED, brand-only or no-CIN, strike-off, CIRP, liquidation, dormant, filing, CA, company-secretary, sister-entity, and non-healthcare rows stayed off. Scaled ekincare was left off: the research is a Series B company, so a startup books plate would invent the pain. SMTP was not called. Nothing was marked sent.

| # | Company | Emails | Subject | Send result |
|---|---------|--------|---------|-------------|
| - | - | - | - | no sendable company |

Telegram notify did not run: `TELEGRAM_CHAT_ID` is unset. The bot username is not a chat id, and this run did not poll `getUpdates`. Do not treat a Telegram summary as sent.
