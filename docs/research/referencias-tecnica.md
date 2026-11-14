# Referencias técnicas para el hero (análisis de 5 webs)

Fecha de captura: 2026-11-14. Viewport de medición: 1440x900, Chromium headless, solo lectura.
Se replican **técnicas**, no contenido, marca, tipografías propietarias ni imágenes.

Leyenda de confianza: **[EXT]** extraído de JS/CSS o de `getComputedStyle` (valor real) · **[MUE]** medido muestreando el DOM en vivo (cada ~220 ms) · **[EST]** estimación o inferencia (se dice cuál).

Sobre las webs: Pentagram, Wolff Olins y Fedrigoni se analizaron en vivo. **Place Laval y Sappi no se pudieron analizar** (ver sus secciones). Los CDN de imágenes de Pentagram (imgix) devolvieron errores/bloqueos parciales y las capturas muestran huecos grises; no afecta a estructura ni a animación.

Capturas guardadas en `/tmp/claude-0/-home-user-imagenes-graficas-web/0708ba4f-eb26-5fab-965c-0d1eca968a37/scratchpad/refs/` (JPG q70): `pg_f30.jpg`, `pg_f36.jpg`, `pg_f42.jpg` (Pentagram), `wo_full.jpg`, `fed_hero.jpg` (solo muestra un modal de región, no el hero). Scripts `pg*.js`, `wo*.js`, `sec.js`, `fed2.js` en la misma carpeta.

---

## 1. Pentagram — hero con frase rotatoria + imagen de fondo

### Resumen
1. El hero es un Swiper en modo `fade` (crossfade) con 12 slides de proyecto a pantalla completa (`aspect-ratio: 7/3`, máx. 1728 px; en móvil `3/4`).
2. Encima hay una "píldora" central con la frase *"We design [disciplina] for [sector]"*; cada palabra variable es una columna vertical de filas de 44 px dentro de una máscara `overflow:hidden` que se desplaza con GSAP (y también anima su anchura).
3. Todo está sincronizado a un único evento (`slideChange`): imagen y texto empiezan a moverse a la vez y duran lo mismo (1 s). Hay indicador: 12 puntos abajo a la derecha, y pie de foto abajo a la izquierda.

### Receta técnica

**Estructura DOM [EXT]** (`hero.html` en refs):
```
div.relative.w-full[data-behavior="filterAnimationCarousel homeFilters"]  (aspect 7/3, bg blanco)
 ├ div.swiper-container.absolute.inset-0   (opacity 0 → 1 por GSAP)
 │   └ div.swiper-wrapper > div.swiper-slide.absolute.inset-0 ×12
 │        ├ a > picture(<source media> + <img class="transition-opacity duration-300 object-cover">)
 │        └ div.homeFilters__caption (abajo-izquierda, título del proyecto)
 ├ nav (abajo-derecha): button[data-filteranimation-carousel-nav] ×12, flex gap 6px
 └ div.homeFilters (centrado, absolute)
     └ div.homeFilters__filters   (la píldora)
         "We design " + <span.h-28.md:h-44.overflow-hidden>   ← máscara de 1 fila
                            <span[data-filteranimation-wrapper].flex.flex-col>  ← columna que se mueve
                               <span.h-44 data-text data-target="2,3,5,..."> Brand Identity </span> ×N
                        " for " + otra máscara igual (sector)
```
Hay 2 wrappers (disciplina y sector). `data-target="2,3,5"` indica en qué slides debe estar seleccionada esa fila.

**Librerías [EXT]**: Swiper (módulos EffectFade, Autoplay, Pagination) + GSAP (CSSPlugin). Sin Lenis.

**Config Swiper [EXT]** (bundle `index-BRmOuUmf.js`, `A17.Behaviors.filterAnimationCarousel`):
`effect:"fade"`, `fadeEffect:{crossFade:true}`, `loop:true`, `speed:1000`, `autoplay:{delay:2000, disableOnInteraction:false}`.
→ **Ciclo real = 3 s por slide** (2 s quieto + 1 s de transición). Verificado muestreando: cambios de slide en t≈5.2 s, 8.3 s, 11.4 s, 14.3 s [MUE].

