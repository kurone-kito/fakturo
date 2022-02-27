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
