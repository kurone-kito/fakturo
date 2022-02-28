/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: { es2021: true, node: true },
  extends: [
    'plugin:markdown/recommended',
    'plugin:yaml/recommended',
    'plugin:editorconfig/noconflict',
    'plugin:jsdoc/recommended',
    'plugin:lodash/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    // Because we want to apply the Airbnb rules as much as possible,
    // we have placed them closer to the end.
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.?(c)js'],
      rules: {
        // Allow `require` syntax only for JavaScript. By default,
        // it is completely prohibited.
        // There are many situations where JavaScript is used outside the
        // scope of transpiling, such as in various configuration files,
        // making the `import` syntax challenging to use.
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    extraFileExtensions: ['.cjs', '.cts', '.mjs', '.mts', '.json'],
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    sourceType: 'module',
    // ! Below is why I am writing the ESLint configuration
    // ! in JavaScript instead of YAML.
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    // With a warning, allow use standard import syntax to import for type-
    // only. The default is to enable it unconditionally. Tree shaking at
    // build time needs to work correctly to reduce bundle size, and active
    // use of the type import syntax can contribute significantly to this.
    '@typescript-eslint/consistent-type-imports': 'warn',
    // Allow bracketing of class members. The default is to prohibit it.
    // This should be set appropriately according to the
    // `noPropertyAccessFromIndexSignature` setting in `tsconfig.json`.
    // Still, for some reason, it does not work in the Monorepo,
    // so we have no choice but to disable it temporarily.
    // ! TODO: The setting is temporary and will remove when the problem is solved.
    '@typescript-eslint/dot-notation': 'off',
    // Prohibit dependencies on `devDependencies`, except for specific
    // files. By default, this is a total ban. There is no need for
    // strict separation of dependent packages since they are internally
    // tree shaken by bundlers. Still, some packages are separated into
    // `devDependencies` to make it easier to organize.
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.config.?([cm])[jt]s'] },
    ],
    // Allow with a warning that the arbitrary reordering in the
    // import syntax. The default is to allow it unconditionally.
    // in order to deal with the snowballing problem of the import part.
    'import/order': 'warn',
    // Allow unconditional type specification of the arguments in JSDoc.
    // The default is a blanket ban. Because in TypeScript projects,
    // it can be inferred from the type definitions in the code.
    // TODO: If there are any inconveniences in document generation,
    // TODO: the below rule will be removed.
    'jsdoc/require-param-type': 'off',
    // Allow unconditional type specification of the return value in JSDoc.
    // The default is a blanket ban. Because in TypeScript projects,
    // it can be inferred from the type definitions in the code.
    // TODO: If there are any inconveniences in document generation,
    // TODO: the below rule will be removed.
    'jsdoc/require-returns-type': 'off',
    // Allow unconditional native function substitution in Lodash func-
    // tions. They are prohibited by default. In modern web browsers, diff-
    // erences in standard function specifications are considered unlikely.
    'lodash/prefer-lodash-method': 'off',
    // Allow arbitrary reordering of multiple exports in the import syntax,
    // with a warning. The default is to allow it unconditionally.
    // in order to deal with the snowballing problem of the import part.
    'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
  },
  // ? I've installed `eslint-import-resolver-node`, but
  // ? if I don't put it directly in `devDependencies`, Linter
  // ? gives me some inexplicable errors. Also, if you include `node: {}`
  // ? in the configuration, it provides another inexplicable error.
  // ? see: https://github.com/airbnb/javascript/issues/1730
  settings: { 'import/resolver': { typescript: { alwaysTryTypes: true } } },
};