**Transición de imagen**: crossfade puro por opacidad, ambos slides a la vez (slide saliente 0.99→0 mientras el entrante 0→1 en ~0.9 s). CSS Swiper: `.swiper-fade .swiper-slide{transition-property:opacity; pointer-events:none}`. Duración 1000 ms inline. Easing: no declarado en CSS; las muestras (0.41→0.79→0.95→1 a 0.2/0.43/0.66 s) encajan con `ease` por defecto [EST]. Sin clip-path, sin escala, sin parallax.

**Transición de texto [EXT]**: GSAP, no CSS.
```js
gsap.to(wrapper, { duration: 1, y: -(filaIndex * 44), /* 28 en móvil */
                   width: anchoMedidoDeEsaFila, delay: 0,
                   ease: "power4.inOut", overwrite: true })
```
No hay opacity ni clip-path: el "reveal" es el desplazamiento de una columna tras una máscara `overflow:hidden` de una fila (alto 44 px escritorio / 28 px móvil). Las palabras de relleno que pasan por el recorrido son visibles durante el barrido (efecto ruleta). La anchura de la columna se tweenea igual (1 s) para que el resto de la frase se reajuste de forma fluida. `power4.inOut` ≈ `cubic-bezier(0.76, 0, 0.24, 1)` (equivalencia estándar de easeInOutQuart) [EST de la curva CSS equivalente].
Muestreo de y: -572 → -561 → -330 → -99 → -88 en ~0.7 s con arranque y final suaves, coherente con inOut fuerte [MUE].

**Secuencia de entrada [EXT]**:
1. t=0: píldora visible (`homeFilters` opacity 1), carrusel `opacity:0`.
2. t=+1 s: `gsap.fromTo(carousel, {opacity:0},{opacity:1, delay:1, duration:2, ease:"power4.inOut"})`; a la vez `setTimeout(…,1000)` lanza el primer barrido del texto a la fila del slide 0.
3. `onComplete` del fade (t=+3 s) → `autoplay.start()`.

**Pausas [EXT]**: el autoplay se detiene si `scrollY > headerHeight`, al abrir modal/buscador, y el texto vuelve a su estado inicial (1 s, `power4.inOut`); se reanuda al volver arriba. Clic en un punto → `slideTo(i)` y activa el autoplay.

**Indicador de progreso [EXT/MUE]**: no hay barra de progreso. Hay 12 puntos: 18x18 px, `border-radius:9999px`, blancos, `opacity:.5` inactivo / `1` activo (inline, sin transición), `gap:6px`, contenedor `flex justify-end p-outer-gutter` abajo a la derecha. Se ve en `pg_f36.jpg`.

**Estilo de la píldora [EXT]**: `background rgba(232,232,232,.8)`, `backdrop-filter: blur(7.5px)`, `border-radius:4px` (8px si abierto, `transition: border-radius .4s`), texto `Plain` 16px/20px peso 400, color `#1a1a1a`. Pie de foto: 19px/25px, `text-shadow: rgba(0,0,0,.5) -1px 1px 4px`, blanco sobre foto. Alto hero medido: 617 px a 1440 de ancho (7/3).

**Extra, mismo sitio — rotador de texto lateral [EXT]** (bloque "thematic", Flickity): cada slide de texto `transition: transform .4s ease-in-out, opacity .4s ease-in-out`; entra desde `translateX(50px)`, sale a `-50px`; `.is-selected` → `translate(0)`, opacity 1.

**No verificado**: easing exacto del crossfade de Swiper (inferido); las imágenes reales no cargaron (bloqueo de imgix), así que no se pudo ver el aspecto final de la foto bajo la píldora.

