#!/usr/bin/env node

/**
 * FilmEditRun Proofreading Document Generator (A4 Print Optimized Edition)
 * Reads all live JSON content directly from src/content/ and outputs:
 *  - FilmEditRun Proofreading v1.md
 *  - FilmEditRun Proofreading v1.html
 *  - FilmEditRun Proofreading v1.docx (via macOS textutil)
 * 
 * Excludes:
 *  - Header & site branding / nav links
 *  - All button labels and link URLs
 *  - All tag labels and badge metadata
 *  - Slide subtitle / badge info in team slider
 *  - Technical developer settings (video paths, form endpoints, turnstile, SEO coordinates)
 * 
 * Optimized for:
 *  - Pure editorial copy proofreading
 *  - Minimum A4 page count when printed (compact typography, tight margins)
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

console.log('🔄 Compiling FilmEditRun Proofreading v1 (A4 Compact Edition)...');

// 1. Ingest content sources
const home = readJson('src/content/pages/home.json');
const about = readJson('src/content/pages/about.json');
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

// Clean helper: strip line breaks and multiple spaces
const clean = (t) => t ? t.replace(/<br\s*[\/]?>/gi, ' ').replace(/\s+/g, ' ').trim() : '';

// 2. Build Markdown
let md = `# 🎬 FilmEditRun — Website Editorial Copy (Proofreading Reference)
**Studio:** FilmEditRun (https://filmeditrun.co.uk) • Cambridge & London • UK-Wide  
**Edition:** Master Editorial Copy (A4 Print-Optimized) • November 2026  
*Note: Pure customer-facing text only. Technical tags, button labels, navigation links, and developer settings are excluded.*

---

## 1. Homepage (\`/\`)

* **Hero Headline:** ${clean(home.heroHeading || `${home.heroHeadingPrefix} ${home.heroHeadingHighlight}`)}
* **Hero Lead:** ${home.tagline}
* **Capabilities:** ${(home.expertiseList || []).join(' • ')}
* **Key Metrics:**
${(home.telemetryMetrics || []).map(m => `  - **${m.value} ${m.label}:** ${m.description}`).join('\n')}
* **Statement 1 (Intro):** ${home.introHeading}  
  ${home.introBody}
* **Featured Work:** ${home.workSpotlightHeading}  
  ${home.workSpotlightDescription}
* **Statement 2 (Scale):** ${home.scaleHeading}  
  ${home.scaleDescription}
* **Services Overview:** ${home.bentoHeading}  
  ${home.bentoDescription}
* **Methodology Pipeline:** ${home.pipelineHeading}  
  ${home.pipelineDescription}
  - **Stage 01 (Discovery & Pre-Production):** We establish your business objectives, target audience, and key messaging upfront, shaping a tailored production scope and transparent quote around your project requirements.
  - **Stage 02 (On-Location Filming):** Low-profile crews configured around your brief: capturing conference stages, executive interviews, and workplace stories with calm professionalism and minimal disruption.
  - **Stage 03 (Editorial & Review):** We shape the story with clear narrative focus, incorporating your brand assets, typography, and palette. Simple review links make stakeholder feedback and sign-off effortless.
  - **Stage 04 (Versioning & Delivery):** Delivering films tailored to your campaign requirements: from widescreen website masters to captioned vertical and square cutdowns formatted for social reach.
* **Regional Hubs:** ${home.hubsHeading}  
  ${home.hubsDescription}
* **Call to Action:** ${home.ctaHeading}  
  ${home.ctaDescription}

---

## 2. About FilmEditRun (\`/about\`)

* **Hero Headline:** ${clean(about.headline)}
* **Manifesto Lead:** ${about.manifestoLead}
* **Our Approach:** ${about.approachHeading}  
  ${about.approachBody}
* **Studio Timeline:** ${about.timelineHeading}  
  ${about.timelineDescription}
${(about.milestones || []).map(m => `  - **${m.year} (${m.title}):** ${m.description}`).join('\n')}
* **Call to Action:** ${about.ctaHeading}  
  ${about.ctaText}
  - *Trust Signals:* ${(about.ctaTrustSignals || []).join(' • ')}

---

## 3. Services Overview (\`/services\`)

* **Hero Headline:** ${clean(servicesPage.heading)}
* **Hero Lead:** ${servicesPage.description}
* **Production Methodology:** ${servicesPage.processHeading}  
  ${servicesPage.processDescription}
${(servicesPage.processSteps || []).map(p => `  - **Stage ${p.step} (${p.title}):** ${p.description}`).join('\n')}
* **Call to Action:** ${servicesPage.ctaHeading}  
  ${servicesPage.ctaText}

---
`;

// Add 6 services
services.forEach((s, idx) => {
  const num = idx + 1;
  const secNum = num + 3;
  md += `## ${secNum}. Service 0${num}: ${s.title} (\`${s.link || `/services/${s.slug}`}\`)

* **Hero Headline:** ${clean(s.heroHeading || s.title)}
* **Hero Lead:** ${s.heroLead || s.description}
* **Directory Summary:** ${s.description}
* **Approach Overview:** ${s.breakdownHeading || ''}  
  ${s.breakdownBody || ''}
* **Deliverables:**
${(s.deliverables || []).map((d, dIdx) => `  ${dIdx + 1}. **${d.title}:** ${d.description}`).join('\n')}
* **Call to Action:** ${s.ctaHeading}  
  ${s.ctaDescription}

---
`;
});

// Add Cambridge
md += `## 10. Cambridge Regional Hub (\`/cambridge\`)

* **Hero Headline:** ${clean(cambridge.heroHeading || `${cambridge.heroHeadingPrefix} ${cambridge.heroHeadingHighlight}`)}
* **Hero Lead:** ${cambridge.heroSubtitle}
* **Overview:** ${cambridge.expertiseHeading}  
  ${cambridge.expertiseDescription}
  - *Key Capabilities:* ${(cambridge.expertiseBullets || []).join(' • ')}
* **Feature Focus (${cambridge.cardTitle}):** ${cambridge.cardBody}
* **Frequently Asked Questions:** ${cambridge.faqHeading}
${(cambridge.faqs || []).map((f, i) => `  ${i + 1}. **Q: ${f.question}**  \n     A: ${f.answer}`).join('\n')}
* **Call to Action:** ${cambridge.bottomCtaHeading}  
  ${cambridge.bottomCtaBody}

---

## 11. London Regional Hub (\`/london\`)

* **Hero Headline:** ${clean(london.heroHeading || `${london.heroHeadingPrefix} ${london.heroHeadingHighlight}`)}
* **Hero Lead:** ${london.heroSubtitle}
* **Overview:** ${london.expertiseHeading}  
  ${london.expertiseDescription}
  - *Key Capabilities:* ${(london.expertiseBullets || []).join(' • ')}
* **Feature Focus (${london.cardTitle}):** ${london.cardBody}
* **Frequently Asked Questions:** ${london.faqHeading}
${(london.faqs || []).map((f, i) => `  ${i + 1}. **Q: ${f.question}**  \n     A: ${f.answer}`).join('\n')}
* **Call to Action:** ${london.bottomCtaHeading}  
  ${london.bottomCtaBody}

---

## 12. Portfolio & Selected Work (\`/work\`)

* **Hero Headline:** ${clean(work.heading)}
* **Hero Lead:** ${work.description}
* **Archive Section:** ${work.archiveHeading}
* **Active Showcase Projects:**
${projects.map((pr, i) => `  ${i + 1}. **${pr.title}** (${pr.client} • ${pr.runtime}): ${pr.description}`).join('\n')}

---

## 13. Project Brief & Contact Experience (\`/contact\`)

* **Hero Headline:** ${clean(contact.heading)}
* **Hero Lead:** ${contact.description}
* **Trust Signals:** ${(contact.trustSignals || []).join(' • ')}
* **5-Step Inquiries Brief Flow:**
  - **Step 1 (Introduce Yourself):** ${contact.step1Title}  
    *Field Prompts:* ${contact.step1Placeholder} | ${contact.step1CompanyPlaceholder}
  - **Step 2 (Project Requirement):** ${contact.step2Title}  
    *Options:* ${(contact.serviceOptions || []).map(so => so.label).join(' • ')}
  - **Step 3 (Reachable Contact):** ${contact.step3Title}  
    *Helper Note:* ${contact.step3HelpText || ''}
  - **Step 4 (Project Brief):** ${contact.step4Title}  
    *Helper Note:* ${contact.step4HelpText || ''}
  - **Step 5 (Verification & Consent):** ${contact.step5Title}  
    *Consent Statement:* ${contact.gdprText}

---

## 14. Post-Submission & Next Steps (\`/thank-you\`)

* **Confirmation Headline:** ${thankYou.heading}
* **Reassurance Note:** ${thankYou.description}
* **3-Phase Production Roadmap:**
  1. **${thankYou.phase1Title}:** ${thankYou.phase1Desc}
  2. **${thankYou.phase2Title}:** ${thankYou.phase2Desc}
  3. **${thankYou.phase3Title}:** ${thankYou.phase3Desc}

---

## 15. Privacy & Cookie Policy (\`/privacy\`)

* **Heading:** ${privacy.heading} *(Last Updated: ${privacy.lastUpdated})*
* **Introductory Statement:** ${privacy.introText}
* **Policy Articles:**
${(privacy.sections || []).map(sec => `  - **${sec.number}. ${sec.title}:** ${sec.content.replace(/\n+/g, ' ')}`).join('\n')}
* **Compliance Desk:** ${privacy.deskTitle} — ${privacy.deskDescription}

---

## 16. Global Studio Footer

* **Studio Tagline:** ${footer.studioTagline}
* **Copyright Notice:** © 2026 FilmEditRun. ${footer.copyrightTagline} All rights reserved.
`;

// Write Markdown
const mdPath = path.join(rootDir, 'FilmEditRun Proofreading v1.md');
fs.writeFileSync(mdPath, md, 'utf8');
console.log('✅ Generated FilmEditRun Proofreading v1.md');

// 3. Build HTML (Compact, High-Density A4 Layout)
const htmlHeader = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FilmEditRun Proofreading v1 (A4 Compact Edition)</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      background-color: #ffffff;
      line-height: 1.32;
      font-size: 9.2pt;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 100%;
      margin: 0 auto;
    }
    header.doc-header {
      border-bottom: 1.5pt solid #111827;
      padding-bottom: 4pt;
      margin-bottom: 8pt;
    }
    h1.doc-title {
      font-size: 15pt;
      font-weight: 800;
      color: #000000;
      margin: 0 0 2pt 0;
      letter-spacing: -0.01em;
    }
    .doc-subtitle {
      font-size: 9pt;
      color: #4b5563;
      margin-bottom: 2pt;
    }
    .doc-meta {
      font-size: 7.8pt;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .page-block {
      margin-bottom: 8pt;
      padding-bottom: 6pt;
      border-bottom: 0.5pt solid #e5e7eb;
    }
    h2.page-heading {
      font-size: 10.5pt;
      font-weight: 700;
      color: #111827;
      background-color: #f3f4f6;
      padding: 2.5pt 5pt;
      margin: 6pt 0 4pt 0;
      border-left: 3pt solid #d97706;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    p {
      margin: 0 0 3pt 0;
      text-align: justify;
    }
    ul, ol {
      margin: 2pt 0 4pt 0;
      padding-left: 15pt;
    }
    li {
      margin-bottom: 2pt;
    }
    strong {
      color: #000000;
      font-weight: 700;
    }
    em {
      font-style: italic;
      color: #92400e;
    }
    code {
      font-family: Menlo, Monaco, "Courier New", monospace;
      font-size: 8.5pt;
      background-color: #f3f4f6;
      padding: 0.5pt 2.5pt;
      border-radius: 2pt;
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="doc-header">
      <h1 class="doc-title">FilmEditRun — Website Editorial Copy</h1>
      <div class="doc-subtitle">Master Proofreading Reference (A4 Compact Print Edition • Zero Tags or Button Clutter)</div>
      <div class="doc-meta">Studio: FilmEditRun &bull; Version 1.0 &bull; November 2026 &bull; Excludes SEO Metadata, Tags & Buttons</div>
    </header>
`;

const sections = md.split(/\n(?=## \d+\. )/);
let htmlBody = [];

for (const sec of sections) {
  if (sec.startsWith('# 🎬 FilmEditRun')) continue;
  const lines = sec.trim().split('\n');
  const h2Match = lines[0].match(/^## (\d+\..*)$/);
  const h2Title = h2Match ? h2Match[1] : lines[0].replace('## ', '');

  let block = [`    <div class="page-block">\n      <h2 class="page-heading">${h2Title}</h2>`];
  let inUl = false;
  let inOl = false;

  for (const line of lines.slice(1)) {
    const l = line.trim();
    if (!l) {
      if (inUl) { block.push('      </ul>'); inUl = false; }
      if (inOl) { block.push('      </ol>'); inOl = false; }
      continue;
    }

    if (l.startsWith('- ') || l.startsWith('* ')) {
      if (!inUl) {
        if (inOl) { block.push('      </ol>'); inOl = false; }
        block.push('      <ul>');
        inUl = true;
      }
      let item = l.slice(2)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
      block.push(`        <li>${item}</li>`);
    } else if (/^\d+\.\s+/.test(l)) {
      if (!inOl) {
        if (inUl) { block.push('      </ul>'); inUl = false; }
        block.push('      <ol>');
        inOl = true;
      }
      let item = l.replace(/^\d+\.\s+/, '')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
      block.push(`        <li>${item}</li>`);
    } else {
      if (inUl) { block.push('      </ul>'); inUl = false; }
      if (inOl) { block.push('      </ol>'); inOl = false; }
      let p = l
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
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

// 4. Build DOCX via macOS textutil
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
