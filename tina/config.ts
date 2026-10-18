import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Needed only when deploying Tina Cloud in production; leave empty for local visual editing
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  cmsCallback: (cms) => {
    if (typeof document !== "undefined") {
      const styleId = "tina-custom-admin-theme";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          /* Smart Invert Dimmer for comfortable dark reading */
          html {
            filter: invert(0.92) hue-rotate(180deg);
            background: #121212 !important;
          }
          /* Counter-invert media, swatches, iframes, and welcome card */
          iframe,
          img,
          video,
          svg image,
          .swatch-inner,
          [class*="swatch"],
          [class*="sketch-picker"],
          [class*="color-picker"],
          [class*="media-item"],
          [data-testid="media-image"],
          .filmeditrun-welcome-card {
            filter: invert(1) hue-rotate(180deg) !important;
          }

          /* Standard centered form width for all document editor forms (860px) */
          form,
          form > div,
          [data-test*="form"],
          [data-test*="form"] > div,
          [data-test^="form:"],
          [data-test^="form:"] > div,
          .max-w-form,
          div:has(> form) {
            max-width: 860px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          /* Grade Switcher collection specifically: wider layout (1280px) */
          form:has([data-test*="theme"]),
          [data-test*="theme"] form,
          [data-test*="theme"] > div {
            max-width: 1280px !important;
            padding-left: 28px !important;
            padding-right: 28px !important;
          }
          div:has(> [data-test*="theme"]) ~ div .max-w-form {
            max-width: 1280px !important;
          }

          /* Grade Switcher and Hero color swatches: 360px (half size extra) */
          button:has(> .swatch-inner),
          div.relative:has(> button > .swatch-inner),
          .swatch-inner {
            max-width: 360px !important;
          }

          /* Collection List Tables (Custom Pages, Portfolio Projects, Services) - scoped strictly to tables */
          div.relative.left-0.w-full.h-full:has(table),
          div.relative.left-0.w-full.h-full:has([role="table"]) {
            max-width: 1100px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            width: 100% !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          div.relative.left-0.w-full.h-full table,
          div.relative.left-0.w-full.h-full [role="table"] {
            width: 100% !important;
            table-layout: auto !important;
          }

          /* Top-left brand icon: clean white */
          svg.text-orange-500,
          svg.fill-tina-orange {
            filter: invert(1) hue-rotate(180deg) !important;
            color: #ffffff !important;
            fill: #ffffff !important;
          }
        `;
        document.head.appendChild(style);
      }
    }
    return cms;
  },
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "home",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "🔍 SEO Title (Google & Social)",
            description: "Optimal length: 50–60 characters. Include primary keywords & locations.",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "🔍 SEO Meta Description",
            description: "Optimal length: 140–160 characters. Compelling summary for search snippets.",
            ui: {
              component: "textarea",
            },
            required: true,
          },

          // ─── 🎨 HERO & CINEMA BANNER ──────────────────────────────────
          {
            type: "string",
            name: "locations",
            label: "🎨 Hero Locations Badge",
            description: "e.g. London • Cambridge • UK Wide",
            required: true,
          },
          {
            type: "string",
            name: "heroHeadingPrefix",
            label: "Hero Heading (Main White Text)",
            description: "e.g. We Capture, Create, and",
            required: true,
          },
          {
            type: "string",
            name: "heroHeadingHighlight",
            label: "Hero Heading (Amber Highlight Word)",
            description: "e.g. Produce.",
            required: true,
          },
          {
            type: "string",
            name: "tagline",
            label: "Hero Subtitle / Tagline",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "heroVideoPath",
            label: "Hero Background Video Path",
            description: "e.g. /showreel.mp4 (placed in public/ folder)",
            required: true,
          },
          {
            type: "image",
            name: "heroPosterPath",
            label: "Hero Video Fallback Poster Image",
            description: "Poster frame displayed before video loads or on mobile low-power mode (e.g. /og-image.jpg)",
          },
          {
            type: "string",
            name: "primaryCtaLabel",
            label: "Primary Button Text",
            required: true,
          },
          {
            type: "string",
            name: "primaryCtaLink",
            label: "Primary Button Link",
            required: true,
          },
          {
            type: "string",
            name: "secondaryCtaLabel",
            label: "Secondary Button Text",
            required: true,
          },
          {
            type: "string",
            name: "secondaryCtaLink",
            label: "Secondary Button Link",
            required: true,
          },
          // ─── 🎞️ SPEC STRIP ───────────────────────────────────────────
          {
            type: "string",
            name: "brandName",
            label: "🎞️ Spec Strip Brand Label",
            required: true,
          },
          {
            type: "string",
            name: "expertiseList",
            label: "🎞️ Spec Strip Expertise Items",
            list: true,
          },

          // ─── 📝 EDITORIAL INTRO SECTION ───────────────────────────────
          {
            type: "string",
            name: "introHeading",
            label: "📝 Intro Section Heading",
            required: true,
          },
          {
            type: "string",
            name: "introBody",
            label: "📝 Intro Section Body Text",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "introPrimaryLinkLabel",
            label: "Intro First Link Text",
            required: true,
          },
          {
            type: "string",
            name: "introPrimaryLinkHref",
            label: "Intro First Link URL",
            required: true,
          },
          {
            type: "string",
            name: "introSecondaryLinkLabel",
            label: "Intro Second Link Text",
            required: true,
          },
          {
            type: "string",
            name: "introSecondaryLinkHref",
            label: "Intro Second Link URL",
            required: true,
          },
        ],
      },
      {
        name: "cambridgePage",
        label: "Cambridge Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "cambridge",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "🔍 SEO Title (Google & Social)",
            description: "Optimal length: 50–60 characters",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "🔍 SEO Meta Description",
            description: "Optimal length: 140–160 characters",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "canonicalURL",
            label: "🔍 Canonical URL",
            required: true,
          },

          // ─── 🎨 HERO & CINEMA BANNER ──────────────────────────────────
          {
            type: "string",
            name: "heroTag",
            label: "🎨 Hero Badge Tag",
            required: true,
          },
          {
            type: "string",
            name: "heroHeadingPrefix",
            label: "Hero Heading (Main White Text)",
            required: true,
          },
          {
            type: "string",
            name: "heroHeadingHighlight",
            label: "Hero Heading (Amber Highlight Word)",
            required: true,
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "heroCtaLabel",
            label: "Hero Button Text",
            required: true,
          },
          {
            type: "string",
            name: "heroCtaLink",
            label: "Hero Button Link",
            required: true,
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero Background Media Type",
            options: [
              { label: "Local Video Loop (from /public)", value: "local-video" },
              { label: "External Cloud Video URL", value: "link-video" },
              { label: "Static Image Only", value: "image" },
            ],
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Local Video Path",
            description: "e.g. /showreel.mp4",
          },
          {
            type: "string",
            name: "cloudVideoUrl",
            label: "Cloud Video URL",
            description: "e.g. https://your-link.mp4",
          },
          {
            type: "image",
            name: "imagePath",
            label: "Hero Background Image / Fallback Poster",
          },
          {
            type: "string",
            name: "expertiseTag",
            label: "Expertise Section Tag",
            required: true,
          },
          {
            type: "string",
            name: "expertiseHeading",
            label: "Expertise Section Heading",
            required: true,
          },
          {
            type: "string",
            name: "expertiseDescription",
            label: "Expertise Section Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "expertiseBullets",
            label: "Expertise Checkmark Bullet Points",
            list: true,
          },
          {
            type: "string",
            name: "cardTitle",
            label: "Right Feature Card Title",
            required: true,
          },
          {
            type: "string",
            name: "cardBody",
            label: "Right Feature Card Body",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "cardLinkLabel",
            label: "Right Feature Card Link Text",
            required: true,
          },
          {
            type: "string",
            name: "cardLinkHref",
            label: "Right Feature Card Link URL",
            required: true,
          },
          // ─── 📸 ON-LOCATION EDITORIAL LOOKBOOK ─────────────────────────
          {
            type: "string",
            name: "lookbookTag",
            label: "📸 Lookbook Section Tag",
          },
          {
            type: "image",
            name: "lookbookHeroImage",
            label: "📸 Large Hero Frame (Left)",
          },
          {
            type: "string",
            name: "lookbookHeroBadge",
            label: "Large Hero Badge (e.g. Cambridge Science Park • Multi-Cam Keynote)",
          },
          {
            type: "image",
            name: "lookbookDetail1Image",
            label: "📸 Detail Frame 1 (Top Right)",
          },
          {
            type: "string",
            name: "lookbookDetail1Badge",
            label: "Detail 1 Badge (e.g. Historic Colleges • Symposia & Panels)",
          },
          {
            type: "image",
            name: "lookbookDetail2Image",
            label: "📸 Detail Frame 2 (Bottom Right)",
          },
          {
            type: "string",
            name: "lookbookDetail2Badge",
            label: "Detail 2 Badge (e.g. The Bradfield Centre • Executive Interviews)",
          },
          // ─── ❓ FREQUENTLY ASKED QUESTIONS (AI SEARCH SCHEMA) ────────
          {
            type: "string",
            name: "faqHeading",
            label: "❓ FAQ Section Heading",
            required: true,
          },
          {
            type: "object",
            name: "faqs",
            label: "❓ FAQ Items (Auto-indexed for AI Search)",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.question || "FAQ Item",
              }),
            },
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
                required: true,
              },
              {
                type: "string",
                name: "answer",
                label: "Answer",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
            ],
          },

          // ─── ⚡ CALL TO ACTION (CLOSER) ──────────────────────────────
          {
            type: "string",
            name: "bottomCtaHeading",
            label: "⚡ Bottom CTA Heading",
            required: true,
          },
          {
            type: "string",
            name: "bottomCtaBody",
            label: "Bottom CTA Subtitle",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "bottomCtaLabel",
            label: "Bottom CTA Button Text",
            required: true,
          },
          {
            type: "string",
            name: "bottomCtaLink",
            label: "Bottom CTA Button Link",
            required: true,
          },
        ],
      },
      {
        name: "londonPage",
        label: "London Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "london",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "🔍 SEO Title (Google & Social)",
            description: "Optimal length: 50–60 characters",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "🔍 SEO Meta Description",
            description: "Optimal length: 140–160 characters",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "canonicalURL",
            label: "🔍 Canonical URL",
            required: true,
          },

          // ─── 🎨 HERO & CINEMA BANNER ──────────────────────────────────
          {
            type: "string",
            name: "heroTag",
            label: "🎨 Hero Badge Tag",
            required: true,
          },
          {
            type: "string",
            name: "heroHeadingPrefix",
            label: "Hero Heading (Main White Text)",
            required: true,
          },
          {
            type: "string",
            name: "heroHeadingHighlight",
            label: "Hero Heading (Amber Highlight Word)",
            required: true,
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Lead Paragraph",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "heroCtaLabel",
            label: "Hero CTA Button Text",
            required: true,
          },
          {
            type: "string",
            name: "heroCtaLink",
            label: "Hero CTA Button Link",
            required: true,
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero Background Media Type",
            description: "Select whether the hero displays a looping video, photo, or transparent darkroom",
            options: [
              { value: "local-video", label: "🎬 Local Video Loop (Fastest, e.g. /showreel.mp4)" },
              { value: "link-video", label: "🔗 Hosted Video URL (.mp4 / cloud stream)" },
              { value: "image", label: "📸 Static Photograph" },
              { value: "none", label: "⬛ Pure Minimalist Darkroom (No Media)" },
            ],
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Local Video File Path",
            description: "Default: /showreel.mp4",
          },
          {
            type: "string",
            name: "cloudVideoUrl",
            label: "External Video File URL (.mp4)",
          },
          {
            type: "image",
            name: "imagePath",
            label: "Static Background Image / Fallback Poster",
            description: "High-resolution photo used as background or video poster",
          },

          // ─── 📍 LOCAL EXPERTISE & VENUE SPECIFICATIONS ───────────────
          {
            type: "string",
            name: "expertiseTag",
            label: "📍 Local Hub Section Tag",
            required: true,
          },
          {
            type: "string",
            name: "expertiseHeading",
            label: "Local Hub Main Heading",
            required: true,
          },
          {
            type: "string",
            name: "expertiseDescription",
            label: "Local Production Overview",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "expertiseBullets",
            label: "Key Production Capabilities (Bullet List)",
            list: true,
          },
          {
            type: "string",
            name: "cardTitle",
            label: "Right Feature Card Title",
            required: true,
          },
          {
            type: "string",
            name: "cardBody",
            label: "Right Feature Card Body Text",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "cardLinkLabel",
            label: "Right Feature Card Link Text",
            required: true,
          },
          {
            type: "string",
            name: "cardLinkHref",
            label: "Right Feature Card Link URL",
            required: true,
          },
          // ─── 📸 ON-LOCATION EDITORIAL LOOKBOOK ─────────────────────────
          {
            type: "string",
            name: "lookbookTag",
            label: "📸 Lookbook Section Tag",
          },
          {
            type: "image",
            name: "lookbookHeroImage",
            label: "📸 Large Hero Frame (Left)",
          },
          {
            type: "string",
            name: "lookbookHeroBadge",
            label: "Large Hero Badge (e.g. ExCeL London • 4K Multi-Cam Stage)",
          },
          {
            type: "image",
            name: "lookbookDetail1Image",
            label: "📸 Detail Frame 1 (Top Right)",
          },
          {
            type: "string",
            name: "lookbookDetail1Badge",
            label: "Detail 1 Badge (e.g. City of London • Executive Profiles)",
          },
          {
            type: "image",
            name: "lookbookDetail2Image",
            label: "📸 Detail Frame 2 (Bottom Right)",
          },
          {
            type: "string",
            name: "lookbookDetail2Badge",
            label: "Detail 2 Badge (e.g. Kings Cross • Live Audio & Cinema Rigs)",
          },
          // ─── ❓ FREQUENTLY ASKED QUESTIONS (AI SEARCH SCHEMA) ────────
          {
            type: "string",
            name: "faqHeading",
            label: "❓ FAQ Section Heading",
            required: true,
          },
          {
            type: "object",
            name: "faqs",
            label: "❓ FAQ Items (Auto-indexed for AI Search)",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.question || "FAQ Item",
              }),
            },
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
                required: true,
              },
              {
                type: "string",
                name: "answer",
                label: "Answer",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
            ],
          },

          // ─── ⚡ CALL TO ACTION (CLOSER) ──────────────────────────────
          {
            type: "string",
            name: "bottomCtaHeading",
            label: "⚡ Bottom CTA Heading",
            required: true,
          },
          {
            type: "string",
            name: "bottomCtaBody",
            label: "Bottom CTA Subtitle",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "bottomCtaLabel",
            label: "Bottom CTA Button Text",
            required: true,
          },
          {
            type: "string",
            name: "bottomCtaLink",
            label: "Bottom CTA Button Link",
            required: true,
          },
        ],
      },
      {
        name: "customPages",
        label: "Custom Pages",
        path: "src/content/pages/custom",
        format: "json",

        fields: [
          // ─── 🔍 SEO & ROUTING ──────────────────────────────────────────
          {
            type: "string",
            name: "slug",
            label: "🔗 Page URL Slug",
            description: "Unique URL pathname (e.g. 'london' creates /london, 'pricing' creates /pricing)",
            required: true,
          },
          {
            type: "string",
            name: "seoTitle",
            label: "🔍 SEO Title (Browser Tab & Google)",
            description: "Optimal length: 50–60 characters",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "🔍 SEO Meta Description",
            description: "Optimal length: 140–160 characters",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "canonicalURL",
            label: "🔍 Canonical URL (Optional)",
            description: "Defaults to https://filmeditrun.co.uk/{slug}",
          },

          // ─── 🎨 HERO BANNER ───────────────────────────────────────────
          {
            type: "string",
            name: "heroTag",
            label: "🎨 Hero Eyebrow Tag",
            description: "Small uppercase category tag above the headline",
          },
          {
            type: "string",
            name: "heroHeadingPrefix",
            label: "Hero Heading (Main White Text)",
            description: "Initial headline copy before the highlight",
            required: true,
          },
          {
            type: "string",
            name: "heroHeadingHighlight",
            label: "Hero Heading Highlight Word(s)",
            description: "Accent word(s) highlighted with dynamic theme gradient color",
            required: true,
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle Copy",
            description: "Supports *highlight* formatting",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "heroCtaLabel",
            label: "Hero Button Label",
          },
          {
            type: "string",
            name: "heroCtaLink",
            label: "Hero Button Link",
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero Background Media Type",
            options: [
              { label: "🎬 Cinematic Video Loop", value: "local-video" },
              { label: "📸 Static Photograph / Image", value: "image" },
              { label: "🎨 Dual-Tone Gradient Background", value: "gradient" },
              { label: "🌐 External Cloud Video URL", value: "link-video" },
              { label: "⬛ Minimalist Dark Void (No Media)", value: "none" },
            ],
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Local Video Path (When Video selected)",
            description: "e.g. /showreel.mp4 (placed in public/ folder)",
          },
          {
            type: "string",
            name: "cloudVideoUrl",
            label: "Cloud Video URL (When External Video selected)",
            description: "e.g. https://your-link.mp4",
          },
          {
            type: "image",
            name: "imagePath",
            label: "Hero Background Photo / Video Fallback Poster",
          },
          {
            type: "string",
            name: "heroGradientDirection",
            label: "Gradient Direction (When Gradient selected)",
            options: [
              { value: "to bottom right", label: "Diagonal (Top-Left to Bottom-Right)" },
              { value: "to bottom", label: "Vertical (Top to Bottom)" },
              { value: "to right", label: "Horizontal (Left to Right)" },
              { value: "to top right", label: "Reverse Diagonal (Bottom-Left to Top-Right)" },
              { value: "to bottom left", label: "Opposite Diagonal (Top-Right to Bottom-Left)" },
              { value: "radial", label: "Center Spotlight (Radial)" },
            ],
          },
          {
            type: "string",
            name: "heroGradientColor1",
            label: "Gradient First Color (Hex)",
            description: "First color or spotlight center",
            ui: {
              component: "color",
            },
          },
          {
            type: "string",
            name: "heroGradientColor2",
            label: "Gradient Second Color (Hex)",
            description: "Second color or gradient base",
            ui: {
              component: "color",
            },
          },

          // ─── 💡 NARRATIVE STORY 1 (Left: Copy, Right: Card or Photo) ───
          {
            type: "string",
            name: "section1Tag",
            label: "Story 1: Eyebrow Tag",
            description: "e.g. Our Approach, Scope Overview",
          },
          {
            type: "string",
            name: "section1Heading",
            label: "Story 1: Section Heading",
            description: "Main section title. Wrap in *asterisks* to highlight text with theme gradient color.",
            required: true,
          },
          {
            type: "string",
            name: "section1Description",
            label: "Story 1: Section Body Copy",
            description: "Editorial paragraph. Supports **bold**, <u>underline</u>, and *highlight*.",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "section1Bullets",
            label: "Story 1: Checkmark Bullet Points",
            description: "Key deliverables or assurances (✓ rendered automatically)",
            list: true,
          },
          {
            type: "string",
            name: "section1RightType",
            label: "Story 1: Right Column Display Mode",
            description: "Choose whether to display an informative plaque card or a featured photograph",
            options: [
              { label: "Informative Plaque Card (Title, Text & Link)", value: "card" },
              { label: "Featured Photograph / Showcase Image", value: "image" },
            ],
          },
          {
            type: "string",
            name: "section1CardTitle",
            label: "Story 1: Plaque Card Title",
            description: "e.g. Why Clients Choose Us",
          },
          {
            type: "string",
            name: "section1CardBody",
            label: "Story 1: Plaque Card Body Copy",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "section1CardLinkLabel",
            label: "Story 1: Plaque Card Link Text",
            description: "e.g. Explore Selected Work →",
          },
          {
            type: "string",
            name: "section1CardLinkHref",
            label: "Story 1: Plaque Card Link URL",
            description: "e.g. /work or /contact",
          },
          {
            type: "image",
            name: "section1CardImage",
            label: "Story 1: Showcase Photograph (When Display Mode is Image)",
          },
          {
            type: "string",
            name: "section1CardImageCaption",
            label: "Story 1: Showcase Photo Caption (Optional)",
          },

          // ─── 🔄 NARRATIVE STORY 2 (Left: Card or Photo, Right: Copy) ───
          {
            type: "string",
            name: "section2Tag",
            label: "Story 2: Eyebrow Tag",
            description: "e.g. Production Standards, Technical Capabilities",
          },
          {
            type: "string",
            name: "section2Heading",
            label: "Story 2: Section Heading",
            description: "Main section title. Wrap in *asterisks* to highlight text with theme gradient color.",
          },
          {
            type: "string",
            name: "section2Description",
            label: "Story 2: Section Body Copy",
            description: "Editorial paragraph. Supports **bold**, <u>underline</u>, and *highlight*.",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "section2Bullets",
            label: "Story 2: Checkmark Bullet Points",
            description: "Key deliverables or assurances (✓ rendered automatically)",
            list: true,
          },
          {
            type: "string",
            name: "section2LeftType",
            label: "Story 2: Left Column Display Mode",
            description: "Choose whether to display a featured photograph or an informative plaque card",
            options: [
              { label: "Featured Photograph / Showcase Image", value: "image" },
              { label: "Informative Plaque Card (Title, Text & Link)", value: "card" },
            ],
          },
          {
            type: "string",
            name: "section2CardTitle",
            label: "Story 2: Plaque Card Title",
          },
          {
            type: "string",
            name: "section2CardBody",
            label: "Story 2: Plaque Card Body Copy",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "section2CardLinkLabel",
            label: "Story 2: Plaque Card Link Text",
          },
          {
            type: "string",
            name: "section2CardLinkHref",
            label: "Story 2: Plaque Card Link URL",
          },
          {
            type: "image",
            name: "section2CardImage",
            label: "Story 2: Showcase Photograph (When Display Mode is Image)",
          },
          {
            type: "string",
            name: "section2CardImageCaption",
            label: "Story 2: Showcase Photo Caption (Optional)",
          },

          // ─── ⚡ CALL TO ACTION (CLOSER) ──────────────────────────────
          {
            type: "string",
            name: "bottomCtaHeading",
            label: "Bottom CTA Heading",
          },
          {
            type: "string",
            name: "bottomCtaBody",
            label: "Bottom CTA Subtitle",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "bottomCtaLabel",
            label: "Bottom CTA Button Text",
          },
          {
            type: "string",
            name: "bottomCtaLink",
            label: "Bottom CTA Button Link",
          },
        ],
      },
      {
        name: "siteSettings",
        label: "Header & Site Branding",
        path: "src/content/settings",
        format: "json",
        match: {
          include: "site",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Site Name (Metadata & Copyright)",
            required: true,
          },
          {
            type: "string",
            name: "logoText",
            label: "Text Logo",
            required: true,
          },
          {
            type: "boolean",
            name: "useImageLogo",
            label: "Use Image Logo Instead of Text?",
          },
          {
            type: "image",
            name: "logoImagePath",
            label: "Logo Image",
          },
          // ─── 🧭 MAIN NAVIGATION BAR (HEADER) ──────────────────────────
          {
            type: "object",
            name: "navLinks",
            label: "🧭 Header Navigation Links",
            description: "Manage and reorder menu links in the top header",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item?.href || ""})` : "Nav Link",
              }),
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Menu Label",
                required: true,
              },
              {
                type: "string",
                name: "href",
                label: "Link URL / Path (e.g. /work, /services, /contact)",
                required: true,
              },
            ],
          },

        ],
      },
      {
        name: "servicesPage",
        label: "Services Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "services",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🔍 SEO & HEADER ───────────────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Page Title",
            required: true,
          },
          {
            type: "string",
            name: "headerTag",
            label: "Top Amber Tagline",
            description: "e.g. Expert Production Solutions",
            required: true,
          },
          {
            type: "string",
            name: "heading",
            label: "Main Page Heading",
            description: "e.g. What We Do.",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Page Subtitle & Meta Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },

          // ─── ⚙️ PRODUCTION PROCESS (HOW IT WORKS) ─────────────────────
          {
            type: "string",
            name: "processTag",
            label: "Process Eyebrow Tag",
            description: "Default: Workflow Architecture",
          },
          {
            type: "string",
            name: "processHeading",
            label: "Process Section Heading",
            description: "Default: The Production Process.",
          },
          {
            type: "string",
            name: "processDescription",
            label: "Process Subtitle",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            list: true,
            name: "processSteps",
            label: "Production Process Steps",
            ui: {
              itemProps: (item) => ({
                label: item?.step && item?.title ? `${item.step}. ${item.title}` : "Process Step",
              }),
            },
            fields: [
              {
                type: "string",
                name: "step",
                label: "Step Number (e.g. 01)",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Step Title",
                required: true,
              },
              {
                type: "string",
                name: "tag",
                label: "Stage Category Tag (e.g. Pre-Production, Filming)",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Step Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
            ],
          },
          // ─── 🚀 BOTTOM CTA ─────────────────────────────────────────────
          {
            type: "string",
            name: "ctaTag",
            label: "Bottom CTA Eyebrow Tag",
            description: "Default: READY FOR THE NEXT TAKE?",
          },
          {
            type: "string",
            name: "ctaHeading",
            label: "Bottom CTA Heading",
            description: "Default: Have an Upcoming Event or Production Brief?",
          },
          {
            type: "string",
            name: "ctaText",
            label: "Bottom CTA Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "ctaButtonLabel",
            label: "Bottom CTA Button Text",
            description: "Default: Start Project Brief",
          },
          {
            type: "string",
            name: "ctaButtonLink",
            label: "Bottom CTA Button Link",
            description: "Default: /contact",
          },
        ],
      },
      {
        name: "service",
        label: "Services",
        path: "src/content/services",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => {
              const order = values?.order ? `${values.order}-` : "";
              const slug = values?.slug || values?.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'service';
              return `${order}${slug}`;
            },
          },
        },
        fields: [
          // ─── 🏷️ SERVICE IDENTITY ─────────────────────────────────────
          {
            type: "string",
            name: "order",
            label: "🏷️ Service Number (01, 02, etc.)",
            description: "Controls the grid sequence in the Services directory",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "🏷️ Service Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "tag",
            label: "🏷️ Category Badge (e.g. Multi-Camera Filming)",
            description: "Used in Schema.org metadata and subpage scope header",
          },
          {
            type: "string",
            name: "description",
            label: "Service Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            description: "e.g. event-coverage, conference-production",
            required: true,
          },
          {
            type: "string",
            name: "link",
            label: "Target Page Link",
            description: "e.g. /services/event-coverage",
            required: true,
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Page Title",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Meta Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "heroTag",
            label: "Subpage Hero Tag",
            description: "e.g. Live Production Pipeline",
            required: true,
          },
          {
            type: "string",
            name: "heroHeading",
            label: "Subpage Hero Heading",
            description: "Wrap words in asterisks for the amber gradient. e.g. Dynamic *Multi-Camera* Coverage.",
            required: true,
          },
          {
            type: "string",
            name: "heroLead",
            label: "Subpage Hero Value Proposition",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "breakdownHeading",
            label: "Breakdown Section Heading",
            description: "Editorial subheadline explaining the service execution approach",
          },
          {
            type: "string",
            name: "breakdownBody",
            label: "Breakdown Section Paragraph",
            description: "Crisp paragraph explaining how we approach and execute this service",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero & Card Background Media Type",
            options: [
              { label: "🎬 Cinematic Video Loop", value: "local-video" },
              { label: "📸 Static Photograph / Image", value: "image" },
              { label: "🎨 Dual-Tone Gradient Background", value: "gradient" },
              { label: "🌐 External Cloud Video URL", value: "link-video" },
              { label: "⬛ No Background Media (Solid Dark)", value: "none" },
            ],
            required: true,
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Local Video Path (When Video selected)",
            description: "e.g. /showreel.mp4 (placed in public/ folder)",
          },
          {
            type: "string",
            name: "cloudVideoUrl",
            label: "Cloud Video URL (When External Video selected)",
            description: "e.g. https://your-cdn.com/clip.mp4",
          },
          {
            type: "image",
            name: "imagePath",
            label: "Poster / Fallback Image",
          },
          {
            type: "string",
            name: "heroGradientDirection",
            label: "Gradient Direction (When Gradient selected)",
            options: [
              { value: "to bottom right", label: "Diagonal (Top-Left to Bottom-Right)" },
              { value: "to bottom", label: "Vertical (Top to Bottom)" },
              { value: "to right", label: "Horizontal (Left to Right)" },
              { value: "to top right", label: "Reverse Diagonal (Bottom-Left to Top-Right)" },
              { value: "to bottom left", label: "Opposite Diagonal (Top-Right to Bottom-Left)" },
              { value: "radial", label: "Center Spotlight (Radial)" },
            ],
          },
          {
            type: "string",
            name: "heroGradientColor1",
            label: "Gradient First Color (Hex)",
            description: "First color or spotlight center",
            ui: {
              component: "color",
            },
          },
          {
            type: "string",
            name: "heroGradientColor2",
            label: "Gradient Second Color (Hex)",
            description: "Second color or gradient base",
            ui: {
              component: "color",
            },
          },
          {
            type: "object",
            list: true,
            name: "deliverables",
            label: "Service Deliverables",
            ui: {
              itemProps: (item) => ({
                label: item?.title || "Deliverable",
              }),
            },
            fields: [
              {
                type: "string",
                name: "tag",
                label: "Deliverable Badge Tag",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Deliverable Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Deliverable Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "ctaHeading",
            label: "Bottom CTA Heading",
            required: true,
          },
          {
            type: "string",
            name: "ctaDescription",
            label: "Bottom CTA Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "ctaButtonLabel",
            label: "Bottom CTA Button Text",
            required: true,
          },
        ],
      },
      {
        name: "workPage",
        label: "Work Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "work",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "🔍 SEO Title (Google & Social)",
            description: "Optimal length: 50–60 characters",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "🔍 SEO Meta Description",
            description: "Optimal length: 140–160 characters",
            ui: {
              component: "textarea",
            },
            required: true,
          },

          // ─── 🎬 HERO & HEADLINE ───────────────────────────────────────
          {
            type: "string",
            name: "headerTag",
            label: "🎬 Top Eyebrow Tag",
            description: "e.g. Selected Portfolio",
            required: true,
          },
          {
            type: "string",
            name: "heading",
            label: "🎬 Main Page Heading",
            description: "e.g. Our Work.",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "🎬 Page Intro Text",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "heroVideoPath",
            label: "🎬 Hero Background Video Path",
            description: "Default: /showreel.mp4 (instant local video playback, zero buffering, zero white flash)",
          },
          {
            type: "image",
            name: "heroPosterPath",
            label: "🎬 Hero Fallback Poster Frame",
            description: "Dark image displayed at millisecond 0 while video loads (e.g. /og-image.jpg)",
          },
          {
            type: "string",
            name: "aspectBadge",
            label: "Technical Aspect Badge (Optional)",
            description: "e.g. ASPECT // 16:9",
            required: false,
          },
          {
            type: "string",
            name: "videoButtonLabel",
            label: "Hero Play Button Label",
            description: "e.g. WATCH FEATURED FILM ➔",
            required: true,
          },
          {
            type: "string",
            name: "imageButtonLabel",
            label: "Archive Card Play Button Label",
            description: "e.g. WATCH PROJECT REEL ➔",
            required: true,
          },
          {
            type: "string",
            name: "scrollIndicatorText",
            label: "Hero Scroll Indicator Text",
            description: "e.g. EXPLORE ALL PRODUCTIONS",
            required: true,
          },
          // ─── 🎞️ PRODUCTION ARCHIVE & BENTO GRID ───────────────────────
          {
            type: "boolean",
            name: "showArchive",
            label: "🎞️ Display Production Archive & Bento Grid?",
            description: "Toggle ON to display the archive grid and category filter, or OFF to feature only the cinema hero showreel.",
          },
          {
            type: "string",
            name: "archiveTag",
            label: "🎞️ Archive Section Tag",
            description: "e.g. Production Archive",
            required: true,
          },
          {
            type: "string",
            name: "archiveHeading",
            label: "Archive Section Main Heading",
            description: "e.g. Selected Works & Case Studies",
            required: true,
          },
          {
            type: "string",
            name: "archiveDescription",
            label: "Archive Section Subtitle",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "filterAllLabel",
            label: "Filter 'All' Button Label",
            description: "e.g. All Productions",
            required: true,
          },
          {
            type: "string",
            name: "closeModalLabel",
            label: "Modal Close Button Text",
            description: "e.g. ESC ✕ CLOSE",
            required: true,
          },
        ],
      },
      {
        name: "project",
        label: "Portfolio Projects",
        path: "src/content/projects",
        format: "json",
        fields: [
          // ─── 🎬 PROJECT IDENTITY ──────────────────────────────────────
          {
            type: "string",
            name: "order",
            label: "🎬 Display Order (01, 02, etc.)",
            description: "Controls the display sequence on the /work page",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "🎬 Project Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "client",
            label: "Client Name",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category Badge",
            description: "e.g. Commercial / Filming, Narrative / Editing",
            required: true,
          },
          {
            type: "string",
            name: "runtime",
            label: "Total Run Time (TRT)",
            description: "e.g. 0:45 or 8:12",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Project Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "backgroundStyle",
            label: "Background Display Mode",
            options: [
              { label: "Moving Cinema Video (Vimeo)", value: "video" },
              { label: "Static Photograph", value: "image" },
            ],
            required: true,
          },
          {
            type: "string",
            name: "videoUrl",
            label: "Vimeo Embed URL",
            description:
              "Use format: https://player.vimeo.com/video/828757840",
            required: true,
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail / Backdrop Still Image",
            required: true,
          },
          {
            type: "string",
            name: "brightnessStyle",
            label: "Video Brightness Tuning",
            options: [
              { label: "Normal (Deep Moody Contrast)", value: "normal" },
              { label: "Bright (Boosted Exposure)", value: "bright" },
            ],
            required: true,
          },
        ],
      },
      {
        name: "aboutPage",
        label: "About Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "about",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "🔍 SEO Title (Google & Social)",
            description: "Optimal length: 50–60 characters",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "🔍 SEO Meta Description",
            description: "Optimal length: 140–160 characters",
            ui: {
              component: "textarea",
            },
            required: true,
          },

          // ─── 🎬 DIRECTOR'S MANIFESTO ──────────────────────────────────
          {
            type: "string",
            name: "headline",
            label: "🎬 Studio Headline / Manifesto Hook",
            required: true,
          },
          {
            type: "string",
            name: "manifestoLead",
            label: "Manifesto Lead Paragraph",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "manifestoQuote",
            label: "Featured Manifesto Quote",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "manifestoAuthor",
            label: "Manifesto Quote Attribution",
          },
          {
            type: "string",
            name: "heroBackgroundType",
            label: "Hero Background Type",
            description: "Choose between video loop, photo image, or dual-tone gradient",
            options: [
              { value: "video", label: "🎬 Cinematic Video Loop" },
              { value: "image", label: "📸 Static Photograph / Image" },
              { value: "gradient", label: "🎨 Dual-Tone Gradient Background" },
            ],
          },
          {
            type: "string",
            name: "heroVideoPath",
            label: "Hero Background Video Path (When Video selected)",
            description: "e.g. /showreel.mp4",
          },
          {
            type: "image",
            name: "heroImagePath",
            label: "Hero Background Photo / Image (When Image selected)",
            description: "High-resolution photo for the hero backdrop",
          },
          {
            type: "string",
            name: "heroGradientDirection",
            label: "Gradient Direction (When Gradient selected)",
            options: [
              { value: "to bottom right", label: "Diagonal (Top-Left to Bottom-Right)" },
              { value: "to bottom", label: "Vertical (Top to Bottom)" },
              { value: "to right", label: "Horizontal (Left to Right)" },
              { value: "to top right", label: "Reverse Diagonal (Bottom-Left to Top-Right)" },
              { value: "to bottom left", label: "Opposite Diagonal (Top-Right to Bottom-Left)" },
              { value: "radial", label: "Center Spotlight (Radial)" },
            ],
          },
          {
            type: "string",
            name: "heroGradientColor1",
            label: "Gradient First Color (Hex)",
            description: "First color or spotlight center",
            ui: {
              component: "color",
            },
          },
          {
            type: "string",
            name: "heroGradientColor2",
            label: "Gradient Second Color (Hex)",
            description: "Second color or outer edge",
            ui: {
              component: "color",
            },
          },
          {
            type: "string",
            name: "heroFrostedGlass",
            label: "Hero Background Solid Tint / ND Filter",
            description: "Solid opacity tint over the background (subtle is recommended)",
            options: [
              { value: "none", label: "None (Full Raw Clarity)" },
              { value: "very-subtle", label: "Very Subtle (Light 30% ND Tint)" },
              { value: "subtle", label: "Subtle (Balanced 50% ND Tint, Recommended)" },
              { value: "medium", label: "Medium (Strong 70% ND Tint)" },
              { value: "strong", label: "Strong (Heavy 85% ND Tint)" },
            ],
          },
          // ─── 📸 BEHIND THE SCENES DARKROOM GALLERY ───────────────────
          {
            type: "string",
            name: "btsHeading",
            label: "📸 BTS Gallery Section Heading",
          },
          {
            type: "string",
            name: "btsTag",
            label: "📸 BTS Eyebrow Tag",
          },
          {
            type: "string",
            name: "btsDescription",
            label: "📸 BTS Section Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "btsItems",
            label: "📸 Behind the Scenes Gallery Stills",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.category || "BTS"} — ${item?.title || "Item"}`,
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "category", label: "Category (e.g. CAMERA OPS, SOUND DECK)", required: true },
              { type: "image", name: "image", label: "Image Still" },
              { type: "string", name: "caption", label: "Caption / Story", ui: { component: "textarea" } },
              {
                type: "string",
                name: "aspectRatio",
                label: "Aspect Ratio",
                options: [
                  { label: "16:9 Cinema Wide", value: "16/9" },
                  { label: "4:3 Academy Ratio", value: "4/3" },
                  { label: "1:1 Square", value: "1/1" },
                ],
              },
            ],
          },

          // ─── ⏱️ PRODUCTION SCRIPT TIMELINE & LOG ──────────────────────
          {
            type: "string",
            name: "timelineHeading",
            label: "⏱️ Timeline Heading",
            required: true,
          },
          {
            type: "string",
            name: "timelineTag",
            label: "Timeline Tag",
          },
          {
            type: "string",
            name: "timelineDescription",
            label: "Timeline Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "milestones",
            label: "Milestones / Script Revision Log",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.year || ""} — ${item?.title || "Milestone"}`,
              }),
            },
            fields: [
              { type: "string", name: "year", label: "Year", required: true },
              { type: "string", name: "draftLabel", label: "Draft / Script Revision Label (e.g. DRAFT 01)", required: true },
              { type: "string", name: "takeNumber", label: "Take Number (e.g. TAKE 01)" },
              { type: "string", name: "title", label: "Milestone Title", required: true },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" }, required: true },
              { type: "string", name: "badge", label: "Badge Label (Optional)" },
            ],
          },
          // ─── ⚡ CALL TO ACTION (CLOSER) ──────────────────────────────
          {
            type: "string",
            name: "ctaHeading",
            label: "⚡ Bottom CTA Heading",
            required: true,
          },
          {
            type: "string",
            name: "ctaText",
            label: "Bottom CTA Body Text",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "ctaButtonLabel",
            label: "Bottom CTA Button Text",
            required: true,
          },
          {
            type: "string",
            name: "ctaButtonLink",
            label: "Bottom CTA Button Link",
            required: true,
          },
        ],
      },
      {
        name: "aboutSlider",
        label: "About: Team & Showcase Slider",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "slider",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "heading",
            label: "Slider Heading",
            required: true,
          },
          {
            type: "string",
            name: "tag",
            label: "Slider Eyebrow Tag",
          },
          {
            type: "string",
            name: "description",
            label: "Slider Intro Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "slides",
            label: "Slides",
            description: "Add 1 or more showcase slides (video or image). With 1 slide, it displays as a featured showcase; with 2+ slides, it becomes an interactive slider.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || "Slide",
              }),
            },
            fields: [
              { type: "string", name: "name", label: "Title / Unit Name", required: true },
              { type: "string", name: "bio", label: "Short Note / Scope (Optional)", ui: { component: "textarea" } },
              { type: "image", name: "avatar", label: "Still Image" },
              { type: "string", name: "videoLoop", label: "Video Loop URL/Path (Optional, e.g. /showreel.mp4)" },
              { type: "string", name: "badge", label: "Custom Badge (Optional, e.g. LIVE REEL)" },
            ],
          },
        ],
      },
      {
        name: "contactPage",
        label: "Contact Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "contact",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "🔍 SEO Title (Google & Social)",
            description: "Optimal length: 50–60 characters. Primary keywords & brand name.",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "🔍 SEO Meta Description",
            description: "Optimal length: 140–160 characters. Compelling summary for search snippets.",
            ui: {
              component: "textarea",
            },
            required: true,
          },

          // ─── 🔌 FORMTORCH & SUBMISSION INTEGRATION ─────────────────────
          {
            type: "string",
            name: "formEndpoint",
            label: "🔌 FormTorch Endpoint URL",
            description: "Paste your unique FormTorch endpoint here (e.g. https://formtorch.com/f/your-key)",
            required: true,
          },
          {
            type: "string",
            name: "redirectUrl",
            label: "Redirect URL After Submission (Optional)",
            description: "Optional custom thank-you page URL (e.g. / or /thank-you). Leave empty to use FormTorch default confirmation.",
          },
          {
            type: "boolean",
            name: "enableTurnstile",
            label: "Enable Cloudflare Turnstile Anti-Spam",
            description: "Turn on if you want Cloudflare bot verification before submission.",
          },
          {
            type: "string",
            name: "turnstileSiteKey",
            label: "Cloudflare Turnstile Site Key (Optional)",
            description: "Site Key from your Cloudflare Turnstile dashboard.",
          },

          // ─── 01. STEP 1: NAME ──────────────────────────────────────────
          {
            type: "string",
            name: "step1Tag",
            label: "Step 1 Tagline",
            description: "e.g. 01 ➔ Introduce Yourself",
          },
          {
            type: "string",
            name: "step1Title",
            label: "Step 1 Question Title",
            description: "e.g. What is your first and surname? *",
            required: true,
          },
          {
            type: "string",
            name: "step1Placeholder",
            label: "Step 1 Field Placeholder",
            description: "e.g. Type your full name here...",
          },

          // ─── 02. STEP 2: SERVICES ──────────────────────────────────────
          {
            type: "string",
            name: "step2Tag",
            label: "Step 2 Tagline",
            description: "e.g. 02 ➔ Project Requirement",
          },
          {
            type: "string",
            name: "step2Title",
            label: "Step 2 Question Title",
            description: "e.g. What service do you need? *",
            required: true,
          },
          {
            type: "object",
            name: "serviceOptions",
            label: "Service Requirement Options",
            description: "Radio options users can select for their project brief",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "Service Option",
              }),
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Option Label (Visible in Form)",
                required: true,
              },
              {
                type: "string",
                name: "value",
                label: "Option Value (Sent in Email Notification)",
                required: true,
              },
            ],
          },

          // ─── 03. STEP 3: EMAIL ─────────────────────────────────────────
          {
            type: "string",
            name: "step3Tag",
            label: "Step 3 Tagline",
            description: "e.g. 03 ➔ Reachable Contact",
          },
          {
            type: "string",
            name: "step3Title",
            label: "Step 3 Question Title",
            description: "e.g. What is your contact email address? *",
            required: true,
          },
          {
            type: "string",
            name: "step3Placeholder",
            label: "Step 3 Field Placeholder",
            description: "e.g. name@company.com",
          },

          // ─── 04. STEP 4: PROJECT BRIEF ─────────────────────────────────
          {
            type: "string",
            name: "step4Tag",
            label: "Step 4 Tagline",
            description: "e.g. 04 ➔ Project Brief",
          },
          {
            type: "string",
            name: "step4Title",
            label: "Step 4 Question Title",
            description: "e.g. How can we help? *",
            required: true,
          },
          {
            type: "string",
            name: "step4Placeholder",
            label: "Step 4 Field Placeholder",
            description: "e.g. Tell us about your event, dates, or visual goals...",
          },
          {
            type: "string",
            name: "step4HelpText",
            label: "Step 4 Guidance / AI Brief Tip Banner",
            description: "Helpful tip banner displayed above the brief input (welcoming ChatGPT drafts, event dates, etc.)",
            ui: {
              component: "textarea",
            },
          },

          // ─── 05. STEP 5: VERIFICATION & CONSENT ─────────────────────────
          {
            type: "string",
            name: "step5Tag",
            label: "Step 5 Tagline",
            description: "e.g. 05 ➔ Verification & Consent",
          },
          {
            type: "string",
            name: "step5Title",
            label: "Step 5 Question Title",
            description: "e.g. Final Step *",
          },
          {
            type: "string",
            name: "gdprText",
            label: "GDPR Consent Statement",
            description: "Consent text shown next to the verification checkbox",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "submitButtonLabel",
            label: "Submit Button Text",
            description: "e.g. Submit Brief",
            required: true,
          },

        ],
      },
      {
        name: "thankYouPage",
        label: "Thank You Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "thank-you",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "🔍 SEO Title (Google & Social)",
            description: "Optimal length: 50–60 characters.",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "🔍 SEO Meta Description",
            description: "Optimal length: 140–160 characters.",
            ui: {
              component: "textarea",
            },
            required: true,
          },

          // ─── 🏷️ HERO & CONFIRMATION MESSAGE ────────────────────────────
          {
            type: "string",
            name: "statusBadge",
            label: "Status Badge Text",
            description: "Default: Brief Dispatch Confirmed • 24hr Response",
          },
          {
            type: "string",
            name: "heading",
            label: "Main Headline",
            description: "Default: We've received your project brief.",
            required: true,
          },
          {
            type: "string",
            name: "highlight",
            label: "Amber Gradient Highlight Words",
            description: "Words in headline to highlight with amber gradient (e.g. project brief.)",
          },
          {
            type: "string",
            name: "description",
            label: "Subtitle Reassurance Note",
            ui: {
              component: "textarea",
            },
          },

          // ─── 🛣️ 3-PHASE PRODUCTION ROADMAP ─────────────────────────────
          {
            type: "string",
            name: "phase1Tag",
            label: "Phase 1 Eyebrow Tag",
            description: "e.g. Phase 01 // Discovery",
          },
          {
            type: "string",
            name: "phase1Title",
            label: "Phase 1 Title",
            description: "e.g. Review & Needs",
          },
          {
            type: "string",
            name: "phase1Desc",
            label: "Phase 1 Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "phase2Tag",
            label: "Phase 2 Eyebrow Tag",
            description: "e.g. Phase 02 // Scoping",
          },
          {
            type: "string",
            name: "phase2Title",
            label: "Phase 2 Title",
            description: "e.g. Proposal & Quote",
          },
          {
            type: "string",
            name: "phase2Desc",
            label: "Phase 2 Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "phase3Tag",
            label: "Phase 3 Eyebrow Tag",
            description: "e.g. Phase 03 // Launch",
          },
          {
            type: "string",
            name: "phase3Title",
            label: "Phase 3 Title",
            description: "e.g. Calendar Lock",
          },
          {
            type: "string",
            name: "phase3Desc",
            label: "Phase 3 Description",
            ui: {
              component: "textarea",
            },
          },

          // ─── 🔘 ACTION BUTTONS ─────────────────────────────────────────
          {
            type: "string",
            name: "primaryBtnLabel",
            label: "Primary Button Text",
            description: "Default: Explore Recent Work",
          },
          {
            type: "string",
            name: "primaryBtnLink",
            label: "Primary Button Link",
            description: "Default: /work",
          },
          {
            type: "string",
            name: "secondaryBtnLabel",
            label: "Secondary Button Text",
            description: "Default: Back to Homepage",
          },
          {
            type: "string",
            name: "secondaryBtnLink",
            label: "Secondary Button Link",
            description: "Default: /",
          },
        ],
      },
      {
        name: "privacyPage",
        label: "Privacy & Cookie Policy",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "privacy",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "🔍 SEO Title (Google & Social)",
            description: "Optimal length: 50–60 characters.",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "🔍 SEO Meta Description",
            description: "Optimal length: 140–160 characters.",
            ui: {
              component: "textarea",
            },
            required: true,
          },

          // ─── 🏷️ PAGE HEADER & BADGES ────────────────────────────────────
          {
            type: "string",
            name: "heroTag",
            label: "Eyebrow Tag",
            description: "Default: Legal & Compliance",
          },
          {
            type: "string",
            name: "heading",
            label: "Main Heading",
            description: "Default: Privacy & Cookie Policy",
            required: true,
          },
          {
            type: "string",
            name: "lastUpdated",
            label: "Last Updated Date / Version Badge",
            description: "e.g. Updated June 2026 (DUAA 2025 Compliant)",
          },
          {
            type: "string",
            name: "introText",
            label: "Introductory Statement",
            ui: {
              component: "textarea",
            },
          },

          // ─── 📜 POLICY SECTIONS ─────────────────────────────────────────
          {
            type: "object",
            name: "sections",
            label: "Policy Clauses & Sections",
            description: "Add, reorder, or edit the individual clauses of the privacy policy.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.number || "Clause"} - ${item?.title || "Section"}`,
              }),
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "Section Anchor ID (slug)",
                description: "e.g. controller, data-collected, lawful-basis, cookies",
                required: true,
              },
              {
                type: "string",
                name: "number",
                label: "Clause Number",
                description: "e.g. 01, 02, 03...",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Clause Title",
                required: true,
              },
              {
                type: "string",
                name: "content",
                label: "Clause Content (Supports Markdown: **bold**, * bullet lists, 1. numbered lists)",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
            ],
          },

          // ─── 📞 COMPLIANCE DESK CONTACT CALLOUT ────────────────────────
          {
            type: "string",
            name: "deskTag",
            label: "Compliance Desk: Eyebrow Tag",
            description: "Default: Direct Data Rights & DUAA Enquiries",
          },
          {
            type: "string",
            name: "deskTitle",
            label: "Compliance Desk: Box Title",
            description: "Default: Need to exercise your statutory data rights?",
          },
          {
            type: "string",
            name: "deskDescription",
            label: "Compliance Desk: Subtitle / Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "deskEmailLabel",
            label: "Compliance Desk: Email Button Label",
            description: "Default: Email Data Desk",
          },
          {
            type: "string",
            name: "deskCustomEmail",
            label: "Compliance Desk: Dedicated Email (Optional)",
            description: "Leave empty to use the studio email (contact@filmeditrun.co.uk)",
          },
          {
            type: "string",
            name: "deskCustomPhone",
            label: "Compliance Desk: Dedicated Telephone (Optional)",
            description: "Leave empty to use main studio telephone",
          },
        ],
      },
      {
        name: "seoSettings",
        label: "SEO & Local Citations",
        path: "src/content/settings",
        format: "json",
        match: {
          include: "seo",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🏢 LOCAL BUSINESS & NAP CITATION (SCHEMA.ORG) ────────────
          {
            type: "string",
            name: "legalName",
            label: "🏢 Legal Business Entity Name",
            description: "Official registered name (e.g. FilmEditRun Ltd)",
          },
          {
            type: "string",
            name: "telephone",
            label: "📞 Contact Telephone Number",
            description: "International format (e.g. +44 1223 926450)",
          },
          {
            type: "string",
            name: "email",
            label: "✉️ Primary Contact Email",
            description: "Used in Schema.org and structured business indexing",
          },
          {
            type: "string",
            name: "priceRange",
            label: "💷 Studio Price Range Tier",
            description: "Standard Schema tier (e.g. ££-£££)",
          },
          {
            type: "string",
            name: "addressLocality",
            label: "📍 Primary City / Locality",
            description: "e.g. Cambridge",
          },
          {
            type: "string",
            name: "addressRegion",
            label: "📍 County / Region",
            description: "e.g. Cambridgeshire",
          },
          {
            type: "string",
            name: "postalCode",
            label: "📮 Postal Code",
            description: "e.g. CB1 2JW",
          },
          {
            type: "string",
            name: "addressCountry",
            label: "🇬🇧 Country Code",
            description: "Default: GB",
          },
          {
            type: "string",
            name: "googleMapsUrl",
            label: "🗺️ Google Business Profile / Maps URL",
            description: "Direct link to your verified Google Maps listing",
          },
          {
            type: "number",
            name: "geoLatitude",
            label: "🌐 Geo Latitude (Optional Pinpoint)",
            description: "e.g. 52.2053 for Cambridge",
          },
          {
            type: "number",
            name: "geoLongitude",
            label: "🌐 Geo Longitude (Optional Pinpoint)",
            description: "e.g. 0.1218 for Cambridge",
          },

          // ─── 🔗 VERIFIED BACKLINK & DIRECTORY PROFILES (sameAs) ───────
          {
            type: "object",
            name: "backlinkProfiles",
            label: "🔗 Verified Citation Profiles & Directory Links",
            description: "Manage authoritative backlink profiles (Cambridge Network, Google Business, Vimeo, GitHub, etc.) for both Schema.org entity linking and the sub-footer citation strip",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ? `${item.name} (${item?.badgeText || item?.url || ""})` : "Citation Profile",
              }),
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Profile / Platform Name",
                required: true,
                description: "e.g. Cambridge Network, Google Business Profile, Vimeo, GitHub",
              },
              {
                type: "string",
                name: "url",
                label: "Target Profile URL",
                required: true,
                description: "e.g. https://www.cambridgenetwork.co.uk",
              },
              {
                type: "string",
                name: "badgeText",
                label: "Sub-Badge Text (Optional)",
                description: "Short label displayed next to the link (e.g. Member, Verified Studio, Portfolio, Company)",
              },
              {
                type: "boolean",
                name: "showInFooter",
                label: "Show Link in Sub-Footer Citation Strip?",
                description: "Toggle on to display in the visible footer. (Unchecked profiles are still included in Google Schema.org sameAs)",
              },
            ],
          },
        ],
      },
      {
        name: "gradeSettings",
        label: "Grade Switcher",
        path: "src/content/settings",
        format: "json",
        match: {
          include: "theme",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ─── 🎛️ DEFAULT GRADE & FLOATING DOCK ─────────────────────────
          {
            type: "string",
            name: "defaultTheme",
            label: "🎛️ Default Global Aesthetic / Grade",
            description: "Baseline visual grade for visitors (Dark Noir, High-Key Light, or Supernova Gradient)",
            options: [
              { value: "dark-noir", label: "Dark Noir (Obsidian Low-Key Cinema)" },
              { value: "high-key", label: "High-Key Light (Crisp Minimalist Studio)" },
              { value: "supernova", label: "Supernova Gradient (Cosmic Duotone Mesh)" },
            ],
          },
          {
            type: "boolean",
            name: "enableThemeSwitcher",
            label: "🎛️ Enable Floating Grade Switcher Dock?",
            description: "Show the slide-out Grade Switcher dock on the right edge of the viewport",
          },
          {
            type: "string",
            name: "themeSwitcherTitle",
            label: "🎛️ Grade Switcher Dock Title (Optional)",
            description: "Header label for the compact grade dock (default: GRADE)",
          },

          // ─── 🌑 GRADE 1: DARK NOIR ─────────────────────────────────────
          {
            type: "string",
            name: "darkNoirTitle",
            label: "🌑 Dark Noir: Display Name",
            description: "Display title in the floating grade switcher dock (e.g. Dark Noir)",
          },
          {
            type: "string",
            name: "darkNoirAccentColor",
            label: "🌑 Dark Noir Accent Color (Hex)",
            description: "Default: #e8c547 (Warm Tungsten Amber)",
            ui: {
              component: "color",
            },
          },

          // ─── ☀️ GRADE 2: HIGH-KEY LIGHT ────────────────────────────────
          {
            type: "string",
            name: "highKeyTitle",
            label: "☀️ High-Key Light: Display Name",
            description: "Display title in the floating grade switcher dock (e.g. High-Key Light)",
          },
          {
            type: "string",
            name: "highKeyAccentColor",
            label: "☀️ High-Key Light Accent Color (Hex)",
            description: "Default: #e11d48 (Cinema Tally Red)",
            ui: {
              component: "color",
            },
          },
          {
            type: "string",
            name: "highKeyBgColor",
            label: "☀️ High-Key Light Canvas Background (Hex)",
            description: "Default: #ffffff (Pure Studio White)",
            ui: {
              component: "color",
            },
          },

          // ─── ✨ GRADE 3: SUPERNOVA DUOTONE ─────────────────────────────
          {
            type: "string",
            name: "supernovaTitle",
            label: "✨ Supernova: Display Name",
            description: "Display title in the floating grade switcher dock (e.g. Supernova)",
          },
          {
            type: "string",
            name: "supernovaAccentColor",
            label: "✨ Supernova Primary Accent (Hex)",
            description: "Primary neon gradient glow (Default: #f43f5e)",
            ui: {
              component: "color",
            },
          },
          {
            type: "string",
            name: "supernovaSecondaryColor",
            label: "✨ Supernova Secondary Mesh Color (Hex)",
            description: "Secondary mesh duotone glow (Default: #8b5cf6)",
            ui: {
              component: "color",
            },
          },
        ],
      },
      {
        name: "footerSettings",
        label: "Footer",
        path: "src/content/settings",
        format: "json",
        match: {
          include: "footer",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // Top Tier: Tagline & Commission Button
          {
            type: "string",
            name: "studioTagline",
            label: "Top: Studio Scope Tagline",
            description: "Descriptive studio capability sentence under the brand wordmark",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "commissionButtonLabel",
            label: "Top: Commission Button Label",
          },
          {
            type: "string",
            name: "commissionButtonLink",
            label: "Top: Commission Button Link",
          },

          // Column 1: Capabilities / Services
          {
            type: "string",
            name: "capabilitiesHeading",
            label: "Col 1: Capabilities Heading",
          },
          {
            type: "string",
            name: "servicesLinkLabel",
            label: "Col 1: Bottom Link Label",
            description: "e.g. All Services & Specs →",
          },
          {
            type: "string",
            name: "servicesLinkUrl",
            label: "Col 1: Bottom Link URL",
            description: "e.g. /services",
          },

          // Column 2: Studio / Navigation Links
          {
            type: "string",
            name: "studioHeading",
            label: "Col 2: Navigation Heading",
          },
          {
            type: "object",
            name: "studioLinks",
            label: "Col 2: Navigation Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item?.href || ""})` : "Navigation Link",
              }),
            },
            fields: [
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Link URL", required: true },
            ],
          },

          // Column 3: Presence / Locations
          {
            type: "string",
            name: "presenceHeading",
            label: "Col 3: Presence Heading",
          },
          {
            type: "string",
            name: "cambridgeTitle",
            label: "Col 3: Cambridge Title / Label",
            description: "Default: Cambridge Studio",
          },
          {
            type: "string",
            name: "cambridgeSubtitle",
            label: "Col 3: Cambridge Subtitle",
          },
          {
            type: "string",
            name: "cambridgeLink",
            label: "Col 3: Cambridge Link URL",
          },
          {
            type: "string",
            name: "londonTitle",
            label: "Col 3: London Title / Label",
            description: "Default: London Base",
          },
          {
            type: "string",
            name: "londonSubtitle",
            label: "Col 3: London Subtitle",
          },
          {
            type: "string",
            name: "londonLink",
            label: "Col 3: London Link URL",
            description: "Default: /london",
          },
          {
            type: "string",
            name: "worldwideTitle",
            label: "Col 3: Worldwide Title / Label",
            description: "Default: UK-Wide & Worldwide",
          },
          {
            type: "string",
            name: "worldwideSubtitle",
            label: "Col 3: Worldwide Subtitle",
          },

          // Column 4: Direct Inquiries & Specs
          {
            type: "string",
            name: "directHeading",
            label: "Col 4: Direct Heading",
          },
          {
            type: "string",
            name: "inquiriesLabel",
            label: "Col 4: Inquiries Section Label",
            description: "Default: Inquiries",
          },
          {
            type: "string",
            name: "inquiriesActionText",
            label: "Col 4: Inquiries Button / Link Text",
            description: "Default: Start Project Brief →",
          },
          {
            type: "string",
            name: "inquiriesActionLink",
            label: "Col 4: Inquiries Link URL",
            description: "Default: /contact",
          },
          {
            type: "string",
            name: "productionHubLabel",
            label: "Col 4: Production Hub Label",
            description: "Default: Production Hub",
          },
          {
            type: "string",
            name: "productionHub",
            label: "Col 4: Production Hub Text",
          },
          {
            type: "string",
            name: "capturePipelineLabel",
            label: "Col 4: Capture Pipeline Label",
            description: "Default: Capture Pipeline",
          },
          {
            type: "string",
            name: "capturePipeline",
            label: "Col 4: Capture Pipeline Specs",
          },
          {
            type: "string",
            name: "studioStatusLabel",
            label: "Col 4: Studio Status Label",
            description: "Default: Studio Status",
          },
          {
            type: "string",
            name: "studioStatus",
            label: "Col 4: Studio Status Text",
          },

          // Bottom Colophon
          {
            type: "string",
            name: "copyrightTagline",
            label: "Bottom Colophon: Tagline",
          },
          {
            type: "string",
            name: "backToTopLabel",
            label: "Bottom Colophon: Back to Top Label",
            description: "Default: Back to top",
          },
        ],
      },
    ],
  },
});
