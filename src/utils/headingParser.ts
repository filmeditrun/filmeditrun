/**
 * Unified heading parser for FilmEditRun.
 * 
 * Rules for non-technical Tina CMS editing:
 * 1. *text* -> Amber gradient text (Hero & Statement highlights)
 * 2. _text_ -> Animated accent underline (In-Page Section headings)
 * 3. Press Enter (newline) or type // -> Responsive line break (<br class="hidden sm:inline" />)
 * 4. Backward compatibility:
 *    - In in-page sections, *text* defaults to animated underline if no _text_ is present.
 *    - Existing raw HTML <br class="hidden sm:inline" /> is preserved cleanly.
 *    - Trailing standalone * (e.g. required form fields) are preserved as styled asterisks.
 */

export function parseHeroHeading(text?: string | null): string {
  if (!text) return "";

  // 1. Line breaks: Normalize newlines, //, and existing <br> to responsive desktop line break
  let parsed = text
    .replace(/<br\s*class="[^"]*"\s*\/?>/gi, '<br class="hidden sm:inline" />')
    .replace(/<br\s*\/?>/gi, '<br class="hidden sm:inline" />')
    .replace(/\s*\/\/\s*/g, '<br class="hidden sm:inline" />')
    .replace(/\r?\n/g, '<br class="hidden sm:inline" />');

  // 2. Explicit underlines: _text_ -> animated accent underline
  parsed = parsed.replace(/_([^_]+)_/g, '<span class="animated-accent-underline">$1</span>');

  // 3. Highlights: *text* -> amber gradient text
  parsed = parsed.replace(/\*([^*\n]+)\*/g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">$1</span>');

  return parsed;
}

export function parseSectionHeading(text?: string | null): string {
  if (!text) return "";

  // 1. Line breaks: Normalize newlines, //, and existing <br>
  let parsed = text
    .replace(/<br\s*class="[^"]*"\s*\/?>/gi, '<br class="hidden sm:inline" />')
    .replace(/<br\s*\/?>/gi, '<br class="hidden sm:inline" />')
    .replace(/\s*\/\/\s*/g, '<br class="hidden sm:inline" />')
    .replace(/\r?\n/g, '<br class="hidden sm:inline" />');

  // 2. Check for explicit syntax
  const hasUnderscore = /_[^_]+_/.test(parsed);
  const hasAsterisk = /\*[^*]+\*/.test(parsed);

  if (hasUnderscore && hasAsterisk) {
    // Both: _text_ = underline, *text* = gradient highlight
    parsed = parsed.replace(/_([^_]+)_/g, '<span class="animated-accent-underline">$1</span>');
    parsed = parsed.replace(/\*([^*\n]+)\*/g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">$1</span>');
  } else if (hasUnderscore) {
    parsed = parsed.replace(/_([^_]+)_/g, '<span class="animated-accent-underline">$1</span>');
  } else if (hasAsterisk) {
    // Backward compatibility: *text* becomes animated underline on section headings
    parsed = parsed.replace(/\*([^*\n]+)\*/g, '<span class="animated-accent-underline">$1</span>');
  }

  // Handle single trailing asterisks on required fields (e.g. "What is your *name*? *")
  parsed = parsed.replace(/\s\*(?!\w)/g, ' <span class="text-amber-500 font-normal">*</span>');

  return parsed;
}

// Universal aliases for full backwards compatibility
export const parseHeading = parseHeroHeading;
export const parseHeadingWithLine = parseSectionHeading;
