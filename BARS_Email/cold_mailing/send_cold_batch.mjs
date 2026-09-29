#!/usr/bin/env node
/**
 * Send cold packs via connect@ SMTP (one recipient per send + signature.html).
 * Usage: node send_cold_batch.mjs [--dry-run] path/to/pack.md [more.md...]
 */
import fs from "fs";
import net from "net";
import path from "path";
import tls from "tls";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".secrets", ".env");
const SIGNATURE_HTML_PATH = path.join(ROOT, "signature.html");
const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 587;
const DELAY_MS = 2000;
const REPLY_TO = "anirudh@barsconsulting.in";

const PLAIN_SIGNATURE = `BARS Consulting
You Focus. We Deliver.

+91 99496 96851
connect@barsconsulting.in
barsconsulting.in

LinkedIn: https://www.linkedin.com/company/bars-consulting-llp/
Instagram: https://www.instagram.com/barsconsulting.in/
Book a 15-min discovery call: https://cal.com/anirudh-reddy`;

function loadEnv(filePath) {
  const data = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    data[t.slice(0, i).trim()] = t
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
  if (!match) throw new Error(`No <table> in ${filePath}`);
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

function stripMdBold(text) {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}

function bodyToHtmlDiv(body) {
  const escaped = escapeHtml(body.trim());
  const withBold = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return withBold.replaceAll("\n", "<br>\n");
}

function buildMessage({
  senderName,
  senderAddr,
  replyTo,
  toAddr,
  subject,
  body,
  signatureTable,
}) {
  const boundary = `bars-cold-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const plainBody = stripMdBold(body.trim());
  const plain = `${plainBody}\n\nThanks & Regards,\n\n${PLAIN_SIGNATURE.trim()}\n`;
  const htmlBody = `<html>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.5;">
<div>${bodyToHtmlDiv(body)}</div>
<br>
<p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;">Thanks &amp; Regards,</p>
${signatureTable}
</body>
</html>`;
  const headers = [
    `From: ${senderName} <${senderAddr}>`,
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

function parsePack(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const sections = raw.split(/\n(?=## \d+\.)/);
  const companies = [];
  for (const section of sections) {
    const title = section.match(/^## \d+\.\s+(.+)$/m);
    if (!title) continue;
    if (/Send checklist/i.test(title[1])) continue;
    const company = title[1].trim();
    const folder = (section.match(/\*\*Folder:\*\*\s+`([^`]+)`/) || [])[1] || "";
    const emails = [
      ...section.matchAll(/^- `([^`]+)`\s+-/gm),
    ].map((m) => m[1].trim());
    const subject = (section.match(/\*\*Subject:\*\*\s+(.+)$/m) || [])[1]?.trim();
    const bodyMatch = section.match(/```\r?\n([\s\S]*?)\r?\n```/);
    const body = bodyMatch ? bodyMatch[1].trim() : "";
    if (!subject || !body || !emails.length) {
      console.warn(`SKIP parse incomplete: ${company}`);
      continue;
    }
    const uniq = [...new Set(emails.map((e) => e.trim()).filter(Boolean))];
    companies.push({ company, folder, emails: uniq, subject, body, pack: path.basename(filePath) });
  }
  return companies;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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
      const secure = tls.connect({ socket: this.socket, servername: host }, () =>
        resolve()
      );
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
    } catch {}
    this.socket.end();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const files = args.filter((a) => a !== "--dry-run" && a !== "--send");
  if (!files.length) {
    console.error("Usage: node send_cold_batch.mjs [--dry-run|--send] pack.md...");
    process.exit(1);
  }
  if (!dryRun && !args.includes("--send")) {
    console.error("Pass --dry-run to preview, or --send to fire.");
    process.exit(1);
  }

  const companies = files.flatMap((f) => parsePack(path.resolve(f)));
  const jobs = [];
  for (const c of companies) {
    for (const to of c.emails) {
      jobs.push({ ...c, to });
    }
  }

  console.log(`Companies: ${companies.length}`);
  console.log(`Messages: ${jobs.length}`);
  for (const c of companies) {
    console.log(`  ${c.company} -> ${c.emails.join("; ")}`);
  }

  if (dryRun) {
    console.log("\nDry run only. No mail sent.");
    process.exit(0);
  }

  const env = loadEnv(ENV_PATH);
  const senderAddr = env.CONNECT_EMAIL || "connect@barsconsulting.in";
  const password = env.CONNECT_APP_PASSWORD || "";
  if (!password) throw new Error("CONNECT_APP_PASSWORD missing");
  const signatureTable = loadSignatureTable(SIGNATURE_HTML_PATH);

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
  const sentByCompany = new Map();

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    try {
      await client.cmd(`MAIL FROM:<${senderAddr}>`, "250", `MAIL FROM ${job.to}`);
      await client.cmd(`RCPT TO:<${job.to}>`, "250", `RCPT TO ${job.to}`);
      await client.cmd("DATA", "354", `DATA ${job.to}`);
      const raw = buildMessage({
        senderName: "BARS Consulting LLP",
        senderAddr,
        replyTo: REPLY_TO,
        toAddr: job.to,
        subject: job.subject,
        body: job.body,
        signatureTable,
      });
      client.socket.write(`${raw.replace(/^\./gm, "..")}\r\n.\r\n`);
      await client.expect("250", `send ${job.to}`);
      sent += 1;
      if (!sentByCompany.has(job.folder)) sentByCompany.set(job.folder, []);
      sentByCompany.get(job.folder).push(job.to);
      console.log(`Sent ${sent}/${jobs.length} ${job.company} <${job.to}>`);
    } catch (err) {
      failed.push({ company: job.company, to: job.to, err: err.message });
      console.error(`FAILED ${job.company} <${job.to}>: ${err.message}`);
      try {
        await client.cmd("RSET", "250", "RSET");
      } catch {}
    }
    if (i < jobs.length - 1) await sleep(DELAY_MS);
  }

  client.quit();

  const resultPath = path.join(
    __dirname,
    "personalising",
    `_send-result-${Date.now()}.json`
  );
  fs.writeFileSync(
    resultPath,
    JSON.stringify(
      {
        sent,
        failed,
        companies: companies.length,
        messages: jobs.length,
        sentByCompany: Object.fromEntries(sentByCompany),
        packs: files,
        sentDate: "2026-09-26",
      },
      null,
      2
    )
  );
  console.log(`Done. sent=${sent} failed=${failed.length}`);
  console.log(`Result: ${resultPath}`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
