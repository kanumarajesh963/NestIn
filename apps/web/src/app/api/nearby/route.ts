import { NextResponse } from "next/server";
import { fetchNearbyListings, mockListings } from "@nestin/shared";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return NextResponse.json({ listings: [], error: "Missing lat/lng" }, { status: 400 });
  }

  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ listings: mockListings, configured: false });
  }

  try {
    const listings = await fetchNearbyListings({ apiKey, center: { lat, lng } });
    return NextResponse.json({ listings, configured: true });
  } catch (error) {
    console.error("Nearby search error:", error);
    return NextResponse.json({ listings: mockListings, configured: true, error: true });
  }
}
