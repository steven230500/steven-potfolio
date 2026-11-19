# Sistema de diseño Añil, portafolio de Steven Patiño

Versión 2 (noviembre 2026). Reemplaza el sistema "consola" (fondo tinta, acento ámbar y etiquetas mono en mayúsculas).

## Contexto

**Tema:** un ingeniero de sistemas de Cartagena que construye apps, webs y backends y además los opera: servidores, CI/CD, Postgres compartido y Caddy, para clientes reales.
**Audiencia:** reclutadores técnicos, founders y clientes que evalúan contratar, y otros devs.
**Objetivo de la página:** mostrar con evidencia real (dominio, captura, stack y qué se opera) que el trabajo está en producción.

**Por qué cambió:** la v1 repetía los patrones más comunes de los portafolios generados: casi negro con un único acento brillante, eyebrows mono en mayúsculas, marcadores `01 · 02` sin secuencia real, meta unida con `·` y skills en una cuadrícula de cajas. La v2 toma su identidad de Cartagena (muros encalados, puertas añil, la bahía de noche) y de la tipografía, no de la estética de terminal.

## Principios

1. **La tipografía es la marca.** Una sola familia, Archivo, y su eje de ancho `wdth` (62–125) hace de voz display. El nombre del hero se expande de condensado a ancho una sola vez, al cargar.
2. **Sin cuadrículas de tarjetas.** El contenido se lee como columna editorial: filas que se expanden, una línea de tiempo y el stack escrito en prosa.
3. **Un solo objeto con marco.** El marco de navegador, con el dominio real y una captura real, solo aparece dentro de un proyecto abierto. Sirve de prueba, no de decoración.
4. **El movimiento responde a algo.** Hay un único momento orquestado (la entrada del hero). El resto responde a una acción (expandir, copiar, cambiar tema o idioma) o al progreso del scroll.
5. **Estructura con significado.** No hay numeración salvo los años del timeline, que sí son una secuencia. No hay eyebrows. Los títulos van en sentence case.

## Color

Los roles semánticos se definen en `app/globals.css`, bajo `:root` y `.dark`. Tailwind los expone como `bg-bg`, `text-text-2`, `bg-accent` y así sucesivamente.

| Rol | Claro ("cal") | Oscuro ("bahía") | Uso |
|---|---|---|---|
| `bg` | `#F3F4F0` | `#0D1220` | Fondo de la página |
| `surface` | `#FFFFFF` | `#131A2B` | Chips, marco de navegador, bloque de contacto |
| `surface-2` | `#E9EBE5` | `#1A2236` | Hover, barra de URL, botones secundarios |
| `line` | `#D6D9D1` | `#252F47` | Reglas de 1px y bordes |
| `line-strong` | `#B9BDB3` | `#36425F` | Subrayados y bordes en hover |
| `text` | `#141821` | `#E8EBF3` | Texto principal |
| `text-2` | `#4A5263` | `#A3ABBF` | Texto secundario |
| `text-3` | `#737B8C` | `#727C95` | Meta: etiquetas, fechas, años |
| `accent` (añil) | `#2E3FD1` | `#9AABFF` | Único acento: links, CTA, foco, fila abierta, progreso |
| `accent-soft` | `#E2E5FA` | `#1D2650` | Fondo en hover de los canales de contacto |
| `live` | `#1B8049` | `#5FD08A` | Solo semántico: "en línea" y "copiado" |

El tema por defecto sigue al sistema y se puede alternar con el botón del header. El cambio se anima con un círculo que se expande desde el botón (View Transitions).

## Tipografía

- **Archivo** (variable, `wght` + `wdth`, vía `next/font/google`): display, títulos y cuerpo.
  - `wide` = `wdth 125`: hero y títulos de sección.
  - `semi-wide` = `wdth 112`: nombres de proyecto, años del timeline, email de contacto y marca del header.
  - Cuerpo con `wdth 100`.
- **Geist Mono:** solo para strings literales de máquina, como dominios y URLs. Nunca para etiquetas.

Escala (base 17px, razón 1.25), en tokens `text-*`:

| Token | Tamaño | Uso |
|---|---|---|
| `text-meta` | 13 | Etiquetas de campo, pie |
| `text-small` | 15 | Meta secundaria, nav |
| `text-body` | 17 | Párrafos |
| `text-lead` | 19→22 | Intro del hero, prosa del stack |
| `text-title` | 22→28 | Cargo, años, filas en móvil |
| `text-section` | 36→68 | Títulos de sección (`wide`, 800) |
| `text-display` | ~82→168 | Nombre del hero (`wide`, 800) |

Medida de lectura: `--measure: 38rem` (unos 68 caracteres).

## Layout

