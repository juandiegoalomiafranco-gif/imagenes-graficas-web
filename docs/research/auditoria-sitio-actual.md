# Auditoría del sitio actual - imagenesgraficas.com

Fecha de auditoría: 2026-11-14. Método: curl + Playwright/Chromium (DOM renderizado, con scroll para lazy-load). Fuentes: HTML renderizado de cada URL del `wp-sitemap.xml`, más enlaces del menú. Todo el copy aparece literal (incluyendo erratas y ligaduras "ﬁ/ﬂ" del original). Lo no leído se marca NO VERIFICADO.

Prefijo `UP/` = `https://www.imagenesgraficas.com/wp-content/uploads/`.

## 0) Tecnología
- WordPress 6.9.4 (generator meta). Page builder: **Beaver Builder 2.10.1.6** (`bb-plugin`) + **Power Pack for BB** (`bbpowerpack`: módulos `pp-testimonials`, `pp-content-grid`, login form de IntraNet). Tema: `bb-theme` 1.7.19.2 con tema hijo **`pypgroup-theme-child`** (agencia que lo construyó: "PYP Group", inferido del nombre del tema; NO VERIFICADO).
- Plugins visibles: Contact Form 7 (form id 217, página id 214), Complianz GDPR (banner de cookies UE, modo opt-in), módulos BB: content-slider, subscribe-form (newsletter, proveedor NO VERIFICADO), photo, rich-text.
- Tipografía: Google Fonts Montserrat (300/400/600/700/800). Iconos: Font Awesome 5.15.4.
- Google Maps Embed API (contacto) con API key incrustada en el HTML público (AIzaSy... visible en el iframe; riesgo de seguridad/cuota; no se reproduce aquí).
- Sin Google Analytics/GTM/Facebook Pixel detectados en el HTML de la home (grep negativo). Puede cargarse tras consentimiento (NO VERIFICADO).
- Permalinks mixtos: `/index.php/slug/` (PATHINFO). `/agencia-btl/` y `/agencia-creativa/` sin `/index.php/` dan 404 (ver problemas).
- robots.txt: `Disallow: /wp-admin/`, `Allow: admin-ajax.php`, Sitemap `/wp-sitemap.xml`. REST API pública abierta (`/wp-json/wp/v2/...` 200).

## 1) Mapa del sitio

Menú principal (idéntico en todas las páginas): Inicio · Nosotros · Soluciones (desplegable: Agencia Creativa, Soluciones impresas, Visibilidad de marca, Agencia BTL, Promos + Gifts Importados, Promos + Gifts en stock, Promos + Gifts a la medida, Soluciones sostenibles) · Casos de éxito · Blog · Contacto · IntraNet · Política de cookies (UE). Barra superior: teléfono `(+57 2) 441 61 53` (tel:0324416153) + iconos Facebook, Pinterest, Instagram. Logo: `UP/2020/06/Imagenes-graficas-1.png`.

```
/                                   Home (page id 2)             mod 2025-06-05
/index.php/nosotros/                Nosotros (id 204)            mod 2026-05-29
/index.php/agencia-creativa/        Soluciones: Agencia Creativa mod 2025-04-28
/index.php/soluciones-impresas/     Soluciones: Impresas         mod 2024-01-12
/index.php/visibilidad-de-marca/    Soluciones: Visibilidad      mod 2020-08-21
/index.php/agencia-btl/             Soluciones: BTL              mod 2020-08-21
/index.php/promos-gifts-importados/ Soluciones: Gifts Importados mod 2024-01-15
/index.php/promos-gifts-en-stock/   Soluciones: Gifts en Stock   mod 2024-05-20
/index.php/promos-gifts-a-la-medida/ Soluciones: Gifts a la Medida mod 2020-08-21
/index.php/soluciones-sostenibles/  Soluciones: Sostenibles      mod 2020-08-21
/index.php/casos-de-exito/          Casos de éxito (1 caso: Dettol) mod 2020-08-03
/index.php/blog/                    Blog (grid de 4 posts)       mod 2020-08-19
   /index.php/texto-prueba-noticia/            "El BTL en los mercados publicitarios actuales" (2022-02-07; slug "texto-prueba")
   /index.php/stands-y-ferias-un-negocio-en-potencia/  (2020-07-16)
   /index.php/el-lenguaje-del-marketing/        (2020-07-16)
   /index.php/packaging-y-producto/             (2020-07-16; NO enlazado en el home, sí en blog)
   /index.php/category/noticias/  y  /index.php/category/noticias/articulos/
/index.php/contacto/                Contacto (id 214)            mod 2020-08-03
/index.php/intranet/  y  /intranet/ Login empleados (wp-login.php) mod 2025-04-28
/index.php/politica-de-cookies-ue/  Política cookies (Complianz) actualizada 6-may-2024
/index.php/prueba/                  Página de prueba con shortcode [logoshowcase] sin renderizar (en sitemap, indexable)
Documentos PDF (Nosotros): código de ética, informes de gestión BIC 2020-2025, política de tratamiento de datos
Externos: imagraphicusa.com (filial EE. UU.), cataprom.com y muy.promo (catálogos virtuales; NO VERIFICADO, host no permitido)
Sitemap (wp-sitemap): 4 posts + 16 páginas + 2 categorías.
```

No existen páginas separadas para: casos de éxito individuales, PQRS (solo texto en footer, sin formulario), "Trabaje con nosotros" (solo correo en footer), términos y condiciones. No hay /tienda ni carrito.

## 2) Inventario página por página (resumen estructurado)

Datos comunes: ninguna página tiene `<meta name="description">` (todas null), no hay Open Graph ni H1 en la mayoría. `robots: max-image-preview:large`. Idioma `es`. Footer común: ver sección "Footer global".

### 2.1 Home `/`
- Title: "Imagenes Gráficas". Meta description: NO EXISTE. H1: NO EXISTE (ningún h1; los titulares son `<p>`).
- Overlay: banner de cookies Complianz ("Gestionar consentimiento"; botones Aceptar / Denegar / Ver preferencias / Guardar preferencias; categorías Funcional, Preferencias, Estadísticas, Marketing; texto en español, con un placeholder sin renderizar "Gestionar {vendor_count} proveedores" y "{title}" en el menú -> defectos).
- Orden exacto de secciones:
  1. **Hero slider (BB content-slider, 2 slides idénticos, sin texto: solo imagen)**. Desktop: fondo `UP/2020/06/slider.jpg`; móvil: `UP/2020/08/slider-movil.png` (1008x504). Slide 2 repite la misma imagen. Los titulares del hero están en una sección contigua (siguiente).
  2. **Claim + 8 soluciones** (4 + 4 iconos): "Soluciones impactantes" / "para ideas inteligentes" / "¡Todo lo que su marca requiere bajo un mismo techo!". Iconos con enlace: Agencia creativa (`UP/2020/01/icon-agencia-vacio.jpg`), Soluciones impresas (`icon-impresos-vacio-1.png`), Visibilidad de marca (`icon-visibilidad-vacio.png`), Agencia BTL (`icon-btl-vacio.png`; el texto "Agencia" enlaza a /index.php/agencia-btl/ y "BTL" a **/agencia-btl/ (404)**), Promos + Gifts a la medida (`icon-regalables-vacio.png`), Promos + Gifts Importados (`icon-promo-vacio-1.png`), Promos + Gifts en stock (`icon-stock-vacio.png`), Soluciones sostenibles (`icon-sostenibles-vacio.png`). Los iconos están "vacíos" (estado hover "lleno": `icon-sostenibles-lleno.png`).
  3. **Sostenibilidad** (fondo `UP/2020/01/imagenes-graficas-fondo-verde.jpg`, imagen `UP/2020/01/ambiente.png`): "Nuestro principal aliado:" / "El Planeta Tierra" / "Estamos comprometidos con nuestros clientes y con el medio ambiente." / "Contamos con procesos de producción e inﬁnidad de productos amigables con el ecosistema."
  4. **Banner Casos de éxito (slider 2)**: imagen `UP/2020/07/banner-casos-de-exito.jpg` (móvil `UP/2020/08/slider-4-movil.jpg`); sin texto ni enlace visible (NO VERIFICADO si es clicable).
  5. **Frase de marca con comillas** (`comilla-abrir.png`, `mano.png`, `comilla-cerrar-.png`): imagen "mano" sin texto.
  6. **Cobertura** (fondo `UP/2020/07/mapa-cobertura.jpg`, imagen `UP/2020/07/360.png`): "Cobertura en toda" / "América" / "Hoy entregamos nuestros productos en los principales países de América con atención comercial personalizada. Contamos con presencia en las principales ciudades de Colombia y oficina propia en Miami, Estados Unidos."
  7. **Blog (pp-content-grid, 3 de 4 posts)**: título de sección "Blog". Tarjetas: "El BTL en los mercados publicitarios actuales" (img btl-3), "Stands y ferias: un negocio en potencia" (img entrada3), "El lenguaje del marketing" (img entrada-2), cada una con extracto literal (ver Banco de copy). Falta el 4.º post (Packaging).
  8. **Frase** (duplicada en desktop y móvil): "Creamos experiencias originales y generamos resultados memorables" entre comillas decorativas.
  9. **Testimonios (pp-testimonials, carrusel 4 slides)**: "Lo que dicen" / "nuestros Clientes". Ver testimonios literales abajo.
  10. **Contacto/footer global** (gradiente): ver "Footer global".
- Clientes con logo en home: Fundación Valle del Lili (`UP/2020/03/logo-fundacion-valle-del-lili.jpg`), Future (`UP/2024/01/futupro.jpg`), Postobón (`UP/2019/06/imagenes_graficas_postobon.jpg`), Coomeva (`UP/2019/06/imagenes_graficas_coomeva.jpg`). NO hay sección de logos de clientes ni cifras en la home (el shortcode `[logoshowcase]` de /prueba/ no se renderiza).
- CTAs en home: solo los 8 enlaces a soluciones, 3 tarjetas de blog, botón "Ingresar" del newsletter y enlaces de footer. No hay botón de cotizar/WhatsApp.
- Popups: ninguno aparte del banner de cookies. WhatsApp flotante: no detectado.

### 2.2 Nosotros `/index.php/nosotros/`
- Title: "Nosotros – Imagenes Gráficas". Meta description: no existe. H1: "Nosotros".
- Secciones (copy literal en Apéndice A, cifras abajo): Hero con "Nosotros / Imágenes Gráﬁcas / Somos la compañía de comunicación gráﬁca que soluciona de manera integral todas las necesidades para promocionar una marca, campaña o cualquier idea." + foto `UP/2020/06/fabrica.jpg`; documentos descargables (Código de ética, Reportes de gestión BIC 2020-2025, Política de tratamiento de datos); 4 pilares con iconos; cifras con fotos; "No conocemos los límites"; inclusión social; ambiente; "Somos una empresa socialmente responsable" (Comfandi, cita del gerente); "Apoyamos a la comunidad"; Reconocimientos; Certificaciones (logos Bureau Veritas, Sedex, ink); "Nuestra Planta" con 6 GIFs y enlace YouTube https://youtu.be/iQHSHdX0yMc.

### 2.3 a 2.10 Líneas de Soluciones
Cada página sigue el patrón: hero slider (imagen sin texto) -> claims -> "¿Qué hacemos?" (cards H2 con foto + párrafo) -> "¿Cómo lo hacemos?" (cards H2) -> diferenciales -> "Proyectos" (galería con lightbox, títulos T:) -> footer. Ninguna tiene H1 ni meta description; titles "{Nombre} – Imagenes Gráficas". No tienen CTA de cotización propio. Detalle literal de cada una en Apéndice A (secciones B1-B8). Resumen:
- **Agencia Creativa** (`/index.php/agencia-creativa/`): "Agencia full service"; 3 beneficios (único punto de contacto; Eﬁciencia tiempo y costo; Know how); cita Steve Jobs; 17 servicios; proceso en 3 pasos (Planear y organizar / Conceptualizar y crear / Producimos y entregamos); 11 proyectos.
- **Soluciones Impresas**: maquinaria (28 cuerpos Heidelberg, +100 mil pliegos/hora, impresión sensitiva, láser, 3D, UV hasta 10 cm); 8 "qué hacemos" + 12 "cómo lo hacemos"; 3 diferenciales; 15 proyectos.
- **Visibilidad de Marca**: cadena Estrategia > Diseño > Ingeniería > Manufactura (6500 m2) > Logística; 12 "qué hacemos"; 12 "cómo lo hacemos"; 4 momentos del shopper (Transición, Impulso, Destino, Punto de pago); 12 proyectos.
- **Agencia BTL**: "Equipo BTL con más de 20 años de experiencias"; 6 "qué hacemos"; 20 "cómo lo hacemos"; "Nuestra fórmula" (4 pilares); 10 proyectos.
- **Promos + Gifts Importados**: proceso de 6 pasos; ~30 categorías; proyectos; 5 catálogos virtuales.
- **Promos + Gifts en Stock**: 4 catálogos online (Gifts, Premiums, Regalos, Promos); ~25 categorías; ~30 proyectos.
- **Promos + Gifts a la Medida**: proceso (diseño, mockup en 24 h, costura, control de calidad); 20 categorías; 16 proyectos.
- **Soluciones Sostenibles**: 4 definiciones (Orgánico, Sostenible renovable y rápido, Reciclable, Sostenible); 12 "qué hacemos"; 12 proyectos; cifra de bolsas reutilizables.

### 2.11 Casos de éxito `/index.php/casos-de-exito/`
- Title "Casos de éxito – Imagenes Gráficas". H1 ninguno (hay `P: Casos de éxito`). Fondo `UP/2020/07/exito-1.jpg`.
- Intro literal: "Compartimos algunos casos exitosos, producidas a empresas que por mas de 3º años han confiado en nosotros. Estos son reflejo del trabajo de nuestro gran equipo de trabajo y la confianza de nuestros clientes." (erratas: "producidas", "3º años", "mas")
- **Único caso: Dettol** (logo `UP/2020/08/dettol.png`). PROYECTO: "Estuches para gel antibacterial". EL RETO: "Desarrollar un porta gel adaptable al empaque del producto que logre impulsar e incrementar las ventas del producto." LA ACCIÓN: "Desarrollamos los modelos, moldes y realizamos producción de mas de 100 mil unidades de estuches para Colombia, Chile y Argentina." RESULTADOS: "Se incrementaron las ventas de Dettol en mas del 300% y se convirtió en el proyecto mas exitoso de la región en el año de ejecución." 6 fotos: `UP/2020/08/detto-1.jpg` ... `detto-6.jpg`.
- No hay casos individuales con URL propia.

### 2.12 Blog `/index.php/blog/`
- Title "Blog – Imagenes Gráficas". Sin H1. Grid de 4 artículos (ver tabla). Categorías: "Noticias" y "Artículos" (subcategoría). Widgets: búsqueda, "Entradas recientes", "Categorías".
| Título | Fecha de modificación (sitemap) | URL | Imagen |
|---|---|---|---|
| El BTL en los mercados publicitarios actuales | 2022-02-07 (slug `texto-prueba-noticia`; cats Artículos+Noticias) | /index.php/texto-prueba-noticia/ | UP/2020/08/btl-3.jpg |
| Stands y ferias: un negocio en potencia | 2020-07-16 | /index.php/stands-y-ferias-un-negocio-en-potencia/ | UP/2019/08/entrada3.jpg |
| El lenguaje del marketing | 2020-07-16 | /index.php/el-lenguaje-del-marketing/ | UP/2019/08/entrada-2.jpg |
| Packaging: la cara vendedora del producto | 2020-07-16 | /index.php/packaging-y-producto/ | UP/2019/08/entrada2.jpg |
- Fecha de publicación visible: NO se muestra fecha en las páginas (solo "Publicado en [categoría]"). Las fechas arriba son `lastmod` del sitemap (no necesariamente de publicación). Los posts tienen formulario de comentarios abierto.
- Detalle: el post "Stands y ferias" realmente trata de **endomarketing** (contenido no corresponde al título), y "El lenguaje del marketing" trata de POP/punto de venta (cita 70% de decisiones en punto de venta, Nielsen/Path to Purchase Institute; 33 productos lanzados cada día, Kantar 2014). Títulos y cuerpos parecen cruzados.

### 2.13 Contacto `/index.php/contacto/`
- Title "Contacto – Imagenes Gráficas". Sin H1.
- Intro: "Contáctenos" / "Para solicitar mayor información o cotizar algún producto, contactenos." (sin tilde).
- **Formulario Contact Form 7 (id 217)**, campos exactos y orden: `Nombre*` (text, name=your-name) · `Correo*` (email, name=your-email) · `Teléfono*` (tel, name=celular) · `Mensaje` (textarea, name=your-message) · botón `Enviar`. Hay además un campo honeypot (name=email, "Por favor, deja este campo vacío.") y los hidden de CF7. Sin casilla de aceptación de tratamiento de datos, sin campo empresa/asunto.
- Mapas Google embebidos (3): Calle 24 No. 4-31 (Cali), Calle 127c 4-51 (Bogotá), 390 NW 86th Ct #8 33126 (Miami). Fondo `UP/2019/06/imagenes_graficas_gris.jpg`.

### 2.14 IntraNet `/index.php/intranet/` (y `/intranet/`)
- Title "IntraNet – Imagenes Gráficas" (página) / "Intranet | Ingreso" (en `/intranet/`). Formulario de login (action `wp-login.php`): "Número de identidad" (placeholder "Documento de identificación"), "Contraseña" (con mostrar/ocultar), botón "Ingresar". Fondo `UP/2020/12/portrait.jpg`, logo "Ingreso" `UP/2020/12/Recurso-1-300x123.png`. Contenido tras login: NO VERIFICADO.

### 2.15 Política de cookies (UE) `/index.php/politica-de-cookies-ue/`
- Generada por Complianz, "actualizada por última vez el 6 mayo, 2024"; secciones: 1. Introducción, 2. ¿Qué son las cookies?, 3. ¿Qué son los scripts?, 4. ¿Qué es una baliza web?, 5. Cookies, 6. Cookies usadas (WordPress; Functional...), etc. Texto completo en Apéndice A.
- Políticas legales adicionales encontradas: **Política de tratamiento de datos** (PDF en Nosotros), **Código de ética** (PDF). NO hay página de términos, ni aviso de privacidad HTML, ni formulario PQRS.

### Footer global (todas las páginas)
- "Contacto": CALI (+57-2)441 6153 Calle 24 No. 4-31 · BOGOTÁ (+57) 318 363 7106 Calle 127c 4-51 · MIAMI (305) 264 3417 390 NW 86th Ct #8 33126.
- "Contáctenos": "Para solicitar mayor información o cotizar algún producto, contáctenos a: mercadeo@imagenesgraﬁcas.com" · "(+57) 317 6364326" (WhatsApp/celular, sin enlace; NO VERIFICADO). Nota: el correo usa ligadura "ﬁ" (U+FB01) en el texto: copiar/pegar o mailto puede fallar.
- Aviso: "Todo lo que se muestra en esta página web tiene como fin mostrar nuestra capacidad de desarrollo y producción. Las marcas mostradas solo tienen fines ilustrativos."
- "Trabaje con nosotros": "Si se considera una persona talentosa y quiere ser parte de nuestro equipo, envíenos su hoja de vida a: talentohumano@imagenesgraﬁcas.com"
- "Servicio al cliente": "Presente sus peticiones, quejas, reclamos y sugerencias (PQRS) que surjan respecto a la calidad de los servicios ofrecidos y las actuaciones de nuestros funcionarios." + "CALI (+57-2) 441 6153 Calle 24 No. 4-31".
- "Síganos:" Instagram https://instagram.com/imagenes_graficas?igshid=di1ufcnwhc4f · Facebook https://www.facebook.com/imagenesgraficasbicsas/ · Pinterest https://pin.it/oanijfeol2ru5c (iconos `UP/2019/06/imagenes_graficas_ig.png|fb.png|pt.png`). No hay LinkedIn, YouTube (solo un enlace youtu.be en Nosotros), WhatsApp ni TikTok.
- "Reciba noticias de interes." Newsletter: campo "Correo Electrónico", botón "Ingresar", mensajes "Introduce una dirección de email válida, por favor." / "¡Gracias por suscribirte! Por favor revisa tu correo electrónico para obtener más instrucciones." / "Algo ha salido mal. Por favor, revisa lo que has introducido e inténtalo de nuevo."
- "Visita también:" logo Imagraphic -> http://imagraphicusa.com/ (`UP/2019/06/imagenes_graficas_logo_imagraphic.png`). Filial/sitio en EE. UU.
- Copyright literal: "Copyright 2019 © | Todos los derechos reservados" (desactualizado). Botón "Scroll To Top".

## 3) Banco de imágenes
Resumen: 455 URLs únicas (todas bajo el host del sitio). Las imágenes de proyectos están en `UP/2020/06-08/`. La tabla completa está en el **Apéndice B**. Hallazgos de calidad: hero de 2020 (`slider.jpg`), versiones móviles `slider-movil.png` 1008x504 y GIFs 300x300 en "Nuestra Planta"; casi todos los alt son descriptivos en proyectos, pero vacíos en hero y en galería del caso Dettol. Fotos de personas/cliente: NO VERIFICADO (no se revisó el contenido visual, solo nombre/alt).

## 4) Banco de copy reutilizable

### Claims y titulares
- "Soluciones impactantes para ideas inteligentes"
- "¡Todo lo que su marca requiere bajo un mismo techo!"
- "Creamos experiencias originales y generamos resultados memorables"
- "Nuestro principal aliado: El Planeta Tierra" / "Estamos comprometidos con nuestros clientes y con el medio ambiente."
- "Cobertura en toda América"
- "Somos la compañía de comunicación gráﬁca que soluciona de manera integral todas las necesidades para promocionar una marca, campaña o cualquier idea."
- "Fábrica de las Grandes Ideas" (autodenominación en "Apoyamos a la comunidad")
- "No conocemos los límites" · "Entregas en cualquier lugar del MUNDO." · "Todo bajo un mismo techo. Procesos y equipo a su SERVICIO." · "Absoluta CONFIDENCIALIDAD."
- "Traducimos las necesidades de mercadeo de nuestros clientes en experiencias de marca dirigidas a conectar emocionalmente con el shopper."
- "Somos su único punto de contacto para el desarrollo del marketing organizacional." / "CON SERVICIOS INTEGRALES TODOS EN CASA, SOMOS UN ÚNICO PUNTO DE CONTACTO PARA TODAS SUS NECESIDADES DE MARCA."
- "Nuestra gran ventaja: contar con capacidad propia de producción. Efectividad con ahorro en costos y tiempo."
- "Traemos el mundo hasta su puerta con productos de primera calidad." · "Convertimos sus ideas en productos rentables y creativos." · "Creamos soluciones a la medida de sus necesidades." · "Si puede imaginarlo, ¡podemos crearlo!" · "Visuales y muestras en 24 horas."
- "Productos en materiales ecofriendly" / "Logramos impactar con grandes productos garantizando la vida de generaciones futuras."

