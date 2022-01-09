import {identity, pipe} from 'fp-ts/function'
import {not} from 'fp-ts/Predicate'
import {writable} from 'svelte/store'
import type {Writable} from 'svelte/store'

export interface Disclosure {
  isOpen: Writable<boolean>
  close: () => void
  open: () => void
  toggle: () => void
}
export type DisclosureStore = (initial?: boolean) => Disclosure
export const disclosureStore: DisclosureStore = initial => {
  const isOpen = writable(initial)
  const {set, update} = isOpen
  return {
    isOpen,
    close: () => set(false),
    open: () => set(true),
    toggle: () => pipe(identity, not, update),
  }
}
