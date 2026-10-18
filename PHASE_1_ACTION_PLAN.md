# 🎬 Phase 1 Master Action Plan & Pre-Launch Checklist
**Studio:** FilmEditRun  
**Lead:** Scott Sartain  
**Objective:** Finalize all website copy, imagery, and mobile interactions before public deployment to Cloudflare Pages.

---

## 📌 Executive Overview
Phase 1 ensures your digital storefront is polished, authentic, and high-converting. By completing this checklist locally in TinaCMS (`http://localhost:4322/admin`), you ensure that prospective clients, conference organizers, and brand leads experience a flawless, broadcast-grade presentation from the second you deploy.

---

## 🖼️ SECTION 1: Imagery, Media & Visual Assets Audit

Review and replace placeholder graphics with your authentic production imagery.

### 1.1 Video & Motion Assets
- [ ] **Work Page Hero Showreel (`/showreel.mp4`)**:
  - Location: `public/showreel.mp4`
  - Check: Ensure file size is optimized (recommended < 25MB for rapid initial loading).
  - Visual: Verify that the dark baseline `#0a0a0c` transitions seamlessly into the video loop.
- [ ] **Custom Page Video Embeds**:
  - If adding Vimeo/YouTube embeds or local video loops to custom landing pages, confirm aspect ratios (16:9 widescreen or 9:16 vertical reels) look sharp across desktop and mobile.

### 1.2 Photography & Team Stills
- [ ] **About Page Team & Studio Photography**:
  - Current File: `public/filmeditrun-team.avif`
  - TinaCMS Location: **Pages > About Page**
  - Check: Ensure your headshot / kit on-location photo renders crisply without cropping off critical framing.
- [ ] **Service Bento Cards & Narrative Images**:
  - Check that all service card visuals reflect your real kit (cinema cameras, audio gear, lighting setups) rather than generic stock footage.

### 1.3 Social Sharing & Branding Metadata
- [ ] **OpenGraph Social Preview Image (`og-image.jpg`)**:
  - Location: `public/og-image.jpg` (Dimensions: 1200 × 630 px)
  - What it does: This is the visual thumbnail displayed whenever someone shares `filmeditrun.co.uk` on LinkedIn, WhatsApp, X, or iMessage.
  - Action: Ensure it features the FilmEditRun branding, dark noir aesthetic, and punchy tagline.
- [ ] **Favicon & Apple Touch Icons**:
  - Verified: `public/favicon.svg`, `public/favicon.ico`, and `public/apple-touch-icon.png` (180 × 180 px) are in place.

---

## ✍️ SECTION 2: Page-by-Page Copywriting & Proofing (TinaCMS)

Log in to **`http://localhost:4322/admin`** to review and adjust every field.

### 2.1 Home Page (`src/content/pages/home.json`)
- [ ] **Hero Heading & Tagline**:
  - Ensure the dynamic gradient text punchily highlights your core offer (*"Single & multi-camera on-location filming"*).
- [ ] **Locations Strip**:
  - Confirms *"Cambridge • London • UK-Wide"*.
- [ ] **Slider & Client Proofing (`src/content/pages/slider.json`)**:
  - Review brand logos and client testimonials. Ensure all quotes sound natural and praise turnaround speed or camera quality.

### 2.2 Work & Production Archive (`src/content/pages/work.json`)
- [ ] **Featured Projects List**:
  - Double check project titles, client names, roles (e.g. Director, Cinematographer, Editor), and aspect tags.
- [ ] **Archive Visibility Toggle (`showArchive`)**:
  - In TinaCMS under **Work Page**, decide whether you want the lower production archive Bento grid visible (`true`) or hidden (`false`) for launch.

### 2.3 Services Directory (`src/content/services/*.json`)
Confirm your 5 core active service files accurately describe what you deliver:
1. [ ] **Live Event Coverage (`01-event-coverage.json`)**:
   - Multi-camera keynotes, attendee soundbites, rapid social recaps.
2. [ ] **Conference Production (`02-conference-production.json`)**:
   - Multi-room audio/visual capture, stage lighting integration, master slide deck synchronization.
3. [ ] **Corporate Brand Films (`03-corporate-brand.json`)**:
   - Narrative customer stories, recruitment films, executive interviews.
