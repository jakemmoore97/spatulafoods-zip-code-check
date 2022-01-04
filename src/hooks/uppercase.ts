import {toUpperCase} from 'fp-ts/string'
import {transformInputValue} from './transformInputValue'

export const uppercase = transformInputValue(toUpperCase)
