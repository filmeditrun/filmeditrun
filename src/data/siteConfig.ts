// =====================================================================
// SITE CONFIGURATION (Global Branding & Settings)
// =====================================================================

export interface SiteConfig {
  // --- BRANDING SWITCHER ---
  // Change to true if you upload a logo image (e.g., /images/logo.png)
  useImageLogo: boolean;
  logoImagePath: string;
  logoText: string;
  siteName: string;
}

export const siteConfig: SiteConfig = {
  // 1. Switch between text or image logo easily here:
  useImageLogo: false, 
  
  // 2. Put your image path here if useImageLogo is true:
  logoImagePath: "/images/my-logo.png",
  
  // 3. Change your brand text here if useImageLogo is false:
  logoText: "FILM EDIT RUN",
  
  // 4. Used for copyright and metadata:
  siteName: "FilmEditRun",
};