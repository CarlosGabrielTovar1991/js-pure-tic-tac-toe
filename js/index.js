const casillasJuegoNuevo = [
  'n', 'n', 'n',
  'n', 'n', 'n',
  'n', 'n', 'n'
];

let casillasJuego = casillasJuegoNuevo.slice();

let juegoTerminado = false;

const evaluarVictoria = function(valor) {
  return (
    // El jugador ha marcado toda la primera fila
    (casillasJuego[0] === valor && casillasJuego[1] === valor && casillasJuego[2] === valor) ||
    // El jugador ha marcado toda la segunda fila
    (casillasJuego[3] === valor && casillasJuego[4] === valor && casillasJuego[5] === valor) ||
    // El jugador ha marcado toda la tercera fila
    (casillasJuego[6] === valor && casillasJuego[7] === valor && casillasJuego[8] === valor) ||
    // El jugador ha marcado toda la primera columna
    (casillasJuego[0] === valor && casillasJuego[3] === valor && casillasJuego[6] === valor) ||
    // El jugador ha marcado toda la segunda columna
    (casillasJuego[1] === valor && casillasJuego[4] === valor && casillasJuego[7] === valor) ||
    // El jugador ha marcado toda la tercera columna
    (casillasJuego[2] === valor && casillasJuego[5] === valor && casillasJuego[8] === valor) ||
    // El jugador ha marcado toda la primera diagonal
    (casillasJuego[0] === valor && casillasJuego[4] === valor && casillasJuego[8] === valor) ||
    // El jugador ha marcado toda la segunda diagonal
    (casillasJuego[2] === valor && casillasJuego[4] === valor && casillasJuego[6] === valor)
  );
}

const hayMovimientos = function() {
  const hayMovimientos = casillasJuego.findIndex(function (casillaActual) {
    return casillaActual === 'n';
  });
  return hayMovimientos >= 0;
}

const concluirJuego = function(texto) {
  document.querySelectorAll('.boton-juego').forEach(elemento => {
    elemento.disabled = true;
  });
  document.getElementById("mensaje-resultado").classList.add("mostrar");
  document.getElementById("texto-resultado").innerText = texto;
}

const jugarCasilla = function(elemento, identificador) {
  let pcHaJugado = false;
  let indiceCasillaPc = -1;
  let casillaJugadaPc = null;
  let mensajeGanador = null;
  if (juegoTerminado === false && elemento.disabled === false) {
    elemento.disabled = true;
    elemento.classList.add("boton-jugado");
    elemento.classList.remove("boton-no-jugado");
    casillasJuego[identificador] = 'j';
    if (evaluarVictoria('j') === true) {
      document.getElementById("sonido-victoria").play();
      juegoTerminado = true;
      mensajeGanador = "Viva! Has ganado el juego."
    } else if (hayMovimientos()) {
      while (pcHaJugado === false) {
        indiceCasillaPc = Math.floor(Math.random() * 9);
        if (casillasJuego[indiceCasillaPc] === 'n') {
          pcHaJugado = true;
          casillasJuego[indiceCasillaPc] = 'c';
          casillaJugadaPc = document.getElementById("boton-casilla-" + indiceCasillaPc);
          casillaJugadaPc.disabled = true;
          casillaJugadaPc.classList.add("boton-jugado");
          casillaJugadaPc.classList.remove("boton-no-jugado");
          casillaJugadaPc.classList.remove("boton-jugador");
          casillaJugadaPc.classList.add("boton-computadora");
        }
      }
      if (evaluarVictoria('c') === true) {
        document.getElementById("sonido-derrota").play();
        juegoTerminado = true;
        mensajeGanador = "Mala suerte! Ha ganado la PC."
      }
    } else {
      document.getElementById("sonido-empate").play();
      juegoTerminado = true;
      mensajeGanador = "No hay movimientos! Empate."
    }
  }

  if (juegoTerminado === true) {
    concluirJuego(mensajeGanador);
  }
}

const reiniciarJuego = function() {
  juegoTerminado = false
  casillasJuego = casillasJuegoNuevo.slice();
  document.querySelectorAll('.boton-juego').forEach(elemento => {
    elemento.disabled = false;
    elemento.classList.remove("boton-jugado");
    elemento.classList.add("boton-no-jugado");
    elemento.classList.add("boton-jugador");
    elemento.classList.remove("boton-computadora");
  });
  document.getElementById("mensaje-resultado").classList.remove("mostrar");
}

const empezarJuego = function () {
  document.getElementById("grilla-juego").classList.remove("invisible");
  document.getElementById("musica-de-fondo").play();
  document.getElementById("boton-jugar").disabled = true;
  document.getElementById("boton-reinciar").disabled = false;
}