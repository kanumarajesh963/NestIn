import { NextResponse } from "next/server";
import { fetchListingById, mockListings } from "@nestin/shared";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const mock = mockListings.find((l) => l.id === id);
  if (mock) return NextResponse.json({ listing: mock });

  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ listing: null }, { status: 404 });
  }

  const listing = await fetchListingById(id, apiKey);
  if (!listing) return NextResponse.json({ listing: null }, { status: 404 });
  return NextResponse.json({ listing });
}
