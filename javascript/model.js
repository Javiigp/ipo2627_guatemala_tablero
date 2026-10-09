export class JuegoModel {

    constructor() {

        this.dimension = 3;

        this.tamano = 'mediana';

        this.apariencia = 'clasico';

        this.tablero = [];

        this.movimientos = 0;

        this.ganado = false;


        this.nuevaPartida();

    }



    nuevaPartida() {

        this.tablero = this.generarTablero();

        this.movimientos = 0;

        this.ganado = false;

    }



    cambiarDimension(dimension) {

        const nuevaDimension =
            Number.parseInt(dimension);


        if (
            Number.isNaN(nuevaDimension)
            ||
            nuevaDimension < 3
        ) {

            return false;

        }


        this.dimension =
            nuevaDimension;


        this.nuevaPartida();


        return true;

    }



    cambiarTamano(tamano) {

        this.tamano =
            tamano;


        this.nuevaPartida();

    }



    cambiarApariencia(apariencia) {

        this.apariencia =
            apariencia;


        this.nuevaPartida();

    }



    generarTablero() {

        const fichas = [];


        /*
            Creamos una distribución
            que sabemos que puede resolverse.

            Cada fila completa contiene
            inicialmente un mismo tipo.
        */

        for (
            let fila = 0;
            fila < this.dimension;
            fila++
        ) {

            const tipo =
                fila % 3;


            for (
                let columna = 0;
                columna < this.dimension;
                columna++
            ) {

                fichas.push(tipo);

            }

        }



        /*
            Mezclamos las fichas.
        */

        this.barajar(fichas);



        /*
            Evitamos comenzar con
            el tablero ya resuelto.
        */

        while (
            this.estaResuelto(fichas)
        ) {

            this.barajar(fichas);

        }


        return fichas;

    }



    barajar(fichas) {

        for (
            let i = fichas.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );


            [
                fichas[i],
                fichas[j]

            ] = [

                fichas[j],
                fichas[i]

            ];

        }

    }



    intercambiar(origen, destino) {

        /*
            Si ya se ha ganado,
            no permitimos más movimientos.
        */

        if (this.ganado) {

            return;

        }



        /*
            No hacemos nada si la ficha
            se suelta sobre sí misma.
        */

        if (origen === destino) {

            return;

        }



        /*
            Comprobamos que las posiciones
            sean válidas.
        */

        if (
            origen < 0
            ||
            destino < 0
            ||
            origen >= this.tablero.length
            ||
            destino >= this.tablero.length
        ) {

            return;

        }



        /*
            Intercambiamos las fichas.
        */

        [
            this.tablero[origen],
            this.tablero[destino]

        ] = [

            this.tablero[destino],
            this.tablero[origen]

        ];



        this.movimientos++;



        /*
            Comprobamos si después del
            movimiento se ha ganado.
        */

        this.ganado =
            this.estaResuelto(
                this.tablero
            );

    }



    estaResuelto(tablero) {

        /*
            Comprobamos cada fila.
        */

        for (
            let fila = 0;
            fila < this.dimension;
            fila++
        ) {

            const inicio =
                fila * this.dimension;


            const tipoFila =
                tablero[inicio];



            /*
                Todas las fichas de la fila
                tienen que tener el mismo tipo.
            */

            for (
                let columna = 1;
                columna < this.dimension;
                columna++
            ) {

                const posicion =
                    inicio + columna;


                if (
                    tablero[posicion]
                    !==
                    tipoFila
                ) {

                    return false;

                }

            }

        }


        return true;

    }

}