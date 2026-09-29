#!/usr/bin/env node
/** Send mailbox-warmup mails via connect@ SMTP. One recipient per send. */

import fs from "fs";
import net from "net";
import path from "path";
import tls from "tls";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const ENV_PATH = path.join(ROOT, ".secrets", ".env");
const SIGNATURE_HTML_PATH = path.join(ROOT, "signature.html");

const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 587;

const SUBJECT = "Test mail — mailbox warming";
const BODY = `Hi,

This is a test mail for mailbox warming.

When you get a minute, could you reply with a short "Hi"? That helps keep the connect@ inbox healthy.

Thank you,
BARS Consulting LLP
connect@barsconsulting.in`;

const PLAIN_SIGNATURE = `BARS Consulting
You Focus. We Deliver.

+91 99496 96851
connect@barsconsulting.in
barsconsulting.in

LinkedIn: https://www.linkedin.com/company/bars-consulting-llp/
Instagram: https://www.instagram.com/barsconsulting.in/
Book a 15-min discovery call: https://cal.com/anirudh-reddy`;

const BATCHES = {
  rohith: [
    "rohith.tesi@gmail.com",
    "rohith.s@ralent.team",
    "rohith.s@growthx.team",
  ],
  yashwanth: [
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
  asvaan: [
    "zuhairasvaan@gmail.com",
    "asvaan23241a66g6@grietcollege.com",
  ],
  // Full list from test-mails-for-warming.md (26)
  all: [
    "rohith.tesi@gmail.com",
    "sbesurabhi@gmail.com",
    "rohith.s@ralent.team",
    "rohith.s@growthx.team",
    "anirudh.ca3606@gmail.com",
    "anirudh3606@gmail.com",
    "urbancrewit@gmail.com",
    "sbecomplainces@gmail.com",
    "varalaxmisurabhi@gmail.com",
    "rajubhuvaneswari8@gmail.com",
    "yashwanthd.devulapally@gmail.com",
    "yashwanth.21092006@gmail.com",
    "yashwanthdev.d@gmail.com",
    "tarsnetworks@gmail.com",
    "airnaut.eco@gmail.com",
    "tommmm.vercetti@gmail.com",
    "yashwanth.d@barsconsulting.in",
    "dukkquakk@gmail.com",
    "yashwanth23241a6617@grietcollege.com",
    "zuhairasvaan@gmail.com",
    "asvaan23241a66g6@grietcollege.com",
    "23241a6617@griet.ac.in",
    "suniluppala@barsconsulting.in",
    "suniluppala171@gmail.com",
    "suniluppala89@gmail.com",
    "sunilforcainfo@gmail.com",
  ],
};

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing secrets file: ${filePath}`);
  }
  const data = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const i = trimmed.indexOf("=");
    data[trimmed.slice(0, i).trim()] = trimmed
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return data;
}

function loadSignatureTable(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match =
    raw.match(/(<table\b[^>]*role="presentation"[\s\S]*<\/table>)\s*<\/body>/i) ||
    raw.match(/<table\b[\s\S]*<\/table>/i);
  if (!match) throw new Error(`No <table> found in ${filePath}`);
  return match[1] || match[0];
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function encodeHeader(value) {
  if (/^[\x20-\x7E]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function buildMessage({ senderName, senderAddr, replyTo, toAddr, subject, body, signatureTable }) {
  const boundary = `bars-warm-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const plain = `${body.trim()}\n\nThanks & Regards,\n\n${PLAIN_SIGNATURE.trim()}\n`;
  const htmlBody = `<html>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.5;">
<div>${escapeHtml(body.trim()).replaceAll("\n", "<br>\n")}</div>
<br>
<p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;">Thanks &amp; Regards,</p>
${signatureTable}
</body>
</html>`;

  const from = `${senderName} <${senderAddr}>`;
  const headers = [
    `From: ${from}`,
    `To: ${toAddr}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n");

  const parts = [
    `--${boundary}`,
    'Content-Type: text/plain; charset="utf-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    plain.replaceAll("\n", "\r\n"),
    `--${boundary}`,
    'Content-Type: text/html; charset="utf-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    htmlBody.replaceAll("\n", "\r\n"),
    `--${boundary}--`,
    "",
  ].join("\r\n");

  return `${headers}\r\n\r\n${parts}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class SmtpClient {
  constructor() {
    this.socket = null;
    this.buffer = "";
  }

  connect(host, port) {
    return new Promise((resolve, reject) => {
      const socket = net.connect({ host, port }, () => resolve());
      socket.setEncoding("utf8");
      socket.on("error", reject);
      this.socket = socket;
    });
  }

  startTls(host) {
    return new Promise((resolve, reject) => {
      const secure = tls.connect({ socket: this.socket, servername: host }, () => resolve());
      secure.setEncoding("utf8");
      secure.on("error", reject);
      this.socket = secure;
    });
  }

  readResponse() {
    return new Promise((resolve, reject) => {
      const onData = (chunk) => {
        this.buffer += chunk;
        const lines = [];
        while (true) {
          const idx = this.buffer.indexOf("\r\n");
          if (idx === -1) break;
          const line = this.buffer.slice(0, idx);
          this.buffer = this.buffer.slice(idx + 2);
          lines.push(line);
          if (/^\d{3} /.test(line)) {
            this.socket.off("data", onData);
            this.socket.off("error", onError);
            resolve(lines.join("\r\n"));
            return;
          }
        }
      };
      const onError = (err) => {
        this.socket.off("data", onData);
        reject(err);
      };
      this.socket.on("data", onData);
      this.socket.once("error", onError);
    });
  }

  async expect(codePrefix, context) {
    const response = await this.readResponse();
    if (!response.startsWith(codePrefix)) {
      throw new Error(`${context}: ${response}`);
    }
    return response;
  }

  async cmd(line, codePrefix, context) {
    this.socket.write(`${line}\r\n`);
    return this.expect(codePrefix, context);
  }

  quit() {
    try {
      this.socket.write("QUIT\r\n");
    } catch {
      // ignore
    }
    this.socket.end();
  }
}

async function main() {
  const names = process.argv.slice(2).map((n) => n.trim().toLowerCase()).filter(Boolean);
  if (!names.length) {
    console.log("Usage: node send_warming.mjs rohith yashwanth asvaan");
    process.exit(1);
  }

  const recipients = [];
  for (const name of names) {
    if (!BATCHES[name]) {
      console.error(`Unknown person '${name}'. Available: ${Object.keys(BATCHES).join(", ")}`);
      process.exit(1);
    }
    recipients.push(...BATCHES[name]);
  }

  const env = loadEnv(ENV_PATH);
  const senderAddr = env.CONNECT_EMAIL || "connect@barsconsulting.in";
  const password = env.CONNECT_APP_PASSWORD || "";
  if (!password) {
    console.error("CONNECT_APP_PASSWORD missing in .secrets/.env");
    process.exit(1);
  }

  const signatureTable = loadSignatureTable(SIGNATURE_HTML_PATH);
  console.log(`From: BARS Consulting LLP <${senderAddr}>`);
  console.log(`Subject: ${SUBJECT}`);
  console.log(`Recipients (${recipients.length}):`);
  for (const addr of recipients) console.log(`  -> ${addr}`);

  const client = new SmtpClient();
  await client.connect(SMTP_HOST, SMTP_PORT);
  await client.expect("220", "connect");
  await client.cmd(`EHLO barsconsulting.in`, "250", "EHLO");
  await client.cmd("STARTTLS", "220", "STARTTLS");
  await client.startTls(SMTP_HOST);
  await client.cmd(`EHLO barsconsulting.in`, "250", "EHLO TLS");
  await client.cmd("AUTH LOGIN", "334", "AUTH LOGIN");
  await client.cmd(Buffer.from(senderAddr).toString("base64"), "334", "AUTH user");
  await client.cmd(Buffer.from(password).toString("base64"), "235", "AUTH pass");

  let sent = 0;
  const failed = [];
  for (let i = 0; i < recipients.length; i++) {
    const toAddr = recipients[i];
    try {
      await client.cmd(`MAIL FROM:<${senderAddr}>`, "250", `MAIL FROM ${toAddr}`);
      await client.cmd(`RCPT TO:<${toAddr}>`, "250", `RCPT TO ${toAddr}`);
      await client.cmd("DATA", "354", `DATA ${toAddr}`);
      const raw = buildMessage({
        senderName: "BARS Consulting LLP",
        senderAddr,
        replyTo: senderAddr,
        toAddr,
        subject: SUBJECT,
        body: BODY,
        signatureTable,
      });
      client.socket.write(`${raw.replace(/^\./gm, "..")}\r\n.\r\n`);
      await client.expect("250", `send ${toAddr}`);
      sent += 1;
      console.log(`Sent ${sent}/${recipients.length} ${toAddr}`);
    } catch (err) {
      failed.push([toAddr, err.message]);
      console.error(`FAILED ${toAddr}: ${err.message}`);
      try {
        await client.cmd("RSET", "250", "RSET");
      } catch {
        // continue
      }
    }
    if (i < recipients.length - 1) await sleep(2000);
  }

  client.quit();
  console.log(`Done. sent=${sent} failed=${failed.length}`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
