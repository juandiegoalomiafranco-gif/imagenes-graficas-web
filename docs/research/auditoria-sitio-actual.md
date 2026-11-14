# Auditoria del sitio actual - imagenesgraficas.com

ESTADO: AUDITORIA NO COMPLETADA. NO VERIFICADO todo el contenido del sitio.

## Causa
- WebFetch a https://www.imagenesgraficas.com, https://www.imagenesgraficas.com/sitemap.xml y https://imagenesgraficas.com fallaron con `getaddrinfo ENOTFOUND`. El dominio no esta en la lista de dominios permitidos de la sesion en la nube (o no resuelve).
- WebSearch `site:imagenesgraficas.com` no devolvio ninguna pagina del dominio.
- Accion requerida: permitir `imagenesgraficas.com` y `www.imagenesgraficas.com` en la configuracion de red del entorno y repetir la auditoria.

## 1) Mapa del sitio: NO VERIFICADO
## 2) Inventario pagina por pagina: NO VERIFICADO
## 3) Banco de imagenes: NO VERIFICADO (no se obtuvo ninguna URL de imagen)
## 4) Banco de copy: NO VERIFICADO
## 5) Problemas detectados: NO VERIFICADO

## Unico dato externo (fuentes de terceros, no del sitio)
- Segun un perfil de directorio (emis.cn), "Imagenes Graficas SAS Bic" tiene sede en Cali, Colombia, sector impresion, constituida el 24-11-1999, 187 empleados en 2023. Fuente: https://www.emis.cn/php/company-profile/CO/Imagenes_Graficas_SAS_Bic_en_1198213.html
- Otro directorio (techbehemoths) lista "Imagenes Graficas S.A" en Cali, fundada en 1990; no esta confirmado que sea la misma entidad. https://techbehemoths.com/company/imagenes-graficas-s-a
