#!/usr/bin/env node
/**
 * Outbound-only Telegram notify for daily cold pack.
 * Usage:
 *   node notify_telegram.mjs --text "summary..."
 *   node notify_telegram.mjs --text "summary..." --file path/a.md --file path/b.md
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".secrets", ".env");

function loadEnv(filePath) {
  const data = {};
  if (!fs.existsSync(filePath)) return data;
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

function parseArgs(argv) {
  const textParts = [];
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--text" && argv[i + 1]) {
      textParts.push(argv[++i]);
    } else if (argv[i] === "--file" && argv[i + 1]) {
      files.push(argv[++i]);
    }
  }
  return { text: textParts.join("\n") || "BARS cold send complete.", files };
}

async function sendMessage(token, chatId, text) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text.slice(0, 4000),
      disable_web_page_preview: true,
    }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`sendMessage: ${JSON.stringify(json)}`);
  return json;
}

async function sendDocument(token, chatId, filePath) {
  const abs = path.resolve(filePath);
  const blob = new Blob([fs.readFileSync(abs)]);
  const form = new FormData();
  form.append("chat_id", String(chatId));
  form.append("document", blob, path.basename(abs));
  const res = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
    method: "POST",
    body: form,
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`sendDocument ${abs}: ${JSON.stringify(json)}`);
  return json;
}

async function main() {
  const env = { ...loadEnv(ENV_PATH), ...process.env };
  const token = env.TELEGRAM_BOT_TOKEN || "";
  const chatId = env.TELEGRAM_CHAT_ID || "";
  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID required");
  }
  const { text, files } = parseArgs(process.argv.slice(2));
  await sendMessage(token, chatId, text);
  for (const f of files) {
    if (!fs.existsSync(f)) {
      console.warn(`skip missing file: ${f}`);
      continue;
    }
    await sendDocument(token, chatId, f);
  }
  console.log(`Telegram notified chat ${chatId}; files=${files.length}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
