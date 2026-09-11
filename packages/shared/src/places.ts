// Real-time listing data via the Google Places API (New).
// Requires an API key with "Places API (New)" enabled, passed in per-call
// so this file works identically from a Next.js server action and from
// the Expo app.
import type { Coordinates, Listing } from "./types";

const NEARBY_SEARCH_URL = "https://places.googleapis.com/v1/places:searchNearby";
const PHOTO_URL = (name: string, apiKey: string, maxWidth = 800) =>
  `https://places.googleapis.com/v1/${name}/media?maxWidthPx=${maxWidth}&key=${apiKey}`;

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.photos",
  "places.rating",
  "places.userRatingCount",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
].join(",");

interface RawPlace {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  location?: { latitude: number; longitude: number };
  photos?: { name: string }[];
  rating?: number;
  userRatingCount?: number;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
}

function mapPlaceToListing(place: RawPlace, apiKey: string): Listing {
  return {
    id: place.id,
    name: place.displayName?.text ?? "Unnamed listing",
    address: place.formattedAddress ?? "",
    location: {
      lat: place.location?.latitude ?? 0,
      lng: place.location?.longitude ?? 0,
    },
    photos: (place.photos ?? []).slice(0, 6).map((p) => PHOTO_URL(p.name, apiKey)),
    pricePerMonth: 0, // Places API has no price data; owners/admins fill this in after claiming.
    gender: "any",
    sharingTypes: [],
    foodIncluded: false,
    amenities: [],
    rating: place.rating,
    reviewCount: place.userRatingCount,
    verified: false,
    phone: place.nationalPhoneNumber ?? place.internationalPhoneNumber,
    source: "google_places",
  };
}

export interface FetchNearbyListingsParams {
  apiKey: string;
  center: Coordinates;
  radiusMeters?: number;
  /** e.g. ["pg", "hostel", "co-living"] — Places has no dedicated PG category, so we search by keyword. */
  keywords?: string[];
  maxResultCount?: number;
}

export async function fetchNearbyListings({
  apiKey,
  center,
  radiusMeters = 5000,
  keywords = ["PG accommodation", "hostel", "co-living space"],
  maxResultCount = 20,
}: FetchNearbyListingsParams): Promise<Listing[]> {
  const results = await Promise.all(
    keywords.map(async (keyword) => {
      const res = await fetch(NEARBY_SEARCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        body: JSON.stringify({
          includedTypes: ["lodging"],
          maxResultCount,
          locationRestriction: {
            circle: {
              center: { latitude: center.lat, longitude: center.lng },
              radius: radiusMeters,
            },
          },
          keyword,
        }),
      });

      if (!res.ok) {
        throw new Error(`Places API error (${res.status}): ${await res.text()}`);
      }

      const data = (await res.json()) as { places?: RawPlace[] };
      return (data.places ?? []).map((p) => mapPlaceToListing(p, apiKey));
    })
  );

  const merged = new Map<string, Listing>();
  for (const listing of results.flat()) {
    merged.set(listing.id, listing);
  }
  return Array.from(merged.values());
}
