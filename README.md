# universal-loadable-starter-kit

An easy way to get started with Universal React. No external packages that manage your build. No reason to ever eject. You control everything.

## Features & Things

- Full HMR support for client **and** server, via webpack-hot-middleware and webpack-hot-server-middleware.
- express for HTTP server, with compression middleware.
- react-loadable for easy codesplitting and `import()` components.
- react-router 4 for showing stuff on different pages because you have _requirements_.
- webpack & babel & some plugins to build stuff.
- dotenv to for `.env`.
- react-universal-cookies for cookie support.
- Deployable to Heroku, includes `Procfile` and `app.json`

## Getting Started

- `config` holds webpack configurations.
- `src/server` should probably not be touched.
- `src/client` is where you put all the flashy stuff.

Ensure your `.env` file has what it needs, here's a starter:

```
NODE_ENV=development
```

Then in your shell:

```
yarn install
yarn start
```
