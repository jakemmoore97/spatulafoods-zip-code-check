import type {ArrayOrDict} from './types'

const {isArray} = Array
const {values} = Object

type ToArray = <T>(value: ArrayOrDict<T>) => T[]
export const toArray: ToArray = value =>
  isArray(value) ? value : values(value)
