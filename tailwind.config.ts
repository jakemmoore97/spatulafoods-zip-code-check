import {defineConfig} from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  theme: {
    extend: {
      borderRadius: {
        '2sm': '4px',
      },
    },
  },
  shortcuts: {
    'no-tap-highlight': {
      WebkitTapHighlightColor: 'transparent',
    },
  },
  plugins: [formsPlugin],
})
