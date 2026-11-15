/**
 * Universal hero background darkening gradient calculator for FilmEditRun.
 * 
 * Supports:
 * - On / Off toggle in Tina CMS
 * - Granular 0% to 100% range slider (default: 50% - Light / Eased)
 * - Calibrated 3-point vertical curve:
 *   - 50% default maps to rgba(0,0,0,0.35) top -> rgba(0,0,0,0.45) middle -> rgba(0,0,0,0.80) bottom
 */

export function getHeroOverlayConfig(overlay?: string | null, amount?: number | string | null) {
  const isEnabled = overlay !== "off";
  const numAmount = amount !== undefined && amount !== null && amount !== "" && !isNaN(Number(amount))
    ? Math.max(0, Math.min(100, Number(amount)))
    : 50;

  const isVisible = isEnabled && numAmount > 0;

  // Calibrated non-linear curve matching approved studio aesthetic
  const top = (numAmount * 0.007).toFixed(3);
  const mid = (numAmount * 0.009).toFixed(3);
  const bottom = Math.min(1, 0.40 + numAmount * 0.008).toFixed(3);

  const style = `background: linear-gradient(to bottom, rgba(0,0,0,${top}) 0%, rgba(0,0,0,${mid}) 50%, rgba(0,0,0,${bottom}) 100%);`;

  return { isVisible, style, amount: numAmount };
}
