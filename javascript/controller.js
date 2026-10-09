import {

    JuegoModel

} from './model.js';



import {

    JuegoView

} from './view.js';



const model =
    new JuegoModel();


const view =
    new JuegoView();



view.render(model);



/* ========================================
   CONTROLES
   ======================================== */


const botonNuevaPartida =
    document.querySelector(
        '[data-action="nueva-partida"]'
    );


const botonPartidaVictoria =
    document.querySelector(
        '[data-action="partida-victoria"]'
    );


const controlDimension =
    document.querySelector(
        '[data-control="dimension"]'
    );


const controlTamano =
    document.querySelector(
        '[data-control="tamano"]'
    );


const controlApariencia =
    document.querySelector(
        '[data-control="apariencia"]'
    );



/*
    Nueva partida desde
    el botón de la cabecera.
*/

botonNuevaPartida.addEventListener(
    'click',

    function () {

        model.nuevaPartida();

        view.render(model);

    }
);



/*
    Nueva partida después
    de ganar.
*/

botonPartidaVictoria.addEventListener(
    'click',

    function () {

        model.nuevaPartida();

        view.render(model);

    }
);



/*
    Cambio de dimensión.
*/

controlDimension.addEventListener(
    'change',

    function (event) {

        const correcto =
            model.cambiarDimension(
                event.target.value
            );


        if (!correcto) {

            event.target.value =
                model.dimension;


            return;

        }


        view.render(model);

    }
);



/*
    Cambio de tamaño.
*/

controlTamano.addEventListener(
    'change',

    function (event) {

        model.cambiarTamano(
            event.target.value
        );


        view.render(model);

    }
);



/*
    Cambio de apariencia.
*/

controlApariencia.addEventListener(
    'change',

    function (event) {

        model.cambiarApariencia(
            event.target.value
        );


        view.render(model);

    }
);



/* ========================================
   DRAG & DROP
   ======================================== */


const tablero =
    document.querySelector(
        '[data-tablero]'
    );



/*
    COMIENZO DEL ARRASTRE
*/

tablero.addEventListener(
    'dragstart',

    function (event) {

        const ficha =
            event.target.closest(
                '[data-ficha]'
            );


        if (!ficha) {

            return;

        }



        ficha.classList.add(
            'arrastrando'
        );



        /*
            Guardamos el índice de
            la ficha arrastrada.
        */

        event.dataTransfer.setData(
            'text/plain',
            ficha.dataset.index
        );


        event.dataTransfer.effectAllowed =
            'move';

    }
);



/*
    FICHA SOBRE UNA CELDA
*/

tablero.addEventListener(
    'dragover',

    function (event) {

        const celda =
            event.target.closest(
                '[data-celda]'
            );


        if (!celda) {

            return;

        }



        /*
            Necesario para que posteriormente
            pueda producirse el evento drop.
        */

        event.preventDefault();


        view.marcarDestino(
            celda
        );

    }
);



/*
    SOLTAMOS LA FICHA
*/

tablero.addEventListener(
    'drop',

    function (event) {

        const celdaDestino =
            event.target.closest(
                '[data-celda]'
            );


        if (!celdaDestino) {

            return;

        }



        event.preventDefault();



        /*
            Recuperamos la posición
            de la ficha origen.
        */

        const origen =
            Number(
                event.dataTransfer.getData(
                    'text/plain'
                )
            );



        /*
            Obtenemos la posición
            de la ficha destino.
        */

        const destino =
            Number(
                celdaDestino.dataset.index
            );



        /*
            Intercambiamos ambas fichas.
        */

        model.intercambiar(
            origen,
            destino
        );



        /*
            Volvemos a dibujar el tablero.

            Si el movimiento ha completado
            el juego, la View mostrará
            automáticamente el mensaje
            de victoria.
        */

        view.render(model);

    }
);



/*
    FIN DEL ARRASTRE
*/

tablero.addEventListener(
    'dragend',

    function () {

        view.limpiarIndicadoresDrag();

    }
);



/* ========================================
   AYUDA
   ======================================== */


const botonAbrirAyuda =
    document.querySelector(
        '[data-action="abrir-ayuda"]'
    );


const botonCerrarAyuda =
    document.querySelector(
        '[data-action="cerrar-ayuda"]'
    );



botonAbrirAyuda.addEventListener(
    'click',

    function () {

        view.mostrarAyuda();

    }
);



botonCerrarAyuda.addEventListener(
    'click',

    function () {

        view.ocultarAyuda();

    }
);



/*
    Permitimos cerrar la ayuda
    utilizando Escape.
*/

document.addEventListener(
    'keydown',

    function (event) {

        if (event.key === 'Escape') {

            view.ocultarAyuda();

        }

    }
);