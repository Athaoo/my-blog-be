module.exports = {
  //解析器
  parser: '@typescript-eslint/parser',
  //文件继承的子规范
  extends: [
    /** Enables eslint-plugin-prettier and displays prettier
     * errors as ESLint errors. Make sure this is always
     * the last configuration in the extends array .
     */
    'plugin:prettier/recommended',
    /** from @typescript-eslint/eslint-pugin */
    'plugin:@typescript-eslint/recommended',
    /**use eslint-config-prettier to
     * disable conflict of eslint and prettier */
    /**abandoned "prettier/@typescript-eslint" has been merged into "prettier" in eslint-config-prettier 8.0.0.
     * See: https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21 */
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'eslint-plugin-react', 'html'], //该eslint依赖的插件
  env: {
    //代码运行环境
    browser: true,
    es2021: true,
  },
  settings: {
    //自动发现React的版本，从而规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    //指定Eslint解析jsx语法
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        useTab: 'auto',
        trailingComma: 'es5',
      },
    ],
    'linebreak-style': 0,
    'valid-typeof': [
      'warn',
      {
        requireStringLiterals: false,
      },
    ],
    'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }]
  },
}
