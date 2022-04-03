import {writable} from 'svelte/store'
const stored = localStorage.email
export const email = writable(stored || '')
email.subscribe(value => (localStorage.email = value))
