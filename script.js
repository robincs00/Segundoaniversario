/* ============================================================
   1) DATOS: aquí editas TUS momentos, fotos y frases.
   Solo agrega o quita objetos del array. El orden es el orden
   en que aparecen al hacer scroll.

   img   -> ruta de la foto dentro de la carpeta /images
   fecha -> texto libre (mes/año, "Nuestra primera cita", etc.)
   frase -> el texto/recuerdo que acompaña la foto
   ============================================================ */
const momentos = [
  {
    /*corregir Bien las fotos*/
    img: "images/inicio.jpeg",
    fecha: "14 Octubre 2024",
    frase: "Ese día la relación se consolidó, pero todo comenzó con una simple foto. Una imagen que, sin saberlo, encendió la chispa de algo que con el tiempo se convertiría en nuestro refugio, en nuestra historia. Porque a veces el destino no llega con grandes gestos, sino con un pequeño instante que lo cambia todo y luego.... "
  },
  {
    img: "images/elprimer.jpeg",
    fecha: "Nuestro primer viaje",
    frase: "Nuestro primer viaje juntos, ¿cómo olvidarlo? Una nueva experiencia a tu lado: un camino largo, pero todo es bonito si es contigo. "
  },
  {
    img: "images/primerasalidass.jpeg",
    fecha: "Nuestra primera salida",
    frase: "Nuevo lugar, misma persona de siempre a mi lado. No necesité nada más."
  },
  {
    img: "images/diaramdom.jpeg",
    fecha: "Un día cualquiera",
    frase: "Un día cualquiera, una foto de recuerdo, y aun así lo guardo como uno de mis favoritos."
  },
  {
    img: "images/3.jpeg",
    fecha: "Un dia perfecto",
    frase: "De los mejores días de mi vida, y no por lo que hicimos, sino por quién estaba conmigo."
  },
  {
    img: "images/4.jpeg",
    fecha: "Salidita juntos",
    frase: "De los días comunes contigo hice mis favoritos del año."
  },
  {
    img: "images/6.jpeg",
    fecha: "Un día más que perfecto",
    frase: "Un día de ensueño: conocimos un lugar nuevo, encontramos calma, compartimos con tu hermano y lo pasamos increíble. Sin muchas cosas, solo nosotros. Ojalá más días así, y que sean contigo. "
  },
  {
    img: "images/continua.png",
    fecha: "Hoy",
    frase: "Dos años después, sigo eligiéndote todos los días."
  }
];

/* Fecha en que empezaron (para el contador de días).
   Formato: año, mes (empieza en 0 = enero), día */
const fechaInicio = new Date(2024, 9, 14); // 14 de octubre del 2024

/* ============================================================
   2) RENDERIZAR LOS MOMENTOS EN EL HTML
   ============================================================ */
const timeline = document.getElementById("timeline");

momentos.forEach((momento, index) => {
  const seccion = document.createElement("section");
  seccion.className = "momento" + (index % 2 === 1 ? " derecha" : "");

  seccion.innerHTML = `
    <div class="momento-foto">
      <img src="${momento.img}" alt="${momento.fecha}" loading="lazy" />
    </div>
    <div class="momento-texto">
      <span class="momento-fecha">${momento.fecha}</span>
      <p class="momento-frase">${momento.frase}</p>
    </div>
  `;

  timeline.appendChild(seccion);
});

/* ============================================================
   3) ANIMACIÓN AL HACER SCROLL (Intersection Observer)
   Cuando un momento entra en pantalla: se revela + salen corazones
   ============================================================ */
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        lanzarCorazones(3);
        observador.unobserve(entrada.target); // solo se anima una vez
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".momento").forEach((el) => observador.observe(el));

/* ============================================================
   4) CONTADOR DE DÍAS JUNTOS
   ============================================================ */
function actualizarDias() {
  const hoy = new Date();
  const msPorDia = 1000 * 60 * 60 * 24;
  const dias = Math.floor((hoy - fechaInicio) / msPorDia);
  document.getElementById("dias-juntos").textContent = `${dias} días juntos`;
}
actualizarDias();

/* ============================================================
   5) CORAZONES VOLADORES (efecto reutilizable)
   ============================================================ */
function lanzarCorazones(cantidad = 5) {
  for (let i = 0; i < cantidad; i++) {
    const corazon = document.createElement("span");
    corazon.className = "corazon-volador";
    corazon.textContent = "❤";
    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.animationDelay = Math.random() * 0.4 + "s";
    corazon.style.color = Math.random() > 0.5 ? "#e8a9b3" : "#d9a066";
    document.body.appendChild(corazon);

    // limpiar el elemento del DOM cuando termina la animación
    setTimeout(() => corazon.remove(), 3200);
  }
}

document.getElementById("btn-corazones").addEventListener("click", () => {
  lanzarCorazones(14);
});

/* ============================================================
   6) CORAZONES FLOTANDO EN LA PORTADA (canvas de fondo)
   Es el único movimiento "automático" y continuo de la página,
   para no saturar de animaciones el resto del sitio.
   ============================================================ */
const canvas = document.getElementById("hearts-canvas");
const ctx = canvas.getContext("2d");
let ancho, alto;

function ajustarTamano() {
  ancho = canvas.width = canvas.offsetWidth;
  alto = canvas.height = canvas.offsetHeight;
}
ajustarTamano();
window.addEventListener("resize", ajustarTamano);

const particulas = Array.from({ length: 22 }, crearParticula);

function crearParticula() {
  return {
    x: Math.random() * ancho,
    y: alto + Math.random() * alto,
    tamano: 10 + Math.random() * 14,
    velocidad: 0.3 + Math.random() * 0.6,
    deriva: (Math.random() - 0.5) * 0.4,
    opacidad: 0.15 + Math.random() * 0.25
  };
}

function dibujarCorazon(x, y, tamano, opacidad) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(tamano / 20, tamano / 20);
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.bezierCurveTo(-10, -6, -20, 4, 0, 18);
  ctx.bezierCurveTo(20, 4, 10, -6, 0, 4);
  ctx.fillStyle = `rgba(232, 169, 179, ${opacidad})`;
  ctx.fill();
  ctx.restore();
}

function animarFondo() {
  ctx.clearRect(0, 0, ancho, alto);
  particulas.forEach((p) => {
    p.y -= p.velocidad;
    p.x += p.deriva;
    if (p.y < -20) Object.assign(p, crearParticula(), { y: alto + 20 });
    dibujarCorazon(p.x, p.y, p.tamano, p.opacidad);
  });
  requestAnimationFrame(animarFondo);
}
animarFondo();
