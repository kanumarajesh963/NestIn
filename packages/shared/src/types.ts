export type GenderPreference = "any" | "male" | "female" | "coed";

export type SharingType = "single" | "double" | "triple" | "dorm";

export type Amenity = "wifi" | "ac" | "laundry" | "parking" | "security";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Listing {
  id: string;
  name: string;
  description?: string;
  address: string;
  location: Coordinates;
  photos: string[];
  pricePerMonth: number;
  gender: GenderPreference;
  sharingTypes: SharingType[];
  foodIncluded: boolean;
  amenities: Amenity[];
  rating?: number;
  reviewCount?: number;
  verified: boolean;
  phone?: string;
  source: "google_places" | "owner" | "mock";
}

export interface Filters {
  gender: GenderPreference;
  maxPrice: number;
  sharingTypes: SharingType[];
  foodIncluded: boolean | null;
  amenities: Amenity[];
}

export const DEFAULT_FILTERS: Filters = {
  gender: "any",
  maxPrice: 25000,
  sharingTypes: [],
  foodIncluded: null,
  amenities: [],
};
