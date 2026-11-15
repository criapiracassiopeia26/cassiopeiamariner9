# Mariner 9 Mission · Team Cassiopeia

Website for **Mariner 9 Mission**, a pixel-art animated story, a browser game and an accessible version in sign language and braille by Team Cassiopeia, made for the **NASA International Space Apps Challenge 2026 in Duitama, Colombia**.

The site is plain HTML, CSS and JavaScript. There is no build step and nothing to install.

```
index.html            page structure (texts come from config.js)
styles.css            all styling: palette, layout, animations
script.js             logic: languages, videos, sprites, Mars, stars, easter egg
config.js             ← THE ONLY FILE YOU NEED TO EDIT
assets/
  js/sprites.js       built-in pixel art (text maps → crisp SVG)
  img/favicon.svg     browser-tab icon (your Mariner 9 sprite)
  img/og-image.png    1200×630 preview image for WhatsApp / social links
  img/horizon.svg     Mars-surface divider between sections
  img/characters/     put your character PNG/GIFs here
  img/team/           put team photos here
  docs/               put the braille PDF here
```

To preview it on your computer, open `index.html` in a browser. Some browsers restrict local files, so if anything looks off, run a tiny local server from the folder and open http://localhost:8000:

```
python3 -m http.server 8000
```

---

## 1. Edit links, videos and the team image

