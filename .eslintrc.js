const ERROR = 'error'
const OFF = 'off'
const WARN = 'warn'

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': OFF,
      },
    },
    {
      files: ['**/*.js?(x)'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': OFF,
      },
    },
    {
      files: ['**/__tests__/*.[jt]s?(x)'],
      globals: {
        global: true,
      },
      rules: {
        'no-import-assign': OFF,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    'jsx-a11y',
    'react',
    'react-hooks',
    '@typescript-eslint',
    'unused-imports',
    'import',
  ],
  root: true,
  rules: {
    '@typescript-eslint/ban-ts-comment': ERROR,
    '@typescript-eslint/ban-types': ERROR,
    '@typescript-eslint/consistent-type-definitions': [ERROR, 'interface'],
    '@typescript-eslint/no-unused-vars': ERROR,
    'comma-dangle': [ERROR, 'always-multiline'],
    'comma-spacing': ERROR,
    'comma-style': ERROR,
    curly: [ERROR, 'multi-line'],
    'eol-last': 2,
    'import/first': ERROR,
    'import/no-deprecated': ERROR,
    'import/no-duplicates': ERROR,
    'import/order': [
      ERROR,
      {
        groups: ['builtin', 'external', 'internal'],
        'newlines-between': 'never',
        pathGroups: [
          {
            group: 'external',
            pattern: 'react',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    indent: [ERROR, 2, { SwitchCase: 1 }],
    'jsx-a11y/no-autofocus': WARN,
    'key-spacing': ERROR,
    'linebreak-style': ERROR,
    'no-array-constructor': ERROR,
    'no-multiple-empty-lines': [ERROR, { max: 1 }],
    'no-new-object': ERROR,
    'no-new-wrappers': ERROR,
    'no-prototype-builtins': WARN,
    'no-tabs': ERROR,
    'no-trailing-spaces': ERROR,
    'no-unused-vars': [ERROR, { args: 'none' }],
    'no-var': ERROR,
    'no-whitespace-before-property': ERROR,
    'prefer-spread': ERROR,
    'react-hooks/exhaustive-deps': [
      ERROR,
      { additionalHooks: 'useUpdateEffect' },
    ],
    'react-hooks/rules-of-hooks': ERROR,
    'react/jsx-boolean-value': ERROR,
    'react/jsx-key': ERROR,
    "react/jsx-uses-react": OFF,
    'react/no-access-state-in-setstate': ERROR,
    "react/react-in-jsx-scope": OFF,
    'rest-spread-spacing': ERROR,
    semi: [ERROR, 'never'],
    'sort-keys': [ERROR, 'asc', { caseSensitive: true, natural: false }],
    'space-before-blocks': ERROR,
    'switch-colon-spacing': ERROR,
    'unused-imports/no-unused-imports': ERROR,
    'yield-star-spacing': [ERROR, 'after'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
