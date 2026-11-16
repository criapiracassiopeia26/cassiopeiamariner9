/* ==========================================================================
   CASSIOPEIA · MARINER 9 MISSION — SITE CONFIGURATION
   ==========================================================================
   👋 HI TEAM! This is the ONLY file you need to edit to update the website.

   HOW TO EDIT (no coding needed):
   1. Change only the text between quotes:  "like this"
   2. Keep the commas at the end of lines and do not delete { } [ ] brackets.
   3. Anything that says "PASTE_..." is a placeholder. Until you replace it,
      the website shows a friendly "Coming soon" message instead of an error.
   4. YouTube links: paste the NORMAL link you copy from YouTube, e.g.
        https://www.youtube.com/watch?v=dQw4w9WgXcQ
        https://youtu.be/dQw4w9WgXcQ
        https://www.youtube.com/shorts/dQw4w9WgXcQ
      The site converts it to a privacy-friendly embed automatically.
   5. Texts that have an English and a Spanish version look like:
        { en: "English text", es: "Texto en español" }
      Videos and the braille PDF are SEPARATE per language too:
        url: { en: "English video link", es: "Spanish video link" }
      Visitors see the English one in EN and the Spanish one in ES.
   6. Save the file and refresh the browser to see your changes.

   CÓMO EDITAR (resumen en español): cambia solo el texto entre comillas,
   no borres comas ni llaves, y reemplaza todo lo que diga "PASTE_...".
   Los enlaces de YouTube se pegan tal cual los copias del navegador.
   ========================================================================== */

