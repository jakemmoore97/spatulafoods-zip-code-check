import type {Option} from 'fp-ts/Option'
export type OptionFrom<T> = (value: T) => Option<T>
