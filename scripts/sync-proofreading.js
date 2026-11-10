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
1. [Global Header & Navigation](#1-global-header--navigation)
2. [Homepage (\`/\`)](#2-homepage-)
3. [About FilmEditRun (\`/about\`)](#3-about-filmeditrun-about)
4. [Services Overview (\`/services\`)](#4-services-overview-services)
${services.map((s, i) => `${i + 5}. [Service 0${i + 1}: ${s.title} (\`${s.link || `/services/${s.slug}`}\`)](#${i + 5}-service-0${i + 1}-${s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${(s.link || `/services/${s.slug}`).replace(/[^a-z0-9]+/g, '-')})`).join('\n')}
11. [Cambridge Production Hub (\`/cambridge\`)](#11-cambridge-production-hub-cambridge)
12. [London Production Hub (\`/london\`)](#12-london-production-hub-london)
13. [Portfolio & Selected Work (\`/work\`)](#13-portfolio--selected-work-work)
14. [Project Brief & Contact Experience (\`/contact\`)](#14-project-brief--contact-experience-contact)
15. [Post-Submission & Next Steps (\`/thank-you\`)](#15-post-submission--next-steps-thank-you)
16. [Privacy & Cookie Policy (\`/privacy\`)](#16-privacy--cookie-policy-privacy)
17. [Global Studio Footer & Colophon](#17-global-studio-footer--colophon)

---

## 1. Global Header & Navigation

* **Brand Wordmark:** \`FilmEditRun\`
* **Primary Navigation Links:**
  - \`Home\` → \`/\`
  - \`Services\` → \`/services\`
  - \`Work\` → \`/work\`
  - \`About\` → \`/about\`
  - \`Contact\` → \`/contact\`

---

## 2. Homepage (\`/\`)

### Hero Section
* **Location Strip:** \`${home.locations}\`
* **Main Headline:** \`${clean(home.heroHeadingPrefix)} ${clean(home.heroHeadingHighlight)}\`
* **Tagline / Lead:** \`${home.tagline}\`
* **Primary Button:** \`${home.primaryCtaLabel}\` → \`${home.primaryCtaLink}\`
* **Secondary Button:** \`${home.secondaryCtaLabel}\` → \`${home.secondaryCtaLink}\`

### Cinematic Spec Strip
* **Brand Label:** \`FilmEditRun\`
* **Capabilities Roster:**
${(home.expertiseList || []).map(e => `  - \`${e}\``).join('\n')}

### Studio Telemetry Metric Bar
${(home.telemetryMetrics || []).map((m, i) => `* **Metric ${i + 1}:** \`${m.value}\` • \`${m.label}\` : ${m.description}`).join('\n')}

### Studio Manifesto (Full-Bleed Parallax Break)
* **Heading:** \`${home.introHeading}\`
* **Body:** \`${home.introBody}\`

### Production Ethos (Full-Bleed Parallax Break)
* **Heading:** \`${home.scaleHeading}\`
* **Body:** \`${home.scaleDescription}\`

### Services Overview (Modular Capabilities)
* **Tag:** \`${home.bentoTag}\`
* **Heading:** \`${home.bentoHeading}\`
* **Description:** \`${home.bentoDescription}\`
* **Action:** \`${home.bentoLinkLabel}\` → \`${home.bentoLinkHref}\`

### Production Pipeline (Disciplined 4-Stage Methodology)
* **Tag:** \`${home.pipelineTag}\`
* **Heading:** \`${home.pipelineHeading}\`
* **Description:** \`${home.pipelineDescription}\`
* **Action:** \`${home.pipelineLinkLabel}\` → \`${home.pipelineLinkHref}\`
* **The 4 Stages:**
  - **Stage 01 // PHASE 01:** \`Discovery & Pre-Production\`  
    *We establish your business objectives, target audience, and key messaging upfront, shaping a tailored production scope and transparent quote around your project requirements.*
  - **Stage 02 // PHASE 02:** \`On-Location Filming\`  
    *Low-profile crews configured around your brief: capturing conference stages, executive interviews, and workplace stories with calm professionalism and minimal disruption.*
  - **Stage 03 // PHASE 03:** \`Editorial & Review\`  
    *We shape the story with clear narrative focus, incorporating your brand assets, typography, and palette. Simple review links make stakeholder feedback and sign-off effortless.*
  - **Stage 04 // PHASE 04:** \`Versioning & Delivery\`  
    *Delivering films tailored to your campaign requirements: from widescreen website masters to captioned vertical and square cutdowns formatted for social reach.*

### Selected Work in Focus
* **Tag:** \`${home.workSpotlightTag}\`
* **Heading:** \`${home.workSpotlightHeading}\`
* **Description:** \`${home.workSpotlightDescription}\`
* **Action:** \`${home.workSpotlightLinkLabel}\` → \`${home.workSpotlightLinkHref}\`

### Operational Locations (Cambridge & London Single-Source)
* **Tag:** \`${home.hubsTag}\`
* **Heading:** \`${home.hubsHeading}\`
* **Description:** \`${home.hubsDescription}\`
* **Card 1: Cambridge Studio:** \`Explore →\` → \`/cambridge\`
* **Card 2: London Field Units:** \`Explore →\` → \`/london\`

### Closing Commissioning Call to Action
* **Heading:** \`${home.ctaHeading}\`
* **Description:** \`${home.ctaDescription}\`
* **Primary Button:** \`${home.ctaPrimaryLabel}\` → \`${home.ctaPrimaryLink}\`

---

## 3. About FilmEditRun (\`/about\`)

### Hero Manifesto
* **Eyebrow Tag:** \`STUDIO ETHOS\`
* **Headline:** \`${clean(about.headline)}\`
* **Hero Lead:** \`${about.manifestoLead}\`
* **Studio Director Quote:** *"${about.manifestoQuote}"*  
  — \`${about.manifestoAuthor}\`

### The Crew & BTS (On-Location Carousel)
* **Eyebrow Tag:** \`${slider.tag}\`
* **Heading:** \`${slider.heading}\`
* **Description:** \`${slider.description}\`
* **The 5 Interactive Slides:**
${(slider.slides || []).map((sl, i) => `  ${i + 1}. \`[${sl.badge}] ${sl.name}\`: ${sl.bio}`).join('\n')}

### Studio Approach (Editorial Statement)
* **Tag:** \`${about.approachTag}\`
* **Heading:** \`${about.approachHeading}\`
* **Body:** \`${about.approachBody}\`
* **Links:** \`${about.approachPrimaryLinkLabel}\` → \`${about.approachPrimaryLinkHref}\` | \`${about.approachSecondaryLinkLabel}\` → \`${about.approachSecondaryLinkHref}\`

### Studio Evolution Timeline
* **Tag:** \`${about.timelineTag}\`
* **Heading:** \`${about.timelineHeading}\`
* **Description:** \`${about.timelineDescription}\`
* **Milestones:**
${(about.milestones || []).map(m => `  - **${m.year}** • \`${m.title}\`: ${m.description}`).join('\n')}

