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

        this.barajar(fichas);

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


        if (this.ganado) {

            return;

        }


        if (origen === destino) {

            return;

        }

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

        [
            this.tablero[origen],
            this.tablero[destino]

        ] = [

            this.tablero[destino],
            this.tablero[origen]

        ];

        this.movimientos++;

        this.ganado =
            this.estaResuelto(
                this.tablero
            );

    }



    estaResuelto(tablero) {

        for (
            let fila = 0;
            fila < this.dimension;
            fila++
        ) {

            const inicio =
                fila * this.dimension;


            const tipoFila =
                tablero[inicio];


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