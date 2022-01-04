import {defineConfig} from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

const classNames = (classes: string[]): string => classes.join(' ')

const clsx = (...classes: string[]): string => classNames(classes)

const isSingle = (classes: string[]): boolean =>
  classes.length === 1 && !classes[0].includes(' ')

const classes = (classes: string[]): string =>
  isSingle(classes) ? classes[0] : `(${classNames(classes)})`

const withPrefix = (prefix: string, classNames: string[]): string =>
  [prefix, classes(classNames)].join(':')

const prefixClasses =
  (prefix: string) =>
  (...classes: string[]): string =>
    withPrefix(prefix, classes)

const [focus, hover, sm, md, lg, disabled, placeholder, selection] = [
  'focus',
  'hover',
  'sm',
  'md',
  'lg',
  'disabled',
  'placeholder',
  'selection',
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
    'brand-ring': focus(
      'outline-none ring-2 ring-red-400 ring-offset-2 ring-offset-red-50'
    ),
    input: clsx(
      'rounded-2sm text-gray-500 border-gray-200 bg-gray-50',
      'transition-all brand-ring',
      'caret-red-500 caret highlight',
      focus('bg-white border-transparent')
    ),
    card: clsx(
      'bg-white flex flex-col w-[80vw] py-10 px-6 rounded-md shadow-mantine-card',
      md('py-14 w-auto')
    ),
    button: clsx(
      'inline-flex svg-mr-2 items-center justify-center',
      'text-white transition-all no-tap-highlight bg-red-700 brand-ring',
      'font-medium rounded-lg text-md px-6 h-12 text-center select-none',
      disabled('opacity-40 pointer-events-none'),
      hover('bg-red-800')
    ),
    alert: 'p-4 text-sm text-red-700 bg-red-100 rounded-lg',
    highlight: selection('bg-red-500/20'),
    heading:
      'font-bold font-serif leading-tight text-2xl md:text-3xl highlight',
    paragraph: 'text-gray-700 text-md md:text-xl highlight',
    'absolute-center': 'absolute left-1/2 transform -translate-x-1/2',
    'all-uppercase': 'uppercase tracking-wide',
    'top-md': 'top-1/5 md:top-1/3',
    'full-screen': 'object-cover min-h-[100vh] min-w-[100vw]',
  },
  plugins: [formsPlugin],
})
