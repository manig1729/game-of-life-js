# Conway's Game of Life

Our take on coding John Conway's Game of life, the cellular automaton

To check where you might be able to contribute to the project, check out the [Contribution section](#contributing-to-the-project)

### Try it out yourself

Check out the [website](https://manig1729.github.io/game-of-life-js/) where this game is hosted

### To know more about the Game of life, check out these links : 
* [Game of life Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
* [Explanation by John Conway](https://www.youtube.com/watch?v=E8kUJL04ELA)

  (RIP John Conway : He passed away in April 2020 due to COVID-19 complications)

## Rules
The rules of the Game of Life are pretty straightforward

In each 'tick' or 'frame', the game checks which cells are 'alive' and calculates the next generation of cells based on these rules :
- If a live cell has less than 2 alive neighbors, it will die
- If a live cell has 2 or 3 alive neighbors, it will continue to live
- If a live cell has more than 3 live neighbors, it will die
- If a dead cell has exactly 3 live neighbors, it will come alive

## Scope of the Game
It is quite a simple _game_ to code, but can do much more than what one expects

Many different patterns arise in the game (for example - still life patterns like 'block' or 'tub', pulsating patterns like the 'blinker' or 'beacon', and spaceships which move around the grid like the 'glider'

We can also make machines which produce the above patterns, for example - the 'Gospel Glider Gun', which makes a glider once every 30 generations

People have gone to the extents of creating logic circuits and [entire computers](https://www.nicolasloizeau.com/gol-computer) in the Game of Life

## About our implementation
Ours is a simple implementation of the game, including these features
* Ability to create / destroy cells by clicking or dragging
* Button to pause and unpause the simulation with a button or spacebar
* Ability to clear the grid at any time using the clear button
* 'Random' button which creates a random area of fixed size with alive and dead cells
* 'Fullscreen' mode which makes the grid take up all the available space in a window
* Inserting specific patterns (like gliders or glider guns) directly

## Contributing to the project
All contributions which make the project better are welcome

A few features which might be worth implementing are
* Touch screen functionality to create alive cells
* Adjusting the speed of the simulation or a button to go ahead one generation at a time
