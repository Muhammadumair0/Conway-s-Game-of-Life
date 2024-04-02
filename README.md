# Conway's Game of Life

![Conway's Game of Life](https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif)

## Introduction

This is a programming assignment for Conway's Game of Life, a cellular automaton devised by the British mathematician John Horton Conway in 1970. The Game of Life is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. Despite its simplicity, the Game of Life is Turing complete and capable of simulating a universal constructor or any other Turing machine.

## Features

- **Support for a Large Universe:** The implementation supports a vast universe of size 2^64 x 2^64. Although the universe is mostly empty, objects such as gliders moving away from the center in opposite directions can be observed.

- **Simple UI:** The application features a straightforward user interface allowing users to configure the initial state of the universe on a 100 x 100 grid. Users can start the algorithm and observe the changes dynamically.

- **Persistence:** There is functionality to store and load the state of the universe from a persistent storage, allowing users to save their progress or load previous configurations.

## Usage

1. **Setup:** Clone the repository to your local machine.
    ```bash
    git clone https://github.com/Muhammadumair0/Conway-s-Game-of-Life.git
    ```

2. **Open Index.html:** Open the `index.html` file in your preferred web browser.

3. **Configure Initial State:** Use the UI to configure the initial state of the universe as desired.

4. **Start Algorithm:** Start the algorithm to observe the evolution of the universe based on the initial configuration.

5. **Persistence:** Utilize the provided functionality to save/load the state of the universe for future use.