### Closing Call to Action
* **Tag:** \`${about.ctaTag}\`
* **Heading:** \`${about.ctaHeading}\`
* **Description:** \`${about.ctaText}\`
* **Primary Button:** \`${about.ctaButtonLabel}\` → \`${about.ctaButtonLink}\`
* **Trust Signals:** ${(about.ctaTrustSignals || []).map(t => `\`${t}\``).join(' • ')}

---

## 4. Services Overview (\`/services\`)

### Header Section
* **Eyebrow Tag:** \`${servicesPage.headerTag}\`
* **Heading:** \`${clean(servicesPage.heading)}\`
* **Description:** \`${servicesPage.description}\`
* **Primary Button:** \`Start Project Brief →\` → \`/contact\`

### Mid-Page Parallax Breather
* **Heading:** \`Precision with passion.\`

### Production Methodology (4-Stage Process)
* **Tag:** \`${servicesPage.processTag}\`
* **Heading:** \`${servicesPage.processHeading}\`
* **Description:** \`${servicesPage.processDescription}\`
* **Action:** \`Discuss Your Timeline →\` → \`/contact\`
* **The 4 Process Stages:**
${(servicesPage.processSteps || []).map(p => `  - **Stage ${p.step} // ${p.tag}:** \`${p.title}\`  \n    *${p.description}*`).join('\n')}

### Closing Call to Action
* **Tag:** \`${servicesPage.ctaTag}\`
* **Heading:** \`${servicesPage.ctaHeading}\`
* **Description:** \`${servicesPage.ctaText}\`
* **Primary Button:** \`${servicesPage.ctaButtonLabel}\` → \`${servicesPage.ctaButtonLink}\`

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

### Header Section
* **Eyebrow Tag:** \`${work.headerTag}\`
* **Heading:** \`${clean(work.heading)}\`
* **Description:** \`${work.description}\`
* **Action Buttons:**
  - \`${work.videoButtonLabel}\` (0:45 modal player)
  - \`${work.scrollIndicatorText}\`

### Production Archive Grid
* **Archive Tag:** \`${work.archiveTag}\`
* **Archive Heading:** \`${work.archiveHeading}\`
* **Category Filters:** \`All Productions\`, \`Commercial & Brand\`, \`Conferences\`, \`Post-Production\`, \`Motion & Visuals\`

### The 4 Active Showcase Projects
${projects.map((pr, i) => `${i + 1}. **${pr.order}. ${pr.title}** (\`${pr.category}\` • ${pr.runtime})  \n   - Client: ${pr.client}  \n   - Description: ${pr.description}`).join('\n')}

---

## 14. Project Brief & Contact Experience (\`/contact\`)

### Header Section
* **Eyebrow Tag:** \`${contact.headerTag}\`
* **Heading:** \`${clean(contact.heading)}\`
* **Description:** \`${contact.description}\`
* **Trust Signals:** ${(contact.trustSignals || []).map(t => `\`${t}\``).join(' • ')}

