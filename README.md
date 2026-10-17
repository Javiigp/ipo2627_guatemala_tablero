# Tablero

Proyecto realizado para la asignatura IPO.

La aplicación implementa un juego de fichas sobre un tablero cuadrado NxN. El usuario puede mover las fichas mediante Drag & Drop hasta conseguir que cada fila esté formada por fichas del mismo tipo.

## Funcionalidades

- Generación de partidas aleatorias.
- Tablero configurable con dimensión N ≥ 3.
- Tres tamaños de fichas: pequeña, mediana y grande.
- Distintas apariencias para las fichas.
- Movimiento de fichas mediante Drag & Drop.
- Intercambio de fichas entre dos posiciones.
- Contador de movimientos.
- Detección automática de victoria.
- Nueva partida al terminar.
- Panel de ayuda con las instrucciones del juego.
- Diseño responsive.


## Arquitectura

El proyecto sigue el patrón MVC:

- `model.js`: contiene el estado y la lógica del juego.
- `view.js`: se encarga de representar el tablero y actualizar la interfaz.
- `controller.js`: gestiona la interacción del usuario y conecta el modelo con la vista.

## Estructura del proyecto

```text
ipo2627_guatemala_tablero
│
├── css
│   └── style.css
│
├── javascript
│   ├── model.js
│   ├── view.js
│   └── controller.js
│
├── index.html
└── README.md