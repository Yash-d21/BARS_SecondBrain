# 2026-11-02 send results

**Pack:** none drafted  
**From:** `connect@barsconsulting.in` · **Reply-To:** `anirudh@barsconsulting.in`  
**Result:** **not sent**  
**Sent date:** 2026-11-02  
**SMTP:** 0 companies / 0 messages · failed 0  
**companies.csv:** unchanged

Fewer than 20 sendable healthcare rows remained. After dedupe against `companies.csv` (`sent=yes`) and every dated pack, including the held `23rd-sep.md` draft, no unsent row still has an Active CIN, a High inbox for this company, a healthcare or wellness product the research supports, and a domain that accepts mail.

MX recheck on 2026-11-02 did not revive previously skipped domains. `fitsocial.in`, `urbanhelps.in`, `healthup.care`, `drpatros.com`, `viyonapharmaceuticals.com`, `originfertilitycenter.com`, `mindvera.com`, and `aetherrain.com` still have no MX. `digitalmeds.co`, `ethikaworklife.com`, and `tridhascholars.com` also have no MX. `medyblog.com` has no MX. `sathiherbals.com` and `thecura.co` have no MX. `foynaturals.com` publishes a null MX (`0 .`). `biochiol.com`, `healtheeliving.com`, and `nmantra.in` still point MX at the website host. `uwe.care` still resolves to the parking exchanger `park-mx.above.com`. `mymedpolicy.com` points MX at `mail.mymedpolicy.com` and the Hyderabad brand still has no matched CIN.

Domains that do accept mail stayed off for a non-routing reason: `makeyoufit.in` (Zoho), `therapickmind.com` (SecureServer), `vedicneeds.com` (Hostinger), `bharatfit.in` (SecureServer), `nutriscan.app`, `mylktree.com`, `snugbug.co`, `nuform.in`, `carin.life`, `earthful.me`, and `thebeyondedge.com` (Google), plus `neuformnutrition.com` and `venica.in` (Hostinger), are brand-only, blocked, NOT UNLOCKED, or have no CIN. `bharatfit.in` accepts mail, and the addresses on that row belong to a different legal entity. `chewlynutritions.com` (Zoho) and `ainetwork.in` (SecureServer) accept mail but the local-part is masked. `fitaf.in` accepts mail at `smtp.google.com`, and the dossier still says not to send: product ownership is not confirmed. `playcafediaries.in`, `sidventures.in`, and `ninnti.com` accept mail, and the research is a cafe, a marketing brand with a CA inbox, and e-commerce software. `amplifylife.com` accepts mail at Outlook, and that inbox is the sibling brand, not the Nxtgen company inbox. `sciencehood.info` accepts mail and the entity is a publisher.

Newly confirmed accepting domains on this pass still fail the dossier gate. `wellnessfuel.in` now points MX at `mail.wellnessfuel.in`, and the dossier says not to substitute `info@wellnessfuel.in` because that inbox belongs to a different Delhi/Noida entity. `arivhealthcare.com` points MX at `mail.arivhealthcare.com`, and `consult@arivhealthcare.com` is a different clinic, not the Ariv Biosciences inbox. `earthlies.in` accepts mail at Zoho and the row has no CIN. `occulthouse.in` accepts mail at SecureServer, and those addresses belong to a different entity. `tealwellness.com` accepts mail at Outlook, and the dossier is blocked (no Active India entity, no verified Hyderabad inbox). `igylx.com` accepts mail at Rediffmail Pro, and the send is blocked because no personal inbox is unlocked.

Gmail rows that stayed off: Blossom14 (`Projectmhuda@gmail.com` reads as a filing inbox, and no product is verified), Maverick Medicare (personal portfolio address, MCA inbox not unlocked), AyurvedShakti (brand inbox, no CIN), and NMANTRA (CIN blocked). Additional Active rows reviewed this pass also stayed off: Digiring HW (registry Gmail, no verified product), Flyingroot Solutions (registry Gmail, product not established, dossier says verify a company inbox first), Prayukti Innovistaa (textile NIC, not a proven wellness product), Hemp Tribe (shared Suraksha Pharma accounts inbox, product not established), Amit Agarwal Life Sciences (filing-pattern inbox, chemical NIC), INU Energy (`cs@innopark.in` is a secretarial inbox), Ariv Biosciences (clinic inbox belongs to a different entity), and Dentyle (home-dental brand, legal entity not resolved to a Dentyle CIN).

Blocked, masked, NOT UNLOCKED, brand-only or no-CIN, strike-off, CIRP, liquidation, dormant, filing, CA, company-secretary, sister-entity, and non-healthcare rows stayed off. Scaled ekincare was left off: the research is a Series B company, so a startup books plate would invent the pain. SMTP was not called. Nothing was marked sent.

| # | Company | Emails | Subject | Send result |
|---|---------|--------|---------|-------------|
| - | - | - | - | no sendable company |

Telegram notify did not run: `TELEGRAM_CHAT_ID` is unset. The bot username is not a chat id, and this run did not poll `getUpdates`. Do not treat a Telegram summary as sent.