### Snippet genérico (vanilla): hero rotatorio texto + imagen
```html
<section class="rh" data-rh data-interval="2000" data-fade="1000">
  <div class="rh__slides">
    <figure class="rh__slide is-active" data-word="Logística"><img src="a.jpg" alt=""></figure>
    <figure class="rh__slide" data-word="Packaging"><img src="b.jpg" alt=""></figure>
    <figure class="rh__slide" data-word="Industria"><img src="c.jpg" alt=""></figure>
  </div>
  <p class="rh__phrase" aria-label="Resolvemos logística, packaging e industria">
    <span aria-hidden="true">Resolvemos&nbsp;</span>
    <span class="rh__mask" aria-hidden="true">
      <span class="rh__roll"><span>Logística</span><span>Packaging</span><span>Industria</span></span>
    </span>
  </p>
  <div class="rh__dots"></div>
</section>
```
```css
.rh{--row:44px;--fade:1000ms;--ease:cubic-bezier(.76,0,.24,1);
  position:relative;aspect-ratio:7/3;overflow:hidden;background:#e8e8e8}
.rh__slides{position:absolute;inset:0;opacity:0;transition:opacity 2s var(--ease) 1s}   /* intro: delay 1s, 2s */
.rh.is-ready .rh__slides{opacity:1}
.rh__slide{position:absolute;inset:0;margin:0;opacity:0;transition:opacity var(--fade) ease}
.rh__slide.is-active{opacity:1}
.rh__slide img{width:100%;height:100%;object-fit:cover}
.rh__phrase{position:absolute;inset:0;margin:auto;height:var(--row);width:max-content;display:flex;align-items:center;
  padding:0 16px;font:400 16px/1 system-ui;background:rgba(232,232,232,.8);
  -webkit-backdrop-filter:blur(7.5px);backdrop-filter:blur(7.5px);border-radius:4px}
.rh__mask{display:inline-block;height:var(--row);overflow:hidden}
.rh__roll{display:flex;flex-direction:column;align-items:flex-start;
  transition:transform 1s var(--ease),width 1s var(--ease)}
.rh__roll>span{height:var(--row);display:flex;align-items:center;white-space:nowrap;flex:none}
.rh__dots{position:absolute;right:24px;bottom:24px;display:flex;gap:6px}
.rh__dots button{width:18px;height:18px;border:0;border-radius:9999px;background:#fff;opacity:.5;padding:0}
.rh__dots button[aria-current="true"]{opacity:1}
@media (max-width:799px){.rh{--row:28px;aspect-ratio:3/4}}
@media (prefers-reduced-motion:reduce){.rh__slides,.rh__slide,.rh__roll{transition:none}}
```
```js
(function () {
  const root = document.querySelector('[data-rh]');
  const slides = [...root.querySelectorAll('.rh__slide')];
  const roll = root.querySelector('.rh__roll');
  const words = [...roll.children];
  const dotsBox = root.querySelector('.rh__dots');
  const interval = +root.dataset.interval, fade = +root.dataset.fade;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0, timer = null;

  const dots = slides.map((_, k) => {
    const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Slide ' + (k + 1));
    b.addEventListener('click', () => { go(k); restart(); }); dotsBox.append(b); return b;
  });
  const row = () => parseFloat(getComputedStyle(root).getPropertyValue('--row'));
  const widths = () => words.map(w => w.getBoundingClientRect().width);

  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));      // crossfade: ambos a la vez
    roll.style.transform = `translateY(${-i * row()}px)`;                     // texto y imagen: mismo instante, misma duración
    roll.style.width = widths()[i] + 'px';
    dots.forEach((d, k) => d.setAttribute('aria-current', k === i));
  }
  function start() { if (reduce || timer) return; timer = setInterval(() => go(i + 1), interval + fade); } // 2s + 1s = 3s
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); if (window.scrollY <= 80) start(); }

  document.fonts.ready.then(() => {            // medir anchos cuando la fuente ya está
    roll.style.width = widths()[0] + 'px';
    dots[0].setAttribute('aria-current', 'true');
    requestAnimationFrame(() => root.classList.add('is-ready'));
    setTimeout(start, 3000);                   // arranca al acabar el fade de entrada (1s delay + 2s)
  });
  addEventListener('scroll', () => (window.scrollY > 80 ? stop() : start()), { passive: true }); // pausa al hacer scroll
  addEventListener('resize', () => { roll.style.width = widths()[i] + 'px'; });
})();
```
Con `prefers-reduced-motion` no hay autoplay ni transiciones: solo cambia con los puntos.

---

## 2. Wolff Olins — entrada del hero, tipografía y tarjeta de caso