Open **`config.js`** in any text editor (VS Code, Notepad, even GitHub's web editor). Each block has a comment explaining it.

| What | Where in `config.js` |
|---|---|
| Main story video | `storyVideo.url` |
| Game link (PLAY NOW button) | `gameUrl` |
| Gameplay video in the game card | `gameVideo.url` |
| Sign-language video | `accessibility.signVideo.url` |
| Braille PDF | `accessibility.braillePdf.url` (put the PDF in `assets/docs/`) |
| "Who we are" image | `teamImage` (one image for both languages, or one per language) |
| Public address of the site | `siteUrl` |

**One video / PDF per language:** the story video, the gameplay video, the sign-language video and the braille PDF each have an English and a Spanish link:
```js
url: { en: "https://youtu.be/ENGLISH_ID", es: "https://youtu.be/SPANISH_ID" }
```
The page shows the English one in EN and the Spanish one in ES, and switches when the visitor changes language. A link that is still a `PASTE_` placeholder shows "Coming soon" only in that language.

**YouTube links:** paste the normal link straight from your browser's address bar. All of these work:
`https://www.youtube.com/watch?v=ID`, `https://youtu.be/ID`, `https://www.youtube.com/shorts/ID`, `https://www.youtube.com/live/ID`, links with a start time (`&t=1m5s`), or just the 11-character ID.
The site converts each link to a privacy-enhanced embed (`youtube-nocookie.com`). The player only loads when a visitor presses **Play**.

**Placeholders:** any value that still contains `PASTE_` (or is empty) shows a friendly "Coming soon" state, never a broken player or link.

**"Who we are" image:** put the image in `assets/img/team/` and set `teamImage.src: "assets/img/team/equipo.png"`. If the image has text on it, use one per language: `src: { en: "...-en.png", es: "...-es.png" }`. Write a short description in `teamImage.alt` (EN and ES) for screen-reader users.

## 2. Swap in your own pixel art

Every illustration has a slot in `config.js` → section **"7) YOUR PIXEL ART"**, which lists where each image appears and has a suggested file name for each one. Leave a slot empty (`""`) to use the built-in pixel art. To use your own art, put a PNG/GIF in `assets/img/characters/` and write its path:

```js
assets: {
  cass: "assets/img/characters/cass.png",
  hoverbike: "assets/img/characters/moto.png",
  mars: "assets/img/characters/mars.gif",
  ...
}
```

- Transparent PNGs look best. Sprites stay sharp automatically (`image-rendering: pixelated`), so export at native size (e.g. 32×32) or any whole multiple of it.
- The built-in **Mariner 9** sprite is traced pixel by pixel from your own art. A clean transparent copy is in `assets/img/characters/mariner9-team-art.png`.
- The game card shows a **gameplay video**: paste its YouTube link in `gameVideo.url`.
- To edit the built-in sprites, open `assets/js/sprites.js`. Each sprite is a palette (one letter = one colour) and rows of text, where `.` means transparent.

## 3. Add or change a text (EN / ES)

All visible text lives in `config.js → i18n`, in two dictionaries: `en` (default, shown first) and `es`.

1. Add the key to **both** languages:
   ```js
   en: { game: { ..., tip: "Use headphones!" } }
   es: { game: { ..., tip: "¡Usa audífonos!" } }
   ```
2. Use it in `index.html`: `<p data-i18n="game.tip"></p>`
3. To translate an attribute (for example an ARIA label), use `data-i18n-attr="aria-label:game.tip"`.

If a Spanish key is missing, the English text is used. If a key is missing in both languages, its element is hidden and the browser console shows a "Missing text in config.js" warning.

The language toggle (EN | ES, in the header and the footer) remembers each visitor's choice in localStorage. You can also share a direct link with `?lang=es` at the end of the address. Switching languages updates `<html lang>`, the page title, the meta description and the Open Graph locale.

## 4. Deploy

The site is fully static, so it works on any static host.

**GitHub Pages:** push the folder to a repository. Go to *Settings → Pages*, choose *Deploy from a branch*, select `main` / root, and save. The site will be at `https://USER.github.io/REPO/`.

**Netlify:** drag and drop the folder onto https://app.netlify.com/drop.

**Cloudflare Pages, Vercel, or any web server:** upload the files as they are. There is no build command and the output directory is the root.

**After deploying**, do these two steps so link previews (WhatsApp, Instagram, X…) show the image:
1. Set `siteUrl` in `config.js` to the final address.
2. In `index.html` `<head>`, replace every `PASTE_SITE_URL_HERE` with that address, and make `og:image` absolute, e.g. `https://USER.github.io/REPO/assets/img/og-image.png`. Social networks don't run JavaScript, so this one step has to be done by hand.

## 5. Accessibility notes

- Skip link, semantic landmarks, one `h1`, visible focus rings, and full keyboard use. In the hero menu, ↑ ↓ choose and Enter or Z accepts, just like the game.
- All ARIA labels, alt texts and iframe titles are translated.
- Body text uses **Atkinson Hyperlegible**, a typeface designed for low-vision readers. Pixel fonts are kept for headings and labels only.
- `prefers-reduced-motion` turns off the intro, the twinkling and parallax stars, the rotating Mars, the typewriter and the floating sprites.
- Selected states never rely on colour alone. They also use a cursor icon, a fill change, an underline or a ▸ marker.
- Easter egg: type ↑ ↑ ↓ ↓ ← → ← → B A. It's decorative and announced politely to screen readers. Turn it off with `options.easterEgg: false`.

## 6. Privacy & performance

- YouTube players use click-to-load. Set `options.youtubeThumbnails: false` if you also want to avoid loading YouTube thumbnails until a visitor clicks.
- Fonts come from Google Fonts. To self-host them, download Silkscreen and Atkinson Hyperlegible, put them in `assets/fonts/`, replace the `<link>` with `@font-face` rules, and remove the preconnects.
- The starfield and Mars run at a low frame rate, pause when off-screen or when the tab is hidden, and stop completely with reduced motion.

---

## Resumen en español

**Misión Mariner 9** es el sitio web del equipo Cassiopeia para el NASA Space Apps Challenge 2026 en Duitama. Es HTML, CSS y JavaScript puros: no hay que instalar ni compilar nada.

- **Editar enlaces y nombres:** abre `config.js` y reemplaza todo lo que diga `PASTE_...`. Ahí pones el video principal (`storyVideo.url`), el enlace del juego (`gameUrl`), el video en lengua de señas (`accessibility.signVideo`), el PDF en braille (`accessibility.braillePdf`, guardado en `assets/docs/`) y la imagen de "Quiénes somos" (`teamImage`, guardada en `assets/img/team/`). Cada video y el PDF tienen un enlace en inglés (`en`) y otro en español (`es`), y el sitio muestra el del idioma elegido. Pega los enlaces de YouTube tal como los copias del navegador, y el sitio los convierte solo. Mientras un enlace sea un marcador, el sitio muestra "Muy pronto" en lugar de un error.
- **Usar sus propias imágenes:** guarda los PNG/GIF en `assets/img/characters/` y escribe la ruta en `config.js → assets` (por ejemplo `cass: "assets/img/characters/cass.png"`). Si dejas `""`, se usa el pixel art incluido. El Mariner 9 incluido está calcado de su propio sprite.
- **Agregar un texto:** agrégalo en `config.js → i18n` dentro de `en` **y** de `es` con la misma clave, y úsalo en el HTML con `data-i18n="seccion.clave"`. El inglés es el idioma predeterminado. La elección de idioma se guarda en el navegador, y `?lang=es` abre el sitio en español.
- **Publicar:** sube la carpeta a GitHub Pages (Settings → Pages → rama `main`) o arrástrala a Netlify Drop. Después cambia `PASTE_SITE_URL_HERE` en `index.html` y `siteUrl` en `config.js` por la dirección final, para que las vistas previas en WhatsApp y redes muestren la imagen.

---

## Assumptions & placeholders to fill in

**Placeholders (search for `PASTE_` in `config.js` and `index.html`):**
- `storyVideo.url`: the animated story on YouTube
- `gameUrl`: where the game is hosted
- `gameVideo.url`: gameplay video shown in the game card
- `accessibility.signVideo.url`: the sign-language video (labelled LSC; change `language` if needed)
- `accessibility.braillePdf.url`: the braille PDF, e.g. `assets/docs/mariner9-braille.pdf`
- `teamImage.src` and `teamImage.alt`: the "Who we are" image and its description
- `siteUrl` plus the `PASTE_SITE_URL_HERE` tags in `index.html` (only after deploying)

**Assumptions made:**
- The sign-language video is in Colombian Sign Language (LSC). The braille version is a PDF with "Open PDF" and "Download" buttons.
- The game runs in the browser and is bilingual. The game card says "Retro pixel-art adventure · Play in English or Spanish · No download needed". Edit `game.f1`–`f3` if any of that changes.
- Probe facts are kept general and come from NASA's public mission history: Mariner 9 was the first spacecraft to orbit another planet (1971), Viking 1 & 2 landed in 1976, Spirit & Opportunity landed in 2004, MAVEN arrived in 2014, and Sojourner arrived with Mars Pathfinder in 1997.
- "MAVEN" is written in capitals (it is an acronym), and "Cass Rodríguez" has an accent in Spanish.
- The EN/ES button labels and the noscript notice are the only text not in the dictionary. They are language names written in their own language, by design.
