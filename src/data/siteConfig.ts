// =====================================================================
// SITE & THEME CONFIGURATION (Managed via TinaCMS in src/content/settings/)
// =====================================================================
import siteData from "../content/settings/site.json";
import themeData from "../content/settings/theme.json";
import seoData from "../content/settings/seo.json";

export interface BacklinkProfile {
  name: string;
  url: string;
  badgeText?: string;
  showInFooter?: boolean;
}

export interface SiteConfig {
  useImageLogo: boolean;
  logoImagePath: string;
  logoText: string;
  siteName: string;
  navLinks?: Array<{ label: string; href: string }>;
  defaultTheme?: "dark-noir" | "high-key" | "supernova" | string;
  enableThemeSwitcher?: boolean;
  themeSwitcherTitle?: string;
  darkNoirTitle?: string;
  darkNoirAccentColor?: string;
  highKeyTitle?: string;
  highKeyAccentColor?: string;
  highKeyBgColor?: string;
  supernovaTitle?: string;
  supernovaAccentColor?: string;
  supernovaSecondaryColor?: string;
  // Local Business & Citations
  legalName?: string;
  telephone?: string;
  email?: string;
  priceRange?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
  googleMapsUrl?: string;
  geoLatitude?: number;
  geoLongitude?: number;
  backlinkProfiles?: BacklinkProfile[];
}

export const siteConfig: SiteConfig = {
  ...siteData,
  ...themeData,
  ...seoData,
} as SiteConfig;