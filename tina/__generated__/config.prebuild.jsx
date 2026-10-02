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
            name: "locations",
            label: "Hero Locations Badge",
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
          {
            type: "string",
            name: "brandName",
            label: "Spec Strip Brand Label",
            required: true
          },
          {
            type: "string",
            name: "expertiseList",
            label: "Spec Strip Expertise Items",
            list: true
          },
          {
            type: "string",
            name: "introHeading",
            label: "Intro Section Heading",
            required: true
          },
          {
            type: "string",
            name: "introBody",
            label: "Intro Section Body Text",
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
            name: "headerTag",
            label: "Top Amber Subheading Tag",
            description: "e.g. Selected Portfolio",
            required: true
          },
          {
            type: "string",
            name: "heading",
            label: "Main Page Heading",
            description: "e.g. Our Work.",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Page Intro Text",
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
          {
            type: "string",
            name: "archiveTag",
            label: "Archive Section Amber Tag",
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
            name: "canonicalURL",
            label: "Canonical URL",
            required: true
          },
          {
            type: "string",
            name: "heroTag",
            label: "Hero Badge Tag",
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
          {
            type: "string",
            name: "faqHeading",
            label: "FAQ Section Heading",
            required: true
          },
          {
            type: "object",
            name: "faqs",
            label: "FAQ Items",
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
          {
            type: "string",
            name: "bottomCtaHeading",
            label: "Bottom CTA Heading",
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
            name: "headline",
            label: "Studio Headline / Manifesto Hook",
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
            type: "object",
            name: "slider",
            label: "Slider",
            description: "Showcase & BTS Video / Photo Slider",
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
                    label: `${item?.name || "Slide"} \u2014 ${item?.formalRole || ""}`
                  })
                },
                fields: [
                  { type: "string", name: "name", label: "Title / Unit Name", required: true },
                  { type: "string", name: "formalRole", label: "Subtitle / Specialty Tag", required: true },
                  { type: "string", name: "bio", label: "Short Note / Scope (Optional)", ui: { component: "textarea" } },
                  { type: "image", name: "avatar", label: "Still Image" },
                  { type: "string", name: "videoLoop", label: "Video Loop URL/Path (Optional, e.g. /showreel.mp4)" },
                  { type: "string", name: "badge", label: "Custom Badge (Optional, e.g. LIVE REEL)" }
                ]
              }
            ]
          },
          {
            type: "string",
            name: "btsHeading",
            label: "Behind the Scenes Heading"
          },
          {
            type: "string",
            name: "btsTag",
            label: "Behind the Scenes Tag"
          },
          {
            type: "string",
            name: "btsDescription",
            label: "Behind the Scenes Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "object",
            name: "btsItems",
            label: "Behind the Scenes Gallery Items",
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
          {
            type: "string",
            name: "timelineHeading",
            label: "Timeline Heading",
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
          {
            type: "string",
            name: "ctaHeading",
            label: "Bottom CTA Heading",
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
        name: "project",
        label: "Portfolio Projects",
        path: "src/content/projects",
        format: "json",
        fields: [
          {
            type: "string",
            name: "order",
            label: "Display Order (01, 02, etc.)",
            description: "Controls the display order on the /work page",
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "Project Title",
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
        fields: [
          {
            type: "string",
            name: "order",
            label: "Service Number (01, 02, etc.)",
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "Service Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "tag",
            label: "SEO / Service Type (Optional)",
            description: "Used in Schema.org metadata and subpage scope header (e.g. Multi-Camera Filming)"
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
            description: "e.g. Dynamic Multi-Camera Coverage for High-Stakes Events.",
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
        label: "Site & Branding",
        path: "src/content/settings",
        format: "json",
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
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
