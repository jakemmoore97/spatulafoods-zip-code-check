import {defineConfig} from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

const clsx = (...classes: string[]): string => classes.join(' ')
const prefixClasses =
  (prefix: string) =>
  (...classes: string[]): string =>
    classes.length === 1
      ? `prefix:${classes[0]}`
      : `${prefix}:(${clsx(...classes)})`

const [focus, hover, sm, md, lg] = ['focus', 'hover', 'sm', 'md', 'lg'].map(
  prefixClasses
)

export default defineConfig({
  theme: {
    fontFamily: {
      sans: '"Neuzeit Office", sans-serif',
      serif: 'Montserrat, sans-serif',
    },
    extend: {
      boxShadow: {
        'mantine-card':
          'rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 10px 15px -5px, rgb(0 0 0 / 4%) 0px 7px 7px -5px',
      },
      borderRadius: {
        '2sm': '4px',
      },
    },
  },
  shortcuts: {
    'no-tap-highlight': {
      WebkitTapHighlightColor: 'transparent',
    },
    input: clsx(
      'rounded-2sm text-gray-500 border-gray-200 bg-gray-50 transition-all',
      focus(
        'bg-white border-transparent outline-none',
        'ring-offset-red-200 ring-2 ring-red-400 ring-offset-2'
      )
    ),
    card: clsx(
      'bg-white flex flex-col py-10 px-6 rounded-md shadow-mantine-card',
      md('py-20')
    ),
    button: clsx(
      'text-white transition-all no-tap-highlight bg-red-700',
      'font-medium rounded-2sm text-md px-5 py-2.5 text-center',
      hover('bg-red-800'),
      focus('ring-4 ring-red-300 outline-none')
    ),
    alert: 'p-4 text-sm text-red-700 bg-red-100 rounded-lg',
    heading: 'font-bold font-serif leading-tight text-3xl',
    'absolute-center': 'absolute left-1/2 transform -translate-x-1/2',
    'all-uppercase': 'uppercase tracking-wide',
  },
  plugins: [formsPlugin],
})
