#!/usr/bin/env python3
"""Send approved cold emails via Gmail SMTP (connect@barsconsulting.in).

Gmail's Settings → Signature is UI-only. SMTP does NOT auto-append it.
This script always appends BARS_Email/signature.html to the HTML part.
"""

from __future__ import annotations

import argparse
import html
import re
import smtplib
import ssl
import sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = ROOT / ".secrets" / ".env"
SIGNATURE_HTML_PATH = ROOT / "signature.html"

# Google Workspace / Gmail SMTP
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587

PLAIN_SIGNATURE = """\
BARS Consulting
You Focus. We Deliver.

+91 99496 96851
connect@barsconsulting.in
barsconsulting.in

LinkedIn: https://www.linkedin.com/company/bars-consulting-llp/
Instagram: https://www.instagram.com/barsconsulting.in/
Book a 15-min discovery call: https://cal.com/anirudh-reddy
"""


BATCHES: dict[str, list[dict[str, str]]] = {
    "replate": [
        {
            "to": "founders@tryreplate.com",
            "name": "Karan",
            "subject": "Karan, 2,000 bags in 35 outlets - who's watching the rupees behind them?",
            "body": """Hi Karan,

Saw the numbers on Replate. ~2,000 bags sold across 35 outlets and now Bengaluru too. Selling out in ~3.5 minutes is pretty impressive.

One thing caught my attention though. Since customers pay Replate first and the bakery gets paid later, the ₹149 coming into the account isn't really ₹149 of revenue.

With 35 partners, this is manageable. At 350, keeping track of every bakery payout, GST and what actually belongs in your books gets tricky.

The boring part is just finding the time to run it properly while you're busy growing Replate.

That's exactly what we do at BARS.

If it's relevant, happy to chat for 15 minutes: https://cal.com/anirudh-reddy
""",
        },
        {
            "to": "Aditya.arya.ggn@gmail.com",
            "name": "Aditya",
            "subject": "Aditya, 2,000 bags in 35 outlets - who's watching the rupees behind them?",
            "body": """Hi Aditya,

Saw the numbers on Replate. ~2,000 bags sold across 35 outlets and now Bengaluru too. Selling out in ~3.5 minutes is pretty impressive.

One thing caught my attention though. Since customers pay Replate first and the bakery gets paid later, the ₹149 coming into the account isn't really ₹149 of revenue.

With 35 partners, this is manageable. At 350, keeping track of every bakery payout, GST and what actually belongs in your books gets tricky.

The boring part is just finding the time to run it properly while you're busy growing Replate.

That's exactly what we do at BARS.

If it's relevant, happy to chat for 15 minutes: https://cal.com/anirudh-reddy
""",
        },
    ],
}


def load_env(path: Path) -> dict[str, str]:
    if not path.exists():
        raise FileNotFoundError(f"Missing secrets file: {path}")
    data: dict[str, str] = {}
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        data[key.strip()] = value.strip().strip('"').strip("'")
    return data


def load_signature_table(path: Path) -> str:
    """Extract the outer signature <table> from signature.html."""
    if not path.exists():
        raise FileNotFoundError(f"Missing signature file: {path}")
    raw = path.read_text(encoding="utf-8")
    match = re.search(
        r"(<table\b[^>]*role=\"presentation\"[\s\S]*</table>)\s*</body>",
        raw,
        re.IGNORECASE,
    )
    if match:
        return match.group(1).strip()
    # Fallback: first top-level table
    match = re.search(r"<table\b[\s\S]*</table>", raw, re.IGNORECASE)
    if not match:
        raise ValueError(f"No <table> found in {path}")
    return match.group(0).strip()


def body_to_html(plain_body: str) -> str:
    escaped = html.escape(plain_body.strip())
    return escaped.replace("\n", "<br>\n")


def build_message(
    *,
    sender: str,
    reply_to: str,
    to_addr: str,
    subject: str,
    body: str,
    signature_table: str,
) -> MIMEMultipart:
    plain = (
        body.strip()
        + "\n\nThanks & Regards,\n\n"
        + PLAIN_SIGNATURE.strip()
        + "\n"
    )
    html_body = f"""\
<html>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.5;">
<div>{body_to_html(body)}</div>
<br>
<p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;">Thanks &amp; Regards,</p>
{signature_table}
</body>
</html>
"""
    msg = MIMEMultipart("alternative")
    msg["From"] = sender
    msg["To"] = to_addr
    msg["Reply-To"] = reply_to
    msg["Subject"] = subject
    msg.attach(MIMEText(plain, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))
    return msg


def send_batch(company: str, *, dry_run: bool) -> int:
    if company not in BATCHES:
        print(f"Unknown company '{company}'. Available: {', '.join(BATCHES)}")
        return 1

    env = load_env(ENV_PATH)
    sender = env.get("CONNECT_EMAIL", "connect@barsconsulting.in")
    password = env.get("CONNECT_APP_PASSWORD", "")
    reply_to = "anirudh@barsconsulting.in"
    signature_table = load_signature_table(SIGNATURE_HTML_PATH)

    if not password and not dry_run:
        print("CONNECT_APP_PASSWORD missing in .secrets/.env")
        return 1

    messages = BATCHES[company]
    print(f"Batch: {company} ({len(messages)} message(s))")
    print(f"Signature: {SIGNATURE_HTML_PATH.name} (appended via SMTP)")
    for item in messages:
        print(f"  -> {item['name']}: {item['to']}")
        print(f"     Subject: {item['subject']}")

    if dry_run:
        print("\nDry run only. No mail sent.")
        return 0

    context = ssl.create_default_context()
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=60) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(sender, password)
        for item in messages:
            msg = build_message(
                sender=sender,
                reply_to=reply_to,
                to_addr=item["to"],
                subject=item["subject"],
                body=item["body"],
                signature_table=signature_table,
            )
            server.sendmail(sender, [item["to"]], msg.as_string())
            print(f"Sent to {item['name']} <{item['to']}>")

    print("Done.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Send BARS cold emails via SMTP")
    parser.add_argument("--company", required=True, help="Batch key, e.g. replate")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print recipients only; do not send",
    )
    parser.add_argument(
        "--send",
        action="store_true",
        help="Actually send (required to fire mail)",
    )
    args = parser.parse_args()

    if not args.dry_run and not args.send:
        print("Pass --dry-run to preview, or --send to fire.")
        return 1

    return send_batch(args.company, dry_run=args.dry_run)


if __name__ == "__main__":
    sys.exit(main())
