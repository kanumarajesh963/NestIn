# NestIn

Find your nest in a new city — real-time PG, hostel, co-living and flat search for people moving to a new city, with roommate matching and local services planned for later phases.

## Structure

```
apps/
  web/      Next.js website (mobile web + desktop web)
  mobile/   Expo (React Native) app
packages/
  shared/   Single source of truth: strings.ts (all UI text, multi-language),
            theme.ts, types.ts, and the Geoapify location data client
```

## Run locally

```bash
npm install
npm run dev:web        # -> http://localhost:3000
```

For the mobile app:

```bash
npm run dev:mobile      # opens Expo dev tools; scan the QR with Expo Go, or press w for web
```

## Real-time data

The app already calls live API routes (`/api/nearby`, `/api/autocomplete`, `/api/listing/[id]`) backed by **Geoapify** (free tier, no credit card: https://myprojects.geoapify.com/register). Without a key they transparently fall back to the mock dataset (`packages/shared/src/mockListings.ts`), so the app works out of the box. To go live:

1. Sign up at Geoapify and copy your API key.
2. Copy `apps/web/.env.example` to `apps/web/.env.local` and set `GEOAPIFY_API_KEY`.
3. Restart the dev server (or redeploy on Vercel with the same env var set) — real nearby search, location autocomplete, and browser geolocation all switch on automatically.

A Google Places client also exists (`packages/shared/src/places.ts`) as a future upgrade path once billing is set up, but isn't wired in by default.

## Roadmap

| Phase | Scope |
|---|---|
| 1 | MVP web app: responsive UI, dark/light mode, Poppins font, multi-language, mock listings, filters, list/map toggle |
| 2 | Real-time data via Geoapify (free) — location autocomplete, real nearby search, browser geolocation |
| 3 | Owner listings + backend (Postgres/PostGIS, admin verification) |
| 4 | Native app polish (Expo/React Native) |
| 5 | Roommate finder, tiffin/laundry listings, local area guide, community discussion |

## Deploy

- **Web → Vercel**: import this repo, set the project root to `apps/web`, add `GEOAPIFY_API_KEY` as an environment variable once available (Settings → Environment Variables → redeploy).
- **Mobile**: build via `eas build` (Expo Application Services) once ready for app store distribution.