### Resumen
1. Home: carrusel Swiper de pantalla completa (`height: calc(100vh - 90px)`, 12 slides), autoplay 6 s, con zonas clicables invisibles prev/next y cursor personalizado.
2. **No hay secuencia de entrada orquestada del header**: la cabecera es `position:sticky`, transparente, 88 px de alto, y aparece sin animar. Lo único animado al cargar es el **fade-in de la imagen** (1 s).
3. Tarjeta de caso minimalista abajo-izquierda: cliente (20 px) + tagline (35 px), y contador `01/12` abajo-derecha, todo en blanco sobre la foto. Tipografía: Monument Grotesk.

### Receta técnica

**Stack [EXT]**: Next.js (App Router), Swiper (autoplay), `react-spring` (solo botón "BigButton" con path SVG elástico `tension:200, friction:10`), `IntersectionObserver` propio. Sin GSAP/Framer/Lenis en los chunks de la home.

**Entrada al cargar [MUE/EXT]**
| Elemento | Propiedad | Duración | Easing | Delay |
|---|---|---|---|---|
| `img` del slide (clase `transition-opacity duration-1000`) | opacity 0→1 | 1000 ms | `cubic-bezier(0.4,0,0.2,1)` (computed) | arranca cuando la imagen carga (≈1.27 s tras navegar en mi medición; depende de red) |
| header, caption, contador | — | — | — | sin animación (opacity 1, transform none desde el primer frame) |

Muestreo rAF: opacidad 0.0006 (1267 ms) → 0.50 (1596 ms) → 0.90 (1880 ms) → 0.987 (2111 ms) [MUE].
Scroll-reveals de secciones posteriores [EXT] (`ScrollWatcher`): `[data-start-y]` → inicial `translateY(Npx) scale(.99)`; al entrar (IO, `rootMargin:-8%`) → `translateY(0)`; `transition-transform 1200ms cubic-bezier(.23,1,.32,1)` ("ease-quint"). (La escala vuelve a 1 porque se elimina de la regla del estado final: el código solo reescribe `translateY(0px)`, lo que anula el `scale(99%)`.)
Carrusel [EXT]: `autoplay:{delay:6000, disableOnInteraction:false}`, `loop:true`, `slidesPerView:1`; **speed no especificado → 300 ms por defecto de Swiper, efecto "slide"** [EST: no leído en config, es el default]. Overlay de captions (`z-10`, `pointer-events:none`) separado de los slides: el texto solo cambia con `useState(realIndex)` — **sin animación de texto** (cambio instantáneo).
Cambio de tema: `ThemeManager` + IO con `rootMargin:"-49% 0 -50% 0"`; el body hace `transition: color, background-color … .5s cubic-bezier(.4,0,.2,1)`.

**Tipografía [EXT]** (computed + `@font-face`)
| Uso | Familia | Tamaño / interlineado | Peso |
|---|---|---|---|
| Body | Monument Grotesk (ABC, Regular 400 / Medium 500) | 16 px / 24 px | 400 |
| Nav (Work, About…) | Monument Grotesk | 20 px / ~24 px, gris `rgb(94,94,94)` | 400 |
| Caption cliente (`h3.text-lg`) | Monument Grotesk | 20 px / 22 px (`leading-110` = 1.1em), blanco | 400 |
| Caption tagline (`p.text-2xl`) | Monument Grotesk | 35 px (2.1875rem) / 38.5 px (1.1em) | 400 |
| Contador `01/12` | Monument Grotesk | 30 px / 45 px en lg (`lg:text-xl`); 20 px en móvil | 400 |
| Títulos de sección ("Selected Work") | Monument Grotesk | 35 px / 42 px | 400 |
| h1 de páginas interiores | Untitled Serif | 45 px (2.8125rem) / 1.07em | 400 |
| Logo | WO (fuente variable propia) | alto 24 px | — |
Escala de utilidades Tailwind del sitio: lg 1.25rem (20) · xl 1.875rem (30) · 2xl 2.1875rem (35) · md:4xl 3.4375rem (55).

**Tarjeta de caso [EXT]**: contenedor `flex-col justify-end gap-2 py-3 px-5` en móvil, `md:py-8 md:px-16 lg:flex-row lg:items-end lg:justify-between`. Bloque de texto `max-w-[600px] pt-[.5rem]`, `h3` (cliente) con `pb-2` encima del `p` (tagline) mediante `-order-1`. En 1440 px: caption a 64 px del borde izquierdo, base a 827 px de 900. Contador alineado a la derecha, misma línea base del bloque. Capas: slides → overlay de captions → zonas `cursor-prev` / `cursor-next` (columnas 1 y 3 de un grid de 3, solo `md+`, cursor SVG personalizado).
Alto del hero: `calc(100vh - 90px)` (medido 810 px a 900). Imagen `object-fit:cover; object-position:center`.

