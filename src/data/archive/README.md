# The Unlisted Archive

This archive is a discoverable Easter egg, not private storage or authentication. Published notes are committed to this repository and become public website content.

## Local review

Run `npm start`. On the homepage, click Ali's main figure ten times and explicitly choose **Follow the signal**. Solve the gate with **moon -> diamond -> star**, then drag the handle upward. Leaving through **Back to the surface** resets discovery and puzzle progress.

Progress lives only in `sessionStorage` for the current tab, with an in-memory fallback. Direct archive URLs are guarded by the same presentation flow, but this is a UI convention rather than access control. Archive routes include `noindex, nofollow` metadata.

## Categories

`categories.json` contains the twelve English folder definitions. Each category has a unique URL-safe `id`, an English `title`, a short `caption`, an accent `color`, and a supported `symbol`.

## Posts

Every published note is a separate JSON file in `posts/`. The Telegram publisher creates these files automatically. The supported schema is:

```json
{
  "id": "a-unique-note-slug",
  "category": "writing-sop",
  "title": "Your English title",
  "excerpt": "A short English introduction for the archive card.",
  "date": "2026-09-27",
  "publishedAt": "2026-09-27T12:34:56.789Z",
  "blocks": [
    {"type": "paragraph", "text": "Your opening paragraph."},
    {"type": "heading", "text": "A section heading"},
    {"type": "list", "items": ["First item", "Second item"]},
    {"type": "quote", "text": "A quotation."},
    {"type": "callout", "text": "An aside or useful note."},
    {"type": "link", "text": "Reference", "href": "https://example.com"}
  ]
}
```

Content is English-only. Raw HTML and unsafe links are rejected. Dates use `YYYY-MM-DD`, the bot records `publishedAt` automatically when **Publish** is pressed, reading time is calculated automatically, and the article slug is generated from its title. Folder notes are displayed from oldest to newest using that timestamp.

Routes: `/unlisted/gate`, `/unlisted`, `/unlisted/{category}`, and `/unlisted/{category}/{note}`.

## Telegram publishing

See `docs/TELEGRAM_BOT_SETUP.md`. The bot stages one article at a time on the `bot-content-preview` branch, then writes the confirmed JSON file to `master`. There is no database and no persistent draft system.