4. [ ] **Post-Production & Editorial (`04-post-production.json`)**:
   - Precision video editing, calibrated color grading, dialogue clarity & sound design.
5. [ ] **Video Podcast & Vodcast Production (`05-video-podcast-production.json`)**:
   - Multi-mic audio recording, multi-angle camera switching, vertical social shorts.

### 2.4 Location Landing Hubs (Local SEO Powerhouses)
- [ ] **Cambridge Hub (`src/content/pages/cambridge.json`)**:
  - Verify local venue mentions (e.g., Cambridge Science Park, University venues, tech clusters).
  - Review Cambridge-specific FAQs.
- [ ] **London Hub (`src/content/pages/london.json`)**:
  - Verify Central & Greater London field deployment copy (ExCeL, Olympia, Soho, Kings Cross).
  - Review London transport / rapid shoot mobilization FAQs.

### 2.5 About & Studio Manifesto (`src/content/pages/about.json`)
- [ ] **Scott Sartain Bio & Philosophy**:
  - Tell your story: agile, director-to-editor communication, zero bloated agency markups.
- [ ] **Equipment & Kit Philosophy**:
  - Confirms cinema-tier cameras, calibrated post-production finishing, and professional field audio.

### 2.6 Contact Experience & Project Brief Flow (`src/content/pages/contact.json`)
- [ ] **Step 1 (Introduce Yourself)**: Tagline and placeholder text.
- [ ] **Step 2 (Service Options Checkboxes)**: Confirms your 5 core service offerings.
- [ ] **Step 3 (Email & Reachable Contact)**: Placeholder formatting.
- [ ] **Step 4 (Project Brief & AI Guidance Note)**:
  - Verify the helper note: *"Have an AI-generated brief, ChatGPT storyboard, or draft dates? Paste it straight in..."*
- [ ] **Step 5 (Verification & GDPR Consent)**:
  - Links to `/privacy` policy.

---

## 📱 SECTION 3: Mobile Interaction & Responsiveness Testing

Test on your smartphone (`http://192.168.0.105:4322`) or in your browser using Device Mode (`Cmd + Option + I` -> `Cmd + Shift + M`).

### 3.1 Layout & Visual Integrity
- [ ] **No Horizontal Scroll Glitches**: Swipe horizontally on every page; confirm the screen doesn't shift sideways.
- [ ] **Header & Navigation Bar**:
  - Confirm the logo is sharp on retina displays.
  - Test menu button opening, navigation links, and closing.
- [ ] **Hero Showreel on Mobile**:
  - Confirm the video starts muted, loops cleanly, and has no white freeze on initial load.

### 3.2 Form Experience & Touch Ergonomics
- [ ] **Button Hit Targets**:
  - Check that *"Next →"*, *"← Back"*, and option checkboxes have generous touch padding (easy to tap with one thumb).
- [ ] **Virtual Keyboard Behavior**:
  - Tap into the text inputs and textarea; verify the screen does not zoom in excessively or break the header layout.
- [ ] **Enter Key Progression**:
  - On single-line inputs, pressing "Return" advances to the next step.
  - On the Step 4 brief textarea, pressing "Return" cleanly creates a new line.

### 3.3 Theme Dock & Contrast
- [ ] Open the floating theme switcher dock.
- [ ] Toggle between **Dark Noir**, **High-Key Light**, and **Supernova**.
- [ ] Confirm all text remains legible and high-contrast in each color mode.

---

## 🏁 SECTION 4: Phase 1 Completion & Sign-Off Checklist

Before proceeding to Phase 2 (Deploying to Cloudflare):

| Item | Requirement | Status |
| :--- | :--- | :---: |
| **All Copy Approved** | No placeholder text or typos across all pages | ⬜ |
| **Visuals Finalized** | Team photo, showreel, and OpenGraph image vetted | ⬜ |
| **Form Steps Tested** | Multi-step contact form submits cleanly to FormTorch | ⬜ |
| **Zero Errors Build** | Terminal confirms `npx astro build` passes in ~500ms with 0 errors | ⬜ |
| **Clean Git Tree** | All changes committed to local git | ⬜ |

***

### 🚀 What happens next?
Once every box above is ticked, you are 100% ready for **Phase 2: Connecting GitHub to Cloudflare Pages and launching `filmeditrun.co.uk` live to the world!**