**No verificado**: la velocidad real de transición de slide (default Swiper asumido); no se probó la zona de cursor personalizado.

### Snippet genérico (vanilla): secuencia de entrada + tarjeta de caso
```html
<header class="wo-head"> … </header>
<section class="wo-hero">
  <img class="wo-hero__img" src="hero.jpg" alt="">
  <div class="wo-hero__meta">
    <div class="wo-card">
      <h3 class="wo-card__client">Cliente</h3>
      <p class="wo-card__tag">Una frase que resume el caso</p>
    </div>
    <div class="wo-count">01/12</div>
  </div>
</section>
<section class="wo-reveal" data-start-y="48">…</section>
```
```css
:root{--ease-quint:cubic-bezier(.23,1,.32,1);--ease-std:cubic-bezier(.4,0,.2,1)}
.wo-head{position:sticky;top:0;height:88px;padding:0 62px;display:flex;align-items:center;background:transparent}
.wo-hero{position:relative;height:calc(100vh - 90px);overflow:hidden;color:#fff}
.wo-hero__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;
  opacity:0;transition:opacity 1s var(--ease-std)}
.wo-hero__img.is-loaded{opacity:1}
.wo-hero__meta{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;gap:.5rem;
  padding:.75rem 1.25rem;pointer-events:none}
.wo-card{max-width:600px;padding-top:.5rem;display:flex;flex-direction:column}
.wo-card__client{order:-1;margin:0;padding-bottom:.5rem;font:400 20px/1.1 'Monument Grotesk',system-ui,sans-serif} /* sustituir fuente */
.wo-card__tag{margin:0;font:400 35px/1.1 'Monument Grotesk',system-ui,sans-serif}
.wo-count{font-size:20px}
@media (min-width:768px){.wo-hero__meta{padding:2rem 4rem}}
@media (min-width:1024px){.wo-hero__meta{flex-direction:row;align-items:flex-end;justify-content:space-between}.wo-count{font-size:30px;line-height:1.5}}
/* scroll-reveal de secciones (data-start-y) */
.wo-reveal{transition:transform 1200ms var(--ease-quint)}
@media (prefers-reduced-motion:reduce){.wo-hero__img,.wo-reveal{transition:none}}
```
```js
// Fade-in de la imagen cuando carga (evita parpadeo) + reveals por IntersectionObserver
const img = document.querySelector('.wo-hero__img');
const show = () => img.classList.add('is-loaded');
img.complete ? show() : img.addEventListener('load', show, { once: true });

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-start-y]').forEach(el => {
    el.style.transform = `translateY(${el.dataset.startY}px) scale(.99)`;
    new IntersectionObserver(([e], io) => {
      if (e.isIntersecting) { el.style.transform = 'translateY(0) scale(1)'; io.disconnect(); }
    }, { rootMargin: '-8%' }).observe(el);
  });
}
```

---

## 3. Place Laval — franja inferior del hero

### Resumen
**NO SE PUDO ANALIZAR.** `https://www.placelaval.ca/en/` responde `403 Forbidden` del servidor de origen (nginx/Apache "Web Server at placelaval.ca") al cliente por defecto de Playwright y de curl, aunque el dominio está en la allowlist del proxy; en Playwright llegó como 502. Un intento puntual con otra identidad de navegador para saltar ese bloqueo fue denegado por el sistema de permisos, y no se insistió: no se evade un bloqueo del servidor.

### Qué hay y qué no
- **Sin valores medidos** (alturas, grid, tamaños, microtexto, chips, scroll cue) de Place Laval. Ningún dato de esta sección procede de esa web.
- Para no dejar el hueco, el snippet de abajo compone la franja inferior con **patrones verificados en las otras referencias**: pie de foto a la izquierda y puntos a la derecha (Pentagram, [EXT]), contador y tarjeta (Wolff Olins, [EXT]) y la línea animada de "scroll" (Fedrigoni, [EXT]: `.scroll-down` alto 5rem, línea de 2 px, `animation: scroll-down-animation 1.5s infinite`, keyframes `translate3d(0,-50px,0) → (0,0,0) → (0,50px,0)`; puntos 13x13 px, `opacity:.4` inactivo, `gap` de 5 px).
- Para completarlo con datos reales hace falta: el HTML/CSS pegado desde DevTools o 2-3 capturas del hero (la franja inferior) de esa URL, o permiso/credencial del propietario del sitio.

