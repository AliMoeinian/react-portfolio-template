# Ali Moeinian — Glass Portfolio

A frontend-only React / TypeScript portfolio with separate browser routes, a blue glass design system, light/dark themes, searchable projects, and curved career and education roadmaps.

## Local development

```sh
npm ci
npm start
```

Production verification:

```sh
npm run typecheck
npm test -- --watchAll=false
npm run build
npm run preview
```

The local preview uses http://localhost:3000. Set `PORT` to choose another port. No API keys, backend or environment variables are required. Old ignored `.env` files are not used by the application.

## Edit content

| File in `src/data` | Content |
| --- | --- |
| `profile.json` | Name, role, introduction, CV, email, social links and collaboration notice |
| `expertiseData.json` | Expertise descriptions and topics |
| `skillsData.json` | Skill categories and items |
| `ProjectsData.json` | All projects, descriptions, images, links and `featured` selection |
| `experienceData.json` | Original career records, dates and extended descriptions |
| `educationData.json` | Education, institution logos and milestones |
| `publicationsData.json` | Books, covers, dates and resource links |
| `ArticlesData.json` | Papers, publication venue, authorship and dates |
| `achievementsData.json` | Awards and recognition |

Set `profile.opening.active` to `false` to hide the collaboration notice. Its text and destination are editable in the same object.

Add project images to `src/assets/images` as WebP files and set `image` to the filename (with or without `.webp`). No image import map needs updating. Each project needs a unique URL-safe `slug`. `featured: true` includes it in the featured view. Categories are derived automatically from the data. Missing images get a visual fallback. `href: null` omits an external project link.

Institution logos go in `src/assets/logos`; `logo` accepts a filename or `null`. Dates in the original career data are preserved. Career entries are presented by starting date, and can be filtered by starting year. Concurrent roles remain separate. The original data includes two identical January 2026 workshop records; both are intentionally preserved for the owner to review.

## Structure

- `src/App.tsx`: common navigation, theme, route metadata and lazy page loading.
- `src/pages`: Home, Explore (expertise/skills), Projects (collection/detail), Journey (career/education), Library (articles/books/awards), Contact.
- `src/ui/router.tsx`: small History API router; real anchor URLs, modifier clicks and back/forward support.
- `src/ui/Icon.tsx`: shared SVG icon family with CSS glass treatment.
- `src/ui/Mascot.tsx` and `src/ui/mascot.scss`: animated voxel character, greetings, pause control, reduced-motion and off-screen pause behavior.
- `src/assets/images/ali-voxel-mascot.png`: transparent character generated with the built-in image generator, using the owner's photo and voxel style reference. The exact prompt is recorded beside it in `ali-voxel-mascot.prompt.txt`.
- `src/ui/design.scss`: responsive styles and light/dark design tokens.
- `scripts/preview.cjs`: local static build server with SPA fallback.
- `vercel.json`: direct-route fallback for Vercel.

## Routes

`/`, `/expertise`, `/skills`, `/projects`, `/projects/:slug`, `/journey`, `/education`, `/articles`, `/publications`, `/achievements`, `/contact`.

All routes work without a backend. Contact uses email links and optional clipboard copy. Nothing is submitted to a server. Theme preference is stored locally in the browser. No analytics or third-party fonts are loaded.

## Publishing

Review locally before pushing. The connected Vercel project may deploy automatically when changes are pushed to its deployment branch. This redesign does not perform a push or deployment.

## Credits

Based on Yuji Sato's React portfolio template, customized for Ali Moeinian. Original MIT license retained. Existing cover artwork was created with ChatGPT.