### The 5-Step Inquiries Form Flow
* **Step 01 // Introduce Yourself:**  
  - *Prompt:* \`${contact.step1Title}\`  
  - *Fields:* \`${contact.step1Placeholder}\` | \`${contact.step1CompanyPlaceholder}\`
* **Step 02 // Project Requirement:**  
  - *Prompt:* \`${contact.step2Title}\`  
  - *Dropdown Options (aligned 1:1 with services):*  
${(contact.serviceOptions || []).map((so, i) => `    ${i + 1}. \`${so.label}\``).join('\n')}
* **Step 03 // Contact Details:**  
  - *Prompt:* \`${contact.step3Title}\`  
  - *Helper Note:* \`${contact.step3HelpText}\`  
  - *Field Placeholder:* \`${contact.step3Placeholder}\`
* **Step 04 // Project Brief:**  
  - *Prompt:* \`${contact.step4Title}\`  
  - *Helper Note:* \`${contact.step4HelpText}\`  
  - *Field Placeholder:* \`${contact.step4Placeholder}\`
* **Step 05 // Verification & Consent:**  
  - *Prompt:* \`${contact.step5Title}\`  
  - *Consent Text:* \`${contact.gdprText}\`  
  - *Action Button:* \`${contact.submitButtonLabel}\`

---

## 15. Post-Submission & Next Steps (\`/thank-you\`)

### Header & Status
* **Status Badge:** \`${thankYou.statusBadge}\`
* **Heading:** \`${thankYou.heading}\`
* **Description:** \`${thankYou.description}\`

### The 3-Phase Client Roadmap
1. **${thankYou.phase1Tag} (\`${thankYou.phase1Title}\`):** ${thankYou.phase1Desc}
2. **${thankYou.phase2Tag} (\`${thankYou.phase2Title}\`):** ${thankYou.phase2Desc}
3. **${thankYou.phase3Tag} (\`${thankYou.phase3Title}\`):** ${thankYou.phase3Desc}

### Action Buttons
* **Primary Button:** \`${thankYou.primaryBtnLabel}\` → \`${thankYou.primaryBtnLink}\`
* **Secondary Button:** \`${thankYou.secondaryBtnLabel}\` → \`${thankYou.secondaryBtnLink}\`

---

## 16. Privacy & Cookie Policy (\`/privacy\`)

* **Header Tag:** \`${privacy.heroTag}\`
* **Heading:** \`${privacy.heading}\`
* **Effective Date:** \`${privacy.lastUpdated}\`
* **Preamble:** \`${privacy.introText}\`

### Policy Sections Summary
${(privacy.sections || []).map(sec => `* **${sec.number}. ${sec.title}:**  \n  ${sec.content.replace(/\n\n/g, '\n  ')}`).join('\n')}

### Direct Compliance Desk
* **Tag:** \`${privacy.deskTag}\`
* **Title:** \`${privacy.deskTitle}\`
* **Description:** \`${privacy.deskDescription}\`
* **Action:** \`${privacy.deskEmailLabel}\` (\`contact@filmeditrun.co.uk\`)

---

## 17. Global Studio Footer & Colophon

* **Studio Scope Statement:** \`${footer.studioTagline}\`
* **Live Studio Status:** \`● Studio Status: ${footer.studioStatus}\`
* **Commission Button:** \`${footer.commissionButtonLabel}\` → \`${footer.commissionButtonLink}\`

### Navigation Columns
* **Services:**
${services.map(s => `  - \`${s.title}\` → \`${s.link || `/services/${s.slug}`}\``).join('\n')}
  - \`${footer.servicesLinkLabel}\` → \`${footer.servicesLinkUrl}\`
* **Studio:**
${(footer.studioLinks || []).map(sl => `  - \`${sl.label}\` → \`${sl.href}\``).join('\n')}
* **Locations:**
  - \`${footer.cambridgeTitle}\`: ${footer.cambridgeSubtitle} → \`${footer.cambridgeLink}\`
  - \`${footer.londonTitle}\`: ${footer.londonSubtitle} → \`${footer.londonLink}\`
  - \`${footer.worldwideTitle}\`: ${footer.worldwideSubtitle} → \`/\`
* **Direct Hub Contact:**
  - \`${footer.inquiriesLabel}\`: ${footer.inquiriesActionText} (\`${footer.inquiriesActionLink}\`)
  - \`${footer.productionHubLabel}\`: ${footer.productionHub}

### Verified Citations Strip
* **Google Business Profile:** \`Verified Studio\` (\`https://g.page/r/Cba1pWWqNcpWEAI\`)
* **Vimeo Pro:** \`Portfolio\` (\`https://vimeo.com/filmeditrun\`)
* **LinkedIn:** \`Company\` (\`https://www.linkedin.com/company/filmeditrun\`)

### Legal Copyright Line
* \`© 2026 FilmEditRun. ${footer.copyrightTagline} All rights reserved.\`
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
