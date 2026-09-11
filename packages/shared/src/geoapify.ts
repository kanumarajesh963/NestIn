// Real-time location search + nearby places via Geoapify (free tier, no credit
// card: https://myprojects.geoapify.com/register). Called from Next.js API
// routes so the key stays server-side.
import type { Coordinates, Listing } from "./types";

const AUTOCOMPLETE_URL = "https://api.geoapify.com/v1/geocode/autocomplete";
const PLACES_URL = "https://api.geoapify.com/v2/places";
const PLACE_DETAILS_URL = "https://api.geoapify.com/v2/place-details";

export interface LocationSuggestion {
  id: string;
  label: string;
  location: Coordinates;
}

export async function fetchLocationSuggestions(
  query: string,
  apiKey: string
): Promise<LocationSuggestion[]> {
  const url = new URL(AUTOCOMPLETE_URL);
  url.searchParams.set("text", query);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("format", "json");
  url.searchParams.set("filter", "countrycode:in");
  url.searchParams.set("limit", "5");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Geoapify autocomplete error (${res.status})`);
  const data = (await res.json()) as {
    results?: { formatted: string; place_id: string; lat: number; lon: number }[];
  };

  return (data.results ?? []).map((r) => ({
    id: r.place_id,
    label: r.formatted,
    location: { lat: r.lat, lng: r.lon },
  }));
}

interface GeoapifyPlaceFeature {
  properties: {
    place_id: string;
    name?: string;
    formatted?: string;
    address_line2?: string;
    lat: number;
    lon: number;
    categories?: string[];
    contact?: { phone?: string };
    phone?: string;
  };
}

function mapFeatureToListing(feature: GeoapifyPlaceFeature): Listing {
  const p = feature.properties;
  return {
    id: p.place_id,
    name: p.name || p.formatted || "Unnamed listing",
    address: p.formatted ?? p.address_line2 ?? "",
    location: { lat: p.lat, lng: p.lon },
    photos: [],
    pricePerMonth: 0,
    gender: "any",
    sharingTypes: [],
    foodIncluded: false,
    amenities: [],
    verified: false,
    phone: p.contact?.phone ?? p.phone,
    source: "google_places",
  };
}

export interface FetchNearbyListingsParams {
  apiKey: string;
  center: Coordinates;
  radiusMeters?: number;
  categories?: string[];
  limit?: number;
}

export async function fetchNearbyListings({
  apiKey,
  center,
  radiusMeters = 5000,
  categories = ["accommodation.hostel", "accommodation.guest_house"],
  limit = 40,
}: FetchNearbyListingsParams): Promise<Listing[]> {
  const url = new URL(PLACES_URL);
  url.searchParams.set("categories", categories.join(","));
  url.searchParams.set(
    "filter",
    `circle:${center.lng},${center.lat},${radiusMeters}`
  );
  url.searchParams.set("bias", `proximity:${center.lng},${center.lat}`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("apiKey", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Geoapify places error (${res.status})`);
  const data = (await res.json()) as { features?: GeoapifyPlaceFeature[] };
  return (data.features ?? []).map(mapFeatureToListing);
}

export async function fetchListingById(
  placeId: string,
  apiKey: string
): Promise<Listing | null> {
  const url = new URL(PLACE_DETAILS_URL);
  url.searchParams.set("id", placeId);
  url.searchParams.set("apiKey", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = (await res.json()) as { features?: GeoapifyPlaceFeature[] };
  const feature = data.features?.[0];
  return feature ? mapFeatureToListing(feature) : null;
}
