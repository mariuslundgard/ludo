# prototype-ludo-state

Prototyping a video player with different state management strategies:

* [`ludo-core/opstore`](src/lib/ludo-core/opstore/index.js)
* [`ludo-core/redux`](src/lib/ludo-core/redux/index.js)
* [`ludo-core/rxjs`](src/lib/ludo-core/rxjs/index.js)
* [`ludo-core/vanilla`](src/lib/ludo-core/vanilla/index.js)
* [`ludo-core/vanilla-observable`](src/lib/ludo-core/vanilla-observable/index.js)

Contains a (simplified) reference video player user interface built in `preact`:

* [`ludo-player`](src/lib/ludo-player)

## Installation

```sh
git clone git@github.com:mariuslundgard/prototype-ludo-state.git
cd prototype-ludo-state
npm install
```

## Run development server

```sh
npm run watch
```

## Run production server

```sh
npm run build && npm start
```
