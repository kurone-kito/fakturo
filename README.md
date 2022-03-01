# ℹ️ monorepo-pnp-jest-example

Example project with...

- Node.js
- Monorepo by Yarn workspaces
- Yarn PnP (Berry)
- Jest
- ESLint
- TypeScript

## Projects structure

| path                | name                        | publish | description                                                            |
| :------------------ | :-------------------------- | :-----: | :--------------------------------------------------------------------- |
| `/`                 | `monorepo-pnp-jest-example` |         | Manage the Monorepo, and the Linters                                   |
| `/packages/foo`     | `@kurone-kito/mpje-foo`     |   ✅    | An example package                                                     |
| `/packages/bar`     | `@kurone-kito/mpje-bar`     |   ✅    | An example package that depends on `@kurone-kito/mpje-foo`             |
| `/packages/builder` | `@kurone-kito/mpje-builder` |         | The builder of the `@kurone-kito/mpje-foo` and `@kurone-kito/mpje-bar` |

## Requires

- Node.js >= 14.19.0
- Yarn >= 2.4.3

## Install

```sh
npm i -g yarn@berry
yarn install
```

## Cleanup

```sh
yarn run clean
```

The command removes artifacts and various intermediate data, and it doesn't
remove dependent external packages installed by the `yarn install` command.

## Build

```sh
yarn run build
```

Create a `dist` folder for each subproject and output the results there.

```sh
yarn run build:re
```

The above command performs cleanup and builds at once, equivalent to a
rebuild.

### Create a hot code push environment for development

```sh
yarn start
```

The command, like build, creates a `dist` folder for each sub-project
underneath and outputs the artifacts there, but it also monitors the source
code for changes and performs a build every time the user saves.

To stop it, press _`Ctrl` + `c`_.

## Linting

```sh
yarn run lint
yarn run lint:fix # Lint and auto-fix
```

## Testing

```sh
yarn run test
```

Currently, the command works as an alias for the `yarn run lint` command.

## License

MIT
