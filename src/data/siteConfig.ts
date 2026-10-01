// =====================================================================
// SITE CONFIGURATION (Managed via TinaCMS in src/content/settings/site.json)
// =====================================================================
import siteData from "../content/settings/site.json";

export interface SiteConfig {
  useImageLogo: boolean;
  logoImagePath: string;
  logoText: string;
  siteName: string;
}

export const siteConfig: SiteConfig = siteData;