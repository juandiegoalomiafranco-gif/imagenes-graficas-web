# Tokens del sitio actual (www.imagenesgraficas.com)

Fuente: CSS de WordPress + Beaver Builder (13 hojas de estilo) y HTML del home, extraídos con curl.

## Colores
| Rol | Hex | Evidencia |
|---|---|---|
| Navy (acento principal, enlaces, botones, hover del menú) | `#0a1538` | `--wp--preset--color--fl-accent`, `a{color}`, `a.fl-button{background}` |
| Amarillo de marca | `#ffd602` | 4 usos en el CSS (acentos/íconos); coincide con los íconos amarillos de las imágenes |
| Texto del cuerpo | `#000000` (`--fl-body-text`) | |
| Fondos / bordes | `#ffffff`, `#e6e6e6`, `#ddd`, `#eee`, `#f5f5f5` | |
| Grises de texto secundario | `#5e5e5e`, `#4c4c4c`, `#3f3f3f`, `#333`, `#777` | |
| Heredados de Bootstrap (sin relevancia de marca) | `#337ab7`, `#428bca` | enlaces por defecto |

Paleta secundaria vista en íconos/ilustraciones del sitio (no en CSS): verde lima, azul petróleo, guinda y naranja.

## Tipografía
- Familia cargada: **Montserrat** (Google Fonts, pesos 300, 400, 600, 700, 800). Usada para todo el sitio (`font-family: montserrat, sans-serif`, 23 usos).
- Secundaria: Open Sans (solo 2 usos, residual).
- Font Awesome 5 Free / Brands para iconografía.
- Tamaños observados: texto de enlaces 12 a 16 px; botones 16 px.

## Notas para el rediseño
- Navy + amarillo + Montserrat se pueden conservar como base de marca.
- El logo claro (`public/ig/brand/logo-imagenes-graficas-imagraphic-claro.png`) sirve sobre navy.
