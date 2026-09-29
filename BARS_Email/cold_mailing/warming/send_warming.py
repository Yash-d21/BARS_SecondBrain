#!/usr/bin/env python3
"""Send mailbox-warmup mails via connect@ SMTP. One recipient per send."""

from __future__ import annotations

import ssl
import sys
import time
from email.utils import formataddr
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from send_smtp import (  # noqa: E402
    ENV_PATH,
    SIGNATURE_HTML_PATH,
    SMTP_HOST,
    SMTP_PORT,
    build_message,
    load_env,
    load_signature_table,
)

SUBJECT = "Quick favour — mailbox warmup"
BODY = """\
Hi,

Hope you're doing well. When you get a minute, could you reply to this email with a short "Hi"? This will help warm up the mailbox.

Thank you,
BARS Consulting LLP
connect@barsconsulting.in
"""

BATCHES: dict[str, list[str]] = {
    "rohith": [
        "rohith.tesi@gmail.com",
        "rohith.s@ralent.team",
        "rohith.s@growthx.team",
    ],
    "yashwanth": [
        "yashwanthd.devulapally@gmail.com",
        "yashwanth.21092006@gmail.com",
        "yashwanthdev.d@gmail.com",
        "yashwanth.d@barsconsulting.in",
        "yashwanth23241a6617@grietcollege.com",
        "23241a6617@griet.ac.in",
        "dukkquakk@gmail.com",
        "tarsnetworks@gmail.com",
        "airnaut.eco@gmail.com",
        "tommmm.vercetti@gmail.com",
    ],
    "asvaan": [
        "zuhairasvaan@gmail.com",
        "asvaan23241a66g6@grietcollege.com",
    ],
}


def main() -> int:
    names = [n.strip().lower() for n in sys.argv[1:] if n.strip()]
    if not names:
        print("Usage: send_warming.py rohith yashwanth asvaan")
        return 1

    recipients: list[str] = []
    for name in names:
        if name not in BATCHES:
            print(f"Unknown person '{name}'. Available: {', '.join(BATCHES)}")
            return 1
        recipients.extend(BATCHES[name])

    env = load_env(ENV_PATH)
    sender_addr = env.get("CONNECT_EMAIL", "connect@barsconsulting.in")
    password = env.get("CONNECT_APP_PASSWORD", "")
    if not password:
        print("CONNECT_APP_PASSWORD missing in .secrets/.env")
        return 1

    sender = formataddr(("BARS Consulting LLP", sender_addr))
    signature_table = load_signature_table(SIGNATURE_HTML_PATH)

    print(f"From: {sender}")
    print(f"Subject: {SUBJECT}")
    print(f"Recipients ({len(recipients)}):")
    for addr in recipients:
        print(f"  -> {addr}")

    context = ssl.create_default_context()
    sent = 0
    failed: list[tuple[str, str]] = []
    with __import__("smtplib").SMTP(SMTP_HOST, SMTP_PORT, timeout=60) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(sender_addr, password)
        for i, to_addr in enumerate(recipients):
            msg = build_message(
                sender=sender,
                reply_to=sender_addr,
                to_addr=to_addr,
                subject=SUBJECT,
                body=BODY,
                signature_table=signature_table,
            )
            try:
                server.sendmail(sender_addr, [to_addr], msg.as_string())
                sent += 1
                print(f"Sent {sent}/{len(recipients)} {to_addr}")
            except Exception as exc:  # noqa: BLE001
                failed.append((to_addr, str(exc)))
                print(f"FAILED {to_addr}: {exc}")
            if i < len(recipients) - 1:
                time.sleep(2)

    print(f"Done. sent={sent} failed={len(failed)}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
