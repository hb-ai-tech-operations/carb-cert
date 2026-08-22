module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // ---- Type rules --------------------------------------------------------
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only changes
        'style', // Changes that do not affect the meaning of the code (white-space, formatting…)
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf', // Performance improvement
        'test', // Adding missing tests or correcting existing tests
        'build', // Changes that affect the build system or external dependencies
        'ci', // CI configuration files and scripts
        'chore', // Other changes that don’t modify src or test files
        'revert', // Reverts a previous commit
      ],
    ],

    // ---- Subject rules -----------------------------------------------------
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 200],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],

    // ---- Body rules --------------------------------------------------------
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 200],

    // ---- Footer rules ------------------------------------------------------
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 200],

    // ---- Header rules ------------------------------------------------------
    'header-max-length': [2, 'always', 200],
    'header-min-length': [2, 'always', 10],
  },
};
