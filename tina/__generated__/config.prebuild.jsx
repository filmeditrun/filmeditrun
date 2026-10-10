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
          /* Counter-invert media, swatches, and welcome card */
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
            filter: invert(1) hue-rotate(180deg);
          }

          /* Standard centered form width for all collections (860px) */
          [data-test^="form:"] > div,
          [data-test*="form"] > div {
            max-width: 860px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .max-w-form {
            max-width: 860px !important;
          }

          /* Grade Switcher collection specifically: wider layout (1280px) */
          [data-test*="theme"] > div {
            max-width: 1280px !important;
            padding-left: 28px !important;
            padding-right: 28px !important;
          }
          div:has(> [data-test*="theme"]) ~ div .max-w-form {
            max-width: 1280px !important;
          }

          /* Grade Switcher color swatches: 360px (half size extra) */
          button:has(.swatch-inner),
          div.relative:has(.swatch-inner),
          .swatch-inner {
            max-width: 360px !important;
          }
        `;
        document.head.appendChild(style);
      }
      const setupWelcomeScreen = () => {
        const h3List = document.querySelectorAll("h3");
        for (const h3 of Array.from(h3List)) {
          if (h3.textContent && h3.textContent.includes("Welcome to Tina")) {
            const pageHeader = h3.closest(".pt-4") || (h3.parentElement ? h3.parentElement.parentElement : null);
            const pageBody = pageHeader ? pageHeader.nextElementSibling : null;
            const container = pageHeader ? pageHeader.parentElement : null;
            if (container && !container.querySelector(".filmeditrun-welcome-card")) {
              if (pageHeader) pageHeader.style.display = "none";
              if (pageBody) pageBody.style.display = "none";
              const welcomeCard = document.createElement("div");
              welcomeCard.className = "filmeditrun-welcome-card";
              welcomeCard.innerHTML = `
                <div style="max-width: 620px; margin: 60px auto 0; padding: 52px 40px; text-align: center; background: #121216; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
                  <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
                    <span style="font-family: 'DM Sans', -apple-system, sans-serif; font-size: 42px; font-weight: 900; letter-spacing: -0.04em; color: #ffffff;">
                      FilmEditRun
                    </span>
                  </div>
                  <h2 style="font-family: 'DM Sans', -apple-system, sans-serif; font-size: 20px; font-weight: 700; color: #f4f1ea; margin: 0 0 10px 0; letter-spacing: -0.02em;">
                    Studio Content Management
                  </h2>
                  <p style="font-family: 'DM Sans', -apple-system, sans-serif; font-size: 14px; color: #a8a29a; line-height: 1.6; margin: 0 auto 28px auto; max-width: 460px; font-weight: 400;">
                    Welcome to the FilmEditRun production studio. Select any collection on the left to edit pages, portfolio projects, or cinema grade aesthetics.
                  </p>
                  <div style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 9999px; background: rgba(232, 197, 71, 0.08); border: 1px solid rgba(232, 197, 71, 0.25); color: #e8c547; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">
                    <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981;"></span>
                    Zero-JS Edge Architecture &bull; Studio Active
                  </div>
                </div>
              `;
              container.appendChild(welcomeCard);
            }
          }
        }
      };
      setupWelcomeScreen();
      const observer = new MutationObserver(setupWelcomeScreen);
      observer.observe(document.body, { childList: true, subtree: true });
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
      {
        name: "aboutPage",
        label: "About Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "about"
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
            name: "heroVideoPath",
            label: "Hero Background Video Path (Optional)",
            description: "e.g. /showreel.mp4"
          },
          {
            type: "string",
            name: "heroFrostedGlass",
            label: "Hero Background Solid Tint / ND Filter",
            description: "Solid opacity tint over the background video (subtle is recommended)",
            options: [
              { value: "none", label: "None (Full Raw Video Clarity)" },
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
        ui: {
          itemProps: (item) => ({
            label: item?.title ? `[${item?.order || "\u2014"}] ${item.title} (${item?.category || ""})` : "Project Reel"
          })
        },
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
          itemProps: (item) => ({
            label: item?.title ? `[${item?.order || "\u2014"}] ${item.title}` : "Production Service"
          })
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
            label: "Card Background Media Type",
            options: [
              { label: "Local Video Loop (from /public)", value: "local-video" },
              { label: "External Cloud Video URL", value: "link-video" },
              { label: "Static Image Only", value: "image" },
              { label: "No Background Media (Solid Dark)", value: "none" }
            ],
            required: true
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
            description: "e.g. https://your-cdn.com/clip.mp4"
          },
          {
            type: "image",
            name: "imagePath",
            label: "Poster / Fallback Image"
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
          // ─── 🎨 GRADE PALETTE COLORS ──────────────────────────────────
          {
            type: "string",
            name: "darkNoirAccentColor",
            label: "\u{1F3A8} Dark Noir Accent Color (Hex)",
            description: "Default: #e8c547 (Warm Tungsten Amber)",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "highKeyAccentColor",
            label: "\u{1F3A8} High-Key Light Accent Color (Hex)",
            description: "Default: #e11d48 (Cinema Tally Red)",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "highKeyBgColor",
            label: "\u{1F3A8} High-Key Light Canvas Background (Hex)",
            description: "Default: #ffffff (Pure Studio White)",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "supernovaAccentColor",
            label: "\u{1F3A8} Supernova Accent Color (Hex)",
            description: "Default: #f43f5e (Electric Neon Rose)",
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
