# Design System — Steven Patiño Portfolio

## Contexto
Subject: portfolio de un Systems Engineer / Full Stack Developer que no solo construye interfaces — despliega y opera la infraestructura completa (Docker, CI/CD, droplets, Postgres compartido, Caddy) para negocios reales (construcción, salud, iglesia, grupo de apoyo).
Audiencia: reclutadores técnicos, founders/clientes evaluando para contratar freelance, otros devs.
Trabajo de la página: probar con evidencia real (screenshots + stack + qué se operó) que esto no es un portafolio de plantilla — es trabajo en producción, hoy, para clientes reales.

Referencias (proyectos propios, no plantillas de terceros):
- bocancontracting.ca — construcción, bilingüe, lightbox antes/después
- casavidactg.com — iglesia + panel admin con roles + app de formularios separada
- reformaripsfundacion.co — salud, migrado a export estático + API en PHP por hosting FTP
- grupolafecartagena.org — grupo de apoyo anónimo, sin fotos de personas por diseño

Anti-referencias: v0/Lovable template default — Inter, gradiente morado→cian, hero centrado, blobs flotando, 3 tarjetas redondeadas idénticas, glassmorphism, iconos en círculos de acento.

## Color
```
--bg:         #0B0E14   fondo (tinta azul-negro, no negro puro)
--surface:    #11151D   paneles / cards
--surface-2:  #171C26   hover / rows alternas
--border:     #232935   bordes 1px
--text:       #E7EAF0   texto principal
--text-dim:   #8B93A6   texto secundario / meta
--text-faint: #565F72   labels terciarios
--accent:     #F5A623   ámbar — único acento de marca. Interactivo: links, focus, cifras clave, cursor.
--status-live:#5FBF7A   verde — semántico, no decorativo. Solo para "● deployed/live". No se usa en UI general.
```
Justificación: ámbar único evita el cluster "negro + acento ácido verde/bermellón" tal cual — aquí el verde queda reservado a un uso semántico (estado), no es el acento de marca.

## Tipografía
Display: Space Grotesk, 600/700, tracking ajustado — solo en H1 del hero y números clave. Uso restringido.
Body: Geist Sans — texto de párrafo, nav, botones.
Mono: Geist Mono — labels, meta (fechas, stack, status), nav uppercase, terminal blocks. Este es el hilo conductor visual de todo el sitio.
Escala: 13px (meta) / 16px (body) / 20px (subtítulos) / clamp(2.5rem,6vw,4.5rem) (H1).

## Layout
Hero alineado a la izquierda (no centrado). Sin blobs decorativos, sin gradient-text. Bloque tipo terminal (`$ whoami`) reemplaza las 3 tarjetas de contacto con iconos en círculo.
Nav: barra superior delgada, sólida (sin blur/glass), marca mono a la izquierda, links mono uppercase a la derecha, borde inferior 1px.
Proyectos destacados: frame tipo ventana de navegador (dots + barra de URL real) con el screenshot real adentro, no en carrusel — grid 2 columnas para que cada caso se lea completo. Línea de status debajo: `● deployed · stack · industria`.
Experiencia: timeline vertical con regla 1px, fechas en mono, sin cards idénticas apiladas.

## Signature
El frame de navegador con URL real + screenshot real + status line `● deployed`. Es el único elemento "de marca" del sitio — funcional (prueba que el sitio existe y corre), no decorativo. Todo lo demás (nav, cards, timeline) es disciplinado y plano alrededor de esto.

## Prohibido
Gradientes morados/cian · glassmorphism · blobs flotando animados · hero centrado · 3-4 tarjetas redondeadas idénticas con icono en círculo · marcadores 01/02/03 sin función real · animación de scroll en cada sección · Inter como body.
