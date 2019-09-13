# MovieRama

## Overview

Single page app that can be used to view details on movies which are currently playing in cinemas, and also search for specific titles.

Additionally, you can see more details for each movie, such as trailers, reviews and similar titles (as long as these are available). Click on each movie card to view these details.

## Internals

* Written in vanilla ES6 Javascript without any frameworks or external dependencies.
* SPA functionality provided by custom hash-based router.
* CSS3 flex-box styling.
* Jest for testing.
* Webpack for module bundling.

For the movie data, the [TMDB](https://www.themoviedb.org/) API was used. This project was done within 2 days.

## Build

To build the Javascript source I use`yarn`.

Run

```yarn```

to install the dependencies.

Run

```yarn build```

to get a build on `dist`.

Run

```yarn test```

to run all the unit tests.

## License

MIT for the source code.

<img src="https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-blue-61ce76f69ce1e4f68a6031d975df16cc184d5f04fa7f9f58ae6412646f2481c1.svg" alt="TMDB logo" width="400"/>