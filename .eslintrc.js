module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: ['**/*.jsx', '**/*.js'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      plugins: [
        'react',
        'react-hooks'
      ],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'no-unused-vars': ['warn', { 
          vars: 'all', 
          args: 'after-used', 
          ignoreRestSiblings: true 
        }],
        'prefer-const': 'error',
        'no-var': 'error'
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  ]
}