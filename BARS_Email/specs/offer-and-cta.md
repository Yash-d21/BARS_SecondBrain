# Offer & CTA

**Status:** locked  
**Decision:** [[decisions/09-offer-and-cta]]  
**Ticket:** [[issues/13-offer-and-cta]]  
**Related:** [[email-structure]], [[outreach-voice]], [[barsconsulting#Messaging hooks]]

---

## Primary offer

**15-minute discovery call** — what is breaking in their ops / finance / compliance stack, and whether BARS should own that layer.

Not a free audit. Not a pitch deck. Not a capability dump.

## CTA (all stages)

Same ask for everyone. Stage only changes the **pain hook** above the CTA.

```
If useful, grab 15 minutes here: https://cal.com/anirudh-reddy
```

**Cal.com URL:** https://cal.com/anirudh-reddy
*(placeholder until you drop the real URL — then update this line + [[decisions/09-offer-and-cta]])*

Optional soft line before the link:

> Happy to walk through how we'd take finance and compliance off your plate so you can stay on product.

## Pain → BARS solve (pick ONE pair per email)

| Pain (founder feels) | BARS solve (one capability) |
|----------------------|----------------------------|
| No books / messy books; can't see cash | Accounting & financial management |
| GST / filings / compliance slipping | Tax & compliance |
| Need CFO thinking, can't hire full-time | Virtual CFO |
| First hires / payroll / HR chaos | HR management & talent systems |
| Ops breaking while scaling | Business advisory + managed ops |
| Raising soon; books not investor-ready | Virtual CFO + reporting |
| Brand / online presence neglected while building | Online presence & branding *(use sparingly in wave 1)* |

**Rule:** One pain + one solve. Never list the whole table in the email.

## Stage → which pain to prefer

| Stage | Prefer pain |
|-------|-------------|
| Prototype | No structure yet — books, compliance, setup from day one |
| Validation | GST, first hires, investor prep |
| EarlyTraction | Ops / payroll / GST messy while growth hits |
| Scaling | Reporting, team systems, compliance at scale |

## Proof (light)

One line max:

> Hyderabad-based execution partner — we own finance, HR, and compliance so founders stay on product.

No case-study claims until real ones exist. No pricing. No guarantees.

## Signature / footer

**Already configured in Gmail UI** for web compose. **SMTP does not auto-append it.**  
Cold sends via `send_smtp.py` must attach [[../signature.html|signature.html]] in the MIME HTML part (script does this).

Canonical signature (for reference / mailbox setup + SMTP append):

**Plain-text fallback:**

```
BARS Consulting
You Focus. We Deliver.

+91 99496 96851
connect@barsconsulting.in
barsconsulting.in

linkedin.com/company/bars-consulting-llp
```

**Rules for the signature block**
- Brand-led (no personal name or headshot in the auto-sig)
- One contact path per line; drop “Mobile/Email/Website” labels
- No “Thanks & Regards” inside the auto-signature (that belongs in the body, if at all)
- One CTA only — Cal.com discovery call (not “Start a conversation / Explore services”)
- LinkedIn company page only; no Twitter until there is a live handle
- HTML file is source of truth for the mailbox auto-sig; plain text is fallback

**Sender note:** Wave-1 mailbox remains `connect@barsconsulting.in` ([[decisions/03-channel-selection]]). Prefer **Reply-To: anirudh@barsconsulting.in** so replies hit him. Do not attach a pitch deck.

## Guardrails

- Under **120 words** body (signature is mailbox-auto — not part of the draft)
- **No attachments** in cold email
- No pitch deck until they book / reply
- No pricing, guarantees, or "best consulting firm"
- One CTA only — the cal.com link
- **Do not paste the signature** into drafts