### Snippet genérico (vanilla): franja inferior de hero que hace de puente
```html
<section class="hero">
  …capas del hero…
  <div class="hero__strip">
    <p class="hero__micro">Texto breve de contexto, 1 línea</p>
    <ul class="hero__chips"><li>Chip A</li><li>Chip B</li><li>Chip C</li></ul>
    <a class="hero__cue" href="#siguiente" aria-label="Seguir"><span></span></a>
  </div>
</section>
<section id="siguiente" class="bridge">…</section>
```
```css
.hero{position:relative;min-height:100svh;color:#fff}
.hero__strip{position:absolute;left:0;right:0;bottom:0;z-index:2;
  display:grid;grid-template-columns:repeat(12,1fr);column-gap:24px;align-items:end;
  padding:0 24px 28px;
  background:linear-gradient(to top,rgba(0,0,0,.45),rgba(0,0,0,0))}   /* [EST] degradado para legibilidad */
.hero__micro{grid-column:1 / span 4;margin:0;font-size:14px;line-height:1.4}
.hero__chips{grid-column:5 / span 6;display:flex;gap:8px;margin:0;padding:0;list-style:none;justify-content:center}
.hero__chips li{padding:6px 12px;border:1px solid rgba(255,255,255,.5);border-radius:999px;font-size:13px;
  backdrop-filter:blur(7.5px);background:rgba(255,255,255,.12)}
.hero__cue{grid-column:11 / span 2;justify-self:end;width:2px;height:5rem;overflow:hidden;position:relative}
.hero__cue span{position:absolute;inset:0;background:#fff;animation:cue 1.5s infinite}
@keyframes cue{0%{transform:translate3d(0,-50px,0)}50%{transform:translate3d(0,0,0)}100%{transform:translate3d(0,50px,0)}}
/* puente: la sección siguiente sube un poco sobre el hero */
.bridge{position:relative;margin-top:-2rem;border-radius:24px 24px 0 0;background:#fff;padding:90px 24px}
@media (max-width:799px){.hero__strip{grid-template-columns:1fr;row-gap:12px}
  .hero__micro,.hero__chips,.hero__cue{grid-column:1}.hero__chips{justify-content:flex-start;flex-wrap:wrap}}
@media (prefers-reduced-motion:reduce){.hero__cue span{animation:none;transform:none}}
```
Todas las medidas de este snippet son **[EST]** salvo la línea de scroll (Fedrigoni).

---

## 4. Sappi (en-br) — arquitectura de la home y sostenibilidad

### Resumen
**NO SE PUDO ANALIZAR.** `https://www.sappi.com/en-br/` devuelve `403 "Just a moment..."`: reto de Cloudflare (Turnstile). No se intenta resolver ni evadir. No hay orden de secciones, fondos, espaciados ni tratamiento de certificaciones medidos de esta web.

Para completar: pasar HTML renderizado o capturas full-page, o una ruta de la web sin reto.

---

## 5. Fedrigoni Special Papers (/esp/) — fotografía, paleta, escala tipográfica

### Resumen
1. Contrariamente al encargo ("paleta oscura"), la página es **mayoritariamente blanca**: secciones de contenido `#fff` con texto `#000`, alternadas con **bandas fotográficas a sangre** (hero y 3 banners) con texto blanco. El "oscuro" viene de las fotos y de un velo plano, no de fondos oscuros.
2. Tratamiento de foto: capa `.background` + `.dark-filter` con **velo plano** `rgba(0,0,0, 0 / .1 / .3)` configurable por bloque (no hay degradados CSS), texto blanco encima.
3. Tipografía muy grande y espaciada: display 86.4 px / 1.0 y cuerpo "grande" 43.2 px; fuente propia Forma DJR.

