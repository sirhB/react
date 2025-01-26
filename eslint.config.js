import antfu from '@antfu/eslint-config'
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss'

export default antfu({
  react: true,
  typescript: false,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  ignores: ['storage/**/*', '**/*.{yaml,yml,php}', 'resources/js/Components/shadcn/**/*', 'public/**/*'],
}, {
  files: ['**/*.{js,jsx,json,ts,tsx,md,html,blade}'],
  ...eslintPluginTailwindCSS.configs['flat/recommended'].rules,
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
})