### Cifras y datos duros (literales)
- "Hemos transformado ideas brillantes en productos impactantes desde 1989." (fundación 1989 según el sitio; otros directorios dan 1990/1999: inconsistencia a validar)
- "Somos más de 280 colaboradores comprometidos" (Nosotros) / "Más de 280 personas expertas en shopper marketing" (Visibilidad) / "Generamos empleo para más de 200 personas" (Nosotros): inconsistencia 280 vs 200.
- "460,000 PLIEGOS DIARIOS DE IMPRESIÓN" · "60 IMPRESIONES X MINUTO" · "1,500 CLIENTES FELICES"
- "Nuestra planta de producción funciona 24/7." · "6500 m2 de planta de producción." · "Más de 28 cuerpos de impresión Alemanes Heilderberg" (sic, es Heidelberg) · "más de 100 mil pliegos por hora" · impresión textil "Desde 1 unidad hasta producciones masivas de más de 1000 unidades" · UV rígidos "hasta 10 cm. De espesor".
- "El 67% de nuestros colaboradores son mujeres." · "Trabajamos con 43 madres cabeza de hogar." · "Integramos a nuestro equipo a personas sordas." (10 años con Comfandi, Pacto de Productividad)
- "Equipo BTL con más de 20 años de experiencias" · "Experiencia exportadora de mas de 15 años."
- Dettol: +100 mil unidades; Colombia, Chile y Argentina; ventas +300%.
- Bolsas reutilizables: "evitar 6 bolsas plásticas por semana, 24 al mes, 288 al año Y 22.776 bolsas plásticas durante una vida promedio."
- BTL en Colombia: "$1.29 billones de pesos" de inversión publicitaria (post blog); 70% de decisiones de compra en punto de venta (Nielsen).
- Sedes: Cali (Calle 24 No. 4-31), Bogotá (Calle 127c 4-51), Miami (390 NW 86th Ct #8 33126). Presencia "en las principales ciudades de Colombia".

### Sostenibilidad / BIC / certificaciones
- "Utilizamos tintas ecológicas a base de soya y libres de plomo." · "Empleamos papel fabricado 100% a base de caña de azúcar, sin químicos blanqueadores, con sellos FSC y libres de cloro." · "Poseemos un sistema de generación de energía mediante paneles solares fotovoltaicos." · "Implementamos programas de ahorro de agua y energía." · "Contamos con mecanismos eficientes para la reducción de huella de carbono." · "Capacitamos a nuestro equipo en temas de sensibilización ambiental."
- Reportes "Reporte de Gestión BIC 2020 ... 2024" + "INFORME DE GESTIÓN 2025" (PDF). **"BIC" = Beneficio e Interés Colectivo** (denominación legal; el sitio NO la explica ni usa el término "Sociedad BIC" en copy visible: NO VERIFICADO el significado según el sitio).
- Certificaciones (logos en Nosotros, "Nuestra fábrica está acreditada con estas certiﬁcaciones"): `UP/2020/06/7bureau.png` (Bureau Veritas, inferido del nombre), `Sedex-member.png`, `ink.jpg` (logo no identificado: NO VERIFICADO). Sin texto de norma (ISO etc.).
- Reconocimientos: Premio PNEIG 2018 (Corporación Calidad; categoría "Organización Manufacturera o Industrial Mediana") y Reconocimiento Gobernación del Valle / Fundación Carvajal por empresa incluyente (dic 2018, entregado por la Gobernadora Dilian Francisca Toro).

### Testimonios literales (Home, carrusel "Lo que dicen nuestros Clientes")
1. "Imágenes Gráficas, realizaron un trabajo impecable, quedó espectacular. Increíble cómo quedó todo, mil gracias de verdad." — Fundación Valle del Lili (sin nombre ni cargo).
2. "Quiero que le des mi más sincero agradecimiento a todo el equipo de Imágenes Gráficas por el apoyo que nos dieron con nuestras producciones, se hizo en tiempo record y realmente estamos muy satisfechos con los productos, en especial las cajas de presentación que han sido un éxito." — Jefe de compras, Future (logo `futupro.jpg`).
3. "En nombre de Postobón S.A, escribo para expresar mi agradecimiento por el compromiso y esfuerzo de Imágenes Gráficas BIC S.A.S. Logramos cumplir el compromiso adquirido con Expoartesano 2015 y alcanzar nuestros objetivos de marca. Para nosotros es muy importante saber que contamos con un proveedor que también es un socio estratégico." — Director Postobon S.A.
4. "Desde la unidad de Gestión del Cambio, queremos agradecer a Imágenes Gráficas por todo el apoyo brindado en las últimas semanas. El tiempo de respuesta ha sido oportuno y han cumplido con la calidad que los caracteriza. Esperamos seguir contando con ustedes como nuestro aliado, gracias." — Director corporativo de desarrollo organizacional Coomeva.
- Ningún testimonio tiene nombre propio. Citas del gerente (Nosotros): «Para nosotros es muy importante brindarles calidad de vida y una estabilidad laboral, hacerles sentir que son esenciales no solo para Imágenes Gráficas sino también para nuestra ciudad y el mundo entero.» y «Imágenes Gráficas no solo es responsable por lo que pasa entre sus cuatro paredes, sino también por lo que pasa en la ciudad, Colombia y el mundo entero.» — Fernando Alomía, Gerente Imágenes Gráficas.

### Clientes / marcas mencionadas o con logo
Con logo o testimonio: Fundación Valle del Lili, Future, Postobón (Expoartesano 2015), Coomeva, Dettol (caso). En alt/captions de galerías: Honda (alt "Lanzamiento honda", "Lanzamiento honda actividad", "Lanzamiento honda decoración"), supermercados Jumbo, Metro, La 14 y Olímpica (mencionados en Impactrafic como lugares de pauta, no clientes). Otros posibles clientes en galerías: NO VERIFICADO (no se inspeccionó visualmente cada foto). Sin sección de logos de clientes.

### Descripciones por línea (copy literal): ver Apéndice A.

## 5) Problemas detectados
**SEO / técnico**
1. Ninguna página tiene meta description; titles genéricos ("Imagenes Gráficas" en home sin keywords; "Imagenes" sin tilde en todos).
2. Sin H1 en home y en la mayoría de páginas (solo Nosotros, posts y archivos); titulares como `<p>`; cuerpo sin jerarquía semántica.
3. Sin Open Graph/Twitter cards; canonical presente.
4. URLs con `/index.php/` (pathinfo); versiones sin `/index.php/` dan 404 (`/agencia-btl/`, `/agencia-creativa/`, `/promocionales/`, `/regalos/`).
5. Página `/index.php/prueba/` (shortcode `[logoshowcase]` roto) y post "texto-prueba-noticia" (slug de prueba) están indexables en el sitemap.
6. Imágenes sin alt: sliders, galería del caso Dettol, GIFs de planta, imágenes de posts.
7. Hero 100% imagen (el texto del hero está horneado en JPG, no indexable) y slider con 2 slides duplicados.
8. API key de Google Maps expuesta en el HTML; REST API abierta.
9. Texto con ligaduras Unicode (ﬁ, ﬂ) en muchos textos y en los correos: dañan búsqueda, copiar/pegar y mailto.

**Enlaces rotos / defectos**
10. `/agencia-btl/` (404) desde "BTL" en el home; `/agencia-creativa/` (404) desde el icono en Nosotros; `/promocionales/` y `/regalos/` (404) en botones "Ver catálogo virtual" de Gifts en Stock; `/REPORTE2021.pdf` (404) en Nosotros.
11. Placeholders sin renderizar en la UI: "{title}" (ítems de menú ocultos) y "Gestionar {vendor_count} proveedores" (Complianz).
12. Catálogos externos (`cataprom.com`, `muy.promo`, `imagraphicusa.com`) son HTTP sin TLS; estado NO VERIFICADO (hosts no permitidos).
13. Promos + Gifts Importados: los botones "Ver catálogo virtual / Descargar catálogo PDF" no mostraron href en el DOM renderizado (NO VERIFICADO si funcionan).
14. Newsletter "Ingresar" (texto de botón impropio) enlaza a la propia página; proveedor de envío NO VERIFICADO.

**Contenido viejo / inconsistente**
15. Copyright "2019"; blog de 2020 (4 artículos, ninguno con fecha visible); un solo caso de éxito (2020); testimonios de 2015 (Expoartesano); estadísticas BTL 2018.
16. Cifras contradictorias: 280 vs 200 colaboradores; fundación 1989 (sitio) vs directorios externos 1990/1999 (ver nota abajo).
17. Erratas: "Heilderberg", "Múltimateriales", "Impactraﬁc" (¿Impactrafic?), "Estratégias", "moviliario", "sutratos", "Préstamos a nuestros clientes", "mas", "3º años", "contactenos", "producidas a empresas", "manofaturados", "Nuestro principal aliado... Planeta".
18. Títulos de posts no corresponden al cuerpo ("Stands y ferias" habla de endomarketing).
19. Texto en footer "(+57) 317 6364326" sin enlace tel:/wa.me; teléfono del header usa `tel:0324416153` (formato nacional, sin +57).
20. Sin formularios de PQRS ni de empleo (solo correos); formulario de contacto sin consentimiento de datos y con campo honeypot visible para lectores de pantalla ("Por favor, deja este campo vacío.").
21. Página de cookies orientada a la UE (GDPR) en sitio colombiano: corresponde Ley 1581/2012 (la política de datos está solo como PDF).
22. Hero/animaciones: carruseles BB sin controles accesibles evidentes; contraste NO VERIFICADO.
23. No hay captura de clientes (logos), certificaciones con texto, ni casos con resultados salvo Dettol.

Nota de fuentes externas (de la auditoría previa, no del sitio): EMIS indica constituida 24-11-1999 con 187 empleados (2023); techbehemoths indica 1990. Contradice "desde 1989" y "más de 280 colaboradores".

NO VERIFICADO en general: contenido de la IntraNet tras login; destino real de los catálogos virtuales externos; comportamiento de hovers/animaciones; si el banner de casos de éxito del home es clicable; plugin de newsletter; analítica; contenido visual real de las fotos; versión móvil (solo se evaluó viewport 1440x900).


## Apéndice A) Extractos literales por página (texto, CTAs, imágenes)

Formato: `# / ## / ###` = encabezados; `P:` párrafo; `T:` texto suelto; `A:` enlace; `IMG:` imagen con alt; `BG(...)` imagen de fondo CSS; `UP/` = prefijo de uploads; `SITE` = https://www.imagenesgraficas.com

### A-home
```
IMG: UP/2020/08/slider-movil.png alt="" 
BG(.fl-slide-bg-photo): UP/2020/06/slider.jpg
P: Soluciones impactantes
P: para ideas inteligentes
P: ¡Todo lo que su marca requiere bajo un mismo techo!
P: Agencia creativa
   link: [Agencia creativa] -> SITE/index.php/agencia-creativa/
P: Soluciones impresas
   link: [Soluciones impresas] -> SITE/index.php/soluciones-impresas/
P: Visibilidad de marca
   link: [Visibilidad de marca] -> SITE/index.php/visibilidad-de-marca/
P: Agencia BTL
   link: [Agencia] -> SITE/index.php/agencia-btl/
   link: [BTL] -> SITE/agencia-btl/
P: Promos + Gifts a la medida
   link: [Promos + Gifts a la medida] -> SITE/index.php/promos-gifts-a-la-medida/
P: Promos + Gifts Importados
   link: [Promos + Gifts Importados] -> SITE/index.php/promos-gifts-importados/
P: Promos + Gifts en stock
   link: [Promos + Gifts en stock] -> SITE/index.php/promos-gifts-en-stock/
P: Soluciones sostenibles
   link: [Soluciones sostenibles] -> SITE/index.php/soluciones-sostenibles/
BG(.fl-row-content-wrap): UP/2020/01/imagenes-graficas-fondo-verde.jpg
P: Nuestro principal aliado:
P: El Planeta Tierra
P: Estamos comprometidos con nuestros clientes y con el medio ambiente.
P: Contamos con procesos de producción e inﬁnidad de productos amigables con el ecosistema.
IMG: UP/2020/01/ambiente-297x300.png alt="ambiente" 
IMG: UP/2020/08/slider-4-movil.jpg alt="" 
BG(.fl-slide-bg-photo): UP/2020/07/banner-casos-de-exito.jpg
IMG: UP/2019/06/imagenes_graficas_comilla-abrir.png alt="imagenes_graficas_comilla-abrir" 
IMG: UP/2020/06/mano-768x139.png alt="mano" 
IMG: UP/2019/06/imagenes_graficas_comilla-cerrar-.png alt="imagenes_graficas_comilla-cerrar-" 
BG(.fl-row-content-wrap): UP/2020/07/mapa-cobertura.jpg
P: Cobertura en toda
P: América
P: Hoy entregamos nuestros productos en los principales países de América con atención comercial personalizada. Contamos con presencia en las principales ciudades de Colombia y oficina propia en Miami, Estados Unidos.
IMG: UP/2020/07/mapa-cobertura.jpg alt="mapa-cobertura" 
IMG: UP/2020/07/360-768x643.png alt="360" 
P: Blog
A: [] -> SITE/index.php/texto-prueba-noticia/
IMG: UP/bb-plugin/cache/btl-3-landscape-be95a581abfc7ba88e146547a97a40c0-.jpg alt="Prueba2" 
### El BTL en los mercados publicitarios actuales
P: En los últimos años en Colombia, el BTL ha logrado ocupar el primer lugar en cuanto a inversión publicitaria alcanzando los $1.29 billones de pesos.
A: [] -> SITE/index.php/stands-y-ferias-un-negocio-en-potencia/
IMG: UP/bb-plugin/cache/entrada3-landscape-0ee3fec7f0435295c47c1b254ba6b6e9-.jpg alt="entrada3" 
### Stands y ferias: un negocio en potencia
P: El sector del marketing ferial está en boom, no solo en Colombia, si no en el mundo entero. ¿Cuál es su potencial como negocio?
A: [] -> SITE/index.php/el-lenguaje-del-marketing/
IMG: UP/bb-plugin/cache/entrada-2-landscape-b4c8a4a4747ecb5a434ab0038d59eaf6-.jpg alt="entrada" 
### El lenguaje del marketing
P: La comunicación y persuasión detrás de los negocios: el endomarketing es el arte y la ciencia del análisis focalizado en un público objetivo.
IMG: UP/2019/08/imagenes-graficasRecurso-2comillas.png alt="imagenes-graficasRecurso 2comillas" 
P: Creamos experiencias originales y
P: generamos resultados memorables
IMG: UP/2019/08/imagenes-graficasRecurso-3comillas.png alt="imagenes-graficasRecurso 3comillas" 
P: Creamos experiencias originales y generamos resultados memorables
P: Lo que dicen
P: nuestros Clientes
IMG: UP/2020/03/logo-fundacion-valle-del-lili.jpg alt="logo-fundacion-valle-del--lili" 
P: Imágenes Gráficas, realizaron un trabajo impecable, quedó espectacular. Increíble cómo quedó todo, mil gracias de verdad.
### Fundación Valle del Lili
IMG: UP/2024/01/futupro.jpg alt="futupro" 
P: Quiero que le des mi más sincero agradecimiento a todo el equipo de Imágenes Gráficas por el apoyo que nos dieron con nuestras producciones, se hizo en tiempo record y realmente estamos muy satisfechos con los productos, en especial las cajas de presentación que han sido un éxito.
P: Jefe de compras
### Future
IMG: UP/2019/06/imagenes_graficas_postobon.jpg alt="imagenes_graficas_postobon" 
P: En nombre de Postobón S.A, escribo para expresar mi agradecimiento por el compromiso y esfuerzo de Imágenes Gráficas BIC S.A.S. Logramos cumplir el compromiso adquirido con Expoartesano 2015 y alcanzar nuestros objetivos de marca. Para nosotros es muy importante saber que contamos con un proveedor que también es un socio estratégico.
### Director Postobon S.A.
IMG: UP/2019/06/imagenes_graficas_coomeva.jpg alt="imagenes_graficas_coomeva" 
P: Desde la unidad de Gestión del Cambio, queremos agradecer a Imágenes Gráficas por todo el apoyo brindado en las últimas semanas. El tiempo de respuesta ha sido oportuno y han cumplido con la calidad que los caracteriza. Esperamos seguir contando con ustedes como nuestro aliado, gracias.
### Director corporativo de desarrollo organizacional Coomeva.
### Fundación Valle del Lili
### Future
### Director Postobon S.A.
### Director corporativo de desarrollo organizacional Coomeva.
T: Testimonial Slide 1
T: Testimonial Slide 2
T: Testimonial Slide 3
T: Testimonial Slide 4
```

### A-nosotros
```
--- header .
# Nosotros
P: Nosotros
P: Imágenes Gráﬁcas
P: Somos la compañía de comunicación gráﬁca que soluciona de manera integral todas las necesidades para promocionar una marca, campaña o cualquier idea.
IMG: UP/2020/06/fabrica.jpg alt="fabrica" 
## CODIGO DE ETICA
   link: [] -> UP/2024/05/6.2-FO-GH-035-CODIGO-DE-ETICA-IMAGENES-GRAFICAS-BIC-S.A.S.-.docx.pdf
A: [] -> UP/2024/05/6.2-FO-GH-035-CODIGO-DE-ETICA-IMAGENES-GRAFICAS-BIC-S.A.S.-.docx.pdf
## Reporte de Gestión BIC 2020
   link: [] -> UP/2024/01/Informe-Sostenibilidad-2020.pdf
A: [] -> UP/2024/01/Informe-Sostenibilidad-2020.pdf
## Reporte de Gestión BIC 2021
   link: [] -> SITE/REPORTE2021.pdf
A: [] -> SITE/REPORTE2021.pdf
## Reporte de Gestión BIC 2022
   link: [] -> UP/2023/05/Informe-2023_IG.pdf
A: [] -> UP/2023/05/Informe-2023_IG.pdf
## Reporte de Gestión BIC 2023
   link: [] -> UP/2024/05/Informe-Gestion-BIC-2023.pdf
A: [] -> UP/2024/05/Informe-Gestion-BIC-2023.pdf
## Reporte de Gestión BIC 2024
   link: [] -> UP/2025/06/informe-de-sostenibilidad-2024.pdf
A: [] -> UP/2025/06/informe-de-sostenibilidad-2024.pdf
## INFORME DE GESTIÓN 2025
A: [] -> UP/Informe-Gestion-BIC-2025.pdf
## POLITICA DE TRATAMIENTO DE DATOS
A: [] -> UP/2025/06/MANUAL-DE-POLITICAS-PARA-EL-TRATAMIENTO-DE-DATOS-PERSONALES.pdf
IMG: UP/2020/06/Nosotros-icon.png alt="Nosotros-icon" 
P: Nuestro equipo altamente caliﬁcado propone soluciones ajustadas a sus necesidades.
IMG: UP/2020/06/Nosotros-icon2.png alt="Nosotros-icon2" 
P: Hemos transformado ideas brillantes en productos impactantes desde 1989.
IMG: UP/2020/06/Nosotros-icon3.png alt="Nosotros-icon3" 
P: Respondemos solicitudes en tiempo récord de marcas nacionales e internacionales.
IMG: UP/2020/06/Nosotros-icon4.png alt="Nosotros-icon4" 
P: Nuestra planta de producción funciona 24/7.
P: Somos más de 280 colaboradores comprometidos
   link: [] -> SITE/agencia-creativa/
A: [] -> SITE/agencia-creativa/
IMG: UP/2020/06/Nosotros-icon7.jpg alt="Nosotros-icon7" 
P: 460,000 PLIEGOS DIARIOS DE IMPRESIÓN
IMG: UP/2020/06/Nosotros-icon6.jpg alt="Nosotros-icon6" 
P: 60 IMPRESIONES X MINUTO
IMG: UP/2020/06/Nosotros-icon5.jpg alt="Nosotros-icon5" 
P: 1,500 CLIENTES FELICES
P: No conocemos los límites
IMG: UP/2020/06/Nosotros-icon9.jpg alt="Nosotros-icon9" 
P: Entregas en cualquier lugar del MUNDO.
IMG: UP/2020/03/abajo.png alt="abajo" 
IMG: UP/2020/06/Nosotros-icon10.jpg alt="Nosotros-icon10" 
P: Todo bajo un mismo techo. Procesos y equipo a su SERVICIO.
IMG: UP/2020/06/Nosotros-icon11.jpg alt="Nosotros-icon11" 
P: Absoluta CONFIDENCIALIDAD.
P: Traducimos las necesidades de mercadeo de nuestros clientes en experiencias de marca dirigidas a conectar emocionalmente con el shopper.
P: Le apostamos a la equidad e inclusión social
IMG: UP/2020/06/Nosotros-icon6.png alt="Nosotros-icon6" 
P: Generamos empleo para más de 200 personas.
IMG: UP/2020/06/Nosotros-icon7.png alt="Nosotros-icon7" 
P: El 67% de nuestros colaboradores son mujeres.
IMG: UP/2020/06/Nosotros-icon8.png alt="Nosotros-icon8" 
P: Trabajamos con 43 madres cabeza de hogar.
IMG: UP/2020/06/Nosotros-icon9.png alt="Nosotros-icon9" 
P: Integramos a nuestro equipo a personas sordas.
P: Nuestro aliado principal es el medio ambiente
IMG: UP/2020/06/Nosotros-icon10.png alt="Nosotros-icon10" 
P: Utilizamos tintas ecológicas a base de soya y libres de plomo.
IMG: UP/2020/06/Nosotros-icon11.png alt="Nosotros-icon11" 
P: Empleamos papel fabricado 100% a base de caña de azúcar, sin químicos blanqueadores, con sellos FSC y libres de cloro.
IMG: UP/2020/06/Nosotros-icon12.png alt="Nosotros-icon12" 
P: Poseemos un sistema de generación de energía mediante paneles solares fotovoltaicos.
IMG: UP/2020/06/Nosotros-icon13.png alt="Nosotros-icon13" 
P: Implementamos programas de ahorro de agua y energía.
IMG: UP/2020/06/Nosotros-icon14.png alt="Nosotros-icon14" 
P: Contamos con mecanismos eficientes para la reducción de huella de carbono.
IMG: UP/2020/06/Nosotros-icon15.png alt="Nosotros-icon15" 
P: Capacitamos a nuestro equipo en temas de sensibilización ambiental.
P: Somos una empresa socialmente responsable
P: Creemos en la igualdad de oportunidades
P: En Imágenes Gráficas vemos a las personas a través de las diferencias para reconocer sus habilidades. Por ello, desde hace diez años trabajamos de la mano con Comfandi, quienes a través del «Pacto de Productividad» nos conectan con personas sordas que cuentan con el perfil que buscamos para nuestro equipo laboral.
   link: [Comfandi] -> https://www.comfandi.com.co/persona/cali/responsabilidad-social/cooperacion/pacto-de-productividad-modelo-de-inclusion-laboral-para-personas-con-discapacidad
   link: [Pacto de Productividad] -> https://www.comfandi.com.co/persona/cali/responsabilidad-social/cooperacion/pacto-de-productividad-modelo-de-inclusion-laboral-para-personas-con-discapacidad
P: «Para nosotros es muy importante brindarles calidad de vida y una estabilidad laboral, hacerles sentir que son esenciales no solo para Imágenes Gráficas sino también para nuestra ciudad y el mundo entero.»Fernando Alomía Gerente Imágenes Gráficas
IMG: UP/2019/08/agencia-imagenes-graficas.jpg alt="agencia-imagenes-graficas" 
P: Apoyamos a la comunidad
P: En la Fábrica de las Grandes Ideas contribuimos a formar mejores seres humanos. Por ello, le apostamos a planes sociales y educativos que le permiten a nuestro equipo crecer holísticamente. Estos son algunos de los proyectos que realizamos continuamente:
IMG: UP/2020/03/servicio-1.png alt="servicio-1" 
P: Hacemos jornadas de sensibilización ambiental con los colaboradores de nuestro equipo.
IMG: UP/2020/03/servicio-2.png alt="servicio-2" 
P: Realizamos donaciones de kits escolares y regalos de navidad a niños en estado de vulnerabilidad.
IMG: UP/2020/03/servicio-3.png alt="servicio-3" 
P: Ofrecemos créditos educativos con 0% de interés para nuestros colaboradores.
IMG: UP/2020/03/servicio-4.png alt="servicio-4" 
P: Recibimos estudiantes de colegios y universidades de Cali, enseñando nuestros procesos de producción y compartiendo todo nuestro conocimiento.
P: «Imágenes Gráficas no solo es responsable por lo que pasa entre sus cuatro paredes, sino también por lo que pasa en la ciudad, Colombia y el mundo entero.»Fernando Alomía Gerente Imágenes Gráficas
P: Reconocimientos
IMG: UP/2020/03/abajo-m.png alt="abajo-m" 
P: Premio NEIG versión 2018
P: La Corporación Calidad otorgó en diciembre del 2018 el «Premio Nacional a la Excelencia y la Innovación» (PNEIG) a Imágenes Gráficas BIC S.A.S. en la categoría «Organización Manufacturera o Industrial Mediana». El reconocimiento destacó la alta calidad de gestión e innovación, fortalecimiento de la productividad, calidad y competitividad que se ha logrado construir en los últimos años. Además, fuimos premiados por demostrar prácticas ejemplares en todas las áreas, demostrando excelentes resultados y niveles superiores de competitividad que se equiparan al nivel de organizaciones de clase mundial.
P: Reconocimiento de La Gobernación del Valle por ser una empresa incluyente
P: En diciembre de 2018 La Gobernación del Valle del Cauca, la Secretaría de Desarrollo Social y Participación y la Fundación Carvajal; reconocieron a Imágenes Gráficas por su aporte a la inclusión laboral de personas en situación de discapacidad. Este reconocimiento fue entregado por la Gobernadora del Valle del Cauca, Dilian Francisca Toro, durante la conmemoración del día internacional de los derechos de las personas con discapacidad.
P: Nuestra fábrica está acreditada con estas certiﬁcaciones
IMG: UP/2020/06/7bureau.png alt="7bureau" 
IMG: UP/2020/06/Sedex-member.png alt="Sedex-member" 
IMG: UP/2020/06/ink.jpg alt="ink" 
P: Nuestra Planta
P: Este es nuestro espacio de trabajo
   link: [] -> https://youtu.be/iQHSHdX0yMc
IMG: UP/2020/06/ig1-300x300-1.gif alt="" 
IMG: UP/2020/06/ig3-300x300.gif alt="" 
IMG: UP/2020/06/ig4-300x300.gif alt="" 
IMG: UP/2020/06/ig5-300x300.gif alt="" 
IMG: UP/2020/06/ig6-300x300.gif alt="" 
IMG: UP/2020/06/ig2-300x300.gif alt="" 
```

### A-agencia-creativa
```
BG(.fl-slide-bg-photo): UP/2020/07/Agencia-Creativa-slider.jpg
IMG: UP/2020/08/agencia-creativa-banner-movil.jpg alt="" 
P: Agencia full service
IMG: UP/2020/07/agencia-creativa-icon.jpg alt="agencia-creativa-icon" 
IMG: UP/2020/06/Soluciones-Impresas-linea-1.jpg alt="Soluciones-Impresas-linea" 
P: Somos su único punto de contacto para el desarrollo del marketing organizacional.
P: Eﬁciencia tiempo y costo
IMG: UP/2020/07/agencia-creativa-icon2.jpg alt="agencia-creativa-icon2" 
IMG: UP/2020/06/Soluciones-Impresas-linea2.jpg alt="Soluciones-Impresas-linea2" 
P: Tiempo de respuesta insuperable y costos competitivos.
P: Know how
IMG: UP/2020/07/agencia-creativa-icon3.jpg alt="agencia-creativa-icon3" 
IMG: UP/2020/06/Soluciones-Impresas-linea-3-1.jpg alt="Soluciones-Impresas-linea-3" 
P: Sabemos lo que hacemos. Conocemos lo que realmente es posible fabricar y funciona.
BG(.fl-col-content.fl-node-content): UP/2020/07/agencia-creativa-banner.jpg
P: Somos un equipo de creativos profesionales dedicados a diseñar las mejores formas de acercar las marcas y sus productos a sus clientes de una manera particular, estratégica, diferente, divertida e impactante para incrementar sus utilidades y posicionamiento en el mercado.
IMG: UP/2020/06/comillas-gris.png alt="comillas-gris" 
P: El diseño no es solo como se ve y se siente, el diseño es cómo funciona.
P: - Steve Jobs -
IMG: UP/2020/06/comillas-gris2.png alt="comillas-gris2" 
IMG: UP/2020/07/agencia-creativa-icon4-768x198.jpg alt="agencia-creativa-icon4" 
IMG: UP/2020/07/agencia-creativa-icon6-768x198.jpg alt="agencia-creativa-icon6" 
IMG: UP/2020/07/agencia-creativa-icon5-768x198.jpg alt="agencia-creativa-icon5" 
IMG: UP/2020/07/agencia-creativa-icon7-768x198.jpg alt="agencia-creativa-icon7" 
IMG: UP/2020/07/agencia-creativa-icon8-768x198.jpg alt="agencia-creativa-icon8" 
IMG: UP/2020/07/agencia-creativa-icon9-768x198.jpg alt="agencia-creativa-icon9" 
IMG: UP/2020/07/agencia-creativa-icon10-768x198.jpg alt="agencia-creativa-icon10" 
P: ¿Qué hacemos?
IMG: UP/2020/07/agencia-creativa-banner-1.jpg alt="Diseño de marca y publicidad" 
## Diseño de marca y publicidad
P: Tenemos la capacidad de construir marcas valiosas, desarrollarlas, cuidarlas, crear con ellas experiencias inolvidables y, sobre todo, llegar a establecer una relación emocional con el público en diferentes contextos y formatos.
IMG: UP/2020/07/agencia-creativa-banner-2-1.jpg alt="Marketing digital" 
## Marketing digital
P: Creamos, implementamos y gestionamos estrategias digitales acertadas para mejorar el posicionamiento digital y crear relaciones sólidas entre el consumidor y la marca.
IMG: UP/2020/07/agencia-creativa-banner-3.jpg alt="Experiencia de compra en punto de venta" 
## Experiencia de compra en punto de venta
P: Diseñamos soluciones de trade marketing que logran incrementar las ventas desarrollando productos para ejecuciones perfectas.
P: ¿Cómo lo hacemos?
IMG: UP/2020/07/agencia-creativa-banner-4.jpg alt="Diseño gráﬁco" 
## Diseño gráﬁco
P: Proyectamos comunicaciones visuales destinadas a transmitir mensajes especíﬁcos a grupos sociales con objetivos determinados.
IMG: UP/2020/07/agencia-creativa-banner-5.jpg alt="Diseño industrial y experiencia de compra" 
## Diseño industrial y experiencia de compra
P: Diseño de POP (point of purchase) con instrumentos de promoción para el lugar de la venta con elementos que refuerzan la estrategia de venta de un producto o servicio.
IMG: UP/2020/07/agencia-creativa-banner-6.jpg alt="Prototipado" 
## Prototipado
P: Modelamos el producto ﬁnal para permitir efectuar test sobre determinados atributos antes de su producción ﬁnal.
IMG: UP/2020/07/agencia-creativa-banner-7.jpg alt="Copywriting y diseño de mensajes" 
## Copywriting y diseño de mensajes
P: Creamos el texto perfecto que logra conectar usuarios con marcas y conseguir la acción que buscamos del cliente.
IMG: UP/2020/07/agencia-creativa-banner-9.jpg alt="Diseño de impresos y empaques" 
## Diseño de impresos y empaques
P: Los puntos de contacto de impresión y el embalaje del producto son extensiones inconfundibles de su marca. Diseñamos material publicitario atractivo que respalda aún más la historia de su marca y las iniciativas de marketing.
IMG: UP/2020/07/Visibilidad-de-Marca-9.jpg alt="Diseño de ambientes y señalización" 
## Diseño de ambientes y señalización
P: Creamos espacios que conectan con el usuario, generando su atención, logrando comunicar el mensaje y dar una clara orientación con conexión directa de las marcas.
IMG: UP/2020/07/agencia-creativa-banner-8.jpg alt="Ilustración y fotografía" 
## Ilustración y fotografía
P: Desarrollo de imágenes que logran llamar la atención sobre el mensaje y producto, para transmitir un mensaje con la mayor claridad posible, dentro de un estilo particular.
IMG: UP/2020/07/agencia-creativa-banner-10.jpg alt="Diseño web y desarrollo" 
## Diseño web y desarrollo
P: Desarrollamos sitios web que son un claro reﬂejo de su marca y llevan a los usuarios a la acción. Un sitio web intuitivo, atractivo e informativo y que se puede administrar y actualizar con facilidad.
IMG: UP/2020/07/agencia-creativa-banner-11.jpg alt="E commerce y tiendas virtuales" 
## E commerce y tiendas virtuales
P: Creamos plataformas online que generan crecimiento de negocios. Catálogos con conexiones a medios de pago, conexión con redes sociales para potencializar los objetivos de ventas.
IMG: UP/2020/07/agencia-creativa-banner-12.jpg alt="Search Engine Optimization (SEO)" 
## Search Engine Optimization (SEO)
P: Optimización en motores de búsqueda o SEO, para mejorar el posicionamiento de un sitio web en la lista de resultados de Google, Bing, u otros buscadores de internet.
IMG: UP/2020/07/agencia-creativa-banner-13.jpg alt="Estratégias en redes sociales (social media)" 
## Estratégias en redes sociales (social media)
P: Creamos y administramos perﬁles de redes sociales con el objetivo de generar engagement, conectar con sus clientes, aumentar los clientes potenciales, proporcionar asistencia al cliente y ayudar a transmitir noticias y mensajes importantes de su compañía.
IMG: UP/2020/07/agencia-creativa-banner-14.jpg alt="Email marketing" 
## Email marketing
P: Alcance sus objetivos de marketing con correo electrónico escalable y personalizado, apuntando a las personas adecuadas con mensajes relevantes.
IMG: UP/2020/07/agencia-creativa-banner-16.jpg alt="Diseño de aplicaciones - Apps" 
## Diseño de aplicaciones - Apps
P: Convertimos sus ideas de aplicaciones a la realidad. Desarrollo de aplicaciones web y móviles, somos un verdadero socio comercial estratégico.
IMG: UP/2020/07/agencia-creativa-banner-15.jpg alt="Event marketing" 
## Event marketing
P: Realización de experiencias que captan todos los sentidos de los asistentes para lograr una conexión total entre ellos y las marcas.
IMG: UP/2020/07/agencia-creativa-banner-17.jpg alt="Producciones audiovisuales" 
## Producciones audiovisuales
P: Nuestros servicios de vídeo y fotografía le dicen quién, qué, cómo y por qué de su negocio de una manera dinámica y transparente. Si una imagen vale más que mil palabras, entonces un vídeo vale un millón. Contamos su historia con medios visuales de alto impacto que inspiren, motiven y conmuevan al público.
P: CON SERVICIOS INTEGRALES TODOS EN CASA, SOMOS UN ÚNICO PUNTO DE CONTACTO PARA TODAS SUS NECESIDADES DE MARCA.
P: PLANEAR Y ORGANIZAR
IMG: UP/2020/07/agencia-creativa-icon12.jpg alt="agencia-creativa-icon12" 
IMG: UP/2020/08/Agencia-Creativa-icon-movil.jpg alt="Agencia-Creativa-icon-movil" 
P: Intencionalmente investigamos, planiﬁcamos, probamos y desarrollamos ideas para avanzar con claridad y conﬁanza en las metas y oportunidades.
P: CONCEPTUALIZAR Y CREAR
IMG: UP/2020/07/agencia-creativa-icon11.jpg alt="agencia-creativa-icon11" 
IMG: UP/2020/08/Agencia-Creativa-icon-movil-2.jpg alt="Agencia-Creativa-icon-movil-2" 
P: Nada sucede por accidente. Desarrollamos a través de un proceso reﬂexivo con el cliente como socio crucial en el proceso de diseño, trabajamos para lograr que se produzca una hermosa magia de marca.
P: PRODUCIMOS Y ENTREGAMOS
IMG: UP/2020/07/agencia-creativa-icon13.jpg alt="agencia-creativa-icon13" 
IMG: UP/2020/08/Agencia-Creativa-icon-movil-3.jpg alt="Agencia-Creativa-icon-movil-3" 
P: Juntos, nos aseguramos de que el producto terminado se vea bien, funcione bien, sea convincente y consistente en cada punto de contacto.
P: Proyectos
IMG: UP/2020/07/diseno-de-exhibidores-conceptualizacion-de-mueble-para-lanzamiento-de-marca-con-lineamientos-del-concepto-del-lanzamiento.jpg alt="Conceptualización de mueble para lanzamiento de marca con lineamientos del concepto del lanzamiento" 
T: Diseño de exhibidores
IMG: UP/2020/07/diseno-exhibidores-conceptualizacion-y-dise%C3%B1o-funcional-de-muebles-en-carton.jpg alt="Conceptualización y diseño funcional de muebles en cartón" 
T: Diseño exhibición especial
IMG: UP/2020/07/EXPERIENCIAS-SENSORIALES-Aplicacion-mapping-sobre-cuerpo-para-visualizar-el-efecto-del-medicamento.jpg alt="Aplicación mapping sobre cuerpo para visualizar el efecto del medicamento" 
T: Diseño experiencias sensoriales
IMG: UP/2020/07/branding-Aplicacion-de-concepto-de-campana-a-multiples-piezas-como-Display.jpg alt="Aplicación de concepto de campaña a multiples piezas como Display" 
T: Branding
IMG: UP/2020/07/diseno-de-campana-adaptacion-de-key-visual-a-diferentes-piezas-graficas.jpg alt="Adaptación de key visual a diferentes piezas gráficas" 
T: Diseño de campaña
IMG: UP/2020/07/diseno-de-experiencias-desarrollo-de-juego-conceptual-adaptado-a-la-cultura-organizacional-para-generar-conexion-con-empleados.jpg alt="Desarrollo de juego conceptual adaptado a la cultura organizacional para generar conexión con empleados" 
T: Diseño de experiencias
IMG: UP/2020/07/diseno-material-pop-Dise%C3%B1o-de-chispas-o-saltarines.jpg alt="Diseño de chispas o saltarines" 
T: Diseño material POP
IMG: UP/2020/07/diseno-ambiente-comercial-diseno-de-puntos-de-atencion-al-cliente.jpg alt="Diseño de puntos de atención al cliente" 
T: Diseño ambiente comercial
IMG: UP/2020/07/diseno-de-empaques-desarrollo-de-concepto-y-funcionalidad-de-empaques.jpg alt="Desarrollo de concepto y funcionalidad de empaques" 
T: Diseño de empaques
IMG: UP/2020/07/diseno-de-impresos-generacion-de-experiencias-de-usuario-a-traves-del-dise%C3%B1o-de-elementos-funcionales-como-cuadernos-personalizados.jpg alt="Generación de experiencias de usuario a traves del diseño de elementos funcionales como cuadernos personalizados" 
T: Diseño de impresos
IMG: UP/2020/07/diseno-paginas-web-paginas-corporativas.jpg alt="Páginas corporativas" 
T: Diseño event marketing
```

### A-soluciones-impresas
```
BG(.fl-slide-bg-photo): UP/2020/06/Soluciones-Impresas-1.jpg
IMG: UP/2020/08/Soluciones-Impresas-slider-movil.jpg alt="" 
IMG: UP/2020/06/comillas-gris.png alt="comillas-gris" 
P: Encuentre con nosotros un proveedor que se convierte en su único punto de contacto para las necesidades de marketing y comunicación.
IMG: UP/2020/06/comillas-gris2.png alt="comillas-gris2" 
IMG: UP/2020/06/Soluciones-Impresas-2.jpg alt="Soluciones-Impresas-2" 
IMG: UP/2020/06/Soluciones-Impresas-linea-1.jpg alt="Soluciones-Impresas-linea" 
P: Sus impresos logran un gran impacto gracias a nuestra maquinaria de última tecnología.
IMG: UP/2020/06/Soluciones-Impresas-3.jpg alt="Soluciones-Impresas-3" 
IMG: UP/2020/06/Soluciones-Impresas-linea2.jpg alt="Soluciones-Impresas-linea2" 
P: Capacidad de producir altos volúmenes en cualquier formato con la mejor calidad en tiempos récord.
IMG: UP/2020/06/Soluciones-Impresas-4.jpg alt="Soluciones-Impresas-4" 
IMG: UP/2020/06/Soluciones-Impresas-linea-3-1.jpg alt="Soluciones-Impresas-linea-3" 
P: Mejoramos la experiencia de compra del shopper aumentando la visibilidad del producto en el punto de venta.
P: ¿Qué hacemos?
IMG: UP/2020/06/Soluciones-Impresas-5-1.jpg alt="Impresión campañas POP" 
## Impresión campañas POP
P: Maximizamos el presupuesto de marketing para producir elementos realmente impactantes para el punto de venta.
IMG: UP/2020/06/Soluciones-Impresas-6.jpg alt="Comunicación gráﬁca" 
## Comunicación gráﬁca
P: Materializamos el concepto para comunicar ideas en materiales publicomerciales.
IMG: UP/2020/06/Soluciones-Impresas-7.jpg alt="Impresión editorial" 
## Impresión editorial
P: Catálogos, libros y folletos producidos con tecnología avanzada.
IMG: UP/2020/06/Soluciones-Impresas-8.jpg alt="Impresión textil" 
## Impresión textil
P: Damos vida al color en telas para la producción de aplicaciones especiales.
IMG: UP/2020/06/Soluciones-Impresas-9.jpg alt="Impresión gran formato" 
## Impresión gran formato
P: Proyectos a gran escala de publicidad out of home (OOH).
IMG: UP/2020/06/Soluciones-Impresas-10.jpg alt="Decoración espacios comerciales" 
## Decoración espacios comerciales
P: Decoración de oﬁcinas, señalización y adecuación de espacios comerciales.
IMG: UP/2020/06/Soluciones-Impresas-11.jpg alt="Packaging" 
## Packaging
P: Material de empaque y accesorios para resaltar marcas exitosas.
IMG: UP/2020/06/Soluciones-Impresas-12.jpg alt="Estampación de artículos" 
## Estampación de artículos
P: Imprimimos sobre cualquier material.
P: ¿Cómo lo hacemos?
IMG: UP/2020/06/Soluciones-Impresas-13.jpg alt="Equipos de alta tecnología" 
## Equipos de alta tecnología
P: Más de 28 cuerpos de impresión Alemanes Heilderberg respaldan nuestra capacidad.
IMG: UP/2020/06/Soluciones-Impresas-14.jpg alt="Impresión litográfica" 
## Impresión litográfica
P: Con alta tecnología imprimimos más de 100 mil pliegos por hora, con impresión más amigable con el planeta.
IMG: UP/2020/03/soluciones-graficas.jpg alt="Estampados" 
## Estampados
P: Imprimir baldosas, platos, mugs y muchas cosas más a full color ahora es posible con nuestra tecnología.
IMG: UP/2020/06/Soluciones-Impresas-16.jpg alt="Impresión a gran formato " 
## Impresión a gran formato
P: Alta velocidad, colores vibrantes y la mejor resolución en nuestra amplia gama de sutratos destinados a la producción de piezas de gran tamaño.
IMG: UP/2020/06/Soluciones-Impresas-17.jpg alt="Impresión textil a gran escala" 
## Impresión textil a gran escala
P: Impresión de telas en rollo o piezas independientes. Desde 1 unidad hasta producciones masivas de más de 1000 unidades.
IMG: UP/2020/03/soluciones-graficas-4.jpg alt="Impresión digital offset" 
## Impresión digital offset
P: Con alta calidad litográfica, reproducimos cualquier pieza gráfica con tecnología de punta y, lo más importante, personalizamos sin que le cueste más.
IMG: UP/2020/03/soluciones-graficas-5.jpg alt="Equipos láser para grabado y corte" 
## Equipos láser para grabado y corte
P: Grabado y corte de ﬁno detalle de la más alta calidad para diversos materiales como madera, acrílicos, plásticos, piedra, vidrio, cartón y mucho más.
IMG: UP/2020/03/soluciones-graficas-6.jpg alt="Impresión y recorte en vinilo" 
## Impresión y recorte en vinilo
P: Usados para decoración de espacios, números de camisetas, decoración en el hogar y más; tanto en interiores como exteriores.
IMG: UP/2020/06/Soluciones-Impresas-19.jpg alt="Impresión directa sobre materiales rígidos" 
## Impresión directa sobre materiales rígidos
P: Tecnología UV para imprimir materiales de hasta 10 cm. De espesor con calidad fotográﬁca.
IMG: UP/2020/03/soluciones-graficas-9.jpg alt="Impresión 3D" 
## Impresión 3D
P: Desarrollo de réplicas de diseños en 3D, creando piezas o maquetas volumétricas a partir de un diseño.
IMG: UP/2020/06/Soluciones-Impresas-20.jpg alt="Acabados especiales" 
## Acabados especiales
P: Todo bajo un mismo techo: plastificados, UV, troquelados, ensambles, maquilas, UV y mucho más.
IMG: UP/2020/06/Soluciones-Impresas-21.jpg alt="Impresión sensitiva" 
## Impresión sensitiva
P: Activamos los sentidos del tacto (relieves y texturas especiales), el olor (aplicación de aromas), oído (por medio de sonido), y visual (realidad aumentada y 3D).
IMG: UP/2020/06/Soluciones-Impresas-22-297x300.jpg alt="Soluciones-Impresas-22" 
P: Calidad y eﬁciencia
IMG: UP/2020/06/mas.jpg alt="mas" 
IMG: UP/2020/06/Soluciones-Impresas-23-297x300.jpg alt="Soluciones-Impresas-23" 
P: Producción en tiempo record
IMG: UP/2020/06/Soluciones-Impresas-24-297x300.jpg alt="Soluciones-Impresas-24" 
P: Soluciones Eco-ambientales
P: Proyectos
IMG: UP/2020/07/5-3.jpg alt="Agenda con tapa y resorte" 
T: Cuadernos y agendas
IMG: UP/2020/07/12c.jpg alt="Plegadizas con ventana" 
T: Packaging
IMG: UP/2020/07/15-2.jpg alt="Set de divertidos stickers" 
T: Stickers
IMG: UP/2020/07/13-3.jpg alt="Carpeta corporativa con bolsillos" 
T: Portafolios
IMG: UP/2020/07/1-3.jpg alt="Abanico para ferias impreso a color 2 caras" 
T: Abanicos
IMG: UP/2020/07/3-4.jpg alt="Calendario escritorio" 
T: Calendarios
IMG: UP/2020/07/6-4.jpg alt="Etiquetas adhesivas" 
T: Etiquetas
IMG: UP/2020/07/8A-2.jpg alt="Set rompecabezas" 
T: Juegos didácticos en papel
IMG: UP/2020/07/10-3.jpg alt="Marca maletas en papel plástico a prueba de agua" 
T: Marca maletas
IMG: UP/2020/07/14-2.jpg alt="Agenda corporativa con empaque especial" 
T: Set especiales
IMG: UP/2020/07/2-3.jpg alt="Bolsas en cambre laminado impresa a full color" 
T: Bolsa de mercado
IMG: UP/2020/07/4-3.jpg alt="Carta menú durable en plástico con impresión directa" 
T: Carta menú
IMG: UP/2020/07/7A-3.jpg alt="Promocionales para la nevera" 
T: Imantados
IMG: UP/2020/07/9-3.jpg alt="Libreta argollada con estampado foil dorado" 
T: Libretas
IMG: UP/2020/07/11-2.jpg alt="Móvil para tiendas y supermercados" 
T: Móviles
```

### A-visibilidad-de-marca
```
BG(.fl-slide-bg-photo): UP/2020/07/Visibilidad-de-Marca-Banner-05.jpg
BG(.fl-slide-bg-photo): UP/2020/07/Visibilidad-de-Marca-slider-1.jpg
BG(.fl-slide-bg-photo): UP/2020/07/Visibilidad-de-Marca-slider2.jpg
IMG: UP/2020/08/Banners-Visibilidad-movil.jpg alt="" 
IMG: UP/2020/08/Banners-Visibilidad-movil-2.jpg alt="" 
IMG: UP/2020/08/Soluciones-Impresas-slider-movil-2.jpg alt="" 
IMG: UP/2020/07/Visibilidad-de-Marca-iconos.jpg alt="Visibilidad-de-Marca-iconos" 
IMG: UP/2020/06/Soluciones-Impresas-linea-1.jpg alt="Soluciones-Impresas-linea" 
P: Entendemos la necesidad de revolucionar la experiencia del consumidor.
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-2.jpg alt="Visibilidad-de-Marca-iconos-2" 
IMG: UP/2020/06/Soluciones-Impresas-linea2.jpg alt="Soluciones-Impresas-linea2" 
P: Mejoramos la experiencia de compra del shopper a través del diseño, fabricación, distribución e implementación.
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-3.jpg alt="Visibilidad-de-Marca-iconos-3" 
IMG: UP/2020/06/Soluciones-Impresas-linea-3-1.jpg alt="Soluciones-Impresas-linea-3" 
P: Gran capacidad integrando diferentes tecnologías de producción.
BG(.fl-row-content-wrap): UP/2020/07/Visibilidad-de-Marca-fondo.jpg
IMG: UP/2020/07/Visibilidad-de-Marca-fondo-barras.png alt="Visibilidad-de-Marca-fondo-barras" 
P: Traducimos las necesidades de mercadeo de nuestros clientes en experiencias de marca dirigidas a conectar emocionalmente con el shopper.
IMG: UP/2020/07/Visibilidad-de-Marca-fondo-barras-3.png alt="Visibilidad-de-Marca-fondo-barras-3" 
P: ESTRATEGIA
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-8.jpg alt="Visibilidad-de-Marca-iconos-8" 
P: Identiﬁcamos Insights.
P: DISEÑO
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-7.jpg alt="Visibilidad-de-Marca-iconos-7" 
P: Taller creativo propio y prototipado en línea.
P: INGENIERÍA
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-4.jpg alt="Visibilidad-de-Marca-iconos-4" 
P: Ingeniería de costos y planeación.
P: MANUFACTURA
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-6.jpg alt="Visibilidad-de-Marca-iconos-6" 
P: 6500 m2 de planta de producción.
P: LOGÍSTICA
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-5.jpg alt="Visibilidad-de-Marca-iconos-5" 
P: Logística y transporte al punto de venta.
P: ¿Qué hacemos?
IMG: UP/2020/07/Visibilidad-de-Marca-1.jpg alt="Publicidad eco amigable" 
## Publicidad eco amigable
P: Nuevas soluciones verdes de publicidad y marketing que le ayudarán a impulsar su negocio.
IMG: UP/2020/07/Visibilidad-de-Marca-2.jpg alt="Exhibidores para punto de venta In-store branding" 
## Exhibidores para punto de venta In-store branding
P: Mejoramos la experiencia de compra del shopper a través del diseño, fabricación, distribución e implementación de su idea.
IMG: UP/2020/07/Visibilidad-de-Marca-3.jpg alt="Sistemas portátiles de publicidad" 
## Sistemas portátiles de publicidad
P: Displays, stands y sistemas de exhibición fácil de transportar y de un alto impacto.
IMG: UP/2020/07/Visibilidad-de-Marca-4.jpg alt="Publicidad interactiva y digital" 
## Publicidad interactiva y digital
P: Desarrollamos sistemas interactivos que permiten que una marca se relacione de manera directa con un cliente potencial.
IMG: UP/2020/07/Visibilidad-de-Marca-5.jpg alt="Stands" 
## Stands
P: Prácticos, fáciles de armar, durables y de alta calidad para una presencia efectiva de las marcas en ferias y eventos.
IMG: UP/2020/07/Visibilidad-de-Marca-6.jpg alt="Implementación de visibilidad" 
## Implementación de visibilidad
P: Contamos con presencia en las principales ciudades de Colombia, logrando el mejor impacto de sus ideas con una ejecución impecable.
IMG: UP/2020/07/Visibilidad-de-Marca-7.jpg alt="Impactraﬁc" 
## Impactraﬁc
P: Nueva plataforma publicitaria para pautar en espacios no convencionales. Publicidad en las bandas de puntos de pago (en Jumbo, Metro, La 14 y Olímpica) y barandas de escaleras eléctricas (en los principales centros comerciales de Colombia, aeropuertos y más).
IMG: UP/2020/07/Visibilidad-de-Marca-8.jpg alt="Maquila promocional" 
## Maquila promocional
P: Prestamos un servicio de paquete completo: bodegaje, ensamble de ofertas, impresión de stickers y lo que su oferta requiera.
IMG: UP/2020/07/Visibilidad-de-Marca-9.jpg alt="Ambientación comercial" 
## Ambientación comercial
P: El impacto visual de su marca lo hacemos realidad en cada uno de sus espacios comerciales, tanto externos como internos. Somos expertos en la demarcación de espacios físicos.
IMG: UP/2020/07/Visibilidad-de-Marca-10.jpg alt="Publicidad exterior OOH" 
## Publicidad exterior OOH
P: Elementos que permiten a las marcas o compañías identiﬁcar, señalizar y transmitir su propuesta de comunicación e identidad fuera de casa.
IMG: UP/2020/07/Visibilidad-de-Marca-11.jpg alt="Decoración vehicular" 
## Decoración vehicular
P: Su marca en movimiento. Aplicaciones con la más alta tecnología para aprovechar su ﬂota haciendo publicidad 100% efectiva.
IMG: UP/2020/07/Visibilidad-de-Marca-12.jpg alt="Inﬂables" 
## Inﬂables
P: Diseño y fabricación de réplicas inﬂables, carpas, caminantes y mucho más.
P: ¿Cómo lo hacemos?
IMG: UP/2020/07/Visibilidad-de-Marca-14.jpg alt="Producción integrada" 
## Producción integrada
P: Tenemos la capacidad de producir altos volúmenes gracias al soporte de una gran planta de 6500 m2 de producción.
IMG: UP/2020/07/Visibilidad-de-Marca-29.jpg alt="Soluciones sustentables" 
## Soluciones sustentables
P: Soluciones amigables con el medio ambiente a través de stands, exhibidores, mobiliarios y mucho más.
IMG: UP/2020/07/Visibilidad-de-Marca-15.jpg alt="Eco cartón" 
## Eco cartón
P: 100% reciclado, hecho de materia prima de papel no tóxico, no contaminante, reciclable y ecológico.
IMG: UP/2020/07/Visibilidad-de-Marca-16.jpg alt="Gran equipo humano" 
## Gran equipo humano
P: Más de 280 personas expertas en shopper marketing.
IMG: UP/2020/07/Visibilidad-de-Marca-17.jpg alt="Investigación y conocimiento del shopper" 
## Investigación y conocimiento del shopper
P: Conocemos los insights y tendencias que hoy logran que las marcas vendan más, encontrando oportunidades para las marcas.
IMG: UP/2020/07/Visibilidad-de-Marca-18.jpg alt="Exhibición canal moderno" 
## Exhibición canal moderno
P: Mejoramos la experiencia de compra en supermercados y grandes superﬁcies con POP disruptivo.
IMG: UP/2020/07/Visibilidad-de-Marca-19.jpg alt="Exhibición canal tradicional y tiendas de barrio" 
## Exhibición canal tradicional y tiendas de barrio
P: Creamos una tienda más atractiva mejorando la exposición de productos con soluciones especiales para el canal.
IMG: UP/2020/07/Visibilidad-de-Marca-20.jpg alt="Combinación de técnicas de impresión" 
## Combinación de técnicas de impresión
P: Imprimimos sobre cualquier sustrato combinado: litografía, digital, estampados, vinilos, laser, impresión directa en rígidos e impresión textil.
IMG: UP/2020/07/Visibilidad-de-Marca-21.jpg alt="Impresión 3D gran formato" 
## Impresión 3D gran formato
P: Creación de piezas volumétricas de gran impacto.
IMG: UP/2020/07/Visibilidad-de-Marca-22.jpg alt="Múltimateriales" 
## Múltimateriales
P: Fabricamos con diversidad de materiales como poliestireno, PVC, PET, polipropileno, acrílico, papel, cartulina, cartón, lámina cold rolled, aluminio, madera y vidrio.
IMG: UP/2020/07/Visibilidad-de-Marca-23.jpg alt="Activación e impulso" 
## Activación e impulso
P: Confíe sus eventos, lanzamientos y actividades BTL a un proveedor integral.
P: Creamos experiencias emocionales que fortalecen la relación con las marcas.
IMG: UP/2020/07/Visibilidad-de-Marca-24.jpg alt="Activación de los sentidos" 
## Activación de los sentidos
P: Experiencias multisensoriales que despiertan los sentidos y llaman la atención del shopper integrando nuevas tecnologías.
IMG: UP/2020/07/Visibilidad-de-Marca-25.jpg alt="Taller creativo" 
## Taller creativo
P: Diseñadores gráﬁcos, industriales, publicistas y mercadólogos desarrollan proyectos funcionales que impactan conectando con las marcas.
IMG: UP/2020/07/Visibilidad-de-Marca-26.jpg alt="Montaje en punto de venta" 
## Montaje en punto de venta
P: Posicionamos las marcas implementando elementos claves de publicidad y comunicación.
IMG: UP/2020/07/Visibilidad-de-Marca-27.jpg alt="Logística" 
## Logística
P: Préstamos a nuestros clientes un servicio 360° que incluye toda la logística de transporte, ensamble e instalación de los muebles y exhibiciones en el punto de venta a nivel nacional. Experiencia exportadora de mas de 15 años.
P: Impactando en cada paso al comprador.
P: TRANSICIÓN
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-12.jpg alt="Visibilidad-de-Marca-iconos-12" 
IMG: UP/2020/07/Visibilidad-de-Marca-linea-2-300x43.jpg alt="Visibilidad-de-Marca-linea-2" 
P: Durante el desplazamiento del shopper y antes de ingresar a la tienda.
P: IMPULSO
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-11.jpg alt="Visibilidad-de-Marca-iconos-11" 
IMG: UP/2020/07/Visibilidad-de-Marca-linea-300x43.jpg alt="Visibilidad-de-Marca-linea" 
P: Donde se detonan las compras no programadas.
P: DESTINO
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-10.jpg alt="Visibilidad-de-Marca-iconos-10" 
P: Cuando el cliente está en la sección que busca para seleccionar su marca.
P: PUNTO DE PAGO
IMG: UP/2020/07/Visibilidad-de-Marca-iconos-9.jpg alt="Visibilidad-de-Marca-iconos-9" 
IMG: UP/2020/07/Visibilidad-de-Marca-linea-3-300x43.jpg alt="Visibilidad-de-Marca-linea-3" 
P: Donde se incluyen compras de último minuto.
P: Proyectos
IMG: UP/2020/07/2-5.jpg alt="Mueble multimarca con gran capacidad de carga con sistemas de cambio de publicidad" 
T: Canal mayorista
IMG: UP/2020/07/2A-3.jpg alt="Display exhibición 2 caras" 
T: Displays exhibidores eco
IMG: UP/2020/07/10-4.jpg alt="Mueble combinación de materiales, Cartón, plástico y metal" 
T: Exhibidores - Floorstands
IMG: UP/2020/07/1-6.jpg alt="Bandeja para exhibir producto" 
T: Bandejas
IMG: UP/2020/07/4-6.jpg alt="Counter exhibidor con sistema de seguridad" 
T: Counter
IMG: UP/2020/07/6-6.jpg alt="Bandeja para disposición de productos" 
T: Display
IMG: UP/2020/07/9-6.jpg alt="Punta de gondola empotrable con sistema de iluminación Neutrogena" 
T: Exhibiciones especiales
IMG: UP/2020/07/12-3.jpg alt="Juego ruleta para premios instantáneos en puntos de venta" 
T: Interactivos
IMG: UP/2020/07/3-7.jpg alt="Cinta en rollo sin fin impreso a full color" 
T: Cinta marcación espacios
IMG: UP/2020/07/5-6.jpg alt="Decoración vehicular con impresión a full color y vinilos de alta calidad" 
T: Decoración vehicular
IMG: UP/2020/07/7-2.png alt="Exhibidor trident para puntos de pago" 
T: Displays
IMG: UP/2020/07/11b-1.jpg alt="11b" 
T: Exhibidores eco cartón
IMG: UP/2020/07/13-4.jpg alt="Empaques para kit de productos" 
T: Packaging
```

### A-agencia-btl
```
BG(.fl-slide-bg-photo): UP/2020/07/btl-slider-1.jpg
IMG: UP/2020/08/btl-slider-movil.jpg alt="" 
IMG: UP/2020/07/btl-icon-2.jpg alt="btl-icon-2" 
IMG: UP/2020/06/Soluciones-Impresas-linea-1.jpg alt="Soluciones-Impresas-linea" 
P: Equipo BTL con más de 20 años de experiencias apoyados de una agencia creativa estratégica.
IMG: UP/2020/07/btl-icon-3.jpg alt="btl-icon-3" 
IMG: UP/2020/06/Soluciones-Impresas-linea2.jpg alt="Soluciones-Impresas-linea2" 
P: Conectamos personas con presencia en las principales ciudades de Colombia para el desarrollo de experiencias 360°.
IMG: UP/2020/07/btl-icon-4.jpg alt="btl-icon-4" 
P: Nuestra gran ventaja: contar con capacidad propia de producción. Efectividad con ahorro en costos y tiempo.
IMG: UP/2020/07/btl-icon-5.jpg alt="btl-icon-5" 
IMG: UP/2020/06/Soluciones-Impresas-linea-3-1.jpg alt="Soluciones-Impresas-linea-3" 
P: Desarrollo de experiencias 360° que conectan personas a través de nuestro equipo logístico, creativo y de producción.
IMG: UP/2020/06/comillas-gris.png alt="comillas-gris" 
P: Diseñamos, planeamos, producimos y ejecutamos eventos impactantes presenciales y virtuales. Nos especializamos en el shopper y en cómo conducirlo a la compra.
IMG: UP/2020/06/comillas-gris2.png alt="comillas-gris2" 
P: ¿Qué hacemos?
IMG: UP/2020/07/btl-1.jpg alt="Eventos corporativos" 
## Eventos corporativos
P: Desarrollo de principio a ﬁn de actividades de las marcas para ﬁdelizar, motivar, posicionarse, vender y mejorar la experiencia corporativa.
IMG: UP/2020/07/btl-2-1.jpg alt="Marketing BTL" 
## Marketing BTL
P: Creamos impacto en los escenarios que su marca necesita mediante actividades que generan valor y publicidad natural, enfocándonos siempre en una base estratégica.
IMG: UP/2020/07/btl-3-1.jpg alt="Endomarketing" 
## Endomarketing
P: Creamos estrategias que generen vínculos emocionales, trabajo en equipo, motivación y mayor eficiencia en los colaboradores de una organización.
IMG: UP/2020/07/btl-4-1.jpg alt="Experiencias interactivas y sensoriales" 
## Experiencias interactivas y sensoriales
P: Potenciamos al máximo los sentidos para comunicar de manera efectiva una marca o producto mediante el uso de nuevas tecnologías.
IMG: UP/2020/06/Soluciones-Impresas-9.jpg alt="Experiencias virtuales" 
## Experiencias virtuales
P: Situamos al consumidor en el centro de la estrategia y promovemos acciones utilizando nuevas tecnologías como redes sociales, apps, videojuegos, websites y más.
IMG: UP/2020/07/btl-6-1.jpg alt="Logística y ejecución" 
## Logística y ejecución
P: Somos un gran equipo humano con respaldo empresarial para el desarrollo impecable de eventos y actividades.
P: ¿Cómo lo hacemos?
IMG: UP/2020/07/btl-7.jpg alt="Eventos académicos, congresos, cumbres, foros, meetings y convenciones" 
## Eventos académicos, congresos, cumbres, foros, meetings y convenciones
P: Desarrollamos cualquier tipo de evento académico: desde simposios y congresos hasta talleres y foros.
IMG: UP/2020/07/btl-8.jpg alt="Lanzamiento de nuevos productos" 
## Lanzamiento de nuevos productos
P: Nuestro equipo creativo y logístico creará la mejor estrategia para introducir al mercado sus nuevos productos.
IMG: UP/2020/07/btl-9.jpg alt="Ferias y exposiciones" 
## Ferias y exposiciones
P: Desarrollamos de manera integral todo tipo de ferias y exposiciones, suministrando todos los elementos necesarios para que su evento se lleve a cabo efectivamente.
IMG: UP/2020/07/btl-10.jpg alt="Fiestas corporativas" 
## Fiestas corporativas
P: Producimos eventos empresariales que garantizan una excelente atención para sus clientes y empleados, generando bienestar en su personal y fortaleciendo sus relaciones.
IMG: UP/2020/07/btl-11.jpg alt="Activación de marca" 
## Activación de marca
P: Logramos una interacción positiva con el consumidor, creando experiencias únicas que lo llevarán a recordar y familiarizarse con su marca.
IMG: UP/2020/07/btl-12.jpg alt="Street marketing" 
## Street marketing
P: Creamos estrategias publicitarias que toman lugar en el espacio público, rompiendo con la cotidianidad y generando mayor interacción entra su marca y los clientes potenciales.
IMG: UP/2020/07/btl-13.jpg alt="Decoración, iluminación y sonido" 
## Decoración, iluminación y sonido
P: Tenemos a nuestra disposición los mejores equipos para ambientar su espacio y exponenciar la visibilidad de su marca de manera creativa y memorable.
IMG: UP/2020/07/btl-14.jpg alt="Comunicación organizacional" 
## Comunicación organizacional
P: Creamos campañas interactivas que harán de su empresa el mejor ambiente para laborar, generando un vínculo emocional fuerte entre los colaboradores y su compañía.
IMG: UP/2020/07/btl-15.jpg alt="Shows y artistas" 
## Shows y artistas
P: Contamos con una amplia base de datos de profesionales que garantizarán un espectáculo a otro nivel.
IMG: UP/2020/07/btl-16.jpg alt="Logística y protocolo " 
## Logística y protocolo
P: Realizamos la planeación, ejecución y monitoreo de resultados de sus eventos para asegurar un proceso de alta calidad profesional.
IMG: UP/2020/07/btl-17.jpg alt="Capacitaciones" 
## Capacitaciones
P: Contamos con una amplia red de contacto especializados en realizar actividades lúdicas con fines educativos.
IMG: UP/2020/07/btl-18.jpg alt="Experiencias interactivas y sensoriales" 
## Experiencias interactivas y sensoriales
P: Exploramos la sensorialidad y la convertimos en una actividad efectiva para generar una alta recordación de su marca.
IMG: UP/2020/07/btl-19.jpg alt="Catering" 
## Catering
P: Garantizamos una experiencia gastronómica de alta calidad, generando una experiencia inolvidable.
IMG: UP/2020/07/btl-20.jpg alt="Seguridad" 
## Seguridad
P: Garantizamos la efectiva realización de sus eventos en un ambiente seguro.
IMG: UP/2020/07/btl-21.jpg alt="Escenografía" 
## Escenografía
P: Ponemos a su disposición los elementos visuales necesarios para construir un ambiente agradable, original y de alta recordación.
IMG: UP/2020/07/btl-22.jpg alt="Modelos, actores y promotores " 
## Modelos, actores y promotores
P: A través de nuestra base de datos, usted podrá encontrar a los profesionales y artistas con más experiencia en el mercado.
IMG: UP/2020/07/btl-23.jpg alt="Transporte" 
## Transporte
P: Ofrecemos servicio de trasporte para sus clientes, colaboradores, equipos de trabajo y productos antes, durante y después del evento.
IMG: UP/2020/07/btl-24.jpg alt="Material publicitario" 
## Material publicitario
P: Creamos todo tipo de material publicitario para exponenciar su marca durante la ejecución del evento: desde lapiceros, gorras, botones y accesorios personales; hasta artículos a gran escala.
IMG: UP/2020/07/btl-25.jpg alt="Diseño estrategia de campaña " 
## Diseño estrategia de campaña
P: Desarrollamos de principio a fin sus acciones estratégicas, partiendo del análisis y los retos de las marcas.
IMG: UP/2020/07/btl-26.jpg alt="Experiencias online " 
## Experiencias online
P: Proponemos nuevos escenarios que acercan las marcas a sus audiencias para conducirlas al call to action.
IMG: UP/2020/07/btl-27.jpg alt="Venta y renta de moviliario para eventos" 
## Venta y renta de moviliario para eventos
P: Planteamos las mejores alternativas para destacar las marcas con los elementos de acuerdo a diferentes espacios.
P: Nuestra fórmula
IMG: UP/2020/07/btl-icon-6-300x300.jpg alt="btl-icon-6" 
P: Creatividad e impacto
IMG: UP/2020/06/mas.jpg alt="mas" 
IMG: UP/2020/07/btl-icon-7-300x300.jpg alt="btl-icon-7" 
P: Cuidado al detalle
IMG: UP/2020/07/btl-icon-8-300x300.jpg alt="btl-icon-8" 
P: 360 grados
IMG: UP/2020/07/btl-icon-9-300x300.jpg alt="btl-icon-9" 
P: Orientación al resultado
P: Proyectos
IMG: UP/2020/07/ACTIVACION-DE-MARCA-Toma-de-puntos-de-venta-con-actividades-interactivas-min-2.jpg alt="Toma de puntos de venta con actividades interactiva" 
T: Activación de marca
IMG: UP/2020/07/CATERING-Selecci%C3%B3n-de-los-mejores-platos-y-apoyo-de-Chef-reconocidos-min.jpg alt="Selección de los mejores platos y apoyo de Chef reconocidos" 
T: Catering
IMG: UP/2020/07/EVENTOS-ACADEMICOS-Presentaci%C3%B3n-de-eventos-en-Bogota-con-iluminaci%C3%B3n-y-multimedia-min.jpg alt="Presentación de eventos en Bogotá con iluminación y multimedia" 
T: Eventos académicos
IMG: UP/2020/07/MATERIAL-IMPRESO-EVENTOS-Porta-tarjeta-hotel-min-1.jpg alt="Porta tarjeta hotel" 
T: Material impreso eventos
IMG: UP/2020/07/DECORACION-ILUMINACION-Y-SONIDO-Decoracion-salones-lanzamientos-min.jpg alt="Decoración salones lanzamientos" 
T: Decoración iluminación y sonido
IMG: UP/2020/07/ENDOMARKETING-Actividades-outdoor-min.jpg alt="Actividades outdoor" 
T: Endomarketing
IMG: UP/2020/07/EXPERIENCIAS-INTERACTIVAS-Actividad-experiencial-con-m%C3%BAsica-teatro-y-personajes-especiales-min.jpg alt="Experiencias interactivas Actividad experiencial con música, teatro y personajes especiales" 
T: Experiencias interactivas
IMG: UP/2020/07/EXPERIENCIAS-SENSORIALES-Aplicacion-mapping-sobre-cuerpo-para-visualizar-el-efecto-del-medicamento.jpg alt="Aplicación mapping sobre cuerpo para visualizar el efecto del medicamento" 
IMG: UP/2020/07/FERIAS-Y-EXPOSICIONES-Adecuaci%C3%B3n-de-espacios-en-centros-de-convenciones-min-2.jpg alt="Adecuación de espacios en centros de convenciones" 
T: Ferias y exposiciones
IMG: UP/2020/07/FIESTAS-CORPORATIVAS-Fiestas-tematicas-innolvidables-min.jpg alt="Fiestas temáticas inolvidables" 
T: Fiestas corporativas
IMG: UP/2020/07/LANZAMIENTO-DE-NUEVOS-PRODUCTOS-Decoracion-lanzamiento-vehiculos-min.jpg alt="Decoración lanzamiento vehículos" 
T: Lanzamiento de nuevos productos
```

### A-promos-gifts-importados
```
IMG: UP/2020/06/slider-promos.jpg alt="" 
BG(.fl-slide-bg-photo): UP/2020/06/slider-promos.jpg
IMG: UP/2020/06/comillas-gris.png alt="comillas-gris" 
P: Traemos el mundo hasta su puerta con productos de primera calidad.
IMG: UP/2020/06/comillas-gris2.png alt="comillas-gris2" 
P: Nuestro proceso
IMG: UP/2020/06/importados-1.png alt="importados-1" 
IMG: UP/2020/06/linea-2-300x29.png alt="linea-2" 
P: Lluvia de ideas.
IMG: UP/2020/06/importados-2.png alt="importados-2" 
IMG: UP/2020/06/linea-300x29.png alt="linea" 
P: Propuesta digital.
IMG: UP/2020/06/importados-3.png alt="importados-3" 
P: Conceptualización de producto.
IMG: UP/2020/06/importados-4.png alt="importados-4" 
P: Fabricación directa.
IMG: UP/2020/06/importados-5.png alt="importados-5" 
P: Empaque e inspección.
IMG: UP/2020/06/importados-6.png alt="importados-6" 
IMG: UP/2020/06/linea-3-300x29.png alt="linea-3" 
P: Logística y entrega.
P: ¿Qué hacemos?
IMG: UP/2020/06/accesorios.png alt="accesorios" 
T: Accesorios para oﬁcina
IMG: UP/2020/06/viajes.jpg alt="viajes" 
T: Viajes, recreación y deportes
IMG: UP/2020/06/cristal.jpg alt="cristal" 
T: Artículos en cristal
IMG: UP/2020/06/bolsos.jpg alt="bolsos" 
T: Cosmetiqueras, bolso y estuches
IMG: UP/2020/06/ceramica.jpg alt="ceramica" 
T: Cerámica
IMG: UP/2020/06/ecologicos.jpg alt="ecologicos" 
T: Ecológicos
IMG: UP/2020/06/escritura.jpg alt="escritura" 
T: Escritura
IMG: UP/2020/06/Gadgets.jpg alt="Gadgets" 
T: Gadgets
IMG: UP/2020/06/infantiles.jpg alt="infantiles" 
T: Infantiles y didácticos
IMG: UP/2024/01/lanyard-titulo-2.jpg alt="lanyard titulo" 
T: Lanyards y correas
IMG: UP/2020/06/hidratacion.jpg alt="hidratacion" 
T: Productos de hidratación y almacenamiento de alimentos
IMG: UP/2020/06/regalos.jpg alt="regalos" 
T: Regalos corporativos
IMG: UP/2020/06/reloj.jpg alt="reloj" 
T: Relojería
IMG: UP/2020/06/sombrillas.jpg alt="sombrillas" 
T: Sombrillas
IMG: UP/2020/06/regrego.jpg alt="regrego" 
T: Regreso a clases
IMG: UP/2020/06/textiles.jpg alt="textiles" 
T: Textiles
IMG: UP/2020/06/trofeo.jpg alt="trofeo" 
T: Trofeos y reconocimientos
IMG: UP/2020/06/musica.jpg alt="musica" 
T: Gadgets, música y tecnología
IMG: UP/2020/06/cosmeti.jpg alt="cosmeti" 
T: Cosmetiqueras, bolsos y estuches
IMG: UP/2020/06/madera.jpg alt="madera" 
T: Productos en madera
IMG: UP/2020/06/hogar.jpg alt="hogar" 
T: Hogar, cocina y decoración
IMG: UP/2020/06/temporales.jpg alt="temporales" 
T: Temporadas especiales
IMG: UP/2020/06/caja-metal.jpg alt="caja-metal" 
T: Empaques especiales, cajas metálicas
IMG: UP/2020/06/coleccion.jpg alt="coleccion" 
T: Masivos económicos, merchandising, coleccionables
IMG: UP/2020/06/barra.jpg alt="barra" 
T: Productos para bar y licores
IMG: UP/2020/06/licenciados.jpg alt="licenciados" 
T: Productos licenciados
IMG: UP/2020/06/inflables.jpg alt="inflables" 
T: Peluches, Inflables y replicas
IMG: UP/2020/06/belleza.jpg alt="belleza" 
T: Belleza y cuidado personal
IMG: UP/2020/06/mascotas.jpg alt="mascotas" 
T: Productos para mascotas
P: Proyectos
IMG: UP/2020/07/4-2.jpg alt="Plegable de gran capacidad" 
T: Bolsas
IMG: UP/2020/07/7B-2.jpg alt="Mixer especial" 
T: Bar & vino
IMG: UP/2020/07/1B-1.jpg alt="Pinzas para el pelo" 
T: Accesorios
IMG: UP/2020/07/3a-1.jpg alt="Borradores con formas" 
T: Back to school
IMG: UP/2020/07/8-2.jpg alt="Plato marcianos" 
T: Bebe
IMG: UP/2020/07/9B-1.jpg alt="LAPICEROS + RESALTADOR" 
T: Bolígrafos
IMG: UP/2020/07/2-2.jpg alt="2" 
T: Amor y amistad
IMG: UP/2020/07/5-2.jpg alt="Balón con impresión a full color" 
T: Balones
IMG: UP/2020/07/6A-2.jpg alt="Kit porta vasos cepillar los dientes" 
T: Baño
IMG: UP/2020/07/10-1.jpg alt="Bolsa en tela no tejida con impresión a full color con fuelle" 
T: Bolsas ecológicas reutilizables
P: Catálogos virtuales
### Catálogo borradores
IMG: UP/2020/06/catalogo.jpg alt="catalogo" 
P: Ver catálogo virtual
P: Descargar catálogo PDF
### Catálogo productos bamboo
IMG: UP/2020/06/catalogo2.jpg alt="catalogo2" 
### Catálogo productos silicona
IMG: UP/2020/06/catalogo3.jpg alt="catalogo3" 
### Catálogo inﬂables
IMG: UP/2020/06/catalogo4.jpg alt="catalogo4" 
### Catálogo pets
IMG: UP/2020/06/catalogo5.jpg alt="catalogo5" 
```

### A-promos-gifts-en-stock
```
BG(.fl-slide-bg-photo): UP/2020/06/Promocionales-en-stock-1.jpg
IMG: UP/2020/08/Promocionales-en-stock-slider-movil.jpg alt="" 
IMG: UP/2020/06/comillas-gris.png alt="comillas-gris" 
P: Convertimos sus ideas en productos rentables y creativos.
IMG: UP/2020/06/comillas-gris2.png alt="comillas-gris2" 
P: Visita nuestros catálogos online con un solo clic
#### Catálogo gifts
#### Catálogo premiums
#### Catálogo regalos
#### Catálogo promos
P: ¿Qué hacemos?
IMG: UP/2020/07/Promocionales-en-stock-12.jpg alt="Promocionales-en-stock-12" 
T: Hogar
IMG: UP/2020/07/Promocionales-en-stock-13.jpg alt="Promocionales-en-stock-13" 
T: Cuidado personal
IMG: UP/2020/07/Promocionales-en-stock-14.jpg alt="Promocionales-en-stock-14" 
T: Golf
IMG: UP/2020/07/Promocionales-en-stock-15.jpg alt="Promocionales-en-stock-15" 
T: Confecciones
IMG: UP/2020/06/viajes.jpg alt="viajes" 
T: Accesorios para viaje
IMG: UP/2020/07/Promocionales-en-stock-17.jpg alt="Promocionales-en-stock-17" 
T: Memorias USB
IMG: UP/2020/07/Promocionales-en-stock-18.jpg alt="Promocionales-en-stock-18" 
T: Accesorios para oficina
IMG: UP/2020/07/Promocionales-en-stock-16.jpg alt="Promocionales-en-stock-16" 
T: Iluminación
IMG: UP/2020/06/cristal.jpg alt="cristal" 
T: Artículos en cristal
IMG: UP/2020/06/bolsos.jpg alt="bolsos" 
T: Bolsas
IMG: UP/2020/06/ceramica.jpg alt="ceramica" 
T: Cerámica
IMG: UP/2020/06/ecologicos.jpg alt="ecologicos" 
T: Ecológicos
IMG: UP/2020/06/escritura.jpg alt="escritura" 
T: Escritura
IMG: UP/2020/06/Gadgets.jpg alt="Gadgets" 
T: Gadgets
IMG: UP/2020/06/infantiles.jpg alt="infantiles" 
T: Juegos de mesa
IMG: UP/2020/06/magneticos.jpg alt="magneticos" 
T: Magnéticos
IMG: UP/2020/06/hidratacion.jpg alt="hidratacion" 
T: Termos
IMG: UP/2020/06/regalos.jpg alt="regalos" 
T: Regalos corporativos
IMG: UP/2020/06/reloj.jpg alt="reloj" 
T: Relojería
IMG: UP/2020/06/sombrillas.jpg alt="sombrillas" 
T: Sombrillas
IMG: UP/2020/06/regrego.jpg alt="regrego" 
T: Stickers
IMG: UP/2020/06/textiles.jpg alt="textiles" 
T: Textiles
IMG: UP/2020/06/trofeo.jpg alt="trofeo" 
T: Trofeos y reconocimientos
IMG: UP/2020/06/musica.jpg alt="musica" 
T: Wearables
P: Proyectos
IMG: UP/2020/07/6-1.jpg alt="Bolígrafo para médicos" 
T: Bolígrafos
IMG: UP/2020/07/11.jpg alt="Copa de vino" 
T: Cristalería
IMG: UP/2020/07/15-1.jpg alt="Gorra Golf" 
T: Gorras
IMG: UP/2020/07/17B-1.jpg alt="Set de Escritorio Office" 
T: Home office
IMG: UP/2020/07/29B-1.jpg alt="Resaltador de Cera Fiona" 
T: Resaltador
IMG: UP/2020/07/30C.jpg alt="Speaker Bluetooth Waterproof" 
T: Tecnología
IMG: UP/2020/07/1.jpg alt="Cargador con luz" 
T: Automóvil
IMG: UP/2020/07/3-1.jpg alt="Asador" 
T: BBQ
IMG: UP/2020/07/5.jpg alt="Canguro Loop" 
T: Bicicleta
IMG: UP/2020/07/8B.jpg alt="Botilito Sport Laguna - 800 ml" 
T: Botilito
IMG: UP/2020/07/10C-1.jpg alt="T-shirt Dama" 
T: Camiseta
IMG: UP/2020/07/13.jpg alt="Banda Elástica Doble" 
T: Deporte
IMG: UP/2020/07/22.jpg alt="Morral Backpack Plegable Molly" 
T: Maletas
IMG: UP/2020/07/23B.jpg alt="Pastillero Giratorio" 
T: Médicos
IMG: UP/2020/07/2A.jpg alt="Mezclador Plástico Martini" 
T: Bar
IMG: UP/2020/07/4B-1.jpg alt="Botella Sport 450ml" 
T: Bebidas
IMG: UP/2020/07/7-1.jpg alt="Bolsa en Cambrel Arcadia" 
T: Bolsa de mercado
IMG: UP/2020/07/9.jpg alt="Calculadora Clipboard" 
T: Calculadoras
IMG: UP/2020/07/14D.jpg alt="Portacomidas con Cubiertos Eco Nature" 
T: Ecofriendly
IMG: UP/2020/07/19.jpg alt="Alcancía Mini Piggy" 
T: Infantil
IMG: UP/2020/07/21C.jpg alt="Llavero Destapador Orbis" 
T: Llaveros
IMG: UP/2020/07/31B.jpg alt="Mini Monedero en Silicona" 
T: Variedades
P: Catálogos virtuales
### Catálogo gift
A: [] -> SITE/promocionales/
P: Ver catálogo virtual
A: [] -> UP/2020/07/cat%C3%A1logo-marpico-2019-20.pdf
P: Descargar catálogo PDF
### Catálogo premiums
A: [] -> http://imagenesgraficas.cataprom.com/seccion/inicio.html
A: [] -> UP/2020/07/Cat%C3%A1logo_Promocionales_Final.pdf
### Catálogo regalos
A: [] -> SITE/regalos/
A: [] -> UP/2020/07/Caratula_PROMOOPTION.pdf
### Catálogo promos
A: [] -> http://imagenesgraficasbic.muy.promo/
A: [] -> UP/2020/07/catalogo-cdo.pdf
```

### A-promos-gifts-a-la-medida
```
BG(.fl-slide-bg-photo): UP/2020/07/Promocionales-a-la-medida-slider.jpg
IMG: UP/2020/08/Promocionales-a-la-medida-slider-movil.jpg alt="" 
IMG: UP/2020/06/comillas-gris.png alt="comillas-gris" 
P: Creamos soluciones a la medida de sus necesidades.
IMG: UP/2020/06/comillas-gris2.png alt="comillas-gris2" 
P: Somos especialistas en producir artículos de consumo para venta por catálogo, promociones y productos de línea. Integramos todos los procesos de nuestra planta de producción para crear productos únicos.
P: Proceso de diseño
P: Si puede imaginarlo, ¡podemos crearlo!.
IMG: UP/2020/07/IMG_0043-300x300.jpg alt="IMG_0043" 
P: Mockup & muestras
P: Visuales y muestras en 24 horas.
IMG: UP/2020/07/imac-3-300x300.jpg alt="imac-3" 
P: Costura & producción
P: Procesos integrados bajo un mismo techo.
IMG: UP/2020/07/imac-6-300x300.jpg alt="imac-6" 
P: Control de calidad & envío
P: Controlamos cada detalle y entregamos justo a tiempo.
IMG: UP/2020/07/imac-7-300x300.jpg alt="imac-7" 
IMG: UP/2020/07/Promocionales-a-la-medida-icon.jpg alt="Promocionales-a-la-medida-icon" 
IMG: UP/2020/06/Soluciones-Impresas-linea-1.jpg alt="Soluciones-Impresas-linea" 
P: Recibimos su solicitud.
IMG: UP/2020/07/Promocionales-a-la-medida-icon2.jpg alt="Promocionales-a-la-medida-icon2" 
IMG: UP/2020/06/Soluciones-Impresas-linea2.jpg alt="Soluciones-Impresas-linea2" 
P: ¡Nuestros diseñadores se ponen manos a la obra!.
IMG: UP/2020/07/Promocionales-a-la-medida-icon3.jpg alt="Promocionales-a-la-medida-icon3" 
IMG: UP/2020/06/Soluciones-Impresas-linea-3-1.jpg alt="Soluciones-Impresas-linea-3" 
P: Entregamos los mejores promocionales totalmente personalizados.
P: ¿Qué hacemos?
IMG: UP/2020/07/Promocionales-a-la-medida-1.jpg alt="Promocionales-a-la-medida-1" 
T: Textiles ecológicos
IMG: UP/2020/07/Promocionales-a-la-medida-2.jpg alt="Promocionales-a-la-medida-2" 
T: Didácticos
IMG: UP/2020/07/Promocionales-a-la-medida-3.jpg alt="Promocionales-a-la-medida-3" 
T: Productos de madera
IMG: UP/2020/07/Promocionales-a-la-medida-4.jpg alt="Promocionales-a-la-medida-4" 
T: Textiles impresos a full color
IMG: UP/2020/07/Promocionales-a-la-medida-5.jpg alt="Promocionales-a-la-medida-5" 
T: Promocionales en tela no tejida (cambre)
IMG: UP/2020/07/Promocionales-a-la-medida-6.jpg alt="Promocionales-a-la-medida-6" 
T: Hechos en papel y agendas
IMG: UP/2020/07/Promocionales-a-la-medida-7.jpg alt="Promocionales-a-la-medida-7" 
T: Maletas, morrales y accesorios
IMG: UP/2020/07/Promocionales-a-la-medida-8.jpg alt="Promocionales-a-la-medida-8" 
T: Imantados
IMG: UP/2020/07/Promocionales-a-la-medida-9.jpg alt="Promocionales-a-la-medida-9" 
T: Empaques especiales
IMG: UP/2020/07/Promocionales-a-la-medida-10.jpg alt="Promocionales-a-la-medida-10" 
T: Cuero y manofaturados
IMG: UP/2020/07/Promocionales-a-la-medida-11.jpg alt="Promocionales-a-la-medida-11" 
T: Textiles y moda
IMG: UP/2020/07/Promocionales-a-la-medida-12.jpg alt="Promocionales-a-la-medida-12" 
T: Anchetas
IMG: UP/2020/07/Promocionales-a-la-medida-13.jpg alt="Promocionales-a-la-medida-13" 
T: Agendas
IMG: UP/2020/06/cosmeti.jpg alt="cosmeti" 
T: Cosmetiqueras, bolsos y estuches
IMG: UP/2020/07/Promocionales-a-la-medida-14.jpg alt="Promocionales-a-la-medida-14" 
T: Gift sets
IMG: UP/2020/07/Promocionales-a-la-medida-15.jpg alt="Promocionales-a-la-medida-15" 
T: Hogar y decoración
IMG: UP/2020/07/Promocionales-a-la-medida-16.jpg alt="Promocionales-a-la-medida-16" 
T: Ecológicos
IMG: UP/2020/07/Promocionales-a-la-medida-17.jpg alt="Promocionales-a-la-medida-17" 
T: Línea escolar
IMG: UP/2020/07/Promocionales-a-la-medida-18.jpg alt="Promocionales-a-la-medida-18" 
T: Bisutería
IMG: UP/2020/07/Promocionales-a-la-medida-19.jpg alt="Promocionales-a-la-medida-19" 
T: Temporadas
P: Proyectos
IMG: UP/2020/07/delantales-delantal-impreso-a-full-color-min.jpg alt="Delantal impreso a full color" 
T: Bolsas
IMG: UP/2020/07/EMPAQUES-ESPECIALES-empaque-madera-min-1.jpg alt="EMPAQUES-ESPECIALES-empaque-madera-min" 
IMG: UP/2020/07/TULAS-Elaborada-en-lona-con-impresion-a-full-color-min.jpg alt="Elaborada en lona con impresión a full color" 
T: Tulas
IMG: UP/2020/07/PORTARETRATOS-Elaborado-en-acrilico.jpg alt="Elaborado en acrílico" 
T: Portaretratos
IMG: UP/2020/07/portavasos-en-acero-con-marcacion-laser-coca-cola.jpg alt="portavasos en acero con marcacion laser coca cola" 
T: Portavasos
IMG: UP/2020/07/alcancias-eco-alcancia-madera.jpg alt="Alcancía madera" 
T: Alcancías eco
IMG: UP/2020/07/billeteras-Elaborada-en-cuero-ecologico-min.jpg alt="Elaborada en cuero ecológico" 
T: Billeteras
IMG: UP/2020/07/COJINES-Coj%C3%ADn-viajero-relleno-de-microperlas-min.jpg alt="COJINES-Cojín-viajero-relleno-de-microperlas-min" 
T: Cojines
IMG: UP/2020/07/Cuadros-decorativos-cuadro-madera-con-mensajes-min.jpg alt="cuadro madera con mensajes" 
T: Cuadros decorativos
IMG: UP/2020/07/JUEGOS-EN-PAPEL-ECO-set-barajas-Poker-min.jpg alt="Set barajas Poker" 
T: Juegos en papel eco
IMG: UP/2020/07/marca-maletasl-color-1-cara.jpg alt="Full color 1 cara" 
T: Marca maletas
IMG: UP/2020/07/organizadores-Tula-para-cosmeticos-min.jpg alt="Tula para cosméticos" 
T: Organizadores
IMG: UP/2020/07/Bolsa-de-mercado-bolsas-en-cambre-laminado-impresa-a-full-color-min.jpg alt="bolsas en cambre laminado impresa a full color" 
T: Bolsa de mercado
IMG: UP/2020/07/CARTUCHERAS-Elaborada-en-Clear-para-set-de-viaje-min.jpg alt="Elaborada en Clear para set de viaje" 
T: Cartucheras
IMG: UP/2020/07/cosmetiqueras-elaborada-en-clear-con-impresion-en-tela-min.jpg alt="Elaborada en clear con impresión en tela" 
T: Cosmetiqueras
IMG: UP/2020/07/Individuales-de-mesa-set-individuales-plasticos-x2-o-x4-min.jpg alt="Set individuales plásticos x2 o x4" 
T: Individuales de mesa
IMG: UP/2020/07/loncheras-rectangle-lunch-bag-min.jpg alt="loncheras rectangle-lunch bag-min" 
T: Loncheras
IMG: UP/2020/07/neceser-ideal-para-llevar-cosmeticos.jpg alt="neceser ideal para llevar cosmeticos" 
T: Neceser
IMG: UP/2020/07/peluches-replica-de-Vaca.jpg alt="Replica de vaca" 
T: Peluches
```

### A-soluciones-sostenibles
```
BG(.fl-slide-bg-photo): UP/2020/06/Soluciones-Sostenibles-slider-1.jpg
IMG: UP/2020/08/Soluciones-Sostenibles-slider-movil.jpg alt="" 
BG(.fl-row-content-wrap): UP/2020/06/fondo-arriba-1.jpg
P: Productos en materiales ecofriendly
IMG: UP/2020/06/Soluciones-Sostenibles-bambu-150x150.png alt="Soluciones-Sostenibles-bambu" 
IMG: UP/2020/06/Soluciones-Sostenibles-madera-150x150.png alt="Soluciones-Sostenibles-madera" 
IMG: UP/2020/06/Soluciones-Sostenibles-plasticos-150x150.png alt="Soluciones-Sostenibles-plasticos" 
IMG: UP/2020/06/botellas-150x150.png alt="botellas" 
IMG: UP/2020/06/Soluciones-Sostenibles-bolsas-150x150.png alt="Soluciones-Sostenibles-bolsas" 
IMG: UP/2020/06/Soluciones-Sostenibles-carton-150x150.png alt="Soluciones-Sostenibles-carton" 
IMG: UP/2020/06/Soluciones-Sostenibles-papel-150x150.png alt="Soluciones-Sostenibles-papel" 
IMG: UP/2020/01/comillas-blancas.png alt="comillas-blancas" 
P: Logramos impactar con grandes productos garantizando la vida de generaciones futuras.
IMG: UP/2020/01/comillas-blancas-2.png alt="comillas-blancas-2" 
BG(.fl-row-content-wrap): UP/2020/06/fondo-abajo.jpg
IMG: UP/2020/06/Soluciones-Sostenibles-1-150x150.jpg alt="Soluciones-Sostenibles-1" 
P: Orgánico
P: Tips
P: Productos hechos de tal manera que reponen y mantienen la fertilidad del suelo, construyendo una agricultura biológicamente diversa, sin tóxicos, fertilizantes químicos o pesticidas.
IMG: UP/2020/06/Soluciones-Sostenibles-2-150x150.jpg alt="Soluciones-Sostenibles-2" 
P: Sostenible, renovable y rápido
P: Materiales que son fáciles y económicos de reemplazar con el fin de mantener una cadena de suministro estable y evitar el agotamiento de los recursos naturales.
IMG: UP/2020/06/Soluciones-Sostenibles-3-150x150.jpg alt="Soluciones-Sostenibles-3" 
P: Reciclable
P: Cualquier material que haya tenido un uso y se reutilice en lugar de desecharse.
IMG: UP/2020/06/Soluciones-Sostenibles-4.jpg alt="Soluciones-Sostenibles-4" 
P: Sostenible
P: Los recursos sostenibles se reponen naturalmente al mismo ritmo que se consumen, incluidos productos hechos de bambú, algodón o maíz.
P: ¿Qué hacemos?
IMG: UP/2020/07/Soluciones-Sostenibles-5.jpg alt="POP ambientalmente" 
## POP ambientalmente
P: Publicidad con sentido, promoviendo una mayor duración a través de la reutilización.
IMG: UP/2020/07/Soluciones-Sostenibles-7.jpg alt="Eco cartón" 
## Eco cartón
P: Por ser un material reciclado y reciclable, nos brinda la posibilidad de generar productos de muy bajo impacto ambiental.
IMG: UP/2020/07/Soluciones-Sostenibles-8.jpg alt="Reutilizables" 
## Reutilizables
P: Elementos que a través del uso diario evitan el consumo de productos desechables.
IMG: UP/2020/06/Soluciones-Sostenibles-6.jpg alt="Germinables" 
## Germinables
P: Productos que germinan y se convierten en plantas, reemplazando elementos que se convierten en basura por árboles y plantas vivas.
IMG: UP/2020/06/Soluciones-Sostenibles-9.jpg alt="Reciclables" 
## Reciclables
P: Papel, plástico, metales y vidrios disminuyen en más del 50% el gasto de energía en su producción.
IMG: UP/2020/06/Soluciones-Sostenibles-10.jpg alt="Bambú" 
## Bambú
P: Hacemos uso del bambú, una planta de rápido crecimiento que genera más oxígeno que los árboles, convirtiéndola en uno de los más importantes recursos versátiles.
IMG: UP/2020/06/Soluciones-Sostenibles-11.jpg alt="Maíz plástico" 
## Maíz plástico
P: Utilizamos plástico hecho de resina de maíz (ácido poliláctico), el cual reduce las dependencias en petróleo mientras disminuye la contaminación durante la fabricación.
IMG: UP/2020/07/Soluciones-Sostenibles-12.jpg alt="Productos en papel eco" 
## Productos en papel eco
P: Elaborados con papeles ambientalmente amigables con sellos ambientales.
IMG: UP/2020/07/Soluciones-Sostenibles-13.jpg alt="Empaques ecológicos" 
## Empaques ecológicos
P: Bolsas, cajas, etiquetas y mucho más.
IMG: UP/2020/06/Soluciones-Sostenibles-14.jpg alt="Textiles ecológicos" 
## Textiles ecológicos
P: Productos elaborados con telas ambientalmente amigables como yute, telas y lonas orgánicas.
IMG: UP/2020/07/Soluciones-Sostenibles-15.jpg alt="Bolsas reutilizables" 
## Bolsas reutilizables
P: Con nosotros puedes evitar 6 bolsas plásticas por semana, 24 al mes, 288 al año Y 22.776 bolsas plásticas durante una vida promedio.
IMG: UP/2020/07/Soluciones-Sostenibles-16.jpg alt="Promocionales eco friendly" 
## Promocionales eco friendly
P: Su marca en productos con conciencia ambiental.
P: Proyectos
IMG: UP/2020/07/2A-2.jpg alt="Display exhibición 2 caras" 
T: Displays exhibidores eco
IMG: UP/2020/07/9-5.jpg alt="Arcos especiales" 
T: Stands gran formato eco
IMG: UP/2020/07/10A-2.jpg alt="Mug en fibra de maiz" 
T: Termos y botellas eco
IMG: UP/2020/07/12B-1.jpg alt="Vajillas en material ecológico" 
T: Vajillas eco
IMG: UP/2020/07/1-4.jpg alt="Vitrinas decoradas con la resistencia del cartón panal de abeja" 
T: Decoración de vitrinas eco
IMG: UP/2020/07/4-5.jpg alt="Juego de mesa y sillas en Eco cartón" 
T: Mobiliario eco
IMG: UP/2020/07/6-5.jpg alt="Impresos con tintas eco a base de soya" 
T: Productos impresos eco
IMG: UP/2020/07/8A-4.jpg alt="8A" 
T: Regalos plantables
IMG: UP/2020/07/3B-1.jpg alt="Lonchera elaborada en fibra de bamboo 1" 
T: Loncheras eco
IMG: UP/2020/07/5-4.jpg alt="Portavasos en madera" 
T: Portavasos
IMG: UP/2020/07/7-3.jpg alt="Set de pitillos" 
T: Productos reutilizables
IMG: UP/2020/07/11-4.jpg alt="Elaborados en cartón panal de abeja" 
T: Tropezones eco
IMG: UP/2020/06/eco.png alt="eco" 
P: Pequeñas y grandes empresas, todos podemos tomar medidas para minimizar nuestro impacto en el medio ambiente.
P: La compra de productos ecológicos le proporciona a su organización una forma tangible de disminuir los impactos negativos en la calidad del aire, la pureza del agua, y ayudar con la preservación de la tierra.
```

### A-casos-de-exito
```
BG(.fl-row-content-wrap): UP/2020/07/exito-1.jpg
P: Casos de éxito
P: Compartimos algunos casos exitosos, producidas a empresas que por mas de 3º años han confiado en nosotros. Estos son reflejo del trabajo de nuestro gran equipo de trabajo y la confianza de nuestros clientes.
IMG: UP/2020/08/dettol.png alt="dettol" 
### PROYECTO:
P: Estuches para gel antibacterial
P: EL RETO: Desarrollar un porta gel adaptable al empaque del producto que logre impulsar e incrementar las ventas del producto.
P: LA ACCIÓN: Desarrollamos los modelos, moldes y realizamos producción de mas de 100 mil unidades de estuches para Colombia, Chile y Argentina.
P: RESULTADOS: Se incrementaron las ventas de Dettol en mas del 300% y se convirtió en el proyecto mas exitoso de la región en el año de ejecución.
IMG: UP/2020/08/detto-3.jpg alt="" 
IMG: UP/2020/08/detto-4.jpg alt="" 
IMG: UP/2020/08/detto-5.jpg alt="" 
IMG: UP/2020/08/detto-6.jpg alt="" 
IMG: UP/2020/08/detto-1.jpg alt="" 
IMG: UP/2020/08/detto-2.jpg alt="" 
```

### A-blog
```
P: Blog
A: [] -> SITE/index.php/texto-prueba-noticia/
IMG: UP/bb-plugin/cache/btl-3-landscape-be95a581abfc7ba88e146547a97a40c0-.jpg alt="Prueba2" 
### El BTL en los mercados publicitarios actuales
P: En los últimos años en Colombia, el BTL ha logrado ocupar el primer lugar en cuanto a inversión publicitaria alcanzando los $1.29 billones de pesos.
A: [] -> SITE/index.php/stands-y-ferias-un-negocio-en-potencia/
IMG: UP/bb-plugin/cache/entrada3-landscape-0ee3fec7f0435295c47c1b254ba6b6e9-.jpg alt="entrada3" 
### Stands y ferias: un negocio en potencia
P: El sector del marketing ferial está en boom, no solo en Colombia, si no en el mundo entero. ¿Cuál es su potencial como negocio?
A: [] -> SITE/index.php/el-lenguaje-del-marketing/
IMG: UP/bb-plugin/cache/entrada-2-landscape-b4c8a4a4747ecb5a434ab0038d59eaf6-.jpg alt="entrada" 
### El lenguaje del marketing
P: La comunicación y persuasión detrás de los negocios: el endomarketing es el arte y la ciencia del análisis focalizado en un público objetivo.
A: [] -> SITE/index.php/packaging-y-producto/
IMG: UP/bb-plugin/cache/entrada2-landscape-60548f99042f71986c769bce113cb3ce-.jpg alt="entrada2" 
### Packaging: la cara vendedora del producto
P: Según el portal thepaperworker.com, una tercera parte de las decisiones de compra se toman con base en el packaging del producto.
```

### A-contacto
```
P: Contáctenos
P: Para solicitar mayor información o cotizar algún producto, contactenos.
FORM action=SITE/index.php/contacto/#wpcf7-f217-p214-o1: input[type=hidden,name=_wpcf7,placeholder=,required=false,aria=] ; input[type=hidden,name=_wpcf7_version,placeholder=,required=false,aria=] ; input[type=hidden,name=_wpcf7_locale,placeholder=,required=false,aria=] ; input[type=hidden,name=_wpcf7_unit_tag,placeholder=,required=false,aria=] ; input[type=hidden,name=_wpcf7_container_post,placeholder=,required=false,aria=] ; input[type=hidden,name=_wpcf7_posted_data_hash,placeholder=,required=false,aria=] ; input[type=text,name=your-name,placeholder=,required=false,aria=] ; input[type=email,name=your-email,placeholder=,required=false,aria=] ; input[type=text,name=email,placeholder=,required=false,aria=] ; input[type=tel,name=celular,placeholder=,required=false,aria=] ; textarea[type=textarea,name=your-message,placeholder=,required=false,aria=] ; input[type=submit,name=,placeholder=,required=false,aria=]
   FORMTEXT: Nombre* Correo* Teléfono* Mensaje
BG(.fl-row-content-wrap): UP/2019/06/imagenes_graficas_gris.jpg
IFRAME: https://www.google.com/maps/embed/v1/place?q=Calle+24+No.+4-31&key=AIzaSyD09zQ9PNDNNy9TadMuzRV_UsPUoWKntt8
P: CALI (+57-2)441 6153 Calle 24 No. 4-31
IFRAME: https://www.google.com/maps/embed/v1/place?q=Calle+127c+4-51&key=AIzaSyD09zQ9PNDNNy9TadMuzRV_UsPUoWKntt8
P: BOGOTÁ (+57) 318 363 7106 Calle 127c 4-51
IFRAME: https://www.google.com/maps/embed/v1/place?q=390+NW+86th+Ct+%238+33126&key=AIzaSyD09zQ9PNDNNy9TadMuzRV_UsPUoWKntt8
P: MIAMI (305) 264 3417 390 NW 86th Ct #8 33126
```

### A-intranet
```
BG(.fl-row-content-wrap): UP/2020/12/portrait.jpg
IMG: UP/2020/12/Recurso-1-300x123.png alt="Ingreso" 
FORM action=SITE/wp-login.php: input[type=hidden,name=pp-lf-login-nonce,placeholder=,required=false,aria=] ; input[type=hidden,name=_wp_http_referer,placeholder=,required=false,aria=] ; input[type=hidden,name=redirect_to,placeholder=,required=false,aria=] ; input[type=text,name=log,placeholder=Documento de identificación,required=false,aria=] ; input[type=password,name=pwd,placeholder=Contraseña,required=false,aria=] ; button[type=button,name=,placeholder=,required=undefined,aria=Show password] ; button[type=submit,name=wp-submit,placeholder=,required=undefined,aria=]
   FORMTEXT: Número de identidad Contraseña Ingresar
```

### A-cookies
```
--- header .
# Política de cookies (UE)
P: Esta política de cookies fue actualizada por última vez el 6 mayo, 2024 y se aplica a los ciudadanos y residentes legales permanentes del Espacio Económico Europeo y Suiza.
## 1. Introducción
P: Nuestra web, SITE (en adelante: «la web») utiliza cookies y otras tecnologías relacionadas (para mayor comodidad, todas las tecnologías se denominan «cookies»). Las cookies también son colocadas por terceros a los que hemos contratado. En el siguiente documento te informamos sobre el uso de cookies en nuestra web.
   link: [SITE] -> SITE/
## 2. ¿Qué son las cookies?
P: Una cookie es un pequeño archivo que se envía junto con las páginas de esta web y que tu navegador almacena en el disco duro de su ordenador u otro dispositivo. La información almacenada puede ser devuelta a nuestros servidores o a los servidores de terceros apropiados durante una visita posterior.
## 3. ¿Qué son los scripts?
P: Un script es un fragmento de código de programa que se utiliza para hacer que nuestra web funcione correctamente y de forma interactiva. Este código se ejecuta en nuestro servidor o en tu dispositivo.
## 4. ¿Qué es una baliza web?
P: Una baliza web (o una etiqueta de píxel) es una pequeña e invisible pieza de texto o imagen en una web que se utiliza para monitorear el tráfico en una web. Para ello, se almacenan varios datos sobre usted mediante estas balizas web.
## 5. Cookies
P: 5.1 Cookies técnicas o funcionales
P: Algunas cookies aseguran que ciertas partes de la web funcionen correctamente y que tus preferencias de usuario sigan recordándose. Al colocar cookies funcionales, te facilitamos la visita a nuestra web. De esta manera, no necesitas introducir repetidamente la misma información cuando visitas nuestra web y, por ejemplo, los artículos permanecen en tu cesta de la compra hasta que hayas pagado. Podemos colocar estas cookies sin tu consentimiento.
P: 5.2 Cookies de estadísticas
P: Utilizamos cookies estadísticas para optimizar la experiencia de la web para nuestros usuarios. Con estas cookies estadísticas obtenemos información sobre el uso de nuestra web. Te pedimos tu permiso para colocar cookies de estadísticas.
P: 5.3 Cookies de marketing/seguimiento
P: Las cookies de marketing/seguimiento son cookies, o cualquier otra forma de almacenamiento local, usadas para crear perfiles de usuario para mostrar publicidad o para hacer el seguimiento del usuario en esta web o en varias webs con fines de marketing similares.
P: 5.4 Redes sociales
P: En nuestra web hemos incluido contenido para promover páginas web (p.ej.: «Me gusta», «Pinear») o compartir (p.ej.: «tuitear») en redes sociales. Este contenido está incrustado con código derivado de terceros y guarda cookies. Este contenido podría procesar cierta información para anuncios personalizados.
P: Por favor lea la política de privacidad de estas redes sociales (que puede cambiar frecuentemente) para saber que hacen con sus datos (personales) que procesan usando estas cookies. Los datos que reciben son anonimizados lo máximo posible.
## 6. Cookies usadas
### WordPress
P: Functional
T: Consent to service wordpress
#### Uso
P: Usamos WordPress para website development. Leer más acerca de WordPress
   link: [Leer más acerca de WordPress] -> https://cookiedatabase.org/service/wordpress/
#### Compartir datos
P: Estos datos no se comparten con terceros.
#### Functional
##### Nombre
A: [wpEmojiSettingsSupports] -> https://cookiedatabase.org/cookie/wordpress/wpemojisettingssupports/
##### Caducidad
T: session
##### Función
T: Store browser details
##### Nombre
A: [wordpress_test_cookie] -> https://cookiedatabase.org/cookie/wordpress/wordpress_test_cookie/
##### Caducidad
##### Función
T: Read if cookies can be placed
##### Nombre
A: [wp-settings-*] -> https://cookiedatabase.org/cookie/wordpress/wp-settings/
##### Caducidad
T: persistent
##### Función
T: Store user preferences
##### Nombre
A: [wp-settings-time-*] -> https://cookiedatabase.org/cookie/wordpress/wp-settings-time/
##### Caducidad
T: 1 year
##### Función
##### Nombre
A: [wordpress_logged_in_*] -> https://cookiedatabase.org/cookie/wordpress/wordpress_logged_in_/
##### Caducidad
##### Función
T: Store logged in users
##### Nombre
A: [wp_lang] -> https://cookiedatabase.org/cookie/wordpress/wp_lang/
##### Caducidad
##### Función
T: Store language settings
### Google Fonts
P: Marketing
T: Consent to service google-fonts
#### Uso
P: Usamos Google Fonts para display of webfonts. Leer más acerca de Google Fonts
   link: [Leer más acerca de Google Fonts] -> https://cookiedatabase.org/service/google-fonts/
#### Compartir datos
P: Para más información, por favor, lee la política de privacidad de Google Fonts.
   link: [política de privacidad de Google Fonts] -> https://policies.google.com/privacy
#### Marketing
##### Nombre
A: [Google Fonts API] -> https://cookiedatabase.org/cookie/google-fonts/tcb_google_fonts/
##### Caducidad
T: expires immediately
##### Función
T: Read user IP address
### Complianz
T: Consent to service complianz
#### Uso
#### Compartir datos
P: Estos datos no se comparten con terceros. Para más información, por favor, lee la política de privacidad de Complianz.
   link: [política de privacidad de Complianz] -> https://complianz.io/legal/privacy-statement/
#### Functional
##### Nombre
A: [cmplz_functional] -> https://cookiedatabase.org/cookie/unknown-service/cmplz_functional/
##### Caducidad
T: 365 días
##### Función
T: Store cookie consent preferences
##### Nombre
A: [cmplz_statistics] -> https://cookiedatabase.org/cookie/unknown-service/cmplz_statistics/
##### Caducidad
##### Función
##### Nombre
A: [cmplz_preferences] -> https://cookiedatabase.org/cookie/unknown-service/cmplz_preferences/
##### Caducidad
##### Función
##### Nombre
A: [cmplz_marketing] -> https://cookiedatabase.org/cookie/unknown-service/cmplz_marketing/
##### Caducidad
##### Función
### Varios
P: Propósito pendiente de investigación
T: Consent to service varios
#### Uso
#### Compartir datos
P: El intercambio de datos está pendiente de investigación
#### Propósito pendiente de investigación
##### Nombre
T: nethgui
##### Caducidad
##### Función
##### Nombre
T: wfwaf-authcookie-b3b8d81904754aa69b82924e2084d8dd
##### Caducidad
##### Función
##### Nombre
T: cmplz_banner-status
##### Caducidad
##### Función
##### Nombre
T: wc_cart_hash_5dd2b05626fcd8ca44ba546e2e87509a
##### Caducidad
##### Función
##### Nombre
T: wc_fragments_5dd2b05626fcd8ca44ba546e2e87509a
##### Caducidad
##### Función
##### Nombre
T: cmplz_consented_services
##### Caducidad
##### Función
##### Nombre
T: cmplz_policy_id
##### Caducidad
##### Función
##### Nombre
T: fl-builder-settings-tab
##### Caducidad
##### Función
##### Nombre
T: _ga
##### Caducidad
##### Función
##### Nombre
T: PHPSESSID
##### Caducidad
##### Función
##### Nombre
T: loginInfo
##### Caducidad
##### Función
##### Nombre
T: wfwaf-authcookie-08a257c26eb4b2cab9232dcdec2a21d9
##### Caducidad
##### Función
##### Nombre
T: WP_PREFERENCES_USER_4
##### Caducidad
##### Función
##### Nombre
T: index.php/promos-gifts-en-stock:outline
##### Caducidad
##### Función
##### Nombre
T: fl-builder-settings-sections
##### Caducidad
##### Función
##### Nombre
T: WP_PREFERENCES_USER_3
##### Caducidad
##### Función
##### Nombre
T: WP_DATA_USER_3
##### Caducidad
##### Función
##### Nombre
T: fl-cache-updater-a9d1cbf71942327e98b40cf5ef38a960
##### Caducidad
##### Función
##### Nombre
T: fl-assistant/system
##### Caducidad
##### Función
## 7. Consentimiento
P: Cuando visites nuestra web por primera vez, te mostraremos una ventana emergente con una explicación sobre las cookies. Tan pronto como hagas clic en «Aceptar», aceptas que usemos todas las cookies y plugins tal como se describe en la ventana emergente y en esta política de cookies. Puedes desactivar el uso de cookies a través de tu navegador, pero, por favor, ten en cuenta que nuestra web puede dejar de funcionar correctamente.
P: 7.1 Gestiona tus ajustes de consentimiento
T: Has cargado la política de cookies sin compatibilidad con JavaScript. En AMP, puedes utilizar el botón de gestionar el consentimiento en la parte inferior de la página.
T: Funcional
T: Siempre activo
T: El almacenamiento o acceso técnico es estrictamente necesario para el propósito legítimo de permitir el uso de un servicio específico explícitamente solicitado por el abonado o usuario, o con el único propósito de llevar a cabo la transmisión de una comunicación a través de una red de comunicaciones electrónicas.
T: Preferencias
T: El almacenamiento o acceso técnico es necesario para la finalidad legítima de almacenar preferencias no solicitadas por el abonado o usuario.
T: Estadísticas
T: El almacenamiento o acceso técnico que es utilizado exclusivamente con fines estadísticos.
T: El almacenamiento o acceso técnico que se utiliza exclusivamente con fines estadísticos anónimos. Sin un requerimiento, el cumplimiento voluntario por parte de tu proveedor de servicios de Internet, o los registros adicionales de un tercero, la información almacenada o recuperada sólo para este propósito no se puede utilizar para identificarte.
T: Marketing
T: El almacenamiento o acceso técnico es necesario para crear perfiles de usuario para enviar publicidad, o para rastrear al usuario en una web o en varias web con fines de marketing similares.
## 8. Activación/desactivación y borrado de cookies
P: Puedes utilizar tu navegador de Internet para eliminar las cookies de forma automática o manual. También puedes especificar que ciertas cookies no pueden ser colocadas. Otra opción es cambiar los ajustes de tu navegador de Internet para que recibas un mensaje cada vez que se coloca una cookie. Para obtener más información sobre estas opciones, consulta las instrucciones de la sección «Ayuda» de tu navegador.
P: Ten en cuenta que nuestra web puede no funcionar correctamente si todas las cookies están desactivadas. Si borras las cookies de tu navegador, se volverán a colocar después de tu consentimiento cuando vuelvas a visitar nuestras webs.
## 9. Tus derechos con respecto a los datos personales
P: Tienes los siguientes derechos con respecto a tus datos personales:
LI: Tiene derecho a saber por qué se necesitan tus datos personales, qué sucederá con ellos y durante cuánto tiempo se conservarán.
LI: Derecho de acceso: tienes derecho a acceder a tus datos personales que conocemos.
LI: Derecho de rectificación: tienes derecho a completar, rectificar, borrar o bloquear tus datos personales cuando lo desees.
LI: Si nos das tu consentimiento para procesar tus datos, tienes derecho a revocar dicho consentimiento y a que se eliminen tus datos personales.
LI: Derecho de cesión de tus datos: tienes derecho a solicitar todos tus datos personales al responsable del tratamiento y a transferirlos íntegramente a otro responsable del tratamiento.
LI: Derecho de oposición: puedes oponerte al tratamiento de tus datos. Nosotros cumplimos con esto, a menos que existan motivos justificados para el procesamiento.
P: Para ejercer estos derechos, por favor, contacta con nosotros. Por favor, consulta los detalles de contacto en la parte inferior de esta política de cookies. Si tienes alguna queja sobre cómo gestionamos tus datos, nos gustaría que nos la hicieras saber, pero también tienes derecho a enviar una queja a la autoridad supervisora (la autoridad de protección de datos).
## 10. Datos de contacto
P: Para preguntas y/o comentarios sobre nuestra política de cookies y esta declaración, por favor, contacta con nosotros usando los siguientes datos de contacto:
P: IMAGENES GRAFICAS BIC S.A.S CALLE 24 # 4 -31 caLI Colombia Web: SITE Correo electrónico: sistemas@ex.comwww.imagenesgraficas.com Número de teléfono: 441 6153
P: Esta política de cookies se ha sincronizado con cookiedatabase.org el 20 julio, 2024.
   link: [cookiedatabase.org] -> https://cookiedatabase.org/
--- footer .
T: Copyright 2019 © | Todos los derechos reservados
A: [Scroll To Top] -> SITE/index.php/politica-de-cookies-ue/#
```

### A-post-texto-prueba
```
IMG: UP/2020/08/btl-3.jpg alt="" 
--- header .
# El BTL en los mercados publicitarios actuales
P: Below the line para los académicos y puristas publicitarios, es la manera de dinamizar los atributos de la marca en una relación de cercanía con las personas de su público objetivo; aquí las marcas cobran vida y comparten vivencias con las personas. Este proceso mantiene activa la marca en la mente de los asistentes por medio de distintas acciones para que éstos, a su vez, la difundan voluntariamente ya sea por “voz a oído” o en sus redes sociales. Siendo este su principal objetivo. Entre las estrategias de BTL mas comunes y eficaces se encuentran la contratación de impulsadores en los supermercados, el mercadeo directo y productos de merchandising.
P: En Colombia este tipo de estrategias han venido creciendo a un ritmo de 6% promedio a tal punto que según el estudio piloto de Asomedios hoy es el medio de mayor inversión publicitaria con un billón doscientos noventa y cuatro mil millones. Esta por encima de la televisión, radio y demás medios tradicionales. Con cifras de los miembros de la Asociación de BTL que señalan que al año mas de 1500 personas directamente y mas de 11.000 indirectos. Su participación dentro de la torta del BTL es del 40% lo cual es sin duda una agremiación representativa del BTL en nuestro país. De igual manera el BTL es hoy líder en la región latinoamericana no solamente en premios sino en exportación de estrategias y colonización.
P: En los últimos años en Colombia, el BTL ha logrado ocupar el primer lugar en cuanto a inversión publicitaria alcanzando los $1.29 billones de pesos. Esto representa también un crecimiento económico en las empresas que buscan una buena promoción de su marca y sus productos, mientras entregan experiencias que permiten generar mayor recordación entre sus audiencias.
P: Y es que acorde con la revista P&M, la inversión publicitaria en el país en cuanto a publicidad exterior pasó de $181.973 millones en 2017 a $184.168 millones en 2018.
IMG: UP/2022/02/IMG_653611-1-1024x768.jpg alt="" 
T: Publicado en ,
A: [Artículos] -> SITE/index.php/category/noticias/articulos/
A: [Noticias] -> SITE/index.php/category/noticias/
### Deja un comentario
FORM action=SITE/wp-comments-post.php: textarea[type=textarea,name=comment,placeholder=,required=false,aria=] ; input[type=text,name=author,placeholder=,required=false,aria=] ; input[type=text,name=email,placeholder=,required=false,aria=] ; input[type=text,name=url,placeholder=,required=false,aria=] ; input[type=checkbox,name=wp-comment-cookies-consent,placeholder=,required=false,aria=] ; input[type=submit,name=submit,placeholder=,required=false,aria=] ; input[type=hidden,name=comment_post_ID,placeholder=,required=false,aria=] ; input[type=hidden,name=comment_parent,placeholder=,required=false,aria=]
   FORMTEXT: Comentar Nombre (obligatorio) Email (no será publicado) (obligatorio) Sitio Web Guarda mi nombre, correo electrónico y web en este navegador para la próxima vez que comente.
FORM action=SITE/: input[type=search,name=s,placeholder=Buscar,required=false,aria=Search]
   FORMTEXT: 
#### Entradas recientes
LI: El BTL en los mercados publicitarios actuales
   href: SITE/index.php/texto-prueba-noticia/
LI: Stands y ferias: un negocio en potencia
   href: SITE/index.php/stands-y-ferias-un-negocio-en-potencia/
LI: El lenguaje del marketing
   href: SITE/index.php/el-lenguaje-del-marketing/
LI: Packaging: la cara vendedora del producto
   href: SITE/index.php/packaging-y-producto/
#### Categorías
LI: Artículos
   href: SITE/index.php/category/noticias/articulos/
LI: Noticias
   href: SITE/index.php/category/noticias/
--- footer .
T: Copyright 2019 © | Todos los derechos reservados
T: Gestionar consentimiento
A: [Scroll To Top] -> SITE/index.php/texto-prueba-noticia/#
```

### A-post-stands
```
IMG: UP/2019/08/entrada3.jpg alt="" 
--- header .
# Stands y ferias: un negocio en potencia
P: El sector del marketing ferial está en boom, no solo en Colombia, si no en el mundo entero. ¿Cuál es su potencial como negocio?
P: ¿Te has preguntado qué piensan tus colaboradores sobre los productos que vendes o el último slogan corporativo? ¿Sabes si están satisfechos con su trabajo y la compañía que representan? ¿Crees que entienden las ventajas del nuevo software que implementó la empresa? Todas estas respuestas encuentran un espacio muy importante en el endomarketing, una forma de hacer mercadeo en donde tus clientes son tus colaboradores.
P: El significado de este término surge al conocer su composición: el prefijo endo, que proviene del griego y significa “dentro” y la palabra marketing. Cuando se hace endomarketing, se está vendiendo una idea, una filosofía, un cambio al interior de la empresa. La importancia que ha cobrado la experiencia de los clientes (Customer Experience) y su fascinación por escuchar historias (storytelling) en vez de simples argumentos de venta, junto con todos los estudios que correlacionan la motivación de los empleados y la sinergía como impulsores de las organizaciones desde el interior, han hecho que el endomarketing haya pasado de ser una simple moda a una constante de las compañías más innovadoras. En la actualidad, hay que transformarse constantemente para sobrevivir, y ese proceso de renovación constante requiere que las ideas se vendan con éxito en la mente y el corazón de cada uno de los miembros de la organización.
P: Resulta increíble y a la vez lamentable, que una idea magnífica o un proyecto genial no lleguen a cobrar vida e impacten positivamente a los clientes, y se queden en medio de las barreras dentro de la propia organización. El hecho es que son muchas ideas que fracasan sin siquiera haber salido de la caja, quizás sólo por no haber empoderado a algunos colegas en la empresa. No podría ser más actual la famosa frase de Benjamin Franklin: “Dime y lo olvidaré. Enséñame y lo recordaré. Involúcrame y lo aprenderé.”
P: Por supuesto, el propio departamento de mercadeo también puede beneficiarse y mucho con las estrategias de endomarketing. Ya sea el lanzamiento de una nueva línea de negocio, una nueva campaña publicitaria, una evolución de la imagen corporativa, o el proyecto de transformación que se desee emprender, es necesario empoderar a toda la compañía en paralelo a lo que se quiere proyectar hacia afuera. De esta manera, todos los departamentos podrán trabajar de manera sinérgica, alineados para lograr un objetivo global.
T: Publicado en
A: [Noticias] -> SITE/index.php/category/noticias/
### Deja un comentario
FORM action=SITE/wp-comments-post.php: textarea[type=textarea,name=comment,placeholder=,required=false,aria=] ; input[type=text,name=author,placeholder=,required=false,aria=] ; input[type=text,name=email,placeholder=,required=false,aria=] ; input[type=text,name=url,placeholder=,required=false,aria=] ; input[type=checkbox,name=wp-comment-cookies-consent,placeholder=,required=false,aria=] ; input[type=submit,name=submit,placeholder=,required=false,aria=] ; input[type=hidden,name=comment_post_ID,placeholder=,required=false,aria=] ; input[type=hidden,name=comment_parent,placeholder=,required=false,aria=]
   FORMTEXT: Comentar Nombre (obligatorio) Email (no será publicado) (obligatorio) Sitio Web Guarda mi nombre, correo electrónico y web en este navegador para la próxima vez que comente.
FORM action=SITE/: input[type=search,name=s,placeholder=Buscar,required=false,aria=Search]
   FORMTEXT: 
#### Entradas recientes
LI: El BTL en los mercados publicitarios actuales
   href: SITE/index.php/texto-prueba-noticia/
LI: Stands y ferias: un negocio en potencia
   href: SITE/index.php/stands-y-ferias-un-negocio-en-potencia/
LI: El lenguaje del marketing
   href: SITE/index.php/el-lenguaje-del-marketing/
LI: Packaging: la cara vendedora del producto
   href: SITE/index.php/packaging-y-producto/
#### Categorías
LI: Artículos
   href: SITE/index.php/category/noticias/articulos/
LI: Noticias
   href: SITE/index.php/category/noticias/
--- footer .
T: Copyright 2019 © | Todos los derechos reservados
T: Gestionar consentimiento
A: [Scroll To Top] -> SITE/index.php/stands-y-ferias-un-negocio-en-potencia/#
```

### A-post-lenguaje
```
IMG: UP/2019/08/entrada-2.jpg alt="" 
--- header .
# El lenguaje del marketing
P: La comunicación y persuasión detrás de los negocios: el endomarketing es el arte y la ciencia del análisis focalizado en un público objetivo.
P: El marketing debe poder hablar varios lenguajes, dependiendo de la ubicación y el perfil de su público objetivo. No podemos hablarle igual al target de nuestro producto o servicio cuando va en el carro escuchando su emisora favorita, que cuando va a la tienda de la esquina esa misma noche a buscar algo para el desayuno del día siguiente. En el primer caso hablamos al consumidor, pero en el segundo caso conversamos con un comprador, y claramente no los podemos abordar igual desde la estrategia de comunicación.
P: Según el estudio Homescan Canasta Nielsen y datos del Path To Purchase Institute, alrededor del 70% de las decisiones de compra se toman en el punto de venta. Es decir, no importa que hayamos realizado inversiones monumentales en el comercial de TV y en el plan de marketing online, pero si no contamos con una presencia sólida en esos puntos en donde el comprador puede adquirir nuestro producto, todo ese esfuerzo económico se puede derribar en el acertadamente llamado “Momento de la Verdad” (ó MOT, por sus siglas en inglés) simplemente porque el packaging de nuestra competencia es más bonito, por ejemplo. Ya lo dice en términos muy sencillos Fernando Anzures, experto mexicano en Shopper Marketing y ex Director de Coca-Cola Company en Colombia: “En el PDV, lo que no se ve, no se vende”.
P: Es por este motivo que desde hace algunos años las empresas han volcado su interés hacia la publicidad diseñada para el punto de venta y el cómo hacer más visibles sus marcas. En esta nueva era del marketing, la atención es la nueva moneda, y en el punto de venta (el centro comercial, el supermercado, la panadería, etc.) esta afirmación cobra más sentido que nunca. Cientos de formas, piezas, avisos, colores, logos y productos forman un cocktail de estímulos sensoriales en donde sobreviven solo unas pocas marcas que destacan por su creatividad al saber captar la atención de esa pareja de millenials recién casados, que acaban de entrar para hacer la compra del mes. Afortunadamente, en este recorrido son varios los puntos y diversas las opciones para seducir al shopper con mensajes que deben ser cortos, directos y que inviten a la compra (call to action). El abanico de posibilidades va desde exhibidores atractivos, pasando por los famosos y efectivos rompetráficos, hasta piezas de alto impacto en las cajas registradoras, un punto caliente y de paso obligado para el comprador.
   link: [cómo hacer más visibles sus marcas] -> SITE/
   link: [cajas registradoras] -> SITE/
P: Las grandes batallas del mercadeo se juegan en el lineal de las categorías, más en un país en el que se lanzan en promedio 33 productos cada día (Kantar Worldpanel, 2014). Directores de marketing, gerentes de marca, no descuiden sus estrategias de P.O.P., nunca estarán más cerca de activar el botón de compra de sus consumidores.
T: Publicado en
A: [Noticias] -> SITE/index.php/category/noticias/
### Deja un comentario
FORM action=SITE/wp-comments-post.php: textarea[type=textarea,name=comment,placeholder=,required=false,aria=] ; input[type=text,name=author,placeholder=,required=false,aria=] ; input[type=text,name=email,placeholder=,required=false,aria=] ; input[type=text,name=url,placeholder=,required=false,aria=] ; input[type=checkbox,name=wp-comment-cookies-consent,placeholder=,required=false,aria=] ; input[type=submit,name=submit,placeholder=,required=false,aria=] ; input[type=hidden,name=comment_post_ID,placeholder=,required=false,aria=] ; input[type=hidden,name=comment_parent,placeholder=,required=false,aria=]
   FORMTEXT: Comentar Nombre (obligatorio) Email (no será publicado) (obligatorio) Sitio Web Guarda mi nombre, correo electrónico y web en este navegador para la próxima vez que comente.
FORM action=SITE/: input[type=search,name=s,placeholder=Buscar,required=false,aria=Search]
   FORMTEXT: 
#### Entradas recientes
LI: El BTL en los mercados publicitarios actuales
   href: SITE/index.php/texto-prueba-noticia/
LI: Stands y ferias: un negocio en potencia
   href: SITE/index.php/stands-y-ferias-un-negocio-en-potencia/
LI: El lenguaje del marketing
   href: SITE/index.php/el-lenguaje-del-marketing/
LI: Packaging: la cara vendedora del producto
   href: SITE/index.php/packaging-y-producto/
#### Categorías
LI: Artículos
   href: SITE/index.php/category/noticias/articulos/
LI: Noticias
   href: SITE/index.php/category/noticias/
--- footer .
T: Copyright 2019 © | Todos los derechos reservados
T: Gestionar consentimiento
A: [Scroll To Top] -> SITE/index.php/el-lenguaje-del-marketing/#
```

### A-post-packaging
```
IMG: UP/2019/08/entrada2.jpg alt="" 
--- header .
# Packaging: la cara vendedora del producto
P: Según el portal thepaperworker.com, una tercera parte de las decisiones de compra se toman con base en el packaging del producto.
T: Publicado en
A: [Noticias] -> SITE/index.php/category/noticias/
FORM action=SITE/: input[type=search,name=s,placeholder=Buscar,required=false,aria=Search]
   FORMTEXT: 
#### Entradas recientes
LI: El BTL en los mercados publicitarios actuales
   href: SITE/index.php/texto-prueba-noticia/
LI: Stands y ferias: un negocio en potencia
   href: SITE/index.php/stands-y-ferias-un-negocio-en-potencia/
LI: El lenguaje del marketing
   href: SITE/index.php/el-lenguaje-del-marketing/
LI: Packaging: la cara vendedora del producto
   href: SITE/index.php/packaging-y-producto/
#### Categorías
LI: Artículos
   href: SITE/index.php/category/noticias/articulos/
LI: Noticias
   href: SITE/index.php/category/noticias/
--- footer .
T: Copyright 2019 © | Todos los derechos reservados
T: Gestionar consentimiento
A: [Scroll To Top] -> SITE/index.php/packaging-y-producto/#
```

## Apéndice B) Banco de imágenes completo

| URL | Página(s) | Qué muestra (alt/contexto) | Utilidad |
|---|---|---|---|
| UP/2020/08/slider-movil.png | Home | Fondo CSS/imagen sin alt: slider-movil.png | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/06/slider.jpg | Home | Fondo CSS/imagen sin alt: slider.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/01/imagenes-graficas-fondo-verde.jpg | Home | Fondo CSS/imagen sin alt: imagenes-graficas-fondo-verde.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/01/ambiente-297x300.png | Home | ambiente | Media-alta (foto de proyecto/producto) |
| UP/2020/08/slider-4-movil.jpg | Home | Fondo CSS/imagen sin alt: slider-4-movil.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/banner-casos-de-exito.jpg | Home | Fondo CSS/imagen sin alt: banner-casos-de-exito.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2019/06/imagenes_graficas_comilla-abrir.png | Home | imagenes_graficas_comilla-abrir | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/mano-768x139.png | Home | mano | Media-alta (foto de proyecto/producto) |
| UP/2019/06/imagenes_graficas_comilla-cerrar-.png | Home | imagenes_graficas_comilla-cerrar- | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/mapa-cobertura.jpg | Home | Fondo CSS/imagen sin alt: mapa-cobertura.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/360-768x643.png | Home | 360 | Media-alta (foto de proyecto/producto) |
| UP/bb-plugin/cache/btl-3-landscape-be95a581abfc7ba88e146547a97a40c0-.jpg | Blog, Home | Prueba2 | Media-alta (foto de proyecto/producto) |
| UP/bb-plugin/cache/entrada3-landscape-0ee3fec7f0435295c47c1b254ba6b6e9-.jpg | Blog, Home | entrada3 | Media-alta (foto de proyecto/producto) |
| UP/bb-plugin/cache/entrada-2-landscape-b4c8a4a4747ecb5a434ab0038d59eaf6-.jpg | Blog, Home | entrada | Media-alta (foto de proyecto/producto) |
| UP/2019/08/imagenes-graficasRecurso-2comillas.png | Home | imagenes-graficasRecurso 2comillas | Baja (icono/decorativo; rehacer en vector) |
| UP/2019/08/imagenes-graficasRecurso-3comillas.png | Home | imagenes-graficasRecurso 3comillas | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/03/logo-fundacion-valle-del-lili.jpg | Home | logo-fundacion-valle-del--lili | Baja (icono/decorativo; rehacer en vector) |
| UP/2024/01/futupro.jpg | Home | futupro | Media-alta (foto de proyecto/producto) |
| UP/2019/06/imagenes_graficas_postobon.jpg | Home | imagenes_graficas_postobon | Media-alta (foto de proyecto/producto) |
| UP/2019/06/imagenes_graficas_coomeva.jpg | Home | imagenes_graficas_coomeva | Media-alta (foto de proyecto/producto) |
| UP/2020/06/fabrica.jpg | Nosotros | fabrica | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Nosotros-icon.png | Nosotros | Nosotros-icon | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon2.png | Nosotros | Nosotros-icon2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon3.png | Nosotros | Nosotros-icon3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon4.png | Nosotros | Nosotros-icon4 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon7.jpg | Nosotros | Nosotros-icon7 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon6.jpg | Nosotros | Nosotros-icon6 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon5.jpg | Nosotros | Nosotros-icon5 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon9.jpg | Nosotros | Nosotros-icon9 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/03/abajo.png | Nosotros | abajo | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon10.jpg | Nosotros | Nosotros-icon10 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon11.jpg | Nosotros | Nosotros-icon11 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon6.png | Nosotros | Nosotros-icon6 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon7.png | Nosotros | Nosotros-icon7 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon8.png | Nosotros | Nosotros-icon8 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon9.png | Nosotros | Nosotros-icon9 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon10.png | Nosotros | Nosotros-icon10 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon11.png | Nosotros | Nosotros-icon11 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon12.png | Nosotros | Nosotros-icon12 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon13.png | Nosotros | Nosotros-icon13 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon14.png | Nosotros | Nosotros-icon14 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Nosotros-icon15.png | Nosotros | Nosotros-icon15 | Baja (icono/decorativo; rehacer en vector) |
| UP/2019/08/agencia-imagenes-graficas.jpg | Nosotros | agencia-imagenes-graficas | Media-alta (foto de proyecto/producto) |
| UP/2020/03/servicio-1.png | Nosotros | servicio-1 | Media-alta (foto de proyecto/producto) |
| UP/2020/03/servicio-2.png | Nosotros | servicio-2 | Media-alta (foto de proyecto/producto) |
| UP/2020/03/servicio-3.png | Nosotros | servicio-3 | Media-alta (foto de proyecto/producto) |
| UP/2020/03/servicio-4.png | Nosotros | servicio-4 | Media-alta (foto de proyecto/producto) |
| UP/2020/03/abajo-m.png | Nosotros | abajo-m | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/7bureau.png | Nosotros | 7bureau | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Sedex-member.png | Nosotros | Sedex-member | Media-alta (foto de proyecto/producto) |
| UP/2020/06/ink.jpg | Nosotros | ink | Media-alta (foto de proyecto/producto) |
| UP/2020/06/ig1-300x300-1.gif | Nosotros | Fondo CSS/imagen sin alt: ig1-300x300-1.gif | Media-alta (foto de proyecto/producto) |
| UP/2020/06/ig3-300x300.gif | Nosotros | Fondo CSS/imagen sin alt: ig3-300x300.gif | Media-alta (foto de proyecto/producto) |
| UP/2020/06/ig4-300x300.gif | Nosotros | Fondo CSS/imagen sin alt: ig4-300x300.gif | Media-alta (foto de proyecto/producto) |
| UP/2020/06/ig5-300x300.gif | Nosotros | Fondo CSS/imagen sin alt: ig5-300x300.gif | Media-alta (foto de proyecto/producto) |
| UP/2020/06/ig6-300x300.gif | Nosotros | Fondo CSS/imagen sin alt: ig6-300x300.gif | Media-alta (foto de proyecto/producto) |
| UP/2020/06/ig2-300x300.gif | Nosotros | Fondo CSS/imagen sin alt: ig2-300x300.gif | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Agencia-Creativa-slider.jpg | Agencia Creativa | Fondo CSS/imagen sin alt: Agencia-Creativa-slider.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/agencia-creativa-banner-movil.jpg | Agencia Creativa | Fondo CSS/imagen sin alt: agencia-creativa-banner-movil.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-icon.jpg | Agencia Creativa | agencia-creativa-icon | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Soluciones-Impresas-linea-1.jpg | Agencia BTL, Agencia Creativa, Promos + Gifts a la Medida, Soluciones Impresas, Visibilidad de Marca | Soluciones-Impresas-linea | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon2.jpg | Agencia Creativa | agencia-creativa-icon2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Soluciones-Impresas-linea2.jpg | Agencia BTL, Agencia Creativa, Promos + Gifts a la Medida, Soluciones Impresas, Visibilidad de Marca | Soluciones-Impresas-linea2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon3.jpg | Agencia Creativa | agencia-creativa-icon3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Soluciones-Impresas-linea-3-1.jpg | Agencia BTL, Agencia Creativa, Promos + Gifts a la Medida, Soluciones Impresas, Visibilidad de Marca | Soluciones-Impresas-linea-3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-banner.jpg | Agencia Creativa | Fondo CSS/imagen sin alt: agencia-creativa-banner.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/06/comillas-gris.png | Agencia BTL, Agencia Creativa, Promos + Gifts Importados, Promos + Gifts a la Medida, Promos + Gifts en Stock, Soluciones Impresas | comillas-gris | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/comillas-gris2.png | Agencia BTL, Agencia Creativa, Promos + Gifts Importados, Promos + Gifts a la Medida, Promos + Gifts en Stock, Soluciones Impresas | comillas-gris2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon4-768x198.jpg | Agencia Creativa | agencia-creativa-icon4 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon6-768x198.jpg | Agencia Creativa | agencia-creativa-icon6 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon5-768x198.jpg | Agencia Creativa | agencia-creativa-icon5 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon7-768x198.jpg | Agencia Creativa | agencia-creativa-icon7 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon8-768x198.jpg | Agencia Creativa | agencia-creativa-icon8 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon9-768x198.jpg | Agencia Creativa | agencia-creativa-icon9 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon10-768x198.jpg | Agencia Creativa | agencia-creativa-icon10 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-banner-1.jpg | Agencia Creativa | Diseño de marca y publicidad | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-2-1.jpg | Agencia Creativa | Marketing digital | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-3.jpg | Agencia Creativa | Experiencia de compra en punto de venta | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-4.jpg | Agencia Creativa | Diseño gráﬁco | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-5.jpg | Agencia Creativa | Diseño industrial y experiencia de compra | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-6.jpg | Agencia Creativa | Prototipado | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-7.jpg | Agencia Creativa | Copywriting y diseño de mensajes | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-9.jpg | Agencia Creativa | Diseño de impresos y empaques | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/Visibilidad-de-Marca-9.jpg | Agencia Creativa, Visibilidad de Marca | Diseño de ambientes y señalización | Media-alta (foto de proyecto/producto) |
| UP/2020/07/agencia-creativa-banner-8.jpg | Agencia Creativa | Ilustración y fotografía | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-10.jpg | Agencia Creativa | Diseño web y desarrollo | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-11.jpg | Agencia Creativa | E commerce y tiendas virtuales | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-12.jpg | Agencia Creativa | Search Engine Optimization (SEO) | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-13.jpg | Agencia Creativa | Estratégias en redes sociales (social media) | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-14.jpg | Agencia Creativa | Email marketing | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-16.jpg | Agencia Creativa | Diseño de aplicaciones - Apps | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-15.jpg | Agencia Creativa | Event marketing | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-banner-17.jpg | Agencia Creativa | Producciones audiovisuales | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/agencia-creativa-icon12.jpg | Agencia Creativa | agencia-creativa-icon12 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/08/Agencia-Creativa-icon-movil.jpg | Agencia Creativa | Agencia-Creativa-icon-movil | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon11.jpg | Agencia Creativa | agencia-creativa-icon11 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/08/Agencia-Creativa-icon-movil-2.jpg | Agencia Creativa | Agencia-Creativa-icon-movil-2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/agencia-creativa-icon13.jpg | Agencia Creativa | agencia-creativa-icon13 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/08/Agencia-Creativa-icon-movil-3.jpg | Agencia Creativa | Agencia-Creativa-icon-movil-3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/diseno-de-exhibidores-conceptualizacion-de-mueble-para-lanzamiento-de-marca-con-lineamientos-del-concepto-del-lanzamiento.jpg | Agencia Creativa | Conceptualización de mueble para lanzamiento de marca con lineamientos del concepto del lanzamiento | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/diseno-exhibidores-conceptualizacion-y-dise%C3%B1o-funcional-de-muebles-en-carton.jpg | Agencia Creativa | Conceptualización y diseño funcional de muebles en cartón | Media-alta (foto de proyecto/producto) |
| UP/2020/07/EXPERIENCIAS-SENSORIALES-Aplicacion-mapping-sobre-cuerpo-para-visualizar-el-efecto-del-medicamento.jpg | Agencia BTL, Agencia Creativa | Aplicación mapping sobre cuerpo para visualizar el efecto del medicamento | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/branding-Aplicacion-de-concepto-de-campana-a-multiples-piezas-como-Display.jpg | Agencia Creativa | Aplicación de concepto de campaña a multiples piezas como Display | Media-alta (foto de proyecto/producto) |
| UP/2020/07/diseno-de-campana-adaptacion-de-key-visual-a-diferentes-piezas-graficas.jpg | Agencia Creativa | Adaptación de key visual a diferentes piezas gráficas | Media-alta (foto de proyecto/producto) |
| UP/2020/07/diseno-de-experiencias-desarrollo-de-juego-conceptual-adaptado-a-la-cultura-organizacional-para-generar-conexion-con-empleados.jpg | Agencia Creativa | Desarrollo de juego conceptual adaptado a la cultura organizacional para generar conexión con empleados | Media-alta (foto de proyecto/producto) |
| UP/2020/07/diseno-material-pop-Dise%C3%B1o-de-chispas-o-saltarines.jpg | Agencia Creativa | Diseño de chispas o saltarines | Media-alta (foto de proyecto/producto) |
| UP/2020/07/diseno-ambiente-comercial-diseno-de-puntos-de-atencion-al-cliente.jpg | Agencia Creativa | Diseño de puntos de atención al cliente | Media-alta (foto de proyecto/producto) |
| UP/2020/07/diseno-de-empaques-desarrollo-de-concepto-y-funcionalidad-de-empaques.jpg | Agencia Creativa | Desarrollo de concepto y funcionalidad de empaques | Media-alta (foto de proyecto/producto) |
| UP/2020/07/diseno-de-impresos-generacion-de-experiencias-de-usuario-a-traves-del-dise%C3%B1o-de-elementos-funcionales-como-cuadernos-personalizados.jpg | Agencia Creativa | Generación de experiencias de usuario a traves del diseño de elementos funcionales como cuadernos personalizados | Media-alta (foto de proyecto/producto) |
| UP/2020/07/diseno-paginas-web-paginas-corporativas.jpg | Agencia Creativa | Páginas corporativas | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-1.jpg | Soluciones Impresas | Fondo CSS/imagen sin alt: Soluciones-Impresas-1.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/Soluciones-Impresas-slider-movil.jpg | Soluciones Impresas | Fondo CSS/imagen sin alt: Soluciones-Impresas-slider-movil.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/06/Soluciones-Impresas-2.jpg | Soluciones Impresas | Soluciones-Impresas-2 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-3.jpg | Soluciones Impresas | Soluciones-Impresas-3 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-4.jpg | Soluciones Impresas | Soluciones-Impresas-4 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-5-1.jpg | Soluciones Impresas | Impresión campañas POP | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-6.jpg | Soluciones Impresas | Comunicación gráﬁca | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-7.jpg | Soluciones Impresas | Impresión editorial | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-8.jpg | Soluciones Impresas | Impresión textil | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-9.jpg | Agencia BTL, Soluciones Impresas | Impresión gran formato | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-10.jpg | Soluciones Impresas | Decoración espacios comerciales | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-11.jpg | Soluciones Impresas | Packaging | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-12.jpg | Soluciones Impresas | Estampación de artículos | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-13.jpg | Soluciones Impresas | Equipos de alta tecnología | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-14.jpg | Soluciones Impresas | Impresión litográfica | Media-alta (foto de proyecto/producto) |
| UP/2020/03/soluciones-graficas.jpg | Soluciones Impresas | Estampados | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-16.jpg | Soluciones Impresas | Impresión a gran formato | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-17.jpg | Soluciones Impresas | Impresión textil a gran escala | Media-alta (foto de proyecto/producto) |
| UP/2020/03/soluciones-graficas-4.jpg | Soluciones Impresas | Impresión digital offset | Media-alta (foto de proyecto/producto) |
| UP/2020/03/soluciones-graficas-5.jpg | Soluciones Impresas | Equipos láser para grabado y corte | Media-alta (foto de proyecto/producto) |
| UP/2020/03/soluciones-graficas-6.jpg | Soluciones Impresas | Impresión y recorte en vinilo | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-19.jpg | Soluciones Impresas | Impresión directa sobre materiales rígidos | Media-alta (foto de proyecto/producto) |
| UP/2020/03/soluciones-graficas-9.jpg | Soluciones Impresas | Impresión 3D | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-20.jpg | Soluciones Impresas | Acabados especiales | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-21.jpg | Soluciones Impresas | Impresión sensitiva | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-22-297x300.jpg | Soluciones Impresas | Soluciones-Impresas-22 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/mas.jpg | Agencia BTL, Soluciones Impresas | mas | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-23-297x300.jpg | Soluciones Impresas | Soluciones-Impresas-23 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Impresas-24-297x300.jpg | Soluciones Impresas | Soluciones-Impresas-24 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/5-3.jpg | Soluciones Impresas | Agenda con tapa y resorte | Media-alta (foto de proyecto/producto) |
| UP/2020/07/12c.jpg | Soluciones Impresas | Plegadizas con ventana | Media-alta (foto de proyecto/producto) |
| UP/2020/07/15-2.jpg | Soluciones Impresas | Set de divertidos stickers | Media-alta (foto de proyecto/producto) |
| UP/2020/07/13-3.jpg | Soluciones Impresas | Carpeta corporativa con bolsillos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/1-3.jpg | Soluciones Impresas | Abanico para ferias impreso a color 2 caras | Media-alta (foto de proyecto/producto) |
| UP/2020/07/3-4.jpg | Soluciones Impresas | Calendario escritorio | Media-alta (foto de proyecto/producto) |
| UP/2020/07/6-4.jpg | Soluciones Impresas | Etiquetas adhesivas | Media-alta (foto de proyecto/producto) |
| UP/2020/07/8A-2.jpg | Soluciones Impresas | Set rompecabezas | Media-alta (foto de proyecto/producto) |
| UP/2020/07/10-3.jpg | Soluciones Impresas | Marca maletas en papel plástico a prueba de agua | Media-alta (foto de proyecto/producto) |
| UP/2020/07/14-2.jpg | Soluciones Impresas | Agenda corporativa con empaque especial | Media-alta (foto de proyecto/producto) |
| UP/2020/07/2-3.jpg | Soluciones Impresas | Bolsas en cambre laminado impresa a full color | Media-alta (foto de proyecto/producto) |
| UP/2020/07/4-3.jpg | Soluciones Impresas | Carta menú durable en plástico con impresión directa | Media-alta (foto de proyecto/producto) |
| UP/2020/07/7A-3.jpg | Soluciones Impresas | Promocionales para la nevera | Media-alta (foto de proyecto/producto) |
| UP/2020/07/9-3.jpg | Soluciones Impresas | Libreta argollada con estampado foil dorado | Media-alta (foto de proyecto/producto) |
| UP/2020/07/11-2.jpg | Soluciones Impresas | Móvil para tiendas y supermercados | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-Banner-05.jpg | Visibilidad de Marca | Fondo CSS/imagen sin alt: Visibilidad-de-Marca-Banner-05.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/Visibilidad-de-Marca-slider-1.jpg | Visibilidad de Marca | Fondo CSS/imagen sin alt: Visibilidad-de-Marca-slider-1.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/Visibilidad-de-Marca-slider2.jpg | Visibilidad de Marca | Fondo CSS/imagen sin alt: Visibilidad-de-Marca-slider2.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/Banners-Visibilidad-movil.jpg | Visibilidad de Marca | Fondo CSS/imagen sin alt: Banners-Visibilidad-movil.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/Banners-Visibilidad-movil-2.jpg | Visibilidad de Marca | Fondo CSS/imagen sin alt: Banners-Visibilidad-movil-2.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/Soluciones-Impresas-slider-movil-2.jpg | Visibilidad de Marca | Fondo CSS/imagen sin alt: Soluciones-Impresas-slider-movil-2.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/Visibilidad-de-Marca-iconos.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-iconos-2.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-iconos-3.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-fondo.jpg | Visibilidad de Marca | Fondo CSS/imagen sin alt: Visibilidad-de-Marca-fondo.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/Visibilidad-de-Marca-fondo-barras.png | Visibilidad de Marca | Visibilidad-de-Marca-fondo-barras | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-fondo-barras-3.png | Visibilidad de Marca | Visibilidad-de-Marca-fondo-barras-3 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-iconos-8.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-8 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-iconos-7.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-7 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-iconos-4.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-4 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-iconos-6.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-6 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-iconos-5.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-5 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-1.jpg | Visibilidad de Marca | Publicidad eco amigable | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-2.jpg | Visibilidad de Marca | Exhibidores para punto de venta In-store branding | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-3.jpg | Visibilidad de Marca | Sistemas portátiles de publicidad | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-4.jpg | Visibilidad de Marca | Publicidad interactiva y digital | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-5.jpg | Visibilidad de Marca | Stands | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-6.jpg | Visibilidad de Marca | Implementación de visibilidad | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-7.jpg | Visibilidad de Marca | Impactraﬁc | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-8.jpg | Visibilidad de Marca | Maquila promocional | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-10.jpg | Visibilidad de Marca | Publicidad exterior OOH | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-11.jpg | Visibilidad de Marca | Decoración vehicular | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-12.jpg | Visibilidad de Marca | Inﬂables | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-14.jpg | Visibilidad de Marca | Producción integrada | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-29.jpg | Visibilidad de Marca | Soluciones sustentables | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-15.jpg | Visibilidad de Marca | Eco cartón | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-16.jpg | Visibilidad de Marca | Gran equipo humano | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-17.jpg | Visibilidad de Marca | Investigación y conocimiento del shopper | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-18.jpg | Visibilidad de Marca | Exhibición canal moderno | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-19.jpg | Visibilidad de Marca | Exhibición canal tradicional y tiendas de barrio | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-20.jpg | Visibilidad de Marca | Combinación de técnicas de impresión | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-21.jpg | Visibilidad de Marca | Impresión 3D gran formato | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-22.jpg | Visibilidad de Marca | Múltimateriales | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-23.jpg | Visibilidad de Marca | Activación e impulso | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-24.jpg | Visibilidad de Marca | Activación de los sentidos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-25.jpg | Visibilidad de Marca | Taller creativo | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-26.jpg | Visibilidad de Marca | Montaje en punto de venta | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-27.jpg | Visibilidad de Marca | Logística | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Visibilidad-de-Marca-iconos-12.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-12 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-linea-2-300x43.jpg | Visibilidad de Marca | Visibilidad-de-Marca-linea-2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-iconos-11.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-11 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-linea-300x43.jpg | Visibilidad de Marca | Visibilidad-de-Marca-linea | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-iconos-10.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-10 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-iconos-9.jpg | Visibilidad de Marca | Visibilidad-de-Marca-iconos-9 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Visibilidad-de-Marca-linea-3-300x43.jpg | Visibilidad de Marca | Visibilidad-de-Marca-linea-3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/2-5.jpg | Visibilidad de Marca | Mueble multimarca con gran capacidad de carga con sistemas de cambio de publicidad | Media-alta (foto de proyecto/producto) |
| UP/2020/07/2A-3.jpg | Visibilidad de Marca | Display exhibición 2 caras | Media-alta (foto de proyecto/producto) |
| UP/2020/07/10-4.jpg | Visibilidad de Marca | Mueble combinación de materiales, Cartón, plástico y metal | Media-alta (foto de proyecto/producto) |
| UP/2020/07/1-6.jpg | Visibilidad de Marca | Bandeja para exhibir producto | Media-alta (foto de proyecto/producto) |
| UP/2020/07/4-6.jpg | Visibilidad de Marca | Counter exhibidor con sistema de seguridad | Media-alta (foto de proyecto/producto) |
| UP/2020/07/6-6.jpg | Visibilidad de Marca | Bandeja para disposición de productos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/9-6.jpg | Visibilidad de Marca | Punta de gondola empotrable con sistema de iluminación Neutrogena | Media-alta (foto de proyecto/producto) |
| UP/2020/07/12-3.jpg | Visibilidad de Marca | Juego ruleta para premios instantáneos en puntos de venta | Media-alta (foto de proyecto/producto) |
| UP/2020/07/3-7.jpg | Visibilidad de Marca | Cinta en rollo sin fin impreso a full color | Media-alta (foto de proyecto/producto) |
| UP/2020/07/5-6.jpg | Visibilidad de Marca | Decoración vehicular con impresión a full color y vinilos de alta calidad | Media-alta (foto de proyecto/producto) |
| UP/2020/07/7-2.png | Visibilidad de Marca | Exhibidor trident para puntos de pago | Media-alta (foto de proyecto/producto) |
| UP/2020/07/11b-1.jpg | Visibilidad de Marca | 11b | Media-alta (foto de proyecto/producto) |
| UP/2020/07/13-4.jpg | Visibilidad de Marca | Empaques para kit de productos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-slider-1.jpg | Agencia BTL | Fondo CSS/imagen sin alt: btl-slider-1.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/btl-slider-movil.jpg | Agencia BTL | Fondo CSS/imagen sin alt: btl-slider-movil.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/btl-icon-2.jpg | Agencia BTL | btl-icon-2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/btl-icon-3.jpg | Agencia BTL | btl-icon-3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/btl-icon-4.jpg | Agencia BTL | btl-icon-4 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/btl-icon-5.jpg | Agencia BTL | btl-icon-5 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/btl-1.jpg | Agencia BTL | Eventos corporativos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-2-1.jpg | Agencia BTL | Marketing BTL | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-3-1.jpg | Agencia BTL | Endomarketing | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-4-1.jpg | Agencia BTL | Experiencias interactivas y sensoriales | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-6-1.jpg | Agencia BTL | Logística y ejecución | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-7.jpg | Agencia BTL | Eventos académicos, congresos, cumbres, foros, meetings y convenciones | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-8.jpg | Agencia BTL | Lanzamiento de nuevos productos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-9.jpg | Agencia BTL | Ferias y exposiciones | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-10.jpg | Agencia BTL | Fiestas corporativas | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-11.jpg | Agencia BTL | Activación de marca | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-12.jpg | Agencia BTL | Street marketing | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-13.jpg | Agencia BTL | Decoración, iluminación y sonido | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-14.jpg | Agencia BTL | Comunicación organizacional | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-15.jpg | Agencia BTL | Shows y artistas | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-16.jpg | Agencia BTL | Logística y protocolo | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-17.jpg | Agencia BTL | Capacitaciones | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-18.jpg | Agencia BTL | Experiencias interactivas y sensoriales | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-19.jpg | Agencia BTL | Catering | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-20.jpg | Agencia BTL | Seguridad | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-21.jpg | Agencia BTL | Escenografía | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-22.jpg | Agencia BTL | Modelos, actores y promotores | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-23.jpg | Agencia BTL | Transporte | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-24.jpg | Agencia BTL | Material publicitario | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-25.jpg | Agencia BTL | Diseño estrategia de campaña | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-26.jpg | Agencia BTL | Experiencias online | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-27.jpg | Agencia BTL | Venta y renta de moviliario para eventos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/btl-icon-6-300x300.jpg | Agencia BTL | btl-icon-6 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/btl-icon-7-300x300.jpg | Agencia BTL | btl-icon-7 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/btl-icon-8-300x300.jpg | Agencia BTL | btl-icon-8 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/btl-icon-9-300x300.jpg | Agencia BTL | btl-icon-9 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/ACTIVACION-DE-MARCA-Toma-de-puntos-de-venta-con-actividades-interactivas-min-2.jpg | Agencia BTL | Toma de puntos de venta con actividades interactiva | Media-alta (foto de proyecto/producto) |
| UP/2020/07/CATERING-Selecci%C3%B3n-de-los-mejores-platos-y-apoyo-de-Chef-reconocidos-min.jpg | Agencia BTL | Selección de los mejores platos y apoyo de Chef reconocidos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/EVENTOS-ACADEMICOS-Presentaci%C3%B3n-de-eventos-en-Bogota-con-iluminaci%C3%B3n-y-multimedia-min.jpg | Agencia BTL | Presentación de eventos en Bogotá con iluminación y multimedia | Media-alta (foto de proyecto/producto) |
| UP/2020/07/MATERIAL-IMPRESO-EVENTOS-Porta-tarjeta-hotel-min-1.jpg | Agencia BTL | Porta tarjeta hotel | Media-alta (foto de proyecto/producto) |
| UP/2020/07/DECORACION-ILUMINACION-Y-SONIDO-Decoracion-salones-lanzamientos-min.jpg | Agencia BTL | Decoración salones lanzamientos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/ENDOMARKETING-Actividades-outdoor-min.jpg | Agencia BTL | Actividades outdoor | Media-alta (foto de proyecto/producto) |
| UP/2020/07/EXPERIENCIAS-INTERACTIVAS-Actividad-experiencial-con-m%C3%BAsica-teatro-y-personajes-especiales-min.jpg | Agencia BTL | Experiencias interactivas Actividad experiencial con música, teatro y personajes especiales | Media-alta (foto de proyecto/producto) |
| UP/2020/07/FERIAS-Y-EXPOSICIONES-Adecuaci%C3%B3n-de-espacios-en-centros-de-convenciones-min-2.jpg | Agencia BTL | Adecuación de espacios en centros de convenciones | Media-alta (foto de proyecto/producto) |
| UP/2020/07/FIESTAS-CORPORATIVAS-Fiestas-tematicas-innolvidables-min.jpg | Agencia BTL | Fiestas temáticas inolvidables | Media-alta (foto de proyecto/producto) |
| UP/2020/07/LANZAMIENTO-DE-NUEVOS-PRODUCTOS-Decoracion-lanzamiento-vehiculos-min.jpg | Agencia BTL | Decoración lanzamiento vehículos | Media-alta (foto de proyecto/producto) |
| UP/2020/06/slider-promos.jpg | Promos + Gifts Importados | Fondo CSS/imagen sin alt: slider-promos.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/06/importados-1.png | Promos + Gifts Importados | importados-1 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/linea-2-300x29.png | Promos + Gifts Importados | linea-2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/importados-2.png | Promos + Gifts Importados | importados-2 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/linea-300x29.png | Promos + Gifts Importados | linea | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/importados-3.png | Promos + Gifts Importados | importados-3 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/importados-4.png | Promos + Gifts Importados | importados-4 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/importados-5.png | Promos + Gifts Importados | importados-5 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/importados-6.png | Promos + Gifts Importados | importados-6 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/linea-3-300x29.png | Promos + Gifts Importados | linea-3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/accesorios.png | Promos + Gifts Importados | accesorios | Media-alta (foto de proyecto/producto) |
| UP/2020/06/viajes.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | viajes | Media-alta (foto de proyecto/producto) |
| UP/2020/06/cristal.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | cristal | Media-alta (foto de proyecto/producto) |
| UP/2020/06/bolsos.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | bolsos | Media-alta (foto de proyecto/producto) |
| UP/2020/06/ceramica.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | ceramica | Media-alta (foto de proyecto/producto) |
| UP/2020/06/ecologicos.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | ecologicos | Media-alta (foto de proyecto/producto) |
| UP/2020/06/escritura.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | escritura | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Gadgets.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | Gadgets | Media-alta (foto de proyecto/producto) |
| UP/2020/06/infantiles.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | infantiles | Media-alta (foto de proyecto/producto) |
| UP/2024/01/lanyard-titulo-2.jpg | Promos + Gifts Importados | lanyard titulo | Media-alta (foto de proyecto/producto) |
| UP/2020/06/hidratacion.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | hidratacion | Media-alta (foto de proyecto/producto) |
| UP/2020/06/regalos.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | regalos | Media-alta (foto de proyecto/producto) |
| UP/2020/06/reloj.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | reloj | Media-alta (foto de proyecto/producto) |
| UP/2020/06/sombrillas.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | sombrillas | Media-alta (foto de proyecto/producto) |
| UP/2020/06/regrego.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | regrego | Media-alta (foto de proyecto/producto) |
| UP/2020/06/textiles.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | textiles | Media-alta (foto de proyecto/producto) |
| UP/2020/06/trofeo.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | trofeo | Media-alta (foto de proyecto/producto) |
| UP/2020/06/musica.jpg | Promos + Gifts Importados, Promos + Gifts en Stock | musica | Media-alta (foto de proyecto/producto) |
| UP/2020/06/cosmeti.jpg | Promos + Gifts Importados, Promos + Gifts a la Medida | cosmeti | Media-alta (foto de proyecto/producto) |
| UP/2020/06/madera.jpg | Promos + Gifts Importados | madera | Media-alta (foto de proyecto/producto) |
| UP/2020/06/hogar.jpg | Promos + Gifts Importados | hogar | Media-alta (foto de proyecto/producto) |
| UP/2020/06/temporales.jpg | Promos + Gifts Importados | temporales | Media-alta (foto de proyecto/producto) |
| UP/2020/06/caja-metal.jpg | Promos + Gifts Importados | caja-metal | Media-alta (foto de proyecto/producto) |
| UP/2020/06/coleccion.jpg | Promos + Gifts Importados | coleccion | Media-alta (foto de proyecto/producto) |
| UP/2020/06/barra.jpg | Promos + Gifts Importados | barra | Media-alta (foto de proyecto/producto) |
| UP/2020/06/licenciados.jpg | Promos + Gifts Importados | licenciados | Media-alta (foto de proyecto/producto) |
| UP/2020/06/inflables.jpg | Promos + Gifts Importados | inflables | Media-alta (foto de proyecto/producto) |
| UP/2020/06/belleza.jpg | Promos + Gifts Importados | belleza | Media-alta (foto de proyecto/producto) |
| UP/2020/06/mascotas.jpg | Promos + Gifts Importados | mascotas | Media-alta (foto de proyecto/producto) |
| UP/2020/07/4-2.jpg | Promos + Gifts Importados | Plegable de gran capacidad | Media-alta (foto de proyecto/producto) |
| UP/2020/07/7B-2.jpg | Promos + Gifts Importados | Mixer especial | Media-alta (foto de proyecto/producto) |
| UP/2020/07/1B-1.jpg | Promos + Gifts Importados | Pinzas para el pelo | Media-alta (foto de proyecto/producto) |
| UP/2020/07/3a-1.jpg | Promos + Gifts Importados | Borradores con formas | Media-alta (foto de proyecto/producto) |
| UP/2020/07/8-2.jpg | Promos + Gifts Importados | Plato marcianos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/9B-1.jpg | Promos + Gifts Importados | LAPICEROS + RESALTADOR | Media-alta (foto de proyecto/producto) |
| UP/2020/07/2-2.jpg | Promos + Gifts Importados | 2 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/5-2.jpg | Promos + Gifts Importados | Balón con impresión a full color | Media-alta (foto de proyecto/producto) |
| UP/2020/07/6A-2.jpg | Promos + Gifts Importados | Kit porta vasos cepillar los dientes | Media-alta (foto de proyecto/producto) |
| UP/2020/07/10-1.jpg | Promos + Gifts Importados | Bolsa en tela no tejida con impresión a full color con fuelle | Media-alta (foto de proyecto/producto) |
| UP/2020/06/catalogo.jpg | Promos + Gifts Importados | catalogo | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/catalogo2.jpg | Promos + Gifts Importados | catalogo2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/catalogo3.jpg | Promos + Gifts Importados | catalogo3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/catalogo4.jpg | Promos + Gifts Importados | catalogo4 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/catalogo5.jpg | Promos + Gifts Importados | catalogo5 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/Promocionales-en-stock-1.jpg | Promos + Gifts en Stock | Fondo CSS/imagen sin alt: Promocionales-en-stock-1.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/Promocionales-en-stock-slider-movil.jpg | Promos + Gifts en Stock | Fondo CSS/imagen sin alt: Promocionales-en-stock-slider-movil.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/Promocionales-en-stock-12.jpg | Promos + Gifts en Stock | Promocionales-en-stock-12 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-en-stock-13.jpg | Promos + Gifts en Stock | Promocionales-en-stock-13 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-en-stock-14.jpg | Promos + Gifts en Stock | Promocionales-en-stock-14 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-en-stock-15.jpg | Promos + Gifts en Stock | Promocionales-en-stock-15 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-en-stock-17.jpg | Promos + Gifts en Stock | Promocionales-en-stock-17 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-en-stock-18.jpg | Promos + Gifts en Stock | Promocionales-en-stock-18 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-en-stock-16.jpg | Promos + Gifts en Stock | Promocionales-en-stock-16 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/magneticos.jpg | Promos + Gifts en Stock | magneticos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/6-1.jpg | Promos + Gifts en Stock | Bolígrafo para médicos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/11.jpg | Promos + Gifts en Stock | Copa de vino | Media-alta (foto de proyecto/producto) |
| UP/2020/07/15-1.jpg | Promos + Gifts en Stock | Gorra Golf | Media-alta (foto de proyecto/producto) |
| UP/2020/07/17B-1.jpg | Promos + Gifts en Stock | Set de Escritorio Office | Media-alta (foto de proyecto/producto) |
| UP/2020/07/29B-1.jpg | Promos + Gifts en Stock | Resaltador de Cera Fiona | Media-alta (foto de proyecto/producto) |
| UP/2020/07/30C.jpg | Promos + Gifts en Stock | Speaker Bluetooth Waterproof | Media-alta (foto de proyecto/producto) |
| UP/2020/07/1.jpg | Promos + Gifts en Stock | Cargador con luz | Media-alta (foto de proyecto/producto) |
| UP/2020/07/3-1.jpg | Promos + Gifts en Stock | Asador | Media-alta (foto de proyecto/producto) |
| UP/2020/07/5.jpg | Promos + Gifts en Stock | Canguro Loop | Media-alta (foto de proyecto/producto) |
| UP/2020/07/8B.jpg | Promos + Gifts en Stock | Botilito Sport Laguna - 800 ml | Media-alta (foto de proyecto/producto) |
| UP/2020/07/10C-1.jpg | Promos + Gifts en Stock | T-shirt Dama | Media-alta (foto de proyecto/producto) |
| UP/2020/07/13.jpg | Promos + Gifts en Stock | Banda Elástica Doble | Media-alta (foto de proyecto/producto) |
| UP/2020/07/22.jpg | Promos + Gifts en Stock | Morral Backpack Plegable Molly | Media-alta (foto de proyecto/producto) |
| UP/2020/07/23B.jpg | Promos + Gifts en Stock | Pastillero Giratorio | Media-alta (foto de proyecto/producto) |
| UP/2020/07/2A.jpg | Promos + Gifts en Stock | Mezclador Plástico Martini | Media-alta (foto de proyecto/producto) |
| UP/2020/07/4B-1.jpg | Promos + Gifts en Stock | Botella Sport 450ml | Media-alta (foto de proyecto/producto) |
| UP/2020/07/7-1.jpg | Promos + Gifts en Stock | Bolsa en Cambrel Arcadia | Media-alta (foto de proyecto/producto) |
| UP/2020/07/9.jpg | Promos + Gifts en Stock | Calculadora Clipboard | Media-alta (foto de proyecto/producto) |
| UP/2020/07/14D.jpg | Promos + Gifts en Stock | Portacomidas con Cubiertos Eco Nature | Media-alta (foto de proyecto/producto) |
| UP/2020/07/19.jpg | Promos + Gifts en Stock | Alcancía Mini Piggy | Media-alta (foto de proyecto/producto) |
| UP/2020/07/21C.jpg | Promos + Gifts en Stock | Llavero Destapador Orbis | Media-alta (foto de proyecto/producto) |
| UP/2020/07/31B.jpg | Promos + Gifts en Stock | Mini Monedero en Silicona | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-slider.jpg | Promos + Gifts a la Medida | Fondo CSS/imagen sin alt: Promocionales-a-la-medida-slider.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/Promocionales-a-la-medida-slider-movil.jpg | Promos + Gifts a la Medida | Fondo CSS/imagen sin alt: Promocionales-a-la-medida-slider-movil.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/07/IMG_0043-300x300.jpg | Promos + Gifts a la Medida | IMG_0043 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/imac-3-300x300.jpg | Promos + Gifts a la Medida | imac-3 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/imac-6-300x300.jpg | Promos + Gifts a la Medida | imac-6 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/imac-7-300x300.jpg | Promos + Gifts a la Medida | imac-7 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-icon.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-icon | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Promocionales-a-la-medida-icon2.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-icon2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Promocionales-a-la-medida-icon3.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-icon3 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/07/Promocionales-a-la-medida-1.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-1 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-2.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-2 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-3.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-3 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-4.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-4 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-5.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-5 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-6.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-6 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-7.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-7 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-8.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-8 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-9.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-9 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-10.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-10 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-11.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-11 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-12.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-12 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-13.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-13 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-14.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-14 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-15.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-15 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-16.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-16 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-17.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-17 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-18.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-18 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Promocionales-a-la-medida-19.jpg | Promos + Gifts a la Medida | Promocionales-a-la-medida-19 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/delantales-delantal-impreso-a-full-color-min.jpg | Promos + Gifts a la Medida | Delantal impreso a full color | Media-alta (foto de proyecto/producto) |
| UP/2020/07/EMPAQUES-ESPECIALES-empaque-madera-min-1.jpg | Promos + Gifts a la Medida | EMPAQUES-ESPECIALES-empaque-madera-min | Media-alta (foto de proyecto/producto) |
| UP/2020/07/TULAS-Elaborada-en-lona-con-impresion-a-full-color-min.jpg | Promos + Gifts a la Medida | Elaborada en lona con impresión a full color | Media-alta (foto de proyecto/producto) |
| UP/2020/07/PORTARETRATOS-Elaborado-en-acrilico.jpg | Promos + Gifts a la Medida | Elaborado en acrílico | Media-alta (foto de proyecto/producto) |
| UP/2020/07/portavasos-en-acero-con-marcacion-laser-coca-cola.jpg | Promos + Gifts a la Medida | portavasos en acero con marcacion laser coca cola | Media-alta (foto de proyecto/producto) |
| UP/2020/07/alcancias-eco-alcancia-madera.jpg | Promos + Gifts a la Medida | Alcancía madera | Media-alta (foto de proyecto/producto) |
| UP/2020/07/billeteras-Elaborada-en-cuero-ecologico-min.jpg | Promos + Gifts a la Medida | Elaborada en cuero ecológico | Media-alta (foto de proyecto/producto) |
| UP/2020/07/COJINES-Coj%C3%ADn-viajero-relleno-de-microperlas-min.jpg | Promos + Gifts a la Medida | COJINES-Cojín-viajero-relleno-de-microperlas-min | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Cuadros-decorativos-cuadro-madera-con-mensajes-min.jpg | Promos + Gifts a la Medida | cuadro madera con mensajes | Media-alta (foto de proyecto/producto) |
| UP/2020/07/JUEGOS-EN-PAPEL-ECO-set-barajas-Poker-min.jpg | Promos + Gifts a la Medida | Set barajas Poker | Media-alta (foto de proyecto/producto) |
| UP/2020/07/marca-maletasl-color-1-cara.jpg | Promos + Gifts a la Medida | Full color 1 cara | Media-alta (foto de proyecto/producto) |
| UP/2020/07/organizadores-Tula-para-cosmeticos-min.jpg | Promos + Gifts a la Medida | Tula para cosméticos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Bolsa-de-mercado-bolsas-en-cambre-laminado-impresa-a-full-color-min.jpg | Promos + Gifts a la Medida | bolsas en cambre laminado impresa a full color | Media-alta (foto de proyecto/producto) |
| UP/2020/07/CARTUCHERAS-Elaborada-en-Clear-para-set-de-viaje-min.jpg | Promos + Gifts a la Medida | Elaborada en Clear para set de viaje | Media-alta (foto de proyecto/producto) |
| UP/2020/07/cosmetiqueras-elaborada-en-clear-con-impresion-en-tela-min.jpg | Promos + Gifts a la Medida | Elaborada en clear con impresión en tela | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Individuales-de-mesa-set-individuales-plasticos-x2-o-x4-min.jpg | Promos + Gifts a la Medida | Set individuales plásticos x2 o x4 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/loncheras-rectangle-lunch-bag-min.jpg | Promos + Gifts a la Medida | loncheras rectangle-lunch bag-min | Media-alta (foto de proyecto/producto) |
| UP/2020/07/neceser-ideal-para-llevar-cosmeticos.jpg | Promos + Gifts a la Medida | neceser ideal para llevar cosmeticos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/peluches-replica-de-Vaca.jpg | Promos + Gifts a la Medida | Replica de vaca | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-slider-1.jpg | Soluciones Sostenibles | Fondo CSS/imagen sin alt: Soluciones-Sostenibles-slider-1.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/Soluciones-Sostenibles-slider-movil.jpg | Soluciones Sostenibles | Fondo CSS/imagen sin alt: Soluciones-Sostenibles-slider-movil.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/06/fondo-arriba-1.jpg | Soluciones Sostenibles | Fondo CSS/imagen sin alt: fondo-arriba-1.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/06/Soluciones-Sostenibles-bambu-150x150.png | Soluciones Sostenibles | Soluciones-Sostenibles-bambu | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-madera-150x150.png | Soluciones Sostenibles | Soluciones-Sostenibles-madera | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-plasticos-150x150.png | Soluciones Sostenibles | Soluciones-Sostenibles-plasticos | Media-alta (foto de proyecto/producto) |
| UP/2020/06/botellas-150x150.png | Soluciones Sostenibles | botellas | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-bolsas-150x150.png | Soluciones Sostenibles | Soluciones-Sostenibles-bolsas | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-carton-150x150.png | Soluciones Sostenibles | Soluciones-Sostenibles-carton | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-papel-150x150.png | Soluciones Sostenibles | Soluciones-Sostenibles-papel | Media-alta (foto de proyecto/producto) |
| UP/2020/01/comillas-blancas.png | Soluciones Sostenibles | comillas-blancas | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/01/comillas-blancas-2.png | Soluciones Sostenibles | comillas-blancas-2 | Baja (icono/decorativo; rehacer en vector) |
| UP/2020/06/fondo-abajo.jpg | Soluciones Sostenibles | Fondo CSS/imagen sin alt: fondo-abajo.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/06/Soluciones-Sostenibles-1-150x150.jpg | Soluciones Sostenibles | Soluciones-Sostenibles-1 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-2-150x150.jpg | Soluciones Sostenibles | Soluciones-Sostenibles-2 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-3-150x150.jpg | Soluciones Sostenibles | Soluciones-Sostenibles-3 | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-4.jpg | Soluciones Sostenibles | Soluciones-Sostenibles-4 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Soluciones-Sostenibles-5.jpg | Soluciones Sostenibles | POP ambientalmente | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Soluciones-Sostenibles-7.jpg | Soluciones Sostenibles | Eco cartón | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Soluciones-Sostenibles-8.jpg | Soluciones Sostenibles | Reutilizables | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-6.jpg | Soluciones Sostenibles | Germinables | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-9.jpg | Soluciones Sostenibles | Reciclables | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-10.jpg | Soluciones Sostenibles | Bambú | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-11.jpg | Soluciones Sostenibles | Maíz plástico | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Soluciones-Sostenibles-12.jpg | Soluciones Sostenibles | Productos en papel eco | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Soluciones-Sostenibles-13.jpg | Soluciones Sostenibles | Empaques ecológicos | Media-alta (foto de proyecto/producto) |
| UP/2020/06/Soluciones-Sostenibles-14.jpg | Soluciones Sostenibles | Textiles ecológicos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Soluciones-Sostenibles-15.jpg | Soluciones Sostenibles | Bolsas reutilizables | Media-alta (foto de proyecto/producto) |
| UP/2020/07/Soluciones-Sostenibles-16.jpg | Soluciones Sostenibles | Promocionales eco friendly | Media-alta (foto de proyecto/producto) |
| UP/2020/07/2A-2.jpg | Soluciones Sostenibles | Display exhibición 2 caras | Media-alta (foto de proyecto/producto) |
| UP/2020/07/9-5.jpg | Soluciones Sostenibles | Arcos especiales | Media-alta (foto de proyecto/producto) |
| UP/2020/07/10A-2.jpg | Soluciones Sostenibles | Mug en fibra de maiz | Media-alta (foto de proyecto/producto) |
| UP/2020/07/12B-1.jpg | Soluciones Sostenibles | Vajillas en material ecológico | Media-alta (foto de proyecto/producto) |
| UP/2020/07/1-4.jpg | Soluciones Sostenibles | Vitrinas decoradas con la resistencia del cartón panal de abeja | Media-alta (foto de proyecto/producto) |
| UP/2020/07/4-5.jpg | Soluciones Sostenibles | Juego de mesa y sillas en Eco cartón | Media-alta (foto de proyecto/producto) |
| UP/2020/07/6-5.jpg | Soluciones Sostenibles | Impresos con tintas eco a base de soya | Media-alta (foto de proyecto/producto) |
| UP/2020/07/8A-4.jpg | Soluciones Sostenibles | 8A | Media-alta (foto de proyecto/producto) |
| UP/2020/07/3B-1.jpg | Soluciones Sostenibles | Lonchera elaborada en fibra de bamboo 1 | Media-alta (foto de proyecto/producto) |
| UP/2020/07/5-4.jpg | Soluciones Sostenibles | Portavasos en madera | Media-alta (foto de proyecto/producto) |
| UP/2020/07/7-3.jpg | Soluciones Sostenibles | Set de pitillos | Media-alta (foto de proyecto/producto) |
| UP/2020/07/11-4.jpg | Soluciones Sostenibles | Elaborados en cartón panal de abeja | Media-alta (foto de proyecto/producto) |
| UP/2020/06/eco.png | Soluciones Sostenibles | eco | Media-alta (foto de proyecto/producto) |
| UP/2020/07/exito-1.jpg | Casos de éxito | Fondo CSS/imagen sin alt: exito-1.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/08/dettol.png | Casos de éxito | dettol | Media-alta (foto de proyecto/producto) |
| UP/2020/08/detto-3.jpg | Casos de éxito | Fondo CSS/imagen sin alt: detto-3.jpg | Media-alta (foto de proyecto/producto) |
| UP/2020/08/detto-4.jpg | Casos de éxito | Fondo CSS/imagen sin alt: detto-4.jpg | Media-alta (foto de proyecto/producto) |
| UP/2020/08/detto-5.jpg | Casos de éxito | Fondo CSS/imagen sin alt: detto-5.jpg | Media-alta (foto de proyecto/producto) |
| UP/2020/08/detto-6.jpg | Casos de éxito | Fondo CSS/imagen sin alt: detto-6.jpg | Media-alta (foto de proyecto/producto) |
| UP/2020/08/detto-1.jpg | Casos de éxito | Fondo CSS/imagen sin alt: detto-1.jpg | Media-alta (foto de proyecto/producto) |
| UP/2020/08/detto-2.jpg | Casos de éxito | Fondo CSS/imagen sin alt: detto-2.jpg | Media-alta (foto de proyecto/producto) |
| UP/bb-plugin/cache/entrada2-landscape-60548f99042f71986c769bce113cb3ce-.jpg | Blog | entrada2 | Media-alta (foto de proyecto/producto) |
| UP/2019/06/imagenes_graficas_gris.jpg | Contacto | Fondo CSS/imagen sin alt: imagenes_graficas_gris.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/12/portrait.jpg | IntraNet | Fondo CSS/imagen sin alt: portrait.jpg | Alta (hero/banner; resolución 2020, revisar) |
| UP/2020/12/Recurso-1-300x123.png | IntraNet | Ingreso | Media-alta (foto de proyecto/producto) |
| UP/2020/08/btl-3.jpg | Post BTL | Fondo CSS/imagen sin alt: btl-3.jpg | Media-alta (foto de proyecto/producto) |
| UP/2022/02/IMG_653611-1-1024x768.jpg | Post BTL | Fondo CSS/imagen sin alt: IMG_653611-1-1024x768.jpg | Media-alta (foto de proyecto/producto) |
| UP/2019/08/entrada3.jpg | Post Stands | Fondo CSS/imagen sin alt: entrada3.jpg | Media-alta (foto de proyecto/producto) |
| UP/2019/08/entrada-2.jpg | Post Lenguaje | Fondo CSS/imagen sin alt: entrada-2.jpg | Media-alta (foto de proyecto/producto) |
| UP/2019/08/entrada2.jpg | Post Packaging | Fondo CSS/imagen sin alt: entrada2.jpg | Media-alta (foto de proyecto/producto) |