- Contenedor `--page: 72rem` con `--gutter: clamp(1rem, 4vw, 2.5rem)`. Todo se alinea a la izquierda.
- **Hero:** nombre en dos líneas; la segunda va sangrada (`1.1em`), lo que da asimetría editorial. La intro y los CTA arrancan al 33% del ancho en desktop.
- **Encabezado de sección:** título ancho a la izquierda y el lede alineado a la derecha en desktop.
- **Trabajo:** lista de filas separadas por reglas de 1px. Al abrir una fila aparecen el marco de navegador (52%) y los detalles al lado; en móvil se apilan.
- **Experiencia:** años en una columna fija de 11rem, con `sticky` en desktop, y una regla vertical que se rellena con el scroll.
- **Stack:** oraciones con chips en línea, que arrancan al 33% del ancho.
- **Contacto:** bloque `surface` con el email como elemento display.

```
┌ Steven Patiño          Trabajo Experiencia Stack …   EN ◐ ┐
│ Ingeniero de sistemas y desarrollador full stack          │
│ STEVEN                                                    │
│      PATIÑO                                               │
│                    Construyo apps… ┃ [Ver el trabajo] Escríbeme
├───────────────────────────────────────────────────────────┤
│ Trabajo                                  lede a la derecha│
│ ─ iHabitar   Gestión de conjuntos   • ihabitar.com    (×) │
│   ┌ marco navegador ┐  resumen / en producción / stack    │
│ ─ Bocan Contracting …                                 (+) │
├───────────────────────────────────────────────────────────┤
│ 2023–26 ●  Full Stack Developer, FALP                     │
│ 2023    ●  Sr. Mobile Developer, DD360                    │
└───────────────────────────────────────────────────────────┘
```

## Radios (por jerarquía)

- `rounded-chip` (5px): chips de tecnología.
- `rounded-frame` (12px): marco de navegador.
- `rounded-full`: botones, toggles y el botón de expandir.

## Iconos

- **UI: Phosphor** (`@phosphor-icons/react`), peso `regular` a 16–20px y `bold` solo en el `+` de expandir y en el check de copiar. Se importan desde `components/site/icons.tsx` y siempre heredan `currentColor`.
- **Tecnologías: Simple Icons** (`simple-icons`), monocromos en `text-2`, dentro de `TechChip`. Si una marca no está en Simple Icons (AWS, por ejemplo), el chip se muestra sin logo.
- El link externo usa una flecha ↗ propia en SVG que se desplaza 1px en hover.
- Prohibido: iconos dentro de círculos de acento e iconos decorativos sin función.

## Movimiento

Tokens: `--ease-out: cubic-bezier(.16,1,.3,1)`, `--ease-in-out: cubic-bezier(.65,0,.35,1)`.

| Token | Duración | Para |
|---|---|---|
| `--dur-1` | 120ms | Color y opacidad en hover |
| `--dur-2` | 220ms | Cambio de icono, toggles |
| `--dur-3` | 420ms | Expandir/colapsar, indicador del nav |
| `--dur-4` | 1100ms | Entrada del hero (única) |

Inventario completo; no se añade movimiento fuera de esta lista:

1. **Entrada del hero:** cada línea del nombre sube desde una máscara y pasa de `wdth 62` a `125`. Después aparecen la intro, los CTA y el estado, de forma escalonada.
2. **Progreso de lectura:** línea de 1px bajo el header, con `animation-timeline: scroll()`.
3. **Timeline:** la regla de Experiencia se rellena en añil con `animation-timeline: view()`.
4. **Filas de proyecto:** la altura se anima con `grid-template-rows: 0fr → 1fr`, el contenido entra con fade y desplazamiento de 6px, y el `+` rota 45° hasta quedar en `×`.
5. **Indicador del nav:** una barra de 2px que se desliza hacia la sección activa.
6. **Tema:** View Transition con un círculo que se expande desde el botón.
7. **Idioma:** View Transition con un fundido corto.
8. **Copiar email:** el icono pasa de copiar a check, el borde se vuelve `live` y el texto se anuncia con `aria-live`.
9. **Estado "disponible":** un pulso lento (2.4s) en el punto verde. Es el único bucle.

Todo se desactiva con `prefers-reduced-motion: reduce`. Lo que es scroll-driven va dentro de `@supports (animation-timeline: scroll())`, y sin soporte la regla queda llena.

## Accesibilidad

- Foco visible: contorno de 2px en añil con offset de 3px.
- Enlace "Saltar al contenido", `aria-expanded` y `aria-controls` en las filas, e `inert` en los paneles cerrados.
- `<html lang>` se sincroniza con el idioma elegido, que se guarda en `localStorage`.
- Contraste: el añil `#2E3FD1` sobre `#F3F4F0` supera 4.5:1, y `#9AABFF` sobre `#0D1220` también.

## Archivos

- Tokens: `app/globals.css`
- Contenido bilingüe (proyectos, trabajos, stack): `lib/content.ts`
- Textos de interfaz: `lib/translations.ts`
- Componentes: `components/site/*`
- `components/ui/*`: kit de shadcn que no se usa en la página. Hereda los tokens a través de los alias.

## Prohibido

Cuadrícula de tarjetas idénticas · eyebrows en mayúsculas · numeración sin secuencia · mono para etiquetas · gradientes como decoración · glassmorphism · blobs · fade-up en cada sección · más de un acento · fotos de stock o generadas haciéndose pasar por reales.
