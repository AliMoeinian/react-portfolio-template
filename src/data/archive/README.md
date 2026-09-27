# The Unlisted Archive

This is a discoverable Easter egg, not private storage or authentication. Any content committed to this repository is public. Do not put sensitive notes or real private drafts here.

## Local review

Run `npm start`. On the homepage click Ali's main figure ten times. The final speech bubble offers explicit Enter and Not now actions and never navigates automatically. Enter resets the gate, then select **moon → diamond → star** and drag the handle upward. Leaving through Back to the surface resets discovery and puzzle progress, so every new visit starts from the ten-click discovery. Keyboard users can focus the handle and use Arrow Up, End, Enter or Space after solving the pattern.

Progress is stored in `sessionStorage` for the current tab, with an in-memory fallback. The public portfolio and its inner-page figures do not reveal an archive link. Direct archive URLs show a hint or the gate until the two steps are completed. This is a UI convention, not access control.

Two clearly labelled demo notes from `posts/preview.json` appear only in the development server. This file is excluded from the production content context and its development import is removed in production. Demo entries are not real opinions or experiences from Ali. Normal production categories start empty until real notes are added.

## Add a category or topic

Edit `categories.json`. Each category has an `id`, English `title`, short `caption`, accent `color`, `symbol`, and array of `topics`. Keep IDs unique and URL-safe. Supported folder symbols: globe, document, mail, conversation, pen, spark.

## Add a real note

Add an object to `posts/entries.json`, or create another `.json` file in `posts/` containing an array. All non-preview JSON files are discovered automatically. Each note needs:

```json
{
  "id": "a-unique-note-slug",
  "category": "academic-cv",
  "topic": "Structure",
  "title": "Your title",
  "excerpt": "A short introduction.",
  "date": "2026-09-26",
  "language": "en",
  "blocks": [
    {"type": "paragraph", "text": "Your opening paragraph."},
    {"type": "heading", "text": "A section heading"},
    {"type": "list", "items": ["First item", "Second item"]},
    {"type": "quote", "text": "A quotation."},
    {"type": "callout", "text": "An aside or useful note."},
    {"type": "link", "text": "Reference", "href": "https://example.com"},
    {"type": "image", "src": "/archive-images/example.webp", "alt": "Describe the image", "text": "Optional caption"}
  ]
}
```

Use `language: "fa"` for Persian with right-to-left reading. Match category IDs and topic names exactly. Put local images in `public/archive-images/`. Content renders as text and structured blocks, not raw HTML. Dates use `YYYY-MM-DD`. Reading time is calculated automatically.

Routes: `/unlisted/gate`, `/unlisted`, `/unlisted/{category}`, `/unlisted/{category}/{note}`. Folder topic and scroll position are restored on return. Archive routes carry `noindex, nofollow` metadata; this is a discovery preference, not a privacy guarantee.

Review locally before authorizing a production push.