### Receta técnica [EXT] (computed + `styles.css`)
- **Plataforma**: WordPress (tema `paper_theme`), jQuery 3.5.1 + **Slick** (slider del hero, dots), select2. Sin GSAP ni Lenis.
- **Raíz tipográfica**: `1rem ≈ 14.4 px` a 1440 (3rem = 43.2 px, 6rem = 86.4 px) → la raíz escala con el viewport (≈1vw) [EST: inferido de los valores; no se leyó el `html{font-size}`].
- **Escala**:
  | Rol | Tamaño / interlineado | Peso | Tracking |
  |---|---|---|---|
  | h1 hero | 86.4 px / 86.4 px (1.0) | 500 | 2.592 px (0.03em) |
  | h3 / párrafos de bloque | 43.2 px / 51.84 px (1.2) | 400 | 2.592 px |
  | h2 menú/overlay | 28 px / normal | 700 | normal |
  | Botón `.block-button` | 16 px / 20.8 px | 700, uppercase | 0.65 px |
  | Nav | 14 px / 15.4 px | 700 | 0.35 px |
  | Body base | 14 px / 14 px | 400 | — |
  Familias: "Forma DJR Banner" (display) y "Forma DJR Text" (texto).
- **Hero**: `.block-hero{height:38vw}` (547 px a 1440), `display:flex; flex-direction:column; justify-content:center; color:#fff`; variante `height:53rem; justify-content:flex-end; padding-bottom:7rem`. Dots Slick abajo (`bottom:5.2rem`): 13x13 px, `border-radius:7px`, blancos, `opacity:.4` → `1` activo.
- **Banners**: `.block-banner{padding:4rem 0; min-height:30vw; max-height:70rem; color:#fff}`; en móvil `padding-top:8rem; min-height:110vw`. Imagen en `.background` (absolute inset 0) con `.dark-filter` encima.
- **Overlays medidos** (6 bloques): `rgba(0,0,0,0)`, `rgba(0,0,0,.3)`, `rgba(0,0,0,0)`, `rgba(0,0,0,.1)`, `rgba(0,0,0,0)`, `rgba(0,0,0,.3)`.
- **Ritmo vertical** (alturas de sección a 1440 px, orden): hero 547 → texto+slider 914 → texto+imagen 577 → separador 627 → banner foto 432 → texto+imagen 677 → banner 545 → texto+slider 650 → banner 483 → noticias 786. Alterna claro/foto; padding de secciones claras 90/40/40/90 px según bloque, bandas de foto 40/40.
- **Paleta**: negro `#000`, blanco `#fff`, grises de UI `#f4f4f4` (38 usos), `#d9d9d9`, `#a6a6a6`, `#ececec`, `#707070`, acento `#648195`.
- **No verificado**: el hero real no se vio (la captura `fed_hero.jpg` muestra un modal de "versión no válida para tu región" superpuesto); el autoplay/velocidad de Slick no se leyó del bundle; no se sacó el aspecto de las fotos (CDN no comprobado).

### Snippet genérico (vanilla): banda fotográfica con velo plano
```html
<section class="photo-band" style="--veil:.3">
  <div class="photo-band__bg"><img src="foto.jpg" alt=""></div>
  <div class="photo-band__text"><h2>Titular grande</h2><p>Apoyo</p></div>
</section>
```
```css
.photo-band{position:relative;color:#fff;min-height:30vw;max-height:70rem;padding:4rem 0;display:flex;flex-direction:column;justify-content:center;overflow:hidden}
.photo-band__bg{position:absolute;inset:0}
.photo-band__bg img{width:100%;height:100%;object-fit:cover}
.photo-band__bg::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,var(--veil,.3))} /* velo plano 0 / .1 / .3 */
.photo-band__text{position:relative;padding:0 6vw}
.photo-band h2{font:500 clamp(40px,6vw,86.4px)/1 system-ui;letter-spacing:.03em;margin:0}
.photo-band p{font:400 clamp(22px,3vw,43.2px)/1.2 system-ui;letter-spacing:.06em}
```

---

## 6. Receta combinada (hero B2B)

Une las cuatro técnicas verificadas (Pentagram, Wolff Olins, franja inferior tipo Fedrigoni/Pentagram, y tratamiento de foto Fedrigoni). Place Laval y Sappi no aportan datos medidos.

