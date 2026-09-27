# Telegram archive bot setup

The bot is a private publishing tool for the Unlisted Archive. It accepts one complete English article, validates and stages it on `bot-content-preview`, then publishes to `master` only after the owner presses **Publish**.

## Security model

- Only the configured numeric Telegram user ID and private chat ID are accepted.
- Telegram webhook requests must include the configured secret header.
- Callback buttons are HMAC-signed and expire naturally when their staged file disappears.
- GitHub access uses a GitHub App installation token. The App should be installed only on this repository with **Contents: read and write** and **Metadata: read**.
- Raw HTML is rendered only as inert text. User-controlled paths are never sent to GitHub.
- Secrets belong in Vercel encrypted environment variables or a local ignored `.env.local`, never in Git.

## Required configuration

Copy `.env.example` to `.env.local` locally and populate it yourself. Never paste tokens into chat or commit `.env.local`.

1. Create a Telegram bot with BotFather and keep its token private.
2. Put only `TELEGRAM_BOT_TOKEN` in the local ignored `.env.local`, open the bot, press **Start**, and run `npm run bot:identity`. Copy the two numeric IDs it prints into `.env.local`.
3. Generate independent random values for `TELEGRAM_WEBHOOK_SECRET` and `CALLBACK_SIGNING_SECRET`.
4. Create a GitHub App, install it only on `AliMoeinian/react-portfolio-template`, and grant only repository Contents read/write plus Metadata read.
5. Put the GitHub App ID and installation ID in `.env.local`. For local development, set `GITHUB_PRIVATE_KEY_PATH` to the absolute path of the downloaded `.pem` file. Vercel must use the inline `GITHUB_PRIVATE_KEY` environment variable instead.

For local end-to-end tests, use `GITHUB_BRANCH=bot-sandbox` and `GITHUB_PREVIEW_BRANCH=bot-sandbox-preview`. This prevents the bot's Publish button from writing to `master` while the integration is being verified.

Set `BOT_PUBLISHING_MODE=sandbox` locally. Production requires the explicit combination `BOT_PUBLISHING_MODE=production`, `GITHUB_BRANCH=master`, and `GITHUB_PREVIEW_BRANCH=bot-content-preview`; any mixed or unsafe configuration is rejected before the webhook update is processed.

## Local checks

```text
npm run typecheck
npm run typecheck:api
npm test -- --watchAll=false
npm run build
```

The identity helper uses Telegram's official `getUpdates` endpoint and never prints the bot token. It works before a webhook is registered. If a webhook already exists, remove or redirect it before using `getUpdates`.

Use `vercel dev` when testing the API locally. Telegram needs a public HTTPS URL, so webhook testing also requires a temporary HTTPS tunnel pointed at the local Vercel port.

## Registering the webhook

After the function is reachable through HTTPS:

```text
npm run bot:webhook -- https://your-domain.example
```

The registration script requests only `message` and `callback_query` updates and discards stale updates when switching environments.

## Publishing format

After choosing a folder, reply to the bot's Force Reply prompt with:

```text
Title: Your article title
Excerpt: A concise summary of at least 20 characters.
---
## First section

Your article text.

- A list item
- Another list item

> An optional quote

> [!NOTE] An optional callout

[Optional source](https://example.com)
```

The same content can be uploaded as a UTF-8 `.md` or `.txt` file no larger than 64 KB.
