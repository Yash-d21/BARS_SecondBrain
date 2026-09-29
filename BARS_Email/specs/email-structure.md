# Email Structure

**Status:** locked  
**Decision:** [[decisions/07-messaging-personalization]] · [[decisions/09-offer-and-cta]]  
**Playbook:** [[manual-pilot-playbook#Step 2 — Write email]]  
**Offer:** [[offer-and-cta]]  
**Plates:** [[outreach-templates]] (use these for all new drafts)

---

## Format (5 beats)

```
1. Interaction  = what they do (+ optional question). No URL. No city.
2. Pain         = Your pain is X. How it shows up.
3. Stay on      = You should stay on Y. Back-office should not wait.
4. Close        = That's exactly what we do at BARS.
5. CTA          = cal.com discovery-call link
```

**Keep** the pain / stay-on / BARS close voice from the pilot drafts. **Fix** only the intro (no website, no location, no CIN dump).

**Full plates:** [[outreach-templates]]

**Style:** No em dash. Simple words. Bold trackable keywords. See [[outreach-templates#Style rules]].

Signature is **mailbox-auto** (Anirudh). Do not paste into the draft. See [[offer-and-cta#Signature / footer]].

## Constraints

| Rule | Value |
|------|-------|
| Max length | **120 words** (body only). Target **75 to 120**. |
| Interaction | What they **do**. Research may use site/city. Email must not. |
| Do not put in body | Their URL/domain, their city/area, CIN, board dump |
| Middle voice | Keep `Your pain is…` + stay-on + `That's exactly what we do at BARS` |
| Punctuation | **No em dash**. Use period or comma. |
| Keywords | Bold per [[outreach-templates#Bold these keywords]] |
| Attachments | **None** |
| Sender | `connect@barsconsulting.in` |
| Reply-To | `anirudh@barsconsulting.in` |
| CTA | Cal.com only |

## Skeleton

```
Hi {{first_name}},

{{interaction}}

Your pain is {{pain_name}}. {{pain_how_it_shows}}.

You should stay on {{founder_focus}}. {{back_office}} should not wait for a quiet week.

That's exactly what we do at **BARS**.

If it's relevant, happy to chat for **15 minutes**: https://cal.com/anirudh-reddy
```

## Checklist before send

- [ ] No first name or company in subject
- [ ] Pain fits business model (no forced GST on session-only clinics)
- [ ] No em dash in subject or body
- [ ] No their website or location
- [ ] Interaction = what they do
- [ ] Pain + stay-on + BARS close kept
- [ ] Trackable keywords bolded
- [ ] Under 120 words
- [ ] Cal.com link present
- [ ] `approval_status = approved`
