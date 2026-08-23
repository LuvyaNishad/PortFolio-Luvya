/**
 * ─────────────────────────────────────────────────────────────
 *  ICON GENERATOR — run with:  node scripts/generate-icons.mjs
 * ─────────────────────────────────────────────────────────────
 *
 *  Builds every app icon from ONE definition so they can never
 *  drift apart:
 *
 *    src/app/icon.png        32×32   browser tab
 *    src/app/apple-icon.png  180×180 iOS home screen
 *    src/app/favicon.ico     32×32   legacy / crawler requests
 *
 *  The "LN" monogram is drawn as plain vector rectangles rather
 *  than <text>, so rendering never depends on a font being
 *  installed on whatever machine runs this script.
 *
 *  Editing the mark: change ACCENT / BG below, or the glyph
 *  coordinates in GLYPH, then re-run. Next.js picks the files up
 *  automatically — no code changes needed anywhere else.
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const APP_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "app");

const BG = "#0a0a0c"; // charcoal — matches the site background
const FG = "#f2f2f4"; // near-white monogram
const ACCENT = "#c5261a"; // muted tactical red

/* "LN" drawn on a 512×512 grid. Stroke weight 40, glyph band y 150→362.
   Nudged up 22px so the letters plus the accent rule are optically centred. */
const GLYPH = `
  <g transform="translate(0,-22)">
    <rect x="112" y="150" width="40"  height="212" fill="${FG}"/>
    <rect x="112" y="322" width="120" height="40"  fill="${FG}"/>
    <rect x="272" y="150" width="40"  height="212" fill="${FG}"/>
    <rect x="376" y="150" width="40"  height="212" fill="${FG}"/>
    <polygon points="312,150 352,150 416,362 376,362" fill="${FG}"/>
    <rect x="112" y="402" width="304" height="24" fill="${ACCENT}"/>
  </g>
`;

/** @param {number} radius corner rounding on the 512 grid (0 = square) */
const svg = (radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${radius}" ry="${radius}" fill="${BG}"/>
  ${radius > 0 ? `<rect x="10" y="10" width="492" height="492" rx="${Math.max(radius - 10, 0)}" ry="${Math.max(radius - 10, 0)}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="14"/>` : ""}
  ${GLYPH}
</svg>`;

const png = (radius, size) =>
  sharp(Buffer.from(svg(radius))).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/** Wrap a 32×32 PNG in an ICO container (PNG-in-ICO, supported since Vista). */
function pngToIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width  (0 means 256)
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette size
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // payload size
  entry.writeUInt32LE(22, 12); // payload offset (6 + 16)

  return Buffer.concat([header, entry, pngBuffer]);
}

const icon32 = await png(64, 32);
const apple180 = await png(0, 180);

writeFileSync(join(APP_DIR, "icon.png"), icon32);
writeFileSync(join(APP_DIR, "apple-icon.png"), apple180);
writeFileSync(join(APP_DIR, "favicon.ico"), pngToIco(icon32, 32));

console.log("icon.png       32x32   ", icon32.length, "bytes");
console.log("apple-icon.png 180x180 ", apple180.length, "bytes");
console.log("favicon.ico    32x32   ", icon32.length + 22, "bytes");
