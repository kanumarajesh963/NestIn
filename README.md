# NestIn

Find your nest in a new city — real-time PG, hostel, co-living and flat search for people moving to a new city, with roommate matching and local services planned for later phases.

## Structure

```
apps/
  web/      Next.js website (mobile web + desktop web)
  mobile/   Expo (React Native) app
packages/
  shared/   Single source of truth: strings.ts (all UI text, multi-language),
            theme.ts, types.ts, and the Google Places API client
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

Nearby listings are currently mock data (`packages/shared/src/mockListings.ts`), shaped exactly like the real Google Places API response so switching over is a one-line change. To go live:

1. Enable **Places API (New)** in Google Cloud Console and get an API key.
2. Copy `apps/web/.env.example` to `apps/web/.env.local` and set `GOOGLE_PLACES_API_KEY`.
3. Swap `mockListings` for `fetchNearbyListings(...)` (from `@nestin/shared`) in `apps/web/src/app/page.tsx`.

## Roadmap

| Phase | Scope |
|---|---|
| 1 | MVP web app: responsive UI, dark/light mode, Poppins font, multi-language, mock listings, filters, list/map toggle |
| 2 | Real-time data via Google Places API |
| 3 | Owner listings + backend (Postgres/PostGIS, admin verification) |
| 4 | Native app polish (Expo/React Native) |
| 5 | Roommate finder, tiffin/laundry listings, local area guide, community discussion |

## Deploy

- **Web → Vercel**: import this repo, set the project root to `apps/web`, add `GOOGLE_PLACES_API_KEY` as an environment variable once available.
- **Mobile**: build via `eas build` (Expo Application Services) once ready for app store distribution.
