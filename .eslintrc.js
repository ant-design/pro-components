module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 'off', // Allow console statements
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'off', // Not needed with TypeScript
    'react/display-name': 'off', // Disable display name requirement
    'react-hooks/exhaustive-deps': 'warn', // Make exhaustive-deps a warning
    'no-unsafe-optional-chaining': 'off', // Disable unsafe optional chaining
    'no-empty': 'off', // Disable empty block statement
    'no-useless-escape': 'off', // Disable useless escape
    'no-prototype-builtins': 'off', // Disable prototype builtins
    // TypeScript specific rules - make them less strict
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off', // Disable ban-types
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/dot-notation': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn', // Allow @ts-ignore but warn
    '@typescript-eslint/no-empty-object-type': 'off', // Disable empty object type
    '@typescript-eslint/no-unsafe-function-type': 'off', // Disable unsafe function type
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/dot-notation': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unsafe-function-type': 'off',
      },
    },
  ],
};
