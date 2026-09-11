// Single source of truth for every user-facing string in NestIn (web + mobile).
// Add a language by adding a key to `strings` below with the same shape as `en`.

export const SUPPORTED_LANGUAGES = ["en", "hi"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
};

export const DEFAULT_LANGUAGE: Language = "en";

type DeepString<T> = T extends string ? string : { [K in keyof T]: DeepString<T[K]> };

const en = {
    app: {
      name: "NestIn",
      tagline: "Find your nest in a new city",
    },
    nav: {
      home: "Home",
      search: "Search",
      roommates: "Roommates",
      services: "Services",
      guide: "Area Guide",
      profile: "Profile",
    },
    theme: {
      light: "Light",
      dark: "Dark",
      system: "System",
      toggle: "Toggle theme",
    },
    language: {
      toggle: "Language",
    },
    home: {
      heroTitle: "Find your nest in a new city",
      heroSubtitle:
        "Discover verified PGs, hostels, co-living spaces and flats near you — updated in real time.",
      searchPlaceholder: "Search by locality, college, or landmark",
      searchButton: "Search",
      nearbyTitle: "Near you right now",
      viewAll: "View all",
    },
    filters: {
      title: "Filters",
      gender: "Gender",
      genderAny: "Any",
      genderMale: "Male",
      genderFemale: "Female",
      genderCoed: "Co-ed",
      priceRange: "Price range",
      sharingType: "Sharing type",
      sharingSingle: "Single",
      sharingDouble: "Double sharing",
      sharingTriple: "Triple sharing",
      sharingDorm: "Dormitory",
      foodIncluded: "Food included",
      amenities: "Amenities",
      amenityWifi: "WiFi",
      amenityAc: "AC",
      amenityLaundry: "Laundry",
      amenityParking: "Parking",
      amenitySecurity: "24/7 Security",
      apply: "Apply filters",
      reset: "Reset",
    },
    view: {
      mapView: "Map view",
      listView: "List view",
    },
    listing: {
      verified: "Verified",
      perMonth: "/ month",
      viewDetails: "View details",
      call: "Call",
      whatsapp: "WhatsApp",
      reviews: "reviews",
      noResults: "No listings found. Try adjusting your filters.",
      loading: "Finding places near you…",
      distanceAway: "away",
    },
    detail: {
      gallery: "Photos",
      about: "About this place",
      amenities: "Amenities",
      location: "Location",
      reviewsTitle: "Reviews",
      contactOwner: "Contact owner",
      back: "Back",
    },
    roommate: {
      title: "Find a flatmate",
      subtitle: "Connect with people looking for a room near you",
      postAd: "Post your requirement",
    },
    services: {
      title: "Nearby services",
      tiffin: "Tiffin & Mess",
      laundry: "Laundry",
    },
    guide: {
      title: "Local area guide",
      safety: "Safety",
      costOfLiving: "Cost of living",
      nearbyInstitutes: "Nearby colleges & offices",
    },
    common: {
      loading: "Loading…",
      error: "Something went wrong. Please try again.",
      retry: "Retry",
      comingSoon: "Coming soon",
    },
} as const;

export type Strings = DeepString<typeof en>;

const hi: Strings = {
    app: {
      name: "NestIn",
      tagline: "नए शहर में अपना आशियाना खोजें",
    },
    nav: {
      home: "होम",
      search: "खोजें",
      roommates: "रूममेट्स",
      services: "सेवाएं",
      guide: "क्षेत्र गाइड",
      profile: "प्रोफ़ाइल",
    },
    theme: {
      light: "लाइट",
      dark: "डार्क",
      system: "सिस्टम",
      toggle: "थीम बदलें",
    },
    language: {
      toggle: "भाषा",
    },
    home: {
      heroTitle: "नए शहर में अपना आशियाना खोजें",
      heroSubtitle:
        "अपने पास वेरिफाइड पीजी, हॉस्टल, को-लिविंग स्पेस और फ्लैट खोजें — रीयल टाइम में अपडेटेड।",
      searchPlaceholder: "इलाका, कॉलेज या लैंडमार्क से खोजें",
      searchButton: "खोजें",
      nearbyTitle: "अभी आपके आस-पास",
      viewAll: "सभी देखें",
    },
    filters: {
      title: "फ़िल्टर",
      gender: "लिंग",
      genderAny: "कोई भी",
      genderMale: "पुरुष",
      genderFemale: "महिला",
      genderCoed: "को-एड",
      priceRange: "मूल्य सीमा",
      sharingType: "शेयरिंग प्रकार",
      sharingSingle: "सिंगल",
      sharingDouble: "डबल शेयरिंग",
      sharingTriple: "ट्रिपल शेयरिंग",
      sharingDorm: "डॉर्मिटरी",
      foodIncluded: "भोजन शामिल",
      amenities: "सुविधाएं",
      amenityWifi: "वाईफाई",
      amenityAc: "एसी",
      amenityLaundry: "लॉन्ड्री",
      amenityParking: "पार्किंग",
      amenitySecurity: "24/7 सुरक्षा",
      apply: "फ़िल्टर लागू करें",
      reset: "रीसेट",
    },
    view: {
      mapView: "मैप व्यू",
      listView: "लिस्ट व्यू",
    },
    listing: {
      verified: "वेरिफाइड",
      perMonth: "/ माह",
      viewDetails: "विवरण देखें",
      call: "कॉल करें",
      whatsapp: "व्हाट्सएप",
      reviews: "समीक्षाएं",
      noResults: "कोई लिस्टिंग नहीं मिली। अपने फ़िल्टर बदलकर देखें।",
      loading: "आपके आस-पास जगहें खोजी जा रही हैं…",
      distanceAway: "दूर",
    },
    detail: {
      gallery: "फ़ोटो",
      about: "इस जगह के बारे में",
      amenities: "सुविधाएं",
      location: "स्थान",
      reviewsTitle: "समीक्षाएं",
      contactOwner: "मालिक से संपर्क करें",
      back: "वापस",
    },
    roommate: {
      title: "फ्लैटमेट खोजें",
      subtitle: "अपने आस-पास कमरा खोजने वालों से जुड़ें",
      postAd: "अपनी आवश्यकता पोस्ट करें",
    },
    services: {
      title: "आस-पास की सेवाएं",
      tiffin: "टिफिन और मेस",
      laundry: "लॉन्ड्री",
    },
    guide: {
      title: "स्थानीय क्षेत्र गाइड",
      safety: "सुरक्षा",
      costOfLiving: "जीवन यापन की लागत",
      nearbyInstitutes: "आस-पास के कॉलेज और ऑफिस",
    },
    common: {
      loading: "लोड हो रहा है…",
      error: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
      retry: "पुनः प्रयास करें",
      comingSoon: "जल्द आ रहा है",
    },
};

export const strings: Record<Language, Strings> = { en, hi };
