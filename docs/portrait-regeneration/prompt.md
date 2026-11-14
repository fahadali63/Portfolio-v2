# Portrait regeneration — face-locked prompt (v2)

Why the face drifts: when a tool regenerates the whole image, it redraws the face too, and a new head angle or
pose forces it to invent the face from a new viewpoint. The fix is to **keep the original head exactly where it is
and only change everything below the neck and behind him.**

Reference image: `fahad-original.png` (upload this every time — never a previous AI result, errors compound).

---

## Method 1 (most reliable): edit, don't generate — ChatGPT, Gemini, Flux Kontext

Upload `fahad-original.png` and paste exactly:

> Edit this photo. Do NOT change the person's head in any way: keep the face, head angle, head size, head position in the frame, eyes, eyebrows, nose, lips, beard, moustache, hairline, hairstyle, ears, skin tone and skin texture pixel-identical to the original. Treat everything from the chin up as locked.
>
> Change only:
> 1. Outfit — replace his clothes with a fitted dark chocolate-brown unstructured wool blazer, a plain cream crew-neck knit underneath, and dark charcoal tailored trousers. No logos, no tie.
> 2. Arms — keep the same shoulder position and the same body angle as the original. Left hand relaxed in his trouser pocket; right hand loosely holding a rolled-up architectural site plan at his side.
> 3. Background — replace it with a plain warm studio backdrop, smooth gradient from soft butter yellow (#FCEFB4) at the top to warm ochre (#C99A57) at the bottom. No objects, no scenery.
> 4. Light — soft warm key light from the front-left that matches the existing light on his face; gentle warm rim light on the shoulders.
>
> Keep the same framing as the original (head near the top, cropped at mid-thigh), photorealistic, natural skin with pores, no retouching, no smoothing. Output at the highest resolution available, portrait orientation.

If the face still changes: reply in the same chat with
> The face changed. Restore the face, hair and beard exactly from the original photo I uploaded and keep only the new outfit, hands and background.

## Method 2: inpainting (Photoshop Generative Fill, Leonardo Canvas, Krea, Firefly)

1. Open `fahad-original.png`. Extend the canvas to 1600 × 2400 if the tool allows (more room = more detail).
2. Paint the mask over **everything except the head and neck** (shoulders down + background). Leave a 5–10 px gap below the jawline unmasked so the beard is protected.
3. Prompt for the masked area:
   > fitted dark chocolate-brown unstructured wool blazer over a plain cream crew-neck knit, dark charcoal tailored trousers, left hand in trouser pocket, right hand holding a rolled architectural site plan, plain warm studio backdrop gradient butter yellow to ochre, soft warm front-left light, photorealistic editorial portrait
4. Generate 3–4 options, keep the best. The face is never touched, because it is outside the mask.

## Method 3: Midjourney v7 (only if you prefer it)

> editorial portrait, three-quarter body, standing, same head angle as reference, fitted dark chocolate-brown unstructured wool blazer, plain cream crew-neck knit, dark charcoal trousers, left hand in pocket, right hand holding a rolled architectural site plan, plain warm studio backdrop butter yellow to ochre gradient, soft warm front-left key light, 85mm, f/2.8, photorealistic, natural skin texture --oref [URL of fahad-original] --ow 400 --ar 4:5 --style raw --stylize 50

`--ow` (omni-reference weight) 300–500 keeps the face; higher can stiffen the pose. `--style raw` and low `--stylize` stop beautification.

---

## Negative prompt (paste wherever a tool accepts one)

different person, changed face, altered facial features, face swap, new head angle, tilted head, different hairstyle, different beard, beard trimmed, smoothed skin, plastic skin, beauty filter, airbrushed, makeup, slimmer face, wider face, younger, older, distorted hands, extra fingers, cartoon, illustration, 3D render, CGI, harsh flash, cold light, busy background, text, watermark, logo

## Checks before you send it to me

- Put it next to the original: eyes, eyebrow shape, beard edge on the cheeks, hairline. If any differ, regenerate.
- Hands: five fingers each, natural grip on the roll.
- Size: at least 1200 × 2000. Plain background is fine — I'll cut it out and clean the edges.
