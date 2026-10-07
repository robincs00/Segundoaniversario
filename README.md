# Nuestros 2 años 💛

Página de aniversario hecha con HTML, CSS y JavaScript puro (sin frameworks, sin instalar nada).

## Estructura del proyecto

```
pagina-aniversario/
├── index.html      → estructura de la página (portada + cierre)
├── style.css       → todos los estilos (colores, animaciones, layout)
├── script.js       → aquí van TUS fotos y frases + la lógica de animación
└── images/         → carpeta donde van tus fotos reales
```

## 1. Personalizar el contenido

### Nombres y contador de días
Abre `index.html` y busca esta línea (cerca del inicio):
```html
<h1 class="hero-title">Diego <span class="amp">&amp;</span> Sofía</h1>
```
Cambia los nombres por los suyos.

Luego abre `script.js` y busca:
```js
const fechaInicio = new Date(2024, 8, 15); // 15 de septiembre 2024
```
El segundo número es el **mes empezando en 0** (0 = enero, 8 = septiembre). Pon la fecha real en que empezaron.

### Fotos y frases
Todo está en `script.js`, en el array `momentos`. Cada momento es un bloque como este:

```js
{
  img: "images/momento1.jpg",
  fecha: "Septiembre 2024",
  frase: "El día que todo empezó..."
},
```

Para agregar un momento nuevo, copia un bloque completo (desde `{` hasta `},`) y pégalo dentro del array, cambiando el texto. Para quitar uno, borra su bloque completo. El orden en el array es el orden en que aparecen al hacer scroll.

### Tus fotos reales
1. Pon tus fotos dentro de la carpeta `images/` (ya viene con 5 fotos de ejemplo que puedes borrar).
2. En cada objeto del array, cambia `img: "images/momento1.jpg"` por el nombre real de tu archivo, por ejemplo `img: "images/playa.jpg"`.

Tip: si las fotos pesan mucho (varios MB), la página cargará lenta. Puedes comprimirlas antes en https://squoosh.app (gratis, sin instalar nada).

## 2. Verla en tu computadora antes de publicar

No necesitas instalar nada especial. Solo abre el archivo `index.html` haciendo doble clic, o arrástralo a una pestaña del navegador.

## 3. Publicarla en GitHub Pages

1. Crea una cuenta en https://github.com si no tienes.
2. Crea un repositorio nuevo (botón verde "New"), por ejemplo llamado `2-anios`. Puede ser público.
3. Sube estos archivos al repositorio. La forma más fácil sin usar la terminal:
   - Entra al repositorio en GitHub → botón **"Add file" → "Upload files"**.
   - Arrastra `index.html`, `style.css`, `script.js` y la carpeta `images` (con tus fotos ya puestas).
   - Dale "Commit changes".
4. Ve a **Settings → Pages** (en el menú lateral del repositorio).
5. En "Branch", elige `main` y la carpeta `/ (root)`, luego dale **Save**.
6. Espera 1-2 minutos. GitHub te va a dar un link tipo:
   ```
   https://tu-usuario.github.io/2-anios/
   ```
7. Ese es el link que le mandas a tu novia. 💛

## Ideas para seguir mejorando (cuando quieras aprender más)
- Agregar música de fondo con un `<audio>` que empiece con un botón de "play".
- Agregar una foto/video final tipo "carta" que se abre con un click.
- Cambiar los colores en `style.css` (todos están arriba del archivo, en `:root`).
