module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-cycle': 'error',
    'import/order': [
      'error',
      {
        'groups': [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        'pathGroups': [
          {
            pattern: '@(react|react-native|react-redux)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': ['react'],
        'newlines-between': 'always',
      },
    ],
  },
}
