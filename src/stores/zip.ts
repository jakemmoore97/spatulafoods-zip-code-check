import {writable} from 'svelte/store'
const stored = localStorage.zip
export const zip = writable(stored || '')
zip.subscribe(value => (localStorage.zip = value.slice(0, 3)))
