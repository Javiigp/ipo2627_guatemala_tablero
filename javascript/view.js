export class JuegoView {

    constructor() {

        this.tablero =
            document.querySelector(
                '[data-tablero]'
            );


        this.estado =
            document.querySelector(
                '[data-estado]'
            );


        this.movimientos =
            document.querySelector(
                '[data-movimientos]'
            );


        this.controlDimension =
            document.querySelector(
                '[data-control="dimension"]'
            );


        this.controlTamano =
            document.querySelector(
                '[data-control="tamano"]'
            );


        this.controlApariencia =
            document.querySelector(
                '[data-control="apariencia"]'
            );


        this.panelAyuda =
            document.querySelector(
                '[data-ayuda]'
            );


        this.botonAyuda =
            document.querySelector(
                '[data-action="abrir-ayuda"]'
            );


        this.victoria =
            document.querySelector(
                '[data-victoria]'
            );


        this.victoriaMovimientos =
            document.querySelector(
                '[data-victoria-movimientos]'
            );

    }



    render(model) {

        this.actualizarControles(model);

        this.dibujarTablero(model);

        this.actualizarInformacion(model);



        /*
            Mostramos la ventana de victoria
            únicamente cuando el jugador gana.
        */

        if (model.ganado) {

            this.mostrarVictoria(model);

        } else {

            this.ocultarVictoria();

        }

    }



    actualizarControles(model) {

        this.controlDimension.value =
            model.dimension;


        this.controlTamano.value =
            model.tamano;


        this.controlApariencia.value =
            model.apariencia;

    }



    dibujarTablero(model) {

        /*
            Eliminamos el tablero anterior.
        */

        this.tablero.replaceChildren();



        /*
            Variable CSS que indica
            cuántas filas y columnas existen.
        */

        this.tablero.style.setProperty(
            '--dimension',
            model.dimension
        );



        /*
            Guardamos características
            mediante atributos data-*.
        */

        this.tablero.dataset.tamano =
            model.tamano;


        this.tablero.dataset.apariencia =
            model.apariencia;



        const fragmento =
            document.createDocumentFragment();



        model.tablero.forEach(
            function (tipo, indice) {

                /*
                    Creamos la celda.
                */

                const celda =
                    document.createElement('div');


                celda.classList.add(
                    'celda'
                );


                celda.dataset.celda =
                    '';


                celda.dataset.index =
                    indice;



                /*
                    Creamos la ficha.
                */

                const ficha =
                    document.createElement('div');


                ficha.classList.add(
                    'ficha'
                );


                ficha.dataset.ficha =
                    '';


                ficha.dataset.index =
                    indice;


                ficha.dataset.tipo =
                    tipo;



                /*
                    Cuando se gana las fichas
                    dejan de ser arrastrables.
                */

                ficha.draggable =
                    !model.ganado;



                ficha.setAttribute(
                    'aria-label',
                    `Ficha tipo ${tipo + 1}`
                );


                celda.appendChild(
                    ficha
                );


                fragmento.appendChild(
                    celda
                );

            }
        );


        this.tablero.appendChild(
            fragmento
        );

    }



    actualizarInformacion(model) {

        this.movimientos.textContent =
            `Movimientos: ${model.movimientos}`;



        if (model.ganado) {

            this.estado.textContent =
                '¡Tablero completado! Has ganado.';


            this.estado.classList.add(
                'estado--ganado'
            );

        } else {

            this.estado.textContent =
                'Arrastra una ficha sobre otra para intercambiarlas.';


            this.estado.classList.remove(
                'estado--ganado'
            );

        }

    }



    limpiarIndicadoresDrag() {

        const elementos =
            this.tablero.querySelectorAll(
                '.arrastrando, .sobre'
            );


        elementos.forEach(
            function (elemento) {

                elemento.classList.remove(
                    'arrastrando',
                    'sobre'
                );

            }
        );

    }



    marcarDestino(celda) {

        const destinos =
            this.tablero.querySelectorAll(
                '.sobre'
            );


        destinos.forEach(
            function (destino) {

                destino.classList.remove(
                    'sobre'
                );

            }
        );


        celda.classList.add(
            'sobre'
        );

    }



    mostrarAyuda() {

        this.panelAyuda.hidden =
            false;


        this.botonAyuda.setAttribute(
            'aria-expanded',
            'true'
        );

    }



    ocultarAyuda() {

        this.panelAyuda.hidden =
            true;


        this.botonAyuda.setAttribute(
            'aria-expanded',
            'false'
        );

    }



    mostrarVictoria(model) {

        this.victoriaMovimientos.textContent =
            `Lo has conseguido en ${model.movimientos} movimientos.`;


        this.victoria.hidden =
            false;

    }



    ocultarVictoria() {

        this.victoria.hidden =
            true;

    }

}