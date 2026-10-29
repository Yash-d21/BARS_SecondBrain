# 2026-10-29 send results

**Pack:** none drafted  
**From:** `connect@barsconsulting.in` · **Reply-To:** `anirudh@barsconsulting.in`  
**Result:** **not sent**  
**Sent date:** 2026-10-29  
**SMTP:** 0 companies / 0 messages · failed 0  
**companies.csv:** unchanged

Fewer than 20 sendable healthcare rows remained. After dedupe against `companies.csv` (`sent=yes`) and every dated pack, including the held `23rd-sep.md` draft, no unsent row still has an Active CIN, a High inbox for this company, a healthcare or wellness product the research supports, and a domain that accepts mail.

MX recheck on 2026-10-29 did not revive previously skipped domains. `fitsocial.in`, `urbanhelps.in`, `healthup.care`, `drpatros.com`, `viyonapharmaceuticals.com`, `originfertilitycenter.com`, `mindvera.com`, and `aetherrain.com` still have no MX. `digitalmeds.co`, `ethikaworklife.com`, and `tridhascholars.com` also have no MX. `medyblog.com` has no MX. `foynaturals.com` publishes a null MX (`0 .`). `biochiol.com`, `healtheeliving.com`, and `nmantra.in` still point MX at the website host. `uwe.care` still resolves to the parking exchanger `park-mx.above.com`. `mymedpolicy.com` points MX at `mail.mymedpolicy.com` and the Hyderabad brand still has no matched CIN.

Domains that do accept mail stayed off for a non-routing reason: `makeyoufit.in` (Zoho), `therapickmind.com` (SecureServer), `vedicneeds.com` (Hostinger), `bharatfit.in` (SecureServer), `nutriscan.app`, `mylktree.com`, `snugbug.co`, `nuform.in`, `carin.life`, `earthful.me`, and `thebeyondedge.com` (Google), plus `neuformnutrition.com` and `venica.in` (Hostinger), are brand-only, blocked, NOT UNLOCKED, or have no CIN. `bharatfit.in` accepts mail, and the addresses on that row belong to a different legal entity. `chewlynutritions.com` (Zoho) and `ainetwork.in` (SecureServer) accept mail but the local-part is masked. `fitaf.in` now accepts mail at `smtp.google.com`, and the dossier still says not to send: product ownership is not confirmed. `playcafediaries.in`, `sidventures.in`, and `ninnti.com` accept mail, and the research is a cafe, a marketing brand with a CA inbox, and e-commerce software. `amplifylife.com` accepts mail at Outlook, and that inbox is the sibling brand, not the Nxtgen company inbox. `sciencehood.info` accepts mail and the entity is a publisher.

Gmail rows that stayed off: Blossom14 (`Projectmhuda@gmail.com` reads as a filing inbox, and no product is verified), Maverick Medicare (personal portfolio address, MCA inbox not unlocked), AyurvedShakti (brand inbox, no CIN), and NMANTRA (CIN blocked).

Blocked, masked, NOT UNLOCKED, brand-only or no-CIN, strike-off, CIRP, liquidation, dormant, filing, CA, company-secretary, sister-entity, and non-healthcare rows stayed off. Scaled ekincare was left off: the research is a Series B company, so a startup books plate would invent the pain. SMTP was not called. Nothing was marked sent.

| # | Company | Emails | Subject | Send result |
|---|---------|--------|---------|-------------|
| - | - | - | - | no sendable company |

Telegram notify did not run: `TELEGRAM_CHAT_ID` is unset. The bot username is not a chat id, and this run did not poll `getUpdates`. Do not treat a Telegram summary as sent.
