// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Needed only when deploying Tina Cloud in production; leave empty for local visual editing
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
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
          include: "home"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "\u{1F50D} SEO Title (Google & Social)",
            description: "Optimal length: 50\u201360 characters. Include primary keywords & locations.",
            required: true
          },
          {
            type: "string",
            name: "seoDescription",
            label: "\u{1F50D} SEO Meta Description",
            description: "Optimal length: 140\u2013160 characters. Compelling summary for search snippets.",
            ui: {
              component: "textarea"
            },
            required: true
          },
          // ─── 🎨 HERO & CINEMA BANNER ──────────────────────────────────
          {
            type: "string",
            name: "locations",
            label: "\u{1F3A8} Hero Locations Badge",
            description: "e.g. London \u2022 Cambridge \u2022 UK Wide",
            required: true
          },
          {
            type: "string",
            name: "heroHeadingPrefix",
            label: "Hero Heading (Main White Text)",
            description: "e.g. We Capture, Create, and",
            required: true
          },
          {
            type: "string",
            name: "heroHeadingHighlight",
            label: "Hero Heading (Amber Highlight Word)",
            description: "e.g. Produce.",
            required: true
          },
          {
            type: "string",
            name: "tagline",
            label: "Hero Subtitle / Tagline",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "heroVideoPath",
            label: "Hero Background Video Path",
            description: "e.g. /showreel.mp4 (placed in public/ folder)",
            required: true
          },
          {
            type: "image",
            name: "heroPosterPath",
            label: "Hero Video Fallback Poster Image",
            description: "Poster frame displayed before video loads or on mobile low-power mode (e.g. /og-image.jpg)"
          },
          {
            type: "string",
            name: "primaryCtaLabel",
            label: "Primary Button Text",
            required: true
          },
          {
            type: "string",
            name: "primaryCtaLink",
            label: "Primary Button Link",
            required: true
          },
          {
            type: "string",
            name: "secondaryCtaLabel",
            label: "Secondary Button Text",
            required: true
          },
          {
            type: "string",
            name: "secondaryCtaLink",
            label: "Secondary Button Link",
            required: true
          },
          // ─── 🎞️ SPEC STRIP ───────────────────────────────────────────
          {
            type: "string",
            name: "brandName",
            label: "\u{1F39E}\uFE0F Spec Strip Brand Label",
            required: true
          },
          {
            type: "string",
            name: "expertiseList",
            label: "\u{1F39E}\uFE0F Spec Strip Expertise Items",
            list: true
          },
          // ─── 📝 EDITORIAL INTRO SECTION ───────────────────────────────
          {
            type: "string",
            name: "introHeading",
            label: "\u{1F4DD} Intro Section Heading",
            required: true
          },
          {
            type: "string",
            name: "introBody",
            label: "\u{1F4DD} Intro Section Body Text",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "introPrimaryLinkLabel",
            label: "Intro First Link Text",
            required: true
          },
          {
            type: "string",
            name: "introPrimaryLinkHref",
            label: "Intro First Link URL",
            required: true
          },
          {
            type: "string",
            name: "introSecondaryLinkLabel",
            label: "Intro Second Link Text",
            required: true
          },
          {
            type: "string",
            name: "introSecondaryLinkHref",
            label: "Intro Second Link URL",
            required: true
          }
        ]
      },
      {
        name: "workPage",
        label: "Work Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "work"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "\u{1F50D} SEO Title (Google & Social)",
            description: "Optimal length: 50\u201360 characters",
            required: true
          },
          {
            type: "string",
            name: "seoDescription",
            label: "\u{1F50D} SEO Meta Description",
            description: "Optimal length: 140\u2013160 characters",
            ui: {
              component: "textarea"
            },
            required: true
          },
          // ─── 🎬 HERO & HEADLINE ───────────────────────────────────────
          {
            type: "string",
            name: "headerTag",
            label: "\u{1F3AC} Top Eyebrow Tag",
            description: "e.g. Selected Portfolio",
            required: true
          },
          {
            type: "string",
            name: "heading",
            label: "\u{1F3AC} Main Page Heading",
            description: "e.g. Our Work.",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "\u{1F3AC} Page Intro Text",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "aspectBadge",
            label: "Technical Aspect Badge (Optional)",
            description: "e.g. ASPECT // 16:9",
            required: false
          },
          {
            type: "string",
            name: "videoButtonLabel",
            label: "Hero Play Button Label",
            description: "e.g. WATCH FEATURED FILM \u2794",
            required: true
          },
          {
            type: "string",
            name: "imageButtonLabel",
            label: "Archive Card Play Button Label",
            description: "e.g. WATCH PROJECT REEL \u2794",
            required: true
          },
          {
            type: "string",
            name: "scrollIndicatorText",
            label: "Hero Scroll Indicator Text",
            description: "e.g. EXPLORE ALL PRODUCTIONS",
            required: true
          },
          // ─── 🎞️ PRODUCTION ARCHIVE & BENTO GRID ───────────────────────
          {
            type: "string",
            name: "archiveTag",
            label: "\u{1F39E}\uFE0F Archive Section Tag",
            description: "e.g. Production Archive",
            required: true
          },
          {
            type: "string",
            name: "archiveHeading",
            label: "Archive Section Main Heading",
            description: "e.g. Selected Works & Case Studies",
            required: true
          },
          {
            type: "string",
            name: "archiveDescription",
            label: "Archive Section Subtitle",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "filterAllLabel",
            label: "Filter 'All' Button Label",
            description: "e.g. All Productions",
            required: true
          },
          {
            type: "string",
            name: "closeModalLabel",
            label: "Modal Close Button Text",
            description: "e.g. ESC \u2715 CLOSE",
            required: true
          }
        ]
      },
      {
        name: "servicesPage",
        label: "Services Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "services"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Page Title",
            required: true
          },
          {
            type: "string",
            name: "headerTag",
            label: "Top Amber Tagline",
            description: "e.g. Expert Production Solutions",
            required: true
          },
          {
            type: "string",
            name: "heading",
            label: "Main Page Heading",
            description: "e.g. What We Do.",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Page Subtitle & Meta Description",
            ui: {
              component: "textarea"
            },
            required: true
          }
        ]
      },
      {
        name: "cambridgePage",
        label: "Cambridge Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "cambridge"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "\u{1F50D} SEO Title (Google & Social)",
            description: "Optimal length: 50\u201360 characters",
            required: true
          },
          {
            type: "string",
            name: "seoDescription",
            label: "\u{1F50D} SEO Meta Description",
            description: "Optimal length: 140\u2013160 characters",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "canonicalURL",
            label: "\u{1F50D} Canonical URL",
            required: true
          },
          // ─── 🎨 HERO & CINEMA BANNER ──────────────────────────────────
          {
            type: "string",
            name: "heroTag",
            label: "\u{1F3A8} Hero Badge Tag",
            required: true
          },
          {
            type: "string",
            name: "heroHeadingPrefix",
            label: "Hero Heading (Main White Text)",
            required: true
          },
          {
            type: "string",
            name: "heroHeadingHighlight",
            label: "Hero Heading (Amber Highlight Word)",
            required: true
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "heroCtaLabel",
            label: "Hero Button Text",
            required: true
          },
          {
            type: "string",
            name: "heroCtaLink",
            label: "Hero Button Link",
            required: true
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero Background Media Type",
            options: [
              { label: "Local Video Loop (from /public)", value: "local-video" },
              { label: "External Cloud Video URL", value: "link-video" },
              { label: "Static Image Only", value: "image" }
            ]
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Local Video Path",
            description: "e.g. /showreel.mp4"
          },
          {
            type: "string",
            name: "cloudVideoUrl",
            label: "Cloud Video URL",
            description: "e.g. https://your-link.mp4"
          },
          {
            type: "image",
            name: "imagePath",
            label: "Hero Background Image / Fallback Poster"
          },
          {
            type: "string",
            name: "expertiseTag",
            label: "Expertise Section Tag",
            required: true
          },
          {
            type: "string",
            name: "expertiseHeading",
            label: "Expertise Section Heading",
            required: true
          },
          {
            type: "string",
            name: "expertiseDescription",
            label: "Expertise Section Description",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "expertiseBullets",
            label: "Expertise Checkmark Bullet Points",
            list: true
          },
          {
            type: "string",
            name: "cardTitle",
            label: "Right Feature Card Title",
            required: true
          },
          {
            type: "string",
            name: "cardBody",
            label: "Right Feature Card Body",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "cardLinkLabel",
            label: "Right Feature Card Link Text",
            required: true
          },
          {
            type: "string",
            name: "cardLinkHref",
            label: "Right Feature Card Link URL",
            required: true
          },
          // ─── ❓ FREQUENTLY ASKED QUESTIONS (AI SEARCH SCHEMA) ────────
          {
            type: "string",
            name: "faqHeading",
            label: "\u2753 FAQ Section Heading",
            required: true
          },
          {
            type: "object",
            name: "faqs",
            label: "\u2753 FAQ Items (Auto-indexed for AI Search)",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.question || "FAQ Item"
              })
            },
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
                required: true
              },
              {
                type: "string",
                name: "answer",
                label: "Answer",
                ui: {
                  component: "textarea"
                },
                required: true
              }
            ]
          },
          // ─── ⚡ CALL TO ACTION (CLOSER) ──────────────────────────────
          {
            type: "string",
            name: "bottomCtaHeading",
            label: "\u26A1 Bottom CTA Heading",
            required: true
          },
          {
            type: "string",
            name: "bottomCtaBody",
            label: "Bottom CTA Subtitle",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "bottomCtaLabel",
            label: "Bottom CTA Button Text",
            required: true
          },
          {
            type: "string",
            name: "bottomCtaLink",
            label: "Bottom CTA Button Link",
            required: true
          }
        ]
      },
      // ─── 📄 CUSTOM / GENERIC PAGES COLLECTION ──────────────────────
      {
        name: "customPages",
        label: "\u{1F4C4} Custom Pages",
        path: "src/content/pages/custom",
        format: "json",
        ui: {
          router: ({ document: document2 }) => {
            return `/${document2._sys.filename}`;
          }
        },
        fields: [
          // ─── 🔍 SEO & ROUTING ──────────────────────────────────────────
          {
            type: "string",
            name: "slug",
            label: "\u{1F517} Page URL Slug",
            description: "Unique URL pathname (e.g. 'london' creates /london, 'pricing' creates /pricing)",
            required: true
          },
          {
            type: "string",
            name: "seoTitle",
            label: "\u{1F50D} SEO Title (Browser Tab & Google)",
            description: "Optimal length: 50\u201360 characters",
            required: true
          },
          {
            type: "string",
            name: "seoDescription",
            label: "\u{1F50D} SEO Meta Description",
            description: "Optimal length: 140\u2013160 characters",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "canonicalURL",
            label: "\u{1F50D} Canonical URL (Optional)",
            description: "Defaults to https://filmeditrun.co.uk/{slug}"
          },
          // ─── 🎨 HERO BANNER ───────────────────────────────────────────
          {
            type: "string",
            name: "heroTag",
            label: "\u{1F3A8} Hero Eyebrow Tag",
            description: "Small uppercase category tag above the headline"
          },
          {
            type: "string",
            name: "heroHeadingPrefix",
            label: "Hero Heading (Main White Text)",
            description: "Initial headline copy before the highlight",
            required: true
          },
          {
            type: "string",
            name: "heroHeadingHighlight",
            label: "Hero Heading Highlight Word(s)",
            description: "Accent word(s) highlighted with dynamic theme gradient color",
            required: true
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle Copy",
            description: "Supports *highlight* formatting",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "heroCtaLabel",
            label: "Hero Button Label"
          },
          {
            type: "string",
            name: "heroCtaLink",
            label: "Hero Button Link"
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero Background Media Type",
            options: [
              { label: "\u{1F3AC} Cinematic Video Loop", value: "local-video" },
              { label: "\u{1F4F8} Static Photograph / Image", value: "image" },
              { label: "\u{1F3A8} Dual-Tone Gradient Background", value: "gradient" },
              { label: "\u{1F310} External Cloud Video URL", value: "link-video" },
              { label: "\u2B1B Minimalist Dark Void (No Media)", value: "none" }
            ]
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Local Video Path (When Video selected)",
            description: "e.g. /showreel.mp4 (placed in public/ folder)"
          },
          {
            type: "string",
            name: "cloudVideoUrl",
            label: "Cloud Video URL (When External Video selected)",
            description: "e.g. https://your-link.mp4"
          },
          {
            type: "image",
            name: "imagePath",
            label: "Hero Background Photo / Video Fallback Poster"
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
              { value: "radial", label: "Center Spotlight (Radial)" }
            ]
          },
          {
            type: "string",
            name: "heroGradientColor1",
            label: "Gradient First Color (Hex)",
            description: "First color or spotlight center",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "heroGradientColor2",
            label: "Gradient Second Color (Hex)",
            description: "Second color or gradient base",
            ui: {
              component: "color"
            }
          },
          // ─── 💡 NARRATIVE STORY 1 (Left: Copy, Right: Card or Photo) ───
          {
            type: "string",
            name: "section1Tag",
            label: "Story 1: Eyebrow Tag",
            description: "e.g. Our Approach, Scope Overview"
          },
          {
            type: "string",
            name: "section1Heading",
            label: "Story 1: Section Heading",
            description: "Main section title. Wrap in *asterisks* to highlight text with theme gradient color.",
            required: true
          },
          {
            type: "string",
            name: "section1Description",
            label: "Story 1: Section Body Copy",
            description: "Editorial paragraph. Supports **bold**, <u>underline</u>, and *highlight*.",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "section1Bullets",
            label: "Story 1: Checkmark Bullet Points",
            description: "Key deliverables or assurances (\u2713 rendered automatically)",
            list: true
          },
          {
            type: "string",
            name: "section1RightType",
            label: "Story 1: Right Column Display Mode",
            description: "Choose whether to display an informative plaque card or a featured photograph",
            options: [
              { label: "Informative Plaque Card (Title, Text & Link)", value: "card" },
              { label: "Featured Photograph / Showcase Image", value: "image" }
            ]
          },
          {
            type: "string",
            name: "section1CardTitle",
            label: "Story 1: Plaque Card Title",
            description: "e.g. Why Clients Choose Us"
          },
          {
            type: "string",
            name: "section1CardBody",
            label: "Story 1: Plaque Card Body Copy",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "section1CardLinkLabel",
            label: "Story 1: Plaque Card Link Text",
            description: "e.g. Explore Selected Work \u2192"
          },
          {
            type: "string",
            name: "section1CardLinkHref",
            label: "Story 1: Plaque Card Link URL",
            description: "e.g. /work or /contact"
          },
          {
            type: "image",
            name: "section1CardImage",
            label: "Story 1: Showcase Photograph (When Display Mode is Image)"
          },
          {
            type: "string",
            name: "section1CardImageCaption",
            label: "Story 1: Showcase Photo Caption (Optional)"
          },
          // ─── 🔄 NARRATIVE STORY 2 (Left: Card or Photo, Right: Copy) ───
          {
            type: "string",
            name: "section2Tag",
            label: "Story 2: Eyebrow Tag",
            description: "e.g. Production Standards, Technical Capabilities"
          },
          {
            type: "string",
            name: "section2Heading",
            label: "Story 2: Section Heading",
            description: "Main section title. Wrap in *asterisks* to highlight text with theme gradient color."
          },
          {
            type: "string",
            name: "section2Description",
            label: "Story 2: Section Body Copy",
            description: "Editorial paragraph. Supports **bold**, <u>underline</u>, and *highlight*.",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "section2Bullets",
            label: "Story 2: Checkmark Bullet Points",
            description: "Key deliverables or assurances (\u2713 rendered automatically)",
            list: true
          },
          {
            type: "string",
            name: "section2LeftType",
            label: "Story 2: Left Column Display Mode",
            description: "Choose whether to display a featured photograph or an informative plaque card",
            options: [
              { label: "Featured Photograph / Showcase Image", value: "image" },
              { label: "Informative Plaque Card (Title, Text & Link)", value: "card" }
            ]
          },
          {
            type: "string",
            name: "section2CardTitle",
            label: "Story 2: Plaque Card Title"
          },
          {
            type: "string",
            name: "section2CardBody",
            label: "Story 2: Plaque Card Body Copy",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "section2CardLinkLabel",
            label: "Story 2: Plaque Card Link Text"
          },
          {
            type: "string",
            name: "section2CardLinkHref",
            label: "Story 2: Plaque Card Link URL"
          },
          {
            type: "image",
            name: "section2CardImage",
            label: "Story 2: Showcase Photograph (When Display Mode is Image)"
          },
          {
            type: "string",
            name: "section2CardImageCaption",
            label: "Story 2: Showcase Photo Caption (Optional)"
          },
          // ─── ⚡ CALL TO ACTION (CLOSER) ──────────────────────────────
          {
            type: "string",
            name: "bottomCtaHeading",
            label: "Bottom CTA Heading"
          },
          {
            type: "string",
            name: "bottomCtaBody",
            label: "Bottom CTA Subtitle",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "bottomCtaLabel",
            label: "Bottom CTA Button Text"
          },
          {
            type: "string",
            name: "bottomCtaLink",
            label: "Bottom CTA Button Link"
          }
        ]
      },
      {
        name: "aboutPage",
        label: "About Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "about"
        },
        ui: {
          router: () => "/about",
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          // ─── 🔍 SEO & DISCOVERABILITY ──────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "\u{1F50D} SEO Title (Google & Social)",
            description: "Optimal length: 50\u201360 characters",
            required: true
          },
          {
            type: "string",
            name: "seoDescription",
            label: "\u{1F50D} SEO Meta Description",
            description: "Optimal length: 140\u2013160 characters",
            ui: {
              component: "textarea"
            },
            required: true
          },
          // ─── 🎬 DIRECTOR'S MANIFESTO ──────────────────────────────────
          {
            type: "string",
            name: "headline",
            label: "\u{1F3AC} Studio Headline / Manifesto Hook",
            required: true
          },
          {
            type: "string",
            name: "manifestoLead",
            label: "Manifesto Lead Paragraph",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "manifestoQuote",
            label: "Featured Manifesto Quote",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "manifestoAuthor",
            label: "Manifesto Quote Attribution"
          },
          {
            type: "string",
            name: "heroBackgroundType",
            label: "Hero Background Type",
            description: "Choose between video loop, photo image, or dual-tone gradient",
            options: [
              { value: "video", label: "\u{1F3AC} Cinematic Video Loop" },
              { value: "image", label: "\u{1F4F8} Static Photograph / Image" },
              { value: "gradient", label: "\u{1F3A8} Dual-Tone Gradient Background" }
            ]
          },
          {
            type: "string",
            name: "heroVideoPath",
            label: "Hero Background Video Path (When Video selected)",
            description: "e.g. /showreel.mp4"
          },
          {
            type: "image",
            name: "heroImagePath",
            label: "Hero Background Photo / Image (When Image selected)",
            description: "High-resolution photo for the hero backdrop"
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
              { value: "radial", label: "Center Spotlight (Radial)" }
            ]
          },
          {
            type: "string",
            name: "heroGradientColor1",
            label: "Gradient First Color (Hex)",
            description: "First color or spotlight center",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "heroGradientColor2",
            label: "Gradient Second Color (Hex)",
            description: "Second color or outer edge",
            ui: {
              component: "color"
            }
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
              { value: "strong", label: "Strong (Heavy 85% ND Tint)" }
            ]
          },
          // ─── 📸 BEHIND THE SCENES DARKROOM GALLERY ───────────────────
          {
            type: "string",
            name: "btsHeading",
            label: "\u{1F4F8} BTS Gallery Section Heading"
          },
          {
            type: "string",
            name: "btsTag",
            label: "\u{1F4F8} BTS Eyebrow Tag"
          },
          {
            type: "string",
            name: "btsDescription",
            label: "\u{1F4F8} BTS Section Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "object",
            name: "btsItems",
            label: "\u{1F4F8} Behind the Scenes Gallery Stills",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.category || "BTS"} \u2014 ${item?.title || "Item"}`
              })
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
                  { label: "1:1 Square", value: "1/1" }
                ]
              }
            ]
          },
          // ─── ⏱️ PRODUCTION SCRIPT TIMELINE & LOG ──────────────────────
          {
            type: "string",
            name: "timelineHeading",
            label: "\u23F1\uFE0F Timeline Heading",
            required: true
          },
          {
            type: "string",
            name: "timelineTag",
            label: "Timeline Tag"
          },
          {
            type: "string",
            name: "timelineDescription",
            label: "Timeline Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "object",
            name: "milestones",
            label: "Milestones / Script Revision Log",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.year || ""} \u2014 ${item?.title || "Milestone"}`
              })
            },
            fields: [
              { type: "string", name: "year", label: "Year", required: true },
              { type: "string", name: "draftLabel", label: "Draft / Script Revision Label (e.g. DRAFT 01)", required: true },
              { type: "string", name: "takeNumber", label: "Take Number (e.g. TAKE 01)" },
              { type: "string", name: "title", label: "Milestone Title", required: true },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" }, required: true },
              { type: "string", name: "badge", label: "Badge Label (Optional)" }
            ]
          },
          // ─── ⚡ CALL TO ACTION (CLOSER) ──────────────────────────────
          {
            type: "string",
            name: "ctaHeading",
            label: "\u26A1 Bottom CTA Heading",
            required: true
          },
          {
            type: "string",
            name: "ctaText",
            label: "Bottom CTA Body Text",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "ctaButtonLabel",
            label: "Bottom CTA Button Text",
            required: true
          },
          {
            type: "string",
            name: "ctaButtonLink",
            label: "Bottom CTA Button Link",
            required: true
          }
        ]
      },
      {
        name: "aboutSlider",
        label: "About: Team & Showcase Slider",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "slider"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "heading",
            label: "Slider Heading",
            required: true
          },
          {
            type: "string",
            name: "tag",
            label: "Slider Eyebrow Tag"
          },
          {
            type: "string",
            name: "description",
            label: "Slider Intro Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "object",
            name: "slides",
            label: "Slides",
            description: "Add 1 or more showcase slides (video or image). With 1 slide, it displays as a featured showcase; with 2+ slides, it becomes an interactive slider.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || "Slide"
              })
            },
            fields: [
              { type: "string", name: "name", label: "Title / Unit Name", required: true },
              { type: "string", name: "bio", label: "Short Note / Scope (Optional)", ui: { component: "textarea" } },
              { type: "image", name: "avatar", label: "Still Image" },
              { type: "string", name: "videoLoop", label: "Video Loop URL/Path (Optional, e.g. /showreel.mp4)" },
              { type: "string", name: "badge", label: "Custom Badge (Optional, e.g. LIVE REEL)" }
            ]
          }
        ]
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
            label: "\u{1F3AC} Display Order (01, 02, etc.)",
            description: "Controls the display sequence on the /work page",
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "\u{1F3AC} Project Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "client",
            label: "Client Name",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category Badge",
            description: "e.g. Commercial / Filming, Narrative / Editing",
            required: true
          },
          {
            type: "string",
            name: "runtime",
            label: "Total Run Time (TRT)",
            description: "e.g. 0:45 or 8:12",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Project Description",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "backgroundStyle",
            label: "Background Display Mode",
            options: [
              { label: "Moving Cinema Video (Vimeo)", value: "video" },
              { label: "Static Photograph", value: "image" }
            ],
            required: true
          },
          {
            type: "string",
            name: "videoUrl",
            label: "Vimeo Embed URL",
            description: "Use format: https://player.vimeo.com/video/828757840",
            required: true
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail / Backdrop Still Image",
            required: true
          },
          {
            type: "string",
            name: "brightnessStyle",
            label: "Video Brightness Tuning",
            options: [
              { label: "Normal (Deep Moody Contrast)", value: "normal" },
              { label: "Bright (Boosted Exposure)", value: "bright" }
            ],
            required: true
          }
        ]
      },
      {
        name: "service",
        label: "Services",
        path: "src/content/services",
        format: "json",
        ui: {
          router: ({ document: document2 }) => {
            const cleanSlug = document2._sys.filename.replace(/^\d+-/, "");
            return `/services/${cleanSlug}`;
          }
        },
        fields: [
          // ─── 🏷️ SERVICE IDENTITY ─────────────────────────────────────
          {
            type: "string",
            name: "order",
            label: "\u{1F3F7}\uFE0F Service Number (01, 02, etc.)",
            description: "Controls the grid sequence in the Services directory",
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "\u{1F3F7}\uFE0F Service Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "tag",
            label: "\u{1F3F7}\uFE0F Category Badge (e.g. Multi-Camera Filming)",
            description: "Used in Schema.org metadata and subpage scope header"
          },
          {
            type: "string",
            name: "description",
            label: "Service Description",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            description: "e.g. event-coverage, conference-production",
            required: true
          },
          {
            type: "string",
            name: "link",
            label: "Target Page Link",
            description: "e.g. /services/event-coverage",
            required: true
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Page Title",
            required: true
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Meta Description",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "heroTag",
            label: "Subpage Hero Tag",
            description: "e.g. Live Production Pipeline",
            required: true
          },
          {
            type: "string",
            name: "heroHeading",
            label: "Subpage Hero Heading",
            description: "Wrap words in asterisks for the amber gradient. e.g. Dynamic *Multi-Camera* Coverage.",
            required: true
          },
          {
            type: "string",
            name: "heroLead",
            label: "Subpage Hero Value Proposition",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "breakdownHeading",
            label: "Breakdown Section Heading",
            description: "Editorial subheadline explaining the service execution approach"
          },
          {
            type: "string",
            name: "breakdownBody",
            label: "Breakdown Section Paragraph",
            description: "Crisp paragraph explaining how we approach and execute this service",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero & Card Background Media Type",
            options: [
              { label: "\u{1F3AC} Cinematic Video Loop", value: "local-video" },
              { label: "\u{1F4F8} Static Photograph / Image", value: "image" },
              { label: "\u{1F3A8} Dual-Tone Gradient Background", value: "gradient" },
              { label: "\u{1F310} External Cloud Video URL", value: "link-video" },
              { label: "\u2B1B No Background Media (Solid Dark)", value: "none" }
            ],
            required: true
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Local Video Path (When Video selected)",
            description: "e.g. /showreel.mp4 (placed in public/ folder)"
          },
          {
            type: "string",
            name: "cloudVideoUrl",
            label: "Cloud Video URL (When External Video selected)",
            description: "e.g. https://your-cdn.com/clip.mp4"
          },
          {
            type: "image",
            name: "imagePath",
            label: "Poster / Fallback Image"
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
              { value: "radial", label: "Center Spotlight (Radial)" }
            ]
          },
          {
            type: "string",
            name: "heroGradientColor1",
            label: "Gradient First Color (Hex)",
            description: "First color or spotlight center",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "heroGradientColor2",
            label: "Gradient Second Color (Hex)",
            description: "Second color or gradient base",
            ui: {
              component: "color"
            }
          },
          {
            type: "object",
            list: true,
            name: "deliverables",
            label: "Service Deliverables",
            ui: {
              itemProps: (item) => ({
                label: item?.title || "Deliverable"
              })
            },
            fields: [
              {
                type: "string",
                name: "tag",
                label: "Deliverable Badge Tag",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Deliverable Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Deliverable Description",
                ui: {
                  component: "textarea"
                },
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "ctaHeading",
            label: "Bottom CTA Heading",
            required: true
          },
          {
            type: "string",
            name: "ctaDescription",
            label: "Bottom CTA Description",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "ctaButtonLabel",
            label: "Bottom CTA Button Text",
            required: true
          }
        ]
      },
      {
        name: "siteSettings",
        label: "Header & Site Branding",
        path: "src/content/settings",
        format: "json",
        match: {
          include: "site"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Site Name (Metadata & Copyright)",
            required: true
          },
          {
            type: "string",
            name: "logoText",
            label: "Text Logo",
            required: true
          },
          {
            type: "boolean",
            name: "useImageLogo",
            label: "Use Image Logo Instead of Text?"
          },
          {
            type: "image",
            name: "logoImagePath",
            label: "Logo Image"
          },
          // ─── 🧭 MAIN NAVIGATION BAR (HEADER) ──────────────────────────
          {
            type: "object",
            name: "navLinks",
            label: "\u{1F9ED} Header Navigation Links",
            description: "Manage and reorder menu links in the top header",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item?.href || ""})` : "Nav Link"
              })
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Menu Label",
                required: true
              },
              {
                type: "string",
                name: "href",
                label: "Link URL / Path (e.g. /work, /services, /contact)",
                required: true
              }
            ]
          }
        ]
      },
      {
        name: "seoSettings",
        label: "SEO & Local Citations",
        path: "src/content/settings",
        format: "json",
        match: {
          include: "seo"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          // ─── 🏢 LOCAL BUSINESS & NAP CITATION (SCHEMA.ORG) ────────────
          {
            type: "string",
            name: "legalName",
            label: "\u{1F3E2} Legal Business Entity Name",
            description: "Official registered name (e.g. FilmEditRun Ltd)"
          },
          {
            type: "string",
            name: "telephone",
            label: "\u{1F4DE} Contact Telephone Number",
            description: "International format (e.g. +44 1223 926450)"
          },
          {
            type: "string",
            name: "email",
            label: "\u2709\uFE0F Primary Contact Email",
            description: "Used in Schema.org and structured business indexing"
          },
          {
            type: "string",
            name: "priceRange",
            label: "\u{1F4B7} Studio Price Range Tier",
            description: "Standard Schema tier (e.g. \xA3\xA3-\xA3\xA3\xA3)"
          },
          {
            type: "string",
            name: "addressLocality",
            label: "\u{1F4CD} Primary City / Locality",
            description: "e.g. Cambridge"
          },
          {
            type: "string",
            name: "addressRegion",
            label: "\u{1F4CD} County / Region",
            description: "e.g. Cambridgeshire"
          },
          {
            type: "string",
            name: "postalCode",
            label: "\u{1F4EE} Postal Code",
            description: "e.g. CB1 2JW"
          },
          {
            type: "string",
            name: "addressCountry",
            label: "\u{1F1EC}\u{1F1E7} Country Code",
            description: "Default: GB"
          },
          {
            type: "string",
            name: "googleMapsUrl",
            label: "\u{1F5FA}\uFE0F Google Business Profile / Maps URL",
            description: "Direct link to your verified Google Maps listing"
          },
          {
            type: "number",
            name: "geoLatitude",
            label: "\u{1F310} Geo Latitude (Optional Pinpoint)",
            description: "e.g. 52.2053 for Cambridge"
          },
          {
            type: "number",
            name: "geoLongitude",
            label: "\u{1F310} Geo Longitude (Optional Pinpoint)",
            description: "e.g. 0.1218 for Cambridge"
          },
          // ─── 🔗 VERIFIED BACKLINK & DIRECTORY PROFILES (sameAs) ───────
          {
            type: "object",
            name: "backlinkProfiles",
            label: "\u{1F517} Verified Citation Profiles & Directory Links",
            description: "Manage authoritative backlink profiles (Cambridge Network, Google Business, Vimeo, GitHub, etc.) for both Schema.org entity linking and the sub-footer citation strip",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ? `${item.name} (${item?.badgeText || item?.url || ""})` : "Citation Profile"
              })
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Profile / Platform Name",
                required: true,
                description: "e.g. Cambridge Network, Google Business Profile, Vimeo, GitHub"
              },
              {
                type: "string",
                name: "url",
                label: "Target Profile URL",
                required: true,
                description: "e.g. https://www.cambridgenetwork.co.uk"
              },
              {
                type: "string",
                name: "badgeText",
                label: "Sub-Badge Text (Optional)",
                description: "Short label displayed next to the link (e.g. Member, Verified Studio, Portfolio, Company)"
              },
              {
                type: "boolean",
                name: "showInFooter",
                label: "Show Link in Sub-Footer Citation Strip?",
                description: "Toggle on to display in the visible footer. (Unchecked profiles are still included in Google Schema.org sameAs)"
              }
            ]
          }
        ]
      },
      {
        name: "gradeSettings",
        label: "Grade Switcher",
        path: "src/content/settings",
        format: "json",
        match: {
          include: "theme"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          // ─── 🎛️ DEFAULT GRADE & FLOATING DOCK ─────────────────────────
          {
            type: "string",
            name: "defaultTheme",
            label: "\u{1F39B}\uFE0F Default Global Aesthetic / Grade",
            description: "Baseline visual grade for visitors (Dark Noir, High-Key Light, or Supernova Gradient)",
            options: [
              { value: "dark-noir", label: "Dark Noir (Obsidian Low-Key Cinema)" },
              { value: "high-key", label: "High-Key Light (Crisp Minimalist Studio)" },
              { value: "supernova", label: "Supernova Gradient (Cosmic Duotone Mesh)" }
            ]
          },
          {
            type: "boolean",
            name: "enableThemeSwitcher",
            label: "\u{1F39B}\uFE0F Enable Floating Grade Switcher Dock?",
            description: "Show the slide-out Grade Switcher dock on the right edge of the viewport"
          },
          {
            type: "string",
            name: "themeSwitcherTitle",
            label: "\u{1F39B}\uFE0F Grade Switcher Dock Title (Optional)",
            description: "Header label for the compact grade dock (default: GRADE)"
          },
          // ─── 🌑 GRADE 1: DARK NOIR ─────────────────────────────────────
          {
            type: "string",
            name: "darkNoirTitle",
            label: "\u{1F311} Dark Noir: Display Name",
            description: "Display title in the floating grade switcher dock (e.g. Dark Noir)"
          },
          {
            type: "string",
            name: "darkNoirAccentColor",
            label: "\u{1F311} Dark Noir Accent Color (Hex)",
            description: "Default: #e8c547 (Warm Tungsten Amber)",
            ui: {
              component: "color"
            }
          },
          // ─── ☀️ GRADE 2: HIGH-KEY LIGHT ────────────────────────────────
          {
            type: "string",
            name: "highKeyTitle",
            label: "\u2600\uFE0F High-Key Light: Display Name",
            description: "Display title in the floating grade switcher dock (e.g. High-Key Light)"
          },
          {
            type: "string",
            name: "highKeyAccentColor",
            label: "\u2600\uFE0F High-Key Light Accent Color (Hex)",
            description: "Default: #e11d48 (Cinema Tally Red)",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "highKeyBgColor",
            label: "\u2600\uFE0F High-Key Light Canvas Background (Hex)",
            description: "Default: #ffffff (Pure Studio White)",
            ui: {
              component: "color"
            }
          },
          // ─── ✨ GRADE 3: SUPERNOVA DUOTONE ─────────────────────────────
          {
            type: "string",
            name: "supernovaTitle",
            label: "\u2728 Supernova: Display Name",
            description: "Display title in the floating grade switcher dock (e.g. Supernova)"
          },
          {
            type: "string",
            name: "supernovaAccentColor",
            label: "\u2728 Supernova Primary Accent (Hex)",
            description: "Primary neon gradient glow (Default: #f43f5e)",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "supernovaSecondaryColor",
            label: "\u2728 Supernova Secondary Mesh Color (Hex)",
            description: "Secondary mesh duotone glow (Default: #8b5cf6)",
            ui: {
              component: "color"
            }
          }
        ]
      },
      {
        name: "footerSettings",
        label: "Footer",
        path: "src/content/settings",
        format: "json",
        match: {
          include: "footer"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          // Top Tier: Tagline & Commission Button
          {
            type: "string",
            name: "studioTagline",
            label: "Top: Studio Scope Tagline",
            description: "Descriptive studio capability sentence under the brand wordmark",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "commissionButtonLabel",
            label: "Top: Commission Button Label"
          },
          {
            type: "string",
            name: "commissionButtonLink",
            label: "Top: Commission Button Link"
          },
          // Column 1: Capabilities / Services
          {
            type: "string",
            name: "capabilitiesHeading",
            label: "Col 1: Capabilities Heading"
          },
          {
            type: "string",
            name: "servicesLinkLabel",
            label: "Col 1: Bottom Link Label",
            description: "e.g. All Services & Specs \u2192"
          },
          {
            type: "string",
            name: "servicesLinkUrl",
            label: "Col 1: Bottom Link URL",
            description: "e.g. /services"
          },
          // Column 2: Studio / Navigation Links
          {
            type: "string",
            name: "studioHeading",
            label: "Col 2: Navigation Heading"
          },
          {
            type: "object",
            name: "studioLinks",
            label: "Col 2: Navigation Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item?.href || ""})` : "Navigation Link"
              })
            },
            fields: [
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Link URL", required: true }
            ]
          },
          // Column 3: Presence / Locations
          {
            type: "string",
            name: "presenceHeading",
            label: "Col 3: Presence Heading"
          },
          {
            type: "string",
            name: "cambridgeTitle",
            label: "Col 3: Cambridge Title / Label",
            description: "Default: Cambridge Studio"
          },
          {
            type: "string",
            name: "cambridgeSubtitle",
            label: "Col 3: Cambridge Subtitle"
          },
          {
            type: "string",
            name: "cambridgeLink",
            label: "Col 3: Cambridge Link URL"
          },
          {
            type: "string",
            name: "londonTitle",
            label: "Col 3: London Title / Label",
            description: "Default: London Base"
          },
          {
            type: "string",
            name: "londonSubtitle",
            label: "Col 3: London Subtitle"
          },
          {
            type: "string",
            name: "worldwideTitle",
            label: "Col 3: Worldwide Title / Label",
            description: "Default: UK-Wide & Worldwide"
          },
          {
            type: "string",
            name: "worldwideSubtitle",
            label: "Col 3: Worldwide Subtitle"
          },
          // Column 4: Direct Inquiries & Specs
          {
            type: "string",
            name: "directHeading",
            label: "Col 4: Direct Heading"
          },
          {
            type: "string",
            name: "inquiriesLabel",
            label: "Col 4: Inquiries Section Label",
            description: "Default: Inquiries"
          },
          {
            type: "string",
            name: "inquiriesActionText",
            label: "Col 4: Inquiries Button / Link Text",
            description: "Default: Start Project Brief \u2192"
          },
          {
            type: "string",
            name: "inquiriesActionLink",
            label: "Col 4: Inquiries Link URL",
            description: "Default: /contact"
          },
          {
            type: "string",
            name: "productionHubLabel",
            label: "Col 4: Production Hub Label",
            description: "Default: Production Hub"
          },
          {
            type: "string",
            name: "productionHub",
            label: "Col 4: Production Hub Text"
          },
          {
            type: "string",
            name: "capturePipelineLabel",
            label: "Col 4: Capture Pipeline Label",
            description: "Default: Capture Pipeline"
          },
          {
            type: "string",
            name: "capturePipeline",
            label: "Col 4: Capture Pipeline Specs"
          },
          {
            type: "string",
            name: "studioStatusLabel",
            label: "Col 4: Studio Status Label",
            description: "Default: Studio Status"
          },
          {
            type: "string",
            name: "studioStatus",
            label: "Col 4: Studio Status Text"
          },
          // Bottom Colophon
          {
            type: "string",
            name: "copyrightTagline",
            label: "Bottom Colophon: Tagline"
          },
          {
            type: "string",
            name: "backToTopLabel",
            label: "Bottom Colophon: Back to Top Label",
            description: "Default: Back to top"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
