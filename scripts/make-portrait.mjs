// npm run portrait
// Builds every portrait image the site uses from the transparent cut-out in content/originals/photo/:
//   fahad-figure  — the whole figure, trimmed (hero card, About card)
//   fahad-arch    — head to waist at 0.77 width/height (kept for share images / older layouts)
//   fahad-avatar  — head-and-shoulders square, 160 px and 320 px
// The cut-out's edge is cleaned first: semi-transparent edge pixels still carry the old background colour,
// so they are recoloured from the figure's interior and the mask is tightened by about a pixel.
// To swap the photo: cut out the new one (transparent PNG), point SOURCE at it, run `npm run portrait`.
import sharp from "sharp";

const SOURCE = "content/originals/photo/fahad-v2-cutout-raw.png";
const OUT = "public/media/portrait";

const { data: px, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const N = W * H;
const one = async (pipe) => {
  const { data, info: i } = await pipe.raw().toBuffer({ resolveWithObject: true });
  if (i.channels === 1) return data;
  const o = Buffer.alloc(N);
  for (let k = 0; k < N; k++) o[k] = data[k * i.channels];
  return o;
};
const alpha = Buffer.alloc(N);
for (let k = 0; k < N; k++) alpha[k] = px[k * 4 + 3];
const rawA = () => sharp(alpha, { raw: { width: W, height: H, channels: 1 } });

// Interior colour, bled outward: blur(rgb · inside) / blur(inside)
const deep = await one(rawA().blur(4));
const inside = Buffer.alloc(N);
const premul = Buffer.alloc(N * 3);
for (let k = 0; k < N; k++) {
  inside[k] = deep[k] > 250 ? 255 : 0;
  for (let c = 0; c < 3; c++) premul[k * 3 + c] = inside[k] ? px[k * 4 + c] : 0;
}
const bp = await sharp(premul, { raw: { width: W, height: H, channels: 3 } }).blur(6).raw().toBuffer();
const ba = await one(sharp(inside, { raw: { width: W, height: H, channels: 1 } }).blur(6));
const tight = await one(rawA().blur(1.2).linear(2.2, -1.2 * 255).blur(0.6));
const zone = await one(sharp(tight, { raw: { width: W, height: H, channels: 1 } }).blur(3));

const out = Buffer.alloc(N * 4);
for (let k = 0; k < N; k++) {
  const t = zone[k] >= 252 ? 0 : Math.min(1, (252 - zone[k]) / 60 + 0.35);
  for (let c = 0; c < 3; c++) {
    let v = px[k * 4 + c];
    if (t > 0 && ba[k] > 8) v = v * (1 - t) + Math.min(255, (bp[k * 3 + c] * 255) / ba[k]) * t;
    out[k * 4 + c] = Math.round(v);
  }
  out[k * 4 + 3] = tight[k];
}
const clean = await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();

// Bounding box of the figure
let x0 = W, y0 = H, x1 = 0, y1 = 0;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++)
    if (tight[y * W + x] > 16) {
      x0 = Math.min(x0, x);
      x1 = Math.max(x1, x);
      y0 = Math.min(y0, y);
      y1 = Math.max(y1, y);
    }
const fw = x1 - x0 + 1, fh = y1 - y0 + 1;

async function write(name, pipe) {
  const buf = await pipe.png().toBuffer();
  await sharp(buf).webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/${name}.webp`);
  await sharp(buf).avif({ quality: 62 }).toFile(`${OUT}/${name}.avif`);
  const m = await sharp(buf).metadata();
  console.log(`✓ ${OUT}/${name} — ${m.width} × ${m.height}`);
}

// Whole figure
await write("fahad-figure", sharp(clean).extract({ left: x0, top: y0, width: fw, height: fh }).resize({ width: Math.min(fw, 900), withoutEnlargement: true }));

// Head to waist, arch proportions (0.77), head centred near the top
const archW = Math.round(fw * 0.9);
const archH = Math.min(Math.round(archW / 0.77), fh);
const archLeft = Math.max(0, Math.round(x0 + (fw - archW) / 2));
await write("fahad-arch", sharp(clean).extract({ left: archLeft, top: Math.max(0, y0 - 10), width: archW, height: archH }).resize({ width: 900, withoutEnlargement: true }));

// Avatar: square around the head, centred on the head's own width (measured in the top 16% of the figure)
const side = Math.min(Math.round(fh * 0.3), W);
let hx0 = W, hx1 = 0;
for (let y = y0; y < y0 + Math.round(fh * 0.16); y++)
  for (let x = 0; x < W; x++)
    if (tight[y * W + x] > 128) {
      hx0 = Math.min(hx0, x);
      hx1 = Math.max(hx1, x);
    }
const cx = Math.round((hx0 + hx1) / 2);
const avBuf = await sharp(clean)
  .extract({ left: Math.max(0, Math.min(W - side, cx - Math.round(side / 2))), top: Math.max(0, y0 - Math.round(side * 0.04)), width: side, height: Math.min(side, H) })
  .png()
  .toBuffer();
await write("fahad-avatar", sharp(avBuf).resize(160));
await write("fahad-avatar@2x", sharp(avBuf).resize(320));
