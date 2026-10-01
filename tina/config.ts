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
            name: "locations",
            label: "Hero Locations Badge",
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
          {
            type: "string",
            name: "brandName",
            label: "Spec Strip Brand Label",
            required: true,
          },
          {
            type: "string",
            name: "expertiseList",
            label: "Spec Strip Expertise Items",
            list: true,
          },
          {
            type: "string",
            name: "introHeading",
            label: "Intro Section Heading",
            required: true,
          },
          {
            type: "string",
            name: "introBody",
            label: "Intro Section Body Text",
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
            name: "headerTag",
            label: "Top Amber Subheading Tag",
            description: "e.g. Selected Portfolio",
            required: true,
          },
          {
            type: "string",
            name: "heading",
            label: "Main Page Heading",
            description: "e.g. Our Work.",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Page Intro Text",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "aspectBadge",
            label: "Top-Right Technical Aspect Badge",
            description: "e.g. ASPECT // 16:9",
            required: true,
          },
          {
            type: "string",
            name: "videoButtonLabel",
            label: "Play Button Label (Video Backdrop Projects)",
            description: "e.g. EXPAND SOUND & VIDEO ➔",
            required: true,
          },
          {
            type: "string",
            name: "imageButtonLabel",
            label: "Play Button Label (Image Backdrop Projects)",
            description: "e.g. WATCH PROJECT REEL ➔",
            required: true,
          },
          {
            type: "string",
            name: "scrollIndicatorText",
            label: "Bottom Scroll Indicator Text",
            description: "e.g. SCROLL TO EXPLORE",
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
            name: "canonicalURL",
            label: "Canonical URL",
            required: true,
          },
          {
            type: "string",
            name: "heroTag",
            label: "Hero Badge Tag",
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
          {
            type: "string",
            name: "faqHeading",
            label: "FAQ Section Heading",
            required: true,
          },
          {
            type: "object",
            name: "faqs",
            label: "FAQ Items",
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
          {
            type: "string",
            name: "bottomCtaHeading",
            label: "Bottom CTA Heading",
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
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Project Title",
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
        name: "service",
        label: "Services",
        path: "src/content/services",
        format: "json",
        fields: [
          {
            type: "string",
            name: "order",
            label: "Service Number (01, 02, etc.)",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Service Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "tag",
            label: "Badge Tag",
            description: "e.g. Multi-Cam Capable, Scaleable Broadcast",
            required: true,
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
            name: "link",
            label: "Target Page Link",
            description: "e.g. /services/event-coverage or /contact",
            required: true,
          },
          {
            type: "string",
            name: "displayAs",
            label: "Card Background Media Type",
            options: [
              { label: "Local Video Loop (from /public)", value: "local-video" },
              { label: "External Cloud Video URL", value: "link-video" },
              { label: "Static Image Only", value: "image" },
            ],
            required: true,
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
            description: "e.g. https://your-cdn.com/clip.mp4",
          },
          {
            type: "image",
            name: "imagePath",
            label: "Poster / Fallback Image",
            required: true,
          },
        ],
      },
      {
        name: "siteSettings",
        label: "Site & Branding",
        path: "src/content/settings",
        format: "json",
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
        ],
      },
    ],
  },
});