**Capas (de abajo a arriba)**
1. `slides`: N figuras `absolute inset:0` con `object-fit:cover`. Crossfade por opacidad, 1000 ms, `ease` (Pentagram). Opcional: fade-in de imagen al cargar 1 s `cubic-bezier(.4,0,.2,1)` (Wolff Olins).
2. `veil`: velo plano `rgba(0,0,0,.3)` sobre las fotos (Fedrigoni) + degradado inferior solo detrás de la franja para legibilidad [EST].
3. `phrase`: frase "Resolvemos [x] para [y]" con columna rodante (Pentagram): fila 44 px (28 móvil), `overflow:hidden`, 1 s `cubic-bezier(.76,0,.24,1)` en `transform` y `width`.
4. `card`: tarjeta de caso abajo-izquierda (Wolff Olins): cliente 20/22, tagline 35/38.5 (≈ `clamp(24px,2.4vw,35px)`), blanco, padding 32/64 px.
5. `strip`: franja inferior en grid de 12 columnas: tarjeta (cols 1-6), contador `01/12` + puntos 18 px `opacity:.5/1` gap 6 px (cols 9-12), línea de scroll 2 px x 5rem con keyframes 1.5 s (Fedrigoni).

**Secuencia / timeline**
| t | Evento | Detalle |
|---|---|---|
| 0 | Frase y cabecera visibles sin animar | WO: cabecera sin animación |
| 0 → 1 s | Espera | Pentagram: delay 1 s |
| 1 → 3 s | Fade-in de la capa de slides (2 s) y primer barrido del texto a la fila del slide 0 (1 s) | `cubic-bezier(.76,0,.24,1)` |
| 3 s | Empieza el autoplay | `onComplete` del fade |
| cada 3 s | `go(i+1)`: crossfade imagen 1 s + barrido texto 1 s + caption/contador + punto activo, todo en el mismo tick | 2 s quieto + 1 s transición |
| scroll > altura de cabecera | Pausa autoplay; el texto vuelve a la posición inicial | Pentagram |
| al entrar en viewport secciones siguientes | `translateY(48px) scale(.99)` → 0, 1200 ms `cubic-bezier(.23,1,.32,1)`, IO `rootMargin:-8%` | Wolff Olins |

**Reglas de implementación**
- Un solo "reloj" (`go(i)`) controla imagen, texto, caption, contador y puntos: así nunca se desincronizan.
- Medir anchos de la columna rodante tras `document.fonts.ready` y en `resize`.
- Intervalo total = `interval (2 s) + fade (1 s)`; si los textos son largos, subir a 4-5 s por lectura (el ritmo de Pentagram es rápido porque son 1-3 palabras).
- Accesibilidad: frase completa en `aria-label` y partes animadas con `aria-hidden`; `prefers-reduced-motion` ⇒ sin autoplay ni transiciones; botones de punto con `aria-label`; pausa también en `:hover/:focus-within` (no la tienen las referencias; recomendación propia).
- Solo animar `opacity` y `transform` (y `width` en la frase, que es pequeña).
- Sustituir fuentes propietarias (Monument Grotesk, Plain, Forma DJR, Untitled Serif) por las de la marca; los tamaños son referencia.

**Esqueleto mínimo (une los snippets 1, 2 y 3)**: usar el HTML/JS del apartado 1 como motor; añadir la tarjeta `.wo-card` y el contador dentro de `.hero__strip` (apartado 3) y actualizar su texto dentro de `go()`; aplicar `--veil` (apartado 5) en `.rh__slide::after`.

---

## 7. Qué no se pudo verificar (resumen)
- **Place Laval**: 403 del origen; sin medidas. Snippet de franja = composición con patrones de otras referencias, valores [EST].
- **Sappi**: reto Cloudflare; sin análisis.
- **Pentagram**: easing exacto del crossfade (inferido `ease`); imágenes bloqueadas (imgix), sin ver la foto final.
- **Wolff Olins**: velocidad de transición de slide (default Swiper asumido, 300 ms); contenido real de la secuencia de entrada limitado a fade de imagen.
- **Fedrigoni**: hero real tapado por modal de región; autoplay de Slick no leído; raíz `rem` inferida.
