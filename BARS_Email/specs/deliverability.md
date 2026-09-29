# Email Deliverability

**Status:** DNS auth done 2026-09-03 — SPF prop check [[todo]] tomorrow  
**Ticket:** [[issues/12-email-deliverability-setup]]  
**Setup guide:** [[research/deliverability-setup-guide]]  
**Checklist:** [[research/deliverability-checklist]]  
**Channel decision:** [[decisions/03-channel-selection]]

---

## Must complete before first cold send

- [x] `connect@barsconsulting.in` exists and sends
- [x] **SPF** — `v=spf1 include:_spf.google.com ~all` (auth NS confirmed; verify public cache tomorrow)
- [x] **DKIM** — enabled in Google Workspace admin + Hostinger TXT
- [x] **DMARC** — `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` (existing Brevo)
- [ ] **Google Postmaster Tools** — domain verified _(deferred)_
- [ ] **mail-tester.com** score ≥ 8/10 _(optional for manual)_
- [ ] Warmup log started — 15/day Day 1 _(deferred — manual pilot)_

## Warmup schedule

| Week | Daily sends |
|------|-------------|
| 1 | 15 |
| 2 | 17–18 |
| 3 | 20–22 |
| 4 | 25–28 |
| 5+ | 30–50 steady |

Full steps → [[research/deliverability-setup-guide]]
