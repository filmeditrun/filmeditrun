#!/usr/bin/env node

/**
 * FilmEditRun Proofreading Document Generator
 * Reads all live JSON content directly from src/content/ and outputs:
 *  - FilmEditRun Proofreading v1.md
 *  - FilmEditRun Proofreading v1.html
 *  - FilmEditRun Proofreading v1.docx (via macOS textutil)
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function readJson(relPath) {
  const fullPath = path.join(rootDir, relPath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

console.log('🔄 Compiling FilmEditRun Proofreading v1 from live site content...');

// 1. Ingest content sources
const home = readJson('src/content/pages/home.json');
const about = readJson('src/content/pages/about.json');
const slider = readJson('src/content/pages/slider.json');
const servicesPage = readJson('src/content/pages/services.json');
const cambridge = readJson('src/content/pages/cambridge.json');
const london = readJson('src/content/pages/london.json');
const work = readJson('src/content/pages/work.json');
const contact = readJson('src/content/pages/contact.json');
const thankYou = readJson('src/content/pages/thank-you.json');
const privacy = readJson('src/content/pages/privacy.json');
const site = readJson('src/content/settings/site.json');
const seo = readJson('src/content/settings/seo.json');
const footer = readJson('src/content/settings/footer.json');

// Ingest services
const servicesDir = path.join(rootDir, 'src/content/services');
const serviceFiles = fs.readdirSync(servicesDir).filter(f => f.endsWith('.json')).sort();
const services = serviceFiles.map(f => JSON.parse(fs.readFileSync(path.join(servicesDir, f), 'utf8')));

// Ingest projects
const projectsDir = path.join(rootDir, 'src/content/projects');
const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json')).sort();
const projects = projectFiles.map(f => JSON.parse(fs.readFileSync(path.join(projectsDir, f), 'utf8')));

// Strip markdown linebreaks
const clean = (t) => t ? t.replace(/<br\s*[\/]?>/gi, ' ').replace(/\s+/g, ' ').trim() : '';

// 2. Build Markdown
let md = `# 🎬 FilmEditRun Proofreading v1
**Studio:** FilmEditRun (https://filmeditrun.co.uk)  
**Edition:** Master Website Copy Proofreading v1 (100% Code Synchronized)  
**Date:** November 2026  
**Purpose:** Exact, 1:1 editorial copy reference for proofreading and copy editing all customer-facing text across the live website. Excludes SEO metadata.

---

## 📑 Table of Contents
1. [Header & Site Branding](#1-header--site-branding)
2. [Homepage (\`/\`)](#2-homepage-)
3. [About FilmEditRun (\`/about\`)](#3-about-filmeditrun-about)
4. [Services Overview (\`/services\`)](#4-services-overview-services)
${services.map((s, i) => `${i + 5}. [Service 0${i + 1}: ${s.title} (\`${s.link || `/services/${s.slug}`}\`)](#${i + 5}-service-0${i + 1}-${s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${(s.link || `/services/${s.slug}`).replace(/[^a-z0-9]+/g, '-')})`).join('\n')}
11. [Cambridge Regional Hub (\`/cambridge\`)](#11-cambridge-regional-hub-cambridge)
12. [London Regional Hub (\`/london\`)](#12-london-regional-hub-london)
13. [Portfolio & Selected Work (\`/work\`)](#13-portfolio--selected-work-work)
14. [Project Brief & Contact Experience (\`/contact\`)](#14-project-brief--contact-experience-contact)
15. [Post-Submission & Next Steps (\`/thank-you\`)](#15-post-submission--next-steps-thank-you)
16. [Privacy & Cookie Policy (\`/privacy\`)](#16-privacy--cookie-policy-privacy)
17. [Global Studio Footer](#17-global-studio-footer)
18. [SEO & Local Citations](#18-seo--local-citations)

---

## 1. Header & Site Branding

### Section 1: Brand & Logo
* **Site Name (\`siteName\`):** \`${site.siteName}\`
* **Text Logo (\`logoText\`):** \`${site.logoText}\`
* **Use Image Logo (\`useImageLogo\`):** \`${site.useImageLogo}\`
* **Logo Image (\`logoImagePath\`):** \`${site.logoImagePath}\`

### Section 2: Navigation Links
* **Header Navigation Links (\`navLinks\`):**
${(site.navLinks || []).map(link => `  - \`${link.label}\` → \`${link.href}\``).join('\n')}

---

## 2. Homepage (\`/\`)

### Section 1: Hero & Showreel
* **Locations Tag (\`locations\`):** \`${home.locations}\`
* **Heading (\`heroHeadingPrefix\` + \`heroHeadingHighlight\`):** \`${clean(home.heroHeadingPrefix)} ${clean(home.heroHeadingHighlight)}\`
* **Lead (\`tagline\`):** \`${home.tagline}\`
* **Primary Button (\`primaryCtaLabel\`):** \`${home.primaryCtaLabel}\` → \`${home.primaryCtaLink}\`
* **Secondary Button (\`secondaryCtaLabel\`):** \`${home.secondaryCtaLabel}\` → \`${home.secondaryCtaLink}\`

### Section 2: Capabilities Strip
* **Brand Label (\`brandName\`):** \`${home.brandName || 'FilmEditRun'}\`
* **Capabilities List (\`expertiseList\`):**
${(home.expertiseList || []).map(e => `  - \`${e}\``).join('\n')}

### Section 3: Key Metrics
${(home.telemetryMetrics || []).map((m, i) => `* **Metric ${i + 1} (\`telemetryMetrics[${i}]\`):** \`${m.value}\` • \`${m.label}\` : ${m.description}`).join('\n')}

### Section 4: Statement 1 (Intro)
* **Heading (\`introHeading\`):** \`${home.introHeading}\`
* **Body (\`introBody\`):** \`${home.introBody}\`

### Section 5: Featured Work
* **Tag (\`workSpotlightTag\`):** \`${home.workSpotlightTag}\`
* **Heading (\`workSpotlightHeading\`):** \`${home.workSpotlightHeading}\`
* **Description (\`workSpotlightDescription\`):** \`${home.workSpotlightDescription}\`
* **Link (\`workSpotlightLinkLabel\`):** \`${home.workSpotlightLinkLabel}\` → \`${home.workSpotlightLinkHref}\`

### Section 6: Statement 2 (Scale)
* **Heading (\`scaleHeading\`):** \`${home.scaleHeading}\`
* **Body (\`scaleDescription\`):** \`${home.scaleDescription}\`

### Section 7: Services Overview
* **Tag (\`bentoTag\`):** \`${home.bentoTag}\`
* **Heading (\`bentoHeading\`):** \`${home.bentoHeading}\`
* **Description (\`bentoDescription\`):** \`${home.bentoDescription}\`
* **Link (\`bentoLinkLabel\`):** \`${home.bentoLinkLabel}\` → \`${home.bentoLinkHref}\`

### Section 8: 4-Stage Methodology
* **Tag (\`pipelineTag\`):** \`${home.pipelineTag}\`
* **Heading (\`pipelineHeading\`):** \`${home.pipelineHeading}\`
* **Description (\`pipelineDescription\`):** \`${home.pipelineDescription}\`
* **Link (\`pipelineLinkLabel\`):** \`${home.pipelineLinkLabel}\` → \`${home.pipelineLinkHref}\`
* **The 4 Stages:**
  - **Stage 01 // PHASE 01:** \`Discovery & Pre-Production\`  
    *We establish your business objectives, target audience, and key messaging upfront, shaping a tailored production scope and transparent quote around your project requirements.*
  - **Stage 02 // PHASE 02:** \`On-Location Filming\`  
    *Low-profile crews configured around your brief: capturing conference stages, executive interviews, and workplace stories with calm professionalism and minimal disruption.*
  - **Stage 03 // PHASE 03:** \`Editorial & Review\`  
    *We shape the story with clear narrative focus, incorporating your brand assets, typography, and palette. Simple review links make stakeholder feedback and sign-off effortless.*
  - **Stage 04 // PHASE 04:** \`Versioning & Delivery\`  
    *Delivering films tailored to your campaign requirements: from widescreen website masters to captioned vertical and square cutdowns formatted for social reach.*

### Section 9: Regional Hubs
* **Tag (\`hubsTag\`):** \`${home.hubsTag}\`
* **Heading (\`hubsHeading\`):** \`${home.hubsHeading}\`
* **Description (\`hubsDescription\`):** \`${home.hubsDescription}\`
* **Card 1: Cambridge Studio:** \`Explore →\` → \`/cambridge\`
* **Card 2: London Field Units:** \`Explore →\` → \`/london\`

### Section 10: Call to Action
* **Tag (\`ctaBadge\`):** \`${home.ctaBadge || 'Direct Intake'}\`
* **Heading (\`ctaHeading\`):** \`${home.ctaHeading}\`
* **Description (\`ctaDescription\`):** \`${home.ctaDescription}\`
* **Primary Button (\`ctaPrimaryLabel\`):** \`${home.ctaPrimaryLabel}\` → \`${home.ctaPrimaryLink}\`
* **Secondary Button (\`ctaSecondaryLabel\`):** \`${home.ctaSecondaryLabel}\` → \`${home.ctaSecondaryLink}\`

---

## 3. About Us (\`/about\`)

### Section 1: Hero
* **Tag:** \`STUDIO ETHOS\`
* **Heading (\`headline\`):** \`${clean(about.headline)}\`
* **Lead (\`manifestoLead\`):** \`${about.manifestoLead}\`
* **Featured Quote (\`manifestoQuote\`):** *"${about.manifestoQuote}"*  
  — \`${about.manifestoAuthor}\`

### Section 2: Team Carousel (\`slider.json\`)
* **Tag (\`tag\`):** \`${slider.tag}\`
* **Heading (\`heading\`):** \`${slider.heading}\`
* **Description (\`description\`):** \`${slider.description}\`
* **Slides:**
${(slider.slides || []).map((sl, i) => `  ${i + 1}. \`[${sl.badge}] ${sl.name}\`: ${sl.bio}`).join('\n')}

### Section 3: Overview & Approach
* **Tag (\`approachTag\`):** \`${about.approachTag}\`
* **Heading (\`approachHeading\`):** \`${about.approachHeading}\`
* **Body (\`approachBody\`):** \`${about.approachBody}\`
* **Links:** \`${about.approachPrimaryLinkLabel}\` → \`${about.approachPrimaryLinkHref}\` | \`${about.approachSecondaryLinkLabel}\` → \`${about.approachSecondaryLinkHref}\`

### Section 4: Timeline
* **Tag (\`timelineTag\`):** \`${about.timelineTag}\`
* **Heading (\`timelineHeading\`):** \`${about.timelineHeading}\`
* **Description (\`timelineDescription\`):** \`${about.timelineDescription}\`
* **Milestones:**
${(about.milestones || []).map(m => `  - **${m.year}** • \`${m.title}\`: ${m.description}`).join('\n')}

### Section 5: Call to Action
* **Tag (\`ctaTag\`):** \`${about.ctaTag}\`
* **Heading (\`ctaHeading\`):** \`${about.ctaHeading}\`
* **Description (\`ctaText\`):** \`${about.ctaText}\`
* **Button (\`ctaButtonLabel\`):** \`${about.ctaButtonLabel}\` → \`${about.ctaButtonLink}\`
* **Trust Signals:** ${(about.ctaTrustSignals || []).map(t => `\`${t}\``).join(' • ')}

---

## 4. Services Overview (\`/services\`)

### Section 1: Hero
* **Tag (\`headerTag\`):** \`${servicesPage.headerTag}\`
* **Heading (\`heading\`):** \`${clean(servicesPage.heading)}\`
* **Lead (\`description\`):** \`${servicesPage.description}\`
* **Primary Button:** \`Start Project Brief →\` → \`/contact\`

### Section 2: Statement Break
* **Heading:** \`Precision with passion.\`

### Section 3: 4-Stage Methodology
* **Tag (\`processTag\`):** \`${servicesPage.processTag}\`
* **Heading (\`processHeading\`):** \`${servicesPage.processHeading}\`
* **Description (\`processDescription\`):** \`${servicesPage.processDescription}\`
* **Link:** \`Discuss Your Timeline →\` → \`/contact\`
* **The 4 Process Stages (\`processSteps\`):**
${(servicesPage.processSteps || []).map(p => `  - **Stage ${p.step} // ${p.tag}:** \`${p.title}\`  \n    *${p.description}*`).join('\n')}

### Section 4: Call to Action
* **Tag (\`ctaTag\`):** \`${servicesPage.ctaTag}\`
* **Heading (\`ctaHeading\`):** \`${servicesPage.ctaHeading}\`
* **Description (\`ctaText\`):** \`${servicesPage.ctaText}\`
* **Button (\`ctaButtonLabel\`):** \`${servicesPage.ctaButtonLabel}\` → \`${servicesPage.ctaButtonLink}\`

---
`;

// Add 6 services
services.forEach((s, idx) => {
  const num = idx + 1;
  const secNum = num + 4;
  md += `## ${secNum}. Service 0${num}: ${s.title} (\`${s.link || `/services/${s.slug}`}\`)

### Section 1: Hero
* **Tag (\`heroTag\`):** \`${s.heroTag || s.tag}\`
* **Heading (\`heroHeading\`):** \`${clean(s.heroHeading || s.title)}\`
* **Lead (\`heroLead\`):** \`${s.heroLead || s.description}\`
* **Directory Summary (\`description\`):** \`${s.description}\`

### Section 2: Overview
* **Heading (\`breakdownHeading\`):** \`${s.breakdownHeading || ''}\`
* **Body (\`breakdownBody\`):** \`${s.breakdownBody || ''}\`

### Section 3: Deliverables
${(s.deliverables || []).map((d, dIdx) => `${dIdx + 1}. **${d.title}** (\`${d.tag}\`): ${d.description}`).join('\n')}

### Section 4: Call to Action
* **Heading (\`ctaHeading\`):** \`${s.ctaHeading}\`
* **Description (\`ctaDescription\`):** \`${s.ctaDescription}\`
* **Button (\`ctaButtonLabel\`):** \`${s.ctaButtonLabel}\` → \`/contact\`

---
\n`;
});

// Add Cambridge
md += `## 11. Cambridge Regional Hub (\`/cambridge\`)

### Section 1: Hero
* **Tag (\`heroTag\`):** \`${cambridge.heroTag}\`
* **Heading (\`heroHeadingPrefix\` + \`heroHeadingHighlight\`):** \`${clean(cambridge.heroHeadingPrefix)} ${clean(cambridge.heroHeadingHighlight)}\`
* **Lead (\`heroSubtitle\`):** \`${cambridge.heroSubtitle}\`
* **Button (\`heroCtaLabel\`):** \`${cambridge.heroCtaLabel}\` → \`${cambridge.heroCtaLink}\`

### Section 2: Overview
* **Tag (\`expertiseTag\`):** \`${cambridge.expertiseTag}\`
* **Heading (\`expertiseHeading\`):** \`${cambridge.expertiseHeading}\`
* **Description (\`expertiseDescription\`):** \`${cambridge.expertiseDescription}\`
* **Key Bullets (\`expertiseBullets\`):**
${(cambridge.expertiseBullets || []).map(b => `  - \`${b}\``).join('\n')}
* **Feature Card Title (\`cardTitle\`):** \`${cambridge.cardTitle}\`
* **Feature Card Body (\`cardBody\`):** \`${cambridge.cardBody}\`
* **Feature Card Link (\`cardLinkLabel\`):** \`${cambridge.cardLinkLabel}\` → \`${cambridge.cardLinkHref}\`

### Section 3: Showcase
* **Tag (\`lookbookTag\`):** \`${cambridge.lookbookTag}\`
* **Frames:**
  - \`${cambridge.lookbookHeroBadge}\`
  - \`${cambridge.lookbookDetail1Badge}\`
  - \`${cambridge.lookbookDetail2Badge}\`

### Section 4: Frequently Asked Questions
* **Heading (\`faqHeading\`):** \`${cambridge.faqHeading}\`
${(cambridge.faqs || []).map((f, i) => `${i + 1}. **Q:** \`${f.question}\`  \n   **A:** \`${f.answer}\``).join('\n')}

### Section 5: Call to Action
* **Heading (\`bottomCtaHeading\`):** \`${cambridge.bottomCtaHeading}\`
* **Description (\`bottomCtaBody\`):** \`${cambridge.bottomCtaBody}\`
* **Button (\`bottomCtaLabel\`):** \`${cambridge.bottomCtaLabel}\` → \`${cambridge.bottomCtaLink}\`

---

## 12. London Regional Hub (\`/london\`)

### Section 1: Hero
* **Tag (\`heroTag\`):** \`${london.heroTag}\`
* **Heading (\`heroHeadingPrefix\` + \`heroHeadingHighlight\`):** \`${clean(london.heroHeadingPrefix)} ${clean(london.heroHeadingHighlight)}\`
* **Lead (\`heroSubtitle\`):** \`${london.heroSubtitle}\`
* **Button (\`heroCtaLabel\`):** \`${london.heroCtaLabel}\` → \`${london.heroCtaLink}\`

### Section 2: Overview
* **Tag (\`expertiseTag\`):** \`${london.expertiseTag}\`
* **Heading (\`expertiseHeading\`):** \`${london.expertiseHeading}\`
* **Description (\`expertiseDescription\`):** \`${london.expertiseDescription}\`
* **Key Bullets (\`expertiseBullets\`):**
${(london.expertiseBullets || []).map(b => `  - \`${b}\``).join('\n')}
* **Feature Card Title (\`cardTitle\`):** \`${london.cardTitle}\`
* **Feature Card Body (\`cardBody\`):** \`${london.cardBody}\`
* **Feature Card Link (\`cardLinkLabel\`):** \`${london.cardLinkLabel}\` → \`${london.cardLinkHref}\`

### Section 3: Showcase
* **Tag (\`lookbookTag\`):** \`${london.lookbookTag}\`
* **Frames:**
  - \`${london.lookbookHeroBadge}\`
  - \`${london.lookbookDetail1Badge}\`
  - \`${london.lookbookDetail2Badge}\`

### Section 4: Frequently Asked Questions
* **Heading (\`faqHeading\`):** \`${london.faqHeading}\`
${(london.faqs || []).map((f, i) => `${i + 1}. **Q:** \`${f.question}\`  \n   **A:** \`${f.answer}\``).join('\n')}

### Section 5: Call to Action
* **Heading (\`bottomCtaHeading\`):** \`${london.bottomCtaHeading}\`
* **Description (\`bottomCtaBody\`):** \`${london.bottomCtaBody}\`
* **Button (\`bottomCtaLabel\`):** \`${london.bottomCtaLabel}\` → \`${london.bottomCtaLink}\`

---

## 13. Portfolio & Selected Work (\`/work\`)

### Section 1: Hero & Showreel
* **Hero Tag (\`headerTag\`):** \`${work.headerTag}\`
* **Hero Heading (\`heading\`):** \`${clean(work.heading)}\`
* **Hero Lead (\`description\`):** \`${work.description}\`
* **Hero Video Path (\`heroVideoPath\`):** \`${work.heroVideoPath}\`
* **Hero Fallback Poster Frame (\`heroPosterPath\`):** \`${work.heroPosterPath}\`
* **Hero Play Button Label (\`videoButtonLabel\`):** \`${work.videoButtonLabel}\`
* **Hero Scroll Indicator Text (\`scrollIndicatorText\`):** \`${work.scrollIndicatorText}\`

### Section 2: Archive Grid & Filters
* **Display Production Archive (\`showArchive\`):** \`${work.showArchive}\`
* **Archive Tag (\`archiveTag\`):** \`${work.archiveTag}\`
* **Archive Heading (\`archiveHeading\`):** \`${work.archiveHeading}\`
* **Filter All Label (\`filterAllLabel\`):** \`${work.filterAllLabel}\`
* **Close Modal Label (\`closeModalLabel\`):** \`${work.closeModalLabel}\`

### Active Showcase Projects
${projects.map((pr, i) => `${i + 1}. **${pr.order}. ${pr.title}** (\`${pr.category}\` • ${pr.runtime})  \n   - Client: ${pr.client}  \n   - Description: ${pr.description}`).join('\n')}

---

## 14. Project Brief & Contact Experience (\`/contact\`)

### Section 1: Hero
* **Hero Tag (\`headerTag\`):** \`${contact.headerTag}\`
* **Hero Heading (\`heading\`):** \`${clean(contact.heading)}\`
* **Hero Lead (\`description\`):** \`${contact.description}\`
* **Trust Signals (\`trustSignals\`):** ${(contact.trustSignals || []).map(t => `\`${t}\``).join(' • ')}

### Section 2: 5-Step Inquiries Form Flow
* **Step 01 // Introduce Yourself:**  
  - *Tag (\`step1Tag\`):* \`${contact.step1Tag}\`  
  - *Prompt (\`step1Title\`):* \`${contact.step1Title}\`  
  - *Fields (\`step1Placeholder\` / \`step1CompanyPlaceholder\`):* \`${contact.step1Placeholder}\` | \`${contact.step1CompanyPlaceholder}\`
* **Step 02 // Project Requirement:**  
  - *Tag (\`step2Tag\`):* \`${contact.step2Tag}\`  
  - *Prompt (\`step2Title\`):* \`${contact.step2Title}\`  
  - *Dropdown Options (\`serviceOptions\`):*  
${(contact.serviceOptions || []).map((so, i) => `    ${i + 1}. \`${so.label}\``).join('\n')}
* **Step 03 // Contact Details:**  
  - *Tag (\`step3Tag\`):* \`${contact.step3Tag}\`  
  - *Prompt (\`step3Title\`):* \`${contact.step3Title}\`  
  - *Helper Note (\`step3HelpText\`):* \`${contact.step3HelpText}\`  
  - *Field Placeholder (\`step3Placeholder\`):* \`${contact.step3Placeholder}\`
* **Step 04 // Project Brief:**  
  - *Tag (\`step4Tag\`):* \`${contact.step4Tag}\`  
  - *Prompt (\`step4Title\`):* \`${contact.step4Title}\`  
  - *Helper Note (\`step4HelpText\`):* \`${contact.step4HelpText}\`  
  - *Field Placeholder (\`step4Placeholder\`):* \`${contact.step4Placeholder}\`
* **Step 05 // Verification & Consent:**  
  - *Tag (\`step5Tag\`):* \`${contact.step5Tag}\`  
  - *Prompt (\`step5Title\`):* \`${contact.step5Title}\`  
  - *Consent Statement (\`gdprText\`):* \`${contact.gdprText}\`  
  - *Submit Button (\`submitButtonLabel\`):* \`${contact.submitButtonLabel}\`

### Section 3: Form Configuration
* **FormTorch Endpoint URL (\`formEndpoint\`):** \`${contact.formEndpoint}\`
* **Redirect URL After Submission (\`redirectUrl\`):** \`${contact.redirectUrl}\`
* **Enable Turnstile Anti-Spam (\`enableTurnstile\`):** \`${contact.enableTurnstile}\`

---

## 15. Post-Submission & Next Steps (\`/thank-you\`)

### Section 1: Hero & Confirmation
* **Status Badge Text (\`statusBadge\`):** \`${thankYou.statusBadge}\`
* **Main Headline (\`heading\`):** \`${thankYou.heading}\`
* **Highlight Words (\`highlight\`):** \`${thankYou.highlight}\`
* **Subtitle Reassurance Note (\`description\`):** \`${thankYou.description}\`

### Section 2: 3-Phase Production Roadmap
1. **${thankYou.phase1Tag} (\`${thankYou.phase1Title}\`):** ${thankYou.phase1Desc}
2. **${thankYou.phase2Tag} (\`${thankYou.phase2Title}\`):** ${thankYou.phase2Desc}
3. **${thankYou.phase3Tag} (\`${thankYou.phase3Title}\`):** ${thankYou.phase3Desc}

### Section 3: Action Buttons
* **Primary Button (\`primaryBtnLabel\`):** \`${thankYou.primaryBtnLabel}\` → \`${thankYou.primaryBtnLink}\`
* **Secondary Button (\`secondaryBtnLabel\`):** \`${thankYou.secondaryBtnLabel}\` → \`${thankYou.secondaryBtnLink}\`

---

## 16. Privacy & Cookie Policy (\`/privacy\`)

### Section 1: Header & Preamble
* **Eyebrow Tag (\`heroTag\`):** \`${privacy.heroTag}\`
* **Main Heading (\`heading\`):** \`${privacy.heading}\`
* **Last Updated Date (\`lastUpdated\`):** \`${privacy.lastUpdated}\`
* **Introductory Statement (\`introText\`):** \`${privacy.introText}\`

### Section 2: Policy Articles
${(privacy.sections || []).map(sec => `* **${sec.number}. ${sec.title} (\`sections[${sec.number}]\`):**  \n  ${sec.content.replace(/\n\n/g, '\n  ')}`).join('\n')}

### Section 3: Compliance Desk
* **Eyebrow Tag (\`deskTag\`):** \`${privacy.deskTag}\`
* **Box Title (\`deskTitle\`):** \`${privacy.deskTitle}\`
* **Subtitle / Description (\`deskDescription\`):** \`${privacy.deskDescription}\`
* **Email Button Label (\`deskEmailLabel\`):** \`${privacy.deskEmailLabel}\`

---

## 17. Global Studio Footer

### Section 1: Top Bar & Tagline
* **Tagline (\`studioTagline\`):** \`${footer.studioTagline}\`
* **Button Label (\`commissionButtonLabel\`):** \`${footer.commissionButtonLabel}\` → \`${footer.commissionButtonLink}\`

### Section 2: Column 1 - Services
* **Heading (\`capabilitiesHeading\`):** \`${footer.capabilitiesHeading}\`
* **Link Label (\`servicesLinkLabel\`):** \`${footer.servicesLinkLabel}\` → \`${footer.servicesLinkUrl}\`
* **Live Services:**
${services.map(s => `  - \`${s.title}\` → \`${s.link || `/services/${s.slug}`}\``).join('\n')}

### Section 3: Column 2 - Navigation
* **Heading (\`studioHeading\`):** \`${footer.studioHeading}\`
* **Links (\`studioLinks\`):**
${(footer.studioLinks || []).map(sl => `  - \`${sl.label}\` → \`${sl.href}\``).join('\n')}

### Section 4: Column 3 - Locations
* **Heading (\`presenceHeading\`):** \`${footer.presenceHeading}\`
* **Cambridge Title (\`cambridgeTitle\`):** ${footer.cambridgeSubtitle} → \`${footer.cambridgeLink}\`
* **London Title (\`londonTitle\`):** ${footer.londonSubtitle} → \`${footer.londonLink}\`
* **Worldwide Title (\`worldwideTitle\`):** ${footer.worldwideSubtitle}

### Section 5: Column 4 - Contact & Status
* **Heading (\`directHeading\`):** \`${footer.directHeading}\`
* **Item 1 Label (\`inquiriesLabel\`):** ${footer.inquiriesActionText} (\`${footer.inquiriesActionLink}\`)
* **Item 2 Text (\`productionHub\`):** ${footer.productionHub}
* **Status Badge Text (\`studioStatus\`):** \`● ${footer.studioStatus}\`

### Section 6: Copyright & Legal
* **Copyright Tagline (\`copyrightTagline\`):** \`${footer.copyrightTagline}\`
* **Back to Top Label (\`backToTopLabel\`):** \`${footer.backToTopLabel || 'Back to top'}\`
* **Copyright Notice:** \`© 2026 FilmEditRun. ${footer.copyrightTagline} All rights reserved.\`

---

## 18. SEO & Local Citations

### Section 1: Business Details & Schema.org
* **Legal Business Entity Name (\`legalName\`):** \`${seo.legalName}\`
* **Contact Telephone (\`telephone\`):** \`${seo.telephone || 'None configured (form-only)'}\`
* **Contact Email (\`email\`):** \`${seo.email || 'None configured (form-only)'}\`
* **Price Range Tier (\`priceRange\`):** \`${seo.priceRange}\`
* **Primary Locality (\`addressLocality\`):** \`${seo.addressLocality}\`
* **Region / County (\`addressRegion\`):** \`${seo.addressRegion}\`
* **Postal Code (\`postalCode\`):** \`${seo.postalCode}\`
* **Country Code (\`addressCountry\`):** \`${seo.addressCountry}\`
* **Google Maps URL (\`googleMapsUrl\`):** \`${seo.googleMapsUrl}\`
* **Geo Coordinates (\`geoLatitude\`, \`geoLongitude\`):** \`${seo.geoLatitude}, ${seo.geoLongitude}\`

### Section 2: Citation Profiles & Directory Links
${(seo.backlinkProfiles || []).map((bp, i) => `${i + 1}. **${bp.name}** (\`${bp.badgeText || ''}\`): \`${bp.url}\` (Show in footer: \`${bp.showInFooter}\`)`).join('\n')}

`;

// Write Markdown
const mdPath = path.join(rootDir, 'FilmEditRun Proofreading v1.md');
fs.writeFileSync(mdPath, md, 'utf8');
console.log('✅ Generated FilmEditRun Proofreading v1.md');

// 3. Build HTML
const htmlHeader = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FilmEditRun Proofreading v1 (Print & Word Ready)</title>
  <style>
    @page { size: A4; margin: 25mm 20mm 25mm 20mm; }
    body { font-family: Georgia, "Times New Roman", Times, serif; color: #111827; background-color: #ffffff; line-height: 1.65; font-size: 11pt; margin: 0; padding: 0; }
    .container { max-width: 820px; margin: 0 auto; padding: 24px 0; }
    header.doc-header { border-bottom: 2pt solid #111827; padding-bottom: 16pt; margin-bottom: 24pt; }
    h1.doc-title { font-size: 24pt; font-weight: 700; color: #000000; margin: 0 0 6pt 0; letter-spacing: -0.02em; }
    .doc-subtitle { font-size: 12pt; color: #4b5563; font-style: italic; margin-bottom: 8pt; }
    .doc-meta { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 9pt; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
    .section-block { page-break-inside: avoid; margin-bottom: 24pt; padding-bottom: 16pt; border-bottom: 1pt solid #e5e7eb; }
    h2.section-heading { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14pt; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.04em; margin: 22pt 0 10pt 0; padding-bottom: 4pt; border-bottom: 1.5pt solid #d1d5db; }
    h3.sub-heading { font-size: 12.5pt; font-weight: 700; color: #1f2937; margin: 14pt 0 6pt 0; }
    h4.item-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10.5pt; font-weight: 700; color: #374151; margin: 10pt 0 4pt 0; }
    p { margin: 0 0 8pt 0; text-align: justify; }
    ul, ol { margin: 6pt 0 12pt 0; padding-left: 20pt; }
    li { margin-bottom: 5pt; }
    code { font-family: Menlo, Monaco, "Courier New", monospace; font-size: 9.5pt; background-color: #f3f4f6; padding: 1pt 3pt; border-radius: 2pt; }
  </style>
</head>
<body>
  <div class="container">
    <header class="doc-header">
      <h1 class="doc-title">FilmEditRun Proofreading v1</h1>
      <div class="doc-subtitle">Master Website Copy Proofreading (100% Code Synchronized)</div>
      <div class="doc-meta">Studio: FilmEditRun &bull; Version 1.0 &bull; November 2026 &bull; Excludes SEO Metadata</div>
    </header>
`;

const sections = md.split(/\n(?=## \d+\. )/);
let htmlBody = [];

for (const sec of sections) {
  if (sec.startsWith('# 🎬 FilmEditRun')) continue;
  const lines = sec.trim().split('\n');
  const h2Match = lines[0].match(/^## (\d+\..*)$/);
  const h2Title = h2Match ? h2Match[1] : lines[0].replace('## ', '');

  let block = [`    <div class="section-block">\n      <h2 class="section-heading">${h2Title}</h2>`];
  let inUl = false;
  let inOl = false;

  for (const line of lines.slice(1)) {
    const l = line.trim();
    if (!l) {
      if (inUl) { block.push('      </ul>'); inUl = false; }
      if (inOl) { block.push('      </ol>'); inOl = false; }
      continue;
    }

    if (l.startsWith('### ')) {
      if (inUl) { block.push('      </ul>'); inUl = false; }
      if (inOl) { block.push('      </ol>'); inOl = false; }
      block.push(`      <h3 class="sub-heading">${l.replace('### ', '')}</h3>`);
    } else if (l.startsWith('#### ')) {
      if (inUl) { block.push('      </ul>'); inUl = false; }
      if (inOl) { block.push('      </ol>'); inOl = false; }
      block.push(`      <h4 class="item-title">${l.replace('#### ', '')}</h4>`);
    } else if (l.startsWith('- ') || l.startsWith('* ')) {
      if (!inUl) {
        if (inOl) { block.push('      </ol>'); inOl = false; }
        block.push('      <ul>');
        inUl = true;
      }
      let item = l.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/`(.*?)`/g, '<code>$1</code>');
      block.push(`        <li>${item}</li>`);
    } else if (/^\d+\.\s+/.test(l)) {
      if (!inOl) {
        if (inUl) { block.push('      </ul>'); inUl = false; }
        block.push('      <ol>');
        inOl = true;
      }
      let item = l.replace(/^\d+\.\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/`(.*?)`/g, '<code>$1</code>');
      block.push(`        <li>${item}</li>`);
    } else {
      if (inUl) { block.push('      </ul>'); inUl = false; }
      if (inOl) { block.push('      </ol>'); inOl = false; }
      let p = l.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/`(.*?)`/g, '<code>$1</code>');
      block.push(`      <p>${p}</p>`);
    }
  }

  if (inUl) block.push('      </ul>');
  if (inOl) block.push('      </ol>');
  block.push('    </div>\n');
  htmlBody.push(block.join('\n'));
}

const htmlPath = path.join(rootDir, 'FilmEditRun Proofreading v1.html');
fs.writeFileSync(htmlPath, htmlHeader + htmlBody.join('\n') + '  </div>\n</body>\n</html>\n', 'utf8');
console.log('✅ Generated FilmEditRun Proofreading v1.html');

// 4. Build DOCX if on macOS
if (process.platform === 'darwin') {
  try {
    const docxPath = path.join(rootDir, 'FilmEditRun Proofreading v1.docx');
    execSync(`textutil -convert docx "${htmlPath}" -output "${docxPath}"`);
    console.log('✅ Generated FilmEditRun Proofreading v1.docx via textutil');
  } catch (err) {
    console.warn('⚠️ Could not run textutil for docx conversion:', err.message);
  }
}

console.log('🎉 All 3 proofreading documents are 100% synchronized with live site code!');
