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

botonNuevaPartida.addEventListener(
    'click',

    function () {

        model.nuevaPartida();

        view.render(model);

    }
);

botonPartidaVictoria.addEventListener(
    'click',

    function () {

        model.nuevaPartida();

        view.render(model);

    }
);

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

controlTamano.addEventListener(
    'change',

    function (event) {

        model.cambiarTamano(
            event.target.value
        );


        view.render(model);

    }
);

controlApariencia.addEventListener(
    'change',

    function (event) {

        model.cambiarApariencia(
            event.target.value
        );


        view.render(model);

    }
);

const tablero =
    document.querySelector(
        '[data-tablero]'
    );

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

        event.dataTransfer.setData(
            'text/plain',
            ficha.dataset.index
        );


        event.dataTransfer.effectAllowed =
            'move';

    }
);

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

        event.preventDefault();


        view.marcarDestino(
            celda
        );

    }
);

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

        const origen =
            Number(
                event.dataTransfer.getData(
                    'text/plain'
                )
            );

        const destino =
            Number(
                celdaDestino.dataset.index
            );

        model.intercambiar(
            origen,
            destino
        );

        view.render(model);

    }
);

tablero.addEventListener(
    'dragend',

    function () {

        view.limpiarIndicadoresDrag();

    }
);

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


document.addEventListener(
    'keydown',

    function (event) {

        if (event.key === 'Escape') {

            view.ocultarAyuda();

        }

    }
);