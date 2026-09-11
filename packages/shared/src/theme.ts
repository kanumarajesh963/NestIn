// Single source of truth for color tokens, shared by the Next.js web app
// (mapped to CSS variables) and the Expo app (mapped to RN style values).

export type ThemeMode = "light" | "dark";

export const colors: Record<ThemeMode, Record<string, string>> = {
  light: {
    background: "#FAF9F7",
    surface: "#FFFFFF",
    surfaceMuted: "#F1EFEA",
    border: "#E7E3DC",
    foreground: "#1C1A17",
    foregroundMuted: "#6B6459",
    primary: "#E4572E",
    primaryForeground: "#FFFFFF",
    accent: "#2F6F5E",
    accentForeground: "#FFFFFF",
    success: "#2F9E44",
    warning: "#E8A400",
    danger: "#D64545",
  },
  dark: {
    background: "#131211",
    surface: "#1C1A17",
    surfaceMuted: "#252220",
    border: "#33302B",
    foreground: "#F5F2EC",
    foregroundMuted: "#A69E90",
    primary: "#F2764A",
    primaryForeground: "#1C1A17",
    accent: "#4FAF95",
    accentForeground: "#0E1B17",
    success: "#4FCB63",
    warning: "#F2B93D",
    danger: "#F17272",
  },
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 999,
};

export const fontFamily = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semibold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};
