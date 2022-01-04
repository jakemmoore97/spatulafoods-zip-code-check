import {defineConfig} from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

const classNames = (classes: string[]): string => classes.join(' ')
const clsx = (...classes: string[]): string => classNames(classes)

const classes = (classes: string[]): string =>
  classes.length === 1 ? classes[0] : `(${classNames(classes)})`

const withPrefix = (prefix: string, classNames: string[]): string =>
  [prefix, classes(classNames)].join(':')

const prefixClasses =
  (prefix: string) =>
  (...classes: string[]): string =>
    withPrefix(prefix, classes)

const [focus, hover, sm, md, lg, disabled] = [
  'focus',
  'hover',
  'sm',
  'md',
  'lg',
  'disabled',
].map(prefixClasses)

export default defineConfig({
  extract: {
    include: ['src/**/*.svelte', 'src/**/*.ts'],
    exclude: ['node_modules', '.git', ' index.html'],
  },
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
      md('py-20'),
      '<md:w-[80vw]'
    ),
    button: clsx(
      'inline-flex svg-mr-2 items-center justify-center',
      'text-white transition-all no-tap-highlight bg-red-700',
      'font-medium rounded-2sm text-md px-5 py-2.5 text-center',
      disabled('opacity-40 pointer-events-none cursor-wait'),
      hover('bg-red-800'),
      focus('ring-4 ring-red-300 outline-none')
    ),
    alert: 'p-4 text-sm text-red-700 bg-red-100 rounded-lg',
    heading: 'font-bold font-serif leading-tight text-2xl md:text-3xl',
    paragraph: 'text-gray-700 text-md md:text-xl',
    'absolute-center': 'absolute left-1/2 transform -translate-x-1/2',
    'all-uppercase': 'uppercase tracking-wide',
    'top-md': 'top-1/5 md:top-1/3',
    'full-screen': 'object-cover min-h-[100vh] min-w-[100vw]',
  },
  plugins: [formsPlugin],
})
