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
          /* ===================================================================
             AUTHENTIC STUDIO DARK THEME (PURE NATIVE CSS - ZERO INVERT HACKS)
             Deep 35mm obsidian canvas with high-legibility white text
             =================================================================== */
          html, body {
            background-color: #0c0c0f !important;
            color: #f4f4f5 !important;
            color-scheme: dark !important;
          }

          /* 0. Root Layout & Base Canvas (Neutralize Tina's hardcoded #F6F6F9 inline styles) */
          #root,
          #root > div,
          .tina-tailwind,
          div[style*="z-index: 9999"],
          div[style*="zIndex: 9999"],
          div[style*="F6F6F9"],
          div[style*="f6f6f9"],
          div[style*="246, 246, 249"],
          .flex.items-stretch.h-dvh,
          .h-dvh,
          .h-screen,
          div.w-full.relative {
            background-color: #0c0c0f !important;
            background: #0c0c0f !important;
          }

          /* 1. Surfaces & Form Containers */
          #root,
          main,
          [data-test="form"],
          [data-test*="form:"],
          [data-test^="form:"],
          .bg-white,
          .bg-gray-50,
          .bg-gray-100,
          .bg-gray-200,
          .bg-gray-300,
          [class*="bg-gray-50"],
          [class*="bg-gray-100"],
          div.relative.left-0.w-full.h-full {
            background-color: #0c0c0f !important;
          }

          /* 2. Secondary Card Panels & Wrappers */
          .shadow-inner,
          div:has(> form) {
            background-color: #121216 !important;
          }

          /* 3. Sidebar Navigation & Top Bar */
          nav,
          aside,
          header,
          .py-2.w-full,
          [data-test="sidebar"],
          [class*="sidebar"],
          div.relative.left-0.w-full.h-full > div:first-child {
            background-color: #08080a !important;
            border-color: #1f1f23 !important;
          }
          aside a:hover,
          nav a:hover,
          [data-test="sidebar"] a:hover {
            background-color: rgba(255, 255, 255, 0.06) !important;
            color: #ffffff !important;
          }

          /* 4. Text Contrast & Typography */
          h1, h2, h3, h4, h5, h6,
          label,
          span.text-gray-900,
          span.text-gray-800,
          span.text-gray-700,
          .text-gray-900,
          .text-gray-800,
          .text-gray-700,
          .text-2xl.font-sans,
          h3.text-gray-700,
          h3.font-sans,
          [class*="text-gray-900"],
          [class*="text-gray-800"],
          [class*="text-gray-700"] {
            color: #ffffff !important;
          }

          /* Descriptions, welcome body, and sub-labels */
          p,
          span.text-gray-600,
          span.text-gray-500,
          span.text-gray-400,
          .text-gray-600,
          .text-gray-500,
          .text-gray-400,
          [class*="text-gray-600"],
          [class*="text-gray-500"],
          [class*="text-gray-400"] {
            color: #a1a1aa !important;
          }

          /* Welcome Screen / Dashboard Copy */
          div.p-6 {
            color: #a1a1aa !important;
            max-width: 680px !important;
            line-height: 1.6 !important;
          }

          /* 5. Borders & Dividers */
          .border,
          .border-t,
          .border-b,
          .border-l,
          .border-r,
          .border-gray-50,
          .border-gray-100,
          .border-gray-150,
          .border-gray-200,
          .border-gray-300,
          [class*="border-gray-"] {
            border-color: #1f1f23 !important;
          }

          /* 6. Form Controls: Deep Charcoal Box + Crisp White Text */
          input[type="text"],
          input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]),
          textarea,
          select,
          [data-test*="textarea"],
          [data-slate-editor="true"],
          .ProseMirror {
            background-color: #16161a !important;
            color: #ffffff !important;
            border: 1px solid #2e2e38 !important;
            border-radius: 6px !important;
            padding: 10px 14px !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
            box-sizing: border-box !important;
            width: 100% !important;
          }

          input[type="text"]:focus,
          input:focus,
          textarea:focus,
          [data-slate-editor="true"]:focus {
            background-color: #1c1c22 !important;
            color: #ffffff !important;
            border-color: #f59e0b !important;
            outline: none !important;
            box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.25) !important;
          }

          /* Placeholder text */
          ::placeholder,
          .placeholder-gray-300,
          .placeholder-gray-400 {
            color: #71717a !important;
          }

          /* 7. Collection List Tables */
          table,
          [role="table"],
          thead,
          tbody,
          tr,
          th,
          td {
            background-color: transparent !important;
            border-color: #1f1f23 !important;
            color: #f4f4f5 !important;
          }
          tr:hover {
            background-color: rgba(255, 255, 255, 0.04) !important;
          }

          /* Eliminate bright grey background gradients and pillars */
          :root {
            --tina-color-grey-1: #0c0c0f !important;
            --tina-color-grey-2: #0e0e12 !important;
            --tina-color-grey-3: #121216 !important;
          }
          .from-gray-50/50,
          .to-gray-50,
          [class*="from-gray-"],
          [class*="to-gray-"],
          .bg-gradient-to-b,
          [class*="bg-gradient-"],
          .bg-gray-50,
          .bg-gray-100,
          .bg-white,
          div.relative.left-0.w-full.h-full {
            background-color: #0c0c0f !important;
            background-image: none !important;
            --tw-gradient-from: #0c0c0f !important;
            --tw-gradient-to: #0c0c0f !important;
            --tw-gradient-stops: #0c0c0f, #0c0c0f !important;
          }

          /* Full-Screen Form: Wrapper fills 100% width with dark canvas; inner form is comfortably left-aligned */
          [data-test^="form:"] {
            width: 100% !important;
            max-width: 100% !important;
            background-color: #0c0c0f !important;
          }
          body:not(.tina-split-mode) form,
          body:not(.tina-split-mode) form > div,
          body:not(.tina-split-mode) [data-test*="form"] > div,
          body:not(.tina-split-mode) .max-w-form,
          body:not(.tina-split-mode) div:has(> form) {
            max-width: 960px !important;
            margin-left: 0 !important;
            margin-right: auto !important;
            padding-left: 32px !important;
            padding-right: 32px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          /* Dynamic Split-Screen Layout: Left pane dynamically scales to fill available space */
          body.tina-split-mode {
            padding-right: 50vw !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
          body.tina-split-mode #root,
          body.tina-split-mode #root > div,
          body.tina-split-mode .h-dvh,
          body.tina-split-mode .h-screen {
            width: 50vw !important;
            max-width: 50vw !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }

          /* The main content area next to the sidebar dynamically takes remaining space */
          body.tina-split-mode .h-dvh > div.relative,
          body.tina-split-mode .h-screen > div.relative,
          body.tina-split-mode div.relative.left-0.w-full.h-full {
            flex: 1 1 0% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }

          /* The form dynamically scales with 28px right gutter */
          body.tina-split-mode form,
          body.tina-split-mode form > div,
          body.tina-split-mode [data-test*="form"],
          body.tina-split-mode [data-test*="form"] > div,
          body.tina-split-mode [data-test^="form:"],
          body.tina-split-mode [data-test^="form:"] > div,
          body.tina-split-mode .max-w-form,
          body.tina-split-mode div:has(> form) {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding-left: 16px !important;
            padding-right: 28px !important;
            box-sizing: border-box !important;
          }

          /* Input and textarea width constraints */
          body.tina-split-mode input[type="text"],
          body.tina-split-mode textarea,
          body.tina-split-mode select {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          /* Grade Switcher collection specifically: wider layout (1280px) */
          body:not(.tina-split-mode) form:has([data-test*="theme"]),
          body:not(.tina-split-mode) [data-test*="theme"] form,
          body:not(.tina-split-mode) [data-test*="theme"] > div {
            max-width: 1280px !important;
            padding-left: 28px !important;
            padding-right: 28px !important;
          }
          body:not(.tina-split-mode) div:has(> [data-test*="theme"]) ~ div .max-w-form {
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
            color: #ffffff !important;
            fill: #ffffff !important;
          }
        `;
        document.head.appendChild(style);
      }
      const initPreviewDock = () => {
        if (document.getElementById("tina-preview-toggle-btn")) return;
        const getRouteForHash = (hash) => {
          if (!hash) return "/";
          if (hash.includes("/collections/home/")) return "/";
          if (hash.includes("/collections/cambridge/")) return "/cambridge";
          if (hash.includes("/collections/london/")) return "/london";
          if (hash.includes("/collections/services/")) return "/services";
          if (hash.includes("/collections/work/")) return "/work";
          if (hash.includes("/collections/about/")) return "/about";
          if (hash.includes("/collections/contact/")) return "/contact";
          if (hash.includes("/collections/thank-you/")) return "/thank-you";
          if (hash.includes("/collections/privacy/")) return "/privacy";
          if (hash.includes("/collections/theme/")) return "/";
          if (hash.includes("/collections/siteSettings/")) return "/";
          if (hash.includes("/collections/seoSettings/")) return "/";
          if (hash.includes("/collections/footerSettings/")) return "/";
          const serviceMatch = hash.match(/\/collections\/service\/([^\/?#]+)/);
          if (serviceMatch && serviceMatch[1]) {
            const slug = serviceMatch[1].replace(/^\d+-/, "");
            return `/services/${slug}`;
          }
          if (hash.includes("/collections/project/")) return "/work";
          const pageMatch = hash.match(/\/collections\/customPages\/([^\/?#]+)/);
          if (pageMatch && pageMatch[1]) {
            return `/${pageMatch[1]}`;
          }
          return "/";
        };
        const toggleBtn = document.createElement("button");
        toggleBtn.id = "tina-preview-toggle-btn";
        toggleBtn.type = "button";
        toggleBtn.innerHTML = `<span>\u{1F441}\uFE0F</span> <span id="tina-preview-btn-label">Split Preview</span>`;
        Object.assign(toggleBtn.style, {
          position: "fixed",
          top: "10px",
          right: "20px",
          zIndex: "999999",
          background: "#18181b",
          color: "#f4f4f5",
          border: "1px solid #3f3f46",
          borderRadius: "9999px",
          padding: "6px 14px",
          fontSize: "12px",
          fontWeight: "600",
          fontFamily: "system-ui, sans-serif",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
          transition: "all 0.2s ease"
        });
        const dock = document.createElement("div");
        dock.id = "tina-preview-dock";
        Object.assign(dock.style, {
          position: "fixed",
          top: "0",
          right: "0",
          width: "50vw",
          height: "100vh",
          background: "#0a0a0c",
          borderLeft: "2px solid #27272a",
          zIndex: "999990",
          display: "none",
          flexDirection: "column",
          boxShadow: "-8px 0 24px rgba(0,0,0,0.5)",
          boxSizing: "border-box"
        });
        const header = document.createElement("div");
        Object.assign(header.style, {
          height: "46px",
          background: "#121215",
          borderBottom: "1px solid #27272a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          color: "#a1a1aa",
          fontSize: "12px",
          fontFamily: "system-ui, sans-serif",
          userSelect: "none"
        });
        header.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;"></span>
            <span style="font-weight:600;color:#f4f4f5;">Live Preview</span>
            <span id="tina-preview-route-badge" style="background:#27272a;color:#e4e4e7;padding:2px 8px;border-radius:6px;font-family:monospace;font-size:11px;">/</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <button id="tina-preview-refresh-btn" type="button" title="Refresh Page Preview" style="background:#1f1f23;color:#e4e4e7;border:1px solid #3f3f46;border-radius:6px;padding:3px 8px;font-size:11px;cursor:pointer;">\u{1F504} Refresh</button>
            <button id="tina-preview-mobile-btn" type="button" title="Toggle Mobile / Full Width" style="background:#1f1f23;color:#e4e4e7;border:1px solid #3f3f46;border-radius:6px;padding:3px 8px;font-size:11px;cursor:pointer;">\u{1F4F1} Viewport</button>
            <a id="tina-preview-open-link" href="/" target="_blank" rel="noopener noreferrer" title="Open Page in New Tab" style="background:#1f1f23;color:#e4e4e7;border:1px solid #3f3f46;border-radius:6px;padding:3px 8px;font-size:11px;text-decoration:none;display:inline-flex;align-items:center;">\u2197\uFE0F</a>
            <button id="tina-preview-close-btn" type="button" title="Close Preview" style="background:transparent;color:#71717a;border:none;padding:4px 6px;font-size:14px;cursor:pointer;">\u2715</button>
          </div>
        `;
        const frameArea = document.createElement("div");
        Object.assign(frameArea.style, {
          flex: "1",
          width: "100%",
          height: "calc(100vh - 46px)",
          background: "#0a0a0c",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          overflow: "hidden"
        });
        const iframe = document.createElement("iframe");
        iframe.id = "tina-live-preview-iframe";
        iframe.src = "/";
        Object.assign(iframe.style, {
          width: "100%",
          height: "100%",
          border: "none",
          transition: "max-width 0.25s ease",
          background: "#0a0a0c"
        });
        frameArea.appendChild(iframe);
        dock.appendChild(header);
        dock.appendChild(frameArea);
        document.body.appendChild(toggleBtn);
        document.body.appendChild(dock);
        let isSplit = false;
        let isMobile = false;
        const updatePreviewRoute = () => {
          const targetRoute = getRouteForHash(window.location.hash);
          const badge = document.getElementById("tina-preview-route-badge");
          const openLink = document.getElementById("tina-preview-open-link");
          if (badge) badge.textContent = targetRoute;
          if (openLink) openLink.href = targetRoute;
          try {
            const currentSrc = iframe.contentWindow?.location.pathname;
            if (currentSrc !== targetRoute) {
              iframe.src = targetRoute;
            }
          } catch (e) {
            iframe.src = targetRoute;
          }
        };
        const setSplitMode = (active) => {
          isSplit = active;
          if (active) {
            dock.style.display = "flex";
            document.body.classList.add("tina-split-mode");
            toggleBtn.style.right = "calc(50vw + 20px)";
            toggleBtn.style.background = "#e11d48";
            toggleBtn.style.borderColor = "#f43f5e";
            toggleBtn.innerHTML = `<span>\u2715</span> <span>Close Preview</span>`;
            updatePreviewRoute();
          } else {
            dock.style.display = "none";
            document.body.classList.remove("tina-split-mode");
            toggleBtn.style.right = "20px";
            toggleBtn.style.background = "#18181b";
            toggleBtn.style.borderColor = "#3f3f46";
            toggleBtn.innerHTML = `<span>\u{1F441}\uFE0F</span> <span>Split Preview</span>`;
          }
        };
        toggleBtn.addEventListener("click", () => setSplitMode(!isSplit));
        const closeBtn = document.getElementById("tina-preview-close-btn");
        if (closeBtn) closeBtn.addEventListener("click", () => setSplitMode(false));
        const refreshBtn = document.getElementById("tina-preview-refresh-btn");
        if (refreshBtn) {
          refreshBtn.addEventListener("click", () => {
            try {
              iframe.contentWindow?.location.reload();
            } catch (e) {
              iframe.src = iframe.src;
            }
          });
        }
        const mobileBtn = document.getElementById("tina-preview-mobile-btn");
        if (mobileBtn) {
          mobileBtn.addEventListener("click", () => {
            isMobile = !isMobile;
            if (isMobile) {
              iframe.style.maxWidth = "390px";
              iframe.style.borderLeft = "1px solid #27272a";
              iframe.style.borderRight = "1px solid #27272a";
              iframe.style.boxShadow = "0 0 20px rgba(0,0,0,0.8)";
              mobileBtn.textContent = "\u{1F5A5}\uFE0F Desktop";
            } else {
              iframe.style.maxWidth = "100%";
              iframe.style.borderLeft = "none";
              iframe.style.borderRight = "none";
              iframe.style.boxShadow = "none";
              mobileBtn.textContent = "\u{1F4F1} Mobile";
            }
          });
        }
        window.addEventListener("hashchange", () => {
          if (isSplit) {
            updatePreviewRoute();
          }
        });
      };
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPreviewDock);
      } else {
        setTimeout(initPreviewDock, 500);
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
            label: "\u{1F4DD} Intro Section Heading (Use *word* for gradient)",
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
            type: "image",
            name: "introImage",
            label: "Intro Background Image (Parallax)",
            description: "Default: /work/onlocation.webp"
          },
          // ─── 📊 STUDIO TELEMETRY METRICS ──────────────────────────────
          {
            type: "object",
            name: "telemetryMetrics",
            label: "\u{1F4CA} Studio Telemetry Metrics",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.value ? `${item.value} : ${item?.label || ""}` : "Metric"
              })
            },
            fields: [
              { type: "string", name: "value", label: "Metric Number / Value (e.g. 100%, 48h)", required: true },
              { type: "string", name: "label", label: "Metric Title / Label", required: true },
              { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" }, required: true }
            ]
          },
          // ─── 🎬 WORK SECTION ─────────────────────────────────────────
          {
            type: "string",
            name: "workSpotlightTag",
            label: "Work Section Badge Tag",
            description: "Default: Work"
          },
          {
            type: "string",
            name: "workSpotlightHeading",
            label: "Work Section Heading (Use *word* for gradient)",
            description: "Default: Selected Films & *Client Highlights*."
          },
          {
            type: "string",
            name: "workSpotlightDescription",
            label: "Work Section Description",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "workSpotlightLinkLabel",
            label: "Work Section Button Text",
            description: "Default: Explore Work \u2192"
          },
          {
            type: "string",
            name: "workSpotlightLinkHref",
            label: "Work Section Button Link",
            description: "Default: /work"
          },
          // ─── 🌌 FULL-BLEED PARALLAX IMMERSION ─────────────────────────
          {
            type: "string",
            name: "scaleHeading",
            label: "Parallax Section Heading (Use *word* for gradient)",
            description: "Default: Low-profile crews. *Plenary-scale capture.*"
          },
          {
            type: "string",
            name: "scaleDescription",
            label: "Parallax Section Description",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "scaleImage",
            label: "Parallax Background Image",
            description: "Default: /cambridge/stage-wide.webp"
          },
          // ─── 🍱 SERVICES BENTO GRID ───────────────────────────────────
          {
            type: "string",
            name: "bentoTag",
            label: "Bento Grid Tag / Badge",
            description: "Default: Services"
          },
          {
            type: "string",
            name: "bentoHeading",
            label: "Bento Grid Heading (Use *word* for gradient)",
            description: "Default: Engineered for *Impact & Engagement*."
          },
          {
            type: "string",
            name: "bentoDescription",
            label: "Bento Grid Description",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "bentoLinkLabel",
            label: "Bento Grid Directory Link Label",
            description: "Default: Explore Services \u2192"
          },
          {
            type: "string",
            name: "bentoLinkHref",
            label: "Bento Grid Directory Link URL",
            description: "Default: /services"
          },
          // ─── ⚡ PRODUCTION PIPELINE (STAGE 3) ─────────────────────────
          {
            type: "string",
            name: "pipelineTag",
            label: "Pipeline Section Tag / Badge",
            description: "Default: Production Pipeline"
          },
          {
            type: "string",
            name: "pipelineHeading",
            label: "Pipeline Heading (Use *word* for gradient)",
            description: "Default: Calm execution. *Predictable excellence.*"
          },
          {
            type: "string",
            name: "pipelineDescription",
            label: "Pipeline Description",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "pipelineLinkLabel",
            label: "Pipeline Link Button Label",
            description: "Default: Discuss Your Timeline \u2192"
          },
          {
            type: "string",
            name: "pipelineLinkHref",
            label: "Pipeline Link Button URL",
            description: "Default: /contact"
          },
          // ─── 🏛️ DUAL HUBS (STAGE 4 - PART 1) ──────────────────────────
          {
            type: "string",
            name: "hubsTag",
            label: "Dual Hubs Section Tag / Badge",
            description: "Default: Dual Hubs"
          },
          {
            type: "string",
            name: "hubsHeading",
            label: "Dual Hubs Heading (Use *word* for gradient)",
            description: "Default: Rooted in Cambridge. *On-location across London.*"
          },
          {
            type: "string",
            name: "hubsDescription",
            label: "Dual Hubs Description",
            ui: { component: "textarea" }
          },
          // ─── 🚀 FINAL COMMISSIONING CTA (STAGE 4 - PART 2) ───────────
          {
            type: "string",
            name: "ctaBadge",
            label: "Final CTA Badge",
            description: "Default: Direct Studio Intake"
          },
          {
            type: "string",
            name: "ctaHeading",
            label: "Final CTA Heading (Use *word* for gradient)",
            description: "Default: Ready to film your next *conference or brand story*?"
          },
          {
            type: "string",
            name: "ctaDescription",
            label: "Final CTA Description",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "ctaPrimaryLabel",
            label: "Final CTA Primary Button Label",
            description: "Default: Start Project Brief \u2192"
          },
          {
            type: "string",
            name: "ctaPrimaryLink",
            label: "Final CTA Primary Button URL",
            description: "Default: /contact"
          },
          {
            type: "string",
            name: "ctaSecondaryLabel",
            label: "Final CTA Secondary Button Label",
            description: "Default: Explore Full Portfolio"
          },
          {
            type: "string",
            name: "ctaSecondaryLink",
            label: "Final CTA Secondary Button URL",
            description: "Default: /work"
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
          // ─── 📸 ON-LOCATION EDITORIAL LOOKBOOK ─────────────────────────
          {
            type: "string",
            name: "lookbookTag",
            label: "\u{1F4F8} Lookbook Section Tag"
          },
          {
            type: "image",
            name: "lookbookHeroImage",
            label: "\u{1F4F8} Large Hero Frame (Left)"
          },
          {
            type: "string",
            name: "lookbookHeroBadge",
            label: "Large Hero Badge (e.g. Cambridge Science Park \u2022 Multi-Cam Keynote)"
          },
          {
            type: "image",
            name: "lookbookDetail1Image",
            label: "\u{1F4F8} Detail Frame 1 (Top Right)"
          },
          {
            type: "string",
            name: "lookbookDetail1Badge",
            label: "Detail 1 Badge (e.g. Historic Colleges \u2022 Symposia & Panels)"
          },
          {
            type: "image",
            name: "lookbookDetail2Image",
            label: "\u{1F4F8} Detail Frame 2 (Bottom Right)"
          },
          {
            type: "string",
            name: "lookbookDetail2Badge",
            label: "Detail 2 Badge (e.g. The Bradfield Centre \u2022 Executive Interviews)"
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
        name: "londonPage",
        label: "London Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "london"
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
            label: "Hero Lead Paragraph",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "heroCtaLabel",
            label: "Hero CTA Button Text",
            required: true
          },
          {
            type: "string",
            name: "heroCtaLink",
            label: "Hero CTA Button Link",
            required: true
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero Background Media Type",
            description: "Select whether the hero displays a looping video, photo, or transparent darkroom",
            options: [
              { value: "local-video", label: "\u{1F3AC} Local Video Loop (Fastest, e.g. /showreel.mp4)" },
              { value: "link-video", label: "\u{1F517} Hosted Video URL (.mp4 / cloud stream)" },
              { value: "image", label: "\u{1F4F8} Static Photograph" },
              { value: "none", label: "\u2B1B Pure Minimalist Darkroom (No Media)" }
            ]
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Local Video File Path",
            description: "Default: /showreel.mp4"
          },
          {
            type: "string",
            name: "cloudVideoUrl",
            label: "External Video File URL (.mp4)"
          },
          {
            type: "image",
            name: "imagePath",
            label: "Static Background Image / Fallback Poster",
            description: "High-resolution photo used as background or video poster"
          },
          // ─── 📍 LOCAL EXPERTISE & VENUE SPECIFICATIONS ───────────────
          {
            type: "string",
            name: "expertiseTag",
            label: "\u{1F4CD} Local Hub Section Tag",
            required: true
          },
          {
            type: "string",
            name: "expertiseHeading",
            label: "Local Hub Main Heading",
            required: true
          },
          {
            type: "string",
            name: "expertiseDescription",
            label: "Local Production Overview",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "expertiseBullets",
            label: "Key Production Capabilities (Bullet List)",
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
            label: "Right Feature Card Body Text",
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
          // ─── 📸 ON-LOCATION EDITORIAL LOOKBOOK ─────────────────────────
          {
            type: "string",
            name: "lookbookTag",
            label: "\u{1F4F8} Lookbook Section Tag"
          },
          {
            type: "image",
            name: "lookbookHeroImage",
            label: "\u{1F4F8} Large Hero Frame (Left)"
          },
          {
            type: "string",
            name: "lookbookHeroBadge",
            label: "Large Hero Badge (e.g. ExCeL London \u2022 4K Multi-Cam Stage)"
          },
          {
            type: "image",
            name: "lookbookDetail1Image",
            label: "\u{1F4F8} Detail Frame 1 (Top Right)"
          },
          {
            type: "string",
            name: "lookbookDetail1Badge",
            label: "Detail 1 Badge (e.g. City of London \u2022 Executive Profiles)"
          },
          {
            type: "image",
            name: "lookbookDetail2Image",
            label: "\u{1F4F8} Detail Frame 2 (Bottom Right)"
          },
          {
            type: "string",
            name: "lookbookDetail2Badge",
            label: "Detail 2 Badge (e.g. Kings Cross \u2022 Live Audio & Cinema Rigs)"
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
        name: "customPages",
        label: "Custom Pages",
        path: "src/content/pages/custom",
        format: "json",
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
            isTitle: true,
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
        name: "siteSettings",
        label: "Header & Site Branding",
        path: "src/content/settings",
        format: "json",
        match: {
          include: "site"
        },
        ui: {
          global: true,
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
          // ─── 🔍 SEO & HEADER ───────────────────────────────────────────
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Page Title",
            required: true
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Meta Description (Optimal: 140\u2013160 chars)",
            description: "Concise summary for search engine snippets and social sharing",
            ui: {
              component: "textarea"
            }
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
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero Background Media Type",
            description: "Choose whether the Services Hero displays a photograph, cinematic video, duo-tone gradient, or solid color",
            options: [
              { label: "\u{1F4F8} Static Photograph / Image", value: "image" },
              { label: "\u{1F3AC} Cinematic Video Loop", value: "local-video" },
              { label: "\u{1F3A8} Duo-Tone Gradient Background", value: "gradient" },
              { label: "\u2B1B Solid Background Color", value: "solid" },
              { label: "\u{1F311} Solid Darkroom Baseline (No Media)", value: "none" }
            ]
          },
          {
            type: "image",
            name: "imagePath",
            label: "\u{1F4F8} Poster / Background Image",
            description: "Photograph displayed when 'Image' is selected, or as video poster"
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "\u{1F3AC} Local Video Path (When Video selected)",
            description: "e.g. /showreel.mp4"
          },
          {
            type: "string",
            name: "heroSolidColor",
            label: "\u2B1B Solid Background Color (Hex)",
            description: "Pick a hex color when Solid option is selected (e.g. #09090c)",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "heroGradientDirection",
            label: "\u{1F3A8} Gradient Direction (When Gradient selected)",
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
            label: "\u{1F3A8} Gradient First Color (Hex)",
            description: "First color or spotlight center",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "heroGradientColor2",
            label: "\u{1F3A8} Gradient Second Color (Hex)",
            description: "Second color or gradient base",
            ui: {
              component: "color"
            }
          },
          // ─── ⚙️ PRODUCTION PROCESS (HOW IT WORKS) ─────────────────────
          {
            type: "string",
            name: "processTag",
            label: "Process Eyebrow Tag",
            description: "Default: Workflow Architecture"
          },
          {
            type: "string",
            name: "processHeading",
            label: "Process Section Heading",
            description: "Default: The Production Process."
          },
          {
            type: "string",
            name: "processDescription",
            label: "Process Subtitle",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "object",
            list: true,
            name: "processSteps",
            label: "Production Process Steps",
            ui: {
              itemProps: (item) => ({
                label: item?.step && item?.title ? `${item.step}. ${item.title}` : "Process Step"
              })
            },
            fields: [
              {
                type: "string",
                name: "step",
                label: "Step Number (e.g. 01)",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Step Title",
                required: true
              },
              {
                type: "string",
                name: "tag",
                label: "Stage Category Tag (e.g. Pre-Production, Filming)",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Step Description",
                ui: {
                  component: "textarea"
                },
                required: true
              }
            ]
          },
          // ─── 🚀 BOTTOM CTA ─────────────────────────────────────────────
          {
            type: "string",
            name: "ctaTag",
            label: "Bottom CTA Eyebrow Tag",
            description: "Default: READY FOR THE NEXT TAKE?"
          },
          {
            type: "string",
            name: "ctaHeading",
            label: "Bottom CTA Heading",
            description: "Default: Have an Upcoming Event or Production Brief?"
          },
          {
            type: "string",
            name: "ctaText",
            label: "Bottom CTA Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "ctaButtonLabel",
            label: "Bottom CTA Button Text",
            description: "Default: Start Project Brief"
          },
          {
            type: "string",
            name: "ctaButtonLink",
            label: "Bottom CTA Button Link",
            description: "Default: /contact"
          }
        ]
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
              const slug = values?.slug || values?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "service";
              return `${order}${slug}`;
            }
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
          // ─── 🔲 BENTO GRID CARD VISUALS (Services Directory /services) ────
          {
            type: "string",
            name: "cardDisplayAs",
            label: "\u{1F532} Bento Card Media Type",
            description: "Choose how this card displays in the 6-service Bento Grid on /services and homepage carousel",
            options: [
              { label: "\u{1F4F8} Static Photograph / Image", value: "image" },
              { label: "\u{1F3AC} Cinematic Video Loop", value: "video" },
              { label: "\u2728 Duo-Tone Studio Spotlight (Hairline & Beam)", value: "gradient" },
              { label: "\u2B1B Solid Background Color", value: "solid" }
            ]
          },
          {
            type: "image",
            name: "cardImage",
            label: "\u{1F532} Card Photo",
            description: "Photograph displayed on this service card when Image mode is active (or as video poster)"
          },
          {
            type: "string",
            name: "cardVideoPath",
            label: "\u{1F532} Card Video Path (When Video selected)",
            description: "e.g. /showreel.mp4"
          },
          {
            type: "string",
            name: "cardSolidColor",
            label: "\u{1F532} Card Solid Background Color (Hex)",
            description: "Hex color when Solid mode is selected (e.g. #0a0a0c)",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "cardGradientDirection",
            label: "\u{1F532} Card Gradient Direction",
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
            name: "cardGradientColor1",
            label: "\u{1F532} Card Gradient First Color (Hex)",
            description: "Start color or spotlight center",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "cardGradientColor2",
            label: "\u{1F532} Card Gradient Second Color (Hex)",
            description: "End color or gradient base",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "cardTextContrast",
            label: "\u{1F532} Card Text Contrast Mode",
            description: "Controls text color on this card. Auto automatically adapts text to background lightness across all visual grades.",
            options: [
              { label: "\u26A1 Auto (Adapts text to background color)", value: "auto" },
              { label: "\u26AA Light / White Text (For dark photos, videos, or dark colors)", value: "light" },
              { label: "\u26AB Dark / Black Text (For white, cream, or light pastel colors)", value: "dark" }
            ]
          },
          // ─── 🎬 SUBPAGE HERO BANNER VISUALS (/services/[slug]) ─────────
          {
            type: "string",
            name: "heroDisplayAs",
            label: "\u{1F3AC} Subpage Hero Media Type",
            description: "Choose how the full-width Hero banner displays on this service's own page",
            options: [
              { label: "\u{1F3AC} Cinematic Video Loop", value: "video" },
              { label: "\u{1F4F8} Static Photograph / Image", value: "image" },
              { label: "\u{1F3A8} Duo-Tone Gradient Background", value: "gradient" },
              { label: "\u2B1B Solid Background Color", value: "solid" },
              { label: "\u{1F311} Darkroom Baseline (No Media)", value: "none" }
            ]
          },
          {
            type: "image",
            name: "heroImage",
            label: "\u{1F3AC} Hero Photo",
            description: "Photograph displayed in the Hero banner when Image mode is active (or as video poster)"
          },
          {
            type: "string",
            name: "heroVideoPath",
            label: "\u{1F3AC} Hero Video Path (When Video selected)",
            description: "e.g. /showreel.mp4"
          },
          {
            type: "string",
            name: "heroSolidColor",
            label: "\u{1F3AC} Hero Solid Background Color (Hex)",
            description: "Hex color code when Solid option is selected (e.g. #0a0a0c)",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "heroGradientDirection",
            label: "\u{1F3AC} Hero Gradient Direction",
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
            label: "\u{1F3AC} Hero Gradient First Color (Hex)",
            description: "Start color or spotlight center",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "heroGradientColor2",
            label: "\u{1F3AC} Hero Gradient Second Color (Hex)",
            description: "End color or gradient base",
            ui: {
              component: "color"
            }
          },
          {
            type: "string",
            name: "heroTextContrast",
            label: "\u{1F3AC} Hero Text Contrast Mode",
            description: "Controls text color in the Hero banner. Auto automatically adapts text to background lightness across all visual grades.",
            options: [
              { label: "\u26A1 Auto (Adapts text to background color)", value: "auto" },
              { label: "\u26AA Light / White Text (For dark photos, videos, or dark colors)", value: "light" },
              { label: "\u26AB Dark / Black Text (For white, cream, or light pastel colors)", value: "dark" }
            ]
          },
          // ─── 🔄 LEGACY COMPATIBILITY FIELDS (Hidden Fallbacks) ────────
          {
            type: "string",
            name: "displayAs",
            label: "Legacy Media Type Fallback",
            description: "Used automatically if specific Bento or Hero type is not set"
          },
          {
            type: "image",
            name: "imagePath",
            label: "Legacy Image Fallback"
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Legacy Video Fallback"
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
            name: "heroVideoPath",
            label: "\u{1F3AC} Hero Background Video Path",
            description: "Default: /showreel.mp4 (instant local video playback, zero buffering, zero white flash)"
          },
          {
            type: "image",
            name: "heroPosterPath",
            label: "\u{1F3AC} Hero Fallback Poster Frame",
            description: "Dark image displayed at millisecond 0 while video loads (e.g. /og-image.jpg)"
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
            name: "scrollIndicatorText",
            label: "Hero Scroll Indicator Text",
            description: "e.g. EXPLORE ALL PRODUCTIONS",
            required: true
          },
          // ─── 🎞️ PRODUCTION ARCHIVE & BENTO GRID ───────────────────────
          {
            type: "boolean",
            name: "showArchive",
            label: "\u{1F39E}\uFE0F Display Production Archive & Bento Grid?",
            description: "Toggle ON to display the archive grid and category filter, or OFF to feature only the cinema hero showreel."
          },
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
          // ─── 🎯 OUR APPROACH (EDITORIAL STATEMENT) ───────────────────
          {
            type: "string",
            name: "approachTag",
            label: "\u{1F3AF} Approach Eyebrow Tag"
          },
          {
            type: "string",
            name: "approachHeading",
            label: "\u{1F3AF} Approach Headline",
            required: true
          },
          {
            type: "string",
            name: "approachBody",
            label: "\u{1F3AF} Approach Body Text",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "approachPrimaryLinkLabel",
            label: "Primary Link Label"
          },
          {
            type: "string",
            name: "approachPrimaryLinkHref",
            label: "Primary Link URL"
          },
          {
            type: "string",
            name: "approachSecondaryLinkLabel",
            label: "Secondary Link Label"
          },
          {
            type: "string",
            name: "approachSecondaryLinkHref",
            label: "Secondary Link URL"
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
                label: `${item?.year || ""} - ${item?.title || "Milestone"}`
              })
            },
            fields: [
              { type: "string", name: "year", label: "Year (e.g. 2016)", required: true },
              { type: "string", name: "title", label: "Milestone Title", required: true },
              { type: "string", name: "description", label: "Milestone Story / Description", ui: { component: "textarea" }, required: true },
              { type: "string", name: "draftLabel", label: "Draft Label (Optional Legacy)" },
              { type: "string", name: "takeNumber", label: "Take Number (Optional Legacy)" },
              { type: "string", name: "badge", label: "Badge Label (Optional Legacy)" }
            ]
          },
          // ─── ⚡ CALL TO ACTION (CLOSER) ──────────────────────────────
          {
            type: "string",
            name: "ctaTag",
            label: "\u26A1 Bottom CTA Eyebrow Tag"
          },
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
          },
          {
            type: "string",
            name: "ctaSecondaryButtonLabel",
            label: "Bottom CTA Secondary Button Text"
          },
          {
            type: "string",
            name: "ctaSecondaryButtonLink",
            label: "Bottom CTA Secondary Button Link"
          },
          {
            type: "string",
            name: "ctaTrustSignals",
            label: "Bottom CTA Reassurances (Trust Bullets)",
            list: true
          }
        ]
      },
      {
        name: "aboutSlider",
        label: "About: Our Team & BTS Slider",
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
            label: "Team & Behind The Scenes Slides",
            description: "Manage showcase slides (photos or looping video) for crew units and behind-the-scenes equipment setups.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.badge ? `[${item.badge}] ` : ""}${item?.name || "Slide"}`
              })
            },
            fields: [
              { type: "string", name: "name", label: "Title / Unit Name", required: true },
              { type: "string", name: "badge", label: "Category Badge (e.g. OUR TEAM, CAMERA OPS, LIVE BROADCAST)" },
              { type: "string", name: "bio", label: "Caption / Story", ui: { component: "textarea" } },
              { type: "image", name: "avatar", label: "Slide Image" },
              { type: "string", name: "videoLoop", label: "Video Loop URL/Path (Optional, e.g. /showreel.mp4)" }
            ]
          }
        ]
      },
      {
        name: "contactPage",
        label: "Contact Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "contact"
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
            description: "Optimal length: 50\u201360 characters. Primary keywords & brand name.",
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
          // ─── 🎬 HERO & HEADLINE ───────────────────────────────────────
          {
            type: "string",
            name: "headerTag",
            label: "\u{1F3AC} Top Eyebrow Tag",
            description: "e.g. Start A Brief"
          },
          {
            type: "string",
            name: "heading",
            label: "\u{1F3AC} Main Page Heading",
            description: "e.g. Let's discuss your next *production.*"
          },
          {
            type: "string",
            name: "description",
            label: "\u{1F3AC} Page Intro Text",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "trustSignals",
            label: "\u{1F6E1}\uFE0F Trust Reassurance Bullets",
            list: true
          },
          {
            type: "string",
            name: "displayAs",
            label: "Hero Background Media Type",
            options: [
              { label: "\u{1F3A8} Duo-Tone Gradient Background", value: "gradient" },
              { label: "\u{1F3AC} Cinematic Video Loop", value: "local-video" },
              { label: "\u{1F4F8} Static Photograph / Image", value: "image" },
              { label: "\u2B1B Solid Background Color", value: "solid" },
              { label: "\u{1F311} Solid Darkroom Baseline (No Media)", value: "none" }
            ]
          },
          {
            type: "string",
            name: "localVideoPath",
            label: "Local Video Path (When Video selected)",
            description: "e.g. /showreel.mp4"
          },
          {
            type: "image",
            name: "imagePath",
            label: "Poster / Background Image"
          },
          {
            type: "string",
            name: "heroSolidColor",
            label: "\u2B1B Solid Background Color (Hex)",
            description: "Pick a hex color when Solid option is selected (e.g. #09090c)",
            ui: {
              component: "color"
            }
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
          // ─── 🔌 FORMTORCH & SUBMISSION INTEGRATION ─────────────────────
          {
            type: "string",
            name: "formEndpoint",
            label: "\u{1F50C} FormTorch Endpoint URL",
            description: "Paste your unique FormTorch endpoint here (e.g. https://formtorch.com/f/your-key)",
            required: true
          },
          {
            type: "string",
            name: "redirectUrl",
            label: "Redirect URL After Submission (Optional)",
            description: "Optional custom thank-you page URL (e.g. / or /thank-you). Leave empty to use FormTorch default confirmation."
          },
          {
            type: "boolean",
            name: "enableTurnstile",
            label: "Enable Cloudflare Turnstile Anti-Spam",
            description: "Turn on if you want Cloudflare bot verification before submission."
          },
          {
            type: "string",
            name: "turnstileSiteKey",
            label: "Cloudflare Turnstile Site Key (Optional)",
            description: "Site Key from your Cloudflare Turnstile dashboard."
          },
          // ─── 01. STEP 1: NAME ──────────────────────────────────────────
          {
            type: "string",
            name: "step1Tag",
            label: "Step 1 Tagline",
            description: "e.g. 01 \u2794 Introduce Yourself"
          },
          {
            type: "string",
            name: "step1Title",
            label: "Step 1 Question Title",
            description: "e.g. What is your first and surname? *",
            required: true
          },
          {
            type: "string",
            name: "step1Placeholder",
            label: "Step 1 Field Placeholder",
            description: "e.g. Type your full name here..."
          },
          // ─── 02. STEP 2: SERVICES ──────────────────────────────────────
          {
            type: "string",
            name: "step2Tag",
            label: "Step 2 Tagline",
            description: "e.g. 02 \u2794 Project Requirement"
          },
          {
            type: "string",
            name: "step2Title",
            label: "Step 2 Question Title",
            description: "e.g. What service do you need? *",
            required: true
          },
          {
            type: "object",
            name: "serviceOptions",
            label: "Service Requirement Options",
            description: "Radio options users can select for their project brief",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || "Service Option"
              })
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Option Label (Visible in Form)",
                required: true
              },
              {
                type: "string",
                name: "value",
                label: "Option Value (Sent in Email Notification)",
                required: true
              }
            ]
          },
          // ─── 03. STEP 3: EMAIL ─────────────────────────────────────────
          {
            type: "string",
            name: "step3Tag",
            label: "Step 3 Tagline",
            description: "e.g. 03 \u2794 Reachable Contact"
          },
          {
            type: "string",
            name: "step3Title",
            label: "Step 3 Question Title",
            description: "e.g. What is your contact email address? *",
            required: true
          },
          {
            type: "string",
            name: "step3Placeholder",
            label: "Step 3 Field Placeholder",
            description: "e.g. name@company.com"
          },
          // ─── 04. STEP 4: PROJECT BRIEF ─────────────────────────────────
          {
            type: "string",
            name: "step4Tag",
            label: "Step 4 Tagline",
            description: "e.g. 04 \u2794 Project Brief"
          },
          {
            type: "string",
            name: "step4Title",
            label: "Step 4 Question Title",
            description: "e.g. How can we help? *",
            required: true
          },
          {
            type: "string",
            name: "step4Placeholder",
            label: "Step 4 Field Placeholder",
            description: "e.g. Tell us about your event, dates, or visual goals..."
          },
          {
            type: "string",
            name: "step4HelpText",
            label: "Step 4 Guidance / AI Brief Tip Banner",
            description: "Helpful tip banner displayed above the brief input (welcoming ChatGPT drafts, event dates, etc.)",
            ui: {
              component: "textarea"
            }
          },
          // ─── 05. STEP 5: VERIFICATION & CONSENT ─────────────────────────
          {
            type: "string",
            name: "step5Tag",
            label: "Step 5 Tagline",
            description: "e.g. 05 \u2794 Verification & Consent"
          },
          {
            type: "string",
            name: "step5Title",
            label: "Step 5 Question Title",
            description: "e.g. Final Step *"
          },
          {
            type: "string",
            name: "gdprText",
            label: "GDPR Consent Statement",
            description: "Consent text shown next to the verification checkbox",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "submitButtonLabel",
            label: "Submit Button Text",
            description: "e.g. Submit Brief",
            required: true
          }
        ]
      },
      {
        name: "thankYouPage",
        label: "Thank You Page",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "thank-you"
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
            description: "Optimal length: 50\u201360 characters.",
            required: true
          },
          {
            type: "string",
            name: "seoDescription",
            label: "\u{1F50D} SEO Meta Description",
            description: "Optimal length: 140\u2013160 characters.",
            ui: {
              component: "textarea"
            },
            required: true
          },
          // ─── 🏷️ HERO & CONFIRMATION MESSAGE ────────────────────────────
          {
            type: "string",
            name: "statusBadge",
            label: "Status Badge Text",
            description: "Default: Brief Dispatch Confirmed \u2022 24hr Response"
          },
          {
            type: "string",
            name: "heading",
            label: "Main Headline",
            description: "Default: We've received your project brief.",
            required: true
          },
          {
            type: "string",
            name: "highlight",
            label: "Amber Gradient Highlight Words",
            description: "Words in headline to highlight with amber gradient (e.g. project brief.)"
          },
          {
            type: "string",
            name: "description",
            label: "Subtitle Reassurance Note",
            ui: {
              component: "textarea"
            }
          },
          // ─── 🛣️ 3-PHASE PRODUCTION ROADMAP ─────────────────────────────
          {
            type: "string",
            name: "phase1Tag",
            label: "Phase 1 Eyebrow Tag",
            description: "e.g. Phase 01 // Discovery"
          },
          {
            type: "string",
            name: "phase1Title",
            label: "Phase 1 Title",
            description: "e.g. Review & Needs"
          },
          {
            type: "string",
            name: "phase1Desc",
            label: "Phase 1 Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "phase2Tag",
            label: "Phase 2 Eyebrow Tag",
            description: "e.g. Phase 02 // Scoping"
          },
          {
            type: "string",
            name: "phase2Title",
            label: "Phase 2 Title",
            description: "e.g. Proposal & Quote"
          },
          {
            type: "string",
            name: "phase2Desc",
            label: "Phase 2 Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "phase3Tag",
            label: "Phase 3 Eyebrow Tag",
            description: "e.g. Phase 03 // Launch"
          },
          {
            type: "string",
            name: "phase3Title",
            label: "Phase 3 Title",
            description: "e.g. Calendar Lock"
          },
          {
            type: "string",
            name: "phase3Desc",
            label: "Phase 3 Description",
            ui: {
              component: "textarea"
            }
          },
          // ─── 🔘 ACTION BUTTONS ─────────────────────────────────────────
          {
            type: "string",
            name: "primaryBtnLabel",
            label: "Primary Button Text",
            description: "Default: Explore Recent Work"
          },
          {
            type: "string",
            name: "primaryBtnLink",
            label: "Primary Button Link",
            description: "Default: /work"
          },
          {
            type: "string",
            name: "secondaryBtnLabel",
            label: "Secondary Button Text",
            description: "Default: Back to Homepage"
          },
          {
            type: "string",
            name: "secondaryBtnLink",
            label: "Secondary Button Link",
            description: "Default: /"
          }
        ]
      },
      {
        name: "privacyPage",
        label: "Privacy & Cookie Policy",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "privacy"
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
            description: "Optimal length: 50\u201360 characters.",
            required: true
          },
          {
            type: "string",
            name: "seoDescription",
            label: "\u{1F50D} SEO Meta Description",
            description: "Optimal length: 140\u2013160 characters.",
            ui: {
              component: "textarea"
            },
            required: true
          },
          // ─── 🏷️ PAGE HEADER & BADGES ────────────────────────────────────
          {
            type: "string",
            name: "heroTag",
            label: "Eyebrow Tag",
            description: "Default: Legal & Compliance"
          },
          {
            type: "string",
            name: "heading",
            label: "Main Heading",
            description: "Default: Privacy & Cookie Policy",
            required: true
          },
          {
            type: "string",
            name: "lastUpdated",
            label: "Last Updated Date / Version Badge",
            description: "e.g. Updated June 2026 (DUAA 2025 Compliant)"
          },
          {
            type: "string",
            name: "introText",
            label: "Introductory Statement",
            ui: {
              component: "textarea"
            }
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
                label: `${item?.number || "Clause"} - ${item?.title || "Section"}`
              })
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "Section Anchor ID (slug)",
                description: "e.g. controller, data-collected, lawful-basis, cookies",
                required: true
              },
              {
                type: "string",
                name: "number",
                label: "Clause Number",
                description: "e.g. 01, 02, 03...",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Clause Title",
                required: true
              },
              {
                type: "string",
                name: "content",
                label: "Clause Content (Supports Markdown: **bold**, * bullet lists, 1. numbered lists)",
                ui: {
                  component: "textarea"
                },
                required: true
              }
            ]
          },
          // ─── 📞 COMPLIANCE DESK CONTACT CALLOUT ────────────────────────
          {
            type: "string",
            name: "deskTag",
            label: "Compliance Desk: Eyebrow Tag",
            description: "Default: Direct Data Rights & DUAA Enquiries"
          },
          {
            type: "string",
            name: "deskTitle",
            label: "Compliance Desk: Box Title",
            description: "Default: Need to exercise your statutory data rights?"
          },
          {
            type: "string",
            name: "deskDescription",
            label: "Compliance Desk: Subtitle / Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "deskEmailLabel",
            label: "Compliance Desk: Email Button Label",
            description: "Default: Email Data Desk"
          },
          {
            type: "string",
            name: "deskCustomEmail",
            label: "Compliance Desk: Dedicated Email (Optional)",
            description: "Leave empty to use the studio email (contact@filmeditrun.co.uk)"
          },
          {
            type: "string",
            name: "deskCustomPhone",
            label: "Compliance Desk: Dedicated Telephone (Optional)",
            description: "Leave empty to use main studio telephone"
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
          global: true,
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
            label: "\u{1F4DE} Contact Telephone Number (Optional)",
            description: "Leave empty to prevent cold calls and phone spam. Google Schema does NOT require a phone number."
          },
          {
            type: "string",
            name: "email",
            label: "\u2709\uFE0F Primary Contact Email (Optional)",
            description: "Optional email for Schema.org structured data. Leave empty if you only want inquiries through your contact form."
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
                description: "e.g. Cambridge Network, Google Business Profile, Vimeo, LinkedIn"
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
          global: true,
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
          global: true,
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
            name: "londonLink",
            label: "Col 3: London Link URL",
            description: "Default: /london"
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
            name: "studioStatusLabel",
            label: "Header Status Badge Label",
            description: "Default: Studio Status"
          },
          {
            type: "string",
            name: "studioStatus",
            label: "Header Status Badge Text",
            description: "Default: Accepting Commissions"
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