window.CONFIG = {

  /* ------------------------------------------------------------------------
     1) GENERAL
     ------------------------------------------------------------------------ */
  teamName: "Cassiopeia",
  defaultLanguage: "en",          // "en" = English first (recommended), "es" = Spanish
  siteUrl: "PASTE_SITE_URL_HERE", // e.g. "https://cassiopeia.github.io/mariner9/" (used for sharing previews)

  /* ------------------------------------------------------------------------
     2) MAIN STORY VIDEO (YouTube) — one video per language
     ------------------------------------------------------------------------ */
  storyVideo: {
    url: {
      en: "PASTE_ENGLISH_YOUTUBE_URL_HERE",   // shown when the page is in English
      es: "PASTE_SPANISH_YOUTUBE_URL_HERE"    // shown when the page is in Spanish
    },
    title: { en: "Mariner 9 Mission — the animated story", es: "Misión Mariner 9 — la historia animada" }
  },

  /* ------------------------------------------------------------------------
     3) THE GAME — link to the external website where the game is hosted
     ------------------------------------------------------------------------ */
  gameUrl: "https://mariner9mission.netlify.app/",   // e.g. "https://our-team.itch.io/mariner-9-mission"

  // Gameplay video shown inside the game card (instead of a static image).
  // Paste the normal YouTube link; until then a "Coming soon" screen is shown.
  gameVideo: {
    url: {
      en: "https://youtu.be/mYDmV1iW2Zk",
      es: "https://youtu.be/mYDmV1iW2Zk"
    },
    title: { en: "Mariner 9 Mission — gameplay", es: "Misión Mariner 9 — gameplay" }
  },

  /* ------------------------------------------------------------------------
     4) ACCESSIBILITY — two cards: sign language (YouTube) + braille (PDF)
     ------------------------------------------------------------------------ */
  accessibility: {
    // Card 1: sign-language video — one video per language.
    signVideo: {
      url: {
        en: "https://www.youtube.com/shorts/rHDImjZG78w",
        es: "https://www.youtube.com/shorts/rHDImjZG78w"
      },
      title: { en: "Vocabulary of the story in sign language", es: "Vocabulario de la historia en lengua de señas" },
      // Which sign language each video uses (short code + full name). Change if needed.
      language: {
        code: { en: "LSC", es: "LSC" },
        name: { en: "Colombian Sign Language", es: "Lengua de Señas Colombiana" }
      }
    },
    // Card 2: braille version as a PDF — one PDF per language.
    // Put the files in assets/docs/ and write their paths here
    // (a full https:// link to a PDF hosted elsewhere, like Google Drive, also works).
    braillePdf: {
      url: {
        en: "assets/docs/brailleingles.pdf",   // e.g. "assets/docs/mariner9-braille-en.pdf"
        es: "assets/docs/brailleespanol.pdf"    // e.g. "assets/docs/mariner9-braille-es.pdf"
      },

      // 🖼️ OPTIONAL — your own cover image instead of the glowing braille dots.
      // To use it: put the images in assets/img/ and DELETE the "//" at the start
      // of the 2 lines below (image + imageAlt). Leave them commented to keep the dots.
      // image:    { en: "assets/img/braille-cover-en.png", es: "assets/img/braille-cover-es.png" },
      // imageAlt: { en: "Describe your image here", es: "Describe tu imagen aquí" },
      title: { en: "The story in braille", es: "La historia en braille" }
    }
  },

  /* ------------------------------------------------------------------------
     5) WHO WE ARE — a YouTube video about the team (one per language)
        Paste the normal YouTube links. Until then a "Coming soon" screen is shown.
     ------------------------------------------------------------------------ */
  teamVideo: {
    url: {
      en: "https://youtu.be/1b7ULDUDjqA",
      es: "https://youtu.be/1b7ULDUDjqA"
    },
    title: { en: "Meet Team Cassiopeia", es: "Conoce al equipo Cassiopeia" }
  },

  /* ------------------------------------------------------------------------
     7) 🎨 YOUR PIXEL ART — PUT YOUR PNG / GIF FILES HERE
     ------------------------------------------------------------------------
     STEP 1: copy your image into the folder  assets/img/characters/
     STEP 2: write its path between the quotes of the matching line below.
     Leave "" (empty) to keep the built-in pixel art.

     Where each image appears on the page:
       cass        → hero scene (next to the bike) and "The crew" card
       mariner9    → hero (floating), menu cursor, video posters, crew card, easter egg
       hoverbike   → hero scene
       mars        → big planet in the hero
       viking1 … sojourner → their cards in "The crew"

     Tips: transparent PNG works best; pixel art stays sharp automatically.
     Your PNGs are already connected below. They are saved at their real
     pixel size (e.g. Cass = 36×57 px) so they load fast and stay crisp.
     ------------------------------------------------------------------------ */
  assets: {
    cass:        "assets/img/characters/cass.png",
    mariner9:    "",   // e.g. "assets/img/characters/mariner9.png"  (built-in one is traced from your sprite)
    hoverbike:   "",   // e.g. "assets/img/characters/moto.png"
    mars:        "",   // e.g. "assets/img/characters/marte.png"  (empty = animated pixel Mars drawn by code)
    viking1:     "assets/img/characters/viking1.png",
    viking2:     "assets/img/characters/viking2.png",
    spirit:      "assets/img/characters/spirit.png",
    opportunity: "assets/img/characters/opportunity.png",
    maven:       "assets/img/characters/maven.png",
    sojourner:   "assets/img/characters/sojourner.png"
  },

  /* ------------------------------------------------------------------------
     8) OPTIONS
     ------------------------------------------------------------------------ */
  options: {
    showIntro: true,          // "PRESS START" screen (once per visit, skipped with reduced motion)
    youtubeThumbnails: true,  // show YouTube thumbnails before a video is played (false = pixel poster, zero requests to YouTube until click)
    easterEgg: true           // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  },

  /* ==========================================================================
     9) ALL WEBSITE TEXTS (i18n) — English first, then Spanish.
        Keep the same keys in both languages. To add a new text:
          a) add  myKey: "Text"  inside en: { ... }
          b) add  myKey: "Texto" inside es: { ... }
          c) use it in index.html:  <p data-i18n="section.myKey"></p>
     ========================================================================== */
  i18n: {

    /* ----------------------------- ENGLISH ----------------------------- */
    en: {
      meta: {
        title: "Mariner 9 Mission · A retro adventure on Mars · Team Cassiopeia",
        description: "Mariner 9 Mission: a pixel-art animated story, a browser game and an accessible version in sign language and braille by Team Cassiopeia for the NASA Space Apps Challenge 2026 in Duitama, Colombia."
      },
      a11y: {
        skip: "Skip to main content",
        navLabel: "Site sections",
        menu: "Menu",
        menuOpen: "Open menu",
        menuClose: "Close menu",
        langGroup: "Choose language",
        newTab: "(opens in a new tab)",
        heroMenu: "Mission menu",
        heroScene: "Pixel-art scene: Cass stands next to her hoverbike on a Martian cliff while the robot Mariner 9 floats nearby and Mars glows in the distance.",
        pixelArtOf: "Pixel art of {name}",
        photoOf: "Photo of {name}",
        avatarOf: "Pixel avatar for {name}",
        playVideo: "Play video: {title}",
        logo: "{name} logo",
        backToTop: "Back to top",
        brailleArt: "The word MARS written in braille cells"
      },
      nav: {
        video: "Story",
        game: "Game",
        sign: "Accessibility",
        story: "Characters",
        team: "Who we are"
      },
      intro: {
        press: "PRESS START",
        hint: "Press any key or tap to begin"
      },
      hero: {
        title1: "MARINER 9",
        title2: "MISSION",
        tagline: "A retro adventure on Mars",
        byTeam: "A story by Team Cassiopeia",
        badge: "NASA Space Apps Challenge 2026 · Duitama",
        m1: "Watch the story",   m1s: "Animated short",
        m2: "Play the game",     m2s: "In your browser",
        m3: "Sign language & braille", m3s: "Accessible versions",
        m4: "Characters",        m4s: "Cass, Mariner 9 & the probes",
        m5: "Meet the crew",     m5s: "Team Cassiopeia",
        keys: "Arrows: choose · Enter: accept",
        version: "v1.0"
      },
      video: {
        kicker: "01 · Story video",
        title: "The animated story",
        lead: "Pixel art, time travel and real NASA probes. Grab some popcorn — the mission starts now.",
        play: "Play",
        open: "Open on YouTube",
        soonTitle: "Coming soon",
        soonText: "Our animated story is still rendering. Check back very soon!",
        privacy: ""
      },
      game: {
        kicker: "02 · The game",
        title: "Play the mission",
        lead: "Step into Cass's boots. Explore Mars, wake up sleeping probes and rebuild the lost map — right in your browser.",
        f1: "Retro pixel-art adventure",
        f2: "Play in English or Spanish",
        f3: "No download needed",
        play: "PLAY NOW",
        soon: "COMING SOON",
        soonNote: "The game link will appear here very soon.",
        note: "Opens the game in a new tab",
        videoSoonTitle: "Gameplay video coming soon",
        videoSoonText: "A sneak peek of the game will play right here."
      },
      sign: {
        kicker: "03 · Accessibility",
        title: "A story for everyone",
        lead: "Accessibility is at the heart of this project. Space belongs to everyone, so our story is also available in sign language for Deaf and hard-of-hearing audiences, and in braille for blind and low-vision readers.",
        langLabel: "Language",
        signTag: "Sign language",
        brailleTag: "Braille",
        brailleFormat: "PDF document",
        brailleText: "Read or print the full story in braille.",
        openPdf: "Open PDF",
        downloadPdf: "Download",
        soonTitle: "Video coming soon",
        soonText: "We're recording this one right now.",
        pdfSoonTitle: "PDF coming soon",
        pdfSoonText: "We're preparing the braille version right now."
      },

      story: {
        kicker: "04 · Characters",
        title: "The crew",
        charsLead: "Two heroes, six real NASA explorers.",
        factsNote: "",
        chars: {
          cass:        { tag: "Hero · 2072",      line: "I'm a curious mechanic who found my grandfather’s robot in the attic… along with the mission he never finished." },
          mariner9:    { tag: "Robot · AI",       line: "I'm a research robot possessing the knowledge of the actual Mariner 9, which in 1971 became the first spacecraft to orbit another planet." },
          viking1:     { tag: "Lander · 1976",    line: "I was the first NASA mission to successfully land on Mars and send back photos from the surface." },
          viking2:     { tag: "Lander · 1976",    line: "I was the twin of Viking 1. I landed later, in 1976, on another plain—Utopia Planitia—to study Mars and search for signs of life." },
          spirit:      { tag: "Rover · 2004",     line: "I was one of the twin rovers from the Mars Exploration Rover mission. I explored Gusev Crater and found evidence that water shaped Mars." },
          opportunity: { tag: "Rover · 2004",     line: "I was Spirit's twin, and I landed in Meridiani Planum. I was planned for about 90 Martian days, but I kept rolling for nearly 15 years." },
          maven:       { tag: "Orbiter · 2014",   line: "I was an orbiter created to study the upper atmosphere of Mars and how the planet lost much of its air to space." },
          sojourner:   { tag: "Rover · 1997",     line: "I was the first wheeled rover on Mars, arriving with the Mars Pathfinder mission: I am the veteran of the group." }
        },
        names: {
          cass: "Cass Rodriguez", mariner9: "Mariner 9", viking1: "Viking 1", viking2: "Viking 2",
          spirit: "Spirit", opportunity: "Opportunity", maven: "MAVEN", sojourner: "Sojourner"
        }
      },
      team: {
        kicker: "05 · Who we are",
        title: "Team Cassiopeia",
        p1: "We are Cassiopeia, a team of six from Duitama, Boyacá, Colombia. We love space, stories and games, and we believe science is for everyone — that's why Mariner 9 Mission comes as an animated story, a playable game, and versions in sign language and braille.",
        videoSoonTitle: "Team video coming soon",
        videoSoonText: "Meet the crew behind the mission right here."
      },
      footer: {
        made: "The programming for this page was created using the artificial intelligence Claude.",
        event: "Created for the NASA International Space Apps Challenge 2026 · Duitama, Colombia",
        official: " NASA Space Apps Challenge official site",
        top: "Back to top",
        lang: "Language"
      },
      egg: {
        toast: "⠍⠁⠗⠎ — that's MARS in braille. Mariner 9 says hi!"
      }
    },

    /* ----------------------------- ESPAÑOL ----------------------------- */
    es: {
      meta: {
        title: "Misión Mariner 9 · Una aventura retro en Marte · Equipo Cassiopeia",
        description: "Misión Mariner 9: una historia animada en pixel art, un juego para el navegador y una versión accesible en lengua de señas y braille del equipo Cassiopeia para el NASA Space Apps Challenge 2026 en Duitama, Colombia."
      },
      a11y: {
        skip: "Saltar al contenido principal",
        navLabel: "Secciones del sitio",
        menu: "Menú",
        menuOpen: "Abrir menú",
        menuClose: "Cerrar menú",
        langGroup: "Elegir idioma",
        newTab: "(se abre en una pestaña nueva)",
        heroMenu: "Menú de la misión",
        heroScene: "Escena en pixel art: Cass está junto a su moto voladora en un acantilado marciano mientras el robot Mariner 9 flota cerca y Marte brilla a lo lejos.",
        pixelArtOf: "Pixel art de {name}",
        photoOf: "Foto de {name}",
        avatarOf: "Avatar pixelado de {name}",
        playVideo: "Reproducir video: {title}",
        logo: "Logo de {name}",
        backToTop: "Volver arriba",
        brailleArt: "La palabra MARTE escrita en celdas braille"
      },
      nav: {
        video: "Historia",
        game: "Juego",
        sign: "Accesibilidad",
        story: "Personajes",
        team: "Quiénes somos"
      },
      intro: {
        press: "PRESIONA START",
        hint: "Presiona cualquier tecla o toca la pantalla para empezar"
      },
      hero: {
        title1: "MARINER 9",
        title2: "MISIÓN",
        tagline: "Una aventura retro en Marte",
        byTeam: "Una historia del equipo Cassiopeia",
        badge: "NASA Space Apps Challenge 2026 · Duitama",
        m1: "Ver la historia",       m1s: "Corto animado",
        m2: "Jugar",                 m2s: "Desde tu navegador",
        m3: "Señas y braille",       m3s: "Versiones accesibles",
        m4: "Personajes",            m4s: "Cass, Mariner 9 y las sondas",
        m5: "Conoce al equipo",      m5s: "Equipo Cassiopeia",
        keys: "Flechas: elegir · Enter: aceptar",
        version: "v1.0"
      },
      video: {
        kicker: "01 · La historia",
        title: "La historia animada",
        lead: "Pixel art, viajes en el tiempo y sondas reales de la NASA. Prepara las palomitas: la misión está por comenzar.",
        play: "Reproducir",
        open: "Ver en YouTube",
        soonTitle: "Muy pronto",
        soonText: "Nuestra historia animada todavía se está renderizando. ¡Vuelve muy pronto!",
        privacy: ""
      },
      game: {
        kicker: "02 · El juego",
        title: "Juega la misión",
        lead: "Ponte en los zapatos de Cass. Explora Marte, despierta a las sondas dormidas y reconstruye el mapa perdido, directo desde tu navegador.",
        f1: "Aventura retro en pixel art",
        f2: "Juega en español o en inglés",
        f3: "Sin descargas",
        play: "JUGAR AHORA",
        soon: "MUY PRONTO",
        soonNote: "El enlace del juego aparecerá aquí muy pronto.",
        note: "Abre el juego en una pestaña nueva",
        videoSoonTitle: "Video del juego muy pronto",
        videoSoonText: "Aquí podrás ver un adelanto del juego."
      },
      sign: {
        kicker: "03 · Accesibilidad",
        title: "Una historia para todos",
        lead: "La accesibilidad es el corazón de este proyecto. El espacio es de todos, por eso nuestra historia también está en lengua de señas para personas sordas y con discapacidad auditiva, y en braille para personas ciegas y con baja visión.",
        langLabel: "Idioma",
        signTag: "Lengua de señas",
        brailleTag: "Braille",
        brailleFormat: "Documento PDF",
        brailleText: "Lee o imprime la historia completa en braille.",
        openPdf: "Abrir PDF",
        downloadPdf: "Descargar",
        soonTitle: "Video muy pronto",
        soonText: "Estamos grabando este video ahora mismo.",
        pdfSoonTitle: "PDF muy pronto",
        pdfSoonText: "Estamos preparando la versión en braille."
      },

      story: {
        kicker: "04 · Personajes",
        title: "La tripulación",
        charsLead: "Dos protagonistas y seis exploradores reales de la NASA.",
        factsNote: "",
        chars: {
          cass:        { tag: "Protagonista · 2072", line: "Soy una mecánica curiosa que encontré el robot de mi abuelo en el ático… y la misión que él nunca terminó." },
          mariner9:    { tag: "Robot · IA",          line: "Soy un robot de investigación con el conocimiento de la Mariner 9 real, que en 1971 fue la primera nave en orbitar otro planeta." },
          viking1:     { tag: "Módulo · 1976",       line: "Fuí la primera misión de la NASA en aterrizar con éxito en Marte y enviar fotos desde la superficie." },
          viking2:     { tag: "Módulo · 1976",       line: "Fuí la gemela de Viking 1. Aterrizé más tarde en 1976 en otra llanura, Utopia Planitia, para estudiar Marte y buscar señales de vida." },
          spirit:      { tag: "Rover · 2004",        line: "Fuí uno de los rovers gemelos de la misión Mars Exploration Rover. Exploré el cráter Gusev y halló evidencia de que el agua moldeó Marte." },
          opportunity: { tag: "Rover · 2004",        line: "Fuí el gemelo de Spirit y aterrizé en Meridiani Planum. Estaba planeado para unos 90 días marcianos y seguí rodando casi 15 años." },
          maven:       { tag: "Orbitador · 2014",    line: "Fuí un orbitador creado para estudiar la atmósfera superior de Marte y cómo el planeta perdió gran parte de su aire hacia el espacio." },
          sojourner:   { tag: "Rover · 1997",        line: "Fuí el primer rover con ruedas en Marte, que llegó con la misión Mars Pathfinder: Soy el veterano del grupo." }
        },
        names: {
          cass: "Cass Rodríguez", mariner9: "Mariner 9", viking1: "Viking 1", viking2: "Viking 2",
          spirit: "Spirit", opportunity: "Opportunity", maven: "MAVEN", sojourner: "Sojourner"
        }
      },
      team: {
        kicker: "05 · Quiénes somos",
        title: "Equipo Cassiopeia",
        p1: "Somos Cassiopeia, un equipo de seis personas de Sogamoso, Boyacá, Colombia. Nos encantan el espacio, las historias y los videojuegos, y creemos que la ciencia es para todos. Por eso Misión Mariner 9 llega como historia animada, como juego y en versiones en lengua de señas y braille.",
        videoSoonTitle: "Video del equipo muy pronto",
        videoSoonText: "Aquí conocerás a la tripulación detrás de la misión."
      },
      footer: {
        made: "La programación de esta página fue realizada utilizando la inteligencia artificial Claude",
        event: "Creado para el NASA International Space Apps Challenge 2026 · Duitama, Colombia",
        official: "Sitio oficial deL NASA Space Apps Challenge",
        top: "Volver arriba",
        lang: "Idioma"
      },
      egg: {
        toast: "⠍⠁⠗⠞⠑ — así se escribe MARTE en braille. ¡Mariner 9 te saluda!"
      }
    }
  }
};
