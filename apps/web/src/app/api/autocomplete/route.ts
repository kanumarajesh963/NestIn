import { NextResponse } from "next/server";
import { fetchLocationSuggestions } from "@nestin/shared";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ suggestions: [], configured: false });
  }

  try {
    const suggestions = await fetchLocationSuggestions(query, apiKey);
    return NextResponse.json({ suggestions, configured: true });
  } catch (error) {
    console.error("Autocomplete error:", error);
    return NextResponse.json({ suggestions: [], configured: true, error: true });
  }
}
