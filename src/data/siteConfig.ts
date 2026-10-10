// =====================================================================
// SITE & THEME CONFIGURATION (Managed via TinaCMS in src/content/settings/)
// =====================================================================
import siteData from "../content/settings/site.json";
import themeData from "../content/settings/theme.json";

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
}

export const siteConfig: SiteConfig = {
  ...siteData,
  ...themeData,
} as SiteConfig;