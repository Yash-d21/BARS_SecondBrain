# 2026-11-16 send results

**Pack:** none drafted  
**From:** `connect@barsconsulting.in` · **Reply-To:** `anirudh@barsconsulting.in`  
**Result:** **not sent**  
**Sent date:** 2026-11-16  
**SMTP:** 0 companies / 0 messages · failed 0  
**companies.csv:** unchanged

Fewer than 20 sendable healthcare rows remained. After dedupe against `companies.csv` (`sent=yes`) and every dated pack, including the held `23rd-sep.md` draft, no unsent row still has an Active CIN, a High inbox for this company, a healthcare or wellness product the research supports, and a domain that accepts mail.

Of 416 rows in `leads/researched-leads.json`, 307 are already sent or named as recipients in a real pack (`sent=yes`, `9th-sep.md`, `16th-sep.md`, `18th-sep.md`, `23rd-sep.md`, `26th-sep.md`, `29th-sep.md`, or a later `YYYY-MM-DD.md`). 26 unsent rows have no email. 83 unsent rows still have an address. None of those 83 passed the send gate. Addresses mentioned only in earlier zero-send notes were rechecked. They were not treated as already mailed. `leads/researched-leads.json` is unchanged since 2026-09-29.

MX recheck on 2026-11-16 did not revive previously skipped domains. `fitsocial.in`, `urbanhelps.in`, and `aetherrain.com` still have no MX (`ENODATA`). `digitalmeds.co`, `ethikaworklife.com`, and `tridhascholars.com` still do not resolve (`ENOTFOUND`). `biochiol.com`, `healtheeliving.com`, and `nmantra.in` still point MX at the website host. `neocortexls.co.in` timed out on lookup; `cortexls.com` accepts mail at Outlook, and the dossier is still CIRP / liquidation. `mymedpolicy.com` points MX at `mail.mymedpolicy.com`, and the Hyderabad brand still has no matched CIN. `tecvertex.com` accepts mail at `mail.tecvertex.com`, and the dossier still says the CIN on that row is a different company. The `.com.com` addresses (`tecvertex.com.com`, `victriz.com.com`) resolve to `inbound-mx.org` / `inbound-mx.net` and stay off as typos.

Domains that do accept mail stayed off for a non-routing reason. `wellnessfuel.in` (`mail.wellnessfuel.in`; do not substitute `info@wellnessfuel.in`, different Delhi/Noida entity), `arivhealthcare.com` (clinic inbox is not Ariv Biosciences), `earthful.me` (Google, Earthlies row has no verified email or CIN for that brand), `occulthouse.in` (SecureServer, different entity), and `igylx.com` (Rediffmail Pro, personal inbox not unlocked). `makeyoufit.in`, `therapickmind.com`, `vedicneeds.com`, `bharatfit.in`, `nutriscan.app`, `mylktree.com`, `snugbug.co`, `nuform.in`, `neuformnutrition.com`, `venica.in`, `carin.life`, `thebeyondedge.com`, and the GLS Pools Gmail stayed off as brand-only, blocked, NOT UNLOCKED, no CIN, or not a healthcare product. `bharatfit.in` accepts mail, and the addresses on that row belong to a different legal entity. `chewlynutritions.com` and `ainetwork.in` accept mail but the local-part is masked. `fitaf.in` accepts mail at `smtp.google.com`, and the dossier still says not to send: product ownership is not confirmed. `playcafediaries.in`, `sidventures.in`, and `ninnti.com` accept mail, and the research is a cafe, a marketing brand with a CA inbox, and e-commerce software. `amplifylife.com` accepts mail at Outlook, and that inbox is the sibling brand, not the Nxtgen company inbox. `sciencehood.info` accepts mail and the entity is a publisher. `srisritattva.com` accepts mail at Zoho, and that inbox is the Sri Sri Tattva company-secretary address, not a Sriveda store inbox. `ekincare.com` accepts mail, and the dossier is a Series B company, so a startup books plate would invent the pain.

Rows with an empty email field stayed off. No local-part was invented for Befine Healthcare or findhope.

Closest Active rows that would bounce, so they stayed off: Civigo (`santoshmaturi@urbanhelps.in`, no MX), Fitsocial (`support@fitsocial.in` / `join@fitsocial.in`, no MX), Aether Rain (`info@aetherrain.com`, no MX), Healtheeliving (`info@healtheeliving.com`, MX equals the website host), and GRST / Biochiol (`info@biochiol.com`, MX equals the website host). Dr Patro remains in an earlier pack, so it was not re-mailed.

Other holds confirmed from the dossiers this pass: Zestiny Labs (DealScan gift cards, not a wellness product), Neocortex Lifesciences (CIRP / liquidation), Netri Healthcare (iLabs group inbox), Health4All (dormant under section 455), CallHealth (company-secretary inbox on a scaled operator), Blueowl (liquidation), Preventa Curo, Finn Research, Cure Mile, and Op24 (strike off), Curova (textiles), Adept Web (CA filing inbox), Vitruvian 3D and Osmosys (not healthcare), Yogasva (sibling software inbox), Sree Aspada (filing-pattern inbox), Lavleen Gupta (person-only), Hemp Tribe (shared Suraksha Pharma accounts inbox), Prayukti Innovistaa (textile NIC), Digiring HW (registry Gmail, dossier says do not send), Flyingroot Solutions (registry Gmail, product not established), Egarevel Tech (no verified health product), GB Holdings (no verified health product), Dentyle (legal entity not resolved to a Dentyle CIN), Anara Life Thread (masked aggregator local-part), Anjani Innovations (masked local-part), Blossom14 (filing-pattern inbox, no verified product), INU Energy (secretarial inbox), and Shree Distributors / Apna Green / AyurvedShakti / Make You Fit / Vedicneeds / TherapickMind / NutriScan / Snugglebug / DigitalMeds / My MedPolicy / Careinlife (brand-only or a different entity).

Blocked, masked, NOT UNLOCKED, brand-only or no-CIN, strike-off, CIRP, liquidation, dormant, filing, CA, company-secretary, sister-entity, and non-healthcare rows stayed off. SMTP was not called. Nothing was marked sent.

| # | Company | Emails | Subject | Send result |
|---|---------|--------|---------|-------------|
| - | - | - | - | no sendable company |

Telegram notify did not run: `TELEGRAM_CHAT_ID` is unset. The bot username is not a chat id, and this run did not poll `getUpdates`. Do not treat a Telegram summary as sent.
